import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Film, 
  Mail, 
  ShieldAlert, 
  Compass, 
  Sparkles, 
  ExternalLink, 
  Menu, 
  X, 
  ArrowUpRight, 
  MonitorPlay, 
  Code, 
  Terminal, 
  Cpu,
  Clock
} from "lucide-react";
import { SiteContent, Project } from "./types";
import AnalyticsTracker, { logEvent } from "./components/AnalyticsTracker";
import KineticIntro from "./components/KineticIntro";
import Hero from "./components/Hero";
import CredibilityStrip from "./components/CredibilityStrip";
import FeaturedWorkPinned from "./components/FeaturedWorkPinned";
import TikkaPhilosophy from "./components/TikkaPhilosophy";
import Portfolio from "./components/Portfolio";
import OryzoBlueprint from "./components/OryzoBlueprint";
import CapabilitiesShowcase from "./components/CapabilitiesShowcase";
import CreativeProcess from "./components/CreativeProcess";
import ProjectCaseStudies from "./components/ProjectCaseStudies";
import ExperienceTimeline from "./components/ExperienceTimeline";
import FindServices from "./components/FindServices";
import Testimonials from "./components/Testimonials";
import AboutMe from "./components/AboutMe";
import ContactForm from "./components/ContactForm";
import AdminDashboard from "./components/AdminDashboard";

