import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'
import { renderer } from './renderer'

const app = new Hono()
app.use('/static/*', serveStatic({ root: './' }))
app.use(renderer)

app.get('/', (c) => {
  return c.render(
    <div id="root">

      {/* ── NAV ── */}
      <nav id="navbar">
        <div class="nav-inner">
          <div class="nav-logo">
            <svg class="ussf-emblem" viewBox="0 0 48 48" fill="none">
              <circle cx="24" cy="24" r="22" stroke="#00d4ff" stroke-width="1.5" fill="none" opacity="0.6"/>
              <circle cx="24" cy="24" r="14" stroke="#00d4ff" stroke-width="1" fill="none" opacity="0.4"/>
              <ellipse cx="24" cy="24" rx="22" ry="8" stroke="#00d4ff" stroke-width="1" fill="none" opacity="0.5" transform="rotate(-20 24 24)"/>
              <circle cx="24" cy="24" r="3" fill="#00d4ff"/>
              <line x1="24" y1="2" x2="24" y2="46" stroke="#00d4ff" stroke-width="0.5" opacity="0.3"/>
              <line x1="2" y1="24" x2="46" y2="24" stroke="#00d4ff" stroke-width="0.5" opacity="0.3"/>
            </svg>
            <div class="nav-logo-text">
              <span class="nav-name">TSgt Evelyn Davis</span>
              <span class="nav-sub">USSF · Leadership Journey</span>
            </div>
          </div>
          <ul class="nav-links">
            <li><a href="#hero">Home</a></li>
            <li><a href="#chapter-1">Foundations</a></li>
            <li><a href="#chapter-2">The Crucible</a></li>
            <li><a href="#chapter-3">Now</a></li>
            <li><a href="#chapter-4">North Star</a></li>
            <li><a href="#values">Values</a></li>
            <li><a href="#future" class="nav-cta">The Future</a></li>
          </ul>
          <button class="hamburger" id="hamburger" aria-label="Menu">
            <span></span><span></span><span></span>
          </button>
        </div>
      </nav>

      {/* ══════════════════════════
          HERO — OPENING STATEMENT
          ══════════════════════════ */}
      <section id="hero" class="section hero-section">
        <div class="star-field" id="starField"></div>
        <div class="nebula-bg"></div>
        <div class="mouse-layer">
          <div class="mouse-orb orb-1" data-depth="0.04"></div>
          <div class="mouse-orb orb-2" data-depth="0.07"></div>
          <div class="mouse-orb orb-3" data-depth="0.02"></div>
          <div class="mouse-orb orb-4" data-depth="0.09"></div>
          <div class="mouse-orb orb-5" data-depth="0.05"></div>
        </div>

        <div class="hero-content">
          <div class="hero-eyebrow fade-up">
            <span class="eyebrow-dot"></span>
            UNITED STATES SPACE FORCE · TECHNICAL SERGEANT
            <span class="eyebrow-dot"></span>
          </div>
          <h1 class="hero-headline fade-up delay-1">
            Evelyn<br/>
            <span class="gradient-text">Davis.</span>
          </h1>
          <p class="hero-tagline fade-up delay-2">
            Cyber Operator. Space Tester. Bridge Builder.
          </p>
          <p class="hero-sub fade-up delay-3">
            Eight years. Four bases. Three specialties. One unwavering truth —
            <em> the mission only wins when people and technology move together.</em>
          </p>
          <div class="hero-cta-row fade-up delay-4">
            <a href="#chapter-1" class="btn-primary">
              <i class="fas fa-arrow-down"></i> Begin My Journey
            </a>
            <a href="#future" class="btn-ghost">
              <i class="fas fa-star"></i> See Where I'm Headed
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
            <span class="stat-num" data-target="8">0</span>
            <span class="stat-label">Years Serving</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <span class="stat-num" data-target="4">0</span>
            <span class="stat-label">Bases</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <span class="stat-num" data-target="3">0</span>
            <span class="stat-label">Specialties</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <span class="stat-num" data-target="1">0</span>
            <span class="stat-label">Mission Focus</span>
          </div>
        </div>
      </section>

      {/* ══════════════════════════
          CHAPTER OVERVIEW STRIP
          ══════════════════════════ */}
      <section id="overview" class="section overview-section">
        <div class="section-inner">
          <div class="overline fade-up">THE STORY SO FAR</div>
          <h2 class="section-title fade-up delay-1">A Journey Shaped<br/>by Real Decisions.</h2>
          <p class="section-body fade-up delay-2">
            This isn't a résumé. It's the honest account of a leader who learned by doing —
            who built credibility in the gap between technical truth and operational reality,
            and who leads today with the scars and wisdom of both.
          </p>
          <div class="journey-timeline fade-up delay-3">
            <div class="timeline-track"></div>
            <div class="timeline-progress" id="timelineProgress"></div>
            <div class="timeline-nodes">
              <a href="#chapter-1" class="timeline-node active" data-stage="1">
                <div class="node-dot"></div>
                <div class="node-label">
                  <span class="node-num">01</span>
                  <span class="node-name">Foundations</span>
                </div>
              </a>
              <a href="#chapter-2" class="timeline-node" data-stage="2">
                <div class="node-dot"></div>
                <div class="node-label">
                  <span class="node-num">02</span>
                  <span class="node-name">The Crucible</span>
                </div>
              </a>
              <a href="#chapter-3" class="timeline-node" data-stage="3">
                <div class="node-dot"></div>
                <div class="node-label">
                  <span class="node-num">03</span>
                  <span class="node-name">Who I Am Now</span>
                </div>
              </a>
              <a href="#chapter-4" class="timeline-node" data-stage="4">
                <div class="node-dot"></div>
                <div class="node-label">
                  <span class="node-num">04</span>
                  <span class="node-name">The North Star</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          CHAPTER 1 — FOUNDATIONS
          Cyber Operator · Early Years
          ══════════════════════════════════ */}
      <section id="chapter-1" class="section stage-section stage-1-section" data-stage="1">
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
            <span class="stage-tag">CHAPTER ONE · FOUNDATIONS</span>
          </div>
          <div class="stage-content-grid">
            <div class="stage-text">
              <h2 class="stage-title fade-up delay-1">Learning to<br/><span class="accent-text">Operate.</span></h2>
              <p class="stage-desc fade-up delay-2">
                I came in as a cyber offensive operator — learning to think like the adversary, to find the seam, to move without being seen. Then I crossed to the defensive side. Two lenses. Same domain. That duality became the first foundational shift in how I understood the mission.
              </p>
              <p class="stage-desc fade-up delay-2" style="margin-top:-16px">
                Early on, I was all execution. Learning the craft, absorbing doctrine, proving myself technically. But somewhere between my first base and my second, I started noticing something: the best operators weren't just skilled — they understood <em>why</em> every action mattered to the mission above them.
              </p>
              <div class="stage-pillars fade-up delay-3">
                <div class="pillar-item">
                  <div class="pillar-icon"><i class="fas fa-crosshairs"></i></div>
                  <div class="pillar-text">
                    <strong>Cyber Offensive Operator</strong>
                    <p>Learned adversarial thinking — how to find vulnerabilities before the enemy does and exploit them with precision.</p>
                  </div>
                </div>
                <div class="pillar-item">
                  <div class="pillar-icon"><i class="fas fa-shield-alt"></i></div>
                  <div class="pillar-text">
                    <strong>Cyber Defensive Operator</strong>
                    <p>Flipped perspective to protect — applied offensive knowledge to harden systems from the inside out.</p>
                  </div>
                </div>
                <div class="pillar-item">
                  <div class="pillar-icon"><i class="fas fa-map-marker-alt"></i></div>
                  <div class="pillar-text">
                    <strong>4 Bases, 1 Identity</strong>
                    <p>Every assignment brought a new team, new mission, new environment. I learned to adapt fast and contribute immediately.</p>
                  </div>
                </div>
                <div class="pillar-item">
                  <div class="pillar-icon"><i class="fas fa-brain"></i></div>
                  <div class="pillar-text">
                    <strong>The "Why" Shift</strong>
                    <p>Moved from executing tasks to understanding mission context — the moment that separated technicians from leaders.</p>
                  </div>
                </div>
              </div>
              <div class="stage-milestone fade-up delay-4">
                <div class="milestone-label">What This Chapter Built</div>
                <div class="milestone-text">Dual-domain expertise and the discipline to master complexity — the technical credibility that would later let me lead with authority, not just authority by rank.</div>
              </div>
            </div>
            <div class="stage-visual">
              <div class="stage-viz-wrap fade-up delay-2">
                <div class="viz-card s1-card">
                  <div class="viz-icon-ring">
                    <div class="icon-ring r1"></div>
                    <div class="icon-ring r2"></div>
                    <div class="icon-ring r3"></div>
                    <div class="central-icon"><i class="fas fa-terminal"></i></div>
                  </div>
                  <div class="viz-label">Cyber Operator</div>
                  <div class="viz-rank">Offensive · Defensive · Space Test</div>
                  <div class="viz-traits">
                    <span>Dual-Domain</span>
                    <span>Disciplined</span>
                    <span>Mission-Driven</span>
                    <span>Adaptive</span>
                  </div>
                </div>
                <div class="viz-quote">
                  <i class="fas fa-quote-left"></i>
                  <p>"I didn't just learn to operate — I learned to see the system whole. Offense taught me where systems break. Defense taught me how to make them hold."</p>
                </div>
                <div class="base-timeline">
                  <div class="base-label">The Journey</div>
                  <div class="base-nodes">
                    <div class="base-node active"><span>Base 1</span><small>Offensive Ops</small></div>
                    <div class="base-connector"></div>
                    <div class="base-node active"><span>Base 2</span><small>Defensive Ops</small></div>
                    <div class="base-connector"></div>
                    <div class="base-node active"><span>Base 3</span><small>Space Test</small></div>
                    <div class="base-connector"></div>
                    <div class="base-node active"><span>Base 4</span><small>TSgt · Now</small></div>
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

      {/* ══════════════════════════════════════
          CHAPTER 2 — THE CRUCIBLE
          The Cyber vs. Ops Defining Moment
          ══════════════════════════════════════ */}
      <section id="chapter-2" class="section stage-section stage-2-section" data-stage="2">
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
            <span class="stage-tag">CHAPTER TWO · THE CRUCIBLE</span>
          </div>
          <div class="stage-content-grid reverse">
            <div class="stage-text">
              <h2 class="stage-title fade-up delay-1">The Day Cyber<br/><span class="accent-text">Met Reality.</span></h2>

              {/* Story callout */}
              <div class="story-callout fade-up delay-2">
                <div class="callout-bar"></div>
                <div class="callout-content">
                  <div class="callout-label">THE DEFINING MOMENT</div>
                  <p>I was enforcing cybersecurity controls — patching schedules, access restrictions, system hardening — all technically correct. All mission-critical. And all met with resistance from operators who saw cyber as the enemy of readiness, not the enabler of it.</p>
                </div>
              </div>

              <p class="stage-desc fade-up delay-3" style="margin-top:24px">
                The mission owners weren't wrong to push back. Their timelines were real. Their pressures were real. What they lacked wasn't willingness — it was translation. Nobody had ever framed cyber risk in terms they used every day: mission degradation, sortie generation, system availability rates.
              </p>
              <p class="stage-desc fade-up delay-3" style="margin-top:-16px">
                So I changed the conversation. Instead of "you must patch by Friday," it became "here's what exposure looks like in operational terms — and here's a risk-prioritized timeline that protects both the mission and the network." I stopped being the compliance officer and became a mission partner.
              </p>

              <div class="stage-pillars fade-up delay-3">
                <div class="pillar-item highlight">
                  <div class="pillar-icon"><i class="fas fa-language"></i></div>
                  <div class="pillar-text">
                    <strong>Translated Risk into Mission Terms</strong>
                    <p>Reframed technical vulnerabilities as operational consequences — language mission owners actually used and acted on.</p>
                  </div>
                </div>
                <div class="pillar-item highlight">
                  <div class="pillar-icon"><i class="fas fa-balance-scale"></i></div>
                  <div class="pillar-text">
                    <strong>Risk-Based Prioritization</strong>
                    <p>Replaced rigid compliance timelines with intelligent triage — highest risk first, mission tempo protected.</p>
                  </div>
                </div>
                <div class="pillar-item highlight">
                  <div class="pillar-icon"><i class="fas fa-handshake"></i></div>
                  <div class="pillar-text">
                    <strong>Influence Without Authority</strong>
                    <p>Had no command over mission owners. Built trust through credibility, clarity, and demonstrating shared stakes.</p>
                  </div>
                </div>
                <div class="pillar-item highlight">
                  <div class="pillar-icon"><i class="fas fa-bridge"></i></div>
                  <div class="pillar-text">
                    <strong>Became the Bridge</strong>
                    <p>Technical teams spoke one language. Mission leaders spoke another. I learned to live in both.</p>
                  </div>
                </div>
              </div>

              <div class="stage-milestone fade-up delay-4">
                <div class="milestone-label">What This Chapter Built</div>
                <div class="milestone-text">The leadership lesson no classroom teaches: authority earns nothing. Credibility earns everything. This was where I stopped being a technician and started becoming a leader.</div>
              </div>
            </div>
            <div class="stage-visual">
              <div class="stage-viz-wrap fade-up delay-2">
                <div class="viz-card s2-card">
                  <div class="viz-icon-ring">
                    <div class="icon-ring r1"></div>
                    <div class="icon-ring r2"></div>
                    <div class="icon-ring r3"></div>
                    <div class="central-icon"><i class="fas fa-exchange-alt"></i></div>
                  </div>
                  <div class="viz-label">The Bridge Builder</div>
                  <div class="viz-rank">Influence · Translation · Trust</div>
                  <div class="viz-traits">
                    <span>Persuasive</span>
                    <span>Risk-Fluent</span>
                    <span>Credible</span>
                    <span>Principled</span>
                  </div>
                </div>

                {/* Tension diagram */}
                <div class="tension-diagram">
                  <div class="tension-side ts-left">
                    <div class="tension-icon"><i class="fas fa-lock"></i></div>
                    <div class="tension-label">Cyber Standards</div>
                    <div class="tension-sub">Compliance · Hardening · Risk</div>
                  </div>
                  <div class="tension-bridge">
                    <div class="bridge-line bl-1"></div>
                    <div class="bridge-center">
                      <i class="fas fa-user-shield"></i>
                    </div>
                    <div class="bridge-line bl-2"></div>
                  </div>
                  <div class="tension-side ts-right">
                    <div class="tension-icon"><i class="fas fa-fighter-jet"></i></div>
                    <div class="tension-label">Operational Tempo</div>
                    <div class="tension-sub">Readiness · Speed · Mission</div>
                  </div>
                </div>

                <div class="viz-quote">
                  <i class="fas fa-quote-left"></i>
                  <p>"The resistance wasn't obstruction — it was a gap I hadn't filled yet. Once I filled it, the resistance became partnership."</p>
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

      {/* ══════════════════════════════════
          CHAPTER 3 — WHO I AM NOW
          TSgt · Current Leadership Identity
          ══════════════════════════════════ */}
      <section id="chapter-3" class="section stage-section stage-3-section" data-stage="3">
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
            <span class="stage-tag">CHAPTER THREE · WHO I AM NOW</span>
          </div>
          <div class="stage-content-grid">
            <div class="stage-text">
              <h2 class="stage-title fade-up delay-1">Calm in<br/><span class="accent-text">the Storm.</span></h2>
              <p class="stage-desc fade-up delay-2">
                Eight years in, this is who I've become. Not by accident — by deliberate choice in every high-pressure moment, every difficult conversation, every time I had to hold the line and still keep the team moving forward.
              </p>

              {/* Leadership Traits — personal, specific */}
              <div class="trait-list fade-up delay-3">
                <div class="trait-item">
                  <div class="trait-number">01</div>
                  <div class="trait-content">
                    <div class="trait-title">Calm Under Pressure</div>
                    <div class="trait-desc">When incidents hit and systems go down, I'm the one bringing structure and focus — not adding to the noise. Calm isn't passive. It's active leadership when chaos earns the room.</div>
                  </div>
                </div>
                <div class="trait-item">
                  <div class="trait-number">02</div>
                  <div class="trait-content">
                    <div class="trait-title">Clear and Direct</div>
                    <div class="trait-desc">People know the priority. They know their role. They know why it matters. I don't believe in ambiguous guidance — clarity is a form of respect for the people I lead.</div>
                  </div>
                </div>
                <div class="trait-item">
                  <div class="trait-number">03</div>
                  <div class="trait-content">
                    <div class="trait-title">Developer of People</div>
                    <div class="trait-desc">I invest in the "why," not just the "how." Technical skills decay. Understanding — the kind that makes someone adaptable — that lasts. That's what I try to build in my people.</div>
                  </div>
                </div>
                <div class="trait-item">
                  <div class="trait-number">04</div>
                  <div class="trait-content">
                    <div class="trait-title">Technical-Operational Bridge</div>
                    <div class="trait-desc">I can take a complex cyber issue and put it in front of a wing commander in three sentences. That translation isn't just communication — it's how decisions get made and missions stay protected.</div>
                  </div>
                </div>
                <div class="trait-item">
                  <div class="trait-number">05</div>
                  <div class="trait-content">
                    <div class="trait-title">Standards with Flexibility</div>
                    <div class="trait-desc">I hold the line on what matters. But I'm outcomes-focused, not process-obsessed. Rigid compliance without judgment isn't leadership — it's administration.</div>
                  </div>
                </div>
                <div class="trait-item">
                  <div class="trait-number">06</div>
                  <div class="trait-content">
                    <div class="trait-title">Lead with Intent, Not Control</div>
                    <div class="trait-desc">I set the mission priority. I set the standard. Then I get out of the way and let my people own it. The best leadership decision I ever made was trusting my team to lead themselves.</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="stage-visual">
              <div class="stage-viz-wrap fade-up delay-2">
                <div class="viz-card s3-card">
                  <div class="viz-icon-ring">
                    <div class="icon-ring r1"></div>
                    <div class="icon-ring r2"></div>
                    <div class="icon-ring r3"></div>
                    <div class="central-icon"><i class="fas fa-anchor"></i></div>
                  </div>
                  <div class="viz-label">TSgt Evelyn Davis</div>
                  <div class="viz-rank">Technical Sergeant · Space Force</div>
                  <div class="viz-traits">
                    <span>Calm</span>
                    <span>Clear</span>
                    <span>Decisive</span>
                    <span>Trusted</span>
                  </div>
                </div>

                {/* Leadership radar */}
                <div class="leadership-radar">
                  <div class="radar-label">Leadership Profile</div>
                  <div class="radar-wrap">
                    <svg class="radar-svg" viewBox="0 0 200 200">
                      <polygon points="100,20 168,60 168,140 100,180 32,140 32,60" fill="none" stroke="rgba(0,212,255,0.1)" stroke-width="1"/>
                      <polygon points="100,45 148,72 148,128 100,155 52,128 52,72" fill="none" stroke="rgba(0,212,255,0.1)" stroke-width="1"/>
                      <polygon points="100,70 128,85 128,115 100,130 72,115 72,85" fill="none" stroke="rgba(0,212,255,0.1)" stroke-width="1"/>
                      <polygon points="100,15 162,55 170,142 100,184 30,142 38,55" fill="rgba(0,212,255,0.08)" stroke="rgba(0,212,255,0.5)" stroke-width="1.5"/>
                      <circle cx="100" cy="15" r="3" fill="#00d4ff"/>
                      <circle cx="162" cy="55" r="3" fill="#00d4ff"/>
                      <circle cx="170" cy="142" r="3" fill="#00d4ff"/>
                      <circle cx="100" cy="184" r="3" fill="#00d4ff"/>
                      <circle cx="30" cy="142" r="3" fill="#00d4ff"/>
                      <circle cx="38" cy="55" r="3" fill="#00d4ff"/>
                    </svg>
                    <div class="radar-labels">
                      <span class="rl rl-top">Calm</span>
                      <span class="rl rl-tr">Clear</span>
                      <span class="rl rl-br">Decisive</span>
                      <span class="rl rl-bot">Developer</span>
                      <span class="rl rl-bl">Bridge</span>
                      <span class="rl rl-tl">Intent</span>
                    </div>
                  </div>
                </div>

                <div class="viz-quote">
                  <i class="fas fa-quote-left"></i>
                  <p>"I want to be the leader people rely on during high-pressure moments — someone who brings calm, structure, and decisive action when it matters most."</p>
                  <div class="quote-attr">— Evelyn Davis</div>
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

      {/* ══════════════════════════════════════
          CHAPTER 4 — THE NORTH STAR
          Who Evelyn Wants to Become
          ══════════════════════════════════════ */}
      <section id="chapter-4" class="section stage-section stage-4-section" data-stage="4">
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
            <span class="stage-tag">CHAPTER FOUR · THE NORTH STAR</span>
          </div>
          <div class="stage-content-grid reverse">
            <div class="stage-text">
              <h2 class="stage-title fade-up delay-1">The Leader<br/><span class="accent-text">I'm Becoming.</span></h2>
              <p class="stage-desc fade-up delay-2">
                I don't see this as a destination — I see it as a direction. Every assignment, every hard conversation, every person I develop is another degree on the bearing. This is where that bearing points.
              </p>

              <div class="aspiration-cards fade-up delay-3">
                <div class="asp-card">
                  <div class="asp-icon"><i class="fas fa-anchor"></i></div>
                  <div class="asp-content">
                    <div class="asp-title">The Anchor in the Room</div>
                    <div class="asp-desc">When the incident flares, when the pressure peaks, when everyone looks around for who's going to take charge — I want to be the calm that organizes the chaos. Not because of rank. Because of presence.</div>
                  </div>
                </div>
                <div class="asp-card">
                  <div class="asp-icon"><i class="fas fa-project-diagram"></i></div>
                  <div class="asp-content">
                    <div class="asp-title">Senior Cyber-Space Strategist</div>
                    <div class="asp-desc">I want to shape how this force integrates cyber and space at the operational level — not just execute policy, but help write it. The gap between cyber teams and mission leaders is still too wide. I want to close it at scale.</div>
                  </div>
                </div>
                <div class="asp-card">
                  <div class="asp-icon"><i class="fas fa-users"></i></div>
                  <div class="asp-content">
                    <div class="asp-title">The Leader Who Develops Leaders</div>
                    <div class="asp-desc">My measure of success won't be the missions I ran — it'll be the people who grew under my mentorship and went on to lead their own teams better than I could have. That's the legacy I want.</div>
                  </div>
                </div>
                <div class="asp-card">
                  <div class="asp-icon"><i class="fas fa-globe"></i></div>
                  <div class="asp-content">
                    <div class="asp-title">Enterprise-Level Bridge Builder</div>
                    <div class="asp-desc">Expand what I do today from flight-level to force-level. Take the translation skill — cyber risk to mission language — and apply it to joint operations, allied integration, and senior leadership engagement.</div>
                  </div>
                </div>
              </div>

              <div class="stage-milestone fade-up delay-4">
                <div class="milestone-label">The Commitment</div>
                <div class="milestone-text">To keep earning the trust of the people I lead — not through title, but through consistency, clarity, and showing up when it's hardest. That's the only leadership I believe in.</div>
              </div>
            </div>
            <div class="stage-visual">
              <div class="stage-viz-wrap fade-up delay-2">
                <div class="viz-card s4-card">
                  <div class="viz-icon-ring">
                    <div class="icon-ring r1"></div>
                    <div class="icon-ring r2"></div>
                    <div class="icon-ring r3"></div>
                    <div class="central-icon"><i class="fas fa-compass"></i></div>
                  </div>
                  <div class="viz-label">Future Self</div>
                  <div class="viz-rank">Senior NCO · Cyber-Space Strategist</div>
                  <div class="viz-traits">
                    <span>Mentor</span>
                    <span>Strategist</span>
                    <span>Architect</span>
                    <span>Trusted</span>
                  </div>
                </div>
                <div class="strategy-map">
                  <div class="map-node mn-center"><i class="fas fa-star"></i></div>
                  <div class="map-ring mr1">
                    <div class="map-node mn-a"><i class="fas fa-users"></i></div>
                    <div class="map-node mn-b"><i class="fas fa-shield-alt"></i></div>
                    <div class="map-node mn-c"><i class="fas fa-satellite"></i></div>
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
                <div class="viz-quote">
                  <i class="fas fa-quote-left"></i>
                  <p>"The distance between TSgt and the leader I want to be isn't measured in promotions. It's measured in the depth of impact I leave behind."</p>
                  <div class="quote-attr">— Evelyn Davis</div>
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

      {/* ══════════════════════════
          VALUES — Evelyn's Own
          ══════════════════════════ */}
      <section id="values" class="section values-section">
        <div class="section-inner">
          <div class="overline fade-up">WHAT DRIVES ME</div>
          <h2 class="section-title fade-up delay-1">Six Principles.<br/>Earned, Not Assigned.</h2>
          <p class="section-body fade-up delay-2">
            These aren't values I inherited from a doctrine pamphlet. They're the ones I've lived — tested in real decisions, real friction, real moments where the easier path was wrong.
          </p>
          <div class="values-grid fade-up delay-3">
            <div class="value-card" data-index="0">
              <div class="value-icon-wrap">
                <div class="value-hex"></div>
                <i class="fas fa-water value-icon"></i>
              </div>
              <h3>Composure</h3>
              <p>Calm is a skill. Panic is contagious — and so is steadiness. I lead by the temperature I set in the room when everything else is on fire.</p>
              <div class="value-glow"></div>
            </div>
            <div class="value-card" data-index="1">
              <div class="value-icon-wrap">
                <div class="value-hex"></div>
                <i class="fas fa-bullseye value-icon"></i>
              </div>
              <h3>Clarity</h3>
              <p>Ambiguity costs missions. I communicate with precision — not to be direct for directness's sake, but because clear guidance is the most respectful thing I can give my team.</p>
              <div class="value-glow"></div>
            </div>
            <div class="value-card" data-index="2">
              <div class="value-icon-wrap">
                <div class="value-hex"></div>
                <i class="fas fa-seedling value-icon"></i>
              </div>
              <h3>Growth</h3>
              <p>I invest in the "why." Skills fade. Understanding compounds. Every person on my team deserves a leader who is also their teacher.</p>
              <div class="value-glow"></div>
            </div>
            <div class="value-card" data-index="3">
              <div class="value-icon-wrap">
                <div class="value-hex"></div>
                <i class="fas fa-exchange-alt value-icon"></i>
              </div>
              <h3>Translation</h3>
              <p>Technical truth only matters if decision-makers understand it. I bridge the gap between what's happening in the network and what it means for the mission.</p>
              <div class="value-glow"></div>
            </div>
            <div class="value-card" data-index="4">
              <div class="value-icon-wrap">
                <div class="value-hex"></div>
                <i class="fas fa-shield-alt value-icon"></i>
              </div>
              <h3>Standards</h3>
              <p>I hold the line on what matters — not because rules say so, but because I know what failure costs. Flexibility in execution. Firmness in outcome.</p>
              <div class="value-glow"></div>
            </div>
            <div class="value-card" data-index="5">
              <div class="value-icon-wrap">
                <div class="value-hex"></div>
                <i class="fas fa-unlock value-icon"></i>
              </div>
              <h3>Empowerment</h3>
              <p>My job is to set intent and get out of the way. Micromanagement is a failure of trust. The best thing I can give my team is the belief that they can lead themselves.</p>
              <div class="value-glow"></div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          FUTURE — The Final Statement
          ══════════════════════════════════ */}
      <section id="future" class="section cta-section">
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
          <div class="cta-badge fade-up">SEMPER SUPRA · ALWAYS ABOVE</div>
          <h2 class="cta-title fade-up delay-1">
            The mission isn't<br/>
            <span class="cta-gradient">finished. Neither am I.</span>
          </h2>
          <p class="cta-body fade-up delay-2">
            Eight years built this. The next chapter will be defined by how many people I bring with me — not just as subordinates, but as leaders in their own right. The Space Force needs people who can hold technical standards and operational trust in the same hand. That's the work. That's the commitment.
          </p>

          {/* Personal Motto */}
          <div class="personal-motto fade-up delay-3">
            <div class="motto-label">PERSONAL LEADERSHIP MOTTO</div>
            <div class="motto-text">"Lead with intent. Hold the standard.<br/>Bring everyone with you."</div>
            <div class="motto-attr">— TSgt Evelyn Davis, USSF</div>
          </div>

          <div class="cta-buttons fade-up delay-4">
            <a href="#hero" class="btn-ghost large">
              <i class="fas fa-redo"></i> Start Over
            </a>
            <a href="#chapter-1" class="btn-primary large">
              <i class="fas fa-book-open"></i> Read the Journey
            </a>
          </div>

          <div class="cta-seal fade-up delay-4">
            <svg class="seal-svg" viewBox="0 0 200 200" fill="none">
              <circle cx="100" cy="100" r="95" stroke="#00d4ff" stroke-width="1" opacity="0.3" fill="none"/>
              <circle cx="100" cy="100" r="75" stroke="#00d4ff" stroke-width="1.5" opacity="0.5" fill="none"/>
              <circle cx="100" cy="100" r="55" stroke="#00d4ff" stroke-width="1" opacity="0.3" fill="none"/>
              <circle cx="100" cy="100" r="8" fill="#00d4ff" opacity="0.8"/>
              <ellipse cx="100" cy="100" rx="75" ry="28" stroke="#00d4ff" stroke-width="1" opacity="0.4" fill="none" transform="rotate(-30 100 100)"/>
              <ellipse cx="100" cy="100" rx="75" ry="28" stroke="#00d4ff" stroke-width="1" opacity="0.4" fill="none" transform="rotate(30 100 100)"/>
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
              <div class="footer-name">TSgt Evelyn Davis · USSF</div>
              <div class="footer-tagline">Semper Supra — Always Above</div>
            </div>
          </div>
          <div class="footer-links">
            <a href="#chapter-1">Foundations</a>
            <a href="#chapter-2">The Crucible</a>
            <a href="#chapter-3">Who I Am Now</a>
            <a href="#chapter-4">North Star</a>
            <a href="#values">Values</a>
          </div>
          <div class="footer-copy">
            &copy; {new Date().getFullYear()} TSgt Evelyn Davis · U.S. Space Force Leadership Development Portfolio
          </div>
        </div>
      </footer>

      {/* ── JOURNEY PROGRESS ── */}
      <div class="journey-progress" id="journeyProgress">
        <div class="jp-track"><div class="jp-fill" id="jpFill"></div></div>
        <div class="jp-nodes">
          <div class="jp-node jp-active" data-stage="0" title="Start"></div>
          <div class="jp-node" data-stage="1" title="Foundations"></div>
          <div class="jp-node" data-stage="2" title="The Crucible"></div>
          <div class="jp-node" data-stage="3" title="Who I Am Now"></div>
          <div class="jp-node" data-stage="4" title="North Star"></div>
        </div>
      </div>

      <div class="custom-cursor" id="customCursor"></div>
      <div class="cursor-trail" id="cursorTrail"></div>
      <script src="/static/app.js"></script>
    </div>
  )
})

export default app
