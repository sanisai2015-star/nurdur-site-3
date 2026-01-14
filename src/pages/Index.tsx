import { useMemo, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { company } from "@/content/company";
import logo from "@/assets/df-logo.jpg";

const cx = (...a: Array<string | false | undefined | null>) => a.filter(Boolean).join(" ");

export default function Index() {
  const { language, setLanguage, dir } = useLanguage();
  const isAr = language === "ar";

  const t = useMemo(() => {
    return {
      nav: isAr
        ? ["الرئيسية", "من نحن", "القدرات", "الخدمات", "القطاعات", "التواصل"]
        : ["Home", "About", "Capability", "Services", "Sectors", "Contact"],
      brochure: isAr ? "تحميل بروفايل الشركة" : "Download Company Profile",
      view: isAr ? "عرض" : "View",
      requestProjects: isAr ? "اطلب قائمة المشاريع" : "Request project list",
      highlights: isAr ? "أبرز المشاريع" : "Project Highlights",
    };
  }, [isAr]);

  const toggleLang = () => setLanguage(isAr ? "en" : "ar");

  return (
    <div dir={dir} className="min-h-screen bg-[#070A10] text-white">
      <Header
        isAr={isAr}
        t={t}
        onToggleLang={toggleLang}
        logoSrc={logo}
      />

      <main className="pt-[84px]">
        <Hero lang={language} />
        <Section id="about" eyebrow={isAr ? "نبذة" : "Overview"} title={company.about[language].title}>
          <p className="max-w-3xl text-white/80 leading-relaxed">
            {company.about[language].body}
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {company.kpis.map((k) => (
              <Kpi key={k.label} label={k.label} value={k.value} />
            ))}
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {company.visionValues[language].map((v) => (
              <Card key={v.title} title={v.title} desc={v.body} />
            ))}
          </div>
        </Section>

        <Section id="capability" eyebrow={isAr ? "القدرات" : "Capability"} title={isAr ? "قدراتنا" : "Our Capability"}>
          <CapabilityTabs lang={language} />
        </Section>

        <Section id="services" eyebrow={isAr ? "الخدمات" : "Services"} title={isAr ? "ماذا نقدم" : "What We Deliver"}>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {company.services[language].map((s) => (
              <Card key={s.title} title={s.title} desc={s.desc} />
            ))}
          </div>
        </Section>

        <Section id="projects" eyebrow={isAr ? "القطاعات" : "Sectors"} title={isAr ? "مجالات العمل" : "Project Sectors"}>
          <p className="max-w-3xl text-white/80 leading-relaxed">
            {company.projects[language].intro}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {company.projects[language].categories.map((c) => (
              <span
                key={c}
                className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/85 hover:bg-white/10 transition"
              >
                {c}
              </span>
            ))}
          </div>

          <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-lg font-semibold">{t.highlights}</h3>
              <a
                className="text-sm text-white/80 hover:text-white underline underline-offset-4 decoration-white/30"
                href="#contact"
              >
                {t.requestProjects}
              </a>
            </div>
            <p className="mt-2 text-white/70 text-sm leading-relaxed">
              {isAr
                ? "أضف مشاريعكم هنا لاحقًا على شكل بطاقات: (الموقع • العميل • تاريخ الإحالة • نسبة الإنجاز)."
                : "Add your real projects here later as cards: (location • client • award date • progress)."}
            </p>
          </div>
        </Section>

        <Section id="brochure" eyebrow={isAr ? "الملف التعريفي" : "Brochure"} title={isAr ? "تحميل بروفايل الشركة" : "Download our brochure"}>
          <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-6 lg:p-10">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <p className="text-white/80 max-w-2xl leading-relaxed">
                  {isAr
                    ? "حمّل بروفايل الشركة بصيغة PDF. يمكننا لاحقًا إضافة نسخة عربية/إنجليزية منفصلة."
                    : "Download the company profile PDF. You can later upload separate Arabic/English brochures if needed."}
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a className="btn-primary" href="/company-profile.pdf" target="_blank" rel="noreferrer">
                  {t.brochure} • {t.view}
                </a>
              </div>
            </div>
          </div>
        </Section>

        <Section id="contact" eyebrow={isAr ? "تواصل" : "Contact"} title={isAr ? "تواصل معنا" : "Contact us"}>
          <div className="grid gap-4 lg:grid-cols-3">
            <Info title={isAr ? "الهاتف" : "Phone"} lines={company.contact.phones} />
            <Info title={isAr ? "البريد" : "Email"} lines={[company.contact.emailPrimary]} />
            <Info title={isAr ? "العنوان" : "Address"} lines={[isAr ? company.contact.addressAr : company.contact.addressEn]} />
          </div>
        </Section>

        <Footer legal={company.brand.legal} />
      </main>

      <BgDecoration />
    </div>
  );
}

function Header({ isAr, t, onToggleLang, logoSrc }: { isAr: boolean; t: any; onToggleLang: () => void; logoSrc: string }) {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-[#070A10]/75 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between gap-4">
        <button onClick={() => scrollTo("home")} className="flex items-center gap-3 text-left">
          <img src={logoSrc} alt="DF Logo" className="h-10 w-10 rounded-xl border border-white/10 bg-white/5 object-cover" />
          <div className="leading-tight hidden sm:block">
            <div className="font-semibold">{company.brand.name}</div>
            <div className="text-xs text-white/60">{company.brand.legal}</div>
          </div>
        </button>

        <nav className="hidden md:flex items-center gap-6 text-sm text-white/80">
          <button className="hover:text-white transition" onClick={() => scrollTo("about")}>{t.nav[1]}</button>
          <button className="hover:text-white transition" onClick={() => scrollTo("capability")}>{t.nav[2]}</button>
          <button className="hover:text-white transition" onClick={() => scrollTo("services")}>{t.nav[3]}</button>
          <button className="hover:text-white transition" onClick={() => scrollTo("projects")}>{t.nav[4]}</button>
          <button className="hover:text-white transition" onClick={() => scrollTo("contact")}>{t.nav[5]}</button>
        </nav>

        <div className="flex items-center gap-3">
          <a className="btn-ghost hidden sm:inline-flex" href="/company-profile.pdf" target="_blank" rel="noreferrer">
            {t.brochure}
          </a>
          <button onClick={onToggleLang} className="btn-primary">
            {isAr ? "EN" : "AR"}
          </button>
        </div>
      </div>
    </header>
  );
}

function Hero({ lang }: { lang: "en" | "ar" }) {
  const h = company.hero[lang];
  const isAr = lang === "ar";

  return (
    <section id="home" className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(59,130,246,0.18),transparent_60%),radial-gradient(60%_40%_at_0%_80%,rgba(255,255,255,0.06),transparent_60%),radial-gradient(60%_40%_at_100%_80%,rgba(255,255,255,0.06),transparent_60%)]" />
      <div className="absolute inset-0 opacity-30 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:56px_56px]" />

      <div className="relative mx-auto max-w-6xl px-4 pt-16 pb-12 lg:pt-24 lg:pb-16">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs text-white/80">
            <span className="h-2 w-2 rounded-full bg-white/60" />
            {isAr ? "مقاولات عامة • بنى تحتية • كهرباء" : "General Contracting • Infrastructure • Electrical"}
          </div>

          <h1 className="mt-6 text-4xl md:text-6xl font-semibold tracking-tight">
            {h.headline}
          </h1>

          <p className="mt-5 text-white/75 text-base md:text-lg leading-relaxed">
            {h.subhead}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a className="btn-primary" href={h.ctas[0].href}>{h.ctas[0].label}</a>
            <a className="btn-ghost" href={h.ctas[1].href} target="_blank" rel="noreferrer">{h.ctas[1].label}</a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Section({ id, eyebrow, title, children }: any) {
  return (
    <section id={id} className="mx-auto max-w-6xl px-4 py-14 lg:py-20">
      <div className="mb-8">
        <div className="text-xs uppercase tracking-[0.22em] text-white/50">{eyebrow}</div>
        <h2 className="mt-3 text-2xl md:text-3xl font-semibold">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function Kpi({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 hover:bg-white/[0.05] transition">
      <div className="text-sm text-white/60">{label}</div>
      <div className="mt-2 text-lg font-semibold">{value}</div>
    </div>
  );
}

function Card({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 hover:bg-white/[0.05] transition">
      <div className="font-semibold">{title}</div>
      <div className="mt-2 text-sm text-white/70 leading-relaxed">{desc}</div>
    </div>
  );
}

function CapabilityTabs({ lang }: { lang: "en" | "ar" }) {
  const items = company.capability[lang];
  const [active, setActive] = useState(0);

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.3fr]">
      <div className="flex lg:flex-col gap-2 overflow-auto lg:overflow-visible">
        {items.map((it, i) => (
          <button
            key={it.tab}
            onClick={() => setActive(i)}
            className={cx(
              "text-left shrink-0 rounded-2xl border px-4 py-3 transition",
              i === active
                ? "border-white/25 bg-white/[0.07]"
                : "border-white/10 bg-white/[0.03] hover:bg-white/[0.05]"
            )}
          >
            <div className="text-sm font-semibold">{it.tab}</div>
          </button>
        ))}
      </div>

      <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-6 lg:p-10">
        <div className="text-lg font-semibold">{items[active].tab}</div>
        <p className="mt-3 text-white/75 leading-relaxed">{items[active].body}</p>
      </div>
    </div>
  );
}

function Info({ title, lines }: { title: string; lines: string[] }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
      <div className="text-sm text-white/60">{title}</div>
      <div className="mt-3 space-y-1">
        {lines.map((l) => (
          <div key={l} className="text-white/85">{l}</div>
        ))}
      </div>
    </div>
  );
}

function Footer({ legal }: { legal: string }) {
  return (
    <footer className="border-t border-white/10 py-10">
      <div className="mx-auto max-w-6xl px-4 flex flex-col md:flex-row gap-3 md:items-center md:justify-between text-sm text-white/60">
        <div>© {new Date().getFullYear()} {legal}. All rights reserved.</div>
        <div className="text-white/50">BCG-inspired layout.</div>
      </div>
    </footer>
  );
}

function BgDecoration() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-white/[0.04] blur-3xl" />
      <div className="absolute bottom-[-220px] right-[-180px] h-[520px] w-[520px] rounded-full bg-blue-500/10 blur-3xl" />
    </div>
  );
}
