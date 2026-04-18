/* Torres de la Serra — main.js
   Sticky header, scroll reveal, mobile menu, form handling.
*/
(function () {
  'use strict';

  /* ----- Sticky header on scroll ----- */
  const header = document.querySelector('.site-header');
  if (header) {
    let ticking = false;
    function updateHeader() {
      if (window.scrollY > 60) header.classList.add('is-scrolled');
      else header.classList.remove('is-scrolled');
      ticking = false;
    }
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(updateHeader);
        ticking = true;
      }
    }, { passive: true });
    updateHeader();
  }

  /* ----- Scroll reveal ----- */
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length && 'IntersectionObserver' in window && !reduced) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(el => io.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('is-visible'));
  }

  /* ----- Mobile menu ----- */
  const toggle = document.querySelector('.menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const backdrop = document.querySelector('.menu-backdrop');

  function closeMenu() {
    if (!mobileMenu) return;
    toggle?.classList.remove('is-open');
    mobileMenu.classList.remove('is-open');
    backdrop?.classList.remove('is-open');
    toggle?.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
  function openMenu() {
    toggle?.classList.add('is-open');
    mobileMenu?.classList.add('is-open');
    backdrop?.classList.add('is-open');
    toggle?.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }
  if (toggle) {
    toggle.addEventListener('click', () => {
      if (mobileMenu?.classList.contains('is-open')) closeMenu();
      else openMenu();
    });
  }
  backdrop?.addEventListener('click', closeMenu);
  mobileMenu?.addEventListener('click', (e) => {
    if (e.target.closest('a')) closeMenu();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  /* ----- Contact form (Formspree) ----- */
  const form = document.querySelector('form[data-contact-form]');
  if (form) {
    const status = form.querySelector('.form-status');
    const requiredFields = form.querySelectorAll('[required]');

    requiredFields.forEach(field => {
      field.addEventListener('invalid', () => {
        const msg = field.getAttribute('data-msg-required') || 'Please complete this field.';
        field.setCustomValidity(msg);
      });
      field.addEventListener('input', () => field.setCustomValidity(''));
    });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      const endpoint = form.getAttribute('action');
      if (!endpoint || endpoint.includes('YOUR_FORM_ID')) {
        if (status) {
          status.textContent = form.getAttribute('data-msg-config') || 'Form not configured yet.';
          status.className = 'form-status error';
        }
        return;
      }
      const btn = form.querySelector('button[type="submit"]');
      btn.disabled = true;
      try {
        const data = new FormData(form);
        const res = await fetch(endpoint, { method: 'POST', body: data, headers: { 'Accept': 'application/json' } });
        if (res.ok) {
          form.reset();
          if (status) {
            status.textContent = form.getAttribute('data-msg-success') || 'Thank you.';
            status.className = 'form-status success';
          }
        } else {
          throw new Error('server error');
        }
      } catch (err) {
        if (status) {
          status.textContent = form.getAttribute('data-msg-error') || 'Something went wrong. Please try again.';
          status.className = 'form-status error';
        }
      } finally {
        btn.disabled = false;
      }
    });
  }

  /* ----- Copy-link share buttons ----- */
  document.querySelectorAll('[data-copy-link]').forEach(btn => {
    btn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(window.location.href);
        const original = btn.textContent;
        btn.textContent = btn.getAttribute('data-copied') || '✓';
        setTimeout(() => { btn.textContent = original; }, 2000);
      } catch (e) {}
    });
  });

  /* ----- Preserve ?lang on internal links ----- */
  document.addEventListener('i18n:loaded', () => {
    const lang = window.TDS_i18n?.current;
    if (!lang) return;
    document.querySelectorAll('a[href]').forEach(a => {
      const href = a.getAttribute('href');
      if (!href || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('#') || href.startsWith('tel:')) return;
      const u = new URL(href, window.location.href);
      if (u.origin !== window.location.origin) return;
      if (lang === 'ca') u.searchParams.delete('lang');
      else u.searchParams.set('lang', lang);
      a.setAttribute('href', u.pathname + u.search + u.hash);
    });
  });

})();
