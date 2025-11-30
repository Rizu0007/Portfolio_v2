import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

type Props = {
  index: number;
  project: {
    title: string;
    image: JSX.Element;
    desc: string;
    tags: string[];
    liveUrl: string;
    codeUrl: string;
    bgColor: string;
  };
};

const ProjectCard: React.FC<Props> = ({ index, project }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const even = index % 2 === 0 ? true : false;

  // Truncate description to first 150 characters
  const shouldTruncate = project.desc.length > 150;
  const displayDesc = isExpanded || !shouldTruncate
    ? project.desc
    : project.desc.substring(0, 150) + "...";

  // Clean, consistent reveal animation
  useEffect(() => {
    const q = gsap.utils.selector(sectionRef);

    gsap.registerPlugin(ScrollTrigger);

    // Smooth entrance with subtle stagger
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    // Card fades up with subtle scale
    tl.fromTo(
      cardRef.current,
      {
        opacity: 0,
        y: 50,
        scale: 0.95,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: "power3.out",
      }
    );

    // Image fades in smoothly
    tl.fromTo(
      q(".project-image"),
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
      },
      "-=0.4"
    );

    // Content appears with subtle slide
    tl.fromTo(
      q(".project-content"),
      {
        opacity: 0,
        y: 15,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
      },
      "-=0.3"
    );

    // Tags pop in with stagger
    tl.fromTo(
      q(".project-tags"),
      { opacity: 0, scale: 0.9 },
      {
        opacity: 1,
        scale: 1,
        stagger: 0.04,
        duration: 0.3,
        ease: "back.out(1.4)",
      },
      "-=0.2"
    );

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === sectionRef.current) {
          trigger.kill();
        }
      });
    };
  }, [index]);

  // Enhanced 3D hover effects with tilt, glow, and magnetic pull
  useEffect(() => {
    const card = cardRef.current;
    const image = imageRef.current;

    if (!card || !image) return;

    const handleMouseEnter = () => {
      // Lift card with subtle scale and depth
      gsap.to(card, {
        y: -16,
        scale: 1.03,
        z: 40,
        duration: 0.5,
        ease: "power2.out",
      });

      // Zoom image
      gsap.to(image, {
        scale: 1.1,
        duration: 0.7,
        ease: "power2.out",
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Calculate rotation based on cursor position
      const rotateX = ((y - centerY) / centerY) * -10;
      const rotateY = ((x - centerX) / centerX) * 10;

      // Apply 3D tilt with perspective
      gsap.to(card, {
        rotationX: rotateX,
        rotationY: rotateY,
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
          opacity: 0.2,
          duration: 0.3,
        });
      }
    };

    const handleMouseLeave = () => {
      // Return to original state with elastic ease
      gsap.to(card, {
        y: 0,
        scale: 1,
        rotationX: 0,
        rotationY: 0,
        z: 0,
        duration: 0.7,
        ease: "elastic.out(1, 0.5)",
      });

      gsap.to(image, {
        scale: 1,
        duration: 0.6,
        ease: "power2.out",
      });

      // Hide glow
      const glow = card.querySelector(".card-glow") as HTMLElement;
      if (glow) {
        gsap.to(glow, {
          x: 0,
          y: 0,
          opacity: 0,
          duration: 0.5,
        });
      }
    };

    card.addEventListener("mouseenter", handleMouseEnter);
    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mouseenter", handleMouseEnter);
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div ref={sectionRef} className="md:basis-1/2 md:px-8 py-2 md:py-4">
      <div
        ref={cardRef}
        className="project-card group relative cursor-pointer rounded-2xl overflow-hidden bg-[#1B2731] shadow-lg hover:shadow-2xl transition-shadow duration-400 border border-gray-700"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Cursor-following glow effect */}
        <div className={`card-glow absolute inset-0 bg-gradient-to-br ${project.bgColor.replace('bg-', 'from-')} via-purple-500 to-pink-500 opacity-0 rounded-2xl blur-2xl pointer-events-none`} />

        {/* Animated gradient border */}
        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${project.bgColor.replace('bg-', 'from-')} via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-sm`} />

        <div className="relative overflow-hidden z-10">
          <div
            ref={imageRef}
            className={`project-image ${project.bgColor} relative aspect-[16/9] overflow-hidden`}
          >
            {/* Enhanced image wrapper with clarity effects */}
            <div className="absolute inset-0 brightness-110 contrast-110 saturate-110">
              {project.image}
            </div>

            {/* Multi-layer overlay for depth and clarity */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent pointer-events-none" />

            {/* Subtle vignette effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/20 pointer-events-none" />

            {/* Shimmer effect on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none overflow-hidden">
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
            </div>

            {/* Border glow effect */}
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none border-2 border-white/30`} />
          </div>

          {/* Gradient accent line with pulse animation */}
          <div className={`h-1 bg-gradient-to-r ${project.bgColor.replace('bg-', 'from-')} to-purple-500 shadow-lg group-hover:shadow-2xl transition-shadow duration-300`} />
        </div>
        <div className="project-content overflow-hidden p-4 relative z-20">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-carrigreen text-lg font-bold">
              {project.title}
            </h3>
            <div className="flex items-center gap-2">
              {/* Show GitHub button only if codeUrl is not '#' */}
              {project.codeUrl !== "#" && (
                <a
                  href={project.codeUrl}
                  title={`See '${project.title}' on Github`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center border-2 border-gray-600 hover:border-carrigreen transition-all duration-300 hover:scale-125 hover:shadow-lg hover:shadow-carrigreen/50 hover:-rotate-12 group/icon transform-gpu"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    className="fill-gray-300 group-hover/icon:fill-white transition-colors duration-300"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12.026 2c-5.509 0-9.974 4.465-9.974 9.974 0 4.406 2.857 8.145 6.821 9.465.499.09.679-.217.679-.481 0-.237-.008-.865-.011-1.696-2.775.602-3.361-1.338-3.361-1.338-.452-1.152-1.107-1.459-1.107-1.459-.905-.619.069-.605.069-.605 1.002.07 1.527 1.028 1.527 1.028.89 1.524 2.336 1.084 2.902.829.091-.645.351-1.085.635-1.334-2.214-.251-4.542-1.107-4.542-4.93 0-1.087.389-1.979 1.024-2.675-.101-.253-.446-1.268.099-2.64 0 0 .837-.269 2.742 1.021a9.582 9.582 0 0 1 2.496-.336 9.554 9.554 0 0 1 2.496.336c1.906-1.291 2.742-1.021 2.742-1.021.545 1.372.203 2.387.099 2.64.64.696 1.024 1.587 1.024 2.675 0 3.833-2.33 4.675-4.552 4.922.355.308.675.916.675 1.846 0 1.334-.012 2.41-.012 2.737 0 .267.178.577.687.479C19.146 20.115 22 16.379 22 11.974 22 6.465 17.535 2 12.026 2z" />
                  </svg>
                </a>
              )}

              {/* Live Demo Button with Cool Animations */}
              <a
                href={project.liveUrl}
                title={`See live demo of '${project.title}'`}
                target="_blank"
                rel="noreferrer"
                className="relative w-9 h-9 rounded-full flex items-center justify-center group/live transform-gpu"
              >
                {/* Animated pulsing background glow */}
                <span className={`absolute inset-0 rounded-full bg-gradient-to-br ${project.bgColor.replace('bg-', 'from-')} to-purple-500 animate-pulse opacity-60 blur-sm group-hover/live:opacity-100 group-hover/live:blur-md transition-all duration-300`} />

                {/* Rotating gradient border */}
                <span className={`absolute inset-0 rounded-full bg-gradient-to-br ${project.bgColor.replace('bg-', 'from-')} via-purple-500 to-pink-500 opacity-0 group-hover/live:opacity-100 group-hover/live:animate-spin-slow transition-opacity duration-300`}
                  style={{ padding: '2px' }}>
                  <span className="absolute inset-[2px] rounded-full bg-[#1B2731]" />
                </span>

                {/* Main button */}
                <span className={`relative z-10 w-full h-full rounded-full bg-gradient-to-br ${project.bgColor.replace('bg-', 'from-')} to-purple-500 flex items-center justify-center border-2 border-white/50 group-hover/live:border-white hover:scale-125 hover:shadow-2xl transition-all duration-300`}
                  style={{ boxShadow: `0 0 20px ${project.bgColor.replace('bg-[', 'rgba(').replace(']', ', 0.3)')}` }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-white group-hover/live:scale-110 transition-transform duration-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </span>
              </a>
            </div>
          </div>

          <div className="mb-4">
            <p className="project-desc text-sm text-gray-400 leading-relaxed">
              {displayDesc}
            </p>
            {shouldTruncate && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="mt-2 text-xs font-semibold text-carrigreen hover:text-teal-400 transition-colors duration-200 flex items-center gap-1 group"
              >
                <span>{isExpanded ? "See Less" : "See More"}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-3 w-3 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            )}
          </div>

          <ul
            aria-label={`Tech Stack used in ${project.title}`}
            className="flex flex-wrap gap-2 overflow-hidden"
          >
            {project.tags.map((tag, idx) => (
              <li
                key={tag}
                className="project-tags py-1.5 px-3 rounded-full text-xs font-semibold border border-gray-600 transition-all duration-300 cursor-default bg-gray-800 text-gray-300 hover:border-carrigreen hover:bg-carrigreen/10 hover:text-carrigreen hover:scale-110 hover:shadow-lg hover:shadow-carrigreen/30 transform-gpu"
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
