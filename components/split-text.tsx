"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface SplitTextProps {
  children: ReactNode
  delay?: number
}

export default function SplitText({ children, delay = 0 }: SplitTextProps) {
  const text = children?.toString() || ""
  const words = text.split(" ")

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: delay + 3.2 },
    }),
  }

  const child = {
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  }

  return (
    <motion.div
      style={{ overflow: "hidden", display: "inline-block" }}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, index) => (
        <motion.span key={index} variants={child} style={{ marginRight: "0.25em", display: "inline-block" }}>
          {word}
        </motion.span>
      ))}
    </motion.div>
  )
}
