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
  WarningIcon,
} from "./icons";
import { AlertCard } from "./AlertCard";
import { SmallAlert } from "./SmallAlert";
import { IssueCard } from "./IssueCard";

export const WithoutSimbian: React.FC<WithoutSimbianProps> = ({
  standalone = false,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [activeThreatsCount, setActiveThreatsCount] = useState(1);
  const [ignoredAlertsCount, setIgnoredAlertsCount] = useState(193);
  const [wronglyClosedCount, setWronglyClosedCount] = useState(23);
  const [showIssueCards] = useState([true, true, true]);
  const [currentAnimation, setCurrentAnimation] = useState<string | null>(null);

  // Create non-null refs
  const ignoredContainerRef = useRef<HTMLDivElement>(null);
  const wronglyClosedContainerRef = useRef<HTMLDivElement>(null);
  const activeThreatsContainerRef = useRef<HTMLDivElement>(null);

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        {/* Main content */}
        <div className="grid grid-cols-12 gap-8">
          {/* Left column - Issue Cards */}
          <div className="col-span-12 md:col-span-6 space-y-6 mt-32">
            <AnimatePresence>
              {showIssueCards.map(
                (show, index) =>
                  show && (
                    <IssueCard
                      key={index}
                      icon={issueIcons[index]}
                      title={issueTexts[index]}
                      index={index}
                      description={issueTexts[index]}
                      isActive={true}
                    />
                  )
              )}
            </AnimatePresence>
          </div>

          {/* Right column - Simbian Features */}
          <div className="col-span-12 md:col-span-6">
            <motion.div
              className="mb-12 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                Without Simbian
              </h1>
              <p className="text-xl text-gray-200">
                If this sounds all too familiar, you might want to...
              </p>
            </motion.div>

            <div className="space-y-6">
              <div ref={ignoredContainerRef}>
                <AlertCard
                  title="Ignored Alerts"
                  count={ignoredAlertsCount}
                  icon={IgnoredIcon}
                  isAnimating={currentAnimation === "ignored"}
                  textColor="text-blue-400"
                />
              </div>

              <div ref={wronglyClosedContainerRef}>
                <AlertCard
                  title="Wrongly Closed"
                  count={wronglyClosedCount}
                  icon={WronglyClosedIcon}
                  isAnimating={currentAnimation === "wronglyClosed"}
                  textColor="text-blue-400"
                />
              </div>

              <div ref={activeThreatsContainerRef}>
                <AlertCard
                  title="Active Threats"
                  count={activeThreatsCount}
                  icon={ActiveThreatIcon}
                  isActive
                  isReceiving={currentAnimation !== null}
                  textColor="text-red-400"
                />
              </div>

              <AnimatePresence>
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
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
