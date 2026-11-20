(() => {
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  document.querySelectorAll('[data-case-carousel]').forEach((gallery) => {
    const slides = [...gallery.querySelectorAll('.case-slides > figure')];
    if (slides.length < 2) return;
    const controls = gallery.querySelector('.case-carousel-controls');
    const counter = gallery.querySelector('.case-photo-counter');
    const playback = gallery.querySelector('.case-playback');
    const dots = gallery.querySelector('.case-photo-dots');
    const track = gallery.querySelector('.case-slides');
    const desktop = window.matchMedia('(min-width: 900px)');
    const tablet = window.matchMedia('(min-width: 600px)');
    let visibleCount = Math.min(slides.length, desktop.matches ? 3 : tablet.matches ? 2 : 1);
    let index = 0;
    let playing = !motion.matches;
    let hovered = false;
    let visible = false;
    let timer;
    let touch;
    let lastSwipe = 0;

    const indicators = slides.map((slide, position) => {
      slide.setAttribute('role', 'group');
      slide.setAttribute('aria-roledescription', 'slide');
      slide.setAttribute('aria-label', `${position + 1} de ${slides.length}`);
      const button = document.createElement('button');
      button.type = 'button';
      button.setAttribute('aria-label', `Ir para a foto ${position + 1}`);
      button.addEventListener('click', () => show(position, true));
      dots.append(button);
      return button;
    });

    function schedule() {
      window.clearTimeout(timer);
      if (playing && slides.length > visibleCount && visible && !hovered && !document.hidden) {
        timer = window.setTimeout(() => show(index + 1), 6000);
      }
    }

    function updatePlayback() {
      playback.textContent = playing ? 'Pausar' : 'Reproduzir';
      playback.setAttribute('aria-label', playing ? 'Pausar passagem automática' : 'Reproduzir fotos automaticamente');
      counter.setAttribute('aria-live', playing ? 'off' : 'polite');
      schedule();
    }

    function show(next, manual = false) {
      index = (next + slides.length) % slides.length;
      if (manual) playing = false;
      const focused = document.activeElement;
      const focusWasInTrack = track.contains(focused);
      slides.forEach((slide, position) => {
        indicators[position].setAttribute('aria-current', String(position === index));
      });
      const visiblePositions = [];
      for (let offset = 0; offset < slides.length; offset += 1) {
        const position = (index + offset) % slides.length;
        const slide = slides[position];
        slide.hidden = offset >= visibleCount;
        track.append(slide);
        if (offset < visibleCount) {
          visiblePositions.push(position + 1);
          const image = slide.querySelector('img');
          if (image) image.loading = 'eager';
        }
      }
      gallery.style.setProperty('--case-visible', String(visibleCount));
      gallery.dataset.visiblePhotos = String(visibleCount);
      gallery.dataset.photoIndex = String(index);
      updatePlayback();
      counter.textContent = visibleCount === 1
        ? `Foto ${index + 1} de ${slides.length}`
        : `Fotos ${visiblePositions.join(', ')} de ${slides.length}`;
      controls.hidden = slides.length <= visibleCount;
      if (focusWasInTrack) {
        const target = focused.closest('figure')?.hidden ? slides[index].querySelector('a') : focused;
        target?.focus({ preventScroll: true });
      }
    }

    function resize() {
      visibleCount = Math.min(slides.length, desktop.matches ? 3 : tablet.matches ? 2 : 1);
      show(index);
    }

    gallery.classList.add('is-carousel');
    gallery.setAttribute('aria-roledescription', 'carrossel');
    controls.hidden = false;
    desktop.addEventListener('change', resize);
    tablet.addEventListener('change', resize);
    gallery.querySelector('.case-previous').addEventListener('click', () => show(index - 1, true));
    gallery.querySelector('.case-next').addEventListener('click', () => show(index + 1, true));
    playback.addEventListener('click', () => {
      playing = !playing;
      updatePlayback();
    });
    gallery.addEventListener('mouseenter', () => { hovered = true; schedule(); });
    gallery.addEventListener('mouseleave', () => { hovered = false; schedule(); });
    gallery.addEventListener('focusin', (event) => {
      if (event.target === playback) return;
      playing = false;
      updatePlayback();
    });
    gallery.addEventListener('keydown', (event) => {
      if (event.ctrlKey || event.metaKey || event.altKey) return;
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        event.preventDefault();
        show(index + (event.key === 'ArrowRight' ? 1 : -1), true);
      }
    });
    gallery.addEventListener('touchstart', (event) => {
      touch = event.touches.length === 1 ? { x: event.touches[0].clientX, y: event.touches[0].clientY } : null;
    }, { passive: true });
    gallery.addEventListener('touchend', (event) => {
      if (!touch || !event.changedTouches.length) return;
      const dx = event.changedTouches[0].clientX - touch.x;
      const dy = event.changedTouches[0].clientY - touch.y;
      touch = null;
      if (Math.abs(dx) >= 45 && Math.abs(dx) > Math.abs(dy) * 1.3) {
        lastSwipe = Date.now();
        show(index + (dx < 0 ? 1 : -1), true);
      }
    }, { passive: true });
    gallery.addEventListener('click', (event) => {
      if (Date.now() - lastSwipe < 500) event.preventDefault();
    }, true);
    document.addEventListener('visibilitychange', schedule);
    motion.addEventListener('change', () => {
      if (motion.matches) playing = false;
      updatePlayback();
    });
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        schedule();
      }, { threshold: 0.15 }).observe(gallery);
    } else {
      visible = true;
    }
    show(0);
  });
})();
