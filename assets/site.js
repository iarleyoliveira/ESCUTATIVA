const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
const searchLink = document.querySelector('.search-link');
const searchDialog = document.querySelector('#search-dialog');

if (searchLink && searchDialog && typeof searchDialog.showModal === 'function') {
  const searchInput = searchDialog.querySelector('input');
  const closeButton = searchDialog.querySelector('.search-close');

  searchLink.setAttribute('aria-haspopup', 'dialog');
  searchLink.setAttribute('aria-controls', searchDialog.id);
  searchLink.setAttribute('aria-expanded', 'false');

  searchLink.addEventListener('click', (event) => {
    if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    searchDialog.showModal();
    document.documentElement.classList.add('search-open');
    searchLink.setAttribute('aria-expanded', 'true');
    searchInput.focus();
    if (!motionPreference.matches && typeof searchDialog.animate === 'function') {
      searchDialog.animate(
        [{ opacity: 0.85, transform: 'translateY(6px)' }, { opacity: 1, transform: 'translateY(0)' }],
        { duration: 180, easing: 'cubic-bezier(.22,1,.36,1)' },
      );
    }
  });

  closeButton.addEventListener('click', () => searchDialog.close());
  searchDialog.addEventListener('click', (event) => {
    const bounds = searchDialog.getBoundingClientRect();
    const outside = event.clientX < bounds.left || event.clientX > bounds.right
      || event.clientY < bounds.top || event.clientY > bounds.bottom;
    if (event.target === searchDialog && outside) searchDialog.close();
  });
  searchDialog.addEventListener('close', () => {
    searchDialog.getAnimations().forEach((animation) => animation.cancel());
    document.documentElement.classList.remove('search-open');
    searchLink.setAttribute('aria-expanded', 'false');
    searchLink.focus({ preventScroll: true });
  });
}

// Content remains visible when scripts, observers or animations are unavailable.
const revealedElements = new WeakSet();
const runningAnimations = new Set();
let revealObserver;

function observeSections() {
  if (motionPreference.matches || !('IntersectionObserver' in window)
    || typeof Element.prototype.animate !== 'function') return;

  revealObserver = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      revealObserver.unobserve(entry.target);
      if (revealedElements.has(entry.target)) continue;
      revealedElements.add(entry.target);
      if (entry.target.contains(document.activeElement)) continue;
      const animation = entry.target.animate(
        [{ opacity: 0.92, transform: 'translateY(8px)' }, { opacity: 1, transform: 'translateY(0)' }],
        { duration: 360, easing: 'cubic-bezier(.22,1,.36,1)' },
      );
      runningAnimations.add(animation);
      animation.finished.catch(() => {}).finally(() => runningAnimations.delete(animation));
    }
  }, { threshold: 0, rootMargin: '0px 0px -24px 0px' });

  // Reveal each block as a unit. Keep the initial viewport and visited content stable.
  document.querySelectorAll('.case-block, .format-heading, .format-section > .cards, .format-section > .video-list, .about, .team-grid, .related-publications > .cards')
    .forEach((element) => {
      if (element.getBoundingClientRect().top < window.innerHeight) {
        revealedElements.add(element);
      } else if (!revealedElements.has(element)) {
        revealObserver.observe(element);
      }
    });
}

observeSections();
motionPreference.addEventListener('change', () => {
  revealObserver?.disconnect();
  for (const animation of runningAnimations) animation.cancel();
  searchDialog?.getAnimations().forEach((animation) => animation.cancel());
  if (!motionPreference.matches) observeSections();
});
document.addEventListener('focusin', (event) => {
  for (const animation of runningAnimations) {
    if (animation.effect.target.contains(event.target)) animation.finish();
  }
});
