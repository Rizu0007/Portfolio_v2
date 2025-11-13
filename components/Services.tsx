import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useTheme } from "next-themes";

const Myskills = () => {
  const { theme } = useTheme();
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

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
    // Card scales in with bounce
    .fromTo(
      cardRef.current,
      { opacity: 0, scale: 0.8, rotateY: -15 },
      {
        opacity: 1,
        scale: 1,
        rotateY: 0,
        duration: 0.8,
        ease: "back.out(1.7)",
      },
      "-=0.3"
    )
    // Skills list stagger from bottom
    .fromTo(
      q("li"),
      { opacity: 0, y: 20, x: -20 },
      {
        opacity: 1,
        y: 0,
        x: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: "power2.out",
      },
      "-=0.4"
    );

    // Hover effect with GSAP (replacing Framer Motion)
    const card = cardRef.current;
    if (card) {
      const handleMouseEnter = () => {
        gsap.to(card, {
          scale: 1.05,
          y: -10,
          boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
          duration: 0.3,
          ease: "power2.out",
        });
      };

      const handleMouseLeave = () => {
        gsap.to(card, {
          scale: 1,
          y: 0,
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
          duration: 0.3,
          ease: "power2.out",
        });
      };

      card.addEventListener("mouseenter", handleMouseEnter);
      card.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        card.removeEventListener("mouseenter", handleMouseEnter);
        card.removeEventListener("mouseleave", handleMouseLeave);
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    }
  }, []);

  return (
    <div
      ref={sectionRef}
      className="w-full md:w-5/5 m-auto py-50 flex flex-col md:flex-row justify-between items-center p-5"
    >
      <div className="w-full md:w-1/3 p-5 space-y-50 mx-10">
        <h1
          ref={headingRef}
          className="text-5xl md:text-6xl font-bold mr-10"
        >
          My Development Skills
        </h1>
        <p ref={descRef} className="text-gray-500">
          I value simple content structure, clean design patterns, and
          thoughtful interactions. I like to code things from scratch, and
          enjoy bringing ideas to life in the browser. I genuinely care about
          people, and love helping fellow designers work on their craft.
        </p>
      </div>

      <div className="w-8/12 bg-neutral-200 dark:bg-[#1B2731]">
        <div
          ref={cardRef}
          className="flex flex-col items-center bg-white dark:bg-[#1B2731] rounded p-2 space-y-2 drop-shadow-xl cursor-pointer transform-gpu"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className="bg-gray-800 p-2 rounded-full"></div>
          <p className="section-heading">Mern stack Skills</p>
          <ul className="space-y-4 text-left text-gray-500 dark:text-gray-400">
            <li className="flex items-center space-x-3">
              <svg
                className="flex-shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 16 12"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5.917 5.724 10.5 15 1.5"
                />
              </svg>
              <span className="text-bold text-gray-900 dark:text-white">
                React.js
              </span>
            </li>
            <li className="flex items-center space-x-3">
              <svg
                className="flex-shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 16 12"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5.917 5.724 10.5 15 1.5"
                />
              </svg>
              <span className="text-bold text-gray-900 dark:text-white">
                Next.js
              </span>
            </li>
            <li className="flex items-center space-x-3">
              <svg
                className="flex-shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 16 12"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5.917 5.724 10.5 15 1.5"
                />
              </svg>
              <span className="font-semibold text-gray-900 dark:text-white">
                Node
              </span>
            </li>
            <li className="flex items-center space-x-3">
              <svg
                className="flex-shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 16 12"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5.917 5.724 10.5 15 1.5"
                />
              </svg>
              <span className="font-semibold text-gray-900 dark:text-white">
                MongoDB
              </span>
            </li>
            <li className="flex items-center space-x-3">
              <svg
                className="flex-shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 16 12"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5.917 5.724 10.5 15 1.5"
                />
              </svg>
              <span className="font-semibold text-gray-900 dark:text-white">
                Redux
              </span>
            </li>
            <li className="flex items-center space-x-3">
              <svg
                className="flex-shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 16 12"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5.917 5.724 10.5 15 1.5"
                />
              </svg>
              <span className="font-semibold text-gray-900 dark:text-white">
                Tailwind CSS
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Myskills;
