import React from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function Gallery() {
  const images = [
    {
      url: 'https://images.unsplash.com/photo-1607712617949-8c993d290809?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBhZnJpY2FuJTIwZ3Vlc3QlMjBob3VzZXxlbnwxfHx8fDE3NjM3MjY4NDF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      alt: 'Guest house exterior',
    },
    {
      url: 'https://images.unsplash.com/photo-1731336478850-6bce7235e320?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBiZWRyb29tJTIwaG90ZWx8ZW58MXx8fHwxNzYzNjQyMDg0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      alt: 'Luxury bedroom',
    },
    {
      url: 'https://images.unsplash.com/photo-1669034938103-d4f434dce737?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwZGluaW5nJTIwcm9vbXxlbnwxfHx8fDE3NjM3MjgyODl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      alt: 'Dining room',
    },
    {
      url: 'https://images.unsplash.com/photo-1741020804334-942e20412cfb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwb3V0ZG9vciUyMHBhdGlvfGVufDF8fHx8MTc2MzcyODI5MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      alt: 'Outdoor patio',
    },
    {
      url: 'https://images.unsplash.com/photo-1505576391880-b3f9d713dc4f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwdmlsbGElMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjM3MjgyODh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      alt: 'Villa interior',
    },
    {
      url: 'https://images.unsplash.com/photo-1630836490403-0f1e2cbc29cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkdXJiYW4lMjBuYXR1cmUlMjBzY2VuZXJ5fGVufDF8fHx8MTc2MzcyODI4OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      alt: 'Surrounding nature',
    },
    {
      url: 'https://images.unsplash.com/photo-1679361717314-6d8942f1aa3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb3V0aCUyMGFmcmljYSUyMGJlYWNoJTIwc3Vuc2V0fGVufDF8fHx8MTc2MzcyODI4OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      alt: 'Beach sunset',
    },
    {
      url: 'https://images.unsplash.com/photo-1580134480039-747a599a4f99?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkdXJiYW4lMjBoaWxscyUyMGxhbmRzY2FwZXxlbnwxfHx8fDE3NjM3MjY4NDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      alt: 'Durban hills',
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
      <section className="pb-16 overflow-hidden">
        <div className="relative">
          <div className="flex gap-6 animate-scroll">
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
      </section>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll {
          animation: scroll 40s linear infinite;
        }

        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}