import React from 'react';
import { motion } from 'motion/react';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  background?: 'white' | 'gray' | 'dark';
}

export const Section: React.FC<SectionProps> = ({ 
  children, 
  className = '', 
  id,
  background = 'white' 
}) => {
  const bgClasses = {
    white: 'bg-background',
    gray: 'bg-secondary',
    dark: 'bg-primary text-primary-foreground',
  };

  return (
    <section 
      id={id}
      className={`py-16 md:py-24 ${bgClasses[background]} ${className}`}
    >
      {children}
    </section>
  );
};

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const Container: React.FC<ContainerProps> = ({ children, className = '' }) => {
  return (
    <div className={`container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl ${className}`}>
      {children}
    </div>
  );
};

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  centered?: boolean;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ 
  title, 
  subtitle, 
  description,
  centered = true 
}) => {
  return (
    <motion.div 
      className={`mb-12 md:mb-16 ${centered ? 'text-center' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {subtitle && (
        <p className="text-accent mb-2 uppercase tracking-wider">
          {subtitle}
        </p>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl mb-4">
        {title}
      </h2>
      {description && (
        <p className="text-muted-foreground max-w-2xl mx-auto">
          {description}
        </p>
      )}
    </motion.div>
  );
};
