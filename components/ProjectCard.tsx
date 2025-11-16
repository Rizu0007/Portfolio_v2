import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

type Props = {
  index: number;
  project: {
    title: string;
    type: string;
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

  const even = index % 2 === 0 ? true : false;

  // Clean entrance animations
  useEffect(() => {
    const q = gsap.utils.selector(sectionRef);

    gsap.registerPlugin(ScrollTrigger);

    // Simple, clean entrance animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "70% bottom",
        toggleActions: "play none none reverse",
      },
    });

    // Card slides up smoothly
    tl.fromTo(
      cardRef.current,
      {
        opacity: 0,
        y: 60,
        scale: 0.95,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        ease: "power3.out",
      }
    );

    // Image fades in
    tl.fromTo(
      q(".project-image"),
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
      },
      "-=0.5"
    );

    // Content fades in with slight stagger
    tl.fromTo(
      q(".project-text"),
      { opacity: 0, y: 10 },
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power2.out",
      },
      "-=0.3"
    );

    tl.fromTo(
      q(".project-desc"),
      { opacity: 0, y: 10 },
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power2.out",
      },
      "-=0.2"
    );

    // Tags fade in with subtle stagger
    tl.fromTo(
      q(".project-tags"),
      { opacity: 0, y: 5 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.03,
        duration: 0.4,
        ease: "power2.out",
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
  }, [even, index]);

  // Simple, clean hover effect
  useEffect(() => {
    const card = cardRef.current;
    const image = imageRef.current;

    if (!card || !image) return;

    const handleMouseEnter = () => {
      // Simple lift effect
      gsap.to(card, {
        y: -8,
        scale: 1.02,
        duration: 0.3,
        ease: "power2.out",
      });

      // Subtle image zoom
      gsap.to(image, {
        scale: 1.05,
        duration: 0.4,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      // Return to normal
      gsap.to(card, {
        y: 0,
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });

      gsap.to(image, {
        scale: 1,
        duration: 0.4,
        ease: "power2.out",
      });
    };

    card.addEventListener("mouseenter", handleMouseEnter);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mouseenter", handleMouseEnter);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div ref={sectionRef} className="md:basis-1/2 md:px-8 py-2 md:py-4">
      <div
        ref={cardRef}
        className="project-card group relative cursor-pointer rounded-2xl overflow-hidden bg-white dark:bg-[#1B2731] shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-gray-200 dark:border-gray-700"
      >
        <div className="relative overflow-hidden">
          <div
            ref={imageRef}
            className={`project-image ${project.bgColor} relative aspect-[16/9] overflow-hidden`}
          >
            {project.image}

            {/* Subtle gradient overlay on image */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

            {/* Project type badge */}
            <div className="absolute top-4 left-4 z-10">
              <span className="px-3 py-1.5 bg-white/95 dark:bg-black/85 backdrop-blur-sm text-xs font-bold rounded-full border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-white shadow-md">
                {project.type}
              </span>
            </div>
          </div>

          {/* Gradient accent line */}
          <div className={`h-1 bg-gradient-to-r ${project.bgColor.replace('bg-', 'from-')} to-purple-500`} />
        </div>
        <div className="overflow-hidden p-4 relative z-20">
          <div className="project-text flex items-center justify-between mb-3">
            <h3 className="text-marrsgreen dark:text-carrigreen text-lg font-bold">
              {project.title}
            </h3>
            <div className="flex items-center gap-2">
              <a
                href={project.codeUrl}
                title={`See '${project.title}' on Github`}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center border-2 border-gray-200 dark:border-gray-600 hover:border-gray-900 dark:hover:border-white transition-all duration-300 hover:scale-110 hover:shadow-lg group/icon"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  className="fill-gray-700 dark:fill-gray-300 group-hover/icon:fill-gray-900 dark:group-hover/icon:fill-white transition-colors duration-300"
                  viewBox="0 0 24 24"
                >
                  <path d="M12.026 2c-5.509 0-9.974 4.465-9.974 9.974 0 4.406 2.857 8.145 6.821 9.465.499.09.679-.217.679-.481 0-.237-.008-.865-.011-1.696-2.775.602-3.361-1.338-3.361-1.338-.452-1.152-1.107-1.459-1.107-1.459-.905-.619.069-.605.069-.605 1.002.07 1.527 1.028 1.527 1.028.89 1.524 2.336 1.084 2.902.829.091-.645.351-1.085.635-1.334-2.214-.251-4.542-1.107-4.542-4.93 0-1.087.389-1.979 1.024-2.675-.101-.253-.446-1.268.099-2.64 0 0 .837-.269 2.742 1.021a9.582 9.582 0 0 1 2.496-.336 9.554 9.554 0 0 1 2.496.336c1.906-1.291 2.742-1.021 2.742-1.021.545 1.372.203 2.387.099 2.64.64.696 1.024 1.587 1.024 2.675 0 3.833-2.33 4.675-4.552 4.922.355.308.675.916.675 1.846 0 1.334-.012 2.41-.012 2.737 0 .267.178.577.687.479C19.146 20.115 22 16.379 22 11.974 22 6.465 17.535 2 12.026 2z" />
                </svg>
              </a>
              <a
                href={project.liveUrl}
                title={`See live demo of '${project.title}'`}
                target="_blank"
                rel="noreferrer"
                className={`w-9 h-9 rounded-full bg-gradient-to-br ${project.bgColor.replace('bg-', 'from-')} to-purple-500 flex items-center justify-center border-2 border-white/50 hover:border-white hover:scale-110 hover:shadow-lg transition-all duration-300 group/icon`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </a>
            </div>
          </div>

          <div className="overflow-hidden mb-4">
            <p className="project-desc text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              {project.desc}
            </p>
          </div>

          <ul
            aria-label={`Tech Stack used in ${project.title}`}
            className="flex flex-wrap gap-2 overflow-hidden"
          >
            {project.tags.map((tag, idx) => (
              <li
                key={tag}
                className="project-tags py-1.5 px-3 rounded-full text-xs font-semibold border border-gray-300 dark:border-gray-600 transition-colors duration-200 cursor-default bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:border-marrsgreen dark:hover:border-carrigreen hover:bg-gray-100 dark:hover:bg-gray-700"
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
