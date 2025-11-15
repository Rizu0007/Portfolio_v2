import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

import { useSection } from "context/section";
import useScrollActive from "hooks/useScrollActive";

const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { onSectionChange } = useSection();
  const aboutSection = useScrollActive(sectionRef);

  useEffect(() => {
    aboutSection ? onSectionChange!("who am i?") : onSectionChange!("");
  }, [aboutSection, onSectionChange]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

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
        {/* Heading */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-marrsgreen via-teal-500 to-carrigreen dark:from-carrigreen dark:via-teal-400 dark:to-marrsgreen bg-clip-text text-transparent inline-block"
            initial={{ scale: 0.5, rotateY: 90 }}
            whileInView={{ scale: 1, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{
              type: "spring",
              stiffness: 120,
              damping: 12,
            }}
          >
            Who Am I?
          </motion.h2>
        </motion.div>

        {/* Main Content - Split Hero Layout */}
        <motion.div
          className="grid lg:grid-cols-2 gap-8 mb-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Left: Big Stats Card */}
          <motion.div
            variants={itemVariants}
            className="relative"
          >
            <motion.div
              className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-500 dark:via-purple-500 dark:to-pink-500 rounded-3xl p-8 md:p-10 text-white shadow-2xl relative overflow-hidden group"
              whileHover={{ scale: 1.02, rotate: -1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {/* Animated mesh gradient overlay */}
              <div className="absolute inset-0 opacity-30">
                <motion.div
                  className="absolute inset-0"
                  style={{
                    background: "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.2) 0%, transparent 50%)",
                  }}
                  animate={{
                    background: [
                      "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.2) 0%, transparent 50%)",
                      "radial-gradient(circle at 80% 50%, rgba(255,255,255,0.2) 0%, transparent 50%)",
                      "radial-gradient(circle at 50% 80%, rgba(255,255,255,0.2) 0%, transparent 50%)",
                      "radial-gradient(circle at 50% 20%, rgba(255,255,255,0.2) 0%, transparent 50%)",
                      "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.2) 0%, transparent 50%)",
                    ],
                  }}
                  transition={{ duration: 10, repeat: Infinity }}
                />
              </div>

              {/* Floating orbs */}
              <div className="absolute inset-0">
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-3 h-3 bg-white/40 rounded-full blur-sm"
                    style={{
                      left: `${15 + i * 12}%`,
                      top: `${20 + (i % 3) * 25}%`,
                    }}
                    animate={{
                      y: [0, -20, 0],
                      x: [0, 10, 0],
                      scale: [1, 1.2, 1],
                      opacity: [0.4, 0.8, 0.4],
                    }}
                    transition={{
                      duration: 3 + i * 0.5,
                      repeat: Infinity,
                      delay: i * 0.3,
                    }}
                  />
                ))}
              </div>

              <div className="relative z-10">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <h3 className="text-2xl md:text-3xl font-bold mb-6">Full Stack Developer</h3>
                  <p className="text-white/90 leading-relaxed mb-8">
                    Passionate about building innovative solutions with AI/ML technologies,
                    MERN stack architectures, and blockchain implementations.
                  </p>
                </motion.div>

                <div className="grid grid-cols-3 gap-4">
                  {[
                    { value: "2+", label: "Years" },
                    { value: "20+", label: "Projects" },
                    { value: "16+", label: "Tech" },
                  ].map((stat, i) => (
                    <motion.div
                      key={stat.label}
                      className="text-center relative"
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: 0.4 + i * 0.1,
                        type: "spring",
                        stiffness: 200,
                      }}
                    >
                      {/* Animated point/dot */}
                      <motion.div className="flex justify-center mb-3">
                        <div className="relative w-12 h-12 flex items-center justify-center">
                          {/* Outer ring */}
                          <motion.div
                            className="absolute w-12 h-12 rounded-full border-2 border-white/30"
                            animate={{
                              scale: [1, 1.3, 1],
                              opacity: [0.3, 0.6, 0.3],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: i * 0.3,
                            }}
                          />
                          {/* Middle ring */}
                          <motion.div
                            className="absolute w-8 h-8 rounded-full border-2 border-white/50"
                            animate={{
                              scale: [1, 1.2, 1],
                              rotate: [0, 180, 360],
                            }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              delay: i * 0.3,
                            }}
                          />
                          {/* Inner dot */}
                          <motion.div
                            className="absolute w-4 h-4 rounded-full bg-white shadow-lg"
                            animate={{
                              scale: [1, 1.1, 1],
                              boxShadow: [
                                "0 0 10px rgba(255,255,255,0.5)",
                                "0 0 20px rgba(255,255,255,0.8)",
                                "0 0 10px rgba(255,255,255,0.5)",
                              ],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: i * 0.3,
                            }}
                          />
                        </div>
                      </motion.div>
                      <div className="text-3xl font-bold">{stat.value}</div>
                      <div className="text-sm text-white/80">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Corner decorations */}
              <motion.div
                className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              <motion.div
                className="absolute -top-10 -left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{ duration: 5, repeat: Infinity }}
              />
            </motion.div>
          </motion.div>

          {/* Right: Expertise Cards */}
          <motion.div
            variants={itemVariants}
            className="space-y-4"
          >
            {[
              {
                title: "AI/ML Development",
                icon: "🤖",
                gradient: "from-violet-500 to-purple-600",
                skills: ["LangChain", "OpenAI", "Qdrant", "RAG Systems"],
              },
              {
                title: "Full Stack Engineering",
                icon: "⚙️",
                gradient: "from-emerald-500 to-teal-600",
                skills: ["React", "Next.js", "Node.js", "PostgreSQL"],
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                className="bg-white dark:bg-[#1B2731] rounded-2xl p-6 shadow-xl border border-gray-100 dark:border-gray-800 relative overflow-hidden group"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, type: "spring", stiffness: 80 }}
                whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
              >
                {/* Glow effect */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-10`}
                  transition={{ duration: 0.3 }}
                />

                <div className="relative z-10 flex items-start gap-4">
                  <motion.div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center text-2xl shadow-lg flex-shrink-0`}
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    {item.icon}
                  </motion.div>

                  <div className="flex-1 min-w-0">
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                      {item.title}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {item.skills.map((skill, idx) => (
                        <motion.span
                          key={skill}
                          className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg text-xs font-medium"
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{
                            delay: 0.4 + index * 0.15 + idx * 0.05,
                            type: "spring",
                            stiffness: 400,
                          }}
                          whileHover={{
                            scale: 1.1,
                            backgroundColor: "rgba(0, 122, 122, 0.1)",
                          }}
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Bottom Row - Education & Interests */}
        <motion.div
          className="grid md:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Education */}
          <motion.div
            variants={itemVariants}
            className="bg-white dark:bg-[#1B2731] rounded-2xl p-6 shadow-xl border border-gray-100 dark:border-gray-800 relative overflow-hidden group"
            whileHover={{ y: -5 }}
          >
            <motion.div
              className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full opacity-10 blur-3xl group-hover:opacity-20"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />

            <div className="relative z-10 flex items-start gap-4">
              <motion.div
                className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-3xl shadow-lg flex-shrink-0"
                whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                transition={{ duration: 0.5 }}
              >
                🎓
              </motion.div>

              <div className="flex-1">
                <h4 className="text-lg font-bold bg-gradient-to-r from-marrsgreen to-teal-600 dark:from-carrigreen dark:to-teal-400 bg-clip-text text-transparent mb-2">
                  BS Software Engineering
                </h4>
                <p className="text-gray-700 dark:text-gray-300 font-medium mb-2">
                  COMSATS University Islamabad
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">2020 - 2024</span>
                  <motion.span
                    className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded text-xs font-medium"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, type: "spring", stiffness: 400 }}
                    whileHover={{ scale: 1.1 }}
                  >
                    Graduated
                  </motion.span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Interests */}
          <motion.div
            variants={itemVariants}
            className="bg-white dark:bg-[#1B2731] rounded-2xl p-6 shadow-xl border border-gray-100 dark:border-gray-800 relative overflow-hidden group"
            whileHover={{ y: -5 }}
          >
            <motion.div
              className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-pink-500 to-red-500 rounded-full opacity-10 blur-3xl group-hover:opacity-20"
              animate={{ rotate: -360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <motion.div
                  className="w-14 h-14 rounded-xl bg-gradient-to-br from-pink-600 to-red-600 flex items-center justify-center text-3xl shadow-lg"
                  whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  ❤️
                </motion.div>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                  Interests & Hobbies
                </h4>
              </div>

              <div className="flex flex-wrap gap-2">
                {[
                  { name: "Cricket", icon: "🏏" },
                  { name: "Gaming", icon: "🎮" },
                  { name: "Travelling", icon: "✈️" },
                  { name: "Coding", icon: "💻" },
                  { name: "Innovation", icon: "🚀" },
                ].map((interest, idx) => (
                  <motion.div
                    key={interest.name}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-700 rounded-full border border-gray-200 dark:border-gray-600"
                    initial={{ opacity: 0, scale: 0, rotate: -90 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: 0.5 + idx * 0.05,
                      type: "spring",
                      stiffness: 300,
                    }}
                    whileHover={{
                      scale: 1.1,
                      rotate: 5,
                      backgroundColor: "rgba(0, 122, 122, 0.1)",
                    }}
                  >
                    <span className="text-base">{interest.icon}</span>
                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                      {interest.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
