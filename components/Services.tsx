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
      // Floating Y animation
      gsap.to(card, {
        y: index % 2 === 0 ? -12 : -8,
        duration: 2 + (index % 5) * 0.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: (index % 6) * 0.2,
      });

      // Subtle rotation animation
      gsap.to(card, {
        rotation: index % 2 === 0 ? 3 : -3,
        duration: 3 + (index % 4) * 0.3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: (index % 5) * 0.25,
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


        {/* Modern Skills Grid - Circular Floating Badges */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-6 md:gap-8 lg:gap-10 justify-items-center">
          {skillsData.map((skill, index) => {
            const IconComponent = skill.Icon;
            return (
              <div
                key={skill.name}
                className="skill-card relative group cursor-pointer flex flex-col items-center gap-3"
              >
                {/* Circular Card Container */}
                <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full bg-white dark:bg-[#1B2731] shadow-xl hover:shadow-2xl border-2 border-gray-100 dark:border-gray-800 overflow-hidden transition-all duration-500 hover:scale-110">

                  {/* Subtle always-on gradient glow */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${skill.gradient} opacity-5`} />

                  {/* Animated gradient glow on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${skill.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />

                  {/* Gradient border on hover */}
                  <div className={`absolute -inset-1 rounded-full bg-gradient-to-br ${skill.gradient} opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-500 -z-10`} />

                  {/* Icon centered */}
                  <div className="relative z-10 flex items-center justify-center w-full h-full">
                    <IconComponent className="text-3xl md:text-4xl transition-all duration-500 group-hover:scale-110 text-gray-700 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white" />
                  </div>
                </div>

                {/* Skill name - always visible */}
                <span className="text-xs md:text-sm font-semibold text-gray-700 dark:text-gray-300 text-center transition-colors duration-300 group-hover:text-gray-900 dark:group-hover:text-white">
                  {skill.name}
                </span>
              </div>
            );
          })}
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
