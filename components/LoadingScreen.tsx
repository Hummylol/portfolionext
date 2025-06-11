import { motion, useAnimation, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"

interface LoadingScreenProps {
  onLoadingComplete: () => void
}

export default function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  const controls = useAnimation()

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          return 100
        }
        return prev + 1
      })
    }, 30) // 3 seconds total (100 steps * 30ms)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (progress === 100) {
      controls.start({
        opacity: 0,
        transition: { duration: 0.5, delay: 0.5 }
      })
      setTimeout(onLoadingComplete, 1000)
    }
  }, [progress, controls, onLoadingComplete])

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        animate={controls}
        className="fixed inset-0 bg-white dark:bg-black z-50 flex flex-col items-center justify-center"
      >
        <div className="relative w-64 h-64 flex items-center justify-center">
          {/* Animated Numbers */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <motion.span
              key={progress}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-6xl font-light text-gray-800 dark:text-gray-200"
            >
              {progress}%
            </motion.span>
          </motion.div>

          {/* Circular Progress */}
          <svg className="w-full h-full -rotate-90">
            <circle
              cx="128"
              cy="128"
              r="120"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
              className="text-gray-200 dark:text-gray-800"
            />
            <motion.circle
              cx="128"
              cy="128"
              r="120"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
              className="text-gray-800 dark:text-gray-200"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: progress / 100 }}
              transition={{ duration: 0.1 }}
            />
          </svg>
        </div>
      </motion.div>
    </AnimatePresence>
  )
} 