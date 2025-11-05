import Spline from '@splinetool/react-spline';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen w-full bg-black overflow-hidden">
      {/* 3D Scene */}
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/EF7JOSsHLk16Tlw9/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Subtle gradient edges that don't block interaction */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/70 to-transparent" />

      {/* Content overlay - positioned, not full-screen to preserve canvas interactivity */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-28 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white">
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
