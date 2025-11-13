/**
 * useMagneticButton Hook
 *
 * Creates a magnetic effect where the button follows the cursor when hovered.
 * Provides a premium, interactive feel to CTA buttons.
 *
 * @param options - Configuration object
 * @returns ref - React ref to attach to the button element
 *
 * @example
 * const buttonRef = useMagneticButton({ strength: 0.3 });
 * <button ref={buttonRef}>Click me</button>
 */

import { useEffect, useRef, RefObject } from "react";
import gsap from "gsap";

interface UseMagneticButtonOptions {
  /** Strength of magnetic effect (0-1) */
  strength?: number;
  /** Duration of follow animation */
  duration?: number;
  /** Duration of return animation */
  returnDuration?: number;
  /** Easing for follow animation */
  ease?: string;
  /** Easing for return animation */
  returnEase?: string;
  /** Scale effect on hover */
  hoverScale?: number;
}

export const useMagneticButton = <T extends HTMLElement = HTMLButtonElement>(
  options: UseMagneticButtonOptions = {}
): RefObject<T> => {
  const {
    strength = 0.2,
    duration = 0.3,
    returnDuration = 0.6,
    ease = "power2.out",
    returnEase = "elastic.out(1, 0.3)",
    hoverScale = 1.05,
  } = options;

  const ref = useRef<T>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !ref.current) return;

    const element = ref.current;

    const handleMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = element.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;

      // Calculate distance from center
      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;

      gsap.to(element, {
        x: deltaX,
        y: deltaY,
        duration,
        ease,
      });
    };

    const handleMouseEnter = () => {
      gsap.to(element, {
        scale: hoverScale,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(element, {
        x: 0,
        y: 0,
        scale: 1,
        duration: returnDuration,
        ease: returnEase,
      });
    };

    // Add event listeners
    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mouseleave", handleMouseLeave);

    // Cleanup
    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [strength, duration, returnDuration, ease, returnEase, hoverScale]);

  return ref;
};

export default useMagneticButton;
