import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import About from './components/About';
import Contact from './components/Contact';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  return (
    <div className="bg-black text-white min-h-screen font-[Inter] antialiased selection:bg-cyan-400/20 selection:text-white">
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.main
          key="page"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          <Hero />

          {/* Section wrapper with redesigned rhythm */}
          <section className="relative">
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(1200px_600px_at_50%_-10%,rgba(34,211,238,0.08),transparent)]" />
            <Projects />
            <div className="border-t border-white/10" />
            <About />
            <div className="border-t border-white/10" />
            <Contact />
          </section>
        </motion.main>
      </AnimatePresence>
      <footer className="border-t border-white/10 py-8 text-center text-xs text-white/60">
        © {new Date().getFullYear()} NovaLayout — Crafted with motion and clarity.
      </footer>
    </div>
  );
}

export default App;
