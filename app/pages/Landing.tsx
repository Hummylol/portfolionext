"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const roles = ["Creative Dev", "UI/UX Engineer", "Frontend Wizard"];

const HeroSection = () => {
  const [currentRole, setCurrentRole] = useState(0);
  const roleContainerRef = useRef(null);
  const codeRef = useRef(null);

  useEffect(() => {
    let interval = setInterval(() => {
      gsap.to(roleContainerRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
        onComplete: () => {
          setCurrentRole((prev) => (prev + 1) % roles.length);
          gsap.fromTo(
            roleContainerRef.current,
            { y: -20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
          );
        }
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    gsap.fromTo(
      ".fade-in",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.2 }
    );

    gsap.fromTo(
      codeRef.current,
      { opacity: 0, scale: 0.9 },
      { opacity: 0.1, scale: 1.2, duration: 1 }
    );
  }, []);

  return (
    <section className="relative h-screen flex flex-col items-center justify-center text-center bg-white dark:bg-black text-black dark:text-white overflow-hidden">
      <div
        ref={codeRef}
        className="absolute text-[20vw] font-qin opacity-10 leading-none select-none dark:text-[#fffff]"
      >
        CODE
      </div>

      <div className="relative z-10 px-6">
        <h1 className="text-4xl md:text-8xl font-qin fade-in">
          Hey, I'm <span className="font-qin">Humaid</span>
        </h1>

        <p className="text-lg md:text-3xl mt-4 fade-in flex items-center justify-center gap-2">
          I craft immersive digital experiences as a
          <span className=" inline-flex">
            <div className="overflow-hidden ">
              <div ref={roleContainerRef} className="text-left font-qin w-[300px]">
                {roles[currentRole]}
              </div>
            </div>
          </span>
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
