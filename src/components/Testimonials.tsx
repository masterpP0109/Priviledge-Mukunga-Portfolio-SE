import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Quote, ChevronLeft, ChevronRight, MessageSquare } from "lucide-react";

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  project: string;
}

export default function Testimonials() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const testimonials: Testimonial[] = [
    {
      id: "t-1",
      quote: "Priviledge completely refactored our web core system. Not only did the loading times drop under a second, but the interactive visual mapping he implemented increased our average session duration tremendously.",
      author: "Alex Rivers",
      role: "VP of Product Engineering",
      company: "Joy Coffee Labs",
      project: "Joy Coffee Refactor"
    },
    {
      id: "t-2",
      quote: "Working with Priviledge was a fantastic experience. He delivered a bullet-proof PostgreSQL schema that successfully processed peak checkout streams without breaking a sweat, which completely resolved our lockup issues.",
      author: "Samantha Vance",
      role: "CTO & Co-Founder",
      company: "Prinor Commerce",
      project: "Prinor Checkout Engine"
    },
    {
      id: "t-3",
      quote: "The attention to detail in his animations is mind-blowing. He doesn't just write functional scripts; he creates a carefully directed presentation that tells our story and captures user focus beautifully.",
      author: "Marcus Chen",
      role: "Creative Director",
      company: "Illuvium Studios",
      project: "Illuvium Gaming Platform"
    }
  ];

  // Automatic switching with pause on hover
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isHovered, testimonials.length]);

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActiveIdx((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative bg-[#020408] text-white py-24 px-6 overflow-hidden border-b border-slate-900/40"
    >
      <div className="absolute inset-0 bg-[radial-gradient(#1e1b4b08_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-900/5 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto w-full relative z-10 text-center flex flex-col items-center">
        
        {/* Label */}
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-950/40 border border-purple-500/20 text-purple-400 font-mono text-xs rounded-full uppercase tracking-widest mb-10 w-fit">
          <MessageSquare className="w-3.5 h-3.5 text-purple-400" />
          <span>Client Recommendations</span>
        </div>

        {/* Large Quote Icon */}
        <div className="w-16 h-16 rounded-full bg-slate-950 border border-slate-900 flex items-center justify-center text-purple-400 mb-8 shadow-xl">
          <Quote className="w-6 h-6 fill-purple-400/20" />
        </div>

        {/* Interactive Quote slider with fade and slide animation */}
        <div className="relative min-h-[220px] sm:min-h-[160px] w-full flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIdx}
              initial={{ opacity: 0, x: 25, filter: "blur(3px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: -25, filter: "blur(3px)" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="flex flex-col items-center gap-6"
            >
              <blockquote className="font-serif italic font-light text-xl sm:text-2xl text-slate-100 max-w-3xl leading-relaxed">
                "{testimonials[activeIdx].quote}"
              </blockquote>

              <div className="text-center mt-2">
                <span className="font-display font-black text-base uppercase text-white block">
                  {testimonials[activeIdx].author}
                </span>
                <span className="font-mono text-[10px] text-slate-500 uppercase block tracking-wider mt-0.5">
                  {testimonials[activeIdx].role} · {testimonials[activeIdx].company}
                </span>
                <span className="inline-block mt-3 px-2.5 py-0.5 rounded bg-purple-950/20 border border-purple-500/10 font-mono text-[9px] text-purple-400 uppercase tracking-widest font-bold">
                  PROJ: {testimonials[activeIdx].project}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Nav controls */}
        <div className="flex gap-4 mt-12 items-center">
          <button
            onClick={handlePrev}
            className="w-10 h-10 rounded-full bg-slate-950 border border-slate-900 hover:border-purple-500/50 flex items-center justify-center text-slate-400 hover:text-white transition-all cursor-pointer active:scale-95 shadow-lg"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <div className="flex gap-1.5">
            {testimonials.map((_, idx) => (
              <div
                key={idx}
                onClick={() => setActiveIdx(idx)}
                className={`w-2 h-2 rounded-full cursor-pointer transition-all duration-300 ${
                  activeIdx === idx ? "bg-purple-500 w-6" : "bg-slate-800 hover:bg-slate-700"
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="w-10 h-10 rounded-full bg-slate-950 border border-slate-900 hover:border-purple-500/50 flex items-center justify-center text-slate-400 hover:text-white transition-all cursor-pointer active:scale-95 shadow-lg"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </section>
  );
}
