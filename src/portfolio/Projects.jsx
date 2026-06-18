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
              className="glass-card flex flex-col group shadow-2xl transition-all duration-700"
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
                <span className="absolute top-6 left-6 px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-xl bg-primary/10 text-primary border border-primary/20 backdrop-blur-xl">
                  {project.tag}
                </span>
              </div>

              <div className="p-2 lg:p-4 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="text-2xl font-black mb-3 tracking-tight text-white">
                    {project.title}
                  </h3>
                  <p className="text-sm leading-relaxed mb-8 text-slate-400 tracking-wide">
                    {project.description}
                  </p>
                </div>
                <div className="flex items-center gap-4 mt-auto">
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
