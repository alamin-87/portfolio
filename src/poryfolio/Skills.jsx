import React from "react";
import { motion } from "framer-motion";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

// Skill data
const skills = [
  {
    title: "Full Stack Development (MERN)",
    rating: 5,
    institute: "Projects & Freelancing",
    period: "2024 - Present",
    desc: "End-to-end development using MongoDB, Express, React, and Node.js. Expertise in building scalable and secure applications.",
  },
  {
    title: "Backend (Node.js, Express, REST APIs)",
    rating: 4.8,
    institute: "Self Practice + Live Projects",
    period: "2024 - Present",
    desc: "Built modular REST APIs with Express and Node.js, implemented MVC architecture, and managed routes, middleware, and error handling.",
  },
  {
    title: "Authentication (JWT & Firebase)",
    rating: 4.7,
    institute: "Real-World Applications",
    period: "2024 - Present",
    desc: "Implemented secure login systems using JWT and Firebase Auth with role-based access and token verification for protected routes.",
  },
  {
    title: "Frontend (React.js, TailwindCSS)",
    rating: 5,
    institute: "Daily Development",
    period: "2023 - Present",
    desc: "Expert in building responsive and interactive user interfaces using React with TailwindCSS and DaisyUI.",
  },
  {
    title: "Database (MongoDB + Mongoose)",
    rating: 4.6,
    institute: "Projects & DBMS Learning",
    period: "2024 - Present",
    desc: "Efficient at schema design, data modeling, and query optimization using MongoDB with Mongoose ODM.",
  },
  {
    title: "Deployment (Vercel, Firebase, Render)",
    rating: 4.5,
    institute: "Project Deployments",
    period: "2023 - Present",
    desc: "Deployed full-stack projects to platforms like Vercel, Firebase Hosting, and Render with CI/CD integrations.",
  },
  {
    title: "Data Structures & Algorithms",
    rating: 4.5,
    institute: "HackerRank / LeetCode",
    period: "2023 - Present",
    desc: "Solved 200+ problems across arrays, trees, recursion, sorting, and graph algorithms using Python and Java.",
  },
];

// Star rendering function
const renderStars = (rating) => {
  const stars = [];
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;

  for (let i = 0; i < full; i++) stars.push(<FaStar key={i} className="text-yellow-400" />);
  if (half) stars.push(<FaStarHalfAlt key="half" className="text-yellow-400" />);
  while (stars.length < 5) stars.push(<FaRegStar key={stars.length} className="text-yellow-400" />);
  return stars;
};

const Skills = () => {
  return (
    <section id="skills" className="bg-black text-white py-22 px-6 md:px-12 min-h-screen">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <p className="text-gray-400 uppercase tracking-widest">3+ Year Experience</p>
        <h2 className="text-4xl font-bold">My Skills</h2>
        <div className="h-1 w-10 bg-primary mx-auto mt-4"></div>
      </div>

      <div className="relative">
        <div className="hidden md:block absolute left-1 md:left-1.5 top-0 h-full w-1 bg-neutral rounded-full"></div>

        <div className="grid md:grid-cols-2 gap-8 pl-4 md:pl-12 relative z-10">
          {skills.map((skill, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03 }}
              className="bg-neutral rounded-xl p-6 shadow-md transition transform"
            >
              <h3 className="text-xl font-semibold mb-1">{skill.title}</h3>
              <div className="flex items-center mb-2">
                <div className="flex">{renderStars(skill.rating)}</div>
                <span className="ml-2 text-gray-300">{skill.rating.toFixed(1)}</span>
              </div>
              <p className="text-gray-400 text-sm mb-1">
                {skill.institute} <span className="text-gray-500">({skill.period})</span>
              </p>
              <p className="text-gray-300 text-sm">{skill.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
