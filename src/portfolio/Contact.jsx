import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaPaperPlane, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaLinkedin, FaGithub } from "react-icons/fa";
import emailjs from "@emailjs/browser";
import { USER_INFO } from "../constants";
import TextReveal from "../components/TextReveal";
import MagneticButton from "../components/MagneticButton";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const [clientEmail, setClientEmail] = useState("");
  const [clientName, setClientName] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const sectionRef = useRef(null);
  const infoCardRef = useRef(null);
  const formRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");
    setLoading(true);

    try {
      // Primary: Send via EmailJS (reliable, no SMTP auth needed)
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      await emailjs.send(serviceId, templateId, {
        from_name: clientName,
        from_email: clientEmail,
        name: clientName,
        email: clientEmail,
        title: title || "New Portfolio Message",
        subject: title || "New Portfolio Message",
        message,
        reply_to: clientEmail
      }, publicKey);

      setStatus("✅ Message sent successfully!");
      setClientEmail(""); setClientName(""); setTitle(""); setMessage("");
    } catch (error) {
      console.error("EmailJS Error:", error);
      setStatus("❌ Delivery failed. Please try later.");
    } finally {
      setLoading(false);
      setTimeout(() => setStatus(""), 5000);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(infoCardRef.current, { x: -80, opacity: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 65%", toggleActions: "play none none reverse" } });
      gsap.from(formRef.current, { x: 80, opacity: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 65%", toggleActions: "play none none reverse" } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="contact" className="relative py-16 px-6 md:px-12 min-h-screen flex flex-col items-center overflow-hidden" style={{ background: "transparent" }}>
      <div className="glow-orb glow-orb-primary" style={{ width: 400, height: 400, top: "10%", left: "-10%" }} />
      <div className="glow-orb glow-orb-accent" style={{ width: 300, height: 300, bottom: "15%", right: "-8%" }} />

      <div className="relative z-10 w-full max-w-5xl">
        <TextReveal as="h2" className="section-heading" useScrollTrigger>Get In Touch</TextReveal>
        <p className="text-center mb-8 max-w-2xl mx-auto" style={{ color: "var(--color-text-secondary)" }}>
          Feel free to reach out for collaborations, project inquiries, or just to say hello!
        </p>

        <div className="flex flex-col lg:flex-row gap-10 items-stretch">
          {/* Info Card */}
          <div ref={infoCardRef} className="glass-card flex-1 p-8 lg:p-10 flex flex-col justify-between border-white/5 hover:border-primary/20 transition-all duration-500 shadow-2xl">
            <div>
              <h3 className="text-3xl font-black mb-4 tracking-tight leading-tight" style={{ fontFamily: "var(--font-heading)", color: "var(--color-text-primary)" }}>
                Let's Build Something <span className="gradient-text">Exceptional</span> Together
              </h3>
              <p className="text-sm text-slate-400 mb-6 font-medium leading-relaxed">
                Whether you have a specific project inquiry, a collaboration idea, or just want to discuss the latest in MERN & Next.js, I'm just a message away.
              </p>
              <div className="w-full h-px bg-white/5 mb-6" />
              <ul className="space-y-4">
                {[
                  { icon: <FaEnvelope className="text-xl" />, text: USER_INFO.email, label: "Email Me" },
                  { icon: <FaPhoneAlt className="text-xl" />, text: USER_INFO.phone, label: "Call Me" },
                  { icon: <FaMapMarkerAlt className="text-xl" />, text: USER_INFO.address, label: "Location" },
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-5">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-lg" style={{ background: "rgba(99,102,241,0.1)", color: "var(--color-primary)", border: "1px solid rgba(99,102,241,0.2)" }}>
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-1 opacity-50">{item.label}</p>
                      <p className="font-semibold text-white tracking-wide">{item.text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="mt-8">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-4 opacity-50">Social Presence</p>
              <div className="flex gap-5">
                {[
                  { icon: <FaLinkedin />, href: USER_INFO.linkedin },
                  { icon: <FaGithub />, href: USER_INFO.github },
                  { icon: <FaEnvelope />, href: `mailto:${USER_INFO.email}` },
                ].map((social, i) => (
                  <MagneticButton key={i}>
                    <a href={social.href} target="_blank" rel="noopener noreferrer" className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl transition-all duration-500 border border-white/5 hover:border-primary/40 text-gray-400 hover:text-white"
                      style={{ background: "rgba(255,255,255,0.02)" }}>
                      {social.icon}
                    </a>
                  </MagneticButton>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <form ref={formRef} onSubmit={handleSubmit} className="glass-card flex-[1.2] p-8 lg:p-10 space-y-5 border-white/5 hover:border-primary/20 transition-all duration-500 shadow-2xl">
            <div className="mb-4">
              <h3 className="text-2xl font-black mb-1 tracking-tight transition-colors duration-300" style={{ fontFamily: "var(--font-heading)", color: "var(--color-text-primary)" }}>Send a Message</h3>
              <p className="text-sm opacity-60">I'll respond as soon as I can, usually within 24 hours.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {[
                { label: "Your Name", type: "text", value: clientName, onChange: setClientName, placeholder: "Al-Amin" },
                { label: "Your Email", type: "email", value: clientEmail, onChange: setClientEmail, placeholder: "you@example.com" },
              ].map((field, i) => (
                <div key={i}>
                  <label className="block mb-2 text-[10px] font-black uppercase tracking-[0.2em] opacity-50">{field.label}</label>
                  <input type={field.type} required value={field.value} onChange={(e) => field.onChange(e.target.value)} placeholder={field.placeholder}
                    className="w-full p-4 rounded-2xl text-sm focus:outline-none transition-all duration-500 border border-white/5 bg-white/5 focus:bg-white/[0.08]"
                    style={{ color: "var(--color-text-primary)" }}
                    onFocus={(e) => (e.target.style.borderColor = "var(--color-primary)")}
                    onBlur={(e) => (e.target.style.borderColor = "var(--color-border)")} />
                </div>
              ))}
            </div>

            <div>
              <label className="block mb-2 text-[10px] font-black uppercase tracking-[0.2em] opacity-50">Subject</label>
              <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Project Collaboration"
                className="w-full p-4 rounded-2xl text-sm focus:outline-none transition-all duration-500 border border-white/5 bg-white/5 focus:bg-white/[0.08]"
                style={{ color: "var(--color-text-primary)" }}
                onFocus={(e) => (e.target.style.borderColor = "var(--color-primary)")}
                onBlur={(e) => (e.target.style.borderColor = "var(--color-border)")} />
            </div>

            <div>
              <label className="block mb-1 text-[10px] font-black uppercase tracking-[0.2em] opacity-50">Message</label>
              <textarea rows="4" required value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Tell me about your idea..."
                className="w-full p-4 rounded-2xl text-sm focus:outline-none resize-none transition-all duration-500 border border-white/5 bg-white/5 focus:bg-white/[0.08]"
                style={{ color: "var(--color-text-primary)" }}
                onFocus={(e) => (e.target.style.borderColor = "var(--color-primary)")}
                onBlur={(e) => (e.target.style.borderColor = "var(--color-border)")} />
            </div>

            <button type="submit" disabled={loading} className="btn-glow w-full tracking-[0.3em] font-black py-4 shadow-indigo-500/20">
              <FaPaperPlane className={loading ? "animate-bounce" : ""} /> {loading ? "SENDING..." : "SEND MESSAGE"}
            </button>
            
            {status && <p className="text-center pt-2 text-xs font-bold uppercase tracking-widest" style={{ color: status.includes("✅") ? "#34d399" : "#f87171" }}>{status}</p>}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
