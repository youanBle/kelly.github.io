"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import "./orbital-particles.css";

// Fixed coordinates keep the server render and hydration identical.
const particles = Array.from({ length: 28 }, (_, i) => {
  const angle = i * 2.39996;
  const radius = 178 + ((i * 17) % 58);
  return { x: 270 + Math.cos(angle) * radius, y: 250 + Math.sin(angle) * radius, size: i % 6 === 0 ? 1.8 : .8 + (i % 3) * .3 };
});

export default function OrbitalParticles() {
  const root = useRef<SVGGElement>(null);
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    const stage = root.current?.closest('.orbital-stage');
    if (!stage) return;
    let visible = false;
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setPlaying(visible && !document.hidden && !motion.matches && !document.querySelector('.story-dialog[open]'));
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; update(); }, { threshold:.1 });
    observer.observe(stage);
    document.addEventListener('visibilitychange', update);
    window.addEventListener('portfolio-intro-change', update);
    motion.addEventListener('change', update);
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', update); window.removeEventListener('portfolio-intro-change', update); motion.removeEventListener('change', update); };
  }, []);
  return <g ref={root} className="orbital-atmosphere" data-playing={playing} aria-hidden="true">
    <g className="orbit-ripples" stroke="#87d9b8" strokeWidth=".65">
      <circle className="orbit-ripple" cx="270" cy="250" r="169"/>
      <circle className="orbit-ripple ripple-later" cx="270" cy="250" r="169"/>
    </g>
    <g className="orbit-dust" fill="#b2f5ce">
      {particles.map((p,i) => <g key={i} transform={`translate(${p.x.toFixed(2)} ${p.y.toFixed(2)})`}>
        <g className="orbit-mote" style={{'--mote-time':`${6+i%5}s`,'--mote-delay':`${-i*.71}s`,'--mote-x':`${i%2 ? 4 : -4}px`,'--mote-y':`${i%3 ? -6 : 5}px`} as CSSProperties}>
          {i%6 === 0 && <circle r={p.size*4} opacity=".045"/>}
          <circle r={p.size} opacity={i%6 === 0 ? .7 : .35}/>
        </g>
      </g>)}
    </g>
    <g className="orbit-satellite satellite-a">
      <circle cx="270" cy="250" r="205" stroke="#90d9ba" strokeOpacity=".09" strokeWidth=".6" strokeDasharray="100 1188"/>
      <path d="M469 201a205 205 0 0 1 6 49" stroke="#a6f6cf" strokeOpacity=".45" strokeWidth=".9"/>
      <circle cx="475" cy="250" r="7" fill="#a6f6cf" fillOpacity=".06"/>
      <circle cx="475" cy="250" r="2.3" fill="#b9ffdb"/>
    </g>
    <g className="orbit-satellite satellite-b">
      <path d="M47 280a225 225 0 0 1-2-30" stroke="#79bed0" strokeOpacity=".35" strokeWidth=".8"/>
      <circle cx="45" cy="250" r="1.7" fill="#8cced8"/>
    </g>
    <g stroke="#98ccb6" strokeWidth=".7" opacity=".4">
      <path d="M90 100h8m-4-4v8M429 403h8m-4-4v8"/>
      <path d="M260 26h20M260 474h20" opacity=".35"/>
    </g>
  </g>;
}
