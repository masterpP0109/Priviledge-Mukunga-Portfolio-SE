import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Terminal, Code, Play, Cpu, Database, Sparkles, ChevronRight, CheckCircle2, MousePointer, 
  Settings, Folder, FileCode, Check, RefreshCw, Eye, Heart, Brain, Zap, Globe, FolderHeart, Server
} from "lucide-react";
import { logEvent } from "./AnalyticsTracker";

interface KineticIntroProps {
  name: string;
  onComplete: () => void;
}

export default function KineticIntro({ name, onComplete }: KineticIntroProps) {
  // Screens sequence
  // 0: "My name is Priviledge" (White/Gray screen)
  // 1: "I'm a Full-Stack Engineer / Systems Architect / Cloud Developer" (Black screen, layered timeline cards, glowing arcs, scattered tag cloud)
  // 2: "My Journey... Every project built with QUALITY in mind" (Metallic button, folders flip, glowing QUALITY zoom)
  // 3: "Creator vs Business Owner: The leverage is ATTENTION" (Spinning Earth, silver 3D metal stacks, Rainbow flashing ATTENTION with floating eyes)
  // 4: "A great product makes people stop, feel the speed, and remember your brand" (Browser mockup, heart/brain sparks, "That's the game")
  // 5: "Blinking Eye - Turn vision into something that actually hits" (Giant interactive eye, wiping to home)
  const [screen, setScreen] = useState(0);
  const [typedNameText, setTypedNameText] = useState("");
  const [typedProjectText, setTypedProjectText] = useState("");
  const [isDone, setIsDone] = useState(false);
  
  const timerRefs = useRef<NodeJS.Timeout[]>([]);

  // Step timings mimicking the high-speed rhythm of the reference video
  useEffect(() => {
    // Screen 0: My name is... (0.0s to 3.2s)
    const t0 = setTimeout(() => {
      setScreen(1);
    }, 3200);

    // Screen 1: I'm a Developer... timeline & arcs (3.2s to 8.2s)
    const t1 = setTimeout(() => {
      setScreen(2);
    }, 8200);

    // Screen 2: Folders flip & QUALITY (8.2s to 13.8s)
    const t2 = setTimeout(() => {
      setScreen(3);
    }, 13800);

    // Screen 3: Earth, Creator/Business, ATTENTION & eyes (13.8s to 21.0s)
    const t3 = setTimeout(() => {
      setScreen(4);
    }, 21000);

    // Screen 4: Browser mockup, stop/feel/remember, game (21.0s to 27.5s)
    const t4 = setTimeout(() => {
      setScreen(5);
    }, 27500);

    // Screen 5: The blinking Eye & Let's Work (27.5s to 32.5s)
    const t5 = setTimeout(() => {
      setIsDone(true);
      onComplete();
    }, 32500);

    timerRefs.current = [t0, t1, t2, t3, t4, t5];

    return () => {
      timerRefs.current.forEach(clearTimeout);
    };
  }, [onComplete]);

  // Screen 0 typing animation
  useEffect(() => {
    if (screen !== 0) return;
    const fullText = "My name ";
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

  // Screen 2 typing animation
  useEffect(() => {
    if (screen !== 2) return;
    const fullText = "was built with one thing in mind...";
    let idx = 0;
    const interval = setInterval(() => {
      if (idx < fullText.length) {
        setTypedProjectText(fullText.slice(0, idx + 1));
        idx++;
      } else {
        clearInterval(interval);
      }
    }, 50);
    return () => clearInterval(interval);
  }, [screen]);

  const handleSkip = () => {
    logEvent("click_project", { action: "skip_kinetic_intro" });
    onComplete();
  };

  return (
    <div className="relative w-full h-screen overflow-hidden select-none bg-[#03050a] text-white font-sans">
      
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
            SCREEN 0: "My name is Priviledge" (Off-white TikTok starting look)
            ======================================================== */}
        {screen === 0 && (
          <motion.div
            key="screen-0"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 bg-[#f3f4f6] text-[#111] flex flex-col items-center justify-center font-sans"
          >
            <div className="text-center flex flex-col items-center gap-2">
              {/* Typewriter "My name" */}
              <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-slate-700 font-mono h-10 flex items-center">
                <span>{typedNameText}</span>
                <span className="w-2 h-6 bg-slate-800 animate-[pulse_0.6s_infinite] ml-1" />
              </h2>

              {/* Delayed giant "is Priviledge" trigger */}
              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.5, ease: "easeOut" }}
                className="text-5xl sm:text-7xl font-black tracking-tighter uppercase text-black leading-none"
              >
                is <span className="text-purple-600 font-serif italic">Priviledge</span>
              </motion.h1>
            </div>
          </motion.div>
        )}

        {/* ========================================================
            SCREEN 1: "I'm a Developer..." (Sub-stages mimicking timeline tracks & arc neon curves)
            ======================================================== */}
        {screen === 1 && (
          <motion.div
            key="screen-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 bg-[#020408] flex flex-col items-center justify-center p-6 relative"
          >
            {/* Soft dark stars background particles */}
            <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-40" />

            <div className="relative z-10 w-full max-w-4xl flex flex-col items-center justify-center text-center">
              
              {/* Core I'm tag */}
              <motion.span 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="text-base font-mono tracking-widest text-purple-400 uppercase font-bold mb-6 block"
              >
                [ WHO_I_AM ]
              </motion.span>

              {/* STAGE A (3.2s to 4.8s): FULL-STACK ENGINEER (Color timeline blocks) */}
              <StageA_Timeline />

              {/* STAGE B (4.8s to 6.4s): SYSTEMS ARCHITECT (Neon circle arcs) */}
              <StageB_NeonArcs />

              {/* STAGE C (6.4s to 8.2s): AND SO MUCH MORE (Word cloud floaters) */}
              <StageC_WordCloud />

            </div>
          </motion.div>
        )}

        {/* ========================================================
            SCREEN 2: "My Journey... QUALITY that moves users"
            ======================================================== */}
        {screen === 2 && (
          <motion.div
            key="screen-2"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 bg-[#040508] flex flex-col items-center justify-center p-6 relative"
          >
            <div className="absolute inset-0 bg-[radial-gradient(#1e1b4b15_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-30" />

            <div className="relative z-10 w-full max-w-2xl flex flex-col items-center text-center">
              
              {/* Futuristic Glassmorphic pill button for "journey..." */}
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 150, delay: 0.1 }}
                className="px-6 py-2.5 bg-gradient-to-r from-slate-900 to-slate-950 border border-slate-800/80 rounded-2xl shadow-2xl backdrop-blur-md text-xs font-mono font-bold uppercase tracking-widest text-slate-300 flex items-center gap-2 mb-10"
              >
                <span className="w-2 h-2 rounded-full bg-purple-500 animate-ping" />
                <span>My journey...</span>
              </motion.div>

              {/* Desktop Folder icons flip animation */}
              <FolderFlipper />

              {/* Types out: "every single project was built with one thing in mind" */}
              <div className="h-8 font-mono text-xs text-slate-400 tracking-wider uppercase mt-8 text-center max-w-md">
                {typedProjectText}
                <span className="w-1.5 h-3.5 bg-slate-500 inline-block align-middle ml-0.5 animate-pulse" />
              </div>

              {/* MASSIVE FLASHING HOT "QUALITY" REVEAL (11.5s to 13.8s) */}
              <QualityHotReveal />

            </div>
          </motion.div>
        )}

        {/* ========================================================
            SCREEN 3: "CREATOR vs BUSINESS: ATTENTION & EYES"
            ======================================================== */}
        {screen === 3 && (
          <motion.div
            key="screen-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 bg-[#020306] flex flex-col items-center justify-center p-6 relative overflow-hidden"
          >
            {/* Spinning Earth Globe (mimicking video planet) */}
            <SpinningEarthGlobe />

            <div className="relative z-10 w-full max-w-4xl flex flex-col items-center justify-center text-center">
              
              {/* Creator vs Business Metal blocks */}
              <CreatorBusinessStacks />

              {/* Giant ATTENTION with blinking eyes and Rainbow Stripes */}
              <AttentionRainbowEyes />

            </div>
          </motion.div>
        )}

        {/* ========================================================
            SCREEN 4: "A Great Product doesn't just look good..."
            ======================================================== */}
        {screen === 4 && (
          <motion.div
            key="screen-4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 bg-[#050609] flex flex-col items-center justify-center p-6 relative"
          >
            {/* Background cyber grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a10_1px,transparent_1px),linear-gradient(to_bottom,#0f172a10_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-30" />

            <div className="relative z-10 w-full max-w-3xl flex flex-col items-center text-center">
              
              {/* Video Player mock template */}
              <VideoBrowserMockup />

              {/* Interactive stops, hearts and brain flashes */}
              <PerformanceFeaturesFlash />

            </div>
          </motion.div>
        )}

        {/* ========================================================
            SCREEN 5: "The Blinking Eye & Let's Work"
            ======================================================== */}
        {screen === 5 && (
          <motion.div
            key="screen-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 bg-black flex flex-col items-center justify-center p-6 relative overflow-hidden"
          >
            {/* Giant Central Blinking Eye Graphic */}
            <BlinkingVectorEye />

            <div className="relative z-10 text-center flex flex-col items-center justify-center max-w-xl">
              
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 0.8, y: 0 }}
                transition={{ delay: 1.5 }}
                className="text-xs font-mono text-slate-400 tracking-widest uppercase mb-4"
              >
                Turn your vision into something that hits
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2.3, duration: 0.6 }}
                className="font-display font-black text-4xl sm:text-6xl tracking-tight text-white uppercase leading-none"
              >
                Let's work together.
              </motion.h1>

              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 2.8, duration: 1 }}
                className="h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 mt-6 rounded-full max-w-xs mx-auto"
              />
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}

