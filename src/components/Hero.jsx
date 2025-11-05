import React, { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

// Lazy-load Spline to keep initial JS bundle small and improve time-to-interactive
const LazySpline = lazy(() => import('@splinetool/react-spline'));

function HeroInner() {
  const shouldReduceMotion = useReducedMotion();
  const [mountSpline, setMountSpline] = useState(false);
  const sectionRef = useRef(null);

  // Mount the Spline scene only when the hero is near/in view to reduce initial load
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setMountSpline(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setMountSpline(true);
            io.disconnect();
          }
        });
      },
      { root: null, rootMargin: '200px', threshold: 0.01 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="home" className="relative min-h-screen w-full bg-black overflow-hidden">
      {/* 3D Scene container (no negative z-index) */}
      <div className="absolute inset-0 will-change-transform [contain:layout_paint_size]">
        <Suspense fallback={<div className="h-full w-full bg-gradient-to-b from-[#0b0b0b] to-black" />}> 
          {mountSpline ? (
            <LazySpline
              scene="https://prod.spline.design/4Zh-Q6DWWp5yPnQf/scene.splinecode"
              style={{ width: '100%', height: '100%' }}
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-b from-[#0b0b0b] to-black" />
          )}
        </Suspense>
      </div>

      {/* Subtle gradient edges that don't block interaction */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/70 to-transparent" />

      {/* Content overlay */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-28 pb-24">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
          animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 sm:p-8 shadow-[0_0_60px_-20px_rgba(168,85,247,0.35)]"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-3 py-1 text-xs text-white/70">
            <span className="h-1.5 w-1.5 rounded-full bg-fuchsia-500 shadow-[0_0_10px_2px_rgba(217,70,239,0.7)]" />
            Live • Futuristic UI
          </div>
          <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white">
            Futuristic Web Experiences
          </h1>
          <p className="mt-4 text-base sm:text-lg text-white/80">
            I craft interactive, high-performance websites with cinematic motion. Explore my work below.
          </p>
          <div className="mt-8 flex items-center gap-3">
            <a href="#projects" className="inline-flex items-center rounded-full bg-white text-black px-5 py-2.5 text-sm font-medium shadow/50 shadow-white/10 hover:shadow-white/20 transition">
              View Projects
            </a>
            <a href="#contact" className="inline-flex items-center rounded-full border border-white/30 text-white px-5 py-2.5 text-sm font-medium hover:bg-white/10 transition">
              Get in touch
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default React.memo(HeroInner);
