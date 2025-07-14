import React from "react";

interface CyberpunkButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
}

const CyberpunkButton: React.FC<CyberpunkButtonProps> = ({
  children,
  onClick,
  className = "",
  type = "button",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      style={{
        padding: "4px",
      }}
      className={`relative font-bold uppercase tracking-widest rounded-md overflow-hidden cyberpunk-btn ${className}`}
    >
      <span className="relative">{children}</span>
      <span className="cyberpunk-btn-glow" />
      <span className="cyberpunk-btn-border" />
    </button>
  );
};

export default CyberpunkButton; 