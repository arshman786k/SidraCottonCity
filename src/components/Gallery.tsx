import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { Button } from './ui/button';
import { useLanguage } from '../contexts/LanguageContext';
import { ImageWithFallback } from './figma/ImageWithFallback';

// Import images
import knittingImg from '../assets/images/Knitting.jpeg';
import dyeingImg from '../assets/images/Dyeing.jpeg';
import cuttingImg from '../assets/images/Cutting.jpeg';
import stitchingImg from '../assets/images/Sttiching Unit.jpg';
import qualityImg from '../assets/images/Quality Control.jpeg';
import packingImg from '../assets/images/Packing.jpeg';
import factoryImg from '../assets/images/Factory Building.jpg';
import factoryImg1 from '../assets/images/Factory Building_1.jpg';

export function Gallery() {
  const { t } = useLanguage();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', name: 'All Departments' },
    { id: 'knitting', name: 'Knitting' },
    { id: 'dyeing', name: 'Dyeing' },
    { id: 'cutting', name: 'Cutting' },
    { id: 'stitching', name: 'Stitching' },
    { id: 'finishing', name: 'Finishing' },
    { id: 'packing', name: 'Packing' },
    { id: 'factory', name: 'Factory & Workers' },
  ];

  const images = [
    {
      url: knittingImg,
      category: 'knitting',
      title: 'Knitting Department',
      description: 'Advanced knitting machinery',
      type: 'image',
    },
    {
      url: dyeingImg,
      category: 'dyeing',
      title: 'Dyeing Department',
      description: 'State-of-the-art dyeing facility',
      type: 'image',
    },
    {
      url: cuttingImg,
      category: 'cutting',
      title: 'Cutting Department',
      description: 'Precision cutting technology',
      type: 'image',
    },
    {
      url: stitchingImg,
      category: 'stitching',
      title: 'Stitching Department',
      description: 'Expert stitching workstations',
      type: 'image',
    },
    {
      url: qualityImg,
      category: 'finishing',
      title: 'Finishing & Quality Control',
      description: 'Quality control and finishing process',
      type: 'image',
    },
    {
      url: packingImg,
      category: 'packing',
      title: 'Packing Department',
      description: 'Professional packaging facility',
      type: 'image',
    },
    {
      url: factoryImg,
      category: 'factory',
      title: 'Factory Exterior',
      description: 'Our modern manufacturing facility',
      type: 'image',
    },
    {
      url: factoryImg1,
      category: 'factory',
      title: 'Material Selection',
      description: 'Premium quality material selection',
      type: 'image',
    },
  ];

  const filteredImages = activeCategory === 'all' 
    ? images 
    : images.filter(img => img.category === activeCategory);

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % filteredImages.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + filteredImages.length) % filteredImages.length);
    }
  };

  return (
    <section id="gallery" className="py-20 md:py-32 bg-background" ref={ref}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-emerald-600 mb-2 inline-block">
            {t('gallery')}
          </span>
          <h2 className="text-4xl md:text-5xl text-foreground mb-4">
            Department Gallery
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore our state-of-the-art manufacturing facilities
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-emerald-600 to-blue-600 mx-auto rounded-full mt-4" />
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <Button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              variant={activeCategory === category.id ? 'default' : 'outline'}
              className={activeCategory === category.id ? 'bg-emerald-600 hover:bg-emerald-700' : ''}
            >
              {category.name}
            </Button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.url}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4 }}
                whileHover={{ y: -8 }}
                className="group relative rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all cursor-pointer aspect-square"
                onClick={() => setSelectedImage(index)}
              >
                {image.type === 'video' ? (
                  <video
                    src={image.url}
                    className="w-full h-full object-cover"
                    muted
                    loop
                    playsInline
                    onMouseEnter={(e) => e.currentTarget.play()}
                    onMouseLeave={(e) => {
                      e.currentTarget.pause();
                      e.currentTarget.currentTime = 0;
                    }}
                  />
                ) : (
                  <ImageWithFallback
                    src={image.url}
                    alt={image.title}
                    className="w-full h-full object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white mb-1">{image.title}</h3>
                    <p className="text-white/80 text-sm">{image.description}</p>
                    {image.type === 'video' && (
                      <span className="inline-block mt-1 px-2 py-0.5 bg-emerald-600/80 rounded text-xs">Video</span>
                    )}
                  </div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <ZoomIn className="size-12 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Lightbox */}
        <AnimatePresence>
          {selectedImage !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
              onClick={() => setSelectedImage(null)}
            >
              {/* Close Button */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 text-white hover:bg-white/10 rounded-full"
                onClick={() => setSelectedImage(null)}
              >
                <X className="size-6" />
              </Button>

              {/* Navigation Buttons */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 text-white hover:bg-white/10 rounded-full"
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
              >
                <ChevronLeft className="size-8" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 text-white hover:bg-white/10 rounded-full"
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
              >
                <ChevronRight className="size-8" />
              </Button>

              {/* Image/Video */}
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                className="max-w-6xl max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
              >
                {filteredImages[selectedImage].type === 'video' ? (
                  <video
                    src={filteredImages[selectedImage].url}
                    className="max-w-full max-h-[90vh] object-contain rounded-lg"
                    controls
                    autoPlay
                    loop
                    playsInline
                  />
                ) : (
                  <ImageWithFallback
                    src={filteredImages[selectedImage].url}
                    alt={filteredImages[selectedImage].title}
                    className="max-w-full max-h-[90vh] object-contain rounded-lg"
                  />
                )}
                <div className="text-center mt-4">
                  <h3 className="text-white text-xl mb-2">
                    {filteredImages[selectedImage].title}
                  </h3>
                  <p className="text-white/70">
                    {filteredImages[selectedImage].description}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}