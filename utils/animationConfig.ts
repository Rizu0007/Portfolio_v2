/**
 * Animation Configuration
 *
 * Centralized animation settings for consistent timing, easing, and triggers
 * across the entire application. Import and use these values to maintain
 * a cohesive animation feel.
 *
 * @example
 * import { DURATIONS, EASINGS, TRIGGERS } from '@/utils/animationConfig';
 *
 * gsap.to(element, {
 *   duration: DURATIONS.standard,
 *   ease: EASINGS.smooth,
 * });
 */

// ========== DURATIONS ==========
export const DURATIONS = {
  /** 0.3s - Quick transitions, micro-interactions */
  fast: 0.3,

  /** 0.5s - Standard UI transitions */
  standard: 0.5,

  /** 0.8s - Slower reveals, important elements */
  slow: 0.8,

  /** 1.2s - Hero animations, page transitions */
  slower: 1.2,
} as const;

// ========== EASING FUNCTIONS ==========
export const EASINGS = {
  /** Smooth acceleration and deceleration */
  smooth: "power2.out",

  /** Smoother, more organic feel */
  smoothIn: "power2.in",
  smoothOut: "power2.out",
  smoothInOut: "power2.inOut",

  /** Snappier, more energetic */
  energetic: "power3.out",
  energeticIn: "power3.in",
  energeticOut: "power3.out",
  energeticInOut: "power3.inOut",

  /** Elastic bounce effect */
  elastic: "elastic.out(1, 0.5)",
  elasticSoft: "elastic.out(1, 0.3)",
  elasticStrong: "elastic.out(1, 0.7)",

  /** Back easing with overshoot */
  back: "back.out(1.7)",
  backSoft: "back.out(1.2)",
  backStrong: "back.out(2.5)",

  /** No easing (for scrub animations) */
  none: "none",

  /** Expo easing for dramatic effects */
  expo: "expo.out",
  expoIn: "expo.in",
  expoOut: "expo.out",
} as const;

// ========== SCROLL TRIGGER POINTS ==========
export const TRIGGERS = {
  /** Element starts animating when it enters bottom of viewport */
  early: "top bottom",

  /** Element starts animating when 20% into viewport */
  standard: "top 80%",

  /** Element starts animating when 30% into viewport */
  late: "top 70%",

  /** Element starts animating when 50% into viewport */
  center: "top center",

  /** For parallax effects - starts before element enters */
  parallaxStart: "top bottom",
  parallaxEnd: "bottom top",

  /** For pinned sections */
  pin: "top top",
} as const;

// ========== STAGGER VALUES ==========
export const STAGGER = {
  /** Very quick succession (50ms) */
  fast: 0.05,

  /** Standard stagger (100ms) */
  standard: 0.1,

  /** Slower stagger (200ms) */
  slow: 0.2,

  /** Very slow stagger (300ms) */
  slower: 0.3,
} as const;

// ========== TOGGLE ACTIONS ==========
export const TOGGLE_ACTIONS = {
  /** Play forward when entering, reverse when leaving */
  playReverse: "play reverse play reverse",

  /** Play once and stay */
  playNone: "play none none none",

  /** Play when entering, reverse when scrolling back up */
  playReverseOnLeave: "play none none reverse",

  /** Complete on enter, reset on leave */
  completeReset: "play complete none reset",
} as const;

// ========== ANIMATION PRESETS ==========
export const ANIMATION_PRESETS = {
  fadeUp: {
    from: { opacity: 0, y: 50 },
    to: { opacity: 1, y: 0 },
  },
  fadeDown: {
    from: { opacity: 0, y: -50 },
    to: { opacity: 1, y: 0 },
  },
  fadeLeft: {
    from: { opacity: 0, x: -50 },
    to: { opacity: 1, x: 0 },
  },
  fadeRight: {
    from: { opacity: 0, x: 50 },
    to: { opacity: 1, x: 0 },
  },
  scale: {
    from: { opacity: 0, scale: 0.8 },
    to: { opacity: 1, scale: 1 },
  },
  scaleDown: {
    from: { opacity: 0, scale: 1.2 },
    to: { opacity: 1, scale: 1 },
  },
  rotate: {
    from: { opacity: 0, rotation: -10 },
    to: { opacity: 1, rotation: 0 },
  },
} as const;

// ========== RESPONSIVE BREAKPOINTS ==========
export const BREAKPOINTS = {
  mobile: 768,
  tablet: 1024,
  desktop: 1280,
} as const;

// ========== PERFORMANCE SETTINGS ==========
export const PERFORMANCE = {
  /** Use will-change CSS property */
  willChange: true,

  /** Force3D for hardware acceleration */
  force3D: true,

  /** Reduce motion for users who prefer it */
  respectReducedMotion: true,

  /** Ignore mobile resize events for ScrollTrigger */
  ignoreMobileResize: true,
} as const;

// ========== UTILITY FUNCTIONS ==========

/**
 * Check if user prefers reduced motion
 */
export const prefersReducedMotion = (): boolean => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

/**
 * Get duration based on user preferences
 */
export const getAnimationDuration = (duration: number): number => {
  return prefersReducedMotion() ? 0 : duration;
};

/**
 * Check if device is mobile
 */
export const isMobile = (): boolean => {
  if (typeof window === "undefined") return false;
  return window.innerWidth < BREAKPOINTS.mobile;
};

/**
 * Get responsive animation config
 */
export const getResponsiveConfig = (
  desktopConfig: any,
  mobileConfig?: any
) => {
  return isMobile() ? (mobileConfig || desktopConfig) : desktopConfig;
};

// ========== GSAP GLOBAL CONFIG ==========
/**
 * Apply global GSAP configuration
 * Call this once in _app.tsx
 */
export const applyGlobalGSAPConfig = () => {
  if (typeof window !== "undefined") {
    const gsap = require("gsap").default;
    const { ScrollTrigger } = require("gsap/dist/ScrollTrigger");

    // Register plugins
    gsap.registerPlugin(ScrollTrigger);

    // Global config
    gsap.config({
      force3D: PERFORMANCE.force3D,
      nullTargetWarn: false,
    });

    // ScrollTrigger config
    ScrollTrigger.config({
      ignoreMobileResize: PERFORMANCE.ignoreMobileResize,
    });

    // Respect reduced motion
    if (prefersReducedMotion()) {
      gsap.globalTimeline.timeScale(100); // Animations complete instantly
    }
  }
};

export default {
  DURATIONS,
  EASINGS,
  TRIGGERS,
  STAGGER,
  TOGGLE_ACTIONS,
  ANIMATION_PRESETS,
  BREAKPOINTS,
  PERFORMANCE,
  prefersReducedMotion,
  getAnimationDuration,
  isMobile,
  getResponsiveConfig,
  applyGlobalGSAPConfig,
};
