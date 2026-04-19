(function () {
  const VARIANTS = {
    automations: {
      subhead:
        'I clear the automations your seniors keep leaving behind — Zapier, Make, Shopify Flow, and custom code when the no-code options run out.',
      variant:
        'Every Shopify agency has the same quiet backlog. Review apps that stopped syncing after a platform update. ShipStation not talking to Shopify the way it should. Smile.io loyalty logic breaking on edge cases nobody mapped. Klaviyo flows that broke after a tag change. They just sit there. I work with whatever stack your clients already pay for — and I make it work the way it was supposed to.'
    },
    storefront: {
      subhead:
        'I build the custom Shopify sections your theme can\'t do out of the box — and the performance that keeps them from slowing the store down.',
      variant:
        'Custom Liquid sections, scroll animations, parallax effects, page transitions, metafield-driven storefronts. Speed optimization, codebase cleanup, Core Web Vitals. Checkout audits and Shopify Plus customization. I\'ve been doing this on live stores since 2022 — not in a sandbox, in production, with real customers on the other end.'
    },
    both: {
      subhead:
        'I bridge the gap between the storefront and the systems behind it — so the front end and the automation layer actually work as one.',
      variant:
        'Most developers do one or the other. Theme work stays in the theme. Automation work lives in Zapier, disconnected from what the customer sees. I work across both — which means when a Flow trigger needs a Liquid metafield, or a Zapier webhook needs to match a section\'s logic, I don\'t need to hand it off. I close the gap myself.'
    }
  }

  const focusButtons = document.querySelectorAll('[data-focus-btn]')
  const subheadEl = document.getElementById('product-subhead')
  const variantEl = document.getElementById('desc-variant')
  const liveRegion = document.getElementById('variant-live')
  const copyBlocks = [
    document.getElementById('variant-copy-hero'),
    document.getElementById('variant-copy-desc')
  ].filter(Boolean)

  const FADE_MS = 280
  const CHAIN_START_MS = 180
  const CHAIN_STAGGER_MS = 105
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  let focus = 'automations'

  function setCopyUpdating(on) {
    copyBlocks.forEach(function (el) {
      el.classList.toggle('is-updating', on)
    })
  }

  function applyVariantContent() {
    const v = VARIANTS[focus]
    if (!v) return
    if (subheadEl) subheadEl.textContent = v.subhead
    if (variantEl) variantEl.textContent = v.variant
  }

  function announceVariant() {
    if (!liveRegion) return
    const label = focus.charAt(0).toUpperCase() + focus.slice(1)
    liveRegion.textContent = 'Focus set to ' + label + '.'
  }

  function applyVariantAnimated() {
    if (prefersReducedMotion || !copyBlocks.length) {
      applyVariantContent()
      announceVariant()
      return
    }
    setCopyUpdating(true)
    window.setTimeout(function () {
      applyVariantContent()
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          setCopyUpdating(false)
          announceVariant()
        })
      })
    }, FADE_MS)
  }

  function setActive(buttons, value) {
    buttons.forEach(function (btn) {
      const isOn = btn.getAttribute('data-value') === value
      btn.setAttribute('aria-pressed', isOn ? 'true' : 'false')
      btn.classList.toggle('is-active', isOn)
    })
  }

  focusButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      focus = btn.getAttribute('data-value')
      setActive(focusButtons, focus)
      applyVariantAnimated()
    })
  })

  setActive(focusButtons, focus)
  applyVariantContent()

  function revealAll(nodes) {
    nodes.forEach(function (n) {
      n.classList.add('is-revealed')
    })
  }

  function initChainReveals() {
    const items = document.querySelectorAll('#pdp-chain [data-reveal-chain]')
    if (!items.length) return
    if (prefersReducedMotion) {
      revealAll(items)
      return
    }
    items.forEach(function (el, i) {
      window.setTimeout(function () {
        el.classList.add('is-revealed')
      }, CHAIN_START_MS + i * CHAIN_STAGGER_MS)
    })
  }

  function initScrollReveals() {
    const nodes = document.querySelectorAll('[data-reveal-scroll]')
    if (!nodes.length) return
    if (prefersReducedMotion) {
      revealAll(nodes)
      return
    }
    const io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return
          entry.target.classList.add('is-revealed')
          io.unobserve(entry.target)
        })
      },
      { threshold: 0.06, rootMargin: '0px 0px 10% 0px' }
    )
    nodes.forEach(function (n) {
      io.observe(n)
    })
  }

  function bootReveals() {
    initScrollReveals()
    initChainReveals()
  }

  function initNavMenu() {
    const btn = document.querySelector('.site-header__menu-btn')
    const nav = document.getElementById('site-nav-primary')
    if (!btn || !nav) return

    const mq = window.matchMedia('(max-width: 640px)')

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

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      bootReveals()
      initNavMenu()
    })
  } else {
    bootReveals()
    initNavMenu()
  }
})()
