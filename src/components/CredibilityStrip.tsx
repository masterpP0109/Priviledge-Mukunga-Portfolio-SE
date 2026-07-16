import React from "react";
import { motion } from "motion/react";
import { Award, Briefcase, Globe, Milestone } from "lucide-react";

export default function CredibilityStrip() {
  const stats = [
    {
      id: "stat-1",
      number: "5+ Years",
      label: "Architecting Web Core",
      icon: <Briefcase className="w-4 h-4 text-purple-400" />
    },
    {
      id: "stat-2",
      number: "40+ Projects",
      label: "Delivered Internationally",
      icon: <Milestone className="w-4 h-4 text-purple-400" />
    },
    {
      id: "stat-3",
      number: "Design · Code",
      label: "End-to-End Execution",
      icon: <Award className="w-4 h-4 text-purple-400" />
    },
    {
      id: "stat-4",
      number: "Available",
      label: "Remote Collaborations",
      icon: <Globe className="w-4 h-4 text-emerald-400 animate-pulse" />
    }
  ];

  return (
    <section className="relative bg-[#030509] border-y border-slate-900/60 py-12 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(#1e1b4b08_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto w-full">
        {/* Expanding line */}
        <motion.div 
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "power3.out" }}
          className="w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500/30 to-transparent mb-10 origin-center"
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 items-center">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: "easeOut" }}
              className="flex flex-col items-center text-center p-4 relative group"
            >
              {/* Subtle hover background highlight */}
              <div className="absolute inset-0 bg-white/[0.01] rounded-2xl scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 pointer-events-none" />
              
              <div className="w-10 h-10 rounded-xl bg-slate-950/80 border border-slate-900 flex items-center justify-center mb-3 group-hover:rotate-12 transition-transform duration-300 shadow-lg">
                {stat.icon}
              </div>
              
              <span className="font-display font-black text-xl sm:text-2xl text-white block uppercase tracking-tight">
                {stat.number}
              </span>
              
              <span className="font-mono text-[10px] text-slate-500 block uppercase tracking-wider mt-1 group-hover:text-purple-300 transition-colors">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
