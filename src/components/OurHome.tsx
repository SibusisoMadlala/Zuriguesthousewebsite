import React from 'react';
import { Home, Utensils, Car } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function OurHome() {
  const services = [
    {
      icon: Home,
      title: 'Accommodation',
      description: 'Family-sized and standard en-suite rooms, accommodating up to 20 guests.',
      image: 'https://images.unsplash.com/photo-1731336478850-6bce7235e320?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBiZWRyb29tJTIwaG90ZWx8ZW58MXx8fHwxNzYzNjQyMDg0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      icon: Utensils,
      title: 'Catering & Conferencing',
      description: 'Delicious cuisine by our in-house chef & versatile spaces for events.',
      image: 'https://images.unsplash.com/photo-1669034938103-d4f434dce737?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwZGluaW5nJTIwcm9vbXxlbnwxfHx8fDE3NjM3MjgyODl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      icon: Car,
      title: 'Transport',
      description: 'Shuttle services for easy, stress-free commuting.',
      image: 'https://images.unsplash.com/photo-1630836490403-0f1e2cbc29cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkdXJiYW4lMjBuYXR1cmUlMjBzY2VuZXJ5fGVufDF8fHx8MTc2MzcyODI4OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
  ];

  return (
    <div id="our-home">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1607712617949-8c993d290809?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBhZnJpY2FuJTIwZ3Vlc3QlMjBob3VzZXxlbnwxfHx8fDE3NjM3MjY4NDF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Our African Home"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="mb-4">Our African Home</h1>
        </div>
      </section>

      {/* Description Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-600 leading-relaxed">
            At Zuri Village Escapes, we pride ourselves on being more than just a place to stay—we're a home away from home. Our family-run guest house is located in the peaceful suburb of Illovu, just 40 minutes south of King Shaka International Airport and a short 5-minute drive from pristine, uncrowded beaches. Surrounded by the lush beauty of sugarcane fields and rolling hills, our location offers the perfect balance of seclusion and accessibility. We welcome individuals, families, and small groups seeking rest, adventure, or a unique venue for gatherings.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center mb-12 text-gray-900">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="h-48 overflow-hidden">
                    <ImageWithFallback
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-amber-100 rounded-full mb-4">
                      <Icon className="text-amber-600" size={24} />
                    </div>
                    <h3 className="mb-3 text-gray-900">{service.title}</h3>
                    <p className="text-gray-600">{service.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Additional Features */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="mb-6 text-gray-900">Experience the Difference</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Our guest house is thoughtfully designed to provide comfort and convenience. Each room is equipped with modern amenities while maintaining a warm, homely atmosphere. Our communal spaces are perfect for gathering with loved ones or hosting small meetings and events.
              </p>
              <p className="text-gray-600 leading-relaxed">
                From the moment you arrive, you'll be treated to genuine South African hospitality. Our in-house chef prepares delicious meals using fresh, local ingredients, and our transport service ensures you can explore the area without worry.
              </p>
            </div>
            <div className="h-96 rounded-lg overflow-hidden shadow-lg">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1741020804334-942e20412cfb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwb3V0ZG9vciUyMHBhdGlvfGVufDF8fHx8MTc2MzcyODI5MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Outdoor patio"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}