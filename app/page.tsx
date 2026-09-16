import OrbitalParticles from "./components/OrbitalParticles";
import OffClock from "./components/OffClock";
import IntroStory from "./components/IntroStory";
import FinanceBot from "./components/FinanceBot";
import DeliveryTruck from "./components/DeliveryTruck";
import ShoppingScreen from "./components/ShoppingScreen";

function Arrow({ down = false }: { down?: boolean }) {
  return <span aria-hidden="true">{down ? "↓" : "↗"}</span>;
}

function Orbital() {
  return (
    <div className="orbital-stage">
      <svg className="orbital" viewBox="0 0 540 500" fill="none" aria-hidden="true">
        <defs>
          <linearGradient
            id="orbit-color"
            x1="100"
            y1="100"
            x2="450"
            y2="440"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#93f4ca" />
            <stop offset=".48" stopColor="#46ac97" />
            <stop offset="1" stopColor="#497b94" />
          </linearGradient>
          <radialGradient id="orbit-fill">
            <stop stopColor="#73edbd" stopOpacity=".1" />
            <stop offset="1" stopColor="#73edbd" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="270" cy="250" r="210" fill="url(#orbit-fill)" />
        <g
          className="orbital-grid"
          stroke="#7f9b90"
          strokeOpacity=".18"
          strokeWidth=".7"
        >
          <path d="M25 250H515M270 20V480" />
          <circle cx="270" cy="250" r="205" strokeDasharray="2 8" />
          <path d="M108 87l324 326M108 413L432 87" strokeDasharray="3 7" />
        </g>
        <g className="orbit-body" stroke="url(#orbit-color)" strokeWidth=".8">
          {Array.from({ length: 15 }, (_, i) => (
            <ellipse
              key={i}
              cx="270"
              cy="250"
              rx="166"
              ry="73"
              transform={`rotate(${i * 12} 270 250)`}
              opacity={0.38 + i * 0.025}
            />
          ))}
          <circle cx="270" cy="250" r="166" strokeOpacity=".5" />
        </g>
        <OrbitalParticles />
        <path d="M260 250h20M270 240v20" stroke="#b7fbd8" />
      </svg>
    </div>
  );
}

const work = [
  {
    id: "01",
    company: "AXiM",
    business: "AI underwriting & asset management",
    tenure: "AUG 2025 — PRESENT",
    title: "Senior Front-end Developer",
    highlights: [
      "Own the front-end architecture and BFF design for a commercial real estate platform.",
      "Built a streaming AI agent with multi-turn context and tool calling over internal APIs.",
      "Built Python financial-data pipelines and Playwright coverage for UI and model outputs.",
    ],
    tags: ["Next.js", "TypeScript", "Python", "Playwright"],
    kind: "agent",
    label: "Architecture · AI workflows · release",
  },
  {
    id: "02",
    company: "AfterShip",
    business: "E-commerce shipping & post-purchase",
    tenure: "MAY 2024 — JUN 2025",
    title: "Full-Stack Developer · Growth",
    highlights: [
      "Led SSR product and marketing pages in Next.js, improving search rankings across key pages.",
      "Shipped SEO-focused tools and WebGL experiences that contributed to organic growth.",
      "Architected AI translation and review automation for publishing across 38 languages.",
    ],
    tags: ["React", "Node.js", "Docker", "WebGL"],
    kind: "language",
    label: "SSR · SEO growth · publishing automation",
  },
  {
    id: "03",
    company: "Shopee",
    business: "E-commerce marketplace & seller tools",
    tenure: "JUL 2021 — SEP 2022",
    title: "Front-end Developer · Seller",
    highlights: [
      "Built a Nuxt.js portal for visual management of Flink data pipelines.",
      "Improved data warehouse team operating speed by 40%.",
      "Built a Canvas and Node.js platform for tracing column-level SQL data lineage.",
    ],
    tags: ["Nuxt.js", "Canvas", "Node.js", "SQL"],
    kind: "pipeline",
    label: "40% faster data warehouse operations",
  },
];

