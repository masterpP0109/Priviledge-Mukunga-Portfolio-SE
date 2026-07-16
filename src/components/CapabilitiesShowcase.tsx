import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Cpu, Terminal, Sparkles, CheckCircle2, ChevronRight, Layers, ArrowRight } from "lucide-react";

interface Capability {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  skills: string[];
  metric: string;
  imageUrl: string;
  icon: React.ReactNode;
}

export default function CapabilitiesShowcase() {
  const [activeIdx, setActiveIdx] = useState(0);

  const capabilities: Capability[] = [
    {
      id: "cap-1",
      number: "01",
      title: "Full Stack Engineering",
      subtitle: "Robust Systems & Secure Architecture",
      description: "Custom-architected server-side and client-side systems designed for sheer performance. Engineering robust database layouts, secure auth, and responsive layouts that stay robust under heavy traffic.",
      skills: ["Database Design (Postgres)", "Express Server APIs", "RESTful & high-throughput Ingress", "JSON Web Token Security"],
      metric: "Sub-10ms Server Latency",
      imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
      icon: <Terminal className="w-5 h-5 text-purple-400" />
    },
    {
      id: "cap-2",
      number: "02",
      title: "Creative Coding & UI",
      subtitle: "High-End Motion & Interactive Flows",
      description: "Refactoring traditional code bases into cinematic web presentations. Using advanced GSAP and Framer Motion pipelines to control layout playback by scrolling.",
      skills: ["GSAP Timelines & Scrubbing", "Clip-Path Mask Reveals", "Custom Fluid Grids", "Micro-Interactions & Hover Dynamics"],
      metric: "2.5x Higher Retention Rate",
      imageUrl: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80",
      icon: <Cpu className="w-5 h-5 text-purple-400" />
    },
    {
      id: "cap-3",
      number: "03",
      title: "Distributed Architecture",
      subtitle: "Redis Caching & Performance Tuning",
      description: "Injecting lightning speed into modern platforms. Tuning Core Web Vitals, removing heavy render bottlenecks, and scaling server-side container entry points.",
      skills: ["Redis Sub-Millisecond Cache", "Static CommonJS Bundling", "Ingress Latency Diagnostics", "99.99% Availability Setups"],
      metric: "99/100 Lighthouse Performance",
      imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
      icon: <Layers className="w-5 h-5 text-purple-400" />
    },
    {
      id: "cap-4",
      number: "04",
      title: "AI Integration & Agents",
      subtitle: "Autonomous Operations & LLM Nodes",
      description: "Embedding smart capabilities directly into full-stack containers. Hand-crafted server-side proxy routes that connect to Gemini API to process and auto-reply to client events.",
      skills: ["Gemini API Integration", "Custom AI Response Agents", "Server-Side Secret Safeguards", "Vector Embeddings & Search"],
      metric: "Sub-2s Automation Response",
      imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
      icon: <Sparkles className="w-5 h-5 text-purple-400" />
    }
  ];

  return (
    <section id="capabilities" className="relative bg-[#020408] text-white py-24 px-6 overflow-hidden border-b border-slate-900/40">
      {/* Background ambient details */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-purple-900/5 rounded-full filter blur-[150px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(rgba(139,92,246,0.015)_1px,transparent_1px)] bg-[size:2.5rem_2.5rem] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Stationary Section Header */}
        <div className="mb-16 text-left">
          <span className="font-mono text-purple-400 text-xs tracking-widest uppercase block mb-3">
            CAPABILITIES SHOWCASE
          </span>
          <h2 className="font-serif italic font-normal text-4xl sm:text-6xl text-white tracking-tight leading-none">
            Different disciplines. <span className="font-sans font-black not-italic uppercase text-purple-300">One creative approach.</span>
          </h2>
        </div>

        {/* Desktop Interactive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch mt-6">
          
          {/* Left Column: vertical list with progress highlights */}
          <div className="lg:col-span-5 flex flex-col justify-between text-left gap-8">
            <div className="flex flex-col gap-4">
              {capabilities.map((cap, idx) => {
                const isActive = activeIdx === idx;
                return (
                  <div
                    key={cap.id}
                    onClick={() => setActiveIdx(idx)}
                    className={`p-6 border rounded-2xl cursor-pointer relative group overflow-hidden transition-all duration-300 ${
                      isActive
                        ? "bg-purple-950/20 border-purple-500/50 shadow-[0_4px_24px_rgba(139,92,246,0.15)]"
                        : "bg-white/[0.01] border-white/[0.04] hover:border-white/[0.1] hover:bg-white/[0.02]"
                    }`}
                  >
                    {/* Active highlight background fill */}
                    {isActive && (
                      <motion.div 
                        layoutId="active-cap-glow"
                        className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-transparent pointer-events-none"
                      />
                    )}

                    <div className="flex items-center gap-4 relative z-10">
                      <span className={`font-mono text-xs font-bold ${isActive ? "text-purple-400" : "text-slate-600"}`}>
                        {cap.number}
                      </span>
                      
                      <div className="w-8 h-8 rounded-lg bg-slate-950 border border-slate-900 flex items-center justify-center">
                        {cap.icon}
                      </div>

                      <div className="flex-1">
                        <h3 className="font-display font-black text-base uppercase text-white leading-tight">
                          {cap.title}
                        </h3>
                        <p className="font-mono text-[9px] text-slate-500 uppercase tracking-wider mt-1">
                          {cap.subtitle}
                        </p>
                      </div>

                      <ChevronRight className={`w-4 h-4 transition-transform ${isActive ? "translate-x-1.5 text-purple-400" : "text-slate-700"}`} />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Static Progress Bar Indicator mapped to active state */}
            <div className="border-t border-slate-900 pt-6">
              <div className="flex justify-between items-center font-mono text-[10px] text-slate-500 uppercase tracking-widest mb-2">
                <span>SCROLL_STAGE: 0{activeIdx + 1} / 04</span>
                <span>{((activeIdx + 1) * 25)}% STABILITY</span>
              </div>
              <div className="w-full h-1 bg-slate-950 rounded-full overflow-hidden border border-slate-900/40">
                <motion.div
                  animate={{ width: `${(activeIdx + 1) * 25}%` }}
                  transition={{ type: "spring", stiffness: 120, damping: 15 }}
                  className="h-full bg-purple-500"
                />
              </div>
            </div>
          </div>

          {/* Right Column: large dynamic detail container (Focus-Pull transition!) */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIdx}
                initial={{ opacity: 0, filter: "blur(8px)", scale: 0.96 }}
                animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                exit={{ opacity: 0, filter: "blur(8px)", scale: 1.04 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="bg-slate-950/40 border border-white/[0.06] p-8 rounded-3xl backdrop-blur-md shadow-2xl flex flex-col gap-6 h-full justify-between"
              >
                <div>
                  {/* Photo Visual - focus pull effect */}
                  <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-white/[0.06] mb-6 bg-slate-900">
                    <img
                      src={capabilities[activeIdx].imageUrl}
                      alt={capabilities[activeIdx].title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover grayscale opacity-50"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent opacity-80" />
                    
                    {/* Floating HUD metrics on image */}
                    <div className="absolute top-4 left-4 bg-slate-950/80 border border-white/10 px-3 py-1.5 rounded-xl font-mono text-[10px] text-purple-300 backdrop-blur-md">
                      METRIC: {capabilities[activeIdx].metric}
                    </div>
                  </div>

                  <span className="font-mono text-xs text-purple-400 block font-bold uppercase tracking-wider mb-2">
                    {capabilities[activeIdx].subtitle}
                  </span>

                  <h3 className="font-display font-black text-2xl uppercase tracking-tight text-white mb-4">
                    {capabilities[activeIdx].title}
                  </h3>

                  <p className="text-slate-300 text-sm leading-relaxed font-sans mb-6">
                    {capabilities[activeIdx].description}
                  </p>

                  {/* Supporting Skills bullets */}
                  <div className="flex flex-col gap-2.5">
                    <span className="font-mono text-[9px] text-slate-500 uppercase tracking-widest font-semibold">
                      Applied System Deliverables:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {capabilities[activeIdx].skills.map((skill, sIdx) => (
                        <div key={skill} className="flex items-center gap-2 text-xs font-mono text-slate-400">
                          <CheckCircle2 className="w-3.5 h-3.5 text-purple-500 flex-shrink-0" />
                          <span>{skill}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Explore projects link */}
                <div className="border-t border-slate-900 pt-6 mt-6 flex items-center justify-between">
                  <span className="font-mono text-[10px] text-slate-500 uppercase tracking-widest">
                    READY FOR REFACTORING
                  </span>
                  
                  <a
                    href="#work"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-black font-mono text-xs font-bold rounded-xl hover:bg-purple-600 hover:text-white hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg cursor-pointer"
                  >
                    <span>EXPLORE PROJECT CASES</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
