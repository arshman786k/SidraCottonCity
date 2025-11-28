import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { Toaster } from './components/ui/sonner';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Workflow from './components/Workflow';
import Gallery from './components/Gallery';
import Products from './components/Products';
import ExportMarkets from './components/ExportMarkets';
import WhyChooseUs from './components/WhyChooseUs';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingElements from './components/FloatingElements';
import './styles/globals.css';

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="min-h-screen bg-background text-foreground">
          <Navigation />
          <main>
            <Hero />
            <About />
            <Workflow />
            <Gallery />
            <Products />
            <ExportMarkets />
            <WhyChooseUs />
            <Testimonials />
            <Contact />
          </main>
          <Footer />
          <FloatingElements />
          <Toaster position="top-right" />
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}
