import React from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useBooking } from '../contexts/BookingContext';

import standardRoom from '../../assets/images/zuri-bedroom-1.jpeg';
import deluxeRoom from '../../assets/images/zuri-room-interior-1.jpeg';
import kingRoom from '../../assets/images/zuri-bedroom-2.jpeg';

const rooms = [
  {
    id: 'standard',
    num: '01',
    name: 'Standard En-Suite',
    price: 'R650',
    per: 'per night',
    features: ['Private en-suite bathroom', 'Comfortable bedding', 'Daily housekeeping'],
    image: standardRoom,
  },
  {
    id: 'deluxe',
    num: '02',
    name: 'Deluxe En-Suite',
    price: 'R750',
    per: 'per night',
    features: ['Spacious room', 'Private en-suite', 'Premium amenities', 'Garden view'],
    image: deluxeRoom,
  },
  {
    id: 'king',
    num: '03',
    name: 'King En-Suite',
    price: 'R985',
    per: 'per night',
    features: ['King-size bed', 'Luxury bathroom', 'Premium amenities', 'Best views'],
    image: kingRoom,
  },
];

export function Pricing() {
  const { openBooking } = useBooking();

  return (
    <div id="pricing" className="bg-[#8C7040] text-white">
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-[10px] font-light uppercase tracking-[0.28em] text-white/70">
              Accommodation
            </p>
            <h2
              className="text-white"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 'clamp(2.8rem, 4vw, 5rem)',
                fontWeight: 600,
                lineHeight: 0.9,
              }}
            >
              Pricing
            </h2>
          </div>

          <button
            onClick={() => openBooking()}
            className="inline-flex items-center justify-center border border-white/30 bg-white/5 px-6 py-3 text-[10px] font-light uppercase tracking-[0.22em] text-white transition-colors hover:bg-white/10"
          >
            Book Now
          </button>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1.4fr_0.6fr]">
          <div className="grid gap-4 md:grid-cols-3">
            {rooms.map((room) => (
              <article
                key={room.num}
                className="overflow-hidden bg-[#7A6030]/70 text-left shadow-sm ring-1 ring-white/10"
              >
                <div className="overflow-hidden">
                  <ImageWithFallback
                    src={room.image}
                    alt={room.name}
                    className="h-52 w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>

                <div className="p-5">
                  <div className="mb-3 flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-white/60">
                    <span>{room.num}</span>
                    <span>{room.per}</span>
                  </div>

                  <h3
                    className="mb-3 text-white"
                    style={{
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      fontSize: '1.5rem',
                      fontWeight: 500,
                    }}
                  >
                    {room.name}
                  </h3>

                  <p
                    className="mb-4 text-white"
                    style={{
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      fontSize: '2rem',
                      fontWeight: 600,
                    }}
                  >
                    {room.price}
                  </p>

                  <ul className="mb-5 space-y-2 text-sm text-white/70">
                    {room.features.slice(0, 3).map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <span className="mt-1 text-white/45">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => openBooking(room.id)}
                    className="w-full border border-white/25 bg-transparent px-4 py-2.5 text-[10px] font-light uppercase tracking-[0.22em] text-white transition-colors hover:border-white/50 hover:bg-white/5"
                  >
                    Select Room
                  </button>
                </div>
              </article>
            ))}
          </div>

          <aside className="flex flex-col justify-between bg-[#7A6030]/50 p-6 ring-1 ring-white/10">
            <div>
              <p className="mb-3 text-[10px] font-light uppercase tracking-[0.28em] text-white/70">
                Group stays
              </p>
              <h3
                className="mb-4 text-white"
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: '2.2rem',
                  fontWeight: 500,
                }}
              >
                Up to 20 guests
              </h3>
            </div>

            <p className="mb-6 text-sm leading-relaxed text-white/70">
              Flexible rates for family getaways, work retreats, and longer stays.
            </p>

            <div className="space-y-4 border-t border-white/15 pt-4 text-sm text-white/70">
              <div>
                <p className="mb-1 text-[10px] uppercase tracking-[0.2em] text-white/60">Breakfast</p>
                <p>R200 per person</p>
              </div>
              <div>
                <p className="mb-1 text-[10px] uppercase tracking-[0.2em] text-white/60">Dining</p>
                <p>Custom menu available on request</p>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
