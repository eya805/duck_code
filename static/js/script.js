/* ══════════════════════════════════════════════════════
  EGYPT TOURISM — MAIN JS
  static/js/script.js
  ══════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {


  /* ════════════════════════════════════
     1. TOP NAVBAR SCROLL BEHAVIOUR
  ════════════════════════════════════ */
  const topnav = document.getElementById('topnav');

  const handleNavScroll = () => {
    if (!topnav) return;
    if (window.scrollY > 60) {
      topnav.classList.add('scrolled');
    } else {
      topnav.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll(); // run once on load


  /* ── Mobile hamburger ── */
  const ham     = document.getElementById('tnavHam');
  const drawer  = document.getElementById('tnavDrawer');
  const veil    = document.getElementById('drawerVeil');

  function openDrawer() {
    ham.classList.add('open');
    drawer.classList.add('open');
    drawer.setAttribute('aria-hidden', 'false');
    veil.classList.add('active');
    ham.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    ham.classList.remove('open');
    drawer.classList.remove('open');
    drawer.setAttribute('aria-hidden', 'true');
    veil.classList.remove('active');
    ham.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (ham)    ham.addEventListener('click', () => drawer.classList.contains('open') ? closeDrawer() : openDrawer());
  if (veil)   veil.addEventListener('click', closeDrawer);

  document.querySelectorAll('.drawer-link').forEach(l => {
    l.addEventListener('click', closeDrawer);
  });

  // Close drawer on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      if (drawer?.classList.contains('open')) closeDrawer();
      if (searchOverlay?.classList.contains('active')) closeSearch();
    }
  });


  /* ── Quick search overlay ── */
  const searchOverlay = document.getElementById('searchOverlay');
  const searchTrigger = document.getElementById('navSearchTrigger');
  const searchClose   = document.getElementById('searchClose');
  const searchInput   = document.getElementById('searchInput');

  function openSearch() {
    searchOverlay.classList.add('active');
    searchOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    setTimeout(() => searchInput?.focus(), 200);
  }

  function closeSearch() {
    searchOverlay.classList.remove('active');
    searchOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (searchTrigger) searchTrigger.addEventListener('click', openSearch);
  if (searchClose)   searchClose.addEventListener('click', closeSearch);

  // Click outside to close
  if (searchOverlay) {
    searchOverlay.addEventListener('click', e => {
      if (e.target === searchOverlay) closeSearch();
    });
  }


  /* ════════════════════════════════════
     2. HERO SLIDER
  ════════════════════════════════════ */
  const slides      = document.querySelectorAll('.hero-slide');
  const dotsWrap    = document.getElementById('heroDots');
  const progressBar = document.getElementById('heroProgress');
  const currentNum  = document.getElementById('currentNum');
  const DURATION    = 6500;

  let current     = 0;
  let progVal     = 0;
  let autoTimer   = null;
  let progTimer   = null;
  let isAnimating = false;

  const pad = n => String(n + 1).padStart(2, '0');

  // Build dots dynamically (matches DTL slide count)
  const dots = [];
  if (dotsWrap && slides.length) {
    slides.forEach((_, i) => {
      const d = document.createElement('button');
      d.className = 'hdot' + (i === 0 ? ' active' : '');
      d.setAttribute('data-i', i);
      d.setAttribute('aria-label', `Slide ${i + 1}`);
      d.addEventListener('click', () => { goTo(i); restartAuto(); });
      dotsWrap.appendChild(d);
      dots.push(d);
    });
  }

  function goTo(idx) {
    if (isAnimating || !slides.length) return;
    isAnimating = true;

    const prev = current;
    current = (idx + slides.length) % slides.length;
    if (prev === current) { isAnimating = false; return; }

    slides[prev].classList.remove('active');
    if (dots[prev]) dots[prev].classList.remove('active');

    slides[current].classList.add('active');
    if (dots[current]) dots[current].classList.add('active');
    if (currentNum) currentNum.textContent = pad(current);

    resetProgress();
    setTimeout(() => { isAnimating = false; }, 700);
  }

  function resetProgress() {
    clearInterval(progTimer);
    progVal = 0;
    if (progressBar) progressBar.style.width = '0%';
    startProgress();
  }

  function startProgress() {
    const step = 100 / (DURATION / 40);
    progTimer = setInterval(() => {
      progVal += step;
      if (progressBar) progressBar.style.width = Math.min(progVal, 100) + '%';
      if (progVal >= 100) clearInterval(progTimer);
    }, 40);
  }

  function startAuto() {
    clearInterval(autoTimer);
    if (slides.length > 1) autoTimer = setInterval(() => goTo(current + 1), DURATION);
  }

  function restartAuto() {
    clearInterval(autoTimer);
    resetProgress();
    startAuto();
  }

  const heroNext = document.getElementById('heroNext');
  const heroPrev = document.getElementById('heroPrev');
  if (heroNext) heroNext.addEventListener('click', () => { goTo(current + 1); restartAuto(); });
  if (heroPrev) heroPrev.addEventListener('click', () => { goTo(current - 1); restartAuto(); });

  // Swipe on hero
  const heroEl = document.querySelector('.hero');
  if (heroEl) {
    let tx = 0;
    heroEl.addEventListener('touchstart', e => { tx = e.changedTouches[0].clientX; }, { passive: true });
    heroEl.addEventListener('touchend',   e => {
      const diff = tx - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) { goTo(diff > 0 ? current + 1 : current - 1); restartAuto(); }
    }, { passive: true });
    heroEl.addEventListener('mouseenter', () => clearInterval(autoTimer));
    heroEl.addEventListener('mouseleave', startAuto);
  }

  // Keyboard
  document.addEventListener('keydown', e => {
    if (document.activeElement.tagName === 'INPUT') return;
    if (e.key === 'ArrowRight') { goTo(current + 1); restartAuto(); }
    if (e.key === 'ArrowLeft')  { goTo(current - 1); restartAuto(); }
  });

  if (slides.length) { resetProgress(); startAuto(); }


  /* ════════════════════════════════════
     3. SCROLL REVEAL
  ════════════════════════════════════ */
  const revealEls = document.querySelectorAll('.reveal-up');
  const revealObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in-view');
        revealObs.unobserve(e.target);
      }
    });
  }, { threshold: .1, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => revealObs.observe(el));


  /* ════════════════════════════════════
     4. STAT COUNTERS
  ════════════════════════════════════ */
  function animCount(el, target, dur = 2200) {
    let start = null;
    const ease = t => 1 - Math.pow(1 - t, 3);
    const frame = ts => {
      if (!start) start = ts;
      const prog = Math.min((ts - start) / dur, 1);
      el.textContent = Math.floor(ease(prog) * target).toLocaleString();
      if (prog < 1) requestAnimationFrame(frame);
      else el.textContent = target.toLocaleString();
    };
    requestAnimationFrame(frame);
  }

  let countersRun = false;
  const statsBand = document.querySelector('.stats-band');
  if (statsBand) {
    new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !countersRun) {
        countersRun = true;
        document.querySelectorAll('.stat-num').forEach(el => {
          animCount(el, parseInt(el.dataset.target || '0', 10));
        });
      }
    }, { threshold: .3 }).observe(statsBand);
  }


  /* ════════════════════════════════════
     5. LANDMARKS CAROUSEL
  ════════════════════════════════════ */
  const lmTrack = document.getElementById('lmTrack');
  const lmPrev  = document.getElementById('lmPrev');
  const lmNext  = document.getElementById('lmNext');

  if (lmTrack) {
    const lmCards = lmTrack.querySelectorAll('.lm-card');
    const GAP = 22;
    let lmOff = 0;

    const getCardW   = () => (lmCards[0]?.offsetWidth ?? 290) + GAP;
    const getMaxOff  = () => {
      const vw = lmTrack.parentElement.offsetWidth;
      return Math.max(0, lmCards.length * getCardW() - GAP - vw);
    };

    const slideLm = dir => {
      lmOff = Math.max(0, Math.min(lmOff + dir * getCardW(), getMaxOff()));
      lmTrack.style.transform = `translateX(-${lmOff}px)`;
    };

    if (lmNext) lmNext.addEventListener('click', () => slideLm(1));
    if (lmPrev) lmPrev.addEventListener('click', () => slideLm(-1));

    const vp = lmTrack.parentElement;
    let lmTx = 0;
    if (vp) {
      vp.addEventListener('touchstart', e => { lmTx = e.changedTouches[0].clientX; }, { passive: true });
      vp.addEventListener('touchend',   e => {
        const diff = lmTx - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 40) slideLm(diff > 0 ? 1 : -1);
      }, { passive: true });
    }

    window.addEventListener('resize', () => {
      lmOff = 0;
      lmTrack.style.transform = 'translateX(0)';
    });
  }


  /* ════════════════════════════════════
     6. PARALLAX — QUOTE SECTION
  ════════════════════════════════════ */
  const quoteBg   = document.querySelector('.quote-bg');
  const quoteWrap = document.querySelector('.quote-section');
  if (quoteBg && quoteWrap && window.innerWidth > 768 &&
      !window.matchMedia('(prefers-reduced-motion:reduce)').matches) {
    window.addEventListener('scroll', () => {
      const rect = quoteWrap.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        const off = (rect.top / window.innerHeight) * 38;
        quoteBg.style.transform = `scale(1.06) translateY(${off}px)`;
      }
    }, { passive: true });
  }

  /* ════════════════════════════════════
     7. CURSOR GLOW (desktop)
  ════════════════════════════════════ */
  if (window.innerWidth > 1024 &&
      !window.matchMedia('(prefers-reduced-motion:reduce)').matches) {

    const glow = document.createElement('div');
    Object.assign(glow.style, {
      position: 'fixed', pointerEvents: 'none', zIndex: '9990',
      width: '320px', height: '320px', borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(212,175,55,.06) 0%, transparent 70%)',
      transform: 'translate(-50%,-50%)',
      transition: 'opacity .3s', mixBlendMode: 'screen',
    });
    document.body.appendChild(glow);

    let mx = 0, my = 0, cx = 0, cy = 0;
    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; }, { passive: true });
    (function moveGlow() {
      cx += (mx - cx) * .1;
      cy += (my - cy) * .1;
      glow.style.left = cx + 'px';
      glow.style.top  = cy + 'px';
      requestAnimationFrame(moveGlow);
    })();
    document.addEventListener('mouseleave', () => glow.style.opacity = '0');
    document.addEventListener('mouseenter', () => glow.style.opacity = '1');
  }


  /* ════════════════════════════════════
     8. PAGE LOAD INTRO VEIL (2.5s golden fade)
  ════════════════════════════════════ */
  const introVeil = document.getElementById('introVeil');
  if (introVeil) {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion:reduce)').matches;
    const dismiss = () => {
      introVeil.classList.add('is-fading');
      introVeil.setAttribute('aria-hidden', 'true');
      window.setTimeout(() => introVeil.remove(), 2600);
    };

    if (prefersReduced) {
      introVeil.remove();
    } else {
      window.addEventListener('load', dismiss, { once: true });
      window.setTimeout(() => {
        if (document.body.contains(introVeil) && !introVeil.classList.contains('is-fading')) dismiss();
      }, 3000);
    }
  }


}); // DOMContentLoaded
