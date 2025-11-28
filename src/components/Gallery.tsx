import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ZoomIn } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Section, Container, SectionHeader } from './Section';
import { ImageWithFallback } from './figma/ImageWithFallback';
import Masonry from 'react-responsive-masonry';

// Import images from src/assets/images
import knittingImg from '../assets/images/Knitting.jpeg';
import dyeingImg from '../assets/images/Dyeing.jpeg';
import cuttingImg from '../assets/images/Cutting.jpeg';
import stitchingImg from '../assets/images/Sttiching Unit.jpg';
import finishingImg from '../assets/images/Quality Control.jpeg';
import packingImg from '../assets/images/Packing.jpeg';
import exteriorImg from '../assets/images/Factory Building.jpg';
import teamImg from '../assets/images/Material selection.jpeg';

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  category: string;
}

const Gallery: React.FC = () => {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [lightboxImage, setLightboxImage] = useState<GalleryImage | null>(null);

  const categories = [
    { id: 'all', label: t('gallery.filter.all') },
    { id: 'knitting', label: t('gallery.filter.knitting') },
    { id: 'dyeing', label: t('gallery.filter.dyeing') },
    { id: 'cutting', label: t('gallery.filter.cutting') },
    { id: 'stitching', label: t('gallery.filter.stitching') },
    { id: 'finishing', label: t('gallery.filter.finishing') },
    { id: 'packing', label: t('gallery.filter.packing') },
    { id: 'exterior', label: t('gallery.filter.exterior') },
  ];

  const images: GalleryImage[] = [
    {
      id: 1,
      src: knittingImg,
      alt: 'Knitting Department',
      category: 'knitting',
    },
    {
      id: 2,
      src: dyeingImg,
      alt: 'Dyeing Process',
      category: 'dyeing',
    },
    {
      id: 3,
      src: cuttingImg,
      alt: 'Cutting Department',
      category: 'cutting',
    },
    {
      id: 4,
      src: stitchingImg,
      alt: 'Stitching Section',
      category: 'stitching',
    },
    {
      id: 5,
      src: finishingImg,
      alt: 'Finishing & Quality Control',
      category: 'finishing',
    },
    {
      id: 6,
      src: packingImg,
      alt: 'Packing & Warehouse',
      category: 'packing',
    },
    {
      id: 7,
      src: exteriorImg,
      alt: 'Factory Exterior',
      category: 'exterior',
    },
 
  ];

  const filteredImages = selectedCategory === 'all'
    ? images
    : images.filter(img => img.category === selectedCategory);

  return (
    <Section id="gallery" background="white">
      <Container>
        <SectionHeader
          subtitle={t('gallery.subtitle')}
          title={t('gallery.title')}
        />

        {/* Category Filters */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {categories.map((category, index) => (
            <motion.button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-2.5 rounded-full transition-all ${
                selectedCategory === category.id
                  ? 'bg-accent text-white shadow-lg'
                  : 'bg-secondary hover:bg-accent/10 text-foreground'
              }`}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Masonry Gallery */}
        <Masonry columnsCount={3} gutter="1rem">
          <AnimatePresence mode="popLayout">
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="relative group cursor-pointer overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-shadow"
                onClick={() => setLightboxImage(image)}
              >
                <ImageWithFallback
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-auto object-cover"
                />
                
                {/* Overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6"
                  whileHover={{ opacity: 1 }}
                >
                  <div className="text-white w-full">
                    <p className="mb-2">{image.alt}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm bg-accent/80 px-3 py-1 rounded-full">
                        {categories.find(c => c.id === image.category)?.label}
                      </span>
                      <ZoomIn className="w-6 h-6" />
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </Masonry>

        {/* Lightbox */}
        <AnimatePresence>
          {lightboxImage && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightboxImage(null)}
            >
              <motion.button
                className="absolute top-4 right-4 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
                onClick={() => setLightboxImage(null)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-6 h-6" />
              </motion.button>

              <motion.div
                className="max-w-6xl max-h-[90vh] relative"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <ImageWithFallback
                  src={lightboxImage.src}
                  alt={lightboxImage.alt}
                  className="w-full h-full object-contain rounded-lg"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
                  <p className="text-white text-xl">{lightboxImage.alt}</p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </Section>
  );
};

export default Gallery;