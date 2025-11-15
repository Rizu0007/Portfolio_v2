/**
 * useGSAPAnimation Hook
 *
 * A reusable hook for GSAP animations with automatic cleanup.
 * Provides scoped selector and context cleanup to prevent memory leaks.
 *
 * @param animationCallback - Function that receives gsap selector and creates animations
 * @param dependencies - Array of dependencies to re-run animation
 * @returns ref - React ref to attach to the element you want to scope animations to
 *
 * @example
 * const ref = useGSAPAnimation((q) => {
 *   gsap.fromTo(q(".element"), { opacity: 0 }, { opacity: 1 });
 * }, []);
 */

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

type AnimationCallback = (selector: (target: string) => gsap.DOMTarget) => void;

export const useGSAPAnimation = (
  animationCallback: AnimationCallback,
  dependencies: any[] = []
) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !ref.current) return;

    gsap.registerPlugin(ScrollTrigger);

    // Create GSAP context for automatic cleanup
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(ref);
      animationCallback(q);
    }, ref);

    // Cleanup function
    return () => {
      ctx.revert(); // This kills all animations and ScrollTriggers created in the context
    };
  }, dependencies);

  return ref;
};

export default useGSAPAnimation;
