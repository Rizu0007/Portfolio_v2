import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { RoughNotation } from "react-rough-notation";
import { useTheme } from "next-themes";

import LinkButton from "@/components/LinkButton";
import { useSection } from "context/section";
import useOnScreen from "hooks/useOnScreen";
import useScrollActive from "hooks/useScrollActive";

const ContactSection: React.FC = () => {
  const { theme } = useTheme();

  const sectionRef = useRef<HTMLDivElement>(null);
  const isSecOnScreen = useOnScreen(sectionRef);

  const elementRef = useRef<HTMLDivElement>(null);
  const isOnScreen = useOnScreen(elementRef);

  const headingRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  // Set active link for contact section
  const contactSection = useScrollActive(sectionRef);
  const { onSectionChange } = useSection();

  useEffect(() => {
    contactSection && onSectionChange!("contact");
  }, [contactSection]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const q = gsap.utils.selector(sectionRef);

    // Clean entrance timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    // Simple fade-up animations
    tl.fromTo(
      q(".contact-wrapper"),
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
      }
    )
    .fromTo(
      headingRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
      },
      "-=0.4"
    )
    .fromTo(
      descRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
      },
      "-=0.4"
    )
    .fromTo(
      q(".contact-card"),
      { opacity: 0, y: 30, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
      },
      "-=0.3"
    )
    .fromTo(
      buttonRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
      },
      "-=0.3"
    )
    .fromTo(
      q(".social-link"),
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        stagger: 0.05,
        duration: 0.4,
        ease: "back.out(1.5)",
      },
      "-=0.2"
    );

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="section min-h-[700px] text-center relative overflow-hidden py-20"
    >
      {/* Background animated text */}
      <span
        aria-hidden="true"
        className="absolute top-10 left-0 right-0 text-center rotate-12 text-gray-100 dark:text-[#1f2e3a] text-8xl md:text-9xl scale-150 tracking-wide font-bold select-none pointer-events-none z-0 opacity-50"
      >
        LET'S CONNECT COLLABORATE
      </span>
      <span
        aria-hidden="true"
        className="absolute top-60 left-0 right-0 text-center -rotate-12 text-gray-100 dark:text-[#1f2e3a] text-8xl md:text-9xl scale-150 tracking-wide font-bold select-none pointer-events-none z-0 opacity-50"
      >
        HIRE ME GET IN TOUCH
      </span>
      <span
        aria-hidden="true"
        className="absolute bottom-20 left-0 right-0 text-center rotate-12 text-gray-100 dark:text-[#1f2e3a] text-8xl md:text-9xl scale-150 tracking-wide font-bold select-none pointer-events-none z-0 opacity-50"
      >
        BUILD SOMETHING AMAZING
      </span>

      <div className="relative z-10 max-w-5xl mx-auto px-4">
        {/* Contact Title */}
        <div className="text-center contact-wrapper mb-12">
          <RoughNotation
            type="underline"
            color={`${theme === "light" ? "rgb(0, 122, 122)" : "rgb(5 206 145)"}`}
            strokeWidth={2}
            order={1}
            show={isOnScreen}
          >
            <h2 className="text-4xl md:text-5xl inline-block font-bold bg-gradient-to-r from-marrsgreen via-teal-500 to-carrigreen dark:from-carrigreen dark:via-teal-400 dark:to-marrsgreen bg-clip-text text-transparent">
              Let's Connect
            </h2>
          </RoughNotation>

          {/* Availability Badge */}
          <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-green-50 dark:bg-green-900/30 border-2 border-green-200 dark:border-green-700 rounded-full">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span className="text-sm font-semibold text-green-700 dark:text-green-400">
              Available for opportunities
            </span>
          </div>
        </div>

        {/* Main Heading & Description */}
        <div className="mb-16">
          <h3
            className="font-bold text-3xl mb-4 md:text-4xl lg:text-5xl"
            ref={headingRef}
          >
            Let's build something amazing together!
          </h3>
          <p
            className="mb-8 mx-auto max-w-2xl text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed"
            ref={descRef}
          >
            I'm driven by my passion for coding and hunger for new challenges. Whether you have opportunities for collaboration or want to create something extraordinary, I'd love to hear from you!
          </p>
        </div>

        {/* Contact Cards Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {/* Email Card */}
          <a
            href={`mailto:${process.env.NEXT_PUBLIC_EMAIL}`}
            className="contact-card group relative cursor-pointer rounded-2xl bg-white dark:bg-[#1B2731] shadow-lg hover:shadow-xl border border-gray-200 dark:border-gray-700 p-6 transition-all duration-300 hover:border-blue-500 dark:hover:border-blue-400"
          >
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-md transition-transform duration-300 group-hover:scale-110">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="text-center">
                <h4 className="font-bold text-lg mb-1 text-gray-900 dark:text-white">Email</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Drop me a line</p>
              </div>
            </div>
          </a>

          {/* LinkedIn Card */}
          <a
            href="https://www.linkedin.com/in/rizwan-ahmad-87135a262/"
            target="_blank"
            rel="noreferrer"
            className="contact-card group relative cursor-pointer rounded-2xl bg-white dark:bg-[#1B2731] shadow-lg hover:shadow-xl border border-gray-200 dark:border-gray-700 p-6 transition-all duration-300 hover:border-blue-600 dark:hover:border-blue-500"
          >
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center shadow-md transition-transform duration-300 group-hover:scale-110">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </div>
              <div className="text-center">
                <h4 className="font-bold text-lg mb-1 text-gray-900 dark:text-white">LinkedIn</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Let's connect</p>
              </div>
            </div>
          </a>

          {/* GitHub Card */}
          <a
            href="https://github.com/Rizu0007"
            target="_blank"
            rel="noreferrer"
            className="contact-card group relative cursor-pointer rounded-2xl bg-white dark:bg-[#1B2731] shadow-lg hover:shadow-xl border border-gray-200 dark:border-gray-700 p-6 transition-all duration-300 hover:border-gray-900 dark:hover:border-gray-300"
          >
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-800 to-gray-600 flex items-center justify-center shadow-md transition-transform duration-300 group-hover:scale-110">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.026 2c-5.509 0-9.974 4.465-9.974 9.974 0 4.406 2.857 8.145 6.821 9.465.499.09.679-.217.679-.481 0-.237-.008-.865-.011-1.696-2.775.602-3.361-1.338-3.361-1.338-.452-1.152-1.107-1.459-1.107-1.459-.905-.619.069-.605.069-.605 1.002.07 1.527 1.028 1.527 1.028.89 1.524 2.336 1.084 2.902.829.091-.645.351-1.085.635-1.334-2.214-.251-4.542-1.107-4.542-4.93 0-1.087.389-1.979 1.024-2.675-.101-.253-.446-1.268.099-2.64 0 0 .837-.269 2.742 1.021a9.582 9.582 0 0 1 2.496-.336 9.554 9.554 0 0 1 2.496.336c1.906-1.291 2.742-1.021 2.742-1.021.545 1.372.203 2.387.099 2.64.64.696 1.024 1.587 1.024 2.675 0 3.833-2.33 4.675-4.552 4.922.355.308.675.916.675 1.846 0 1.334-.012 2.41-.012 2.737 0 .267.178.577.687.479C19.146 20.115 22 16.379 22 11.974 22 6.465 17.535 2 12.026 2z"/>
                </svg>
              </div>
              <div className="text-center">
                <h4 className="font-bold text-lg mb-1 text-gray-900 dark:text-white">GitHub</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Check my work</p>
              </div>
            </div>
          </a>
        </div>

        {/* CTA Button */}
        <div ref={buttonRef} className="mb-12">
          <LinkButton href={`mailto:${process.env.NEXT_PUBLIC_EMAIL}`}>
            <span className="relative z-10 flex items-center gap-2 px-4 py-1">
              <span className="text-lg font-bold">Let's Talk</span>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          </LinkButton>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-4">
          {[
            { name: "Twitter", icon: "M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z", href: "https://twitter.com", color: "from-blue-400 to-blue-600" },
            { name: "Discord", icon: "M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z", href: "#", color: "from-indigo-500 to-purple-600" },
            { name: "Instagram", icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z", href: "#", color: "from-pink-500 to-rose-600" },
          ].map((social, idx) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              className="social-link w-12 h-12 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center border-2 border-gray-200 dark:border-gray-600 hover:scale-110 hover:shadow-lg transition-all duration-300 group/social"
              title={social.name}
            >
              <svg className="w-5 h-5 fill-gray-600 dark:fill-gray-400 group-hover/social:fill-gray-900 dark:group-hover/social:fill-white transition-colors duration-300" viewBox="0 0 24 24">
                <path d={social.icon} />
              </svg>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
