(function () {
  const SYS = window.MilosSite || {}
  const ui = SYS.ui || {}
  const prefersReducedMotion =
    typeof SYS.prefersReducedMotion === 'function'
      ? SYS.prefersReducedMotion()
      : window.matchMedia('(prefers-reduced-motion: reduce)').matches

  function revealAll(nodes) {
    nodes.forEach(function (n) {
      n.classList.add('is-revealed')
    })
  }

  function initScrollReveals() {
    const nodes = document.querySelectorAll('[data-reveal-scroll]')
    if (!nodes.length) return
    if (prefersReducedMotion) {
      revealAll(nodes)
      return
    }

    const sectionNodes = document.querySelectorAll('[data-reveal-section]')
    const groups = Array.from(sectionNodes)
      .map(function (section) {
        return {
          section: section,
          nodes: Array.from(section.querySelectorAll('[data-reveal-scroll]')),
          done: false
        }
      })
      .filter(function (g) {
        return g.nodes.length > 0
      })

    function revealGroup(group) {
      group.nodes.forEach(function (node, i) {
        window.setTimeout(function () {
          node.classList.add('is-revealed')
        }, i * 70)
      })
      group.done = true
    }

    function sectionPassedThreshold(section) {
      const rect = section.getBoundingClientRect()
      const sectionHeight = Math.max(section.offsetHeight, 1)
      const viewedPx = window.innerHeight - rect.top
      const rawThreshold = Number.parseFloat(section.getAttribute('data-reveal-threshold'))
      const threshold = Number.isFinite(rawThreshold) ? Math.min(Math.max(rawThreshold, 0), 1) : 0.2
      return viewedPx >= sectionHeight * threshold
    }

    function checkSectionGroups() {
      groups.forEach(function (group) {
        if (group.done) return
        if (sectionPassedThreshold(group.section)) {
          revealGroup(group)
        }
      })
    }

    checkSectionGroups()
    window.addEventListener('scroll', checkSectionGroups, { passive: true })
    window.addEventListener('resize', checkSectionGroups)
  }

  function initNavMenu() {
    const btn = document.querySelector('.site-header__menu-btn')
    const nav = document.getElementById('site-nav-primary')
    if (!btn || !nav) return

    const navMq =
      ui.breakpoints && ui.breakpoints.navMobile ? ui.breakpoints.navMobile : '(max-width: 640px)'
    const mq = window.matchMedia(navMq)

    function setOpen(open) {
      btn.setAttribute('aria-expanded', open ? 'true' : 'false')
      btn.classList.toggle('is-open', open)
      nav.classList.toggle('is-open', open)
      btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu')
    }

    btn.addEventListener('click', function () {
      setOpen(btn.getAttribute('aria-expanded') !== 'true')
    })

    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        setOpen(false)
      })
    })

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setOpen(false)
    })

    document.addEventListener('click', function (e) {
      if (!nav.classList.contains('is-open')) return
      const t = e.target
      if (btn.contains(t) || nav.contains(t)) return
      setOpen(false)
    })

    mq.addEventListener('change', function (e) {
      if (!e.matches) setOpen(false)
    })
  }

  function initImageCompare() {
    const compares = Array.from(document.querySelectorAll('[data-compare]'))
    if (!compares.length) return

    compares.forEach(function (compare) {
      const range = compare.querySelector('[data-compare-range]')
      const before = compare.querySelector('[data-compare-before]')
      const divider = compare.querySelector('[data-compare-divider]')
      if (!range || !before || !divider) return

      function sync(value) {
        const safe = Math.max(0, Math.min(100, value))
        before.style.clipPath = 'inset(0 ' + (100 - safe) + '% 0 0)'
        divider.style.left = safe + '%'
      }

      range.addEventListener('input', function () {
        sync(Number.parseFloat(range.value))
      })

      sync(Number.parseFloat(range.value))
    })
  }

  function boot() {
    initScrollReveals()
    initNavMenu()
    initImageCompare()
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot)
  } else {
    boot()
  }
})()
