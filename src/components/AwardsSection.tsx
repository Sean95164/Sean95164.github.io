import React from "react";
import { awards } from "@/lib/data";
import { Trophy } from "lucide-react";
import MotionWrapper from "./MotionWrapper";
import { GlassCard } from "./ui/glass-card";
import { motion } from "framer-motion";

export default function AwardsSection() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
      {awards.map((award, index) => (
        <MotionWrapper key={award.name + award.date} delay={index * 0.1}>
          <GlassCard className="p-4 dark:border-purple-500/10 hover:border-purple-500/30 transition-all duration-300 flex flex-col h-full">
            <div className="flex items-start mb-2">
              <motion.div
                whileHover={{ rotate: 20 }}
                transition={{ type: "spring", stiffness: 500 }}
                className="flex items-center justify-center bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full p-1.5 mr-2 shrink-0 mt-0.5"
              >
                <Trophy className="h-4 w-4 text-white" />
              </motion.div>
              <h3 className="font-medium leading-snug">{award.name}</h3>
            </div>
            
            <p className="text-xs text-muted-foreground mb-1 pl-8">
              🏢 {award.issuer}
            </p>
            
            <div className="flex flex-col space-y-2 mt-auto pt-4">
              <div className="flex justify-between items-center pl-8">
                <span className="text-xs text-muted-foreground bg-background/50 px-2 py-1 rounded-md">
                  📅 {award.date}
                </span>
                <motion.span
                  className="text-xs px-2 py-1 bg-purple-500/10 rounded-full font-medium"
                  whileHover={{ scale: 1.05 }}
                >
                  {award.position}
                </motion.span>
              </div>
              <motion.span
                className="text-xs text-muted-foreground/80 bg-background/50 px-2 py-1 rounded-md w-fit ml-8"
                whileHover={{ scale: 1.05 }}
              >
                {award.type === "International" ? "🌎 " : 
                 award.type === "Institutional" ? "🏫 " : 
                 award.type === "National" ? "🇹🇼 " : ""}
                {award.type}
              </motion.span>
            </div>
          </GlassCard>
        </MotionWrapper>
      ))}
    </div>
  );
}