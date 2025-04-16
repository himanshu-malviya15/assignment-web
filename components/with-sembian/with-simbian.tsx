"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
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
import { SmallCardIcons } from "../without-simbian/constants";
import {
  ActiveThreatIcon,
  IgnoredIcon,
  WronglyClosedIcon,
} from "../without-simbian/icons";

interface WithSimbianProps {
  isActive: boolean;
}

export default function WithSimbian({ isActive }: WithSimbianProps) {
  const [ignoredAlerts, setIgnoredAlerts] = useState(10);
  const [wronglyClosed, setWronglyClosed] = useState(6);
  const [activeThreats, setActiveThreats] = useState(1);
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
      title: "Less noise",
      description: "90% of alerts resolved automatically, 24/7",
      icon: <AutomationIcon size={24} color="#4ade80" />,
      delay: 0.2,
    },
    {
      title: "Holistic insight",
      description: "Correlate alerts and your environment into the big picture",
      icon: <AIIcon size={24} color="#4ade80" />,
      delay: 0.3,
    },
    {
      title: "Adapts automatically",
      description:
        "No SOAR needed. Investigate every alert, including new ones, with best of Simbian's knowledge and yours.",
      icon: <ShieldIcon size={24} color="#4ade80" />,
      delay: 0.4,
    },
  ];

  const resolved = currentStep === steps.length - 1;

  return (
    <div className="container mx-auto px-4 pt-24 pb-12 bg-blue-800 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
          With Simbian
        </h1>
        <p className="text-xl text-gray-200">
          Relax. Our AI Agents will take it from here.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 space-y-6">
          <MetricCard
            title="Ignored Alerts"
            count={ignoredAlerts}
            targetCount={0}
            icon={<IgnoredIcon />}
            color="green"
            isActive={isActive}
          />
          <MetricCard
            title="Wrongly Closed"
            count={wronglyClosed}
            targetCount={0}
            icon={<WronglyClosedIcon />}
            color="green"
            isActive={isActive}
          />
          <MetricCard
            title="Active Threats"
            count={activeThreats}
            targetCount={0}
            icon={<ActiveThreatIcon />}
            color="green"
            isActive={isActive}
          />
        </div>

        <motion.div
          className="absolute left-[45rem] top-40 flex flex-col items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {/* Icon Stack */}
          {[1, 2, 3].map((_, index) => (
            <div key={index} className="justify-center shadow">
              <Image
                src={SmallCardIcons[index % SmallCardIcons.length]}
                alt="Alert Icon"
                width={44}
                height={44}
              />
            </div>
          ))}

          {/* White vertical arrow from last icon (you already had this) */}
          <div className="flex flex-col items-center">
            <div className="w-0.5 bg-white h-96" />
            <div className="w-0 h-0 border-l-4 border-r-4 border-t-8 border-l-transparent border-r-transparent border-t-white mt-1" />
          </div>
        </motion.div>

        <div className="lg:col-span-7 relative">
          <div className="relative">
            <div className="space-y-16 relative ml-32" ref={timelineRef}>
              {steps.map((step, index) => (
                <div key={index}>
                  {/* Only show horizontal line before the FIRST step */}

                  {index === 0 && (
                    <div className="flex items-center mt-16 -ml-4">
                      <div className="h-0.5 bg-green-400 w-[9rem]" />
                      <div className="w-0 h-0 border-t-4 border-b-4 border-l-8 border-t-transparent border-b-transparent border-l-green-400" />
                    </div>
                  )}
                  <motion.div className="relative flex items-start -mt-4">
                    <div className="relative ml-[10rem]">
                      <div className="flex items-center mb-2">
                        <div className="mr-3 text-green-400">{step.icon}</div>
                        <h3 className="text-lg font-medium text-green-300">
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-gray-200 text-sm">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
