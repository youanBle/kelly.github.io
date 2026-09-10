"use client";

import { useEffect, useRef, useState } from "react";
import "./shopping-screen.css";

const products = [
  { name: "HEADPHONES", price: "$49", shape: "M8 23v-8a12 12 0 0124 0v8M8 16h5v12H8zM27 16h5v12h-5" },
  { name: "EVERYDAY BAG", price: "$28", shape: "M9 12h23l2 23H7zM15 12V8a6 6 0 0112 0v4" },
  { name: "FRESH KICKS", price: "$65", shape: "M6 18l10 5 7-5 5 8 8 3v6H5zM5 30h30M20 23l5 1M22 27h5" },
  { name: "DESK LAMP", price: "$32", shape: "M9 35h25M21 35V22L12 13M7 16l12-12 9 9-12 12z" },
  { name: "POCKET CAMERA", price: "$89", shape: "M5 12h8l3-5h11l3 5h6v23H5zM27 23a7 7 0 11-14 0 7 7 0 0114 0M30 16h2" },
  { name: "COFFEE FIRST", price: "$16", shape: "M8 13h22v16a6 6 0 01-6 6H14a6 6 0 01-6-6zM30 16h5v11h-5M14 7V3M23 7V3" },
  { name: "SMART WATCH", price: "$59", shape: "M14 10V2h14v8M14 30v8h14v-8M12 10h18v20H12zM21 14v7l5 3" },
  { name: "PLAY TIME", price: "$39", shape: "M12 13h18l7 17-3 5-10-7h-6L8 35l-4-5zM10 21h9M14 17v9M28 20h1M31 24h1" },
  { name: "NEW KEYS", price: "$45", shape: "M4 12h34v22H4zM9 18h2m5 0h2m5 0h2m5 0h2M9 24h2m5 0h2m5 0h2m5 0h2M12 29h18" },
];

export default function ShoppingScreen() {
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
    <div ref={host} className="shopping-scene" data-running={visible}>
      <div className="shopping-computer" role="img" aria-label="A three-dimensional desktop monitor with a storefront scrolling through nine products, then returning to the top">
        <div className="shopping-monitor">
          <div className="shopping-display">
            <svg viewBox="0 0 240 144" aria-hidden="true">
              <defs><clipPath id="shop-content"><rect x="5" y="26" width="226" height="113" rx="2"/></clipPath></defs>
              <rect width="240" height="144" fill="#101c1c"/>
              <path d="M0 23H240" stroke="#f79b7055"/>
              <text x="9" y="15" fill="#ffb18c" fontSize="9" fontFamily="monospace" letterSpacing="1">shopee</text>
              <rect x="74" y="7" width="116" height="10" rx="5" fill="#a6f6cf0c" stroke="#a6f6cf33"/>
              <circle cx="81" cy="11" r="2" fill="none" stroke="#a6f6cf77"/><path d="M83 13l2 2M213 8h12l-1 8h-10z" stroke="#a6f6cf" fill="none"/>
              <g clipPath="url(#shop-content)">
                <g className="shopping-feed">
                  <rect x="6" y="28" width="223" height="27" rx="3" fill="#f78c6317"/>
                  <text x="14" y="40" fill="#ffc4a0" fontSize="7" fontFamily="monospace">LITTLE FINDS. BIG MOOD.</text>
                  <text x="14" y="49" fill="#809e95" fontSize="4.5" fontFamily="monospace">YOUR NEXT FAVOURITE THING IS HERE.</text>
                  {products.map((product, i) => (
                    <g key={product.name} transform={`translate(${7 + (i % 3) * 75} ${61 + Math.floor(i / 3) * 78})`}>
                      <rect width="71" height="72" rx="3" fill="#162625" stroke="#83cdb52b"/>
                      <rect x="4" y="4" width="63" height="45" rx="2" fill={i % 2 ? "#b5795012" : "#66d4ba0b"}/>
                      <path d={product.shape} transform="translate(15 7)" stroke={i % 2 ? "#efb18a" : "#9eeacb"} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                      <text x="5" y="57" fill="#a7bab2" fontSize="4.5" fontFamily="monospace">{product.name}</text>
                      <text x="5" y="66" fill="#ffb18c" fontSize="6" fontFamily="monospace">{product.price}</text>
                      <path d="M59 60v6M56 63h6" stroke="#a6f6cf" strokeWidth=".8"/>
                    </g>
                  ))}
                </g>
              </g>
              <path d="M235 29v107" stroke="#a6f6cf18" strokeWidth="2"/>
              <rect className="shopping-scroll-thumb" x="234" y="29" width="2" height="30" rx="1" fill="#f5a477"/>
            </svg>
          </div>
          <span className="shopping-power"/>
        </div>
        <div className="shopping-neck"/><div className="shopping-base"/>
      </div>
      <span className="cyber-caption">COMMERCE / ONE MORE SCROLL</span>
    </div>
  );
}
