"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface AlertNotificationProps {
  isActive: boolean;
  alertTypes: string[];
}

export default function AlertNotification({
  isActive,
  alertTypes,
}: AlertNotificationProps) {
  const [alerts, setAlerts] = useState<
    { id: number; type: string; time: string }[]
  >([]);

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      const randomType =
        alertTypes[Math.floor(Math.random() * alertTypes.length)];
      const now = new Date();
      const time = `${now.getHours()}:${now
        .getMinutes()
        .toString()
        .padStart(2, "0")}`;

      setAlerts((prev) => {
        const newAlerts = [
          { id: Date.now(), type: randomType, time },
          ...prev.slice(0, 4), // Keep only the 5 most recent alerts
        ];
        return newAlerts;
      });
    }, 3000); // New alert every 3 seconds

    return () => clearInterval(interval);
  }, [isActive, alertTypes]);

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm w-full">
      <AnimatePresence>
        {alerts.map((alert, index) => (
          <motion.div
            key={alert.id}
            className="bg-slate-800 border-l-4 border-yellow-500 rounded-md p-4 mb-2 shadow-lg"
            initial={{ opacity: 0, x: 100, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
            transition={{ duration: 0.3 }}
            style={{ zIndex: 100 - index }}
          >
            <div className="flex justify-between">
              <span className="font-medium text-yellow-400">{alert.type}</span>
              <span className="text-xs text-gray-400">{alert.time}</span>
            </div>
            <p className="text-sm text-gray-300 mt-1">
              New security alert detected
            </p>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
