import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowUpRight, 
  Eye, 
  ExternalLink, 
  Layers, 
  Database, 
  Sparkles, 
  CheckCircle2,
  X
} from "lucide-react";
import { Project } from "../types";
import { logEvent } from "./AnalyticsTracker";

interface PortfolioProps {
  projects: Project[];
  onSelectProject?: (project: Project) => void;
}

export default function Portfolio({ projects, onSelectProject }: PortfolioProps) {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedModalProject, setSelectedModalProject] = useState<Project | null>(null);

  const categories = [
    "All",
    "Full-Stack",
    "E-commerce",
    "Business System",
    "Interactive UI"
  ];

  const filteredProjects = useMemo(() => {
    if (activeCategory === "All") return projects;
    return projects.filter((p) => {
      const cat = p.category.toLowerCase();
      if (activeCategory === "Full-Stack") return cat.includes("full stack") || cat.includes("application");
      if (activeCategory === "E-commerce") return cat.includes("e-commerce") || cat.includes("shop");
      if (activeCategory === "Business System") return cat.includes("system") || cat.includes("inventory");
      return cat.includes("interactive") || cat.includes("ui");
    });
  }, [projects, activeCategory]);

  const handleOpenProject = (project: Project) => {
    setSelectedModalProject(project);
    if (onSelectProject) onSelectProject(project);
    logEvent("click_project", { title: project.title });
  };

  return (
    <section id="work" className="relative bg-[#090C12] text-white py-24 px-6 sm:px-12 border-b border-white/[0.06] overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-purple-900/10 rounded-full filter blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8 text-left">
          <div>
            <span className="font-mono text-[#C7FF3D] text-xs tracking-widest uppercase block mb-3 font-semibold">
              SELECTED WORKS
            </span>
            <h2 className="font-serif italic font-normal text-3xl sm:text-5xl lg:text-6xl text-[#F2EEE6] tracking-tight leading-none mb-3">
              Crafted for performance <span className="font-sans font-black not-italic uppercase text-white">& utility.</span>
            </h2>
            <p className="text-[#B7B4AD] font-sans text-base max-w-xl">
              Production web applications, e-commerce engines, and high-performance databases engineered from end to end.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 bg-white/[0.02] border border-white/10 p-1.5 rounded-2xl">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl font-mono text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                  activeCategory === cat
                    ? "bg-[#F2EEE6] text-[#0C0D0D] shadow-md"
                    : "text-[#B7B4AD] hover:text-white hover:bg-white/[0.05]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              onClick={() => handleOpenProject(project)}
              className="group bg-white/[0.02] border border-white/10 hover:border-[#E46F43]/50 rounded-3xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-black/60 cursor-pointer"
            >
              <div>
                {/* Thumbnail Image */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/50">
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0C0D0D] via-transparent to-transparent opacity-80" />

                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="font-mono text-[10px] text-[#C7FF3D] uppercase bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                      {project.category}
                    </span>
                    <span className="font-mono text-[10px] text-white bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      LIVE
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-7">
                  <h3 className="font-sans font-black text-2xl text-[#F2EEE6] group-hover:text-white tracking-tight mb-3">
                    {project.title}
                  </h3>
                  <p className="text-[#B7B4AD] text-sm font-sans leading-relaxed line-clamp-2 mb-6">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-lg text-xs font-mono text-[#F2EEE6] bg-white/[0.04] border border-white/5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer Metrics */}
              <div className="px-7 py-4 border-t border-white/[0.06] bg-black/30 flex items-center justify-between font-mono text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-slate-500" />
                  {project.metrics.views}
                </span>
                <span className="text-[#C7FF3D] group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  <span>DETAILS</span>
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Project Detail Modal */}
        <AnimatePresence>
          {selectedModalProject && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedModalProject(null)}
                className="fixed inset-0 bg-black/85 backdrop-blur-md"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-3xl bg-[#0F1117] border border-white/10 rounded-3xl shadow-2xl overflow-hidden z-10 my-8 text-left"
              >
                <div className="relative aspect-video w-full overflow-hidden bg-black">
                  <img
                    src={selectedModalProject.thumbnail}
                    alt={selectedModalProject.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F1117] via-transparent to-transparent" />
                  <button
                    onClick={() => setSelectedModalProject(null)}
                    className="absolute top-4 right-4 p-2 rounded-full bg-black/70 text-white hover:bg-black border border-white/20 transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <div className="absolute bottom-6 left-6 right-6">
                    <span className="font-mono text-xs text-[#C7FF3D] uppercase block mb-2">
                      {selectedModalProject.category}
                    </span>
                    <h3 className="font-serif italic text-3xl sm:text-4xl text-white">
                      {selectedModalProject.title}
                    </h3>
                  </div>
                </div>

                <div className="p-6 sm:p-8 space-y-6">
                  <div>
                    <h4 className="font-mono text-xs uppercase text-[#E46F43] tracking-widest font-bold mb-2">
                      PROJECT OVERVIEW
                    </h4>
                    <p className="text-slate-300 font-sans text-base leading-relaxed">
                      {selectedModalProject.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {selectedModalProject.tags.map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1 bg-white/[0.05] border border-white/10 rounded-lg text-xs font-mono text-[#F2EEE6]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                    <div className="font-mono text-xs text-slate-400">
                      <span>RETENTION: <strong className="text-white">{selectedModalProject.metrics.retention}</strong></span>
                      <span className="mx-3">·</span>
                      <span>ENGAGEMENT: <strong className="text-white">{selectedModalProject.metrics.engagement}</strong></span>
                    </div>

                    <a
                      href={`https://wa.me/263773887577?text=Hi%20Priviledge,%20I%20am%20interested%20in%20discussing%20${selectedModalProject.title}`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-6 py-3 bg-[#F2EEE6] hover:bg-white text-[#0C0D0D] font-mono text-xs font-bold uppercase rounded-xl transition-all inline-flex items-center gap-2 shadow-lg"
                    >
                      <span>DISCUSS THIS PROJECT</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