function WorkGraphic({ kind }: { kind: string }) {
  return (
    <div className={`work-graphic ${kind}`}>
      {kind === "agent" ? <FinanceBot /> : kind === "language" ? <DeliveryTruck /> : <ShoppingScreen />}
    </div>
  );
}

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <a className="wordmark" href="#" aria-label="Kelly Feng home">
          kelly feng
          <span aria-hidden="true" className="mint">
            *
          </span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#work">Work</a>
          <a href="#approach">With AI</a>
          <a href="#about">About</a>
        </nav>
      </header>
      <main id="main" tabIndex={-1}>
        <section className="hero shell" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="status-dot" /> STATUS / LOOKING FOR MY NEXT GIG
            </p>
            <p className="hero-intro">Software engineer, based in Toronto.</p>
            <h1 id="hero-title">
              Hey, I’m Kelly.
              <br />
              <span>I build things</span>
              <br />
              <span className="mint">with code.</span>
            </h1>
            <p className="hero-description">
              Web apps, AI agents, and the bits that connect them. Here’s a
              little of what I’ve been working on.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#work">
                See what I’ve made <Arrow down />
              </a>
            </div>
            <div className="hero-meta">
              <span>BASED IN TORONTO, CANADA</span>
              <span>FRONT END / FULL STACK / AI</span>
            </div>
          </div>
          <Orbital />
        </section>
        <div className="company-strip shell">
          <span className="eyebrow">A FEW STOPS SO FAR</span>
          <div>
            <span className="axim-logo">
              AXiM<span>↗</span>
            </span>
            <span className="aftership-logo">aftership</span>
            <span className="infor-logo">infor.</span>
            <span className="shopee-logo">shopee</span>
          </div>
          <a href="#work" aria-label="Explore selected work">
            <Arrow down />
          </a>
        </div>
        <section id="work" className="section shell">
          <div className="section-heading">
            <div>
              <p className="eyebrow">01 / THINGS I’VE BUILT</p>
              <h2>
                Some of my work<span className="mint">.</span>
              </h2>
            </div>
            <p>
              A few projects from the day job. <br />
              The short version, with details below.
            </p>
          </div>
          <div className="work-grid">
            {work.map((item) => (
              <article className="work-card" key={item.id}>
                <div className="work-card-top">
                  <div className="work-company">
                    <span>{item.company}</span>
                    <small>{item.business}</small>
                  </div>
                  <span className="work-number">/{item.id}</span>
                </div>
                <WorkGraphic kind={item.kind} />
                <div className="work-content">
                  <p className="eyebrow">{item.tenure}</p>
                  <h3>{item.title}</h3>
                  <ul className="work-highlights">
                    {item.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                  <p className="work-result">
                    <span>↗</span> {item.label}
                  </p>
                  <div className="tags">
                    {item.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
        <section id="approach" className="approach section">
          <div className="shell approach-grid">
            <div>
              <p className="eyebrow">02 / ME + AI</p>
              <h2>
                Yep, I use AI.
                <br />
                <span className="muted-heading">Here’s how.</span>
              </h2>
              <p className="approach-intro">
                It helped me make this site, too. At work, I build agents,
                automate the repetitive bits, and test what comes out.
              </p>
              <a
                className="text-link"
                href="https://github.com/youanBle/kelly.github.io"
                target="_blank"
                rel="noreferrer"
              >
                Peek at the source <Arrow />
              </a>
            </div>
            <div className="approach-steps">
              <article>
                <span className="step-number">01</span>
                <div>
                  <h3>Let it do something useful.</h3>
                  <p>
                    The agent I built at AXiM remembers the conversation and
                    connects to internal APIs. It can answer questions about
                    deals and kick off workflows.
                  </p>
                  <span className="small-label">
                    CONTEXT → TOOL CALLS → WORKFLOWS
                  </span>
                </div>
              </article>
              <article>
                <span className="step-number">02</span>
                <div>
                  <h3>Handle the messy bits.</h3>
                  <p>
                    Rent rolls, financial statements, content in 38 languages. I
                    build the pipelines that help AI work with all of it.
                  </p>
                  <span className="small-label">
                    STRUCTURED DATA / CONTENT REVIEW
                  </span>
                </div>
              </article>
              <article>
                <span className="step-number">03</span>
                <div>
                  <h3>Then check its work.</h3>
                  <p>
                    AI writes code. Bugs still happen. My Playwright tests check
                    the UI and financial outputs before a change goes live.
                  </p>
                  <span className="small-label">
                    GENERATE → VERIFY → RELEASE
                  </span>
                </div>
              </article>
            </div>
          </div>
        </section>
        <section id="about" className="section shell about off-clock">
          <div className="off-clock-heading">
            <div><p className="eyebrow">03 / OFF THE CLOCK</p><h2>Beyond work.</h2></div>
            <p className="off-clock-aside"><span>↳</span> CURRENT DISTRACTIONS<br />A few tabs that aren’t work.</p>
          </div>
          <OffClock />
          <div className="off-education">
            <span className="small-label">BEFORE ALL THESE TABS / EDUCATION</span>
            <p><strong>University of Ottawa</strong><span>MScAC · Electrical and Computer Engineering</span></p>
            <p><strong>Sichuan University</strong><span>B.Eng · Mechanical Engineering</span></p>
          </div>
        </section>
      </main>
      <footer className="shell footer">
        <a className="wordmark" href="#">
          kelly feng
          <span aria-hidden="true" className="mint">
            *
          </span>
        </a>
        <div className="footer-links">
          <a href="mailto:fengyible@gmail.com">
            Email <Arrow />
          </a>
          <a
            href="https://www.linkedin.com/in/yi-feng-kelly/"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn <Arrow />
          </a>
          <IntroStory />
        </div>
        <a href="#">Back to top ↑</a>
      </footer>
    </>
  );
}
