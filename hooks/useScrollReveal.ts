/**
 * useScrollReveal Hook
 *
 * Animates elements into view when they enter the viewport.
 * Supports multiple animation types and customizable triggers.
 *
 * @param options - Configuration object
 * @returns ref - React ref to attach to the element
 *
 * @example
 * // Fade in from bottom
 * const ref = useScrollReveal({ type: "fade-up" });
 *
 * @example
 * // Fade in from left with custom start point
 * const ref = useScrollReveal({
 *   type: "fade-left",
 *   start: "top 80%",
 *   duration: 1
 * });
 */

import { useEffect, useRef, RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

type AnimationType =
  | "fade-up"
  | "fade-down"
  | "fade-left"
  | "fade-right"
  | "fade"
  | "scale"
  | "slide-up"
  | "slide-down";

interface UseScrollRevealOptions {
  type?: AnimationType;
  start?: string;
  duration?: number;
  stagger?: number;
  ease?: string;
  delay?: number;
  toggleActions?: string;
  scrub?: boolean | number;
  markers?: boolean; // For debugging
}

const ANIMATION_PRESETS = {
  "fade-up": {
    from: { opacity: 0, y: 50 },
    to: { opacity: 1, y: 0 },
  },
  "fade-down": {
    from: { opacity: 0, y: -50 },
    to: { opacity: 1, y: 0 },
  },
  "fade-left": {
    from: { opacity: 0, x: -50 },
    to: { opacity: 1, x: 0 },
  },
  "fade-right": {
    from: { opacity: 0, x: 50 },
    to: { opacity: 1, x: 0 },
  },
  fade: {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
  scale: {
    from: { opacity: 0, scale: 0.8 },
    to: { opacity: 1, scale: 1 },
  },
  "slide-up": {
    from: { y: 100 },
    to: { y: 0 },
  },
  "slide-down": {
    from: { y: -100 },
    to: { y: 0 },
  },
};

export const useScrollReveal = <T extends HTMLElement = HTMLDivElement>(
  options: UseScrollRevealOptions = {}
): RefObject<T> => {
  const {
    type = "fade-up",
    start = "top 80%",
    duration = 0.8,
    stagger = 0,
    ease = "power2.out",
    delay = 0,
    toggleActions = "play none none reverse",
    scrub = false,
    markers = false,
  } = options;

  const ref = useRef<T>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !ref.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const preset = ANIMATION_PRESETS[type];
    const element = ref.current;

    // Handle stagger for children elements
    const target = stagger > 0 ? element.children : element;

    gsap.fromTo(
      target,
      preset.from,
      {
        ...preset.to,
        duration,
        ease,
        delay,
        stagger: stagger > 0 ? stagger : undefined,
        scrollTrigger: {
          trigger: element,
          start,
          toggleActions,
          scrub,
          markers,
        },
      }
    );

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === element) {
          trigger.kill();
        }
      });
    };
  }, [type, start, duration, stagger, ease, delay, toggleActions, scrub, markers]);

  return ref;
};

export default useScrollReveal;
