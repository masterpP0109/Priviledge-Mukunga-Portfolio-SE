import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronRight, ArrowRight, Layers, Smartphone, Sparkles, CheckCircle2 } from "lucide-react";
import { logEvent } from "./AnalyticsTracker";

type ServiceType = "engineer" | "refactor" | "scale";

export default function FindServices() {
  const [activeService, setActiveService] = useState<ServiceType>("engineer");

  const servicesData = {
    engineer: {
      title: "ENGINEER FULL STACK CORE",
      subtitle: "Build robust systems from scratch",
      description: "Custom-architected server-side and client-side systems designed for performance. From PostgreSQL relational schemas to highly interactive Vite-React client interfaces.",
      features: [
        "Database Schema Engineering (SQL)",
        "Secure JSON Web Token (JWT) Authentications",
        "Express server-side APIs",
        "Polished dashboard interfaces"
      ],
      metric: "Sub-10ms Server Latency"
    },
    refactor: {
      title: "REFACTOR & ELEVATE UX",
      subtitle: "Turn boring code into elite products",
      description: "Upgrade slow, static HTML sites or rigid React components into smooth, cinematic motion experiences using state-of-the-art Framer Motion and GSAP timelines.",
      features: [
        "Kinetic typography reveals",
        "Fluid grid animations & offsets",
        "High-performance asset optimization",
        "Touch and scroll-trigger gestures"
      ],
      metric: "2.5x Higher User Engagement"
    },
    scale: {
      title: "SCALE & OPTIMIZE CAP",
      subtitle: "Benchmark and speed-tune existing routes",
      description: "Unravel heavy rendering loops and slow backend queries. Integrate ultra-fast Redis cache buffers, compression algorithms, and cloud container deployments.",
      features: [
        "Redis Sub-millisecond Cache Ingress",
        "Core Web Vitals load-time tuning",
        "Distributed event streams streaming",
        "99.99% high-availability architectures"
      ],
      metric: "98+ Lighthouse Performance Score"
    }
  };

  const selectService = (type: ServiceType) => {
    setActiveService(type);
    logEvent("click_project", { action: `select_service_${type}` });
  };

  return (
    <section className="relative bg-[#05070c] text-white py-24 px-6 border-b border-slate-900/40 autoDisplay">
      
      {/* Background architectural details mimicking 'FIND Real Estate' style */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#1e1b4b10_1px,transparent_1px)] bg-[size:2rem_2rem] pointer-events-none" />
      <div className="absolute right-1/4 bottom-10 w-96 h-96 bg-indigo-900/10 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch autoBlur">
        
        {/* Left Side: Dynamic Showcase Detail Panel */}
        <div className="lg:col-span-5 flex flex-col justify-between text-left border-b lg:border-b-0 lg:border-r border-slate-900/80 pb-8 lg:pb-0 lg:pr-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-950/40 border border-indigo-500/20 text-indigo-400 font-mono text-xs rounded-full uppercase tracking-widest mb-6">
              <Layers className="w-3.5 h-3.5 text-indigo-400" />
              <span>Full service capabilities</span>
            </div>

            <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl tracking-tight text-white uppercase leading-none mb-4">
              How I Can <br/>Help You
            </h2>

            {/* Cinematic chevron indicator lines inspired by the FIND video */}
            <div className="flex gap-2.5 my-8 items-center text-slate-500 font-mono text-xs tracking-wider">
              <span>DESIGN</span>
              <ChevronRight className="w-4.5 h-4.5 text-indigo-500" />
              <span>CODE</span>
              <ChevronRight className="w-4.5 h-4.5 text-indigo-500" />
              <span className="text-white font-bold">SOLUTIONS</span>
            </div>

            {/* Interactive text container */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeService}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ type: "spring", stiffness: 220, damping: 15 }}
                className="flex flex-col gap-4 p-6 bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]"
              >
                <span className="font-mono text-xs text-indigo-400 uppercase tracking-widest block font-bold">
                  {servicesData[activeService].subtitle}
                </span>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-sans">
                  {servicesData[activeService].description}
                </p>

                {/* Bullets */}
                <div className="flex flex-col gap-2 mt-2">
                  {servicesData[activeService].features.map((feat) => (
                    <div key={feat} className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Metric footer */}
          <div className="mt-8 border-t border-slate-900 pt-6">
            <span className="font-mono text-[10px] text-slate-500 uppercase tracking-widest block mb-1">Guaranteed SLA metric</span>
            <AnimatePresence mode="wait">
              <motion.span 
                key={activeService}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                className="text-lg sm:text-xl font-display font-black text-indigo-300 uppercase tracking-tight block"
              >
                {servicesData[activeService].metric}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>

        {/* Right Side: Three Giant Interactive Columns (Buy, Sell, Rent style) */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4 items-stretch">
          
          {/* Card 1: Engineer */}
          <motion.div 
            onClick={() => selectService("engineer")}
            whileHover={{ y: -8, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className={`p-8 border rounded-2xl flex flex-col justify-between cursor-pointer h-96 relative group overflow-hidden backdrop-blur-xl transition-all duration-300 ${
              activeService === "engineer" 
                ? "bg-indigo-500/10 border-indigo-500/80 text-white shadow-[0_8px_32px_0_rgba(99,102,241,0.25)]" 
                : "bg-white/[0.02] border-white/[0.06] text-slate-400 hover:border-white/[0.15] hover:text-white hover:bg-white/[0.04]"
            }`}
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 rounded-full filter blur-xl group-hover:bg-indigo-500/20 transition-colors" />
            <span className="font-mono text-2xl font-black text-indigo-400">01</span>
            <div>
              <h3 className="font-display font-black text-2xl uppercase tracking-tight leading-none mb-2 text-white">
                ENGINEER
              </h3>
              <p className="text-[11px] leading-relaxed text-slate-400 uppercase font-mono tracking-wider">
                Full-Stack Core Web Systems
              </p>
            </div>
            <div className="flex justify-between items-center mt-4">
              <span className="text-[10px] font-mono tracking-widest uppercase">Select Capability</span>
              <ArrowRight className={`w-4 h-4 transition-transform ${activeService === "engineer" ? "translate-x-1.5 text-indigo-400" : "text-slate-600"}`} />
            </div>
          </motion.div>

          {/* Card 2: Refactor */}
          <motion.div 
            onClick={() => selectService("refactor")}
            whileHover={{ y: -8, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className={`p-8 border rounded-2xl flex flex-col justify-between cursor-pointer h-96 relative group overflow-hidden backdrop-blur-xl transition-all duration-300 ${
              activeService === "refactor" 
                ? "bg-indigo-500/10 border-indigo-500/80 text-white shadow-[0_8px_32px_0_rgba(99,102,241,0.25)]" 
                : "bg-white/[0.02] border-white/[0.06] text-slate-400 hover:border-white/[0.15] hover:text-white hover:bg-white/[0.04]"
            }`}
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 rounded-full filter blur-xl group-hover:bg-indigo-500/20 transition-colors" />
            <span className="font-mono text-2xl font-black text-indigo-400">02</span>
            <div>
              <h3 className="font-display font-black text-2xl uppercase tracking-tight leading-none mb-2 text-white">
                REFACTOR
              </h3>
              <p className="text-[11px] leading-relaxed text-slate-400 uppercase font-mono tracking-wider">
                Interactive Cinematic UX
              </p>
            </div>
            <div className="flex justify-between items-center mt-4">
              <span className="text-[10px] font-mono tracking-widest uppercase">Select Capability</span>
              <ArrowRight className={`w-4 h-4 transition-transform ${activeService === "refactor" ? "translate-x-1.5 text-indigo-400" : "text-slate-600"}`} />
            </div>
          </motion.div>

          {/* Card 3: Scale */}
          <motion.div 
            onClick={() => selectService("scale")}
            whileHover={{ y: -8, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className={`p-8 border rounded-2xl flex flex-col justify-between cursor-pointer h-96 relative group overflow-hidden backdrop-blur-xl transition-all duration-300 ${
              activeService === "scale" 
                ? "bg-indigo-500/10 border-indigo-500/80 text-white shadow-[0_8px_32px_0_rgba(99,102,241,0.25)]" 
                : "bg-white/[0.02] border-white/[0.06] text-slate-400 hover:border-white/[0.15] hover:text-white hover:bg-white/[0.04]"
            }`}
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 rounded-full filter blur-xl group-hover:bg-indigo-500/20 transition-colors" />
            <span className="font-mono text-2xl font-black text-indigo-400">03</span>
            <div>
              <h3 className="font-display font-black text-2xl uppercase tracking-tight leading-none mb-2 text-white">
                SCALE
              </h3>
              <p className="text-[11px] leading-relaxed text-slate-400 uppercase font-mono tracking-wider">
                Speed-Tuning & Redis Cache
              </p>
            </div>
            <div className="flex justify-between items-center mt-4">
              <span className="text-[10px] font-mono tracking-widest uppercase">Select Capability</span>
              <ArrowRight className={`w-4 h-4 transition-transform ${activeService === "scale" ? "translate-x-1.5 text-indigo-400" : "text-slate-600"}`} />
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
