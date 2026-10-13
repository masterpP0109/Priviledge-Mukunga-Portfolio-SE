import React, { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Eye, Flame, Play, ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Project } from "../types";

gsap.registerPlugin(ScrollTrigger);

interface FeaturedWorkPinnedProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

export default function FeaturedWorkPinned({ projects, onSelectProject }: FeaturedWorkPinnedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  // Curated showcase selection
  const featured = projects.slice(0, 6);

  useEffect(() => {
    const trigger = triggerRef.current;
    const container = containerRef.current;

    if (!trigger || !container || window.innerWidth < 1024) return;

    const totalWidth = container.scrollWidth;
    const viewportWidth = window.innerWidth;
    const scrollAmount = totalWidth - viewportWidth + 120;

    const ctx = gsap.context(() => {
      const pinTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: trigger,
          start: "top top",
          end: () => `+=${scrollAmount}`,
          pin: true,
          pinSpacing: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const progress = self.progress;
            const idx = Math.min(
              featured.length - 1,
              Math.max(0, Math.floor(progress * featured.length))
            );
            setActiveIdx(idx);
          }
        }
      });

      pinTimeline.to(container, {
        x: -scrollAmount,
        ease: "none"
      });
    }, triggerRef);

    return () => {
      ctx.revert();
    };
  }, [featured.length]);

  return (
    <div ref={triggerRef} className="relative bg-[#0C0D0D] text-white overflow-hidden border-b border-white/[0.06]">
      
      {/* Background ambient gradient */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-[#E46F43]/10 rounded-full filter blur-[160px] pointer-events-none" />

      {/* Stationary Header Section (Top Left) */}
      <div className="absolute top-10 left-6 lg:left-16 z-30 pointer-events-none max-w-xl text-left">
        <span className="font-mono text-[#C7FF3D] text-xs tracking-widest uppercase block mb-2 font-semibold">
          SELECTED WORK
        </span>
        <h2 className="font-serif italic font-normal text-3xl sm:text-5xl text-[#F2EEE6] tracking-tight leading-none">
          Products built with <span className="font-sans font-black not-italic uppercase text-white">purpose & speed.</span>
        </h2>
      </div>

      {/* Stationary Counter Indicator (Bottom Left) */}
      <div className="absolute bottom-10 left-6 lg:left-16 z-30 font-mono text-xs text-[#B7B4AD] flex items-center gap-4">
        <span className="text-[#C7FF3D] font-mono font-bold text-base">0{activeIdx + 1}</span>
        <div className="w-20 h-[2px] bg-white/10 overflow-hidden relative rounded-full">
          <motion.div 
            animate={{ width: `${((activeIdx + 1) / featured.length) * 100}%` }}
            className="absolute top-0 left-0 h-full bg-[#E46F43]"
          />
        </div>
        <span>0{featured.length}</span>
      </div>

      {/* DESKTOP PERSPECTIVE HORIZONTAL CAROUSEL TRACK */}
      <div className="hidden lg:flex min-h-screen items-center relative pl-16 lg:pl-[28vw] pr-16 pt-24">
        
        <div 
          ref={containerRef} 
          className="flex items-center gap-12 select-none"
          style={{ perspective: "1200px", transformStyle: "preserve-3d" }}
        >
          {featured.map((proj, idx) => {
            const isActive = activeIdx === idx;
            const isPrev = idx < activeIdx;

            const cardScale = isActive ? 1 : 0.92;
            const cardOpacity = isActive ? 1 : 0.4;
            const cardRotateY = isActive ? 0 : isPrev ? 12 : -12;

            return (
              <motion.div
                key={proj.id}
                animate={{
                  scale: cardScale,
                  opacity: cardOpacity,
                  rotateY: cardRotateY,
                }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                onClick={() => {
                  if (isActive) {
                    onSelectProject(proj);
                  }
                }}
                className={`flex-shrink-0 w-[780px] h-[500px] bg-white/[0.02] border border-white/10 rounded-3xl overflow-hidden flex shadow-2xl relative transition-all duration-300 ${
                  isActive ? "cursor-pointer border-[#E46F43]/40 hover:bg-white/[0.04]" : "pointer-events-none"
                }`}
              >
                {/* Visual side */}
                <div className="w-1/2 relative overflow-hidden bg-black h-full group">
                  <img
                    src={proj.thumbnail}
                    alt={proj.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover grayscale opacity-60 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#0C0D0D]/40 to-[#0C0D0D]" />
                  
                  {/* Play overlay button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-14 h-14 rounded-full bg-[#E46F43] flex items-center justify-center text-white shadow-xl">
                      <Play className="w-5 h-5 fill-white ml-0.5" />
                    </div>
                  </div>
                </div>

                {/* Content description side */}
                <div className="w-1/2 p-8 flex flex-col justify-between text-left">
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-mono text-[#E46F43] text-xs tracking-widest uppercase font-semibold">
                        {proj.category}
                      </span>
                      <span className="font-mono text-[11px] text-[#B7B4AD]">
                        0{idx + 1} / 0{featured.length}
                      </span>
                    </div>

                    <h3 className="font-display font-black text-2xl uppercase tracking-tight text-white mb-3 leading-tight">
                      {proj.title}
                    </h3>

                    <p className="text-[#B7B4AD] text-xs leading-relaxed font-sans mb-4">
                      {proj.description}
                    </p>
                  </div>

                  <div>
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {proj.tags.map((tag) => (
                        <span key={tag} className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/10 text-[10px] font-mono text-[#F2EEE6]">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-white/10 font-mono text-[10px] text-[#B7B4AD]">
                      <span className="flex items-center gap-1.5 text-white font-bold uppercase hover:text-[#C7FF3D] transition-colors">
                        <span>EXPLORE CASE STUDY</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-[#C7FF3D]" />
                      </span>
                      <span className="text-[#C7FF3D] font-bold">LIVE PREVIEW</span>
                    </div>
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>

      {/* MOBILE RESPONSIVE SIMPLE VERTICAL LAYOUT */}
      <div className="lg:hidden flex flex-col gap-8 px-6 pt-28 pb-20 text-left">
        {featured.map((proj, idx) => (
          <div
            key={proj.id}
            onClick={() => onSelectProject(proj)}
            className="bg-white/[0.02] border border-white/10 rounded-2xl overflow-hidden flex flex-col shadow-xl cursor-pointer"
          >
            <div className="relative aspect-video w-full bg-black">
              <img
                src={proj.thumbnail}
                alt={proj.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover grayscale opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0C0D0D] to-transparent" />
              <div className="absolute top-3 left-3 bg-black/80 px-2.5 py-1 rounded-md text-[10px] font-mono text-[#E46F43]">
                {proj.category}
              </div>
            </div>
            
            <div className="p-5">
              <h3 className="font-display font-black text-xl uppercase text-white mb-2">
                {proj.title}
              </h3>
              <p className="text-[#B7B4AD] text-xs font-sans leading-relaxed mb-4">
                {proj.description}
              </p>
              
              <div className="flex flex-wrap gap-1 mb-4">
                {proj.tags.map((tag) => (
                  <span key={tag} className="px-2 py-0.5 rounded bg-white/[0.05] border border-white/10 text-[9px] font-mono text-[#B7B4AD]">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex justify-between items-center pt-3 border-t border-white/10 font-mono text-[10px] text-[#B7B4AD]">
                <span className="text-[#C7FF3D] font-bold uppercase flex items-center gap-1">
                  <span>TAP TO VIEW DETAILS</span>
                  <ArrowUpRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

