import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

import { useFilter } from "context/filter";

const BlogHeroSection: React.FC = () => {
  const { searchText, onSearch } = useFilter();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch!(e.target.value);
  };

  const sectionRef = useRef(null);
  const q = gsap.utils.selector(sectionRef);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // text animation after initial load
    gsap.fromTo(q(".main-header"), { y: 100 }, { y: 0, delay: 1.1 });

    // intro animation
    let tl = gsap.timeline({
      defaults: { stagger: 0.1, duration: 0.2 },
    });
    tl.fromTo(
      q(".intro-1"),
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, delay: 1.3 }
    )
      .fromTo(q(".intro-2"), { y: 30, opacity: 0 }, { y: 0, opacity: 1 })
      .fromTo(q(".intro-3"), { y: 30, opacity: 0 }, { y: 0, opacity: 1 });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-4 pt-20 md:pt-24 px-4 sm:px-8 md:px-20 max-w-4xl mx-auto"
    >
      <div className="mt-10">
        <div className="overflow-hidden py-1">
          <h1 className="main-header text-4xl lg:text-5xl font-bold">
            Sat Naing's{" "}
            <span className="text-marrsgreen dark:text-carrigreen">Blog</span>
          </h1>
        </div>
        <div>
          <p className="intro-1 mt-4 mb-2">
            Hello, everyone! Welcome to my personal blog.
          </p>
          <p className="intro-2">
            In this blog, I will be writing about my projects (what I do/how I
            did), my personal experiences, and some random stuffs.
          </p>
          <p className="intro-3">
            You can follow me on my social media and{" "}
            <a href="https://github.com/satnaing" className="link">
              Github account.
            </a>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 inline-block ml-1 fill-yellow-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
              strokeWidth={0}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
              />
            </svg>
          </p>
        </div>
      </div>
      <label className="relative block my-4">
        <input
          className="placeholder:italic placeholder:text-opacity-75 py-3 pr-14 pl-5 
                    block bg-cardlight dark:bg-carddark w-full rounded shadow-md
                    border border-cardlight dark:border-carddark border-opacity-40 
                    focus:outline-none focus:border-marrslight focus:dark:border-carrilight"
          placeholder="Search for anything..."
          type="text"
          name="search"
          defaultValue={searchText}
          onChange={handleSearch}
          autoComplete="off"
          autoFocus
        />
        <span className="absolute inset-y-0 right-0 flex items-center pr-5 opacity-80">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            aria-hidden="true"
            className="fill-marrsgreen dark:fill-carrigreen"
          >
            <path d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z"></path>
          </svg>
        </span>
      </label>
    </section>
  );
};

export default BlogHeroSection;
