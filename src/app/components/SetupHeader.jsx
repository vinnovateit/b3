"use client";
import { motion } from "framer-motion";

export default function SetupHeader() {
  return (
    <div className="h-[30vh] flex flex-col justify-end items-start pb-6">
      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
        className="font-bold text-white leading-none"
        style={{ fontSize: "5.5rem" }}
      >
        B<sup className="text-5xl">3</sup>
      </motion.h1>
      <motion.p 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
        className="text-4xl text-gray-200 mt-2"
      >
        Let’s set things up
      </motion.p>
    </div>
  );
}