import React from 'react';
import { ArrowUp, Mail, MapPin, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import logo from '@/assets/df-logo.jpg';

export default function Footer() {
  const { t, language } = useLanguage();

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer id="contact" className="bg-construction-dark text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-pattern opacity-5" />

      <div className="container mx-auto px-4 pt-16 pb-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src={logo} alt="Logo" className="h-14 w-14 rounded-lg object-cover" />
              <div>
                <div className="font-bold text-lg">{language === 'en' ? 'DF Company' : 'شركة DF'}</div>
                <div className="text-white/60 text-sm">{language === 'en' ? 'General Contracting' : 'مقاولات عامة'}</div>
              </div>
            </div>
            <p className="text-white/70 leading-relaxed">
              {language === 'en'
                ? 'Building projects with quality, safety, and clear execution.'
                : 'نبني المشاريع بجودة عالية وسلامة وتنفيذ واضح.'}
            </p>
          </div>

          <div>
            <h4 className="text-accent font-bold mb-4">{language === 'en' ? 'Contact' : 'التواصل'}</h4>
            <ul className="space-y-3 text-white/70">
              <li className="flex gap-3 items-start">
                <MapPin className="w-5 h-5 text-accent mt-0.5" />
                <span>{language === 'en' ? 'Your Address, City, Country' : 'عنوانكم، المدينة، الدولة'}</span>
              </li>
              <li className="flex gap-3 items-center">
                <Phone className="w-5 h-5 text-accent" />
                <a className="hover:text-accent" href="tel:+00000000000">+00 000 000 000</a>
              </li>
              <li className="flex gap-3 items-center">
                <Mail className="w-5 h-5 text-accent" />
                <a className="hover:text-accent" href="mailto:info@example.com">info@example.com</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-accent font-bold mb-4">{language === 'en' ? 'Quick Links' : 'روابط سريعة'}</h4>
            <ul className="space-y-2 text-white/70">
              {['home', 'about', 'services', 'projects', 'contact'].map((id) => (
                <li key={id}>
                  <a className="hover:text-accent" href={`#${id}`}>{id}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 text-white/50 text-sm flex flex-col md:flex-row justify-between gap-2">
          <div>© {new Date().getFullYear()} DF Company. All rights reserved.</div>
          <div>{t('footer.rights')}</div>
        </div>
      </div>

      <motion.button
        onClick={scrollToTop}
        whileHover={{ scale: 1.08, y: -4 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-8 right-8 w-12 h-12 bg-accent text-accent-foreground rounded-full shadow-lg flex items-center justify-center z-40"
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-5 h-5" />
      </motion.button>
    </footer>
  );
}
