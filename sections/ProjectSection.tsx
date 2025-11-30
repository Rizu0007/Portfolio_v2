import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { RoughNotation } from "react-rough-notation";

import ProjectCard from "@/components/ProjectCard";
import { useSection } from "context/section";
import useOnScreen from "hooks/useOnScreen";
import useScrollActive from "hooks/useScrollActive";

import Fyp from 'public/2.png'
import house from 'public/3.png'
import blog from 'public/4.png'
import portfo from 'public/projects/portfo.png'

const ProjectSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const elementRef = useRef<HTMLDivElement>(null);
  const isOnScreen = useOnScreen(elementRef);
  const [showAll, setShowAll] = useState(false);

  // Set active link for project section
  const projectSection = useScrollActive(sectionRef);
  const { onSectionChange } = useSection();

  useEffect(() => {
    projectSection && onSectionChange!("projects");
  }, [projectSection]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const q = gsap.utils.selector(sectionRef);

    // Animate section heading and description
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    // Badge entrance
    tl.fromTo(
      q(".project-title > div:first-child"),
      { opacity: 0, scale: 0.8, y: -20 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.6,
        ease: "back.out(1.7)",
      }
    )
    // Main heading with 3D rotation
    .fromTo(
      q(".project-title h2"),
      { opacity: 0, y: 50, rotationX: -90, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        rotationX: 0,
        scale: 1,
        duration: 0.9,
        ease: "expo.out",
      },
      "-=0.3"
    )
    // Underline decoration
    .fromTo(
      q(".project-title > div:nth-child(3)"),
      { opacity: 0, scaleX: 0 },
      {
        opacity: 1,
        scaleX: 1,
        duration: 0.6,
        ease: "power2.out",
      },
      "-=0.5"
    )
    // Description paragraphs with stagger
    .fromTo(
      q(".project-desc > p"),
      { opacity: 0, y: 30, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out",
      },
      "-=0.4"
    )
    // Tech badges with pop effect
    .fromTo(
      q(".project-desc span[class*='inline-block']"),
      { opacity: 0, scale: 0, rotation: -180 },
      {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 0.4,
        stagger: 0.08,
        ease: "back.out(2)",
      },
      "-=0.3"
    )
    // Stats boxes
    .fromTo(
      q(".project-desc > div:last-child > div"),
      { opacity: 0, y: 20, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: "back.out(1.5)",
      },
      "-=0.2"
    );

    // Shimmer effect on main heading
    gsap.to(q(".project-title h2"), {
      textShadow: "0 0 30px rgba(5, 206, 145, 0.5)",
      duration: 1.5,
      repeat: 1,
      yoyo: true,
      delay: 1,
    });

    // Floating animation for stats boxes
    const statsBoxes = q(".project-desc > div:last-child > div > div:first-child");
    statsBoxes.forEach((box: HTMLElement, i: number) => {
      gsap.to(box, {
        y: "+=5",
        duration: 2 + i * 0.3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: i * 0.2,
      });
    });

    // Pulse animation for decorative dots
    gsap.to(q(".project-title .animate-pulse"), {
      scale: 1.3,
      opacity: 0.5,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // Animate "other projects" link at bottom
    gsap.fromTo(
      q(".others"),
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        scrollTrigger: {
          trigger: q(".others"),
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
        duration: 0.6,
      }
    );

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} id="projects" className="section relative overflow-hidden">
      {/* Background animated text */}
      <span
        aria-hidden="true"
        className="absolute top-10 left-0 right-0 text-center rotate-12 text-[#1f2e3a] text-8xl md:text-9xl scale-150 tracking-wide font-bold select-none pointer-events-none z-0 opacity-50"
      >
        INNOVATIVE SOLUTIONS
      </span>
      <span
        aria-hidden="true"
        className="absolute top-96 left-0 right-0 text-center -rotate-12 text-[#1f2e3a] text-8xl md:text-9xl scale-150 tracking-wide font-bold select-none pointer-events-none z-0 opacity-50"
      >
        SCALABLE APPLICATIONS
      </span>
      <span
        aria-hidden="true"
        className="absolute bottom-40 left-0 right-0 text-center rotate-12 text-[#1f2e3a] text-8xl md:text-9xl scale-150 tracking-wide font-bold select-none pointer-events-none z-0 opacity-50"
      >
        RAG CHATBOT FINTECH BLOCKCHAIN
      </span>

      <div className="relative z-10">
      {/* Enhanced Section Heading */}
      <div className="project-title text-center mb-6">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-carrigreen/10 border border-carrigreen/30 rounded-full mb-6 backdrop-blur-sm">
          <span className="w-2 h-2 bg-carrigreen rounded-full animate-pulse" />
          <span className="text-sm font-medium text-carrigreen">Portfolio Showcase</span>
        </div>

        {/* Main Heading with Gradient */}
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-carrigreen via-teal-400 to-marrsgreen bg-clip-text text-transparent" ref={elementRef}>
          Featured Projects
        </h2>

        {/* Underline decoration */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="h-1 w-20 bg-gradient-to-r from-transparent via-carrigreen to-transparent rounded-full" />
          <div className="w-2 h-2 bg-carrigreen rounded-full animate-pulse" />
          <div className="h-1 w-20 bg-gradient-to-r from-transparent via-carrigreen to-transparent rounded-full" />
        </div>

        {/* Enhanced Description */}
        <div className="project-desc max-w-3xl mx-auto space-y-4">
          <p className="text-xl md:text-2xl text-gray-300 font-medium">
            <span className="text-carrigreen">"Talk is cheap. Show me the code"</span>
            <span className="text-gray-400"> — I got you.</span>
          </p>

          <p className="text-base md:text-lg text-gray-400 leading-relaxed">
            Here are some of my <span className="text-white font-semibold">standout projects</span> featuring{" "}
            <span className="inline-block px-2 py-1 bg-gradient-to-r from-purple-900/30 to-violet-900/30 rounded text-purple-300 text-sm font-medium">
              AI/RAG Systems
            </span>{" "}
            <span className="inline-block px-2 py-1 bg-gradient-to-r from-green-900/30 to-emerald-900/30 rounded text-emerald-300 text-sm font-medium">
              Full Stack
            </span>{" "}
            <span className="inline-block px-2 py-1 bg-gradient-to-r from-orange-900/30 to-amber-900/30 rounded text-amber-300 text-sm font-medium">
              Blockchain
            </span>
          </p>
        </div>
      </div>
      <div className="flex flex-wrap">
        {(showAll ? projects : projects.slice(0, 8)).map((project, index) => (
          <ProjectCard key={project.title} index={index} project={project} />
        ))}
      </div>

      {/* See More / See Less Button */}
      {projects.length > 8 && (
        <div className="text-center mb-8">
          <button
            onClick={() => setShowAll(!showAll)}
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-carrigreen/10 to-teal-500/10 border-2 border-carrigreen/30 text-carrigreen font-bold rounded-full hover:border-carrigreen hover:bg-carrigreen/20 transition-all duration-300 hover:scale-105 transform-gpu"
          >
            <span className="text-lg">{showAll ? 'See Less' : `See More Projects (${projects.length - 8} more)`}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-5 w-5 transition-transform duration-300 ${showAll ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={3}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      )}

      <div className="others text-center mb-16">
        Other projects can be explored in{" "}
        <a
          href="https://github.com/Rizu0007"
          className="font-medium underline link-outline text-carrigreen whitespace-nowrap"
        >
          my github profile
        </a>
      </div>
      </div>
    </section>
  );
};

const projects = [
  {
    title: "Xeko.ai - AI Virtual Assistant Platform",
    image:(
      <Image
        src="/projects/xekoai.png"
        sizes="100vw"
        fill
        alt="Xeko.ai Platform"
        className="transition-transform duration-500 hover:scale-110 object-cover"
      />
    ),
    desc: "Leading development of a no-code SaaS platform empowering agencies to create AI virtual assistants in <5 minutes. Built enterprise RAG chatbot using LangChain + Qdrant vector DB. Architected ETL pipeline for web crawling with intelligent chunking. Implemented MCP integrations with Shopify, WooCommerce, Contentful, plus automation via Zapier & n8n. Reduced latency 35% with OpenAI embeddings & contextual compression. Features: 24/7 FAQ automation, lead capture, CRM sync, appointment booking, multilingual support.",
    tags: ["LangChain", "Qdrant", "OpenAI", "MCP", "Next.js", "Zapier", "n8n", "WooCommerce"],
    liveUrl: "https://www.xeko.ai/",
    codeUrl: "#",
    bgColor: "bg-[#9D84B7]",
  },
   {
    title: "UpInvest - Stock Market Platform",
    image: (
       <Image
        src="/projects/upinvest.png"
        sizes="100vw"
        fill
        alt="Xeko.ai Platform"
        className="transition-transform duration-500 hover:scale-110 object-cover"
      />
    ),
    desc: "High-performance stock market platform with portfolio management & real-time tracking. Built with Next.js + Nest.js + PostgreSQL. Implemented advanced caching achieving 60% faster response times & 98% uptime. Features responsive dashboards with trend analysis & live market data via WebSockets.",
    tags: ["Next.js", "Nest.js", "PostgreSQL", "WebSockets"],
    liveUrl: "https://app.upinvest.pk/",
    codeUrl: "#",
    bgColor: "",
  },
  {
    title: "Hyly.ai - Article Response Generator",
    image: (
      <Image
        src="/projects/hyly.png"
        sizes="100vw"
        fill
        alt="Hyly.ai Platform"
        className="transition-transform duration-500 hover:scale-110 object-cover"
      />
    ),
    desc: "AI-powered RAG application for intelligent article responses using LangChain orchestration. Designed ETL pipeline extracting data from Notion & HubSpot APIs with optimal document chunking. Built hybrid search with Qdrant vector store featuring semantic retrieval & metadata filtering. Integrated OpenAI LLM with multi-query generation & contextual compression for citation-aware responses. Developed robust RAG architecture with document processing, embedding generation, and retrieval chains. Clean Next.js interface presenting AI content with source references.",
    tags: ["LangChain", "Qdrant", "OpenAI", "Next.js", "Notion API", "HubSpot API", "RAG"],
    liveUrl: "https://hyly.ai/",
    codeUrl: "#",
    bgColor: "bg-[#6B7FD7]",
  },
  {
    title: "Chex.AI - Vehicle Inspection Solution",
    image: (
      <Image
        src="/projects/chexai.png"
        sizes="100vw"
        fill
        alt="Chex.AI Platform"
        className="transition-transform duration-500 hover:scale-110 object-cover"
      />
    ),
    desc: "Enterprise vehicle inspection solution with AI-powered damage detection. Led frontend development using React.js, TypeScript, and Node.js. Implemented state management with TanStack Query & Context API for optimized server-side handling. Built responsive UI components using Shadcn/UI, Ant Design & Recharts for interactive dashboards. Integrated YOLOv8 & Vision Transformer models for automated vehicle damage detection & classification. Collaborated with AI engineers to deliver seamless computer vision integration.",
    tags: ["React.js", "TypeScript", "YOLOv8", "Vision Transformer", "TanStack Query", "Shadcn/UI", "Ant Design"],
    liveUrl: "https://www.chex.ai/",
    codeUrl: "#",
    bgColor: "bg-[#5BA3C5]",
  },
    {
    title: "Digital Dost - Digital Marketing Agency",
    image: (
      <Image
        src="/projects/digital.png"
        sizes="100vw"
        fill
        alt="Digital Dost Website"
        className="transition-transform duration-500 hover:scale-110 object-cover"
      />
    ),
    desc: "Designed & developed complete UI/UX for a leading Pakistan-based digital marketing agency. Created modern, responsive interface showcasing services including digital marketing, web development, e-commerce solutions & app development. Built interactive service carousel, client testimonials section, case studies showcase, and partnership displays. Implemented smooth animations and optimized user experience for Rs 41Cr+ revenue-generating platform serving 1200+ Shopify clients.",
    tags: ["React.js", "Next.js", "Tailwind CSS", "UI/UX Design", "Responsive Design"],
    liveUrl: "https://www.thedigitaldost.com/",
    codeUrl: "#",
    bgColor: "bg-[#F59E0B]",
  },
    {
    title: "Personal Portfolio",
    image: (
      <Image
        src={portfo}
        sizes="100vw"
        fill
        alt="Terminal Portfolio"
        className="transition-transform duration-500 hover:scale-110 object-cover"
      />
    ),
    desc: "Personal portfolio website showcasing projects & experience. Built with Next.js, TypeScript, and Tailwind CSS. Features smooth GSAP animations, responsive design, dark theme, and interactive components.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "GSAP"],
    liveUrl: "https://rizu.vercel.app/",
    codeUrl: "https://github.com/Rizu0007/Portfolio-_v2.git",
    bgColor: "bg-[#B4BEE0]",
  },
  {
    title: "Motion - Advanced Animation Showcase",
    image: (
      <Image
        src="/projects/animationProject.png"
        sizes="100vw"
        fill
        alt="Motion Animation Project"
        className="transition-transform duration-500 hover:scale-110 object-cover"
      />
    ),
    desc: "Interactive animation showcase demonstrating advanced web animation techniques using GSAP & Framer Motion. Built complex scroll-triggered animations, parallax effects, smooth page transitions, and micro-interactions. Implemented timeline-based animations with GSAP ScrollTrigger for precise control. Leveraged Framer Motion for declarative React animations including variants, gestures, and layout animations. Features morphing shapes, staggered reveals, 3D transforms, and physics-based spring animations for fluid, engaging user experiences.",
    tags: ["React.js", "Next.js", "GSAP", "Framer Motion", "ScrollTrigger", "Animations"],
    liveUrl: "https://motion-project-alpha.vercel.app/",
    codeUrl: "#",
    bgColor: "bg-[#EC4899]",
  },
  {
    title: "MyArbit - Crypto Investment Tracker",
    image: (
      <div className="w-full h-full bg-gradient-to-br from-amber-600 via-orange-600 to-red-700 flex items-center justify-center">
        <span className="text-6xl">💰</span>
      </div>
    ),
    desc: "Led frontend for crypto staking & investment tracking platform. Built interactive dashboards with Chart.js for real-time visualizations. Integrated WebSocket for live market data updates, driving 45% increase in user engagement with seamless performance.",
    tags: ["React.js", "Chart.js", "WebSockets", "Tailwind"],
    liveUrl: "https://myarbit.com/",
    codeUrl: "#",
    bgColor: "bg-[#E8A87C]",
  },

  {
    title: "Comsats Cryptocurrency Coin (FYP)",
    image: (
      <Image
        src={Fyp}
        sizes="100vw"
        fill
        alt="Fyp"
        className="transition-transform duration-500 hover:scale-110 object-cover"
      />
    ),
    desc: "Blockchain-based campus payment system deployed university-wide. Created custom ERC20 token using Solidity with advanced authentication. Students & faculty use Comsats Coin for campus services & shop purchases. Features wallet operations (deposit/withdrawal), multi-vendor marketplace, and secure transaction handling.",
    tags: ["React.js", "Node", "Tailwind Css", "solidity"],
    liveUrl: "https://fyp-2024-two.vercel.app/",
    codeUrl: "https://github.com/Rizu0007/FYP2024.git",
    bgColor: "bg-[#A6CECE]",
  },
  {
    title: "Comsats accommodation platform",
    image: (
      <Image
        src={house}
        sizes="100vw"
        fill
        alt="Haru API"
        className="transition-transform duration-500 hover:scale-110 object-cover"
      />
    ),
    desc: "University accommodation finder helping students discover nearby housing & room shares. Integrated Google Maps API for accurate locations. Built with React.js + Tailwind CSS. Secure Firebase authentication allows users to post & respond to rental ads with personalized profiles.",
    tags: ["React.js", "Firebase", "Google Maps API", "Tailwind CSS"],
    liveUrl: "https://realtor-v2.vercel.app/",
    codeUrl: "https://github.com/Rizu0007/Comsats-House.git",
    bgColor: "bg-[#C5E4E7]",
  },

  {
    title: "ExolorX Blog Application",
    image: (
      <Image
        src={blog}
        sizes="100vw"
        fill
        alt="AstroPaper"
        className="transition-transform duration-500 hover:scale-110 object-cover"
      />
    ),
    desc: "Modern blog platform with content categorization highlighting top & latest posts. Built with Next.js + Prisma ORM + TypeScript. Features user authentication, post management, rich text editor, and responsive design with Tailwind CSS.",
    tags: ["Next.js", "TypeScript", "Prisma", "Tailwind CSS"],
    liveUrl: "https://dailyblog-demo.vercel.app/",
    codeUrl: "https://github.com/Rizu0007/exploreX.git",
    bgColor: "bg-[#9FD0E3]",
  },
];

export default ProjectSection;
