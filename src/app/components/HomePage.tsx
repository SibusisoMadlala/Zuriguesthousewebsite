import React from 'react';
import { CheckCircle } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useBooking } from '../contexts/BookingContext';

function BracketButton({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="relative inline-block px-12 py-4 text-white text-xs tracking-[0.3em] uppercase hover:bg-white/10 transition-colors"
    >
      <span className="absolute top-0 left-0 w-7 h-7 border-t-2 border-l-2 border-white/65" />
      <span className="absolute bottom-0 right-0 w-7 h-7 border-b-2 border-r-2 border-white/65" />
      {children}
    </button>
  );
}

export function HomePage() {
  const { openBooking } = useBooking();
  const checklist = [
    {
      title: '40 Minutes from King Shaka Airport',
      desc: 'Easy access for all travellers, with our own transport service available',
    },
    {
      title: '5 Minutes to Quiet Uncrowded Beaches',
      desc: 'Serene coastal escapes right at your doorstep on Durban\'s south coast',
    },
    {
      title: 'In-House Chef & Personalised Hospitality',
      desc: 'Delicious homemade meals and warm, tailored African hospitality',
    },
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
    <div id="home">
      {/* Hero */}
      <section className="relative min-h-screen flex items-end">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1731336478850-6bce7235e320?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBiZWRyb29tJTIwaG90ZWx8ZW58MXx8fHwxNzYzNjQyMDg0fDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Zuri Village luxury bedroom"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#3E1C0A]/82" />
        </div>

        <div className="relative z-10 w-full px-8 lg:px-16 pb-16 lg:pb-24">
          {/* Display heading */}
          <div className="mb-10 lg:mb-14">
            <h1
              className="text-white leading-none"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 'clamp(5.5rem, 16vw, 16rem)',
                fontWeight: 600,
                letterSpacing: '-0.02em',
                lineHeight: 0.88,
              }}
            >
              ZURI
              <br />
              VILLAGE
            </h1>
            <p className="text-white/60 mt-5 text-xs tracking-[0.35em] uppercase font-light">
              Authentic African Living &mdash; Illovo, Durban
            </p>
          </div>

          {/* Checklist */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mb-14">
            {checklist.map((item, i) => (
              <div key={i} className="flex items-start gap-4">
                <CheckCircle
                  className="text-white/65 flex-shrink-0 mt-0.5"
                  size={20}
                  strokeWidth={1.25}
                />
                <div>
                  <p className="text-white/90 text-sm font-light leading-snug">{item.title}</p>
                  <p className="text-white/50 text-xs mt-1.5 leading-relaxed font-light">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom row */}
          <div className="flex flex-col sm:flex-row sm:items-end gap-8">
            <BracketButton onClick={() => openBooking()}>
              Book Now
            </BracketButton>

            {/* Contact mini-panel */}
            <div className="bg-[#8C7040]/75 backdrop-blur-sm px-6 py-4 sm:ml-auto">
              <p className="text-white/55 text-[10px] tracking-[0.28em] uppercase mb-2 font-light">
                Our Contact
              </p>
              <p className="text-white text-sm font-light">+27 713 422 547</p>
              <p className="text-white text-sm font-light">+27 825 604 590</p>
            </div>
          </div>
        </div>
      </section>

      {/* Welcome strip */}
      <section className="py-20 px-8 lg:px-16 bg-[#8C7040]">
        <div className="max-w-screen-xl mx-auto">
          <h2
            className="text-white mb-6 leading-tight"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              fontWeight: 500,
            }}
          >
            Welcome to Zuri Village Escapes
          </h2>
          <p className="text-white/65 leading-relaxed max-w-2xl text-sm font-light">
            A family-run guest house where the warmth of African hospitality meets the beauty of
            Durban's south coast. Nestled amongst rolling hills and sugarcane fields, just minutes
            from quiet beaches and nature trails—our home is yours.
          </p>
        </div>
      </section>
    </div>
  );
}
