import React, { Suspense, lazy } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { Toaster } from './components/ui/sonner';
import './config/firebase';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Features from './components/Features';
import About from './components/About';
import Workflow from './components/Workflow';
import FloatingElements from './components/FloatingElements';
import './styles/globals.css';

// Lazy load heavy components
const Gallery = lazy(() => import('./components/Gallery').then(m => ({ default: m.Gallery })));
const Products = lazy(() => import('./components/Products'));
const ExportMarkets = lazy(() => import('./components/ExportMarkets'));
const WhyChooseUs = lazy(() => import('./components/WhyChooseUs'));
const Clients = lazy(() => import('./components/Clients'));
const Testimonials = lazy(() => import('./components/Testimonials'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));

const LazySection = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<div className="h-96" />}>
    {children}
  </Suspense>
);

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="min-h-screen bg-background text-foreground">
          <Navigation />
          <main>
            <Hero />
            <Features />
            <About />
            <Workflow />
            <LazySection><Gallery /></LazySection>
            <LazySection><Products /></LazySection>
            <LazySection><ExportMarkets /></LazySection>
            <LazySection><WhyChooseUs /></LazySection>
            <LazySection><Clients /></LazySection>
            <LazySection><Testimonials /></LazySection>
            <LazySection><Contact /></LazySection>
            <LazySection><Footer /></LazySection>
          </main>
          <FloatingElements />
          <Toaster position="top-right" />
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}
