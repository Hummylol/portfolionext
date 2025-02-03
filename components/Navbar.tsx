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
      setIsVisible(currentScrollY < lastScrollY || currentScrollY === 0);
      setLastScrollY(currentScrollY);
      setNavText(currentScrollY > 0 ? "Humaid" : "Welcome!! 👋");
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
          {navText}
        </div>
        <div className="dark:text-white text-black">
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
