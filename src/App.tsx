import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Film, Mail, ShieldAlert, Compass, Sparkles, ExternalLink, Menu, X, ArrowUpRight, MonitorPlay, Code, Terminal, Cpu
} from "lucide-react";
import { SiteContent } from "./types";
import AnalyticsTracker, { logEvent } from "./components/AnalyticsTracker";
import KineticIntro from "./components/KineticIntro";
import Hero from "./components/Hero";
import Portfolio from "./components/Portfolio";
import ContactForm from "./components/ContactForm";
import AdminDashboard from "./components/AdminDashboard";
import TikkaPhilosophy from "./components/TikkaPhilosophy";
import FindServices from "./components/FindServices";
import OryzoBlueprint from "./components/OryzoBlueprint";
import FeaturedWorkPinned from "./components/FeaturedWorkPinned";
import { Project } from "./types";

export default function App() {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showAdmin, setShowAdmin] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  // Custom cursor states
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isHoveringClickable, setIsHoveringClickable] = useState(false);

  // Load content on mount
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

  // Track cursor position for custom cursor
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

  const handleScrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (isLoading || !content) {
    return (
      <div className="min-h-screen bg-[#05070c] flex flex-col items-center justify-center text-white font-sans p-6">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full glow-bg-primary opacity-40 pointer-events-none" />
        <div className="relative z-10 flex flex-col items-center gap-4 text-center">
          <div className="w-16 h-16 rounded-full border-t-2 border-r-2 border-purple-500 animate-spin" />
          <span className="font-mono text-xs tracking-widest text-purple-400 uppercase font-bold">
            INITIALIZING CREATIVE PIPELINE...
          </span>
          <p className="text-xs text-slate-500 font-mono">LOADING PRIVILEDGE'S PORTFOLIO RUNTIME</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#05070c] text-white font-sans overflow-x-hidden selection:bg-purple-600 selection:text-white">
      {/* Analytics footprint tracker */}
      <AnalyticsTracker />

      {/* Dynamic SEO metadata tags emulation */}
      <span className="hidden" id="seo-meta-keywords">
        {content.seoKeywords.join(", ")}
      </span>

      {/* Custom Cursor */}
      <div 
        className="hidden lg:block custom-cursor"
        style={{ 
          left: `${mousePos.x}px`, 
          top: `${mousePos.y}px`,
          width: isHoveringClickable ? "48px" : "24px",
          height: isHoveringClickable ? "48px" : "24px",
          borderColor: isHoveringClickable ? "#a855f7" : "rgba(168, 85, 247, 0.5)",
          backgroundColor: isHoveringClickable ? "rgba(168, 85, 247, 0.1)" : "transparent"
        }}
      />
      <div 
        className="hidden lg:block custom-cursor-dot"
        style={{ 
          left: `${mousePos.x}px`, 
          top: `${mousePos.y}px` 
        }}
      />

      <AnimatePresence mode="wait">
        {showIntro ? (
          <motion.div
            key="kinetic-intro-wrapper"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="fixed inset-0 z-50 bg-[#020408]"
          >
            <KineticIntro name={content.name} onComplete={() => setShowIntro(false)} />
          </motion.div>
        ) : (
          <motion.div
            key="main-portfolio-wrapper"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            {/* Modern Header Navigation */}
            <header className="fixed top-0 left-0 right-0 z-40 bg-[#05070c]/80 backdrop-blur-md border-b border-slate-900/40 px-6 py-4">
              <div className="max-w-7xl mx-auto flex items-center justify-between">
                
                {/* Logo */}
                <div 
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  className="flex items-center gap-2 cursor-pointer group"
                >
                  <div className="w-9 h-9 rounded-xl bg-purple-600 flex items-center justify-center text-white shadow-lg shadow-purple-500/20 group-hover:rotate-12 transition-transform">
                    <Terminal className="w-4.5 h-4.5 text-white" />
                  </div>
                  <div>
                    <span className="font-display font-black text-sm tracking-tight block text-white uppercase">
                      {content.name}
                    </span>
                    <span className="font-mono text-[9px] text-slate-500 uppercase block tracking-wider leading-none">
                      Systems Architect
                    </span>
                  </div>
                </div>

                {/* Links */}
                <nav className="flex items-center gap-6">
                  <button
                    onClick={() => handleScrollToSection("work")}
                    className="text-sm font-medium text-slate-300 hover:text-white transition-colors cursor-pointer"
                  >
                    Selected Work
                  </button>
                  <button
                    onClick={() => handleScrollToSection("contact")}
                    className="text-sm font-medium text-slate-300 hover:text-white transition-colors cursor-pointer"
                  >
                    Hire Me
                  </button>
                  
                  {/* Hidden/Direct Access Admin dashboard */}
                  <button
                    onClick={() => {
                      setShowAdmin(true);
                      logEvent('click_project', { action: 'header_admin_portal' });
                    }}
                    className="px-4 py-2 bg-slate-950 hover:bg-slate-900 border border-slate-800 text-xs font-mono text-purple-400 font-semibold rounded-xl transition-all cursor-pointer inline-flex items-center gap-1.5"
                  >
                    <Code className="w-3.5 h-3.5" />
                    <span>Admin Dashboard</span>
                  </button>
                </nav>

              </div>
            </header>

            {/* Page Sections Layout */}
            <main>
              {/* HERO SECTION */}
              <Hero 
                name={content.name}
                title={content.title}
                bio={content.bio}
                onExploreProjects={() => handleScrollToSection("work")}
                onContactMe={() => handleScrollToSection("contact")}
              />

              {/* CORE MANIFESTO SECTION (Tikka Masala inspired) */}
              <TikkaPhilosophy />

              {/* SERVICE CAPABILITIES CARD SELECTOR (FIND Real Estate inspired) */}
              <FindServices />

              {/* PERFORMANCE SYSTEM BLUEPRINT OPTIMIZER (Oryzo inspired) */}
              <OryzoBlueprint />

              {/* CINEMATIC GSAP HORIZONTAL SCROLL FEATURED WORK */}
              <FeaturedWorkPinned projects={content.projects} onSelectProject={setSelectedProject} />

              {/* BENTO SELECTED WORKS PORTFOLIO */}
              <Portfolio 
                projects={content.projects} 
                selectedProject={selectedProject} 
                setSelectedProject={setSelectedProject} 
              />

              {/* FUNCTIONAL CONTACT FORM & AI REPLY */}
              <ContactForm />
            </main>

            {/* Footer */}
            <footer className="bg-[#030509] border-t border-slate-900/60 py-12 px-6 text-center text-slate-500">
              <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-6 font-mono text-xs">
                
                <div>
                  <p>© 2026 {content.name} • Systems Architect & Software Engineer</p>
                </div>

                <div className="flex justify-center gap-6">
                  <a 
                    href={`mailto:${content.email}`} 
                    className="hover:text-purple-400 transition-colors"
                  >
                    Email Contact
                  </a>
                  <button
                    onClick={() => setShowAdmin(true)}
                    className="hover:text-purple-400 transition-colors cursor-pointer uppercase"
                  >
                    Admin Gate
                  </button>
                </div>

              </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Slide-over Admin Control Dashboard */}
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
              onContentUpdate={(updated) => {
                setContent(updated);
              }}
              onClose={() => setShowAdmin(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
