"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Lenis from "@studio-freight/lenis";

const Scrollbar = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const lenis = new Lenis();

    lenis.on("scroll", (e:any) => {
      const scrollTop = e.scroll;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollTop / scrollHeight;
      setScrollProgress(progress);
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return (
    <div className="fixed z-50 bottom-0 left-0 w-full h-[4px] dark:h-[2px] light:bg-zinc-800">
      <motion.div
        className="h-full dark:bg-white bg-black"
        style={{
          width: `${scrollProgress * 100}%`,
        }}
      />
    </div>
  );
};

export default Scrollbar;
