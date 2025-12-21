
"use client";
import { useMotionValue } from "framer-motion";
import React, { useState, useEffect } from "react";
import { useSpring } from "framer-motion";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const Icon = ({ className, ...rest }: any) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={className}
      {...rest}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
    </svg>
  );
};

export const EvervaultCard = ({
  text,
  className,
}: {
  text?: string;
  className?: string;
}) => {
  const mouseX = useSpring(0, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(0, { stiffness: 500, damping: 100 });

  function onMouseMove({ currentTarget, clientX, clientY }: any) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }
  let maskImage = useMotionValue<string>(
    "radial-gradient(250px 250px at 50% 50%, white, transparent)"
  );
  let style = {
    maskImage: useMotionValue<string>(
      `radial-gradient(250px 250px at 50% 50%, black, transparent)`
    ),
    WebkitMaskImage: useMotionValue<string>(
      `radial-gradient(250px 250px at 50% 50%, black, transparent)`
    ),
  };

  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!isHovered) {
      maskImage.set("radial-gradient(250px 250px at 50% 50%, white, transparent)");
    } else {
      maskImage.set(
        `radial-gradient(250px 250px at ${mouseX.get()}px ${mouseY.get()}px, white, transparent)`
      );
    }
  }, [isHovered, mouseX, mouseY]);


  const onMouseEnter = () => {
    setIsHovered(true);
  };
  const onMouseLeave = () => {
    setIsHovered(false);
  };
  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onMouseMove={onMouseMove}
      className={cn(
        "p-0.5  bg-transparent  aspect-square  flex items-center justify-center w-full h-full relative",
        className
      )}
    >
      <div
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className="group/card rounded-3xl w-full relative overflow-hidden bg-transparent flex items-center justify-center h-full"
      >
        <CardPattern
          mouseX={mouseX}
          mouseY={mouseY}
          onMouseMove={onMouseMove}
          isHovered={isHovered}
        />
        <div className="relative z-10 flex items-center justify-center">
          <div className="relative h-44 w-44  rounded-full flex items-center justify-center text-white font-bold text-4xl">
            <div className="absolute w-full h-full bg-white/[0.05] rounded-full blur-sm" />
            <span className="dark:text-white text-black z-20">{text}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export function CardPattern({
  mouseX,
  mouseY,
  onMouseMove,
  isHovered,
}: {
  mouseX: any;
  mouseY: any;
  onMouseMove: any;
  isHovered: boolean;
}) {
  let maskImage = useMotionValue<string>(
    "radial-gradient(250px 250px at 50% 50%, white, transparent)"
  );
  let style = {
    maskImage: useMotionValue<string>(
      `radial-gradient(250px 250px at 50% 50%, black, transparent)`
    ),
    WebkitMaskImage: useMotionValue<string>(
      `radial-gradient(250px 250px at 50% 50%, black, transparent)`
    ),
  };

  useEffect(() => {
    if (!isHovered) {
      maskImage.set("radial-gradient(250px 250px at 50% 50%, white, transparent)");
    } else {
      maskImage.set(
        `radial-gradient(250px 250px at ${mouseX.get()}px ${mouseY.get()}px, white, transparent)`
      );
    }
  }, [isHovered, mouseX, mouseY]);


  return (
    <div className="absolute inset-0 rounded-lg [mask-image:radial-gradient(350px_350px_at_50%_50%,white,transparent)] group-hover/card:opacity-50 transition-opacity duration-500">
      <div
        className="absolute inset-0 "
        style={{
          maskImage,
          WebkitMaskImage: maskImage,
        }}
      >
        <p
          className="absolute inset-x-0 text-center h-full w-full break-words whitespace-pre-wrap text-white text-xs font-mono"
          style={{
            maskImage,
            WebkitMaskImage: maskImage,
          }}
        >
          0101010101010101010101010101010101010101010101010101010101010101
          0101010101010101010101010101010101010101010101010101010101010101
          0101010101010101010101010101010101010101010101010101010101010101
          0101010101010101010101010101010101010101010101010101010101010101
          0101010101010101010101010101010101010101010101010101010101010101
          0101010101010101010101010101010101010101010101010101010101010101
          0101010101010101010101010101010101010101010101010101010101010101
          0101010101010101010101010101010101010101010101010101010101010101
          0101010101010101010101010101010101010101010101010101010101010101
          0101010101010101010101010101010101010101010101010101010101010101
          0101010101010101010101010101010101010101010101010101010101010101
        </p>
      </div>
    </div>
  );
}

export const EvervaultCardContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "h-[20rem] w-96 bg-black relative flex items-center justify-center",
        className
      )}
    >
      {children}
    </div>
  );
};
