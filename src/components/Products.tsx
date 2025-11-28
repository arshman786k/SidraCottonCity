
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { ShoppingBag } from 'lucide-react';
import { Button } from './ui/button';
import { useLanguage } from '../contexts/LanguageContext';
import { ImageWithFallback } from './figma/ImageWithFallback';
import tshirtImg from '../assets/images/T.Shirts.jpeg';
import poloImg from '../assets/images/Classic strip polo.jpeg';
import hoodieImg from '../assets/images/Hoodies.jpeg';
import trouserImg from '../assets/images/Trouser.jpeg';
import formalImg from '../assets/images/Under Shirt.jpeg';
import kidsImg from '../assets/images/T.Shirts.jpeg';
import jeansImg from '../assets/images/Jeans.jpeg';
import sweatImg from '../assets/images/Sweat shirt.jpeg';
import boxerBriefImg from '../assets/images/Boxer Brief.jpeg';
import boxerShortImg from '../assets/images/Cotton Boxer Short.jpeg';
import sandoVestImg from '../assets/images/Jeans.jpeg';

const Products = () => {
  const { t } = useLanguage();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', name: t('allProducts') },
    { id: 'tshirts', name: 'T-Shirts' },
    { id: 'polo', name: 'Polo Shirts' },
    { id: 'hoodies', name: 'Hoodies' },
    { id: 'formal', name: 'Formal Shirts' },
    { id: 'pants', name: 'Pants & Trousers' },
    { id: 'jeans', name: 'Jeans' },
    { id: 'kids', name: 'Kids Wear' },
  ];

 const products = [
  {
    id: 1,
    name: 'Premium Cotton T-Shirt',
    category: 'tshirts',
    image: tshirtImg,
    description: '100% Premium Cotton, Multiple Colors Available',
    features: ['Breathable', 'Durable', 'Comfort Fit'],
  },
  {
    id: 2,
    name: 'Classic Polo Shirt',
    category: 'polo',
    image: poloImg,
    description: 'Premium Pique Cotton Polo',
    features: ['Classic Design', 'Quality Stitching', 'All Sizes'],
  },
  {
    id: 3,
    name: 'Comfort Hoodie',
    category: 'hoodies',
    image: hoodieImg,
    description: 'Soft Cotton Blend Hoodie',
    features: ['Warm', 'Comfortable', 'Stylish'],
  },
  {
    id: 4,
    name: 'Cotton Trousers',
    category: 'pants',
    image: trouserImg,
    description: 'Premium Cotton Casual Pants',
    features: ['Perfect Fit', 'Quality Fabric', 'Long Lasting'],
  },
  {
    id: 5,
    name: 'Formal Shirt',
    category: 'formal',
    image: formalImg,
    description: 'Premium Formal Cotton Shirt',
    features: ['Professional', 'Iron-Free', 'Premium Quality'],
  },
  {
    id: 6,
    name: 'Kids Cotton Wear',
    category: 'kids',
    image: kidsImg,
    description: 'Soft & Safe Cotton for Kids',
    features: ['Skin-Friendly', 'Colorfast', 'Comfortable'],
  },
  {
    id: 7,
    name: 'Premium Jeans',
    category: 'jeans',
    image: jeansImg,
    description: 'Classic Denim Jeans',
    features: ['Durable', 'Comfortable', 'All Sizes'],
  },
  {
    id: 8,
    name: 'Sweat Shirt',
    category: 'hoodies',
    image: sweatImg,
    description: 'Comfortable Sweat Shirt',
    features: ['Warm', 'Soft', 'Casual'],
  },
  {
    id: 9,
    name: 'Boxer Brief',
    category: 'kids',
    image: boxerBriefImg,
    description: 'Comfortable Cotton Boxer Brief',
    features: ['Breathable', 'Soft', 'Premium Quality'],
  },
  {
    id: 10,
    name: 'Cotton Boxer Short',
    category: 'kids',
    image: boxerShortImg,
    description: 'Premium Cotton Boxer Short',
    features: ['Comfortable', 'Durable', 'All Sizes'],
  },

];

  const filteredProducts = activeCategory === 'all'
    ? products
    : products.filter(product => product.category === activeCategory);

  return (
    <section id="products" className="py-20 md:py-32 bg-muted/30" ref={ref}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-emerald-600 mb-2 inline-block">
            {t('products')}
          </span>
          <h2 className="text-4xl md:text-5xl text-foreground mb-4">
            {t('productsTitle')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('productsSubtitle')}
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

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-card border border-border rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all group"
              >
                {/* Image */}
                <div className="relative h-80 overflow-hidden bg-muted">
                  <ImageWithFallback
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Quick View Button */}
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button
                      size="icon"
                      className="bg-white/90 hover:bg-white text-emerald-600 rounded-full shadow-lg"
                    >
                      <ShoppingBag className="size-5" />
                    </Button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl text-foreground mb-2">{product.name}</h3>
                  <p className="text-muted-foreground mb-4">{product.description}</p>
                  
                  {/* Features */}
                  <div className="flex flex-wrap gap-2">
                    {product.features.map((feature, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 rounded-full text-sm"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground mb-4">
            Custom orders and bulk inquiries are welcome
          </p>
          <Button
            size="lg"
            className="bg-emerald-600 hover:bg-emerald-700"
            onClick={() => {
              const element = document.querySelector('#contact');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            Request Custom Order
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

export default Products;
