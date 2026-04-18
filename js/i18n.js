/* Torres de la Serra — i18n system
   Loads locale JSON files and applies translations to the DOM.
   Usage in HTML:
     <span data-i18n="home.hero.title"></span>
     <input data-i18n-attr="placeholder:form.name_placeholder">
     <a data-i18n-attr="aria-label:nav.vins">...</a>
*/
(function () {
  'use strict';

  const SUPPORTED = ['ca', 'es', 'en'];
  const DEFAULT_LANG = 'ca';
  const STORAGE_KEY = 'tds_lang';
  let translations = {};
  let currentLang = null;

  function detectLang() {
    // 1. URL param ?lang=xx
    const params = new URLSearchParams(window.location.search);
    const urlLang = params.get('lang');
    if (urlLang && SUPPORTED.includes(urlLang)) return urlLang;

    // 2. localStorage
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored && SUPPORTED.includes(stored)) return stored;
    } catch (e) { /* storage unavailable */ }

    // 3. Browser language
    const nav = (navigator.language || navigator.userLanguage || '').toLowerCase();
    if (nav.startsWith('ca')) return 'ca';
    if (nav.startsWith('es')) return 'es';
    if (nav.startsWith('en')) return 'en';

    return DEFAULT_LANG;
  }

  function getNested(obj, key) {
    return key.split('.').reduce((o, k) => (o && o[k] !== undefined) ? o[k] : null, obj);
  }

  function applyTranslations() {
    // Text content
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const value = getNested(translations, key);
      if (value !== null) {
        if (typeof value === 'string' && value.includes('\n')) {
          el.innerHTML = value.split('\n').map(escapeHtml).join('<br>');
        } else {
          el.textContent = value;
        }
      }
    });

    // HTML content (use carefully — only for trusted content)
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      const key = el.getAttribute('data-i18n-html');
      const value = getNested(translations, key);
      if (value !== null) el.innerHTML = value;
    });

    // Attributes
    document.querySelectorAll('[data-i18n-attr]').forEach(el => {
      const spec = el.getAttribute('data-i18n-attr');
      spec.split(';').forEach(pair => {
        const [attr, key] = pair.split(':').map(s => s.trim());
        if (!attr || !key) return;
        const value = getNested(translations, key);
        if (value !== null) el.setAttribute(attr, value);
      });
    });

    // <title>
    const titleKey = document.documentElement.getAttribute('data-i18n-title');
    if (titleKey) {
      const value = getNested(translations, titleKey);
      if (value !== null) {
        document.title = value;
        const ogTitle = document.querySelector('meta[property="og:title"]');
        const twitterTitle = document.querySelector('meta[name="twitter:title"]');
        if (ogTitle) ogTitle.setAttribute('content', value);
        if (twitterTitle) twitterTitle.setAttribute('content', value);
      }
    }

    // meta description
    const descKey = document.documentElement.getAttribute('data-i18n-desc');
    if (descKey) {
      const value = getNested(translations, descKey);
      const meta = document.querySelector('meta[name="description"]');
      if (meta && value !== null) meta.setAttribute('content', value);
      const og = document.querySelector('meta[property="og:description"]');
      const twitter = document.querySelector('meta[name="twitter:description"]');
      if (og && value !== null) og.setAttribute('content', value);
      if (twitter && value !== null) twitter.setAttribute('content', value);
    }

    // Update lang switch UI
    document.querySelectorAll('.lang-switch button[data-lang]').forEach(btn => {
      btn.classList.toggle('is-active', btn.dataset.lang === currentLang);
    });

    // Update html lang
    document.documentElement.setAttribute('lang', currentLang);
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  async function loadLang(lang) {
    if (!SUPPORTED.includes(lang)) lang = DEFAULT_LANG;
    try {
      const res = await fetch('locales/' + lang + '.json?v=1', { cache: 'default' });
      if (!res.ok) throw new Error('locale fetch failed');
      translations = await res.json();
      currentLang = lang;
      try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
      updateUrl(lang);
      applyTranslations();
      document.dispatchEvent(new CustomEvent('i18n:loaded', { detail: { lang } }));
    } catch (e) {
      console.warn('i18n: could not load', lang, e);
      // Try to resolve relative path up one level (for subdirs like /journal/)
      if (!translations.__tried_parent) {
        try {
          const res = await fetch('../locales/' + lang + '.json?v=1');
          if (res.ok) {
            translations = await res.json();
            translations.__tried_parent = true;
            currentLang = lang;
            try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
            updateUrl(lang);
            applyTranslations();
            document.dispatchEvent(new CustomEvent('i18n:loaded', { detail: { lang } }));
          }
        } catch (err) { console.warn('i18n fallback failed', err); }
      }
    }
  }

  function setLang(lang) {
    if (lang === currentLang) return;
    loadLang(lang);
  }

  function updateUrl(lang) {
    const url = new URL(window.location.href);
    if (lang === DEFAULT_LANG) url.searchParams.delete('lang');
    else url.searchParams.set('lang', lang);
    window.history.replaceState({}, '', url.pathname + url.search + url.hash);
  }

  // Expose
  window.TDS_i18n = {
    get current() { return currentLang; },
    set: setLang,
    reload: () => loadLang(currentLang || detectLang()),
  };

  // Auto-init
  document.addEventListener('DOMContentLoaded', () => {
    const lang = detectLang();
    loadLang(lang);

    // Wire lang-switch buttons
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-lang]');
      if (!btn) return;
      e.preventDefault();
      setLang(btn.dataset.lang);
    });
  });
})();
