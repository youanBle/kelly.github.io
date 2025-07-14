"use client";

import { useState, useEffect, useRef } from "react";


export default function AboutMe() {
   
  return (

    <div className="max-w-6xl mx-auto">
    <h2 className="text-4xl font-bold neon-text mb-4 border-b-2 border-cyan-400 pb-2 tracking-widest">
      About Me
    </h2>
    <div className="grid md:grid-cols-2 gap-12 items-center">
      <div className="space-y-6 animate-slide-in-left">
        <p className="text-lg text-gray-300 leading-relaxed">
        Hi, I’m Kelly — a full-stack developer by day, sci-fi fanatic by night. I write code for a living and stories for fun (sometimes they're the same thing).
        </p>
        <p className="text-lg text-gray-300 leading-relaxed">
        I’m a die-hard Asimov fan, which probably explains my obsession with clean logic, rogue AIs, and extremely long project timelines. I try to live by my own version of the Three Laws:
        </p>
       <ul>
        <li>Never write code that harms the user.</li>
        <li>Always stay loyal to great user experience (unless it violates Law 1).</li>
        <li>Protect your own sanity — especially during production outages.</li>
       </ul>
       <p className="text-lg text-gray-300 leading-relaxed mt-4">
          Whether it’s shipping scalable web apps, building quirky internal tools, or crafting questionable jokes, 
          I love creating things that make people think — or at least laugh (just hopefully not during a code review).
        </p>
        <p className="text-lg text-gray-300 leading-relaxed mt-4">
        Welcome to my little corner of the multiverse.
        </p>
      </div>
    </div>
  </div>
  );
}
