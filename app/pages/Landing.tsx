import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import gsap from "gsap"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"
import LoadingScreen from "../../components/LoadingScreen"

gsap.registerPlugin(ScrollToPlugin)

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  const handleWorksClick = () => {
    gsap.to(window, {
      duration: 1,
      scrollTo: window.innerHeight,
      ease: "power2.inOut"
    })
  }

  const handleMoreDetailsClick = () => {
    gsap.to(window, {
      duration: 1.2,
      scrollTo: window.innerHeight * 2,
      ease: "power2.inOut"
    })
  }

  const skills = [
    { name: "Next.js" },
    { name: "React" },
    { name: "TypeScript" },
    { name: "Node.js" },
    { name: "Tailwind" },
    { name: "GSAP" },
    { name: "MongoDB" },
    { name: "Three.js" }
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-black flex flex-col transition-colors duration-200">
      <AnimatePresence>
        {isLoading && <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-24 items-center">
            {/* Left Side - Main Headline */}
            <div className="space-y-6 sm:space-y-8 md:space-y-10">
              {/* 👋 Humaid Greeting */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={!isLoading ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-gray-700 dark:text-gray-300"
              >
                Hi, I'm{" "}
                <span className="font-qin p-2 sm:px-3 md:px-4 lg:p-4 rounded-full dark:text-black dark:bg-white bg-black text-white inline-block">
                  Humaid
                </span>
              </motion.p>

              <div className="relative">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={!isLoading ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-light leading-tight text-black dark:text-white"
                >
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={!isLoading ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                  >
                    YOU'VE GOT
                  </motion.span>
                  <br />
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={!isLoading ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                  >
                    THE IDEA,
                  </motion.span>
                  <br />
                  <motion.span
                    className="relative inline-block"
                    initial={{ opacity: 0 }}
                    animate={!isLoading ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: 0.9, duration: 0.8 }}
                  >
                    GREAT
                    <div className="absolute -right-24 sm:-right-4 md:-right-8 lg:-right-36 top-2 sm:top-0 md:top-4">
                      <div className="w-16 h-12 sm:w-20 sm:h-14 md:w-24 md:h-16 lg:w-32 lg:h-20 bg-gray-900 dark:bg-gray-100 rounded-lg relative overflow-hidden shadow-2xl">
                        <div className="absolute inset-2 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 rounded animate-pulse">
                          <div className="w-full h-full bg-black/20 rounded flex items-center justify-center">
                            <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-white/80 rounded-full animate-bounce" />
                          </div>
                        </div>
                        <div className="absolute right-1 top-1 space-y-1">
                          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-500 rounded-full animate-pulse" />
                          <div
                            className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full animate-pulse"
                            style={{ animationDelay: "0.5s" }}
                          />
                        </div>
                      </div>
                    </div>
                  </motion.span>
                </motion.h1>
              </div>

              {/* Subtitle Section */}
              <motion.div
                className="space-y-2 sm:space-y-3 hidden md:block lg:block"
                initial={{ opacity: 0, y: 20 }}
                animate={!isLoading ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 1.5, duration: 0.8 }}
              >
                <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400 tracking-wider uppercase">
                  Vision-Driven Developer
                </p>
                <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 max-w-md">
                  Crafting delightful experiences for the web
                </p>
              </motion.div>
            </div>

            {/* Right Side - Secondary Text */}
            <motion.div
              className="space-y-6 sm:space-y-8 md:space-y-10"
              initial={{ opacity: 0, x: 20 }}
              animate={!isLoading ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ delay: 1.8, duration: 0.8 }}
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-light leading-tight text-black dark:text-white">
                LEAVE THE
                <br />
                REST TO ME!
              </h2>
            </motion.div>
          </div>
        </div>
      </main>

      {/* Bottom Section */}
      <motion.footer
        className="p-4 sm:p-6 md:p-8 lg:p-12"
        initial={{ opacity: 0, y: 20 }}
        animate={!isLoading ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ delay: 2.1, duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-start">
            {/* Works Button */}
            <motion.button
              onClick={handleWorksClick}
              className="text-xl sm:text-2xl font-medium text-black dark:text-white hover:opacity-80 transition-opacity underline"
              whileTap={{ scale: 0.99 }}
            >
              <span className="flex items-center gap-2">
                Projects
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </span>
            </motion.button>

            {/* Skills and More Details */}
            <div className="space-y-6 sm:space-y-8">
              {/* Skill Capsules */}
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={!isLoading ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                    transition={{ delay: 2.1 + index * 0.1 }}
                    className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-black dark:bg-white text-white dark:text-black text-xs sm:text-sm font-medium shadow-lg border border-gray-200 dark:border-gray-800"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {skill.name}
                  </motion.div>
                ))}
              </div>

              {/* More Details Button */}
              <motion.button
                onClick={handleMoreDetailsClick}
                className="inline-flex items-center space-x-2 text-black dark:text-white hover:opacity-80 transition-opacity text-sm sm:text-base"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>more details</span>
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.footer>
    </div>
  )
}
