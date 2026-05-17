import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import StrategicHighlights from "@/components/StrategicHighlights";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  const location = useLocation();

  useEffect(() => {
    // Check if we have a scrollTo state from a previous navigation
    if (location.state && (location.state as any).scrollTo) {
      const id = (location.state as any).scrollTo;
      const el = document.getElementById(id);
      if (el) {
        // Slight delay to ensure content is rendered
        const timeoutId = setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
          // Clear state after scrolling
          window.history.replaceState({}, document.title);
        }, 150);
        return () => clearTimeout(timeoutId);
      }
    }
  }, [location]);

  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <StrategicHighlights />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
};

export default Index;
