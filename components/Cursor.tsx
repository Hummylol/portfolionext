"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Cursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [cursorText, setCursorText] = useState('');

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleHover = () => {
      const skillItems = document.querySelectorAll('.skills-item');
      
      skillItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
          setIsHovering(true);
          setCursorText('Click to open drawer');
        });
        
        item.addEventListener('mouseleave', () => {
          setIsHovering(false);
          setCursorText('');
        });
      });
    };

    window.addEventListener('mousemove', updateMousePosition);
    handleHover();

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
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
        <div className={`
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
          ${isHovering ? 'w-[100px] h-[100px]' : 'w-[50px] h-[50px]'}
        `}>
          {isHovering && (
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10px] whitespace-nowrap text-white dark:text-black">
              Click for more info
            </span>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Cursor; 