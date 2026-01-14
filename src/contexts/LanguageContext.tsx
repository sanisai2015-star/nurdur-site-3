import React, { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  dir: 'ltr' | 'rtl';
}

// A compact i18n map based on the strings in your uploaded code.
const translations: Record<Language, Record<string, string>> = {
  en: {
    // Nav
    'nav.home': 'Home',
    'nav.about': 'About Us',
    'nav.services': 'Services',
    'nav.projects': 'Projects',
    'nav.equipment': 'Equipment',
    'nav.contact': 'Contact',
    'nav.quote': 'Get a Quote',

    // Hero
    'hero.tagline': "Building Tomorrow's Future",
    'hero.title': 'DF Company',
    'hero.subtitle': 'General Contracting',
    'hero.description': 'We deliver high-quality projects with safety, innovation, and exceptional execution.',
    'hero.cta.projects': 'View Our Projects',
    'hero.cta.contact': 'Contact Us',
    'hero.scroll': 'Scroll to Explore',

    // About
    'about.tagline': 'Who We Are',
    'about.title': 'Excellence in Construction',
    'about.description': 'A modern contracting company delivering infrastructure, buildings, and specialized works.',
    'about.mission.title': 'Our Mission',
    'about.mission.text': 'Deliver projects that exceed expectations with quality and reliability.',
    'about.vision.title': 'Our Vision',
    'about.vision.text': 'To be a leading contractor recognized for integrity and impact.',
    'about.values.title': 'Our Values',
    'about.values.text': 'Quality • Safety • Integrity • Innovation • Customer Satisfaction',
    'about.cta': 'Learn More About Us',

    // Services
    'services.tagline': 'What We Do',
    'services.title': 'Our Services',
    'services.description': 'Comprehensive contracting solutions tailored to your needs.',
    'services.building.title': 'Building Construction',
    'services.building.desc': 'Commercial, residential, and industrial building solutions.',
    'services.infrastructure.title': 'Infrastructure Development',
    'services.infrastructure.desc': 'Roads, bridges, and public works projects.',
    'services.electrical.title': 'Electrical Works',
    'services.electrical.desc': 'Installations, power systems, and maintenance.',
    'services.water.title': 'Water & Sewage Networks',
    'services.water.desc': 'Design and construction for water and sewage systems.',
    'services.oil.title': 'Oil & Gas Infrastructure',
    'services.oil.desc': 'Specialized services for energy sector facilities.',
    'services.civil.title': 'Civil Works',
    'services.civil.desc': 'Earthworks, foundations, and structural works.',
    'services.cta': 'Explore All Services',

    // Stats
    'stats.projects': 'Projects Completed',
    'stats.experience': 'Years of Excellence',
    'stats.equipment': 'Heavy Equipment',
    'stats.team': 'Team Members',

    // Projects
    'projects.tagline': 'Our Portfolio',
    'projects.title': 'Featured Projects',
    'projects.description': 'A selection of recent work across sectors.',
    'projects.filter.all': 'All Projects',
    'projects.filter.buildings': 'Buildings',
    'projects.filter.infrastructure': 'Infrastructure',
    'projects.filter.electrical': 'Electrical',
    'projects.filter.water': 'Water Networks',
    'projects.cta': 'View All Projects',

    // Contact labels used
    'contact.info.phone': 'Phone',
    'contact.info.email': 'Email',

    // Footer
    'footer.description': 'Building tomorrow with quality, innovation, and commitment.',
    'footer.quick': 'Quick Links',
    'footer.services': 'Our Services',
    'footer.contact': 'Contact Info',
    'footer.rights': 'All Rights Reserved',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',

    // Common
    'common.readMore': 'Read More'
  },
  ar: {
    // Nav
    'nav.home': 'الرئيسية',
    'nav.about': 'من نحن',
    'nav.services': 'خدماتنا',
    'nav.projects': 'المشاريع',
    'nav.equipment': 'المعدات',
    'nav.contact': 'اتصل بنا',
    'nav.quote': 'طلب عرض سعر',

    // Hero
    'hero.tagline': 'نبني مستقبل الغد',
    'hero.title': 'شركة DF',
    'hero.subtitle': 'المقاولات العامة',
    'hero.description': 'نقدم مشاريع عالية الجودة مع السلامة والابتكار والتنفيذ الاحترافي.',
    'hero.cta.projects': 'عرض المشاريع',
    'hero.cta.contact': 'تواصل معنا',
    'hero.scroll': 'مرر للاستكشاف',

    // About
    'about.tagline': 'من نحن',
    'about.title': 'التميز في البناء',
    'about.description': 'شركة مقاولات حديثة تنفذ البنية التحتية والمباني والأعمال المتخصصة.',
    'about.mission.title': 'مهمتنا',
    'about.mission.text': 'تنفيذ مشاريع تفوق توقعات العملاء بجودة وموثوقية.',
    'about.vision.title': 'رؤيتنا',
    'about.vision.text': 'أن نكون من رواد المقاولات بنزاهة وأثر إيجابي.',
    'about.values.title': 'قيمنا',
    'about.values.text': 'الجودة • السلامة • النزاهة • الابتكار • رضا العملاء',
    'about.cta': 'اعرف المزيد عنا',

    // Services
    'services.tagline': 'ماذا نفعل',
    'services.title': 'خدماتنا',
    'services.description': 'حلول شاملة للمقاولات بما يناسب احتياجك.',
    'services.building.title': 'إنشاء المباني',
    'services.building.desc': 'حلول للمشاريع التجارية والسكنية والصناعية.',
    'services.infrastructure.title': 'تطوير البنية التحتية',
    'services.infrastructure.desc': 'طرق وجسور وأعمال عامة.',
    'services.electrical.title': 'الأعمال الكهربائية',
    'services.electrical.desc': 'تركيبات وأنظمة طاقة وصيانة.',
    'services.water.title': 'شبكات المياه والصرف',
    'services.water.desc': 'تصميم وتنفيذ شبكات المياه والصرف الصحي.',
    'services.oil.title': 'مشاريع النفط والغاز',
    'services.oil.desc': 'خدمات متخصصة لقطاع الطاقة.',
    'services.civil.title': 'الأعمال المدنية',
    'services.civil.desc': 'حفريات وأسـاسات وأعمال إنشائية.',
    'services.cta': 'استكشف جميع الخدمات',

    // Stats
    'stats.projects': 'مشروع مكتمل',
    'stats.experience': 'سنوات من التميز',
    'stats.equipment': 'معدة ثقيلة',
    'stats.team': 'أعضاء الفريق',

    // Projects
    'projects.tagline': 'أعمالنا',
    'projects.title': 'مشاريع مميزة',
    'projects.description': 'نماذج من أعمالنا في قطاعات مختلفة.',
    'projects.filter.all': 'جميع المشاريع',
    'projects.filter.buildings': 'المباني',
    'projects.filter.infrastructure': 'البنية التحتية',
    'projects.filter.electrical': 'الكهربائية',
    'projects.filter.water': 'شبكات المياه',
    'projects.cta': 'عرض جميع المشاريع',

    // Contact labels used
    'contact.info.phone': 'الهاتف',
    'contact.info.email': 'البريد الإلكتروني',

    // Footer
    'footer.description': 'نبني الغد بالجودة والابتكار والالتزام.',
    'footer.quick': 'روابط سريعة',
    'footer.services': 'خدماتنا',
    'footer.contact': 'معلومات الاتصال',
    'footer.rights': 'جميع الحقوق محفوظة',
    'footer.privacy': 'سياسة الخصوصية',
    'footer.terms': 'شروط الخدمة',

    // Common
    'common.readMore': 'اقرأ المزيد'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string) => translations[language][key] || key;
  const dir: 'ltr' | 'rtl' = language === 'ar' ? 'rtl' : 'ltr';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider');
  return ctx;
}
