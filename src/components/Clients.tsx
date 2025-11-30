import React from 'react';
import { motion } from 'motion/react';
import { Section, Container, SectionHeader } from './Section';
import { ImageWithFallback } from './figma/ImageWithFallback';

// Import client logos
import company1 from '../assets/images/company1.jpg';
import company2 from '../assets/images/company2.jpg';
import company3 from '../assets/images/company3.jpg';
import company4 from '../assets/images/company4.jpg';
import company5 from '../assets/images/company5.jpg';

const Clients: React.FC = () => {
  const clients = [
    { id: 1, logo: company5, name: 'Client 1' },
    { id: 2, logo: company3, name: 'Client 2' },
    { id: 3, logo: company1, name: 'Client 3' },
    { id: 4, logo: company2, name: 'Client 4' },
    { id: 5, logo: company4, name: 'Client 5' },
  ];

  return (
    <Section id="clients" background="white">
      <Container>
        <SectionHeader
          subtitle="OUR PRIDE"
          title="Our Valuable Customers"
        />

        {/* Clients Logos */}
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-10 lg:gap-16 mt-12">
          {clients.map((client, index) => (
            <motion.div
              key={client.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.1 }}
              className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 p-4"
            >
              <ImageWithFallback
                src={client.logo}
                alt={client.name}
                className="h-20 md:h-24 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
              />
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
};

export default Clients;
