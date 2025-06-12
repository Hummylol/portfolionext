"use client"

import { motion, useAnimation } from "framer-motion"
import { useEffect, useState } from "react"

interface LoadingScreenProps {
  onLoadingComplete: () => void
}

export default function PremiumLoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  const controls = useAnimation()

  useEffect(() => {
    const startTime = Date.now()

    const animate = () => {
      const elapsed = Date.now() - startTime
      const newProgress = Math.min((elapsed / 3500) * 100, 100)

      setProgress(newProgress)

      if (newProgress < 100) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [])

  useEffect(() => {
    if (progress >= 100) {
      setTimeout(() => {
        controls.start({
          opacity: 0,
          transition: {
            duration: 1.5,
            ease: [0.4, 0, 0.2, 1],
          },
        })
      }, 500)
      setTimeout(onLoadingComplete, 2000)
    }
  }, [progress, controls, onLoadingComplete])

  return (
    <motion.div initial={{ opacity: 1 }} animate={controls} className="fixed inset-0 bg-black z-50 overflow-hidden">
      {/* Large bold number in top right */}
      <div className="absolute top-8 right-8 md:top-12 md:right-12">
        <motion.div
          className="text-white font-qin text-6xl md:text-8xl lg:text-9xl leading-none tracking-tight"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          {Math.floor(progress).toString().padStart(2, "0")}
        </motion.div>
        <motion.div
          className="text-white/40 font-light text-sm md:text-base tracking-[0.2em] mt-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
        >
          PERCENT
        </motion.div>
      </div>

      {/* Animated line that grows with progress */}
      <motion.div
        className="absolute top-0 left-0 h-1 bg-white"
        initial={{ width: "0%" }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />

      {/* Vertical line on the left */}
      <motion.div
        className="absolute left-8 md:left-12 top-1/2 w-px bg-white/20"
        initial={{ height: 0, y: 0 }}
        animate={{ height: "40vh", y: "-50%" }}
        transition={{ duration: 1.2, delay: 0.5, ease: [0.4, 0, 0.2, 1] }}
      />

      {/* Loading text */}
      <div className="absolute left-8 md:left-12 bottom-1/3">
        <motion.div
          className="text-white font-light text-sm md:text-base tracking-[0.3em] mb-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: [0.4, 0, 0.2, 1] }}
        >
          LOADING
        </motion.div>

        {/* Animated dots */}
        <div className="flex space-x-2">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="w-1 h-1 bg-white rounded-full"
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Floating elements */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-px h-8 bg-white/10"
          style={{
            left: `${20 + i * 15}%`,
            top: `${30 + i * 10}%`,
          }}
          animate={{
            opacity: [0, 0.5, 0],
            scaleY: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            delay: i * 0.8,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Bottom right corner element */}
      <motion.div
        className="absolute bottom-8 right-8 md:bottom-12 md:right-12"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 1, ease: [0.4, 0, 0.2, 1] }}
      >
        <div className="w-8 h-8 border border-white/20 rotate-45" />
      </motion.div>

      {/* Center expanding circle */}
      <motion.div
        className="absolute left-1/2 top-1/2 border border-white/10 rounded-full"
        style={{ x: "-50%", y: "-50%" }}
        animate={{
          width: ["0px", "200px", "400px"],
          height: ["0px", "200px", "400px"],
          opacity: [0, 0.3, 0],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeOut",
        }}
      />
    </motion.div>
  )
}
