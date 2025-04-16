"use client";

import type React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { SmallCardIcons } from "./without-simbian/constants";

interface MetricCardProps {
  title: string;
  count: number;
  targetCount: number;
  icon: React.ReactNode;
  color: "green";
  isActive: boolean;
  showAlertIcons?: boolean;
  iconCount?: number;
}

export default function MetricCard({
  title,
  count: initialCount,
  targetCount,
  icon,
  color,
  isActive,
  showAlertIcons = true,
  iconCount = 10,
}: MetricCardProps) {
  const [count, setCount] = useState(initialCount);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animatedIcons, setAnimatedIcons] = useState<number[]>([]);

  const prevCountRef = useRef(initialCount);

  const glowClasses = {
    green: "glow-green",
  };

  // Update animated icons based on the count
  useEffect(() => {
    const newIcons = Array.from({ length: Math.min(count, iconCount) }).map(
      (_, i) => i
    );
    setAnimatedIcons(newIcons);
    prevCountRef.current = count;
  }, [count, iconCount]);

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount === targetCount) return prevCount;

        const newCount =
          prevCount > targetCount ? prevCount - 1 : prevCount + 1;
        return newCount;
      });
    }, 400); // Decrease speed if you want it faster

    return () => clearInterval(interval);
  }, [isActive, targetCount]);

  return (
    <motion.div
      className={`bg-blue-900 bg-opacity-30 p-6 rounded-lg relative overflow-hidden border border-blue-700 ${
        isAnimating ? glowClasses[color] : ""
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex items-center mb-3">
        <div className="mr-3 text-gray-300 overflow-visible">{icon}</div>
        <h3 className="text-lg font-medium text-gray-200">{title}</h3>
        <motion.span
          className={`ml-auto text-5xl font-bold text-green-400`}
          key={count}
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          {count}
        </motion.span>
      </div>

      {showAlertIcons && (
        <div className="mt-4 flex items-center -space-x-2">
          <AnimatePresence>
            {animatedIcons
              .slice(0, Math.min(8, animatedIcons.length))
              .map((i) => (
                <motion.div
                  key={i}
                  className="p-0.5 bg-white bg-opacity-10 rounded-full"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.6, y: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-6 h-6 flex items-center justify-center">
                    <Image
                      src={SmallCardIcons[i % SmallCardIcons.length]}
                      alt="Alert Icon"
                      width={24}
                      height={24}
                      className="w-10 h-6"
                    />
                  </div>
                </motion.div>
              ))}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
}
