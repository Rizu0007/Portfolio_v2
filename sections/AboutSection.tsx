import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

import { useSection } from "context/section";
import useScrollActive from "hooks/useScrollActive";

import rizwan from "../public/rizwan.webp";

const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const { onSectionChange } = useSection();
  const aboutSection = useScrollActive(sectionRef);

  useEffect(() => {
    aboutSection ? onSectionChange!("who am i?") : onSectionChange!("");
  }, [aboutSection, onSectionChange]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const q = gsap.utils.selector(sectionRef);

    // Heading animation with 3D rotation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    tl.fromTo(
      headingRef.current,
      {
        opacity: 0,
        rotationX: -90,
        y: -50,
        scale: 0.8,
        transformPerspective: 1000,
      },
      {
        opacity: 1,
        rotationX: 0,
        y: 0,
        scale: 1,
        duration: 1,
        ease: "expo.out",
      }
    ).fromTo(
      q(".subtitle"),
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6 },
      "-=0.5"
    );

    // Profile image entrance with 3D rotation
    gsap.fromTo(
      imageRef.current,
      {
        opacity: 0,
        scale: 0.5,
        rotationY: -45,
        x: -100,
      },
      {
        opacity: 1,
        scale: 1,
        rotationY: 0,
        x: 0,
        duration: 1.2,
        ease: "expo.out",
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Continuous floating for profile image
    gsap.to(imageRef.current, {
      y: "+=20",
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // Profile image glow pulse
    const glowElement = q(".profile-glow")[0];
    if (glowElement) {
      gsap.to(glowElement, {
        opacity: 0.4,
        scale: 1.1,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }

    // Introduction text reveal word by word
    const introWords = q(".intro-word");
    gsap.fromTo(
      introWords,
      { opacity: 0, y: 20, rotationX: -20 },
      {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 0.5,
        stagger: 0.03,
        ease: "back.out(1.5)",
        scrollTrigger: {
          trigger: q(".intro-text"),
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Stats cards entrance with rotation and counter animation
    const statCards = q(".stat-card");
    statCards.forEach((card: HTMLElement, index: number) => {
      gsap.fromTo(
        card,
        {
          opacity: 0,
          scale: 0,
          rotation: -180,
          y: 100,
        },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          y: 0,
          duration: 0.8,
          ease: "back.out(2)",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
          delay: index * 0.1,
        }
      );

      // Floating animation for stat cards
      gsap.to(card, {
        y: "+=10",
        duration: 2 + index * 0.3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: index * 0.2,
      });
    });

    // Specialty cards with flip entrance
    const specialtyCards = q(".specialty-card");
    specialtyCards.forEach((card: HTMLElement, index: number) => {
      gsap.fromTo(
        card,
        {
          opacity: 0,
          rotationY: 90,
          x: index % 2 === 0 ? -50 : 50,
          scale: 0.8,
        },
        {
          opacity: 1,
          rotationY: 0,
          x: 0,
          scale: 1,
          duration: 1,
          ease: "expo.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          delay: index * 0.15,
        }
      );

      // Icon floating
      const icon = card.querySelector(".specialty-icon");
      if (icon) {
        gsap.to(icon, {
          y: "+=8",
          rotation: "+=5",
          duration: 2.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.3,
        });
      }

      // 3D tilt on hover
      card.addEventListener("mousemove", (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;

        gsap.to(card, {
          rotationX: rotateX,
          rotationY: rotateY,
          z: 20,
          transformPerspective: 1000,
          duration: 0.5,
          ease: "power2.out",
        });
      });

      card.addEventListener("mouseleave", () => {
        gsap.to(card, {
          rotationX: 0,
          rotationY: 0,
          z: 0,
          duration: 0.7,
          ease: "elastic.out(1, 0.5)",
        });
      });
    });

    // Education card entrance
    const eduCard = q(".education-card")[0];
    if (eduCard) {
      gsap.fromTo(
        eduCard,
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: eduCard,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    // Interest badges stagger entrance with bounce
    const interestBadges = q(".interest-badge");
    gsap.fromTo(
      interestBadges,
      { opacity: 0, scale: 0, rotation: -180 },
      {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: "back.out(2.5)",
        scrollTrigger: {
          trigger: q(".interests-container"),
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Interest badges floating
    interestBadges.forEach((badge: HTMLElement, index: number) => {
      gsap.to(badge, {
        y: "+=6",
        rotation: "+=3",
        duration: 2 + index * 0.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: index * 0.15,
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Split text into words for animation
  const introText = "A passionate Full Stack Developer with 2+ years of experience in designing, developing, and optimizing scalable web applications. I specialize in building innovative solutions that combine cutting-edge AI/ML technologies, robust MERN stack architectures, and blockchain implementations to solve real-world challenges.";
  const introWords = introText.split(" ");

  return (
    <section
      ref={sectionRef}
      id="whoami"
      className="w-full py-20 px-4 sm:px-8 md:px-20 bg-gradient-to-b from-white via-gray-50 to-white dark:from-[#0B1120] dark:via-[#1B2731] dark:to-[#0B1120] overflow-hidden relative"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-marrsgreen/5 dark:bg-carrigreen/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-500/5 dark:bg-teal-400/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2
            ref={headingRef}
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 bg-gradient-to-r from-marrsgreen via-teal-500 to-carrigreen dark:from-carrigreen dark:via-teal-400 dark:to-marrsgreen bg-clip-text text-transparent"
            style={{ transformStyle: "preserve-3d" }}
          >
            Who Am I?
          </h2>
          <p className="subtitle text-lg md:text-xl text-gray-600 dark:text-gray-400">
            Get to know me better
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-5 gap-12 mb-16">
          {/* Profile Image */}
          <div className="lg:col-span-2 flex justify-center items-start">
            <div
              ref={imageRef}
              className="relative"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Animated glow effect */}
              <div className="profile-glow absolute inset-0 bg-gradient-to-r from-marrsgreen/30 via-teal-500/30 to-carrigreen/30 dark:from-carrigreen/30 dark:via-teal-400/30 dark:to-marrsgreen/30 rounded-3xl blur-3xl opacity-20" />

              {/* Profile picture container */}
              <div className="relative w-72 md:w-80 lg:w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-gray-800 transform-gpu">
                <Image
                  src={rizwan}
                  width={1700}
                  height={1790}
                  priority
                  alt="Rizwan Ali"
                  className="rounded-2xl"
                />
              </div>

              {/* Decorative floating elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-80 animate-bounce" style={{ animationDuration: "3s" }} />
              <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full opacity-70 animate-pulse" />
              <div className="absolute top-1/2 -right-8 w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full opacity-60" style={{ animation: "float 4s ease-in-out infinite" }} />
            </div>
          </div>

          {/* Introduction Text */}
          <div className="lg:col-span-3 space-y-8">
            <div className="intro-text bg-white dark:bg-[#1B2731] rounded-2xl p-6 md:p-8 shadow-xl border border-gray-100 dark:border-gray-800">
              <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                {introWords.map((word, index) => (
                  <span key={index} className="intro-word inline-block mr-1">
                    {word}
                  </span>
                ))}
              </p>
            </div>

            {/* Highlight Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Experience", value: "2+", unit: "Years", icon: "💼", gradient: "from-blue-500 to-cyan-500" },
                { label: "Projects", value: "20+", unit: "Built", icon: "🚀", gradient: "from-purple-500 to-pink-500" },
                { label: "Technologies", value: "16+", unit: "Mastered", icon: "⚡", gradient: "from-green-500 to-emerald-500" },
                { label: "Code", value: "100K+", unit: "Lines", icon: "💻", gradient: "from-orange-500 to-red-500" },
              ].map((stat, index) => (
                <div
                  key={stat.label}
                  className="stat-card group relative bg-white dark:bg-[#1B2731] rounded-xl p-4 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-800 cursor-pointer overflow-hidden"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Background gradient on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

                  <div className="relative z-10 text-center">
                    <div className="text-3xl mb-2 transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">
                      {stat.icon}
                    </div>
                    <div className={`text-2xl md:text-3xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-1`}>
                      {stat.value}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                      {stat.unit}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* What I Do Section */}
        <div className="mb-16">
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-10 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
            What I Do
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "AI/ML Development",
                icon: "🤖",
                gradient: "from-violet-600 via-purple-600 to-indigo-600",
                description: "Building RAG systems, LangChain orchestration, and MCP integrations for intelligent solutions",
                skills: ["LangChain", "OpenAI", "Qdrant", "RAG Systems"],
              },
              {
                title: "Full Stack Engineering",
                icon: "⚙️",
                gradient: "from-emerald-600 via-teal-600 to-cyan-600",
                description: "Creating scalable applications with MERN stack, Next.js, and modern cloud architectures",
                skills: ["React", "Next.js", "Node.js", "PostgreSQL"],
              },
              {
                title: "Blockchain Solutions",
                icon: "⛓️",
                gradient: "from-amber-600 via-orange-600 to-red-600",
                description: "Developing smart contracts and decentralized applications using Solidity and Web3",
                skills: ["Solidity", "Web3", "Smart Contracts", "DApps"],
              },
            ].map((specialty, index) => (
              <div
                key={specialty.title}
                className="specialty-card group relative bg-white dark:bg-[#1B2731] rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-800 overflow-hidden"
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Background gradient glow */}
                <div className={`absolute inset-0 bg-gradient-to-br ${specialty.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

                {/* Icon */}
                <div className="specialty-icon relative z-10 mb-4">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${specialty.gradient} flex items-center justify-center text-3xl shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                    {specialty.icon}
                  </div>
                </div>

                {/* Title */}
                <h4 className="relative z-10 text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-marrsgreen dark:group-hover:text-carrigreen transition-colors">
                  {specialty.title}
                </h4>

                {/* Description */}
                <p className="relative z-10 text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                  {specialty.description}
                </p>

                {/* Skills */}
                <div className="relative z-10 flex flex-wrap gap-2">
                  {specialty.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium border border-gray-200 dark:border-gray-700 group-hover:border-marrsgreen dark:group-hover:border-carrigreen transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Bottom accent line */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${specialty.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700`} />
              </div>
            ))}
          </div>
        </div>

        {/* Education & Interests Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Education */}
          <div className="education-card bg-white dark:bg-[#1B2731] rounded-2xl p-6 md:p-8 shadow-xl border border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-3xl shadow-lg">
                🎓
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Education</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Academic Background</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-bold bg-gradient-to-r from-marrsgreen to-teal-600 dark:from-carrigreen dark:to-teal-400 bg-clip-text text-transparent mb-2">
                  BS Software Engineering
                </h4>
                <p className="text-gray-700 dark:text-gray-300 font-medium mb-1">
                  COMSATS University Islamabad
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <span>📅</span>
                  <span>2020 - 2024</span>
                  <span className="ml-2 px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded text-xs font-medium">
                    Graduated
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Interests */}
          <div className="bg-white dark:bg-[#1B2731] rounded-2xl p-6 md:p-8 shadow-xl border border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-pink-600 via-rose-600 to-red-600 flex items-center justify-center text-3xl shadow-lg">
                ❤️
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Interests</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">What I love doing</p>
              </div>
            </div>

            <div className="interests-container flex flex-wrap gap-3">
              {[
                { name: "Cricket", icon: "🏏", color: "from-green-500 to-emerald-500" },
                { name: "Gaming", icon: "🎮", color: "from-purple-500 to-pink-500" },
                { name: "Travelling", icon: "✈️", color: "from-blue-500 to-cyan-500" },
                { name: "Coding", icon: "💻", color: "from-orange-500 to-red-500" },
                { name: "Tech Innovation", icon: "🚀", color: "from-indigo-500 to-purple-500" },
              ].map((interest) => (
                <div
                  key={interest.name}
                  className="interest-badge group relative px-4 py-2 bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-700 rounded-full border border-gray-200 dark:border-gray-600 cursor-pointer hover:shadow-lg transition-all duration-300"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Gradient background on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${interest.color} opacity-0 group-hover:opacity-20 rounded-full transition-opacity duration-300`} />

                  <div className="relative z-10 flex items-center gap-2">
                    <span className="text-xl transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-300">
                      {interest.icon}
                    </span>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {interest.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Custom keyframes for floating animation */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
      `}</style>
    </section>
  );
};

export default AboutSection;
