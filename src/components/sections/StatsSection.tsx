import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

function Counter({ end, suffix = '', duration = 2 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start: number | null = null;
    let raf = 0;

    const tick = (ts: number) => {
      if (start === null) start = ts;
      const p = Math.min((ts - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - p, 4);
      setCount(Math.floor(eased * end));
      if (p < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [duration, end, inView]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function StatsSection() {
  const { t, language } = useLanguage();

  const stats = [
    { value: 50, suffix: '+', label: t('stats.projects'), desc: language === 'en' ? 'Successfully completed' : 'تم إنجازها بنجاح' },
    { value: 3, suffix: '+', label: t('stats.experience'), desc: language === 'en' ? 'Industry excellence' : 'سنوات من التميز' },
    { value: 25, suffix: '+', label: t('stats.equipment'), desc: language === 'en' ? 'Modern machinery' : 'معدات حديثة' },
    { value: 100, suffix: '+', label: t('stats.team'), desc: language === 'en' ? 'Skilled professionals' : 'فريق محترف' },
  ];

  return (
    <section className="relative py-24 overflow-hidden" id="stats">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=2000&q=80"
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-construction-dark/90" />
        <div className="absolute inset-0 bg-pattern opacity-10" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="text-center group"
            >
              <div className="text-4xl md:text-5xl font-extrabold text-accent mb-2">
                <Counter end={s.value} suffix={s.suffix} />
              </div>
              <div className="w-12 h-1 bg-accent mx-auto mb-4 transition-all duration-300 group-hover:w-20" />
              <h3 className="text-lg md:text-xl font-bold text-white mb-1">{s.label}</h3>
              <p className="text-white/60 text-sm">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
