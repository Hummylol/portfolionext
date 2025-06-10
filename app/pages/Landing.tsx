"use client"

import { useEffect, useRef, useState } from "react"
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  LayoutGroup,
} from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import SplitText from "@/components/split-text"

const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const mainContentOpacity = useTransform(
    scrollYProgress,
    [0, 0, 0, 1],
    [0, 0.3, 0.3, 1]
  )
  const mainContentScale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [1, 0.97, 0.97, 1]
  )

  const LOADER_DURATION_MS = 2000
  const LOADER_EXIT_DURATION_S = 0.8
  const PAGE_ANIMATION_ENTRY_POINT_S = 0.5

  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, LOADER_DURATION_MS)
    return () => clearTimeout(timer)
  }, [])

  const skills = [
    "React",
    "Next.js",
    "TypeScript",
    "Framer Motion",
    "UI/UX Design",
    "Tailwind CSS",
  ]

  const pageEntryDelay = (relativeDelay: number) => {
    return isLoading ? 99 : PAGE_ANIMATION_ENTRY_POINT_S + relativeDelay
  }

  const scrollToProjects = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    })
  }

  const scrollToSkills = () => {
    window.scrollTo({
      top: window.innerHeight * 2,
      behavior: "smooth",
    })
  }

  return (
    <LayoutGroup>
      {/* <AnimatePresence>
        {isLoading && (
          <motion.div
            key="loader"
            className="fixed inset-0 z-[100] flex items-center justify-center bg-white dark:bg-black"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: LOADER_EXIT_DURATION_S }}
          >
            <div className="relative flex flex-col items-center">
              <motion.div
                className="absolute w-32 h-32 rounded-full border border-black/20 dark:border-white/20"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 1.5, 1], opacity: [0, 0.5, 0] }}
                transition={{
                  duration: 2,
                  times: [0, 0.7, 1],
                  repeat: Number.POSITIVE_INFINITY,
                  repeatDelay: 0.5,
                  ease: "easeInOut",
                }}
              />

              <motion.div
                layoutId="humaid-name-layout"
                className="text-black dark:text-white text-5xl md:text-7xl font-bold tracking-tighter font-qin"
                transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
              >
                Humaid
              </motion.div>

              <motion.div
                className="mt-6 text-black/60 dark:text-white/60 text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
              >
                Creative Developer & Designer
              </motion.div>

              <div className="w-48 h-[2px] bg-black/20 dark:bg-white/20 mt-8 overflow-hidden rounded-full">
                <motion.div
                  className="h-full bg-black dark:bg-white"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: (LOADER_DURATION_MS / 1000) * 0.9, ease: "linear" }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence> */}

      {/* Main Content */}
      <div
        className="relative bg-white dark:bg-black text-black dark:text-white selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black"
        style={{ visibility: isLoading ? "hidden" : "visible" }}
      >
        <motion.div
          ref={containerRef}
          style={{ opacity: mainContentOpacity, scale: mainContentScale }}
          className="min-h-screen"
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoading ? 0 : 1 }}
          transition={{ duration: 0.5, delay: pageEntryDelay(0) }}
        >
          {/* Hero Section */}
          <section className="h-screen flex items-center justify-center relative overflow-hidden">
            <div className="container mx-auto px-4 text-center md:text-left relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 80 }}
                animate={{ opacity: isLoading ? 0 : 1, y: isLoading ? 80 : 0 }}
                transition={{ duration: 0.9, delay: pageEntryDelay(0.1) }}
              >
                <h1 className="text-2xl md:text-5xl lg:text-7xl font-bold tracking-tighter mb-6">
                  Hi, I'm{" "}
                  <motion.span
                    layoutId="humaid-name-layout"
                    className="font-qin md:p-4 lg:p-6 p-2 rounded-full dark:text-black dark:bg-white bg-black text-white inline-block"
                    transition={{ duration: 0.7 }}
                  >
                    Humaid
                  </motion.span>
                </h1>

                <h1 className="text-3xl md:text-6xl lg:text-8xl xl:text-9xl tracking-tighter font-bold">
                  <motion.div initial="initial" animate={!isLoading ? "animate" : "initial"}>
                    <SplitText delay={0.01}>Creative</SplitText>
                    <SplitText delay={0.02}>Developer</SplitText>
                    <SplitText delay={0.03}>& Designer</SplitText>
                  </motion.div>
                </h1>

                <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-12 mt-12 justify-center md:justify-start">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: isLoading ? 0 : 1, y: isLoading ? 20 : 0 }}
                    transition={{ duration: 0.8, delay: pageEntryDelay(0.5) }}
                    className="text-base md:text-lg max-w-md dark:text-neutral-800 text-neutral-100 dark:bg-neutral-100 bg-neutral-900 rounded-lg p-4 shadow-md"
                  >
                    I craft exceptional digital experiences that blend cutting-edge
                    technology with stunning design.
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: isLoading ? 0 : 1, y: isLoading ? 20 : 0 }}
                    transition={{ duration: 0.8, delay: pageEntryDelay(0.6) }}
                  >
                    <button
                      onClick={scrollToProjects}
                      className="group inline-flex items-center text-lg px-6 py-3 rounded-full border transition-colors hover:border-black/40 dark:hover:border-white/40"
                    >
                      <motion.span className="relative z-10 flex items-center gap-2">
                        Explore my work
                        <ArrowUpRight className="h-5 w-5" />
                      </motion.span>
                    </button>
                  </motion.div>
                </div>

                <motion.div
                  className="mt-16 flex flex-wrap gap-3 justify-center md:justify-start items-center"
                  initial="initial"
                  animate={!isLoading ? "animate" : "initial"}
                  variants={{
                    initial: { opacity: 0 },
                    animate: {
                      opacity: 1,
                      transition: {
                        delay: pageEntryDelay(0.7),
                        staggerChildren: 0.07,
                      },
                    },
                  }}
                >
                  {skills.map((skill) => (
                    <motion.span
                      key={skill}
                      className="text-xs px-3 py-1.5 border rounded-full hover:border-black/30 dark:hover:border-white/30"
                      variants={{
                        initial: { opacity: 0, y: 20 },
                        animate: { opacity: 1, y: 0 },
                      }}
                    >
                      {skill}
                    </motion.span>
                  ))}

                  <motion.button
                    onClick={scrollToSkills}
                    className="text-xs px-3 py-1.5 border rounded-full hover:border-black/30 dark:hover:border-white/30"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.4 },
                    }}
                  >
                    More info about my skill
                  </motion.button>
                </motion.div>
              </motion.div>
            </div>
          </section>
        </motion.div>
      </div>
    </LayoutGroup>
  )
}
