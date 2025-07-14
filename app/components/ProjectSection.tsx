"use client";

import { useState, useEffect, useRef } from "react";
import CyberpunkProjectCard from "./CyberpunkProjectCard";


export default function ProjectSection() {
  const projects = [
    {
      title: "Software Engineer",
      company: "AfterShip",
      achievements: [
        "Developed company product and landing pages; continuously optimized SEO performance with Lighthouse and Ahrefs, resulting in higher page rankings.",
        "Launched multiple SEO-focused free tool pages (image resizer, AI-based name generator, BFCM statistic data dashboard) with React.js and WebGL, contributing to increased organic traffic.",
        "Built and maintained a CMS with Next.js and Payload, enabling 90% of page configurations without developer intervention.",
        "Designed and implemented an AI-powered translation tool integrated with the company’s CMS, automating the multilingual site deployment process.",
        "Developed in-house data tracking and A/B testing tools to support data-driven product decisions."
      ],
      tech: ["React.js", "Next.js", "Payload", "WebGL", "Node.js", "SEO", "Lighthouse", "Ahrefs"],
      image: "/project1.jpg",
      link: "#"
    },
    {
      title: "Software Engineer",
      company: "Infor",
      achievements: [
        "Maintained and developed features for the Human Resource Management System as a full-stack developer.",
        "Refactored the duty management module, migrating from legacy JavaScript and Java 8 to Angular and Kotlin. Ensured feature parity through Jasmine unit testing.",
        "Developed a system for work shift management and collaborated with QA to convert manual testing procedures into automated BDD UI test cases using Cucumber.",
        "Built an offline check-in system using Service Worker, enabling automatic data synchronization upon network recovery."
      ],
      tech: ["Angular", "Kotlin", "Java", "Jasmine", "Cucumber", "Service Worker", "Node.js"],
      image: "/project2.jpg",
      link: "#"
    },
    {
      title: "Software Engineer",
      company: "Shopee",
      achievements: [
        "Designed and developed a web portal for efficient data pipeline management, improving data warehouse team operating speed by 40%.",
        "Maintained a low-code platform and SDK for generating customized chart reports.",
        "Built a SQL parsing and visualization platform using Canvas and Node.js, enabling intuitive tracking of column-level data lineage."
      ],
      tech: ["Node.js", "Canvas", "SQL", "Low-code", "SDK", "Data Visualization", "Web Portal"],
      image: "/project3.jpg",
      link: "#"
    }
  ];
  return (

    <div className="max-w-6xl mx-auto">
    <h2 className="text-4xl font-bold neon-text mb-4 border-b-2 border-cyan-400 pb-2 tracking-widest">
      Featured Projects
    </h2>
    <div
    style={{
     gap:20
    }}
    className="grid md:grid-cols-3 gap-8">
      {projects.map((project, index) => (
        <CyberpunkProjectCard key={project.title+project.company} project={project} index={index} />
      ))}
    </div>
  </div>
  );
}
