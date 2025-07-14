"use client";


export default function HeroSection() {
  return (
      <section 
        className="min-h-screen flex items-center justify-center relative overflow-hidden"
      >
        <div className={`text-center z-10 transition-all duration-1000`}>
          <h1 className="text-[72px] md:text-8xl font-bold mb-6 mt-0 gradient-text animate-float">
            Kelly Feng
          </h1>
          <p className="text-2xl md:text-3xl mb-8 text-gray-300 animate-fade-in-up">
            Full-Stack Developer
          </p>
          <p className="text-lg md:text-xl mb-12 text-gray-400 max-w-2xl mx-auto animate-fade-in-up">
            Crafting exceptional digital experiences with modern technologies and innovative solutions
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-scale-in">
            <button 
              type="button"
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 hover-lift animate-glow"
            >
              View Projects
            </button>
            <button className="px-8 py-3 border border-purple-400 rounded-full hover:bg-purple-400/20 transition-all duration-300 hover-lift">
              Download CV
            </button>
          </div>
        </div>
      </section>
  );
}
