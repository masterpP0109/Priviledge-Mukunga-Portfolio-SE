import React from "react";
import { motion } from "motion/react";
import { Search, Compass, Cpu, Settings } from "lucide-react";

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
      title: "DISCOVER",
      text: "Understanding project goals, audience requirements, technical constraints and key outcomes.",
      icon: <Search className="w-5 h-5 text-[#E46F43]" />
    },
    {
      number: "02",
      title: "DESIGN",
      text: "Mapping user flows, wireframing layouts and creating interface prototypes in Figma or Adobe XD.",
      icon: <Compass className="w-5 h-5 text-[#E46F43]" />
    },
    {
      number: "03",
      title: "BUILD",
      text: "Writing clean front-end code, implementing application logic and structuring MySQL/Postgres databases.",
      icon: <Cpu className="w-5 h-5 text-[#E46F43]" />
    },
    {
      number: "04",
      title: "REFINE",
      text: "Testing across devices, optimizing performance, deploying and making continuous improvements.",
      icon: <Settings className="w-5 h-5 text-[#E46F43]" />
    }
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12
      }
    }
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 40,
      scale: 0.96,
      filter: "blur(2px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.7,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="process" className="relative bg-[#0C0D0D] text-white py-24 px-6 sm:px-12 overflow-hidden border-b border-white/[0.06]">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Section Header */}
        <div className="text-left mb-16 flex flex-col items-start max-w-2xl">
          <span className="font-mono text-[#C7FF3D] text-xs tracking-widest uppercase block mb-3 font-semibold">
            DEVELOPMENT PROCESS
          </span>
          <h2 className="font-serif italic font-normal text-3xl sm:text-5xl lg:text-6xl text-[#F2EEE6] tracking-tight leading-none mb-4">
            A clear process creates <span className="font-sans font-black not-italic uppercase text-white">better products.</span>
          </h2>
          <p className="text-[#B7B4AD] font-sans text-base leading-relaxed">
            Every project follows a transparent sequence from initial requirements to tested production.
          </p>
        </div>

        {/* 4 Process Cards container */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch relative"
        >
          {steps.map((step, idx) => (
            <motion.div
              key={step.number}
              variants={cardVariants}
              className="bg-white/[0.02] border border-white/10 hover:border-[#E46F43]/40 p-7 rounded-2xl flex flex-col justify-between text-left relative group transition-all duration-300 shadow-xl h-full"
            >
              <div>
                <div className="flex justify-between items-center mb-6">
                  <span className="font-mono text-xs text-[#E46F43] tracking-widest font-bold">
                    PHASE {step.number}
                  </span>
                  <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 group-hover:border-[#E46F43]/30 transition-colors">
                    {step.icon}
                  </div>
                </div>

                <h3 className="font-sans font-black text-2xl text-[#F2EEE6] tracking-tight mb-3">
                  {step.title}
                </h3>
                <p className="text-[#B7B4AD] text-sm leading-relaxed font-sans">
                  {step.text}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-white/[0.05] flex items-center justify-between font-mono text-[10px] text-zinc-500">
                <span>STAGE 0{idx + 1}</span>
                <span className="text-[#C7FF3D]">DELIVERED</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
