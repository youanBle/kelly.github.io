import React from "react";

interface Skill {
  name: string;
  level: number;
  color: string;
}

interface CyberpunkSkillCardProps {
  skill: Skill;
}

const CyberpunkSkillCard: React.FC<CyberpunkSkillCardProps> = ({ skill }) => {
  return (
    <div
      className="cyberpunk-skill-card flex items-center justify-center text-center"
      style={{
        width: "180px",
        height: "90px",
        minWidth: "140px",
        minHeight: "70px",
        background: `linear-gradient(120deg, #1a1a2e 60%, ${skill.color} 100%)`,
      }}
    >
      <span className="font-bold text-lg tracking-wide neon-text" style={{ color: skill.color }}>
        {skill.name}
      </span>
    </div>
  );
};

export default CyberpunkSkillCard; 