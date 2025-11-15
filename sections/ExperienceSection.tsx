import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const experienceData = [
  {
    company: "Grandeur",
    role: "Full Stack Developer",
    duration: "July 2025 – Present",
    location: "Lahore, Pakistan",
    type: "Current Position",
    icon: "🚀",
    gradient: "from-purple-600 via-violet-600 to-indigo-600",
    achievements: [
      "Leading development of Xeko.ai, an AI-powered RAG chatbot platform using LangChain orchestration",
      "Architected ETL pipeline for web crawling and data processing with optimal chunking strategies",
      "Built hybrid search system using Qdrant vector database with semantic retrieval",
      "Implemented MCP integrations with Shopify, Contentful, WooCommerce, and Zapier APIs",
      "Reduced response latency by 35% with OpenAI embeddings and contextual compression",
      "Improved data synchronization by 40% with custom MCP adapters and real-time event streaming",
    ],
    techStack: ["LangChain", "Qdrant", "OpenAI", "MCP", "Next.js", "Shopify"],
  },
  {
    company: "Digital Dost",
    role: "Software Engineer",
    duration: "March 2024 – July 2025",
    location: "Lahore, Pakistan",
    type: "Full-time",
    icon: "📈",
    gradient: "from-emerald-600 via-teal-600 to-cyan-600",
    achievements: [
      "Key contributor to UpInvest, a high-performance stock market platform using Next.js, Nest.js, PostgreSQL",
      "Engineered portfolio management system with real-time market tracking and trend analysis",
      "Achieved 60% faster response times with advanced caching strategies, maintaining 98% uptime",
      "Led frontend development for MyArbit with React.js and real-time visualizations using Chart.js",
      "Drove 45% increase in user engagement with interactive dashboards for crypto staking",
      "Integrated WebSocket connections for live market data updates with seamless real-time performance",
    ],
    techStack: ["Next.js", "Nest.js", "PostgreSQL", "React.js", "Chart.js", "WebSockets"],
  },
  {
    company: "Syntax Software House",
    role: "Associate Full Stack Developer",
    duration: "April 2023 – December 2023",
    location: "Islamabad, Pakistan",
    type: "Full-time",
    icon: "💻",
    gradient: "from-amber-600 via-orange-600 to-red-600",
    achievements: [
      "Played pivotal role in transformation of RentMe web platform using MERN technologies",
      "Enhanced user interfaces and ensured real-time data flow for property rental interactions",
      "Boosted web application performance by 25% through optimized backend and frontend integration",
      "Implemented responsive UI components and RESTful API integrations",
    ],
    techStack: ["React.js", "Node.js", "MongoDB", "Express.js", "REST APIs"],
  },
];

const ExperienceSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const q = gsap.utils.selector(sectionRef);

    // Heading animation with subtitle
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

    // Timeline line with glow animation
    gsap.fromTo(
      timelineRef.current,
      { scaleY: 0, transformOrigin: "top" },
      {
        scaleY: 1,
        duration: 1.5,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: timelineRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Add glow to timeline on scroll
    gsap.to(q(".timeline-glow"), {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top center",
        end: "bottom center",
        scrub: 1,
      },
      opacity: 0.6,
    });

    // Experience cards animation
    const cards = q(".experience-card");
    cards.forEach((card: HTMLElement, index: number) => {
      const isLeft = index % 2 === 0;

      // Card entrance with rotation
      gsap.fromTo(
        card,
        {
          opacity: 0,
          x: isLeft ? -100 : 100,
          y: 50,
          scale: 0.9,
          rotationY: isLeft ? -15 : 15,
        },
        {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          rotationY: 0,
          duration: 0.9,
          ease: "expo.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Timeline dot animation with pulse
      const dot = card.querySelector(".timeline-dot");
      if (dot) {
        gsap.fromTo(
          dot,
          { scale: 0, rotation: -180 },
          {
            scale: 1,
            rotation: 0,
            duration: 0.6,
            ease: "back.out(2)",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Continuous pulse for active dots
        if (index === 0) {
          gsap.to(dot, {
            boxShadow: "0 0 20px rgba(0, 122, 122, 0.8)",
            duration: 1.5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        }
      }

      // Company icon floating
      const icon = card.querySelector(".company-icon");
      if (icon) {
        gsap.to(icon, {
          y: "+=8",
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.2,
        });
      }

      // Achievement bullets stagger in
      const achievements = card.querySelectorAll(".achievement-item");
      gsap.fromTo(
        achievements,
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Tech stack stagger with bounce
      const techBadges = card.querySelectorAll(".tech-badge");
      gsap.fromTo(
        techBadges,
        { opacity: 0, scale: 0, y: 10 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.05,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: card,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Card content with parallax on scroll
      const cardContent = card.querySelector(".card-content");
      if (cardContent) {
        gsap.to(cardContent, {
          y: -20,
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      }

      // Enhanced 3D tilt with depth
      card.addEventListener("mousemove", (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -8;
        const rotateY = ((x - centerX) / centerX) * 8;

        gsap.to(card, {
          rotationX: rotateX,
          rotationY: rotateY,
          z: 30,
          transformPerspective: 1000,
          duration: 0.5,
          ease: "power2.out",
        });

        // Move glow with cursor
        const glow = card.querySelector(".card-glow") as HTMLElement;
        if (glow) {
          gsap.to(glow, {
            x: (x / rect.width) * 100 - 50,
            y: (y / rect.height) * 100 - 50,
            opacity: 0.15,
            duration: 0.3,
          });
        }
      });

      card.addEventListener("mouseleave", () => {
        gsap.to(card, {
          rotationX: 0,
          rotationY: 0,
          z: 0,
          duration: 0.7,
          ease: "elastic.out(1, 0.5)",
        });

        const glow = card.querySelector(".card-glow") as HTMLElement;
        if (glow) {
          gsap.to(glow, {
            x: 0,
            y: 0,
            opacity: 0,
            duration: 0.5,
          });
        }
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="w-full py-20 px-4 sm:px-8 md:px-20 bg-gradient-to-b from-white via-gray-50 to-white dark:from-[#0B1120] dark:via-[#1B2731] dark:to-[#0B1120] overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-20">
          <h2
            ref={headingRef}
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-marrsgreen via-teal-500 to-carrigreen dark:from-carrigreen dark:via-teal-400 dark:to-marrsgreen bg-clip-text text-transparent"
            style={{ transformStyle: "preserve-3d" }}
          >
            Work Experience
          </h2>
          <p className="subtitle text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Building innovative solutions across AI, fintech, and e-commerce
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Timeline Line with Glow */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 transform md:-translate-x-1/2">
            <div
              ref={timelineRef}
              className="w-1 h-full bg-gradient-to-b from-marrsgreen via-teal-500 to-carrigreen dark:from-carrigreen dark:via-teal-400 dark:to-marrsgreen"
            />
            <div className="timeline-glow absolute inset-0 w-1 bg-gradient-to-b from-marrsgreen via-teal-500 to-carrigreen dark:from-carrigreen dark:via-teal-400 dark:to-marrsgreen blur-md opacity-0" />
          </div>

          {/* Experience Cards */}
          <div className="space-y-12">
            {experienceData.map((exp, index) => {
              const isLeft = index % 2 === 0;
              return (
                <div
                  key={exp.company}
                  className={`experience-card relative flex items-center ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  } flex-col md:gap-8`}
                >
                  {/* Timeline Dot with Pulse */}
                  <div className="timeline-dot absolute left-8 md:left-1/2 w-6 h-6 bg-white dark:bg-gray-800 border-4 border-marrsgreen dark:border-carrigreen rounded-full transform md:-translate-x-1/2 z-10 shadow-lg">
                    {/* Inner glow */}
                    <div className="absolute inset-0 rounded-full bg-marrsgreen dark:bg-carrigreen opacity-20 animate-pulse" />
                  </div>

                  {/* Spacer for desktop */}
                  <div className="hidden md:block md:w-1/2" />

                  {/* Card Content */}
                  <div
                    className={`w-full md:w-1/2 ml-16 md:ml-0 ${
                      isLeft ? "md:pr-12" : "md:pl-12"
                    }`}
                  >
                    <div className="card-content group relative bg-white dark:bg-[#1B2731] rounded-2xl p-6 md:p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-800 transform-gpu" style={{ transformStyle: "preserve-3d" }}>
                      {/* Animated gradient glow on hover */}
                      <div className={`card-glow absolute inset-0 bg-gradient-to-br ${exp.gradient} opacity-0 rounded-2xl blur-2xl pointer-events-none`} />

                      {/* Company Badge */}
                      <div className="relative z-10 flex items-center gap-4 mb-4">
                        <div
                          className={`company-icon w-14 h-14 rounded-xl bg-gradient-to-br ${exp.gradient} flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-500`}
                        >
                          {exp.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-marrsgreen dark:group-hover:text-carrigreen transition-colors">
                            {exp.company}
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {exp.location}
                          </p>
                        </div>
                      </div>

                      {/* Role & Duration */}
                      <div className="mb-4">
                        <h4 className="text-xl font-bold bg-gradient-to-r from-marrsgreen to-teal-600 dark:from-carrigreen dark:to-teal-400 bg-clip-text text-transparent mb-1">
                          {exp.role}
                        </h4>
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <span>📅</span>
                          <span>{exp.duration}</span>
                          <span className="ml-2 px-2 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 rounded text-xs font-medium">
                            {exp.type}
                          </span>
                        </div>
                      </div>

                      {/* Achievements */}
                      <ul className="relative z-10 space-y-2 mb-6">
                        {exp.achievements.map((achievement, idx) => (
                          <li
                            key={idx}
                            className="achievement-item flex items-start gap-2 text-sm md:text-base text-gray-700 dark:text-gray-300 hover:text-marrsgreen dark:hover:text-carrigreen transition-colors duration-300 cursor-default"
                          >
                            <span className="text-marrsgreen dark:text-carrigreen mt-1 flex-shrink-0">
                              ▸
                            </span>
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Tech Stack */}
                      <div className="relative z-10 flex flex-wrap gap-2">
                        {exp.techStack.map((tech, idx) => (
                          <span
                            key={tech}
                            className="tech-badge px-3 py-1 bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium border border-gray-200 dark:border-gray-600 hover:border-marrsgreen dark:hover:border-carrigreen hover:scale-110 hover:shadow-lg transition-all duration-300 cursor-default"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Bottom accent line */}
                      <div className={`absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r ${exp.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 rounded-b-2xl shadow-lg`} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
