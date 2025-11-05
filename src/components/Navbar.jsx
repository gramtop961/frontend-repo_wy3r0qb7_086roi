import React, { useState, useCallback } from 'react';
import { Home, Briefcase, User, Mail, Menu, X } from 'lucide-react';

function NavbarInner() {
  const [open, setOpen] = useState(false);

  const scrollTo = useCallback((id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setOpen(false);
  }, []);

  return (
    <>
      {/* Mobile top bar */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md supports-[backdrop-filter]:bg-black/40 border-b border-white/10 lg:hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <button onClick={() => scrollTo('home')} className="text-base font-medium tracking-tight text-white/90 hover:text-white focus:outline-none">
              <span className="font-semibold">Nova</span>Layout
            </button>
            <button className="p-2 text-white/80" aria-label="Toggle menu" onClick={() => setOpen((v) => !v)}>
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
          {open && (
            <div className="pb-4 flex flex-col gap-3 text-white/80">
              <button onClick={() => scrollTo('home')} className="text-left hover:text-white flex items-center gap-2"><Home size={16}/> Home</button>
              <button onClick={() => scrollTo('projects')} className="text-left hover:text-white flex items-center gap-2"><Briefcase size={16}/> Projects</button>
              <button onClick={() => scrollTo('about')} className="text-left hover:text-white flex items-center gap-2"><User size={16}/> About</button>
              <button onClick={() => scrollTo('contact')} className="text-left hover:text-white flex items-center gap-2"><Mail size={16}/> Contact</button>
            </div>
          )}
        </div>
      </header>

      {/* Desktop floating sidebar */}
      <aside className="hidden lg:flex fixed top-0 left-0 z-50 h-screen w-[78px] flex-col items-center justify-between py-6 border-r border-white/10 bg-black/30 backdrop-blur-xl">
        <button onClick={() => scrollTo('home')} className="text-white/90 hover:text-white text-sm font-semibold">NL</button>
        <nav className="flex flex-col items-center gap-6 text-white/70">
          <button onClick={() => scrollTo('home')} className="hover:text-white p-2 rounded-md border border-transparent hover:border-white/20">
            <Home size={18} />
          </button>
          <button onClick={() => scrollTo('projects')} className="hover:text-white p-2 rounded-md border border-transparent hover:border-white/20">
            <Briefcase size={18} />
          </button>
          <button onClick={() => scrollTo('about')} className="hover:text-white p-2 rounded-md border border-transparent hover:border-white/20">
            <User size={18} />
          </button>
          <button onClick={() => scrollTo('contact')} className="hover:text-white p-2 rounded-md border border-transparent hover:border-white/20">
            <Mail size={18} />
          </button>
        </nav>
        <div className="text-[10px] text-white/50">v1</div>
      </aside>

      {/* spacer on desktop so content doesn't hide under sidebar */}
      <div className="hidden lg:block w-[78px]" aria-hidden />
    </>
  );
}

export default React.memo(NavbarInner);
