import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import SkillBridge from "../assets/SkillBridge.png";
import Domexis from "../assets/Domexis.png";
import DishDrop from "../assets/DishDrop.png";
import GardeningHub from "../assets/Gardening Hub.jpeg";
import FoodSharing from "../assets/Food Sharing.jpeg";
import EnglishDictionary from "../assets/English Dictionary.jpeg";
import TextReveal from "../components/TextReveal";

gsap.registerPlugin(ScrollTrigger);

const allProjects = [
  {
    title: "SkillBridge",
    description:
      "A full-stack marketplace & workflow automation platform featuring Next.js (App Router) with SSR for public pages, drag-and-drop Cloudinary file uploads, secure Zod validations, and automated Stripe webhooks.",
    image: SkillBridge,
    liveLink: "http://skillbridge-client-delta.vercel.app/",
    githubLink: "https://github.com/alamin-87/SkillBridge-client",
    serverLink: "https://github.com/alamin-87/SkillBridge-server",
    tag: "Next.js + Stripe",
    year: "2025",
    techStack: "Next.js 16 · TypeScript · React 19 · Tailwind CSS 4 · Node.js · Express.js · PostgreSQL · Prisma · Firebase Auth · Cloudinary · Stripe · React Hook Form · Zod",
    features: [
      "Built the entire frontend in Next.js with App Router - SSR for public pages, client components for dashboards - using React Hook Form and Zod for validation on every form: sign up, profile edit, session booking, and payment. Client-side errors surface instantly; server errors map back cleanly to the right field.",
      "Handled file uploads through Cloudinary - tutors upload profile photos and assignment PDFs via a drag-and-drop component with client-side file type and size validation before anything hits the server.",
      "Wired Stripe webhooks to automate post-payment work: confirmation emails via Nodemailer, meeting link creation, and tutor earnings updates - no manual steps required after checkout.",
      "Deployed frontend on Vercel and backend on Render with environment-separated configs; wrote Prisma migrations as the schema evolved so no data was ever lost during iteration."
    ]
  },
  {
    title: "Domexis",
    description:
      "An AI-powered conversational portal and management system featuring a 4-tier RBAC system, real-time Gemini 2.0 chatbot injecting live MongoDB property data, and compound indexes for fast queries.",
    image: Domexis,
    liveLink: "https://buildingmanagement-app.netlify.app/",
    githubLink: "https://github.com/alamin-87/Domexios-client-site",
    serverLink: "https://github.com/alamin-87/Domexios-server-site",
    tag: "React + Gemini AI",
    year: "2025",
    techStack: "React 19 · Vite · JavaScript · TypeScript · Tailwind CSS · Node.js · Express.js · MongoDB · Firebase Admin SDK · Gemini 2.0 · Cloudinary · GSAP · Framer Motion · Stripe",
    features: [
      "Designed and implemented a 4-tier RBAC system (Guest, User, Member, Admin) with Firebase Admin SDK token verification on every protected Express.js endpoint - a User token cannot reach an Admin route even if someone tries to force it.",
      "Built a real-time AI chatbot by connecting Google Gemini 2.0 Flash through a REST endpoint that injects live MongoDB property data into the prompt - residents get accurate, property-specific answers rather than generic AI responses.",
      "Optimized MongoDB queries with compound indexes on the most-queried collections; dashboard load times dropped noticeably and Lighthouse performance scores improved across mobile and desktop. TanStack Query v5 caching handles stale data gracefully without over-fetching."
    ]
  },
  {
    title: "DishDrop",
    description:
      "A solo-built MERN community food sharing platform with JWT auth stored in HTTP-only cookies, Axios interceptor request injection, and MongoDB indexes cutting API response times by 40%.",
    image: DishDrop,
    liveLink: "https://food-sharing.netlify.app/",
    githubLink: "https://github.com/alamin-87/food-sharing-client-site",
    serverLink: "https://github.com/alamin-87/food-sharing-server-site",
    tag: "MERN Stack",
    year: "2024",
    techStack: "React.js · JavaScript · Node.js · Express.js · MongoDB · Firebase Auth · JWT · Tailwind CSS · React Hook Form · Netlify · Render",
    features: [
      "Shipped the full platform solo: React frontend with React Hook Form for listing creation and edit flows, a Node.js/Express.js REST API, and MongoDB Atlas - from first commit to live deployment in a few weeks.",
      "JWT tokens stored in HTTP-only cookies; Axios interceptors attach the token on every request automatically, so protected routes work consistently without repeating auth logic across components. MongoDB indexes on status and date fields cut API response times by around 40%."
    ]
  },
  // Duplicating for pagination demo (as per user request)
  {
    title: "Community Connect",
    description:
      "A platform for local communities to organize events and share resources efficiently.",
    image: GardeningHub,
    liveLink: "https://gardening-hub.netlify.app/",
    githubLink: "https://github.com/alamin-87/b11a10-client-site",
    serverLink:"https://github.com/alamin-87/gardening-server-store",
    tag: "Prisma + SQL",
  },
  {
    title: "Eco Tracker",
    description:
      "Monitor your carbon footprint and get suggestions for a greener lifestyle.",
    image: FoodSharing,
    liveLink: "https://food-sharing.netlify.app/",
    githubLink: "https://github.com/alamin-87/food-sharing-client-site",
    serverLink:"https://github.com/alamin-87/food-sharing-server-site",
    tag: "Sustainability",
  },
  {
    title: "Swift Learn",
    description:
      "An interactive code learning platform for modern web developers.",
    image: EnglishDictionary,
    liveLink: "#",
    githubLink: "#",
    tag: "Education",
  },
  {
    title: "PortfoGen",
    description:
      "Automatically generate professional portfolios from your GitHub profile.",
    image: GardeningHub,
    liveLink: "#",
    githubLink: "#",
    tag: "Tool",
  },
  {
    title: "Health Sync",
    description:
      "Sync your health data across multiple devices and get AI-driven insights.",
    image: FoodSharing,
    liveLink: "#",
    githubLink: "#",
    tag: "HealthTech",
  },
  {
    title: "Task Master",
    description:
      "A high-performance task management system for large remote teams.",
    image: EnglishDictionary,
    liveLink: "#",
    githubLink: "#",
    tag: "Productivity",
  },
];

