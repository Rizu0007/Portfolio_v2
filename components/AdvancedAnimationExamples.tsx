/**
 * Advanced Animation Examples Component
 *
 * This file demonstrates advanced GSAP techniques you can implement in your portfolio.
 * Copy and adapt these patterns for your specific needs.
 *
 * Examples included:
 * 1. Magnetic link with custom cursor
 * 2. Text reveal with mask animation
 * 3. Image parallax with scale
 * 4. Hover card with 3D tilt
 * 5. Morphing shapes
 * 6. Scroll-linked color changes
 */

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useMagneticButton } from '@/hooks/useMagneticButton';
import { useParallax } from '@/hooks/useParallax';

// ========== EXAMPLE 1: Magnetic Link with Custom Cursor ==========
export const MagneticLink = ({ href, children }) => {
  const linkRef = useMagneticButton({ strength: 0.25 });
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const link = linkRef.current;
    const cursor = cursorRef.current;
    if (!link || !cursor) return;

    const handleMouseMove = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX - cursor.offsetWidth / 2,
        y: e.clientY - cursor.offsetHeight / 2,
        duration: 0.3,
      });
    };

    const handleMouseEnter = () => {
      gsap.to(cursor, { scale: 1.5, duration: 0.3 });
    };

    const handleMouseLeave = () => {
      gsap.to(cursor, { scale: 0, duration: 0.3 });
    };

    link.addEventListener('mousemove', handleMouseMove);
    link.addEventListener('mouseenter', handleMouseEnter);
    link.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      link.removeEventListener('mousemove', handleMouseMove);
      link.removeEventListener('mouseenter', handleMouseEnter);
      link.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <>
      <a ref={linkRef} href={href} className="magnetic-link">
        {children}
      </a>
      <div
        ref={cursorRef}
        className="fixed pointer-events-none w-8 h-8 bg-blue-500 rounded-full mix-blend-difference scale-0 z-50"
      />
    </>
  );
};

// ========== EXAMPLE 2: Text Reveal with Mask Animation ==========
export const TextReveal = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const text = container.querySelector('.text');
    const mask = container.querySelector('.mask');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top 75%',
      },
    });

    tl.fromTo(
      mask,
      { scaleX: 0 },
      { scaleX: 1, duration: 0.8, ease: 'power3.inOut' }
    ).to(
      mask,
      { scaleX: 0, transformOrigin: 'right', duration: 0.8, ease: 'power3.inOut' },
      '+=0.2'
    );
  }, [children]);

  return (
    <div ref={containerRef} className="relative overflow-hidden inline-block">
      <span className="text">{children}</span>
      <div className="mask absolute inset-0 bg-blue-500 origin-left" />
    </div>
  );
};

// ========== EXAMPLE 3: Image Parallax with Scale ==========
export const ParallaxImage = ({ src, alt }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !imageRef.current) return;

    // Image moves slower than container (parallax)
    gsap.to(imageRef.current, {
      y: -50,
      scale: 1.1,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
    });
  }, []);

  return (
    <div ref={containerRef} className="relative h-96 overflow-hidden">
      <div
        ref={imageRef}
        className="absolute inset-0 bg-cover bg-center scale-110"
        style={{ backgroundImage: `url(${src})` }}
      />
    </div>
  );
};

// ========== EXAMPLE 4: Hover Card with 3D Tilt ==========
export const TiltCard = ({ children }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = card.getBoundingClientRect();
      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;

      const rotateX = (y - 0.5) * 20; // -10 to 10 degrees
      const rotateY = (x - 0.5) * -20; // 10 to -10 degrees

      gsap.to(card, {
        rotationX: rotateX,
        rotationY: rotateY,
        duration: 0.5,
        ease: 'power2.out',
        transformPerspective: 1000,
      });
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        rotationX: 0,
        rotationY: 0,
        duration: 0.5,
        ease: 'power2.out',
      });
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className="p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
    </div>
  );
};

// ========== EXAMPLE 5: Morphing Shape ==========
export const MorphingShape = () => {
  const shapeRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (!shapeRef.current) return;

    const shapes = [
      'M50,10 L90,90 L10,90 Z', // Triangle
      'M10,50 Q50,10 90,50 Q50,90 10,50 Z', // Diamond
      'M50,10 A40,40 0 1,1 49.9,10 Z', // Circle
    ];

    gsap.to(shapeRef.current, {
      attr: { d: shapes[1] },
      duration: 1,
      ease: 'power2.inOut',
      repeat: -1,
      yoyo: true,
      repeatDelay: 0.5,
    });
  }, []);

  return (
    <svg viewBox="0 0 100 100" className="w-32 h-32">
      <path
        ref={shapeRef}
        d="M50,10 L90,90 L10,90 Z"
        fill="currentColor"
        className="text-blue-500"
      />
    </svg>
  );
};

