import React from "react";
import { skills } from "@/lib/data";
import { motion } from "framer-motion";

const categoryLabels: Record<string, string> = {
  programmingLanguages: "Programming Languages",
  web: "Web",
  cloudAndDevOps: "Cloud & DevOps",
  DLFrameworks: "Deep Learning Frameworks",
  NotetakingTools: "Notetaking Tools",
};

export default function SkillsSection() {
  return (
    // 直接回傳 flex 容器，確保沒有任何 bg- 樣式
    <div className="flex flex-col gap-6 md:gap-8 w-full mt-2 md:mt-0">
      {Object.entries(skills).map(([key, items], index) => (
        <motion.div
          key={key}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-4 md:gap-6 items-start"
        >
          <h3 className="text-lg font-bold tracking-wide mt-1">
            {categoryLabels[key] || key}
          </h3>

          <div className="flex flex-wrap gap-2 md:gap-3">
            {items.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1.5 text-sm rounded-lg bg-card border border-border text-muted-foreground hover:text-foreground hover:border-purple-500/30 transition-colors shadow-sm dark:bg-card/40 dark:border-white/10"
              >
                {skill}
              </span>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}