"use client";

import { useState, useEffect, useRef } from "react";


export default function AboutMe() {
   
  return (

    <div className="max-w-6xl mx-auto">
    <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 gradient-text">
      About Me
    </h2>
    <div className="grid md:grid-cols-2 gap-12 items-center">
      <div className="space-y-6 animate-slide-in-left">
        <p className="text-lg text-gray-300 leading-relaxed">
          I'm a passionate full-stack developer with 5+ years of experience building scalable web applications. 
          I specialize in modern JavaScript frameworks, cloud technologies, and creating seamless user experiences.
        </p>
        <p className="text-lg text-gray-300 leading-relaxed">
          My expertise spans from frontend development with React and TypeScript to backend services with Node.js 
          and Python, along with database design and cloud infrastructure.
        </p>
        <div className="flex gap-4">
          <div className="text-center hover-lift">
            <div className="text-3xl font-bold text-purple-400">50+</div>
            <div className="text-gray-400">Projects Completed</div>
          </div>
          <div className="text-center hover-lift">
            <div className="text-3xl font-bold text-blue-400">5+</div>
            <div className="text-gray-400">Years Experience</div>
          </div>
          <div className="text-center hover-lift">
            <div className="text-3xl font-bold text-pink-400">20+</div>
            <div className="text-gray-400">Happy Clients</div>
          </div>
        </div>
      </div>
      <div className="relative animate-slide-in-right">
        <div className="w-80 h-80 mx-auto bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center animate-float">
          <div className="text-6xl">👨‍💻</div>
        </div>
      </div>
    </div>
  </div>
  );
}
