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

  const CHAIN_STAGGER_MS = typeof motionMs.chainStagger === 'number' ? motionMs.chainStagger : 105

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
        }, i * Math.max(60, CHAIN_STAGGER_MS - 20))
      })
      group.done = true
    }

    function sectionPassed20Percent(section) {
      const rect = section.getBoundingClientRect()
      const sectionHeight = Math.max(section.offsetHeight, 1)
      const viewedPx = window.innerHeight - rect.top
      return viewedPx >= sectionHeight * 0.2
    }

    function checkSectionGroups() {
      groups.forEach(function (group) {
        if (group.done) return
        if (sectionPassed20Percent(group.section)) {
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

  function initToolTabs() {
    const tabs = Array.from(document.querySelectorAll('[data-tool-tab]'))
    const panels = Array.from(document.querySelectorAll('[data-tool-panel]'))
    if (!tabs.length || !panels.length) return

    function setTab(value) {
      tabs.forEach(function (tab) {
        const active = tab.getAttribute('data-value') === value
        tab.classList.toggle('is-active', active)
        tab.setAttribute('aria-selected', active ? 'true' : 'false')
      })

      const nextPanel = panels.find(function (panel) {
        return panel.id === 'tools-' + value
      })
      const currentPanel = panels.find(function (panel) {
        return panel.classList.contains('is-active')
      })
      if (!nextPanel || currentPanel === nextPanel) return

      if (prefersReducedMotion || !currentPanel) {
        panels.forEach(function (panel) {
          const active = panel.id === 'tools-' + value
          panel.classList.toggle('is-active', active)
          panel.hidden = !active
        })
        return
      }

      const currentLists = Array.from(currentPanel.querySelectorAll('.philosophy-list'))
      const nextLists = Array.from(nextPanel.querySelectorAll('.philosophy-list'))
      currentLists.forEach(function (list) {
        list.classList.add('is-updating')
      })
      window.setTimeout(function () {
        currentPanel.classList.remove('is-active')
        currentPanel.hidden = true
        currentLists.forEach(function (list) {
          list.classList.remove('is-updating')
        })

        nextPanel.hidden = false
        nextPanel.classList.add('is-active')
        nextLists.forEach(function (list) {
          list.classList.add('is-updating')
        })
        requestAnimationFrame(function () {
          requestAnimationFrame(function () {
            nextLists.forEach(function (list) {
              list.classList.remove('is-updating')
            })
          })
        })
      }, FADE_MS)
    }

    function setInitialTab(value) {
      tabs.forEach(function (tab) {
        const active = tab.getAttribute('data-value') === value
        tab.classList.toggle('is-active', active)
        tab.setAttribute('aria-selected', active ? 'true' : 'false')
      })

      panels.forEach(function (panel) {
        const active = panel.id === 'tools-' + value
        panel.classList.toggle('is-active', active)
        panel.hidden = !active
      })
    }

    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        setTab(tab.getAttribute('data-value'))
      })
    })

    const activeTab = tabs.find(function (tab) {
      return tab.classList.contains('is-active')
    })
    setInitialTab(activeTab ? activeTab.getAttribute('data-value') : tabs[0].getAttribute('data-value'))
  }

  function initBacklogDiagnostic() {
    const section = document.querySelector('.backlog-diagnostic')
    const cta = section ? section.querySelector('[data-backlog-cta]') : null
    const scene = section ? section.querySelector('[data-backlog-scene]') : null
    const svg = scene ? scene.querySelector('.backlog-connector') : null
    const lines = svg ? Array.from(svg.querySelectorAll('.connector-line')) : []
    const pills = scene ? Array.from(scene.querySelectorAll('.backlog-pill')) : []
    if (!section || !cta) return

    function syncConnectorLines() {
      if (!scene || !svg || !lines.length || !pills.length) return

      const sceneRect = scene.getBoundingClientRect()
      const ctaRect = cta.getBoundingClientRect()
      const width = Math.max(sceneRect.width, 1)
      const height = Math.max(sceneRect.height, 1)
      const endX = ctaRect.left - sceneRect.left
      const endY = ctaRect.top - sceneRect.top + ctaRect.height / 2 + 20
      const rootFontSize = parseFloat(window.getComputedStyle(document.documentElement).fontSize) || 16
      const stackRightPx = 0.2 * rootFontSize
      const stackTopsRem = [2.75, 5.95, 9.15, 12.35, 15.55, 18.75]

      svg.setAttribute('viewBox', '0 0 ' + width + ' ' + height)

      lines.forEach(function (line, i) {
        const pill = pills[i]
        if (!pill) return
        const startX = width - stackRightPx - pill.offsetWidth + 14
        const startY = (stackTopsRem[i] || 0) * rootFontSize + pill.offsetHeight / 2
        line.setAttribute('x1', String(startX))
        line.setAttribute('y1', String(startY))
        line.setAttribute('x2', String(endX))
        line.setAttribute('y2', String(endY))
      })
    }

    function setHovered(hovered) {
      section.classList.toggle('is-hovered', hovered)
      if (!scene || !pills.length) return

      if (!hovered) {
        pills.forEach(function (pill) {
          pill.style.removeProperty('left')
        })
        return
      }

      const sceneWidth = Math.max(scene.getBoundingClientRect().width, 1)
      const rootFontSize = parseFloat(window.getComputedStyle(document.documentElement).fontSize) || 16
      const stackRightPx = 0.2 * rootFontSize

      pills.forEach(function (pill) {
        const targetLeft = sceneWidth - stackRightPx - pill.offsetWidth
        pill.style.left = String(targetLeft) + 'px'
      })
    }

    cta.addEventListener('mouseenter', function () {
      setHovered(true)
    })

    cta.addEventListener('mouseleave', function () {
      setHovered(false)
    })

    cta.addEventListener('focus', function () {
      setHovered(true)
    })

    cta.addEventListener('blur', function () {
      setHovered(false)
    })

    window.addEventListener('resize', syncConnectorLines)
    window.addEventListener('resize', function () {
      if (section.classList.contains('is-hovered')) {
        setHovered(true)
      }
    })
    window.setTimeout(syncConnectorLines, 0)
  }

  function boot() {
    initScrollReveals()
    initNavMenu()
    initToolTabs()
    initBacklogDiagnostic()
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot)
  } else {
    boot()
  }
})()
