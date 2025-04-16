"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { MenuIcon, XIcon } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <motion.nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-opacity-90 backdrop-blur-md py-2" : "bg-opacity-0 py-4"
      } bg-slate-900`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <div className="h-8 w-8 mr-2 bg-blue-500 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="text-white text-xl font-semibold">Simbian</span>
            </div>
          </div>

          <div className="hidden md:flex ml-10 items-center space-x-4">
            {["Products", "Company", "Resources", "Blog"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                {item}
              </a>
            ))}
          </div>

          <div className="hidden md:block">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
              Book a Demo 🛡️
            </button>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-gray-300 focus:outline-none"
            >
              {menuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <motion.div
          className="md:hidden bg-slate-800 bg-opacity-95 px-4 pt-2 pb-4 space-y-3 text-center"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {["Products", "Company", "Resources", "Blog"].map((item) => (
            <a
              key={item}
              href="#"
              className="block text-gray-300 hover:text-white py-2 text-base font-medium"
            >
              {item}
            </a>
          ))}
          <button className="w-full bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold mt-2">
            Book a Demo 🛡️
          </button>
        </motion.div>
      )}
    </motion.nav>
  );
}
