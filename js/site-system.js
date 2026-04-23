;(function () {
  const motion = {
    ms: {
      copyFade: 280,
      chainStart: 180,
      chainStagger: 105
    },
    css: {
      revealOpacityTransformMs: 600,
      variantOpacityTransformMs: 280,
      menuIconRotateMs: 420
    },
    easing: {
      reveal: 'cubic-bezier(0.22, 1, 0.36, 1)',
      standard: 'ease',
      menuIcon: 'cubic-bezier(0.34, 1.25, 0.44, 1)'
    },
    intersectionObserver: {
      threshold: 0.06,
      rootMargin: '0px 0px 10% 0px'
    }
  }

  const ui = {
    breakpoints: {
      navMobile: '(max-width: 640px)'
    }
  }

  function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }

  window.MilosSite = {
    motion: motion,
    ui: ui,
    prefersReducedMotion: prefersReducedMotion
  }
})()
