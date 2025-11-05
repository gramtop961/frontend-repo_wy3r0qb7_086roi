import { motion } from 'framer-motion';

export default function About() {
  return (
    <section id="about" className="relative bg-black py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-10 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl sm:text-3xl font-semibold text-white">About me</h2>
            <p className="mt-4 text-white/80 leading-relaxed">
              I’m a front-end engineer focused on high-fidelity interfaces, motion design, and delightful details.
              My work blends performance and creativity to deliver immersive experiences across devices.
            </p>
            <p className="mt-4 text-white/70">
              Tooling I love: React, Vite, Tailwind, Framer Motion, and Spline for expressive 3D.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl border border-white/10 overflow-hidden"
          >
            <div className="aspect-[16/10] bg-gradient-to-tr from-cyan-400/20 via-fuchsia-400/10 to-purple-400/20" />
            <div className="p-6">
              <ul className="grid grid-cols-2 gap-3 text-sm text-white/80">
                <li>Performance-first</li>
                <li>Accessible UI</li>
                <li>Micro-interactions</li>
                <li>3D on the web</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
