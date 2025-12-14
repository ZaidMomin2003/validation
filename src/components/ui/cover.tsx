"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { BackgroundRippleEffect } from "./background-ripple-effect";

export const Cover = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("relative inline-block text-white", className)}>
      <AnimatePresence>
        <motion.div
          initial={{ scale: 1 }}
          animate={{
            transition: {
              duration: 2,
              ease: "circOut",
              delay: 1,
              repeat: Infinity,
              repeatType: "reverse",
            },
          }}
          className="absolute inset-0 bg-black origin-left z-10 rounded-xl overflow-hidden"
        >
            <BackgroundRippleEffect />
        </motion.div>
      </AnimatePresence>
      <span className="relative z-20 px-2">{children}</span>
    </div>
  );
};
