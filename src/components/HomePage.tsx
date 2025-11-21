import React from 'react';
import { Plane, Waves, Heart, ChefHat } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';


import coverImage from '../assets/images/coverImage.jpeg';

export function HomePage() {
  const highlights = [
    {
      icon: Plane,
      title: '40min to King Shaka Airport',
      description: 'Easy access for travelers',
    },
    {
      icon: Waves,
      title: '5 Min to Quiet Beaches',
      description: 'Serene coastal escapes',
    },
    {
      icon: Heart,
      title: 'Personalized Hospitality',
      description: 'Tailored to your needs',
    },
    {
      icon: ChefHat,
      title: 'In-House Chef',
      description: 'Delicious homemade meals',
    },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div id="home">
      {/* Hero Section */}
      <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center">
        <div className="absolute inset-0">
          <ImageWithFallback
            src={coverImage}
            alt="Zuri Village Escapes - Durban Hills"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="mb-6">Zuri Village Escapes: Authentic African Living</h1>
          <p className="mb-8 opacity-90">
            A tranquil retreat in the heart of Illovo, Durban.
          </p>
          <button
            onClick={() => scrollToSection('contact')}
            className="bg-amber-600 text-white px-8 py-4 rounded-lg hover:bg-amber-700 transition-colors"
          >
            Book Your Stay
          </button>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="mb-6 text-gray-900">Welcome to Zuri Village Escapes</h2>
          <p className="text-gray-600 leading-relaxed">
            Welcome to Zuri Village Escapes, a family-run guest house where the warmth of African hospitality meets the beauty of Durban's south coast. Nestled amongst rolling hills and sugarcane fields, just minutes from quiet beaches and nature trails, we offer a truly tranquil escape. Whether you're here for a relaxing getaway, a family reunion, or a small conference, our home is yours. With personalized service, comfortable accommodation, delicious meals prepared by our in-house chef, and convenient transport options, we're dedicated to making your stay memorable.
          </p>
        </div>
      </section>

      {/* Key Highlights */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center mb-12 text-gray-900">Why Choose Zuri Village</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {highlights.map((highlight, index) => {
              const Icon = highlight.icon;
              return (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mb-4">
                    <Icon className="text-amber-600" size={32} />
                  </div>
                  <h3 className="mb-2 text-gray-900">{highlight.title}</h3>
                  <p className="text-gray-600">{highlight.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-amber-600 text-white text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="mb-6">Ready to Experience Authentic African Living?</h2>
          <p className="mb-8 opacity-90">
            Discover our comfortable accommodation and personalized services designed to make your stay unforgettable.
          </p>
          <button
            onClick={() => scrollToSection('our-home')}
            className="bg-white text-amber-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Explore Our Accommodation
          </button>
        </div>
      </section>
    </div>
  );
}
