"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import "./intro-story.css";
import "./page-build.css";

const scenes = [
  { label: "A small task", duration: 2000 },
  { label: "The first prompt", duration: 3000 },
  { label: "The first draft", duration: 3900 },
  { label: "Not quite", duration: 2200 },
  { label: "A better brief", duration: 5200 },
  { label: "A plan first", duration: 4300 },
];

function Message({
  who,
  children,
}: {
  who: "Kelly" | "AI";
  children: React.ReactNode;
}) {
  return (
    <div className={`story-message from-${who.toLowerCase()}`}>
      <span className="story-avatar" aria-hidden="true">
        {who === "Kelly" ? "k" : "✳"}
      </span>
      <div>
        <span className="message-author">{who}</span>
        <div className="message-body">{children}</div>
      </div>
    </div>
  );
}

function ChatWindow({
  children,
  status,
}: {
  children: React.ReactNode;
  status: string;
}) {
  return (
    <div className="chat-window">
      <div className="chat-window-header">
        <span className="chat-identity">
          <span aria-hidden="true">✳</span> AI{" "}
          <span className="chat-topic">/ Personal website</span>
        </span>
        <span className="chat-window-status">
          <i />
          {status}
        </span>
      </div>
      <div className="chat-messages">{children}</div>
      <div className="chat-composer" aria-hidden="true">
        <span>+</span>
        <span>Message AI…</span>
        <span className="composer-send">↑</span>
      </div>
      <p className="chat-reenactment">
        A replay of the process. Not a live chat.
      </p>
    </div>
  );
}

