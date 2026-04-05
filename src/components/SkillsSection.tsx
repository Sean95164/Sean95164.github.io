import React from "react";
import { skills } from "@/lib/data";
import MotionWrapper from "./MotionWrapper";
import { motion } from "framer-motion";

// 建立一個對應表，將 data 裡的 key 轉換成顯示在畫面上的漂亮標題
const categoryLabels: Record<string, string> = {
  programmingLanguages: "Programming Languages",
  web: "Web",
  cloudAndDevOps: "Cloud & DevOps",
  DLFrameworks: "Deep Learning Frameworks",
  NotetakingTools: "Notetaking Tools",
};

export default function SkillsSection() {
  return (
    <section
      id="skills"
      className="py-12 bg-gradient-to-b from-muted/10 to-background"
    >
      <div className="container max-w-7xl mx-auto px-6 md:px-4">
        
        {/* flex settings */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-12">
          
          {/* title */}
          <div className="md:w-1/8 shrink-0">
            <MotionWrapper>
              <h2 className="text-xl md:text-xl font-bold mb-2 text-left md:sticky md:top-24">
                Skills
              </h2>
            </MotionWrapper>
          </div>

          {/* skill tags */}
          <div className="md:w-7/8 flex flex-col gap-6 md:gap-8 mt-2 md:mt-0">
            {Object.entries(skills).map(([key, items], index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-4 md:gap-6 items-start"
              >
                {/* skills title */}
                <h3 className="text-lg font-bold tracking-wide mt-1">
                  {categoryLabels[key] || key}
                </h3>

                {/* skills tags */}
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

        </div>
      </div>
    </section>
  );
}