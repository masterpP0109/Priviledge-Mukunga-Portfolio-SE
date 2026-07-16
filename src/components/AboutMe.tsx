import React from "react";
import { motion } from "motion/react";
import { ArrowUpRight, Compass, Shield, User } from "lucide-react";

export default function AboutMe() {
  const principles = [
    {
      id: "p-1",
      title: "Story First",
      text: "Code exists to express an idea. Every pixel, transition, and endpoint should reinforce the story and values of the product."
    },
    {
      id: "p-2",
      title: "No False Promises",
      text: "Everything is real. Hand-crafted PostgreSQL databases, low-latency node networks, and responsive layouts instead of static mockups."
    },
    {
      id: "p-3",
      title: "Sub-Millisecond Mindset",
      text: "Speed is a feature. High-performance caching, bundled Node targets, and lightweight bundle delivery are core architectures."
    }
  ];

  return (
    <section id="about" className="relative bg-[#05070c] text-white py-24 px-6 overflow-hidden">
      {/* Editorial glowing accents */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-purple-900/10 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-indigo-900/5 rounded-full filter blur-[150px] pointer-events-none" />
      
      {/* Fine grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.005)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.005)_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        
        {/* Left Side: Creative Image Collage / Vertical Reveal Mask */}
        <div className="lg:col-span-5 relative group">
          {/* Vertical Mask reveal */}
          <motion.div
            initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
            whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
            className="relative h-[480px] sm:h-[600px] w-full rounded-3xl overflow-hidden bg-slate-950 border border-white/[0.08] shadow-[0_12px_64px_-12px_rgba(139,92,246,0.15)]"
          >
            {/* Dark abstract overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent z-10" />
            
            {/* Unsplash creative portrait / dark workspace overlay */}
            <img 
              src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80" 
              alt="Creative Space" 
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover grayscale opacity-60 group-hover:scale-105 group-hover:rotate-1 transition-transform duration-700 ease-out"
            />

            {/* Recurring visual motif - Glowing Aperture ring floating on image */}
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-48 h-48 rounded-full border-2 border-dashed border-purple-500/20 flex items-center justify-center"
              >
                <div className="w-40 h-40 rounded-full border border-purple-500/40 flex items-center justify-center relative bg-slate-950/40 backdrop-blur-sm">
                  {/* Glowing center dot */}
                  <div className="w-3 h-3 rounded-full bg-purple-500 shadow-[0_0_15px_#a855f7]" />
                  <div className="absolute w-2 h-2 rounded-full bg-pink-500 shadow-[0_0_10px_#ec4899] top-4 left-1/2 -translate-x-1/2" />
                </div>
              </motion.div>
            </div>

            {/* Float Badge */}
            <div className="absolute bottom-6 left-6 z-20 bg-slate-950/85 border border-white/[0.08] p-5 rounded-2xl backdrop-blur-md max-w-[280px]">
              <span className="font-mono text-[9px] text-purple-400 block uppercase tracking-widest font-semibold mb-1">
                LOCATION & MODE
              </span>
              <p className="font-display font-black text-sm uppercase text-white leading-tight">
                Available Globally for Selected Contracts
              </p>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Editorial Content with staggered entry */}
        <div className="lg:col-span-7 text-left flex flex-col justify-center">
          
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-purple-950/40 border border-purple-500/20 text-purple-400 font-mono text-xs rounded-full uppercase tracking-widest mb-6 w-fit"
          >
            <User className="w-3.5 h-3.5 text-purple-400" />
            <span>Creative Identity</span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.05 }}
            className="font-serif italic font-normal text-4xl sm:text-6xl text-white tracking-tight leading-none mb-6"
          >
            More than a <span className="font-sans font-black not-italic uppercase text-purple-300">portfolio.</span>
          </motion.h2>

          {/* Statement */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-sans font-medium text-lg sm:text-xl text-white leading-relaxed mb-6 border-l-2 border-purple-500/80 pl-5 py-1"
          >
            I combine visual storytelling, thoughtful systems, and interaction design to turn ideas into experiences that feel clear, useful, and memorable.
          </motion.p>

          {/* Paragraphs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="flex flex-col gap-4 text-slate-400 text-sm sm:text-base leading-relaxed mb-10"
          >
            <p>
              I believe in architecting code with high visual aesthetics. A website should load under a second, respond seamlessly to scroll, and display gorgeous typography while remaining highly secure and manageable.
            </p>
            <p>
              Over the last five years, I have engineered custom full-stack solutions for e-commerce, cloud integrations, real-time performance blueprints, and immersive media systems.
            </p>
          </motion.div>

          {/* Personal Principles list */}
          <div className="border-t border-slate-900/80 pt-8 mb-10">
            <span className="font-mono text-[10px] text-slate-500 uppercase block tracking-widest mb-6 font-semibold">
              Operational Principles:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {principles.map((princ, idx) => (
                <motion.div 
                  key={princ.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="flex flex-col gap-2"
                >
                  <span className="font-mono text-[11px] text-purple-400 font-bold uppercase">
                    0{idx + 1} // {princ.title}
                  </span>
                  <p className="text-slate-400 text-xs leading-relaxed font-sans">
                    {princ.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Action Links */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center gap-6"
          >
            <a 
              href="https://wa.me/263773887577" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-sm font-semibold text-purple-400 hover:text-purple-300 transition-colors group"
            >
              <span>Download Full CV / Resume</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
