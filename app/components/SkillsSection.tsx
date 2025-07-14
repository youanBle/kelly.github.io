"use client";

import { useState, useEffect, useRef } from "react";


export default function SkillsSection() {
  const skills = [
    { name: "React", level: 95, color: "#61DAFB" },
    { name: "Node.js", level: 90, color: "#339933" },
    { name: "TypeScript", level: 88, color: "#3178C6" },
    { name: "Python", level: 85, color: "#3776AB" },
    { name: "PostgreSQL", level: 82, color: "#336791" },
    { name: "AWS", level: 80, color: "#FF9900" },
  ];
  return (

    <div className="max-w-6xl mx-auto">
    <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 gradient-text">
      Skills & Technologies
    </h2>
    <div className="grid md:grid-cols-2 gap-8">
      {skills.map((skill, index) => (
        <div key={skill.name} className="space-y-2 animate-fade-in-up" style={{ animationDelay: `${index * 200}ms` }}>
          <div className="flex justify-between">
            <span className="text-lg font-medium">{skill.name}</span>
            <span className="text-purple-400">{skill.level}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
            <div 
              className="h-3 rounded-full transition-all duration-1000 ease-out relative"
              style={{ 
                width: `${skill.level}%`,
                backgroundColor: skill.color,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
  );
}
