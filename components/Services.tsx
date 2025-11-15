import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

// Skills data with modern badge design
const skillsData = [
  {
    name: "React.js",
    icon: "⚛️",
    gradient: "from-blue-500 via-cyan-500 to-blue-400",
    shadow: "shadow-blue-500/50",
  },
  {
    name: "Next.js",
    icon: "▲",
    gradient: "from-gray-800 via-gray-600 to-gray-800",
    shadow: "shadow-gray-500/50",
  },
  {
    name: "TypeScript",
    icon: "TS",
    gradient: "from-blue-600 via-blue-500 to-blue-400",
    shadow: "shadow-blue-500/50",
  },
  {
    name: "Tailwind CSS",
    icon: "🎨",
    gradient: "from-cyan-500 via-teal-400 to-cyan-600",
    shadow: "shadow-cyan-500/50",
  },
  {
    name: "Node.js",
    icon: "📦",
    gradient: "from-green-600 via-green-500 to-emerald-500",
    shadow: "shadow-green-500/50",
  },
  {
    name: "Nest.js",
    icon: "🐈",
    gradient: "from-red-500 via-pink-500 to-red-600",
    shadow: "shadow-red-500/50",
  },
  {
    name: "Express.js",
    icon: "⚡",
    gradient: "from-gray-700 via-gray-600 to-gray-500",
    shadow: "shadow-gray-500/50",
  },
  {
    name: "MongoDB",
    icon: "🍃",
    gradient: "from-green-500 via-emerald-500 to-green-600",
    shadow: "shadow-green-500/50",
  },
  {
    name: "PostgreSQL",
    icon: "🐘",
    gradient: "from-blue-700 via-blue-600 to-blue-500",
    shadow: "shadow-blue-600/50",
  },
  {
    name: "LangChain",
    icon: "🔗",
    gradient: "from-yellow-500 via-orange-500 to-yellow-600",
    shadow: "shadow-yellow-500/50",
  },
  {
    name: "GraphQL",
    icon: "◆",
    gradient: "from-pink-600 via-purple-500 to-pink-500",
    shadow: "shadow-pink-500/50",
  },
  {
    name: "AWS",
    icon: "☁️",
    gradient: "from-orange-600 via-yellow-500 to-orange-500",
    shadow: "shadow-orange-500/50",
  },
  {
    name: "WebSockets",
    icon: "🔌",
    gradient: "from-purple-500 via-pink-500 to-purple-600",
    shadow: "shadow-purple-500/50",
  },
  {
    name: "Chart.js",
    icon: "📊",
    gradient: "from-teal-500 via-cyan-500 to-teal-600",
    shadow: "shadow-teal-500/50",
  },
  {
    name: "Git & GitHub",
    icon: "🔥",
    gradient: "from-orange-500 via-red-500 to-orange-600",
    shadow: "shadow-orange-500/50",
  },
  {
    name: "Solidity",
    icon: "💎",
    gradient: "from-indigo-500 via-blue-500 to-indigo-600",
    shadow: "shadow-indigo-500/50",
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

    // Heading with 3D rotation and scale
    tl.fromTo(
      headingRef.current,
      {
        opacity: 0,
        rotationX: -90,
        y: -100,
        scale: 0.5,
        transformPerspective: 1000,
      },
      {
        opacity: 1,
        rotationX: 0,
        y: 0,
        scale: 1,
        duration: 1.2,
        ease: "expo.out",
      }
    )
    .fromTo(
      descRef.current,
      { opacity: 0, y: 50, rotationX: 45 },
      {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 0.8,
        ease: "back.out(1.5)"
      },
      "-=0.8"
    );

    // Skill cards with advanced 3D entrance - spiral pattern
    const skillCards = q(".skill-card");
    skillCards.forEach((card: HTMLElement, index: number) => {
      const angle = (index * 360) / skillCards.length;
      const radius = 200;

      tl.fromTo(
        card,
        {
          opacity: 0,
          scale: 0,
          rotationY: 180,
          rotationX: 90,
          x: Math.cos(angle * Math.PI / 180) * radius,
          y: Math.sin(angle * Math.PI / 180) * radius,
          z: -500,
          transformPerspective: 1000,
        },
        {
          opacity: 1,
          scale: 1,
          rotationY: 0,
          rotationX: 0,
          x: 0,
          y: 0,
          z: 0,
          duration: 1.2,
          ease: "expo.out",
        },
        `-=${index === 0 ? 0.3 : 1.1}`
      );
    });

    // Continuous floating animation for all cards
    skillCards.forEach((card: HTMLElement, index: number) => {
      gsap.to(card, {
        y: "+=15",
        duration: 2 + index * 0.1,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: index * 0.1,
      });
    });

    // Add 3D tilt effect on mouse move for each card
    skillCards.forEach((card: HTMLElement) => {
      const handleMouseMove = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -15;
        const rotateY = ((x - centerX) / centerX) * 15;

        gsap.to(card, {
          rotationX: rotateX,
          rotationY: rotateY,
          transformPerspective: 1000,
          duration: 0.5,
          ease: "power2.out",
        });

        // Move glow effect
        const glow = card.querySelector(".glow-effect") as HTMLElement;
        if (glow) {
          gsap.to(glow, {
            x: x - centerX,
            y: y - centerY,
            duration: 0.3,
          });
        }
      };

      const handleMouseLeave = () => {
        gsap.to(card, {
          rotationX: 0,
          rotationY: 0,
          duration: 0.8,
          ease: "elastic.out(1, 0.5)",
        });

        const glow = card.querySelector(".glow-effect") as HTMLElement;
        if (glow) {
          gsap.to(glow, {
            x: 0,
            y: 0,
            duration: 0.5,
          });
        }
      };

      card.addEventListener("mousemove", handleMouseMove);
      card.addEventListener("mouseleave", handleMouseLeave);
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      skillCards.forEach((card: HTMLElement) => {
        card.removeEventListener("mousemove", () => {});
        card.removeEventListener("mouseleave", () => {});
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full py-20 px-4 sm:px-8 md:px-20 overflow-hidden relative"
      style={{ perspective: "2000px" }}
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
        {/* Header with 3D Transform */}
        <div className="text-center mb-20" style={{ transformStyle: "preserve-3d" }}>
          <h1
            ref={headingRef}
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-marrsgreen via-teal-500 to-carrigreen dark:from-carrigreen dark:via-teal-400 dark:to-marrsgreen bg-clip-text text-transparent"
            style={{ transformStyle: "preserve-3d" }}
          >
            My Development Skills
          </h1>
          <p
            ref={descRef}
            className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed"
            style={{ transformStyle: "preserve-3d" }}
          >
            Crafting exceptional digital experiences with cutting-edge technologies
          </p>
        </div>

        {/* Modern Skills Grid - No Progress Bars */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {skillsData.map((skill, index) => (
            <div
              key={skill.name}
              className="skill-card relative group cursor-pointer"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Card Container with 3D depth */}
              <div className="relative h-full p-6 md:p-8 rounded-2xl bg-white dark:bg-[#1B2731] shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden transform-gpu transition-all duration-500">

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

                {/* Icon with 3D transform */}
                <div className="relative z-10 flex flex-col items-center justify-center h-full gap-4">
                  <div
                    className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br ${skill.gradient} flex items-center justify-center shadow-2xl ${skill.shadow} group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 transform-gpu`}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <span className="text-3xl md:text-4xl font-bold text-white">
                      {skill.icon}
                    </span>
                  </div>

                  {/* Skill name */}
                  <h3 className="text-base md:text-lg font-bold text-gray-900 dark:text-white text-center group-hover:scale-110 transition-transform duration-300">
                    {skill.name}
                  </h3>

                  {/* Animated underline */}
                  <div className={`h-1 w-0 group-hover:w-full bg-gradient-to-r ${skill.gradient} rounded-full transition-all duration-500`} />
                </div>

                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className={`absolute top-2 right-2 w-3 h-3 rounded-full bg-gradient-to-br ${skill.gradient} animate-ping`} />
                  <div className={`absolute top-2 right-2 w-3 h-3 rounded-full bg-gradient-to-br ${skill.gradient}`} />
                </div>

                {/* Bottom shine effect */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent dark:via-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section with Advanced Animations */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: "Projects", value: "20+", icon: "🚀", color: "from-blue-500 to-cyan-500" },
            { label: "Technologies", value: "16+", icon: "⚡", color: "from-purple-500 to-pink-500" },
            { label: "Experience", value: "2+ Yrs", icon: "💼", color: "from-green-500 to-emerald-500" },
            { label: "Lines of Code", value: "100K+", icon: "💻", color: "from-orange-500 to-red-500" },
          ].map((stat, index) => (
            <div
              key={stat.label}
              className="stat-card relative text-center p-6 rounded-2xl bg-white dark:bg-[#1B2731] shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 border border-gray-100 dark:border-gray-800 group cursor-pointer overflow-hidden"
            >
              {/* Background gradient pulse */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

              <div className="relative z-10">
                <div className="text-4xl mb-3 transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">
                  {stat.icon}
                </div>
                <div className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
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
