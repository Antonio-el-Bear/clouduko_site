import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight, Sparkles } from "lucide-react";

export default function PackageCard({ 
  name, 
  price, 
  upkeep, 
  description, 
  features, 
  color, 
  icon: Icon,
  roi,
  savings,
  featured,
  index,
  isActive,
  onHover 
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      onMouseEnter={() => {
        setIsHovered(true);
        onHover(name);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        onHover(null);
      }}
      className={`relative ${featured ? 'md:-mt-8' : ''}`}
    >
      {featured && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
          <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full shadow-lg">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-semibold">Most Popular</span>
          </div>
        </div>
      )}

      <motion.div
        animate={{
          rotateY: isHovered ? 5 : 0,
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{ duration: 0.3 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <Card className={`
          relative overflow-hidden bg-gradient-to-br from-gray-900 to-gray-950 
          border-gray-800 hover:border-gray-700 transition-all duration-300
          ${featured ? 'border-blue-500/50 shadow-2xl shadow-blue-500/20' : ''}
          ${isHovered ? 'shadow-2xl' : ''}
        `}>
          {/* Animated background gradient */}
          <motion.div
            className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0`}
            animate={{ opacity: isHovered ? 0.1 : 0 }}
            transition={{ duration: 0.3 }}
          />

          {/* Glow effect */}
          <motion.div
            className={`absolute -inset-1 bg-gradient-to-r ${color} rounded-lg blur-xl opacity-0`}
            animate={{ opacity: isHovered ? 0.3 : 0 }}
            transition={{ duration: 0.3 }}
          />

          <div className="relative p-8">
            {/* Icon */}
            <motion.div
              animate={{
                scale: isHovered ? 1.1 : 1,
                rotate: isHovered ? 360 : 0,
              }}
              transition={{ duration: 0.5 }}
              className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center mb-6`}
            >
              <Icon className="w-8 h-8" />
            </motion.div>

            {/* Package Name */}
            <h3 className="text-3xl font-bold mb-3">{name}</h3>

            {/* Description */}
            <p className="text-gray-400 mb-6 min-h-[60px]">{description}</p>

            {/* Pricing */}
            <div className="mb-6">
              <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                {price}
              </div>
              <div className="text-sm text-gray-500">Setup cost</div>
              <div className="text-lg text-blue-400 mt-2">{upkeep}</div>
              <div className="text-sm text-gray-500">Monthly upkeep</div>
            </div>

            {/* ROI Badge */}
            <div className="flex gap-3 mb-6">
              <div className="px-3 py-1 bg-green-500/10 border border-green-500/30 rounded-full">
                <span className="text-green-400 text-sm font-semibold">ROI {roi}</span>
              </div>
              <div className="px-3 py-1 bg-blue-500/10 border border-blue-500/30 rounded-full">
                <span className="text-blue-400 text-sm">Save {savings}</span>
              </div>
            </div>

            {/* Features */}
            <ul className="space-y-3 mb-8">
              {features.map((feature, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + idx * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <div className={`mt-1 p-1 rounded-full bg-gradient-to-r ${color}`}>
                    <Check className="w-3 h-3" />
                  </div>
                  <span className="text-sm text-gray-300">{feature}</span>
                </motion.li>
              ))}
            </ul>

            {/* CTA Button */}
            <Button 
              className={`w-full bg-gradient-to-r ${color} hover:opacity-90 text-white group`}
              size="lg"
            >
              Get Started
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
}