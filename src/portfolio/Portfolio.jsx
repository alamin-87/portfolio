import React from "react";
import Navbar from "../components/Navbar";
import Hero from "./Hero";
import About from "./About";
import Skills from "./Skills";
import Education from "./Education";
import Contact from "./Contact";
import Projects from "./Projects";
import Footer from "./Footer";

const Portfolio = () => {
  return (
    <>
      <Navbar />
      <main className="relative">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
};

export default Portfolio;
