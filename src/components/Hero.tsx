import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Eye, Play, Sparkles, Code, Cpu, Database, Compass, Layers } from 'lucide-react';
import { logEvent } from './AnalyticsTracker';

interface HeroProps {
  name: string;
  title: string;
  bio: string;
  onExploreProjects: () => void;
  onContactMe: () => void;
}

export default function Hero({ name, title, bio, onExploreProjects, onContactMe }: HeroProps) {
  const [activeWordIndex, setActiveWordIndex] = useState(0);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  
  const words = ["SOFTWARE ENGINEER", "SYSTEMS ARCHITECT", "FULL STACK DEVELOPER", "CREATIVE CODER"];

  // Track cursor position for interactive eye tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Word cycler
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveWordIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // Helper for eye pupil offset calculation
  const getPupilOffset = (eyeRefX: number, eyeRefY: number) => {
    if (!eyeRefX || !eyeRefY) return { x: 0, y: 0 };
    const dx = cursorPos.x - eyeRefX;
    const dy = cursorPos.y - eyeRefY;
    const angle = Math.atan2(dy, dx);
    const distance = Math.min(6, Math.hypot(dx, dy) / 40);
    return {
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
    };
  };

  // Eyes coordinates
  const eyeRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];

  const [eyeCoords, setEyeCoords] = useState<{ x: number; y: number }[]>(
    Array(5).fill({ x: 0, y: 0 })
  );

  useEffect(() => {
    const updateEyeCoords = () => {
      const coords = eyeRefs.map((ref) => {
        if (ref.current) {
          const rect = ref.current.getBoundingClientRect();
          return {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2,
          };
        }
        return { x: 0, y: 0 };
      });
      setEyeCoords(coords);
    };

    updateEyeCoords();
    window.addEventListener('resize', updateEyeCoords);
    // Extra timeout to trigger after animations settle
    const timer = setTimeout(updateEyeCoords, 1000);
    
    return () => {
      window.removeEventListener('resize', updateEyeCoords);
      clearTimeout(timer);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-center bg-[#05070c] text-white overflow-hidden py-24 px-6">
      
      {/* Background Galaxy video exactly from user HTML */}
      <video 
        className="absolute inset-0 w-full h-full object-cover z-0 mix-blend-lighten opacity-30 pointer-events-none" 
        src="vids/galaxy.mp4" 
        loop 
        autoPlay 
        muted 
        playsInline 
      />

      {/* Layer-blur styling element from pasted code */}
      <div className="absolute top-[20%] right-0 bottom-[50%] w-[30rem] h-0 shadow-[0_0_1700px_15px_rgba(255,255,255,0.15)] -rotate-30 z-0 pointer-events-none" />

      {/* Blackhole cosmic box overlay at center top */}
      <div className="absolute inset-x-0 top-0 z-0 flex justify-center mix-blend-lighten opacity-20 pointer-events-none overflow-hidden h-[600px]">
        <video 
          className="w-full max-w-7xl object-cover -mt-[12%]" 
          src="vids/blackhole.mp4" 
          loop 
          autoPlay 
          muted 
          playsInline 
        />
      </div>

      {/* Grid Pattern overlay */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none z-10" 
      />

      {/* Main Hero Content */}
      <div className="relative z-20 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Text Area (hero-info with autoBlur applied) */}
        <div className="lg:col-span-7 flex flex-col justify-center text-left autoBlur">
          
          {/* Tag / Pill exactly as styled in user template */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-950/40 border border-purple-500/30 text-purple-300 font-mono text-xs w-fit mb-6 shadow-[0_0_15px_rgba(114,127,222,0.3)]"
          >
            <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
            <span className="uppercase tracking-wider font-bold">Full Stack Developer Portfolio</span>
          </motion.div>

          {/* Title with gradient animation from user's CSS */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display font-black text-5xl sm:text-7xl lg:text-8xl leading-none tracking-tight text-white mb-6 uppercase animate-pulse-glow"
          >
            Providing <span className="gradient">the best</span> Project <span className="gradient">Experience</span>
          </motion.h1>

          {/* User's Exact Bio Paragraph */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg sm:text-xl text-gray-300 font-sans leading-relaxed max-w-2xl mb-10 border-l-2 border-purple-500 pl-4 py-1.5"
          >
            I,m a Full Stack developer with Experience in website, Mobile And Software development. Check Out my Projects and skills
          </motion.p>

          {/* Action Buttons with exact WhatsApp details from HTML */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            <a 
              href="https://wa.me/263773887577?text=Hello%20I%20saw%20your%20website" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-2.5 px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-2xl shadow-[0_0_20px_rgba(114,127,222,0.4)] hover:shadow-[0_0_30px_rgba(114,127,222,0.6)] hover:scale-105 transition-all duration-300"
            >
              <ArrowRight className="w-5 h-5" />
              <span>Contact Me (WhatsApp)</span>
            </a>

            <button
              onClick={onExploreProjects}
              className="px-8 py-4 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-white font-semibold rounded-2xl hover:scale-105 transition-all duration-300 backdrop-blur-md inline-flex items-center gap-2"
            >
              <span>Explore My Work</span>
            </button>
          </motion.div>
        </div>

        {/* Visual Showcase (Interactive Attention Grid) */}
        <div className="lg:col-span-5 relative flex items-center justify-center">
          
          {/* Animated Rainbow sweep backing */}
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 via-yellow-500/10 via-green-500/10 via-blue-500/10 to-purple-500/10 rounded-3xl filter blur-3xl opacity-50 transform rotate-6 pointer-events-none" />

          {/* Main Visual Card with Ultra Glassmorphic styling */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ type: "spring", mass: 1, damping: 10, delay: 0.5 }}
            className="relative w-full max-w-md bg-white/[0.04] border border-white/[0.08] p-8 rounded-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] backdrop-blur-xl hover:border-white/[0.15] transition-all duration-500"
          >
            {/* Eye Tracking Attention Panel */}
            <div className="mb-6 flex items-center justify-between">
              <span className="font-mono text-xs text-purple-400 tracking-widest uppercase flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                Live Attention Radar
              </span>
              <span className="font-mono text-xs text-white/40">
                ACTIVE PIPELINE
              </span>
            </div>

            {/* Simulated Eye Tracking Box with Glassmorphism */}
            <div className="relative h-64 bg-black/40 rounded-2xl border border-white/[0.06] overflow-hidden flex flex-col items-center justify-center p-4">
              
              {/* User's hero-video.mp4 embedded as a high-fidelity visual feed background */}
              <video 
                className="absolute inset-0 w-full h-full object-cover opacity-45 mix-blend-screen pointer-events-none autoBlur" 
                src="vids/hero-video.mp4" 
                loop 
                autoPlay 
                muted 
                playsInline 
              />

              {/* Central Text */}
              <div className="absolute top-4 text-center z-10">
                <span className="font-mono text-[9px] text-purple-400 uppercase tracking-widest font-bold">
                  Attention Vector Map
                </span>
                <p className="font-sans font-black text-xs text-white uppercase tracking-wider mt-1">
                  FOCUS_RATIO: 94.72%
                </p>
              </div>

              {/* Eye pupils mapping group */}
              <div className="grid grid-cols-3 gap-8 items-center justify-items-center w-full max-w-xs mt-4">
                
                {/* Eye 1 */}
                <div ref={eyeRefs[0]} className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-inner relative overflow-hidden border border-purple-500/40">
                  <motion.div 
                    animate={{
                      x: getPupilOffset(eyeCoords[0]?.x, eyeCoords[0]?.y).x,
                      y: getPupilOffset(eyeCoords[0]?.x, eyeCoords[0]?.y).y,
                    }}
                    className="w-5 h-5 rounded-full bg-slate-950 flex items-center justify-center"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-white absolute top-1 left-1" />
                  </motion.div>
                </div>

                {/* Eye 2 */}
                <div ref={eyeRefs[1]} className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-inner relative overflow-hidden border border-purple-500/40">
                  <motion.div 
                    animate={{
                      x: getPupilOffset(eyeCoords[1]?.x, eyeCoords[1]?.y).x,
                      y: getPupilOffset(eyeCoords[1]?.x, eyeCoords[1]?.y).y,
                    }}
                    className="w-5 h-5 rounded-full bg-slate-950 flex items-center justify-center"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-white absolute top-1 left-1" />
                  </motion.div>
                </div>

                {/* Eye 3 */}
                <div ref={eyeRefs[2]} className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-inner relative overflow-hidden border border-purple-500/40">
                  <motion.div 
                    animate={{
                      x: getPupilOffset(eyeCoords[2]?.x, eyeCoords[2]?.y).x,
                      y: getPupilOffset(eyeCoords[2]?.x, eyeCoords[2]?.y).y,
                    }}
                    className="w-5 h-5 rounded-full bg-slate-950 flex items-center justify-center"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-white absolute top-1 left-1" />
                  </motion.div>
                </div>

                {/* Eye 4 */}
                <div ref={eyeRefs[3]} className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-inner relative overflow-hidden border border-purple-500/40 col-start-1 col-end-3 justify-self-center">
                  <motion.div 
                    animate={{
                      x: getPupilOffset(eyeCoords[3]?.x, eyeCoords[3]?.y).x,
                      y: getPupilOffset(eyeCoords[3]?.x, eyeCoords[3]?.y).y,
                    }}
                    className="w-5 h-5 rounded-full bg-slate-950 flex items-center justify-center"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-white absolute top-1 left-1" />
                  </motion.div>
                </div>

                {/* Eye 5 */}
                <div ref={eyeRefs[4]} className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-inner relative overflow-hidden border border-purple-500/40 col-start-2 col-end-4 justify-self-center">
                  <motion.div 
                    animate={{
                      x: getPupilOffset(eyeCoords[4]?.x, eyeCoords[4]?.y).x,
                      y: getPupilOffset(eyeCoords[4]?.x, eyeCoords[4]?.y).y,
                    }}
                    className="w-5 h-5 rounded-full bg-slate-950 flex items-center justify-center"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-white absolute top-1 left-1" />
                  </motion.div>
                </div>

              </div>

              {/* Bottom dynamic prompt */}
              <div className="absolute bottom-3 text-center">
                <span className="font-mono text-[10px] text-slate-500">
                  Move your cursor. They track your focus.
                </span>
              </div>
            </div>

            {/* Folder Stack Projects directly below (mimics project folder slide-in from video) */}
            <div className="mt-6">
              <span className="font-mono text-xs text-white/50 block mb-3 uppercase tracking-wider">
                Active Project Containers:
              </span>
              <div className="flex flex-col gap-2">
                <motion.div 
                  whileHover={{ x: 6, scale: 1.01 }}
                  onClick={() => {
                    onExploreProjects();
                    logEvent('click_project', { action: 'hero_folder_01' });
                  }}
                  className="flex items-center gap-3 bg-white/[0.02] hover:bg-purple-500/10 border border-white/[0.05] hover:border-purple-500/30 p-3 rounded-xl cursor-pointer transition-all duration-300 backdrop-blur-md"
                >
                  <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-300 border border-purple-500/20 flex items-center justify-center font-mono text-xs font-bold">
                    01
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-sans font-medium text-sm truncate text-white/90">OmniForge - Distributed Cloud Streamer</p>
                    <p className="font-mono text-[9px] text-white/40">CONTAINER_ACTIVE • API</p>
                  </div>
                  <Cpu className="w-3.5 h-3.5 text-white/30" />
                </motion.div>

                <motion.div 
                  whileHover={{ x: 6, scale: 1.01 }}
                  onClick={() => {
                    onExploreProjects();
                    logEvent('click_project', { action: 'hero_folder_02' });
                  }}
                  className="flex items-center gap-3 bg-white/[0.02] hover:bg-blue-500/10 border border-white/[0.05] hover:border-blue-500/30 p-3 rounded-xl cursor-pointer transition-all duration-300 backdrop-blur-md"
                >
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-300 border border-blue-500/20 flex items-center justify-center font-mono text-xs font-bold">
                    02
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-sans font-medium text-sm truncate text-white/90">VividCanvas - Interactive Visual Graphs</p>
                    <p className="font-mono text-[9px] text-white/40">CONTAINER_ACTIVE • UI</p>
                  </div>
                  <Database className="w-3.5 h-3.5 text-white/30" />
                </motion.div>
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
