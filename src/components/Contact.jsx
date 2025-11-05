import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Github, Mail } from 'lucide-react';

function ContactInner() {
  const reduce = useReducedMotion();
  return (
    <section id="contact" className="relative bg-black py-24 sm:py-28 border-t border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={reduce ? { opacity: 1 } : { opacity: 0, y: 20 }}
          whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="rounded-3xl border border-white/10 bg-gradient-to-br from-fuchsia-500/10 via-purple-500/5 to-blue-500/10 p-8 sm:p-12 text-center"
        >
          <h2 className="text-2xl sm:text-3xl font-semibold text-white">Let’s build something stellar</h2>
          <p className="mt-3 text-white/70 max-w-2xl mx-auto">
            I’m available for freelance and full-time roles. Open to ambitious collaborations that push the web forward.
          </p>

          <div className="mt-8 flex items-center justify-center gap-3">
            <a
              href="mailto:your.email@example.com"
              className="inline-flex items-center gap-2 rounded-full bg-white text-black px-5 py-2.5 text-sm font-medium shadow/50 shadow-white/10 hover:shadow-white/20 transition"
            >
              <Mail size={16} /> Email me
            </a>
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 text-white px-5 py-2.5 text-sm font-medium hover:bg-white/10 transition"
            >
              <Github size={16} /> GitHub
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default React.memo(ContactInner);
