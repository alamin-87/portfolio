import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  FaStar, FaStarHalfAlt, FaRegStar, FaCode, FaServer, 
  FaPencilRuler, FaTerminal, FaLayerGroup 
} from "react-icons/fa";
import { FaAws, FaShield } from "react-icons/fa6";
import { 
  SiNextdotjs, SiTypescript, SiPostgresql, 
  SiDocker, SiMongodb, SiExpress, SiReact, SiNodedotjs
} from "react-icons/si";
import TextReveal from "../components/TextReveal";

gsap.registerPlugin(ScrollTrigger);

const splitSkills = {
  left: [
    {
      title: "Frontend Mastery (Next.js 14)",
      rating: 5,
      icon: <SiNextdotjs />,
      desc: "Specialized in Server Components, App Router, and high-performance React architectures.",
      period: "2023 - Present"
    },
    {
      title: "Full Stack Developer",
      rating: 5,
      icon: <FaLayerGroup />,
      desc: "Comprehensive mastery over MongoDB, Express, React, and Node.js for scalable web solutions.",
      period: "2023 - Present"
    },
    {
      title: "TypeScript Mastery",
      rating: 5,
      icon: <SiTypescript />,
      desc: "Writing type-safe, maintainable code with advanced generic patterns and strict interfaces.",
      period: "2023 - Present"
    },
    {
      title: "UI/UX & Creative Engineering",
      rating: 4.8,
      icon: <FaPencilRuler />,
      desc: "Crafting pixel-perfect, accessible user journeys with Figma and high-vibrancy GSAP motion.",
      period: "2023 - Present"
    },
    {
      title: "MongoDB & Schema Design",
      rating: 4.9,
      icon: <SiMongodb />,
      desc: "Architecting high-availability NoSQL databases with complex aggregations and efficient indexing.",
      period: "2023 - Present"
    }
  ],
  right: [
    {
      title: "Relational DB (PostgreSQL)",
      rating: 4.8,
      icon: <SiPostgresql />,
      desc: "Engineered scalable relational database schemas with complex relationship mapping and indexing.",
      period: "2024 - Present"
    },
    {
      title: "Docker & Container Architecture",
      rating: 4.6,
      icon: <SiDocker />,
      desc: "Isolating environments and streamlining orchestration for consistent production-grade deployments.",
      period: "2024 - Present"
    },
    {
      title: "AWS Cloud & DevOps",
      rating: 4.5,
      icon: <FaAws />,
      desc: "Managing infrastructure on AWS (EC2, S3, RDS) with automated deployment pipelines.",
      period: "2024 - Present"
    },
    {
      title: "Advanced Auth & Identity",
      rating: 4.9,
      icon: <FaShield />,
      desc: "Implementing secure multi-factor authentication, RBAC, and OAuth across diverse systems.",
      period: "2024 - Present"
    }
  ]
};

const renderStars = (rating) => {
  const stars = [];
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  for (let i = 0; i < full; i++) stars.push(<FaStar key={i} className="text-amber-400" />);
  if (half) stars.push(<FaStarHalfAlt key="half" className="text-amber-400" />);
  while (stars.length < 5) stars.push(<FaRegStar key={stars.length} className="text-amber-400" />);
  return stars;
};

const Skills = () => {
  const sectionRef = useRef(null);
  const lineRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(lineRef.current, {
        scaleY: 0,
        transformOrigin: "top",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 30%",
          end: "bottom 80%",
          scrub: 1,
        }
      });

      itemsRef.current.forEach((item, idx) => {
        if (!item) return;
        const isLeft = item.dataset.side === "left";
        
        gsap.from(item, {
          x: isLeft ? -50 : 50,
          opacity: 0,
          duration: 1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none reverse",
          }
        });

        const branchLine = item.querySelector(".branch-line");
        if (branchLine) {
          gsap.from(branchLine, {
            scaleX: 0,
            transformOrigin: isLeft ? "right" : "left",
            duration: 0.8,
            delay: 0.2,
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
            }
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="skills" className="relative py-32 px-6 md:px-12 overflow-hidden bg-transparent">
      <div className="glow-orb glow-orb-primary" style={{ width: 400, height: 400, top: "10%", left: "-5%" }} />
      <div className="glow-orb glow-orb-accent" style={{ width: 400, height: 400, bottom: "10%", right: "-5%" }} />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-24">
          <p className="text-primary font-black uppercase tracking-[0.4em] text-xs mb-4">Core Technology Axis</p>
          <TextReveal as="h2" className="section-heading" useScrollTrigger>Technical Mastery</TextReveal>
          <div className="section-line mx-auto" />
        </div>

        <div className="relative">
          <div 
            ref={lineRef}
            className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary via-accent to-primary/20 rounded-full"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-24 md:gap-y-32 relative">
            <div className="space-y-32 md:pr-20">
              {splitSkills.left.map((skill, i) => (
                <div key={`left-${i}`} ref={(el) => (itemsRef.current[i * 2] = el)} data-side="left" className="relative text-right group">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/5 border border-white/10 text-primary mb-4 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                    {skill.icon}
                  </div>
                  <h3 className="text-xl font-black text-white mb-2 uppercase tracking-tight">{skill.title}</h3>
                  <div className="flex justify-end gap-1 mb-4 opacity-80 group-hover:opacity-100 transition-opacity">
                    {renderStars(skill.rating)}
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed max-w-sm ml-auto">
                    {skill.desc}
                  </p>
                  <div className="hidden md:block absolute top-6 -right-[80px] w-[80px] h-[1.5px] bg-white/10 branch-line" />
                  <div className="hidden md:block absolute top-[21px] -right-[85px] w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_rgba(99,102,241,1)]" />
                </div>
              ))}
            </div>

            <div className="space-y-32 md:pl-20 md:mt-48">
              {splitSkills.right.map((skill, i) => (
                <div key={`right-${i}`} ref={(el) => (itemsRef.current[i * 2 + 1] = el)} data-side="right" className="relative text-left group">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/5 border border-white/10 text-accent mb-4 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6">
                    {skill.icon}
                  </div>
                  <h3 className="text-xl font-black text-white mb-2 uppercase tracking-tight">{skill.title}</h3>
                  <div className="flex justify-start gap-1 mb-4 opacity-80 group-hover:opacity-100 transition-opacity">
                    {renderStars(skill.rating)}
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed max-w-sm mr-auto">
                    {skill.desc}
                  </p>
                  <div className="hidden md:block absolute top-6 -left-[80px] w-[80px] h-[1.5px] bg-white/10 branch-line" />
                  <div className="hidden md:block absolute top-[21px] -left-[85px] w-2 h-2 rounded-full bg-accent shadow-[0_0_10px_rgba(244,63,94,1)]" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
