import React from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './components/HomePage';
import { OurHome } from './components/OurHome';
import { Gallery } from './components/Gallery';
import { Location } from './components/Location';
import { Pricing } from './components/Pricing';
import { Contact } from './components/Contact';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <HomePage />
        <OurHome />
        <Gallery />
        <Location />
        <Pricing />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}