"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";



const projects = [
  { name: "Chat App" },
  { name: "Portfolio Website" },
  { name: "Music Player" },
  { name: "Code Share" },
  { name: "Mental Health" },
  { name: "LLM" },
  { name: "Qusic Player" },
];

const Projects = () => {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });



  return (
    <>
      <div className="h-fit w-full flex flex-col justify-center items-center dark:bg-black">
        <section className="h-fit w-[90%] flex flex-col relative pt-20">
          <div className="flex flex-col gap-4 relative">
            {projects.map((project) => (
              <div
                key={project.name}
                className="text-4xl md:text-8xl border-b dark:border-white border-black transition-all duration-300"
              >
                <div
                  onMouseEnter={(e) => {
                    setHoveredProject(project.name);
                    setPosition({ x: e.clientX, y: e.clientY });
                  }}
                  onMouseMove={(e) => {
                    setPosition({ x: e.clientX, y: e.clientY });
                  }}
                  onMouseLeave={() => setHoveredProject(null)}
                  className={`w-fit cursor-pointer transition duration-300 font-qin ${hoveredProject && hoveredProject !== project.name
                      ? "opacity-15"
                      : "blur-none opacity-100"
                    }`}
                >
                  {project.name}
                </div>
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
                className="w-[50%] h-[20%] z-50 lg:w-[40%] lg:h-[40%] bg-black dark:bg-white shadow-lg rounded-3xl flex items-center justify-center"
              >
                <span className="text-white dark:text-black text-sm">
                  {hoveredProject} Preview
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </div>
    </>
  );
};

export default Projects;
