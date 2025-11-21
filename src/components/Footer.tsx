import React from 'react';
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

export function Footer() {
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
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-amber-600 rounded-full flex items-center justify-center">
                <span>ZV</span>
              </div>
              <div>Zuri Village Escapes</div>
            </div>
            <p className="text-gray-400">
              A tranquil retreat in the heart of Illovo, Durban. Experience authentic African living.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4">Contact Information</h3>
            <div className="space-y-3 text-gray-400">
              <div className="flex items-start space-x-3">
                <Phone size={18} className="mt-1 flex-shrink-0" />
                <div>
                  <div>+27 713 422 547</div>
                  <div>+27 825 604 590</div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Mail size={18} className="mt-1 flex-shrink-0" />
                <div>zurivillage.bookings@gmail.com</div>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin size={18} className="mt-1 flex-shrink-0" />
                <div>10574 Street, Illovu North, 5140</div>
              </div>
            </div>
          </div>

          {/* Quick Links & Social */}
          <div>
            <h3 className="mb-4">Quick Links</h3>
            <div className="space-y-2 mb-6">
              <button
                onClick={() => scrollToSection('our-home')}
                className="block text-gray-400 hover:text-amber-600 transition-colors"
              >
                Our Home
              </button>
              <button
                onClick={() => scrollToSection('pricing')}
                className="block text-gray-400 hover:text-amber-600 transition-colors"
              >
                Pricing
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="block text-gray-400 hover:text-amber-600 transition-colors"
              >
                Contact Us
              </button>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-amber-600 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-amber-600 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-amber-600 transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Zuri Village Escapes. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}