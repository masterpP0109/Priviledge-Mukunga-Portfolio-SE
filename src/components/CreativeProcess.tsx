import React from "react";
import { motion } from "motion/react";
import { Search, Compass, Eye, Cpu, Settings, Footprints } from "lucide-react";

interface ProcessStep {
  number: string;
  title: string;
  text: string;
  icon: React.ReactNode;
}

export default function CreativeProcess() {
  const steps: ProcessStep[] = [
    {
      number: "01",
      title: "Discover",
      text: "Understand the brief, target audience, technical context, database metrics, and desired outcome.",
      icon: <Search className="w-5 h-5 text-purple-400" />
    },
    {
      number: "02",
      title: "Define",
      text: "Translate the challenge into a focused creative direction, architectural diagram, and relational schema blueprint.",
      icon: <Compass className="w-5 h-5 text-purple-400" />
    },
    {
      number: "03",
      title: "Explore",
      text: "Develop concepts, kinetic layout systems, interactive prototypes, and high-fidelity visual approaches.",
      icon: <Eye className="w-5 h-5 text-purple-400" />
    },
    {
      number: "04",
      title: "Build",
      text: "Design, animate, develop, and compile the final responsive experience into clean, high-performance CJS containers.",
      icon: <Cpu className="w-5 h-5 text-purple-400" />
    },
    {
      number: "05",
      title: "Refine",
      text: "Load test concurrent routes, speed-tune Redis caching arrays, and prepare the code for absolute production stability.",
      icon: <Settings className="w-5 h-5 text-purple-400" />
    }
  ];

  // Restrained perspective rise variants from prompt
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12 // between 0.1 and 0.14s
      }
    }
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 55, // between 45 and 65px
      scale: 0.95, // between 0.94 and 0.97
      rotateX: 6, // between 5 and 8 deg
      filter: "blur(2.5px)", // between 2 and 3px
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.8
      }
    }
  };

  return (
    <section className="relative bg-[#020408] text-white py-24 px-6 overflow-hidden border-b border-slate-900/40">
      {/* Visual background marks */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e1b4b08_1px,transparent_1px)] bg-[size:2rem_2rem] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="text-center mb-20 flex flex-col items-center">
          <span className="font-mono text-purple-400 text-xs tracking-widest uppercase block mb-3 font-semibold">
            METICULOUS JOURNEY
          </span>
          <h2 className="font-serif italic font-normal text-4xl sm:text-6xl text-white tracking-tight leading-none mb-4">
            The Creative <span className="font-sans font-black not-italic uppercase text-purple-300">Process.</span>
          </h2>
          <p className="text-slate-400 font-sans max-w-lg text-sm sm:text-base leading-relaxed">
            Every project follows a carefully structured progression from core discovery to robust server-side refinement.
          </p>
        </div>

        {/* 5 Process Cards container */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          style={{ perspective: "1000px" }}
          className="grid grid-cols-1 md:grid-cols-5 gap-6 items-stretch relative"
        >
          {steps.map((step, idx) => (
            <motion.div
              key={step.number}
              variants={cardVariants}
              className="bg-slate-950/80 border border-white/[0.04] hover:border-purple-500/30 p-6 rounded-2xl flex flex-col justify-between text-left relative group transition-all duration-300 shadow-[0_4px_32px_rgba(0,0,0,0.3)] h-full"
            >
              {/* Card top elements */}
              <div>
                <div className="flex justify-between items-center mb-6">
                  <span className="font-mono text-xs text-purple-400 font-bold block">
                    STAGE // {step.number}
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                    {step.icon}
                  </div>
                </div>

                <h3 className="font-display font-black text-lg text-white uppercase tracking-tight leading-none mb-3">
                  {step.title}
                </h3>

                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-sans mb-4">
                  {step.text}
                </p>
              </div>

              {/* Bottom decorative bar */}
              <div className="border-t border-slate-900/60 pt-4 mt-2">
                <span className="font-mono text-[9px] text-slate-500 uppercase tracking-widest block">
                  READY_NODE: OK
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
