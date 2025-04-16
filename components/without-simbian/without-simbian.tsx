"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { issueTexts, SmallCardIcons } from "../constants";
import {
  IgnoredIcon,
  WronglyClosedIcon,
  ActiveThreatIcon,
  ErrorIcon,
  MonitorIcon,
  ClockIcon,
} from "../icons";
import { AlertCard } from "./AlertCard";
import { SmallAlert } from "./SmallAlert";
import { IssueCard } from "./IssueCard";

export const WithoutSimbian = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [activeThreatsCount, setActiveThreatsCount] = useState(1);
  const [ignoredAlertsCount, setIgnoredAlertsCount] = useState(193);
  const [wronglyClosedCount, setWronglyClosedCount] = useState(23);
  const [currentAnimation, setCurrentAnimation] = useState<string | null>(null);
  const [currentIssueIndex, setCurrentIssueIndex] = useState<number | null>(
    null
  );

  const ignoredContainerRef = useRef<HTMLDivElement>(null);
  const wronglyClosedContainerRef = useRef<HTMLDivElement>(null);
  const activeThreatsContainerRef = useRef<HTMLDivElement>(null);
  const issueCardRef = useRef<HTMLDivElement>(null);
  const lastIconRef = useRef<HTMLDivElement>(null);

  const issueIcons = [ErrorIcon, MonitorIcon, ClockIcon];

  useEffect(() => {
    setIsMounted(true);

    let issueInterval: NodeJS.Timeout;
    let alertTimeout: NodeJS.Timeout;

    issueInterval = setInterval(() => {
      setCurrentIssueIndex((prevIndex) =>
        prevIndex === null ? 0 : (prevIndex + 1) % issueIcons.length
      );
    }, 2000);

    const startAlertLoop = () => {
      setCurrentAnimation("ignored");

      setTimeout(() => {
        setIgnoredAlertsCount((prev) => (prev > 0 ? prev - 1 : 193));
        setActiveThreatsCount((prev) => (prev >= 999 ? 0 : prev + 1));
        setTimeout(() => {
          setCurrentAnimation("wronglyClosed");

          setTimeout(() => {
            setWronglyClosedCount((prev) => (prev > 0 ? prev - 1 : 23));
            setActiveThreatsCount((prev) => (prev >= 999 ? 0 : prev + 1));
            setCurrentAnimation(null);
            alertTimeout = setTimeout(startAlertLoop, 2000);
          }, 800);
        }, 1200);
      }, 800);
    };

    const initialDelay = 1000;
    const initialTimeout = setTimeout(startAlertLoop, initialDelay);

    return () => {
      clearInterval(issueInterval);
      clearTimeout(initialTimeout);
      clearTimeout(alertTimeout);
    };
  }, []);

  if (!isMounted) {
    return <div className="min-h-screen pt-24 pb-16" />;
  }

  const validIndex =
    currentIssueIndex !== null && currentIssueIndex < issueIcons.length
      ? currentIssueIndex
      : 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#17182B] to-[#091013]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
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

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-5/12 flex justify-center lg:justify-start mt-4 lg:mt-24">
            <AnimatePresence mode="wait">
              {currentIssueIndex !== null && (
                <div ref={issueCardRef} className="w-full max-w-md">
                  <IssueCard
                    key={currentIssueIndex}
                    icon={issueIcons[validIndex]}
                    title={issueTexts[validIndex]}
                    description={issueTexts[validIndex]}
                    isActive
                    index={validIndex}
                  />
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* Right: Alert Flow */}
          <div className="w-full lg:w-7/12 relative flex flex-col items-end lg:items-start -mt-64 lg:mt-0">
            {/* Vertical icons and connection line */}
            <motion.div
              className="flex flex-col items-center gap-4 mb-8 lg:absolute lg:left-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {SmallCardIcons.slice(0, 2).map((src, index) => (
                <div key={index} className="shadow">
                  <Image src={src} alt="Alert Icon" width={44} height={44} />
                </div>
              ))}

              <div ref={lastIconRef} className="shadow relative">
                <Image
                  src={SmallCardIcons[2]}
                  alt="Alert Icon"
                  width={44}
                  height={44}
                />
                <motion.div
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-full"
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  transition={{ delay: 1, duration: 0.5 }}
                >
                  <div className="flex items-center">
                    <div className="w-0 h-0 border-t-4 border-b-4 border-r-8 border-t-transparent border-b-transparent border-r-green-400" />
                    <div className="h-0.5 w-20 bg-green-400" />
                  </div>
                </motion.div>
              </div>

              <div className="flex flex-col items-center mt-2">
                <div className="w-0.5 bg-white h-32 sm:h-40 md:h-56 lg:h-64" />
                <div className="w-0 h-0 border-l-4 border-r-4 border-t-8 border-l-transparent border-r-transparent border-t-white mt-1" />
              </div>
            </motion.div>

            {/* Alert Cards */}
            <div className="w-full mt-8 lg:mt-36 space-y-6 pl-0 sm:pl-8 md:pl-16 lg:pl-20">
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

              {/* Alert animations */}
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
