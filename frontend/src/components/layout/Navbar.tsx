"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Orbit, Menu, X, ArrowUpRight } from "lucide-react";
import ThemeToggle from "src/components/ui/ThemeToggle";

const navItems = [
  { label: "Hero", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Timeline", href: "#timeline" },
  { label: "Research", href: "#research" },
  { label: "Publications", href: "#publications" },
  { label: "Code", href: "#code" },
  { label: "Outreach & Awards", href: "#others" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      setMobileMenuOpen(false);
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled
            ? "py-3 bg-background/55 backdrop-blur-md border-b border-card-border/80 shadow-lg"
            : "py-5 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo Brand */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, "#hero")}
            className="flex items-center gap-2.5 group cursor-pointer"
          >
            <div className="relative w-9 h-9 rounded-full bg-accent-primary/10 flex items-center justify-center border border-accent-primary/30 group-hover:border-accent-primary group-hover:scale-105 transition-all duration-300">
              <Orbit className="w-5 h-5 text-accent-primary animate-spin-slow group-hover:text-accent-secondary" />
            </div>
            <span className="font-space font-bold text-lg tracking-wide bg-gradient-to-r from-text-primary via-accent-primary to-accent-secondary bg-clip-text text-transparent">
              Cosmos.Voyager
            </span>
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1.5 glass px-4 py-1.5 rounded-full border border-card-border/80 shadow-md">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-text-secondary hover:text-text-primary hover:bg-card-bg/25 transition-all duration-200 uppercase tracking-widest"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Actions: Theme Toggle & Mobile Trigger */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            
            {/* CV Download CTA */}
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, "#contact")}
              className="hidden sm:flex items-center gap-1 text-xs font-bold uppercase tracking-widest px-4 py-2.5 rounded-full bg-gradient-to-r from-accent-primary to-accent-secondary text-white hover:shadow-lg hover:shadow-accent-primary/20 hover:scale-103 transition-all duration-300 active:scale-97 cursor-pointer"
            >
              CV
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-full glass border border-card-border hover:bg-card-bg/20 text-text-primary cursor-pointer active:scale-95 transition-all"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 top-[72px] z-40 bg-background/95 backdrop-blur-xl border-b border-card-border/80 shadow-2xl p-6 lg:hidden"
          >
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="px-4 py-3 rounded-xl text-sm font-semibold text-text-secondary hover:text-text-primary hover:bg-card-bg/40 transition-all uppercase tracking-widest"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, "#contact")}
                className="mt-2 text-center text-xs font-bold uppercase tracking-widest py-3.5 rounded-xl bg-gradient-to-r from-accent-primary to-accent-secondary text-white transition-all shadow-md"
              >
                Download CV
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
