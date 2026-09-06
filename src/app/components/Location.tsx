import React, { useState } from 'react';
import { ChevronRight, Plane, Waves, Building2, Mountain, MapPin } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const missions = [
  {
    num: '01',
    icon: Plane,
    title: 'King Shaka International Airport',
    body: '40-minute drive from the airport — ideal for travellers arriving from across South Africa and beyond. Our transport service can collect you on arrival.',
  },
  {
    num: '02',
    icon: Waves,
    title: 'Quiet Uncrowded Beaches',
    body: 'Just 5 minutes to pristine, uncrowded beaches on the Durban south coast — perfect for swimming, surfing, and peaceful sunset walks.',
  },
  {
    num: '03',
    icon: Building2,
    title: 'Durban City Centre',
    body: '30-minute drive to Durban\'s vibrant city centre, uShaka Marine World, and the Golden Mile beachfront strip.',
  },
  {
    num: '04',
    icon: Mountain,
    title: 'Nature & Hiking Trails',
    body: 'Just 10 minutes to scenic hiking paths winding through rolling hills and lush indigenous forest.',
  },
];

export function Location() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div id="location" className="bg-[#8C7040]">
      {/* ── OUR MISSION style layout ── */}
      <section className="min-h-screen flex flex-col lg:flex-row">
        {/* Left: 2 stacked photos + display title */}
        <div className="lg:w-5/12 relative flex flex-col">
          <div className="flex-1 overflow-hidden h-60 lg:h-auto">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1580134480039-747a599a4f99?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkdXJiYW4lMjBoaWxscyUyMGxhbmRzY2FwZXxlbnwxfHx8fDE3NjM3MjY4NDJ8MA&ixlib=rb-4.1.0&q=80&w=800"
              alt="Durban hills landscape"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 overflow-hidden h-60 lg:h-auto">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1679361717314-6d8942f1aa3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb3V0aCUyMGFmcmljYSUyMGJlYWNoJTIwc3Vuc2V0fGVufDF8fHx8MTc2MzcyODI4OHww&ixlib=rb-4.1.0&q=80&w=800"
              alt="South Africa beach"
              className="w-full h-full object-cover"
            />
          </div>

          {/* "Our Location" overlapping text */}
          <div className="absolute bottom-0 left-0 px-8 py-6">
            <h2
              className="text-white leading-none"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 'clamp(3rem, 6vw, 6rem)',
                fontWeight: 600,
                lineHeight: 0.88,
                textShadow: '0 2px 20px rgba(0,0,0,0.5)',
              }}
            >
              Our
              <br />
              Location
            </h2>
          </div>
        </div>

        {/* Right: accordion travel cards */}
        <div className="lg:w-7/12 px-8 lg:px-14 py-14 lg:py-20 flex flex-col justify-center space-y-4">
          {/* Address badge */}
          <div className="flex items-center gap-3 mb-8">
            <MapPin className="text-white/60 flex-shrink-0" size={18} strokeWidth={1.5} />
            <p className="text-white/60 text-xs tracking-widest font-light uppercase">
              10574 Street, Illovu North, 5140
            </p>
          </div>

          {missions.map((m, i) => {
            const Icon = m.icon;
            const isOpen = openIndex === i;
            return (
              <div
                key={m.num}
                className="bg-[#7A6030]/70 border border-white/15 overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left"
                >
                  <div className="flex items-center gap-4">
                    <Icon className="text-white/60 flex-shrink-0" size={18} strokeWidth={1.5} />
                    <span
                      className="text-white text-base"
                      style={{
                        fontFamily: "'Cormorant Garamond', Georgia, serif",
                        fontWeight: 500,
                        fontSize: '1.15rem',
                      }}
                    >
                      {m.num}. {m.title}
                    </span>
                  </div>
                  <ChevronRight
                    className={`text-white/50 flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`}
                    size={18}
                    strokeWidth={1.5}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-5">
                    <p className="text-white/60 text-sm leading-relaxed font-light">{m.body}</p>
                  </div>
                )}
              </div>
            );
          })}

          {/* Map embed */}
          <div className="mt-8 overflow-hidden h-52 border border-white/15">
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
          <p className="text-white/40 text-[10px] tracking-widest font-light text-center uppercase">
            Approximate location — exact directions provided upon booking
          </p>
        </div>
      </section>
    </div>
  );
}
