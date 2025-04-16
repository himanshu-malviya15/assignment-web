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
  color: "red" | "yellow" | "green";
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

  const colorClasses = {
    red: "text-red-500",
    yellow: "text-yellow-500",
    green: "text-green-400",
  };

  const glowClasses = {
    red: "glow-red",
    yellow: "glow-yellow",
    green: "glow-green",
  };

  // Animate count
  useEffect(() => {
    if (!isActive) return;

    let timeout: NodeJS.Timeout;
    const interval = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount === targetCount) return prevCount;
        const increment = prevCount < targetCount ? 1 : -1;
        return prevCount + increment;
      });

      if (count !== targetCount) {
        setIsAnimating(true);
        timeout = setTimeout(() => setIsAnimating(false), 500);
      }
    }, 100);

    return () => {
      clearInterval(interval);
      if (timeout) clearTimeout(timeout);
    };
  }, [isActive, count, targetCount]);

  // Update animated icons based on the count
  useEffect(() => {
    const newIcons = Array.from({ length: Math.min(count, iconCount) }).map(
      (_, i) => i
    );
    setAnimatedIcons(newIcons);
    prevCountRef.current = count;
  }, [count, iconCount]);

  return (
    <motion.div
      className={`bg-slate-800 bg-opacity-50 p-5 rounded-lg relative overflow-hidden ${
        isAnimating ? glowClasses[color] : ""
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex items-center mb-3">
        <div className="mr-3 text-gray-400 overflow-visible">{icon}</div>
        <h3 className="text-lg font-medium text-gray-200">{title}</h3>
      </div>

      <div className="flex justify-between items-center">
        <motion.span
          className={`text-4xl font-bold ${colorClasses[color]}`}
          key={count}
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          {count}
        </motion.span>
      </div>

      {showAlertIcons && (
        <div className="mt-3 flex flex-row items-center gap-1">
          <AnimatePresence>
            {animatedIcons.map((i) => (
              <motion.div
                key={i}
                className="p-1 bg-white bg-opacity-10 rounded"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6, y: 10 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={SmallCardIcons[i % SmallCardIcons.length]}
                  alt="Small Alert Icon"
                  width={20}
                  height={20}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
}
