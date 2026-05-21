"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Mail, Copy, FileText, SendHorizontal } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("a.jaini@caltech.edu").then(() => {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSending(true);
    // Simulate sending message
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
      href: "https://github.com/akhil-jaini"
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
    { icon: <Mail className="w-4 h-4" />, label: "Email", href: "mailto:a.jaini@caltech.edu" },
  ];

  return (
    <section id="contact" className="py-24 px-6 relative overflow-hidden bg-background-secondary/10 z-0">
      
      {/* Section Heading (z-10) */}
      <div className="flex flex-col items-center text-center mb-16 z-10 relative select-none">
        <h2 className="font-display text-3xl sm:text-5xl font-semibold text-text-primary">
          Say Hello
        </h2>
        <div className="w-12 h-1 bg-accent-primary/40 mt-4 rounded-full" />
        <p className="text-text-secondary text-sm sm:text-base mt-3">
          I&apos;d love to hear from you
        </p>
      </div>

      {/* Drifting Clouds (z-20) — slightly more visible */}
      <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden select-none">
        <motion.div
          animate={{ x: ["-20%", "120%"] }}
          transition={{ repeat: Infinity, duration: 85, ease: "linear" }}
          className="absolute top-12 left-0 w-80 h-32 opacity-40 sm:opacity-55"
        >
          <svg className="w-full h-full text-background-secondary/30 fill-current filter blur-xl" viewBox="0 0 300 120">
            <path d="M 30 90 C 30 70, 60 60, 80 60 C 100 30, 160 20, 200 50 C 230 35, 270 50, 270 80 C 285 80, 295 90, 295 100 C 295 110, 30 110, 30 90 Z" />
          </svg>
        </motion.div>
        
        <motion.div
          animate={{ x: ["120%", "-20%"] }}
          transition={{ repeat: Infinity, duration: 105, ease: "linear" }}
          className="absolute bottom-16 right-0 w-[420px] h-36 opacity-30 sm:opacity-45"
        >
          <svg className="w-full h-full text-background-secondary/20 fill-current filter blur-2xl" viewBox="0 0 400 150">
            <path d="M 50 120 C 50 90, 90 80, 110 80 C 130 50, 210 40, 250 70 C 290 50, 350 70, 350 110 C 370 110, 390 120, 390 135 C 390 150, 50 150, 50 120 Z" />
          </svg>
        </motion.div>
      </div>

      {/* Main Interactive Content (z-30) */}
      <div className="max-w-7xl mx-auto z-30 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Brief details, copy email, socials */}
          <div className="lg:col-span-5 flex flex-col gap-6 text-left animate-fade-in-up">
            <h3 className="font-display text-2xl font-semibold text-text-primary">
              Reach out
            </h3>
            <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
              Have a question, an idea, or just want to chat? I&apos;d love to hear from you.
              Whether it&apos;s about research, code, or the night sky — drop me a message.
            </p>

            {/* Copy Email */}
            <div className="flex flex-col gap-2 mt-2">
              <span className="text-[10px] font-semibold text-text-secondary uppercase tracking-wider">
                Email me directly
              </span>
              <div className="flex items-center justify-between dreamcard p-3.5 rounded-2xl border border-card-border/60 max-w-sm group">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-accent-primary" />
                  <span className="text-xs font-semibold text-text-primary select-all">
                    a.jaini@caltech.edu
                  </span>
                </div>
                
                <button
                  onClick={handleCopyEmail}
                  className={`p-2 rounded-xl border transition-all duration-300 cursor-pointer active:scale-95 ${
                    copiedEmail
                      ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                      : "dreamcard border-card-border/60 text-text-secondary hover:bg-card-bg/25 hover:text-text-primary"
                  }`}
                  aria-label="Copy email to clipboard"
                >
                  {copiedEmail ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {/* Social links & CV */}
            <div className="flex flex-col gap-3 mt-2">
              <span className="text-[10px] font-semibold text-text-secondary uppercase tracking-wider">
                Find me elsewhere
              </span>
              <div className="flex flex-wrap items-center gap-4">
                {socials.map((soc) => (
                  <a
                    key={soc.label}
                    href={soc.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 text-xs font-semibold text-text-secondary hover:text-accent-primary transition-colors duration-300 cursor-pointer"
                  >
                    {soc.icon}
                    {soc.label}
                  </a>
                ))}
                
                {/* CV Download */}
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    alert("CV Download placeholder. File replacement will happen later!");
                  }}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-accent-primary/80 text-white text-xs font-semibold hover:bg-accent-primary transition-all duration-300 cursor-pointer active:scale-95"
                >
                  <FileText className="w-3.5 h-3.5" />
                  download cv
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="lg:col-span-7">
            <div className="dreamcard p-6 sm:p-8 rounded-3xl border border-card-border/40 relative">
              <form onSubmit={handleSubmit} className="flex flex-col gap-6 text-left">
                
                {/* Name */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="form-name" className="text-[10px] font-semibold uppercase tracking-wider text-text-secondary">
                    Your name
                  </label>
                  <input
                    id="form-name"
                    type="text"
                    required
                    disabled={isSending}
                    placeholder="What should I call you?"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-1 py-3 bg-transparent border-b border-card-border/60 focus:border-accent-primary/60 outline-none text-sm text-text-primary placeholder:text-text-secondary/30 transition-all duration-300"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="form-email" className="text-[10px] font-semibold uppercase tracking-wider text-text-secondary">
                    Your email
                  </label>
                  <input
                    id="form-email"
                    type="email"
                    required
                    disabled={isSending}
                    placeholder="Where can I reach you?"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-1 py-3 bg-transparent border-b border-card-border/60 focus:border-accent-primary/60 outline-none text-sm text-text-primary placeholder:text-text-secondary/30 transition-all duration-300"
                  />
                </div>

                {/* Message */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="form-message" className="text-[10px] font-semibold uppercase tracking-wider text-text-secondary">
                    Your message
                  </label>
                  <textarea
                    id="form-message"
                    rows={4}
                    required
                    disabled={isSending}
                    placeholder="What's on your mind?"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-1 py-3 bg-transparent border-b border-card-border/60 focus:border-accent-primary/60 outline-none text-sm text-text-primary placeholder:text-text-secondary/30 transition-all duration-300 resize-none"
                  />
                </div>

                {/* Send Button — warm solid, not gradient */}
                <button
                  type="submit"
                  disabled={isSending || isSent}
                  className={`w-full py-3.5 rounded-2xl text-sm font-semibold cursor-pointer active:scale-98 transition-all duration-500 flex items-center justify-center gap-2 ${
                    isSent
                      ? "bg-emerald-500/90 text-white"
                      : "bg-accent-primary/80 dark:bg-accent-primary/70 text-white hover:bg-accent-primary hover:shadow-md hover:shadow-accent-primary/10"
                  }`}
                >
                  <AnimatePresence mode="wait">
                    {isSending ? (
                      <motion.div
                        key="sending"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="flex items-center gap-2"
                      >
                        <div className="w-4 h-4 border-2 border-dashed border-white/60 rounded-full animate-spin" />
                        sending...
                      </motion.div>
                    ) : isSent ? (
                      <motion.div
                        key="sent"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0] }}
                        className="flex items-center gap-2"
                      >
                        <Check className="w-4 h-4" />
                        message sent!
                      </motion.div>
                    ) : (
                      <motion.div
                        key="idle"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.4 }}
                        className="flex items-center gap-2"
                      >
                        <SendHorizontal className="w-4 h-4" />
                        send message
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>

              </form>

              {/* Paper airplane success animation — slow, floaty, dreamy */}
              <AnimatePresence>
                {isSent && (
                  <motion.div
                    initial={{ x: -60, y: 60, opacity: 0, rotate: -40, scale: 0.4 }}
                    animate={{ 
                      x: [ -60, 30, 120, 280 ], 
                      y: [ 60, -10, -80, -200 ],
                      rotate: [-40, -20, -35, -25],
                      opacity: [0, 0.8, 0.9, 0], 
                      scale: [0.4, 1.0, 0.9, 0.3] 
                    }}
                    transition={{ duration: 3.5, ease: [0.25, 0.1, 0.25, 1.0] }}
                    className="absolute inset-0 pointer-events-none flex items-center justify-center"
                  >
                    <svg className="w-14 h-14 text-accent-primary fill-current filter drop-shadow-[0_0_12px_rgba(var(--accent-primary-rgb),0.3)]" viewBox="0 0 24 24">
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
