"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Cursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [details, setDetails] = useState<{ title: string; details: string[] } | undefined>(undefined);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleCursorDetails = (e: CustomEvent) => {
      setDetails(e.detail);
      setIsHovering(true);
    };

    const handleHover = () => {
      // Select GitHub links
      const githubLinks = document.querySelectorAll('a[aria-label*="GitHub"]');
      // Select External links
      const externalLinks = document.querySelectorAll('a[aria-label*="Live demo"]');
      // Select bento grid tiles
      const bentoTiles = document.querySelectorAll('[data-swapy-item]');
      // Select info tiles
      const infoTiles = document.querySelectorAll('[data-info-tile]');

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

      bentoTiles.forEach((tile) => {
        tile.addEventListener("mouseenter", () => {
          setIsHovering(true);
          setCursorText("Click or Drag");
        });
        tile.addEventListener("mouseleave", () => {
          setIsHovering(false);
          setCursorText("");
        });
      });

      infoTiles.forEach((tile) => {
        tile.addEventListener("mouseenter", () => {
          setIsHovering(true);
        });
        tile.addEventListener("mouseleave", () => {
          setIsHovering(false);
          setDetails(undefined);
        });
      });
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("cursorDetails", handleCursorDetails as EventListener);
    handleHover();

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("cursorDetails", handleCursorDetails as EventListener);
      // Cleanup event listeners
      const githubLinks = document.querySelectorAll('a[aria-label*="GitHub"]');
      const externalLinks = document.querySelectorAll('a[aria-label*="Live demo"]');
      const bentoTiles = document.querySelectorAll('[data-swapy-item]');
      const infoTiles = document.querySelectorAll('[data-info-tile]');

      githubLinks.forEach((link) => {
        link.removeEventListener("mouseenter", () => {});
        link.removeEventListener("mouseleave", () => {});
      });

      externalLinks.forEach((link) => {
        link.removeEventListener("mouseenter", () => {});
        link.removeEventListener("mouseleave", () => {});
      });

      bentoTiles.forEach((tile) => {
        tile.removeEventListener("mouseenter", () => {});
        tile.removeEventListener("mouseleave", () => {});
      });

      infoTiles.forEach((tile) => {
        tile.removeEventListener("mouseenter", () => {});
        tile.removeEventListener("mouseleave", () => {});
      });
    };
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed pointer-events-none z-50"
        animate={{
          x: mousePosition.x - (isHovering ? (details ? 100 : 45) : 45),
          y: mousePosition.y - (isHovering ? (details ? 60 : 45) : 45),
          scale: isHovering ? 1 : 1,
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
          ${details ? 'rounded-3xl' : 'rounded-full'}
          ${details ? 'bg-black' : 'bg-[#000000]'}
          ${details ? '' : 'dark:bg-[#ffffff]'}
          ${details ? 'text-white' : ''}
          invert-0
          transition-all
          duration-200
          hidden
          md:block
          lg:block
          xl:block
          ${details ? "w-[600px] h-[300px] p-8" : isHovering ? "w-[150px] h-[150px]" : "w-[100px] h-[100px]"}
        `}
        >
          {isHovering && (
            <div className={`${details ? "absolute top-0 left-0 w-full h-full flex flex-col justify-start items-start p-8" : "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120px] text-center"} font-mono`}> 
              {details ? (
                <>
                  <div className="font-bold text-xl mb-4">{details.title}</div>
                  {details.details.map((detail, i) => (
                    <div key={i} className="text-base text-white mb-1 text-left whitespace-pre-line">{detail}</div>
                  ))}
                </>
              ) : (
                cursorText
              )}
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Cursor;
