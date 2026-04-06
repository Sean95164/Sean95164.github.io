import { education } from "@/lib/data";
import MotionWrapper from "./MotionWrapper";
import { motion } from "framer-motion";
import { Award, ExternalLink } from "lucide-react";

export default function EducationSection() {
  return (
        <div className="flex flex-col gap-4 w-full">
          {/* Contents */}
          <div className="flex flex-col gap-4">
            {education.map((edu, index) => (
              <motion.a
                key={edu.institution}
                href={edu.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block overflow-hidden rounded-2xl bg-card border border-border p-6 shadow-sm hover:shadow-md hover:border-purple-500/30 transition-all cursor-pointer dark:bg-card/40"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
              >

                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground">
                  <ExternalLink className="h-4 w-4" />
                </div>

                {edu.logo && (
                  <div className="absolute dark:opacity-40 pointer-events-none top-1/2 -translate-y-1/2 right-0 md:-right-4 w-40 h-40 md:w-64 md:h-64">
                    <img 
                      src={edu.logo}
                      alt="" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}
                               
                <div className="relative z-10 flex flex-col gap-1.5 w-full">
                  <h3 className="text-xl md:text-2xl font-bold tracking-tight group-hover:text-purple-500 transition-colors">
                    {edu.institution}
                  </h3>
                  <p className="text-base text-muted-foreground font-medium">
                    {edu.location}
                  </p>
                  <p className="text-base text-muted-foreground font-medium">
                    {edu.degree}
                  </p>
                  <p className="text-sm text-muted-foreground/70">
                    {edu.period}
                  </p>

                  {edu.achievements && edu.achievements.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-border/50">
                      <div className="flex items-center mb-2">
                        <Award className="h-4 w-4 text-purple-500 mr-2" />
                        <h4 className="text-sm font-medium">Achievements & Activities</h4>
                      </div>
                      <ul className="list-disc ml-5 space-y-1 text-sm text-muted-foreground">
                        {edu.achievements.map((achievement, i) => (
                          <li key={i}>{achievement}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </motion.a>
            ))}
          </div>
        </div>
  );
}