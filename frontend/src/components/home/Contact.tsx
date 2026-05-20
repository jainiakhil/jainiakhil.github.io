"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Check, Mail, Copy, FileText, Globe, SendHorizontal } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("a.sharma@caltech.edu").then(() => {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSending(true);
    // Simulate sending telemetry
    setTimeout(() => {
      setIsSending(false);
      setIsSent(true);
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setIsSent(false), 5000);
    }, 2200);
  };

  const socials = [
    {
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" />
        </svg>
      ),
      label: "GitHub",
      href: "https://github.com/cosmos-engineer"
    },
    {
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
          <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      ),
      label: "LinkedIn",
      href: "https://linkedin.com"
    },
    { icon: <Mail className="w-4 h-4" />, label: "Email", href: "mailto:a.sharma@caltech.edu" },
  ];

  return (
    <section id="contact" className="py-24 px-6 relative overflow-hidden bg-background-secondary/10">
      <div className="max-w-7xl mx-auto z-10 relative">
        
        {/* Heading */}
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="font-space text-3xl sm:text-5xl font-extrabold text-text-primary tracking-tight">
            Establish Connection
          </h2>
          <div className="w-16 h-1.5 bg-gradient-to-r from-accent-primary to-accent-secondary mt-3 rounded-full" />
          <p className="text-text-secondary text-xs sm:text-sm font-semibold uppercase tracking-widest mt-3">
            Send Telemetry or Project Requests
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Brief details, copy email, socials */}
          <div className="lg:col-span-5 flex flex-col gap-6 text-left">
            <h3 className="font-space text-2xl font-extrabold text-text-primary">
              Mission Control
            </h3>
            <p className="text-sm sm:text-base text-text-secondary leading-relaxed font-medium">
              Have an interesting computational research project, deep learning problem, or open-source software opportunity? Or just want to discuss general relativity and fast radio bursts? Reach out! I am always open to collaborating with engineering teams, researchers, and scientific innovators.
            </p>

            {/* Quick Interactive Copy Email */}
            <div className="flex flex-col gap-2 mt-2">
              <span className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">
                Direct Telemetry Address
              </span>
              <div className="flex items-center justify-between glass p-3.5 rounded-2xl border border-card-border max-w-sm shadow-sm group">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-accent-primary" />
                  <span className="text-xs font-extrabold text-text-primary select-all">
                    a.sharma@caltech.edu
                  </span>
                </div>
                
                <button
                  onClick={handleCopyEmail}
                  className={`p-2 rounded-xl border transition-all cursor-pointer active:scale-95 ${
                    copiedEmail
                      ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                      : "glass border-card-border text-text-secondary hover:bg-card-bg/25 hover:text-text-primary"
                  }`}
                  aria-label="Copy email to clipboard"
                >
                  {copiedEmail ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {/* Social channels & CV */}
            <div className="flex flex-col gap-4 mt-2">
              <span className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">
                Stellar Networks & Dossiers
              </span>
              <div className="flex flex-wrap items-center gap-3">
                {socials.map((soc) => (
                  <a
                    key={soc.label}
                    href={soc.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-full glass border border-card-border text-xs font-bold text-text-secondary hover:text-text-primary hover:bg-card-bg/20 transition-all cursor-pointer active:scale-95"
                  >
                    {soc.icon}
                    {soc.label}
                  </a>
                ))}
                
                {/* CV PDF Download trigger */}
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    alert("CV Download placeholder. File replacement will happen later!");
                  }}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-accent-primary to-accent-secondary text-white text-xs font-bold hover:shadow-lg transition-all cursor-pointer active:scale-95"
                >
                  <FileText className="w-4 h-4" />
                  Download CV
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Telemetry Form */}
          <div className="lg:col-span-7">
            <div className="glass p-6 sm:p-8 rounded-3xl border border-card-border/80 shadow-xl relative">
              <form onSubmit={handleSubmit} className="flex flex-col gap-5 text-left">
                
                {/* Name */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="form-name" className="text-[10px] font-bold uppercase tracking-widest text-text-secondary">
                    Callsign / Full Name
                  </label>
                  <input
                    id="form-name"
                    type="text"
                    required
                    disabled={isSending}
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-background-secondary/15 border border-card-border/80 focus:border-accent-primary/60 outline-none text-xs font-semibold text-text-primary placeholder:text-text-secondary/40 transition-all"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="form-email" className="text-[10px] font-bold uppercase tracking-widest text-text-secondary">
                    Return Telemetry Address / Email
                  </label>
                  <input
                    id="form-email"
                    type="email"
                    required
                    disabled={isSending}
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-background-secondary/15 border border-card-border/80 focus:border-accent-primary/60 outline-none text-xs font-semibold text-text-primary placeholder:text-text-secondary/40 transition-all"
                  />
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="form-message" className="text-[10px] font-bold uppercase tracking-widest text-text-secondary">
                    Message Transmission
                  </label>
                  <textarea
                    id="form-message"
                    rows={4}
                    required
                    disabled={isSending}
                    placeholder="Type your message..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-background-secondary/15 border border-card-border/80 focus:border-accent-primary/60 outline-none text-xs font-semibold text-text-primary placeholder:text-text-secondary/40 transition-all resize-none"
                  />
                </div>

                {/* Send Button */}
                <button
                  type="submit"
                  disabled={isSending || isSent}
                  className={`w-full py-4 rounded-2xl text-xs sm:text-sm font-bold uppercase tracking-widest cursor-pointer shadow-lg active:scale-98 transition-all duration-300 flex items-center justify-center gap-2 ${
                    isSent
                      ? "bg-emerald-500 text-white shadow-emerald-500/20"
                      : "bg-gradient-to-r from-accent-primary to-accent-secondary text-white shadow-accent-primary/20 hover:shadow-xl hover:scale-101"
                  }`}
                >
                  <AnimatePresence mode="wait">
                    {isSending ? (
                      <motion.div
                        key="sending"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2"
                      >
                        <div className="w-4 h-4 border-2 border-dashed border-white rounded-full animate-spin" />
                        Transmitting Telemetry...
                      </motion.div>
                    ) : isSent ? (
                      <motion.div
                        key="sent"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2"
                      >
                        <Check className="w-4 h-4" />
                        Transmission Complete!
                      </motion.div>
                    ) : (
                      <motion.div
                        key="idle"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center gap-2"
                      >
                        <SendHorizontal className="w-4 h-4" />
                        Send Message
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>

              </form>

              {/* Float paper airplane success decoration */}
              <AnimatePresence>
                {isSent && (
                  <motion.div
                    initial={{ x: -100, y: 100, opacity: 0, scale: 0.2 }}
                    animate={{ x: 250, y: -250, opacity: [0, 1, 1, 0], scale: [0.5, 1.2, 1, 0.4] }}
                    transition={{ duration: 2.2, ease: "easeOut" }}
                    className="absolute inset-0 pointer-events-none flex items-center justify-center"
                  >
                    <svg className="w-16 h-16 text-accent-primary fill-current" viewBox="0 0 24 24">
                      <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                    </svg>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
