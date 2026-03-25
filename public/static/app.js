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
  for (let i = 1; i <= 4; i++) buildParticles(`particles${i}`, 25);

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
  const stageIds = ['hero', 'chapter-1', 'chapter-2', 'chapter-3', 'chapter-4'];
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
    for (let i = 1; i <= 4; i++) {
      const el = document.getElementById('chapter-' + i);
      if (!el) continue;
      if (el.getBoundingClientRect().top <= window.innerHeight * 0.6) active = i;
    }
    nodes.forEach((n, i) => {
      n.classList.toggle('active', i === active);
    });
    if (progress) progress.style.width = (active / 3 * 100) + '%';
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
          <a href="#chapter-1">01 — Foundations</a>
          <a href="#chapter-2">02 — The Crucible</a>
          <a href="#chapter-3">03 — Who I Am Now</a>
          <a href="#chapter-4">04 — The North Star</a>
          <a href="#values">Values</a>
          <a href="#future">The Future</a>
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

  /* ══════════════════════════════════════════════════════════
     COMMANDER'S CALL — LEADERSHIP DECISION GAME
     5 scenario-based rounds, trait scoring, animated results
     ══════════════════════════════════════════════════════════ */
  (function initLeadershipGame() {

    // ── Scenario data ──────────────────────────────────────────
    const SCENARIOS = [
      {
        tag: 'SCENARIO 1 · FIRST WEEK',
        title: 'Day One Authority',
        text: 'You just took over as the new team lead. Your most experienced operator, SrA Torres, immediately challenges one of your decisions in front of the whole team — loudly. Everyone goes quiet and looks at you.',
        choices: [
          { letter: 'A', text: 'Shut it down immediately. Pull rank and tell Torres to follow orders or face consequences.', score: 0, tier: 'miss' },
          { letter: 'B', text: 'Acknowledge the challenge calmly in front of the team: "Good point, Torres. Let\'s discuss this after the brief — I want to hear your perspective."', score: 20, tier: 'correct' },
          { letter: 'C', text: 'Ignore the comment and keep talking. Don\'t give it air time.', score: 5, tier: 'partial' },
          { letter: 'D', text: 'Agree with Torres publicly and change your decision on the spot.', score: 5, tier: 'partial' }
        ],
        feedbacks: {
          correct: { icon: '🎯', result: 'Strong Call', text: 'Composure in front of the team. You acknowledged the challenge without backing down or escalating. That earns respect — not fear.', trait: '+ COMPOSURE EARNED' },
          partial: { icon: '⚠️', result: 'Mixed Signal', text: 'Avoidance or immediate capitulation sends a confusing signal to the team. Leaders who don\'t respond get tested harder next time.', trait: '~ COMPOSURE DEVELOPING' },
          miss:    { icon: '❌', result: 'Authority Trap', text: 'Rank gives you authority. It doesn\'t earn you trust. Shutting it down with power creates compliance — not loyalty.', trait: '– COMPOSURE MISSED' }
        }
      },
      {
        tag: 'SCENARIO 2 · UNDER PRESSURE',
        title: 'The System Is Down',
        text: 'It\'s 0200. A critical mission system just went offline. Your team is panicking, leadership is calling, and you don\'t have a fix yet. What do you do first?',
        choices: [
          { letter: 'A', text: 'Tell leadership everything you know — including that you don\'t have an answer yet — then assign clear roles to your team.', score: 20, tier: 'correct' },
          { letter: 'B', text: 'Work the problem in silence. Don\'t update anyone until you have a solution.', score: 0, tier: 'miss' },
          { letter: 'C', text: 'Delegate everything to your best tech and wait for them to fix it.', score: 5, tier: 'partial' },
          { letter: 'D', text: 'Call for help from another flight before assessing what you already have.', score: 8, tier: 'partial' }
        ],
        feedbacks: {
          correct: { icon: '🎯', result: 'Calm Command', text: 'Honest updates and clear role assignment during a crisis is textbook calm-under-pressure leadership. You organized the chaos.', trait: '+ CLARITY EARNED' },
          partial: { icon: '⚠️', result: 'Partial Response', text: 'Delegation and outside help have their place — but leaders who disappear during a crisis lose the team\'s trust fast.', trait: '~ CLARITY DEVELOPING' },
          miss:    { icon: '❌', result: 'Silence Is Costly', text: 'Going dark during an incident lets panic fill the vacuum. Leadership is most visible in what you do when nothing is certain.', trait: '– CLARITY MISSED' }
        }
      },
      {
        tag: 'SCENARIO 3 · DEVELOPING PEOPLE',
        title: 'The Junior Airman',
        text: 'A1C Rivera keeps making the same mistake on reports — for the third time this week. You\'ve already corrected it twice. Your supervisor is asking about Rivera\'s progress.',
        choices: [
          { letter: 'A', text: 'Write Rivera up. Three strikes — it\'s a discipline issue now.', score: 0, tier: 'miss' },
          { letter: 'B', text: 'Sit down with Rivera, ask what\'s going on, explain the "why" behind the correct process, and create a simple check before submission.', score: 20, tier: 'correct' },
          { letter: 'C', text: 'Start fixing Rivera\'s reports yourself to keep the supervisor happy.', score: 2, tier: 'miss' },
          { letter: 'D', text: 'Assign a peer to review Rivera\'s work before it comes to you.', score: 10, tier: 'partial' }
        ],
        feedbacks: {
          correct: { icon: '🎯', result: 'People Developer', text: 'You taught the why, not just the what — and created a system. That\'s the difference between managing a task and developing a person.', trait: '+ GROWTH EARNED' },
          partial: { icon: '⚠️', result: 'Decent Workaround', text: 'Peer review helps — but it doesn\'t build Rivera\'s capability. You\'ve created a check, not a leader.', trait: '~ GROWTH DEVELOPING' },
          miss:    { icon: '❌', result: 'Missed the Root', text: 'Discipline without understanding, or absorbing someone\'s mistakes yourself — both skip the real question: does Rivera know WHY?', trait: '– GROWTH MISSED' }
        }
      },
      {
        tag: 'SCENARIO 4 · STANDARDS VS. TEMPO',
        title: 'The Pushback',
        text: 'You need to implement a new cybersecurity control — patching a critical system. The mission owner says the timing is impossible and pushes back hard. Leadership is watching.',
        choices: [
          { letter: 'A', text: 'Back off. Mission tempo wins. You\'ll revisit next month.', score: 0, tier: 'miss' },
          { letter: 'B', text: 'Force the patch immediately. The standard is the standard.', score: 5, tier: 'partial' },
          { letter: 'C', text: 'Translate the cyber risk into mission terms, propose a risk-based timeline, and negotiate a window that protects both the standard and the operation.', score: 20, tier: 'correct' },
          { letter: 'D', text: 'Escalate to your commander and let leadership decide.', score: 8, tier: 'partial' }
        ],
        feedbacks: {
          correct: { icon: '🎯', result: 'Bridge Builder', text: 'You held the standard without breaking the relationship. Translating risk into mission language — that\'s how trust is built across the technical-operational gap.', trait: '+ TRANSLATION EARNED' },
          partial: { icon: '⚠️', result: 'One-Dimensional', text: 'Rigid enforcement or full deferral both miss the point. A good leader negotiates outcomes, not rules.', trait: '~ TRANSLATION DEVELOPING' },
          miss:    { icon: '❌', result: 'Standard Abandoned', text: 'Backing off sets a precedent: the standard is optional when people push back. That\'s how mission risk quietly compounds.', trait: '– TRANSLATION MISSED' }
        }
      },
      {
        tag: 'SCENARIO 5 · INTENT VS. CONTROL',
        title: 'Let Them Lead',
        text: 'Your team has a complex task due at 1600. You know exactly how you\'d do it. SSgt Chen has a different approach — it\'s unorthodox but not wrong. Do you intervene?',
        choices: [
          { letter: 'A', text: 'Step in and redirect Chen to your method. You\'re responsible for the outcome.', score: 0, tier: 'miss' },
          { letter: 'B', text: 'Let Chen run it. Set a clear check-in at 1400 and stay available — but don\'t hover.', score: 20, tier: 'correct' },
          { letter: 'C', text: 'Give Chen the task but quietly assign someone to shadow and correct if needed.', score: 5, tier: 'partial' },
          { letter: 'D', text: 'Ask Chen to walk you through the plan first, then approve it formally before proceeding.', score: 12, tier: 'partial' }
        ],
        feedbacks: {
          correct: { icon: '🎯', result: 'Empowering Leader', text: 'You set intent, created a check-in, and trusted your team. That\'s how leaders grow other leaders — and how you earn a team that doesn\'t need you to function.', trait: '+ EMPOWERMENT EARNED' },
          partial: { icon: '⚠️', result: 'Cautious Trust', text: 'Formal approval and shadow oversight signal distrust. You\'re still controlling the outcome — just at arm\'s length.', trait: '~ EMPOWERMENT DEVELOPING' },
          miss:    { icon: '❌', result: 'Control Override', text: 'Redirecting to your method shuts down ownership and stifles growth. The best leaders step back — especially when they\'re right.', trait: '– EMPOWERMENT MISSED' }
        }
      }
    ];

    const TRAITS = [
      { key: 'composure',    icon: 'fas fa-water',        label: 'Composure' },
      { key: 'clarity',      icon: 'fas fa-bullseye',     label: 'Clarity' },
      { key: 'growth',       icon: 'fas fa-seedling',     label: 'Growth' },
      { key: 'translation',  icon: 'fas fa-exchange-alt', label: 'Translation' },
      { key: 'empowerment',  icon: 'fas fa-unlock',       label: 'Empowerment' }
    ];

    const RESULT_TIERS = [
      { min: 90, title: '⭐ Outstanding Commander', desc: 'You led with composure, clarity, and trust. These aren\'t just right answers — they\'re the habits of a leader who\'s done the hard work.' },
      { min: 70, title: '🎖 Solid Leader', desc: 'Strong instincts, a few rough edges. You default to the right values under pressure — now build the consistency.' },
      { min: 45, title: '📋 Learning Leader', desc: 'You\'re developing. Some calls landed, others didn\'t — but awareness is step one. Great leaders are built, not born.' },
      { min: 0,  title: '🔁 Starting Point', desc: 'Every great leader has made these mistakes. The fact you\'re in this game means you\'re asking the right questions.' }
    ];

    // ── State ──────────────────────────────────────────────────
    let currentRound = 0;
    let totalScore   = 0;
    let traitScores  = { composure: 0, clarity: 0, growth: 0, translation: 0, empowerment: 0 };
    const traitKeys  = ['composure', 'clarity', 'growth', 'translation', 'empowerment'];

    // ── DOM refs ───────────────────────────────────────────────
    const gameScore       = document.getElementById('gameScore');
    const gameProgressFill= document.getElementById('gameProgressFill');
    const gameStageLabel  = document.getElementById('gameStageLabel');
    const screenStart     = document.getElementById('gameStart');
    const screenPlay      = document.getElementById('gamePlay');
    const screenEnd       = document.getElementById('gameEnd');
    const scenarioTag     = document.getElementById('gameScenarioTag');
    const scenarioText    = document.getElementById('gameScenarioText');
    const choicesWrap     = document.getElementById('gameChoices');
    const feedbackPanel   = document.getElementById('gameFeedback');
    const feedbackIcon    = document.getElementById('feedbackIcon');
    const feedbackResult  = document.getElementById('feedbackResult');
    const feedbackText    = document.getElementById('feedbackText');
    const feedbackTrait   = document.getElementById('feedbackTrait');
    const btnStart        = document.getElementById('gameBtnStart');
    const btnNext         = document.getElementById('gameBtnNext');
    const resultScore     = document.getElementById('resultFinalScore');
    const resultTitle     = document.getElementById('gameResultTitle');
    const resultDesc      = document.getElementById('gameResultDesc');
    const traitSummary    = document.getElementById('gameTraitSummary');
    const btnRestart      = document.getElementById('gameBtnRestart');

    if (!btnStart) return; // game not on page

    // ── Helpers ────────────────────────────────────────────────
    function showScreen(name) {
      [screenStart, screenPlay, screenEnd].forEach(s => s.classList.add('hidden'));
      if (name === 'start')  screenStart.classList.remove('hidden');
      if (name === 'play')   screenPlay.classList.remove('hidden');
      if (name === 'end')    screenEnd.classList.remove('hidden');
    }

    function updateHeader() {
      const pct = (currentRound / SCENARIOS.length) * 100;
      gameProgressFill.style.width = pct + '%';
      gameStageLabel.textContent = currentRound < SCENARIOS.length
        ? `Round ${currentRound + 1} of ${SCENARIOS.length}`
        : 'Complete';
    }

    function bumpScore(pts) {
      totalScore += pts;
      gameScore.textContent = totalScore;
      gameScore.classList.remove('bumping');
      void gameScore.offsetWidth; // reflow
      gameScore.classList.add('bumping');
      setTimeout(() => gameScore.classList.remove('bumping'), 520);
    }

    // ── Load a round ────────────────────────────────────────────
    function loadRound() {
      const s = SCENARIOS[currentRound];
      scenarioTag.textContent = s.tag;
      scenarioText.innerHTML  = `<strong>${s.title}</strong>${s.text}`;
      choicesWrap.innerHTML   = '';
      feedbackPanel.classList.add('hidden');

      s.choices.forEach((choice, i) => {
        const btn = document.createElement('button');
        btn.className = 'game-choice-btn';
        btn.innerHTML = `<span class="choice-letter">${choice.letter}</span><span>${choice.text}</span>`;
        btn.addEventListener('click', () => handleChoice(choice, btn, s));
        choicesWrap.appendChild(btn);
      });

      updateHeader();
      showScreen('play');
    }

    // ── Handle a choice ─────────────────────────────────────────
    function handleChoice(choice, clickedBtn, scenario) {
      // Disable all buttons
      choicesWrap.querySelectorAll('.game-choice-btn').forEach(b => {
        b.disabled = true;
        const tier = SCENARIOS[currentRound].choices.find(c => b.querySelector('.choice-letter').textContent === c.letter)?.tier;
        if (tier === 'correct') b.classList.add('correct');
        else if (tier === 'partial') b.classList.add('partial');
        else b.classList.add('wrong');
      });

      // Score
      const pts = choice.score;
      if (pts > 0) bumpScore(pts);

      // Track trait
      if (currentRound < traitKeys.length) traitScores[traitKeys[currentRound]] = pts;

      // Feedback
      const fb = scenario.feedbacks[choice.tier];
      feedbackIcon.textContent   = fb.icon;
      feedbackResult.textContent = fb.result;
      feedbackResult.className   = 'feedback-result ' + (choice.tier === 'correct' ? 'good' : choice.tier === 'partial' ? 'ok' : 'miss');
      feedbackText.textContent   = fb.text;
      feedbackTrait.textContent  = fb.trait;
      feedbackTrait.className    = 'feedback-trait ' + (choice.tier === 'correct' ? 'good' : choice.tier === 'partial' ? 'ok' : 'miss');
      feedbackPanel.classList.remove('hidden');
    }

    // ── Show end screen ─────────────────────────────────────────
    function showResults() {
      // Compute percentage (max 100 pts across 5 rounds)
      const pct = Math.round((totalScore / 100) * 100);
      const tier = RESULT_TIERS.find(t => pct >= t.min);

      resultScore.textContent = pct;
      resultTitle.textContent = tier.title;
      resultDesc.textContent  = tier.desc;

      // Update conic ring via inline style property
      screenEnd.querySelector('.game-result-ring').style.setProperty('--pct', pct + '%');

      // Trait chips
      traitSummary.innerHTML = TRAITS.map((t, i) => {
        const sc = traitScores[t.key];
        const chipClass = sc >= 20 ? 'earned' : sc >= 8 ? 'partial' : 'missed';
        const checkIcon = sc >= 20 ? '✓' : sc >= 8 ? '~' : '○';
        return `<div class="trait-chip ${chipClass}"><i class="${t.icon}"></i>${t.label} ${checkIcon}</div>`;
      }).join('');

      // Update progress bar to 100%
      gameProgressFill.style.width = '100%';
      gameStageLabel.textContent = 'Complete';

      showScreen('end');
    }

    // ── Event listeners ─────────────────────────────────────────
    btnStart.addEventListener('click', () => {
      currentRound = 0;
      totalScore   = 0;
      traitScores  = { composure: 0, clarity: 0, growth: 0, translation: 0, empowerment: 0 };
      gameScore.textContent = '0';
      gameProgressFill.style.width = '0%';
      loadRound();
    });

    btnNext.addEventListener('click', () => {
      currentRound++;
      if (currentRound < SCENARIOS.length) {
        loadRound();
      } else {
        showResults();
      }
    });

    btnRestart.addEventListener('click', () => {
      currentRound = 0;
      totalScore   = 0;
      traitScores  = { composure: 0, clarity: 0, growth: 0, translation: 0, empowerment: 0 };
      gameScore.textContent = '0';
      gameProgressFill.style.width = '0%';
      gameStageLabel.textContent = 'Round 1 of 5';
      showScreen('start');
    });

  })();
  /* ── end game ── */

  console.log('%c🚀 TSgt Evelyn Davis — Leadership Journey Loaded', 'color:#00d4ff;font-size:14px;font-weight:bold;');

})();
