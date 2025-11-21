import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send } from 'lucide-react';

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
    // In a real application, this would send the form data to a server
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div id="contact">
      {/* Header Section */}
      <section className="py-16 px-4 bg-amber-600 text-white text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="mb-4">We Can't Wait to See You!</h1>
          <p className="opacity-90">
            Get in touch with us to book your stay or inquire about our services. We're here to help make your visit unforgettable.
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-center mb-12 text-gray-900">Contact Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Phone */}
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mb-4">
                <Phone className="text-amber-600" size={28} />
              </div>
              <h3 className="text-gray-900 mb-3">Call Us</h3>
              <a href="tel:+27713422547" className="block text-gray-600 hover:text-amber-600 mb-1">
                +27 713 422 547
              </a>
              <a href="tel:+27825604590" className="block text-gray-600 hover:text-amber-600">
                +27 825 604 590
              </a>
            </div>

            {/* Email */}
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mb-4">
                <Mail className="text-amber-600" size={28} />
              </div>
              <h3 className="text-gray-900 mb-3">Email Us</h3>
              <a
                href="mailto:zurivillage.bookings@gmail.com"
                className="text-gray-600 hover:text-amber-600 break-all"
              >
                zurivillage.bookings@gmail.com
              </a>
            </div>

            {/* Address */}
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mb-4">
                <MapPin className="text-amber-600" size={28} />
              </div>
              <h3 className="text-gray-900 mb-3">Visit Us</h3>
              <p className="text-gray-600">
                10574 Street<br />
                Illovu North, 5140
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-center mb-4 text-gray-900">Send Us a Message</h2>
          <p className="text-center text-gray-600 mb-8">
            Have a question or ready to book? Fill out the form below and we'll get back to you as soon as possible.
          </p>

          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-gray-700 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent"
                  placeholder="Your name"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent"
                  placeholder="your.email@example.com"
                />
              </div>
            </div>

            {/* Subject */}
            <div className="mb-6">
              <label htmlFor="subject" className="block text-gray-700 mb-2">
                Subject *
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                required
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent"
                placeholder="What is your inquiry about?"
              />
            </div>

            {/* Message */}
            <div className="mb-6">
              <label htmlFor="message" className="block text-gray-700 mb-2">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                required
                value={formData.message}
                onChange={handleChange}
                rows={6}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent resize-none"
                placeholder="Tell us about your plans, questions, or special requirements..."
              />
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                disabled={submitted}
                className="inline-flex items-center bg-amber-600 text-white px-8 py-3 rounded-lg hover:bg-amber-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {submitted ? (
                  <>
                    <span>Message Sent!</span>
                  </>
                ) : (
                  <>
                    <Send size={20} className="mr-2" />
                    <span>Submit</span>
                  </>
                )}
              </button>
            </div>

            {submitted && (
              <p className="text-center text-green-600 mt-4">
                Thank you for contacting us! We'll respond to your inquiry shortly.
              </p>
            )}
          </form>
        </div>
      </section>

      {/* Additional Info */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="mb-6 text-gray-900">Business Hours</h2>
          <p className="text-gray-600 mb-8">
            While we're available to accommodate your check-in and check-out times, please contact us in advance to arrange your arrival.
          </p>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 inline-block">
            <p className="text-gray-700">
              <strong>Office Hours:</strong> Monday - Sunday, 8:00 AM - 8:00 PM<br />
              <strong>Emergency Contact:</strong> Available 24/7 for current guests
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}