import React, { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const [clientEmail, setClientEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");
    setLoading(true);

    const serviceId = "service_yhdqs4n";
    const templateId = "template_p1zw61j";
    const publicKey = "YQ-0SO68c4DiLbiiF";

    const templateParams = {
      from_email: clientEmail,
      subject: subject,
      message: message,
    };

    try {
      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      setStatus("✅ Email sent successfully!");
      setClientEmail("");
      setSubject("");
      setMessage("");
    } catch (error) {
      console.error("EmailJS Error:", error);
      setStatus("❌ Failed to send email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-22 bg-black text-white min-h-screen flex flex-col items-center">
      <h2 className="text-4xl font-bold mb-8">Get In Touch</h2>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl space-y-6 bg-neutral p-8 rounded-xl shadow-xl"
      >
        <div>
          <label className="block mb-1 text-sm">Your Email</label>
          <input
            type="email"
            required
            value={clientEmail}
            onChange={(e) => setClientEmail(e.target.value)}
            className="w-full p-3 rounded bg-base-100 text-black"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm">Subject</label>
          <input
            type="text"
            required
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full p-3 rounded bg-base-100 text-black"
            placeholder="Enter subject"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm">Message</label>
          <textarea
            rows="5"
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-3 rounded bg-base-100 text-black"
            placeholder="Your message"
          ></textarea>
        </div>
        <button
          type="submit"
          className="btn btn-primary w-full flex items-center justify-center gap-2 text-white"
          disabled={loading}
        >
          <FaPaperPlane />
          {loading ? "Sending..." : "Send Email"}
        </button>
        {status && (
          <p className={`text-center pt-2 text-sm ${status.includes("✅") ? "text-green-400" : "text-red-400"}`}>
            {status}
          </p>
        )}
      </form>
    </section>
  );
};

export default Contact;
