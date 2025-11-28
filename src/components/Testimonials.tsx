import React from 'react';
import { motion } from 'motion/react';
import { Star, Quote } from 'lucide-react';
import { Section, Container, SectionHeader } from './Section';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './ui/carousel';
import Autoplay from 'embla-carousel-autoplay';

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      id: 1,
      name: 'John Anderson',
      company: 'US Retail Group',
      country: 'USA',
      rating: 5,
      text: 'Outstanding quality and timely delivery. Sidra Cotton City has been our trusted partner for over 3 years. Their attention to detail and commitment to excellence is unmatched.',
      image: '👨‍💼',
    },
    {
      id: 2,
      name: 'Sarah Williams',
      company: 'European Fashion House',
      country: 'UK',
      rating: 5,
      text: 'Exceptional craftsmanship and professional service. The quality of their cotton garments exceeds our expectations every time. Highly recommended for international buyers.',
      image: '👩‍💼',
    },
    {
      id: 3,
      name: 'Ahmed Al-Mansouri',
      company: 'Middle East Trading Co.',
      country: 'UAE',
      rating: 5,
      text: 'Reliable manufacturing partner with competitive pricing. Their modern facilities and skilled workforce ensure consistent quality. We have built a strong business relationship.',
      image: '👨',
    },
  ];

  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  return (
    <Section id="testimonials" background="white">
      <Container>
        <SectionHeader
          subtitle="Client Testimonials"
          title="What Our Clients Say"
          description="Trusted by international brands and retailers worldwide"
        />

        <div className="max-w-4xl mx-auto">
          <Carousel
            plugins={[plugin.current]}
            className="w-full"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
          >
            <CarouselContent>
              {testimonials.map((testimonial) => (
                <CarouselItem key={testimonial.id}>
                  <div className="px-4 py-8">
                    <motion.div
                      className="bg-gradient-to-br from-secondary to-background dark:from-card dark:to-card/80 rounded-2xl p-8 md:p-12 shadow-xl border border-border"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6 }}
                    >
                      {/* Quote Icon */}
                      <div className="flex justify-center mb-6">
                        <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center">
                          <Quote className="w-8 h-8 text-accent" />
                        </div>
                      </div>

                      {/* Rating */}
                      <div className="flex justify-center gap-1 mb-6">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                        ))}
                      </div>

                      {/* Testimonial Text */}
                      <p className="text-center text-lg md:text-xl text-foreground/90 mb-8 leading-relaxed italic">
                        "{testimonial.text}"
                      </p>

                      {/* Client Info */}
                      <div className="flex items-center justify-center gap-4">
                        <div className="text-4xl">{testimonial.image}</div>
                        <div className="text-left">
                          <div className="text-lg">{testimonial.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {testimonial.company}
                          </div>
                          <div className="text-xs text-accent">{testimonial.country}</div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        </div>
      </Container>
    </Section>
  );
};

export default Testimonials;
