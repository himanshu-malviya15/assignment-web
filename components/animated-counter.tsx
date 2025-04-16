"use client";

import { motion, useTransform, useMotionValue } from "framer-motion";
import { useEffect, useRef } from "react";

interface AnimatedCounterProps {
  from: number;
  to: number;
  duration?: number;
  className?: string;
  formatter?: (value: number) => string;
}

export default function AnimatedCounter({
  from,
  to,
  duration = 1,
  className = "",
  formatter = (value) => Math.round(value).toString(),
}: AnimatedCounterProps) {
  const count = useMotionValue(from);
  const rounded = useTransform(count, (latest) => formatter(latest));
  const animationStarted = useRef(false);

  useEffect(() => {
    if (animationStarted.current) return;
    animationStarted.current = true;

    count.springTo(to, { duration: duration * 1000 });
  }, [count, to, duration]);

  return <motion.span className={className}>{rounded}</motion.span>;
}
