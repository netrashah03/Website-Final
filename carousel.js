// carousel.js
// Modular photo carousel — reused on athletics.html and gallery.html
// Usage: initCarousel(containerId, slides)
// slides = array of { src, alt, caption }

function initCarousel(containerId, slides) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const track    = container.querySelector('.carousel-track');
  const prevBtn  = container.querySelector('.carousel-btn.prev');
  const nextBtn  = container.querySelector('.carousel-btn.next');
  const dotsEl   = container.querySelector('.carousel-dots');
  const captionEl = container.querySelector('.carousel-caption');

  let current = 0;

  // Build slides
  slides.forEach((slide, i) => {
    const div = document.createElement('div');
    div.className = 'carousel-slide' + (i === 0 ? ' active' : '');

    if (slide.src) {
      const img = document.createElement('img');
      img.src = slide.src;
      img.alt = slide.alt || '';
      div.appendChild(img);
    } else {
      // Placeholder
      div.innerHTML = `
        <div class="carousel-placeholder">
          <span class="ph-icon">${slide.icon || '📷'}</span>
          <span class="ph-label">${slide.alt || 'Photo ' + (i + 1)}</span>
        </div>`;
    }
    track.appendChild(div);

    // Dot
    if (dotsEl) {
      const dot = document.createElement('span');
      dot.className = 'dot' + (i === 0 ? ' active' : '');
      dot.addEventListener('click', () => goTo(i));
      dotsEl.appendChild(dot);
    }
  });

  updateCaption();

  function goTo(index) {
    const slideEls = track.querySelectorAll('.carousel-slide');
    const dots = dotsEl ? dotsEl.querySelectorAll('.dot') : [];
    slideEls[current].classList.remove('active');
    if (dots[current]) dots[current].classList.remove('active');
    current = (index + slides.length) % slides.length;
    slideEls[current].classList.add('active');
    if (dots[current]) dots[current].classList.add('active');
    updateCaption();
  }

  function updateCaption() {
    if (captionEl && slides[current] && slides[current].caption) {
      captionEl.textContent = slides[current].caption;
    } else if (captionEl) {
      captionEl.textContent = '';
    }
  }

  function nextSlide() { goTo(current + 1); }
  function prevSlide() { goTo(current - 1); }

  if (nextBtn) nextBtn.addEventListener('click', nextSlide);
  if (prevBtn) prevBtn.addEventListener('click', prevSlide);

  // Keyboard nav
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') nextSlide();
    if (e.key === 'ArrowLeft')  prevSlide();
  });

  // Auto-advance (optional, 5s)
  // setInterval(nextSlide, 5000);
}
