import React, { useState } from 'react';
import { Menu, X, Bed } from 'lucide-react';
import { useBooking } from '../contexts/BookingContext';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { openBooking } = useBooking();

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'our-home', label: 'Our Home' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'location', label: 'Location' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'contact', label: 'Contact' },
  ];

  const scrollToSection = (sectionId: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#2A1408]/75 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-10 py-4 flex items-center justify-between">
        {/* Desktop nav left */}
        <nav className="hidden lg:flex items-center gap-10">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="text-white/75 hover:text-white text-xs tracking-[0.18em] uppercase transition-colors font-light"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Mobile: name */}
        <button
          onClick={() => scrollToSection('home')}
          className="lg:hidden text-white text-xs tracking-[0.2em] uppercase font-light"
        >
          Zuri Village
        </button>

        {/* Right: book button + brand logo */}
        <div className="hidden lg:flex items-center gap-4">
          <button
            onClick={() => openBooking()}
            className="relative px-6 py-2 text-white text-[10px] tracking-[0.25em] uppercase font-light hover:bg-white/10 transition-colors"
          >
            <span className="absolute top-0 left-0 w-4 h-4 border-t border-l border-white/50" />
            <span className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-white/50" />
            Book Now
          </button>
          <button
            onClick={() => scrollToSection('home')}
            className="flex items-center gap-3"
          >
            <div className="w-9 h-9 rounded-full bg-[#8C7040] border border-white/30 flex items-center justify-center">
              <Bed className="text-white" size={16} strokeWidth={1.5} />
            </div>
            <div className="border border-white/35 px-4 py-2">
              <span className="text-white text-xs tracking-[0.22em] uppercase font-light">
                Zuri Village Escapes
              </span>
            </div>
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden text-white/80 p-1"
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#2A1408]/95 border-t border-white/10">
          <nav className="px-6 py-5 space-y-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="block w-full text-left text-white/75 hover:text-white text-xs tracking-[0.2em] uppercase py-1 font-light"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => { setMobileMenuOpen(false); openBooking(); }}
              className="block w-full text-left text-white text-xs tracking-[0.2em] uppercase py-2 font-light border-t border-white/15 mt-2 pt-4"
            >
              → Book Now
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
