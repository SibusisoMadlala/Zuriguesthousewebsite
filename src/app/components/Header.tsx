import React from 'react';
import {
  Bed,
  BookOpen,
  Camera,
  Home,
  MapPinned,
  Phone,
  Receipt,
} from 'lucide-react';
import { useBooking } from '../contexts/BookingContext';

export function Header() {
  const { openBooking } = useBooking();

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'our-home', label: 'Our Home', icon: Bed },
    { id: 'gallery', label: 'Gallery', icon: Camera },
    { id: 'location', label: 'Location', icon: MapPinned },
    { id: 'pricing', label: 'Pricing', icon: Receipt },
    { id: 'contact', label: 'Contact', icon: Phone },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-[#2A1408]/75 backdrop-blur-sm">
      <div className="mx-auto flex max-w-screen-2xl items-center justify-between px-6 py-4 lg:px-10">
        <nav className="hidden items-center gap-10 lg:flex">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="text-xs font-light uppercase tracking-[0.18em] text-white/75 transition-colors hover:text-white"
            >
              {item.label}
            </button>
          ))}
        </nav>

        <button
          onClick={() => scrollToSection('home')}
          className="text-xs font-light uppercase tracking-[0.2em] text-white lg:hidden"
        >
          Zuri Village
        </button>

        <div className="hidden items-center gap-4 lg:flex">
          <button
            onClick={() => openBooking()}
            className="relative px-6 py-2 text-[10px] font-light uppercase tracking-[0.25em] text-white transition-colors hover:bg-white/10"
          >
            <span className="absolute left-0 top-0 h-4 w-4 border-l border-t border-white/50" />
            <span className="absolute bottom-0 right-0 h-4 w-4 border-b border-r border-white/50" />
            Book Now
          </button>
          <button onClick={() => scrollToSection('home')} className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-[#8C7040]">
              <Bed className="text-white" size={16} strokeWidth={1.5} />
            </div>
            <div className="border border-white/35 px-4 py-2">
              <span className="text-xs font-light uppercase tracking-[0.22em] text-white">
                Zuri Village Escapes
              </span>
            </div>
          </button>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                type="button"
                aria-label={item.label}
                title={item.label}
                onClick={() => scrollToSection(item.id)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
              >
                <Icon size={15} strokeWidth={1.8} />
              </button>
            );
          })}

          <button
            type="button"
            aria-label="Book now"
            title="Book now"
            onClick={() => openBooking()}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[#D9C39B] bg-[#8C7040] text-white transition-colors hover:bg-[#9E7F4E]"
          >
            <BookOpen size={15} strokeWidth={1.8} />
          </button>
        </div>
      </div>
    </header>
  );
}
