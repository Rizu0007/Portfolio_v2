import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useTheme } from "next-themes";
import { RoughNotation } from "react-rough-notation";

import { useSection } from "context/section";
import useOnScreen from "hooks/useOnScreen";
import useScrollActive from "hooks/useScrollActive";
import { MdxMeta } from "pages/blog/posts/[slug]";
import BlogImageCard from "@/components/BlogImageCard";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

type Props = {
  posts: MdxMeta[];
};

const BlogSection: React.FC<Props> = ({ posts }) => {
  const { theme } = useTheme();

  const sectionRef = useRef<HTMLDivElement>(null);
  const elementRef = useRef<HTMLDivElement>(null);
  const swiperRef = useRef<HTMLDivElement>(null);
  const linkRef = useRef<HTMLDivElement>(null);
  const isOnScreen = useOnScreen(elementRef);

  // Set active link for blog section
  const blogSection = useScrollActive(sectionRef);
  const { onSectionChange } = useSection();

  useEffect(() => {
    blogSection && onSectionChange!("blog");
  }, [blogSection]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const q = gsap.utils.selector(sectionRef);

    // Main entrance timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
        toggleActions: "play none none reverse",
      },
    });

    tl.fromTo(
      q(".blog-heading-wrapper"),
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
      }
    )
    .fromTo(
      elementRef.current,
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
      swiperRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
      },
      "-=0.3"
    )
    .fromTo(
      linkRef.current,
      { opacity: 0, scale: 0.9 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: "back.out(1.7)",
      },
      "-=0.4"
    );

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="bg-[#F5F5F5] dark:bg-[#1B2731]">
      <section ref={sectionRef} id="blog" className="section md:px-10">
        <div className="text-center blog-heading-wrapper">
          <RoughNotation
            type="underline"
            color={`${
              theme === "light" ? "rgb(0, 122, 122)" : "rgb(5 206 145)"
            }`}
            strokeWidth={2}
            order={1}
            show={isOnScreen}
          >
            <h2 className="section-heading">Blog</h2>
          </RoughNotation>
        </div>
        <div className="text-center mb-8" ref={elementRef}>
          I write blog posts about what I've done and what I'm doing{" "}
          <br className="hidden sm:block" aria-hidden="true" />
          as a documenting practice. Here are some of my recent blog posts.
        </div>
        <div ref={swiperRef}>
          <Swiper
            modules={[Navigation, Pagination]}
            pagination={{
              dynamicBullets: true,
            }}
            wrapperTag="ul"
            navigation
            className="swiper-padding-mobile xs:swiper-padding"
            breakpoints={{
              100: {
                slidesPerView: "auto",
                spaceBetween: 50,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 40,
                centeredSlides: true,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 50,
                centeredSlides: false,
              },
            }}
          >
            {posts.map((post, index) => (
              <SwiperSlide key={post.slug} tag="li">
                <BlogImageCard
                  post={post}
                  className={`${index > 3 ? "hidden lg:block" : ""}`}
                  key={post.slug}
                  fullWH
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="mt-4 text-center" ref={linkRef}>
            <Link href="/blog" className="link">
              Read all blog posts{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 inline-block"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogSection;
