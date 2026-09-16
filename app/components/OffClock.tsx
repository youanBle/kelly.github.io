"use client";

import { useEffect, useRef, useState } from "react";
import "./off-clock.css";

export default function OffClock() {
  const root = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    let visible = false;
    const update = () => setPlaying(visible && !document.hidden && !document.querySelector('.story-dialog[open]'));
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; update(); }, { threshold:.12 });
    if (root.current) observer.observe(root.current);
    document.addEventListener('visibilitychange', update);
    window.addEventListener('portfolio-intro-change', update);
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', update); window.removeEventListener('portfolio-intro-change', update); };
  }, []);
  return <div ref={root} className="off-clock-cards" data-playing={playing}>
    <article className="off-card off-game">
      <div className="off-card-top"><span>01 / ROGUELIKE</span><span aria-hidden="true">↳</span></div>
      <svg viewBox="0 0 320 205" aria-hidden="true" className="off-illustration">
        <defs><pattern id="off-grid" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M20 0H0V20" fill="none" stroke="#a6f6cf" strokeOpacity=".06"/></pattern></defs>
        <rect x="24" y="15" width="272" height="175" fill="url(#off-grid)"/>
        <g fill="#182c24" stroke="#78aa90" strokeWidth="1.2"><rect x="39" y="118" width="57" height="51" rx="3"/><rect x="125" y="118" width="57" height="51" rx="3"/><rect x="125" y="35" width="57" height="51" rx="3"/><rect x="223" y="35" width="57" height="51" rx="3"/></g>
        <path d="M96 144h57V60h70" stroke="#9beac1" strokeOpacity=".4" strokeDasharray="3 5" fill="none"/>
        <path d="M248 69V51h11v18M245 69h17" fill="none" stroke="#d8c38f" strokeWidth="1.5"/>
        <g className="off-player"><path d="m67 137 7 7-7 7-7-7z" fill="#b2f5ce"/><circle cx="67" cy="144" r="13" stroke="#b2f5ce" strokeOpacity=".18" fill="none"/></g>
        <g fill="#658474" fontSize="7" fontFamily="monospace"><text x="43" y="181">SPAWN</text><text x="230" y="100">NEXT FLOOR</text></g>
        <path d="m156 56 4 4-4 4-4-4z" fill="#d8c38f" className="off-loot"/>
      </svg>
      <div className="off-card-copy"><h3>Just one more run.</h3><p>Roguelikes. Famous last words.</p></div>
    </article>
    <article className="off-card off-writing">
      <div className="off-card-top"><span>02 / FICTION</span><span className="off-note">no AI here</span></div>
      <svg viewBox="0 0 320 205" aria-hidden="true" className="off-illustration">
        <g transform="rotate(-5 160 104)">
          <path d="M84 28h157v160H84z" fill="#bdae8610" stroke="#ad9e7955"/>
          <path d="M77 21h157v160H77z" fill="#23251f" stroke="#b7aa8555"/>
          <path d="M99 21v160" stroke="#b78f7233"/>
          <g stroke="#b9b19119"><path d="M89 69h131M89 88h131M89 107h131M89 126h131M89 145h131"/></g>
          <text x="110" y="48" fill="#c5b897" fontSize="9" fontFamily="monospace">CHAPTER_</text>
          <g fill="none" stroke="#d5c7a2" strokeWidth="1.5" strokeLinecap="round"><path className="off-ink ink-a" d="M111 65h90"/><path className="off-ink ink-b" d="M111 84h100"/><path className="off-ink ink-c" d="M111 103h63"/></g>
          <path className="off-caret" d="M181 96v9" stroke="#b2f5ce"/>
          <path d="m197 137 3 4 10-12" stroke="#aebba0" fill="none"/>
        </g>
        <path d="m249 77-25 85-5 9-1-11 25-85z" fill="#c6b88c14" stroke="#c6b88c" strokeWidth="1.2"/>
      </svg>
      <div className="off-card-copy"><h3>Words, the slow way.</h3><p>Fiction. Written by a human. Me.</p></div>
    </article>
    <article className="off-card off-food">
      <div className="off-card-top"><span>03 / FOOD SHOWS</span><span aria-hidden="true">▷</span></div>
      <svg viewBox="0 0 320 205" aria-hidden="true" className="off-illustration">
        <path d="m132 30 21 17 23-22" stroke="#b28e74" fill="none"/>
        <rect x="51" y="45" width="220" height="129" rx="13" fill="#25241f" stroke="#bc947568"/>
        <rect x="61" y="55" width="174" height="106" rx="8" fill="#171e1a" stroke="#bc94753b"/>
        <circle cx="251" cy="76" r="6" fill="none" stroke="#bc9475"/><circle cx="251" cy="96" r="3" fill="#b2f5ce"/>
        <path d="M246 130h11M246 135h11M246 140h11M75 174v8M246 174v8" stroke="#bc9475"/>
        <ellipse cx="148" cy="141" rx="49" ry="5" fill="none" stroke="#9abda044"/>
        <path d="M111 111h73c-3 20-15 29-36 29s-34-10-37-29z" fill="#c3a28010" stroke="#c3a280" strokeWidth="1.5"/>
        <path d="m177 99 16-17M181 104l19-15" stroke="#c3a280" strokeWidth="1.5"/>
        <g fill="none" stroke="#b2f5ce" strokeWidth="1.2" strokeLinecap="round"><path className="off-steam steam-a" d="M132 101c-9-8 8-12 0-21"/><path className="off-steam steam-b" d="M148 96c-9-8 8-12 0-21"/><path className="off-steam steam-c" d="M162 101c-9-8 8-12 0-21"/></g>
        <text x="72" y="69" fill="#9abda0" fontSize="6" fontFamily="monospace">NOW PLAYING</text>
      </svg>
      <div className="off-card-copy"><h3>One more episode.</h3><p>Preferably something delicious.</p></div>
    </article>
  </div>;
}