// ========== EXAMPLE 6: Scroll-Linked Color Change ==========
export const ColorChangeSection = ({ children }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [bgColor, setBgColor] = useState('rgb(255, 255, 255)');

  useEffect(() => {
    if (!sectionRef.current) return;

    gsap.to(sectionRef.current, {
      backgroundColor: 'rgb(59, 130, 246)', // blue-500
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top center',
        end: 'bottom center',
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;
          const r = Math.floor(255 - progress * (255 - 59));
          const g = Math.floor(255 - progress * (255 - 130));
          const b = Math.floor(255 - progress * (255 - 246));
          setBgColor(`rgb(${r}, ${g}, ${b})`);
        },
      },
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{ backgroundColor: bgColor }}
      className="min-h-screen flex items-center justify-center transition-colors"
    >
      {children}
    </section>
  );
};

// ========== EXAMPLE 7: Infinite Marquee ==========
export const InfiniteMarquee = ({ items }) => {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!marqueeRef.current) return;

    const marquee = marqueeRef.current;
    const width = marquee.scrollWidth / 2;

    gsap.to(marquee, {
      x: -width,
      duration: 20,
      ease: 'none',
      repeat: -1,
    });
  }, [items]);

  return (
    <div className="overflow-hidden">
      <div ref={marqueeRef} className="flex whitespace-nowrap">
        {[...items, ...items].map((item, index) => (
          <div key={index} className="inline-block px-4">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

// ========== EXAMPLE 8: Staggered Grid Reveal ==========
export const StaggeredGrid = ({ items }) => {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;

    const cells = gridRef.current.querySelectorAll('.grid-cell');

    gsap.fromTo(
      cells,
      {
        opacity: 0,
        scale: 0.8,
        rotationY: -90,
      },
      {
        opacity: 1,
        scale: 1,
        rotationY: 0,
        duration: 0.6,
        stagger: {
          each: 0.05,
          from: 'center',
          grid: 'auto',
        },
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 75%',
        },
      }
    );
  }, [items]);

  return (
    <div ref={gridRef} className="grid grid-cols-4 gap-4">
      {items.map((item, index) => (
        <div
          key={index}
          className="grid-cell aspect-square bg-gray-200 dark:bg-gray-800 rounded-lg"
        >
          {item}
        </div>
      ))}
    </div>
  );
};

// ========== EXAMPLE 9: Typewriter Effect ==========
export const Typewriter = ({ text, speed = 0.05 }) => {
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    const chars = text.split('');
    textRef.current.textContent = '';

    chars.forEach((char, i) => {
      gsap.to(textRef.current, {
        duration: 0,
        delay: i * speed,
        onComplete: () => {
          if (textRef.current) {
            textRef.current.textContent += char;
          }
        },
      });
    });
  }, [text, speed]);

  return <span ref={textRef} />;
};

// ========== EXAMPLE 10: Scroll Progress Bar ==========
export const ScrollProgress = () => {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!progressRef.current) return;

    gsap.to(progressRef.current, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3,
      },
    });
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
      <div
        ref={progressRef}
        className="h-full bg-blue-500 origin-left scale-x-0"
      />
    </div>
  );
};

// ========== USAGE EXAMPLE ==========
const AdvancedAnimationShowcase = () => {
  return (
    <div className="space-y-32 py-20">
      <section>
        <h2 className="text-3xl mb-8">Magnetic Link</h2>
        <MagneticLink href="/projects">View Projects</MagneticLink>
      </section>

      <section>
        <h2 className="text-3xl mb-8">Text Reveal</h2>
        <TextReveal>This text reveals with a mask animation</TextReveal>
      </section>

      <section>
        <h2 className="text-3xl mb-8">3D Tilt Card</h2>
        <TiltCard>
          <h3>Hover over me!</h3>
          <p>Watch the 3D tilt effect</p>
        </TiltCard>
      </section>

      <section>
        <h2 className="text-3xl mb-8">Morphing Shape</h2>
        <MorphingShape />
      </section>

      <section>
        <h2 className="text-3xl mb-8">Typewriter Effect</h2>
        <Typewriter text="This text types out automatically..." />
      </section>

      <section>
        <h2 className="text-3xl mb-8">Staggered Grid</h2>
        <StaggeredGrid items={Array.from({ length: 16 }, (_, i) => `Item ${i + 1}`)} />
      </section>

      <ColorChangeSection>
        <h2 className="text-4xl text-white">Scroll to see color change</h2>
      </ColorChangeSection>

      <ScrollProgress />
    </div>
  );
};

export default AdvancedAnimationShowcase;
