"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const projects = [
  { name: "Chat App" },
  { name: "Portfolio Website" },
  { name: "Music Player" },
  { name: "Color Palette Generator" },
];

const Projects = () => {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  return (
    <div className="h-full w-full flex justify-center items-center ">
      <section className="h-[80%] w-[80%] flex flex-col border-2 relative">
      <h2 className="text-4xl font-bold mb-8">My Projects</h2>
      <div className="flex flex-col gap-4">
        {projects.map((project) => (
          <div
            key={project.name}
            onMouseEnter={(e) => {
              setHoveredProject(project.name);
              setPosition({ x: e.clientX, y: e.clientY });
            }}
            onMouseMove={(e) => {
              setPosition({ x: e.clientX, y: e.clientY });
            }}
            onMouseLeave={() => setHoveredProject(null)}
            className="text-6xl w-fit cursor-pointer hover:text-blue-400 transition duration-300"
          >
            {project.name}
          </div>
        ))}
      </div>

      <AnimatePresence>
        {hoveredProject && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{
              position: "fixed",
              top: position.y + 10,
              left: position.x + 10,
              transform: "translate(-50%, -50%)",
            }}
            className="w-[50%] h-[20%] lg:w-[40%] lg:h-[40%] bg-black dark:bg-white border border-gray-600 shadow-lg rounded-lg flex items-center justify-center"
          >
            <span className="text-white dark:text-black text-sm">{hoveredProject} Preview</span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
    </div>
  );
};

export default Projects;
