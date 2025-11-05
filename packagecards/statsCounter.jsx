import React, { useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

export default function StatsCounter({ value, suffix, label, delay = 0 }) {
  const [count, setCount] = useState(0);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ delay, duration: 0.5 }}
      className="text-center"
    >
      <motion.div 
        className="text-5xl md:text-6xl font-bold mb-2 bg-gradient-to-r from-red-400 via-blue-400 to-purple-400 bg-clip-text text-transparent"
        animate={{ scale: isInView ? [1, 1.1, 1] : 1 }}
        transition={{ delay: delay + 0.5, duration: 0.5 }}
      >
        {count}{suffix}
      </motion.div>
      <div className="text-gray-400 text-sm md:text-base">{label}</div>
    </motion.div>
  );
}