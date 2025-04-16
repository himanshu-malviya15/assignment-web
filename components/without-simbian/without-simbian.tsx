// components/without-simbian/index.tsx
"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { WithoutSimbianProps } from "./types";
import { issueTexts } from "./constants";
import {
  IgnoredIcon,
  WronglyClosedIcon,
  ActiveThreatIcon,
  ErrorIcon,
  MonitorIcon,
  ClockIcon,
} from "./icons";
import { AlertCard } from "./AlertCard";
import { SmallAlert } from "./SmallAlert";
import { IssueCard } from "./IssueCard";
import { ComputerIcon, LayersIcon } from "../icons";
import {
  activeThreatsExamples,
  AnimatedAlertCard,
  ignoredAlertExamples,
  ShieldIcon,
  wronglyClosedExamples,
  WarningIcon,
  AlertIcon,
} from "./AnimatedAlertCard";

export const WithoutSimbian: React.FC<WithoutSimbianProps> = ({
  standalone = false,
}) => {
  const [currentAlertIndex, setCurrentAlertIndex] = useState(0);
  const alertMessages = [
    {
      title: "Missed It!",
      description: "We have more alerts than time to triage them.",
      icon: <ErrorIcon />,
    },
    {
      title: "Wasting valuable analyst time on false positives",
      description:
        "Analysts spend hours investigating alerts that turn out to be nothing.",
      icon: <ErrorIcon />,
    },
    {
      title: "Processing one alert at a time, missing the big picture",
      description:
        "Without context, it's impossible to see patterns across alerts.",
      icon: <ComputerIcon />,
    },
    {
      title: "More time fixing SOAR automation, less time on real threats",
      description:
        "Maintaining automation rules takes more time than the threats they catch.",
      icon: <ClockIcon />,
    },
  ];

  const [isMounted, setIsMounted] = useState(false);
  const [activeThreatsCount, setActiveThreatsCount] = useState(5);
  const [ignoredAlertsCount, setIgnoredAlertsCount] = useState(200);
  const [wronglyClosedCount, setWronglyClosedCount] = useState(35);
  const [currentAnimation, setCurrentAnimation] = useState<string | null>(null);

  // Create non-null refs
  const ignoredContainerRef = useRef<HTMLDivElement>(null);
  const wronglyClosedContainerRef = useRef<HTMLDivElement>(null);
  const activeThreatsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAlertIndex((prev) => (prev + 1) % alertMessages.length);
    }, 3000); // Change alert every 1 second

    return () => clearInterval(interval);
  }, []);
  // Handle alert movement

  useEffect(() => {
    setIsMounted(true);

    const initialDelay = standalone ? 2000 : 3000;

    // First animation: Ignored Alerts to Active Threats
    setTimeout(() => {
      setCurrentAnimation("ignored");

      // After animation completes, increment count
      setTimeout(() => {
        setIgnoredAlertsCount((prev) => prev - 1);
        setActiveThreatsCount((prev) => prev + 1);

        // Second animation: Wrongly Closed to Active Threats after delay
        setTimeout(() => {
          setCurrentAnimation("wronglyClosed");

          // After second animation completes, increment count again
          setTimeout(() => {
            setWronglyClosedCount((prev) => prev - 1);
            setActiveThreatsCount((prev) => prev + 1);
            setCurrentAnimation(null);
          }, 800);
        }, 1200);
      }, 800);
    }, initialDelay);
  }, [standalone]);

  const issueIcons = [ErrorIcon, MonitorIcon, ClockIcon];

  if (!isMounted) {
    return (
      <div
        className={`min-h-screen pt-24 pb-16 ${
          standalone ? "bg-simbian-dark" : ""
        }`}
      >
        {/* Static SSR version */}
      </div>
    );
  }

  return (
    <div
      className="min-h-screen"
      style={{
        background: "linear-gradient(to bottom, #17182B, #091013)",
      }}
    >
      <div className="max-w-8xl mx-auto px-2 sm:px-4 lg:px-6 pt-24 pb-16">
        {/* Full-width heading */}
        <motion.div
          className="mb-12 text-left md:text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold text-blue-400 mb-4">
            Without Simbian
          </h1>
          <p className="text-xl text-blue-300">
            If this sounds all too familiar, you might want to...
          </p>
        </motion.div>

        {/* Two-column layout: IssueCard + AlertCards */}
        <div className="grid grid-cols-12 gap-6 items-start">
          {/* Left: Issue Card (smaller) */}
          <div className="col-span-12 md:col-span-4 p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentAlertIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
              >
                <IssueCard
                  icon={() => alertMessages[currentAlertIndex].icon}
                  title={alertMessages[currentAlertIndex].title}
                  description={alertMessages[currentAlertIndex].description}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right: Animated Alert Cards (wider) */}
          <div className="col-span-12 md:col-span-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
              <AnimatedAlertCard
                title="Ignored Alerts"
                initialCount={200}
                countIncreaseInterval={4000}
                icon={<AlertIcon className="text-red-500" />}
                color="red"
                alertExamples={ignoredAlertExamples}
                issueDescription="Wasting valuable analyst time on false positives"
              />
              <AnimatedAlertCard
                title="Wrongly Closed"
                initialCount={35}
                countIncreaseInterval={6000}
                icon={<WarningIcon className="text-yellow-500" />}
                color="yellow"
                alertExamples={wronglyClosedExamples}
                issueDescription="Processing one alert at a time, missing the big picture"
              />
              <AnimatedAlertCard
                title="Active Threats"
                initialCount={5}
                countIncreaseInterval={10000}
                icon={<ShieldIcon className="text-blue-500" />}
                color="blue"
                alertExamples={activeThreatsExamples}
                issueDescription="More time fixing SOAR automation, less time on real threats"
              />
            </div>

            {/* Flying alerts */}
            {/* <AnimatePresence>
              {currentAnimation === "ignored" &&
                ignoredContainerRef.current &&
                activeThreatsContainerRef.current && (
                  <SmallAlert
                    startRef={ignoredContainerRef}
                    targetRef={activeThreatsContainerRef}
                    alertType="ignored"
                    delay={0}
                  />
                )}
            </AnimatePresence>

            <AnimatePresence>
              {currentAnimation === "wronglyClosed" &&
                wronglyClosedContainerRef.current &&
                activeThreatsContainerRef.current && (
                  <SmallAlert
                    startRef={wronglyClosedContainerRef}
                    targetRef={activeThreatsContainerRef}
                    alertType="wronglyClosed"
                    delay={0}
                  />
                )}
            </AnimatePresence> */}
          </div>
        </div>
      </div>
    </div>
  );
};
