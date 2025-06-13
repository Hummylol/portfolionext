"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { TextPlugin } from "gsap/TextPlugin"
import { motion, AnimatePresence } from "framer-motion"

gsap.registerPlugin(ScrollTrigger, TextPlugin)

const About = () => {
  const topRef = useRef<HTMLDivElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)
  const leftDrawerRef = useRef<HTMLDivElement>(null)
  const rightDrawerRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const dotsRef = useRef<HTMLDivElement[]>([])
  const linesRef = useRef<HTMLDivElement[]>([])
  const textRef = useRef<HTMLDivElement>(null)
  const morphRef = useRef<HTMLDivElement>(null)
  const numbersRef = useRef<HTMLDivElement[]>([])
  const detailsRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)

  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [activeItem, setActiveItem] = useState<string | null>(null)
  const [showDetails, setShowDetails] = useState(false)

  const detailsData = {
    education: {
      title: "EDUCATION",
      details: [
        "Bachelor's in Information Technology",
        "Jerusalem College Of Engineering",
        "2022 - 2026",
        "Relevant Coursework: Data Structures, Web Development, UI/UX Design",
      ],
    },
    internship: {
      title: "INTERNSHIP",
      details: [
        "Frontend Developer Intern",
        "Visual Tech",
        "Summer 2024",
        "Built responsive web applications using React",
      ],
    },
    projects: {
      title: "PROJECTS",
      details: [
        "Portfolio Website (React, TypeScript)",
        "E-commerce Platform (Next.js, Tailwind)",
        "Task Management App (React, Firebase)",
        "Weather Dashboard (React, OpenWeather API)",
      ],
    },
    hobbies: {
      title: "INTERESTS",
      details: ["Digital Art & Design", "Photography", "Open Source Contributing", "Learning New Technologies"],
    },
  }

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const mainTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=100%",
        scrub: 1,
        pin: true,
      },
    })

    // Create animated dots
    const createDots = () => {
      const container = contentRef.current
      if (!container || isMobile) return // Don't create dots on mobile

      // Clear any existing dots first
      dotsRef.current.forEach(dot => dot.remove())
      dotsRef.current = []

      for (let i = 0; i < 50; i++) {
        const dot = document.createElement("div")
        dot.className = "absolute w-1 h-1 bg-black dark:bg-white rounded-full opacity-0"
        dot.style.left = Math.random() * 100 + "%"
        dot.style.top = Math.random() * 100 + "%"
        container.appendChild(dot)
        dotsRef.current.push(dot)
      }
    }

    createDots()

    // Initial states
    gsap.set(contentRef.current, { opacity: 0 })
    if (!isMobile) {
      gsap.set(dotsRef.current, { scale: 0, opacity: 0 })
      gsap.set(linesRef.current, { scaleX: 0, transformOrigin: "left center" })
    }
    gsap.set(textRef.current, { y: 100, opacity: 0 })
    gsap.set(morphRef.current, { scale: 0, rotation: 0 })
    gsap.set(numbersRef.current, { y: 50, opacity: 0 })
    gsap.set(detailsRef.current, { y: 30, opacity: 0 })
    gsap.set(contactRef.current, { y: 20, opacity: 0 })

    // Main drawer animation
    mainTl
      .to(topRef.current, {
        yPercent: -101,
        ease: "none",
      })
      .to(
        bottomRef.current,
        {
          yPercent: 101,
          ease: "none",
        },
        "<",
      )

    mainTl
      .to(
        leftDrawerRef.current,
        {
          xPercent: -101,
          ease: "power2.out",
        },
        "0.2",
      )
      .to(
        rightDrawerRef.current,
        {
          xPercent: 101,
          ease: "power2.out",
        },
        "<",
      )

    // Content reveal sequence
    mainTl.to(
      contentRef.current,
      {
        opacity: 1,
        duration: 0.3,
      },
      "0.5",
    )

    // Animated dots explosion - only on desktop
    if (!isMobile) {
      mainTl.to(
        dotsRef.current,
        {
          scale: 1,
          opacity: 1,
          duration: 1.5,
          stagger: {
            amount: 0.8,
            from: "center",
            grid: "auto",
          },
          ease: "back.out(2)",
        },
        "0.6",
      )

      // Lines animation
      mainTl.to(
        linesRef.current,
        {
          scaleX: 1,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
        },
        "0.8",
      )
    }

    // Morphing shape animation
    mainTl.to(
      morphRef.current,
      {
        scale: 1,
        rotation: 360,
        duration: 2,
        ease: "power2.out",
      },
      "0.7",
    )

    // Text reveal with typewriter effect
    mainTl.to(
      textRef.current,
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
      },
      "1.0",
    )

    // Numbers counting animation
    mainTl.to(
      numbersRef.current,
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.7)",
      },
      "1.2",
    )

    // Details section animation
    mainTl.to(
      detailsRef.current,
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power3.out",
      },
      "1.4",
    )

    // Contact section animation
    mainTl.to(
      contactRef.current,
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power3.out",
      },
      "1.6",
    )

    // Continuous animations
    const continuousAnimations = () => {
      if (!isMobile) {
        // Floating dots
        dotsRef.current.forEach((dot, i) => {
          gsap.to(dot, {
            y: "random(-20, 20)",
            x: "random(-20, 20)",
            duration: "random(2, 4)",
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: i * 0.1,
          })
        })
      }

      // Morphing shape continuous rotation
      gsap.to(morphRef.current, {
        rotation: "+=360",
        duration: 10,
        repeat: -1,
        ease: "none",
      })

      // Text scramble effect
      const scrambleText = () => {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        const originalText = "CREATIVE DEVELOPER"
        let iterations = 0

        const interval = setInterval(() => {
          if (textRef.current) {
            textRef.current.innerText = originalText
              .split("")
              .map((letter, index) => {
                if (index < iterations) {
                  return originalText[index]
                }
                return chars[Math.floor(Math.random() * 26)]
              })
              .join("")
          }

          if (iterations >= originalText.length) {
            clearInterval(interval)
          }

          iterations += 1 / 3
        }, 30)
      }

      setTimeout(scrambleText, 2000)
    }

    setTimeout(continuousAnimations, 3000)

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
      dotsRef.current.forEach((dot) => dot.remove())
      dotsRef.current = []
    }
  }, [isMobile])

  const addToRefs = (el: HTMLDivElement | null, index: number, type: "lines" | "numbers") => {
    if (el && type === "lines") {
      linesRef.current[index] = el
    } else if (el && type === "numbers") {
      numbersRef.current[index] = el
    }
  }

  const handleHover = (item: string, isEntering: boolean) => {
    if (isMobile) return // Disable hover effects on mobile
    
    if (isEntering && detailsData[item as keyof typeof detailsData]) {
      // Update cursor details through a custom event
      const event = new CustomEvent('cursorDetails', {
        detail: detailsData[item as keyof typeof detailsData]
      });
      window.dispatchEvent(event);
    } else {
      // Clear cursor details
      const event = new CustomEvent('cursorDetails', {
        detail: undefined
      });
      window.dispatchEvent(event);
    }
  }

  const handleClick = (item: string) => {
    if (!isMobile) return // Only handle clicks on mobile
    
    if (activeItem === item) {
      setActiveItem(null)
      setShowDetails(false)
      const event = new CustomEvent('cursorDetails', {
        detail: undefined
      });
      window.dispatchEvent(event);
    } else {
      setActiveItem(item)
      setShowDetails(true)
      const event = new CustomEvent('cursorDetails', {
        detail: detailsData[item as keyof typeof detailsData]
      });
      window.dispatchEvent(event);
    }
  }

  return (
    <div
      ref={containerRef}
      className="h-screen w-full dark:bg-black bg-white dark:text-white text-black relative overflow-hidden"
    >
      <div ref={topRef} className="h-1/2 w-screen dark:bg-black bg-white absolute z-40 flex justify-center items-end">
        <div className="h-[15vw] md:h-[25vw] overflow-hidden">
          <div className="text-[15vw] md:text-[25vw] dark:text-white text-black leading-none -translate-y-[-50%]">
            ABOUT
          </div>
        </div>
      </div>

      <div className="h-full w-full absolute dark:bg-black bg-white flex justify-center items-center p-8 overflow-hidden z-0">
        <div ref={leftDrawerRef} className="absolute inset-y-0 left-0 w-1/2 bg-black dark:bg-white z-30"></div>
        <div ref={rightDrawerRef} className="absolute inset-y-0 right-0 w-1/2 bg-black dark:bg-white z-30"></div>

        {/* Main Content */}
        <div ref={contentRef} className="relative w-full h-full flex flex-col items-center justify-center opacity-0">
          {/* Animated Lines - Hidden on Mobile */}
          {!isMobile && (
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  ref={(el) => addToRefs(el, i, "lines")}
                  className="absolute h-px bg-black dark:bg-white"
                  style={{
                    top: `${(i + 1) * 12.5}%`,
                    left: "10%",
                    right: "10%",
                  }}
                />
              ))}
              {[...Array(6)].map((_, i) => (
                <div
                  key={i + 8}
                  ref={(el) => addToRefs(el, i + 8, "lines")}
                  className="absolute w-px bg-black dark:bg-white"
                  style={{
                    left: `${(i + 1) * 16.66}%`,
                    top: "10%",
                    bottom: "10%",
                  }}
                />
              ))}
            </div>
          )}

          {/* Mobile Details Modal */}
          <AnimatePresence>
            {isMobile && showDetails && activeItem && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
              >
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="bg-white dark:bg-black border border-black dark:border-white p-6 max-w-[90%] w-[400px]"
                >
                  <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-xl font-bold mb-4"
                  >
                    {detailsData[activeItem as keyof typeof detailsData].title}
                  </motion.div>
                  <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="space-y-2"
                  >
                    {detailsData[activeItem as keyof typeof detailsData].details.map((detail, index) => (
                      <motion.div 
                        key={index}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.4 + (index * 0.1) }}
                        className="text-sm"
                      >
                        {detail}
                      </motion.div>
                    ))}
                  </motion.div>
                  <motion.button 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    onClick={() => {
                      setShowDetails(false)
                      setActiveItem(null)
                      const event = new CustomEvent('cursorDetails', {
                        detail: undefined
                      });
                      window.dispatchEvent(event);
                    }}
                    className="mt-6 px-4 py-2 border border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300"
                  >
                    Close
                  </motion.button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Morphing Shape - Hidden on Mobile */}
          {!isMobile && (
            <div
              ref={morphRef}
              className="absolute top-1/4 right-1/4 w-32 h-32 border-4 border-black dark:border-white"
              style={{
                clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
              }}
            />
          )}

          {/* Central Text */}
          <div className="text-center z-10">
            <div ref={textRef} className="text-6xl md:text-8xl font-bold mb-8 tracking-wider font-mono">
              CREATIVE DEVELOPER
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mt-8 md:mt-16">
              {[
                { num: "04", label: "YEARS\nSTUDYING", key: "education" },
                { num: "01", label: "INTERNSHIP\nCOMPLETED", key: "internship" },
                { num: "15", label: "PROJECTS\nBUILT", key: "projects" },
                { num: "04", label: "CORE\nINTERESTS", key: "hobbies" },
              ].map((item, index) => (
                <div
                  key={index}
                  ref={(el) => addToRefs(el, index, "numbers")}
                  className={`text-center border border-black bg-white dark:bg-black dark:border-white p-4 md:p-6 relative overflow-hidden group cursor-pointer ${
                    isMobile && activeItem === item.key ? 'scale-x-100' : ''
                  }`}
                  onMouseEnter={() => handleHover(item.key, true)}
                  onMouseLeave={() => handleHover(item.key, false)}
                  onClick={() => handleClick(item.key)}
                  data-info-tile
                >
                  <div className={`absolute inset-0 bg-black dark:bg-white ${
                    isMobile 
                      ? activeItem === item.key ? 'scale-x-100' : 'scale-x-0'
                      : 'scale-x-0 group-hover:scale-x-100'
                  } transition-transform duration-500 origin-left`} />
                  <div className={`relative z-10 ${
                    isMobile
                      ? activeItem === item.key ? 'text-white dark:text-black' : ''
                      : 'group-hover:text-white dark:group-hover:text-black'
                  } transition-colors duration-500`}>
                    <div className="text-2xl md:text-4xl font-bold font-mono mb-2">{item.num}</div>
                    <div className="text-[10px] md:text-xs font-bold tracking-widest whitespace-pre-line">{item.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education & Experience Details */}
          <div ref={detailsRef} className="absolute top-8 md:top-16 left-8 md:left-16 text-left opacity-0">
            <div className="text-[10px] md:text-xs font-mono tracking-widest mb-2 opacity-60">BACKGROUND</div>
            <div className="text-xs md:text-sm font-bold">Computer Science Student</div>
            <div className="text-[10px] md:text-xs opacity-80">Passionate about Frontend Development</div>
          </div>

          {/* Geometric Patterns - Hidden on Mobile */}
          {!isMobile && (
            <>
              <div className="absolute bottom-6 md:bottom-10 left-6 md:left-10 w-12 md:w-20 h-12 md:h-20 border-2 border-black dark:border-white rotate-45" />
              <div className="absolute top-6 md:top-10 left-1/3 w-3 md:w-4 h-3 md:h-4 bg-black dark:bg-white rounded-full" />
              <div className="absolute top-1/3 right-6 md:right-10 w-10 md:w-16 h-10 md:h-16 border border-black dark:border-white" />
              <div className="absolute bottom-1/4 right-1/3 w-5 md:w-8 h-5 md:h-8 bg-black dark:bg-white transform rotate-45" />
            </>
          )}

          {/* Contact Information */}
          <div
            ref={contactRef}
            className="absolute bottom-0 md:left-0 lg:left-1/2 w-full px-8 text-center opacity-0 flex flex-col 
                       md:bottom-20 md:-translate-x-1/2 md:w-auto"
          >
            <div className="text-[10px] md:text-sm font-mono tracking-widest mb-2 md:mb-4">GET IN TOUCH</div>
            <div className="flex justify-center gap-2 md:gap-6 w-full max-w-xs md:max-w-none text-[8px] md:text-xs">
              <div 
                className="border border-black dark:bg-black bg-white dark:border-white p-1.5 md:p-3 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 cursor-pointer w-full md:w-[200px]"
                onClick={() => {
                  navigator.clipboard.writeText('humaidsadath2004@gmail.com');
                  // Optional: Add a visual feedback that email was copied
                  const element = document.createElement('div');
                  element.textContent = 'Email copied!';
                  element.style.position = 'fixed';
                  element.style.top = '20px';
                  element.style.left = '50%';
                  element.style.transform = 'translateX(-50%)';
                  element.style.backgroundColor = 'black';
                  element.style.color = 'white';
                  element.style.padding = '8px 16px';
                  element.style.borderRadius = '4px';
                  element.style.zIndex = '1000';
                  document.body.appendChild(element);
                  setTimeout(() => element.remove(), 2000);
                }}
              >
                <div className="font-bold mb-0.5 md:mb-1">EMAIL</div>
                <div className="opacity-60 text-[7px] md:text-xs truncate md:whitespace-normal">humaidsadath2004@gmail.com</div>
              </div>
              <a 
                href="https://www.linkedin.com/in/humayd-sadath-8b2b2b2b2/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="border border-black dark:bg-black bg-white dark:border-white p-1.5 md:p-3 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 cursor-pointer w-full md:w-[200px]"
              >
                <div className="font-bold mb-0.5 md:mb-1">LINKEDIN</div>
                <div className="opacity-60 text-[7px] md:text-xs truncate md:whitespace-normal">@humaydsadath</div>
              </a>
              <a 
                href="https://github.com/Hummylol" 
                target="_blank" 
                rel="noopener noreferrer"
                className="border border-black dark:bg-black bg-white dark:border-white p-1.5 md:p-3 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 cursor-pointer w-full md:w-[200px]"
              >
                <div className="font-bold mb-0.5 md:mb-1">GITHUB</div>
                <div className="opacity-60 text-[7px] md:text-xs truncate md:whitespace-normal">@Hummylol</div>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div
        ref={bottomRef}
        className="h-1/2 w-screen dark:bg-black bg-white absolute bottom-0 z-40 flex justify-center items-start"
      >
        <div className="h-[15vw] md:h-[25vw] overflow-hidden">
          <div className="text-[15vw] md:text-[25vw] dark:text-white text-black leading-none translate-y-[-50%]">
            ABOUT
          </div>
        </div>
      </div>
    </div>
  )
}

export default About