const Projects = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 3;
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  const totalPages = Math.ceil(allProjects.length / projectsPerPage);
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = allProjects.slice(
    indexOfFirstProject,
    indexOfLastProject,
  );

  useEffect(() => {
    // Reset triggers on page change
    ScrollTrigger.refresh();

    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, idx) => {
        if (!card) return;

        gsap.fromTo(
          card,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power3.out",
            delay: idx * 0.1,
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          },
        );

        // Re-apply tilt listeners
        const handleMove = (e) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          gsap.to(card, {
            rotateY: (x - rect.width / 2) / 15,
            rotateX: -(y - rect.height / 2) / 15,
            scale: 1.02,
            duration: 0.4,
          });
        };
        const handleLeave = () =>
          gsap.to(card, {
            rotateY: 0,
            rotateX: 0,
            scale: 1,
            duration: 0.8,
            ease: "elastic.out(1, 0.3)",
          });

        card.addEventListener("mousemove", handleMove);
        card.addEventListener("mouseleave", handleLeave);
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [currentPage]);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({
      top: sectionRef.current.offsetTop - 100,
      behavior: "smooth",
    });
  };

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative pt-24 pb-2 px-4 md:px-12 overflow-hidden"
      style={{ background: "transparent" }}
    >
      <div
        className="glow-orb glow-orb-primary"
        style={{
          width: 400,
          height: 400,
          top: "50%",
          left: "-10%",
          transform: "translateY(-50%)",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <TextReveal as="h2" className="section-heading" useScrollTrigger>
          My Projects
        </TextReveal>
        <div className="section-line" />

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          {currentProjects.map((project, idx) => (
            <div
              key={`${currentPage}-${idx}`}
              ref={(el) => (cardsRef.current[idx] = el)}
              className="glass-card flex flex-col group shadow-2xl transition-all duration-700 relative overflow-hidden"
            >
              <div className="h-56 overflow-hidden relative">
                <img
                  src={project.image}
                  alt={project.title}
                  className="project-img w-full h-[120%] object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to bottom, transparent 30%, rgba(2, 6, 23, 0.95) 100%)",
                    opacity: 0.9,
                  }}
                />
                <span className="absolute top-6 left-6 px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-xl bg-primary/10 text-primary border border-primary/20 backdrop-blur-xl z-10 group-hover:opacity-0 transition-opacity duration-300">
                  {project.tag}
                </span>
              </div>

              {/* Hover Details Overlay (Covers Entire Card) */}
              <div className="absolute inset-0 bg-slate-900 opacity-0 group-hover:opacity-100 transition-all duration-500 z-20 pointer-events-none group-hover:pointer-events-auto flex flex-col p-6 pb-24 shadow-[inset_0_0_100px_rgba(0,0,0,0.5)]">
                
                {/* Fixed Header */}
                <div className="flex-shrink-0">
                  {project.year && (
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-sm font-bold text-white tracking-widest uppercase">Tech Stack</span>
                      <span className="text-xs font-black text-primary bg-primary/10 px-3 py-1.5 rounded-md border border-primary/20">{project.year}</span>
                    </div>
                  )}

                  {project.techStack && (
                    <p className="text-sm font-medium text-slate-200 leading-relaxed mb-5 pb-4 border-b border-slate-700">
                      {project.techStack}
                    </p>
                  )}
                </div>

                {/* Scrollable Features */}
                <div className="flex-1 overflow-y-auto min-h-0 pr-3 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-slate-800 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:bg-slate-400 hover:[&::-webkit-scrollbar-thumb]:bg-slate-300 [&::-webkit-scrollbar-thumb]:rounded-full [scrollbar-width:thin] [scrollbar-color:#94a3b8_#1e293b]">
                  {project.features && project.features.length > 0 ? (
                    <ul className="text-white text-sm space-y-5 list-none pb-4">
                      {project.features.map((feature, i) => (
                        <li key={i} className="flex gap-3 leading-relaxed">
                          <span className="text-primary mt-1.5 text-[10px] flex-shrink-0">▶</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <p className="text-slate-400 text-sm font-medium tracking-wide">Explore Project</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-4 flex flex-col justify-between flex-grow">
                <div className="relative z-10 transition-opacity duration-300 group-hover:opacity-0">
                  <h3 className="text-2xl font-black mb-3 tracking-tight text-white">
                    {project.title}
                  </h3>
                  <p className="text-sm leading-relaxed mb-8 text-slate-400 tracking-wide">
                    {project.description}
                  </p>
                </div>
                <div className="flex items-center gap-4 mt-auto relative z-30">
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-glow text-[10px] tracking-[0.2em] p-2"
                  >
                    LIVE <FaExternalLinkAlt className="text-xs" />
                  </a>

                  {project.githubLink && (
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noreferrer"
                      className="p-3 rounded-xl flex items-center justify-center border border-white/10 bg-white/5 hover:bg-white/10 text-white hover:text-primary hover:border-primary transition-all duration-300"
                      title="Client Portfolio"
                    >
                      <FaGithub className="text-xl" />
                    </a>
                  )}

                  {project.serverLink && (
                    <a
                      href={project.serverLink}
                      target="_blank"
                      rel="noreferrer"
                      className="w-12 h-12 rounded-xl flex items-center justify-center border border-white/10 bg-white/5 hover:bg-white/10 text-white hover:text-primary hover:border-primary transition-all duration-300"
                      title="Server Portfolio"
                    >
                      <FaGithub className="text-xl" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Functional Pagination */}
        <div className="mt-20 flex flex-col items-center gap-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 border border-white/5 text-white ${currentPage === 1 ? "opacity-20 cursor-not-allowed" : "bg-white/5 hover:border-primary/40 hover:bg-primary/5 active:scale-95"}`}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <div className="flex gap-3">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => handlePageChange(i + 1)}
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 font-bold text-sm ${currentPage === i + 1 ? "bg-primary text-white shadow-[0_10px_25px_rgba(99,102,241,0.5)] scale-110" : "bg-white/10 border border-white/10 text-white/40 hover:text-white hover:border-primary/40"}`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 border border-white/5 text-white ${currentPage === totalPages ? "opacity-20 cursor-not-allowed" : "bg-white/5 hover:border-primary/40 hover:bg-primary/5 active:scale-95"}`}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-30">
            Showing page {currentPage} of {totalPages}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Projects;
