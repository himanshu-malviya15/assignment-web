"use client";

import React from "react";
import { motion } from "framer-motion";

interface IssueCardProps {
  icon: React.FC;
  title: string;
  description: string;
}

export const IssueCard: React.FC<IssueCardProps> = ({
  icon: Icon,
  title,
  description,
}) => (
  <motion.div
    className="bg-black bg-opacity-20 backdrop-blur-sm rounded-xl p-5 border border-gray-700"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, x: -100 }}
    transition={{ duration: 0.5 }}
  >
    <div className="flex items-start space-x-4">
      <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white flex-shrink-0">
        <Icon />
      </div>
      <div>
        <h4 className="text-white text-lg font-semibold mb-1">{title}</h4>
        <p className="text-gray-300 text-sm">{description}</p>
      </div>
    </div>
  </motion.div>
);
