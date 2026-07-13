import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, CheckCircle, Mail, Briefcase, FileText, ArrowRight, RefreshCw, Copy, ExternalLink, Sparkles } from "lucide-react";
import { logEvent } from "./AnalyticsTracker";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    projectType: "Systems Engineering",
    message: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedLead, setSubmittedLead] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [newsletterAgree, setNewsletterAgree] = useState(true);

  const projectTypes = [
    "Systems Engineering",
    "3D Motion Graphics",
    "Social Media / Reels",
    "Database Optimization",
    "AI Automated Leads Agent",
    "Custom Creative Collaboration"
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFocus = (field: string) => {
    logEvent('form_focus', { field });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setError("Please fill out all required fields.");
      return;
    }

    setIsSubmitting(true);
    setError(null);
    logEvent('form_submit', { projectType: formData.projectType });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error("Failed to submit contact request.");
      }

      const data = await response.json();
      if (data.success) {
        setSubmittedLead(data.lead);
        // Clear form
        setFormData({
          name: "",
          email: "",
          company: "",
          projectType: "Systems Engineering",
          message: ""
        });
      } else {
        setError(data.error || "An unexpected error occurred.");
      }
    } catch (err: any) {
      console.error(err);
      setError("Something went wrong while sending your request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyResponse = () => {
    if (submittedLead?.aiResponseDraft) {
      navigator.clipboard.writeText(submittedLead.aiResponseDraft);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section id="contact" className="bg-[#05070c] text-white py-24 px-6 relative border-t border-slate-900/60">
      
      {/* Background orange/purple glowing overlay mimicking the Tikka Masala hot vibe! */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-red-950/10 rounded-full filter blur-[150px] pointer-events-none z-0" />
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-purple-900/5 rounded-full filter blur-[100px] pointer-events-none z-0" />

      <div className="max-w-4xl mx-auto w-full relative z-10 text-left">
        
        {/* Section Header */}
        <div className="text-center mb-16 flex flex-col items-center">
          <span className="font-mono text-purple-400 text-xs tracking-widest uppercase block mb-3">
            WORK INQUIRY METRIC ENGINE
          </span>
          
          {/* THE GIANT BOLD "HUNGRY" HEADER WITH EXACT VIDEO DESIGN TYPOGRAPHY */}
          <h2 className="font-display font-black text-6xl sm:text-8xl md:text-9xl uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-[#ff4d4d] leading-none mb-4">
            HUNGRY
          </h2>
          
          <p className="text-slate-400 font-sans max-w-xl text-center text-sm sm:text-base leading-relaxed">
            Ready to deploy high-retention full-stack solutions? Feed your specifications to our database matrix and get an automated Gemini AI confirmation response in seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          
          {/* Quick contact info sidebar */}
          <div className="md:col-span-4 flex flex-col gap-6">
            <div className="bg-slate-950 border border-slate-900 p-6 rounded-2xl shadow-xl">
              <span className="font-mono text-[10px] text-slate-500 uppercase block mb-3 font-bold">Direct Channels</span>
              <div className="flex flex-col gap-4">
                <a 
                  href="mailto:mukungapriviledge@gmail.com" 
                  className="flex items-center gap-3 text-sm text-slate-300 hover:text-[#ff4d4d] transition-colors"
                >
                  <div className="w-9 h-9 rounded-lg bg-red-500/10 flex items-center justify-center text-red-400 border border-red-500/20">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] text-slate-500 font-mono font-bold">EMAIL</p>
                    <p className="truncate text-xs">mukungapriviledge@gmail.com</p>
                  </div>
                </a>
                
                <div className="flex items-center gap-3 text-sm text-slate-300">
                  <div className="w-9 h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/20">
                    <Briefcase className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 font-mono font-bold">STATUS</p>
                    <p className="text-emerald-400 font-bold text-xs">Active for refactoring</p>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Automated explanation box */}
            <div className="bg-purple-950/20 border border-purple-500/20 p-6 rounded-2xl">
              <span className="font-mono text-[10px] text-purple-400 uppercase block mb-2 font-bold">★ Gemini AI Server Core</span>
              <p className="text-[11px] sm:text-xs text-purple-200/80 leading-relaxed font-sans">
                This isn't just a placeholder. Our backend uses the server-side Gemini API to analyze your project requirements and compose a customized automated confirmation draft from Priviledge instantly.
              </p>
            </div>
          </div>

          {/* Form Side with EXACT Minimalist outlines and high-contrast styling from the Video */}
          <div className="md:col-span-8">
            <AnimatePresence mode="wait">
              {!submittedLead ? (
                <motion.form
                  key="contact-form"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  onSubmit={handleSubmit}
                  className="bg-slate-950/80 border-2 border-slate-900 p-8 rounded-3xl shadow-2xl backdrop-blur-md flex flex-col gap-6"
                >
                  {error && (
                    <div className="p-4 bg-red-950/50 border border-red-500/30 text-red-300 rounded-xl text-xs font-sans">
                      {error}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Name input */}
                    <div className="flex flex-col gap-2">
                      <span className="font-mono text-[10px] text-slate-500 uppercase tracking-widest font-bold">ENTER YOUR NAME *</span>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        onFocus={() => handleFocus("name")}
                        placeholder="Your Name (e.g. Elon)"
                        className="bg-slate-900/60 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-500/80 transition-all text-white font-mono placeholder:text-slate-600"
                      />
                    </div>

                    {/* Email input */}
                    <div className="flex flex-col gap-2">
                      <span className="font-mono text-[10px] text-slate-500 uppercase tracking-widest font-bold">ENTER YOUR EMAIL *</span>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        onFocus={() => handleFocus("email")}
                        placeholder="Email Address"
                        className="bg-slate-900/60 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-500/80 transition-all text-white font-mono placeholder:text-slate-600"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Company input */}
                    <div className="flex flex-col gap-2">
                      <span className="font-mono text-[10px] text-slate-500 uppercase tracking-widest font-bold">COMPANY NAME (OPTIONAL)</span>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        onFocus={() => handleFocus("company")}
                        placeholder="Company"
                        className="bg-slate-900/60 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-500/80 transition-all text-white font-mono placeholder:text-slate-600"
                      />
                    </div>

                    {/* Project type select */}
                    <div className="flex flex-col gap-2">
                      <span className="font-mono text-[10px] text-slate-500 uppercase tracking-widest font-bold">PROJECT CAPABILITY</span>
                      <select
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleInputChange}
                        onFocus={() => handleFocus("projectType")}
                        className="bg-slate-900/60 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-500/80 transition-all text-white cursor-pointer font-mono"
                      >
                        {projectTypes.map(type => (
                          <option key={type} value={type} className="bg-slate-950 text-white font-mono text-xs">
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Message input */}
                  <div className="flex flex-col gap-2">
                    <span className="font-mono text-[10px] text-slate-500 uppercase tracking-widest font-bold">PROJECT BRIEF DESCRIPTION *</span>
                    <textarea
                      name="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                      onFocus={() => handleFocus("message")}
                      placeholder="Tell me what high-retention system you would like us to build. Share any budget parameters..."
                      className="bg-slate-900/60 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-500/80 transition-all text-white resize-none font-mono placeholder:text-slate-600"
                    />
                  </div>

                  {/* Newsletter agreement toggle from Video */}
                  <div className="flex items-start gap-2.5 my-1">
                    <input 
                      type="checkbox" 
                      id="newsletter" 
                      checked={newsletterAgree}
                      onChange={(e) => setNewsletterAgree(e.target.checked)}
                      className="w-4 h-4 rounded border-slate-800 bg-slate-900 text-purple-600 focus:ring-purple-500 mt-0.5 cursor-pointer"
                    />
                    <label htmlFor="newsletter" className="font-mono text-[10px] text-slate-400 select-none leading-relaxed cursor-pointer uppercase">
                      BY SENDING THE SPECIFICATIONS, I AGREE TO CONNECT AND ALLOW SECURE RELATIONAL REFACTORING LOGS TRANSMITTED IN ACTIVE REAL-TIME PIPELINE.
                    </label>
                  </div>

                  {/* Giant SUBSCRIBE themed Submission Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-2 bg-white hover:bg-slate-100 disabled:bg-slate-200 text-black font-display font-black text-sm tracking-widest py-4.5 rounded-xl transition-all shadow-xl hover:scale-[1.02] uppercase flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <RefreshCw className="w-5 h-5 animate-spin text-purple-600" />
                        <span>Running compiler core...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4.5 h-4.5 text-black" />
                        <span>SUBSCRIBE TO INQUIRY</span>
                      </>
                    )}
                  </button>
                </motion.form>
              ) : (
                /* Success & AI Lead Response Reviewer Panel (Magic!) */
                <motion.div
                  key="success-card"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-slate-950 border-2 border-purple-500 p-8 rounded-3xl shadow-2xl relative overflow-hidden text-left"
                >
                  <div className="flex items-start gap-4 mb-6">
                    <CheckCircle className="w-10 h-10 text-emerald-400 flex-shrink-0" />
                    <div>
                      <h3 className="font-display font-bold text-2xl text-white">Inquiry Received Successfully!</h3>
                      <p className="text-sm text-slate-400 font-sans mt-1">
                        Awesome! Your project brief has been persisted.
                      </p>
                    </div>
                  </div>

                  <div className="p-5 bg-purple-950/20 border border-purple-500/30 rounded-2xl mb-6">
                    <div className="flex items-center justify-between mb-4 border-b border-purple-500/20 pb-3">
                      <div className="flex items-center gap-2 text-xs font-mono text-purple-300">
                        <Mail className="w-4 h-4" />
                        <span>AUTO_LEAD_RESPONSE.TXT</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={copyResponse}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs text-slate-300 cursor-pointer transition-all"
                        >
                          <Copy className="w-3.5 h-3.5" />
                          <span>{copied ? "Copied!" : "Copy Email"}</span>
                        </button>
                      </div>
                    </div>

                    {/* Render the actual AI drafted email! */}
                    <div className="font-mono text-xs sm:text-sm text-slate-300 leading-relaxed max-h-64 overflow-y-auto whitespace-pre-wrap pr-2 text-left">
                      {submittedLead.aiResponseDraft}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => setSubmittedLead(null)}
                      className="flex-1 py-3 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-sm font-semibold rounded-xl transition-all cursor-pointer"
                    >
                      Submit Another Inquiry
                    </button>
                    <a
                      href="https://gmail.com"
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 py-3 bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold rounded-xl text-center flex items-center justify-center gap-2 cursor-pointer transition-all shadow-lg shadow-purple-500/20"
                    >
                      <span>Check Your Email</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
