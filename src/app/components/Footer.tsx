import React from 'react';
import { Phone, Mail, MapPin, Facebook, Instagram } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function Footer() {
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
    <footer>
      {/* ── THANK YOU / outro ── full-bleed image */}
      <section className="relative py-36 flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1741020804334-942e20412cfb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwb3V0ZG9vciUyMHBhdGlvfGVufDF8fHx8MTc2MzcyODI5MHww&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Zuri Village outdoor patio"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#3E1C0A]/75" />
        </div>

        <div className="relative z-10 text-center px-6">
          <h2
            className="text-white leading-none mb-10"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(3.5rem, 10vw, 10rem)',
              fontWeight: 600,
              lineHeight: 0.88,
              letterSpacing: '-0.02em',
            }}
          >
            ZURI VILLAGE
            <br />
            ESCAPES
          </h2>

          {/* Bracket CTA */}
          <a
            href="mailto:zurivillage.bookings@gmail.com"
            className="relative inline-block px-12 py-4 text-white text-xs tracking-[0.3em] uppercase font-light hover:bg-white/10 transition-colors"
          >
            <span className="absolute top-0 left-0 w-7 h-7 border-t-2 border-l-2 border-white/55" />
            <span className="absolute bottom-0 right-0 w-7 h-7 border-b-2 border-r-2 border-white/55" />
            zurivillage.bookings@gmail.com
          </a>
        </div>
      </section>

      {/* ── Bottom bar ── */}
      <div className="bg-[#3A1A08] px-8 lg:px-16 py-10">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <p
              className="text-white mb-3"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: '1.3rem',
                fontWeight: 500,
              }}
            >
              Zuri Village Escapes
            </p>
            <p className="text-white/45 text-xs font-light leading-relaxed">
              Authentic African living in the heart of Illovo, Durban. A tranquil retreat for
              individuals, families, and small groups.
            </p>
            <div className="flex gap-4 mt-5">
              <a href="#" aria-label="Facebook" className="text-white/40 hover:text-white/75 transition-colors">
                <Facebook size={18} strokeWidth={1.5} />
              </a>
              <a href="#" aria-label="Instagram" className="text-white/40 hover:text-white/75 transition-colors">
                <Instagram size={18} strokeWidth={1.5} />
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="text-white/55 text-[10px] tracking-[0.25em] uppercase mb-4 font-light">
              Contact
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone size={14} strokeWidth={1.5} className="text-white/40 flex-shrink-0" />
                <div className="text-white/50 text-xs font-light">
                  <div>+27 713 422 547</div>
                  <div>+27 825 604 590</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail size={14} strokeWidth={1.5} className="text-white/40 flex-shrink-0 mt-0.5" />
                <span className="text-white/50 text-xs font-light break-all">
                  zurivillage.bookings@gmail.com
                </span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={14} strokeWidth={1.5} className="text-white/40 flex-shrink-0 mt-0.5" />
                <span className="text-white/50 text-xs font-light">
                  10574 Street, Illovu North, 5140
                </span>
              </div>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <p className="text-white/55 text-[10px] tracking-[0.25em] uppercase mb-4 font-light">
              Quick Links
            </p>
            <div className="space-y-2.5">
              {['home', 'our-home', 'gallery', 'location', 'pricing', 'contact'].map((id) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className="block text-white/45 hover:text-white/80 text-xs font-light tracking-widest uppercase transition-colors capitalize"
                >
                  {id.replace('-', ' ')}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 text-center">
          <p className="text-white/30 text-[10px] tracking-[0.25em] uppercase font-light">
            &copy; 2025 Zuri Village Escapes. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
