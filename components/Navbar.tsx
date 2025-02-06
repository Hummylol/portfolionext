"use client";

import React, { useState, useEffect } from "react";
import { ThemeToggle } from "./ThemeToggle";

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [navText, setNavText] = useState("Welcome!! 👋");

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Calculate which section is currently in view (using 80% threshold)
      const currentSection = Math.floor((currentScrollY + (windowHeight * 0.2)) / windowHeight);
      
      // Update navbar text based on current section
      let newText = "Welcome!! 👋";
      if (currentScrollY > 0) {
        switch(currentSection) {
          case 0:
            newText = "Home";
            break;
          case 1:
            newText = "Skills";
            break;
          case 2:
            newText = "Projects";
            break;
          case 3:
            newText = "About";
            break;
        }
      }

      setIsVisible(currentScrollY < lastScrollY || currentScrollY === 0);
      setLastScrollY(currentScrollY);
      setNavText(newText);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <div className="flex justify-center items-center w-screen ">
      <div
        className={`h-12 fixed z-50 top-0 flex justify-between items-center pl-4 pr-4 bg-[#cecece] text-black dark:bg-[#0c0c0c] dark:text-white shadow-md dark:shadow-lg transition-width duration-500 
          ${isVisible ? "w-full translate-y-0" : "w-[50%] rounded-3xl opacity-75 text-transparent"}`}
      >
        <div className="logo text-md sm:text-sm lg:text-xl dark:text-white text-black">
          {navText.includes("👋") ? (
            <>
              Welcome!! <span className="wave-hand">👋</span>
            </>
          ) : (
            navText
          )}
        </div>
        <div className="dark:text-white text-black">
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
