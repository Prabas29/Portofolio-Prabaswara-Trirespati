# Portofolio — Prabaswara Trirespati

Website portofolio single-page (React + Vite + Tailwind CSS) dua bahasa
(Indonesia / English), lengkap dengan dashboard admin untuk mengedit isi
website tanpa menyentuh kode.

## Menjalankan

```bash
npm install
npm run dev      # server pengembangan (http://localhost:5173)
npm run build    # build produksi ke folder dist/
npm run preview  # preview hasil build
```

## Dashboard Admin

Buka **`/admin`** (mis. `https://situs-anda.vercel.app/admin`) lalu masuk
dengan akun admin. Dari sana Anda bisa:

- Mengedit semua teks tiap section, per bahasa (ID / EN)
- Menambah / menghapus / mengurutkan isi (pengalaman, proyek, sertifikat, dll)
- Mengunggah gambar (logo, sertifikat, foto profil) langsung dari browser
- Mengatur **urutan** dan **visibility** section — penomoran 01, 02, … otomatis
- **Membuat section baru** sendiri (teks bebas, daftar berpoin, atau kartu)

### Setup sekali di awal

1. **Buat tabel & storage** — buka Supabase → **SQL Editor** → **New query**,
   paste isi [`supabase-setup.sql`](supabase-setup.sql), klik **Run**.
2. **Buat akun admin** — Supabase → **Authentication → Users → Add user**,
   isi email + password, dan centang *Auto Confirm User*.
3. Buka `/admin`, login, edit, klik **Simpan**.

Sebelum ada data tersimpan, website memakai konten bawaan dari
`src/i18n/translations.js`. Setelah Anda menyimpan lewat dashboard, website
membaca dari Supabase. Kalau Supabase tidak bisa dihubungi, website otomatis
kembali memakai konten bawaan sehingga tidak pernah kosong.

## Struktur

- `src/App.jsx` — merender section sesuai urutan/visibility dari dokumen konten
- `src/components/` — satu komponen per section + Sidebar, CustomSection
- `src/content/contentModel.js` — bentuk dokumen konten, merge, parsing **bold**
- `src/i18n/` — `translations.js` (konten bawaan) + `LanguageContext.jsx`
  (pilihan bahasa & pemuatan konten dari Supabase)
- `src/admin/` — dashboard: `AdminApp` (gate login), `Dashboard`,
  `SectionEditor` (digerakkan `schema.js`), `LayoutEditor`, `Fields.jsx`
- `src/hooks/` — reveal-on-scroll, scroll-spy, scroll progress, notifikasi
  kunjungan, derivasi daftar section
- `api/notify-visit.js` — Vercel function pengirim notifikasi Telegram
- `tailwind.config.js` — palet warna & tipografi (design tokens)

## Environment variables (Vercel)

| Nama | Fungsi |
| --- | --- |
| `TELEGRAM_BOT_TOKEN` | token bot Telegram penerima notifikasi kunjungan |
| `TELEGRAM_CHAT_ID` | chat ID tujuan notifikasi |

Keduanya opsional — kalau kosong, fitur notifikasi diam saja tanpa error.

## Design system

Palet: `ink` (latar) / `paper` (teks) / `gold` (aksen biru) / `teal` (aksen
data). Font: Fraunces (display), Inter (body), JetBrains Mono (label/data).
Menghormati `prefers-reduced-motion` untuk aksesibilitas.
