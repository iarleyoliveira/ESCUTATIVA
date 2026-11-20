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
        [{ opacity: 0, transform: 'translateY(28px)' }, { opacity: 1, transform: 'translateY(0)' }],
        { duration: 720, delay: Number(entry.target.dataset.revealDelay || 0), fill: 'backwards', easing: 'cubic-bezier(.22,1,.36,1)' },
      );
      runningAnimations.add(animation);
      animation.finished.catch(() => {}).finally(() => runningAnimations.delete(animation));
    }
  }, { threshold: 0, rootMargin: '0px 0px -24px 0px' });

  // Animate individual items, rather than hiding whole sections of the page.
  document.querySelectorAll('.cards, .video-list, .team-grid, .newsroom-create').forEach((group) => {
    [...group.children].forEach((item, index) => {
      item.dataset.revealDelay = String((index % 3) * 100);
    });
  });
  document.querySelectorAll('.format-heading, .cards > article, .video-list > article, .case-block > h3, .case-intro, .case-gallery, .case-report, .about > div, .team-grid > article, .team-grid > div, .contact-section > *, .related-publications > h2, .newsroom-create > a')
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

// A discreet reading indicator follows native scrolling, including on touchscreens.
if (document.querySelector('.home-hero, .article')) {
  const progress = document.createElement('div');
  progress.className = 'reading-progress';
  progress.setAttribute('aria-hidden', 'true');
  document.body.append(progress);
  let framePending = false;
  function updateProgress() {
    const distance = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.transform = `scaleX(${distance > 0 ? Math.min(1, Math.max(0, window.scrollY / distance)) : 0})`;
    framePending = false;
  }
  function scheduleProgress() {
    if (!framePending) {
      framePending = true;
      requestAnimationFrame(updateProgress);
    }
  }
  window.addEventListener('scroll', scheduleProgress, { passive: true });
  window.addEventListener('resize', scheduleProgress);
  window.addEventListener('load', scheduleProgress);
  updateProgress();
}
document.addEventListener('focusin', (event) => {
  for (const animation of runningAnimations) {
    if (animation.effect.target.contains(event.target)) animation.finish();
  }
});
