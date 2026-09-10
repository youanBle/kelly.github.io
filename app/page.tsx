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
      <div className="stage-label">
        <span className="cross">+</span> A LITTLE ROOM TO EXPERIMENT.
      </div>
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
        <g fill="#a6f6cf">
          <circle cx="438" cy="250" r="4" />
          <circle cx="168" cy="119" r="3" />
          <circle cx="222" cy="409" r="3" />
        </g>
        <path
          d="M438 250h49v-53M168 119V74h-58M222 409v28h-78"
          stroke="#789c8d"
          strokeWidth=".7"
        />
        <g
          fill="#94a69e"
          fontFamily="monospace"
          fontSize="9"
          letterSpacing="1.2"
        >
          <text x="450" y="186">
            BUILD
          </text>
          <text x="72" y="63">
            THINK
          </text>
          <text x="97" y="443">
            REFINE
          </text>
        </g>
        <path d="M260 250h20M270 240v20" stroke="#b7fbd8" />
      </svg>
      <div className="stage-footer">
        <span>SIDE QUEST / SOMETHING TAKING SHAPE</span>
        <span>↗</span>
      </div>
    </div>
  );
}

const work = [
  {
    id: "01",
    company: "AXiM",
    category: "AI / REAL ESTATE",
    title: "An AI agent for real estate.",
    description:
      "I’m building a real estate platform where you can ask about deals, work with financial data, and get things done with an AI agent.",
    tags: ["Next.js", "TypeScript", "Python", "Playwright"],
    kind: "agent",
    label: "Natural language → real workflows",
    details:
      "I handle the front end and the API layer behind it. The agent streams replies, keeps track of the conversation, and calls internal tools. I also built a Python pipeline to clean up rent rolls and operating statements, with Playwright tests checking both the UI and the financial outputs.",
  },
  {
    id: "02",
    company: "AfterShip",
    category: "WEB / AUTOMATION",
    title: "Hello, in 38 languages.",
    description:
      "I built tools to translate, review, and publish content across 38 languages. Plus a bunch of fast pages and handy little web tools.",
    tags: ["React", "Node.js", "Docker", "WebGL"],
    kind: "language",
    label: "38 languages · automated publishing",
    details:
      "The translation and review system runs on Node.js and Docker and handles publishing across 38 languages. I also worked on server-rendered pages, SEO tools, and an internal tracking SDK and A/B testing setup using TypeScript and PostHog.",
  },
  {
    id: "03",
    company: "Shopee",
    category: "DATA / VISUALIZATION",
    title: "Where does this data go?",
    description:
      "I turned data pipelines and SQL lineage into visual tools, so the team could see what connects to what.",
    tags: ["Nuxt.js", "Canvas", "Node.js", "SQL"],
    kind: "pipeline",
    label: "40% faster data warehouse operations",
    details:
      "I built a Nuxt.js portal for managing Flink pipelines, helping the data warehouse team work 40% faster. I also used Canvas and Node.js to show how individual columns flow through SQL queries.",
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
          <a href="#experience" aria-label="Explore experience">
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
                  <span>{item.company}</span>
                  <span className="work-number">/{item.id}</span>
                </div>
                <WorkGraphic kind={item.kind} />
                <div className="work-content">
                  <p className="eyebrow">{item.category}</p>
                  <h3>{item.title}</h3>
                  <p className="work-description">{item.description}</p>
                  <p className="work-result">
                    <span>↗</span> {item.label}
                  </p>
                  <div className="tags">
                    {item.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                  <details>
                    <summary>
                      The nerdy details{" "}
                      <span className="details-plus" aria-hidden="true">
                        +
                      </span>
                    </summary>
                    <p>{item.details}</p>
                  </details>
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
        <section id="experience" className="section shell experience">
          <div className="section-heading">
            <div>
              <p className="eyebrow">03 / WORK HISTORY</p>
              <h2>Where I’ve been.</h2>
            </div>
          </div>
          <div className="experience-list">
            {[
              {
                company: "AXiM",
                role: "Senior Front-end Developer",
                date: "AUG 2025 — PRESENT",
                place: "Toronto, Canada",
                text: "Building an AI-powered real estate platform. I look after the front end, the API layer behind it, testing, and getting releases out the door.",
                current: true,
              },
              {
                company: "AfterShip",
                role: "Full-Stack Developer · Growth",
                date: "MAY 2024 — JUN 2025",
                place: "Guangdong, China",
                text: "Built fast web pages, useful SEO tools, and an AI translation system. Also helped the team track what was working with analytics and A/B tests.",
              },
              {
                company: "Infor",
                role: "Software Engineer · WFM",
                date: "JAN 2023 — FEB 2024",
                place: "Toronto, Canada",
                text: "Moved older workforce tools to Angular and Kotlin, keeping the existing features working with 85% Jasmine unit test coverage.",
              },
              {
                company: "Shopee",
                role: "Front-end Developer · Seller",
                date: "JUL 2021 — SEP 2022",
                place: "Guangdong, China",
                text: "Built visual tools for managing Flink pipelines and tracing SQL data. Less digging around to find out what’s connected.",
              },
            ].map((job) => (
              <article key={job.company} className="experience-row">
                <div className="experience-date">
                  {job.current && (
                    <span className="current-label">
                      <span className="status-dot" /> CURRENT
                    </span>
                  )}
                  <span>{job.date}</span>
                </div>
                <div className="experience-title">
                  <h3>{job.company}</h3>
                  <p>{job.role}</p>
                  <span>{job.place}</span>
                </div>
                <p className="experience-description">{job.text}</p>
              </article>
            ))}
          </div>
        </section>
        <section id="about" className="section shell about">
          <div>
            <p className="eyebrow">04 / HELLO AGAIN</p>
            <h2>
              A bit about me.
              <br />
              Beyond the tabs.
            </h2>
            <p className="about-copy">
              I started in mechanical engineering, moved into computer
              engineering, and ended up building software. I’ve worked in China
              and Canada, on everything from web pages to data pipelines.
            </p>
            <p className="about-copy">
              Right now, I’m looking for a new team and something interesting to
              work on. If that sounds like your corner of the internet, say hi.
            </p>
            <div className="education">
              <span className="small-label">EDUCATION</span>
              <p>
                <strong>University of Ottawa</strong>
                <span>MScAC · Electrical and Computer Engineering</span>
              </p>
              <p>
                <strong>Sichuan University</strong>
                <span>B.Eng · Mechanical Engineering</span>
              </p>
            </div>
          </div>
          <div className="toolbox">
            <div className="toolbox-header">
              <span className="eyebrow">TOOLS I REACH FOR</span>
              <span aria-hidden="true">↗</span>
            </div>
            {[
              {
                name: "Interfaces",
                tools: "TypeScript / React / Next.js / Angular / Vue",
              },
              {
                name: "Systems & data",
                tools: "Node.js / Python / SQL / GraphQL / Redis",
              },
              {
                name: "Testing & shipping",
                tools: "Playwright / Docker / AWS / Cloudflare",
              },
              {
                name: "Visualization & growth",
                tools: "Canvas / WebGL / ECharts / PostHog",
              },
            ].map((group) => (
              <div className="toolbox-row" key={group.name}>
                <h3>{group.name}</h3>
                <p>{group.tools}</p>
              </div>
            ))}
            <div className="toolbox-note">
              <span className="status-dot" /> THERE’S ALWAYS SOMETHING NEW TO
              TRY
            </div>
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
          <a
            href="https://github.com/youanBle"
            target="_blank"
            rel="noreferrer"
          >
            GitHub <Arrow />
          </a>
          <IntroStory />
        </div>
        <a href="#">Back to top ↑</a>
      </footer>
    </>
  );
}
