// components/without-simbian/SmallAlert.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { SmallCardIcons } from "./constants";

export interface SmallAlertProps {
  startRef: React.RefObject<HTMLDivElement>;
  targetRef: React.RefObject<HTMLDivElement>;
  alertType: "ignored" | "wronglyClosed";
  delay?: number;
  onComplete?: () => void;
}

export const SmallAlert: React.FC<SmallAlertProps> = ({
  startRef,
  targetRef,
  alertType,
  delay = 0,
  onComplete,
}) => {
  const [positions, setPositions] = useState<{
    start: { xPercent: number; yPercent: number };
    end: { xPercent: number; yPercent: number };
  } | null>(null);

  // Select the appropriate icon based on alert type
  const icon = alertType === "ignored" ? SmallCardIcons[0] : SmallCardIcons[1];

  useEffect(() => {
    if (!startRef.current || !targetRef.current) return;

    const calculatePositions = () => {
      const startRect = startRef.current!.getBoundingClientRect();
      const targetRect = targetRef.current!.getBoundingClientRect();

      // Find small icons container in the source card
      const sourceIconsContainer = startRef.current!.querySelector(
        ".flex.justify-start.space-x-1"
      );
      // Find small icons container in the target card
      const targetIconsContainer = targetRef.current!.querySelector(
        ".flex.justify-start.space-x-1"
      );

      let startX, startY, endX, endY;
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      if (sourceIconsContainer) {
        // Get all icon elements in the source container
        const sourceIcons = sourceIconsContainer.querySelectorAll("div");
        if (sourceIcons.length > 0) {
          // Get the last icon's position
          const lastIcon = sourceIcons[sourceIcons.length - 1];
          const lastIconRect = lastIcon.getBoundingClientRect();
          startX = ((lastIconRect.left + lastIconRect.width / 2) / vw) * 100;
          startY = ((lastIconRect.top + lastIconRect.height / 2) / vh) * 100;
        } else {
          // Fallback if no icons found
          startX = ((startRect.left + 100) / vw) * 100;
          startY = ((startRect.bottom - 25) / vh) * 100;
        }
      } else {
        // Fallback if container not found
        startX = ((startRect.left + 100) / vw) * 100;
        startY = ((startRect.bottom - 25) / vh) * 100;
      }

      if (targetIconsContainer) {
        // Get the position where a new icon would be added in the target container
        const targetIconsRect = targetIconsContainer.getBoundingClientRect();
        // Position it at the start of the container with a little offset
        endX = ((targetIconsRect.left + 10) / vw) * 100;

        // Fix: Use the bottom position instead of the center to match the icons positioning better
        // The icons are at the bottom of the card, so we need to position closer to the bottom
        endY = ((targetIconsRect.bottom - 10) / vh) * 100;
      } else {
        // Fallback if container not found
        endX = ((targetRect.left + 30) / vw) * 100;
        endY = ((targetRect.bottom - 25) / vh) * 100;
      }

      setPositions({
        start: { xPercent: startX, yPercent: startY },
        end: { xPercent: endX, yPercent: endY },
      });
    };

    // Calculate positions initially and on resize
    calculatePositions();
    window.addEventListener("resize", calculatePositions);
    return () => window.removeEventListener("resize", calculatePositions);
  }, [startRef, targetRef]);

  if (!positions) return null;

  return (
    <motion.div
      className="fixed z-50 pointer-events-none"
      style={{
        top: `calc(${positions.start.yPercent}vh)`,
        left: `calc(${positions.start.xPercent}vw)`,
      }}
      initial={{ opacity: 1, scale: 1, x: 0, y: 0 }}
      animate={{
        x: `${positions.end.xPercent - positions.start.xPercent}vw`,
        y: `${positions.end.yPercent - positions.start.yPercent}vh`,
      }}
      transition={{
        duration: 0.8,
        ease: "easeInOut",
        delay,
      }}
      onAnimationComplete={onComplete}
    >
      <div className="p-1 bg-white bg-opacity-10 rounded shadow-lg">
        <Image src={icon} alt="alert" width={20} height={20} />
      </div>
    </motion.div>
  );
};
