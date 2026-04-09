import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { HiArrowNarrowRight, HiChatAlt2, HiMail } from "react-icons/hi";
import emailjs from "@emailjs/browser";
import {
  FaLinkedin,
  FaGithub,
  FaXTwitter,
  FaAws,
  FaShield,
} from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../lib/utils";
import {
  SiNextdotjs,
  SiPostgresql,
  SiTypescript,
  SiDocker,
  SiFigma,
  SiMongodb,
  SiExpress,
  SiReact,
  SiNodedotjs,
} from "react-icons/si";

import alaminImg from "../assets/3d_avatar.png";
import { CV_URL, USER_INFO } from "../constants";
import MagneticButton from "../components/MagneticButton";
import TextReveal from "../components/TextReveal";

const techStack = [
  { icon: SiNextdotjs, color: "#FFFFFF", name: "Next.js" },
  { icon: SiTypescript, color: "#3178C6", name: "TypeScript" },
  { icon: SiPostgresql, color: "#4169E1", name: "PostgreSQL" },
  { icon: SiMongodb, color: "#47A248", name: "MongoDB" },
  { icon: SiExpress, color: "#FFFFFF", name: "Express" },
  { icon: SiReact, color: "#61DAFB", name: "React" },
  { icon: SiNodedotjs, color: "#339933", name: "Node.js" },
  { icon: SiDocker, color: "#2496ED", name: "Docker" },
  { icon: FaAws, color: "#FF9900", name: "AWS" },
  { icon: FaShield, color: "#34D399", name: "Auth" },
  { icon: SiFigma, color: "#F24E1E", name: "UI/UX" },
];

