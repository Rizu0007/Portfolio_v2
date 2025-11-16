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

  // Entrance animations
  useEffect(() => {
    const q = gsap.utils.selector(sectionRef);

    gsap.registerPlugin(ScrollTrigger);

    // Modern entrance animation - cards slide from alternating sides
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "70% bottom",
        toggleActions: "play none none reverse",
      },
    });

    // Card entrance - dramatic slide from side with rotation
    tl.fromTo(
      cardRef.current,
      {
        opacity: 0,
        x: even ? -100 : 100,
        y: 50,
        scale: 0.85,
        rotation: even ? -5 : 5,
      },
      {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        rotation: 0,
        duration: 0.9,
        ease: "power4.out",
      }
    );

    // Image zooms in with fade
    tl.fromTo(
      q(".project-image"),
      { opacity: 0, scale: 1.3 },
      {
        opacity: 1,
        scale: 1,
        ease: "power3.out",
        duration: 0.8,
      },
      "-=0.6"
    );

    // Title slides from opposite side
    tl.fromTo(
      q(".project-text"),
      { x: even ? 40 : -40, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power3.out",
      },
      "-=0.5"
    );

    // Description fades in with slight slide
    tl.fromTo(
      q(".project-desc"),
      { opacity: 0, y: 15 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
      },
      "-=0.4"
    );

    // Tags appear with smooth stagger
    tl.fromTo(
      q(".project-tags"),
      { y: 10, opacity: 0, scale: 0.9 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        stagger: 0.04,
        ease: "back.out(1.5)",
        duration: 0.6,
      },
      "-=0.3"
    );

    // Continuous floating animation after entrance
    gsap.to(cardRef.current, {
      y: index % 2 === 0 ? -8 : -5,
      duration: 2.5 + (index % 3) * 0.3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 0.5,
    });

    // Subtle continuous rotation
    gsap.to(cardRef.current, {
      rotation: index % 2 === 0 ? 0.5 : -0.5,
      duration: 4 + (index % 3) * 0.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 0.7,
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === sectionRef.current) {
          trigger.kill();
        }
      });
    };
  }, [even, index]);

  // Enhanced 3D Tilt + Magnetic effect on hover
  useEffect(() => {
    const card = cardRef.current;
    const image = imageRef.current;

    if (!card || !image) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = card.getBoundingClientRect();
      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;

      // Calculate rotation values (-12 to 12 degrees) - smoother
      const rotateY = (x - 0.5) * 12;
      const rotateX = (y - 0.5) * -12;

      // Tilt the entire card with smooth easing
      gsap.to(card, {
        rotationY: rotateY,
        rotationX: rotateX,
        transformPerspective: 1200,
        duration: 0.6,
        ease: "power2.out",
      });

      // Image zooms and shifts for parallax depth
      gsap.to(image, {
        x: (x - 0.5) * 15,
        y: (y - 0.5) * 15,
        scale: 1.05,
        duration: 0.6,
        ease: "power2.out",
      });
    };

    const handleMouseEnter = () => {
      // Enhanced hover with lift and glow
      gsap.to(card, {
        scale: 1.03,
        z: 50,
        duration: 0.4,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      // Smooth return to original state
      gsap.to(card, {
        rotationY: 0,
        rotationX: 0,
        scale: 1,
        z: 0,
        duration: 0.6,
        ease: "power2.out",
      });

      gsap.to(image, {
        x: 0,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: "power2.out",
      });
    };

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseenter", handleMouseEnter);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseenter", handleMouseEnter);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div ref={sectionRef} className="md:basis-1/2 md:px-8 py-2 md:py-4">
      <div
        ref={cardRef}
        className="project-card group relative transform-gpu cursor-pointer rounded-2xl overflow-hidden bg-white dark:bg-[#1B2731] shadow-2xl hover:shadow-3xl transition-all duration-500 border border-gray-100 dark:border-gray-800"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Gradient glow overlay on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none z-10">
          <div className={`absolute inset-0 bg-gradient-to-br ${project.bgColor.replace('bg-', 'from-')} to-transparent blur-2xl`} />
        </div>

        <div className="overflow-hidden rounded-t-2xl">
          <div
            ref={imageRef}
            className={`project-image ${project.bgColor} relative aspect-[16/9] overflow-hidden`}
          >
            {project.image}
            {/* Gradient overlay on image */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
        </div>
        <div className="overflow-hidden p-4 relative z-20">
          <div className="project-text flex items-center justify-between mb-3">
            <h3 className="text-marrsgreen dark:text-carrigreen text-lg font-bold">
              {project.title}
            </h3>
            <div className="flex items-center space-x-5 sm:space-x-3 my-2 sm:my-0 mr-[0.1rem]">
              <a
                href={project.codeUrl}
                title={`See '${project.title}' on Github`}
                target="_blank"
                rel="noreferrer"
                className="focus-visible:outline-marrsgreen dark:focus-visible:outline-carrigreen mr-1 rounded-full transition-transform hover:scale-110 hover:rotate-12"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  className="scale-150 sm:scale-125 opacity-75 fill-black dark:fill-bglight"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12.026 2c-5.509 0-9.974 4.465-9.974 9.974 0 4.406 2.857 8.145 6.821 9.465.499.09.679-.217.679-.481 0-.237-.008-.865-.011-1.696-2.775.602-3.361-1.338-3.361-1.338-.452-1.152-1.107-1.459-1.107-1.459-.905-.619.069-.605.069-.605 1.002.07 1.527 1.028 1.527 1.028.89 1.524 2.336 1.084 2.902.829.091-.645.351-1.085.635-1.334-2.214-.251-4.542-1.107-4.542-4.93 0-1.087.389-1.979 1.024-2.675-.101-.253-.446-1.268.099-2.64 0 0 .837-.269 2.742 1.021a9.582 9.582 0 0 1 2.496-.336 9.554 9.554 0 0 1 2.496.336c1.906-1.291 2.742-1.021 2.742-1.021.545 1.372.203 2.387.099 2.64.64.696 1.024 1.587 1.024 2.675 0 3.833-2.33 4.675-4.552 4.922.355.308.675.916.675 1.846 0 1.334-.012 2.41-.012 2.737 0 .267.178.577.687.479C19.146 20.115 22 16.379 22 11.974 22 6.465 17.535 2 12.026 2z"
                  ></path>
                </svg>
              </a>
              <a
                href={project.liveUrl}
                title={`See live demo of '${project.title}'`}
                target="_blank"
                rel="noreferrer"
                className="focus-visible:outline-marrsgreen dark:focus-visible:outline-carrigreen mr-8 rounded-full transition-transform hover:scale-110 hover:rotate-12"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7 scale-125 sm:scale-100 bg-cardlight dark:bg-carddark hover:bg-gray-300 dark:hover:bg-gray-600 rounded-full p-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
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
                className="project-tags bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-700 py-1.5 px-3 rounded-full text-xs font-semibold text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:border-marrsgreen dark:hover:border-carrigreen cursor-default"
                style={{ transitionDelay: `${idx * 20}ms` }}
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
