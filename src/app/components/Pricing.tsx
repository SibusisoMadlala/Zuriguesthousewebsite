import React from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useBooking } from '../contexts/BookingContext';

function BracketButton({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="relative inline-block px-10 py-4 text-white text-xs tracking-[0.28em] uppercase hover:bg-white/10 transition-colors font-light"
    >
      <span className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-white/60" />
      <span className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-white/60" />
      {children}
    </button>
  );
}

const rooms = [
  {
    id: 'standard',
    num: '01',
    name: 'Standard En-Suite',
    price: 'R650',
    per: 'per night',
    features: ['Private en-suite bathroom', 'Comfortable bedding', 'Daily housekeeping'],
    image:
      'https://images.unsplash.com/photo-1505576391880-b3f9d713dc4f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwdmlsbGElMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjM3MjgyODh8MA&ixlib=rb-4.1.0&q=80&w=600',
  },
  {
    id: 'deluxe',
    num: '02',
    name: 'Deluxe En-Suite',
    price: 'R750',
    per: 'per night',
    features: ['Spacious room', 'Private en-suite', 'Premium amenities', 'Garden view'],
    image:
      'https://images.unsplash.com/photo-1607712617949-8c993d290809?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBhZnJpY2FuJTIwZ3Vlc3QlMjBob3VzZXxlbnwxfHx8fDE3NjM3MjY4NDF8MA&ixlib=rb-4.1.0&q=80&w=600',
  },
  {
    id: 'king',
    num: '03',
    name: 'King En-Suite',
    price: 'R985',
    per: 'per night',
    features: ['King-size bed', 'Luxury bathroom', 'Premium amenities', 'Best views'],
    image:
      'https://images.unsplash.com/photo-1731336478850-6bce7235e320?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBiZWRyb29tJTIwaG90ZWx8ZW58MXx8fHwxNzYzNjQyMDg0fDA&ixlib=rb-4.1.0&q=80&w=600',
  },
];

export function Pricing() {
  const { openBooking } = useBooking();
  return (
    <div id="pricing" className="bg-[#8C7040]">
      {/* ── OUR VISION style ── */}
      <section className="min-h-screen flex flex-col lg:flex-row">
        {/* Left / main: 3 photos + 3 cards */}
        <div className="flex-1">
          {/* Top: 3 room photos */}
          <div className="grid grid-cols-3 gap-1.5 p-1.5">
            {rooms.map((room) => (
              <div key={room.num} className="overflow-hidden aspect-[4/3]">
                <ImageWithFallback
                  src={room.image}
                  alt={room.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>

          {/* Bottom: 3 price cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-1.5 px-1.5 pb-1.5">
            {rooms.map((room) => (
              <div
                key={room.num}
                className="bg-[#7A6030]/70 border border-white/15 px-6 py-7 text-center group"
              >
                <p
                  className="text-white/55 text-xs tracking-[0.2em] uppercase mb-3 font-light"
                >
                  {room.num}. Room Type
                </p>
                <h3
                  className="text-white mb-3 leading-tight"
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: '1.4rem',
                    fontWeight: 500,
                  }}
                >
                  {room.name}
                </h3>
                <p
                  className="text-white text-2xl mb-1"
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontWeight: 600,
                  }}
                >
                  {room.price}
                </p>
                <p className="text-white/50 text-xs tracking-widest uppercase mb-5 font-light">
                  {room.per}
                </p>
                <ul className="space-y-2 text-left mb-5">
                  {room.features.map((f) => (
                    <li key={f} className="text-white/60 text-xs font-light flex items-start gap-2">
                      <span className="text-white/40 mt-0.5">—</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => openBooking(room.id)}
                  className="w-full relative py-2.5 text-white text-[10px] tracking-[0.22em] uppercase font-light hover:bg-white/10 transition-colors border border-white/25 hover:border-white/50"
                >
                  Select Room
                </button>
              </div>
            ))}
          </div>

          {/* Catering strip */}
          <div className="px-6 py-8 border-t border-white/15">
            <p
              className="text-white/60 text-xs tracking-[0.2em] uppercase mb-4 font-light"
            >
              Catering Services
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl">
              <div>
                <p
                  className="text-white mb-1"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '1.2rem', fontWeight: 500 }}
                >
                  Breakfast
                </p>
                <p className="text-white/55 text-xs font-light leading-relaxed">
                  Full-house offering — bacon, eggs, toast, cheese, sausage & bottomless coffee
                </p>
                <p className="text-white mt-2" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '1.3rem', fontWeight: 600 }}>R200 <span className="text-white/40 text-xs font-light" style={{ fontFamily: "'Jost', sans-serif" }}>/ person</span></p>
              </div>
              <div>
                <p
                  className="text-white mb-1"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '1.2rem', fontWeight: 500 }}
                >
                  Lunch &amp; Dinner
                </p>
                <p className="text-white/55 text-xs font-light leading-relaxed">
                  Fresh, local ingredients prepared by our in-house chef — available on request
                </p>
                <p className="text-white/60 mt-2 text-xs font-light tracking-widest uppercase">Custom pricing</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: "Pricing" display + CTA */}
        <div className="lg:w-72 xl:w-80 px-10 py-14 flex flex-col items-start justify-between bg-[#7A6030]/50 border-l border-white/10">
          <h2
            className="text-white leading-none"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(3.5rem, 5vw, 6rem)',
              fontWeight: 600,
              lineHeight: 0.88,
            }}
          >
            Our
            <br />
            Pricing
          </h2>
          <div className="mt-auto pt-16">
            <p className="text-white/55 text-xs font-light leading-relaxed mb-8">
              We can accommodate up to 20 guests. Contact us for group rates and special packages.
            </p>
            <BracketButton onClick={() => openBooking()}>
              Book Now
            </BracketButton>
          </div>
        </div>
      </section>
    </div>
  );
}
