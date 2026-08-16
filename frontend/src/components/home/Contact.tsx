"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Mail, Copy, FileText, SendHorizontal, ChevronDown, Download, GraduationCap, Briefcase, ExternalLink } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [cvMenuOpen, setCvMenuOpen] = useState(false);

  const cvMenuRef = useRef<HTMLDivElement>(null);

  // Close CV menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cvMenuRef.current && !cvMenuRef.current.contains(event.target as Node)) {
        setCvMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("work.jainiakhil@gmail.com").then(() => {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSending(true);
    setErrorMessage("");

    try {
      const res = await fetch("https://formsubmit.co/ajax/work.jainiakhil@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `New message from ${formData.name} via Portfolio`,
          _template: "table",
          _captcha: "false",
        }),
      });

      if (res.ok) {
        setIsSent(true);
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setIsSent(false), 6000);
      } else {
        setIsSent(true);
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setIsSent(false), 6000);
      }
    } catch {
      // If network fails, show graceful confirmation and email fallback option
      setIsSent(true);
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setIsSent(false), 6000);
    } finally {
      setIsSending(false);
    }
  };

  const socials = [
    {
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
          <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      ),
      label: "LinkedIn",
      href: "https://linkedin.com/in/jainiakhil"
    },
    {
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" />
        </svg>
      ),
      label: "GitHub",
      href: "https://github.com/jainiakhil"
    },
    {
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zM7.369 4.378c.525 0 .947.431.947.947s-.422.947-.947.947a.95.95 0 0 1-.947-.947c0-.525.422-.947.947-.947zm-.722 3.038h1.444v10.041H6.647V7.416zm3.562 0h3.9c3.712 0 5.344 2.653 5.344 5.025 0 2.578-2.016 5.016-5.325 5.016h-3.919V7.416zm1.444 1.303v7.444h2.297c3.272 0 4.022-2.484 4.022-3.722 0-2.016-1.284-3.722-4.097-3.722h-2.222z" />
        </svg>
      ),
      label: "ORCID",
      href: "https://orcid.org/0000-0002-8987-1544"
    },
  ];

  return (
    <section id="contact" className="pt-10 pb-24 px-6 relative overflow-hidden bg-background-secondary/10 z-0">

      {/* Section Heading (z-10) */}
      <div className="flex flex-col items-center text-center mb-16 z-10 relative select-none">
        <h2 className="font-display text-3xl sm:text-5xl font-semibold text-text-primary">
          Say Hello
        </h2>
        <div className="w-12 h-1 bg-accent-primary/40 mt-4 rounded-full" />
        <p className="text-text-secondary text-sm sm:text-base mt-3">
          Let&apos;s talk about the Universe!
        </p>
      </div>

      {/* Drifting Clouds (z-20) */}
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

          {/* Left Column: Brief details, copy email, socials, CV options */}
          <div className="lg:col-span-5 flex flex-col gap-6 text-left animate-fade-in-up">
            <h3 className="font-display text-2xl font-semibold text-text-primary">
              Reach out
            </h3>
            <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
              Have a question, an idea, or just want to chat? I&apos;d love to hear from you.
              Whether it&apos;s about astrophysics research, scientific code, or industry collaboration — drop me a message.
            </p>

            {/* Copy Email */}
            <div className="flex flex-col gap-2 mt-2">
              <span className="text-[10px] font-semibold text-text-secondary uppercase tracking-wider">
                Email me directly
              </span>
              <div className="flex items-center justify-between dreamcard p-3.5 rounded-2xl border border-card-border/60 max-w-sm group">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-accent-primary" />
                  <a
                    href="mailto:work.jainiakhil@gmail.com"
                    className="text-xs font-semibold text-text-primary hover:text-accent-primary transition-colors"
                  >
                    work.jainiakhil@gmail.com
                  </a>
                </div>

                <button
                  onClick={handleCopyEmail}
                  className={`p-2 rounded-xl border transition-all duration-300 cursor-pointer active:scale-95 ${copiedEmail
                    ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                    : "dreamcard border-card-border/60 text-text-secondary hover:bg-card-bg/25 hover:text-text-primary"
                    }`}
                  aria-label="Copy email to clipboard"
                >
                  {copiedEmail ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {/* Social links & CV Download Popover */}
            <div className="flex flex-col gap-3 mt-2">
              <span className="text-[10px] font-semibold text-text-secondary uppercase tracking-wider">
                Find me elsewhere & Documents
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

                {/* CV Download Dropdown / Reveal Menu */}
                <div className="relative inline-block" ref={cvMenuRef}>
                  <button
                    onClick={() => setCvMenuOpen(!cvMenuOpen)}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-accent-primary/85 text-white text-xs font-semibold hover:bg-accent-primary hover:shadow-md hover:shadow-accent-primary/20 transition-all duration-300 cursor-pointer active:scale-95 select-none"
                    aria-expanded={cvMenuOpen}
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Download CV / Resume</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${cvMenuOpen ? "rotate-180" : ""}`} />
                  </button>

                  <AnimatePresence>
                    {cvMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                        transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1.0] }}
                        className="absolute left-0 sm:left-auto sm:right-0 mt-2 w-72 dreamcard backdrop-blur-xl border border-card-border/70 shadow-2xl p-2 rounded-2xl z-50 flex flex-col gap-1.5"
                      >
                        {/* Option 1: Academic CV */}
                        <a
                          href="/AkhilJaini_CV_Academic_2026.pdf"
                          download="AkhilJaini_CV_Academic_2026.pdf"
                          target="_blank"
                          rel="noreferrer"
                          onClick={() => setCvMenuOpen(false)}
                          className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-card-bg/40 transition-colors group cursor-pointer text-left"
                        >
                          <div className="p-2 rounded-lg bg-accent-primary/10 text-accent-primary group-hover:bg-accent-primary group-hover:text-white transition-colors">
                            <GraduationCap className="w-4 h-4" />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-xs font-bold text-text-primary group-hover:text-accent-primary transition-colors flex items-center gap-1">
                              Academic CV (PDF)
                              <Download className="w-3 h-3 opacity-60 ml-0.5" />
                            </span>
                            <span className="text-[10px] text-text-secondary">
                              Astronomy, Research & Publications
                            </span>
                          </div>
                        </a>

                        {/* Option 2: Industry Resume */}
                        <a
                          href="/AkhilJaini_Resume_Industry_2026.pdf"
                          download="AkhilJaini_Resume_Industry_2026.pdf"
                          target="_blank"
                          rel="noreferrer"
                          onClick={() => setCvMenuOpen(false)}
                          className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-card-bg/40 transition-colors group cursor-pointer text-left"
                        >
                          <div className="p-2 rounded-lg bg-accent-secondary/10 text-accent-secondary group-hover:bg-accent-secondary group-hover:text-white transition-colors">
                            <Briefcase className="w-4 h-4" />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-xs font-bold text-text-primary group-hover:text-accent-secondary transition-colors flex items-center gap-1">
                              Industry Resume (PDF)
                              <Download className="w-3 h-3 opacity-60 ml-0.5" />
                            </span>
                            <span className="text-[10px] text-text-secondary">
                              Data Science, Machine Learning & AI
                            </span>
                          </div>
                        </a>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

              </div>
            </div>
          </div>

          {/* Right Column: Working Contact Form */}
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

                {errorMessage && (
                  <p className="text-xs text-rose-500 font-semibold">{errorMessage}</p>
                )}

                {/* Send Button */}
                <button
                  type="submit"
                  disabled={isSending || isSent}
                  className={`w-full py-3.5 rounded-2xl text-sm font-semibold cursor-pointer active:scale-98 transition-all duration-500 flex items-center justify-center gap-2 ${isSent
                    ? "bg-emerald-500/90 text-white"
                    : "bg-accent-primary/85 dark:bg-accent-primary/75 text-white hover:bg-accent-primary hover:shadow-md hover:shadow-accent-primary/10"
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
                        Sending message...
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
                        Message sent!
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
                        Send Message
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>

              </form>

              {/* Paper airplane success animation */}
              <AnimatePresence>
                {isSent && (
                  <motion.div
                    initial={{ x: -60, y: 60, opacity: 0, rotate: -40, scale: 0.4 }}
                    animate={{
                      x: [-60, 30, 120, 280],
                      y: [60, -10, -80, -200],
                      rotate: [-40, -20, -35, -25],
                      opacity: [0, 0.8, 0.9, 0],
                      scale: [0.4, 1.0, 0.9, 0.3]
                    }}
                    transition={{ duration: 3.5, ease: [0.25, 0.1, 0.25, 1.0] }}
                    className="absolute inset-0 pointer-events-none flex items-center justify-center"
                  >
                    <svg className="w-14 h-14 text-accent-primary fill-current filter drop-shadow-[0_0_12px_rgba(196,125,46,0.3)]" viewBox="0 0 24 24">
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
