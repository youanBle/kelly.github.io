"use client";

import CyberpunkButton from "./CyberpunkButton";
import GlitchText from "./GlitchText";


export default function HeroSection() {
  return (
      <section 
        className="min-h-screen flex items-center justify-center relative overflow-hidden"
      >
        <div className={`text-left z-10 transition-all duration-1000 `}>
          <div className="text-[36px] font-[500] mt-0">
            <GlitchText text="Hi, I'm" glitchPhrases={["Signal Lost...", "Connecting...", "Reconnecting..."]} />
          </div>
          <div className="text-[72px] md:text-8xl font-[700] mb-6 mt-0 gradient-text animate-float">
            Kelly Feng
          </div>
          <p className="text-[24px] md:text-3xl mb-8 text-gray-300 animate-fade-in-up">
            <GlitchText text="Full-Stack Developer" glitchPhrases={["Network Error", "404: Talent Not Found", "System Online"]} />
          </p>
          <p className="text-[24px] mb-12 text-gray-400 max-w-2xl mx-auto animate-fade-in-up">
            Crafting exceptional digital experiences with modern technologies and innovative solutions
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-scale-in">
            <CyberpunkButton onClick={() => {
              window.location.href = "#about-me";
            }}>
              Learn More About Me
            </CyberpunkButton>
          </div>
        </div>
      </section>
  );
}
