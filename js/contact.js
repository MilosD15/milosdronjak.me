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
      return viewedPx >= sectionHeight * 0.2
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

  const CONTACT_API_URL = 'https://admin.milosdronjak.me/api/contact-submissions'

  function ensureErrorNode(field) {
    let node = field.querySelector('.contact-form__error')
    if (!node) {
      node = document.createElement('p')
      node.className = 'contact-form__error'
      field.appendChild(node)
    }
    return node
  }

  function setFieldError(field, control, message) {
    const errorNode = ensureErrorNode(field)
    control.classList.add('is-invalid')
    control.setAttribute('aria-invalid', 'true')
    errorNode.textContent = message
  }

  function clearFieldError(field, control) {
    const errorNode = field.querySelector('.contact-form__error')
    control.classList.remove('is-invalid')
    control.removeAttribute('aria-invalid')
    if (errorNode) errorNode.textContent = ''
  }

  function injectHoneypot(form) {
    const input = document.createElement('input')
    input.type = 'text'
    input.name = 'website'
    input.value = ''
    input.autocomplete = 'off'
    input.setAttribute('tabindex', '-1')
    input.setAttribute('aria-hidden', 'true')
    input.style.cssText =
      'position:absolute;left:-9999px;width:1px;height:1px;opacity:0;pointer-events:none;'
    form.appendChild(input)
  }

  function showSuccess(form) {
    const card = form.closest('.contact-form-card')
    if (card) {
      const toggle = card.querySelector('.contact-toggle')
      if (toggle) toggle.style.display = 'none'
    }

    form.innerHTML = `
      <div class="contact-form__success">
        <svg class="contact-success__check" viewBox="0 0 52 52" aria-hidden="true">
          <circle class="contact-success__circle" cx="26" cy="26" r="23" fill="none" stroke-width="2.5"/>
          <path class="contact-success__tick" fill="none" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" d="M14 27l8 8 16-16"/>
        </svg>
        <div class="contact-success__text">
          <p class="contact-form__success-sub">On it!</p>
          <p class="contact-form__success-msg">I'll be in touch shortly.</p>
        </div>
      </div>
    `
  }

  function showGlobalError(form, message) {
    let el = form.querySelector('.contact-form__error--global')
    if (!el) {
      el = document.createElement('p')
      el.className = 'contact-form__error contact-form__error--global'
      const cta = form.querySelector('.contact-form__cta')
      if (cta) form.insertBefore(el, cta)
      else form.appendChild(el)
    }
    el.textContent = message
  }

  function clearGlobalError(form) {
    const el = form.querySelector('.contact-form__error--global')
    if (el) el.remove()
  }

  function buildSubmissionMeta() {
    return {
      source_page: '/contact',
      referrer: typeof document.referrer === 'string' ? document.referrer : '',
      user_agent: typeof navigator.userAgent === 'string' ? navigator.userAgent : '',
      submitted_at: new Date().toISOString()
    }
  }

  function fieldSelectorsForFormType(formType) {
    if (formType === 'agency') {
      return {
        name: 'input[name="contactRole"]',
        email: 'input[name="email"]',
        message: 'textarea[name="tickets"]'
      }
    }
    if (formType === 'freelance') {
      return {
        name: 'input[name="name"]',
        email: 'input[name="email"]',
        message: 'textarea[name="projectNeeds"]'
      }
    }
    return {
      name: 'input[name="name"]',
      email: 'input[name="email"]',
      message: 'textarea[name="message"]'
    }
  }

  function applyApiFieldErrors(form, formType, fieldErrors) {
    if (!fieldErrors || typeof fieldErrors !== 'object') return
    const map = fieldSelectorsForFormType(formType)
    Object.keys(fieldErrors).forEach(function (apiKey) {
      const sel = map[apiKey] || map[String(apiKey).toLowerCase()]
      if (!sel) return
      const control = form.querySelector(sel)
      if (!control) return
      const field = control.closest('.contact-form__field')
      if (!field) return
      let msg = fieldErrors[apiKey]
      if (Array.isArray(msg)) msg = msg[0] || 'Invalid value.'
      if (typeof msg !== 'string') msg = String(msg)
      setFieldError(field, control, msg)
    })
  }

  function buildJsonPayload(form, formType) {
    const meta = buildSubmissionMeta()
    if (formType === 'agency') {
      return {
        form_type: 'agency',
        name: form.querySelector('input[name="contactRole"]').value.trim(),
        email: form.querySelector('input[name="email"]').value.trim(),
        message: form.querySelector('textarea[name="tickets"]').value.trim(),
        meta
      }
    }
    if (formType === 'freelance') {
      return {
        form_type: 'freelance',
        name: form.querySelector('input[name="name"]').value.trim(),
        email: form.querySelector('input[name="email"]').value.trim(),
        message: form.querySelector('textarea[name="projectNeeds"]').value.trim(),
        meta
      }
    }
    return {
      form_type: 'hi',
      name: form.querySelector('input[name="name"]').value.trim(),
      email: form.querySelector('input[name="email"]').value.trim(),
      message: form.querySelector('textarea[name="message"]').value.trim(),
      meta
    }
  }

  function initFormValidation() {
    const forms = Array.from(document.querySelectorAll('.contact-form'))
    if (!forms.length) return

    forms.forEach(function (form) {
      injectHoneypot(form)

      const fields = Array.from(form.querySelectorAll('.contact-form__field'))
      if (fields.length < 3) return

      const nameField = fields[0]
      const emailField = fields[1]
      const messageField = fields[2]
      const nameInput = nameField.querySelector('input, textarea')
      const emailInput = emailField.querySelector('input[type="email"]')
      const messageInput = messageField.querySelector('textarea')
      if (!nameInput || !emailInput || !messageInput) return

      const formType = form.getAttribute('data-contact-form') || 'agency'

      function clearAllGlobalOnInput() {
        clearGlobalError(form)
      }

      form.querySelectorAll('input, textarea').forEach(function (el) {
        if (el.getAttribute('name') === 'website') return
        el.addEventListener('input', clearAllGlobalOnInput)
      })

      function validateName() {
        const value = nameInput.value.trim()
        if (!value) {
          setFieldError(nameField, nameInput, 'Name is required.')
          return false
        }
        if (value.length < 2) {
          setFieldError(nameField, nameInput, 'Name must be at least 2 characters.')
          return false
        }
        if (value.length > 160) {
          setFieldError(nameField, nameInput, 'Name must be 160 characters or fewer.')
          return false
        }
        clearFieldError(nameField, nameInput)
        return true
      }

      function validateEmail() {
        const value = emailInput.value.trim()
        const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
        if (!value) {
          setFieldError(emailField, emailInput, 'Email is required.')
          return false
        }
        if (!valid) {
          setFieldError(emailField, emailInput, 'Please enter a valid email address.')
          return false
        }
        if (value.length > 320) {
          setFieldError(emailField, emailInput, 'Email must be 320 characters or fewer.')
          return false
        }
        clearFieldError(emailField, emailInput)
        return true
      }

      function validateMessage() {
        const value = messageInput.value.trim()
        if (!value) {
          setFieldError(messageField, messageInput, 'Message is required.')
          return false
        }
        if (value.length < 3) {
          setFieldError(messageField, messageInput, 'Message must be at least 3 characters.')
          return false
        }
        if (value.length > 8000) {
          setFieldError(messageField, messageInput, 'Message must be 8000 characters or fewer.')
          return false
        }
        clearFieldError(messageField, messageInput)
        return true
      }

      nameInput.addEventListener('input', validateName)
      emailInput.addEventListener('input', validateEmail)
      messageInput.addEventListener('input', validateMessage)

      form.addEventListener('submit', function (e) {
        e.preventDefault()

        const valid = validateName() && validateEmail() && validateMessage()
        if (!valid) return

        const honeypot = form.querySelector('input[name="website"]')
        if (honeypot && honeypot.value.trim().length > 0) {
          showSuccess(form)
          return
        }

        const btn = form.querySelector('.contact-form__cta')
        const leftSpan = btn && btn.querySelector('.btn--primary__left')
        const originalLabel = leftSpan ? leftSpan.textContent : ''

        clearGlobalError(form)

        async function runSubmit() {
          if (btn) btn.disabled = true
          if (leftSpan) leftSpan.textContent = 'Sending…'

          try {
            const body = buildJsonPayload(form, formType)
            const res = await fetch(CONTACT_API_URL, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(body)
            })

            let data = {}
            try {
              const text = await res.text()
              if (text) data = JSON.parse(text)
            } catch (parseErr) {
              data = {}
            }

            if (res.status === 201) {
              showSuccess(form)
              return
            }

            if (res.status === 400 && data.field_errors) {
              applyApiFieldErrors(form, formType, data.field_errors)
              return
            }

            if (res.status === 429) {
              showGlobalError(
                form,
                'Too many submissions. Please wait a few minutes and try again.'
              )
              return
            }

            if (res.status >= 500) {
              showGlobalError(
                form,
                'Something went wrong on our end. You can also reach me at hello@milosdronjak.me'
              )
              return
            }

            showGlobalError(
              form,
              'Something went wrong on our end. You can also reach me at hello@milosdronjak.me'
            )
          } catch (err) {
            showGlobalError(form, 'Could not send — check your connection and try again.')
          } finally {
            if (!form.querySelector('.contact-form__success')) {
              if (btn) btn.disabled = false
              if (leftSpan) leftSpan.textContent = originalLabel
            }
          }
        }

        void runSubmit()
      })
    })
  }

  function boot() {
    initScrollReveals()
    initNavMenu()
    initContactTypeToggle()
    initFormValidation()
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot)
  } else {
    boot()
  }
})()
