import React from "react";
import { motion } from "motion/react";
import { ArrowUpRight, User } from "lucide-react";

export default function AboutMe() {
  const editorialSteps = ["DESIGN", "DEVELOP", "TEST", "DEPLOY", "IMPROVE"];

  const principles = [
    {
      id: "p-1",
      title: "Thoughtful Front-End",
      text: "Interfaces should be clear, accessible and responsive across every device without overwhelming the user."
    },
    {
      id: "p-2",
      title: "Reliable Back-End",
      text: "Application logic and database architectures built for speed, security and maintainable growth."
    },
    {
      id: "p-3",
      title: "Practical Delivery",
      text: "Building software that works smoothly in production and delivers genuine value to creators and businesses."
    }
  ];

  return (
    <section id="about" className="relative bg-[#0C0D0D] text-white py-24 px-6 sm:px-12 overflow-hidden border-b border-white/[0.06]">
      {/* Subtle background glow */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#E46F43]/10 rounded-full filter blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-purple-900/10 rounded-full filter blur-[160px] pointer-events-none" />
      
      {/* Fine grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        
        {/* Left Side: Editorial Image & Workspace Card */}
        <div className="lg:col-span-5 relative group">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[480px] sm:h-[560px] w-full rounded-3xl overflow-hidden bg-white/[0.02] border border-white/10 shadow-2xl flex flex-col justify-between p-8"
          >
            {/* Background Image overlay */}
            <img 
              src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80" 
              alt="Priviledge Workspace" 
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover grayscale opacity-30 group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0C0D0D] via-[#0C0D0D]/40 to-transparent z-10" />

            {/* Top Badge */}
            <div className="relative z-20 flex justify-between items-center">
              <span className="font-mono text-xs text-[#C7FF3D] uppercase tracking-widest bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                PRIVILEDGE MUKUNGA
              </span>
              <span className="font-mono text-[10px] text-[#B7B4AD] uppercase">
                ZIMBABWE
              </span>
            </div>

            {/* Editorial Stack tags vertically */}
            <div className="relative z-20 flex flex-wrap gap-2 my-auto">
              {editorialSteps.map((step, idx) => (
                <div 
                  key={step} 
                  className="px-3 py-1 bg-white/[0.05] border border-white/10 backdrop-blur-md rounded-lg font-mono text-[11px] text-[#F2EEE6] tracking-wider uppercase"
                >
                  0{idx + 1}. {step}
                </div>
              ))}
            </div>

            {/* Bottom Info Card */}
            <div className="relative z-20 bg-black/80 border border-white/10 p-5 rounded-2xl backdrop-blur-md">
              <span className="font-mono text-[10px] text-[#E46F43] block uppercase tracking-widest font-bold mb-1">
                ENGINEERING ETHOS
              </span>
              <p className="font-serif italic text-base text-[#F2EEE6] leading-snug">
                "Balancing clean visual aesthetics with high-performance code and database integrity."
              </p>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Editorial Narrative Content */}
        <div className="lg:col-span-7 text-left flex flex-col justify-center">
          
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/[0.04] border border-white/10 text-[#B7B4AD] font-mono text-xs rounded-full uppercase tracking-widest mb-6 w-fit"
          >
            <User className="w-3.5 h-3.5 text-[#E46F43]" />
            <span>ABOUT PRIVILEDGE</span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="font-serif italic font-normal text-3xl sm:text-5xl lg:text-6xl text-[#F2EEE6] tracking-tight leading-none mb-6"
          >
            I build digital experiences from <span className="font-sans font-black not-italic uppercase text-white">both sides</span> of the stack.
          </motion.h2>

          {/* Bio Narrative */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex flex-col gap-4 text-[#B7B4AD] font-sans text-base sm:text-lg leading-relaxed mb-8"
          >
            <p className="border-l-2 border-[#E46F43] pl-4 text-white font-medium">
              Hi, I’m Priviledge, a Zimbabwe-based developer who enjoys turning complex problems into clear and useful digital experiences. I work across front-end design, application logic and databases to create products that look polished, perform reliably and can grow with the people who use them.
            </p>
            <p>
              My work focuses on clean code structure, sensible user interfaces and thoughtful development practices. Whether I’m designing a new interface or organizing data behind the scenes, I aim for balance between aesthetics and performance.
            </p>
          </motion.div>

          {/* Principles Grid */}
          <div className="border-t border-white/[0.08] pt-8 mb-8">
            <span className="font-mono text-xs text-[#B7B4AD] uppercase block tracking-widest mb-6 font-semibold">
              CORE PHILOSOPHY:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {principles.map((princ, idx) => (
                <motion.div 
                  key={princ.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex flex-col gap-2 bg-white/[0.02] border border-white/[0.05] p-4 rounded-xl"
                >
                  <span className="font-mono text-xs text-[#E46F43] font-bold uppercase">
                    0{idx + 1}. {princ.title}
                  </span>
                  <p className="text-[#B7B4AD] text-xs leading-relaxed font-sans">
                    {princ.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Download CV CTA */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-6"
          >
            <a 
              href="https://wa.me/263773887577?text=Hello%20Priviledge,%20I%20would%20like%20to%20request%20your%20CV" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-white font-mono text-xs font-bold uppercase tracking-wider rounded-xl transition-all group"
            >
              <span>Download CV / Request Details</span>
              <ArrowUpRight className="w-4 h-4 text-[#C7FF3D] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
