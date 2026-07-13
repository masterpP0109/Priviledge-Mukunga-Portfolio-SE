import React, { useState } from "react";
import { motion } from "motion/react";
import { Cpu, Database, Zap, Settings, ShieldCheck, Server } from "lucide-react";
import { logEvent } from "./AnalyticsTracker";

export default function OryzoBlueprint() {
  const [optimizerValue, setOptimizerValue] = useState(50); // range 0 to 100

  // Calculate simulated parameters in real time based on the slider value!
  const speedMs = (180 - (optimizerValue * 1.79)).toFixed(1); // 180ms down to 1.0ms
  const qps = Math.floor(120 + (optimizerValue * 478.8)); // 120 QPS to 48,000 QPS
  const redisHit = (12 + (optimizerValue * 0.878)).toFixed(1); // 12% to 99.8%
  const dbLoad = Math.floor(94 - (optimizerValue * 0.91)); // 94% down to 3%

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setOptimizerValue(val);
    if (val % 10 === 0) {
      logEvent("click_project", { action: "adjust_system_optimizer", value: val });
    }
  };

  return (
    <section className="relative bg-[#020408] text-white py-24 px-6 overflow-hidden border-b border-slate-900/60">
      
      {/* Background radial lines and technical details mimicking ORYZO */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-purple-900/5 rounded-full filter blur-[150px] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a12_1px,transparent_1px),linear-gradient(to_bottom,#0f172a12_1px,transparent_1px)] bg-[size:2rem_2rem] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Side: Dynamic Technical Specifications Blueprint Grid */}
        <div className="lg:col-span-7 text-left flex flex-col gap-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-950/40 border border-purple-500/20 text-purple-400 font-mono text-xs rounded-full uppercase tracking-widest w-fit">
            <Cpu className="w-3.5 h-3.5 text-purple-400" />
            <span>Interactive system optimizer</span>
          </div>

          <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl tracking-tight text-white uppercase leading-none mb-2">
            The Performance <br/>Blueprint
          </h2>

          <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-xl font-sans">
            Every application I build undergoes severe load testing. Drag the performance optimizer below to see how caching, database indexing, and CJS bundle compilation dynamically accelerate the server pipeline:
          </p>

          {/* Interactive Slider Controller panel */}
          <div className="bg-[#070b13] border border-slate-900 p-6 rounded-2xl max-w-lg w-full shadow-2xl relative">
            <div className="flex justify-between items-center mb-4 font-mono text-xs text-slate-500">
              <span className="flex items-center gap-1.5 uppercase font-bold text-slate-400">
                <Settings className="w-4 h-4 text-purple-400 animate-spin" />
                SYSTEM_TUNING_NODE
              </span>
              <span>SLIDER: {optimizerValue}%</span>
            </div>

            {/* Simulated Live Slider */}
            <div className="flex flex-col gap-3">
              <div className="flex justify-between font-mono text-[10px] text-slate-500 uppercase tracking-wider">
                <span>Standard Codebase</span>
                <span className="text-purple-400">Elite Architecture</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={optimizerValue} 
                onChange={handleSliderChange}
                className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-purple-500 focus:outline-none border border-slate-900"
              />
            </div>

            {/* Simulated Specs parameters lines */}
            <div className="grid grid-cols-2 gap-4 mt-6 border-t border-slate-900/60 pt-4 text-left">
              
              {/* Latency */}
              <div className="bg-[#05080f] border border-slate-900 p-3.5 rounded-xl flex items-center gap-3">
                <Zap className="w-5 h-5 text-amber-500 flex-shrink-0" />
                <div>
                  <span className="font-mono text-[9px] text-slate-500 block uppercase">latency</span>
                  <span className="font-mono text-base font-bold text-white">{speedMs}ms</span>
                </div>
              </div>

              {/* Throughput QPS */}
              <div className="bg-[#05080f] border border-slate-900 p-3.5 rounded-xl flex items-center gap-3">
                <Server className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                <div>
                  <span className="font-mono text-[9px] text-slate-500 block uppercase">throughput</span>
                  <span className="font-mono text-base font-bold text-white">{qps.toLocaleString()} QPS</span>
                </div>
              </div>

              {/* Cache Hit */}
              <div className="bg-[#05080f] border border-slate-900 p-3.5 rounded-xl flex items-center gap-3">
                <Database className="w-5 h-5 text-cyan-500 flex-shrink-0" />
                <div>
                  <span className="font-mono text-[9px] text-slate-500 block uppercase">cache hit-rate</span>
                  <span className="font-mono text-base font-bold text-white">{redisHit}%</span>
                </div>
              </div>

              {/* Database load */}
              <div className="bg-[#05080f] border border-slate-900 p-3.5 rounded-xl flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-purple-500 flex-shrink-0" />
                <div>
                  <span className="font-mono text-[9px] text-slate-500 block uppercase">database overhead</span>
                  <span className="font-mono text-base font-bold text-white">{dbLoad}%</span>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Right Side: Glowing ORYZO Coaster 3D pedestal with 3D transforms and glassmorphism */}
        <div className="lg:col-span-5 relative flex flex-col items-center justify-center">
          
          {/* Style injection for exact 3D performance rotation from PDF page 1 & 3 */}
          <style dangerouslySetInnerHTML={{__html: `
            @keyframes spin-coaster-3d {
              0% {
                transform: perspective(600px) rotateX(60deg) rotateZ(0deg);
              }
              100% {
                transform: perspective(600px) rotateX(60deg) rotateZ(360deg);
              }
            }
            .coaster-3d-pedestal {
              transform-style: preserve-3d;
              animation: spin-coaster-3d 8s linear infinite;
              will-change: transform;
            }
          `}} />

          {/* Animated background concentric circles */}
          <div className="absolute w-[400px] h-[400px] border border-dashed border-purple-500/10 rounded-full animate-[spin_60s_linear_infinite] pointer-events-none" />
          <div className="absolute w-[300px] h-[300px] border border-purple-500/5 rounded-full animate-[spin_30s_linear_infinite_reverse] pointer-events-none" />

          {/* 3D Coaster Container with perspective */}
          <div className="relative w-80 h-80 flex items-center justify-center" style={{ perspective: "1000px" }}>
            
            {/* The 3D Rotating Coaster Disc mimicking the TikTok video exactly */}
            <div className="coaster-3d-pedestal absolute w-72 h-72 rounded-full border-4 border-double border-purple-500/40 bg-gradient-to-b from-slate-900/90 to-purple-950/80 shadow-[0_25px_50px_-12px_rgba(168,85,247,0.25)] flex items-center justify-center p-4">
              
              {/* Inner ring layer */}
              <div className="w-full h-full rounded-full border border-dashed border-white/20 flex items-center justify-center relative">
                
                {/* Simulated circuits/markings on the coaster */}
                <div className="absolute inset-4 rounded-full border border-white/[0.06]" />
                <div className="absolute inset-10 rounded-full border border-white/[0.04]" />
                
                {/* Node markers */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-purple-500 shadow-[0_0_10px_#a855f7]" />
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_10px_#3b82f6]" />
                <div className="absolute left-2 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-pink-500 shadow-[0_0_10px_#ec4899]" />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]" />

                {/* Subtext rotating inside */}
                <span className="font-mono text-[7px] text-white/30 tracking-widest uppercase absolute top-12">ORYZO_COASTER_3D</span>
                <span className="font-mono text-[7px] text-white/30 tracking-widest uppercase absolute bottom-12">SYSTEMS_ENGINEERING</span>
              </div>

            </div>

            {/* Glowing Center core floating above the 3D coaster with opposite tilt */}
            <motion.div 
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="z-10 w-44 h-44 rounded-full bg-white/[0.04] border border-white/[0.12] backdrop-blur-xl flex flex-col items-center justify-center text-center p-4 shadow-[0_15px_30px_rgba(0,0,0,0.5)] relative"
            >
              {/* Pulsing colored center */}
              <div className="absolute inset-2 rounded-full bg-gradient-to-tr from-purple-600/40 via-pink-600/40 to-blue-500/40 filter blur-md animate-pulse pointer-events-none" />
              <Cpu className="w-8 h-8 text-purple-300 animate-pulse mb-2" />
              <span className="font-mono text-[9px] text-purple-400 font-bold uppercase tracking-widest">Postgres.db</span>
              <span className="font-mono text-[11px] text-white font-black tracking-tight">ACTIVE_CORE</span>
              <span className="font-mono text-[7px] text-white/40 uppercase mt-1 tracking-wider">LATENCY: {speedMs}ms</span>
            </motion.div>

          </div>

          {/* Blueprint specs captions positioned around */}
          <div className="absolute top-4 right-6 bg-white/[0.02] border border-white/[0.06] backdrop-blur-md px-3 py-1.5 rounded-xl font-mono text-[9px] text-slate-400 uppercase tracking-widest hidden sm:block">
            node_io_sync: active
          </div>
          <div className="absolute bottom-4 left-6 bg-white/[0.02] border border-white/[0.06] backdrop-blur-md px-3 py-1.5 rounded-xl font-mono text-[9px] text-slate-400 uppercase tracking-widest hidden sm:block">
            compression: gzip_max
          </div>
        </div>

      </div>
    </section>
  );
}
