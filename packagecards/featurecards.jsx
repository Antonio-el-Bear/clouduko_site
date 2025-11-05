import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

export default function FeatureCard({ icon: Icon, title, description, color, index }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="h-64"
      style={{ perspective: "1000px" }}
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring" }}
        onHoverStart={() => setIsFlipped(true)}
        onHoverEnd={() => setIsFlipped(false)}
        className="relative w-full h-full cursor-pointer"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front */}
        <Card 
          className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-950 border-gray-800 hover:border-gray-700"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="p-8 h-full flex flex-col items-center justify-center text-center">
            <motion.div
              animate={{ scale: isFlipped ? 0.8 : 1 }}
              transition={{ duration: 0.3 }}
              className={`w-16 h-16 rounded-2xl ${color} flex items-center justify-center mb-6`}
            >
              <Icon className="w-8 h-8 text-white" />
            </motion.div>
            <h3 className="text-xl font-bold mb-3">{title}</h3>
            <p className="text-sm text-gray-400">{description}</p>
          </div>
        </Card>

        {/* Back */}
        <Card 
          className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700"
          style={{ 
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)"
          }}
        >
          <div className="p-8 h-full flex flex-col items-center justify-center text-center">
            <div className={`w-20 h-20 rounded-full ${color} flex items-center justify-center mb-4 opacity-20`}>
              <Icon className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              {title}
            </h3>
            <p className="text-gray-300">{description}</p>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
}