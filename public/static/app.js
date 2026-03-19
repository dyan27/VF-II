/* ═══════════════════════════════════════════
   SPACE FORCE GUARDIAN LEADERSHIP JOURNEY
   Interactive JavaScript — Mouse Tracking,
   Parallax, Animations, Counters & More
   ═══════════════════════════════════════════ */

(function () {
  'use strict';

  /* ─── CURSOR ─── */
  const cursor   = document.getElementById('customCursor');
  const trail    = document.getElementById('cursorTrail');
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let trailX = mouseX, trailY = mouseY;
  let curX = mouseX, curY = mouseY;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  document.querySelectorAll('a, button, .value-card, .pillar-item, .timeline-node, .jp-node, .btn-primary, .btn-ghost').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
  });

  function animateCursor() {
    curX += (mouseX - curX) * 0.18;
    curY += (mouseY - curY) * 0.18;
    trailX += (mouseX - trailX) * 0.08;
    trailY += (mouseY - trailY) * 0.08;

    if (cursor)  { cursor.style.left  = curX + 'px'; cursor.style.top  = curY + 'px'; }
    if (trail)   { trail.style.left   = trailX + 'px'; trail.style.top = trailY + 'px'; }
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  /* ─── STAR FIELD ─── */
  function buildStars(containerId, count) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const frag = document.createDocumentFragment();
    for (let i = 0; i < count; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      const size = Math.random() * 2 + 0.5;
      star.style.cssText = `
        width:${size}px;height:${size}px;
        top:${Math.random()*100}%;left:${Math.random()*100}%;
        --duration:${2+Math.random()*4}s;
        --delay:${Math.random()*4}s;
        --base-opacity:${0.2+Math.random()*0.7};
      `;
      frag.appendChild(star);
    }
    container.appendChild(frag);
  }
  buildStars('starField', 200);

  /* ─── PARTICLES ─── */
  function buildParticles(containerId, count) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const frag = document.createDocumentFragment();
    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      const size = Math.random() * 3 + 1;
      p.style.cssText = `
        width:${size}px;height:${size}px;
        left:${Math.random()*100}%;
        --duration:${8+Math.random()*12}s;
        --delay:${Math.random()*10}s;
        --drift:${(Math.random()-0.5)*120}px;
        opacity:0;
      `;
      frag.appendChild(p);
    }
    container.appendChild(frag);
  }
  for (let i = 1; i <= 5; i++) buildParticles(`particles${i}`, 25);

  /* ─── CTA STARS ─── */
  (function buildCtaStars() {
    const c = document.querySelector('.cta-stars');
    if (!c) return;
    const frag = document.createDocumentFragment();
    for (let i = 0; i < 120; i++) {
      const s = document.createElement('div');
      s.className = 'star';
      const size = Math.random() * 1.5 + 0.5;
      s.style.cssText = `width:${size}px;height:${size}px;top:${Math.random()*100}%;left:${Math.random()*100}%;--duration:${2+Math.random()*5}s;--delay:${Math.random()*5}s;--base-opacity:${0.15+Math.random()*0.5};`;
      frag.appendChild(s);
    }
    c.appendChild(frag);
  })();

  /* ─── MOUSE PARALLAX ─── */
  const allOrbs = document.querySelectorAll('[data-depth]');
  let rafPending = false;
  let globalMX = 0, globalMY = 0;
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;

  document.addEventListener('mousemove', e => {
    globalMX = e.clientX - centerX;
    globalMY = e.clientY - centerY;
    if (!rafPending) {
      rafPending = true;
      requestAnimationFrame(() => {
        allOrbs.forEach(orb => {
          const depth = parseFloat(orb.dataset.depth) || 0.05;
          const dx = globalMX * depth;
          const dy = globalMY * depth;
          orb.style.transform = `translate(${dx}px, ${dy}px)`;
        });
        rafPending = false;
      });
    }
  });

  /* ─── HERO PLANET MOUSE TILT ─── */
  const heroPlanet = document.getElementById('heroPlanet');
  if (heroPlanet) {
    document.addEventListener('mousemove', e => {
      const nx = (e.clientX / window.innerWidth  - 0.5) * 12;
      const ny = (e.clientY / window.innerHeight - 0.5) * 8;
      heroPlanet.style.transform = `translateY(-50%) rotateX(${-ny}deg) rotateY(${nx}deg)`;
    });
  }

  /* ─── NAVBAR SCROLL ─── */
  const navbar = document.getElementById('navbar');
  function onScroll() {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    updateProgress();
    updateJourneyNodes();
    updateTimelineHighlight();
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ─── SCROLL PROGRESS BAR ─── */
  function updateProgress() {
    const jpFill = document.getElementById('jpFill');
    if (!jpFill) return;
    const total = document.documentElement.scrollHeight - window.innerHeight;
    const pct   = total > 0 ? (window.scrollY / total) * 100 : 0;
    jpFill.style.height = Math.min(pct, 100) + '%';
  }

  /* ─── JOURNEY NODES ACTIVATION ─── */
  const stageIds = ['hero', 'stage-1', 'stage-2', 'stage-3', 'stage-4', 'stage-5'];
  function updateJourneyNodes() {
    const jpNodes = document.querySelectorAll('.jp-node');
    let active = 0;
    stageIds.forEach((id, i) => {
      const el = document.getElementById(id);
      if (!el) return;
      const rect = el.getBoundingClientRect();
      if (rect.top <= window.innerHeight * 0.55) active = i;
    });
    jpNodes.forEach((n, i) => {
      n.classList.toggle('jp-active', i === active);
      n.classList.toggle('jp-done',   i < active);
    });
  }

  /* ─── TIMELINE HIGHLIGHT ─── */
  function updateTimelineHighlight() {
    const nodes = document.querySelectorAll('.timeline-node');
    const progress = document.getElementById('timelineProgress');
    let active = 0;
    for (let i = 1; i <= 5; i++) {
      const el = document.getElementById('stage-' + i);
      if (!el) continue;
      if (el.getBoundingClientRect().top <= window.innerHeight * 0.6) active = i;
    }
    nodes.forEach((n, i) => {
      n.classList.toggle('active', i === active);
    });
    if (progress) progress.style.width = (active / 4 * 100) + '%';
  }

  /* ─── INTERSECTION OBSERVER (fade-up) ─── */
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  document.querySelectorAll('.fade-up').forEach(el => io.observe(el));

  /* ─── COUNTER ANIMATION ─── */
  function animateCounter(el, target, duration) {
    const start    = performance.now();
    const isLarge  = target > 999;
    const suffix   = isLarge && target === 16000 ? '+' : (target === 365 ? '' : '');
    function easeOut(t) { return 1 - Math.pow(1 - t, 3); }
    function step(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const value = Math.round(easeOut(progress) * target);
      el.textContent = value.toLocaleString() + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.dataset.target, 10);
        animateCounter(entry.target, target, 2000);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.stat-num[data-target]').forEach(el => counterObserver.observe(el));

  /* ─── CARD TILT EFFECT ─── */
  document.querySelectorAll('.viz-card, .value-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const cx   = rect.left + rect.width  / 2;
      const cy   = rect.top  + rect.height / 2;
      const dx   = (e.clientX - cx) / (rect.width  / 2);
      const dy   = (e.clientY - cy) / (rect.height / 2);
      const rx   = -dy * 8;
      const ry   =  dx * 8;
      card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-8px) scale(1.02)`;
      card.style.transition = 'transform 0.05s linear';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.5s cubic-bezier(0.34,1.56,0.64,1)';
    });
  });

  /* ─── HAMBURGER MENU ─── */
  const hamburger = document.getElementById('hamburger');
  let mobileMenu  = null;

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      if (!mobileMenu) {
        mobileMenu = document.createElement('nav');
        mobileMenu.className = 'nav-mobile-menu';
        mobileMenu.innerHTML = `
          <a href="#hero">Home</a>
          <a href="#stage-1">Stage 1 — Junior Guardian</a>
          <a href="#stage-2">Stage 2 — Mission Specialist</a>
          <a href="#stage-3">Stage 3 — Team Commander</a>
          <a href="#stage-4">Stage 4 — Strategic Visionary</a>
          <a href="#stage-5">Stage 5 — All-Around Leader</a>
          <a href="#begin">Begin Journey</a>
        `;
        document.getElementById('navbar').after(mobileMenu);
        mobileMenu.querySelectorAll('a').forEach(a => {
          a.addEventListener('click', () => {
            mobileMenu.classList.remove('open');
            hamburger.classList.remove('active');
          });
        });
      }
      const open = mobileMenu.classList.toggle('open');
      hamburger.classList.toggle('active', open);
      const spans = hamburger.querySelectorAll('span');
      if (open) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity   = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
      }
    });
  }

  /* ─── SMOOTH SCROLL for anchor links ─── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ─── INITIAL TRIGGER ─── */
  onScroll();
  updateProgress();
  updateJourneyNodes();
  updateTimelineHighlight();

  /* ─── SCROLL-TRIGGERED SECTION ACCENT ─── */
  const stageSections = document.querySelectorAll('.stage-section');
  const stageObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  }, { threshold: 0.2 });
  stageSections.forEach(s => stageObserver.observe(s));

  /* ─── SCROLL REVEAL for value cards stagger ─── */
  const valueCards = document.querySelectorAll('.value-card');
  const vcObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const idx = parseInt(entry.target.dataset.index || 0);
        setTimeout(() => {
          entry.target.style.opacity  = '1';
          entry.target.style.transform = 'translateY(0)';
        }, idx * 100);
        vcObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  valueCards.forEach(card => {
    card.style.opacity   = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    vcObserver.observe(card);
  });

  /* ─── GALAXY ARM ROTATION FIX ─── */
  const arms = document.querySelectorAll('.galaxy-arm');
  if (arms.length) {
    arms[0].style.setProperty('--start-angle', '0deg');
    arms[1].style.setProperty('--start-angle', '120deg');
    arms[2].style.setProperty('--start-angle', '240deg');
  }

  console.log('%c🚀 USSF Guardian Leadership Journey Loaded', 'color:#00d4ff;font-size:14px;font-weight:bold;');

})();
