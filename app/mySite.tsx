"use client";

import { useState, useEffect, useRef, Ref } from "react";
import HeroSection from "./components/HeroSection";
import AboutMe from "./components/AboutMe";
import SkillsSection from "./components/SkillsSection";
import ProjectSection from "./components/ProjectSection";
import ContactSection from "./components/ContactSection";

export default function PersonalSite() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolling, setIsScrolling] = useState(false);
  const sectionsRef = useRef<{ [key: string]: HTMLElement | null }>({});

  useEffect(() => {
    setIsLoaded(true);
    
    const handleScroll = () => {
      setIsScrolling(true);
      const scrollPosition = window.scrollY + 100;
      
      Object.entries(sectionsRef.current).forEach(([sectionId, element]) => {
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId);
          }
        }
      });
      
      setTimeout(() => setIsScrolling(false), 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = sectionsRef.current[sectionId];
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };



  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white mx-[100px] md:mx-[50px]">

      {/* Hero Section */}
      <section className="py-20 px-4">
        <HeroSection />
      </section>

      {/* About Section */}
      <section 
        ref={sectionsRef.current["about-me"] as Ref<HTMLElement>}
        className="py-20 px-4"
        id="about-me"
      >
        <AboutMe />
      </section>

      {/* Skills Section */}
      <section 
        ref={sectionsRef.current["skills"] as Ref<HTMLElement>}
        className="py-20 px-4 bg-black/20"
        style={{
          marginTop: "100px"
         }}
      >
        <SkillsSection />
      </section>

      {/* Projects Section */}
      <section 
        ref={sectionsRef.current["projects"] as Ref<HTMLElement>}
        className="py-20 px-4"
        style={{
          marginTop: "100px"
         }}
      >
       <ProjectSection />
      </section>

      {/* Contact Section */}
      <section 
        ref={sectionsRef.current["contact"] as Ref<HTMLElement>}
        style={{
         marginTop: "100px"
        }}
        className="py-20 px-4"
      >
       <ContactSection />
      </section>


    </div>
  );
}
