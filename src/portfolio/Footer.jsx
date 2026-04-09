import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaXTwitter, FaHeart } from "react-icons/fa6";
import { HiArrowUp } from "react-icons/hi";
import { USER_INFO } from "../constants";
import MagneticButton from "../components/MagneticButton";
import { cn } from "../lib/utils";

const footerLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
];

const socialLinks = [
  { icon: <FaGithub />, href: USER_INFO.github, name: "GitHub" },
  { icon: <FaLinkedin />, href: USER_INFO.linkedin, name: "LinkedIn" },
  { icon: <FaXTwitter />, href: USER_INFO.twitter, name: "X" },
];

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative w-full py-16 px-6 md:px-12 border-t border-white/5 bg-[#020617]/50 backdrop-blur-md overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center mb-16">
          {/* Brand Column */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-primary font-black text-lg">
                AL
              </div>
              <span className="text-xl font-black text-white uppercase tracking-widest">
                MD. AL-AMIN
              </span>
            </div>
            <p className="text-sm text-slate-500 font-medium text-center md:text-left max-w-xs leading-relaxed">
              MERN Stack & Next.js specialist architecting the next generation of scalable, human-centered web applications.
            </p>
          </div>

          {/* Quick Links Column */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
            {footerLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-bold text-slate-400 hover:text-white transition-colors duration-300 uppercase tracking-widest"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector(link.href)?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Social Links & Back to Top */}
          <div className="flex flex-col items-center md:items-end space-y-6">
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <MagneticButton key={social.name}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-all duration-300 text-xl"
                    title={social.name}
                  >
                    {social.icon}
                  </a>
                </MagneticButton>
              ))}
            </div>
            
            <MagneticButton>
              <button
                onClick={scrollToTop}
                className="flex items-center gap-2 group text-xs font-black uppercase tracking-[0.2em] text-slate-500 hover:text-primary transition-colors duration-300"
              >
                Return To Top
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 group-hover:border-primary/50 group-hover:bg-primary/10 transition-all">
                  <HiArrowUp className="text-sm" />
                </div>
              </button>
            </MagneticButton>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-[11px] text-slate-500 font-bold uppercase tracking-[0.25em] flex items-center gap-2">
            © {new Date().getFullYear()} MD. AL-AMIN <span className="text-slate-700">|</span> DESIGNED & DEVELOPED WITH <FaHeart className="text-rose-500 animate-pulse" />
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
               <span className="text-[10px] uppercase font-black tracking-widest text-slate-400">Built with:</span>
               <div className="text-xs font-bold text-slate-300">REACT / GSAP / NEXT.JS</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
