/* ══════════════════════════════════════════════════════
  EGYPT DETAIL PAGE JS — places/static/places/detail.js
  Handles: image gallery + lightbox
  ══════════════════════════════════════════════════════ */
 
document.addEventListener('DOMContentLoaded', () => {

  /* ── Collect all thumbs ── */
  const thumbs   = document.querySelectorAll('.dm-thumb');
  const lightbox = document.getElementById('dmLightbox');
  const lbImg    = document.getElementById('dmLbImg');
  const lbCap    = document.getElementById('dmLbCaption');
  const lbClose  = document.getElementById('dmLbClose');
  const lbPrev   = document.getElementById('dmLbPrev');
  const lbNext   = document.getElementById('dmLbNext');
  const lbOverlay= document.getElementById('dmLbOverlay');
  const lbCounter= document.getElementById('dmLbCounter');

  if (!lightbox || !thumbs.length) return;

  /* Build array of { src, caption } from DOM */
  const images = Array.from(thumbs).map(t => ({
    src:     t.dataset.src    || t.querySelector('img')?.src || '',
    caption: t.dataset.caption || '',
  }));

  let currentIdx = 0;

  /* ── Open lightbox ── */
  function openLb(idx) {
    currentIdx = idx;
    showImg(idx);
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    lbClose?.focus();
  }

  /* ── Close lightbox ── */
  function closeLb() {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    thumbs[currentIdx]?.focus();
  }

  /* ── Show image by index ── */
  function showImg(idx) {
    currentIdx = (idx + images.length) % images.length;
    const item = images[currentIdx];

    if (lbImg) {
      lbImg.style.opacity = '0';
      lbImg.src = item.src;
      lbImg.onload = () => {
        lbImg.style.transition = 'opacity .35s';
        lbImg.style.opacity = '1';
      };
    }

    if (lbCap)     lbCap.textContent     = item.caption;
    if (lbCounter) lbCounter.textContent = `${currentIdx + 1} / ${images.length}`;
  }

  /* ── Attach thumb click handlers ── */
  thumbs.forEach((t, i) => {
    t.addEventListener('click', () => openLb(i));
    t.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLb(i); }
    });
  });

  /* ── Controls ── */
  if (lbClose)   lbClose.addEventListener  ('click', closeLb);
  if (lbOverlay) lbOverlay.addEventListener('click', closeLb);
  if (lbPrev)    lbPrev.addEventListener   ('click', () => showImg(currentIdx - 1));
  if (lbNext)    lbNext.addEventListener   ('click', () => showImg(currentIdx + 1));

  /* ── Keyboard ── */
  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'ArrowLeft')  showImg(currentIdx - 1);
    if (e.key === 'ArrowRight') showImg(currentIdx + 1);
    if (e.key === 'Escape')     closeLb();
  });

  /* ── Touch swipe inside lightbox ── */
  let lbTx = 0;
  lightbox.addEventListener('touchstart', e => { lbTx = e.changedTouches[0].clientX; }, { passive: true });
  lightbox.addEventListener('touchend',   e => {
    const diff = lbTx - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) showImg(currentIdx + (diff > 0 ? 1 : -1));
  }, { passive: true });

});
