import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Activity, BookOpen, Layers, CheckCircle, Database, HelpCircle, Lightbulb, ChevronRight } from "lucide-react";

interface CaseStudy {
  id: string;
  projectTitle: string;
  category: string;
  challenge: string;
  approach: string;
  outcome: string;
  metrics: string[];
  role: string;
  image: string;
}

export default function ProjectCaseStudies() {
  const [activeStudy, setActiveStudy] = useState(0);

  const studies: CaseStudy[] = [
    {
      id: "study-1",
      projectTitle: "Illuvium Gaming Platform",
      category: "High-Performance Interactive Web Core",
      challenge: "The existing platform suffered from severe image load flickering, a high bounce rate on static components, and poor engagement metrics during cinematic trailer launches.",
      approach: "Refactored the stack to support an optimized asset delivery layer with responsive WebP image preloading and integrated custom GSAP attention mapping with interactive tracking states.",
      outcome: "Reduced visual first-contentful paint (FCP) from 3.2s to 0.8s, resulting in sub-second initialization and a severe rise in user action rates.",
      metrics: ["75% reduction in asset load-time", "Sub-1s First Contentful Paint", "+42% average session duration"],
      role: "Lead Systems & Interaction Engineering",
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80"
    },
    {
      id: "study-2",
      projectTitle: "Prinor Ecommerce Engine",
      category: "Secure High-Throughput Relational Checkout",
      challenge: "Slow relational query indexing caused checkout route lockups during peak flash-sales, with database lock contention peaking above 94% overhead.",
      approach: "Engineered customized database partition keys and built an Express-side proxy Redis buffer caching product data, avoiding direct DB writes on page navigation.",
      outcome: "Secured a 99.8% Redis cache hit-rate, drop-down database contention below 4%, and benchmarked up to 48,000 parallel Checkout queries successfully.",
      metrics: ["Redis Hit Rate: 99.8%", "Database overhead dropped to 3%", "48K concurrent transaction capacity"],
      role: "Backend Architect & Database engineer",
      image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=1200&q=80"
    }
  ];

  return (
    <section id="case-studies" className="relative bg-[#05070c] text-white py-24 px-6 overflow-hidden border-b border-slate-900/40">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.005)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8 text-left">
          <div>
            <span className="font-mono text-purple-400 text-xs tracking-widest uppercase block mb-3 font-semibold">
              ENGINEERING PERSPECTIVE
            </span>
            <h2 className="font-serif italic font-normal text-4xl sm:text-6xl text-white tracking-tight leading-none">
              Case Study <span className="font-sans font-black not-italic uppercase text-purple-300">Breakdowns.</span>
            </h2>
          </div>

          {/* Toggle buttons */}
          <div className="flex gap-2 bg-slate-950 border border-slate-900 p-1.5 rounded-2xl">
            {studies.map((st, idx) => (
              <button
                key={st.id}
                onClick={() => setActiveStudy(idx)}
                className={`px-5 py-2.5 rounded-xl font-mono text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                  activeStudy === idx
                    ? "bg-purple-600 text-white shadow-md"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Study 0{idx + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Case Study Content layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column: Visual reveal card (Vertical curtain reveal) */}
          <div className="lg:col-span-6 relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStudy}
                initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
                animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
                exit={{ clipPath: "inset(100% 0% 0% 0%)" }}
                transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
                className="relative h-[360px] sm:h-[480px] w-full rounded-3xl overflow-hidden border border-white/[0.08] shadow-2xl bg-slate-950"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent opacity-80 z-10" />
                <img
                  src={studies[activeStudy].image}
                  alt={studies[activeStudy].projectTitle}
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover grayscale opacity-50"
                />

                {/* Live overlay tag */}
                <div className="absolute top-6 left-6 z-20 bg-slate-950/85 border border-white/10 px-3.5 py-1.5 rounded-xl font-mono text-[10px] text-emerald-400 flex items-center gap-1.5 backdrop-blur-md">
                  <Activity className="w-3.5 h-3.5 animate-pulse" />
                  <span>PRODUCTION BENCHMARK ACTIVE</span>
                </div>

                <div className="absolute bottom-6 left-6 right-6 z-20 text-left">
                  <span className="font-mono text-[9px] text-purple-400 block uppercase tracking-widest font-bold mb-1">
                    ROLE INVOLVED
                  </span>
                  <p className="font-display font-black text-xl text-white uppercase leading-none">
                    {studies[activeStudy].role}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Column: Detailed breakdowns of thinking & decisions */}
          <div className="lg:col-span-6 text-left flex flex-col gap-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStudy}
                initial={{ opacity: 0, x: 25 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -25 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="flex flex-col gap-6"
              >
                <div>
                  <span className="font-mono text-xs text-purple-400 uppercase tracking-widest block font-bold mb-1">
                    {studies[activeStudy].category}
                  </span>
                  <h3 className="font-display font-black text-3xl sm:text-4xl text-white uppercase tracking-tight">
                    {studies[activeStudy].projectTitle}
                  </h3>
                </div>

                {/* Challenge card */}
                <div className="p-6 bg-white/[0.02] border border-white/[0.05] rounded-2xl flex gap-4">
                  <HelpCircle className="w-6 h-6 text-purple-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-mono text-xs text-purple-300 font-bold uppercase tracking-wider mb-1">The Core Challenge</h4>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">
                      {studies[activeStudy].challenge}
                    </p>
                  </div>
                </div>

                {/* Approach card */}
                <div className="p-6 bg-white/[0.02] border border-white/[0.05] rounded-2xl flex gap-4">
                  <Lightbulb className="w-6 h-6 text-indigo-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-mono text-xs text-indigo-300 font-bold uppercase tracking-wider mb-1">Our Technical Approach</h4>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">
                      {studies[activeStudy].approach}
                    </p>
                  </div>
                </div>

                {/* Outcome card */}
                <div className="p-6 bg-purple-950/10 border border-purple-500/20 rounded-2xl flex gap-4">
                  <CheckCircle className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-mono text-xs text-emerald-300 font-bold uppercase tracking-wider mb-1">System Outcome & Metrics</h4>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans mb-4">
                      {studies[activeStudy].outcome}
                    </p>

                    <div className="flex flex-wrap gap-2.5">
                      {studies[activeStudy].metrics.map((met) => (
                        <div key={met} className="px-3 py-1 bg-slate-950 border border-slate-900 rounded-lg text-[10px] font-mono text-white font-semibold">
                          {met}
                        </div>
                      ))}
                    </div>
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
