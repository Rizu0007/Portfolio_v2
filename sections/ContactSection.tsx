import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { RoughNotation } from "react-rough-notation";

import LinkButton from "@/components/LinkButton";
import { useSection } from "context/section";
import useOnScreen from "hooks/useOnScreen";
import useScrollActive from "hooks/useScrollActive";

const ContactSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isSecOnScreen = useOnScreen(sectionRef);

  const elementRef = useRef<HTMLDivElement>(null);
  const isOnScreen = useOnScreen(elementRef);

  // Set active link for contact section
  const contactSection = useScrollActive(sectionRef);
  const { onSectionChange } = useSection();

  useEffect(() => {
    contactSection && onSectionChange!("contact");
  }, [contactSection]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Animated particles in background
    const particles = document.querySelectorAll('.particle');
    particles.forEach((particle, i) => {
      gsap.to(particle, {
        y: `random(-50, 50)`,
        x: `random(-30, 30)`,
        opacity: `random(0.2, 0.6)`,
        duration: `random(2, 4)`,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: i * 0.2,
      });
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8, rotateY: -15 },
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        duration: 0.6,
        ease: "backOut"
      }
    }
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="section min-h-[600px] text-center py-16 relative overflow-hidden"
    >
      {/* Animated background particles */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="particle absolute w-1 h-1 bg-carrigreen/30 rounded-full"
          style={{
            left: `${10 + i * 12}%`,
            top: `${20 + Math.random() * 60}%`,
          }}
        />
      ))}

      {/* Background gradient glow */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-carrigreen/5 to-transparent pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      />

      <div className="max-w-3xl mx-auto px-4 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Contact Title */}
          <motion.div
            className="text-center mb-10"
            variants={itemVariants}
            ref={elementRef}
          >
            <RoughNotation
              type="underline"
              color="rgb(19 226 191)"
              strokeWidth={2}
              order={1}
              show={isOnScreen}
            >
              <h2 className="text-3xl md:text-4xl inline-block font-bold bg-gradient-to-r from-carrigreen via-teal-400 to-marrsgreen bg-clip-text text-transparent">
                Let's Connect
              </h2>
            </RoughNotation>
          </motion.div>

          {/* Main Heading & Description */}
          <motion.div className="mb-12" variants={itemVariants}>
            <h3 className="font-bold text-2xl mb-3 md:text-3xl">
              Let's build something amazing together!
            </h3>
            <p className="mb-6 mx-auto max-w-xl text-base md:text-lg text-gray-400 leading-relaxed">
              I'm driven by my passion for coding and hunger for new challenges. Whether you have opportunities for collaboration or want to create something extraordinary, I'd love to hear from you!
            </p>
          </motion.div>

          {/* Contact Cards Grid - Smaller & Compact */}
          <motion.div
            className="grid md:grid-cols-3 gap-4 mb-10"
            variants={containerVariants}
          >
            {/* Email Card */}
            <motion.a
              href="mailto:ruzwanali800@gmail.com"
              className="group relative cursor-pointer rounded-xl bg-[#1B2731]/80 backdrop-blur-sm shadow-md border border-gray-700/50 p-5 overflow-hidden"
              variants={cardVariants}
              whileHover={{
                y: -8,
                scale: 1.05,
                borderColor: "rgba(59, 130, 246, 0.5)",
                transition: { duration: 0.3 }
              }}
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Animated glow on hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-600/0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
              />

              <div className="flex flex-col items-center gap-3 relative z-10">
                <motion.div
                  className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </motion.div>
                <div className="text-center">
                  <h4 className="font-bold text-base text-white">Email</h4>
                  <p className="text-xs text-gray-400">Drop me a line</p>
                </div>
              </div>
            </motion.a>

            {/* LinkedIn Card */}
            <motion.a
              href="https://www.linkedin.com/in/rizwan-dev007/"
              target="_blank"
              rel="noreferrer"
              className="group relative cursor-pointer rounded-xl bg-[#1B2731]/80 backdrop-blur-sm shadow-md border border-gray-700/50 p-5 overflow-hidden"
              variants={cardVariants}
              whileHover={{
                y: -8,
                scale: 1.05,
                borderColor: "rgba(37, 99, 235, 0.5)",
                transition: { duration: 0.3 }
              }}
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Animated glow on hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-blue-600/0 to-blue-400/0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
              />

              <div className="flex flex-col items-center gap-3 relative z-10">
                <motion.div
                  className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </motion.div>
                <div className="text-center">
                  <h4 className="font-bold text-base text-white">LinkedIn</h4>
                  <p className="text-xs text-gray-400">Let's connect</p>
                </div>
              </div>
            </motion.a>

            {/* GitHub Card */}
            <motion.a
              href="https://github.com/Rizu0007"
              target="_blank"
              rel="noreferrer"
              className="group relative cursor-pointer rounded-xl bg-[#1B2731]/80 backdrop-blur-sm shadow-md border border-gray-700/50 p-5 overflow-hidden"
              variants={cardVariants}
              whileHover={{
                y: -8,
                scale: 1.05,
                borderColor: "rgba(107, 114, 128, 0.5)",
                transition: { duration: 0.3 }
              }}
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Animated glow on hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-gray-800/0 to-gray-600/0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
              />

              <div className="flex flex-col items-center gap-3 relative z-10">
                <motion.div
                  className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-800 to-gray-600 flex items-center justify-center"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.026 2c-5.509 0-9.974 4.465-9.974 9.974 0 4.406 2.857 8.145 6.821 9.465.499.09.679-.217.679-.481 0-.237-.008-.865-.011-1.696-2.775.602-3.361-1.338-3.361-1.338-.452-1.152-1.107-1.459-1.107-1.459-.905-.619.069-.605.069-.605 1.002.07 1.527 1.028 1.527 1.028.89 1.524 2.336 1.084 2.902.829.091-.645.351-1.085.635-1.334-2.214-.251-4.542-1.107-4.542-4.93 0-1.087.389-1.979 1.024-2.675-.101-.253-.446-1.268.099-2.64 0 0 .837-.269 2.742 1.021a9.582 9.582 0 0 1 2.496-.336 9.554 9.554 0 0 1 2.496.336c1.906-1.291 2.742-1.021 2.742-1.021.545 1.372.203 2.387.099 2.64.64.696 1.024 1.587 1.024 2.675 0 3.833-2.33 4.675-4.552 4.922.355.308.675.916.675 1.846 0 1.334-.012 2.41-.012 2.737 0 .267.178.577.687.479C19.146 20.115 22 16.379 22 11.974 22 6.465 17.535 2 12.026 2z"/>
                  </svg>
                </motion.div>
                <div className="text-center">
                  <h4 className="font-bold text-base text-white">GitHub</h4>
                  <p className="text-xs text-gray-400">Check my work</p>
                </div>
              </div>
            </motion.a>
          </motion.div>

          {/* CTA Button */}
          <motion.div variants={itemVariants}>
            <LinkButton href="mailto:ruzwanali800@gmail.com">
              <motion.span
                className="flex items-center gap-2 px-5 py-2"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <span className="text-base font-bold">Let's Talk</span>
                <motion.svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </motion.svg>
              </motion.span>
            </LinkButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
