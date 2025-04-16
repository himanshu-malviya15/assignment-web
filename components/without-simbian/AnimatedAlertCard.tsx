"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Icons remain unchanged
export const AlertIcon = ({ className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`w-6 h-6 ${className}`}
  >
    <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"></path>
    <line x1="12" y1="9" x2="12" y2="13"></line>
    <line x1="12" y1="17" x2="12.01" y2="17"></line>
  </svg>
);

export const WarningIcon = ({ className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`w-6 h-6 ${className}`}
  >
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" y1="8" x2="12" y2="12"></line>
    <line x1="12" y1="16" x2="12.01" y2="16"></line>
  </svg>
);

export const ShieldIcon = ({ className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`w-6 h-6 ${className}`}
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
  </svg>
);

// Alert data unchanged
export const ignoredAlertExamples = [
  "Network scan from internal IP",
  "DNS lookup for rare domain",
  "Failed login attempt",
  "Port scan detected",
  "Unclassified network traffic",
  "Unusual process activity",
  "Large file transfer",
  "Antivirus update",
  "New device connected",
  "Authentication timeout",
];

export const wronglyClosedExamples = [
  "False positive malware alert",
  "Legitimate access marked suspicious",
  "Normal traffic pattern flagged",
  "Dev testing identified as attack",
  "VPN connection mistaken for breach",
];

export const activeThreatsExamples = [
  "Phishing attempt detected",
  "Brute force attack",
  "Potential data exfiltration",
  "Command and control traffic",
  "Ransomware indicators",
];

interface AlertCardProps {
  title: string;
  initialCount: number;
  countIncreaseInterval: number;
  icon: React.ReactNode;
  color: string;
  alertExamples: string[];
  issueDescription: string;
}

export const AnimatedAlertCard: React.FC<AlertCardProps> = ({
  title,
  initialCount,
  countIncreaseInterval,
  icon,
  color,
  alertExamples,
  issueDescription,
}) => {
  const [count, setCount] = useState(initialCount);
  const [alerts, setAlerts] = useState<{ id: number; text: string }[]>([]);
  const [latestAlert, setLatestAlert] = useState<number | null>(null);

  useEffect(() => {
    const countInterval = setInterval(() => {
      setCount((prev) => prev + Math.floor(Math.random() * 3) + 1);
    }, countIncreaseInterval);

    const alertInterval = setInterval(() => {
      const newAlert = {
        id: Date.now(),
        text: alertExamples[Math.floor(Math.random() * alertExamples.length)],
      };

      setAlerts((prev) => {
        const updated = [newAlert, ...prev].slice(0, 3);
        return updated;
      });

      setLatestAlert(newAlert.id);

      setTimeout(() => {
        setLatestAlert(null);
      }, 1500);
    }, Math.random() * 3000 + 2000);

    return () => {
      clearInterval(countInterval);
      clearInterval(alertInterval);
    };
  }, [alertExamples, countIncreaseInterval]);

  const colorClasses = {
    red: "border-red-500 bg-red-900/20",
    yellow: "border-yellow-500 bg-yellow-900/20",
    blue: "border-blue-500 bg-blue-900/20",
  };

  const iconColors = {
    red: "text-red-500",
    yellow: "text-yellow-500",
    blue: "text-blue-500",
  };

  const countColors = {
    red: "text-red-400",
    yellow: "text-yellow-400",
    blue: "text-blue-400",
  };

  const alertsContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05,
      },
    },
  };

  const alertItemVariants = {
    hidden: { opacity: 0, height: 0, scale: 0.95, marginBottom: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      scale: 1,
      marginBottom: 8,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      height: 0,
      scale: 0.95,
      marginBottom: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  const countVariants = {
    initial: { opacity: 0.5, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9, y: 10 },
  };

  const glowBoxShadow = {
    red: "0 0 12px rgba(239, 68, 68, 0.4)",
    yellow: "0 0 12px rgba(234, 179, 8, 0.4)",
    blue: "0 0 12px rgba(96, 165, 250, 0.4)",
  };

  return (
    <motion.div
      className={`rounded-lg border p-5 ${
        colorClasses[color as keyof typeof colorClasses]
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      <div className="flex items-center mb-4">
        <motion.div
          className={`mr-3 ${iconColors[color as keyof typeof iconColors]}`}
          initial={{ rotate: -5, scale: 0.95 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {icon}
        </motion.div>
        <motion.h3
          className="text-lg font-medium text-gray-200"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {title}
        </motion.h3>
      </div>

      <AnimatePresence mode="popLayout">
        <motion.div
          key={count}
          className={`text-4xl font-bold mb-4 ${
            countColors[color as keyof typeof countColors]
          }`}
          variants={countVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{
            type: "spring",
            stiffness: 150,
            damping: 20,
            mass: 0.5,
          }}
        >
          {count}
        </motion.div>
      </AnimatePresence>

      <motion.div
        className="space-y-2 mb-4 overflow-hidden"
        variants={alertsContainerVariants}
        initial="hidden"
        animate="visible"
        layout
      >
        <AnimatePresence initial={false}>
          {alerts.map((alert) => (
            <motion.div
              key={alert.id}
              layout
              className={`relative text-sm p-2 rounded bg-gray-800/50 ${
                latestAlert === alert.id ? `border` : ""
              }`}
              style={{
                borderColor:
                  latestAlert === alert.id
                    ? `var(--tw-${color}-500, currentColor)`
                    : undefined,
              }}
              variants={alertItemVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              whileHover={{ scale: 1.01 }}
            >
              {alert.text}
              {latestAlert === alert.id && (
                <motion.div
                  className="absolute inset-0 rounded pointer-events-none"
                  initial={{ opacity: 0.5, boxShadow: "0 0 0px rgba(0,0,0,0)" }}
                  animate={{
                    opacity: 0,
                    boxShadow:
                      glowBoxShadow[color as keyof typeof glowBoxShadow],
                  }}
                  transition={{ duration: 1 }}
                />
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <motion.div
        className="text-sm text-gray-400 italic border-t border-gray-700 pt-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {issueDescription}
      </motion.div>
    </motion.div>
  );
};
