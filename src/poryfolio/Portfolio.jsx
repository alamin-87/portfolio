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

const Portfolio = () => {
  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Contact", href: "#contact" },
  ];
  const [isOpen, setIsOpen] = useState(false);

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

          {/* User Image */}
          <div className="hidden md:block">
            <img
              src={me}
              alt="User"
              className="h-9 w-9 rounded-full object-cover border-2 border-blue-500"
            />
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
                <img
                  src={me}
                  alt="User"
                  className="h-9 w-9 rounded-full object-cover border-2 border-blue-500"
                />
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
