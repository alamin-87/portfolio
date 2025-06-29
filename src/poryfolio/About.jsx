import React from "react";
import { motion } from "framer-motion";
import { FaDownload } from "react-icons/fa6";
import alamin from "../assets/alamin.jpg";

// Animation variants
const fadeLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
};

const fadeRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
};

const About = () => {
  return (
    <section
      id="about"
      className="bg-black text-white py-20 px-6 md:px-12 min-h-screen"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center"
      >
        {/* Left Image with animation */}
        <motion.div variants={fadeLeft} className="flex justify-center">
          <motion.img
            src={alamin}
            alt="MD. AL-AMIN"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="rounded-xl shadow-2xl max-h-[500px] object-cover border border-neutral-800"
          />
        </motion.div>

        {/* Right Content */}
        <motion.div variants={fadeRight}>
          <h2 className="text-3xl font-bold mb-4">About Me</h2>

          <p className="text-lg text-gray-300 mb-4 leading-relaxed">
            Hello! I'm{" "}
            <span className="text-primary font-semibold">MD. AL-AMIN</span>, a
            passionate Full Stack MERN Developer. My programming journey began
            with curiosity and a deep love for problem-solving. Over the years,
            I’ve honed my skills in both frontend and backend technologies,
            delivering scalable and clean web applications.
          </p>

          <p className="text-lg text-gray-300 mb-6 leading-relaxed">
            I particularly enjoy working on interactive UIs, API integrations,
            and optimizing performance. Outside of coding, I’m a huge fan of
            photography, travel, and cricket. I believe a creative mind outside
            the code helps bring clarity within the code!
          </p>

          {/* Personal Info Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6"
          >
            {[
              { label: "Name", value: "MD. AL-AMIN" },
              { label: "Email", value: "alaminhossainmomenul87@gmail.com" },
              { label: "Address", value: "Dhaka, Bangladesh" },
              { label: "Phone No.", value: "+880 130 146 2327" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-neutral rounded-lg p-4 hover:bg-neutral-800 transition duration-300"
              >
                <p className="font-bold text-white">{item.label}</p>
                <p className="text-gray-300">{item.value}</p>
              </div>
            ))}
          </motion.div>

          {/* Download CV Button */}
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            href="https://drive.google.com/file/d/1O1Yt4w1p2ffgFjJjQxR-C5-F7oPYxMoG/view"
            download
            className="btn btn-primary text-white gap-2"
          >
            <FaDownload /> Download CV
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default About;
