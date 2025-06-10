// components/Loader.tsx
"use client";
import { motion } from "framer-motion";

const Loader = () => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white dark:bg-black"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: 3.2, duration: 0.5 }}
    >
      {/* Humaid Logo Text */}
      <motion.h1
        className="text-5xl font-bold text-black dark:text-white"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 10 }}
      >
        Humaid
      </motion.h1>

      {/* Loading bar */}
      <motion.div
        className="mt-6 w-40 h-2 bg-gray-300 dark:bg-white/10 rounded overflow-hidden"
      >
        <motion.div
          className="h-full bg-black dark:bg-white rounded"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 3, ease: "easeInOut" }}
        />
      </motion.div>
    </motion.div>
  );
};

export default Loader;
