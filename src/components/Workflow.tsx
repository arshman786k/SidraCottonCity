import React from 'react';
import { motion } from 'motion/react';
import { Scissors, Droplet, Ruler, Zap, CheckCircle, Package } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Section, Container, SectionHeader } from './Section';
import knittingImg from '../assets/images/Knitting.jpeg';
import dyeingImg from '../assets/images/Dyeing.jpeg';
import cuttingImg from '../assets/images/Cutting.jpeg';
import stitchingImg from '../assets/images/Sttiching Unit.jpg';
import qualityImg from '../assets/images/Quality Control.jpeg';
import packingImg from '../assets/images/Packing_1.jpg';

const Workflow: React.FC = () => {
  const { t } = useLanguage();

  const steps = [
    {
      icon: <Scissors className="w-8 h-8" />,
      title: t('workflow.step1.title'),
      description: t('workflow.step1.desc'),
      color: 'from-blue-500 to-blue-600',
      image: knittingImg,
    },
    {
      icon: <Droplet className="w-8 h-8" />,
      title: t('workflow.step2.title'),
      description: t('workflow.step2.desc'),
      color: 'from-purple-500 to-purple-600',
      image: dyeingImg,
    },
    {
      icon: <Ruler className="w-8 h-8" />,
      title: t('workflow.step3.title'),
      description: t('workflow.step3.desc'),
      color: 'from-orange-500 to-orange-600',
      image: cuttingImg,
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: t('workflow.step4.title'),
      description: t('workflow.step4.desc'),
      color: 'from-accent to-green-600',
      image: stitchingImg,
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: t('workflow.step5.title'),
      description: t('workflow.step5.desc'),
      color: 'from-primary to-blue-700',
      image: qualityImg,
    },
    {
      icon: <Package className="w-8 h-8" />,
      title: t('workflow.step6.title'),
      description: t('workflow.step6.desc'),
      color: 'from-red-500 to-pink-600',
      image: packingImg,
    },
  ];

  return (
    <Section id="workflow" background="white">
      <Container>
        <SectionHeader
          subtitle="Our Manufacturing Process"
          title="State of the Art Manufacturing"
        />

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group"
              style={{ backgroundColor: '#246323' }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={step.image} 
                  alt={step.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Title Badge */}
                <div className="inline-block mb-3">
                  <span className="text-sm font-semibold px-3 py-1 rounded-full" style={{ color: '#B8860B', backgroundColor: '#FFF8DC' }}>
                    state of the art
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-white mb-4">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-white leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
};

export default Workflow;
