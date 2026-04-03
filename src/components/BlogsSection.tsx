import React, { useState, useMemo } from "react";
import type { CollectionEntry } from "astro:content";
import {
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { GlassCard } from "./ui/glass-card";
import MotionWrapper from "./MotionWrapper";
import { motion, AnimatePresence } from "framer-motion";

interface BlogsSectionProps {
  posts: CollectionEntry<"posts">[];
}

export default function BlogsSection({ posts }: BlogsSectionProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const allTags = useMemo(() => {
    const tags = posts.flatMap((post) => post.data.tags || []);
    return Array.from(new Set(tags));
  }, [posts]);

  const toggleTag = (tagToToggle: string) => {
    setSelectedTags((prevTags) => {
      if (prevTags.includes(tagToToggle)) {
        return prevTags.filter((tag) => tag !== tagToToggle);
      } else {
        return [...prevTags, tagToToggle];
      }
    });
  };

  const filteredPosts = useMemo(() => {
    if (selectedTags.length === 0) return posts;
    
    return posts.filter((post) => {
      const postTags = post.data.tags || [];
      return selectedTags.every((selectedTag) => postTags.includes(selectedTag));
    });
  }, [posts, selectedTags]);

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <section id="blogs" className="py-12 relative">
      <div className="container max-w-4xl mx-auto px-6 md:px-4">
        <MotionWrapper>
          <h2 className="text-2xl font-bold mb-6 text-center md:text-left">
            Blogs
          </h2>
        </MotionWrapper>

        {/* --- Tags Block --- */}
        <MotionWrapper delay={0.1}>
          <div className="flex flex-wrap gap-2 mb-8 justify-center md:justify-start">
            <button
              onClick={() => setSelectedTags([])}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedTags.length === 0
                  ? "bg-purple-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                  : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-gray-200 border border-white/10"
              }`}
            >
              All
            </button>
            {allTags.map((tag) => {
              const isSelected = selectedTags.includes(tag);
              return (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                    isSelected
                      ? "bg-purple-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                      : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-gray-200 border border-white/10"
                  }`}
                >
                  #{tag}
                </button>
              );
            })}
          </div>
        </MotionWrapper>

        {/* --- Articles Block --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.slug}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <a href={`/posts/${post.slug}`} className="block h-full group">
                  <GlassCard className="group overflow-hidden dark:border-purple-500/10 h-full flex flex-col hover:border-purple-500/30 transition-colors duration-300">
                    <CardHeader className="bg-gradient-to-r from-purple-500/5 to-pink-500/5 pb-4">
                      <div className="flex flex-col justify-between mb-2">
                        <span className="text-xs text-purple-400 font-mono mb-2">
                          {formatDate(post.data.date)}
                        </span>
                        <CardTitle className="text-center md:text-left group-hover:text-purple-500 transition-colors duration-300">
                          {post.data.title}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-grow pt-4">
                      <p className="text-sm text-muted-foreground line-clamp-3">
                        {post.data.description}
                      </p>
                    </CardContent>
                    <CardFooter className="flex flex-wrap gap-2 items-center border-t border-border/30 bg-gradient-to-r from-purple-500/5 to-pink-500/5 pt-4 pb-4">
                      {post.data.tags?.map((tag, i) => {
                        const isTagSelected = selectedTags.includes(tag);
                        return (
                          <span
                            key={i}
                            onClick={(e) => {
                              e.preventDefault();
                              toggleTag(tag);
                            }}
                            className={`text-xs px-2 py-1 rounded-full border transition-colors z-10 cursor-pointer ${
                              isTagSelected
                                ? "bg-purple-500/30 text-purple-200 border-purple-500/50"
                                : "bg-purple-500/10 text-purple-300 border-purple-500/20 hover:bg-purple-500/20"
                            }`}
                          >
                            #{tag}
                          </span>
                        );
                      })}
                    </CardFooter>
                  </GlassCard>
                </a>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {filteredPosts.length === 0 && (
            <div className="col-span-full text-center py-12 text-gray-500">
              No posts found matching all selected tags.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}