# Portofolio — Prabaswara Trirespati

Website portofolio single-page (React + Vite + Tailwind CSS) untuk Prabaswara
Trirespati — mahasiswa Computer Science & Product Specialist dengan minat karier
di Business Analysis, Product Management, dan Data Analytics.

## Menjalankan

```bash
npm install
npm run dev      # server pengembangan (http://localhost:5173)
npm run build    # build produksi ke folder dist/
npm run preview  # preview hasil build
```

## Struktur

- `src/App.jsx` — komposisi halaman + wiring hooks
- `src/components/` — satu komponen per section (Hero, About, Competencies,
  Experience, Projects, Skills, Certifications, Contact, Footer) + Sidebar
- `src/hooks/` — `useReveal` (reveal-on-scroll), `useScrollSpy` (nav aktif),
  `useScrollProgress` (progress bar sidebar)
- `src/data/nav.js` — daftar section untuk sidebar & scroll-spy
- `tailwind.config.js` — palet warna & tipografi (design tokens)

## Design system

Palet: `ink` / `paper` / `gold` (aksen utama) / `teal` (aksen data).
Font: Fraunces (display), Inter (body), JetBrains Mono (label/data).
Menghormati `prefers-reduced-motion` untuk aksesibilitas.

## Catatan

Link "Lihat proyek" pada section Portofolio masih placeholder (`#`) — ganti
dengan URL Google Drive / Canva yang sesuai.
