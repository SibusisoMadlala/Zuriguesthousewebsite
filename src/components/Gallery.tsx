import React from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';

// Import local images
import exteriorFrontView from '../assets/images/zuri-exterior-front-view.jpeg';
import buildingExterior from '../assets/images/zuri-building-exterior.jpeg';
import entranceArea from '../assets/images/zuri-entrance-area.jpeg';
import heroMainView from '../assets/images/zuri-hero-main-view.jpeg';
import bedroom1 from '../assets/images/zuri-bedroom-1.jpeg';
import bedroom2 from '../assets/images/zuri-bedroom-2.jpeg';
import roomInterior1 from '../assets/images/zuri-room-interior-1.jpeg';
import roomInterior2 from '../assets/images/zuri-room-interior-2.jpeg';
import livingArea from '../assets/images/zuri-living-area.jpeg';
import kitchenArea from '../assets/images/zuri-kitchen-area.jpeg';
import bathroom from '../assets/images/zuri-bathroom.jpeg';
import outdoorSpace from '../assets/images/zuri-outdoor-space.jpeg';
import gardenView from '../assets/images/zuri-garden-view.jpeg';
import parkingArea from '../assets/images/zuri-parking-area.jpeg';

export function Gallery() {
  const images = [
    {
      url: heroMainView,
      alt: 'Zuri Guest House - Main View',
    },
    {
      url: exteriorFrontView,
      alt: 'Zuri Guest House - Front Exterior',
    },
    {
      url: buildingExterior,
      alt: 'Zuri Guest House - Building Exterior',
    },
    {
      url: entranceArea,
      alt: 'Zuri Guest House - Entrance Area',
    },
    {
      url: bedroom1,
      alt: 'Zuri Guest House - Bedroom 1',
    },
    {
      url: bedroom2,
      alt: 'Zuri Guest House - Bedroom 2',
    },
    {
      url: roomInterior1,
      alt: 'Zuri Guest House - Room Interior 1',
    },
    {
      url: roomInterior2,
      alt: 'Zuri Guest House - Room Interior 2',
    },
    {
      url: livingArea,
      alt: 'Zuri Guest House - Living Area',
    },
    {
      url: kitchenArea,
      alt: 'Zuri Guest House - Kitchen Area',
    },
    {
      url: bathroom,
      alt: 'Zuri Guest House - Bathroom',
    },
    {
      url: outdoorSpace,
      alt: 'Zuri Guest House - Outdoor Space',
    },
    {
      url: gardenView,
      alt: 'Zuri Guest House - Garden View',
    },
    {
      url: parkingArea,
      alt: 'Zuri Guest House - Parking Area',
    },
  ];

  // Duplicate images for seamless infinite scroll
  const duplicatedImages = [...images, ...images];

  return (
    <div id="gallery">
      {/* Header Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-center mb-4 text-gray-900">Our Gallery</h1>
          <p className="text-center text-gray-600 max-w-2xl mx-auto">
            Take a visual tour of Zuri Village Escapes and discover the beauty and comfort that awaits you.
          </p>
        </div>
      </section>

      {/* Gallery Horizontal Scroll */}
      <section className="pb-16">
        <div className="relative">
          {/* Outer scroll container allows manual horizontal scrolling */}
          <div className="gallery-scroll" aria-label="Gallery scroller">
            {/* Animated track (duplicated for seamless loop) */}
            <div className="flex gap-6 animate-scroll gallery-track">
              {duplicatedImages.map((image, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-[400px] h-[400px] rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow group"
                >
                  <ImageWithFallback
                    src={image.url}
                    alt={image.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        /* Keyframes for the auto-scroll animation */
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        /* Outer container: allows manual horizontal scrolling while the inner track animates */
        .gallery-scroll {
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: thin;
          padding: 8px 0;
        }

        /* WebKit scrollbar styling */
        .gallery-scroll::-webkit-scrollbar {
          height: 10px;
        }
        .gallery-scroll::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.24);
          border-radius: 6px;
        }

        /* Animated track: faster animation (reduced duration to make it a bit fast) */
        .animate-scroll {
          animation: scroll 16s linear infinite;
        }

        /* Pause the auto-scroll when user hovers or focuses the track */
        .animate-scroll:hover,
        .animate-scroll:focus-within,
        .gallery-scroll:hover .animate-scroll {
          animation-play-state: paused;
        }

        /* Ensure track stays in a single row and items align */
        .gallery-track {
          display: flex;
          align-items: center;
        }

        /* Make sure items don't wrap when container is resized */
        .gallery-track > div {
          flex: 0 0 auto;
        }
      `}</style>
    </div>
  );
}