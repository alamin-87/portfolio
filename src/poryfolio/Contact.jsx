import React, { useState } from "react";
import { FaPaperPlane, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaLinkedin, FaGithub } from "react-icons/fa";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const [clientEmail, setClientEmail] = useState("");
  const [clientName, setClientName] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");
    setLoading(true);

    const serviceId = "service_tmn94na";
    const templateId = "template_p1zw61j";
    const publicKey = "YQ-0SO68c4DiLbiiF";

    const templateParams = {
      name: clientName,
      email: clientEmail,
      title: title,
      message: message,
      reply_to: clientEmail,
    };

    try {
      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      setStatus("✅ Email sent successfully!");
      setClientEmail("");
      setClientName("");
      setTitle("");
      setMessage("");
      setTimeout(() => setStatus(""), 3000);
    } catch (error) {
      console.error("EmailJS Error:", error?.text || error);
      setStatus("❌ Failed to send email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-22 bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white min-h-screen flex flex-col items-center"
    >
      <h2 className="text-4xl font-extrabold mb-4 tracking-tight">Get In Touch</h2>
      <p className="mb-10 text-lg text-gray-300 text-center max-w-2xl">
        Feel free to reach out for collaborations, project inquiries, or just to say hello!
      </p>
      <div className="flex flex-col md:flex-row gap-10 w-full max-w-5xl">
        {/* Contact Info Card */}
        <div className="flex-1 h-[350px] bg-neutral rounded-xl shadow-2xl p-8 mb-8 md:mb-0 flex flex-col justify-between">
          <h3 className="text-2xl font-semibold mb-6 border-b border-gray-700 pb-3">Contact Information</h3>
          <ul className="space-y-5 text-base">
            <li className="flex items-center gap-3">
              <FaEnvelope className="text-primary" />
              <span>alaminhossainmomenul87@gmail.com</span>
            </li>
            <li className="flex items-center gap-3">
              <FaPhoneAlt className="text-primary" />
              <span>+8801706473016</span>
            </li>
            <li className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-primary" />
              <span>Dhaka, Bangladesh</span>
            </li>
            <li className="flex items-center gap-3">
              <a
                href="https://www.linkedin.com/in/alamin87/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-primary transition"
              >
                <FaLinkedin />
                <span>LinkedIn</span>
              </a>
            </li>
            <li className="flex items-center gap-3">
              <a
                href="https://github.com/alamin-87"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-primary transition"
              >
                <FaGithub />
                <span>GitHub</span>
              </a>
            </li>
          </ul>
        </div>
        {/* Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="flex-1 w-full max-w-xl space-y-6 bg-neutral p-8 rounded-xl shadow-2xl"
        >
          <h3 className="text-2xl font-semibold mb-4">Send a Message</h3>
          <div>
            <label className="block mb-1 text-sm font-medium">Your Name</label>
            <input
              type="text"
              required
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className="w-full p-3 rounded bg-base-100 text-black border border-gray-300 focus:border-primary focus:outline-none"
              placeholder="Your full name"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Your Email</label>
            <input
              type="email"
              required
              value={clientEmail}
              onChange={(e) => setClientEmail(e.target.value)}
              className="w-full p-3 rounded bg-base-100 text-black border border-gray-300 focus:border-primary focus:outline-none"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Subject</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 rounded bg-base-100 text-black border border-gray-300 focus:border-primary focus:outline-none"
              placeholder="Enter subject"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Message</label>
            <textarea
              rows="5"
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-3 rounded bg-base-100 text-black border border-gray-300 focus:border-primary focus:outline-none"
              placeholder="Your message"
            ></textarea>
          </div>
          <button
            type="submit"
            className="btn btn-primary w-full flex items-center justify-center gap-2 text-white font-semibold py-3 rounded transition hover:bg-primary/90"
            disabled={loading}
          >
            <FaPaperPlane />
            {loading ? "Sending..." : "Send Email"}
          </button>
          {status && (
            <p
              className={`text-center pt-2 text-sm ${
                status.includes("✅") ? "text-green-400" : "text-red-400"
              }`}
            >
              {status}
            </p>
          )}
        </form>
      </div>
    </section>
  );

};

// Footer Component
const Footer = () => (
  <footer className="w-full bg-neutral text-gray-300 py-6">
    <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
      <span className="text-sm">
        © {new Date().getFullYear()} MD. AL-AMIN. All rights reserved.
      </span>
      <div className="flex gap-4 text-lg">
        <a
          href="https://www.linkedin.com/in/alamin87/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-primary transition"
        >
          <FaLinkedin />
        </a>
        <a
          href="https://github.com/alamin-87"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-primary transition"
        >
          <FaGithub />
        </a>
        <a
          href="mailto:alaminhossainmomenul87@gmail.com"
          className="hover:text-primary transition"
        >
          <FaEnvelope />
        </a>
      </div>
    </div>
  </footer>
);

export default function ContactWithFooter() {
  return (
    <>
      <Contact />
      <Footer />
    </>
  );
}
