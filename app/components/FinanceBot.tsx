"use client";

import { useEffect, useRef, useState } from "react";
import "./cyber-scene.css";
import "./finance-bot.css";

export default function FinanceBot() {
  const host = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    let inView = false;
    const update = () => setVisible(inView && !document.hidden && !document.querySelector(".story-dialog[open]"));
    const observer = new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; update(); }, { threshold: 0.1 });
    if (host.current) observer.observe(host.current);
    document.addEventListener("visibilitychange", update);
    window.addEventListener("portfolio-intro-change", update);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", update);
      window.removeEventListener("portfolio-intro-change", update);
    };
  }, []);
  return (
    <div ref={host} className="finance-bot-scene" data-running={visible}>
      <svg viewBox="0 0 360 210" role="img" aria-label="A hand gives a stack of financial documents to a bot, which processes them and generates bar, line and donut charts">
        <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
          <g className="finance-hand" stroke="#c6dcc5" fill="#18261e">
            <path d="M-15 139H26l18-9 13-17c3-5 9-2 7 2l-6 13h39c7 0 8 6 1 9l-27 16c-6 4-12 6-20 6H-15z"/>
            <path d="M30 138l10 14M58 128l-10 8M10 139v20"/>
          </g>
          <g className="finance-documents" stroke="#dac490" fill="#202a21">
            <path d="M64 66h33l8 8v45H64z" transform="rotate(-10 84 93)"/>
            <path d="M69 64h33l8 8v48H69z" transform="rotate(5 89 93)"/>
            <path d="M73 67h27l9 10v45H73zM100 67v11h9"/>
            <path d="M81 85h19M81 91h19M81 97h10M81 113v-7M88 113v-11M95 113v-16" strokeWidth="1.1"/>
          </g>
          <g className="finance-bot" stroke="#a6f6cf" fill="#16271f">
            <path d="M163 76V64"/><circle className="finance-antenna" cx="163" cy="61" r="3"/>
            <rect x="137" y="77" width="52" height="42" rx="12"/>
            <path d="M137 90h-5v15h5M189 90h5v15h-5"/>
            <rect x="145" y="85" width="36" height="21" rx="7" fill="#101e18" strokeOpacity=".4"/>
            <g className="finance-eyes" strokeWidth="2.6"><path d="M153 92v5M173 92v5"/></g>
            <path d="M159 102q4 3 8 0" strokeWidth="1"/>
            <rect x="143" y="124" width="40" height="27" rx="7"/>
            <path d="M151 156v5M175 156v5M139 130l-10 7M188 130l10-5"/>
            <path d="M153 133h20" strokeOpacity=".4"/>
            <g className="finance-processing" fill="#a6f6cf" stroke="none"><circle cx="156" cy="141" r="1.5"/><circle cx="163" cy="141" r="1.5"/><circle cx="170" cy="141" r="1.5"/></g>
          </g>
          <g className="finance-output" stroke="#a6f6cf">
            <path d="M203 103h14m-4-4 4 4-4 4" strokeOpacity=".65"/>
            <g className="finance-chart chart-one">
              <rect x="228" y="47" width="101" height="53" rx="5" fill="#182a24" strokeOpacity=".5"/>
              <path d="M237 56h20" strokeOpacity=".35"/>
              <path className="finance-trend" d="M238 86l15-8 13 4 15-15 12 5 24-13" stroke="#a6f6cf" strokeWidth="2"/>
              <circle cx="317" cy="59" r="2" fill="#a6f6cf"/>
            </g>
            <g className="finance-chart chart-two">
              <rect x="228" y="107" width="51" height="57" rx="5" fill="#182a24" strokeOpacity=".5"/>
              <path d="M236 116h14" strokeOpacity=".35"/>
              <g className="finance-bars" fill="#a6f6cf33"><rect x="237" y="139" width="6" height="16"/><rect x="248" y="131" width="6" height="24"/><rect x="259" y="124" width="6" height="31"/></g>
            </g>
            <g className="finance-chart chart-three">
              <rect x="286" y="107" width="43" height="57" rx="5" fill="#182a24" strokeOpacity=".5"/>
              <circle cx="307.5" cy="133" r="12" stroke="#a6f6cf33" strokeWidth="5"/>
              <circle className="finance-donut" cx="307.5" cy="133" r="12" stroke="#dec78f" strokeWidth="5" strokeDasharray="51 76" transform="rotate(-90 307.5 133)"/>
              <path d="M300 155h15" strokeOpacity=".35"/>
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}
