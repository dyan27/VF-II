import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'
import { renderer } from './renderer'

const app = new Hono()

// Serve static assets
app.use('/static/*', serveStatic({ root: './' }))

app.use(renderer)

app.get('/', (c) => {
  return c.render(
    <div id="root">
      {/* ── NAV ── */}
      <nav id="navbar">
        <div class="nav-inner">
          <div class="nav-logo">
            <svg class="ussf-emblem" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="24" cy="24" r="22" stroke="#00d4ff" stroke-width="1.5" fill="none" opacity="0.6"/>
              <circle cx="24" cy="24" r="14" stroke="#00d4ff" stroke-width="1" fill="none" opacity="0.4"/>
              <ellipse cx="24" cy="24" rx="22" ry="8" stroke="#00d4ff" stroke-width="1" fill="none" opacity="0.5" transform="rotate(-20 24 24)"/>
              <circle cx="24" cy="24" r="3" fill="#00d4ff"/>
              <line x1="24" y1="2" x2="24" y2="46" stroke="#00d4ff" stroke-width="0.5" opacity="0.3"/>
              <line x1="2" y1="24" x2="46" y2="24" stroke="#00d4ff" stroke-width="0.5" opacity="0.3"/>
            </svg>
            <span class="nav-title">USSF GUARDIAN JOURNEY</span>
          </div>
          <ul class="nav-links">
            <li><a href="#hero">Home</a></li>
            <li><a href="#stage-1">Origins</a></li>
            <li><a href="#stage-2">Mission</a></li>
            <li><a href="#stage-3">Command</a></li>
            <li><a href="#stage-4">Vision</a></li>
            <li><a href="#stage-5">Legacy</a></li>
            <li><a href="#begin" class="nav-cta">Begin Journey</a></li>
          </ul>
          <button class="hamburger" id="hamburger" aria-label="Menu">
            <span></span><span></span><span></span>
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section id="hero" class="section hero-section">
        <div class="star-field" id="starField"></div>
        <div class="nebula-bg"></div>
        <div class="mouse-layer" id="mouseLayer">
          <div class="mouse-orb orb-1" data-depth="0.04"></div>
          <div class="mouse-orb orb-2" data-depth="0.07"></div>
          <div class="mouse-orb orb-3" data-depth="0.02"></div>
          <div class="mouse-orb orb-4" data-depth="0.09"></div>
          <div class="mouse-orb orb-5" data-depth="0.05"></div>
        </div>
        <div class="hero-content" id="heroContent">
          <div class="hero-eyebrow fade-up">UNITED STATES SPACE FORCE</div>
          <h1 class="hero-headline fade-up delay-1">
            From Guardian<br/>
            <span class="gradient-text">to Leader.</span>
          </h1>
          <p class="hero-sub fade-up delay-2">
            An immersive journey through the five stages of Space Force leadership development — forging the guardians who will protect humanity's future among the stars.
          </p>
          <div class="hero-cta-row fade-up delay-3">
            <a href="#stage-1" class="btn-primary">Begin the Journey</a>
            <a href="#overview" class="btn-ghost">
              <i class="fas fa-play-circle"></i> Watch Overview
            </a>
          </div>
          <div class="hero-scroll-hint fade-up delay-4">
            <span>Scroll to explore</span>
            <div class="scroll-arrow"></div>
          </div>
        </div>
        <div class="hero-planet-wrap">
          <div class="hero-planet" id="heroPlanet">
            <div class="planet-core"></div>
            <div class="planet-ring ring-1"></div>
            <div class="planet-ring ring-2"></div>
            <div class="planet-ring ring-3"></div>
            <div class="planet-glow"></div>
            <div class="planet-atmosphere"></div>
          </div>
        </div>
        <div class="hero-stats fade-up delay-4">
          <div class="stat-item">
            <span class="stat-num" data-target="5">0</span>
            <span class="stat-label">Leadership Stages</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <span class="stat-num" data-target="16000">0</span>
            <span class="stat-label">Active Guardians</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <span class="stat-num" data-target="365">0</span>
            <span class="stat-label">Days a Year, 24/7</span>
          </div>
        </div>
      </section>

      {/* ── OVERVIEW ── */}
      <section id="overview" class="section overview-section">
        <div class="section-inner">
          <div class="overline fade-up">THE FRAMEWORK</div>
          <h2 class="section-title fade-up delay-1">Five Stages.<br/>One Extraordinary Leader.</h2>
          <p class="section-body fade-up delay-2">
            The Guardian Leadership Development Framework is a deliberate, progressive journey that transforms individuals into the mission-ready, values-driven leaders the Space Force demands.
          </p>
          <div class="journey-timeline fade-up delay-3">
            <div class="timeline-track"></div>
            <div class="timeline-progress" id="timelineProgress"></div>
            <div class="timeline-nodes">
              <a href="#stage-1" class="timeline-node active" data-stage="1">
                <div class="node-dot"></div>
                <div class="node-label">
                  <span class="node-num">01</span>
                  <span class="node-name">Junior Guardian</span>
                </div>
              </a>
              <a href="#stage-2" class="timeline-node" data-stage="2">
                <div class="node-dot"></div>
                <div class="node-label">
                  <span class="node-num">02</span>
                  <span class="node-name">Mission Specialist</span>
                </div>
              </a>
              <a href="#stage-3" class="timeline-node" data-stage="3">
                <div class="node-dot"></div>
                <div class="node-label">
                  <span class="node-num">03</span>
                  <span class="node-name">Team Commander</span>
                </div>
              </a>
              <a href="#stage-4" class="timeline-node" data-stage="4">
                <div class="node-dot"></div>
                <div class="node-label">
                  <span class="node-num">04</span>
                  <span class="node-name">Strategic Visionary</span>
                </div>
              </a>
              <a href="#stage-5" class="timeline-node" data-stage="5">
                <div class="node-dot"></div>
                <div class="node-label">
                  <span class="node-num">05</span>
                  <span class="node-name">All-Around Leader</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── STAGE 1: JUNIOR GUARDIAN ── */}
      <section id="stage-1" class="section stage-section stage-1-section" data-stage="1">
        <div class="stage-bg">
          <div class="stage-particles" id="particles1"></div>
          <div class="stage-gradient s1-gradient"></div>
        </div>
        <div class="stage-mouse-wrap">
          <div class="stage-orb s1-orb-a" data-depth="0.05"></div>
          <div class="stage-orb s1-orb-b" data-depth="0.08"></div>
        </div>
        <div class="stage-inner">
          <div class="stage-badge fade-up">
            <span class="stage-num">01</span>
            <span class="stage-tag">STAGE ONE</span>
          </div>
          <div class="stage-content-grid">
            <div class="stage-text">
              <h2 class="stage-title fade-up delay-1">Junior<br/><span class="accent-text">Guardian</span></h2>
              <p class="stage-desc fade-up delay-2">
                Every legend begins with a first step. As a Junior Guardian, you are welcomed into the ranks of the world's newest and most advanced military branch. This is where foundation is built — values forged, purpose discovered, and identity transformed.
              </p>
              <div class="stage-pillars fade-up delay-3">
                <div class="pillar-item">
                  <div class="pillar-icon"><i class="fas fa-shield-alt"></i></div>
                  <div class="pillar-text">
                    <strong>Core Values</strong>
                    <p>Character, Courage, and Commitment form the bedrock of every Guardian's identity.</p>
                  </div>
                </div>
                <div class="pillar-item">
                  <div class="pillar-icon"><i class="fas fa-compass"></i></div>
                  <div class="pillar-text">
                    <strong>Orientation</strong>
                    <p>Understand the Space Force mission, doctrine, and your role in protecting the space domain.</p>
                  </div>
                </div>
                <div class="pillar-item">
                  <div class="pillar-icon"><i class="fas fa-brain"></i></div>
                  <div class="pillar-text">
                    <strong>Self-Awareness</strong>
                    <p>Develop emotional intelligence and recognize your strengths as a new member of the team.</p>
                  </div>
                </div>
                <div class="pillar-item">
                  <div class="pillar-icon"><i class="fas fa-users"></i></div>
                  <div class="pillar-text">
                    <strong>Team Integration</strong>
                    <p>Learn the power of Guardian Cohort — a unique culture of inclusion, trust, and mutual respect.</p>
                  </div>
                </div>
              </div>
              <div class="stage-milestone fade-up delay-4">
                <div class="milestone-label">Key Milestone</div>
                <div class="milestone-text">Complete Guardian Orientation and receive your first mission assignment</div>
              </div>
            </div>
            <div class="stage-visual">
              <div class="stage-viz-wrap fade-up delay-2">
                <div class="viz-card s1-card">
                  <div class="viz-icon-ring">
                    <div class="icon-ring r1"></div>
                    <div class="icon-ring r2"></div>
                    <div class="icon-ring r3"></div>
                    <div class="central-icon"><i class="fas fa-star"></i></div>
                  </div>
                  <div class="viz-label">Junior Guardian</div>
                  <div class="viz-rank">E-1 through E-4</div>
                  <div class="viz-traits">
                    <span>Curious</span>
                    <span>Dedicated</span>
                    <span>Eager</span>
                    <span>Adaptable</span>
                  </div>
                </div>
                <div class="viz-quote">
                  <i class="fas fa-quote-left"></i>
                  <p>"A guardian is not just a rank — it is a calling to serve beyond the horizon."</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="stage-connector">
          <div class="connector-line"></div>
          <div class="connector-arrow"><i class="fas fa-chevron-down"></i></div>
        </div>
      </section>

      {/* ── STAGE 2: MISSION SPECIALIST ── */}
      <section id="stage-2" class="section stage-section stage-2-section" data-stage="2">
        <div class="stage-bg">
          <div class="stage-particles" id="particles2"></div>
          <div class="stage-gradient s2-gradient"></div>
        </div>
        <div class="stage-mouse-wrap">
          <div class="stage-orb s2-orb-a" data-depth="0.06"></div>
          <div class="stage-orb s2-orb-b" data-depth="0.03"></div>
        </div>
        <div class="stage-inner">
          <div class="stage-badge fade-up">
            <span class="stage-num">02</span>
            <span class="stage-tag">STAGE TWO</span>
          </div>
          <div class="stage-content-grid reverse">
            <div class="stage-text">
              <h2 class="stage-title fade-up delay-1">Mission<br/><span class="accent-text">Specialist</span></h2>
              <p class="stage-desc fade-up delay-2">
                Mastery of your craft is the currency of credibility. As a Mission Specialist, you deepen your technical excellence and begin influencing your immediate environment. You are no longer just following — you are becoming the expert others look to.
              </p>
              <div class="stage-pillars fade-up delay-3">
                <div class="pillar-item">
                  <div class="pillar-icon"><i class="fas fa-satellite"></i></div>
                  <div class="pillar-text">
                    <strong>Technical Mastery</strong>
                    <p>Achieve expert-level proficiency in your space domain specialty — from orbital mechanics to cyber defense.</p>
                  </div>
                </div>
                <div class="pillar-item">
                  <div class="pillar-icon"><i class="fas fa-project-diagram"></i></div>
                  <div class="pillar-text">
                    <strong>Problem Solving</strong>
                    <p>Apply critical thinking and analytical frameworks to complex, ambiguous mission challenges.</p>
                  </div>
                </div>
                <div class="pillar-item">
                  <div class="pillar-icon"><i class="fas fa-handshake"></i></div>
                  <div class="pillar-text">
                    <strong>Peer Influence</strong>
                    <p>Begin mentoring junior guardians and lead by example within your cohort.</p>
                  </div>
                </div>
                <div class="pillar-item">
                  <div class="pillar-icon"><i class="fas fa-lightbulb"></i></div>
                  <div class="pillar-text">
                    <strong>Innovation Mindset</strong>
                    <p>Embrace Space Force's culture of agility, commercial integration, and rapid capability development.</p>
                  </div>
                </div>
              </div>
              <div class="stage-milestone fade-up delay-4">
                <div class="milestone-label">Key Milestone</div>
                <div class="milestone-text">Earn your Space Force Specialty Code certification and lead your first technical brief</div>
              </div>
            </div>
            <div class="stage-visual">
              <div class="stage-viz-wrap fade-up delay-2">
                <div class="viz-card s2-card">
                  <div class="viz-icon-ring">
                    <div class="icon-ring r1"></div>
                    <div class="icon-ring r2"></div>
                    <div class="icon-ring r3"></div>
                    <div class="central-icon"><i class="fas fa-satellite-dish"></i></div>
                  </div>
                  <div class="viz-label">Mission Specialist</div>
                  <div class="viz-rank">E-5 through E-6 / O-1 through O-3</div>
                  <div class="viz-traits">
                    <span>Expert</span>
                    <span>Analytical</span>
                    <span>Influential</span>
                    <span>Innovative</span>
                  </div>
                </div>
                <div class="orbit-visual">
                  <div class="orbit-ring or1">
                    <div class="orbit-dot"></div>
                  </div>
                  <div class="orbit-ring or2">
                    <div class="orbit-dot"></div>
                  </div>
                  <div class="orbit-center"><i class="fas fa-globe"></i></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="stage-connector">
          <div class="connector-line"></div>
          <div class="connector-arrow"><i class="fas fa-chevron-down"></i></div>
        </div>
      </section>

      {/* ── STAGE 3: TEAM COMMANDER ── */}
      <section id="stage-3" class="section stage-section stage-3-section" data-stage="3">
        <div class="stage-bg">
          <div class="stage-particles" id="particles3"></div>
          <div class="stage-gradient s3-gradient"></div>
        </div>
        <div class="stage-mouse-wrap">
          <div class="stage-orb s3-orb-a" data-depth="0.07"></div>
          <div class="stage-orb s3-orb-b" data-depth="0.04"></div>
        </div>
        <div class="stage-inner">
          <div class="stage-badge fade-up">
            <span class="stage-num">03</span>
            <span class="stage-tag">STAGE THREE</span>
          </div>
          <div class="stage-content-grid">
            <div class="stage-text">
              <h2 class="stage-title fade-up delay-1">Team<br/><span class="accent-text">Commander</span></h2>
              <p class="stage-desc fade-up delay-2">
                Leadership is a responsibility, not a privilege. As a Team Commander, you carry the weight of your unit's performance, morale, and readiness. You inspire, you develop, you make the hard calls — because the mission and the people depend on you.
              </p>
              <div class="stage-pillars fade-up delay-3">
                <div class="pillar-item">
                  <div class="pillar-icon"><i class="fas fa-users-cog"></i></div>
                  <div class="pillar-text">
                    <strong>People Development</strong>
                    <p>Coach, mentor, and develop the full potential of each Guardian under your command.</p>
                  </div>
                </div>
                <div class="pillar-item">
                  <div class="pillar-icon"><i class="fas fa-tasks"></i></div>
                  <div class="pillar-text">
                    <strong>Mission Execution</strong>
                    <p>Plan, direct, and execute complex multi-domain missions with clarity and decisive action.</p>
                  </div>
                </div>
                <div class="pillar-item">
                  <div class="pillar-icon"><i class="fas fa-balance-scale"></i></div>
                  <div class="pillar-text">
                    <strong>Ethical Leadership</strong>
                    <p>Model integrity and make values-based decisions even under pressure and ambiguity.</p>
                  </div>
                </div>
                <div class="pillar-item">
                  <div class="pillar-icon"><i class="fas fa-comments"></i></div>
                  <div class="pillar-text">
                    <strong>Communication</strong>
                    <p>Master the art of clear, direct, and inspiring communication across all levels.</p>
                  </div>
                </div>
              </div>
              <div class="stage-milestone fade-up delay-4">
                <div class="milestone-label">Key Milestone</div>
                <div class="milestone-text">Assume command of a Flight/Squadron and lead your first operational mission cycle</div>
              </div>
            </div>
            <div class="stage-visual">
              <div class="stage-viz-wrap fade-up delay-2">
                <div class="viz-card s3-card">
                  <div class="viz-icon-ring">
                    <div class="icon-ring r1"></div>
                    <div class="icon-ring r2"></div>
                    <div class="icon-ring r3"></div>
                    <div class="central-icon"><i class="fas fa-crown"></i></div>
                  </div>
                  <div class="viz-label">Team Commander</div>
                  <div class="viz-rank">E-7 through E-9 / O-4 through O-5</div>
                  <div class="viz-traits">
                    <span>Decisive</span>
                    <span>Inspiring</span>
                    <span>Accountable</span>
                    <span>Empathetic</span>
                  </div>
                </div>
                <div class="command-grid">
                  <div class="cmd-node cmd-center"><i class="fas fa-user-tie"></i></div>
                  <div class="cmd-node cmd-a"><i class="fas fa-user"></i></div>
                  <div class="cmd-node cmd-b"><i class="fas fa-user"></i></div>
                  <div class="cmd-node cmd-c"><i class="fas fa-user"></i></div>
                  <div class="cmd-node cmd-d"><i class="fas fa-user"></i></div>
                  <div class="cmd-line line-a"></div>
                  <div class="cmd-line line-b"></div>
                  <div class="cmd-line line-c"></div>
                  <div class="cmd-line line-d"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="stage-connector">
          <div class="connector-line"></div>
          <div class="connector-arrow"><i class="fas fa-chevron-down"></i></div>
        </div>
      </section>

      {/* ── STAGE 4: STRATEGIC VISIONARY ── */}
      <section id="stage-4" class="section stage-section stage-4-section" data-stage="4">
        <div class="stage-bg">
          <div class="stage-particles" id="particles4"></div>
          <div class="stage-gradient s4-gradient"></div>
        </div>
        <div class="stage-mouse-wrap">
          <div class="stage-orb s4-orb-a" data-depth="0.05"></div>
          <div class="stage-orb s4-orb-b" data-depth="0.09"></div>
        </div>
        <div class="stage-inner">
          <div class="stage-badge fade-up">
            <span class="stage-num">04</span>
            <span class="stage-tag">STAGE FOUR</span>
          </div>
          <div class="stage-content-grid reverse">
            <div class="stage-text">
              <h2 class="stage-title fade-up delay-1">Strategic<br/><span class="accent-text">Visionary</span></h2>
              <p class="stage-desc fade-up delay-2">
                Strategy is leadership in four dimensions — space, time, domain, and consequence. As a Strategic Visionary, you shape the future of the Space Force. You think at the intersection of national security, technology, and geopolitics to define the battles of tomorrow.
              </p>
              <div class="stage-pillars fade-up delay-3">
                <div class="pillar-item">
                  <div class="pillar-icon"><i class="fas fa-chess"></i></div>
                  <div class="pillar-text">
                    <strong>Strategic Thinking</strong>
                    <p>Develop comprehensive strategies that span multi-domain operations and shape long-term outcomes.</p>
                  </div>
                </div>
                <div class="pillar-item">
                  <div class="pillar-icon"><i class="fas fa-globe-americas"></i></div>
                  <div class="pillar-text">
                    <strong>Joint Operations</strong>
                    <p>Lead integration across all military branches, allied nations, and commercial space partners.</p>
                  </div>
                </div>
                <div class="pillar-item">
                  <div class="pillar-icon"><i class="fas fa-landmark"></i></div>
                  <div class="pillar-text">
                    <strong>Policy Influence</strong>
                    <p>Shape national space policy, acquisition strategy, and international space agreements.</p>
                  </div>
                </div>
                <div class="pillar-item">
                  <div class="pillar-icon"><i class="fas fa-rocket"></i></div>
                  <div class="pillar-text">
                    <strong>Capability Innovation</strong>
                    <p>Champion next-generation space capabilities and drive modernization of the space enterprise.</p>
                  </div>
                </div>
              </div>
              <div class="stage-milestone fade-up delay-4">
                <div class="milestone-label">Key Milestone</div>
                <div class="milestone-text">Graduate from Senior Service School and receive your first O-6/Senior NCO command</div>
              </div>
            </div>
            <div class="stage-visual">
              <div class="stage-viz-wrap fade-up delay-2">
                <div class="viz-card s4-card">
                  <div class="viz-icon-ring">
                    <div class="icon-ring r1"></div>
                    <div class="icon-ring r2"></div>
                    <div class="icon-ring r3"></div>
                    <div class="central-icon"><i class="fas fa-telescope"></i></div>
                  </div>
                  <div class="viz-label">Strategic Visionary</div>
                  <div class="viz-rank">O-6 / CMSgt and above</div>
                  <div class="viz-traits">
                    <span>Visionary</span>
                    <span>Strategic</span>
                    <span>Transformative</span>
                    <span>Diplomatic</span>
                  </div>
                </div>
                <div class="strategy-map">
                  <div class="map-node mn-center"><i class="fas fa-star"></i></div>
                  <div class="map-ring mr1">
                    <div class="map-node mn-a"><i class="fas fa-satellite"></i></div>
                    <div class="map-node mn-b"><i class="fas fa-globe"></i></div>
                    <div class="map-node mn-c"><i class="fas fa-flag"></i></div>
                  </div>
                  <div class="map-ring mr2">
                    <div class="map-node mn-d"></div>
                    <div class="map-node mn-e"></div>
                    <div class="map-node mn-f"></div>
                    <div class="map-node mn-g"></div>
                    <div class="map-node mn-h"></div>
                    <div class="map-node mn-i"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="stage-connector">
          <div class="connector-line"></div>
          <div class="connector-arrow"><i class="fas fa-chevron-down"></i></div>
        </div>
      </section>

      {/* ── STAGE 5: ALL-AROUND LEADER ── */}
      <section id="stage-5" class="section stage-section stage-5-section" data-stage="5">
        <div class="stage-bg">
          <div class="stage-particles" id="particles5"></div>
          <div class="stage-gradient s5-gradient"></div>
        </div>
        <div class="stage-mouse-wrap">
          <div class="stage-orb s5-orb-a" data-depth="0.06"></div>
          <div class="stage-orb s5-orb-b" data-depth="0.04"></div>
          <div class="stage-orb s5-orb-c" data-depth="0.08"></div>
        </div>
        <div class="stage-inner">
          <div class="stage-badge fade-up gold">
            <span class="stage-num">05</span>
            <span class="stage-tag">STAGE FIVE — THE PINNACLE</span>
          </div>
          <div class="stage-content-grid">
            <div class="stage-text">
              <h2 class="stage-title fade-up delay-1">All-Around<br/><span class="accent-text gold">Leader</span></h2>
              <p class="stage-desc fade-up delay-2">
                The All-Around Leader is the embodiment of everything the Space Force stands for. You are simultaneously a warrior, a diplomat, an innovator, a mentor, and a steward of the force. Your legacy is not measured in missions — it is measured in the leaders you leave behind.
              </p>
              <div class="stage-pillars fade-up delay-3">
                <div class="pillar-item gold">
                  <div class="pillar-icon"><i class="fas fa-infinity"></i></div>
                  <div class="pillar-text">
                    <strong>Legacy Building</strong>
                    <p>Create lasting institutional culture, mentor the next generation, and shape the Space Force's identity for decades.</p>
                  </div>
                </div>
                <div class="pillar-item gold">
                  <div class="pillar-icon"><i class="fas fa-network-wired"></i></div>
                  <div class="pillar-text">
                    <strong>Enterprise Leadership</strong>
                    <p>Lead across the entire Space Force enterprise — budget, policy, operations, and people simultaneously.</p>
                  </div>
                </div>
                <div class="pillar-item gold">
                  <div class="pillar-icon"><i class="fas fa-award"></i></div>
                  <div class="pillar-text">
                    <strong>Character Excellence</strong>
                    <p>Demonstrate the highest standards of integrity, resilience, and servant leadership in every action.</p>
                  </div>
                </div>
                <div class="pillar-item gold">
                  <div class="pillar-icon"><i class="fas fa-meteor"></i></div>
                  <div class="pillar-text">
                    <strong>Mission Transformation</strong>
                    <p>Redefine what is possible in the space domain — from low-earth orbit to deep space operations.</p>
                  </div>
                </div>
              </div>
              <div class="stage-milestone fade-up delay-4 gold-milestone">
                <div class="milestone-label">The Pinnacle</div>
                <div class="milestone-text">General Officer / Senior Executive — Guardian of Guardians, Shaper of the Space Force's future</div>
              </div>
            </div>
            <div class="stage-visual">
              <div class="stage-viz-wrap fade-up delay-2">
                <div class="viz-card s5-card">
                  <div class="viz-icon-ring gold-ring">
                    <div class="icon-ring r1"></div>
                    <div class="icon-ring r2"></div>
                    <div class="icon-ring r3"></div>
                    <div class="central-icon gold-icon"><i class="fas fa-star"></i></div>
                  </div>
                  <div class="viz-label">All-Around Leader</div>
                  <div class="viz-rank">General Officer / Senior Executive</div>
                  <div class="viz-traits gold-traits">
                    <span>Legendary</span>
                    <span>Transformative</span>
                    <span>Selfless</span>
                    <span>Eternal</span>
                  </div>
                </div>
                <div class="galaxy-visual">
                  <div class="galaxy-core"></div>
                  <div class="galaxy-arm arm-1"></div>
                  <div class="galaxy-arm arm-2"></div>
                  <div class="galaxy-arm arm-3"></div>
                  <div class="galaxy-star gs-1"></div>
                  <div class="galaxy-star gs-2"></div>
                  <div class="galaxy-star gs-3"></div>
                  <div class="galaxy-star gs-4"></div>
                  <div class="galaxy-star gs-5"></div>
                  <div class="galaxy-star gs-6"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── VALUES PILLARS ── */}
      <section id="values" class="section values-section">
        <div class="section-inner">
          <div class="overline fade-up">GUARDIAN ETHOS</div>
          <h2 class="section-title fade-up delay-1">The Values That<br/>Guide Every Stage</h2>
          <div class="values-grid fade-up delay-2">
            <div class="value-card" data-index="0">
              <div class="value-icon-wrap">
                <div class="value-hex"></div>
                <i class="fas fa-shield-alt value-icon"></i>
              </div>
              <h3>Character</h3>
              <p>Embody integrity in every decision — on duty and off. Character is the compass that guides guardians through ambiguity.</p>
              <div class="value-glow"></div>
            </div>
            <div class="value-card" data-index="1">
              <div class="value-icon-wrap">
                <div class="value-hex"></div>
                <i class="fas fa-fist-raised value-icon"></i>
              </div>
              <h3>Courage</h3>
              <p>Act with moral and physical bravery. Speak truth to power. Challenge the status quo when the mission demands it.</p>
              <div class="value-glow"></div>
            </div>
            <div class="value-card" data-index="2">
              <div class="value-icon-wrap">
                <div class="value-hex"></div>
                <i class="fas fa-link value-icon"></i>
              </div>
              <h3>Commitment</h3>
              <p>Unwavering dedication to the mission, the force, and the nation. Commitment means finishing what you start — no matter the cost.</p>
              <div class="value-glow"></div>
            </div>
            <div class="value-card" data-index="3">
              <div class="value-icon-wrap">
                <div class="value-hex"></div>
                <i class="fas fa-handshake-alt value-icon"></i>
              </div>
              <h3>Community</h3>
              <p>Build cohort. Foster belonging. The Guardian community is the force multiplier that makes individual excellence into collective invincibility.</p>
              <div class="value-glow"></div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CALL TO ACTION ── */}
      <section id="begin" class="section cta-section">
        <div class="cta-bg">
          <div class="cta-stars"></div>
          <div class="cta-nebula"></div>
        </div>
        <div class="cta-mouse-wrap">
          <div class="cta-orb co-1" data-depth="0.06"></div>
          <div class="cta-orb co-2" data-depth="0.03"></div>
          <div class="cta-orb co-3" data-depth="0.08"></div>
        </div>
        <div class="cta-inner">
          <div class="cta-badge fade-up">YOUR JOURNEY AWAITS</div>
          <h2 class="cta-title fade-up delay-1">
            Ready to become<br/>
            <span class="cta-gradient">the leader the stars need?</span>
          </h2>
          <p class="cta-body fade-up delay-2">
            The United States Space Force is building a generation of leaders capable of defending America's interests across the final frontier. Your journey from Guardian to All-Around Leader starts with a single decision.
          </p>
          <div class="cta-buttons fade-up delay-3">
            <a href="https://www.spaceforce.mil/" target="_blank" class="btn-primary large">
              <i class="fas fa-rocket"></i> Explore Space Force
            </a>
            <a href="#hero" class="btn-ghost large">
              <i class="fas fa-redo"></i> Restart Journey
            </a>
          </div>
          <div class="cta-seal fade-up delay-4">
            <svg class="seal-svg" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="100" cy="100" r="95" stroke="#00d4ff" stroke-width="1" opacity="0.3" fill="none"/>
              <circle cx="100" cy="100" r="75" stroke="#00d4ff" stroke-width="1.5" opacity="0.5" fill="none"/>
              <circle cx="100" cy="100" r="55" stroke="#00d4ff" stroke-width="1" opacity="0.3" fill="none"/>
              <circle cx="100" cy="100" r="8" fill="#00d4ff" opacity="0.8"/>
              <ellipse cx="100" cy="100" rx="75" ry="28" stroke="#00d4ff" stroke-width="1" opacity="0.4" fill="none" transform="rotate(-30 100 100)"/>
              <ellipse cx="100" cy="100" rx="75" ry="28" stroke="#00d4ff" stroke-width="1" opacity="0.4" fill="none" transform="rotate(30 100 100)"/>
              <line x1="100" y1="5" x2="100" y2="195" stroke="#00d4ff" stroke-width="0.5" opacity="0.2"/>
              <line x1="5" y1="100" x2="195" y2="100" stroke="#00d4ff" stroke-width="0.5" opacity="0.2"/>
            </svg>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer class="site-footer">
        <div class="footer-inner">
          <div class="footer-logo">
            <svg class="footer-emblem" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="14" stroke="#00d4ff" stroke-width="1" fill="none" opacity="0.5"/>
              <circle cx="16" cy="16" r="8" stroke="#00d4ff" stroke-width="0.8" fill="none" opacity="0.4"/>
              <ellipse cx="16" cy="16" rx="14" ry="5" stroke="#00d4ff" stroke-width="0.8" fill="none" opacity="0.4" transform="rotate(-20 16 16)"/>
              <circle cx="16" cy="16" r="2" fill="#00d4ff" opacity="0.8"/>
            </svg>
            <div>
              <div class="footer-name">U.S. Space Force</div>
              <div class="footer-tagline">Semper Supra — Always Above</div>
            </div>
          </div>
          <div class="footer-links">
            <a href="#stage-1">Stage 1</a>
            <a href="#stage-2">Stage 2</a>
            <a href="#stage-3">Stage 3</a>
            <a href="#stage-4">Stage 4</a>
            <a href="#stage-5">Stage 5</a>
            <a href="https://www.spaceforce.mil/" target="_blank">Official Site</a>
          </div>
          <div class="footer-copy">
            &copy; {new Date().getFullYear()} United States Space Force Leadership Development Framework. Educational concept website.
          </div>
        </div>
      </footer>

      {/* ── PROGRESS BAR ── */}
      <div class="journey-progress" id="journeyProgress">
        <div class="jp-track">
          <div class="jp-fill" id="jpFill"></div>
        </div>
        <div class="jp-nodes">
          <div class="jp-node jp-active" data-stage="0" title="Start"></div>
          <div class="jp-node" data-stage="1" title="Junior Guardian"></div>
          <div class="jp-node" data-stage="2" title="Mission Specialist"></div>
          <div class="jp-node" data-stage="3" title="Team Commander"></div>
          <div class="jp-node" data-stage="4" title="Strategic Visionary"></div>
          <div class="jp-node" data-stage="5" title="All-Around Leader"></div>
        </div>
      </div>

      {/* ── CURSOR ── */}
      <div class="custom-cursor" id="customCursor"></div>
      <div class="cursor-trail" id="cursorTrail"></div>

      <script src="/static/app.js"></script>
    </div>
  )
})

export default app
