"use client";

import { useState, useEffect, useRef } from "react";


export default function ContactSection() {
  return (
    <div className="cyberpunk-contact-container flex flex-col items-center justify-center py-12 px-4">
      <h1 className="text-4xl font-bold neon-text mb-4 border-b-2 border-cyan-400 pb-2 tracking-widest">
        Contact
      </h1>
      <p className="text-lg text-cyan-200 mb-6 text-center">
        Interested in working together or have a question? <br />
        Reach out anytime!
      </p>
      <a
        href="mailto:fengyib@gmail.com"
        className="cyberpunk-contact-link text-2xl font-mono px-6 py-3 rounded-lg mb-10"
      >
        fengyib@gmail.com
      </a>
    </div>
  );
}
