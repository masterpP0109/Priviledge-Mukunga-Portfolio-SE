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
      title: "Front-End Development",
      subtitle: "Responsive & Visually Polished Interfaces",
      description: "Responsive, accessible and visually polished interfaces using HTML, CSS, JavaScript and modern workflows.",
      skills: ["Responsive Layouts", "CSS Grid & Flexbox", "JavaScript (ES6+)", "React & Component Architecture"],
      metric: "Accessible & Responsive",
      imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
      icon: <Terminal className="w-5 h-5 text-[#E46F43]" />
    },
    {
      id: "cap-2",
      number: "02",
      title: "Back-End and Databases",
      subtitle: "Application Logic & Data Architecture",
      description: "Application logic, data organisation, and MySQL/Postgres database architectures.",
      skills: ["MySQL Database Schemas", "Node.js & Express APIs", "Data Integrity & Relations", "Server-Side Logic"],
      metric: "High Transaction Security",
      imageUrl: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=800&q=80",
      icon: <Cpu className="w-5 h-5 text-[#E46F43]" />
    },
    {
      id: "cap-3",
      number: "03",
      title: "UI/UX Design",
      subtitle: "User Flows, Wireframes & Prototypes",
      description: "User flows, wireframes, and interface prototypes using Figma and Adobe XD.",
      skills: ["Figma Design Systems", "Adobe XD Wireframing", "User Journey Mapping", "Interactive Prototyping"],
      metric: "Intuitive User Journeys",
      imageUrl: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80",
      icon: <Layers className="w-5 h-5 text-[#E46F43]" />
    },
    {
      id: "cap-4",
      number: "04",
      title: "Product Delivery",
      subtitle: "Testing, Refining & Performance Optimization",
      description: "Testing, refining, deploying and improving digital experiences with attention to performance.",
      skills: ["Production Deployment", "Performance Tuning", "Cross-Browser Testing", "Iterative Refinement"],
      metric: "Fast Page Load Speeds",
      imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
      icon: <Sparkles className="w-5 h-5 text-[#E46F43]" />
    }
  ];

  const current = capabilities[activeIdx];

  return (
    <section id="capabilities" className="relative bg-[#020408] text-white py-24 px-6 sm:px-12 overflow-hidden border-b border-slate-900/40">
      {/* Background ambient details */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-purple-900/5 rounded-full filter blur-[150px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(rgba(139,92,246,0.015)_1px,transparent_1px)] bg-[size:2.5rem_2.5rem] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="mb-16 text-left">
          <span className="font-mono text-purple-400 text-xs tracking-widest uppercase block mb-3 font-semibold">
            CAPABILITIES SHOWCASE
          </span>
          <h2 className="font-serif italic font-normal text-4xl sm:text-6xl text-white tracking-tight leading-none">
            Different disciplines. <span className="font-sans font-black not-italic uppercase text-purple-300">One creative approach.</span>
          </h2>
        </div>

        {/* Desktop Interactive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch mt-6">
          
          {/* Left Column: vertical list with progress highlights */}
          <div className="lg:col-span-5 flex flex-col justify-between text-left gap-4">
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
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs text-[#E46F43] font-bold">
                      {cap.number}.
                    </span>
                    <span className="font-mono text-[10px] text-slate-500 uppercase tracking-wider">
                      {cap.metric}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-purple-300 transition-colors">
                    {cap.title}
                  </h3>
                  <p className="text-slate-400 text-xs sm:text-sm font-sans mt-1 line-clamp-2">
                    {cap.subtitle}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Right Column: Detailed Active Card */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.3 }}
                className="bg-slate-950/80 border border-slate-900 rounded-3xl p-8 h-full flex flex-col justify-between shadow-2xl relative overflow-hidden text-left"
              >
                {/* Background image preview */}
                <div className="relative aspect-video w-full rounded-2xl overflow-hidden mb-6 border border-slate-900">
                  <img
                    src={current.imageUrl}
                    alt={current.title}
                    className="w-full h-full object-cover opacity-60"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                  <div className="absolute top-4 left-4 p-2 rounded-xl bg-black/60 backdrop-blur-md border border-white/10">
                    {current.icon}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs text-[#C7FF3D] uppercase tracking-widest">
                      DISCIPLINE {current.number}
                    </span>
                    <span className="px-3 py-1 bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-mono rounded-full">
                      {current.metric}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-serif italic text-white mb-3">
                    {current.title}
                  </h3>

                  <p className="text-slate-300 text-sm sm:text-base font-sans leading-relaxed mb-6">
                    {current.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-slate-900">
                    {current.skills.map((skill) => (
                      <div key={skill} className="flex items-center gap-2 text-xs font-mono text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-[#C7FF3D] flex-shrink-0" />
                        <span>{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
