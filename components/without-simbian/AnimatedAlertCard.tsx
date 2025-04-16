"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

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
