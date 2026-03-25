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
     COMMANDER'S CALL — LEADERSHIP DECISION GAME (FUNNY ED.)
     5 chaotic scenarios, roast-mode feedback, spicy results
     ══════════════════════════════════════════════════════════ */
  (function initLeadershipGame() {

    // ── Scenario data ──────────────────────────────────────────
    const SCENARIOS = [
      {
        tag: '🚀 SCENARIO 1 · DAY ONE CHAOS',
        title: 'Oh No. They\'re Looking at You.',
        text: 'It\'s your FIRST DAY as team lead. You walk in with your coffee, ready to project maximum confidence. SrA Torres immediately challenges your decision in front of everyone — loudly, dramatically, with hand gestures. The whole room goes dead silent. A tumbleweed rolls by. Somewhere, a phone rings and nobody answers it. Everyone is staring at you.',
        choices: [
          { letter: 'A', text: '😤 Slam your coffee down. "Torres. My office. NOW." You point aggressively at a door. (It\'s a supply closet.)', score: 0, tier: 'miss' },
          { letter: 'B', text: '😎 Stay totally calm: "Good point, Torres. Let\'s talk after the brief — I genuinely want to hear it." You then take a long sip of coffee.', score: 20, tier: 'correct' },
          { letter: 'C', text: '🙈 Pretend you didn\'t hear it. Start talking louder. Aggressively point at a slide.', score: 5, tier: 'partial' },
          { letter: 'D', text: '🏳️ "You know what Torres, you\'re totally right, let\'s do it your way." Immediately hand over the briefing clicker.', score: 3, tier: 'partial' }
        ],
        feedbacks: {
          correct: { icon: '😏', result: 'Smooth Operator', text: 'Calm under fire. You acknowledged Torres without folding or going full drill sergeant. The team saw a leader. Torres is now lowkey impressed.', trait: '+ COMPOSURE UNLOCKED 🧊' },
          partial: { icon: '😬', result: 'Yikes, But Okay', text: 'Louder slides won\'t fix a room full of raised eyebrows. And Torres is definitely going to try again tomorrow. Good luck.', trait: '~ COMPOSURE: WARMING UP' },
          miss:    { icon: '💀', result: 'Supply Closet Incident', text: 'You pointed dramatically at a supply closet and it will be your entire personality for the next six months. "My office, NOW" said the person whose office was a broom.', trait: '– COMPOSURE: MIA 🧹' }
        }
      },
      {
        tag: '💻 SCENARIO 2 · IT\'S 0200',
        title: 'Everything Is On Fire (Figuratively)',
        text: 'It\'s 2am. The mission system just crashed. Your team is doing that thing where they all stare at screens really hard as if that fixes things. Your commander is blowing up your phone. You have no fix yet, questionable coffee, and someone left a half-eaten burrito on the server rack. What do you do?',
        choices: [
          { letter: 'A', text: '📣 Honest update to leadership: "We\'re on it, no fix yet, here\'s what we know." Then assign clear roles to the team. Eat nobody\'s burrito.', score: 20, tier: 'correct' },
          { letter: 'B', text: '🔕 Go completely dark. Silence the phone. You will emerge victorious or not at all. This is your destiny now.', score: 0, tier: 'miss' },
          { letter: 'C', text: '🛌 Delegate everything to your best tech, then sit in the corner pretending to "monitor the situation."', score: 5, tier: 'partial' },
          { letter: 'D', text: '🍔 Pick up the mystery burrito. Eat it. Maybe the calories will inspire a solution.', score: 0, tier: 'miss' }
        ],
        feedbacks: {
          correct: { icon: '🎯', result: 'Crisis Commander', text: 'Honest comms + clear roles = you organized the chaos. The team actually knew what to do. Leadership respected the update. The burrito remained untouched (wise).', trait: '+ CLARITY EARNED 🔦' },
          partial: { icon: '😅', result: '"Monitoring" Intensifies', text: 'Your best tech fixed it. They deserve your job. You sat in a corner looking pensive. Technically leadership but spiritually a speed bump.', trait: '~ CLARITY: FLICKERING' },
          miss:    { icon: '🔥', result: 'Chaos Enthusiast', text: 'Option B: You went dark for 45 minutes and everyone assumed you\'d quit. Option D: The burrito gave you food poisoning. Both choices: legendary, not recommended.', trait: '– CLARITY: OFFLINE 📵' }
        }
      },
      {
        tag: '📋 SCENARIO 3 · THE REPORT THAT HAUNTS YOU',
        title: 'Third Time\'s the Alarm',
        text: 'A1C Rivera has made the SAME mistake on their report three times this week. You\'ve corrected it twice. The form is not complicated. It has four fields. Rivera somehow manages to get all four wrong in different combinations each time, like a leadership puzzle generated specifically to test you. Your supervisor is asking "how\'s Rivera doing?" with the energy of someone who already knows.',
        choices: [
          { letter: 'A', text: '⚖️ Write them up immediately. Three strikes, full disciplinary action. Drop the paperwork dramatically.', score: 0, tier: 'miss' },
          { letter: 'B', text: '🧑‍🏫 Sit down with Rivera, ask what\'s actually going on, explain the WHY behind each field, and build a simple checklist together.', score: 20, tier: 'correct' },
          { letter: 'C', text: '🤫 Quietly fix all of Rivera\'s reports yourself forever. You will carry this burden in silence. You are a martyr.', score: 0, tier: 'miss' },
          { letter: 'D', text: '👥 Assign a peer to review Rivera\'s work before it reaches you. Buy yourself some peace.', score: 10, tier: 'partial' }
        ],
        feedbacks: {
          correct: { icon: '🌱', result: 'Developer of Humans', text: 'You taught the WHY. Rivera now understands the form and probably feels seen. The checklist is a small act of genius. This is what growing people looks like.', trait: '+ GROWTH EARNED 🌱' },
          partial: { icon: '🔄', result: 'Elegant Workaround', text: 'The peer review buys time but doesn\'t fix Rivera. You\'ve added a layer of bureaucracy where a conversation was needed. Good band-aid though.', trait: '~ GROWTH: POSSIBLE' },
          miss:    { icon: '😭', result: 'Both Bad', text: 'Option A: Rivera gets written up for a FORM. That\'s going to come up in therapy someday. Option C: You are now Rivera\'s unpaid report secretary until retirement. Congratulations?', trait: '– GROWTH: STUNTED 🪨' }
        }
      },
      {
        tag: '🛡️ SCENARIO 4 · THE IMMOVABLE COLONEL',
        title: 'Cyber vs. Vibes',
        text: 'You need to patch a critical system. The mission owner — let\'s call him Col. "We\'ve Always Done It This Way" — tells you the timing is "operationally impossible" and waves his hand dismissively like he\'s shooing a fly. He has strong opinions and weak cyber knowledge. Leadership is watching. You are holding a risk report that would give IT people nightmares.',
        choices: [
          { letter: 'A', text: '🏃 Back off. Mission tempo wins. You\'ll revisit next month. Or maybe the month after. Or when something breaks.', score: 0, tier: 'miss' },
          { letter: 'B', text: '🚨 Force the patch NOW. Rules are rules. You send the patch email with a high-priority flag and three exclamation points.', score: 5, tier: 'partial' },
          { letter: 'C', text: '🤝 Translate the cyber risk into mission impact, propose a risk-tiered timeline, and negotiate a window that protects both. No exclamation points.', score: 20, tier: 'correct' },
          { letter: 'D', text: '📤 Forward the whole situation to your commander with a subject line of "your problem now :)"', score: 8, tier: 'partial' }
        ],
        feedbacks: {
          correct: { icon: '🌉', result: 'Bridge Builder Supreme', text: 'You spoke mission, not tech. The Colonel understood the risk without needing a CompTIA cert. You got the window. The patch happened. Nobody got hacked. Legendary.', trait: '+ TRANSLATION MASTERED 🌉' },
          partial: { icon: '😤', result: 'Technically Correct', text: 'Option B: Three exclamation points. Three. You\'re that person now. Option D: Your commander got the email and is now questioning your growth potential. Both moves: bold, not great.', trait: '~ TRANSLATION: ROUGH' },
          miss:    { icon: '🕳️', result: 'See You Next Breach', text: 'You backed off and now the unpatched system is just vibing out there like a welcome mat for adversaries. "We\'ll revisit" is just procrastination with a military accent.', trait: '– TRANSLATION: LOST IN JARGON 📡' }
        }
      },
      {
        tag: '🎮 SCENARIO 5 · LET GO OR HOVER?',
        title: 'Trust Fall (Leadership Edition)',
        text: 'Big task. Due at 1600. SSgt Chen has a plan — it\'s unorthodox, a little chaotic, but not wrong. Your brain is screaming "DO IT MY WAY" because you know exactly how you\'d do it and your way is obviously better (you think). Chen is looking at you waiting for a response. The team is watching. A clock ticks ominously somewhere.',
        choices: [
          { letter: 'A', text: '🕹️ Override Chen immediately. "Here\'s how WE\'re doing this." You then explain your method for 12 uninterrupted minutes.', score: 0, tier: 'miss' },
          { letter: 'B', text: '✌️ "Run it, Chen. Check in with me at 1400, I\'m here if you need me." You then visibly resist the urge to hover.', score: 20, tier: 'correct' },
          { letter: 'C', text: '🕵️ Approve it but secretly assign A1C Rivera to shadow Chen and report back. You\'re basically a spy now.', score: 5, tier: 'partial' },
          { letter: 'D', text: '📝 Ask Chen to write a formal 3-page plan, get it approved, then brief it to the flight, then do a dry run. Just to be safe.', score: 3, tier: 'partial' }
        ],
        feedbacks: {
          correct: { icon: '🦅', result: 'Eagles Don\'t Micromanage', text: 'You set intent, created a check-in, and got out of the way. Chen crushed it. The team knows you trust them. You grew a leader today. Also you didn\'t say "but here\'s what I would do" even ONCE. Incredible.', trait: '+ EMPOWERMENT MAXED 🔓' },
          partial: { icon: '😂', result: 'Trust Issues (Relatable)', text: 'Option C: You made Rivera a spy. Rivera told Chen immediately. Option D: By the time the dry run is done, it\'s 1600 and nothing got done. You micromanaged the planning of the planning.', trait: '~ EMPOWERMENT: IN PROGRESS' },
          miss:    { icon: '🎙️', result: 'The 12-Minute Monologue', text: 'You explained your method for 12 minutes. Nobody clapped. Chen nodded politely but made eye contact with the exit. The team now does whatever you say and nothing more. Congratulations on your very efficient robot army.', trait: '– EMPOWERMENT: BLOCKED 🧱' }
        }
      }
    ];

    const TRAITS = [
      { key: 'composure',    icon: 'fas fa-snowflake',    label: 'Composure' },
      { key: 'clarity',      icon: 'fas fa-bullseye',     label: 'Clarity' },
      { key: 'growth',       icon: 'fas fa-seedling',     label: 'Growth' },
      { key: 'translation',  icon: 'fas fa-language',     label: 'Translation' },
      { key: 'empowerment',  icon: 'fas fa-unlock',       label: 'Empowerment' }
    ];

    const RESULT_TIERS = [
      { min: 90, title: '🏆 Certified Space Force Legend', desc: 'Perfect score? You didn\'t just pass — you flourished. The supply closet is NOT your office, the burrito stayed on the rack, Rivera has a checklist, and Chen crushed the task. Somebody give this person a satellite.' },
      { min: 70, title: '🎖️ Pretty Solid, Actually', desc: 'Strong instincts, occasional chaos. You know what leadership looks like — you just need to stop fighting the urge to hover, explain for 12 minutes, or forward emails with ":)" in the subject line.' },
      { min: 45, title: '📋 Work In Progress (We All Are)', desc: 'Some great calls, some questionable ones. The fact that you didn\'t eat the mystery burrito suggests you have potential. Keep going. Leadership is a practice, not a personality trait.' },
      { min: 20, title: '😬 Bless Your Heart, Guardian', desc: 'You may have pointed at a supply closet, gone completely dark at 0200, and written Rivera up for a 4-field form. The good news: you survived. The better news: awareness is the first step.' },
      { min: 0,  title: '🧹 The Supply Closet Awaits', desc: 'Every single choice was a learning opportunity. All five of them. That\'s actually impressive in a "we need to talk" kind of way. The good news: you\'re already asking the right questions by playing this game.' }
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
      const tier = RESULT_TIERS.find(t => pct >= t.min) || RESULT_TIERS[RESULT_TIERS.length - 1];

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
