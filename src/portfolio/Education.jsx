import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import universityImg from "../assets/python.png";
import frontendImg from "../assets/certificate.jpg";
import mernImg from "../assets/mern.png";
import certificationImg from "../assets/python.png";
import TextReveal from "../components/TextReveal";

gsap.registerPlugin(ScrollTrigger);

const educationData = [
  { title: "B.Sc in Computer Science", institute: "Daffodil International University", period: "2023 - Present", cgpa: "CGPA: 3.6 / 4.0", img: universityImg, desc: "Ongoing Bachelor's degree with a strong foundation in software development, data structures, algorithms, and full stack development." },
  { title: "Frontend Development", institute: "Creative IT Institute", period: "Completed 2024", img: frontendImg, desc: "Completed in-depth course on HTML, CSS, JavaScript, Bootstrap, and React with hands-on projects." },
  { title: "Full Stack MERN Course", institute: "Programming Hero", period: "Completed 2025", img: mernImg, desc: "Learned professional-level MERN stack development covering authentication, routing, API, deployment, and performance optimization." },
  { title: "Online Certifications (Python & Java)", institute: "Coursera, Udemy, YouTube", period: "2023 - 2024", img: certificationImg, desc: "Earned certificates in Python fundamentals, OOP in Java, and algorithmic thinking from global learning platforms." },
];

const Education = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, idx) => {
        if (!card) return;
        gsap.from(card, {
          y: 60, opacity: 0, scale: 0.95, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 85%", toggleActions: "play none none reverse" },
          delay: idx * 0.12,
        });
        const img = card.querySelector(".edu-img");
        if (img) {
          gsap.to(img, {
            yPercent: -10, ease: "none",
            scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: true },
          });
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="education" className="relative py-24 px-6 md:px-12 min-h-screen overflow-hidden" style={{ background: "transparent" }}>
      <div className="glow-orb glow-orb-primary" style={{ width: 350, height: 350, bottom: "5%", right: "-5%" }} />
      <div className="max-w-7xl mx-auto relative z-10">
        <p className="section-subtitle">My Academic & Learning Journey</p>
        <TextReveal as="h2" className="section-heading" useScrollTrigger>Education & Certifications</TextReveal>
        <div className="section-line" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {educationData.map((item, index) => (
            <div key={index} ref={(el) => (cardsRef.current[index] = el)} className="glass-card overflow-hidden group">
              <div className="h-44 overflow-hidden relative">
                <img src={item.img} alt={item.title} className="edu-img w-full h-[120%] object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 40%, var(--color-overlay-gradient) 100%)" }} />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold mb-1" style={{ fontFamily: "var(--font-heading)", color: "var(--color-text-primary)" }}>{item.title}</h3>
                <p className="text-sm mb-1" style={{ color: "var(--color-text-muted)" }}>{item.institute}</p>
                <p className="text-xs mb-3" style={{ color: "var(--color-text-muted)", opacity: 0.7 }}>{item.period}</p>
                <p className="text-sm leading-relaxed mb-3" style={{ color: "var(--color-text-secondary)" }}>{item.desc}</p>
                {item.cgpa && (
                  <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full" style={{ background: "rgba(99,102,241,0.15)", color: "var(--color-primary)", border: "1px solid rgba(99,102,241,0.3)" }}>
                    {item.cgpa}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
