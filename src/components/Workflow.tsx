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
import packingImg from '../assets/images/Packing.jpeg';

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
    <Section id="workflow" background="gray">
      <Container>
        <SectionHeader
          subtitle={t('workflow.subtitle')}
          title={t('workflow.title')}
        />

        <div className="max-w-5xl mx-auto">
          {/* Desktop Timeline */}
          <div className="hidden md:block relative">
            {/* Vertical Line */}
            <motion.div
              className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-accent via-primary to-accent transform -translate-x-1/2"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />

            {steps.map((step, index) => (
              <motion.div
                key={index}
                className={`relative mb-16 ${
                  index % 2 === 0 ? 'pr-1/2 text-right' : 'pl-1/2 text-left'
                }`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
              >
                <div className={`inline-block max-w-md ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                  <motion.div
                    className="bg-background dark:bg-card rounded-xl shadow-lg p-6 border border-border hover:shadow-xl transition-shadow group"
                    whileHover={{ scale: 1.05 }}
                  >
                    {/* Image */}
                    <div className="mb-4 h-48 rounded-lg overflow-hidden">
                      <img 
                        src={step.image} 
                        alt={step.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    
                    <div className={`flex items-center gap-4 ${index % 2 === 0 ? 'flex-row-reverse' : 'flex-row'}`}>
                      <div className={`flex-shrink-0 w-16 h-16 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white shadow-lg`}>
                        {step.icon}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm text-accent mb-1">Step {index + 1}</div>
                        <h3 className="text-xl mb-2 group-hover:text-accent transition-colors">
                          {step.title}
                        </h3>
                      </div>
                    </div>
                    <p className="text-muted-foreground mt-4 leading-relaxed">
                      {step.description}
                    </p>
                  </motion.div>
                </div>

                {/* Center Circle */}
                <motion.div
                  className="absolute top-8 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-background dark:bg-card rounded-full border-4 border-accent shadow-lg flex items-center justify-center z-10"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.15 + 0.3 }}
                >
                  <div className="w-3 h-3 bg-accent rounded-full" />
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Mobile Timeline */}
          <div className="md:hidden space-y-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className="relative pl-12"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                {/* Vertical Line */}
                {index < steps.length - 1 && (
                  <div className="absolute left-6 top-16 bottom-0 w-0.5 bg-accent/30" />
                )}

                {/* Circle */}
                <motion.div
                  className="absolute left-2 top-2 w-8 h-8 bg-accent rounded-full flex items-center justify-center shadow-lg"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <div className="w-3 h-3 bg-white rounded-full" />
                </motion.div>

                {/* Card */}
                <motion.div
                  className="bg-background dark:bg-card rounded-xl shadow-lg p-6 border border-border"
                  whileHover={{ scale: 1.02 }}
                >
                  {/* Image */}
                  <div className="mb-4 h-40 rounded-lg overflow-hidden">
                    <img 
                      src={step.image} 
                      alt={step.title}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                  </div>

                  <div className="flex items-center gap-4 mb-4">
                    <div className={`flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white shadow-lg`}>
                      {step.icon}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-accent mb-1">Step {index + 1}</div>
                      <h3 className="text-lg">{step.title}</h3>
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-block bg-gradient-to-r from-accent/10 to-primary/10 rounded-2xl p-8 border border-accent/20">
            <h3 className="text-2xl mb-3">Quality Assured at Every Step</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our rigorous quality control process ensures that every garment meets international standards before reaching our clients.
            </p>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
};

export default Workflow;
