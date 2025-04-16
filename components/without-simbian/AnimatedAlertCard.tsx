"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

interface AnimatedAlertCardProps {
  title: string;
  icon: React.FC;
  textColor: string;
  initialCount: number;
  alertType: string;
  isActive?: boolean;
}

const dummyAlerts = [
  "Phishing Email",
  "Suspicious Login",
  "Unusual Port Activity",
  "Malware Downloaded",
  "Access from Unknown IP",
];

export const AnimatedAlertCard: React.FC<AnimatedAlertCardProps> = ({
  title,
  icon: Icon,
  textColor,
  initialCount,
  alertType,
  isActive = false,
}) => {
  const [count, setCount] = useState(initialCount);
  const [alerts, setAlerts] = useState<string[]>([]);
  const [shake, setShake] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const newAlert =
        dummyAlerts[Math.floor(Math.random() * dummyAlerts.length)];

      setAlerts((prev) => [...prev, newAlert]);
      setCount((prev) => prev + 1);
      setShake(true);

      setTimeout(() => setShake(false), 600);
    }, 3500); // Alert drops every ~3.5s

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className={clsx(
        "relative bg-black bg-opacity-20 backdrop-blur-sm rounded-xl p-5 border border-gray-700 overflow-hidden",
        shake && "ring-2 ring-red-500"
      )}
      animate={{ scale: shake ? 1.03 : 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 bg-red-500 rounded-full flex items-center justify-center text-white">
            <Icon />
          </div>
          <h2 className={clsx("text-lg font-semibold", textColor)}>{title}</h2>
        </div>
        <motion.span
          className="text-white text-xl font-bold"
          key={count}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1.2, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {count}
        </motion.span>
      </div>

      <div className="mt-2 space-y-1 max-h-24 overflow-hidden text-sm text-white">
        <AnimatePresence initial={false}>
          {alerts.slice(-3).map((alert, idx) => (
            <motion.div
              key={`${alert}-${idx}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
              className="bg-red-500 bg-opacity-20 rounded px-3 py-1"
            >
              {alert}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
