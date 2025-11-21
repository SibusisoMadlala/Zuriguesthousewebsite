import React from 'react';
import { MapPin, Clock, Plane, Building2, Mountain, Waves } from 'lucide-react';

export function Location() {
  const travelTimes = [
    {
      icon: Plane,
      location: 'King Shaka International Airport',
      time: '40 minutes',
    },
    {
      icon: Waves,
      location: 'Quiet Beaches',
      time: '5 minutes',
    },
    {
      icon: Building2,
      location: 'Durban City Centre',
      time: '30 minutes',
    },
    {
      icon: Mountain,
      location: 'Nature & Hiking Trails',
      time: '10 minutes',
    },
  ];

  return (
    <div id="location">
      {/* Header Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="mb-4 text-gray-900">Our Location</h1>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Nestled amongst rolling hills and sugarcane fields, just minutes from beaches and hiking trails. Experience the perfect blend of tranquility and accessibility.
          </p>
        </div>
      </section>

      {/* Travel Times */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-center mb-12 text-gray-900">Travel Times</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {travelTimes.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-center space-x-4"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                    <Icon className="text-amber-600" size={24} />
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-gray-900 mb-1">{item.location}</h3>
                    <div className="flex items-center text-gray-600">
                      <Clock size={16} className="mr-2" />
                      <span>{item.time}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-center mb-12 text-gray-900">Find Us</h2>
          
          {/* Address Card */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-8 flex items-start space-x-4">
            <div className="flex-shrink-0 w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center">
              <MapPin className="text-white" size={24} />
            </div>
            <div>
              <h3 className="text-gray-900 mb-2">Zuri Village Escapes</h3>
              <p className="text-gray-700">10574 Street, Illovu North, 5140</p>
              <p className="text-gray-600 mt-2">
                Surrounded by the lush beauty of sugarcane fields and rolling hills
              </p>
            </div>
          </div>

          {/* Embedded Map */}
          <div className="rounded-lg overflow-hidden shadow-lg h-96">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3543.123456789!2d30.9!3d-30.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzDCsDAwJzAwLjAiUyAzMMKwNTQnMDAuMCJF!5e0!3m2!1sen!2sza!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Zuri Village Escapes Location"
            />
          </div>

          <p className="text-center text-gray-600 mt-6">
            Note: This is an approximate location. Exact directions will be provided upon booking.
          </p>
        </div>
      </section>

      {/* Nearby Attractions */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="mb-6 text-gray-900">Explore the Area</h2>
          <p className="text-gray-600 leading-relaxed mb-8">
            Our location offers the perfect base for exploring the beautiful South Coast of Durban. From pristine beaches to lush hiking trails, cultural experiences to local markets, there's something for everyone to enjoy during your stay.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-gray-900 mb-2">Beaches</h3>
              <p className="text-gray-600">
                Discover quiet, uncrowded beaches perfect for swimming, surfing, and relaxation.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-gray-900 mb-2">Nature Trails</h3>
              <p className="text-gray-600">
                Explore scenic hiking paths through rolling hills and indigenous forests.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-gray-900 mb-2">Local Culture</h3>
              <p className="text-gray-600">
                Experience authentic African culture, markets, and local cuisine nearby.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}