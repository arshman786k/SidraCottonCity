import React from 'react';
import logo from '../assets/images/only_logo.png';
import factoryImage from '../assets/images/Factory Building.jpg';
import { motion } from 'motion/react';
import { ArrowRight, Phone } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';

const Hero: React.FC = () => {
  const { t } = useLanguage();

  const handleScroll = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src={factoryImage}
          alt="Sidra Cotton City Factory Building"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/80 to-accent/70" />
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-64 h-64 bg-accent/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-primary-foreground/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl relative z-10 pt-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            className="text-primary-foreground"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              className="inline-block mb-4 px-4 py-2 bg-accent/20 backdrop-blur-sm rounded-full border border-accent/30"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <span className="text-sm uppercase tracking-wider">
                Apparels Manufacturing Excellence
              </span>
            </motion.div>

            <motion.h1
              className="mb-6 flex justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <div
                className="w-full flex items-center justify-center"
                style={{
                  background: 'linear-gradient(to right, rgba(255,255,255,1) 60%, rgba(255,255,255,0) 100%)',
                  borderRadius: '1.5rem',
                  padding: '1.5rem 0',
                  minHeight: '4.5rem',
                  maxWidth: '700px',
                }}
              >
                <img
                  src={logo}
                  alt="Sidra Cotton City Logo"
                  style={{
                    height: '4.5rem',
                    objectFit: 'contain',
                    borderRadius: '1.5rem',
                    boxShadow: '0 0 40px 0 rgba(0,0,0,0.08)',
                  }}
                />
              </div>
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl mb-8 text-primary-foreground/90 max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {t('hero.description')}
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 "
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <Button
                size="lg"
                className="bg-transparent border border-white text-white hover:bg-white/10 hover:text-white font-semibold rounded-xl px-6 py-3 flex items-center transition"
                onClick={() => handleScroll('#products')}
              >
                {t('hero.cta.primary')}
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border border-white text-white hover:bg-white/10 hover:text-white font-semibold rounded-xl px-6 py-3 flex items-center transition"
                onClick={() => handleScroll('#contact')}
              >
                <Phone className="mr-2 w-4 h-4" />
                {t('hero.cta.secondary')}
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 pt-12 border-t border-primary-foreground/20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              {[
                { value: '15+', label: t('stats.experience') },
                { value: '1M+', label: t('stats.products') },
                { value: '25+', label: t('stats.countries') },
                { value: '500+', label: t('stats.employees') },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                >
                  <div className="text-2xl md:text-3xl mb-1">{stat.value}</div>
                  <div className="text-sm text-primary-foreground/70">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - Feature Cards */}
          <motion.div
            className="hidden lg:grid grid-cols-2 gap-4"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {[
              {
                title: 'Premium Quality',
                desc: 'International standards',
                delay: 0.5,
              },
              {
                title: 'Modern Technology',
                desc: 'State-of-the-art facilities',
                delay: 0.6,
              },
              {
                title: 'Global Export',
                desc: 'Serving 25+ countries',
                delay: 0.7,
              },
              {
                title: 'Fast Delivery',
                desc: 'On-time guaranteed',
                delay: 0.8,
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-primary-foreground/10 backdrop-blur-md rounded-xl p-6 border border-primary-foreground/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: feature.delay }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mb-4">
                  <div className="w-6 h-6 bg-accent rounded" />
                </div>
                <h3 className="text-lg mb-2">{feature.title}</h3>
                <p className="text-sm text-primary-foreground/70">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-primary-foreground/30 rounded-full flex items-start justify-center p-2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <motion.div className="w-1.5 h-1.5 bg-primary-foreground/50 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
