import React from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function OurHome() {
  const services = [
    {
      number: '01',
      title: 'Accommodation',
      description:
        'Family-sized and standard en-suite rooms, accommodating up to 20 guests in warmth and comfort.',
      image:
        'https://images.unsplash.com/photo-1731336478850-6bce7235e320?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBiZWRyb29tJTIwaG90ZWx8ZW58MXx8fHwxNzYzNjQyMDg0fDA&ixlib=rb-4.1.0&q=80&w=400',
    },
    {
      number: '02',
      title: 'Catering & Conferencing',
      description:
        'Delicious cuisine by our in-house chef and versatile spaces for small events and meetings.',
      image:
        'https://images.unsplash.com/photo-1669034938103-d4f434dce737?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwZGluaW5nJTIwcm9vbXxlbnwxfHx8fDE3NjM3MjgyODl8MA&ixlib=rb-4.1.0&q=80&w=400',
    },
    {
      number: '03',
      title: 'Transport Services',
      description:
        'Shuttle services for airport transfers, local excursions, and stress-free daily commuting.',
      image:
        'https://images.unsplash.com/photo-1630836490403-0f1e2cbc29cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkdXJiYW4lMjBuYXR1cmUlMjBzY2VuZXJ5fGVufDF8fHx8MTc2MzcyODI4OXww&ixlib=rb-4.1.0&q=80&w=400',
    },
  ];

  return (
    <div id="our-home">
      {/* ── ABOUT US ── full-bleed + panel overlay */}
      <section className="relative min-h-screen flex items-center">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1607712617949-8c993d290809?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBhZnJpY2FuJTIwZ3Vlc3QlMjBob3VzZXxlbnwxfHx8fDE3NjM3MjY4NDF8MA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Zuri Village guest house"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Semi-transparent panel */}
        <div className="relative z-10 bg-[#8C7040]/90 backdrop-blur-sm mx-4 lg:mx-16 my-20 lg:my-28 p-10 lg:p-14 max-w-5xl flex flex-col lg:flex-row gap-12 items-start">
          <div className="flex-1 min-w-0">
            <h2
              className="text-white leading-none mb-8"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 'clamp(4.5rem, 9vw, 9rem)',
                fontWeight: 600,
                lineHeight: 0.88,
              }}
            >
              About
              <br />
              <em>Us</em>
            </h2>
            <p className="text-white/70 leading-relaxed text-sm font-light max-w-md">
              At Zuri Village Escapes, we pride ourselves on being more than just a place to
              stay—we're a home away from home. Located in the peaceful suburb of Illovu, just 40
              minutes south of King Shaka International Airport and a short 5-minute drive from
              pristine, uncrowded beaches. Surrounded by the lush beauty of sugarcane fields and
              rolling hills, our location offers the perfect balance of seclusion and accessibility.
            </p>
          </div>
          <div className="flex-shrink-0 w-full lg:w-80 h-60 lg:h-[22rem] overflow-hidden">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1741020804334-942e20412cfb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwb3V0ZG9vciUyMHBhdGlvfGVufDF8fHx8MTc2MzcyODI5MHww&ixlib=rb-4.1.0&q=80&w=600"
              alt="Outdoor patio at Zuri Village"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* ── OUR SERVICE ── split layout */}
      <section className="flex flex-col lg:flex-row min-h-screen bg-[#8C7040]">
        {/* Left: full-height image */}
        <div className="lg:w-5/12 h-72 lg:h-auto relative overflow-hidden">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1505576391880-b3f9d713dc4f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwdmlsbGElMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjM3MjgyODh8MA&ixlib=rb-4.1.0&q=80&w=800"
            alt="Zuri Village interior"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right: services */}
        <div className="lg:w-7/12 px-10 lg:px-16 py-16 flex flex-col justify-center">
          <h2
            className="text-white mb-12 leading-none"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(3.5rem, 7vw, 7rem)',
              fontWeight: 600,
              lineHeight: 0.9,
            }}
          >
            Our
            <br />
            Service
          </h2>

          <div className="space-y-0">
            {services.map((svc, i) => (
              <div
                key={svc.number}
                className={`flex gap-5 py-7 ${i < services.length - 1 ? 'border-b border-white/20' : ''}`}
              >
                <div className="flex-shrink-0 w-28 h-20 overflow-hidden">
                  <ImageWithFallback
                    src={svc.image}
                    alt={svc.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3
                    className="text-white mb-1.5"
                    style={{
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      fontSize: '1.3rem',
                      fontWeight: 500,
                    }}
                  >
                    {svc.number}. {svc.title}
                  </h3>
                  <p className="text-white/60 text-xs leading-relaxed font-light">
                    {svc.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
