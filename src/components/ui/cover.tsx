"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export const Cover = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("relative inline-block", className)}>
      <AnimatePresence>
        <motion.div
          initial={{ scaleX: 1 }}
          animate={{
            scaleX: [1, 1.2, 1],
            transition: {
              duration: 2,
              ease: "circOut",
              delay: 1,
              repeat: Infinity,
              repeatType: "reverse",
            },
          }}
          className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 origin-left z-10"
        >
          <motion.div
            initial={{ scaleX: 1 }}
            animate={{
              scaleX: [1, 0],
              transition: {
                duration: 1,
                ease: "circOut",
                delay: 2,
                repeat: Infinity,
                repeatType: "reverse",
              },
            }}
            className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 origin-left z-10"
          />
        </motion.div>
      </AnimatePresence>
      <span className="relative z-0">{children}</span>
    </div>
  );
};
