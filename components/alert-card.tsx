"use client";

import type React from "react";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface AlertCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: "red" | "yellow" | "blue";
  delay?: number;
  isActive?: boolean;
}

export default function AlertCard({
  icon,
  title,
  description,
  color,
  delay = 0,
  isActive = true,
}: AlertCardProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  const colorClasses = {
    red: "border-red-500",
    yellow: "border-yellow-500",
    blue: "border-blue-500",
  };

  // Periodically animate the card when active
  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 500);
    }, 5000 + Math.random() * 5000); // Random interval between 5-10 seconds

    return () => clearInterval(interval);
  }, [isActive]);

  return (
    <motion.div
      className={`alert-card p-4 rounded-lg border-l-4 ${colorClasses[color]} mb-4 transition-all duration-300`}
      initial={{ opacity: 0, x: -50 }}
      animate={{
        opacity: 1,
        x: 0,
        scale: isAnimating ? 1.03 : 1,
        boxShadow: isAnimating ? `0 0 15px rgba(239, 68, 68, 0.5)` : "none",
      }}
      transition={{
        duration: 0.5,
        delay,
        scale: { type: "spring", stiffness: 300 },
      }}
    >
      <div className="flex items-start">
        <div className="flex-shrink-0 mt-1">{icon}</div>
        <div className="ml-3">
          <h3 className="text-lg font-medium text-white">{title}</h3>
          <p className="mt-1 text-sm text-gray-300">{description}</p>
        </div>
      </div>
    </motion.div>
  );
}
