import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiNestjs,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiChainlink,
  SiGraphql,
  SiAmazonaws,
  SiSocketdotio,
  SiChartdotjs,
  SiGithub,
  SiSolidity
} from "react-icons/si";

// Skills data with official logos
const skillsData = [
  {
    name: "React.js",
    Icon: SiReact,
    gradient: "from-blue-500 via-cyan-500 to-blue-400",
    shadow: "shadow-blue-500/50",
  },
  {
    name: "Next.js",
    Icon: SiNextdotjs,
    gradient: "from-gray-800 via-gray-600 to-gray-800",
    shadow: "shadow-gray-500/50",
  },
  {
    name: "TypeScript",
    Icon: SiTypescript,
    gradient: "from-blue-600 via-blue-500 to-blue-400",
    shadow: "shadow-blue-500/50",
  },
  {
    name: "Tailwind CSS",
    Icon: SiTailwindcss,
    gradient: "from-cyan-500 via-teal-400 to-cyan-600",
    shadow: "shadow-cyan-500/50",
  },
  {
    name: "Node.js",
    Icon: SiNodedotjs,
    gradient: "from-green-600 via-green-500 to-emerald-500",
    shadow: "shadow-green-500/50",
  },
  {
    name: "Nest.js",
    Icon: SiNestjs,
    gradient: "from-red-500 via-pink-500 to-red-600",
    shadow: "shadow-red-500/50",
  },
  {
    name: "Express.js",
    Icon: SiExpress,
    gradient: "from-gray-700 via-gray-600 to-gray-500",
    shadow: "shadow-gray-500/50",
  },
  {
    name: "MongoDB",
    Icon: SiMongodb,
    gradient: "from-green-500 via-emerald-500 to-green-600",
    shadow: "shadow-green-500/50",
  },
  {
    name: "PostgreSQL",
    Icon: SiPostgresql,
    gradient: "from-blue-700 via-blue-600 to-blue-500",
    shadow: "shadow-blue-600/50",
  },
  {
    name: "LangChain",
    Icon: SiChainlink,
    gradient: "from-yellow-500 via-orange-500 to-yellow-600",
    shadow: "shadow-yellow-500/50",
  },
  {
    name: "GraphQL",
    Icon: SiGraphql,
    gradient: "from-pink-600 via-purple-500 to-pink-500",
    shadow: "shadow-pink-500/50",
  },
  {
    name: "AWS",
    Icon: SiAmazonaws,
    gradient: "from-orange-600 via-yellow-500 to-orange-500",
    shadow: "shadow-orange-500/50",
  },
  {
    name: "WebSockets",
    Icon: SiSocketdotio,
    gradient: "from-purple-500 via-pink-500 to-purple-600",
    shadow: "shadow-purple-500/50",
  },
  {
    name: "Chart.js",
    Icon: SiChartdotjs,
    gradient: "from-teal-500 via-cyan-500 to-teal-600",
    shadow: "shadow-teal-500/50",
  },
  {
    name: "Git & GitHub",
    Icon: SiGithub,
    gradient: "from-orange-500 via-red-500 to-orange-600",
    shadow: "shadow-orange-500/50",
  },
];

