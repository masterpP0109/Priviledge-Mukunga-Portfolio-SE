import React, { useState } from "react";
import { motion } from "motion/react";
import { Mail, MessageSquare, ArrowRight, CheckCircle2, Send, PhoneCall, Sparkles } from "lucide-react";
import { logEvent } from "./AnalyticsTracker";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "Web Application",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedLead, setSubmittedLead] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  const projectTypes = [
    "Website",
    "Web Application",
    "E-commerce",
    "Portfolio",
    "Business System",
    "Other",
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setError("Please fill out all fields.");
      return;
    }

    setIsSubmitting(true);
    setError(null);
    logEvent("form_submit", { projectType: formData.projectType });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setSubmittedLead(data.lead);
        setFormData({
          name: "",
          email: "",
          projectType: "Web Application",
          message: "",
        });
      } else {
        setError(data.error || "Failed to submit. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError("Network error. Please try WhatsApp directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative bg-[#0C0D0D] text-white py-24 px-6 sm:px-12 overflow-hidden border-t border-white/[0.06]">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#E46F43]/10 rounded-full filter blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start text-left">
          
          {/* Left Column: Context & Information */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full">
            <div>
              <span className="font-mono text-xs text-[#C7FF3D] uppercase tracking-widest block mb-4 font-bold">
                HAVE AN IDEA?
              </span>

              <h2 className="font-serif italic font-normal text-4xl sm:text-6xl text-[#F2EEE6] tracking-tight leading-none mb-6">
                LET'S <span className="font-sans font-black not-italic uppercase text-white">BUILD IT.</span>
              </h2>

              <p className="text-[#B7B4AD] font-sans text-base sm:text-lg leading-relaxed mb-8">
                Whether you need a new website, a better version of an existing platform or support turning an idea into a working product, tell me what you are building and what you need it to accomplish.
              </p>
              
              <p className="text-white font-medium text-base mb-8">
                I’ll respond with a practical next step.
              </p>

              {/* WhatsApp Direct Option */}
              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 mb-4">
                <span className="font-mono text-xs text-[#E46F43] block uppercase tracking-widest font-bold mb-2">
                  PREFER WHATSAPP?
                </span>
                <p className="text-sm text-[#B7B4AD] mb-3">
                  Chat directly with Priviledge for fast inquiries & project scoping:
                </p>
                <a
                  href="https://wa.me/263773887577?text=Hi%20Priviledge,%20I'm%20reaching%20out%20about%20a%20new%20project."
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 font-mono text-sm text-[#C7FF3D] font-bold hover:underline"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>+263 773 887 577</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Direct Email */}
              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
                <span className="font-mono text-xs text-slate-400 block uppercase tracking-widest font-bold mb-2">
                  DIRECT EMAIL
                </span>
                <a
                  href="mailto:mukungapriviledge@gmail.com"
                  className="inline-flex items-center gap-2 font-mono text-sm text-white hover:text-[#E46F43] transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span>mukungapriviledge@gmail.com</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Brief Form */}
          <div className="lg:col-span-7">
            <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 sm:p-10 shadow-2xl backdrop-blur-md">
              {submittedLead ? (
                <div className="py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif italic text-3xl text-white mb-2">
                    Thank You, {submittedLead.name}!
                  </h3>
                  <p className="text-[#B7B4AD] font-sans text-sm max-w-md mx-auto mb-6">
                    Your project details have been recorded. I am reviewing your scope and will respond to <strong className="text-white">{submittedLead.email}</strong> shortly.
                  </p>
                  <button
                    onClick={() => setSubmittedLead(null)}
                    className="px-6 py-2.5 bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-white font-mono text-xs uppercase rounded-xl"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-mono">
                      {error}
                    </div>
                  )}

                  {/* Full Name */}
                  <div>
                    <label className="block font-mono text-xs uppercase text-slate-400 mb-2 tracking-wider">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. Tendai Moyo"
                      className="w-full px-4 py-3.5 rounded-xl bg-black/50 border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-[#E46F43] font-sans text-sm transition-colors"
                    />
                  </div>

                  {/* Email Address */}
                  <div>
                    <label className="block font-mono text-xs uppercase text-slate-400 mb-2 tracking-wider">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="e.g. tendai@company.com"
                      className="w-full px-4 py-3.5 rounded-xl bg-black/50 border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-[#E46F43] font-sans text-sm transition-colors"
                    />
                  </div>

                  {/* Project Type */}
                  <div>
                    <label className="block font-mono text-xs uppercase text-slate-400 mb-2.5 tracking-wider">
                      Project Type
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {projectTypes.map((type) => {
                        const isSelected = formData.projectType === type;
                        return (
                          <button
                            type="button"
                            key={type}
                            onClick={() => setFormData({ ...formData, projectType: type })}
                            className={`px-3 py-2.5 rounded-xl font-mono text-xs transition-all text-left cursor-pointer ${
                              isSelected
                                ? "bg-[#E46F43] text-white font-bold shadow-md"
                                : "bg-black/40 text-[#B7B4AD] border border-white/10 hover:border-white/20"
                            }`}
                          >
                            {type}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Project Details */}
                  <div>
                    <label className="block font-mono text-xs uppercase text-slate-400 mb-2 tracking-wider">
                      Project Details *
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Briefly describe what you are building, target features, and timeline..."
                      className="w-full px-4 py-3.5 rounded-xl bg-black/50 border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-[#E46F43] font-sans text-sm transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl bg-[#F2EEE6] text-[#0C0D0D] font-mono text-xs font-black uppercase tracking-widest hover:bg-white transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? "SENDING DETAILS..." : "SEND PROJECT DETAILS"}</span>
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
