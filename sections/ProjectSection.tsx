import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { RoughNotation } from "react-rough-notation";
import { useTheme } from "next-themes";
import coin from '.././public/projects/coin.png'
import portfo from '.././public/projects/portfo.png'
import comsats from '.././public/projects/comsats.png'

import ProjectCard from "@/components/ProjectCard";
import { useSection } from "context/section";
import useOnScreen from "hooks/useOnScreen";
import useScrollActive from "hooks/useScrollActive";

import terminalPortfolio from "public/projects/terminal-portfolio.webp";
import haruFashion from "public/projects/haru-fashion.webp";
import haruApi from "public/projects/haru-api.webp";
import astroPaper from "public/projects/astro-paper.webp";
import Fyp from 'public/2.png'
import house from 'public/3.png'
import blog from 'public/4.png'

const ProjectSection: React.FC = () => {
  const { theme } = useTheme();

  const sectionRef = useRef<HTMLDivElement>(null);
  const elementRef = useRef<HTMLDivElement>(null);
  const isOnScreen = useOnScreen(elementRef);

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

    tl.fromTo(
      q(".project-title"),
      { opacity: 0, y: 40, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        ease: "power3.out",
      }
    )
    .fromTo(
      q(".project-desc"),
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
      },
      "-=0.4"
    );

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
        className="absolute top-10 left-0 right-0 text-center rotate-12 text-gray-100 dark:text-[#1f2e3a] text-8xl md:text-9xl scale-150 tracking-wide font-bold select-none pointer-events-none z-0 opacity-50"
      >
        INNOVATIVE SOLUTIONS
      </span>
      <span
        aria-hidden="true"
        className="absolute top-96 left-0 right-0 text-center -rotate-12 text-gray-100 dark:text-[#1f2e3a] text-8xl md:text-9xl scale-150 tracking-wide font-bold select-none pointer-events-none z-0 opacity-50"
      >
        SCALABLE APPLICATIONS
      </span>
      <span
        aria-hidden="true"
        className="absolute bottom-40 left-0 right-0 text-center rotate-12 text-gray-100 dark:text-[#1f2e3a] text-8xl md:text-9xl scale-150 tracking-wide font-bold select-none pointer-events-none z-0 opacity-50"
      >
        RAG CHATBOT FINTECH BLOCKCHAIN
      </span>

      <div className="relative z-10">
      <div className="project-title text-center">
        <RoughNotation
          type="underline"
          color={`${theme === "light" ? "rgb(0, 122, 122)" : "rgb(5 206 145)"}`}
          strokeWidth={2}
          order={1}
          show={isOnScreen}
        >
          <h2 className="section-heading">Featured Projects</h2>
        </RoughNotation>
      </div>
      <span className="project-desc text-center block mb-4" ref={elementRef}>
        "Talk is cheap. Show me the code"? I got you. <br />
        Here are some of my projects you shouldn't misss
      </span>
      <div className="flex flex-wrap">
        {projects.map((project, index) => (
          <ProjectCard key={project.title} index={index} project={project} />
        ))}
      </div>
      <div className="others text-center mb-16">
        Other projects can be explored in{" "}
        <a
          href="https://github.com/Rizu0007"
          className="font-medium underline link-outline text-marrsgreen dark:text-carrigreen whitespace-nowrap"
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
    title: "Xeko.ai - AI RAG Chatbot Platform",
    type: "AI/ML + Full Stack",
    image: (
      <div className="w-full h-full bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 flex items-center justify-center">
        <span className="text-6xl">🤖</span>
      </div>
    ),
    desc: "Leading development of an AI-powered RAG chatbot platform using LangChain orchestration. Built ETL pipeline for web crawling, hybrid search with Qdrant vector database, and MCP integrations with Shopify, Contentful, WooCommerce. Reduced response latency by 35% with contextual compression and multi-query generation.",
    tags: ["LangChain", "Qdrant", "OpenAI", "MCP", "Next.js"],
    liveUrl: "https://app.xeko.ai/",
    codeUrl: "#",
    bgColor: "bg-[#9D84B7]",
  },
  {
    title: "UpInvest - Stock Market Platform",
    type: "Full Stack + Real-time",
    image: (
      <div className="w-full h-full bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 flex items-center justify-center">
        <span className="text-6xl">📈</span>
      </div>
    ),
    desc: "High-performance stock market platform with portfolio management and real-time market tracking. Engineered with Next.js, Nest.js, PostgreSQL. Implemented advanced caching strategies achieving 60% faster response times and 98% uptime. Built responsive dashboards with trend analysis capabilities.",
    tags: ["Next.js", "Nest.js", "PostgreSQL", "WebSockets"],
    liveUrl: "https://app.upinvest.pk/",
    codeUrl: "#",
    bgColor: "bg-[#7FB3D5]",
  },
  {
    title: "MyArbit - Crypto Investment Tracker",
    type: "Frontend + Real-time Data",
    image: (
      <div className="w-full h-full bg-gradient-to-br from-amber-600 via-orange-600 to-red-700 flex items-center justify-center">
        <span className="text-6xl">💰</span>
      </div>
    ),
    desc: "Led frontend development for crypto staking and investment tracking platform. Built interactive dashboards with Chart.js for real-time visualizations. Integrated WebSocket connections for live market data updates, driving 45% increase in user engagement with seamless real-time performance.",
    tags: ["React.js", "Chart.js", "WebSockets", "Tailwind"],
    liveUrl: "#",
    codeUrl: "#",
    bgColor: "bg-[#E8A87C]",
  },
  {
    title: "Comsats Cryptocurrency Coin (FYP)",
    type: "Blockchain + MERN Stack",
    image: (
      <Image
        src={Fyp}
        sizes="100vw"
        fill
        alt="Fyp"
        className="transition-transform duration-500 hover:scale-110 object-cover"
      />
    ),
    desc: "Successfully deployed the token within the university, students and faculty engage with campus services by introducing a blockchain-based payment system. • Creation of a custom ERC20 token using Solidity,apply Advance authentication • Different shops are available in the Website where Student can purchase things with our Comsats Coin • Operations like deposite and withdrawal can be performed in the account",
    tags: ["React.js", "Node", "Tailwind Css", "solidity"],
    liveUrl: "https://fyp-2024-two.vercel.app/",
    codeUrl: "https://github.com/Rizu0007/FYP2024.git",
    bgColor: "bg-[#A6CECE]",
  },
  {
    title: "Comsats accommodation platform",
    type: "Full stack",
    image: (
      <Image
        src={house}
        sizes="100vw"
        fill
        alt="Haru API"
        className="transition-transform duration-500 hover:scale-110 object-cover"
      />
    ),
    desc: "Led the development of a university accommodation finder using React.js and Tailwind CSS, to assist students in discovering nearby housing options and room shares • Engineered a seamless integration with Google Maps API to provide students with accurate location • Architected a secure user authentication system with Firebase, allowing users to create personalized accounts for posting and responding to rental and room-sharing ads",
    tags: ["Solidity", "Next.js", "Hardhat", "Smart Contract"],
    liveUrl: "https://realtor-v2.vercel.app/",
    codeUrl: "https://github.com/Rizu0007/Comsats-House.git",
    bgColor: "bg-[#C5E4E7]",
  },
  {
    title: "Personal Portfolio",
    type: "Frontend",
    image: (
      <Image
        src={portfo}
        sizes="100vw"
        fill
        alt="Terminal Portfolio"
        className="transition-transform duration-500 hover:scale-110 object-cover"
      />
    ),
    desc: "My perfolio website in new version developed with React and TypeScript. In this project, Tailwindcss library is used for styling.",
    tags: ["Next.js", "TypeScript", "Tailwindcsss"],
    liveUrl: "https://rizu.vercel.app/",
    codeUrl: "https://github.com/Rizu0007/Portfolio-_v2.git",
    bgColor: "bg-[#B4BEE0]",
  },
  {
    title: "ExolorX Blog Application",
    type: "Frontend",
    image: (
      <Image
        src={blog}
        sizes="100vw"
        fill
        alt="AstroPaper"
        className="transition-transform duration-500 hover:scale-110 object-cover"
      />
    ),
    desc: "Developed a  blog platform using Next.js and Prisma, categorizing content to highlight top and latest post from the user",
    tags: ["next.js", "TypeScript", "Prisma", "TailwindCSS"],
    liveUrl: "https://dailyblog-demo.vercel.app/",
    codeUrl: "https://github.com/Rizu0007/exploreX.git",
    bgColor: "bg-[#9FD0E3]",
  },
];

export default ProjectSection;
