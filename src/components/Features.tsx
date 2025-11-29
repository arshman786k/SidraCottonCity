import React from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';
import { Section, Container, SectionHeader } from './Section';

const Features: React.FC = () => {
  const { t } = useLanguage();

  const features = [
    {
      title: 'Premium Quality',
      desc: 'International standards',
      color: 'from-blue-500 to-blue-600',
      icon: '✓',
    },
    {
      title: 'Modern Technology',
      desc: 'State-of-the-art facilities',
      color: 'from-purple-500 to-purple-600',
      icon: '⚙️',
    },
    {
      title: 'Global Export',
      desc: 'Serving 25+ countries',
      color: 'from-orange-500 to-orange-600',
      icon: '🌍',
    },
    {
      title: 'Fast Delivery',
      desc: 'On-time guaranteed',
      color: 'from-accent to-green-600',
      icon: '⚡',
    },
  ];

  return (
    <Section id="features" background="white">
      <Container>
        <SectionHeader
          subtitle="Why Choose Us"
          title="Our Key Features"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-gradient-to-br from-background to-muted rounded-2xl p-8 border border-border shadow-lg hover:shadow-xl transition-shadow group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-3xl mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-accent transition-colors">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 bg-gradient-to-r from-accent/10 to-primary/10 rounded-2xl p-8 border border-accent/20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {[
            { value: '15+', label: 'Years Experience' },
            { value: '1M+', label: 'Products Made' },
            { value: '25+', label: 'Countries Export' },
            { value: '500+', label: 'Team Members' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="text-3xl md:text-4xl font-bold text-accent mb-2">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </Section>
  );
};

export default Features;
