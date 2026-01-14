import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function ContactSection() {
  const { t, language } = useLanguage();

  return (
    <section id="contact" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=2000&q=80"
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-primary/90" />
        <div className="absolute inset-0 bg-pattern opacity-10" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            {language === 'en' ? 'Let\'s talk about your next project' : 'دعنا نتحدث عن مشروعك القادم'}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-xl text-white/80 mb-10"
          >
            {language === 'en'
              ? 'Send us details and we will get back to you quickly.'
              : 'أرسل لنا التفاصيل وسنعاود الاتصال بك بسرعة.'}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-6"
          >
            <a
              href="tel:+447777777777"
              className="flex items-center gap-3 bg-white/10 hover:bg-white/15 transition rounded-2xl px-6 py-4 text-white"
            >
              <span className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                <Phone className="w-5 h-5" />
              </span>
              <div className="text-start">
                <div className="text-white/70 text-sm">{t('contact.info.phone')}</div>
                <div className="font-semibold">+44 7777 777 777</div>
              </div>
            </a>

            <a
              href="mailto:info@yourcompany.com"
              className="flex items-center gap-3 bg-white/10 hover:bg-white/15 transition rounded-2xl px-6 py-4 text-white"
            >
              <span className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                <Mail className="w-5 h-5" />
              </span>
              <div className="text-start">
                <div className="text-white/70 text-sm">{t('contact.info.email')}</div>
                <div className="font-semibold">info@yourcompany.com</div>
              </div>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
