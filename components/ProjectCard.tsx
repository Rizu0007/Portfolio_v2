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

    let floatingTween: gsap.core.Tween | null = null;
    let rotationTween: gsap.core.Tween | null = null;

    const handleMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = card.getBoundingClientRect();
      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;

      // Calculate rotation values (-12 to 12 degrees)
      const rotateY = (x - 0.5) * 12;
      const rotateX = (y - 0.5) * -12;

      // Tilt the entire card
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

      // Update cursor spotlight position
      const spotlight = card.querySelector('.cursor-spotlight') as HTMLElement;
      if (spotlight) {
        spotlight.style.background = `radial-gradient(circle 300px at ${x * 100}% ${y * 100}%, rgba(255,255,255,0.15), transparent)`;
      }

      // Update shine effect position
      const shine = image.querySelector('.shine-effect') as HTMLElement;
      if (shine) {
        shine.style.background = `linear-gradient(${Math.atan2(y - 0.5, x - 0.5) * (180 / Math.PI) + 90}deg, transparent 40%, rgba(255,255,255,0.3) 50%, transparent 60%)`;
      }
    };

    const handleMouseEnter = () => {
      // Pause floating animations
      floatingTween = gsap.getTweensOf(card).find(t => (t.vars as any).y !== undefined) as gsap.core.Tween || null;
      rotationTween = gsap.getTweensOf(card).find(t => (t.vars as any).rotation !== undefined) as gsap.core.Tween || null;

      floatingTween?.pause();
      rotationTween?.pause();

      // Enhanced hover with lift
      gsap.to(card, {
        scale: 1.03,
        z: 50,
        duration: 0.4,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      // Resume floating animations
      floatingTween?.resume();
      rotationTween?.resume();

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
        {/* Cursor spotlight effect */}
        <div className="cursor-spotlight absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20" />

        {/* Gradient glow overlay on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none z-10">
          <div className={`absolute inset-0 bg-gradient-to-br ${project.bgColor.replace('bg-', 'from-')} to-transparent blur-2xl`} />
        </div>

        <div className="relative overflow-hidden rounded-t-2xl">
          <div
            ref={imageRef}
            className={`project-image ${project.bgColor} relative aspect-[16/9] overflow-hidden`}
          >
            {project.image}

            {/* Shine/glare effect */}
            <div className="shine-effect absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            {/* Gradient overlay on image */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Project type badge */}
            <div className="absolute top-4 left-4 z-30">
              <span className="px-3 py-1.5 bg-white/90 dark:bg-black/80 backdrop-blur-sm text-xs font-bold rounded-full border-2 border-white/50 dark:border-white/20 text-gray-800 dark:text-white shadow-lg">
                {project.type}
              </span>
            </div>
          </div>

          {/* Gradient accent line */}
          <div className={`h-1 bg-gradient-to-r ${project.bgColor.replace('bg-', 'from-')} via-purple-500 to-pink-500`} />
        </div>
        <div className="overflow-hidden p-4 relative z-20">
          <div className="project-text flex items-center justify-between mb-3">
            <h3 className="text-marrsgreen dark:text-carrigreen text-lg font-bold group-hover:scale-105 transition-transform duration-300">
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
                className={`project-tags relative overflow-hidden py-1.5 px-3 rounded-full text-xs font-semibold border-2 transition-all duration-300 hover:scale-110 hover:shadow-lg cursor-default bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:from-opacity-10 hover:border-marrsgreen dark:hover:border-carrigreen`}
                style={{ transitionDelay: `${idx * 20}ms` }}
              >
                {/* Tag shine effect on hover */}
                <div className={`absolute inset-0 opacity-0 hover:opacity-10 bg-gradient-to-br ${project.bgColor.replace('bg-', 'from-')} to-purple-500 transition-opacity duration-300`} />
                <span className="relative z-10">{tag}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
