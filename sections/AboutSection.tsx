import { useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { useRef } from "react";

import { useSection } from "context/section";
import useScrollActive from "hooks/useScrollActive";

const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { onSectionChange } = useSection();
  const aboutSection = useScrollActive(sectionRef);

  useEffect(() => {
    aboutSection ? onSectionChange!("who am i?") : onSectionChange!("");
  }, [aboutSection, onSectionChange]);

  const introText = "A passionate Full Stack Developer with 2+ years of experience in designing, developing, and optimizing scalable web applications. I specialize in building innovative solutions that combine cutting-edge AI/ML technologies, robust MERN stack architectures, and blockchain implementations to solve real-world challenges.";
  const introWords = introText.split(" ");

  return (
    <section
      ref={sectionRef}
      id="whoami"
      className="w-full py-20 px-4 sm:px-8 md:px-20 bg-gradient-to-b from-white via-gray-50 to-white dark:from-[#0B1120] dark:via-[#1B2731] dark:to-[#0B1120] overflow-hidden relative"
    >
      {/* Animated background blobs */}
      <motion.div
        className="absolute top-20 left-10 w-72 h-72 bg-marrsgreen/5 dark:bg-carrigreen/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-96 h-96 bg-teal-500/5 dark:bg-teal-400/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -40, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Heading */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.h2
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 bg-gradient-to-r from-marrsgreen via-teal-500 to-carrigreen dark:from-carrigreen dark:via-teal-400 dark:to-marrsgreen bg-clip-text text-transparent"
            initial={{ opacity: 0, scale: 0.5, rotateX: -90 }}
            whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "backOut" }}
          >
            Who Am I?
          </motion.h2>
          <motion.p
            className="text-lg md:text-xl text-gray-600 dark:text-gray-400"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Get to know me better
          </motion.p>
        </motion.div>

        {/* Introduction Text */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="intro-text bg-white dark:bg-[#1B2731] rounded-3xl p-8 md:p-12 shadow-2xl border border-gray-100 dark:border-gray-800 relative overflow-hidden">
            {/* Animated gradient border */}
            <motion.div
              className="absolute inset-0 rounded-3xl opacity-20"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(0, 122, 122, 0.3), transparent)",
              }}
              animate={{
                x: ["-100%", "100%"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed relative z-10">
              {introWords.map((word, index) => (
                <motion.span
                  key={index}
                  className="inline-block mr-1"
                  initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: true }}
                  transition={{
                    delay: index * 0.02,
                    duration: 0.4,
                    ease: "easeOut",
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </p>
          </div>
        </motion.div>

        {/* Highlight Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {[
            { label: "Experience", value: "2+", unit: "Years", icon: "💼", gradient: "from-blue-500 to-cyan-500", delay: 0 },
            { label: "Projects", value: "20+", unit: "Built", icon: "🚀", gradient: "from-purple-500 to-pink-500", delay: 0.1 },
            { label: "Technologies", value: "16+", unit: "Mastered", icon: "⚡", gradient: "from-green-500 to-emerald-500", delay: 0.2 },
            { label: "Code", value: "100K+", unit: "Lines", icon: "💻", gradient: "from-orange-500 to-red-500", delay: 0.3 },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              className="group relative bg-white dark:bg-[#1B2731] rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-800 cursor-pointer overflow-hidden"
              initial={{ opacity: 0, scale: 0, rotate: -180 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: stat.delay,
                duration: 0.7,
                type: "spring",
                stiffness: 200,
                damping: 15,
              }}
              whileHover={{
                scale: 1.05,
                rotate: [0, -2, 2, -2, 0],
                transition: { duration: 0.5 },
              }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Animated gradient background */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${stat.gradient}`}
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 0.1 }}
                transition={{ duration: 0.3 }}
              />

              <div className="relative z-10 text-center">
                <motion.div
                  className="text-4xl mb-3"
                  animate={{
                    y: [0, -8, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: stat.delay,
                  }}
                >
                  {stat.icon}
                </motion.div>
                <motion.div
                  className={`text-3xl md:text-4xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-2`}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: stat.delay + 0.2,
                    duration: 0.5,
                    type: "spring",
                  }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                  {stat.unit}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* What I Do Section */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.h3
            className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            What I Do
          </motion.h3>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "AI/ML Development",
                icon: "🤖",
                gradient: "from-violet-600 via-purple-600 to-indigo-600",
                description: "Building RAG systems, LangChain orchestration, and MCP integrations for intelligent solutions",
                skills: ["LangChain", "OpenAI", "Qdrant", "RAG Systems"],
                delay: 0,
              },
              {
                title: "Full Stack Engineering",
                icon: "⚙️",
                gradient: "from-emerald-600 via-teal-600 to-cyan-600",
                description: "Creating scalable applications with MERN stack, Next.js, and modern cloud architectures",
                skills: ["React", "Next.js", "Node.js", "PostgreSQL"],
                delay: 0.2,
              },
            ].map((specialty) => (
              <motion.div
                key={specialty.title}
                className="group relative bg-white dark:bg-[#1B2731] rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-800 overflow-hidden"
                initial={{ opacity: 0, x: specialty.delay === 0 ? -100 : 100, rotateY: 45 }}
                whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: specialty.delay,
                  duration: 0.8,
                  type: "spring",
                  stiffness: 100,
                }}
                whileHover={{
                  scale: 1.03,
                  y: -10,
                  transition: { duration: 0.3 },
                }}
              >
                {/* Animated gradient glow */}
                <motion.div
                  className={`absolute -inset-1 bg-gradient-to-br ${specialty.gradient} rounded-3xl blur-xl`}
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 0.3 }}
                  transition={{ duration: 0.4 }}
                />

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <motion.div
                    className="mb-6"
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                  >
                    <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${specialty.gradient} flex items-center justify-center text-4xl shadow-2xl`}>
                      <motion.span
                        animate={{
                          y: [0, -5, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: specialty.delay,
                        }}
                      >
                        {specialty.icon}
                      </motion.span>
                    </div>
                  </motion.div>

                  {/* Title */}
                  <motion.h4
                    className="text-2xl font-bold text-gray-900 dark:text-white mb-4"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: specialty.delay + 0.2 }}
                  >
                    {specialty.title}
                  </motion.h4>

                  {/* Description */}
                  <motion.p
                    className="text-sm md:text-base text-gray-600 dark:text-gray-400 mb-6 leading-relaxed"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: specialty.delay + 0.3 }}
                  >
                    {specialty.description}
                  </motion.p>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2">
                    {specialty.skills.map((skill, index) => (
                      <motion.span
                        key={skill}
                        className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium border border-gray-200 dark:border-gray-700"
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          delay: specialty.delay + 0.4 + index * 0.1,
                          type: "spring",
                          stiffness: 300,
                        }}
                        whileHover={{
                          scale: 1.1,
                          backgroundColor: "rgba(0, 122, 122, 0.1)",
                          transition: { duration: 0.2 },
                        }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Bottom accent line */}
                <motion.div
                  className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${specialty.gradient}`}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: specialty.delay + 0.5, duration: 0.8 }}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Education & Interests Grid */}
        <motion.div
          className="grid md:grid-cols-2 gap-8"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {/* Education */}
          <motion.div
            className="bg-white dark:bg-[#1B2731] rounded-3xl p-8 shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden relative"
            initial={{ opacity: 0, x: -50, rotateY: -20 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, type: "spring" }}
            whileHover={{
              scale: 1.02,
              transition: { duration: 0.3 },
            }}
          >
            {/* Hover gradient */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-indigo-500/5 to-purple-500/5"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />

            <div className="relative z-10">
              <motion.div
                className="flex items-center gap-4 mb-6"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <motion.div
                  className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-4xl shadow-lg"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  🎓
                </motion.div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Education</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Academic Background</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <h4 className="text-xl font-bold bg-gradient-to-r from-marrsgreen to-teal-600 dark:from-carrigreen dark:to-teal-400 bg-clip-text text-transparent mb-2">
                  BS Software Engineering
                </h4>
                <p className="text-gray-700 dark:text-gray-300 font-medium mb-2">
                  COMSATS University Islamabad
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <span>📅</span>
                  <span>2020 - 2024</span>
                  <motion.span
                    className="ml-2 px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-xs font-medium"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, type: "spring" }}
                    whileHover={{ scale: 1.1 }}
                  >
                    Graduated
                  </motion.span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Interests */}
          <motion.div
            className="bg-white dark:bg-[#1B2731] rounded-3xl p-8 shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden relative"
            initial={{ opacity: 0, x: 50, rotateY: 20 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, type: "spring" }}
            whileHover={{
              scale: 1.02,
              transition: { duration: 0.3 },
            }}
          >
            {/* Hover gradient */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-pink-500/5 via-rose-500/5 to-red-500/5"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />

            <div className="relative z-10">
              <motion.div
                className="flex items-center gap-4 mb-6"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <motion.div
                  className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-600 via-rose-600 to-red-600 flex items-center justify-center text-4xl shadow-lg"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  ❤️
                </motion.div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Interests</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">What I love doing</p>
                </div>
              </motion.div>

              <div className="flex flex-wrap gap-3">
                {[
                  { name: "Cricket", icon: "🏏", color: "from-green-500 to-emerald-500", delay: 0 },
                  { name: "Gaming", icon: "🎮", color: "from-purple-500 to-pink-500", delay: 0.1 },
                  { name: "Travelling", icon: "✈️", color: "from-blue-500 to-cyan-500", delay: 0.2 },
                  { name: "Coding", icon: "💻", color: "from-orange-500 to-red-500", delay: 0.3 },
                  { name: "Tech Innovation", icon: "🚀", color: "from-indigo-500 to-purple-500", delay: 0.4 },
                ].map((interest) => (
                  <motion.div
                    key={interest.name}
                    className="group relative px-4 py-2 bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-700 rounded-full border border-gray-200 dark:border-gray-600 cursor-pointer"
                    initial={{ opacity: 0, scale: 0, rotate: -180 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: interest.delay,
                      type: "spring",
                      stiffness: 300,
                      damping: 15,
                    }}
                    whileHover={{
                      scale: 1.15,
                      rotate: [0, -5, 5, -5, 0],
                      transition: { duration: 0.5 },
                    }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {/* Gradient background on hover */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-r ${interest.color} rounded-full`}
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 0.2 }}
                      transition={{ duration: 0.2 }}
                    />

                    <div className="relative z-10 flex items-center gap-2">
                      <motion.span
                        className="text-xl"
                        animate={{
                          rotate: [0, 10, -10, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: interest.delay,
                        }}
                      >
                        {interest.icon}
                      </motion.span>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {interest.name}
                      </span>
                    </div>
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
