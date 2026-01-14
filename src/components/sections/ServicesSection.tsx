import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Droplets, Fuel, HardHat, Route, Zap } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const bg = {
  building: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
  infrastructure: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&fit=crop&w=1200&q=80',
  electrical: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&w=1200&q=80',
  water: 'https://images.unsplash.com/photo-1584267759777-8a74a4f72a91?auto=format&fit=crop&w=1200&q=80',
  oil: 'https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?auto=format&fit=crop&w=1200&q=80',
  civil: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80'
};

export default function ServicesSection() {
  const { t } = useLanguage();

  const services = [
    { icon: Building2, title: t('services.building.title'), desc: t('services.building.desc'), image: bg.building },
    { icon: Route, title: t('services.infrastructure.title'), desc: t('services.infrastructure.desc'), image: bg.infrastructure },
    { icon: Zap, title: t('services.electrical.title'), desc: t('services.electrical.desc'), image: bg.electrical },
    { icon: Droplets, title: t('services.water.title'), desc: t('services.water.desc'), image: bg.water },
    { icon: Fuel, title: t('services.oil.title'), desc: t('services.oil.desc'), image: bg.oil },
    { icon: HardHat, title: t('services.civil.title'), desc: t('services.civil.desc'), image: bg.civil }
  ];

  return (
    <section id="services" className="py-24 bg-secondary relative overflow-hidden">
      <div className="absolute inset-0 bg-pattern opacity-20" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block text-accent font-semibold uppercase tracking-wider mb-4">{t('services.tagline')}</span>
          <h2 className="section-title text-foreground">{t('services.title')}</h2>
          <div className="divider-accent" />
          <p className="section-subtitle mt-6">{t('services.description')}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((s, i) => (
            <motion.article
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.07 }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg card-hover"
            >
              <div className="relative h-48 overflow-hidden">
                <img src={s.image} alt={s.title} className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-construction-dark/80 to-transparent" />
                <div className="absolute bottom-4 left-4 rtl:left-auto rtl:right-4">
                  <div className="w-14 h-14 rounded-xl bg-accent flex items-center justify-center shadow-lg">
                    <s.icon className="w-7 h-7 text-accent-foreground" />
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-3">{s.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
