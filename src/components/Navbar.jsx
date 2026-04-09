import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "../lib/utils";
import { ThemeToggle } from "./ThemeToggle";

const navItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 },
    );
    const sections = document.querySelectorAll("section[id]");
    sections.forEach((s) => observer.observe(s));
    return () => sections.forEach((s) => observer.unobserve(s));
  }, []);

  const handleHireMe = (e) => {
    e.preventDefault();
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      window.scrollTo({
        top: contactSection.offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] md:w-[85%] lg:w-[66%] max-w-7xl"
    >
      {/* Outer gradient border wrapper */}
      <div
        className={cn(
          "rounded-full px-2 py-1 transition-all duration-700 ease-out",
          scrolled
            ? "shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
            : "shadow-[0_15px_40px_rgba(0,0,0,0.3)]",
        )}
        style={{
          background: scrolled
            ? "linear-gradient(135deg, rgba(30,41,59,0.9), rgba(59,130,246,0.5), rgba(0,0,0,0.9))"
            : "linear-gradient(135deg, rgba(30,41,59,0.6), rgba(59,130,246,0.4), rgba(0,0,0,0.6))",
        }}
      >
        {/* Inner Nav Container - Small, tight padding on left/right for Logo & Button */}
        <div
          className={cn(
            "flex items-center justify-between rounded-full transition-all duration-700",
            "px-6 md:px-8 py-1 md:py-2",
            "backdrop-blur-2xl",
          )}
          style={{
            background:
              "linear-gradient(135deg, rgba(15,23,42,0.95) 0%, rgba(31,41,55,0.85) 45%, rgba(14,23,38,0.95) 100%)",
          }}
        >
          {/* Logo Area */}
          <a
            href="#home"
            className="flex items-center gap-3 shrink-0 group relative z-10"
          >
            <div className="relative">
              <div className="absolute -inset-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl bg-primary/30" />
              <div className="relative w-11 h-11 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl group-hover:border-primary/50 transition-all duration-500 group-hover:rotate-[15deg]">
                <span className="text-transparent bg-clip-text bg-gradient-to-br from-white to-primary font-black text-xl tracking-tighter">
                  AL
                </span>
              </div>
            </div>
            <div className="hidden xl:flex flex-col -gap-1">
              <span className="text-[15px] font-black text-white uppercase tracking-[0.2em] group-hover:text-primary transition-colors duration-300">
                Al-Amin
              </span>
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.3em]">
                Full Stack Developer
              </span>
            </div>
          </a>

          {/* Desktop Nav Links - Centered */}
          <div className="hidden lg:flex items-center justify-center flex-1 gap-1 xl:gap-3 z-10">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  const target = document.querySelector(item.href);
                  if (target) {
                    window.scrollTo({
                      top: target.offsetTop,
                      behavior: "smooth",
                    });
                  }
                }}
                className={cn(
                  "relative px-2 py-1.5 text-[14px] uppercase tracking-widest font-bold rounded-full transition-all duration-300",
                  activeSection === item.href.replace("#", "")
                    ? "text-white"
                    : "text-slate-400 hover:text-white hover:bg-white/5",
                )}
              >
                {activeSection === item.href.replace("#", "") && (
                  <motion.div
                    layoutId="activePillDesktop"
                    className="absolute inset-0 rounded-full"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(59,130,246,0.2), rgba(30,58,138,0.3))",
                      border: "1px solid rgba(59,130,246,0.4)",
                      boxShadow: "0 0 20px rgba(59,130,246,0.15)",
                    }}
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10 drop-shadow-sm">
                  {item.name}
                </span>
              </a>
            ))}
          </div>

          {/* Right Actions - aligned tight to right edge */}
          <div className="flex items-center justify-end gap-3 md:gap-4 shrink-0 z-10 w-[90px] md:w-[150px] lg:w-[180px]">
            <div className="hidden sm:block">
              <ThemeToggle />
            </div>

            {/* Hire Me Button - neatly padded inside container */}
            <button
              onClick={handleHireMe}
            className="relative hidden md:flex items-center justify-center px-5 py-2 rounded-full text-[13px] uppercase tracking-widest font-bold text-white overflow-hidden transition-all duration-500 hover:scale-[1.03] active:scale-95 group shadow-[0_4px_15px_rgba(30,58,138,0.5)]"
              style={{
                background:
                  "linear-gradient(135deg, #0f172a 0%, #1e40af 50%, #1e3a8a 100%)",
                border: "1px solid rgba(96,165,250,0.5)",
              }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 50%, rgba(255,255,255,0.05) 100%)",
                }}
              />
              <span className="relative z-10 whitespace-nowrap">Hire Me</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full text-slate-300 hover:text-white transition-colors border border-white/10 bg-white/5 shadow-lg"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0, y: -10 }}
            animate={{ height: "auto", opacity: 1, y: 0 }}
            exit={{ height: 0, opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden mt-4 overflow-hidden"
          >
            <div
              className="rounded-[32px] p-6 flex flex-col gap-3 mx-auto w-full md:w-[85%]"
              style={{
                background:
                  "linear-gradient(180deg, rgba(15,23,42,0.98), rgba(2,6,23,0.98))",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(59,130,246,0.25)",
                boxShadow: "0 40px 80px rgba(0,0,0,0.7)",
              }}
            >
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    setMobileOpen(false);
                    const target = document.querySelector(item.href);
                    if (target) {
                      window.scrollTo({
                        top: target.offsetTop,
                        behavior: "smooth",
                      });
                    }
                  }}
                  className={cn(
                    "px-6 py-4 text-[15px] uppercase tracking-widest font-bold rounded-[20px] transition-all duration-300",
                    activeSection === item.href.replace("#", "")
                      ? "bg-blue-500/15 text-blue-400 border border-blue-500/20"
                      : "text-slate-300 hover:bg-white/5 hover:text-white",
                  )}
                >
                  {item.name}
                </a>
              ))}
              <div className="flex flex-col gap-4 mt-4 pt-4 border-t border-white/10">
                <div className="flex justify-between items-center px-4 py-2">
                  <span className="text-[14px] font-bold text-slate-400 uppercase tracking-widest">
                    Theme
                  </span>
                  <div className="p-1">
                    <ThemeToggle />
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    handleHireMe(e);
                    setMobileOpen(false);
                  }}
                  className="w-full py-4 rounded-[20px] text-[16px] uppercase tracking-widest font-bold text-white shadow-2xl mt-1 border border-blue-500/40"
                  style={{
                    background: "linear-gradient(135deg, #1e3a8a, #2563eb)",
                  }}
                >
                  Hire Me
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
