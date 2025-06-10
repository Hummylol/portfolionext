"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Cursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [cursorText, setCursorText] = useState("");

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleHover = () => {
      // Select GitHub links
      const githubLinks = document.querySelectorAll('a[aria-label*="GitHub"]');
      // Select External links
      const externalLinks = document.querySelectorAll('a[aria-label*="Live demo"]');

      githubLinks.forEach((link) => {
        link.addEventListener("mouseenter", () => {
          setIsHovering(true);
          setCursorText("GitHub Link");
        });
        link.addEventListener("mouseleave", () => {
          setIsHovering(false);
          setCursorText("");
        });
      });

      externalLinks.forEach((link) => {
        link.addEventListener("mouseenter", () => {
          setIsHovering(true);
          setCursorText("External Link");
        });
        link.addEventListener("mouseleave", () => {
          setIsHovering(false);
          setCursorText("");
        });
      });
    };

    window.addEventListener("mousemove", updateMousePosition);
    handleHover();

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      // Cleanup event listeners
      const githubLinks = document.querySelectorAll('a[aria-label*="GitHub"]');
      const externalLinks = document.querySelectorAll('a[aria-label*="Live demo"]');

      githubLinks.forEach((link) => {
        link.removeEventListener("mouseenter", () => {});
        link.removeEventListener("mouseleave", () => {});
      });

      externalLinks.forEach((link) => {
        link.removeEventListener("mouseenter", () => {});
        link.removeEventListener("mouseleave", () => {});
      });
    };
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed pointer-events-none z-50"
        animate={{
          x: mousePosition.x - (isHovering ? 75 : 25),
          y: mousePosition.y - (isHovering ? 75 : 25),
          scale: isHovering ? 2 : 1,
        }}
        transition={{
          type: "tween",
          stiffness: 1000,
          damping: 15,
          mass: 0.5,
        }}
      >
        <div
          className={`
          relative 
          rounded-full 
          bg-[#000000]
          dark:bg-[#ffffff]
          invert-0
          transition-all 
          duration-150
          hidden
          md:block
          lg:block
          xl:block
          ${isHovering ? "w-[100px] h-[100px]" : "w-[50px] h-[50px]"}
        `}
        >
          {isHovering && (
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10px] whitespace-nowrap text-white dark:text-black">
              {cursorText}
            </span>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Cursor;
