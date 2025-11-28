import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUp, MessageCircle } from 'lucide-react';
import { Button } from './ui/button';

const FloatingElements: React.FC = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const whatsappNumber = '+923001234567';
  const whatsappMessage = encodeURIComponent('Hello! I would like to inquire about your products.');

  return (
    <>
      {/* WhatsApp Floating Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-40"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        <motion.a
          href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <div className="w-14 h-14 bg-green-600 hover:bg-green-700 rounded-full shadow-2xl flex items-center justify-center text-white cursor-pointer group relative">
            <MessageCircle className="w-7 h-7" />
            
            {/* Pulse effect */}
            <span className="absolute inset-0 rounded-full bg-green-600 animate-ping opacity-75 group-hover:opacity-0" />
          </div>
        </motion.a>
      </motion.div>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.div
            className="fixed bottom-6 left-6 z-40"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Button
              onClick={scrollToTop}
              size="icon"
              className="w-12 h-12 rounded-full shadow-2xl bg-accent hover:bg-accent/90"
            >
              <ArrowUp className="w-5 h-5" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingElements;
