"use client";

import { useEffect, useRef, useState } from "react";
import "./delivery-truck.css";

export default function DeliveryTruck() {
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
    <div ref={host} className="delivery-scene" data-running={visible}>
      <svg viewBox="0 0 360 210" role="img" aria-label="A mint green delivery truck carrying three parcels, driving along a road">
        <defs>
          <linearGradient id="delivery-road" gradientUnits="userSpaceOnUse" x1="15" x2="345"><stop stopColor="#8ee9c0" stopOpacity="0"/><stop offset=".5" stopColor="#8ee9c0" stopOpacity=".45"/><stop offset="1" stopColor="#8ee9c0" stopOpacity="0"/></linearGradient>
        </defs>
        <path d="M15 167H345" stroke="url(#delivery-road)"/>
        <g className="delivery-road" stroke="#8ee9c0" strokeOpacity=".2" strokeDasharray="18 30"><path d="M-48 177H408"/></g>
        <g className="delivery-drive" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7">
          <g className="delivery-bounce">
            <g className="delivery-speed" stroke="#85e5c0" strokeOpacity=".5"><path d="M58 123H78M49 135H70M65 146H80"/></g>
            <g stroke="#e2c78d" fill="#22271e">
              <g className="delivery-parcel parcel-one"><rect x="99" y="102" width="35" height="31" rx="2"/><path d="M112 102v11h9v-11M106 124h7"/></g>
              <g className="delivery-parcel parcel-two"><rect x="138" y="98" width="39" height="35" rx="2"/><path d="M153 98v12h9V98M165 124h5"/></g>
              <g className="delivery-parcel parcel-three"><rect x="117" y="74" width="32" height="25" rx="2"/><path d="M128 74v9h9v-9"/></g>
            </g>
            <g stroke="#a5f5ce" fill="#15271f">
              <path d="M90 129v16h104V99h25l24 27v19h-9M101 145h-11M126 145h79"/>
              <path d="M202 107h14l16 18h-30z" fill="#a5f5ce" fillOpacity=".06"/>
              <path d="M194 133H90M204 134h6M240 131h-5v6h7M89 141h-4v7h11M236 145h10v5h-13"/>
              <path d="M105 139h57" strokeOpacity=".3"/>
            </g>
          </g>
          {[113, 220].map(x => <g key={x} transform={`translate(${x} 153)`} stroke="#a5f5ce"><circle r="12" fill="#101b15"/><circle r="5" strokeOpacity=".5"/><g className="delivery-wheel"><path d="M0-10v5M10 0H5M0 10V5M-10 0h5"/></g><circle r="1.5" fill="#a5f5ce" stroke="none"/></g>)}
        </g>
        <g className="delivery-tracking" fontFamily="monospace" aria-hidden="true">
          <text x="222" y="30" fontSize="6.5" letterSpacing="1.2" fill="#8ba69a">TRACKING / #0248</text>
          <g className="tracking-status tracking-transit">
            <circle cx="225" cy="43" r="2" fill="#dcc58e"/>
            <text x="233" y="46" fontSize="8" fill="#dcc58e">In transit</text>
          </g>
          <g className="tracking-status tracking-out">
            <circle className="tracking-pulse" cx="225" cy="43" r="2" fill="#a6f6cf"/>
            <text x="233" y="46" fontSize="8" fill="#a6f6cf">Out for delivery</text>
          </g>
          <g className="tracking-status tracking-done">
            <path d="m222 43 2 2 4-5" stroke="#a6f6cf" fill="none" strokeWidth="1.2"/>
            <text x="233" y="46" fontSize="8" fill="#a6f6cf">Delivered</text>
          </g>
          <path d="M222 55h107" stroke="#a6f6cf20" strokeWidth="1.5"/>
          <path className="tracking-progress" d="M222 55h107" stroke="#a6f6cf" strokeWidth="1.5" pathLength="1" strokeDasharray="1"/>
        </g>
      </svg>
    </div>
  );
}
