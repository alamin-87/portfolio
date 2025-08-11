// Hero.jsx
import React from "react";
import { motion } from "framer-motion";
import { HiArrowNarrowRight } from "react-icons/hi";
import image from "../assets/image.png";
import { FaDownload, FaLinkedin, FaGithub, FaXTwitter } from "react-icons/fa6";

const CV_URL = "https://drive.google.com/uc?export=download&id=1O1Yt4w1p2ffgFjJjQxR-C5-F7oPYxMoG";

const Hero = () => {
  // Download CV handler
  const handleDownloadCV = (e) => {
    e.preventDefault();
    // Use a hidden anchor to trigger download (works best for Google Drive direct links)
    const link = document.createElement("a");
    link.href = CV_URL;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.download = "MD_AL-AMIN_CV.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section
      id="home"
      className="relative top-0 w-full min-h-screen bg-black text-white flex items-center justify-center overflow-hidden"
    >
      {/* Gradient / Shape Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent z-0"></div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl w-full px-6 md:px-12 grid md:grid-cols-2 gap-10 items-center">
        {/* Left Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <h1 className="text-5xl font-bold text-neutral-content">
            Hello<span className="text-primary">.</span>
          </h1>
          <h2 className="text-xl font-semibold text-primary-content">
            — I'm MD. AL-AMIN
          </h2>
          <p className="text-lg text-white">Full Stack Developer (MERN)</p>
          <p className="text-sm text-white">
            My expertise lies in building scalable web applications from concept
            to deployment. I specialize in crafting seamless user experiences
            with React on the frontend and robust, secure APIs with Node.js and
            MongoDB on the backend.
          </p>

          {/* Social Media Links */}
          <div className="flex space-x-4">
            <a
              href="https://www.linkedin.com/in/alamin87/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-blue-500 text-2xl"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://github.com/alamin-87"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-400 text-2xl"
            >
              <FaGithub />
            </a>
            <a
              href="https://x.com/MdAlaminHo21126"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-blue-400 text-2xl"
            >
              <FaXTwitter />
            </a>
          </div>

          {/* CV Download Button */}
          <button
            onClick={handleDownloadCV}
            className="btn btn-primary gap-2 text-white"
          >
            <FaDownload />
            Download CV
          </button>
        </motion.div>

        {/* Right Image and Text */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative flex justify-center"
        >
          <img
            src={image}
            alt="James Barnes"
            className="
            rounded-full 
            shadow-xl 
            max-h-[500px] 
            object-cover 
            bg-transparent 
            mix-blend-lighten 
            backdrop-blur-sm 
            border border-neutral-800"
          />
          {/* Name overlay */}
          {/* <div className="absolute top-4 left-4 bg-black/60 px-4 py-1 rounded-full font-bold text-xl">
            Drake ®
          </div> */}
        </motion.div>
      </div>

      {/* Call To Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-22 left-10 md:left-16 text-left z-10"
      >
        <a href="#contact" className="text-lg text-gray-300 mb-2 cursor-pointer">
          Let's Talk <HiArrowNarrowRight className="inline ml-2" />
        </a>
      </motion.div>
    </section>
  );
};

export default Hero;
