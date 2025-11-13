import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useTheme } from "next-themes";

// Skills data with proficiency levels
const skillsData = [
  {
    category: "Frontend",
    skills: [
      { name: "React.js", level: 90, color: "from-blue-500 to-cyan-500" },
      { name: "Next.js", level: 85, color: "from-gray-800 to-gray-600" },
      { name: "TypeScript", level: 80, color: "from-blue-600 to-blue-400" },
      { name: "Tailwind CSS", level: 95, color: "from-cyan-500 to-teal-400" },
    ],
  },
  {
    category: "Backend",
    skills: [
      { name: "Node.js", level: 85, color: "from-green-600 to-green-400" },
      { name: "Express", level: 80, color: "from-gray-700 to-gray-500" },
      { name: "MongoDB", level: 75, color: "from-green-500 to-emerald-400" },
      { name: "REST APIs", level: 90, color: "from-purple-500 to-pink-500" },
    ],
  },
  {
    category: "Tools & Others",
    skills: [
      { name: "Git & GitHub", level: 85, color: "from-orange-500 to-red-500" },
      { name: "Redux", level: 75, color: "from-purple-600 to-purple-400" },
      { name: "GSAP", level: 70, color: "from-green-400 to-lime-400" },
      { name: "Solidity", level: 65, color: "from-indigo-500 to-blue-500" },
    ],
  },
];

const Myskills = () => {
  const { theme } = useTheme();
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const q = gsap.utils.selector(sectionRef);

    // Main entrance timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
        toggleActions: "play none none reverse",
      },
    });

    // Heading slides in from left with fade
    tl.fromTo(
      headingRef.current,
      { opacity: 0, x: -100, scale: 0.9 },
      {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 0.8,
        ease: "power3.out",
      }
    )
      // Description fades up
      .fromTo(
        descRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.4"
      )
      // Category cards stagger in
      .fromTo(
        q(".skill-category"),
        { opacity: 0, y: 60, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.15,
          duration: 0.7,
          ease: "back.out(1.2)",
        },
        "-=0.3"
      );

    // Animate skill bars when they come into view
    const skillBars = q(".skill-bar-fill");
    skillBars.forEach((bar: HTMLElement) => {
      const level = bar.getAttribute("data-level");
      gsap.fromTo(
        bar,
        { width: "0%" },
        {
          width: `${level}%`,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: bar,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    // Animate percentage counters
    const percentages = q(".skill-percentage");
    percentages.forEach((percent: HTMLElement) => {
      const level = parseInt(percent.getAttribute("data-level") || "0");
      const counter = { val: 0 };

      gsap.to(counter, {
        val: level,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: percent,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        onUpdate: () => {
          percent.textContent = Math.floor(counter.val) + "%";
        },
      });
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full py-20 px-4 sm:px-8 md:px-20 bg-gradient-to-b from-white via-gray-50 to-white dark:from-[#0B1120] dark:via-[#1B2731] dark:to-[#0B1120]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1
            ref={headingRef}
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-marrsgreen via-teal-500 to-carrigreen dark:from-carrigreen dark:via-teal-400 dark:to-marrsgreen bg-clip-text text-transparent"
          >
            My Development Skills
          </h1>
          <p
            ref={descRef}
            className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed"
          >
            Crafting exceptional digital experiences with modern technologies.
            From pixel-perfect frontends to robust backends, I bring ideas to
            life with clean, scalable code.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10">
          {skillsData.map((category, categoryIndex) => (
            <div
              key={category.category}
              className="skill-category group"
            >
              {/* Category Card */}
              <div className="relative h-full p-8 rounded-2xl bg-white dark:bg-[#1B2731] shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-800 overflow-hidden transform-gpu hover:-translate-y-2">
                {/* Gradient Background Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-marrsgreen/5 via-transparent to-carrigreen/5 dark:from-carrigreen/10 dark:via-transparent dark:to-marrsgreen/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Animated Border Glow */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-marrsgreen via-teal-500 to-carrigreen blur-xl -z-10 group-hover:blur-2xl" />

                {/* Category Header */}
                <div className="relative z-10 mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-marrsgreen to-carrigreen dark:from-carrigreen dark:to-marrsgreen flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <span className="text-white text-xl font-bold">
                        {category.category.charAt(0)}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {category.category}
                    </h3>
                  </div>
                  <div className="h-1 w-16 bg-gradient-to-r from-marrsgreen to-carrigreen dark:from-carrigreen dark:to-marrsgreen rounded-full group-hover:w-full transition-all duration-500" />
                </div>

                {/* Skills List */}
                <div className="relative z-10 space-y-6">
                  {category.skills.map((skill, skillIndex) => (
                    <div
                      key={skill.name}
                      className="skill-item group/item"
                    >
                      {/* Skill Name and Percentage */}
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-base font-semibold text-gray-800 dark:text-gray-200 group-hover/item:text-marrsgreen dark:group-hover/item:text-carrigreen transition-colors">
                          {skill.name}
                        </span>
                        <span
                          className="skill-percentage text-sm font-bold text-gray-600 dark:text-gray-400"
                          data-level={skill.level}
                        >
                          0%
                        </span>
                      </div>

                      {/* Animated Progress Bar */}
                      <div className="relative h-2.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden shadow-inner">
                        {/* Background Glow */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />

                        {/* Fill Bar */}
                        <div
                          className={`skill-bar-fill absolute inset-y-0 left-0 rounded-full bg-gradient-to-r ${skill.color} shadow-lg transition-all duration-300 group-hover/item:shadow-xl`}
                          data-level={skill.level}
                          style={{ width: "0%" }}
                        >
                          {/* Shine Effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Card Footer Badge */}
                <div className="relative z-10 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400 font-medium">
                      {category.skills.length} Technologies
                    </span>
                    <div className="flex items-center gap-1">
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={i}
                          className="w-2 h-2 rounded-full bg-gradient-to-r from-marrsgreen to-carrigreen dark:from-carrigreen dark:to-marrsgreen"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Stats Section */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: "Projects", value: "15+", icon: "🚀" },
            { label: "Technologies", value: "12+", icon: "⚡" },
            { label: "Experience", value: "1+ Yrs", icon: "💼" },
            { label: "Lines of Code", value: "50K+", icon: "💻" },
          ].map((stat, index) => (
            <div
              key={stat.label}
              className="stat-card text-center p-6 rounded-xl bg-white dark:bg-[#1B2731] shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 dark:border-gray-800"
            >
              <div className="text-4xl mb-2">{stat.icon}</div>
              <div className="text-3xl font-bold text-marrsgreen dark:text-carrigreen mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Myskills;
