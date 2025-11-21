import React from 'react';
import { Bed, Coffee, Utensils, Info } from 'lucide-react';

export function Pricing() {
  const rooms = [
    {
      name: 'Standard En-Suite',
      price: 'R650',
      features: ['Private bathroom', 'Comfortable bedding', 'Daily housekeeping'],
    },
    {
      name: 'Deluxe En-Suite',
      price: 'R750',
      features: ['Spacious room', 'Private bathroom', 'Premium amenities', 'Garden view'],
    },
    {
      name: 'King En-Suite',
      price: 'R985',
      features: ['King-size bed', 'Luxury bathroom', 'Premium amenities', 'Best views', 'Extra space'],
    },
  ];

  return (
    <div id="pricing">
      {/* Header Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="mb-4 text-gray-900">Pricing</h1>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Transparent and competitive rates for comfortable accommodation and delicious meals. All prices are per night unless otherwise stated.
          </p>
        </div>
      </section>

      {/* Accommodation Pricing */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center mb-12">
            <Bed className="text-amber-600 mr-3" size={32} />
            <h2 className="text-gray-900">Accommodation</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {rooms.map((room, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow overflow-hidden"
              >
                <div className="bg-amber-600 text-white p-6 text-center">
                  <h3 className="mb-2">{room.name}</h3>
                  <div className="text-3xl">{room.price}</div>
                  <div className="text-sm opacity-90">per night</div>
                </div>
                <div className="p-6">
                  <ul className="space-y-3">
                    {room.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start text-gray-600">
                        <span className="text-amber-600 mr-2">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6 flex items-start space-x-4">
            <Info className="text-blue-600 flex-shrink-0 mt-1" size={24} />
            <div>
              <h3 className="text-gray-900 mb-2">Group Bookings</h3>
              <p className="text-gray-600">
                We can accommodate up to 20 guests with our family-sized and standard en-suite rooms. Perfect for family reunions, group getaways, or small conferences. Contact us for special group rates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Catering Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center mb-12">
            <Utensils className="text-amber-600 mr-3" size={32} />
            <h2 className="text-gray-900">Catering</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Breakfast */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <Coffee className="text-amber-600 mr-3" size={24} />
                <h3 className="text-gray-900">Breakfast</h3>
              </div>
              <p className="text-gray-700 mb-4">
                A full-house offering of bacon, eggs, toast, cheese, sausage and bottomless coffee!
              </p>
              <div className="text-2xl text-amber-600">R200</div>
              <div className="text-gray-600">per person</div>
            </div>

            {/* Lunch & Dinner */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <Utensils className="text-amber-600 mr-3" size={24} />
                <h3 className="text-gray-900">Lunch & Dinner</h3>
              </div>
              <p className="text-gray-700 mb-4">
                Delicious meals prepared by our in-house chef using fresh, local ingredients.
              </p>
              <div className="text-gray-900">Available on request</div>
              <div className="text-gray-600">Custom pricing based on menu</div>
            </div>
          </div>

          <div className="mt-8 max-w-4xl mx-auto text-center">
            <p className="text-gray-600">
              All meals are prepared fresh daily by our experienced in-house chef. We can accommodate dietary requirements and preferences—please let us know in advance.
            </p>
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-center mb-12 text-gray-900">Additional Services</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-gray-900 mb-3">Transport Services</h3>
              <p className="text-gray-600 mb-4">
                Convenient shuttle services for airport transfers, local excursions, and daily commuting.
              </p>
              <p className="text-amber-600">Quoted as per your custom itinerary</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-gray-900 mb-3">Events & Conferencing</h3>
              <p className="text-gray-600 mb-4">
                Versatile spaces perfect for small conferences, meetings, family gatherings, and special events.
              </p>
              <p className="text-amber-600">Quoted as per your custom itinerary</p>
            </div>
          </div>

          <div className="mt-8 bg-amber-50 border border-amber-200 rounded-lg p-6 text-center">
            <h3 className="text-gray-900 mb-3">Ready to Book Your Stay?</h3>
            <p className="text-gray-600 mb-4">
              Contact us for a personalized quote or to discuss your specific requirements. We're here to make your stay perfect.
            </p>
            <a
              href="tel:+27713422547"
              className="inline-block bg-amber-600 text-white px-8 py-3 rounded-lg hover:bg-amber-700 transition-colors"
            >
              Call Us Now
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}