import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

type Category = 'all' | 'buildings' | 'infrastructure' | 'electrical' | 'water';

export default function ProjectsSection() {
  const { t, language } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<Category>('all');

  const filters: { id: Category; label: string }[] = [
    { id: 'all', label: t('projects.filter.all') },
    { id: 'buildings', label: t('projects.filter.buildings') },
    { id: 'infrastructure', label: t('projects.filter.infrastructure') },
    { id: 'electrical', label: t('projects.filter.electrical') },
    { id: 'water', label: t('projects.filter.water') },
  ];

  const projects = [
    {
      id: 1,
      title: language === 'en' ? 'Commercial Complex' : 'مجمع تجاري',
      category: 'buildings' as const,
      location: language === 'en' ? 'Baghdad' : 'بغداد',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
      year: '2024',
    },
    {
      id: 2,
      title: language === 'en' ? 'Highway Development' : 'تطوير الطرق السريعة',
      category: 'infrastructure' as const,
      location: language === 'en' ? 'Basra' : 'البصرة',
      image: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&fit=crop&w=1200&q=80',
      year: '2023',
    },
    {
      id: 3,
      title: language === 'en' ? 'Power Station' : 'محطة توليد الطاقة',
      category: 'electrical' as const,
      location: language === 'en' ? 'Erbil' : 'أربيل',
      image: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&w=1200&q=80',
      year: '2024',
    },
    {
      id: 4,
      title: language === 'en' ? 'Water Treatment Plant' : 'محطة معالجة المياه',
      category: 'water' as const,
      location: language === 'en' ? 'Najaf' : 'النجف',
      image: 'https://images.unsplash.com/photo-1584267759777-8a74a4f72a91?auto=format&fit=crop&w=1200&q=80',
      year: '2023',
    }
  ];

  const filtered = useMemo(() => {
    if (activeFilter === 'all') return projects;
    return projects.filter((p) => p.category === activeFilter);
  }, [activeFilter, projects]);

  return (
    <section id="projects" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block text-accent font-semibold uppercase tracking-wider mb-4">{t('projects.tagline')}</span>
          <h2 className="section-title">{t('projects.title')}</h2>
          <div className="divider-accent" />
          <p className="section-subtitle mt-6">{t('projects.description')}</p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeFilter === f.id ? 'bg-primary text-primary-foreground shadow-lg' : 'bg-secondary text-foreground hover:bg-primary/10'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, index) => (
              <motion.article
                key={p.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
                className="group"
              >
                <div className="rounded-2xl overflow-hidden shadow-lg bg-white card-hover">
                  <div className="relative h-64 overflow-hidden">
                    <img src={p.image} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-construction-dark/90 via-construction-dark/20 to-transparent" />

                    <div className="absolute inset-0 flex flex-col justify-end p-6">
                      <span className="inline-flex w-fit px-3 py-1 bg-accent text-accent-foreground text-xs font-semibold rounded-full mb-3">{p.year}</span>
                      <h3 className="text-xl font-bold text-white mb-1">{p.title}</h3>
                      <p className="text-white/70 text-sm">{p.location}</p>
                    </div>

                    <a
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      aria-label="Project details"
                    >
                      <ExternalLink className="w-5 h-5 text-primary" />
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
