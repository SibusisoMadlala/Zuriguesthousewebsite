import React from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';

import exteriorFrontView from '../../assets/images/zuri-exterior-front-view.jpeg';
import buildingExterior from '../../assets/images/zuri-building-exterior.jpeg';
import entranceArea from '../../assets/images/zuri-entrance-area.jpeg';
import heroMainView from '../../assets/images/zuri-hero-main-view.jpeg';
import bedroom1 from '../../assets/images/zuri-bedroom-1.jpeg';
import bedroom2 from '../../assets/images/zuri-bedroom-2.jpeg';
import roomInterior1 from '../../assets/images/zuri-room-interior-1.jpeg';
import roomInterior2 from '../../assets/images/zuri-room-interior-2.jpeg';
import livingArea from '../../assets/images/zuri-living-area.jpeg';
import kitchenArea from '../../assets/images/zuri-kitchen-area.jpeg';
import bathroom from '../../assets/images/zuri-bathroom.jpeg';
import outdoorSpace from '../../assets/images/zuri-outdoor-space.jpeg';
import gardenView from '../../assets/images/zuri-garden-view.jpeg';
import parkingArea from '../../assets/images/zuri-parking-area.jpeg';

const images = [
  { url: heroMainView, alt: 'Zuri Guest House - Main View' },
  { url: exteriorFrontView, alt: 'Zuri Guest House - Front Exterior' },
  { url: buildingExterior, alt: 'Zuri Guest House - Building Exterior' },
  { url: entranceArea, alt: 'Zuri Guest House - Entrance Area' },
  { url: bedroom1, alt: 'Zuri Guest House - Bedroom 1' },
  { url: bedroom2, alt: 'Zuri Guest House - Bedroom 2' },
  { url: roomInterior1, alt: 'Zuri Guest House - Room Interior 1' },
  { url: roomInterior2, alt: 'Zuri Guest House - Room Interior 2' },
  { url: livingArea, alt: 'Zuri Guest House - Living Area' },
  { url: kitchenArea, alt: 'Zuri Guest House - Kitchen Area' },
  { url: bathroom, alt: 'Zuri Guest House - Bathroom' },
  { url: outdoorSpace, alt: 'Zuri Guest House - Outdoor Space' },
  { url: gardenView, alt: 'Zuri Guest House - Garden View' },
  { url: parkingArea, alt: 'Zuri Guest House - Parking Area' },
];

const scrollImages = [...images, ...images, ...images];

export function Gallery() {
  return (
    <div id="gallery" className="bg-[#8C7040] py-8 lg:py-12">
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-[10px] tracking-[0.34em] uppercase text-white/65 mb-2">Explore</p>
            <h2
              className="text-white leading-none"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 'clamp(2.5rem, 4vw, 4.5rem)',
                fontWeight: 600,
                lineHeight: 0.92,
              }}
            >
              Our Gallery
            </h2>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[1.25rem] border border-white/10 bg-[#6f5631]/40 py-3 shadow-[0_18px_45px_rgba(46,28,10,0.12)]">
          <div className="gallery-marquee flex w-max items-center gap-4 pl-4">
            {scrollImages.map((img, i) => (
              <div
                key={`${img.alt}-${i}`}
                className="group relative h-[280px] w-[220px] shrink-0 overflow-hidden rounded-[1rem] border border-white/10 bg-[#3d2815]/20 sm:h-[320px] sm:w-[260px] lg:h-[360px] lg:w-[300px]"
              >
                <ImageWithFallback
                  src={img.url}
                  alt={img.alt}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#2d1d10]/75 to-transparent p-3">
                  <span className="text-[10px] uppercase tracking-[0.24em] text-white/75">Zuri</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @keyframes galleryMarquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .gallery-marquee {
          animation: galleryMarquee 36s linear infinite;
        }

        .gallery-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
