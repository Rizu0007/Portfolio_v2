import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";

import { useSection } from "context/section";
import useScrollActive from "hooks/useScrollActive";

const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { onSectionChange } = useSection();
  const aboutSection = useScrollActive(sectionRef);

  // Parallax scroll effect
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3]);

  // Animated floating orbs
  useEffect(() => {
    const orbs = document.querySelectorAll('.floating-orb');

    orbs.forEach((orb, index) => {
      gsap.to(orb, {
        y: `${Math.random() * 50 + 30}`,
        x: `${Math.random() * 50 - 25}`,
        duration: 3 + index * 0.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: index * 0.2,
      });
    });
  }, []);

  useEffect(() => {
    aboutSection ? onSectionChange!("who am i?") : onSectionChange!("");
  }, [aboutSection, onSectionChange]);

  return (
    <section
      ref={sectionRef}
      id="whoami"
      className="w-full py-16 px-4 sm:px-8 md:px-20 overflow-hidden relative bg-gradient-to-b from-bgdark to-[#0a1525] mx-10"
    >
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(to right, rgba(19, 226, 191, 0.1) 1px, transparent 1px),
                           linear-gradient(to bottom, rgba(19, 226, 191, 0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Animated Gradient Orbs */}
      <motion.div
        className="floating-orb absolute top-20 left-[10%] w-[400px] h-[400px] bg-carrigreen/10 rounded-full blur-3xl pointer-events-none"
        style={{ y: y1, opacity }}
      />
      <motion.div
        className="floating-orb absolute top-40 right-[15%] w-[300px] h-[300px] bg-teal-500/10 rounded-full blur-3xl pointer-events-none"
        style={{ y: y2, opacity }}
      />
      <motion.div
        className="floating-orb absolute bottom-20 left-[20%] w-[350px] h-[350px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"
        style={{ y: y1, opacity }}
      />

      {/* Floating Particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="floating-orb absolute w-2 h-2 bg-carrigreen/40 rounded-full pointer-events-none"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: i * 0.3,
          }}
        />
      ))}

      <div className="lg:max-w-none max-w-6xl mx-auto relative z-10">
        {/* Heading */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-block mb-4 px-4 py-2 border border-carrigreen/30 rounded-full bg-carrigreen/5 backdrop-blur-sm"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-sm text-carrigreen font-medium">About Me</span>
          </motion.div>

          <h2 className="text-3xl md:text-6xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            Building <span className="text-transparent bg-clip-text bg-gradient-to-r from-carrigreen to-teal-400">intelligent solutions</span>
            <br />through code
          </h2>

          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl leading-relaxed">
            Full Stack Developer specializing in AI/ML integration, scalable web architectures, and modern frontend experiences.
          </p>
        </motion.div>

        {/* Tech Stack & Education */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Tech Stack */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <h3 className="text-2xl font-bold text-white mb-6">Tech Stack</h3>

            <div className="space-y-6">
              {[
                {
                  category: "AI/ML",
                  skills: ["LangChain", "OpenAI", "Qdrant", "RAG Systems", "Vector Databases"],
                },
                {
                  category: "Frontend",
                  skills: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "GSAP"],
                },
                {
                  category: "Backend",
                  skills: ["Node.js", "Nest.js", "PostgreSQL", "MongoDB", "REST APIs"],
                },
                {
                  category: "Other",
                  skills: ["Docker", "Git", "Firebase", "Shopify", "WebSockets"],
                },
              ].map((group, index) => (
                <motion.div
                  key={group.category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-sm font-bold text-carrigreen uppercase tracking-wider">
                      {group.category}
                    </span>
                    <div className="h-px flex-1 bg-gradient-to-r from-carrigreen/30 to-transparent" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((skill, idx) => (
                      <motion.span
                        key={skill}
                        className="relative px-4 py-2 bg-[#1B2731]/50 backdrop-blur-sm border border-gray-800/50 rounded-lg text-sm text-gray-300 hover:border-carrigreen/50 hover:text-carrigreen transition-all duration-300 cursor-default overflow-hidden group/skill"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.7 + index * 0.1 + idx * 0.02 }}
                        whileHover={{
                          scale: 1.1,
                          y: -5,
                          transition: { duration: 0.2 }
                        }}
                      >
                        {/* Animated gradient on hover */}
                        <span className="absolute inset-0 bg-gradient-to-r from-carrigreen/0 via-carrigreen/10 to-carrigreen/0 opacity-0 group-hover/skill:opacity-100 transition-opacity duration-300" />
                        <span className="relative z-10">{skill}</span>
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Education & Highlights */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            {/* Education */}
            <motion.div
              className="relative bg-[#1B2731]/50 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-6 overflow-hidden group/card"
              whileHover={{
                scale: 1.02,
                y: -5,
                borderColor: "rgba(19, 226, 191, 0.3)",
                transition: { duration: 0.3 }
              }}
            >
              {/* Animated gradient background on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-carrigreen/0 via-carrigreen/5 to-teal-500/5 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* Shimmer effect */}
              <div className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 pointer-events-none overflow-hidden">
                <div className="absolute inset-0 -translate-x-full group-hover/card:translate-x-full transition-transform duration-1000 ease-in-out bg-gradient-to-r from-transparent via-carrigreen/10 to-transparent" />
              </div>

              <div className="relative z-10">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <span className="text-carrigreen">🎓</span>
                  Education
                </h3>
                <div className="space-y-2">
                  <p className="text-carrigreen font-semibold">BS Software Engineering</p>
                  <p className="text-gray-400 text-sm">COMSATS University Islamabad</p>
                  <p className="text-gray-500 text-sm">2020 - 2024</p>
                </div>
              </div>
            </motion.div>

            {/* Highlights */}
            <motion.div
              className="relative bg-[#1B2731]/50 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-6 overflow-hidden group/card"
              whileHover={{
                scale: 1.02,
                y: -5,
                borderColor: "rgba(19, 226, 191, 0.3)",
                transition: { duration: 0.3 }
              }}
            >
              {/* Animated gradient background on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-carrigreen/0 via-carrigreen/5 to-teal-500/5 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* Shimmer effect */}
              <div className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 pointer-events-none overflow-hidden">
                <div className="absolute inset-0 -translate-x-full group-hover/card:translate-x-full transition-transform duration-1000 ease-in-out bg-gradient-to-r from-transparent via-carrigreen/10 to-transparent" />
              </div>

              <div className="relative z-10">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <span className="text-carrigreen">⚡</span>
                  Highlights
                </h3>
                <ul className="space-y-3">
                  {[
                    "35% latency reduction in RAG systems",
                    "60% faster response times achieved",
                    "98% uptime on production systems",
                    "1200+ Shopify sites built",
                  ].map((highlight, i) => (
                    <motion.li
                      key={i}
                      className="flex items-start gap-2 text-sm text-gray-400"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.7 + i * 0.1 }}
                      whileHover={{ x: 5, transition: { duration: 0.2 } }}
                    >
                      <span className="text-carrigreen mt-1">▸</span>
                      <span>{highlight}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
