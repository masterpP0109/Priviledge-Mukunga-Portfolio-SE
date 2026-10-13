import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Terminal, Code, Play, Cpu, Database, Sparkles, ChevronRight, CheckCircle2, MousePointer, 
  Settings, Folder, FileCode, Check, RefreshCw, Eye, Heart, Brain, Zap, Globe, FolderHeart, Server,
  Youtube, Instagram, Facebook
} from "lucide-react";
import { logEvent } from "./AnalyticsTracker";

interface KineticIntroProps {
  name: string;
  onComplete: () => void;
}

export default function KineticIntro({ name, onComplete }: KineticIntroProps) {
  // Screen stages aligned with linear timeline corresponding to TikTok video beats
  // 0: Name Intro ("MY NAME IS Priviledge") - Light background
  // 1: Track cuts timeline ("I'M A FULL-STACK ENGINEER") - Black background
  // 2: Neon Arcs ("SYSTEMS ARCHITECT") - Black background
  // 3: Word cloud tags ("& SO MUCH MORE") - Black background
  // 4: Folder cards sliding ("My Journey...") - Dark slate background
  // 5: QUALITY Impact Reveal (Screen-filling glowing text) - Black background
  // 6: Metallic stacks ("CREATOR or BUSINESS OWNER") - Black background
  // 7: ATTENTION Rainbow screen (Surrounded by blinking eyes) - Black with rainbow background
  // 8: ATTENTION Platforms (badges popping up underneath) - Black background
  // 9: A Great Product Browser template ("A great product doesn't just look good") - Black background
  // 10: STOP, FEEL, REMEMBER step flashes - Black background
  // 11: Final blinking Eye & Proposal ("Let's work together") - Black background

  const [screen, setScreen] = useState(0);
  const [typedNameText, setTypedNameText] = useState("");
  const [typedProjectText, setTypedProjectText] = useState("");
  const [isDone, setIsDone] = useState(false);
  const [screen6Step, setScreen6Step] = useState(0);
  
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  // Timings perfectly distributed across 53.5s duration to match video edits and slower Screen 6 sub-steps
  useEffect(() => {
    const timings = [
      { screen: 0, delay: 0 },
      { screen: 1, delay: 4000 },
      { screen: 2, delay: 8000 },
      { screen: 3, delay: 12000 },
      { screen: 4, delay: 16000 },
      { screen: 5, delay: 20500 },
      { screen: 6, delay: 25000 },
      { screen: 7, delay: 30500 },
      { screen: 8, delay: 35000 },
      { screen: 9, delay: 39500 },
      { screen: 10, delay: 44000 },
      { screen: 11, delay: 48500 }
    ];

    const timeouts = timings.map(t => {
      return setTimeout(() => {
        setScreen(t.screen);
      }, t.delay);
    });

    const finishTimeout = setTimeout(() => {
      setIsDone(true);
      onCompleteRef.current();
    }, 53500);

    return () => {
      timeouts.forEach(clearTimeout);
      clearTimeout(finishTimeout);
    };
  }, []);

  // Screen 0 typing animation
  useEffect(() => {
    if (screen !== 0) return;
    const fullText = "MY NAME ";
    let idx = 0;
    const interval = setInterval(() => {
      if (idx < fullText.length) {
        setTypedNameText(fullText.slice(0, idx + 1));
        idx++;
      } else {
        clearInterval(interval);
      }
    }, 120);
    return () => clearInterval(interval);
  }, [screen]);

  // Screen 4 typing animation
  useEffect(() => {
    if (screen !== 4) return;
    const fullText = "was built with one thing in mind...";
    let idx = 0;
    const interval = setInterval(() => {
      if (idx < fullText.length) {
        setTypedProjectText(fullText.slice(0, idx + 1));
        idx++;
      } else {
        clearInterval(interval);
      }
    }, 55);
    return () => clearInterval(interval);
  }, [screen]);

  // Screen 6 sub-animations timing (separated for video fidelity and improved readability)
  useEffect(() => {
    if (screen !== 6) return;
    setScreen6Step(0);
    const t1 = setTimeout(() => setScreen6Step(1), 1300);
    const t2 = setTimeout(() => setScreen6Step(2), 2600);
    const t3 = setTimeout(() => setScreen6Step(3), 3900);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [screen]);

  const handleSkip = () => {
    logEvent("click_project", { action: "skip_kinetic_intro" });
    onComplete();
  };

  return (
    <div className="relative w-full h-screen overflow-hidden select-none bg-[#020306] text-white font-sans">
      
      {/* FLOATING SKIP BUTTON */}
      <div className="absolute top-6 right-6 z-50">
        <button
          onClick={handleSkip}
          className="px-4 py-2 bg-black/40 backdrop-blur-md hover:bg-black/80 border border-slate-800/80 text-[10px] font-mono tracking-widest text-slate-400 hover:text-white rounded-lg transition-all cursor-pointer flex items-center gap-1.5 shadow-lg uppercase"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-purple-500"></span>
          </span>
          <span>Skip Intro ⚡</span>
        </button>
      </div>

      <AnimatePresence mode="wait">
        
        {/* ========================================================
            SCREEN 0: "My name is Priviledge"
            ======================================================== */}
        {screen === 0 && (
          <motion.div
            key="screen-0"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 bg-[#f8f9fa] text-[#111] flex flex-col items-center justify-center font-sans"
          >
            <div className="text-center flex flex-col items-center justify-center gap-1 sm:gap-3 px-6 max-w-5xl">
              <h2 className="text-xs sm:text-sm font-bold tracking-[0.25em] text-slate-500 font-mono h-8 flex items-center justify-center uppercase">
                <span>{typedNameText}</span>
                <span className="w-2 h-4 bg-purple-500 animate-[pulse_0.6s_infinite] ml-1.5" />
              </h2>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="text-5xl xs:text-6xl sm:text-8xl md:text-[7rem] lg:text-[9rem] font-black tracking-[-0.05em] uppercase text-black leading-[0.9] select-none"
              >
                IS <span className="text-purple-600 font-serif italic normal-case tracking-tight font-medium">Priviledge</span>
              </motion.h1>
            </div>
          </motion.div>
        )}

        {/* ========================================================
            SCREEN 1: "I'M A FULL-STACK ENGINEER"
            ======================================================== */}
        {screen === 1 && (
          <motion.div
            key="screen-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 bg-[#020408] flex flex-col items-center justify-center p-6 text-center"
          >
            <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-40 pointer-events-none" />
            <div className="relative z-10 w-full max-w-4xl flex flex-col items-center justify-center gap-6">
              <span className="font-mono text-purple-400 text-xs tracking-widest uppercase font-bold">[ PROFILE_01 ]</span>
              <h1 className="text-5xl xs:text-6xl sm:text-8xl md:text-9xl font-sans font-black tracking-[-0.05em] uppercase text-white leading-[0.85] select-none">
                I'M A <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500">FULL-STACK</span>
              </h1>
              <h2 className="text-4xl xs:text-5xl sm:text-7xl md:text-8xl font-sans font-black tracking-[-0.05em] uppercase text-white leading-none">
                ENGINEER
              </h2>

              <div className="flex gap-3 w-full max-w-lg justify-center mt-8">
                <motion.div initial={{ width: 0 }} animate={{ width: "35%" }} transition={{ delay: 0.3 }} className="h-10 rounded-2xl bg-purple-500 border border-purple-400/30 flex items-center justify-center text-xs font-mono font-bold text-white uppercase shadow-lg shadow-purple-500/10">React</motion.div>
                <motion.div initial={{ width: 0 }} animate={{ width: "45%" }} transition={{ delay: 0.4 }} className="h-10 rounded-2xl bg-pink-500 border border-pink-400/30 flex items-center justify-center text-xs font-mono font-bold text-white uppercase shadow-lg shadow-pink-500/10">Express</motion.div>
                <motion.div initial={{ width: 0 }} animate={{ width: "20%" }} transition={{ delay: 0.5 }} className="h-10 rounded-2xl bg-blue-500 border border-blue-400/30 flex items-center justify-center text-xs font-mono font-bold text-white uppercase shadow-lg shadow-blue-500/10">SQL</motion.div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ========================================================
            SCREEN 2: "SYSTEMS ARCHITECT"
            ======================================================== */}
        {screen === 2 && (
          <motion.div
            key="screen-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 bg-[#020408] flex flex-col items-center justify-center p-6 text-center"
          >
            <div className="relative z-10 w-full max-w-4xl flex flex-col items-center justify-center gap-6">
              <span className="font-mono text-purple-400 text-xs tracking-widest uppercase font-bold">[ PROFILE_02 ]</span>
              <h1 className="text-5xl xs:text-6xl sm:text-8xl md:text-9xl font-sans font-black tracking-[-0.05em] uppercase text-white leading-[0.85] select-none">
                SYSTEMS
              </h1>
              <h2 className="text-4xl xs:text-5xl sm:text-7xl md:text-8xl font-sans font-black tracking-[-0.05em] uppercase text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500 leading-none">
                ARCHITECT
              </h2>

              <div className="relative w-44 h-44 sm:w-52 sm:h-52 mt-8 flex items-center justify-center">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 border-t-2 border-r-2 border-indigo-500 rounded-full opacity-60"
                />
                <motion.div 
                  animate={{ rotate: -360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-4 border-b-2 border-l-2 border-purple-500 rounded-full opacity-60"
                />
                <motion.div 
                  animate={{ rotate: 180 }}
                  transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-8 border-t-2 border-pink-500 rounded-full opacity-60"
                />
                <Cpu className="w-12 h-12 text-white animate-pulse" />
              </div>
            </div>
          </motion.div>
        )}

        {/* ========================================================
            SCREEN 3: "& SO MUCH MORE"
            ======================================================== */}
        {screen === 3 && (
          <motion.div
            key="screen-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 bg-[#020408] flex flex-col items-center justify-center p-6 text-center"
          >
            <div className="relative z-10 w-full max-w-4xl flex flex-col items-center justify-center gap-4">
              <span className="font-mono text-purple-400 text-xs tracking-widest uppercase font-bold">[ PROFILE_03 ]</span>
              <h1 className="text-5xl xs:text-6xl sm:text-8xl md:text-9xl font-sans font-black tracking-[-0.05em] uppercase text-white leading-[0.85] select-none">
                & SO MUCH MORE
              </h1>

              <div className="relative w-full max-w-2xl h-80 mt-8 flex items-center justify-center overflow-hidden">
                <StageC_WordCloudLayout />
              </div>
            </div>
          </motion.div>
        )}

        {/* ========================================================
            SCREEN 4: "My Journey Folders"
            ======================================================== */}
        {screen === 4 && (
          <motion.div
            key="screen-4"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 bg-[#040508] flex flex-col items-center justify-center p-6 text-center"
          >
            <div className="absolute inset-0 bg-[radial-gradient(#1e1b4b15_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-30" />
            <div className="relative z-10 w-full max-w-4xl flex flex-col items-center justify-center gap-4">
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 150 }}
                className="px-6 py-2.5 bg-gradient-to-r from-slate-900 to-slate-950 border border-slate-800/80 rounded-2xl shadow-2xl backdrop-blur-md text-xs font-mono font-bold uppercase tracking-widest text-slate-300 flex items-center gap-2"
              >
                <span className="w-2 h-2 rounded-full bg-purple-500 animate-ping" />
                <span>My journey...</span>
              </motion.div>

              {/* Big, centered folder icons exactly as styled in the video */}
              <FolderFlipper />

              <div className="h-10 font-mono text-xs sm:text-sm text-slate-400 tracking-wider uppercase mt-12 text-center max-w-xl">
                {typedProjectText}
                <span className="w-2 h-4 bg-slate-500 inline-block align-middle ml-1 animate-pulse" />
              </div>
            </div>
          </motion.div>
        )}

        {/* ========================================================
            SCREEN 5: "QUALITY Impact Reveal"
            ======================================================== */}
        {screen === 5 && (
          <motion.div
            key="screen-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-[#010204] flex flex-col items-center justify-center p-6 text-center z-20"
          >
            <motion.div 
              animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute w-[500px] h-[250px] bg-purple-600/10 filter blur-[100px] rounded-full"
            />

            <div className="relative z-10 w-full max-w-5xl flex flex-col items-center justify-center gap-4">
              <motion.h1
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1.15, opacity: 1 }}
                transition={{ duration: 4.5, ease: "easeOut" }}
                className="font-sans font-black text-6xl xs:text-7xl sm:text-9xl md:text-[10rem] lg:text-[12rem] xl:text-[14rem] tracking-tighter text-white uppercase text-center leading-none select-none relative"
              >
                QUALITY
                <span className="absolute -inset-2 border border-white/10 filter blur-xs rounded-lg pointer-events-none" />
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 0.9, y: 0 }}
                transition={{ delay: 0.6 }}
                className="font-mono text-slate-300 text-xs sm:text-sm tracking-[0.3em] uppercase mt-10 text-center"
              >
                that actually moves people.
              </motion.p>
            </div>
          </motion.div>
        )}

        {/* ========================================================
            SCREEN 6: "Creator vs Business Metallic Stacks" (Sequential Step-by-Step for Video Fidelity)
            ======================================================== */}
        {screen === 6 && (
          <motion.div
            key="screen-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-[#020306] flex flex-col items-center justify-center p-6 text-center overflow-hidden"
          >
            {/* Spinning Earth Globe stays constant in background for steps 0, 1, 2 */}
            {screen6Step < 3 && <SpinningEarthGlobe />}

            <AnimatePresence mode="wait">
              {/* STEP 0: "In today's world" */}
              {screen6Step === 0 && (
                <motion.div
                  key="step6-0"
                  initial={{ opacity: 0, scale: 0.8, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 1.1, y: -10 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="relative z-10 flex flex-col items-center justify-center"
                >
                  <span className="font-mono text-purple-400 text-xs tracking-[0.3em] uppercase mb-4">[ SYSTEM_STATUS: GLOBAL ]</span>
                  <h1 className="font-sans font-black text-4xl sm:text-6xl md:text-7xl uppercase tracking-tight text-white leading-none">
                    IN TODAY'S WORLD...
                  </h1>
                </motion.div>
              )}

              {/* STEP 1: "whether you're a CREATOR" */}
              {screen6Step === 1 && (
                <motion.div
                  key="step6-1"
                  initial={{ opacity: 0, scale: 0.8, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 1.15, y: -15 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="relative z-10 flex flex-col items-center justify-center"
                >
                  <span className="font-mono text-slate-400 text-sm tracking-widest uppercase mb-4">WHETHER YOU'RE A</span>
                  
                  {/* Heavy metallic high-contrast CREATOR text box */}
                  <motion.div 
                    initial={{ rotateX: 45, opacity: 0, z: -100 }}
                    animate={{ rotateX: 0, opacity: 1, z: 0 }}
                    transition={{ type: "spring", stiffness: 150, damping: 10 }}
                    className="px-16 py-8 bg-gradient-to-b from-slate-50 via-slate-200 to-slate-400 text-black font-sans font-black text-4xl sm:text-6xl md:text-7xl uppercase rounded-3xl tracking-tighter leading-none shadow-[0_30px_70px_rgba(0,0,0,0.9)] border-t-4 border-l-2 border-white relative group select-none"
                  >
                    <span className="absolute inset-0 bg-white/20 rounded-3xl pointer-events-none filter blur-xs" />
                    CREATOR
                  </motion.div>
                </motion.div>
              )}

              {/* STEP 2: "or a BUSINESS OWNER," */}
              {screen6Step === 2 && (
                <motion.div
                  key="step6-2"
                  initial={{ opacity: 0, scale: 0.8, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 1.15, y: -15 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="relative z-10 flex flex-col items-center justify-center"
                >
                  <span className="font-mono text-slate-400 text-sm tracking-widest uppercase mb-4">OR A</span>
                  
                  {/* Heavy metallic high-contrast BUSINESS OWNER text box */}
                  <motion.div 
                    initial={{ rotateX: 45, opacity: 0, z: -100 }}
                    animate={{ rotateX: 0, opacity: 1, z: 0 }}
                    transition={{ type: "spring", stiffness: 150, damping: 10 }}
                    className="px-16 py-8 bg-gradient-to-b from-slate-50 via-slate-200 to-slate-400 text-black font-sans font-black text-4xl sm:text-5xl md:text-6xl uppercase rounded-3xl tracking-tighter leading-none shadow-[0_30px_70px_rgba(0,0,0,0.9)] border-t-4 border-l-2 border-white relative group select-none"
                  >
                    <span className="absolute inset-0 bg-white/20 rounded-3xl pointer-events-none filter blur-xs" />
                    BUSINESS OWNER
                  </motion.div>
                </motion.div>
              )}

              {/* STEP 3: "The EASIEST Leverage you have" */}
              {screen6Step === 3 && (
                <motion.div
                  key="step6-3"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="relative z-10 w-full max-w-2xl flex flex-col items-center justify-center p-8 bg-white/[0.02] border border-white/[0.08] backdrop-blur-2xl rounded-3xl shadow-2xl"
                >
                  {/* Mock film-gate indicators */}
                  <div className="absolute top-4 left-6 font-mono text-[8px] text-slate-500 uppercase tracking-widest">LEVERAGE_INDEX_01</div>
                  <div className="absolute top-4 right-6 font-mono text-[8px] text-red-500 uppercase tracking-widest flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                    <span>REC_MODE</span>
                  </div>

                  <span className="font-mono text-slate-400 text-xs sm:text-sm tracking-widest uppercase mb-4">THE EASIEST</span>
                  
                  <motion.h1 
                    animate={{ scale: [0.96, 1.04, 0.96] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                    className="font-sans font-black text-6xl sm:text-8xl md:text-9xl tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-500 to-purple-600 leading-none select-none my-2"
                  >
                    LEVERAGE
                  </motion.h1>

                  <span className="font-serif italic font-medium text-slate-300 text-2xl sm:text-3xl tracking-tight mt-4">
                    you have is...
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* ========================================================
            SCREEN 7: "ATTENTION Rainbow"
            ======================================================== */}
        {screen === 7 && (
          <motion.div
            key="screen-7"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 bg-black flex flex-col items-center justify-center p-4 z-20 overflow-hidden"
          >
            {/* Rainbow background strips */}
            <div className="absolute inset-0 flex flex-col justify-between opacity-20 pointer-events-none">
              <div className="h-6 w-full bg-red-500" />
              <div className="h-6 w-full bg-orange-500" />
              <div className="h-6 w-full bg-yellow-500" />
              <div className="h-6 w-full bg-green-500" />
              <div className="h-6 w-full bg-blue-500" />
              <div className="h-6 w-full bg-purple-500" />
            </div>

            <div className="relative z-10 text-center flex flex-col items-center justify-center w-full max-w-5xl">
              {/* Stacked background ATTENTION for high-end agency feel */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none opacity-[0.06] gap-4">
                <span className="font-display font-black text-5xl sm:text-8xl lg:text-9xl uppercase tracking-widest text-slate-400">ATTENTION</span>
                <span className="font-display font-black text-5xl sm:text-8xl lg:text-9xl uppercase tracking-widest text-slate-400">ATTENTION</span>
                <div className="h-28 sm:h-36" />
                <span className="font-display font-black text-5xl sm:text-8xl lg:text-9xl uppercase tracking-widest text-slate-400">ATTENTION</span>
                <span className="font-display font-black text-5xl sm:text-8xl lg:text-9xl uppercase tracking-widest text-slate-400">ATTENTION</span>
              </div>

              <motion.div
                animate={{ scale: [0.97, 1.03, 0.97] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                className="relative flex flex-col items-center my-8 z-10"
              >
                <motion.h1
                  initial={{ scale: 0.3, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 180, damping: 10 }}
                  className="font-sans font-black text-5xl xs:text-6xl sm:text-8xl md:text-9xl uppercase tracking-widest text-white leading-none relative select-none"
                >
                  ATTENTION
                  <motion.span 
                    animate={{ rotate: 360, scale: [1, 1.15, 1] }}
                    transition={{
                      rotate: { duration: 12, repeat: Infinity, ease: "linear" },
                      scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                    }}
                    className="absolute -inset-6 bg-gradient-to-tr from-red-600 via-yellow-500 via-green-500 via-blue-500 to-purple-600 mix-blend-screen filter blur-md pointer-events-none rounded-2xl opacity-50"
                  />
                </motion.h1>
              </motion.div>

              <FloatingBlinkingEyes />

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 0.9, y: 0 }}
                transition={{ delay: 0.8 }}
                className="font-mono text-purple-400 text-xs sm:text-sm tracking-widest uppercase mt-12 block z-10 bg-black/55 px-4 py-2 rounded-full border border-white/[0.08] backdrop-blur-md"
              >
                And attention lies in elite web products.
              </motion.p>
            </div>
          </motion.div>
        )}

        {/* ========================================================
            SCREEN 8: "ATTENTION Platforms"
            ======================================================== */}
        {screen === 8 && (
          <motion.div
            key="screen-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 bg-[#020306] flex flex-col items-center justify-center p-6 text-center"
          >
            <div className="relative z-10 w-full max-w-4xl flex flex-col items-center justify-center gap-4">
              <motion.h1
                animate={{ scale: [0.98, 1.02, 0.98] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="font-sans font-black text-5xl xs:text-6xl sm:text-8xl md:text-9xl uppercase tracking-widest text-white leading-none"
              >
                ATTENTION
              </motion.h1>

              {/* Glowing platform badges sync to beats */}
              <div className="flex gap-6 sm:gap-8 justify-center mt-12">
                {[
                  { name: "YouTube", color: "bg-red-600 shadow-red-600/20", delay: 0.1, icon: <Youtube className="w-7 h-7 text-white" /> },
                  { name: "Instagram", color: "bg-pink-600 shadow-pink-600/20", delay: 0.3, icon: <Instagram className="w-7 h-7 text-white" /> },
                  { name: "Facebook", color: "bg-blue-600 shadow-blue-600/20", delay: 0.5, icon: <Facebook className="w-7 h-7 text-white" /> },
                  { name: "TikTok", color: "bg-purple-600 shadow-purple-600/20", delay: 0.7, icon: <Sparkles className="w-7 h-7 text-white animate-pulse" /> }
                ].map((item, idx) => (
                  <motion.div
                    key={item.name}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: item.delay, type: "spring", stiffness: 200 }}
                    className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full ${item.color} flex items-center justify-center shadow-xl relative group cursor-pointer hover:scale-110 transition-transform`}
                  >
                    <div className="absolute inset-0.5 rounded-full bg-black/15 group-hover:bg-transparent transition-colors" />
                    <div className="relative z-10">
                      {item.icon}
                    </div>
                  </motion.div>
                ))}
              </div>

              <span className="font-mono text-slate-500 text-xs sm:text-sm tracking-widest uppercase mt-10 block">
                [ MEDIA_INTEGRATION: READY ]
              </span>
            </div>
          </motion.div>
        )}

        {/* ========================================================
            SCREEN 9: "A Great Product Mockup"
            ======================================================== */}
        {screen === 9 && (
          <motion.div
            key="screen-9"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 bg-[#050609] flex flex-col items-center justify-center p-6 text-center"
          >
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a10_1px,transparent_1px),linear-gradient(to_bottom,#0f172a10_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-30" />
            <div className="relative z-10 w-full max-w-4xl flex flex-col items-center justify-center gap-4">
              <span className="font-mono text-purple-400 text-xs tracking-widest uppercase font-bold">[ BROWSER_STAGE ]</span>
              <VideoBrowserMockup />
            </div>
          </motion.div>
        )}

        {/* ========================================================
            SCREEN 10: "STOP, FEEL, REMEMBER Flashes"
            ======================================================== */}
        {screen === 10 && (
          <motion.div
            key="screen-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 bg-[#010204] flex flex-col items-center justify-center p-6 text-center"
          >
            <div className="relative z-10 w-full max-w-4xl flex flex-col items-center justify-center">
              <PerformanceFeaturesFlash />
            </div>
          </motion.div>
        )}

        {/* ========================================================
            SCREEN 11: "Blinking Eye & Proposal"
            ======================================================== */}
        {screen === 11 && (
          <motion.div
            key="screen-11"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 bg-black flex flex-col items-center justify-center p-6 relative overflow-hidden text-center"
          >
            <BlinkingVectorEye />

            <div className="relative z-10 flex flex-col items-center justify-center max-w-3xl">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 0.8, y: 0 }}
                transition={{ delay: 1.2 }}
                className="text-xs sm:text-sm font-mono text-slate-400 tracking-widest uppercase mb-6"
              >
                Turn your vision into something that hits
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2.0, duration: 0.6 }}
                className="font-sans font-black text-5xl sm:text-7xl md:text-8xl tracking-tight text-white uppercase leading-none"
              >
                Let's work together.
              </motion.h1>

              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 2.6, duration: 1.2 }}
                className="h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 mt-8 rounded-full w-48 sm:w-64"
              />
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}

// =========================================================================
// STAGE HELPER MODULES
// =========================================================================

function StageC_WordCloudLayout() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const scale = isMobile ? 0.6 : 1.0;

  const tags = [
    { text: "Next.js", x: -150 * scale, y: -70 * scale, size: "text-xs", color: "text-cyan-400" },
    { text: "TypeScript", x: 130 * scale, y: -80 * scale, size: "text-sm font-bold", color: "text-blue-400" },
    { text: "GraphQL", x: -110 * scale, y: 90 * scale, size: "text-base font-black", color: "text-amber-500" },
    { text: "Redis Cache", x: 140 * scale, y: 60 * scale, size: "text-xs font-semibold", color: "text-red-400" },
    { text: "WebSockets", x: -40 * scale, y: -120 * scale, size: "text-sm", color: "text-emerald-400" },
    { text: "Framer Motion", x: 50 * scale, y: 110 * scale, size: "text-xs", color: "text-pink-400" },
    { text: "Tailwind CSS", x: -170 * scale, y: 10 * scale, size: "text-xs font-bold", color: "text-purple-400" },
    { text: "Docker", x: 170 * scale, y: -10 * scale, size: "text-sm", color: "text-sky-400" },
    { text: "Vite Bundler", x: 0, y: 130 * scale, size: "text-xs font-mono", color: "text-indigo-400" }
  ];

  return (
    <>
      {tags.map((tag, idx) => (
        <motion.span
          key={tag.text}
          initial={{ opacity: 0, scale: 0.5, x: 0, y: 0 }}
          animate={{ opacity: 1, scale: 1, x: tag.x, y: tag.y }}
          transition={{ delay: idx * 0.05, duration: 0.4, type: "spring", stiffness: 100 }}
          className={`absolute px-4 py-2 bg-white/[0.03] border border-white/[0.08] backdrop-blur-md rounded-2xl font-mono uppercase tracking-wider shadow-lg ${tag.size} ${tag.color}`}
        >
          {tag.text}
        </motion.span>
      ))}
    </>
  );
}

function FolderFlipper() {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % 4);
    }, 850); // perfect slide cadence matching video edits
    return () => clearInterval(interval);
  }, []);

  const folders = [
    { title: "Curio Connect", sub: "Web System", color: "from-purple-500 to-indigo-600" },
    { title: "Gadgets Glam", sub: "E-Commerce", color: "from-pink-500 to-rose-600" },
    { title: "Dynamic Core", sub: "Systems Eng", color: "from-blue-500 to-cyan-600" },
    { title: "Ingress Portal", sub: "Cloud Security", color: "from-amber-500 to-orange-600" }
  ];

  return (
    <div className="flex flex-wrap gap-6 sm:gap-8 justify-center w-full max-w-4xl mt-10 px-4 select-none">
      {folders.map((f, idx) => {
        const isActive = activeIdx === idx;
        return (
          <motion.div
            key={f.title}
            animate={{
              scale: isActive ? 1.2 : 0.95,
              borderColor: isActive ? "rgba(168, 85, 247, 0.9)" : "rgba(255, 255, 255, 0.08)",
              backgroundColor: isActive ? "rgba(168, 85, 247, 0.12)" : "rgba(255, 255, 255, 0.02)",
              y: isActive ? -12 : 0,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 18 }}
            className={`w-32 h-32 sm:w-40 sm:h-40 border rounded-3xl flex flex-col items-center justify-center p-4 relative shadow-2xl backdrop-blur-md transition-shadow duration-300 ${
              isActive ? "shadow-[0_20px_50px_rgba(168,85,247,0.3)]" : "shadow-none"
            }`}
          >
            {/* Real Top folder tab folder design */}
            <div className={`w-12 sm:w-16 h-4 absolute -top-3.5 left-5 rounded-t-xl border-t border-x transition-colors duration-300 ${
              isActive ? "bg-[#040508] border-purple-500" : "bg-white/[0.02] border-white/[0.08]"
            }`} />

            {/* Glowing folder core */}
            <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-tr ${f.color} p-0.5 flex items-center justify-center mb-2.5 shadow-lg`}>
              <div className="w-full h-full bg-[#080b12]/90 rounded-[14px] flex items-center justify-center">
                <Folder className="w-6 h-6 sm:w-8 sm:h-8 text-white fill-white/10" />
              </div>
            </div>

            <span className="text-[11px] sm:text-xs font-sans text-white font-black uppercase tracking-tight block text-center">
              {f.title}
            </span>
            <span className="text-[8px] sm:text-[9px] font-mono text-purple-400 uppercase tracking-widest block text-center mt-0.5">
              {f.sub}
            </span>

            {isActive && (
              <span className="absolute -bottom-2 px-2.5 py-0.5 bg-purple-600 text-[8px] sm:text-[9px] font-mono font-bold uppercase rounded text-white tracking-widest shadow-lg">
                LOADED
              </span>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}

function SpinningEarthGlobe() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20 z-0">
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="w-[450px] h-[450px] border border-dashed border-purple-500/10 rounded-full flex items-center justify-center"
      >
        <div className="w-[380px] h-[380px] border border-purple-500/5 rounded-full flex items-center justify-center relative">
          <Globe className="w-24 h-24 text-purple-400 opacity-40 animate-pulse" />
        </div>
      </motion.div>
    </div>
  );
}

function FloatingBlinkingEyes() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const scale = isMobile ? 0.6 : 1.0;

  const eyeCoords = [
    { x: -180 * scale, y: -120 * scale, rotate: -6 },
    { x: 200 * scale, y: -110 * scale, rotate: 9 },
    { x: -170 * scale, y: 100 * scale, rotate: 14 },
    { x: 180 * scale, y: 110 * scale, rotate: -11 },
    { x: -50 * scale, y: -160 * scale, rotate: 16 },
    { x: 60 * scale, y: 150 * scale, rotate: -16 }
  ];

  return (
    <div className="absolute inset-0 pointer-events-none">
      {eyeCoords.map((coord, idx) => (
        <motion.div
          key={idx}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: 1, 
            opacity: 1, 
            x: coord.x, 
            y: coord.y,
            rotate: coord.rotate + (idx % 2 === 0 ? 4 : -4)
          }}
          transition={{ 
            initial: { type: "spring", stiffness: 120 },
            rotate: { duration: 4, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }
          }}
          style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
          className="w-12 h-8 rounded-full bg-white flex items-center justify-center border border-black relative overflow-hidden shadow-[0_0_15px_rgba(255,255,255,0.4)]"
        >
          {/* Pupil */}
          <motion.div
            animate={{ x: [-4, 4, -4], y: [-2, 2, -2] }}
            transition={{ duration: 4 + idx, repeat: Infinity, ease: "easeInOut" }}
            className="w-5 h-5 rounded-full bg-slate-900 flex items-center justify-center relative"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-white absolute top-1 left-1" />
          </motion.div>

          {/* Eyelids Blink effect */}
          <motion.div 
            animate={{ height: ["0%", "100%", "0%"] }}
            transition={{ duration: 0.15, repeat: Infinity, repeatDelay: 1.2 + idx * 0.7 }}
            className="absolute inset-x-0 top-0 bg-[#0d0d12] h-0"
          />
        </motion.div>
      ))}
    </div>
  );
}

function VideoBrowserMockup() {
  return (
    <motion.div
      initial={{ y: 25, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-xl aspect-video bg-slate-950 border border-slate-900 rounded-3xl shadow-2xl relative overflow-hidden flex flex-col"
    >
      {/* Top mock address bar */}
      <div className="bg-[#080b12] border-b border-slate-900 px-5 py-3 flex items-center justify-between text-[11px] font-mono text-slate-500">
        <span>https://priviledge-mukunga.sh</span>
        <div className="w-3 h-3 rounded-full bg-emerald-500" />
      </div>

      {/* Main mockup canvas body */}
      <div className="flex-1 bg-gradient-to-br from-[#0c0817] to-black flex flex-col items-center justify-center p-8 text-center relative">
        <div className="absolute top-4 left-4 font-mono text-[8px] text-slate-600">RENDER_STAGE: ACTIVE</div>

        <motion.div 
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-16 h-16 rounded-full bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-white cursor-pointer shadow-lg hover:bg-purple-600/30 mb-4"
        >
          <Play className="w-6 h-6 fill-white text-white ml-0.5 animate-pulse" />
        </motion.div>

        <span className="font-sans font-black text-3xl sm:text-4xl uppercase tracking-tighter text-white mt-2 block">
          A great product
        </span>
        <span className="font-mono text-xs text-purple-400 uppercase tracking-widest block mt-2">
          doesn't just look good.
        </span>
      </div>
    </motion.div>
  );
}

function PerformanceFeaturesFlash() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    // Beautiful, fully spaced sequence corresponding to Screen 10 duration for ultimate storytelling clarity
    const t1 = setTimeout(() => setStep(1), 1500); 
    const t2 = setTimeout(() => setStep(2), 3000); 
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <div className="h-32 flex flex-col items-center justify-center text-center">
      <AnimatePresence mode="wait">
        
        {step === 0 && (
          <motion.div
            key="step-stop"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1.15 }}
            exit={{ opacity: 0, scale: 1.3 }}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <div className="w-12 h-12 rounded-full bg-red-500/10 border-2 border-red-500/30 flex items-center justify-center text-xl">⛔</div>
            <span className="font-sans font-black text-2xl sm:text-4xl uppercase tracking-tight text-white leading-none">
              It makes visitors STOP
            </span>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div
            key="step-feel"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1.15 }}
            exit={{ opacity: 0, scale: 1.3 }}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <Heart className="w-10 h-10 text-purple-500 animate-bounce fill-purple-500/20" />
            <span className="font-sans font-black text-2xl sm:text-4xl uppercase tracking-tight text-white leading-none">
              FEEL the speed
            </span>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step-remember"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1.15 }}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <Brain className="w-10 h-10 text-indigo-400 animate-pulse" />
            <span className="font-sans font-black text-2xl sm:text-4xl uppercase tracking-tight text-white leading-none">
              and REMEMBER your brand.
            </span>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}

function BlinkingVectorEye() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20 z-0">
      <svg className="w-[450px] h-[220px] text-purple-500/30 animate-pulse" viewBox="0 0 320 160">
        <path 
          d="M 20,80 Q 160,10 300,80 Q 160,150 20,80 Z" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeDasharray="5 5" 
        />
        <circle cx="160" cy="80" r="35" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="160" cy="80" r="15" fill="currentColor" />
      </svg>

      <motion.div 
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-52 h-52 border border-purple-500/10 rounded-full"
      />
    </div>
  );
}
