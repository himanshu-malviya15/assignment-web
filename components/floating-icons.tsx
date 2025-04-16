"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { AlertIcon, CheckIcon } from "./icons";

interface FloatingIconsProps {
  isActive: boolean;
  type: "alert" | "check";
  count?: number;
}

export default function FloatingIcons({
  isActive,
  type,
  count = 5,
}: FloatingIconsProps) {
  const [icons, setIcons] = useState<
    { id: number; x: number; y: number; delay: number }[]
  >([]);

  useEffect(() => {
    if (!isActive) {
      setIcons([]);
      return;
    }

    // Generate random positions for icons
    const newIcons = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: 10 + Math.random() * 80, // 10-90% of container width
      y: 60 + Math.random() * 30, // 60-90% of container height
      delay: Math.random() * 2, // Random delay between 0-2s
    }));

    setIcons(newIcons);
  }, [isActive, count]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {icons.map((icon) => (
        <motion.div
          key={icon.id}
          initial={{ opacity: 0, y: 0 }}
          animate={{
            opacity: [0, 1, 0],
            y: -100 - Math.random() * 50,
            x: (Math.random() - 0.5) * 40,
          }}
          transition={{
            duration: 3,
            delay: icon.delay,
            repeat: Number.POSITIVE_INFINITY,
            repeatDelay: 5 + Math.random() * 5,
          }}
          className={`absolute ${
            type === "alert" ? "text-red-500" : "text-green-400"
          }`}
          style={{
            left: `${icon.x}%`,
            top: `${icon.y}%`,
          }}
        >
          {type === "alert" ? <AlertIcon size={24} /> : <CheckIcon size={24} />}
        </motion.div>
      ))}
    </div>
  );
}
