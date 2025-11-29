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
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 md:pt-40">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src={factoryImage}
          alt="Sidra Cotton City Factory Building"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-primary/40 to-accent/10 mt-6" />
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
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            className="text-primary-foreground"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Logo Section */}
            <motion.div
              className="mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <img
                src={logo}
                alt="Sidra Cotton City Logo"
                className="h-24 md:h-32 object-contain opacity-60"
              />
            </motion.div>
           



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
