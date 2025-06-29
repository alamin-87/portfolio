import React from "react";
import { motion } from "framer-motion";
import { FaGraduationCap, FaCertificate } from "react-icons/fa6";

const educationData = [
  {
    title: "B.Sc in Computer Science",
    institute: "Daffodil International University",
    period: "2023 - Present",
    cgpa: "CGPA: 3.6 / 4.0",
    icon: <FaGraduationCap className="text-primary text-xl" />,
    desc: "Ongoing Bachelor's degree with a strong foundation in software development, data structures, algorithms, and full stack development."
  },
  {
    title: "Frontend Development",
    institute: "Creative IT Institute",
    period: "Completed 2024",
    icon: <FaCertificate className="text-yellow-400 text-xl" />,
    desc: "Completed in-depth course on HTML, CSS, JavaScript, Bootstrap, and React with hands-on projects."
  },
  {
    title: "Full Stack MERN Course",
    institute: "Programming Hero",
    period: "Completed 2025",
    icon: <FaCertificate className="text-yellow-400 text-xl" />,
    desc: "Learned professional-level MERN stack development covering authentication, routing, API, deployment, and performance optimization."
  },
  {
    title: "Online Certifications (Python & Java)",
    institute: "Coursera, Udemy, YouTube",
    period: "2023 - 2024",
    icon: <FaCertificate className="text-yellow-400 text-xl" />,
    desc: "Earned certificates in Python fundamentals, OOP in Java, and algorithmic thinking from global learning platforms."
  }
];

const Education = () => {
  return (
    <section
      id="education"
      className="bg-black text-white py-16 px-6 md:px-12 min-h-screen"
    >
      <div className="max-w-7xl mx-auto text-center mb-12">
        <p className="text-gray-400 uppercase tracking-widest">My Academic & Learning Journey</p>
        <h2 className="text-4xl font-bold">Education & Certifications</h2>
        <div className="h-1 w-10 bg-primary mx-auto mt-4"></div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {educationData.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            viewport={{ once: true }}
            className="bg-neutral p-6 rounded-xl shadow-lg hover:bg-neutral-800 transition-all"
          >
            <div className="flex items-center gap-3 mb-2">
              {item.icon}
              <h3 className="text-xl font-semibold text-white">
                {item.title}
              </h3>
            </div>
            <p className="text-gray-400 text-sm mb-1">{item.institute}</p>
            <p className="text-gray-500 text-sm mb-2">{item.period}</p>
            <p className="text-gray-300 text-sm mb-2">{item.desc}</p>
            {item.cgpa && <p className="text-primary font-medium">{item.cgpa}</p>}
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Education;
