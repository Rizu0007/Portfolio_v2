import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

import satNaing from "../public/satnaing-illustration.webp";
import laptop from "../public/laptop-illustration.webp";

const HeroSection: React.FC = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"quick" | "form">("quick");

  const sectionRef = useRef<HTMLDivElement>(null);
  const q = gsap.utils.selector(sectionRef);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Check for reduced motion and mobile
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 768;

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
    q(".description").forEach((desc: HTMLElement) => {
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

    // Tech badges with individual animations - slower on mobile
    const badges = q(".tech-badge");
    tl.fromTo(
      badges,
      { opacity: 0, scale: 0, rotation: isMobile ? -90 : -180 },
      {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: isMobile ? 0.8 : 0.5,
        stagger: isMobile ? 0.2 : 0.1,
        ease: "back.out(2)"
      },
      "-=0.5"
    );

    // Badge floating animation - slower and subtler on mobile
    if (!prefersReducedMotion) {
      badges.forEach((badge: HTMLElement, i: number) => {
        gsap.to(badge, {
          y: isMobile ? "+=3" : "+=5",
          duration: isMobile ? 2.5 + i * 0.3 : 1.5 + i * 0.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.2,
        });
      });
    }

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

    // Illustration entrance with layers - slower on mobile
    tl.fromTo(
      q(".image-animation"),
      { opacity: 0, x: isMobile ? 80 : 150, scale: 0.3, rotationY: isMobile ? 20 : 45 },
      {
        opacity: 1,
        x: 0,
        scale: 1,
        rotationY: 0,
        duration: isMobile ? 1.8 : 1.4,
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

    // Continuous floating for illustration with depth - slower on mobile
    if (!prefersReducedMotion) {
      gsap.to(q(".image-animation"), {
        y: isMobile ? "+=12" : "+=25",
        duration: isMobile ? 5 : 3.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Laptop deeper parallax - slower on mobile
      gsap.to(q(".laptop"), {
        y: isMobile ? "+=8" : "+=15",
        x: isMobile ? "+=4" : "+=8",
        rotation: isMobile ? "+=1" : "+=3",
        duration: isMobile ? 4 : 2.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }

    // Cursor spotlight effect - desktop only
    const section = sectionRef.current;
    if (section && !isMobile) {
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

    // Enhanced magnetic effect for buttons with glow - desktop only
    if (!isMobile) {
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
    }

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
    <>
      <section
        ref={sectionRef}
        className="relative mt-16 sm:mt-8 pt-8 lg:pt-0 px-4 sm:px-8 md:px-20 max-w-5xl sm:pb-24 min-h-[769px] mx-auto sm:flex sm:flex-col sm:justify-center sm:items-center lg:flex-row-reverse overflow-hidden"
      >
        {/* Background animated text */}
        <span
          aria-hidden="true"
          className="bg-text absolute -top-36 rotate-12 text-[#1f2e3a] text-9xl scale-150 tracking-wide font-bold select-none pointer-events-none text-center z-0"
        >
          AI DEVELOPER FULL-STACK BLOCKCHAIN MERN RAG SYSTEMS
        </span>

        {/* Floating illustration with glow */}
        <div className="image-animation z-10 select-none mt-0 xs:mt-6 sm:mt-14 lg:mt-0 px-0 mx-auto lg:p-0 lg:basis-1/3 relative">
          {/* Glow effect behind illustration */}
          <div className="absolute inset-0 bg-gradient-to-r from-carrigreen/20 via-teal-400/20 to-marrsgreen/20 blur-3xl rounded-full scale-110 animate-pulse" />

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
          <span className="greeting text-base lg:text-lg font-medium text-carrigreen block mb-2">
            <span className="wave-emoji inline-block">👋</span> Hi, I'm
          </span>

          {/* Name with 3D effect */}
          <div className="overflow-hidden mb-2">
            <h1 className="name text-4xl md:text-5xl lg:text-7xl font-bold bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
              RIZWAN ALI
            </h1>
          </div>

          {/* Title with gradient */}
          <div className="overflow-hidden mb-2">
            <h2 className="title text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-carrigreen via-teal-400 to-marrsgreen bg-clip-text text-transparent">
              <span className="title-word inline-block">Innovative</span>{" "}
              <span className="title-word inline-block">Full</span>{" "}
              <span className="title-word inline-block">Stack</span>{" "}
              <span className="title-word inline-block">Developer</span>
            </h2>
          </div>

          {/* Description with highlights */}
          <div className=" space-y-4">
            <p className="description text-base md:text-lg text-gray-300 leading-relaxed">
              <span className="font-semibold text-carrigreen">2+ years of experience</span> in designing, developing, and optimizing scalable web applications with expertise in{" "}
              <span className="font-semibold text-amber-500">MERN stack</span> and{" "}
              <span className="font-semibold text-purple-400">AI/ML integrations</span>.
            </p>

            <p className="description text-base md:text-lg text-gray-300 leading-relaxed">
              Passionate about building impactful solutions with{" "}
              <span className=" tech-badge inline-block px-2 py-1 bg-gradient-to-r from-yellow-900/30 to-amber-900/30 rounded text-sm font-medium">
                RAG systems
              </span>{" "}
              <span className="tech-badge inline-block px-2 py-1 bg-gradient-to-r from-green-900/30 to-emerald-900/30 rounded text-sm font-medium">
                LangChain
              </span>{" "}
              <span className="tech-badge inline-block px-2 py-1 bg-gradient-to-r from-blue-900/30 to-cyan-900/30 rounded text-sm font-medium">
                MCP
              </span>
            </p>
          </div>

          {/* Let's Connect Button and CV */}
          <div className="flex gap-4 mt-8 flex-wrap items-center">
            <button
              onClick={() => setIsContactOpen(true)}
              className="hero-button magnetic-button group relative flex items-center gap-3 px-6 py-3 bg-carddark/80 backdrop-blur-sm border border-carrigreen/30 text-textlight font-medium rounded-full overflow-hidden transform-gpu transition-all duration-300 hover:border-carrigreen hover:bg-carrigreen/10 hover:scale-105 active:scale-95"
            >
              <span className="relative z-10 text-base text-carrigreen">Let's Connect</span>
              <span className="relative z-10 w-7 h-7 flex items-center justify-center bg-carrigreen text-bgdark rounded-full group-hover:rotate-45 transition-transform duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12,5 19,12 12,19" />
                </svg>
              </span>
            </button>

            <a
              href="/RizwanCV.pdf"
              download="RizwanAli-CV.pdf"
              className="hero-button flex items-center gap-2 text-textlight/70 hover:text-carrigreen transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-textlight/50">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7,10 12,15 17,10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span className="text-sm">Download CV</span>
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <a
          href="#whoami"
          className="scroll-indicator group absolute link-outline animate-bounce hidden md:bottom-14 lg:bottom-16 left-1/2 transform -translate-x-1/2 md:flex items-center flex-col opacity-70 hover:opacity-100 transition-opacity"
        >
          <span className="text-sm group-hover:text-carrigreen transition-colors">
            Scroll
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            className="fill-bglight group-hover:fill-carrigreen transition-colors"
          >
            <path d="M11.975 22H12c3.859 0 7-3.14 7-7V9c0-3.841-3.127-6.974-6.981-7h-.06C8.119 2.022 5 5.157 5 9v6c0 3.86 3.129 7 6.975 7zM7 9a5.007 5.007 0 0 1 4.985-5C14.75 4.006 17 6.249 17 9v6c0 2.757-2.243 5-5 5h-.025C9.186 20 7 17.804 7 15V9z"></path>
            <path d="M11 6h2v6h-2z"></path>
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            className="fill-bglight group-hover:fill-carrigreen transition-colors"
          >
            <path d="M16.293 9.293 12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z"></path>
          </svg>
        </a>
      </section>

      {/* Contact Modal */}
      {isContactOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fadeIn"
            onClick={() => setIsContactOpen(false)}
          />

          {/* Modal */}
          <div className="relative w-full max-w-md bg-carddark/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 overflow-hidden animate-modalSlideUp">
            {/* Handle bar */}
            <div className="flex justify-center pt-4">
              <div className="w-12 h-1 bg-white/20 rounded-full" />
            </div>

            {/* Social Links */}
            <div className="flex justify-center gap-4 py-4">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-textlight/60 hover:text-textlight transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-textlight/60 hover:text-textlight transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-textlight/60 hover:text-textlight transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
            </div>

            {/* Tabs */}
            <div className="flex px-4">
              <button
                onClick={() => setActiveTab("quick")}
                className={`flex-1 py-3 text-sm font-medium transition-colors ${
                  activeTab === "quick"
                    ? "text-textlight border-b-2 border-textlight"
                    : "text-textlight/50 border-b border-white/10"
                }`}
              >
                Quick connect
              </button>
              <button
                onClick={() => setActiveTab("form")}
                className={`flex-1 py-3 text-sm font-medium transition-colors ${
                  activeTab === "form"
                    ? "text-textlight border-b-2 border-textlight"
                    : "text-textlight/50 border-b border-white/10"
                }`}
              >
                Fill a form
              </button>
            </div>

            {/* Content */}
            <div className="p-4">
              {activeTab === "quick" ? (
                <div className="grid grid-cols-2 gap-3">
                  {/* Email Card */}
                  <a
                    href="mailto:rizwanali@example.com"
                    className="block p-4 bg-bgdark/50 border border-white/10 rounded-xl hover:border-blue-500/50 transition-colors"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-400">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                      <span className="text-textlight font-medium">Email</span>
                    </div>
                    <p className="text-sm text-textlight/80 mb-1">rizwanali@example.com</p>
                    <p className="text-xs text-textlight/50">Send me an email directly</p>
                  </a>

                  {/* Book a Call Card */}
                  <a
                    href="#contact"
                    onClick={() => setIsContactOpen(false)}
                    className="block p-4 bg-bgdark/50 border border-white/10 rounded-xl hover:border-purple-500/50 transition-colors"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-purple-400">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                      <span className="text-textlight font-medium">Book a Call</span>
                    </div>
                    <p className="text-sm text-textlight/80 mb-1">Schedule a time slot</p>
                    <p className="text-xs text-textlight/50">Book a call on my calendar</p>
                  </a>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-textlight/60 mb-4">Contact form coming soon!</p>
                  <a
                    href="#contact"
                    onClick={() => setIsContactOpen(false)}
                    className="inline-block px-6 py-2 bg-carrigreen/20 text-carrigreen rounded-lg hover:bg-carrigreen/30 transition-colors"
                  >
                    Go to Contact Section
                  </a>
                </div>
              )}
            </div>

            {/* Availability Status */}
            <div className="mx-4 mb-4 py-3 px-4 bg-carrigreen/10 border border-carrigreen/30 rounded-xl flex items-center justify-center gap-2">
              <span className="w-2 h-2 bg-carrigreen rounded-full animate-pulse" />
              <span className="text-sm text-carrigreen font-medium">
                Currently available for new opportunities
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HeroSection;
