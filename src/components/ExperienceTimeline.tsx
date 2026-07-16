import React from "react";
import { motion } from "motion/react";
import { Award, Briefcase, Database, Globe, GraduationCap, ShieldCheck } from "lucide-react";

interface Role {
  period: string;
  title: string;
  company: string;
  description: string;
}

export default function ExperienceTimeline() {
  const experiences: Role[] = [
    {
      period: "2024 — PRESENT",
      title: "Senior Full Stack Systems Architect",
      company: "Independent Contracts / Remote Globally",
      description: "Engineering secure relational query buffers, custom container entry configurations, and high-retention cinematic user interfaces. Deploying Node CommonJS engines, serverless setups, and PostgreSQL clustering schemas."
    },
    {
      period: "2022 — 2024",
      title: "Full Stack Engineer & Core Developer",
      company: "Elite Web Agency",
      description: "Led development of robust e-commerce architectures and corporate dashboards. Reduced layout rendering bottlenecks using GSAP, improved checkout flow stability, and maintained 99.9% uptime SLAs."
    },
    {
      period: "2020 — 2022",
      title: "Frontend Developer & UI Specialist",
      company: "Interactive Digital Labs",
      description: "Crafted interactive canvases, high-fidelity promotional landing pages, and customized video scrubber tools. Configured seamless and eye-safe twilight color templates."
    }
  ];

  return (
    <section id="experience" className="relative bg-[#05070c] text-white py-24 px-6 overflow-hidden border-b border-slate-900/40">
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-purple-900/5 rounded-full filter blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        
        {/* Left Side: Large trust statement / monograms */}
        <div className="lg:col-span-5 text-left flex flex-col justify-center">
          <span className="font-mono text-purple-400 text-xs tracking-widest uppercase block mb-3 font-semibold">
            PROFESSIONAL PROOF
          </span>
          <h2 className="font-serif italic font-normal text-4xl sm:text-6xl text-white tracking-tight leading-none mb-6">
            Building trust through <span className="font-sans font-black not-italic uppercase text-purple-300">execution.</span>
          </h2>
          <p className="text-slate-400 font-sans leading-relaxed text-sm sm:text-base mb-8">
            I don't rely on mock structures or generic templates. Every contract is backed by real metrics, clean codebases, stable database transactions, and cinematic interactions.
          </p>

          <div className="bg-slate-950 border border-slate-900 p-6 rounded-2xl flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="text-left">
              <span className="font-mono text-[9px] text-slate-500 block uppercase font-bold">CONTRACT AVAILABILITY</span>
              <p className="font-display font-black text-sm text-white uppercase mt-0.5">OPEN FOR PREMIUM PROJECTS</p>
            </div>
          </div>
        </div>

        {/* Right Side: Clean staggered experience timeline */}
        <div className="lg:col-span-7 text-left flex flex-col gap-8">
          <span className="font-mono text-[10px] text-slate-500 uppercase block tracking-widest font-semibold">
            Career Timeline & Ingress logs:
          </span>

          <div className="flex flex-col gap-6 relative border-l border-slate-900 pl-6 lg:pl-10 ml-3">
            {experiences.map((exp, idx) => (
              <motion.div 
                key={exp.title}
                initial={{ opacity: 0, x: 25 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="relative flex flex-col gap-2 group"
              >
                {/* Timeline node dot */}
                <div className="absolute -left-[31px] lg:-left-[47px] top-1.5 w-3 h-3 rounded-full bg-slate-950 border border-slate-900 group-hover:bg-purple-500 transition-colors duration-300 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500/40 group-hover:bg-white scale-0 group-hover:scale-100 transition-transform duration-300" />
                </div>

                <span className="font-mono text-xs text-purple-400 font-bold block">
                  {exp.period}
                </span>

                <h3 className="font-display font-black text-xl text-white uppercase leading-none mt-1 group-hover:text-purple-300 transition-colors">
                  {exp.title}
                </h3>

                <span className="font-mono text-[10px] text-slate-500 uppercase font-semibold">
                  {exp.company}
                </span>

                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-sans mt-2">
                  {exp.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