const Hero = () => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const subtitleRef = useRef(null);
  const descRef = useRef(null);
  const bodyRef = useRef(null);
  const socialsRef = useRef(null);
  const ctaRef = useRef(null);
  const bottomCtaRef = useRef(null);

  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState("");

  const handleSayHi = async (e) => {
    e.preventDefault();
    if (isSending || status === "success") return;
    setIsSending(true);
    setStatus("");
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: "Portfolio Visitor",
          from_email: "anonymous@portfolio.com",
          name: "Portfolio Visitor",
          email: "anonymous@portfolio.com",
          title: "Say Hi",
          subject: "Say Hi",
          message: "Hello! Someone just clicked the 'Say Hi' button on your portfolio!",
          reply_to: "anonymous@portfolio.com"
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      setStatus("success");
      setTimeout(() => setStatus(""), 3000);
    } catch (err) {
      console.error(err);
      setStatus("error");
      setTimeout(() => setStatus(""), 3000);
    } finally {
      setIsSending(false);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(subtitleRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.6,
      })
        .from(descRef.current, { y: 20, opacity: 0, duration: 0.6 }, "-=0.3")
        .from(bodyRef.current, { y: 20, opacity: 0, duration: 0.6 }, "-=0.3")
        .fromTo(
          ".social-btn-wrapper",
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, stagger: 0.1, duration: 0.5 },
          "-=0.3",
        )
        .from(ctaRef.current, { y: 20, opacity: 0, duration: 0.5 }, "-=0.2")
        .from(
          imageRef.current,
          { scale: 0.8, opacity: 0, duration: 1, ease: "back.out(1.4)" },
          "-=0.8",
        );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative w-full min-h-[100svh] flex items-center justify-center overflow-hidden pt-20 bg-transparent"
    >
      <div
        className="glow-orb glow-orb-primary"
        style={{ width: 400, height: 400, top: "-10%", left: "-5%" }}
      />
      <div
        className="glow-orb glow-orb-accent"
        style={{ width: 300, height: 300, bottom: "10%", right: "-3%" }}
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, var(--color-overlay-gradient) 100%)",
        }}
      />

      <div className="relative z-10 max-w-7xl w-full px-6 md:px-12 grid md:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-20 items-center">
        {/* Left Column Wrapper */}
        <div className="flex flex-row items-center gap-4 md:gap-6 relative z-30">
          {/* Sidebar Icons */}
          <div
            ref={socialsRef}
            className="flex flex-col space-y-4 pt-8 shrink-0 z-100"
          >
            {[
              { icon: <FaGithub />, href: USER_INFO.github },
              { icon: <FaLinkedin />, href: USER_INFO.linkedin },
              { icon: <FaXTwitter />, href: USER_INFO.twitter },
              { icon: <HiMail />, href: "#contact", isContact: true },
            ].map((social, i) => (
              <div key={i} className="social-btn-wrapper">
                <a
                  href={social.href}
                  target={social.isContact ? "_self" : "_blank"}
                  rel={social.isContact ? "" : "noopener noreferrer"}
                  onClick={(e) => {
                    if (social.isContact) {
                      e.preventDefault();
                      const target = document.getElementById("contact");
                      if (target) {
                        window.scrollTo({
                          top: target.offsetTop,
                          behavior: "smooth",
                        });
                      }
                    }
                  }}
                  className={cn(
                    "w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-300 border border-white/5 shadow-lg",
                    social.isContact
                      ? "bg-primary/20 text-primary border-primary/30 hover:bg-primary/30"
                      : "bg-white/5 text-slate-400 hover:text-white hover:bg-white/10",
                    "hover:scale-110 active:scale-90",
                  )}
                >
                  <span className="text-[18px]">{social.icon}</span>
                </a>
              </div>
            ))}
          </div>

          {/* Text Content */}
          <div className="space-y-6 md:space-y-8 mt-10 md:mt-0 flex-1">
            <div>
              <TextReveal
                className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight opacity-40 uppercase"
                delay={0.2}
              >
                Hello.
              </TextReveal>
              <h2
                ref={subtitleRef}
                className="text-lg md:text-xl font-black mt-2 text-slate-300 uppercase tracking-widest pl-2 border-l-4 border-primary"
              >
                MERN, Next.js & PostgreSQL Developer
              </h2>
            </div>

            <div ref={descRef}>
              <h1 className="text-4xl md:text-6xl font-black text-white leading-[0.9] tracking-tighter mb-4 uppercase">
                MD. <span className="gradient-text">AL-AMIN</span>
              </h1>
              <p className="text-sm md:text-base font-bold bg-white/10 px-4 py-1.5 rounded-xl border border-white/10 inline-block text-primary uppercase tracking-[0.2em]">
                Senior Full Stack Engineer
              </p>
            </div>

            <p
              ref={bodyRef}
              className="text-xs md:text-base leading-relaxed max-w-xl text-slate-400 font-medium"
            >
              Architecting high-performance web systems with{" "}
              <span className="text-white border-b-2 border-primary/20">
                Next.js
              </span>{" "}
              &
              <span className="text-white border-b-2 border-accent/20 mx-2">
                MERN Stack
              </span>
              . Scaling robust serverless apps with{" "}
              <span className="text-white font-bold">Docker</span> &
              <span className="text-white font-bold px-1">AWS</span>{" "}
              infrastructure. Expert in{" "}
              <span className="text-white">TypeScript</span> and secure{" "}
              <span className="text-white font-bold">PostgreSQL</span>.
            </p>

            <div
              ref={ctaRef}
              className="pt-2 min-h-[80px] flex items-center relative"
            >
              <MagneticButton>
                <button
                  type="button"
                  onClick={handleSayHi}
                  disabled={isSending || status === "success"}
                  className="btn-glow !px-10 !py-5 uppercase tracking-widest text-sm font-black inline-flex items-center disabled:opacity-75 disabled:cursor-not-allowed"
                >
                  {status === "success"
                    ? "SENT!"
                    : isSending
                      ? "SENDING..."
                      : "SAY HI"}
                  {status === "success" ? null : (
                    <HiChatAlt2 className="text-xl ml-2" />
                  )}
                </button>
              </MagneticButton>
              {status === "error" && (
                <p className="absolute -bottom-6 text-rose-500 text-[10px] uppercase font-bold tracking-tighter">
                  Failed to send message
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Right Content Area */}
        <div
          className="relative flex justify-center items-center py-20 lg:py-0 w-full z-10"
          ref={imageRef}
        >
          <div className="relative z-20">
            <div
              className="absolute inset-0 rounded-full animate-pulse-glow"
              style={{
                background:
                  "radial-gradient(circle, rgba(99,102,241,0.4) 0%, transparent 70%)",
                transform: "scale(1.2)",
              }}
            />
            <div
              className="relative w-56 h-56 lg:w-80 lg:h-80 rounded-full p-[3px] overflow-hidden shadow-2xl"
              style={{
                background:
                  "linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899)",
              }}
            >
              <img
                src={alaminImg}
                alt={USER_INFO.name}
                className="w-full h-full rounded-full object-cover relative z-10 scale-[1.35] object-[15%_center]"
              />
            </div>
          </div>

          <div className="absolute top-1/2 left-1/2 w-0 h-0 flex items-center justify-center pointer-events-none z-10">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 120, ease: "linear" }}
              className="relative shrink-0 w-[280px] h-[280px] md:w-[400px] md:h-[400px] lg:w-[480px] lg:h-[480px] rounded-full border-[1.5px] border-dashed border-primary/10"
            >
              {techStack.map((tech, idx) => {
                const angleRad = (idx / techStack.length) * 2 * Math.PI;
                const x = 50 + 50 * Math.cos(angleRad - Math.PI / 2);
                const y = 50 + 50 * Math.sin(angleRad - Math.PI / 2);
                return (
                  <div
                    key={idx}
                    className="absolute w-10 h-10 md:w-16 md:h-16"
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    <motion.div
                      animate={{ rotate: -360 }}
                      transition={{
                        repeat: Infinity,
                        duration: 120,
                        ease: "linear",
                      }}
                      className="w-full h-full flex flex-col items-center justify-center rounded-2xl md:rounded-3xl pointer-events-auto hover:scale-[1.2] transition-transform duration-300 group relative shadow-xl"
                    >
                      <div className="absolute inset-0 rounded-2xl md:rounded-3xl border border-white/10 bg-slate-900/80 backdrop-blur-sm" />
                      <tech.icon
                        className="relative z-10 text-[20px] md:text-[28px]"
                        color={tech.color}
                      />
                    </motion.div>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
