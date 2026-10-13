import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { 
  ArrowRight, 
  Terminal, 
  Sparkles, 
  Play, 
  Code, 
  Cpu, 
  Database, 
  Layers, 
  CheckCircle2, 
  ExternalLink,
  MessageSquare
} from "lucide-react";
import { logEvent } from "./AnalyticsTracker";

interface HeroProps {
  name: string;
  title: string;
  bio: string;
  onExploreProjects: () => void;
  onContactMe: () => void;
  onPlayIntro?: () => void;
}

export default function Hero({ name, title, bio, onExploreProjects, onContactMe, onPlayIntro }: HeroProps) {
  const [wordIdx, setWordIdx] = useState(0);
  const cyclingWords = [
    "FULL-STACK SYSTEMS",
    "RELATIONAL DATABASE CORES",
    "HIGH-PERFORMANCE FRONTENDS",
    "ACCESSIBLE WEB APPS"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setWordIdx((prev) => (prev + 1) % cyclingWords.length);
    }, 2800);
    return () => clearInterval(timer);
  }, [cyclingWords.length]);

  return (
    <section className="relative min-h-screen flex flex-col justify-center bg-[#07090E] text-white pt-28 pb-20 px-6 sm:px-12 overflow-hidden border-b border-white/[0.06]">
      {/* Background ambient glowing orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-purple-900/10 rounded-full filter blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#E46F43]/10 rounded-full filter blur-[140px] pointer-events-none" />
      
      {/* Grid line overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left: Cinematic Title & Narrative */}
          <div className="lg:col-span-7 text-left">
            {/* Status Eyebrow */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-white/[0.04] border border-white/10 rounded-full font-mono text-xs text-[#C7FF3D] uppercase tracking-widest">
                <span className="w-2 h-2 rounded-full bg-[#C7FF3D] animate-pulse" />
                AVAILABLE FOR NEW CONTRACTS
              </span>
              <span className="font-mono text-xs text-[#B7B4AD] tracking-wider uppercase">
                HARARE, ZW (UTC+2)
              </span>
            </div>

            {/* Cycling Kinetic Subhead */}
            <div className="h-6 mb-3 overflow-hidden">
              <motion.div
                key={cyclingWords[wordIdx]}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="font-mono text-xs sm:text-sm text-[#E46F43] tracking-widest uppercase font-bold"
              >
                SPECIALIZATION: {cyclingWords[wordIdx]}
              </motion.div>
            </div>

            {/* Massive Heading */}
            <h1 className="font-serif italic font-normal text-4xl sm:text-6xl lg:text-7xl text-[#F2EEE6] tracking-tight leading-[1.05] mb-6">
              Engineering <span className="font-sans font-black not-italic uppercase text-white">Full-Stack Cores</span> & Cinematic Web Apps.
            </h1>

            {/* Bio Narrative */}
            <p className="font-sans text-base sm:text-lg text-[#B7B4AD] leading-relaxed max-w-2xl mb-8">
              I’m <strong className="text-white font-semibold">Priviledge Mukunga</strong>. I build complete digital platforms—from responsive front-end architectures to back-end Node APIs and relational database schemas that perform reliably under real-world traffic.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <button
                onClick={() => {
                  onExploreProjects();
                  logEvent("click_project", { action: "hero_explore_click" });
                }}
                className="px-7 py-3.5 bg-[#F2EEE6] text-[#0C0D0D] hover:bg-white font-mono text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-xl hover:scale-105 flex items-center gap-2 cursor-pointer"
              >
                <span>EXPLORE WORK</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  onContactMe();
                  logEvent("click_project", { action: "hero_contact_click" });
                }}
                className="px-7 py-3.5 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-white font-mono text-xs font-bold uppercase tracking-wider rounded-xl transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>START A PROJECT</span>
              </button>

              {onPlayIntro && (
                <button
                  onClick={onPlayIntro}
                  className="px-5 py-3.5 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 text-purple-300 font-mono text-xs uppercase tracking-wider rounded-xl transition-all flex items-center gap-2 cursor-pointer"
                  title="Watch the full kinetic experience"
                >
                  <Play className="w-3.5 h-3.5 fill-purple-300" />
                  <span>PLAY INTRO</span>
                </button>
              )}
            </div>

            {/* Tech Tags */}
            <div className="flex items-center gap-2 pt-4 border-t border-white/[0.06] text-xs font-mono text-slate-500">
              <span className="uppercase tracking-widest text-[#E46F43] font-bold">CORE:</span>
              <span className="text-slate-300">REACT</span>
              <span>·</span>
              <span className="text-slate-300">TYPESCRIPT</span>
              <span>·</span>
              <span className="text-slate-300">NODE.JS</span>
              <span>·</span>
              <span className="text-slate-300">SQL SCHEMAS</span>
              <span>·</span>
              <span className="text-slate-300">GSAP</span>
            </div>
          </div>

          {/* Right: Interactive Architectural Stage */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden bg-slate-950/80 border border-white/10 p-6 shadow-2xl backdrop-blur-md text-left">
              {/* Terminal Title Bar */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10 font-mono text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 text-slate-400">mukunga_sys.sh</span>
                </div>
                <span className="text-[#C7FF3D]">LIVE 200 OK</span>
              </div>

              {/* Code / System Preview */}
              <div className="space-y-4 font-mono text-xs">
                <div className="p-4 rounded-xl bg-black/50 border border-white/5">
                  <div className="text-[#E46F43] font-bold uppercase mb-1">
                    01 // BACK-END ARCHITECTURE
                  </div>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Express RESTful routes with relational MySQL queries, JWT auth cookies, and zero lockups.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-black/50 border border-white/5">
                  <div className="text-[#C7FF3D] font-bold uppercase mb-1">
                    02 // FRONT-END PERFORMANCE
                  </div>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Vite React pipeline with sub-second asset hydration, Tailwind responsiveness, and GSAP timeline pacing.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-black/50 border border-white/5">
                  <div className="text-purple-400 font-bold uppercase mb-1">
                    03 // DATABASE INTEGRITY
                  </div>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    ACID transaction security, indexed primary schemas, and automatic audit history logging.
                  </p>
                </div>
              </div>

              {/* Status footer */}
              <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between font-mono text-[10px] text-slate-500">
                <span>SYSTEM LATENCY: <strong className="text-emerald-400">12ms</strong></span>
                <span>RETENTION: <strong className="text-white">99.8%</strong></span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
