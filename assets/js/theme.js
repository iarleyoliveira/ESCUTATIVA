(() => {
  const root = document.documentElement;
  const system = window.matchMedia('(prefers-color-scheme: dark)');
  let preference = null;
  let commentsReady = false;
  try { preference = localStorage.getItem('escutativa-theme'); } catch (_) {}
  if (!['light', 'dark'].includes(preference)) preference = null;

  function syncComments() {
    const theme = root.dataset.theme;
    const script = document.querySelector('script[src="https://giscus.app/client.js"]');
    if (script) script.dataset.theme = theme;
    if (commentsReady) {
      document.querySelector('.giscus-frame')?.contentWindow?.postMessage({ giscus: { setConfig: { theme } } }, 'https://giscus.app');
    }
  }
  function applyTheme() {
    const dark = (preference || (system.matches ? 'dark' : 'light')) === 'dark';
    root.dataset.theme = dark ? 'dark' : 'light';
    document.querySelectorAll('.theme-toggle').forEach(button => {
      button.hidden = false;
      button.setAttribute('aria-pressed', String(dark));
      button.setAttribute('aria-label', dark ? 'Ativar modo claro' : 'Ativar modo escuro');
      button.querySelector('.theme-label').textContent = dark ? 'Modo claro' : 'Modo escuro';
    });
    syncComments();
  }
  applyTheme();
  function initializeControls() {
    applyTheme();
    document.querySelectorAll('.theme-toggle').forEach(button => button.addEventListener('click', () => {
      preference = root.dataset.theme === 'dark' ? 'light' : 'dark';
      try { localStorage.setItem('escutativa-theme', preference); } catch (_) {}
      applyTheme();
    }));
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeControls, { once: true });
  } else {
    initializeControls();
  }
  if (typeof system.addEventListener === 'function') {
    system.addEventListener('change', () => { if (!preference) applyTheme(); });
  } else if (typeof system.addListener === 'function') {
    system.addListener(() => { if (!preference) applyTheme(); });
  }
  window.addEventListener('storage', event => {
    if (event.key !== 'escutativa-theme' && event.key !== null) return;
    preference = ['light', 'dark'].includes(event.newValue) ? event.newValue : null;
    applyTheme();
  });
  window.addEventListener('message', event => {
    if (!commentsReady && event.origin === 'https://giscus.app' && event.data?.giscus) {
      commentsReady = true;
      syncComments();
    }
  });
})();
