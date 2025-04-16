// components/without-simbian/AlertCard.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { SmallCardIcons } from "./constants";

export interface AlertCardProps {
  title: string;
  count: number;
  icon: React.FC;
  isActive?: boolean;
  isAnimating?: boolean;
  isReceiving?: boolean;
  textColor?: string;
}

export const AlertCard: React.FC<AlertCardProps> = ({
  title,
  count,
  icon: Icon,
  isActive = false,
  isAnimating = false,
  isReceiving = false,
  textColor = "text-blue-400",
}) => {
  const bgColor = isActive
    ? "bg-red-900 bg-opacity-20"
    : "bg-blue-900 bg-opacity-10";
  const borderColor = isActive ? "border-red-800" : "border-blue-800";

  // Determine which icons to show based on the card type
  const iconCount = isActive ? Math.min(count, 3) : 8; // Active threats show fewer icons

  return (
    <div className={`p-5 ${bgColor} border ${borderColor} rounded-xl relative`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <div className="text-white">
            <Icon />
          </div>
          <span className="text-xl font-medium text-white">{title}</span>
        </div>
        <motion.span
          key={count}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`text-5xl font-bold ${textColor}`}
        >
          {count}
        </motion.span>
      </div>

      <div className="mt-3 min-h-[40px]">
        <div className="flex justify-start -space-x-2">
          <AnimatePresence>
            {Array.from({
              length: isAnimating ? iconCount - 1 : iconCount,
            }).map((_, index) => (
              <motion.div
                key={index}
                className="p-1 bg-white bg-opacity-10 rounded"
                initial={false}
                exit={isAnimating ? { opacity: 0, y: 20, scale: 0.8 } : {}}
              >
                <Image
                  src={SmallCardIcons[index % SmallCardIcons.length]}
                  alt="Alert icon"
                  width={32}
                  height={20}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
