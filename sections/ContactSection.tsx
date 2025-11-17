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
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
      }
    )
    .fromTo(
      headingRef.current,
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
      descRef.current,
      { opacity: 0, y: 15 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
      },
      "-=0.3"
    )
    .fromTo(
      q(".contact-card"),
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: "power2.out",
      },
      "-=0.2"
    )
    .fromTo(
      buttonRef.current,
      { opacity: 0, y: 15 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
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
      className="section min-h-[700px] text-center py-20"
    >
      <div className="max-w-4xl mx-auto px-4">
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
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* Email Card */}
          <a
            href={`mailto:${process.env.NEXT_PUBLIC_EMAIL}`}
            className="contact-card group cursor-pointer rounded-xl bg-white dark:bg-[#1B2731] shadow-md hover:shadow-xl border border-gray-200 dark:border-gray-700 p-8 transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex flex-col items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
            className="contact-card group cursor-pointer rounded-xl bg-white dark:bg-[#1B2731] shadow-md hover:shadow-xl border border-gray-200 dark:border-gray-700 p-8 transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex flex-col items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
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
            className="contact-card group cursor-pointer rounded-xl bg-white dark:bg-[#1B2731] shadow-md hover:shadow-xl border border-gray-200 dark:border-gray-700 p-8 transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex flex-col items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gray-800 to-gray-600 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
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
        <div ref={buttonRef}>
          <LinkButton href={`mailto:${process.env.NEXT_PUBLIC_EMAIL}`}>
            <span className="flex items-center gap-2 px-6 py-2">
              <span className="text-lg font-bold">Let's Talk</span>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          </LinkButton>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
