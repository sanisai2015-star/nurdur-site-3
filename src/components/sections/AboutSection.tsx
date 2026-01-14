import React from 'react';
import { motion } from 'framer-motion';
import { Eye, Heart, Target } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import logo from '@/assets/df-logo.jpg';

export default function AboutSection() {
  const { t, dir, language } = useLanguage();

  const values = [
    { icon: Target, title: t('about.mission.title'), description: t('about.mission.text') },
    { icon: Eye, title: t('about.vision.title'), description: t('about.vision.text') },
    { icon: Heart, title: t('about.values.title'), description: t('about.values.text') }
  ];

  return (
    <section id="about" className="py-24 bg-background relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-secondary/50 to-transparent" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: dir === 'rtl' ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&q=80"
                alt="Construction"
                className="w-full aspect-[4/3] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-construction-dark/70 to-transparent" />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="absolute -bottom-8 -right-8 md:right-8 bg-white rounded-xl shadow-2xl p-6 max-w-xs"
            >
              <div className="flex items-center gap-4 mb-4">
                <img src={logo} alt="Logo" className="w-16 h-16 rounded-lg object-cover" />
                <div>
                  <h4 className="font-bold text-lg text-foreground">
                    {language === 'en' ? 'Est. 2022' : 'تأسست 2022'}
                  </h4>
                  <p className="text-muted-foreground text-sm">Baghdad, Iraq</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-accent font-semibold">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                {language === 'en' ? 'Trusted Delivery' : 'تنفيذ موثوق'}
              </div>
            </motion.div>

            <div className="absolute -top-6 -left-6 w-24 h-24 bg-accent rounded-xl -z-10" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: dir === 'rtl' ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-8">
              <span className="inline-block text-accent font-semibold uppercase tracking-wider mb-4">
                {t('about.tagline')}
              </span>
              <h2 className="section-title text-foreground">{t('about.title')}</h2>
              <div className="divider-accent mt-6 mx-0" />
            </div>

            <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
              {t('about.description')}
            </p>

            <div className="space-y-6">
              {values.map((v, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="flex gap-4 group"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    <v.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground mb-1">{v.title}</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">{v.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
