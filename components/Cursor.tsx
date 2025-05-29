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
      // Select all GitHub link anchors (adjust selector if needed)
      const githubLinks = document.querySelectorAll('a[href*="github.com"]');

      githubLinks.forEach((link) => {
        link.addEventListener("mouseenter", () => {
          setIsHovering(true);
          setCursorText("Github Link");
        });
        link.addEventListener("mouseleave", () => {
          setIsHovering(false);
          setCursorText("");
        });
      });
    };

    window.addEventListener("mousemove", updateMousePosition);
    handleHover();

    // Re-run handleHover if DOM changes (optional)
    // You can add a MutationObserver here if your links change dynamically

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      // Cleanup event listeners on links
      const githubLinks = document.querySelectorAll('a[href*="github.com"]');
      githubLinks.forEach((link) => {
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
