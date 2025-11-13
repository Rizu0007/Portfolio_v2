/**
 * useParallax Hook
 *
 * Creates smooth parallax scrolling effects on elements.
 * Elements move at different speeds based on scroll position.
 *
 * @param options - Configuration object
 * @returns ref - React ref to attach to the parallax element
 *
 * @example
 * // Move element down as user scrolls
 * const ref = useParallax({ yPercent: 50 });
 *
 * @example
 * // Move element up with custom speed
 * const ref = useParallax({ y: -100, scrub: 2 });
 */

import { useEffect, useRef, RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

interface UseParallaxOptions {
  /** Vertical movement in pixels */
  y?: number;
  /** Vertical movement as percentage of element height */
  yPercent?: number;
  /** Horizontal movement in pixels */
  x?: number;
  /** Horizontal movement as percentage of element width */
  xPercent?: number;
  /** Rotation in degrees */
  rotation?: number;
  /** Scale transformation */
  scale?: number;
  /** Opacity change */
  opacity?: number;
  /** Scrub value (smoothness) - higher = smoother but slower */
  scrub?: boolean | number;
  /** Start trigger point */
  start?: string;
  /** End trigger point */
  end?: string;
  /** Show ScrollTrigger markers for debugging */
  markers?: boolean;
}

export const useParallax = <T extends HTMLElement = HTMLDivElement>(
  options: UseParallaxOptions = {}
): RefObject<T> => {
  const {
    y,
    yPercent,
    x,
    xPercent,
    rotation,
    scale,
    opacity,
    scrub = 1,
    start = "top bottom",
    end = "bottom top",
    markers = false,
  } = options;

  const ref = useRef<T>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !ref.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const element = ref.current;

    // Build animation properties
    const animationProps: gsap.TweenVars = {};
    if (y !== undefined) animationProps.y = y;
    if (yPercent !== undefined) animationProps.yPercent = yPercent;
    if (x !== undefined) animationProps.x = x;
    if (xPercent !== undefined) animationProps.xPercent = xPercent;
    if (rotation !== undefined) animationProps.rotation = rotation;
    if (scale !== undefined) animationProps.scale = scale;
    if (opacity !== undefined) animationProps.opacity = opacity;

    // Create parallax animation
    gsap.to(element, {
      ...animationProps,
      ease: "none",
      scrollTrigger: {
        trigger: element,
        start,
        end,
        scrub,
        markers,
      },
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === element) {
          trigger.kill();
        }
      });
    };
  }, [y, yPercent, x, xPercent, rotation, scale, opacity, scrub, start, end, markers]);

  return ref;
};

export default useParallax;
