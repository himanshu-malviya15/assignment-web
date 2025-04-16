"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Navbar from "@/components/navbar";
import { WithoutSimbian } from "@/components/without-simbian/without-simbian";
import WithSimbian from "@/components/with-sembian/with-simbian";

export default function Home() {
  const [activeSection, setActiveSection] = useState<"without" | "with">(
    "without"
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      const windowHeight = window.innerHeight;

      if (position < windowHeight * 0.5) {
        setActiveSection("without");
      } else {
        setActiveSection("with");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <main
      ref={containerRef}
      className="flex min-h-screen flex-col items-center"
    >
      <Navbar />
      <motion.div
        className="fixed inset-0 z-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: "url('/world-map.svg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          y: backgroundY,
        }}
      />

      <section
        id="without-simbian"
        className="w-full min-h-screen without-simbian-bg relative z-10"
      >
        <WithoutSimbian />
      </section>

      <section
        id="with-simbian"
        className="w-full min-h-screen with-simbian-bg relative z-10"
      >
        <WithSimbian isActive={activeSection === "with"} />
      </section>
    </main>
  );
}
