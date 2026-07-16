import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Eye, Flame, Heart, Play, Pause, RotateCcw } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Project } from "../types";
import { logEvent } from "./AnalyticsTracker";

gsap.registerPlugin(ScrollTrigger);

interface FeaturedWorkPinnedProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

export default function FeaturedWorkPinned({ projects, onSelectProject }: FeaturedWorkPinnedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  // Filter out featured projects (let's feature the first 4-5 projects for the cinematic slideshow!)
  const featured = projects.slice(0, 5);

  useEffect(() => {
    // GSAP ScrollTrigger for horizontal scrolling of projects
    const trigger = triggerRef.current;
    const container = containerRef.current;

    if (!trigger || !container || window.innerWidth < 1024) return;

    const totalWidth = container.scrollWidth;
    const viewportWidth = window.innerWidth;
    const scrollAmount = totalWidth - viewportWidth + 120; // add padding offset

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
            // Dynamically calculate which project card is active based on scroll progress
            const progress = self.progress;
            const idx = Math.min(
              featured.length - 1,
              Math.max(0, Math.floor(progress * featured.length))
            );
            setActiveIdx(idx);
          }
        }
      });

      // Animate the horizontal track
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
    <div ref={triggerRef} className="relative bg-[#030509] overflow-hidden">
      
      {/* Background visual details */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#1e1b4b12_1.5px,transparent_1.5px)] bg-[size:3rem_3rem] pointer-events-none" />
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-purple-950/10 rounded-full filter blur-[150px] pointer-events-none" />

      {/* Stationary Header Section (Top Left) */}
      <div className="absolute top-12 left-6 lg:left-24 z-30 pointer-events-none max-w-xl text-left">
        <span className="font-mono text-purple-400 text-xs tracking-widest uppercase block mb-3 font-semibold">
          SELECTED SHOWCASE
        </span>
        <h2 className="font-serif italic font-normal text-3xl sm:text-5xl text-white tracking-tight leading-none">
          Projects shaped by <span className="font-sans font-black not-italic uppercase text-purple-300">curiosity, craft and purpose.</span>
        </h2>
      </div>

      {/* Stationary Counter Indicator (Bottom Left) */}
      <div className="absolute bottom-12 left-6 lg:left-24 z-30 font-mono text-xs text-slate-500 flex items-center gap-4">
        <span className="text-white font-black text-lg">0{activeIdx + 1}</span>
        <div className="w-16 h-[2px] bg-slate-900 overflow-hidden relative">
          <motion.div 
            animate={{ width: `${((activeIdx + 1) / featured.length) * 100}%` }}
            className="absolute top-0 left-0 h-full bg-purple-500"
          />
        </div>
        <span>0{featured.length}</span>
      </div>

      {/* DESKTOP PERSPECTIVE HORIZONTAL CAROUSEL TRACK */}
      <div className="hidden lg:flex min-h-screen items-center relative pl-24 lg:pl-[30vw] pr-24">
        
        <div 
          ref={containerRef} 
          className="flex items-center gap-16 select-none"
          style={{ perspective: "1200px", transformStyle: "preserve-3d" }}
        >
          {featured.map((proj, idx) => {
            const isActive = activeIdx === idx;
            const isPrev = idx < activeIdx;
            const isNext = idx > activeIdx;

            // Compute cinematic cover flow parameters based on status
            const cardScale = isActive ? 1 : 0.88;
            const cardOpacity = isActive ? 1 : 0.3;
            const cardRotateY = isActive ? 0 : isPrev ? 15 : -15;
            const cardTranslateZ = isActive ? 0 : -80;
            const cardBlur = isActive ? "0px" : "3px";

            return (
              <motion.div
                key={proj.id}
                animate={{
                  scale: cardScale,
                  opacity: cardOpacity,
                  rotateY: cardRotateY,
                  z: cardTranslateZ,
                  filter: `blur(${cardBlur})`
                }}
                transition={{ type: "spring", stiffness: 120, damping: 15 }}
                onClick={() => {
                  if (isActive) {
                    onSelectProject(proj);
                  }
                }}
                className={`flex-shrink-0 w-[800px] h-[520px] bg-slate-950 border-2 border-slate-900 rounded-[28px] overflow-hidden flex shadow-2xl relative transition-all duration-300 ${
                  isActive ? "cursor-pointer border-purple-500/40 hover:bg-slate-950/80" : "pointer-events-none"
                }`}
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Visual side */}
                <div className="w-1/2 relative overflow-hidden bg-black h-full">
                  <img
                    src={proj.thumbnail}
                    alt={proj.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover grayscale opacity-50 hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-slate-950" />
                  
                  {/* Glowing core focus overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <div className="w-16 h-16 rounded-full bg-purple-600 flex items-center justify-center text-white shadow-xl">
                      <Play className="w-6 h-6 fill-white ml-1" />
                    </div>
                  </div>
                </div>

                {/* Content description side */}
                <div className="w-1/2 p-10 flex flex-col justify-between text-left">
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <span className="font-mono text-purple-400 text-xs tracking-widest uppercase">
                        {proj.category}
                      </span>
                      <span className="font-mono text-xs text-slate-600">
                        SHOWCASE // 0{idx + 1}
                      </span>
                    </div>

                    <h3 className="font-display font-black text-3xl uppercase tracking-tight text-white mb-4 leading-none">
                      {proj.title}
                    </h3>

                    <p className="text-slate-400 text-sm leading-relaxed font-sans mb-6">
                      {proj.description}
                    </p>

                    <div className="flex flex-col gap-2 mt-4">
                      <span className="font-mono text-[9px] text-slate-500 uppercase tracking-widest font-semibold">
                        Role & Outcome:
                      </span>
                      <p className="text-xs text-slate-300 font-sans leading-relaxed">
                        Full software engineering cycle, database architecture tuning, and immersive design details.
                      </p>
                    </div>
                  </div>

                  <div>
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {proj.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] font-mono text-slate-400">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-slate-900 font-mono text-[10px] text-slate-500">
                      <span className="flex items-center gap-1">
                        <Eye className="w-3.5 h-3.5" />
                        {proj.metrics.views} Views
                      </span>
                      <span className="flex items-center gap-1">
                        <Flame className="w-3.5 h-3.5 text-orange-500" />
                        {proj.metrics.retention} Retention
                      </span>
                    </div>
                  </div>
                </div>

                {/* Left/Right active spotlight indicators */}
                {isActive && (
                  <div className="absolute top-4 right-4 bg-purple-500/20 border border-purple-500/30 text-purple-400 font-mono text-[9px] px-2 py-1 rounded-md tracking-wider">
                    VIEW ACTIVE INTERACTOR
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* MOBILE RESPONSIVE SIMPLE VERTICAL LAYOUT */}
      <div className="lg:hidden flex flex-col gap-8 px-6 pt-36 pb-24 text-left">
        {featured.map((proj, idx) => (
          <div
            key={proj.id}
            onClick={() => onSelectProject(proj)}
            className="bg-slate-950 border border-slate-900 rounded-2xl overflow-hidden flex flex-col shadow-xl cursor-pointer"
          >
            <div className="relative aspect-video w-full bg-black">
              <img
                src={proj.thumbnail}
                alt={proj.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover grayscale opacity-50"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent" />
              <div className="absolute top-4 left-4 bg-slate-900/80 px-2.5 py-1 rounded-md text-[10px] font-mono text-purple-300">
                {proj.category}
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="font-display font-black text-xl uppercase text-white mb-2">
                {proj.title}
              </h3>
              <p className="text-slate-400 text-xs font-sans leading-relaxed mb-4">
                {proj.description}
              </p>
              
              <div className="flex flex-wrap gap-1 mb-4">
                {proj.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[9px] font-mono text-slate-500">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex justify-between items-center pt-3 border-t border-slate-900 font-mono text-[9px] text-slate-500">
                <span>{proj.metrics.views} Views</span>
                <span className="text-purple-400 font-bold uppercase">Tap to Play Trailer</span>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
