(function () {
  const SYS = window.MilosSite || {}
  const motion = SYS.motion || {}
  const ui = SYS.ui || {}
  const motionMs = motion.ms || {}
  const FADE_MS = typeof motionMs.copyFade === 'number' ? motionMs.copyFade : 280
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
      return viewedPx >= sectionHeight * 0.6
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

  function initContactTypeToggle() {
    const buttons = Array.from(document.querySelectorAll('[data-contact-type-btn]'))
    const forms = Array.from(document.querySelectorAll('[data-contact-form]'))
    if (!buttons.length || !forms.length) return

    function setType(value, initial) {
      buttons.forEach(function (btn) {
        const active = btn.getAttribute('data-value') === value
        btn.classList.toggle('is-active', active)
        btn.setAttribute('aria-pressed', active ? 'true' : 'false')
      })

      const nextForm = forms.find(function (form) {
        return form.getAttribute('data-contact-form') === value
      })
      const currentForm = forms.find(function (form) {
        return form.classList.contains('is-active')
      })
      if (!nextForm || currentForm === nextForm) return

      if (initial || prefersReducedMotion || !currentForm) {
        forms.forEach(function (form) {
          const active = form.getAttribute('data-contact-form') === value
          form.classList.toggle('is-active', active)
          form.hidden = !active
          form.classList.remove('is-updating')
        })
        return
      }

      currentForm.classList.add('is-updating')
      window.setTimeout(function () {
        currentForm.classList.remove('is-active')
        currentForm.hidden = true
        currentForm.classList.remove('is-updating')

        nextForm.hidden = false
        nextForm.classList.add('is-active')
        nextForm.classList.add('is-updating')
        requestAnimationFrame(function () {
          requestAnimationFrame(function () {
            nextForm.classList.remove('is-updating')
          })
        })
      }, FADE_MS)
    }

    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        setType(btn.getAttribute('data-value'))
      })
    })

    const activeBtn = buttons.find(function (btn) {
      return btn.classList.contains('is-active')
    })
    setType(activeBtn ? activeBtn.getAttribute('data-value') : 'agency', true)
  }

  function boot() {
    initScrollReveals()
    initNavMenu()
    initContactTypeToggle()
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot)
  } else {
    boot()
  }
})()
