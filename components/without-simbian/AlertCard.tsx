"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { SmallCardIcons } from "../constants";

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
  textColor = "text-blue-400",
}) => {
  const bgColor = isActive
    ? "bg-red-900 bg-opacity-20"
    : "bg-blue-900 bg-opacity-10";
  const borderColor = isActive ? "border-red-800" : "border-blue-800";

  const iconCount = isActive ? Math.min(count, 3) : 8;

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
          <AnimatePresence initial={false}>
            {Array(Math.min(count, 10))
              .fill(0)
              .map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Image
                    src={SmallCardIcons[i % SmallCardIcons.length]}
                    alt="icon"
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