const Myskills = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const q = gsap.utils.selector(sectionRef);

    // Advanced entrance timeline with morphing and 3D effects
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
        toggleActions: "play none none reverse",
      },
    });

    // Heading entrance animation
    tl.fromTo(
      headingRef.current,
      {
        opacity: 0,
        y: -30,
        scale: 0.95,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "power3.out",
      }
    )
    .fromTo(
      descRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out"
      },
      "-=0.5"
    );

    // Skill cards with clean entrance animation
    const skillCards = q(".skill-card");
    skillCards.forEach((card: HTMLElement, index: number) => {
      tl.fromTo(
        card,
        {
          opacity: 0,
          scale: 0.5,
          y: 50,
          rotation: -10,
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          rotation: 0,
          duration: 0.8,
          ease: "elastic.out(1, 0.6)",
        },
        `-=${index === 0 ? 0.4 : 0.7}`
      );
    });

    // Enhanced continuous floating animation for all cards
    skillCards.forEach((card: HTMLElement, index: number) => {
      gsap.to(card, {

        y: "+=6",
        duration: 2 + index * 0.1,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: (index % 4) * 0.3,
      });
    });

    // Animate stats cards
    const statCards = q(".stat-card");
    gsap.fromTo(
      statCards,
      {
        opacity: 0,
        scale: 0.5,
        y: 40,
        rotation: 5,
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        rotation: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "elastic.out(1, 0.7)",
        scrollTrigger: {
          trigger: ".stat-card",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full py-20 px-4 sm:px-8 md:px-20 overflow-hidden relative"
    >
      {/* Background animated text */}
      <span
        aria-hidden="true"
        className="absolute top-10 left-0 right-0 text-center rotate-12 text-gray-100 dark:text-[#1f2e3a] text-8xl md:text-9xl scale-150 tracking-wide font-bold select-none pointer-events-none z-0 opacity-50"
      >
        REACT NEXT.JS NODE.JS TYPESCRIPT
      </span>
      <span
        aria-hidden="true"
        className="absolute top-96 left-0 right-0 text-center -rotate-12 text-gray-100 dark:text-[#1f2e3a] text-8xl md:text-9xl scale-150 tracking-wide font-bold select-none pointer-events-none z-0 opacity-50"
      >
        LANGCHAIN POSTGRESQL QDRANT
      </span>
      <span
        aria-hidden="true"
        className="absolute bottom-20 left-0 right-0 text-center rotate-12 text-gray-100 dark:text-[#1f2e3a] text-8xl md:text-9xl scale-150 tracking-wide font-bold select-none pointer-events-none z-0 opacity-50"
      >
        MONGODB EXPRESS NEST.JS GRAPHQL
      </span>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
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
            Crafting exceptional digital experiences with cutting-edge technologies
          </p>
        </div>


        {/* Modern Skills Grid - No Progress Bars */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-10">
          {skillsData.map((skill, index) => (
            <div
              key={skill.name}
              className="skill-card relative group cursor-pointer"
            >
              {/* Card Container */}
              <div className="relative h-full p-3 md:p-4 rounded-3xl bg-white dark:bg-[#1B2731] shadow-lg hover:shadow-2xl border-2 border-gray-100 dark:border-gray-800 hover:border-transparent overflow-hidden transition-all duration-500 hover:scale-105 hover:-translate-y-2 hover:rotate-1">

                {/* Animated gradient border on hover */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${skill.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-sm`} />

                {/* Shimmer effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                </div>

                {/* Animated gradient glow effect */}
                <div className="glow-effect absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className={`absolute inset-0 bg-gradient-to-br ${skill.gradient} opacity-20 blur-2xl`} />
                </div>

                {/* Floating particles effect */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className={`absolute w-2 h-2 rounded-full bg-gradient-to-r ${skill.gradient} opacity-0 group-hover:opacity-60 transition-opacity duration-700`}
                      style={{
                        top: `${20 + i * 30}%`,
                        left: `${10 + i * 20}%`,
                        animation: `float ${3 + i}s ease-in-out infinite ${i * 0.5}s`,
                      }}
                    />
                  ))}
                </div>

                {/* Icon */}
                <div className="relative z-10 flex flex-col items-center justify-center h-full gap-2">
                  <div
                    className={`w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-gradient-to-br ${skill.gradient} flex items-center justify-center shadow-2xl ${skill.shadow} group-hover:scale-125 group-hover:rotate-12 transition-all duration-500`}
                  >
                    <span className="text-xl md:text-2xl font-bold text-white group-hover:scale-110 transition-transform duration-300">
                      {skill.icon}
                    </span>
                  </div>

                  {/* Skill name */}
                  <h3 className="text-xs md:text-sm font-bold text-gray-900 dark:text-white text-center group-hover:scale-105 transition-transform duration-300">
                    {skill.name}
                  </h3>

                  {/* Icon with official logo */}
                  <div className="relative z-10 flex items-center justify-center">
                    <div
                      className={`w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full bg-gradient-to-br ${skill.gradient} flex items-center justify-center shadow-xl ${skill.shadow} group-hover:rotate-12 transition-all duration-500 transform-gpu`}
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      <IconComponent className="text-white text-2xl md:text-3xl" />
                    </div>
                  </div>

                  {/* Rotating border accent */}
                  <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${skill.gradient} opacity-20 blur-md animate-pulse`} />
                  </div>
                </div>

                {/* Skill name below the circle */}
                <h3 className="mt-3 md:mt-4 text-xs md:text-sm font-bold text-gray-900 dark:text-white text-center group-hover:scale-110 transition-all duration-300">
                  {skill.name}
                </h3>
              </div>
            );
          })}
        </div>

        {/* Stats Section with Advanced Animations */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: "Projects", value: "20+", icon: "🚀", color: "from-blue-500 to-cyan-500" },
            { label: "Technologies", value: "15+", icon: "⚡", color: "from-purple-500 to-pink-500" },
            { label: "Experience", value: "2+ Yrs", icon: "💼", color: "from-green-500 to-emerald-500" },
            { label: "Lines of Code", value: "100K+", icon: "💻", color: "from-orange-500 to-red-500" },
          ].map((stat, index) => (
            <div
              key={stat.label}
              className="stat-card relative text-center p-3 md:p-4 rounded-3xl bg-white dark:bg-[#1B2731] shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 hover:rotate-2 border-2 border-gray-100 dark:border-gray-800 hover:border-transparent group cursor-pointer overflow-hidden"
            >
              {/* Animated gradient border on hover */}
              <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-sm`} />

              {/* Shimmer effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
              </div>

              {/* Background gradient pulse */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

              <div className="relative z-10">
                <div className="text-3xl md:text-4xl mb-2 transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">
                  {stat.icon}
                </div>
                <div className={`text-2xl md:text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-1`}>
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400 font-medium">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Custom keyframes for floating animation */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-20px) translateX(10px);
          }
        }
      `}</style>
    </section>
  );
};

export default Myskills;