export default function IntroStory() {
  const dialog = useRef<HTMLDialogElement>(null);
  const replay = useRef<HTMLButtonElement>(null);
  const sceneViewport = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [step, setStep] = useState(0);
  const [pageHidden, setPageHidden] = useState(false);
  const remaining = useRef(scenes[0].duration);
  const timerScene = useRef(0);
  const [building, setBuilding] = useState(false);
  const buildTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const endBuild = useCallback(() => {
    if (buildTimer.current) clearTimeout(buildTimer.current);
    document.body.removeAttribute("data-site-building");
    setBuilding(false);
  }, []);

  const finish = useCallback((reveal = false) => {
    endBuild();
    if (reveal && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.body.setAttribute("data-site-building", "true");
      setBuilding(true);
      buildTimer.current = setTimeout(endBuild, 3400);
    }
    dialog.current?.close();
    window.dispatchEvent(new Event("portfolio-intro-change"));
    setActive(false);
    window.scrollTo({ top: 0, behavior: "instant" });
    document.getElementById("main")?.focus({ preventScroll: true });
  }, [endBuild]);

  const start = useCallback(() => {
    endBuild();
    remaining.current = scenes[0].duration;
    timerScene.current = 0;
    setStep(0);
    setPageHidden(document.hidden);
    setActive(true);
    dialog.current?.showModal();
    window.dispatchEvent(new Event("portfolio-intro-change"));
  }, [endBuild]);

  const advance = useCallback(() => {
    if (step === scenes.length - 1) {
      finish(true);
      return;
    }
    setStep(step + 1);
  }, [step, finish]);

  useEffect(() => () => {
    if (buildTimer.current) clearTimeout(buildTimer.current);
    document.body.removeAttribute("data-site-building");
  }, []);

  useEffect(() => {
    // Every mount starts the story. No persistence or repeat-visit shortcut.
    start();
    const onVisibilityChange = () => setPageHidden(document.hidden);
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [start, finish]);

  useEffect(() => {
    if (!active) return;
    const previous = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = previous;
    };
  }, [active]);

  useEffect(() => {
    if (timerScene.current !== step) {
      timerScene.current = step;
      remaining.current = scenes[step].duration;
    }
    if (!active || pageHidden) return;
    const started = performance.now();
    const timer = window.setTimeout(advance, remaining.current);
    return () => {
      window.clearTimeout(timer);
      remaining.current = Math.max(
        0,
        remaining.current - (performance.now() - started),
      );
    };
  }, [active, pageHidden, step, advance]);

  useEffect(() => {
    sceneViewport.current?.scrollTo({ top: 0, behavior: "instant" });
  }, [step]);

  return (
    <>
      <button ref={replay} className="intro-replay" onClick={() => start()}>
        <span aria-hidden="true">↺</span> How this started
      </button>
      {building && <button className="story-skip build-skip" onClick={endBuild}>Skip <span aria-hidden="true">↗</span></button>}
      <dialog
        ref={dialog}
        className="story-dialog"
        aria-labelledby="story-title"
        aria-describedby="story-description"
        onCancel={(event) => {
          event.preventDefault();
          finish();
        }}
      >
        <div
          className={`story-shell tone-${step}`}
          data-paused={pageHidden}
        >
          <p id="story-description" className="story-sr-only">
            A scripted reenactment of making this website. Each scene fills the
            screen. Skip at any time.
          </p>
          <button className="story-skip" onClick={() => finish()} autoFocus>
            Skip intro <span aria-hidden="true">↗</span>
          </button>
          <div className="story-viewport" ref={sceneViewport}>
            <div key={step} className={`story-scene scene-${step}`}>
              <span className="story-sr-only" aria-live="polite">
                Scene {step + 1}: {scenes[step].label}
              </span>
              {step === 0 && (
                <div className="story-statement">
                  <h2 id="story-title">
                    <span className="thought-line">
                      Okay, I’m looking for a job.
                    </span>
                    <span className="thought-line thought-followup">
                      Time to update my personal website.
                    </span>
                  </h2>
                </div>
              )}
              {step === 1 && (
                <div className="story-conversation">
                  <h2 id="story-title" className="story-sr-only">
                    Asking AI for a new website
                  </h2>
                  <ChatWindow status="Generating">
                    <Message who="Kelly">
                      <p>
                        Hi AI, can you make me a new portfolio page?
                        <br />
                        I’ve got eight meetings to get through. You get started.
                      </p>
                    </Message>
                    <Message who="AI">
                      <p>On it.</p>
                      <div className="story-loading">
                        <span />
                        <span />
                        <span />
                        <small>Building your first draft…</small>
                      </div>
                      <div className="generation-track" aria-hidden="true">
                        <i />
                      </div>
                    </Message>
                  </ChatWindow>
                </div>
              )}
              {step === 2 && (
                <div className="bad-page">
                  <nav
                    className="bad-nav"
                    aria-label="First draft illustration"
                  >
                    <strong>
                      KELLY<span>.AI</span>
                    </strong>
                    <div aria-hidden="true">
                      HOME <span>ABOUT</span> CONTACT
                    </div>
                  </nav>
                  <div className="bad-hero">
                    <span className="bad-spark spark-one" aria-hidden="true">
                      ✦
                    </span>
                    <span className="bad-spark spark-two" aria-hidden="true">
                      ✧
                    </span>
                    <p className="bad-eyebrow">
                      SENIOR FRONT-END DEVELOPER · TORONTO
                    </p>
                    <h2 id="story-title">
                      Hi, I’m Kelly.
                      <br />
                      <span>I build web products.</span>
                    </h2>
                    <p className="bad-description">
                      From front-end architecture to AI workflows and release.
                    </p>
                    <span className="bad-cta">EXPLORE MY WORK 🚀</span>
                  </div>
                  <div className="bad-cards">
                    <div>
                      <b>✧</b>
                      <h3>AI products</h3>
                      <p>Agents for real estate workflows and financial data.</p>
                    </div>
                    <div>
                      <b>⌘</b>
                      <h3>Growth &amp; web</h3>
                      <p>SEO tools, experiments, and content across 38 languages.</p>
                    </div>
                    <div>
                      <b>⚡</b>
                      <h3>Data visualization</h3>
                      <p>Visual pipelines, SQL lineage, and workflow tools.</p>
                    </div>
                  </div>
                </div>
              )}
              {step === 3 && (
                <div className="story-statement story-reaction">
                  <h2 id="story-title">
                    <span className="thought-line">No, no, no.</span>
                    <span className="thought-line thought-followup">
                      This feels way too AI. We can’t do this.
                    </span>
                  </h2>
                </div>
              )}
              {step === 4 && (
                <div className="story-conversation brief-conversation">
                  <h2 id="story-title" className="story-sr-only">
                    Giving AI a better brief
                  </h2>
                  <ChatWindow status="Reading the brief">
                    <Message who="Kelly">
                      <p>
                        Here’s the reference and the real brief.
                        <br />
                        Treat it as a product spec, then plan before you build.
                      </p>
                      <a
                        className="skill-attachment"
                        href={`${process.env.PAGES_BASE_PATH || ""}/personal-site-skill.md`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        ↳ personal-site-skill.md <span>↗</span>
                      </a>
                      <dl className="brief-list">
                        <div>
                          <dt>Design</dt>
                          <dd>
                            Extract reusable color, type, spacing, surface, and
                            motion tokens from the reference.
                          </dd>
                        </div>
                        <div>
                          <dt>Sections</dt>
                          <dd>
                            Intro → selected work → AI workflow → about →
                            contact.
                          </dd>
                        </div>
                        <div>
                          <dt>Responsive</dt>
                          <dd>
                            Mobile-first, touch-friendly, and readable at every
                            breakpoint.
                          </dd>
                        </div>
                        <div>
                          <dt>3D</dt>
                          <dd>
                            Use Three.js for small interactive scenes with depth
                            and pointer response, plus static fallbacks.
                          </dd>
                        </div>
                        <div>
                          <dt>SSR + SEO</dt>
                          <dd>
                            Keep core content in static HTML. Lazy-load 3D on the
                            client and add complete metadata.
                          </dd>
                        </div>
                      </dl>
                      <p className="brief-last-line">
                        Before coding, propose the design system, component map,
                        3D approach, SEO strategy, and validation plan.
                      </p>
                    </Message>
                  </ChatWindow>
                </div>
              )}
              {step === 5 && (
                <div className="story-conversation plan-conversation">
                  <h2 id="story-title" className="story-sr-only">
                    Reviewing the plan
                  </h2>
                  <ChatWindow status="Planning">
                    <Message who="AI">
                      <p>Here’s the plan.</p>
                      <ol className="plan-list">
                        <li>Turn the reference into reusable design tokens.</li>
                        <li>Map the resume into five focused content regions.</li>
                        <li>
                          Render the content first; load isolated Three.js scenes
                          only when needed.
                        </li>
                        <li>Validate mobile, accessibility, SEO, and performance.</li>
                      </ol>
                      <div className="plan-sketches" aria-label="Low-fidelity page layouts">
                        <figure>
                          <svg viewBox="0 0 120 82" aria-hidden="true">
                            <path className="sketch-frame" d="M5 6L114 5L116 76L4 77Z" />
                            <path d="M5 17L115 16M12 11h18M96 11h12" />
                            <path className="sketch-fill" d="M12 24h52v25H12z" />
                            <path d="M17 30h30M17 36h39M17 42h22" />
                            <path className="sketch-fill" d="M72 24h35v25H72z" />
                            <circle className="sketch-note" cx="90" cy="36" r="9" />
                            <path d="M12 56h28v13H12zM46 56h28v13H46zM80 56h28v13H80z" />
                          </svg>
                          <figcaption>HOME</figcaption>
                        </figure>
                        <figure>
                          <svg viewBox="0 0 120 82" aria-hidden="true">
                            <path className="sketch-frame" d="M5 5L115 6L114 77L4 76Z" />
                            <path d="M5 16h110M12 10h23M99 10h9" />
                            <path className="sketch-fill" d="M12 23h96v12H12zM12 41h96v12H12zM12 59h96v10H12z" />
                            <path d="M18 27h28M75 27h25M18 45h43M82 45h18M18 63h35" />
                            <path className="sketch-note" d="M68 20c9-4 26 0 29 9M68 20l5-5M68 20l7 3" />
                          </svg>
                          <figcaption>SECTIONS</figcaption>
                        </figure>
                        <figure>
                          <svg viewBox="0 0 120 82" aria-hidden="true">
                            <path className="sketch-frame" d="M38 4L82 5L80 78L39 77Z" />
                            <path d="M39 14h42M45 9h17M72 9h4" />
                            <path className="sketch-fill" d="M45 20h29v19H45zM45 44h29v9H45zM45 58h29v10H45z" />
                            <path d="M49 25h14M49 30h20M49 35h10M49 48h17M49 62h16" />
                            <circle className="sketch-note" cx="86" cy="31" r="14" />
                            <path d="M96 42l8 8M104 50l-1-7M104 50l-7-1" />
                          </svg>
                          <figcaption>MOBILE</figcaption>
                        </figure>
                      </div>
                    </Message>
                    <Message who="Kelly">
                      <p>
                        Okay, more like it. Keep it fast.
                        <br />
                        <span className="story-mint">
                          Check the interactions and mobile overflow, then let’s
                          make this one.
                        </span>
                      </p>
                    </Message>
                  </ChatWindow>
                </div>
              )}
            </div>
          </div>

        </div>
      </dialog>
    </>
  );
}
