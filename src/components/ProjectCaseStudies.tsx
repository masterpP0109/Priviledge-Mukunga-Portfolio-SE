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

  const current = studies[activeStudy];

  return (
    <section id="case-studies" className="relative bg-[#0C0D0D] text-white py-24 px-6 sm:px-12 overflow-hidden border-b border-white/[0.06]">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8 text-left">
          <div>
            <span className="font-mono text-[#C7FF3D] text-xs tracking-widest uppercase block mb-3 font-semibold">
              ENGINEERING PERSPECTIVE
            </span>
            <h2 className="font-serif italic font-normal text-3xl sm:text-5xl lg:text-6xl text-[#F2EEE6] tracking-tight leading-none">
              Case Study <span className="font-sans font-black not-italic uppercase text-white">Breakdowns.</span>
            </h2>
          </div>

          {/* Toggle buttons */}
          <div className="flex gap-2 bg-white/[0.02] border border-white/10 p-1.5 rounded-2xl">
            {studies.map((st, idx) => (
              <button
                key={st.id}
                onClick={() => setActiveStudy(idx)}
                className={`px-5 py-2.5 rounded-xl font-mono text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                  activeStudy === idx
                    ? "bg-[#F2EEE6] text-[#0C0D0D] shadow-md"
                    : "text-[#B7B4AD] hover:text-white"
                }`}
              >
                Study 0{idx + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Active Study Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch text-left">
          
          {/* Left: Study Image & Role Banner */}
          <div className="lg:col-span-6">
            <div className="relative h-full min-h-[420px] rounded-3xl overflow-hidden border border-white/10 bg-slate-950 flex flex-col justify-between p-8">
              <img
                src={current.image}
                alt={current.projectTitle}
                className="absolute inset-0 w-full h-full object-cover grayscale opacity-40"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0C0D0D] via-[#0C0D0D]/60 to-transparent" />

              <div className="relative z-10 flex justify-between items-center">
                <span className="font-mono text-xs text-[#C7FF3D] bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 uppercase">
                  {current.category}
                </span>
              </div>

              <div className="relative z-10">
                <span className="font-mono text-[10px] text-[#E46F43] block uppercase tracking-widest font-bold mb-1">
                  ROLE & INVOLVEMENT
                </span>
                <h3 className="font-serif italic text-2xl sm:text-4xl text-white mb-2">
                  {current.projectTitle}
                </h3>
                <p className="font-mono text-xs text-[#B7B4AD]">
                  {current.role}
                </p>
              </div>
            </div>
          </div>

          {/* Right: Challenge, Approach, Outcome */}
          <div className="lg:col-span-6 flex flex-col justify-between gap-4">
            
            {/* Challenge */}
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <HelpCircle className="w-4 h-4 text-[#E46F43]" />
                <span className="font-mono text-xs text-[#E46F43] uppercase tracking-wider font-bold">
                  The Challenge
                </span>
              </div>
              <p className="text-[#B7B4AD] text-sm leading-relaxed font-sans">
                {current.challenge}
              </p>
            </div>

            {/* Approach */}
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb className="w-4 h-4 text-[#C7FF3D]" />
                <span className="font-mono text-xs text-[#C7FF3D] uppercase tracking-wider font-bold">
                  The Engineering Approach
                </span>
              </div>
              <p className="text-[#B7B4AD] text-sm leading-relaxed font-sans">
                {current.approach}
              </p>
            </div>

            {/* Outcome & Metrics */}
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span className="font-mono text-xs text-emerald-400 uppercase tracking-wider font-bold">
                  System Outcome
                </span>
              </div>
              <p className="text-white font-medium text-sm leading-relaxed font-sans mb-4">
                {current.outcome}
              </p>

              <div className="flex flex-wrap gap-2 pt-3 border-t border-white/[0.06]">
                {current.metrics.map((m) => (
                  <span
                    key={m}
                    className="px-3 py-1 bg-white/[0.05] border border-white/10 rounded-lg text-xs font-mono text-[#F2EEE6]"
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