export default function App() {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showAdmin, setShowAdmin] = useState(false);
  const [showIntro, setShowIntro] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Custom cursor tracking
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isHoveringClickable, setIsHoveringClickable] = useState(false);

  // Live Harare Time
  const [timeStr, setTimeStr] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString("en-GB", {
          timeZone: "Africa/Harare",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit"
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Fetch site content
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await fetch("/api/content");
        if (res.ok) {
          const data = await res.json();
          setContent(data);
        }
      } catch (err) {
        console.error("Failed to fetch dynamic site content:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContent();
  }, []);

  // Track cursor position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("button, a, select, option, input, textarea, [role='button']")
      ) {
        setIsHoveringClickable(true);
      } else {
        setIsHoveringClickable(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  const handleScrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (isLoading || !content) {
    return (
      <div className="min-h-screen bg-[#07090E] flex flex-col items-center justify-center text-white font-mono p-6">
        <div className="w-12 h-12 rounded-full border-2 border-purple-900 border-t-[#E46F43] animate-spin mb-4" />
        <span className="text-xs tracking-widest text-slate-400 uppercase">
          INITIALIZING PORTFOLIO CORE...
        </span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#07090E] text-slate-100 font-sans selection:bg-[#E46F43]/30 selection:text-white antialiased relative">
      {/* Background analytics tracking */}
      <AnalyticsTracker />

      {/* SEO keywords hidden tag */}
      <span className="hidden" id="seo-meta-keywords">
        {content.seoKeywords.join(", ")}
      </span>

      {/* Custom Pointer Circle & Dot */}
      <div
        className="hidden lg:block fixed pointer-events-none z-[9999] rounded-full border transition-transform duration-75 ease-out"
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
          width: isHoveringClickable ? "54px" : "36px",
          height: isHoveringClickable ? "54px" : "36px",
          transform: "translate(-50%, -50%)",
          borderColor: isHoveringClickable ? "#C7FF3D" : "rgba(228, 111, 67, 0.4)",
          backgroundColor: isHoveringClickable ? "rgba(199, 255, 61, 0.08)" : "transparent"
        }}
      />
      <div
        className="hidden lg:block fixed pointer-events-none z-[9999] w-1.5 h-1.5 rounded-full bg-[#E46F43]"
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
          transform: "translate(-50%, -50%)"
        }}
      />

      {/* Floating Kinetic Intro Modal if requested */}
      <AnimatePresence>
        {showIntro && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black flex items-center justify-center"
          >
            <button
              onClick={() => setShowIntro(false)}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/10 text-white z-50 hover:bg-white/20 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="w-full h-full">
              <KineticIntro
                name={content.name}
                onComplete={() => setShowIntro(false)}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cinematic Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-[#07090E]/85 backdrop-blur-lg border-b border-white/[0.06] px-6 sm:px-12 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo Brand */}
          <div
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#E46F43] to-purple-600 text-white font-black flex items-center justify-center text-xs font-mono group-hover:scale-105 transition-transform shadow-lg shadow-purple-950/40">
              PM
            </div>
            <div className="text-left">
              <span className="text-sm font-bold tracking-tight text-white block leading-none">
                PRIVILEDGE MUKUNGA
              </span>
              <span className="text-[10px] font-mono text-[#C7FF3D] block mt-1 leading-none uppercase tracking-wider">
                Full-Stack Systems Architect
              </span>
            </div>
          </div>

          {/* Center Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-xs font-mono uppercase tracking-wider text-slate-400">
            <button
              onClick={() => handleScrollTo("work")}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Showcase
            </button>
            <button
              onClick={() => handleScrollTo("capabilities")}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Capabilities
            </button>
            <button
              onClick={() => handleScrollTo("process")}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Process
            </button>
            <button
              onClick={() => handleScrollTo("case-studies")}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Case Studies
            </button>
            <button
              onClick={() => handleScrollTo("about")}
              className="hover:text-white transition-colors cursor-pointer"
            >
              About
            </button>
            <button
              onClick={() => handleScrollTo("contact")}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Contact
            </button>
          </nav>

          {/* Right Header Status & CTA */}
          <div className="hidden sm:flex items-center gap-4">
            {/* Harare Live Clock */}
            <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/5 text-[11px] font-mono text-slate-400">
              <Clock className="w-3.5 h-3.5 text-[#C7FF3D]" />
              <span>HARARE {timeStr}</span>
            </div>

            <button
              onClick={() => setShowAdmin(true)}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/[0.05] transition-colors cursor-pointer text-xs font-mono"
              title="Admin Portal"
            >
              <Code className="w-4 h-4" />
            </button>

            <button
              onClick={() => handleScrollTo("contact")}
              className="px-5 py-2.5 bg-[#F2EEE6] text-[#0C0D0D] hover:bg-white font-mono text-xs font-bold uppercase rounded-xl transition-all shadow-md cursor-pointer hover:scale-105"
            >
              LET'S TALK
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden pt-4 pb-6 border-t border-white/10 mt-3 text-left space-y-3 font-mono text-xs uppercase tracking-wider">
            <button
              onClick={() => handleScrollTo("work")}
              className="block w-full text-left px-2 py-1.5 text-slate-300 hover:text-white"
            >
              Showcase
            </button>
            <button
              onClick={() => handleScrollTo("capabilities")}
              className="block w-full text-left px-2 py-1.5 text-slate-300 hover:text-white"
            >
              Capabilities
            </button>
            <button
              onClick={() => handleScrollTo("process")}
              className="block w-full text-left px-2 py-1.5 text-slate-300 hover:text-white"
            >
              Process
            </button>
            <button
              onClick={() => handleScrollTo("case-studies")}
              className="block w-full text-left px-2 py-1.5 text-slate-300 hover:text-white"
            >
              Case Studies
            </button>
            <button
              onClick={() => handleScrollTo("about")}
              className="block w-full text-left px-2 py-1.5 text-slate-300 hover:text-white"
            >
              About
            </button>
            <button
              onClick={() => handleScrollTo("contact")}
              className="block w-full text-left px-2 py-1.5 text-slate-300 hover:text-white"
            >
              Contact
            </button>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <button
                onClick={() => {
                  setShowIntro(true);
                  setMobileMenuOpen(false);
                }}
                className="text-purple-400 text-xs font-mono"
              >
                Watch Kinetic Story &rarr;
              </button>
              <button
                onClick={() => handleScrollTo("contact")}
                className="px-4 py-2 bg-[#F2EEE6] text-[#0C0D0D] font-mono text-xs font-bold rounded-lg"
              >
                LET'S TALK
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Main Sections Hierarchy */}
      <main>
        {/* 1. HERO SECTION */}
        <Hero
          name={content.name}
          title={content.title}
          bio={content.bio}
          onExploreProjects={() => handleScrollTo("work")}
          onContactMe={() => handleScrollTo("contact")}
          onPlayIntro={() => setShowIntro(true)}
        />

        {/* 2. CREDIBILITY METRICS STRIP */}
        <CredibilityStrip />

        {/* 3. GSAP HORIZONTAL PINNED WORK SHOWCASE */}
        <FeaturedWorkPinned
          projects={content.projects}
          onSelectProject={setSelectedProject}
        />

        {/* 4. SYSTEMS MANIFESTO (TIKKA PHILOSOPHY) */}
        <TikkaPhilosophy />

        {/* 5. COMPREHENSIVE PORTFOLIO ARCHIVES */}
        <Portfolio
          projects={content.projects}
          onSelectProject={setSelectedProject}
        />

        {/* 6. PERFORMANCE BLUEPRINT (ORYZO SLIDER TUNER) */}
        <OryzoBlueprint />

        {/* 7. CAPABILITIES SHOWCASE */}
        <CapabilitiesShowcase />

        {/* 8. CREATIVE PROCESS SEQUENCE */}
        <CreativeProcess />

        {/* 9. CASE STUDY DEEP DIVES */}
        <ProjectCaseStudies />

        {/* 10. EXPERIENCE TIMELINE */}
        <ExperienceTimeline />

        {/* 11. INTERACTIVE SERVICE SELECTOR (FIND SERVICES) */}
        <FindServices />

        {/* 12. CLIENT TESTIMONIALS */}
        <Testimonials />

        {/* 13. EDITORIAL ABOUT PRIVILEDGE */}
        <AboutMe />

        {/* 14. CONTACT FORM & WHATSAPP */}
        <ContactForm />
      </main>

      {/* Signature Cinematic Footer */}
      <footer className="bg-[#030509] border-t border-white/[0.06] py-16 px-6 sm:px-12 text-slate-500 font-mono text-xs text-left">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-[#E46F43] to-purple-600 text-white font-bold flex items-center justify-center text-[10px]">
                PM
              </div>
              <span className="font-bold text-white uppercase">{content.name}</span>
            </div>
            <p className="text-slate-400 text-xs font-sans max-w-sm">
              Full-Stack Systems Architect engineering cinematic front-ends, robust Express APIs, and scalable relational databases.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <a
              href="https://wa.me/263773887577"
              target="_blank"
              rel="noreferrer"
              className="text-[#C7FF3D] hover:underline"
            >
              WHATSAPP (+263 773 887 577)
            </a>
            <a
              href={`mailto:${content.email}`}
              className="text-slate-300 hover:text-white"
            >
              {content.email}
            </a>
            <button
              onClick={() => setShowAdmin(true)}
              className="text-slate-500 hover:text-purple-400 transition-colors cursor-pointer"
            >
              ADMIN ACCESS
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-8 mt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-600">
          <p>© {new Date().getFullYear()} PRIVILEDGE MUKUNGA. ALL RIGHTS RESERVED.</p>
          <p>BUILT WITH REACT, TYPESCRIPT, GSAP, TAILWIND, AND NODE.JS.</p>
        </div>
      </footer>

      {/* Admin Dashboard Drawer */}
      <AnimatePresence>
        {showAdmin && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 overflow-hidden"
          >
            <AdminDashboard
              currentContent={content}
              onContentUpdate={(updated) => setContent(updated)}
              onClose={() => setShowAdmin(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
