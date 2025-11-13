# 🎬 GSAP Animation Implementation Guide

Complete guide for implementing smooth, professional animations in your Next.js portfolio using GSAP.

---

## 📋 Table of Contents

1. [Quick Start](#quick-start)
2. [Using Custom Hooks](#using-custom-hooks)
3. [Advanced Techniques](#advanced-techniques)
4. [Performance Optimization](#performance-optimization)
5. [Testing Checklist](#testing-checklist)
6. [Troubleshooting](#troubleshooting)

---

## 🚀 Quick Start

### Step 1: Apply Global Configuration

Update your `_app.tsx` to register GSAP once:

```typescript
// pages/_app.tsx
import { useEffect } from 'react';
import { applyGlobalGSAPConfig } from '@/utils/animationConfig';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    applyGlobalGSAPConfig();
  }, []);

  return <Component {...pageProps} />;
}
```

### Step 2: Replace Old Components

Replace your existing components with the enhanced versions:

```bash
# Backup originals
mv sections/ContactSection.tsx sections/ContactSection.OLD.tsx
mv sections/ProjectSection.tsx sections/ProjectSection.OLD.tsx
mv sections/BlogSection.tsx sections/BlogSection.OLD.tsx

# Use enhanced versions
mv sections/ContactSection_ENHANCED.tsx sections/ContactSection.tsx
mv sections/ProjectSection_ENHANCED.tsx sections/ProjectSection.tsx
mv sections/BlogSection_ENHANCED.tsx sections/BlogSection.tsx
```

---

## 🎣 Using Custom Hooks

### 1. `useGSAPAnimation` - Universal Animation Hook

**Best for:** Complete control over complex animations with automatic cleanup.

```typescript
import { useGSAPAnimation } from '@/hooks/useGSAPAnimation';
import { DURATIONS, EASINGS, TRIGGERS } from '@/utils/animationConfig';

const MyComponent = () => {
  const ref = useGSAPAnimation((q) => {
    // All animations here are scoped and auto-cleaned
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: q('.trigger'),
        start: TRIGGERS.standard,
      },
    });

    tl.fromTo(
      q('.element'),
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: DURATIONS.standard,
        ease: EASINGS.smooth
      }
    );
  }, []); // Dependencies array

  return <div ref={ref}>...</div>;
};
```

### 2. `useScrollReveal` - Simple Scroll Animations

**Best for:** Quick fade-in reveals without writing GSAP code.

```typescript
import { useScrollReveal } from '@/hooks/useScrollReveal';

const MyComponent = () => {
  // Basic usage
  const fadeUpRef = useScrollReveal({ type: 'fade-up' });

  // With stagger for children
  const staggerRef = useScrollReveal({
    type: 'fade-up',
    stagger: 0.1, // Each child animates 0.1s after the previous
    duration: 0.8,
  });

  // Custom configuration
  const customRef = useScrollReveal({
    type: 'scale',
    start: 'top 60%',
    ease: 'back.out(1.7)',
    duration: 1,
  });

  return (
    <>
      <div ref={fadeUpRef}>Fades up on scroll</div>

      <div ref={staggerRef}>
        <div>Item 1 (animates first)</div>
        <div>Item 2 (animates 0.1s later)</div>
        <div>Item 3 (animates 0.2s later)</div>
      </div>

      <div ref={customRef}>Scales in with bounce</div>
    </>
  );
};
```

**Available Animation Types:**
- `fade-up` - Fade in from bottom
- `fade-down` - Fade in from top
- `fade-left` - Slide in from left
- `fade-right` - Slide in from right
- `fade` - Simple fade
- `scale` - Scale up from 0.8
- `slide-up` - Slide up (no fade)
- `slide-down` - Slide down (no fade)

### 3. `useParallax` - Parallax Effects

**Best for:** Creating depth with scroll-based movement.

```typescript
import { useParallax } from '@/hooks/useParallax';

const ParallaxSection = () => {
  // Background moves slower (creates depth)
  const bgRef = useParallax({
    y: -100,
    scrub: 2 // Higher = smoother/slower
  });

  // Foreground moves faster
  const fgRef = useParallax({
    y: 100,
    scrub: 1
  });

  // Rotate while scrolling
  const rotateRef = useParallax({
    rotation: 360,
    scrub: true,
  });

  // Multiple effects combined
  const multiRef = useParallax({
    y: -50,
    rotation: 10,
    scale: 1.1,
    scrub: 1.5,
  });

  return (
    <div className="relative">
      <div ref={bgRef} className="absolute">Background layer</div>
      <div ref={fgRef}>Foreground content</div>
      <div ref={rotateRef}>Rotating element</div>
      <div ref={multiRef}>Combined effects</div>
    </div>
  );
};
```

### 4. `useMagneticButton` - Interactive Buttons

**Best for:** Premium feel on CTA buttons.

```typescript
import { useMagneticButton } from '@/hooks/useMagneticButton';

const MagneticButtons = () => {
  // Standard magnetic effect
  const buttonRef = useMagneticButton();

  // Strong magnetic effect
  const strongRef = useMagneticButton({
    strength: 0.4, // 0-1 range
    hoverScale: 1.1,
  });

  // Gentle magnetic effect
  const gentleRef = useMagneticButton({
    strength: 0.1,
    duration: 0.5,
    returnEase: 'elastic.out(1, 0.2)',
  });

  return (
    <>
      <button ref={buttonRef}>Hover Me</button>
      <button ref={strongRef}>Strong Effect</button>
      <button ref={gentleRef}>Gentle Effect</button>
    </>
  );
};
```

---

## 🎨 Advanced Techniques

### 1. Character-by-Character Text Animation

**Install SplitType:**
```bash
npm install split-type
```

**Implementation:**
```typescript
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import SplitType from 'split-type';

const AnimatedHeading = ({ children }) => {
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    // Split text into characters
    const split = new SplitType(textRef.current, {
      types: 'chars,words',
      tagName: 'span'
    });

    // Animate each character
    gsap.fromTo(
      split.chars,
      {
        opacity: 0,
        y: 50,
        rotateX: -90,
      },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        stagger: 0.02,
        duration: 0.8,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top 80%',
        },
      }
    );

    // Cleanup
    return () => {
      split.revert();
    };
  }, [children]);

  return <h1 ref={textRef}>{children}</h1>;
};

export default AnimatedHeading;
```

### 2. SVG Path Drawing Animation

**For SVG paths and strokes:**

```typescript
const SVGDrawing = () => {
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (!pathRef.current) return;

    const path = pathRef.current;
    const length = path.getTotalLength();

    // Set up the stroke
    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: length,
    });

    // Animate the drawing
    gsap.to(path, {
      strokeDashoffset: 0,
      duration: 2,
      ease: 'power2.inOut',
      scrollTrigger: {
        trigger: path,
        start: 'top 75%',
      },
    });
  }, []);

  return (
    <svg viewBox="0 0 100 100">
      <path
        ref={pathRef}
        d="M10,10 L90,90"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
    </svg>
  );
};
```

### 3. Horizontal Scroll Section

**For horizontal project showcases:**

```typescript
const HorizontalScroll = ({ projects }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !scrollRef.current) return;

    const container = containerRef.current;
    const scroll = scrollRef.current;

    const scrollWidth = scroll.scrollWidth;
    const windowWidth = window.innerWidth;

    gsap.to(scroll, {
      x: -(scrollWidth - windowWidth),
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: () => `+=${scrollWidth}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [projects]);

  return (
    <div ref={containerRef} className="h-screen overflow-hidden">
      <div ref={scrollRef} className="flex h-full">
        {projects.map((project) => (
          <div key={project.id} className="flex-shrink-0 w-screen">
            {project.content}
          </div>
        ))}
      </div>
    </div>
  );
};
```

### 4. Smooth Page Transitions

**Create a page transition wrapper:**

```typescript
// components/PageTransition.tsx
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import gsap from 'gsap';

const PageTransition = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    // Animate in on mount
    gsap.fromTo(
      '.page-transition',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
    );

    // Animate out on route change
    const handleRouteChange = () => {
      gsap.to('.page-transition', {
        opacity: 0,
        y: -20,
        duration: 0.4,
        ease: 'power2.in',
      });
    };

    router.events.on('routeChangeStart', handleRouteChange);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router]);

  return <div className="page-transition">{children}</div>;
};

export default PageTransition;
```

### 5. Scroll-Linked Video

**For video that plays based on scroll:**

```typescript
const ScrollVideo = ({ src }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!videoRef.current) return;

    const video = videoRef.current;

    gsap.to(video, {
      currentTime: video.duration || 1,
      ease: 'none',
      scrollTrigger: {
        trigger: video,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  }, []);

  return (
    <video
      ref={videoRef}
      src={src}
      muted
      playsInline
      preload="auto"
    />
  );
};
```

### 6. Scroll-Triggered Counter Animation

```typescript
const AnimatedCounter = ({ target, duration = 2 }) => {
  const counterRef = useRef<HTMLSpanElement>(null);
  const valueRef = useRef({ val: 0 });

  useEffect(() => {
    if (!counterRef.current) return;

    gsap.to(valueRef.current, {
      val: target,
      duration,
      ease: 'power1.out',
      scrollTrigger: {
        trigger: counterRef.current,
        start: 'top 80%',
      },
      onUpdate: () => {
        if (counterRef.current) {
          counterRef.current.textContent = Math.floor(
            valueRef.current.val
          ).toLocaleString();
        }
      },
    });
  }, [target, duration]);

  return <span ref={counterRef}>0</span>;
};

// Usage
<AnimatedCounter target={1000} duration={2} />
```

---

## ⚡ Performance Optimization

### 1. Lazy Load ScrollTrigger

```typescript
import dynamic from 'next/dynamic';

// Only load heavy animation components when needed
const HeavyAnimatedSection = dynamic(
  () => import('@/components/HeavyAnimatedSection'),
  { ssr: false } // Disable SSR for animation-heavy components
);
```

### 2. Reduce Animations on Mobile

```typescript
import { isMobile } from '@/utils/animationConfig';

useEffect(() => {
  const mobile = isMobile();

  if (mobile) {
    // Simple fade only
    gsap.to(element, { opacity: 1, duration: 0.3 });
  } else {
    // Complex animation
    gsap.timeline()
      .to(element, { opacity: 1, y: 0 })
      .to(element2, { scale: 1 });
  }
}, []);
```

### 3. Use `will-change` CSS

```css
/* Add to elements that will animate */
.animated-element {
  will-change: transform, opacity;
}

/* Remove after animation completes */
.animated-element.animation-complete {
  will-change: auto;
}
```

### 4. Batch DOM Reads/Writes

```typescript
// ❌ Bad - Causes layout thrashing
elements.forEach(el => {
  const height = el.offsetHeight; // Read
  el.style.height = height * 2 + 'px'; // Write
});

// ✅ Good - Batch reads then writes
const heights = elements.map(el => el.offsetHeight); // Read all
heights.forEach((height, i) => {
  elements[i].style.height = height * 2 + 'px'; // Write all
});
```

### 5. Cleanup ScrollTriggers

```typescript
useEffect(() => {
  // Create animations
  const trigger = ScrollTrigger.create({...});

  // Always cleanup
  return () => {
    trigger.kill();
    // Or kill all triggers created in this component
    ScrollTrigger.getAll().forEach(t => {
      if (t.vars.trigger === ref.current) {
        t.kill();
      }
    });
  };
}, []);
```

### 6. Use GSAP Context (v3.11+)

```typescript
useEffect(() => {
  const ctx = gsap.context(() => {
    // All animations here
    gsap.to('.element', { x: 100 });
    ScrollTrigger.create({...});
  }, ref); // Scope to ref

  // One-line cleanup
  return () => ctx.revert();
}, []);
```

### 7. Optimize Scrub Animations

```typescript
// ❌ Expensive - Recalculates every pixel
scrollTrigger: {
  scrub: true,
}

// ✅ Better - Smooths animation over 0.5s
scrollTrigger: {
  scrub: 0.5,
}

// ✅ Best for complex animations
scrollTrigger: {
  scrub: 1,
}
```

---

## ✅ Testing Checklist

### Animation Quality

- [ ] **Timing feels natural**
  - No animations too fast (<0.2s) or too slow (>1.5s)
  - Stagger delays feel rhythmic (0.05-0.2s)

- [ ] **Easing is appropriate**
  - Entrances use `ease-out` (start fast, end slow)
  - Exits use `ease-in` (start slow, end fast)
  - Interactive elements use `elastic` or `back` easing

- [ ] **No jank or stutter**
  - Animations run at 60fps
  - No layout shifts during animation
  - Smooth on scroll, no jumpy behavior

### Responsive Behavior

- [ ] **Mobile (< 768px)**
  - Animations are simpler or disabled
  - No horizontal scroll issues
  - Touch interactions work smoothly

- [ ] **Tablet (768px - 1024px)**
  - Animations scale appropriately
  - No overlap or collision issues

- [ ] **Desktop (> 1024px)**
  - Full animation effects visible
  - Parallax effects work smoothly
  - Hover states are responsive

### Accessibility

- [ ] **Reduced motion support**
  - Check `prefers-reduced-motion` is respected
  - Test: System Preferences → Accessibility → Display → Reduce Motion

- [ ] **Keyboard navigation**
  - Focus states are visible during animations
  - Animations don't interfere with tab order

- [ ] **Screen readers**
  - Content is readable even if animation fails
  - ARIA labels aren't affected by animations

### Performance

- [ ] **Initial load**
  - First animation starts within 1s of page load
  - No animation blocking critical rendering

- [ ] **Scroll performance**
  - Smooth scrolling (no stutter)
  - ScrollTrigger doesn't cause lag
  - FPS stays above 50 during scroll

- [ ] **Memory leaks**
  - No memory increase after navigating away
  - ScrollTriggers are properly cleaned up
  - Check DevTools → Memory → Take snapshot

### Browser Compatibility

Test in:
- [ ] Chrome/Edge (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

### Testing Tools

**Chrome DevTools:**
```javascript
// Check FPS
// DevTools → More Tools → Rendering → Frame Rendering Stats

// Check layout shifts
// DevTools → Performance → Record → Check for Layout Shift events

// Check animation performance
// DevTools → Performance → Record → Check for dropped frames
```

**Lighthouse:**
```bash
# Run Lighthouse audit
npm install -g lighthouse
lighthouse http://localhost:3000 --view
```

**Key metrics to check:**
- Cumulative Layout Shift (CLS) < 0.1
- First Contentful Paint (FCP) < 1.8s
- Largest Contentful Paint (LCP) < 2.5s

---

## 🐛 Troubleshooting

### Issue: Animations not playing

**Possible causes:**
1. ScrollTrigger not registered
   ```typescript
   // Add to component
   useEffect(() => {
     gsap.registerPlugin(ScrollTrigger);
   }, []);
   ```

2. Element not found
   ```typescript
   // Check ref is attached
   console.log(ref.current); // Should not be null
   ```

3. Trigger point off-screen
   ```typescript
   // Debug with markers
   scrollTrigger: {
     markers: true, // Remove in production
   }
   ```

### Issue: Janky scroll performance

**Solutions:**
1. Reduce scrub complexity
   ```typescript
   scrub: 1, // Higher = smoother
   ```

2. Use `will-change` CSS
   ```css
   .animated { will-change: transform; }
   ```

3. Simplify mobile animations
   ```typescript
   if (isMobile()) {
     // Simpler animation
   }
   ```

### Issue: Animation plays every time

**Solution:** Use correct toggle actions
```typescript
scrollTrigger: {
  toggleActions: 'play none none reverse',
  // onEnter onLeave onEnterBack onLeaveBack
}
```

### Issue: Memory leak after navigation

**Solution:** Always cleanup
```typescript
useEffect(() => {
  // animations...

  return () => {
    ScrollTrigger.getAll().forEach(t => t.kill());
  };
}, []);
```

### Issue: Animation delays too long

**Solution:** Adjust start point
```typescript
scrollTrigger: {
  start: 'top 90%', // Trigger earlier
}
```

---

## 📚 Additional Resources

- [GSAP Documentation](https://greensock.com/docs/)
- [ScrollTrigger Demos](https://greensock.com/st-demos/)
- [GSAP Easing Visualizer](https://greensock.com/ease-visualizer/)
- [Performance Best Practices](https://web.dev/animations/)

---

## 🎯 Next Steps

1. ✅ Replace components with enhanced versions
2. ✅ Apply global GSAP config in `_app.tsx`
3. ✅ Test on multiple devices
4. ✅ Run Lighthouse audit
5. ✅ Add character animations to hero heading (optional)
6. ✅ Implement magnetic buttons on CTAs
7. ✅ Add parallax to About section background

**Happy animating! 🚀**
