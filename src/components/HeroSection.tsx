import { personalInfo } from "@/lib/data";
import { Mail, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import MotionWrapper from "./MotionWrapper";

export default function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    // Removed the heavy py-16 padding since Astro's main container now handles spacing via flex gap
    <div className="w-full relative overflow-visible">
      <motion.div
        className="flex flex-col md:flex-row md:items-center justify-between mb-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Left side: Personal info & contact links */}
        <div className="text-center md:text-left">
          <motion.h1
            className="text-3xl md:text-3xl font-bold mb-2"
            variants={childVariants}
          >
            {personalInfo.name}{" "}
            <span className="inline-block animate-pulse">✨</span>
          </motion.h1>

          <motion.p
            className="text-xl text-muted-foreground mb-6"
            variants={childVariants}
          >
            NCKU Student
          </motion.p>

          <motion.div
            className="flex flex-col gap-3 items-center md:items-start"
            variants={containerVariants}
          >
            <motion.div
              className="flex items-center text-sm text-muted-foreground"
              variants={childVariants}
              whileHover={{ scale: 1.05, color: "#4b5563" }}
            >
              <MapPin className="h-4 w-4 mr-2" />
              {personalInfo.location}
            </motion.div>

            <motion.a
              href={`mailto:${personalInfo.email}`}
              className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
              variants={childVariants}
              whileHover={{ scale: 1.05, color: "#4b5563" }}
            >
              <Mail className="h-4 w-4 mr-2" />
              {personalInfo.email}
            </motion.a>

            <motion.a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
              variants={childVariants}
              whileHover={{ scale: 1.05, color: "#4b5563" }}
            >
              <img 
                src="https://cdn.simpleicons.org/github" 
                className="h-4 w-4 mr-2 dark:invert" 
                alt="GitHub Logo"
              />
              GitHub
            </motion.a>
          </motion.div>
        </div>

        {/* Right side: Profile picture with glowing effect */}
        <motion.div
          className="mt-10 md:mt-0 flex justify-center shrink-0"
          variants={childVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <img
              src={personalInfo.profilePicture}
              alt="Profile"
              className="w-48 md:w-auto h-48 md:h-56 rounded-full relative ring-2 ring-purple-500/50 shadow-xl"
              style={{ objectFit: "cover" }}
            />
          </div>
        </motion.div>
      </motion.div>

      {/* About Me Section */}
      <MotionWrapper>
        <h2 className="text-xl font-bold mb-3">About Me</h2>
        <p className="text-muted-foreground leading-relaxed text-justify">
          {personalInfo.bio}
        </p>
      </MotionWrapper>
    </div>
  );
}