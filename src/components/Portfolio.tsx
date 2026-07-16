import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Play, Pause, RotateCcw, Volume2, VolumeX, Eye, Flame, Clock, Heart, Maximize2, Share2, Layers } from "lucide-react";
import { gsap } from "gsap";
import { Project } from "../types";
import { logEvent } from "./AnalyticsTracker";

interface PortfolioProps {
  projects: Project[];
  selectedProject?: Project | null;
  setSelectedProject?: (project: Project | null) => void;
}

export default function Portfolio({ projects, selectedProject: propsSelectedProject, setSelectedProject: propsSetSelectedProject }: PortfolioProps) {
  const [filter, setFilter] = useState<string>("All");
  const [localSelectedProject, setLocalSelectedProject] = useState<Project | null>(null);
  
  const selectedProject = propsSelectedProject !== undefined ? propsSelectedProject : localSelectedProject;
  const setSelectedProject = propsSetSelectedProject !== undefined ? propsSetSelectedProject : setLocalSelectedProject;

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [likes, setLikes] = useState<Record<string, number>>({});
  const [hasLiked, setHasLiked] = useState<Record<string, boolean>>({});

  const videoRef = useRef<HTMLVideoElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  const categories = ["All", "Video Editing", "3D Motion Graphics", "Social Media / Reels"];

  const filteredProjects = filter === "All" 
    ? projects 
    : projects.filter(p => p.category === filter);

  // GSAP Scroll Triggered Reveal Animation
  useEffect(() => {
    gsap.fromTo(
      ".portfolio-gsap-reveal",
      { opacity: 0, y: 45 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 1.2, 
        stagger: 0.15, 
        ease: "power3.out"
      }
    );
  }, []);

  // Video playback controls
  useEffect(() => {
    if (selectedProject) {
      setIsPlaying(true);
      setProgress(0);
      logEvent('play_video', { projectId: selectedProject.id, title: selectedProject.title });
    } else {
      setIsPlaying(false);
    }
  }, [selectedProject]);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(() => {});
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const duration = videoRef.current.duration || 1;
      setProgress((current / duration) * 100);
    }
  };

  const handleTimelineClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current && timelineRef.current) {
      const rect = timelineRef.current.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const width = rect.width;
      const clickPercentage = clickX / width;
      const newTime = clickPercentage * (videoRef.current.duration || 0);
      videoRef.current.currentTime = newTime;
      setProgress(clickPercentage * 100);
    }
  };

  const handleSpeedChange = () => {
    const speeds = [1, 1.5, 2, 0.5];
    const currentIndex = speeds.indexOf(speed);
    const nextSpeed = speeds[(currentIndex + 1) % speeds.length];
    if (videoRef.current) {
      videoRef.current.playbackRate = nextSpeed;
    }
    setSpeed(nextSpeed);
    logEvent('click_project', { action: 'video_speed_change', value: nextSpeed });
  };

  const handleToggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
    setIsMuted(!isMuted);
  };

  const handleRestart = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const currentLikes = likes[id] || 0;
    const currentlyLiked = hasLiked[id] || false;
    
    if (currentlyLiked) {
      setLikes({ ...likes, [id]: currentLikes - 1 });
      setHasLiked({ ...hasLiked, [id]: false });
    } else {
      setLikes({ ...likes, [id]: currentLikes + 1 });
      setHasLiked({ ...hasLiked, [id]: true });
      logEvent('click_project', { action: 'like_project', projectId: id });
    }
  };

  return (
    <section id="work" className="bg-[#030509] text-white py-24 px-6 relative">
      <div className="absolute top-1/3 right-10 w-96 h-96 rounded-full bg-blue-950/20 filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-purple-950/25 filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="portfolio-gsap-reveal text-left">
            <span className="font-mono text-purple-400 text-xs tracking-widest uppercase block mb-3">
              CREATIVE ARCHIVE
            </span>
            <h2 className="font-display font-black text-4xl sm:text-6xl uppercase tracking-tight">
              Selected Works
            </h2>
            <div className="w-16 h-1 bg-purple-500 mt-4 rounded-full" />
          </div>

          {/* Filter Categories */}
          <div className="portfolio-gsap-reveal flex flex-wrap gap-2 bg-slate-900/60 border border-slate-800 p-1.5 rounded-2xl backdrop-blur-md">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => {
                  setFilter(cat);
                  logEvent('click_project', { action: 'filter_projects', category: cat });
                }}
                className={`px-5 py-2.5 rounded-xl font-sans text-sm font-medium transition-all cursor-pointer ${
                  filter === cat 
                    ? "bg-purple-600 text-white shadow-md shadow-purple-500/20" 
                    : "text-slate-400 hover:text-white hover:bg-slate-800/40"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Bento Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => {
              const projectLikes = likes[project.id] || Math.floor(Math.random() * 50) + 12;
              const isProjectLiked = hasLiked[project.id] || false;
              
              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 220, damping: 15, delay: index * 0.05 }}
                  whileHover={{ y: -10, scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => setSelectedProject(project)}
                  className="group relative bg-white/[0.02] border border-white/[0.06] backdrop-blur-xl rounded-3xl overflow-hidden cursor-pointer shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] hover:border-purple-500/40 hover:bg-white/[0.04] transition-all duration-500 flex flex-col h-full"
                >
                  {/* Thumbnail Cover */}
                  <div className="relative aspect-video w-full overflow-hidden bg-black/40">
                    <img
                      src={project.thumbnail}
                      alt={project.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/25 to-transparent opacity-80" />
                    
                    {/* Hover Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-14 h-14 rounded-full bg-purple-600 flex items-center justify-center text-white shadow-lg shadow-purple-500/40 transform scale-75 group-hover:scale-100 transition-all duration-300">
                        <Play className="w-6 h-6 fill-white ml-1" />
                      </div>
                    </div>

                    {/* Left category badge */}
                    <div className="absolute top-4 left-4 bg-black/60 border border-white/10 px-3 py-1 rounded-full text-[10px] font-mono text-purple-300 backdrop-blur-md">
                      {project.category}
                    </div>
                  </div>

                  {/* Body Info */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-display font-bold text-xl group-hover:text-purple-400 transition-colors mb-2 leading-tight">
                        {project.title}
                      </h3>
                      <p className="text-sm text-slate-400 line-clamp-2 mb-6">
                        {project.description}
                      </p>
                    </div>

                    <div>
                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {project.tags.slice(0, 3).map(t => (
                          <span key={t} className="px-2 py-0.5 roundedbg-slate-900 text-slate-400 border border-slate-800 text-[10px] font-mono">
                            {t}
                          </span>
                        ))}
                      </div>

                      {/* Performance Indicators (Very video editor themed!) */}
                      <div className="flex items-center justify-between pt-4 border-t border-slate-900 font-mono text-[11px] text-slate-500">
                        <span className="flex items-center gap-1">
                          <Eye className="w-3.5 h-3.5" />
                          {project.metrics.views} Views
                        </span>
                        <span className="flex items-center gap-1">
                          <Flame className="w-3.5 h-3.5 text-orange-500" />
                          {project.metrics.retention} Retention
                        </span>
                        
                        {/* Interactive Like */}
                        <button
                          onClick={(e) => handleLike(project.id, e)}
                          className={`flex items-center gap-1 hover:text-rose-400 transition-colors cursor-pointer ${
                            isProjectLiked ? "text-rose-400 font-semibold" : ""
                          }`}
                        >
                          <Heart className={`w-3.5 h-3.5 ${isProjectLiked ? "fill-rose-500 text-rose-500" : ""}`} />
                          {projectLikes}
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Video Lightbox (Post Production Timeline Studio interface!) */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div 
              id="video-lightbox"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-[#020408]/95 backdrop-blur-md flex items-center justify-center p-4"
            >
              <motion.div 
                initial={{ scale: 0.9, y: 30 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 30 }}
                className="bg-slate-950 border border-slate-800 rounded-3xl w-full max-w-5xl overflow-hidden shadow-2xl flex flex-col md:grid md:grid-cols-12"
              >
                {/* Left Side: Video & Custom Scrubber Timeline */}
                <div className="md:col-span-8 flex flex-col bg-black">
                  {/* Real-time Video Element */}
                  <div className="relative aspect-video flex items-center justify-center overflow-hidden">
                    <video
                      ref={videoRef}
                      src={selectedProject.videoUrl}
                      className="w-full h-full object-contain"
                      onTimeUpdate={handleTimeUpdate}
                      autoPlay
                      onClick={handlePlayPause}
                    />
                    
                    {/* Floating HUD info */}
                    <div className="absolute top-4 left-4 flex gap-2 pointer-events-none">
                      <span className="bg-black/70 px-2.5 py-1 rounded-md text-[10px] font-mono border border-slate-800 text-green-400">
                        SRC: ONLINE
                      </span>
                      <span className="bg-black/70 px-2.5 py-1 rounded-md text-[10px] font-mono border border-slate-800 text-purple-400">
                        CODEC: H.264
                      </span>
                    </div>

                    <div className="absolute top-4 right-4 flex gap-2 pointer-events-none">
                      <span className="bg-black/70 px-2.5 py-1 rounded-md text-[10px] font-mono border border-slate-800 text-slate-300">
                        FPS: 60
                      </span>
                    </div>

                    {/* Unmute prompt if user has custom audio block */}
                    {isMuted && (
                      <div className="absolute bottom-4 right-4 pointer-events-none bg-purple-600 px-3 py-1.5 rounded-full text-xs font-semibold text-white animate-bounce flex items-center gap-1 shadow-lg">
                        <VolumeX className="w-3.5 h-3.5" />
                        MUTED
                      </div>
                    )}
                  </div>

                  {/* Professional Video Editor Timeline Panel (Brilliant & immersive!) */}
                  <div className="p-4 bg-slate-950 border-t border-slate-900 flex flex-col gap-3">
                    
                    {/* Time Scrubber Timeline track */}
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[10px] text-slate-500">
                        00:00
                      </span>
                      
                      {/* Timeline bar */}
                      <div 
                        ref={timelineRef}
                        onClick={handleTimelineClick}
                        className="flex-1 h-3 bg-slate-900 rounded-full relative cursor-ew-resize border border-slate-800 group"
                      >
                        {/* Playhead line */}
                        <div 
                          className="h-full bg-purple-500 rounded-full relative transition-all"
                          style={{ width: `${progress}%` }}
                        >
                          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4.5 h-4.5 rounded-full bg-white border-2 border-purple-600 shadow-md transform scale-0 group-hover:scale-100 transition-transform" />
                        </div>
                      </div>
                      
                      <span className="font-mono text-[10px] text-slate-500">
                        {videoRef.current ? `00:${Math.floor(videoRef.current.duration || 0).toString().padStart(2, '0')}` : "00:10"}
                      </span>
                    </div>

                    {/* Playback HUD Toolbar */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <button
                          onClick={handlePlayPause}
                          className="w-10 h-10 rounded-full bg-purple-600 hover:bg-purple-700 flex items-center justify-center text-white cursor-pointer transition-all active:scale-95"
                        >
                          {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white ml-0.5" />}
                        </button>

                        <button
                          onClick={handleRestart}
                          className="p-2 hover:bg-slate-900 rounded-lg text-slate-400 hover:text-white cursor-pointer transition-all"
                          title="Restart Video"
                        >
                          <RotateCcw className="w-4 h-4" />
                        </button>

                        <button
                          onClick={handleToggleMute}
                          className="p-2 hover:bg-slate-900 rounded-lg text-slate-400 hover:text-white cursor-pointer transition-all"
                        >
                          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                        </button>

                        {/* Speed Toggle */}
                        <button
                          onClick={handleSpeedChange}
                          className="px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-mono border border-slate-800 cursor-pointer"
                        >
                          Speed: {speed}x
                        </button>
                      </div>

                      {/* Decibel Indicator (Pure visual design craft) */}
                      <div className="flex gap-0.5 items-end h-4">
                        {[0.2, 0.4, 0.7, 0.5, 0.8, 0.9, 0.4, 0.3, 0.5, 0.7, 0.1].map((h, i) => (
                          <div 
                            key={i} 
                            style={{ height: isPlaying ? `${h * 100}%` : '10%' }}
                            className={`w-1 rounded-full transition-all duration-300 ${
                              h > 0.8 ? 'bg-red-500' : h > 0.6 ? 'bg-yellow-500' : 'bg-green-500'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Side: Metadata Panel */}
                <div className="md:col-span-4 p-8 flex flex-col justify-between border-t md:border-t-0 md:border-l border-slate-900">
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <span className="font-mono text-purple-400 text-xs tracking-widest uppercase">
                        Post-Prod Specs
                      </span>
                      <button
                        onClick={() => setSelectedProject(null)}
                        className="text-slate-400 hover:text-white text-xs font-mono uppercase bg-slate-900 px-2 py-1 rounded border border-slate-800 cursor-pointer"
                      >
                        Close [ESC]
                      </button>
                    </div>

                    <h3 className="font-display font-black text-2xl uppercase tracking-tight text-white mb-4">
                      {selectedProject.title}
                    </h3>

                    <p className="text-sm text-slate-400 font-sans leading-relaxed mb-6">
                      {selectedProject.description}
                    </p>

                    <span className="font-mono text-xs text-slate-500 block mb-3 uppercase">
                      Applied Skills & Tools:
                    </span>
                    <div className="flex flex-wrap gap-1.5 mb-8">
                      {selectedProject.tags.map(t => (
                        <span key={t} className="px-2.5 py-1 rounded bg-slate-900 text-slate-300 border border-slate-800 font-mono text-xs">
                          {t}
                        </span>
                      ))}
                    </div>

                    <span className="font-mono text-xs text-slate-500 block mb-3 uppercase">
                      Campaign Impact metrics:
                    </span>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="bg-slate-900/60 p-3 rounded-2xl border border-slate-900 text-center">
                        <span className="font-mono text-[10px] text-slate-500 block">VIEWS</span>
                        <span className="font-display font-black text-lg text-purple-400">{selectedProject.metrics.views}</span>
                      </div>
                      <div className="bg-slate-900/60 p-3 rounded-2xl border border-slate-900 text-center">
                        <span className="font-mono text-[10px] text-slate-500 block">RETENTION</span>
                        <span className="font-display font-black text-lg text-blue-400">{selectedProject.metrics.retention}</span>
                      </div>
                      <div className="bg-slate-900/60 p-3 rounded-2xl border border-slate-900 text-center">
                        <span className="font-mono text-[10px] text-slate-500 block">ENGAGE</span>
                        <span className="font-display font-black text-lg text-pink-400">{selectedProject.metrics.engagement}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 pt-6 border-t border-slate-900 mt-8">
                    <button
                      onClick={() => alert(`Review request registered! Priviledge will get in touch regarding this creative layout.`)}
                      className="flex-1 py-3 bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <Share2 className="w-4 h-4" />
                      Share Project
                    </button>
                    <button
                      onClick={() => {
                        const nextId = projects[(projects.findIndex(p => p.id === selectedProject.id) + 1) % projects.length].id;
                        setSelectedProject(projects.find(p => p.id === nextId) || null);
                      }}
                      className="py-3 px-4 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-sm font-semibold rounded-xl transition-all cursor-pointer"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
