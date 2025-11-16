import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import satNaing from "../public/satnaing-illustration.webp";
import laptop from "../public/laptop-illustration.webp";

const HeroSection: React.FC = () => {
  const onButtonClick = () => {
    fetch("RizwanCV.pdf").then((response) => {
      response.blob().then((blob) => {
        const fileURL = window.URL.createObjectURL(blob);
        let alink = document.createElement("a");
        alink.href = fileURL;
        alink.download = "RizwanAli-CV.pdf";
        alink.click();
      });
    });
  };

  const sectionRef = useRef<HTMLDivElement>(null);
  const q = gsap.utils.selector(sectionRef);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Main entrance timeline
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Greeting with wave emoji animation
    tl.fromTo(
      q(".greeting"),
      { opacity: 0, x: -30, scale: 0.9 },
      { opacity: 1, x: 0, scale: 1, duration: 0.7, ease: "back.out(1.7)" }
    );

    // Wave emoji rotation
    gsap.to(q(".wave-emoji"), {
      rotation: 20,
      duration: 0.5,
      repeat: 5,
      yoyo: true,
      ease: "sine.inOut",
      delay: 0.5,
    });

    // Name reveal with 3D rotation and character stagger
    tl.fromTo(
      q(".name"),
      {
        opacity: 0,
        y: 100,
        rotationX: -90,
        transformPerspective: 1000,
      },
      {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 1.2,
        ease: "expo.out"
      },
      "-=0.4"
    );

    // Add shimmer effect to name after reveal
    gsap.to(q(".name"), {
      textShadow: "0 0 20px rgba(0, 122, 122, 0.5)",
      duration: 1,
      repeat: 1,
      yoyo: true,
      delay: 1.5,
    });

    // Title with word-by-word reveal
    const titleWords = q(".title-word");
    tl.fromTo(
      titleWords,
      { opacity: 0, y: 50, rotationX: -45 },
      {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.5)"
      },
      "-=0.7"
    );

    // Description paragraphs with highlight effect
    q(".description").forEach((desc: HTMLElement, i: number) => {
      tl.fromTo(
        desc,
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          ease: "power2.out"
        },
        `-=0.5`
      );
    });

    // Tech badges with individual animations
    const badges = q(".tech-badge");
    tl.fromTo(
      badges,
      { opacity: 0, scale: 0, rotation: -180 },
      {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "back.out(2)"
      },
      "-=0.5"
    );

    // Badge floating animation
    badges.forEach((badge: HTMLElement, i: number) => {
      gsap.to(badge, {
        y: "+=5",
        duration: 1.5 + i * 0.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: i * 0.2,
      });
    });

    // Buttons with ripple effect
    tl.fromTo(
      q(".hero-button"),
      { opacity: 0, scale: 0, rotation: -10 },
      {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: "elastic.out(1, 0.7)"
      },
      "-=0.4"
    );

    // Illustration entrance with layers
    tl.fromTo(
      q(".image-animation"),
      { opacity: 0, x: 150, scale: 0.3, rotationY: 45 },
      {
        opacity: 1,
        x: 0,
        scale: 1,
        rotationY: 0,
        duration: 1.4,
        ease: "expo.out"
      },
      "-=1.2"
    );

    // Background text parallax with glow
    gsap.to(q(".bg-text"), {
      scrollTrigger: {
        trigger: q(".bg-text"),
        scrub: 1,
      },
      y: 350,
      opacity: 0.7,
    });

    // Continuous floating for illustration with depth
    gsap.to(q(".image-animation"), {
      y: "+=25",
      duration: 3.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // Laptop deeper parallax
    gsap.to(q(".laptop"), {
      y: "+=15",
      x: "+=8",
      rotation: "+=3",
      duration: 2.8,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // Cursor spotlight effect
    const section = sectionRef.current;
    if (section) {
      section.addEventListener("mousemove", (e: MouseEvent) => {
        const spotlight = q(".spotlight")[0] as HTMLElement;
        if (spotlight) {
          const rect = section.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;

          gsap.to(spotlight, {
            background: `radial-gradient(600px circle at ${x}px ${y}px, rgba(0, 122, 122, 0.08), transparent 40%)`,
            duration: 0.3,
          });
        }
      });
    }

    // Enhanced magnetic effect for buttons with glow
    const buttons = q(".magnetic-button");
    buttons.forEach((button: HTMLElement) => {
      button.addEventListener("mouseenter", () => {
        gsap.to(button, {
          scale: 1.05,
          duration: 0.3,
          ease: "back.out(1.7)",
        });
      });

      button.addEventListener("mousemove", (e: MouseEvent) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(button, {
          x: x * 0.4,
          y: y * 0.4,
          duration: 0.3,
          ease: "power2.out",
        });
      });

      button.addEventListener("mouseleave", () => {
        gsap.to(button, {
          x: 0,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: "elastic.out(1, 0.5)",
        });
      });
    });

    // Scroll indicator pulse
    const scrollIndicator = q(".scroll-indicator")[0];
    if (scrollIndicator) {
      gsap.to(scrollIndicator, {
        opacity: 0.4,
        y: 10,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [q]);

  return (
    <section
      ref={sectionRef}
      className="relative mt-16 sm:mt-8 pt-8 lg:pt-0 px-4 sm:px-8 md:px-20 max-w-5xl sm:pb-24 min-h-[769px] mx-auto sm:flex sm:flex-col sm:justify-center sm:items-center lg:flex-row-reverse overflow-hidden"
    >
      {/* Background animated text */}
      <span
        aria-hidden="true"
        className="bg-text absolute -top-36 rotate-12 text-gray-100 dark:text-[#1f2e3a] text-9xl scale-150 tracking-wide font-bold select-none pointer-events-none text-center z-0"
      >
        AI DEVELOPER FULL-STACK BLOCKCHAIN MERN RAG SYSTEMS
      </span>

      {/* Floating illustration with glow */}
      <div className="image-animation z-10 select-none mt-0 xs:mt-6 sm:mt-14 lg:mt-0 px-0 mx-auto lg:p-0 lg:basis-1/3 relative">
        {/* Glow effect behind illustration */}
        <div className="absolute inset-0 bg-gradient-to-r from-marrsgreen/20 via-teal-500/20 to-carrigreen/20 dark:from-carrigreen/20 dark:via-teal-400/20 dark:to-marrsgreen/20 blur-3xl rounded-full scale-110 animate-pulse" />

        <div className="relative w-72 md:w-80 h-80 flex items-center mx-auto">
          <div className="absolute pointer-events-none scale-90 xs:scale-95 mx-auto">
            <Image
              src={satNaing}
              width={1177}
              height={1374}
              priority
              id="character-illustration"
              aria-label="Rizwan Ali character illustration"
              alt="Rizwan Ali character illustration"
            />
          </div>
          <div className="laptop absolute top-14 sm:top-16 left-0 scale-[.41] xs:scale-[.45] pointer-events-none">
            <Image
              src={laptop}
              width={559}
              height={386}
              aria-hidden="true"
              alt="Laptop illustration"
            />
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:basis-2/3 z-10 relative">
        {/* Cursor spotlight effect */}
        <div className="spotlight absolute inset-0 pointer-events-none rounded-3xl" />

        {/* Greeting */}
        <span className="greeting text-base lg:text-lg font-medium text-marrsgreen dark:text-carrigreen block mb-2">
          <span className="wave-emoji inline-block">👋</span> Hi, I'm
        </span>

        {/* Name with 3D effect */}
        <div className="overflow-hidden mb-2">
          <h1 className="name text-4xl md:text-5xl lg:text-7xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-100 dark:to-white bg-clip-text text-transparent">
            RIZWAN ALI
          </h1>
        </div>

        {/* Title with gradient */}
        <div className="overflow-hidden mb-4">
          <h2 className="title text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-marrsgreen via-teal-600 to-carrigreen dark:from-carrigreen dark:via-teal-400 dark:to-marrsgreen bg-clip-text text-transparent">
            <span className="title-word inline-block">Innovative</span>{" "}
            <span className="title-word inline-block">Full</span>{" "}
            <span className="title-word inline-block">Stack</span>{" "}
            <span className="title-word inline-block">Developer</span>
          </h2>
        </div>

        {/* Description with highlights */}
        <div className="mt-6 space-y-4">
          <p className="description text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            <span className="font-semibold text-marrsgreen dark:text-carrigreen">2+ years of experience</span> in designing, developing, and optimizing scalable web applications with expertise in{" "}
            <span className="font-semibold text-amber-600 dark:text-amber-500">MERN stack</span>,{" "}
            <span className="font-semibold text-purple-600 dark:text-purple-400">AI/ML integrations</span>, and{" "}
            <span className="font-semibold text-blue-600 dark:text-blue-400">blockchain technology</span>.
          </p>

          <p className="description text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            Passionate about building impactful solutions with{" "}
            <span className="tech-badge inline-block px-2 py-1 bg-gradient-to-r from-yellow-100 to-amber-100 dark:from-yellow-900/30 dark:to-amber-900/30 rounded text-sm font-medium">
              RAG systems
            </span>{" "}
            <span className="tech-badge inline-block px-2 py-1 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded text-sm font-medium">
              LangChain
            </span>{" "}
            <span className="tech-badge inline-block px-2 py-1 bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 rounded text-sm font-medium">
              MCP
            </span>
          </p>
        </div>

        {/* Buttons with magnetic effect */}
        <div className="flex gap-4 mt-8 flex-wrap">
          <button
            className="hero-button magnetic-button group relative px-8 py-4 bg-gradient-to-r from-marrsgreen to-teal-600 dark:from-carrigreen dark:to-teal-500 text-white font-bold rounded-2xl overflow-hidden transform-gpu transition-all duration-300 hover:shadow-2xl hover:shadow-marrsgreen/50 dark:hover:shadow-carrigreen/50"
            onClick={onButtonClick}
          >
            <span className="relative z-10 flex items-center gap-2">
              <FontAwesomeIcon icon={faDownload} className="w-5 h-5" />
              Download CV
            </span>
            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
          </button>

          <a
            href="#whoami"
            className="hero-button magnetic-button group relative px-8 py-4 bg-white dark:bg-gray-800 border-2 border-marrsgreen dark:border-carrigreen text-marrsgreen dark:text-carrigreen font-bold rounded-2xl transform-gpu transition-all duration-300 hover:bg-marrsgreen hover:text-white dark:hover:bg-carrigreen dark:hover:text-gray-900"
          >
            <span className="relative z-10">Contact Me!</span>
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#whoami"
        className="scroll-indicator group absolute link-outline animate-bounce hidden md:bottom-14 lg:bottom-16 left-1/2 transform -translate-x-1/2 md:flex items-center flex-col opacity-70 hover:opacity-100 transition-opacity"
      >
        <span className="text-sm group-hover:text-marrsgreen dark:group-hover:text-carrigreen transition-colors">
          Scroll
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          className="dark:fill-bglight group-hover:fill-marrsgreen dark:group-hover:fill-carrigreen transition-colors"
        >
          <path d="M11.975 22H12c3.859 0 7-3.14 7-7V9c0-3.841-3.127-6.974-6.981-7h-.06C8.119 2.022 5 5.157 5 9v6c0 3.86 3.129 7 6.975 7zM7 9a5.007 5.007 0 0 1 4.985-5C14.75 4.006 17 6.249 17 9v6c0 2.757-2.243 5-5 5h-.025C9.186 20 7 17.804 7 15V9z"></path>
          <path d="M11 6h2v6h-2z"></path>
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          className="dark:fill-bglight group-hover:fill-marrsgreen dark:group-hover:fill-carrigreen transition-colors"
        >
          <path d="M16.293 9.293 12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z"></path>
        </svg>
      </a>
    </section>
  );
};

export default HeroSection;
