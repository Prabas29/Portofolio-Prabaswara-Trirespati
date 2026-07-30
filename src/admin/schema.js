// Declarative description of every editable section. The generic editor reads
// this, so adding a field here is all it takes to expose it in the dashboard.
//
// Field types: text | textarea | image | list (array of strings)
// A section may declare `fields` (flat values) and/or one `repeater`
// (an array of objects, e.g. work experience entries).

export const SECTION_SCHEMAS = {
  hero: {
    label: 'Hero',
    hint: 'Bagian paling atas website — kesan pertama pengunjung.',
    fields: [
      { key: 'kicker', label: 'Kicker (teks kecil di atas judul)' },
      { key: 'headlineLead', label: 'Judul — bagian normal' },
      { key: 'headlineAccent', label: 'Judul — bagian miring berwarna' },
      { key: 'sub', label: 'Paragraf pengantar', type: 'textarea' },
      { key: 'viewWork', label: 'Tombol utama' },
      { key: 'getInTouch', label: 'Tombol kedua' },
    ],
  },

  about: {
    label: 'Tentang Saya',
    header: true,
    paragraphs: { key: 'paragraphs', label: 'Paragraf' },
    fields: [
      { key: 'photo', label: 'Foto profil', type: 'image' },
      { key: 'photoCaption', label: 'Keterangan foto' },
      { key: 'photoLocation', label: 'Lokasi (kanan bawah foto)' },
    ],
  },

  competencies: {
    label: 'Kompetensi',
    header: true,
    repeater: {
      key: 'cards',
      itemLabel: 'Kartu',
      titleKey: 'title',
      fields: [
        { key: 'tag', label: 'Tag kecil (mis. // ANALISIS)' },
        { key: 'title', label: 'Judul' },
        { key: 'body', label: 'Deskripsi', type: 'textarea' },
      ],
    },
  },

  education: {
    label: 'Pendidikan',
    header: true,
    repeater: {
      key: 'items',
      itemLabel: 'Pendidikan',
      titleKey: 'school',
      fields: [
        { key: 'period', label: 'Periode (mis. 2023 — SEKARANG)' },
        { key: 'school', label: 'Institusi' },
        { key: 'degree', label: 'Jurusan / program' },
        { key: 'logo', label: 'Logo', type: 'image' },
        { key: 'points', label: 'Poin-poin', type: 'list' },
      ],
    },
  },

  experience: {
    label: 'Pengalaman Kerja',
    header: true,
    repeater: {
      key: 'roles',
      itemLabel: 'Pengalaman',
      titleKey: 'role',
      fields: [
        { key: 'period', label: 'Periode (mis. FEB 2026 — SEKARANG)' },
        { key: 'role', label: 'Posisi' },
        { key: 'org', label: 'Perusahaan / organisasi' },
        { key: 'logo', label: 'Logo', type: 'image' },
        { key: 'points', label: 'Poin-poin pekerjaan', type: 'list' },
      ],
    },
  },

  projects: {
    label: 'Proyek',
    header: true,
    extraFields: [{ key: 'cta', label: 'Teks tombol tiap kartu' }],
    repeater: {
      key: 'items',
      itemLabel: 'Proyek',
      titleKey: 'title',
      fields: [
        { key: 'index', label: 'Label kategori (mis. 01 / DATA ANALYTICS)' },
        { key: 'title', label: 'Nama proyek' },
        { key: 'body', label: 'Deskripsi', type: 'textarea' },
        { key: 'stack', label: 'Teknologi', type: 'list' },
        { key: 'href', label: 'Link proyek' },
      ],
    },
  },

  skills: {
    label: 'Keahlian',
    header: true,
    repeater: {
      key: 'groups',
      itemLabel: 'Grup',
      titleKey: 'label',
      fields: [
        { key: 'label', label: 'Nama grup' },
        { key: 'items', label: 'Daftar keahlian', type: 'list' },
      ],
    },
  },

  certifications: {
    label: 'Sertifikasi',
    header: true,
    extraFields: [{ key: 'cta', label: 'Teks tombol tiap kartu' }],
    repeater: {
      key: 'items',
      itemLabel: 'Sertifikat',
      titleKey: 'name',
      fields: [
        { key: 'name', label: 'Nama sertifikat' },
        { key: 'issuer', label: 'Penerbit' },
        { key: 'year', label: 'Tahun' },
        { key: 'image', label: 'Gambar sertifikat', type: 'image' },
      ],
    },
  },

  contact: {
    label: 'Kontak',
    fields: [
      { key: 'eyebrow', label: 'Eyebrow' },
      { key: 'headlineLead', label: 'Judul — bagian normal' },
      { key: 'headlineAccent', label: 'Judul — bagian miring berwarna' },
    ],
    repeater: {
      key: 'items',
      itemLabel: 'Kontak',
      titleKey: 'label',
      fields: [
        { key: 'label', label: 'Label (mis. Email)' },
        { key: 'value', label: 'Yang ditampilkan' },
        { key: 'href', label: 'Link (mailto: / tel: / https:)' },
      ],
    },
  },

  sidebar: {
    label: 'Sidebar & lain-lain',
    hint: 'Teks kecil di sidebar dan badge pengunjung.',
    fields: [{ key: 'tagline', label: 'Tagline di bawah nama' }],
  },
}

// Header fields shared by sections that use the numbered-eyebrow layout.
export const HEADER_FIELDS = [
  { key: 'eyebrow', label: 'Eyebrow (label kecil di atas judul)' },
  { key: 'title', label: 'Judul section' },
  { key: 'note', label: 'Catatan singkat (kanan judul)', type: 'textarea' },
]

// Fields for a section the owner creates themselves.
export const CUSTOM_FIELDS = [
  { key: 'navLabel', label: 'Nama di menu navigasi' },
  { key: 'eyebrow', label: 'Eyebrow' },
  { key: 'title', label: 'Judul section' },
  { key: 'note', label: 'Catatan singkat (kanan judul)', type: 'textarea' },
]

export const CUSTOM_KINDS = [
  { value: 'text', label: 'Teks bebas (paragraf)' },
  { value: 'list', label: 'Daftar berpoin' },
  { value: 'cards', label: 'Kartu (grid 2 kolom)' },
]
