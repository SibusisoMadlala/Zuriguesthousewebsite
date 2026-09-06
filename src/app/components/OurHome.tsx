import React from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';

import guestHouseImage from '../../assets/images/zuri-building-exterior.jpeg';
import patioImage from '../../assets/images/zuri-outdoor-space.jpeg';
import interiorImage from '../../assets/images/zuri-room-interior-1.jpeg';
import bedroomImage from '../../assets/images/zuri-bedroom-1.jpeg';
import kitchenImage from '../../assets/images/zuri-kitchen-area.jpeg';
import parkingImage from '../../assets/images/zuri-parking-area.jpeg';

export function OurHome() {
  const services = [
    {
      number: '01',
      title: 'Accommodation',
      description:
        'Family-sized and standard en-suite rooms, accommodating up to 20 guests in warmth and comfort.',
      image: bedroomImage,
    },
    {
      number: '02',
      title: 'Catering & Conferencing',
      description:
        'Delicious cuisine by our in-house chef and versatile spaces for small events and meetings.',
      image: kitchenImage,
    },
    {
      number: '03',
      title: 'Transport Services',
      description:
        'Shuttle services for airport transfers, local excursions, and stress-free daily commuting.',
      image: parkingImage,
    },
  ];

  return (
    <div id="our-home">
      <section className="relative min-h-screen flex items-center">
        <div className="absolute inset-0">
          <ImageWithFallback
            src={guestHouseImage}
            alt="Zuri Village guest house"
            className="w-full h-full object-cover"
          />
        </div>

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
              src={patioImage}
              alt="Outdoor patio at Zuri Village"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="flex flex-col lg:flex-row min-h-screen bg-[#8C7040]">
        <div className="lg:w-5/12 h-72 lg:h-auto relative overflow-hidden">
          <ImageWithFallback
            src={interiorImage}
            alt="Zuri Village interior"
            className="w-full h-full object-cover"
          />
        </div>

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
