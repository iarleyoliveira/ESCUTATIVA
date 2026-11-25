(() => {
  const container = document.querySelector('#disqus_thread');
  if (!container) return;

  const status = document.querySelector('.comments-status');
  const shortname = container.dataset.shortname || '';
  if (!/^[a-z0-9][a-z0-9-]*$/i.test(shortname)) {
    if (status) {
      status.textContent = 'Os comentários estão em configuração. Tente novamente mais tarde.';
      status.hidden = false;
    }
    return;
  }

  window.disqus_config = function () {
    this.page.url = container.dataset.pageUrl;
    this.page.identifier = container.dataset.pageId;
    this.page.title = container.dataset.pageTitle;
    this.language = 'pt_BR';
  };

  const script = document.createElement('script');
  script.src = `https://${shortname}.disqus.com/embed.js`;
  script.async = true;
  script.setAttribute('data-timestamp', String(Date.now()));
  script.addEventListener('error', () => {
    if (status) {
      status.textContent = 'Não foi possível carregar os comentários. Atualize a página para tentar novamente.';
      status.hidden = false;
    }
  });
  document.head.appendChild(script);
})();
