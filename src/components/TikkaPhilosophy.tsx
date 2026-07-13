import React from "react";
import { motion } from "motion/react";
import { Sparkles, ShieldAlert, Zap, Cpu, Code } from "lucide-react";

export default function TikkaPhilosophy() {
  return (
    <section className="relative bg-[#07040a] text-white py-24 px-6 overflow-hidden border-t border-b border-purple-950/20">
      
      {/* Background orange/crimson glowing orb mimicking the hot Tikka Masala style! */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-900/10 rounded-full filter blur-[120px] pointer-events-none z-0" />
      <div className="absolute -top-40 right-10 w-96 h-96 bg-purple-900/10 rounded-full filter blur-[100px] pointer-events-none z-0" />

      {/* Grid line patterns */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ef444405_1px,transparent_1px),linear-gradient(to_bottom,#ef444405_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto w-full text-center flex flex-col items-center">
        
        {/* Sub-label */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3 py-1 bg-red-950/40 border border-red-500/20 text-red-400 font-mono text-xs rounded-full uppercase tracking-widest mb-6 autoBlur"
        >
          <Sparkles className="w-3.5 h-3.5 text-red-400 animate-pulse" />
          <span>The Systems engineering manifesto</span>
        </motion.div>

        {/* Massive Bold Headlines mimicking 'NO FILLERS. NO SHORTCUTS' */}
        <div className="flex flex-col gap-2 mb-16 text-center autoDisplay">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-serif italic font-black text-4xl sm:text-7xl lg:text-8xl tracking-tight text-[#ff4d4d] uppercase leading-none"
          >
            NO MOCK DATA.
          </motion.h2>
          <motion.h2 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="font-display font-black text-4xl sm:text-7xl lg:text-8xl tracking-tighter text-white uppercase leading-none"
          >
            NO BOILERPLATE.
          </motion.h2>
          <motion.h2 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="font-serif italic font-black text-4xl sm:text-7xl lg:text-8xl tracking-tight text-slate-500 uppercase leading-none"
          >
            NO SLOW COLD STARTS.
          </motion.h2>
        </div>

        {/* Detailed Core Pillars Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl text-left mt-4 fadeInRight">
          
          {/* Card 1: Relational postgres */}
          <motion.div
            whileHover={{ y: -8, scale: 1.02, borderColor: "rgba(239, 68, 68, 0.4)" }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className="p-8 bg-white/[0.02] border border-white/[0.06] backdrop-blur-xl rounded-2xl relative overflow-hidden group shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] transition-all duration-300"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/10 rounded-full filter blur-xl group-hover:bg-red-500/20 transition-colors" />
            <span className="font-mono text-xs text-red-500 font-bold block mb-4">01 / RELATIONAL DATA</span>
            <h3 className="font-display font-black text-lg text-white uppercase mb-2 flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-red-500 animate-pulse" />
              HAND-WRITTEN SQL
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              We do not build fake arrays or JSON mocks. I design real PostgreSQL databases, secure transactions, and optimized indexing schemas for true scale.
            </p>
          </motion.div>

          {/* Card 2: Kinetic UX */}
          <motion.div
            whileHover={{ y: -8, scale: 1.02, borderColor: "rgba(168, 85, 247, 0.4)" }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className="p-8 bg-white/[0.02] border border-white/[0.06] backdrop-blur-xl rounded-2xl relative overflow-hidden group shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] transition-all duration-300"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-full filter blur-xl group-hover:bg-purple-500/20 transition-colors" />
            <span className="font-mono text-xs text-purple-500 font-bold block mb-4">02 / INTERACTIVE FLOWS</span>
            <h3 className="font-display font-black text-lg text-white uppercase mb-2 flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-purple-500 animate-pulse" />
              KINETIC LAYOUTS
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              Just like high-end motion graphics, layouts feature dynamic entrance timelines, smooth list transitions, and interactive visual grids that guide attention.
            </p>
          </motion.div>

          {/* Card 3: Standalone hydration */}
          <motion.div
            whileHover={{ y: -8, scale: 1.02, borderColor: "rgba(59, 130, 246, 0.4)" }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className="p-8 bg-white/[0.02] border border-white/[0.06] backdrop-blur-xl rounded-2xl relative overflow-hidden group shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] transition-all duration-300"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full filter blur-xl group-hover:bg-blue-500/20 transition-colors" />
            <span className="font-mono text-xs text-blue-500 font-bold block mb-4">03 / PERFORMANCE EXTREME</span>
            <h3 className="font-display font-black text-lg text-white uppercase mb-2 flex items-center gap-1.5">
              <Code className="w-4 h-4 text-blue-500 animate-pulse" />
              EXPRESS-VITE INGRESS
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              Full-stack architectures that compile server-side modules to clean, single bundled CommonJS nodes. Fast container cold-starts, sub-millisecond route latency.
            </p>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
