import { motion } from "framer-motion";
import { GlassCard } from "./glass-card";

function SkillTag({ skill, index }: { skill: string; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 0.05 * index,
      }}
      whileHover={{ scale: 1.05, y: -2 }}
      className="px-3 py-1 bg-muted/80 backdrop-blur-sm rounded-md text-sm border border-purple-500/10 shadow-sm"
    >
      {skill}
    </motion.div>
  );
}

const skillCategoryVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function SkillCategory({category, _skills, icon}: {category: string; _skills: string[]; icon?: React.ReactNode}) {
    return ( <motion.div variants={skillCategoryVariants}>
        <GlassCard className="p-4">
            <h3 className="text-lg font-medium mb-3 text-center md:text-left flex items-center">
            {icon && <span className="mr-2 text-xl">{icon}</span>}
            {category}
            </h3>
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            {_skills.map((skill, index) => (
                <SkillTag key={skill} skill={skill} index={index} />
            ))}
            </div>
        </GlassCard>
    </motion.div>
    )
}
