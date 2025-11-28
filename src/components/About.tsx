import React from 'react';
import { motion } from 'motion/react';
import { Target, Eye, Award, Users } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Section, Container, SectionHeader } from './Section';
import { ImageWithFallback } from './figma/ImageWithFallback';

const About: React.FC = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: <Target className="w-6 h-6" />,
      title: t('about.mission.title'),
      description: t('about.mission.text'),
      color: 'from-accent to-accent/70',
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: t('about.vision.title'),
      description: t('about.vision.text'),
      color: 'from-primary to-primary/70',
    },
  ];

  const highlights = [
    {
      icon: <Award className="w-8 h-8" />,
      title: 'ISO Certified',
      description: 'International quality standards',
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: '500+ Employees',
      description: 'Skilled workforce',
    },
  ];

  return (
    <Section id="about" background="white">
      <Container>
        <SectionHeader
          subtitle={t('about.subtitle')}
          title={t('about.title')}
        />

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Image Side */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1758518732175-5d608ba3abdf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB0ZWFtJTIwYnVzaW5lc3MlMjBtZWV0aW5nfGVufDF8fHx8MTc2NDMwNDI0MXww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Sidra Cotton City Team"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent" />
            </div>

            {/* Floating Stats Card */}
            <motion.div
              className="absolute -bottom-6 -right-6 bg-white dark:bg-card rounded-xl shadow-xl p-6 border border-border"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="flex items-center gap-4">
                {highlights.map((highlight, index) => (
                  <div key={index} className="text-center">
                    <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-2 mx-auto text-accent">
                      {highlight.icon}
                    </div>
                    <div className="text-sm whitespace-nowrap">{highlight.title}</div>
                    <div className="text-xs text-muted-foreground">{highlight.description}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              {t('about.description')}
            </p>

            <div className="space-y-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="relative"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="flex gap-4 p-6 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors group">
                    <div className={`flex-shrink-0 w-14 h-14 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center text-white shadow-lg`}>
                      {feature.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl mb-2 group-hover:text-accent transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Additional Stats Row */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 border-t border-border"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {[
            { value: '99%', label: 'Quality Rate' },
            { value: '15+', label: 'Years in Business' },
            { value: '10K+', label: 'Daily Production' },
            { value: '100%', label: 'Customer Satisfaction' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="text-center p-6 rounded-xl bg-gradient-to-br from-accent/5 to-primary/5 hover:from-accent/10 hover:to-primary/10 transition-all"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                className="text-3xl md:text-4xl text-accent mb-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
              >
                {stat.value}
              </motion.div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </Section>
  );
};

export default About;
