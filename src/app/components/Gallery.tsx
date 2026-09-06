import React from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const images = [
  {
    url: 'https://images.unsplash.com/photo-1607712617949-8c993d290809?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBhZnJpY2FuJTIwZ3Vlc3QlMjBob3VzZXxlbnwxfHx8fDE3NjM3MjY4NDF8MA&ixlib=rb-4.1.0&q=80&w=800',
    alt: 'Guest house exterior',
  },
  {
    url: 'https://images.unsplash.com/photo-1731336478850-6bce7235e320?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBiZWRyb29tJTIwaG90ZWx8ZW58MXx8fHwxNzYzNjQyMDg0fDA&ixlib=rb-4.1.0&q=80&w=800',
    alt: 'Luxury bedroom',
  },
  {
    url: 'https://images.unsplash.com/photo-1669034938103-d4f434dce737?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwZGluaW5nJTIwcm9vbXxlbnwxfHx8fDE3NjM3MjgyODl8MA&ixlib=rb-4.1.0&q=80&w=800',
    alt: 'Dining room',
  },
  {
    url: 'https://images.unsplash.com/photo-1741020804334-942e20412cfb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwb3V0ZG9vciUyMHBhdGlvfGVufDF8fHx8MTc2MzcyODI5MHww&ixlib=rb-4.1.0&q=80&w=800',
    alt: 'Outdoor patio',
  },
  {
    url: 'https://images.unsplash.com/photo-1505576391880-b3f9d713dc4f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwdmlsbGElMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjM3MjgyODh8MA&ixlib=rb-4.1.0&q=80&w=800',
    alt: 'Villa interior',
  },
  {
    url: 'https://images.unsplash.com/photo-1630836490403-0f1e2cbc29cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkdXJiYW4lMjBuYXR1cmUlMjBzY2VuZXJ5fGVufDF8fHx8MTc2MzcyODI4OXww&ixlib=rb-4.1.0&q=80&w=800',
    alt: 'Surrounding nature scenery',
  },
  {
    url: 'https://images.unsplash.com/photo-1679361717314-6d8942f1aa3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb3V0aCUyMGFmcmljYSUyMGJlYWNoJTIwc3Vuc2V0fGVufDF8fHx8MTc2MzcyODI4OHww&ixlib=rb-4.1.0&q=80&w=800',
    alt: 'Beach sunset',
  },
  {
    url: 'https://images.unsplash.com/photo-1580134480039-747a599a4f99?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkdXJiYW4lMjBoaWxscyUyMGxhbmRzY2FwZXxlbnwxfHx8fDE3NjM3MjY4NDJ8MA&ixlib=rb-4.1.0&q=80&w=800',
    alt: 'Durban hills landscape',
  },
];

const scrollImages = [...images, ...images];

export function Gallery() {
  return (
    <div id="gallery" className="bg-[#8C7040]">
      {/* ── PORTFOLIO MOSAIC ── */}
      <section className="relative pt-16 pb-0">
        {/* 3×2 mosaic grid */}
        <div className="grid grid-cols-3 gap-1.5 px-1.5">
          {images.slice(0, 6).map((img, i) => (
            <div
              key={i}
              className="overflow-hidden aspect-[4/3] group"
            >
              <ImageWithFallback
                src={img.url}
                alt={img.alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </div>

        {/* "Our Portfolio" overlay text */}
        <div className="pointer-events-none absolute bottom-0 right-0 px-6 py-4 bg-[#8C7040]/85">
          <h2
            className="text-white leading-none"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(2.5rem, 6vw, 6rem)',
              fontWeight: 600,
              lineHeight: 0.92,
            }}
          >
            Our
            <br />
            Gallery
          </h2>
        </div>
      </section>

      {/* ── AUTO-SCROLL STRIP ── */}
      <section className="py-10 overflow-hidden">
        <div className="relative">
          <div className="flex gap-4 animate-gallery-scroll">
            {scrollImages.map((img, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-72 h-48 overflow-hidden group"
              >
                <ImageWithFallback
                  src={img.url}
                  alt={img.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>

        <style>{`
          @keyframes galleryScroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-gallery-scroll {
            animation: galleryScroll 45s linear infinite;
          }
          .animate-gallery-scroll:hover {
            animation-play-state: paused;
          }
        `}</style>
      </section>
    </div>
  );
}
