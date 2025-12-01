import React from 'react';
import { motion } from 'motion/react';
import { Globe2, TrendingUp, Users, Package } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Section, Container, SectionHeader } from './Section';
import WorldMapExports from './WorldMapExports';

const ExportMarkets: React.FC = () => {
  const { t } = useLanguage();

  const regions = [
    {
      name: 'North America',
      countries: ['USA'],
      icon: '🇺🇸',
      percentage: 5,
      color: 'from-blue-500 to-blue-600',
    },
    {
      name: 'Europe',
      countries: ['Germany', 'UK'],
      icon: '🇪🇺',
      percentage: 75,
      color: 'from-purple-500 to-purple-600',
    },
    {
      name: 'Middle East',
      countries: ['Saudi Arabia'],
      icon: '🇦🇪',
      percentage: 10,
      color: 'from-accent to-green-600',
    },
    {
      name: 'Asia Pacific',
      countries: ['Malysia'],
      icon: '🇦🇺',
      percentage: 10,
      color: 'from-orange-500 to-red-600',
    },
  ];

  const stats = [
    {
      icon: <Globe2 className="w-6 h-6" />,
      value: '5+',
      label: 'Countries',
      color: 'bg-blue-500',
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      value: '$5M+',
      label: 'Annual Export',
      color: 'bg-accent',
    },
    {
      icon: <Users className="w-6 h-6" />,
      value: '15+',
      label: 'Global Clients',
      color: 'bg-purple-500',
    },
    {
      icon: <Package className="w-6 h-6" />,
      value: '2M+',
      label: 'Units Shipped',
      color: 'bg-orange-500',
    },
  ];

  return (
    <Section id="markets" background="dark">
      <Container>
        <SectionHeader
          subtitle={t('markets.subtitle')}
          title={t('markets.title')}
          description={t('markets.description')}
        />

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center p-6 rounded-xl bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className={`w-14 h-14 ${stat.color} rounded-xl flex items-center justify-center text-white mx-auto mb-4 shadow-lg`}>
                {stat.icon}
              </div>
              <motion.div
                className="text-3xl md:text-4xl mb-2"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
              >
                {stat.value}
              </motion.div>
              <div className="text-sm text-primary-foreground/70">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* World Map Visualization */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-8">
            <Globe2 className="w-20 h-20 mx-auto mb-4 text-accent animate-pulse" />
            <h3 className="text-2xl mb-2">Global Reach</h3>
            <p className="text-primary-foreground/70">Exporting quality products worldwide</p>
          </div>

          <WorldMapExports />
        </motion.div>

        {/* Regional Breakdown */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {regions.map((region, index) => (
            <motion.div
              key={index}
              className="bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-6 border border-primary-foreground/20 hover:bg-primary-foreground/15 transition-all group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -10 }}
            >
              {/* Region Icon */}
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                {region.icon}
              </div>

              {/* Region Name */}
              <h3 className="text-xl mb-3 group-hover:text-accent transition-colors">
                {region.name}
              </h3>

              {/* Percentage Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-primary-foreground/70">Export Share</span>
                  <span className="text-accent">{region.percentage}%</span>
                </div>
                <div className="h-2 bg-primary-foreground/10 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full bg-gradient-to-r ${region.color} rounded-full`}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${region.percentage}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                  />
                </div>
              </div>

              {/* Countries */}
              <div className="space-y-2">
                {region.countries.map((country, idx) => (
                  <motion.div
                    key={idx}
                    className="text-sm text-primary-foreground/60 flex items-center gap-2"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 + idx * 0.05 }}
                  >
                    <div className="w-1 h-1 bg-accent rounded-full" />
                    {country}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Badges */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex flex-wrap justify-center gap-8 items-center p-8 rounded-2xl bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10">
            {['ISO 9001', 'GOTS Certified', 'OEKO-TEX', 'Fair Trade'].map((badge, index) => (
              <motion.div
                key={index}
                className="px-6 py-3 bg-accent/20 rounded-lg border border-accent/30"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.1 }}
              >
                <span className="text-sm">{badge}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </Section>
  );
};

export default ExportMarkets;
