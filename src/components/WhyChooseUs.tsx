import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'motion/react';
import { Award, Cpu, Users, Leaf, Clock, HeadphonesIcon } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Section, Container, SectionHeader } from './Section';

interface CounterProps {
  from: number;
  to: number;
  duration?: number;
}

const Counter: React.FC<CounterProps> = ({ from, to, duration = 2 }) => {
  const count = useMotionValue(from);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const [value, setValue] = useState(from);

  useEffect(() => {
    const controls = animate(count, to, {
      duration,
      onUpdate: (latest) => setValue(Math.round(latest)),
    });
    return controls.stop;
  }, [to, count, duration]);

  return <span>{value}</span>;
};

const WhyChooseUs: React.FC = () => {
  const { t } = useLanguage();
  const [inView, setInView] = useState(false);

  const features = [
    {
      icon: <Award className="w-8 h-8" />,
      title: t('whyus.quality.title'),
      description: t('whyus.quality.desc'),
      color: 'from-amber-500 to-orange-600',
    },
    {
      icon: <Cpu className="w-8 h-8" />,
      title: t('whyus.tech.title'),
      description: t('whyus.tech.desc'),
      color: 'from-blue-500 to-cyan-600',
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: t('whyus.workforce.title'),
      description: t('whyus.workforce.desc'),
      color: 'from-purple-500 to-pink-600',
    },
    {
      icon: <Leaf className="w-8 h-8" />,
      title: t('whyus.eco.title'),
      description: t('whyus.eco.desc'),
      color: 'from-accent to-emerald-600',
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: 'High Capacity',
      description: t('whyus.capacity.desc'),
      color: 'from-red-500 to-rose-600',
    },
    {
      icon: <HeadphonesIcon className="w-8 h-8" />,
      title: t('whyus.support.title'),
      description: t('whyus.support.desc'),
      color: 'from-indigo-500 to-blue-600',
    },
  ];

  const achievements = [
    { value: 99, suffix: '%', label: 'Quality Rate', duration: 2 },
    { value: 15, suffix: '+', label: 'Years Experience', duration: 1.5 },
    { value: 500, suffix: '+', label: 'Employees', duration: 2.5 },
    { value: 10000, suffix: '+', label: 'Daily Capacity', duration: 3 },
  ];

  return (
    <Section id="whyus" background="white">
      <Container>
        <SectionHeader
          subtitle={t('whyus.subtitle')}
          title={t('whyus.title')}
        />

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <motion.div
                className="h-full bg-background dark:bg-card rounded-2xl p-8 border border-border hover:border-accent/50 transition-all shadow-lg hover:shadow-2xl"
                whileHover={{ y: -10, scale: 1.02 }}
              >
                {/* Icon */}
                <motion.div
                  className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white shadow-lg mb-6 group-hover:scale-110 transition-transform`}
                  whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  {feature.icon}
                </motion.div>

                {/* Title */}
                <h3 className="text-xl mb-3 group-hover:text-accent transition-colors">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>

                {/* Decorative Element */}
                <div className="mt-6 h-1 w-12 bg-gradient-to-r from-accent to-transparent rounded-full group-hover:w-24 transition-all" />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Achievement Stats */}
        <motion.div
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary/95 to-accent p-12 shadow-2xl"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1, transition: { duration: 0.8 } }}
          viewport={{ once: true, margin: "-100px" }}
          onViewportEnter={() => setInView(true)}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '40px 40px'
            }} />
          </div>

          {/* Content */}
          <div className="relative z-10">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-3xl md:text-4xl text-white mb-3">
                Our Achievements
              </h3>
              <p className="text-white/80 max-w-2xl mx-auto">
                Numbers that speak for our commitment to excellence and customer satisfaction
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  className="text-center p-6 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20"
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.15)' }}
                >
                  <motion.div
                    className="text-4xl md:text-5xl text-white mb-2"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 + 0.3 }}
                  >
                    {inView && <Counter from={0} to={achievement.value} duration={achievement.duration} />}
                    {achievement.suffix}
                  </motion.div>
                  <div className="text-white/80 text-sm">
                    {achievement.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Certifications */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-2xl text-center mb-8">Certifications & Awards</h3>
          <div className="flex flex-wrap justify-center items-center gap-8">
            {[
              { name: 'ISO 9001:2015', subtitle: 'Quality Management' },
              { name: 'OEKO-TEX', subtitle: 'Safe Textiles' },
              { name: 'GOTS', subtitle: 'Organic Textile' },
              { name: 'Fair Trade', subtitle: 'Ethical Production' },
            ].map((cert, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center p-6 rounded-xl bg-secondary hover:bg-accent/10 transition-colors border border-border min-w-[160px]"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.1, y: -5 }}
              >
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-3">
                  <Award className="w-8 h-8 text-accent" />
                </div>
                <div className="text-center text-accent mb-1">{cert.name}</div>
                <div className="text-center text-xs text-muted-foreground">{cert.subtitle}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </Section>
  );
};

export default WhyChooseUs;
