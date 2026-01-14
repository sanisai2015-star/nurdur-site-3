# DF Company Website (React + Vite + Tailwind)

This project is a working build of the website code style you shared (React + Tailwind + Framer Motion + bilingual RTL/LTR).

## 1) Install & run locally

1. Install Node.js (LTS) then in this folder:

```bash
npm install
npm run dev
```

Vite will show you the local URL (usually `http://localhost:5173`).

## 2) Replace company data

- Logo: `src/assets/df-logo.jpg`
- Company name, hero text, translations: `src/contexts/LanguageContext.tsx`
- Contact info: `src/components/layout/Footer.tsx` and `src/components/sections/ContactSection.tsx`

## 3) Build for production

```bash
npm run build
```

It outputs to `dist/`.

## 4) Deploy

### Vercel / Netlify (recommended)
- Framework: **Vite**
- Build command: `npm run build`
- Output directory: `dist`

### Hostinger / any shared hosting
Upload the **contents of `dist/`** to `public_html/`.

> If you use a custom domain, make sure you enable HTTPS (SSL) in your hosting panel.
