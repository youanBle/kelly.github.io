import React from "react";

interface Project {
  title: string;
  company: string;
  achievements: string[];
  tech: string[];
  image: string;
  link: string;
}

interface CyberpunkProjectCardProps {
  project: Project;
  index: number;
}

const CyberpunkProjectCard: React.FC<CyberpunkProjectCardProps> = ({ project, index }) => {
  return (
    <div 
      className="cyberpunk-project-card"
      style={{ animationDelay: `${index * 200}ms` }}
    >
      <div className="project-image-container">
        <div className="w-full h-48 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
        </div>
      </div>
      
      <div className="project-content">
        <h3 className="text-xl font-bold mb-2 neon-text-subtle">{project.title}</h3>
        <p className="text-cyan-300 font-medium mb-4">{project.company}</p>
        
        <ul className="mb-4 space-y-2">
          {project.achievements.map((achievement, idx) => (
            <li key={idx} className="text-gray-300 text-sm leading-relaxed flex items-start">
              <span className="text-cyan-400 mr-2 mt-1">•</span>
              {achievement}
            </li>
          ))}
        </ul>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.map((tech) => (
            <span key={tech} className="cyberpunk-tech-tag">
              {tech}
            </span>
          ))}
        </div>
      
      </div>
    </div>
  );
};

export default CyberpunkProjectCard; 