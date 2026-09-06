import React from 'react';
import { CheckCircle } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useBooking } from '../contexts/BookingContext';

import coverImage from '../../assets/images/coverImage.jpeg';
import themeImage from '../../assets/images/zuri theme.jpeg';
import heroMainView from '../../assets/images/zuri-hero-main-view.jpeg';

function BracketButton({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="relative inline-block px-10 py-3.5 text-white text-[10px] tracking-[0.28em] uppercase hover:bg-white/10 transition-colors"
    >
      <span className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-white/65" />
      <span className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-white/65" />
      {children}
    </button>
  );
}

export function HomePage() {
  const { openBooking } = useBooking();
  const checklist = [
    {
      title: '40 minutes from King Shaka Airport',
      desc: 'Easy arrivals with private transfer support available',
    },
    {
      title: '5 minutes to quiet, uncrowded beaches',
      desc: 'Serene coastal escapes on Durban\'s south coast',
    },
    {
      title: 'In-house chef & personalised hospitality',
      desc: 'Homemade meals and a warm, tailored guest experience',
    },
  ];

  return (
    <div id="home">
      {/* Hero */}
      <section className="relative min-h-[88vh] lg:min-h-[92vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src={coverImage}
            alt="Zuri Village luxury bedroom"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#3E1C0A]/82" />
        </div>

        <div className="relative z-10 w-full px-6 pb-10 pt-20 lg:px-16 lg:pb-18">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 max-w-2xl lg:mb-10">
              <h1
                className="text-white leading-none"
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: 'clamp(4rem, 9vw, 8.5rem)',
                  fontWeight: 600,
                  letterSpacing: '-0.03em',
                  lineHeight: 0.86,
                }}
              >
                ZURI
                <br />
                VILLAGE
              </h1>
              <p className="text-white/65 mt-4 text-[10px] tracking-[0.35em] uppercase font-light">
                Authentic African Living &mdash; Illovo, Durban
              </p>
            </div>

            <div className="flex flex-col gap-6 lg:gap-8">
              <div className="grid grid-cols-1 gap-3 md:grid-cols-3 max-w-5xl">
                {checklist.map((item, i) => (
                  <div
                    key={i}
                    className="rounded-sm border border-white/10 bg-white/[0.04] p-4 backdrop-blur-[2px]"
                  >
                    <div className="flex items-start gap-3">
                      <CheckCircle
                        className="text-white/75 flex-shrink-0 mt-0.5"
                        size={18}
                        strokeWidth={1.4}
                      />
                      <div>
                        <p className="text-white/90 text-sm font-light leading-snug">{item.title}</p>
                        <p className="text-white/55 text-[11px] mt-1.5 leading-relaxed font-light">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                <BracketButton onClick={() => openBooking()}>Book Now</BracketButton>

                <div className="bg-[#8C7040]/75 backdrop-blur-sm px-5 py-3.5 w-full max-w-xs sm:ml-auto">
                  <p className="text-white/55 text-[10px] tracking-[0.28em] uppercase mb-2 font-light">
                    Our Contact
                  </p>
                  <p className="text-white text-sm font-light">+27 713 422 547</p>
                  <p className="text-white text-sm font-light">+27 825 604 590</p>
                </div>
              </div>
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
