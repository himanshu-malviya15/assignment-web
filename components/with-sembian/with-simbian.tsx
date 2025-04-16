"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import MetricCard from "../metric-card";
import {
  UserIcon,
  AutomationIcon,
  AIIcon,
  ShieldIcon,
} from "../../components/icons";
import { SmallCardIcons } from "../constants";
import {
  ActiveThreatIcon,
  IgnoredIcon,
  WronglyClosedIcon,
} from "../../components/icons";

interface WithSimbianProps {
  isActive: boolean;
}

export default function WithSimbian({ isActive }: WithSimbianProps) {
  const [ignoredAlerts, setIgnoredAlerts] = useState(10);
  const [wronglyClosed, setWronglyClosed] = useState(6);
  const [activeThreats, setActiveThreats] = useState(1);
  const [currentStep, setCurrentStep] = useState(0);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setIgnoredAlerts((prev) => (prev > 0 ? prev - 1 : 0));
      setWronglyClosed((prev) => (prev > 0 ? prev - 1 : 0));
      setActiveThreats((prev) => (prev > 0 ? prev - 1 : 0));
    }, 2000);

    return () => clearInterval(interval);
  }, [isActive]);

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
    },
    {
      title: "Less noise",
      description: "90% of alerts resolved automatically, 24/7",
      icon: <AutomationIcon size={24} color="#4ade80" />,
    },
    {
      title: "Holistic insight",
      description: "Correlate alerts and your environment into the big picture",
      icon: <AIIcon size={24} color="#4ade80" />,
    },
    {
      title: "Adapts automatically",
      description:
        "No SOAR needed. Investigate every alert, including new ones, with best of Simbian's knowledge and yours.",
      icon: <ShieldIcon />,
    },
  ];

  return (
    <div className="container mx-auto px-4 pt-24 pb-12 min-h-screen">
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

      <div className="flex flex-col lg:flex-row gap-12">
        <div className="flex flex-col gap-6 lg:w-1/3">
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

        <div className="relative flex-1">
          <div className="relative flex-1">
            <motion.div
              className="flex flex-col gap-4 mb-12
               md:absolute md:top-0 md:left-0 sm:top-0 sm:left-0 sm:absolute items-start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {SmallCardIcons.slice(0, 3).map((src, index) => (
                <div key={index} className="shadow">
                  <Image src={src} alt="Alert Icon" width={44} height={44} />
                </div>
              ))}

              <div className="flex flex-col items-center ml-4">
                <div className="w-0.5 bg-white h-40 sm:h-56 md:h-72 lg:h-80" />
                <div
                  className="w-0 h-0 border-l-4 border-r-4 border-t-8 
                      border-l-transparent border-r-transparent border-t-white mt-1"
                />
              </div>
            </motion.div>
          </div>
          <div
            className="sm:pl-8 md:pl-16 lg:pl-12 lg:mt-36 md:mt-36 sm:mt-36 -mt-[16rem] pl-12"
            ref={timelineRef}
          >
            {steps.map((step, index) => (
              <div key={index} className="mt-12">
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{
                    opacity: currentStep >= index ? 1 : 0.3,
                    x: 0,
                  }}
                  transition={{ duration: 0.4 }}
                  className="flex items-start gap-6"
                >
                  {index === 0 ? (
                    <>
                      <div className="flex-shrink-0 flex items-center">
                        <div className="h-0.5 bg-green-400 w-16 sm:w-24 md:w-36 lg:w-48" />
                        <div className="w-0 h-0 border-t-4 border-b-4 border-l-8 border-t-transparent border-b-transparent border-l-green-400" />
                      </div>

                      <div className="flex-shrink-0 text-green-400">
                        {step.icon}
                      </div>

                      <div className="flex flex-col">
                        <h3 className="text-lg font-semibold text-green-300">
                          {step.title}
                        </h3>
                        <p className="text-sm text-gray-200">
                          {step.description}
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex-shrink-0 w-16 sm:w-24 md:w-36 lg:w-48" />

                      <div className="flex-shrink-0 text-green-400">
                        {step.icon}
                      </div>

                      <div className="flex flex-col">
                        <h3 className="text-lg font-semibold text-green-300">
                          {step.title}
                        </h3>
                        <p className="text-sm text-gray-200">
                          {step.description}
                        </p>
                      </div>
                    </>
                  )}
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
