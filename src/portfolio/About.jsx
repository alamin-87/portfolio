import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaDownload } from "react-icons/fa6";
import alamin from "../assets/alamin.jpg";
import { CV_URL, USER_INFO } from "../constants";
import MagneticButton from "../components/MagneticButton";
import TextReveal from "../components/TextReveal";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);
  const infoGridRef = useRef(null);

  const handleDownloadCV = (e) => {
    e.preventDefault();
    const link = document.createElement("a");
    link.href = CV_URL;
    link.setAttribute("download", "MD_AL-AMIN_CV.pdf");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(imageRef.current, {
        x: -100,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(contentRef.current, {
        x: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      if (infoGridRef.current) {
        gsap.from(infoGridRef.current.children, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: infoGridRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const infoItems = [
    { label: "Name", value: USER_INFO.name },
    { label: "Email", value: USER_INFO.email },
    { label: "Address", value: USER_INFO.address },
    { label: "Phone No.", value: USER_INFO.phone },
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-16 px-6 md:px-12 min-h-screen overflow-hidden"
      style={{ background: "transparent" }}
    >
      <div className="glow-orb glow-orb-accent" style={{ width: 450, height: 450, top: "-5%", right: "-10%" }} />
      <div className="glow-orb glow-orb-primary" style={{ width: 350, height: 350, bottom: "5%", left: "-10%" }} />

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center relative z-10">
        {/* Image Column */}
        <div ref={imageRef} className="flex justify-center lg:justify-start">
          <div className="relative group">
            <div className="absolute -inset-6 rounded-[2.5rem] opacity-20 group-hover:opacity-40 transition-all duration-700 bg-gradient-to-br from-primary to-accent blur-3xl" />
            <div className="relative z-10 p-2 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-sm overflow-hidden shadow-2xl">
              <img
                src={alamin}
                alt={USER_INFO.name}
                className="rounded-[2.2rem] max-h-[600px] w-full object-cover grayscale-[30%] hover:grayscale-0 transition-all duration-700 hover:scale-[1.03]"
              />
            </div>
          </div>
        </div>

        {/* Content Column */}
        <div ref={contentRef}>
          <div className="mb-4">
            <TextReveal as="h2" className="section-heading !text-left" useScrollTrigger>
              About Me
            </TextReveal>
            <div className="section-line !ml-0 !w-24 mb-10" />
          </div>

          <div className="space-y-6 text-lg md:text-xl leading-relaxed mb-12 text-white/90">
            <p>
              Hello! I'm <span className="gradient-text font-black text-2xl tracking-tighter">{USER_INFO.name}</span>, 
              a specialized <span className="text-white font-bold underline decoration-primary/50 decoration-2 underline-offset-8">Senior Full Stack Engineer</span> with a deep focus on 
              <span className="text-white font-bold px-1 italic">Next.js & TypeScript</span>.
            </p>
            <p className="text-gray-200">
              With a primary focus on architecting scalable enterprise systems with <span className="text-white border-b-2 border-primary/20">MERN Stack</span> & 
              <span className="text-white border-b-2 border-accent/20 mx-2">PostgreSQL</span>. 
              I specialize in robust serverless applications, <span className="text-white">Docker</span> orchestration, and 
              high-availability <span className="text-white">AWS</span> infrastructure.
            </p>
          </div>

          {/* Action Area */}
          <div className="flex flex-col gap-6 items-start">
            <MagneticButton>
              <button 
                onClick={handleDownloadCV} 
                className="btn-glow !px-12 !py-5 shadow-2xl shadow-primary/40"
              >
                <FaDownload className="text-lg" /> DOWNLOAD RESUME
              </button>
            </MagneticButton>
            
            <button 
              onClick={handleDownloadCV}
              className="text-xs font-black uppercase tracking-[0.3em] text-white/40 hover:text-primary transition-all duration-300 border-b border-white/5 hover:border-primary pb-1"
            >
              Get Technical PDF Version
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
