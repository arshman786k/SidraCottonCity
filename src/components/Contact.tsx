import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, MessageCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { useLanguage } from '../contexts/LanguageContext';
import { Section, Container, SectionHeader } from './Section';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { toast } from 'sonner@2.0.3';

const Contact: React.FC = () => {
  const { t } = useLanguage();
  
  // Initialize EmailJS
  useEffect(() => {
    emailjs.init(import.meta.env.VITE_EMAILJS_USER_ID);
  }, []);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID as string,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string,
        {
          to_email: 'sidracottoncity1@gmail.com',
          from_email: formData.email,
          from_name: formData.name,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message,
        }
      );

      if (response.status === 200) {
        toast.success('Message sent successfully! We will get back to you soon.');
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
        });
      }
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Error sending message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <MapPin className="w-6 h-6" />,
      title: 'Address',
      value: 'Soa Gajjumatha 23KM Ferozepur Road Lahore, 53100, Pakistan',
      link: 'https://maps.google.com',
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: 'Phone',
      value: '+92 321 8296092',
      link: 'tel:+923218296092',
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'Email',
      value: 'sidracottoncity1@gmail.com',
      link: 'mailto:sidracottoncity1@gmail.com',
    },
  ];

  const whatsappNumber = '+923218296092';
  const whatsappMessage = encodeURIComponent('Hello! I would like to inquire about your products.');

  return (
    <Section id="contact" background="gray">
      <Container>
        <SectionHeader
          subtitle={t('contact.subtitle')}
          title={t('contact.title')}
        />

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info & Map */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div>
              <h3 className="text-2xl mb-6">{t('contact.info.title')}</h3>
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <motion.a
                    key={index}
                    href={info.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 p-4 rounded-xl bg-background dark:bg-card hover:bg-accent/5 transition-all border border-border group"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ x: 5 }}
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-colors">
                      {info.icon}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-muted-foreground mb-1">{info.title}</div>
                      <div className="group-hover:text-accent transition-colors">{info.value}</div>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* WhatsApp CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <a
                href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  className="w-full bg-green-600 hover:bg-green-700 text-white group"
                  size="lg"
                >
                  <MessageCircle className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
                  {t('contact.whatsapp')}
                </Button>
              </a>
            </motion.div>

            {/* Google Map Embed */}
            <motion.div
              className="rounded-2xl overflow-hidden shadow-lg border border-border h-80"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d54632.12345678901!2d73.08!3d31.42!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDI1JzEyLjAiTiA3M8KwMDQnNDguMCJF!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Sidra Cotton City Location"
              />
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-background dark:bg-card rounded-2xl p-8 shadow-lg border border-border">
              <h3 className="text-2xl mb-6">{t('contact.form.title')}</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  <label htmlFor="name" className="block mb-2 text-sm">
                    {t('contact.form.name')} *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your Name"
                    className="w-full"
                  />
                </motion.div>

                <motion.div
                  className="grid md:grid-cols-2 gap-6"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  <div>
                    <label htmlFor="email" className="block mb-2 text-sm">
                      {t('contact.form.email')} *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="your email"
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block mb-2 text-sm">
                      {t('contact.form.phone')}
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+92 300 1234567"
                      className="w-full"
                    />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                >
                  <label htmlFor="subject" className="block mb-2 text-sm">
                    {t('contact.form.subject')} *
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="Product Inquiry"
                    className="w-full"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                >
                  <label htmlFor="message" className="block mb-2 text-sm">
                    {t('contact.form.message')} *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Tell us about your requirements..."
                    rows={6}
                    className="w-full"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                >
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-accent hover:bg-accent/90 text-white group"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        {t('contact.form.submit')}
                      </>
                    )}
                  </Button>
                </motion.div>
              </form>
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
};

export default Contact;
