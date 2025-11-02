'use client';
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ticker } from "/utils/tempo"; // your existing tempo hook

export default function HadithOverlay() {
  const currentTime = ticker(new Date());
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  const hadiths = [
    "The strong man is not the one who can wrestle, but the one who controls himself at the time of anger. (Bukhari)",
    "Actions are judged by intentions. (Bukhari & Muslim)",
    "The best among you are those who have the best manners and character. (Bukhari)",
    "Speak good or remain silent. (Tirmidhi)",
    "The most beloved deed to Allah is the most regular and constant, even if it is small. (Bukhari)",
  ];

  useEffect(() => {
    // Switch hadith every 40 seconds
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % hadiths.length);
      setVisible(true);

      // Hide after 10 seconds
      setTimeout(() => setVisible(false), 10000);
    }, 40000);

    // Start with visible, then hide after 10s
    const firstTimeout = setTimeout(() => setVisible(false), 10000);

    return () => {
      clearInterval(interval);
      clearTimeout(firstTimeout);
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      {visible && (
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 text-white text-center px-6"
        >
          <div className="max-w-2xl text-xl leading-relaxed font-fraunces">
            {hadiths[index]}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
