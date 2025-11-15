import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

import { useSection } from "context/section";
import useScrollActive from "hooks/useScrollActive";

const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { onSectionChange } = useSection();
  const aboutSection = useScrollActive(sectionRef);

  useEffect(() => {
    aboutSection ? onSectionChange!("who am i?") : onSectionChange!("");
  }, [aboutSection, onSectionChange]);

  // Parallax scroll effect
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  // Spring physics for smooth animations
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };

  const introText = "A passionate Full Stack Developer with 2+ years of experience in designing, developing, and optimizing scalable web applications. I specialize in building innovative solutions that combine cutting-edge AI/ML technologies, robust MERN stack architectures, and blockchain implementations to solve real-world challenges.";
  const introWords = introText.split(" ");

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const cardVariants = {
    hidden: { scale: 0.8, opacity: 0, rotateX: -30 },
    visible: {
      scale: 1,
      opacity: 1,
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 20,
      },
    },
    hover: {
      scale: 1.05,
      y: -15,
      rotateX: 5,
      rotateY: 5,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      id="whoami"
      className="w-full py-20 px-4 sm:px-8 md:px-20 overflow-hidden relative"
      style={{ perspective: "1000px" }}
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

      {/* Animated background elements with parallax */}
      <motion.div
        style={{ y: y1, opacity }}
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
      >
        <motion.div
          className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-marrsgreen/10 via-teal-500/10 to-carrigreen/10 dark:from-carrigreen/10 dark:via-teal-400/10 dark:to-marrsgreen/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </motion.div>

      <motion.div
        style={{ y: y2, opacity }}
        className="absolute bottom-0 right-0 w-full h-full pointer-events-none"
      >
        <motion.div
          className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-orange-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </motion.div>

      <motion.div className="max-w-6xl mx-auto relative z-10">
        {/* Section Heading with advanced entrance */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{
            duration: 0.8,
            type: "spring",
            stiffness: 100,
            damping: 15,
          }}
        >
          <motion.h2
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 relative inline-block"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {/* Gradient text with animation */}
            <motion.span
              className="bg-gradient-to-r from-marrsgreen via-teal-500 to-carrigreen dark:from-carrigreen dark:via-teal-400 dark:to-marrsgreen bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                backgroundSize: "200% 200%",
              }}
            >
              Who Am I?
            </motion.span>

            {/* Animated underline */}
            <motion.div
              className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-marrsgreen via-teal-500 to-carrigreen dark:from-carrigreen dark:via-teal-400 dark:to-marrsgreen rounded-full"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{
                delay: 0.5,
                duration: 0.8,
                type: "spring",
                stiffness: 100,
              }}
            />
          </motion.h2>

          <motion.p
            className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mt-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Get to know me better
          </motion.p>
        </motion.div>

        {/* Introduction Card with advanced effects */}
        <motion.div
          className="mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.div
            className="relative bg-white dark:bg-[#1B2731] rounded-3xl p-8 md:p-12 shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden group"
            variants={cardVariants}
            whileHover="hover"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Animated gradient overlay */}
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background:
                  "radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(0, 122, 122, 0.1), transparent 50%)",
              }}
            />

            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 opacity-30"
              style={{
                background:
                  "linear-gradient(110deg, transparent 40%, rgba(0, 122, 122, 0.3) 50%, transparent 60%)",
                backgroundSize: "200% 100%",
              }}
              animate={{
                backgroundPosition: ["200% 0", "-200% 0"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
                repeatDelay: 2,
              }}
            />

            {/* Content */}
            <div className="relative z-10">
              <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                {introWords.map((word, index) => (
                  <motion.span
                    key={index}
                    className="inline-block mr-1"
                    initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    viewport={{ once: true }}
                    transition={{
                      delay: index * 0.015,
                      duration: 0.3,
                    }}
                  >
                    {word}
                  </motion.span>
                ))}
              </p>
            </div>

            {/* Corner accents */}
            <motion.div
              className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-teal-500/20 to-transparent rounded-bl-full"
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, type: "spring" }}
            />
            <motion.div
              className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-purple-500/20 to-transparent rounded-tr-full"
              initial={{ scale: 0, rotate: 180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, type: "spring" }}
            />
          </motion.div>
        </motion.div>

        {/* Stats Grid with morphing cards */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {[
            {
              label: "Experience",
              value: "2+",
              unit: "Years",
              icon: "💼",
              gradient: "from-blue-500 via-cyan-500 to-blue-600",
            },
            {
              label: "Projects",
              value: "20+",
              unit: "Built",
              icon: "🚀",
              gradient: "from-purple-500 via-pink-500 to-purple-600",
            },
            {
              label: "Technologies",
              value: "16+",
              unit: "Mastered",
              icon: "⚡",
              gradient: "from-green-500 via-emerald-500 to-green-600",
            },
            {
              label: "Code",
              value: "100K+",
              unit: "Lines",
              icon: "💻",
              gradient: "from-orange-500 via-red-500 to-orange-600",
            },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="relative group"
              variants={itemVariants}
              whileHover={{
                scale: 1.1,
                rotate: [0, -5, 5, -5, 0],
                transition: { duration: 0.5 },
              }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="bg-white dark:bg-[#1B2731] rounded-2xl p-6 shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden relative"
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Gradient background */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-10`}
                  initial={{ scale: 0, rotate: -180 }}
                  whileHover={{ scale: 1.5, rotate: 180 }}
                  transition={{ duration: 0.6 }}
                />

                {/* Particles effect on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className={`absolute w-1 h-1 bg-gradient-to-r ${stat.gradient} rounded-full`}
                      style={{
                        left: `${20 + i * 15}%`,
                        top: `${30 + i * 10}%`,
                      }}
                      animate={{
                        y: [-20, -60],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: i * 0.2,
                      }}
                    />
                  ))}
                </div>

                <div className="relative z-10 text-center">
                  {/* Icon with bounce */}
                  <motion.div
                    className="text-4xl mb-3"
                    animate={{
                      y: [0, -10, 0],
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.2,
                    }}
                  >
                    {stat.icon}
                  </motion.div>

                  {/* Value with counting animation feel */}
                  <motion.div
                    className={`text-3xl md:text-4xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-2`}
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: index * 0.1,
                      type: "spring",
                      stiffness: 200,
                      damping: 15,
                    }}
                  >
                    {stat.value}
                  </motion.div>

                  <div className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                    {stat.unit}
                  </div>
                </div>

                {/* Border glow effect */}
                <motion.div
                  className={`absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r ${stat.gradient} opacity-0 group-hover:opacity-30`}
                  style={{ mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)", maskComposite: "exclude" }}
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* What I Do - Specialty Cards */}
        <motion.div
          className="mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.h3
            className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent"
            variants={itemVariants}
          >
            What I Do
          </motion.h3>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "AI/ML Development",
                icon: "🤖",
                gradient: "from-violet-600 via-purple-600 to-indigo-600",
                description:
                  "Building RAG systems, LangChain orchestration, and MCP integrations for intelligent solutions",
                skills: ["LangChain", "OpenAI", "Qdrant", "RAG Systems"],
              },
              {
                title: "Full Stack Engineering",
                icon: "⚙️",
                gradient: "from-emerald-600 via-teal-600 to-cyan-600",
                description:
                  "Creating scalable applications with MERN stack, Next.js, and modern cloud architectures",
                skills: ["React", "Next.js", "Node.js", "PostgreSQL"],
              },
            ].map((specialty, index) => (
              <motion.div
                key={specialty.title}
                className="group relative"
                variants={itemVariants}
              >
                <motion.div
                  className="bg-white dark:bg-[#1B2731] rounded-3xl p-8 shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden relative h-full"
                  whileHover={{
                    y: -10,
                    transition: { type: "spring", stiffness: 300, damping: 20 },
                  }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Animated background gradient */}
                  <motion.div
                    className={`absolute -inset-2 bg-gradient-to-br ${specialty.gradient} rounded-3xl blur-2xl opacity-0 group-hover:opacity-20`}
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />

                  <div className="relative z-10">
                    {/* Icon with 3D effect */}
                    <motion.div
                      className="mb-6 inline-block"
                      whileHover={{
                        rotateY: 360,
                        scale: 1.2,
                        transition: { duration: 0.8, type: "spring" },
                      }}
                    >
                      <motion.div
                        className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${specialty.gradient} flex items-center justify-center text-4xl shadow-2xl relative`}
                        animate={{
                          boxShadow: [
                            "0 10px 30px rgba(0,0,0,0.3)",
                            "0 20px 50px rgba(0,0,0,0.4)",
                            "0 10px 30px rgba(0,0,0,0.3)",
                          ],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        <motion.span
                          animate={{
                            y: [0, -5, 0],
                            rotate: [0, 5, -5, 0],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: index * 0.5,
                          }}
                        >
                          {specialty.icon}
                        </motion.span>

                        {/* Orbiting particles */}
                        <motion.div
                          className={`absolute w-2 h-2 rounded-full bg-gradient-to-r ${specialty.gradient}`}
                          animate={{
                            rotate: 360,
                          }}
                          transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          style={{
                            offsetPath: "path('M 0 0 m -40, 0 a 40,40 0 1,0 80,0 a 40,40 0 1,0 -80,0')",
                          }}
                        />
                      </motion.div>
                    </motion.div>

                    {/* Title */}
                    <motion.h4
                      className="text-2xl font-bold text-gray-900 dark:text-white mb-4"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 }}
                    >
                      {specialty.title}
                    </motion.h4>

                    {/* Description */}
                    <motion.p
                      className="text-sm md:text-base text-gray-600 dark:text-gray-400 mb-6 leading-relaxed"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 }}
                    >
                      {specialty.description}
                    </motion.p>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-2">
                      {specialty.skills.map((skill, skillIndex) => (
                        <motion.span
                          key={skill}
                          className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium border border-gray-200 dark:border-gray-700 relative overflow-hidden group/skill"
                          initial={{ opacity: 0, scale: 0, rotate: -180 }}
                          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                          viewport={{ once: true }}
                          transition={{
                            delay: 0.4 + skillIndex * 0.1,
                            type: "spring",
                            stiffness: 300,
                            damping: 20,
                          }}
                          whileHover={{
                            scale: 1.15,
                            y: -3,
                            transition: { duration: 0.2 },
                          }}
                        >
                          {/* Hover gradient */}
                          <motion.div
                            className={`absolute inset-0 bg-gradient-to-r ${specialty.gradient} opacity-0 group-hover/skill:opacity-20`}
                            layoutId={`skill-bg-${skill}`}
                          />
                          <span className="relative z-10">{skill}</span>
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom accent */}
                  <motion.div
                    className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${specialty.gradient}`}
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                  />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Education & Interests */}
        <motion.div
          className="grid md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Education */}
          <motion.div
            className="group relative"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
          >
            <motion.div
              className="bg-white dark:bg-[#1B2731] rounded-3xl p-8 shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden relative h-full"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Gradient glow */}
              <motion.div
                className="absolute -inset-1 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-3xl blur-xl opacity-0 group-hover:opacity-20"
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />

              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <motion.div
                    className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-4xl shadow-lg"
                    whileHover={{
                      rotate: [0, -10, 10, -10, 0],
                      scale: 1.1,
                      transition: { duration: 0.5 },
                    }}
                    animate={{
                      y: [0, -5, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    🎓
                  </motion.div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      Education
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Academic Background
                    </p>
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
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
                      transition={{ delay: 0.4, type: "spring", stiffness: 500 }}
                      whileHover={{
                        scale: 1.1,
                        boxShadow: "0 0 20px rgba(34, 197, 94, 0.5)",
                      }}
                    >
                      Graduated
                    </motion.span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          {/* Interests */}
          <motion.div
            className="group relative"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
          >
            <motion.div
              className="bg-white dark:bg-[#1B2731] rounded-3xl p-8 shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden relative h-full"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Gradient glow */}
              <motion.div
                className="absolute -inset-1 bg-gradient-to-br from-pink-600 via-rose-600 to-red-600 rounded-3xl blur-xl opacity-0 group-hover:opacity-20"
                animate={{
                  rotate: [360, 0],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />

              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <motion.div
                    className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-600 via-rose-600 to-red-600 flex items-center justify-center text-4xl shadow-lg"
                    whileHover={{
                      rotate: [0, -10, 10, -10, 0],
                      scale: 1.1,
                      transition: { duration: 0.5 },
                    }}
                    animate={{
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    ❤️
                  </motion.div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      Interests
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      What I love doing
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  {[
                    { name: "Cricket", icon: "🏏", color: "from-green-500 to-emerald-500" },
                    { name: "Gaming", icon: "🎮", color: "from-purple-500 to-pink-500" },
                    { name: "Travelling", icon: "✈️", color: "from-blue-500 to-cyan-500" },
                    { name: "Coding", icon: "💻", color: "from-orange-500 to-red-500" },
                    {
                      name: "Tech Innovation",
                      icon: "🚀",
                      color: "from-indigo-500 to-purple-500",
                    },
                  ].map((interest, index) => (
                    <motion.div
                      key={interest.name}
                      className="group/badge relative px-4 py-2 bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-700 rounded-full border border-gray-200 dark:border-gray-600 cursor-pointer overflow-hidden"
                      initial={{ opacity: 0, scale: 0, rotate: -180 }}
                      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: index * 0.1,
                        type: "spring",
                        stiffness: 400,
                        damping: 20,
                      }}
                      whileHover={{
                        scale: 1.15,
                        y: -5,
                        transition: { type: "spring", stiffness: 400, damping: 10 },
                      }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {/* Gradient on hover */}
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-r ${interest.color} rounded-full opacity-0 group-hover/badge:opacity-20`}
                        layoutId={`interest-bg-${interest.name}`}
                      />

                      <div className="relative z-10 flex items-center gap-2">
                        <motion.span
                          className="text-xl"
                          animate={{
                            rotate: [0, 10, -10, 10, 0],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: index * 0.2,
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
        </motion.div>
      </motion.div>
    </section>
  );
};

export default AboutSection;
