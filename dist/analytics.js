/* Mesure limitée aux pages et aux clics de contact, après accord. */
(() => {
  const id = document.currentScript?.dataset.measurementId;
  if (!/^G-[A-Z0-9]+$/.test(id || '') || location.hostname !== 'coppeyboisdefeu.ch') return;
  const storageKey = 'coppey-analytics-consent-v1';
  const lifetime = 180 * 24 * 60 * 60 * 1000;
  const panel = document.getElementById('analytics-choice');
  const settings = document.getElementById('analytics-settings');
  if (!panel || !settings) return;
  let enabled = false;
  function savedChoice() {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey));
      return saved && Date.now() - saved.at < lifetime ? saved.choice : null;
    } catch { return null; }
  }
  function save(choice) {
    try { localStorage.setItem(storageKey, JSON.stringify({choice, at: Date.now()})); } catch {}
  }
  function enable() {
    if (enabled) return;
    enabled = true;
    window['ga-disable-' + id] = false;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function() { window.dataLayer.push(arguments); };
    window.gtag('consent', 'default', {
      analytics_storage: 'granted', ad_storage: 'denied',
      ad_user_data: 'denied', ad_personalization: 'denied'
    });
    window.gtag('js', new Date());
    window.gtag('config', id, {
      send_page_view: false, allow_google_signals: false,
      allow_ad_personalization_signals: false,
      page_location: location.origin + location.pathname,
      page_referrer: (() => { try { const r = new URL(document.referrer); return r.origin + r.pathname; } catch { return ''; } })()
    });
    window.gtag('event', 'page_view', {
      page_location: location.origin + location.pathname,
      page_title: document.title
    });
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + id;
    document.head.append(script);
  }
  function clearCookies() {
    document.cookie.split(';').forEach(part => {
      const name = part.split('=')[0].trim();
      if (!/^_ga(?:_|$)/.test(name)) return;
      ['', '; domain=' + location.hostname, '; domain=.' + location.hostname].forEach(domain => {
        document.cookie = name + '=; Max-Age=0; path=/' + domain + '; SameSite=Lax; Secure';
      });
    });
  }
  panel.querySelectorAll('[data-analytics-choice]').forEach(button => {
    button.addEventListener('click', () => {
      const choice = button.dataset.analyticsChoice;
      save(choice);
      panel.hidden = true;
      if (choice === 'accept') enable();
      else {
        window['ga-disable-' + id] = true;
        clearCookies();
        if (enabled) location.reload();
      }
      settings.focus({preventScroll: true});
    });
  });
  settings.hidden = false;
  settings.addEventListener('click', () => {
    panel.hidden = false;
    panel.querySelector('button')?.focus();
  });
  document.addEventListener('click', event => {
    if (!enabled || window['ga-disable-' + id]) return;
    const link = event.target.closest('a[href]');
    if (!link || event.defaultPrevented) return;
    const url = new URL(link.href);
    const name = url.hostname === 'wa.me' ? 'contact_whatsapp' : url.protocol === 'tel:' ? 'contact_phone' : null;
    if (name) window.gtag('event', name, {page_path: location.pathname, transport_type: 'beacon'});
  });
  const choice = savedChoice();
  if (choice === 'accept') enable();
  else if (choice !== 'reject') panel.hidden = false;
})();
