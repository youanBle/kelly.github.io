import React, { useEffect, useState, useRef } from "react";

interface GlitchTextProps {
  text: string;
  glitchPhrases?: string[];
  interval?: number; // ms between glitches
  className?: string;
}

const GLITCH_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=<>?";

const GlitchText: React.FC<GlitchTextProps> = ({ text, glitchPhrases = [], interval = 3500, className = "" }) => {
  const [display, setDisplay] = useState(text);
  const [glitching, setGlitching] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const stopRef = useRef<NodeJS.Timeout | null>(null);
  const [glitchActive, setGlitchActive] = useState(true);

  useEffect(() => {
    let mounted = true;
    const glitch = () => {
      setGlitching(true);
      const phrase = glitchPhrases.length > 0 && Math.random() > 0.5
        ? glitchPhrases[Math.floor(Math.random() * glitchPhrases.length)]
        : null;
      let frame = 0;
      const maxFrames = 12;
      const glitchInterval = setInterval(() => {
        if (!mounted) return;
        if (frame < maxFrames) {
          if (phrase && frame > 4) {
            setDisplay(phrase);
          } else {
            setDisplay(
              text
                .split("")
                .map((char, i) =>
                  Math.random() < 0.4 ? GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)] : char
                )
                .join("")
            );
          }
          frame++;
        } else {
          clearInterval(glitchInterval);
          setDisplay(text);
          setGlitching(false);
        }
      }, 40);
    };
    if (glitchActive) {
      glitch();
      timeoutRef.current = setInterval(glitch, interval);
      stopRef.current = setTimeout(() => {
        setGlitchActive(false);
        if (timeoutRef.current) clearInterval(timeoutRef.current);
        setDisplay(text);
        setGlitching(false);
      }, 10000);
    }
    return () => {
      mounted = false;
      if (timeoutRef.current) clearInterval(timeoutRef.current);
      if (stopRef.current) clearTimeout(stopRef.current);
    };
    // eslint-disable-next-line
  }, [text, glitchPhrases, interval, glitchActive]);

  return (
    <span className={`glitch-text ${glitching ? "glitching" : ""} ${className}`}>{display}</span>
  );
};

export default GlitchText; 