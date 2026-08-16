"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Journey", href: "#timeline" },
  { label: "Research", href: "#research" },
  { label: "Projects", href: "#projects" },
  { label: "Papers", href: "#publications" },
  { label: "Code", href: "#code" },
  { label: "Awards", href: "#awards" },
  { label: "Outreach", href: "#outreach" },
  { label: "Talks", href: "#talks-visits" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#hero");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Determine active section based on scroll position
      const scrollPosition = window.scrollY + 140;
      const sectionIds = navItems.map((item) => item.href.substring(1));

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(`#${id}`);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setActiveSection(href);
    const element = document.querySelector(href);
    if (element) {
      setMobileMenuOpen(false);
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-700 ${scrolled
          ? "py-3 bg-background/60 backdrop-blur-lg border-b border-card-border/60 shadow-sm"
          : "py-5 bg-transparent"
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo / Name */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, "#hero")}
            className="flex items-center gap-2 group cursor-pointer"
          >
            <span className="text-base select-none text-accent-primary" aria-hidden="true">✦</span>
            <span className="font-display font-semibold text-lg text-text-primary group-hover:text-accent-primary transition-colors duration-300">
              Akhil Jaini
            </span>
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-0.5 dreamcard px-3 py-1.5 rounded-full border border-card-border/60">
            {navItems.map((item) => {
              const isActive = activeSection === item.href;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`relative px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 select-none ${isActive
                    ? "text-text-primary font-bold drop-shadow-[0_0_10px_rgba(196,125,46,0.3)] dark:drop-shadow-[0_0_10px_rgba(124,184,228,0.4)]"
                    : "text-text-secondary hover:text-text-primary hover:bg-card-bg/30"
                    }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute -bottom-0.5 inset-x-2.5 h-[2px] rounded-full bg-accent-primary shadow-[0_0_8px_var(--accent-primary)]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Actions: Mobile Trigger & CV */}
          <div className="flex items-center gap-3">
            {/* CV link — warm, soft treatment */}
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, "#contact")}
              className="hidden sm:flex items-center text-xs font-semibold px-4 py-2 rounded-full bg-accent-primary/85 text-white hover:bg-accent-primary hover:shadow-md hover:shadow-accent-primary/20 transition-all duration-300 cursor-pointer active:scale-97"
            >
              CV
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-full dreamcard border border-card-border/60 hover:bg-card-bg/30 text-text-primary cursor-pointer active:scale-95 transition-all"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer — soft overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1.0] }}
            className="fixed inset-x-0 top-[72px] z-40 dreamcard backdrop-blur-xl border-b border-card-border/60 shadow-xl p-6 lg:hidden"
          >
            <nav className="flex flex-col gap-1.5">
              {navItems.map((item) => {
                const isActive = activeSection === item.href;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${isActive
                      ? "bg-accent-primary/15 text-accent-primary font-bold border border-accent-primary/25"
                      : "text-text-secondary hover:text-text-primary hover:bg-card-bg/30"
                      }`}
                  >
                    <span>{item.label}</span>
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-accent-primary shadow-[0_0_6px_var(--accent-primary)]" />}
                  </a>
                );
              })}
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, "#contact")}
                className="mt-2 text-center text-sm font-semibold py-3 rounded-xl bg-accent-primary/85 text-white hover:bg-accent-primary transition-all duration-300"
              >
                résumé
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
