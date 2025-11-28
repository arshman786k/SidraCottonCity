import React, { createContext, useContext, useState } from 'react';

type Language = 'en' | 'ur';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About Us',
    'nav.workflow': 'Workflow',
    'nav.gallery': 'Gallery',
    'nav.products': 'Products',
    'nav.markets': 'Export Markets',
    'nav.whyus': 'Why Choose Us',
    'nav.contact': 'Contact',
    
    // Hero
    'hero.title': 'Sidra Cotton City',
    'hero.subtitle': 'Premium Textile Manufacturing Excellence',
    'hero.description': 'Leading manufacturer of high-quality cotton garments with state-of-the-art facilities and international export excellence.',
    'hero.cta.primary': 'Explore Products',
    'hero.cta.secondary': 'Contact Us',
    
    // About
    'about.title': 'About Sidra Cotton City',
    'about.subtitle': 'Excellence in Textile Manufacturing',
    'about.mission.title': 'Our Mission',
    'about.mission.text': 'To deliver premium quality cotton garments that meet international standards while fostering sustainable practices and empowering our workforce.',
    'about.vision.title': 'Our Vision',
    'about.vision.text': 'To be recognized as a global leader in textile manufacturing, setting industry benchmarks for quality, innovation, and customer satisfaction.',
    'about.description': 'Sidra Cotton City is a state-of-the-art textile manufacturing facility specializing in premium cotton garments. With cutting-edge technology and a skilled workforce, we serve international markets with dedication to quality and timely delivery.',
    
    // Workflow
    'workflow.title': 'Our Manufacturing Process',
    'workflow.subtitle': 'From Raw Material to Finished Product',
    'workflow.step1.title': 'Knitting',
    'workflow.step1.desc': 'Advanced knitting machines produce high-quality fabric with precision and consistency.',
    'workflow.step2.title': 'Dyeing',
    'workflow.step2.desc': 'State-of-the-art dyeing facility ensures vibrant, long-lasting colors with eco-friendly processes.',
    'workflow.step3.title': 'Cutting',
    'workflow.step3.desc': 'Computer-aided cutting systems ensure accuracy and minimal fabric waste.',
    'workflow.step4.title': 'Stitching',
    'workflow.step4.desc': 'Skilled workers and modern machines create perfect seams and finishes.',
    'workflow.step5.title': 'Finishing',
    'workflow.step5.desc': 'Quality control and finishing touches ensure every piece meets our standards.',
    'workflow.step6.title': 'Packing',
    'workflow.step6.desc': 'Professional packaging for safe delivery to clients worldwide.',
    
    // Gallery
    'gallery.title': 'Our Facility',
    'gallery.subtitle': 'A Glimpse Inside Our Manufacturing Excellence',
    'gallery.filter.all': 'All',
    'gallery.filter.knitting': 'Knitting',
    'gallery.filter.dyeing': 'Dyeing',
    'gallery.filter.cutting': 'Cutting',
    'gallery.filter.stitching': 'Stitching',
    'gallery.filter.finishing': 'Finishing',
    'gallery.filter.packing': 'Packing',
    'gallery.filter.exterior': 'Factory',
    
    // Products
    'products.title': 'Our Products',
    'products.subtitle': 'Premium Quality Cotton Garments',
    'products.category.all': 'All Products',
    'products.category.tshirts': 'T-Shirts',
    'products.category.polos': 'Polo Shirts',
    'products.category.hoodies': 'Hoodies',
    'products.category.sportswear': 'Sportswear',
    
    // Export Markets
    'markets.title': 'Export Markets',
    'markets.subtitle': 'Serving Clients Worldwide',
    'markets.description': 'We proudly export our premium cotton garments to major markets across the globe, building lasting relationships with international clients.',
    
    // Why Choose Us
    'whyus.title': 'Why Choose Sidra Cotton City',
    'whyus.subtitle': 'Your Trusted Manufacturing Partner',
    'whyus.quality.title': 'Premium Quality',
    'whyus.quality.desc': 'International quality standards with rigorous quality control',
    'whyus.capacity.title': 'High Capacity',
    'whyus.capacity.desc': 'Large-scale production with on-time delivery guaranteed',
    'whyus.tech.title': 'Modern Technology',
    'whyus.tech.desc': 'State-of-the-art machinery and advanced manufacturing processes',
    'whyus.workforce.title': 'Skilled Workforce',
    'whyus.workforce.desc': 'Experienced professionals committed to excellence',
    'whyus.eco.title': 'Eco-Friendly',
    'whyus.eco.desc': 'Sustainable practices and environmentally conscious production',
    'whyus.support.title': '24/7 Support',
    'whyus.support.desc': 'Dedicated customer service and communication',
    
    // Contact
    'contact.title': 'Get In Touch',
    'contact.subtitle': 'We\'d Love to Hear From You',
    'contact.info.title': 'Contact Information',
    'contact.form.title': 'Send us a Message',
    'contact.form.name': 'Your Name',
    'contact.form.email': 'Email Address',
    'contact.form.phone': 'Phone Number',
    'contact.form.subject': 'Subject',
    'contact.form.message': 'Message',
    'contact.form.submit': 'Send Message',
    'contact.whatsapp': 'Chat on WhatsApp',
    
    // Footer
    'footer.about': 'Sidra Cotton City is a leading textile manufacturer dedicated to producing premium quality cotton garments for international markets.',
    'footer.quicklinks': 'Quick Links',
    'footer.contact': 'Contact Info',
    'footer.follow': 'Follow Us',
    'footer.copyright': '© 2025 Sidra Cotton City. All rights reserved.',
    
    // Stats
    'stats.experience': 'Years Experience',
    'stats.products': 'Products Manufactured',
    'stats.countries': 'Export Countries',
    'stats.employees': 'Skilled Employees',
  },
  ur: {
    // Navigation
    'nav.home': 'ہوم',
    'nav.about': 'ہمارے بارے میں',
    'nav.workflow': 'ورک فلو',
    'nav.gallery': 'گیلری',
    'nav.products': 'مصنوعات',
    'nav.markets': 'برآمدی منڈیاں',
    'nav.whyus': 'ہمیں کیوں منتخب کریں',
    'nav.contact': 'رابطہ',
    
    // Hero
    'hero.title': 'صدرہ کاٹن سٹی',
    'hero.subtitle': 'پریمیم ٹیکسٹائل مینوفیکچرنگ کی بہترین خدمات',
    'hero.description': 'جدید ترین سہولیات اور بین الاقوامی برآمدی فضیلت کے ساتھ اعلیٰ معیار کے سوتی لباس کی معروف تیار کنندہ۔',
    'hero.cta.primary': 'مصنوعات دیکھیں',
    'hero.cta.secondary': 'رابطہ کریں',
    
    // About
    'about.title': 'صدرہ کاٹن سٹی کے بارے میں',
    'about.subtitle': 'ٹیکسٹائل مینوفیکچرنگ میں بہترین',
    'about.mission.title': 'ہمارا مشن',
    'about.mission.text': 'پائیدار طریقوں کو فروغ دیتے ہوئے اور اپنی افرادی قوت کو بااختیار بناتے ہوئے بین الاقوامی معیار کو پورا کرنے والے پریمیم معیار کے سوتی لباس فراہم کرنا۔',
    'about.vision.title': 'ہماری ویژن',
    'about.vision.text': 'ٹیکسٹائل مینوفیکچرنگ میں عالمی رہنما کے طور پر تسلیم کیا جانا، معیار، جدت اور کسٹمر کی اطمینان کے لیے صنعتی معیارات قائم کرنا۔',
    'about.description': 'صدرہ کاٹن سٹی ایک جدید ترین ٹیکسٹائل مینوفیکچرنگ سہولت ہے جو پریمیم سوتی لباس میں مہارت رکھتی ہے۔ جدید ٹیکنالوجی اور ہنر مند افرادی قوت کے ساتھ، ہم معیار اور بروقت ڈیلیوری کے عزم کے ساتھ بین الاقوامی منڈیوں کی خدمت کرتے ہیں۔',
    
    // Workflow
    'workflow.title': 'ہماری مینوفیکچرنگ کا عمل',
    'workflow.subtitle': 'خام مال سے تیار شدہ مصنوعات تک',
    'workflow.step1.title': 'بنائی',
    'workflow.step1.desc': 'جدید بنائی کی مشینیں درستگی اور مستقل مزاجی کے ساتھ اعلیٰ معیار کا کپڑا تیار کرتی ہیں۔',
    'workflow.step2.title': 'رنگائی',
    'workflow.step2.desc': 'جدید ترین رنگائی کی سہولت ماحول دوست عمل کے ساتھ چمکدار، دیرپا رنگوں کو یقینی بناتی ہے۔',
    'workflow.step3.title': 'کٹنگ',
    'workflow.step3.desc': 'کمپیوٹر کی مدد سے کٹنگ کے نظام درستگی اور کپڑے کے کم سے کم ضیاع کو یقینی بناتے ہیں۔',
    'workflow.step4.title': 'سلائی',
    'workflow.step4.desc': 'ہنر مند کارکن اور جدید مشینیں کامل سیون اور فنشنگ بناتی ہیں۔',
    'workflow.step5.title': 'فنشنگ',
    'workflow.step5.desc': 'معیار کی جانچ اور آخری چھونے کے ساتھ ہر ٹکڑا ہمارے معیار پر پورا اترتا ہے۔',
    'workflow.step6.title': 'پیکنگ',
    'workflow.step6.desc': 'دنیا بھر میں کلائنٹس تک محفوظ ڈیلیوری کے لیے پیشہ ورانہ پیکیجنگ۔',
    
    // Gallery
    'gallery.title': 'ہماری سہولت',
    'gallery.subtitle': 'ہماری مینوفیکچرنگ کی بہترین کی ایک جھلک',
    'gallery.filter.all': 'تمام',
    'gallery.filter.knitting': 'بنائی',
    'gallery.filter.dyeing': 'رنگائی',
    'gallery.filter.cutting': 'کٹنگ',
    'gallery.filter.stitching': 'سلائی',
    'gallery.filter.finishing': 'فنشنگ',
    'gallery.filter.packing': 'پیکنگ',
    'gallery.filter.exterior': 'فیکٹری',
    
    // Products
    'products.title': 'ہماری مصنوعات',
    'products.subtitle': 'پریمیم معیار کے سوتی لباس',
    'products.category.all': 'تمام مصنوعات',
    'products.category.tshirts': 'ٹی شرٹس',
    'products.category.polos': 'پولو شرٹس',
    'products.category.hoodies': 'ہوڈیز',
    'products.category.sportswear': 'کھیلوں کے لباس',
    
    // Export Markets
    'markets.title': 'برآمدی منڈیاں',
    'markets.subtitle': 'دنیا بھر میں کلائنٹس کی خدمت',
    'markets.description': 'ہم فخر سے اپنے پریمیم سوتی لباس دنیا بھر کی بڑی منڈیوں میں برآمد کرتے ہیں، بین الاقوامی کلائنٹس کے ساتھ دیرپا تعلقات قائم کرتے ہیں۔',
    
    // Why Choose Us
    'whyus.title': 'صدرہ کاٹن سٹی کیوں منتخب کریں',
    'whyus.subtitle': 'آپ کا قابل اعتماد مینوفیکچرنگ پارٹنر',
    'whyus.quality.title': 'پریمیم معیار',
    'whyus.quality.desc': 'سخت معیار کی جانچ کے ساتھ بین الاقوامی معیار',
    'whyus.capacity.title': 'زیادہ صلاحیت',
    'whyus.capacity.desc': 'بروقت ڈیلیوری کی ضمانت کے ساتھ بڑے پیمانے پر پیداوار',
    'whyus.tech.title': 'جدید ٹیکنالوجی',
    'whyus.tech.desc': 'جدید ترین مشینری اور جدید مینوفیکچرنگ کے عمل',
    'whyus.workforce.title': 'ہنر مند افرادی قوت',
    'whyus.workforce.desc': 'بہترینی کے لیے پرعزم تجربہ کار پیشہ ور افراد',
    'whyus.eco.title': 'ماحول دوست',
    'whyus.eco.desc': 'پائیدار طریقے اور ماحولیاتی طور پر شعوری پیداوار',
    'whyus.support.title': '24/7 سپورٹ',
    'whyus.support.desc': 'سرشار کسٹمر سروس اور رابطہ',
    
    // Contact
    'contact.title': 'رابطے میں رہیں',
    'contact.subtitle': 'ہم آپ سے سننا پسند کریں گے',
    'contact.info.title': 'رابطے کی معلومات',
    'contact.form.title': 'ہمیں پیغام بھیجیں',
    'contact.form.name': 'آپ کا نام',
    'contact.form.email': 'ای میل ایڈریس',
    'contact.form.phone': 'فون نمبر',
    'contact.form.subject': 'موضوع',
    'contact.form.message': 'پیغام',
    'contact.form.submit': 'پیغام بھیجیں',
    'contact.whatsapp': 'واٹس ایپ پر چیٹ کریں',
    
    // Footer
    'footer.about': 'صدرہ کاٹن سٹی ایک معروف ٹیکسٹائل مینوفیکچرر ہے جو بین الاقوامی منڈیوں کے لیے پریمیم معیار کے سوتی لباس تیار کرنے کے لیے وقف ہے۔',
    'footer.quicklinks': 'فوری لنکس',
    'footer.contact': 'رابطے کی معلومات',
    'footer.follow': 'ہمیں فالو کریں',
    'footer.copyright': '© 2025 صدرہ کاٹن سٹی۔ تمام حقوق محفوظ ہیں۔',
    
    // Stats
    'stats.experience': 'سالوں کا تجربہ',
    'stats.products': 'تیار شدہ مصنوعات',
    'stats.countries': 'برآمدی ممالک',
    'stats.employees': 'ہنر مند ملازمین',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};
