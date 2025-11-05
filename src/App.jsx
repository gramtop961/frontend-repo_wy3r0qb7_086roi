import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import About from './components/About';
import Contact from './components/Contact';

function App() {
  return (
    <div className="bg-black text-white min-h-screen font-[Inter]">
      <Navbar />
      <main>
        <Hero />
        <Projects />
        <About />
        <Contact />
      </main>
      <footer className="border-t border-white/10 py-8 text-center text-xs text-white/60">
        © {new Date().getFullYear()} MyPortfolio — Built with performance and motion.
      </footer>
    </div>
  );
}

export default App;
