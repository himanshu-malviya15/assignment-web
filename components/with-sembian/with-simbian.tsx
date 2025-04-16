"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import MetricCard from "../metric-card";
import {
  CheckIcon,
  UserIcon,
  AutomationIcon,
  AIIcon,
  WarningIcon,
  AlertIcon,
  ShieldIcon,
} from "../icons";

interface WithSimbianProps {
  isActive: boolean;
}

export default function WithSimbian({ isActive }: WithSimbianProps) {
  const [ignoredAlerts, setIgnoredAlerts] = useState(10);
  const [wronglyClosed, setWronglyClosed] = useState(11);
  const [activeThreats, setActiveThreats] = useState(5);
  const [currentStep, setCurrentStep] = useState(0);
  const timelineRef = useRef<HTMLDivElement>(null);

  // Simulate decreasing counts when active
  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setIgnoredAlerts((prev) => (prev > 0 ? prev - 1 : 0));
      setWronglyClosed((prev) => (prev > 0 ? prev - 1 : 0));
      setActiveThreats((prev) => (prev > 0 ? prev - 1 : 0));
    }, 2000);

    return () => clearInterval(interval);
  }, [isActive]);

  // Animate through steps when section becomes active
  useEffect(() => {
    if (!isActive) {
      setCurrentStep(0);
      return;
    }

    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 1500);

    return () => clearInterval(interval);
  }, [isActive]);

  // Scroll timeline into view when step changes
  useEffect(() => {
    if (timelineRef.current && currentStep > 0) {
      const stepElement = timelineRef.current.children[currentStep - 1];
      if (stepElement) {
        stepElement.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }
  }, [currentStep]);

  const steps = [
    {
      title: "Triaged & Reported",
      description: "The SOC Agent handled investigation and reporting.",
      icon: <UserIcon size={24} color="#4ade80" />,
      delay: 0.1,
    },
    {
      title: "Automated Response",
      description: "Incident automatically contained",
      icon: <ShieldIcon size={24} color="#4ade80" />,
      delay: 0.2,
    },
    {
      title: "Comprehensive Analysis",
      description: "AI recognized patterns across your environment",
      icon: <AIIcon size={24} color="#4ade80" />,
      delay: 0.3,
    },
    {
      title: "Accurate Detection",
      description: "Zero false positives with contextual understanding",
      icon: <CheckIcon size={24} color="#4ade80" />,
      delay: 0.4,
    },
    {
      title: "24/7 Coverage",
      description: "No analyst fatigue, continuous protection",
      icon: <AutomationIcon size={24} color="#4ade80" />,
      delay: 0.5,
    },
  ];

  const resolved = currentStep === steps.length - 1;

  return (
    <div className="container mx-auto px-4 pt-24 pb-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-yellow-200 mb-2">
          With Simbian
        </h1>
        <p className="text-xl text-gray-300">
          Relax. Our AI Agents will take it from here.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <MetricCard
            title="Ignored Alerts"
            count={ignoredAlerts}
            targetCount={0}
            icon={<AlertIcon size={24} />}
            color="green"
            isActive={isActive}
          />
          <MetricCard
            title="Wrongly Closed"
            count={wronglyClosed}
            targetCount={0}
            icon={<WarningIcon size={24} />}
            color="green"
            isActive={isActive}
          />

          <MetricCard
            title="Active Threats"
            count={activeThreats}
            targetCount={0}
            icon={<AlertIcon size={24} />}
            color="green"
            isActive={isActive}
          />

          <motion.div
            className="mt-6 p-4 bg-green-900 bg-opacity-20 rounded-lg border border-green-500 border-opacity-30"
            initial={{ opacity: 0 }}
            animate={{ opacity: resolved ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center">
              <CheckIcon size={20} color="#4ade80" />
              <p className="ml-2 text-green-400 font-medium">
                All threats resolved
              </p>
            </div>
            <p className="mt-1 text-gray-300 text-sm">
              Your environment is now secure and continuously monitored
            </p>
          </motion.div>
        </div>

        <div className="relative pl-8">
          <div className="relative pl-10">
            {/* Vertical line on the far left */}
            <motion.div
              className="absolute left-3 top-0 w-1 bg-green-400 rounded"
              initial={{ height: 0 }}
              animate={{ height: isActive ? "100%" : 0 }}
              transition={{ duration: 1.5 }}
            />

            <div className="space-y-16 relative" ref={timelineRef}>
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  className="relative flex items-start"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{
                    opacity: currentStep >= index ? 1 : 0.3,
                    x: currentStep >= index ? 0 : 50,
                  }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Step dot */}
                  <motion.div
                    className="w-6 h-6 rounded-full bg-green-400 flex items-center justify-center absolute left-0 top-2"
                    initial={{ scale: 0 }}
                    animate={{ scale: currentStep >= index ? 1 : 0 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <CheckIcon size={16} color="#0f172a" />
                  </motion.div>

                  {/* Step content */}
                  <div className="ml-12 bg-slate-800 bg-opacity-50 p-4 rounded-lg w-full">
                    <div className="flex items-center mb-2">
                      <div className="mr-3 text-green-400">{step.icon}</div>
                      <h3 className="text-lg font-medium text-green-300">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-gray-300">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating checkmarks animation when all threats are resolved */}
      {resolved && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 0 }}
              animate={{
                opacity: [0, 1, 0],
                y: -100,
                x: Math.random() * 20 - 10,
              }}
              transition={{
                duration: 2,
                delay: i * 0.5,
                repeat: Number.POSITIVE_INFINITY,
                repeatDelay: 3,
              }}
              className="absolute text-green-400"
              style={{
                left: `${20 + i * 15}%`,
                top: "80%",
              }}
            >
              <CheckIcon size={24} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
