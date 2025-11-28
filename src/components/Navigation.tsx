import React, { useState, useEffect } from 'react';
import logo from '../assets/images/only_logo.png';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Moon, Sun, Globe } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from './ui/button';

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('nav.home'), href: '#home' },
    { name: t('nav.about'), href: '#about' },
    { name: t('nav.workflow'), href: '#workflow' },
    { name: t('nav.gallery'), href: '#gallery' },
    { name: t('nav.products'), href: '#products' },
    { name: t('nav.markets'), href: '#markets' },
    { name: t('nav.whyus'), href: '#whyus' },
    { name: t('nav.contact'), href: '#contact' },
  ];

  const handleLinkClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      // Close menu after a small delay to allow animation
      setTimeout(() => {
        setIsOpen(false);
      }, 100);
      // Scroll with a slight delay to ensure menu is closed
      setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else {
      setIsOpen(false);
    }
  };

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-background/95 backdrop-blur-md shadow-lg border-b border-border'
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <motion.a
            href="#home"
            className="flex items-center space-x-2"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('#home');
            }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-md">
              <img
                src={logo}
                alt="Sidra Cotton City Logo"
                style={{
                  height: '2.2rem',
                  objectFit: 'contain',
                  borderRadius: '0.75rem',
                  boxShadow: '0 0 20px 0 rgba(0,0,0,0.08)',
                  background: 'transparent',
                }}
              />
            </div>
          
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                className="px-3 py-2 text-foreground/80 hover:text-accent transition-colors relative group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          {/* Theme & Language Toggles */}
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="w-9 h-9"
            >
              {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setLanguage(language === 'en' ? 'ur' : 'en')}
              className="w-9 h-9"
            >
              <Globe className="w-4 h-4" />
              <span className="ml-1 text-xs">{language.toUpperCase()}</span>
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden w-9 h-9"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="lg:hidden bg-background/98 backdrop-blur-md border-t border-border max-h-[calc(100vh-80px)] overflow-y-auto"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container mx-auto px-4 py-4 space-y-2">
              {navLinks.map((link, index) => (
                <motion.button
                  key={link.href}
                  onClick={() => handleLinkClick(link.href)}
                  className="w-full text-left block py-3 px-4 rounded-lg hover:bg-accent/10 transition-colors text-foreground/80 hover:text-accent"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  {link.name}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navigation;
