import React, { useState } from "react";
import logo from "../assets/logo.png";
import me from "../assets/me.jpg";
import Hero from "./Hero";
import About from "./About";
import Skills from "./Skills";
import Education from "./Education";
import { FaBars, FaTimes } from "react-icons/fa";
import Contact from "./Contact";
import Projects from "./Projects";

const CV_URL = "https://drive.google.com/uc?export=download&id=1O1Yt4w1p2ffgFjJjQxR-C5-F7oPYxMoG";

const Portfolio = () => {
  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Contact", href: "#contact" },
  ];
  const [isOpen, setIsOpen] = useState(false);

  // Download CV handler
  const handleDownloadCV = (e) => {
    e.preventDefault();
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
    <>
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <nav className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <a href="#home" className="flex items-center space-x-2">
            <img src={logo} alt="Logo" className="h-10 w-10 object-contain" />
          </a>

          {/* Desktop Nav Links */}
          <ul className="hidden md:flex space-x-6 text-gray-700 font-medium">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="hover:text-blue-500 transition-colors duration-300"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>

          {/* Download CV Button (replaces user image) */}
          <div className="hidden md:block">
            <button
              onClick={handleDownloadCV}
              className="px-4 py-2 bg-blue-500 text-white rounded-full font-semibold shadow hover:bg-blue-600 transition"
            >
              Download CV
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-2xl text-gray-700"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden px-4 pb-4 bg-white shadow-md">
            <ul className="space-y-3 text-gray-700 font-medium">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="block hover:text-blue-500 transition-colors duration-300"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
              <li>
                <button
                  onClick={handleDownloadCV}
                  className="w-full px-4 py-2 bg-blue-500 text-white rounded-full font-semibold shadow hover:bg-blue-600 transition"
                >
                  Download CV
                </button>
              </li>
            </ul>
          </div>
        )}
      </header>

      <main>
        <Hero></Hero>
        <About></About>
        <Projects></Projects>
        <Skills></Skills>
        <Education></Education>
        <Contact></Contact>
      </main>
      <footer></footer>
    </>
  );
};

export default Portfolio;
