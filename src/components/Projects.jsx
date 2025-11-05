import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const projects = [
  {
    title: 'Neon Commerce',
    description: 'A blazing-fast, headless storefront with fluid page transitions and 3D product views.',
    tags: ['Next.js', 'WebGL', 'Stripe'],
  },
  {
    title: 'Orbit Dashboard',
    description: 'Realtime analytics with buttery micro-interactions and delightful data viz.',
    tags: ['React', 'Framer Motion', 'D3'],
  },
  {
    title: 'Astra Portfolio',
    description: 'Immersive developer portfolio with Spline scenes and adaptive theming.',
    tags: ['Vite', 'Spline', 'Tailwind'],
  },
];

const fadeIn = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: 0.06 + i * 0.06, duration: 0.45, ease: [0.22, 1, 0.36, 1] } }),
};

function ProjectsInner() {
  const reduce = useReducedMotion();
  return (
    <section id="projects" className="relative bg-black py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={reduce ? { opacity: 1 } : { opacity: 0, y: 10 }}
          whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.45 }}
          className="text-2xl sm:text-3xl font-semibold text-white"
        >
          Featured Projects
        </motion.h2>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <motion.article
              key={p.title}
              initial={reduce ? { opacity: 1 } : 'hidden'}
              whileInView={reduce ? { opacity: 1 } : 'show'}
              viewport={{ once: true, amount: 0.35 }}
              variants={fadeIn}
              custom={i}
              className="group relative rounded-2xl border border-white/10 bg-white/5 hover:bg-white/[0.08] transition-colors overflow-hidden"
            >
              <div className="aspect-[16/10] bg-gradient-to-br from-fuchsia-500/30 via-purple-500/20 to-cyan-500/30" />
              <div className="p-5">
                <h3 className="text-lg font-medium text-white group-hover:text-white">{p.title}</h3>
                <p className="mt-2 text-sm text-white/70">{p.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span key={t} className="rounded-full bg-white/10 text-white/80 text-xs px-2.5 py-1">{t}</span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default React.memo(ProjectsInner);
