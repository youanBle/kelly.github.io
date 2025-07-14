"use client";

import { useState, useEffect, useRef } from "react";
import CyberpunkSkillCard from "./CyberpunkSkillCard";


export default function SkillsSection() {
  const skills = [
    { name: "TypeScript", level: 90, color: "#3178C6" },
    { name: "Node.js", level: 88, color: "#339933" },
    { name: "React.js", level: 92, color: "#61DAFB" },
    { name: "HTML/CSS", level: 95, color: "#E34F26" },
    { name: "SQL", level: 82, color: "#336791" },
    { name: "Python", level: 87, color: "#3776AB" },
    { name: "Java", level: 80, color: "#F89820" },
    { name: "AWS", level: 78, color: "#FF9900" },
  ];
  return (

    <div className="max-w-6xl mx-auto">
    <h2 className="text-4xl font-bold neon-text mb-4 border-b-2 border-cyan-400 pb-2 tracking-widest">
      Skills & Technologies
    </h2>
    <div
    style={{gap:32}}
     className="flex flex-wrap justify-center">
      {skills.map((skill) => (
        <CyberpunkSkillCard key={skill.name} skill={skill} />
      ))}
    </div>
  </div>
  );
}
