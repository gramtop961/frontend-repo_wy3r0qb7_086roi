import React, { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

// Lazy-load Spline to keep initial JS bundle small and improve time-to-interactive
const LazySpline = lazy(() => import('@splinetool/react-spline'));

function HeroInner() {
  const shouldReduceMotion = useReducedMotion();
  const [mountSpline, setMountSpline] = useState(false);
  const sectionRef = useRef(null);

  // interactive mouse parallax + glow
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const rafRef = useRef(0);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setMountSpline(true);
    } else {
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
    }
  }, []);

  // Mouse tracking for parallax and glow
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const handleMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMouse({ x, y });

      if (shouldReduceMotion) return;

      // Smooth parallax via rAF lerp
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const cx = x - rect.width / 2;
        const cy = y - rect.height / 2;
        const px = Math.max(Math.min(cx / (rect.width / 2), 1), -1);
        const py = Math.max(Math.min(cy / (rect.height / 2), 1), -1);
        // Smaller translate for subtle effect
        setParallax({ x: px * 10, y: py * 10 });
      });
    };

    const handleLeave = () => {
      setParallax({ x: 0, y: 0 });
    };

    el.addEventListener('mousemove', handleMove);
    el.addEventListener('mouseleave', handleLeave);
    return () => {
      el.removeEventListener('mousemove', handleMove);
      el.removeEventListener('mouseleave', handleLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, [shouldReduceMotion]);

  return (
    <section ref={sectionRef} id="home" className="relative min-h-screen w-full bg-black overflow-hidden">
      {/* 3D Scene container (no negative z-index) */}
      <div className="absolute inset-0 will-change-transform [contain:layout_paint_size]">
        <Suspense fallback={<div className="h-full w-full bg-gradient-to-b from-[#0b0b0b] to-black" />}> 
          {mountSpline ? (
            <LazySpline
              scene="https://prod.spline.design/WCoEDSwacOpKBjaC/scene.splinecode"
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

      {/* Cursor-follow glow - does not block canvas interaction */}
      <div
        className="pointer-events-none absolute size-80 rounded-full opacity-30 blur-3xl"
        style={{
          left: mouse.x - 160,
          top: mouse.y - 160,
          background: 'radial-gradient(closest-side, rgba(56,189,248,0.35), rgba(244,63,94,0.2), transparent)',
          transition: shouldReduceMotion ? 'none' : 'transform 120ms ease-out',
          transform: `translate3d(0,0,0)`
        }}
      />

      {/* Content overlay */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-28 pb-24">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
          animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 sm:p-8 shadow-[0_0_90px_-25px_rgba(56,189,248,0.45)]"
          style={{
            transform: shouldReduceMotion ? undefined : `translate3d(${parallax.x}px, ${parallax.y}px, 0)`,
            willChange: shouldReduceMotion ? undefined : 'transform'
          }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-3 py-1 text-xs text-white/70">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_12px_2px_rgba(34,211,238,0.8)]" />
            Innovative Interfaces • Now
          </div>
          <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white">
            Modular, Modern, Motion-first
          </h1>
          <p className="mt-4 text-base sm:text-lg text-white/80">
            A redesigned layout with a cinematic interactive cover and a clean corporate aesthetic.
          </p>
          <div className="mt-8 flex items-center gap-3">
            <a href="#projects" className="group inline-flex items-center rounded-full bg-gradient-to-r from-cyan-400 to-rose-500 text-black px-5 py-2.5 text-sm font-medium shadow/50 shadow-white/10 transition hover:brightness-110">
              Explore Work
            </a>
            <a href="#contact" className="inline-flex items-center rounded-full border border-white/30 text-white px-5 py-2.5 text-sm font-medium hover:bg-white/10 transition">
              Contact
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default React.memo(HeroInner);
