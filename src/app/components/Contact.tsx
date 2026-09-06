import React, { useState } from 'react';
import { ChevronRight, Phone, Mail, MapPin, Send } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

import diningImage from '../../assets/images/zuri-kitchen-area.jpeg';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactItems = [
    { icon: Phone, label: '+27 713 422 547', href: 'tel:+27713422547' },
    { icon: Phone, label: '+27 825 604 590', href: 'tel:+27825604590' },
    { icon: Mail, label: 'zurivillage.bookings@gmail.com', href: 'mailto:zurivillage.bookings@gmail.com' },
    { icon: MapPin, label: '10574 Street, Illovu North, 5140', href: undefined },
  ];

  return (
    <div id="contact" className="bg-[#8C7040]">
      {/* ── OUR CONTACT layout ── */}
      <section className="flex flex-col lg:flex-row min-h-screen">
        {/* Left: heading + contact info */}
        <div className="lg:w-5/12 px-10 lg:px-14 py-20 flex flex-col justify-center">
          <h2
            className="text-white leading-none mb-12"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(4rem, 8vw, 8rem)',
              fontWeight: 600,
              lineHeight: 0.88,
            }}
          >
            Our
            <br />
            Contact
          </h2>

          {/* Contact bullets */}
          <div className="bg-[#7A6030]/65 border border-white/15 p-8 space-y-6">
            {contactItems.map((item, i) => {
              const Icon = item.icon;
              const content = (
                <div key={i} className="flex items-center gap-4 group">
                  <ChevronRight
                    className="text-white/50 flex-shrink-0 group-hover:text-white/80 transition-colors"
                    size={18}
                    strokeWidth={1.5}
                  />
                  <Icon className="text-white/50 flex-shrink-0" size={16} strokeWidth={1.5} />
                  <span className="text-white/80 text-sm font-light group-hover:text-white transition-colors break-all">
                    {item.label}
                  </span>
                </div>
              );
              return item.href ? (
                <a key={i} href={item.href} className="block">
                  {content}
                </a>
              ) : (
                <div key={i}>{content}</div>
              );
            })}
          </div>

          <p className="text-white/45 text-xs tracking-widest uppercase mt-8 font-light">
            Office hours: Mon – Sun, 8:00&nbsp;AM – 8:00&nbsp;PM
          </p>
        </div>

        {/* Right: photo + form */}
        <div className="lg:w-7/12 flex flex-col">
          {/* Photo */}
          <div className="h-64 lg:h-80 overflow-hidden flex-shrink-0">
            <ImageWithFallback
              src={diningImage}
              alt="Zuri Village hospitality"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Contact form */}
          <div className="flex-1 bg-[#7A6030]/50 border-t border-white/10 px-10 lg:px-12 py-10">
            <p
              className="text-white mb-6"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: '1.5rem',
                fontWeight: 500,
              }}
            >
              Send Us a Message
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="w-full bg-white/10 border border-white/20 text-white placeholder:text-white/35 px-4 py-3 text-sm font-light focus:outline-none focus:border-white/50 transition-colors"
                />
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email address"
                  className="w-full bg-white/10 border border-white/20 text-white placeholder:text-white/35 px-4 py-3 text-sm font-light focus:outline-none focus:border-white/50 transition-colors"
                />
              </div>
              <input
                type="text"
                name="subject"
                required
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject"
                className="w-full bg-white/10 border border-white/20 text-white placeholder:text-white/35 px-4 py-3 text-sm font-light focus:outline-none focus:border-white/50 transition-colors"
              />
              <textarea
                name="message"
                required
                value={formData.message}
                onChange={handleChange}
                rows={4}
                placeholder="Your message or booking enquiry..."
                className="w-full bg-white/10 border border-white/20 text-white placeholder:text-white/35 px-4 py-3 text-sm font-light focus:outline-none focus:border-white/50 transition-colors resize-none"
              />
              <div className="flex items-center gap-6">
                <button
                  type="submit"
                  disabled={submitted}
                  className="relative inline-flex items-center gap-2 px-8 py-3 text-white text-xs tracking-[0.25em] uppercase font-light hover:bg-white/10 transition-colors disabled:opacity-50"
                >
                  <span className="absolute top-0 left-0 w-5 h-5 border-t border-l border-white/50" />
                  <span className="absolute bottom-0 right-0 w-5 h-5 border-b border-r border-white/50" />
                  <Send size={14} strokeWidth={1.5} />
                  {submitted ? 'Sent!' : 'Submit'}
                </button>
                {submitted && (
                  <p className="text-white/65 text-xs font-light">
                    Thank you — we'll be in touch shortly.
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
