import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";

import useScrollListener from "hooks/useScrollListener";
import { useSection } from "context/section";

const navLinks = [
  { url: "#", text: "Home" },
  { url: "#whoami", text: "About" },
  { url: "#projects", text: "Work" },
  { url: "#contact", text: "Contact" },
];

// Command palette items for mobile
const commandItems = [
  { icon: "home", title: "Home", description: "Welcome to my forever work-in-progress!", url: "#" },
  { icon: "projects", title: "Projects", description: "Showcase of my projects", url: "#projects" },
  { icon: "blog", title: "Blog", description: "Thoughts, mental models, and tutorials", url: "#blog" },
  { icon: "guestbook", title: "Guestbook", description: "Leave a message for me", url: "/guestbook" },
  { icon: "links", title: "Links", description: "All my links are here", url: "/links" },
  { icon: "about", title: "About", description: "Learn more about me!", url: "#whoami" },
  { icon: "bucket", title: "Bucket List", description: "Things to do at least once in my life", url: "/bucket-list" },
];

const Header: React.FC = () => {
  const { currentSection } = useSection();
  const [navClassList, setNavClassList] = useState<any>([]);
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const scroll = useScrollListener();

  const mainRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      mainRef.current,
      { top: -120 },
      { top: 0, duration: 0.7, delay: 1, ease: "Power0.easeNone" }
    );
  }, []);


  // Keyboard shortcut for command palette
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        setIsCommandOpen(true);
      }
      if (event.key === "Escape") {
        setIsCommandOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Filter command items based on search
  const filteredItems = commandItems.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // update classList of nav on scroll
  useEffect(() => {
    const _classList = [];
    if (scroll.y > 150 && scroll.y - scroll.lastY > 0)
      _classList.push("!shadow-md");
    setNavClassList(_classList);
  }, [scroll.y, scroll.lastY]);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "home":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9,22 9,12 15,12 15,22" />
          </svg>
        );
      case "projects":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <line x1="3" y1="9" x2="21" y2="9" />
            <line x1="9" y1="21" x2="9" y2="9" />
          </svg>
        );
      case "blog":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14,2 14,8 20,8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
          </svg>
        );
      case "guestbook":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 11l3 3L22 4" />
            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
          </svg>
        );
      case "links":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
          </svg>
        );
      case "about":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        );
      case "bucket":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="8" y1="6" x2="21" y2="6" />
            <line x1="8" y1="12" x2="21" y2="12" />
            <line x1="8" y1="18" x2="21" y2="18" />
            <line x1="3" y1="6" x2="3.01" y2="6" />
            <line x1="3" y1="12" x2="3.01" y2="12" />
            <line x1="3" y1="18" x2="3.01" y2="18" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <header className="md:flex">
        <div
          ref={mainRef}
          className={`main-nav z-30 top-0 fixed duration-400 px-4 sm:px-8 h-16 w-full ${navClassList.join(
            " "
          )}`}
        >
          <div className="w-full h-full mx-auto max-w-6xl flex items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="text-xl font-bold sm:text-2xl focus-visible:outline-carrigreen"
            >
              <span className="text-carrigreen">Rizu</span>
              <span className="text-textlight">.dev</span>
            </Link>

            {/* Desktop Navigation - Centered */}
            <nav className="hidden md:flex items-center">
              <div className="glassmorphism bg-carddark rounded-full px-2 py-2 flex items-center gap-1">
                {navLinks.map((navLink) => (
                  <a
                    key={navLink.url}
                    href={navLink.url}
                    className={`relative text px-4 py-2 rounded-full transition-all ${
                      currentSection === navLink.text.toLowerCase()
                        ? "text-carrigreen bg-carrigreen/10"
                        : "text-textlight hover:text-textlight"
                    }`}
                  >
                    {currentSection === navLink.text.toLowerCase() && (
                      <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-carrigreen rounded-full" />
                    )}
                    {navLink.text}
                  </a>
                ))}

                {/* Book a Call Button */}
                <a
                  href="#contact"
                  className="ml-2 text-sm px-4 py-2 bg-carrigreen/20 text-carrigreen rounded-full hover:bg-carrigreen/30 transition-colors"
                >
                  Book a Call
                </a>
              </div>
            </nav>

            {/* Command Palette Trigger (Desktop) */}
            <button
              onClick={() => setIsCommandOpen(true)}
              className="hidden md:flex items-center justify-center w-8 h-8 rounded-lg bg-carddark/50 hover:bg-carddark transition-colors text-textlight hover:text-textlight text-xl"
              title="Search (⌘K)"
            >
              ⌘
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsCommandOpen(true)}
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg bg-carddark/50 hover:bg-carddark transition-colors text-textlight text-xl"
              aria-label="Open menu"
            >
              ⌘
            </button>
          </div>
        </div>
      </header>

      {/* Command Palette Modal */}
      {isCommandOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh]">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsCommandOpen(false)}
          />

          {/* Modal */}
          <div className="relative w-full max-w-xl mx-4 bg-carddark/95 backdrop-blur-xl rounded-xl shadow-2xl border border-white/10 overflow-hidden">
            {/* Search Input */}
            <div className="flex items-center border-b border-white/10 px-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-textlight/40">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none px-4 py-4 text-textlight placeholder-textlight/40"
                autoFocus
              />
              <button
                onClick={() => setIsCommandOpen(false)}
                className="px-2 py-1 text-xs bg-carddark rounded text-textlight/60"
              >
                ESC
              </button>
            </div>

            {/* Navigation Items */}
            <div className="max-h-[60vh] overflow-y-auto">
              <div className="px-4 py-2 text-xs text-textlight/40 uppercase tracking-wider">
                Navigation
              </div>
              {filteredItems.map((item) => (
                <a
                  key={item.url}
                  href={item.url}
                  onClick={() => {
                    setIsCommandOpen(false);
                    setSearchQuery("");
                  }}
                  className="flex items-center gap-4 px-4 py-3 hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-lg bg-carddark flex items-center justify-center text-textlight/60">
                    {getIcon(item.icon)}
                  </div>
                  <div>
                    <div className="text-textlight font-medium">{item.title}</div>
                    <div className="text-sm text-textlight/50">{item.description}</div>
                  </div>
                </a>
              ))}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-4 py-3 border-t border-white/10 text-xs text-textlight/40">
              <div className="flex items-center gap-4">
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-textlight">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-textlight">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-textlight">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
              </div>
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-bgdark rounded text-[10px]">↑</kbd>
                  <kbd className="px-1.5 py-0.5 bg-bgdark rounded text-[10px]">↓</kbd>
                  navigate
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-bgdark rounded text-[10px]">↵</kbd>
                  select
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-bgdark rounded text-[10px]">esc</kbd>
                  close
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
