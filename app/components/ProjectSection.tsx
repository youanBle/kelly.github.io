"use client";

import { useState, useEffect, useRef } from "react";


export default function ProjectSection() {
  const projects = [
    {
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce solution with React, Node.js, and PostgreSQL",
      tech: ["React", "Node.js", "PostgreSQL", "Stripe"],
      image: "/project1.jpg",
      link: "#"
    },
    {
      title: "Real-time Chat App",
      description: "WebSocket-based chat application with user authentication",
      tech: ["Socket.io", "Express", "MongoDB", "JWT"],
      image: "/project2.jpg",
      link: "#"
    },
    {
      title: "Task Management System",
      description: "Collaborative project management tool with real-time updates",
      tech: ["React", "Firebase", "Material-UI", "Redux"],
      image: "/project3.jpg",
      link: "#"
    }
  ];
  return (

    <div className="max-w-6xl mx-auto">
    <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 gradient-text">
      Featured Projects
    </h2>
    <div className="grid md:grid-cols-3 gap-8">
      {projects.map((project, index) => (
        <div 
          key={project.title}
          className="bg-black/20 rounded-xl p-6 hover:bg-black/30 transition-all duration-300 transform hover:scale-105 border border-white/10 hover-lift animate-scale-in"
          style={{ animationDelay: `${index * 200}ms` }}
        >
          <div className="w-full h-48 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
            <div className="text-4xl z-10">🚀</div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
          </div>
          <h3 className="text-xl font-bold mb-2">{project.title}</h3>
          <p className="text-gray-400 mb-4">{project.description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tech.map((tech) => (
              <span key={tech} className="px-3 py-1 bg-purple-600/20 text-purple-300 rounded-full text-sm hover:bg-purple-600/30 transition-colors">
                {tech}
              </span>
            ))}
          </div>
          <button className="w-full py-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105">
            View Project
          </button>
        </div>
      ))}
    </div>
  </div>
  );
}
