import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

import { useSection } from "context/section";
import useScrollActive from "hooks/useScrollActive";

const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { onSectionChange } = useSection();
  const aboutSection = useScrollActive(sectionRef);

  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    aboutSection ? onSectionChange!("who am i?") : onSectionChange!("");
  }, [aboutSection, onSectionChange]);

  const introText = "A passionate Full Stack Developer with 2+ years of experience specializing in AI/ML technologies, MERN stack architectures, and blockchain implementations.";
  const introWords = introText.split(" ");

  return (
    <section
      ref={sectionRef}
      id="whoami"
      className="w-full py-16 px-4 sm:px-8 md:px-20 overflow-hidden relative"
    >
      {/* Background animated text */}
      <span
        aria-hidden="true"
        className="absolute top-20 left-0 right-0 text-center rotate-12 text-gray-100 dark:text-[#1f2e3a] text-8xl md:text-9xl scale-150 tracking-wide font-bold select-none pointer-events-none z-0 opacity-50"
      >
        PASSIONATE CREATIVE INNOVATIVE
      </span>
      <span
        aria-hidden="true"
        className="absolute top-60 left-0 right-0 text-center -rotate-12 text-gray-100 dark:text-[#1f2e3a] text-8xl md:text-9xl scale-150 tracking-wide font-bold select-none pointer-events-none z-0 opacity-50"
      >
        DEVELOPER 2+ YEARS EXPERIENCE
      </span>
      <span
        aria-hidden="true"
        className="absolute bottom-40 left-0 right-0 text-center rotate-12 text-gray-100 dark:text-[#1f2e3a] text-8xl md:text-9xl scale-150 tracking-wide font-bold select-none pointer-events-none z-0 opacity-50"
      >
        FULL-STACK AI/ML ENGINEER
      </span>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Heading */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-3 bg-gradient-to-r from-marrsgreen via-teal-500 to-carrigreen dark:from-carrigreen dark:via-teal-400 dark:to-marrsgreen bg-clip-text text-transparent inline-block"
            initial={{ scale: 0, rotateZ: -180 }}
            animate={isInView ? { scale: 1, rotateZ: 0 } : {}}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 15,
              duration: 0.8,
            }}
          >
            Who Am I?
          </motion.h2>
        </motion.div>

        {/* Main Grid - Compact Layout */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Introduction */}
          <motion.div
            className="lg:col-span-2 bg-white dark:bg-[#1B2731] rounded-2xl p-6 shadow-xl border border-gray-100 dark:border-gray-800 relative overflow-hidden group"
            initial={{ opacity: 0, x: -100 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ type: "spring", stiffness: 80, damping: 20 }}
            whileHover={{ scale: 1.02, y: -5 }}
          >
            {/* Morphing gradient on hover */}
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100"
              style={{
                background: "radial-gradient(circle at 50% 50%, rgba(0, 122, 122, 0.1), transparent 70%)",
              }}
              animate={{
                background: [
                  "radial-gradient(circle at 20% 20%, rgba(0, 122, 122, 0.1), transparent 70%)",
                  "radial-gradient(circle at 80% 80%, rgba(0, 122, 122, 0.1), transparent 70%)",
                  "radial-gradient(circle at 20% 80%, rgba(0, 122, 122, 0.1), transparent 70%)",
                  "radial-gradient(circle at 80% 20%, rgba(0, 122, 122, 0.1), transparent 70%)",
                  "radial-gradient(circle at 20% 20%, rgba(0, 122, 122, 0.1), transparent 70%)",
                ],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />

            <div className="relative z-10">
              <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                {introWords.map((word, index) => (
                  <motion.span
                    key={index}
                    className="inline-block mr-1"
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{
                      delay: index * 0.02,
                      duration: 0.3,
                    }}
                  >
                    {word}
                  </motion.span>
                ))}
              </p>
            </div>
          </motion.div>

          {/* Stats Card - Compact */}
          <motion.div
            className="bg-white dark:bg-[#1B2731] rounded-2xl p-6 shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden relative"
            initial={{ opacity: 0, x: 100 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ type: "spring", stiffness: 80, damping: 20, delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="space-y-4">
              {[
                { label: "Experience", value: "2+", unit: "Years", icon: "💼", color: "from-blue-500 to-cyan-500" },
                { label: "Projects", value: "20+", unit: "Built", icon: "🚀", color: "from-purple-500 to-pink-500" },
                { label: "Technologies", value: "16+", unit: "Mastered", icon: "⚡", color: "from-green-500 to-emerald-500" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700"
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={{ x: 5, transition: { duration: 0.2 } }}
                >
                  <motion.div
                    className="text-3xl"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                  >
                    {stat.icon}
                  </motion.div>
                  <div className="flex-1">
                    <div className={`text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                      {stat.value}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      {stat.unit}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Specialty & Info Grid - More Compact */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Specialty Cards */}
          {[
            {
              title: "AI/ML",
              icon: "🤖",
              gradient: "from-violet-600 to-indigo-600",
              skills: ["LangChain", "OpenAI", "Qdrant"],
            },
            {
              title: "Full Stack",
              icon: "⚙️",
              gradient: "from-emerald-600 to-cyan-600",
              skills: ["React", "Next.js", "Node.js"],
            },
          ].map((specialty, index) => (
            <motion.div
              key={specialty.title}
              className="lg:col-span-2 bg-white dark:bg-[#1B2731] rounded-2xl p-6 shadow-xl border border-gray-100 dark:border-gray-800 relative overflow-hidden group"
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 15,
                delay: index * 0.1,
              }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              {/* Animated glow */}
              <motion.div
                className={`absolute -inset-1 bg-gradient-to-br ${specialty.gradient} rounded-2xl blur-lg opacity-0 group-hover:opacity-30`}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.2, 0.3, 0.2],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />

              <div className="relative z-10 flex items-center gap-4">
                <motion.div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${specialty.gradient} flex items-center justify-center text-3xl shadow-lg`}
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.6 }}
                >
                  {specialty.icon}
                </motion.div>
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    {specialty.title}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {specialty.skills.map((skill, idx) => (
                      <motion.span
                        key={skill}
                        className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded text-xs font-medium"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{
                          delay: 0.6 + index * 0.1 + idx * 0.05,
                          type: "spring",
                          stiffness: 500,
                        }}
                        whileHover={{ scale: 1.1, y: -2 }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Education - Compact */}
          <motion.div
            className="bg-white dark:bg-[#1B2731] rounded-2xl p-6 shadow-xl border border-gray-100 dark:border-gray-800 relative overflow-hidden group"
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
            transition={{ type: "spring", stiffness: 100, delay: 0.3 }}
            whileHover={{ scale: 1.05, rotate: 2 }}
          >
            <motion.div
              className="absolute -inset-1 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl blur-lg opacity-0 group-hover:opacity-20"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />

            <div className="relative z-10">
              <motion.div
                className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-2xl mb-3 shadow-lg"
                whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                transition={{ duration: 0.5 }}
              >
                🎓
              </motion.div>
              <h4 className="text-sm font-bold bg-gradient-to-r from-marrsgreen to-teal-600 dark:from-carrigreen dark:to-teal-400 bg-clip-text text-transparent mb-1">
                BS Software Engineering
              </h4>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                COMSATS University
              </p>
              <motion.span
                className="inline-block px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded text-xs font-medium"
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.6, type: "spring" }}
                whileHover={{ scale: 1.1 }}
              >
                2020-2024
              </motion.span>
            </div>
          </motion.div>

          {/* Interests - Compact */}
          <motion.div
            className="bg-white dark:bg-[#1B2731] rounded-2xl p-6 shadow-xl border border-gray-100 dark:border-gray-800 relative overflow-hidden group"
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
            transition={{ type: "spring", stiffness: 100, delay: 0.4 }}
            whileHover={{ scale: 1.05, rotate: -2 }}
          >
            <motion.div
              className="absolute -inset-1 bg-gradient-to-br from-pink-600 to-red-600 rounded-2xl blur-lg opacity-0 group-hover:opacity-20"
              animate={{ rotate: [360, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />

            <div className="relative z-10">
              <motion.div
                className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-600 to-red-600 flex items-center justify-center text-2xl mb-3 shadow-lg"
                whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                transition={{ duration: 0.5 }}
              >
                ❤️
              </motion.div>
              <div className="flex flex-wrap gap-1.5">
                {["Cricket", "Gaming", "Travel", "Code"].map((interest, idx) => (
                  <motion.span
                    key={interest}
                    className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium"
                    initial={{ opacity: 0, scale: 0, rotate: -180 }}
                    animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
                    transition={{
                      delay: 0.7 + idx * 0.05,
                      type: "spring",
                      stiffness: 400,
                    }}
                    whileHover={{
                      scale: 1.15,
                      rotate: [0, -5, 5, 0],
                      transition: { duration: 0.3 },
                    }}
                  >
                    {interest}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
