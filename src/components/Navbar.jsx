import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-black/40 border-b border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <button onClick={() => scrollTo('home')} className="text-base font-medium tracking-tight text-white/90 hover:text-white focus:outline-none">
            <span className="font-semibold">My</span>Portfolio
          </button>

          <nav className="hidden md:flex items-center gap-8 text-sm text-white/70">
            <button onClick={() => scrollTo('projects')} className="hover:text-white transition">Projects</button>
            <button onClick={() => scrollTo('about')} className="hover:text-white transition">About</button>
            <button onClick={() => scrollTo('contact')} className="hover:text-white transition">Contact</button>
          </nav>

          <button className="md:hidden p-2 text-white/80" aria-label="Toggle menu" onClick={() => setOpen((v) => !v)}>
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {open && (
          <div className="md:hidden pb-4 flex flex-col gap-3 text-white/80">
            <button onClick={() => scrollTo('projects')} className="text-left hover:text-white">Projects</button>
            <button onClick={() => scrollTo('about')} className="text-left hover:text-white">About</button>
            <button onClick={() => scrollTo('contact')} className="text-left hover:text-white">Contact</button>
          </div>
        )}
      </div>
    </header>
  );
}
