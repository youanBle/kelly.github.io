"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import "./intro-story.css";
import "./page-build.css";

const scenes = [
  { label: "A small task", duration: 2300 },
  { label: "The first prompt", duration: 4400 },
  { label: "The first draft", duration: 4650 },
  { label: "Not quite", duration: 2200 },
  { label: "A better brief", duration: 5200 },
  { label: "A plan first", duration: 3600 },
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
                      WELCOME TO MY DIGITAL UNIVERSE
                    </p>
                    <h2 id="story-title">
                      Innovating the future.
                      <br />
                      <span>One pixel at a time.</span>
                    </h2>
                    <p className="bad-description">
                      Passionate. Visionary. Results-driven.
                    </p>
                    <span className="bad-cta">LET’S INNOVATE TOGETHER 🚀</span>
                  </div>
                  <div className="bad-cards">
                    <div>
                      <b>✧</b>
                      <h3>Innovation</h3>
                      <p>Turning bold ideas into digital experiences.</p>
                    </div>
                    <div>
                      <b>⌘</b>
                      <h3>Excellence</h3>
                      <p>Crafting solutions that go beyond expectations.</p>
                    </div>
                    <div>
                      <b>⚡</b>
                      <h3>Impact</h3>
                      <p>Building tomorrow’s possibilities, today.</p>
                    </div>
                  </div>
                </div>
              )}
              {step === 3 && (
                <div className="story-statement story-reaction">
                  <h2 id="story-title">
                    <span className="thought-line">No, no, no.</span>
                    <span className="thought-line thought-followup">
                      That’s definitely not what I want.
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
                        Okay, let’s try that again.
                        <br />
                        Use this skill. Here’s what I have in mind.
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
                          <dt>The feel</dt>
                          <dd>Dark, mint, a little cyber. Room to breathe.</dd>
                        </div>
                        <div>
                          <dt>The pieces</dt>
                          <dd>Next.js + React. Small, native components.</dd>
                        </div>
                        <div>
                          <dt>The layout</dt>
                          <dd>Work → AI → experience → a little about me.</dd>
                        </div>
                        <div>
                          <dt>The details</dt>
                          <dd>Mobile-friendly. Fast. Motion I can skip.</dd>
                        </div>
                      </dl>
                      <p className="brief-last-line">
                        Show me a plan before you build.
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
                        <li>Lead with your work.</li>
                        <li>Keep the copy human and the layout clean.</li>
                        <li>
                          Load the content first. Leave room for a little 3D
                          later.
                        </li>
                      </ol>
                    </Message>
                    <Message who="Kelly">
                      <p>
                        Yep, more like it. Keep it fast.
                        <br />
                        <span className="story-mint">Let’s make this one.</span>
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
