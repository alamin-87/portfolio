import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import GardeningHub from "../assets/Gardening Hub.jpeg";
import FoodSharing from "../assets/Food Sharing.jpeg";
import EnglishDictionary from "../assets/English Dictionary.jpeg";

const projects = [
  {
    title: "Gardening Hub",
    description:
      "A community platform where users can share gardening tips, explore ideas, and connect with top gardeners.",
    image: GardeningHub,
    liveLink: "https://gardening-hub.netlify.app/",
    githubLink: "https://github.com/alamin-87/b11a10-client-site",
    serverLink: "https://github.com/alamin-87/gardening-server-store", // Added server link
    tag: "Community App",
  },
  {
    title: "Food Sharing",
    description:
      "Share leftover food with others, request meals, and reduce waste while helping your community.",
    image: FoodSharing,
    liveLink: "https://food-sharing.netlify.app/",
    githubLink: "https://github.com/alamin-87/food-sharing-client-site",
    serverLink: "https://github.com/alamin-87/food-sharing-server-site", // Added server link
    tag: "Social Good",
  },
  {
    title: "English Dictionary",
    description:
      "Search for word meanings, examples, synonyms, and more in this simple English learner’s dictionary app.",
    image: EnglishDictionary,
    liveLink: "https://dictionary.example.com",
    githubLink: "https://github.com/youruser/english-dictionary",
    tag: "Educational Tool",
  },
];

const Projects = () => {
  return (
    <section id="projects" className="bg-black text-white py-16 px-4 md:px-12">
      <h2 className="text-4xl font-bold text-center mb-12">My Projects</h2>

      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, idx) => (
          <motion.div
            key={idx}
            className="bg-neutral rounded-xl overflow-hidden shadow-xl flex flex-col"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <div
              className="h-40 bg-cover bg-center"
              style={{ backgroundImage: `url(${project.image})` }}
            ></div>

            <div className="p-6 flex flex-col justify-between flex-grow min-h-[250px]">
              <div>
                <p className="text-sm text-yellow-400 mb-1">{project.tag}</p>
                <h3 className="text-2xl font-semibold mb-2">{project.title}</h3>
                <p className="text-gray-300 mb-4 text-sm">
                  {project.description}
                </p>
              </div>
              <div className="flex gap-4 mt-auto">
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500 text-black rounded-md font-semibold hover:bg-yellow-600 transition"
                >
                  Live Demo <FaExternalLinkAlt />
                </a>
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 border border-yellow-500 text-yellow-500 rounded-md font-semibold hover:bg-yellow-500 hover:text-black transition"
                >
                  Client <FaGithub />
                </a>
                {/* Show server link if available */}
                {project.serverLink && (
                  <a
                    href={project.serverLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 border border-yellow-500 text-yellow-500 rounded-md font-semibold hover:bg-yellow-500 hover:text-black transition"
                  >
                    Server <FaGithub />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
