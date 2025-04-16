"use client";

import React from "react";
import { motion } from "framer-motion";

interface IssueCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  isActive: boolean;
  index?: number;
}

export const IssueCard: React.FC<IssueCardProps> = ({
  icon: Icon,
  title,
  description,
  isActive,
  index = 0,
}) => (
  <motion.div
    className="bg-black bg-opacity-20 backdrop-blur-sm rounded-xl p-5 border border-gray-700"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
    exit={{ opacity: 0, x: -100 }}
  >
    <div className="flex items-start space-x-4">
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${
          isActive ? "bg-red-500" : "bg-gray-500"
        }`}
      >
        <Icon />
      </div>
      <div>
        <p className="text-white font-semibold">{title}</p>
        <p className="text-gray-300 text-sm">{description}</p>
      </div>
    </div>
  </motion.div>
);