// =========================================================================
// SCREEN 1 HELPER MODULES
// =========================================================================

function StageA_Timeline() {
  const [active, setActive] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setActive(true), 200); // 3.4s
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {active && (
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col items-center gap-4 py-6"
        >
          <h2 className="text-4xl sm:text-6xl font-black tracking-tighter uppercase text-white font-serif italic">
            I'm a
          </h2>
          <h3 className="text-5xl sm:text-7xl font-display font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 uppercase leading-none">
            Full-Stack Engineer
          </h3>

          {/* Visual colored timeline bars like the Premiere editing cuts */}
          <div className="flex gap-2 w-72 sm:w-96 justify-center mt-4">
            <motion.div initial={{ width: 0 }} animate={{ width: "35%" }} transition={{ delay: 0.3 }} className="h-6 rounded-md bg-purple-500/80 border border-purple-400/30 flex items-center justify-center text-[8px] font-mono font-bold text-white uppercase">React</motion.div>
            <motion.div initial={{ width: 0 }} animate={{ width: "45%" }} transition={{ delay: 0.4 }} className="h-6 rounded-md bg-pink-500/80 border border-pink-400/30 flex items-center justify-center text-[8px] font-mono font-bold text-white uppercase">Express</motion.div>
            <motion.div initial={{ width: 0 }} animate={{ width: "20%" }} transition={{ delay: 0.5 }} className="h-6 rounded-md bg-blue-500/80 border border-blue-400/30 flex items-center justify-center text-[8px] font-mono font-bold text-white uppercase">SQL</motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function StageB_NeonArcs() {
  const [active, setActive] = useState(false);
  useEffect(() => {
    // Active from 4.8s to 6.4s of the intro timeline
    const tShow = setTimeout(() => setActive(true), 1600); // 4.8s
    const tHide = setTimeout(() => setActive(false), 3200); // 6.4s
    return () => {
      clearTimeout(tShow);
      clearTimeout(tHide);
    };
  }, []);

  return (
    <AnimatePresence>
      {active && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-[#020408] flex flex-col items-center justify-center p-6"
        >
          <span className="font-mono text-slate-500 text-[10px] tracking-widest block uppercase mb-3">02 / CORE CAPABILITY</span>
          <h2 className="text-4xl sm:text-6xl font-display font-black tracking-tighter uppercase text-white leading-none">
            Systems Architect
          </h2>

          {/* Interactive neon circles arcs that spin around and draw in */}
          <div className="relative w-48 h-48 mt-8 flex items-center justify-center">
            {/* Arc 1 */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 border-t-2 border-r-2 border-indigo-500 rounded-full opacity-60"
            />
            {/* Arc 2 */}
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute inset-3 border-b-2 border-l-2 border-purple-500 rounded-full opacity-60"
            />
            {/* Arc 3 */}
            <motion.div 
              animate={{ rotate: 180 }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              className="absolute inset-6 border-t-2 border-pink-500 rounded-full opacity-60"
            />
            <Cpu className="w-10 h-10 text-white animate-pulse" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function StageC_WordCloud() {
  const [active, setActive] = useState(false);
  useEffect(() => {
    // Active from 6.4s to 8.2s of the intro timeline
    const tShow = setTimeout(() => setActive(true), 3200); // 6.4s
    return () => clearTimeout(tShow);
  }, []);

  const tags = [
    { text: "React 19", x: -140, y: -70, size: "text-xs", color: "text-cyan-400" },
    { text: "TypeScript", x: 120, y: -80, size: "text-sm font-bold", color: "text-blue-400" },
    { text: "PostgreSQL", x: -100, y: 90, size: "text-base font-black", color: "text-amber-500" },
    { text: "Redis Cache", x: 130, y: 60, size: "text-xs font-semibold", color: "text-red-400" },
    { text: "Express API", x: -40, y: -120, size: "text-sm", color: "text-emerald-400" },
    { text: "Framer Motion", x: 50, y: 110, size: "text-xs", color: "text-pink-400" },
    { text: "Tailwind CSS", x: -160, y: 10, size: "text-xs font-bold", color: "text-purple-400" },
    { text: "Docker", x: 160, y: -10, size: "text-sm", color: "text-sky-400" },
    { text: "Vite Bundler", x: 0, y: 130, size: "text-xs font-mono", color: "text-indigo-400" }
  ];

  return (
    <AnimatePresence>
      {active && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-[#020408] flex flex-col items-center justify-center p-6"
        >
          <span className="font-mono text-slate-500 text-[10px] tracking-widest block uppercase mb-4">03 / SPECIALTIES</span>
          <h2 className="text-4xl sm:text-6xl font-serif italic font-black tracking-tight text-white uppercase leading-none z-10">
            and so much more.
          </h2>

          {/* Floating tags absolute positioned word cloud */}
          <div className="relative w-full max-w-xl h-80 mt-6 flex items-center justify-center overflow-hidden">
            {tags.map((tag, idx) => (
              <motion.span
                key={tag.text}
                initial={{ opacity: 0, scale: 0.5, x: 0, y: 0 }}
                animate={{ opacity: 1, scale: 1, x: tag.x, y: tag.y }}
                transition={{ delay: idx * 0.05, duration: 0.4, type: "spring", stiffness: 100 }}
                className={`absolute px-3 py-1.5 bg-white/[0.03] border border-white/[0.08] backdrop-blur-md rounded-xl font-mono uppercase tracking-wider shadow-lg ${tag.size} ${tag.color}`}
              >
                {tag.text}
              </motion.span>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// =========================================================================
// SCREEN 2 HELPER MODULES
// =========================================================================

function FolderFlipper() {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % 4);
    }, 400); // rapidly flips every 400ms
    return () => clearInterval(interval);
  }, []);

  const folders = ["Zimbabwe Curio Connect", "Gadgets & Glam", "Dynamic Metrics Core", "Ingress Gateway"];

  return (
    <div className="flex gap-4 sm:gap-6 justify-center w-full max-w-lg mt-4">
      {folders.map((folder, idx) => {
        const isActive = activeIdx === idx;
        return (
          <motion.div
            key={folder}
            animate={{
              scale: isActive ? 1.08 : 0.95,
              borderColor: isActive ? "rgba(168, 85, 247, 0.8)" : "rgba(255, 255, 255, 0.08)",
              backgroundColor: isActive ? "rgba(255, 255, 255, 0.08)" : "rgba(255, 255, 255, 0.02)"
            }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className="flex-1 p-4 border rounded-2xl flex flex-col items-center justify-center gap-2 aspect-square relative group backdrop-blur-md shadow-2xl"
          >
            <Folder className={`w-8 h-8 transition-colors duration-300 ${isActive ? "text-purple-400 fill-purple-400/20" : "text-white/20"}`} />
            <span className={`text-[8px] font-mono text-center uppercase tracking-wider block font-bold transition-colors duration-300 ${isActive ? "text-white" : "text-white/30"}`}>
              {folder.slice(0, 10)}...
            </span>
            {isActive && (
              <span className="absolute -bottom-1.5 px-1.5 py-0.5 bg-purple-600 text-[6px] font-mono font-bold uppercase rounded text-white tracking-widest shadow-lg">
                FLIP_LOG
              </span>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}

function QualityHotReveal() {
  const [active, setActive] = useState(false);
  useEffect(() => {
    // Quality text triggers around 11.2s to 13.8s
    const t = setTimeout(() => setActive(true), 2800); // 11s
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-[#020408] flex flex-col items-center justify-center p-6 z-20"
        >
          {/* Glowing back frame */}
          <motion.div 
            animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="absolute w-80 h-32 bg-purple-600/10 filter blur-2xl rounded-full"
          />

          <motion.h1
            initial={{ scale: 0.3, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
            className="font-display font-black text-6xl sm:text-8xl md:text-9xl uppercase tracking-tighter text-white text-center leading-none select-none relative"
          >
            QUALITY
            <span className="absolute -inset-1 border border-white/10 filter blur-xs rounded-lg pointer-events-none" />
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 0.8, y: 0 }}
            transition={{ delay: 0.5 }}
            className="font-mono text-slate-400 text-xs tracking-widest uppercase mt-6 text-center"
          >
            that actually moves people.
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// =========================================================================
// SCREEN 3 HELPER MODULES
// =========================================================================

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

function CreatorBusinessStacks() {
  const [active, setActive] = useState(false);
  useEffect(() => {
    // Shows Creator/Business silver block tags
    const tShow = setTimeout(() => setActive(true), 200); // 14.0s
    const tHide = setTimeout(() => setActive(false), 3500); // 17.3s
    return () => {
      clearTimeout(tShow);
      clearTimeout(tHide);
    };
  }, []);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="flex flex-col items-center gap-3 py-6"
        >
          <span className="font-mono text-slate-500 text-xs tracking-widest uppercase mb-1">In today's world...</span>
          <h3 className="font-mono text-sm tracking-widest text-slate-400 uppercase">whether you're a</h3>
          
          {/* Metallic 3D stack boxes */}
          <div className="flex flex-col gap-2.5 my-4">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="px-8 py-3.5 bg-gradient-to-b from-slate-200 to-slate-400 text-black font-display font-black text-2xl sm:text-4xl uppercase rounded-xl tracking-tight leading-none shadow-2xl border border-white"
            >
              CREATOR
            </motion.div>
            <span className="font-serif italic font-bold text-slate-400 text-base">or a</span>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="px-8 py-3.5 bg-gradient-to-b from-slate-200 to-slate-400 text-black font-display font-black text-2xl sm:text-4xl uppercase rounded-xl tracking-tight leading-none shadow-2xl border border-white"
            >
              BUSINESS OWNER
            </motion.div>
          </div>

          <p className="font-mono text-slate-500 text-[10px] tracking-wider uppercase mt-2">The easiest leverage you have is...</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function AttentionRainbowEyes() {
  const [active, setActive] = useState(false);
  useEffect(() => {
    // Trigger rainbow ATTENTION with flashing blinking eyes
    const t = setTimeout(() => setActive(true), 3500); // 17.3s
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black flex flex-col items-center justify-center p-6 z-20 overflow-hidden"
        >
          {/* Rainbow neon background strips */}
          <div className="absolute inset-0 flex flex-col justify-between opacity-15 pointer-events-none">
            <div className="h-6 w-full bg-red-500" />
            <div className="h-6 w-full bg-orange-500" />
            <div className="h-6 w-full bg-yellow-500" />
            <div className="h-6 w-full bg-green-500" />
            <div className="h-6 w-full bg-blue-500" />
            <div className="h-6 w-full bg-purple-500" />
          </div>

          <div className="relative z-10 text-center flex flex-col items-center">
            
            <motion.h1
              initial={{ scale: 0.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 220, damping: 12 }}
              className="font-display font-black text-6xl sm:text-8xl md:text-9xl uppercase tracking-widest text-white leading-none relative select-none"
            >
              ATTENTION
              <span className="absolute -inset-2 bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500 mix-blend-overlay filter blur-sm pointer-events-none" />
            </motion.h1>

            {/* Scattered blinking eyes floating around the headline */}
            <FloatingBlinkingEyes />

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 0.8, y: 0 }}
              transition={{ delay: 0.8 }}
              className="font-mono text-purple-400 text-xs tracking-widest uppercase mt-8 block"
            >
              And attention lies in elite web products.
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function FloatingBlinkingEyes() {
  const eyeCoords = [
    { x: -160, y: -90 },
    { x: 180, y: -80 },
    { x: -140, y: 70 },
    { x: 150, y: 80 },
    { x: -40, y: -130 },
    { x: 50, y: 120 }
  ];

  return (
    <div className="absolute inset-0 pointer-events-none">
      {eyeCoords.map((coord, idx) => (
        <motion.div
          key={idx}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1, x: coord.x, y: coord.y }}
          transition={{ delay: 0.3 + idx * 0.1, type: "spring", stiffness: 120 }}
          style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
          className="w-10 h-6 rounded-full bg-white flex items-center justify-center border border-black relative overflow-hidden"
        >
          {/* Pupil */}
          <motion.div
            animate={{ x: [-3, 3, -3], y: [-1, 1, -1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="w-4.5 h-4.5 rounded-full bg-slate-900 flex items-center justify-center relative"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-white absolute top-1 left-1" />
          </motion.div>

          {/* Eyelids Blink effect */}
          <motion.div 
            animate={{ height: ["0%", "100%", "0%"] }}
            transition={{ duration: 0.15, repeat: Infinity, repeatDelay: 1.5 + idx * 0.8 }}
            className="absolute inset-x-0 top-0 bg-[#0d0d12] h-0"
          />
        </motion.div>
      ))}
    </div>
  );
}

// =========================================================================
// SCREEN 4 HELPER MODULES
// =========================================================================

function VideoBrowserMockup() {
  return (
    <motion.div
      initial={{ y: 25, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.1, duration: 0.4 }}
      className="w-full max-w-lg aspect-video bg-slate-950 border border-slate-900 rounded-2xl shadow-2xl relative overflow-hidden flex flex-col"
    >
      {/* Top mock address bar */}
      <div className="bg-[#080b12] border-b border-slate-900 px-4 py-2.5 flex items-center justify-between text-[10px] font-mono text-slate-500">
        <span>https://priviledge-mukunga.sh</span>
        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
      </div>

      {/* Main mockup canvas body */}
      <div className="flex-1 bg-gradient-to-br from-[#0c0817] to-black flex flex-col items-center justify-center p-6 text-center relative">
        <div className="absolute top-4 left-4 font-mono text-[8px] text-slate-600">RENDER_STAGE: ACTIVE</div>

        <motion.div 
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-14 h-14 rounded-full bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-white cursor-pointer shadow-lg hover:bg-purple-600/30"
        >
          <Play className="w-5 h-5 fill-white text-white ml-0.5 animate-pulse" />
        </motion.div>

        <span className="font-display font-black text-2xl uppercase tracking-tighter text-white mt-4 block">
          A great product
        </span>
        <span className="font-mono text-[10px] text-purple-400 uppercase tracking-widest block mt-1">
          doesn't just look good.
        </span>
      </div>
    </motion.div>
  );
}

function PerformanceFeaturesFlash() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    // 0: stop, 1: feel, 2: remember, 3: that's the game
    const t1 = setTimeout(() => setStep(1), 1200); // feel
    const t2 = setTimeout(() => setStep(2), 2600); // remember
    const t3 = setTimeout(() => setStep(3), 4200); // that's the game
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <div className="h-20 flex flex-col items-center justify-center mt-8">
      <AnimatePresence mode="wait">
        
        {step === 0 && (
          <motion.div
            key="step-stop"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="flex items-center gap-3"
          >
            <div className="w-8 h-8 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-500 font-bold text-xs font-mono">⛔</div>
            <span className="font-display font-black text-xl uppercase tracking-tight text-white">
              It makes visitors STOP
            </span>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div
            key="step-feel"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="flex items-center gap-3"
          >
            <Heart className="w-5 h-5 text-purple-500 animate-bounce fill-purple-500/20" />
            <span className="font-display font-black text-xl uppercase tracking-tight text-white">
              FEEL the speed
            </span>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step-remember"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="flex items-center gap-3"
          >
            <Brain className="w-5 h-5 text-indigo-400 animate-pulse" />
            <span className="font-display font-black text-xl uppercase tracking-tight text-white">
              and REMEMBER your brand.
            </span>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step-game"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center text-center gap-1"
          >
            <span className="font-mono text-emerald-400 text-xs font-bold uppercase tracking-widest block">That's the game.</span>
            <span className="font-mono text-slate-500 text-[10px] uppercase tracking-wider block">
              And that's exactly what I'm here to help you play.
            </span>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}

// =========================================================================
// SCREEN 5 HELPER MODULES
// =========================================================================

function BlinkingVectorEye() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20 z-0">
      
      {/* Eye shape in SVG */}
      <svg className="w-80 h-40 text-purple-500/30" viewBox="0 0 320 160">
        {/* Outer path */}
        <path 
          d="M 20,80 Q 160,10 300,80 Q 160,150 20,80 Z" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeDasharray="5 5" 
        />

        {/* Inner pupil */}
        <circle cx="160" cy="80" r="35" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="160" cy="80" r="15" fill="currentColor" />
      </svg>

      {/* Additional animated rings */}
      <motion.div 
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-40 h-40 border border-purple-500/10 rounded-full"
      />
    </div>
  );
}
