(() => {
  const script = document.createElement('script');
  script.src = new URL('./js/newsroom.js', document.currentScript.src).href;
  script.async = false;
  document.head.appendChild(script);
})();
