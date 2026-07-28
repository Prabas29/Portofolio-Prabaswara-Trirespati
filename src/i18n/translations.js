// All site copy in both languages. Structural/neutral data (links, images,
// logos, tech stacks, years) is duplicated identically across languages on
// purpose so each component can read a single object per language.
//
// About paragraphs are stored as segment arrays: { t: text } for normal text,
// { t: text, b: true } for bold emphasis.

export const translations = {
  en: {
    nav: {
      about: 'Profile',
      competencies: 'Capabilities',
      education: 'Education',
      experience: 'Track Record',
      projects: 'Portfolio',
      skills: 'Toolkit',
      certifications: 'Credentials',
      contact: 'Connect',
    },
    sidebar: { tagline: 'Data · Product · Analysis' },
    hero: {
      kicker: 'Jakarta, Indonesia — Open to opportunities',
      headlineLead: 'Turning data into ',
      headlineAccent: 'business decisions.',
      sub: 'Computer Science student at BINUS University and Product Specialist Intern at PT. Kognitif Skema Indonesia, working at the intersection of data analysis, product management, and web-based solutions.',
      viewWork: 'View Work',
      getInTouch: 'Get in Touch',
    },
    visits: { suffix: 'viewing now' },
    about: {
      eyebrow: 'Profile',
      title: 'About Me',
      note: 'A snapshot of my background, career direction, and how I work.',
      paragraphs: [
        [
          { t: 'I am a ' },
          { t: 'Computer Science student at BINUS University', b: true },
          {
            t: ' (2023–present) who enjoys working where data meets decision making. I began as an ',
          },
          { t: 'Education Counselor', b: true },
          {
            t: ', presenting to students and coordinating school partnerships, and I am now a ',
          },
          { t: 'Product Specialist Intern', b: true },
          {
            t: ' at PT. Kognitif Skema Indonesia — supporting digital workplace tools, building simple internal tools and websites, and producing documentation and data reports for the team.',
          },
        ],
        [
          { t: 'Alongside my degree, I am sharpening my analytics craft through the ' },
          { t: 'Dibimbing Data Analytics & Business Intelligence bootcamp', b: true },
          { t: ' — practicing ' },
          { t: 'SQL, Python, Excel,', b: true },
          { t: ' and ' },
          { t: 'Power BI', b: true },
          {
            t: ' on case studies that cover data cleaning, exploratory data analysis, and dashboard development. My academic interests sit in data analytics, data mining, and distributed cloud computing, and I work in Agile & Scrum.',
          },
        ],
        [
          { t: 'I am keen to grow into ' },
          { t: 'Data Analysis, Business Analysis,', b: true },
          { t: ' and ' },
          { t: 'Product Management', b: true },
          {
            t: ' — turning raw data into insight, and insight into recommendations a team can actually act on.',
          },
        ],
      ],
    },
    competencies: {
      eyebrow: 'Capabilities',
      title: 'Core Competencies',
      note: 'The four pillars behind how I approach a problem.',
      cards: [
        {
          tag: '// ANALYSIS',
          title: 'Business Analyst',
          body: 'Identifying business needs, analyzing operational processes, and building data-driven recommendations to improve organizational efficiency using Excel, SQL, and Google Sheets.',
        },
        {
          tag: '// STRATEGY',
          title: 'Product Management',
          body: 'Designing product concepts based on market research and user needs, managing the product lifecycle, and collaborating cross-functionally to align with business goals.',
        },
        {
          tag: '// EXECUTION',
          title: 'Project Management',
          body: 'Planning, organizing, and monitoring project execution to stay on schedule, budget, and objectives — including team coordination and risk management.',
        },
        {
          tag: '// DATA',
          title: 'Data Analyst',
          body: 'Collecting, cleaning, and exploring data to uncover patterns, then translating them into dashboards and reports that support decision making using SQL, Python, Power BI, and Excel.',
        },
      ],
    },
    education: {
      eyebrow: 'Education',
      title: 'Educational Background',
      note: 'Formal degree and ongoing data analytics training.',
      items: [
        {
          period: '2023 — PRESENT',
          school: 'BINUS University',
          degree: "Bachelor's Degree, Computer Science",
          logo: '/logo-binus.png',
          points: [
            'Field of Interest: Data Analytics, Distributed Cloud Computing, and Data Mining.',
            'Software Skills: Microsoft Office (Word, Excel, PowerPoint), Google Workspace (Docs, Sheets, Forms), SQL, Python, Power BI, and project management tools (Trello & Notion).',
            'Soft Skills: Leadership, Teamwork, Public Speaking, Time Management, Problem Solving, Presentation Skills, Communication, Critical Thinking, Good Integrity, and Visioneering.',
          ],
        },
        {
          period: 'APR 2026 — PRESENT',
          school: 'Dibimbing',
          degree: 'Data Analytics and Business Intelligence Bootcamp',
          logo: '/logo-dibimbing.png',
          points: [
            'Learning data analysis, business intelligence, and data visualization using SQL, Python, Excel, and visualization tools.',
            'Working on hands-on projects and case studies covering data cleaning, exploratory data analysis (EDA), dashboard creation, and data-driven decision making.',
            'Focus areas: SQL practice, Python data analysis, dashboard development, business intelligence case studies, and team collaboration.',
          ],
        },
      ],
    },
    experience: {
      eyebrow: 'Track Record',
      title: 'Work Experience',
      note: 'From education to enterprise product — most recent to earliest.',
      roles: [
        {
          period: 'FEB 2026 — PRESENT',
          role: 'Product Specialist Intern',
          org: 'PT. Kognitif Skema Indonesia',
          logo: '/logoSkema.webp',
          points: [
            'Supporting the setup and configuration of digital workplace tools such as Microsoft 365, Google Workspace, and Lark.',
            'Managing user access, permissions, and group administration for efficient system usage.',
            'Developing simple software solutions — internal tools, applications, and websites for operational processes.',
            'Producing documentation, user guides, and data reports using Excel, Google Sheets, and Power BI.',
          ],
        },
        {
          period: 'JUN 2024 — AUG 2025',
          role: 'Education Counselor — Team Promotion',
          org: 'BINUS University',
          logo: '/logoBinus2.png',
          points: [
            'Delivered interactive presentations to 800+ students & parents across partner schools, introducing 15+ study programs.',
            'Organized 20+ outreach activities, seminars, and educational counseling sessions.',
            'Managed partnerships with 25 schools through regular coordination and documentation using Google Sheets.',
            'Contributed to promotional strategy and publication materials to strengthen the BINUS brand across Greater Jakarta.',
          ],
        },
      ],
    },
    projects: {
      eyebrow: 'Portfolio',
      title: 'Selected Work',
      note: 'Click to open the project details on Google Drive.',
      cta: 'View project',
      items: [
        {
          index: '01 / DATA ANALYTICS',
          title: 'Heart Attack Prediction in Indonesia',
          body: 'Applied machine learning models (Random Forest, Logistic Regression, ANN) using Python for predictive analysis and data visualization.',
          stack: ['Python', 'Random Forest', 'ANN', 'Data Viz'],
          href: 'https://drive.google.com/file/d/1QHGRdpPe9s_rKkTlQUoF6FRaqQj9veo0/view?usp=sharing',
        },
        {
          index: '02 / COMPUTATIONAL BIOLOGY',
          title: 'BLAST vs MUSCLE v5 Analysis',
          body: 'A comparative analysis of BLAST and MUSCLE v5 for sequence alignment across human, animal, and disease studies — with performance-based recommendations.',
          stack: ['BLAST', 'MUSCLE v5', 'Bioinformatics'],
          href: 'https://drive.google.com/file/d/1Vyw1geTqI78IBBXTD_w1y7AZzfupJdO2/view',
        },
        {
          index: '03 / DATA APP',
          title: 'Nusantara Weather Insight',
          body: 'An interactive Streamlit dashboard showing real-time and forecast weather across all 38 provinces of Indonesia, with data pulled from the free Open-Meteo API.',
          stack: ['Python', 'Streamlit', 'Open-Meteo API'],
          href: 'https://nusantara-weather-insight-5fivlrftmfdhdhlqhvrrwa.streamlit.app/',
        },
        {
          index: '04 / BUSINESS INTELLIGENCE',
          title: 'Power BI Interactive Dashboard',
          body: 'An interactive dashboard built during the Dibimbing Data Analytics & BI bootcamp, applying advanced visualization techniques to turn raw data into an explorable, decision-ready report.',
          stack: ['Power BI', 'DAX', 'Data Viz'],
          href: 'https://app.powerbi.com/view?r=eyJrIjoiY2Y1NWM5ZWEtNThkMC00MDE4LTgzZDktMmZjYjE1ZjMwOWQ5IiwidCI6IjM0ODViOTYzLTgyYmEtNGE2Zi04MTBmLWI1Y2MyMjZmZjg5OCIsImMiOjEwfQ%3D%3D',
        },
      ],
    },
    skills: {
      eyebrow: 'Toolkit',
      title: 'Skills & Languages',
      note: 'Tools I use day to day for analysis and project execution.',
      groups: [
        { label: 'Data Analysis', items: ['SQL', 'Python', 'Power BI', 'Excel'] },
        {
          label: 'Productivity & Collaboration',
          items: ['Google Workspace', 'Microsoft 365', 'Notion', 'Trello', 'Lark'],
        },
        { label: 'Methodology', items: ['Agile', 'Scrum', 'User-Centered Design'] },
        {
          label: 'Languages',
          items: ['Bahasa Indonesia — Native', 'English — Intermediate'],
        },
      ],
    },
    certifications: {
      eyebrow: 'Credentials',
      title: 'Certifications & Training',
      note: 'Continuous professional development, 2024–2025.',
      cta: 'View certificate',
      items: [
        {
          name: 'Website Design with MySQL and PHP',
          issuer: 'BINUS University × Great Nusa',
          year: '2025',
          image: '/cert-website-mysql.jpeg',
        },
        {
          name: 'Introduction to Agile and Scrum Methodologies',
          issuer: 'BINUS University × Great Nusa',
          year: '2025',
          image: '/cert-agile-scrum.jpeg',
        },
        {
          name: 'Professional Office (CEFR C)',
          issuer: 'BINUS University × Beelingua',
          year: '2024',
          image: '/cert-professional-office.jpeg',
        },
        {
          name: 'Market Research & Business Communication (CEFR C)',
          issuer: 'BINUS University × Beelingua',
          year: '2024',
          image: '/cert-market-research.jpeg',
        },
        {
          name: 'Delivering an Effective Presentation — Marketing Associate',
          issuer: 'BINUS University',
          year: '2024',
          image: '/cert-presentation.jpeg',
        },
      ],
    },
    contact: {
      eyebrow: 'Connect',
      headlineLead: "Let's talk about the ",
      headlineAccent: 'next opportunity.',
      items: [
        {
          label: 'Email',
          value: 'prabaswaratrirespati12@gmail.com',
          href: 'mailto:prabaswaratrirespati12@gmail.com',
        },
        { label: 'Phone', value: '(+62) 878-8222-8360', href: 'tel:+6287882228360' },
        {
          label: 'LinkedIn',
          value: '/in/prabaswara-trirespati',
          href: 'https://linkedin.com/in/prabaswara-trirespati',
          external: true,
        },
      ],
    },
  },

  id: {
    nav: {
      about: 'Profil',
      competencies: 'Kapabilitas',
      education: 'Pendidikan',
      experience: 'Rekam Jejak',
      projects: 'Portofolio',
      skills: 'Perangkat',
      certifications: 'Kredensial',
      contact: 'Terhubung',
    },
    sidebar: { tagline: 'Data · Produk · Analisis' },
    hero: {
      kicker: 'Jakarta, Indonesia — Terbuka untuk peluang',
      headlineLead: 'Mengubah data menjadi ',
      headlineAccent: 'keputusan bisnis.',
      sub: 'Mahasiswa Computer Science di BINUS University dan Product Specialist Intern di PT. Kognitif Skema Indonesia, bekerja di persimpangan antara analisis data, product management, dan solusi berbasis web.',
      viewWork: 'Lihat Karya',
      getInTouch: 'Hubungi Saya',
    },
    visits: { suffix: 'sedang melihat' },
    about: {
      eyebrow: 'Profil',
      title: 'Tentang Saya',
      note: 'Ringkasan latar belakang, arah karier, dan cara saya bekerja.',
      paragraphs: [
        [
          { t: 'Saya adalah ' },
          { t: 'mahasiswa Computer Science di BINUS University', b: true },
          {
            t: ' (2023–sekarang) yang senang bekerja di titik temu antara data dan pengambilan keputusan. Saya memulai sebagai ',
          },
          { t: 'Education Counselor', b: true },
          {
            t: ', membawakan presentasi ke siswa dan mengoordinasikan kemitraan sekolah, dan kini menjadi ',
          },
          { t: 'Product Specialist Intern', b: true },
          {
            t: ' di PT. Kognitif Skema Indonesia — mendukung tools digital workplace, membangun internal tools dan website sederhana, serta menyusun dokumentasi dan laporan data untuk tim.',
          },
        ],
        [
          { t: 'Selain kuliah, saya mengasah kemampuan analitik lewat ' },
          { t: 'bootcamp Data Analytics & Business Intelligence Dibimbing', b: true },
          { t: ' — berlatih ' },
          { t: 'SQL, Python, Excel,', b: true },
          { t: ' dan ' },
          { t: 'Power BI', b: true },
          {
            t: ' pada studi kasus yang mencakup data cleaning, exploratory data analysis, dan pengembangan dashboard. Minat akademik saya ada di data analytics, data mining, dan distributed cloud computing, dan saya terbiasa bekerja dengan Agile & Scrum.',
          },
        ],
        [
          { t: 'Saya ingin berkembang di jalur ' },
          { t: 'Data Analysis, Business Analysis,', b: true },
          { t: ' dan ' },
          { t: 'Product Management', b: true },
          {
            t: ' — mengubah data mentah menjadi insight, dan insight menjadi rekomendasi yang benar-benar bisa ditindaklanjuti tim.',
          },
        ],
      ],
    },
    competencies: {
      eyebrow: 'Kapabilitas',
      title: 'Kompetensi Inti',
      note: 'Empat pilar yang mendasari cara saya mendekati sebuah masalah.',
      cards: [
        {
          tag: '// ANALISIS',
          title: 'Business Analyst',
          body: 'Mengidentifikasi kebutuhan bisnis, menganalisis proses operasional, dan menyusun rekomendasi berbasis data untuk efisiensi organisasi menggunakan Excel, SQL, dan Google Sheets.',
        },
        {
          tag: '// STRATEGI',
          title: 'Product Management',
          body: 'Merancang konsep produk berdasarkan riset pasar dan kebutuhan pengguna, mengelola siklus hidup produk, dan berkolaborasi lintas fungsi untuk menyelaraskan tujuan bisnis.',
        },
        {
          tag: '// EKSEKUSI',
          title: 'Project Management',
          body: 'Merencanakan, mengorganisir, dan memantau eksekusi proyek agar sesuai jadwal, anggaran, dan tujuan — termasuk koordinasi tim dan manajemen risiko.',
        },
        {
          tag: '// DATA',
          title: 'Data Analyst',
          body: 'Mengumpulkan, membersihkan, dan mengeksplorasi data untuk menemukan pola, lalu menerjemahkannya menjadi dashboard dan laporan yang mendukung pengambilan keputusan menggunakan SQL, Python, Power BI, dan Excel.',
        },
      ],
    },
    education: {
      eyebrow: 'Pendidikan',
      title: 'Latar Belakang Pendidikan',
      note: 'Pendidikan formal dan pelatihan data analytics yang sedang berjalan.',
      items: [
        {
          period: '2023 — SEKARANG',
          school: 'BINUS University',
          degree: 'Sarjana, Computer Science',
          logo: '/logo-binus.png',
          points: [
            'Bidang minat: Data Analytics, Distributed Cloud Computing, dan Data Mining.',
            'Software Skills: Microsoft Office (Word, Excel, PowerPoint), Google Workspace (Docs, Sheets, Forms), SQL, Python, Power BI, dan tools manajemen proyek (Trello & Notion).',
            'Soft Skills: Kepemimpinan, Kerja Sama Tim, Public Speaking, Manajemen Waktu, Problem Solving, Presentasi, Komunikasi, Berpikir Kritis, Integritas, dan Visioneering.',
          ],
        },
        {
          period: 'APR 2026 — SEKARANG',
          school: 'Dibimbing',
          degree: 'Bootcamp Data Analytics dan Business Intelligence',
          logo: '/logo-dibimbing.png',
          points: [
            'Mempelajari analisis data, business intelligence, dan visualisasi data menggunakan SQL, Python, Excel, dan tools visualisasi.',
            'Mengerjakan proyek dan studi kasus langsung meliputi data cleaning, exploratory data analysis (EDA), pembuatan dashboard, dan pengambilan keputusan berbasis data.',
            'Area fokus: latihan SQL, analisis data Python, pengembangan dashboard, studi kasus business intelligence, dan kolaborasi tim.',
          ],
        },
      ],
    },
    experience: {
      eyebrow: 'Rekam Jejak',
      title: 'Pengalaman Kerja',
      note: 'Dari edukasi ke produk enterprise — terbaru ke paling lama.',
      roles: [
        {
          period: 'FEB 2026 — SEKARANG',
          role: 'Product Specialist Intern',
          org: 'PT. Kognitif Skema Indonesia',
          logo: '/logoSkema.webp',
          points: [
            'Mendukung setup dan konfigurasi tools digital workplace seperti Microsoft 365, Google Workspace, dan Lark.',
            'Mengelola akses pengguna, izin, dan administrasi grup untuk efisiensi sistem.',
            'Mengembangkan solusi software sederhana — internal tools, aplikasi, dan website untuk proses operasional.',
            'Menyusun dokumentasi, panduan pengguna, dan laporan data menggunakan Excel, Google Sheets, dan Power BI.',
          ],
        },
        {
          period: 'JUN 2024 — AGU 2025',
          role: 'Education Counselor — Team Promotion',
          org: 'BINUS University',
          logo: '/logoBinus2.png',
          points: [
            'Menyampaikan presentasi interaktif kepada 800+ siswa & orang tua di berbagai sekolah mitra, memperkenalkan 15+ program studi.',
            'Menyelenggarakan 20+ kegiatan outreach, seminar, dan sesi konseling edukasi.',
            'Mengelola kemitraan dengan 25 sekolah melalui koordinasi rutin dan dokumentasi menggunakan Google Sheets.',
            'Berkontribusi pada strategi promosi dan materi publikasi untuk memperkuat citra BINUS di area Jakarta Raya.',
          ],
        },
      ],
    },
    projects: {
      eyebrow: 'Portofolio',
      title: 'Proyek Terpilih',
      note: 'Klik untuk membuka detail proyek di Google Drive.',
      cta: 'Lihat proyek',
      items: [
        {
          index: '01 / DATA ANALYTICS',
          title: 'Heart Attack Prediction in Indonesia',
          body: 'Menerapkan model machine learning (Random Forest, Logistic Regression, ANN) menggunakan Python untuk analisis prediktif dan visualisasi data.',
          stack: ['Python', 'Random Forest', 'ANN', 'Data Viz'],
          href: 'https://drive.google.com/file/d/1QHGRdpPe9s_rKkTlQUoF6FRaqQj9veo0/view?usp=sharing',
        },
        {
          index: '02 / COMPUTATIONAL BIOLOGY',
          title: 'BLAST vs MUSCLE v5 Analysis',
          body: 'Analisis komparatif penggunaan BLAST dan MUSCLE v5 untuk sequence alignment pada studi manusia, hewan, dan penyakit — dengan rekomendasi berbasis performa.',
          stack: ['BLAST', 'MUSCLE v5', 'Bioinformatics'],
          href: 'https://drive.google.com/file/d/1Vyw1geTqI78IBBXTD_w1y7AZzfupJdO2/view',
        },
        {
          index: '03 / DATA APP',
          title: 'Nusantara Weather Insight',
          body: 'Dashboard Streamlit interaktif yang menampilkan cuaca real-time dan perkiraan untuk seluruh 38 provinsi di Indonesia, dengan data dari Open-Meteo API yang gratis.',
          stack: ['Python', 'Streamlit', 'Open-Meteo API'],
          href: 'https://nusantara-weather-insight-5fivlrftmfdhdhlqhvrrwa.streamlit.app/',
        },
        {
          index: '04 / BUSINESS INTELLIGENCE',
          title: 'Power BI Interactive Dashboard',
          body: 'Dashboard interaktif yang dibuat selama bootcamp Data Analytics & BI Dibimbing, menerapkan teknik visualisasi lanjutan untuk mengubah data mentah menjadi laporan yang bisa dieksplorasi dan siap untuk pengambilan keputusan.',
          stack: ['Power BI', 'DAX', 'Data Viz'],
          href: 'https://app.powerbi.com/view?r=eyJrIjoiY2Y1NWM5ZWEtNThkMC00MDE4LTgzZDktMmZjYjE1ZjMwOWQ5IiwidCI6IjM0ODViOTYzLTgyYmEtNGE2Zi04MTBmLWI1Y2MyMjZmZjg5OCIsImMiOjEwfQ%3D%3D',
        },
      ],
    },
    skills: {
      eyebrow: 'Perangkat',
      title: 'Keahlian & Bahasa',
      note: 'Tools yang saya gunakan sehari-hari untuk analisis dan eksekusi proyek.',
      groups: [
        { label: 'Analisis Data', items: ['SQL', 'Python', 'Power BI', 'Excel'] },
        {
          label: 'Produktivitas & Kolaborasi',
          items: ['Google Workspace', 'Microsoft 365', 'Notion', 'Trello', 'Lark'],
        },
        { label: 'Metodologi', items: ['Agile', 'Scrum', 'User-Centered Design'] },
        {
          label: 'Bahasa',
          items: ['Bahasa Indonesia — Native', 'Bahasa Inggris — Menengah'],
        },
      ],
    },
    certifications: {
      eyebrow: 'Kredensial',
      title: 'Sertifikasi & Pelatihan',
      note: 'Pengembangan profesional berkelanjutan, 2024–2025.',
      cta: 'Lihat sertifikat',
      items: [
        {
          name: 'Website Design with MySQL and PHP',
          issuer: 'BINUS University × Great Nusa',
          year: '2025',
          image: '/cert-website-mysql.jpeg',
        },
        {
          name: 'Introduction to Agile and Scrum Methodologies',
          issuer: 'BINUS University × Great Nusa',
          year: '2025',
          image: '/cert-agile-scrum.jpeg',
        },
        {
          name: 'Professional Office (CEFR C)',
          issuer: 'BINUS University × Beelingua',
          year: '2024',
          image: '/cert-professional-office.jpeg',
        },
        {
          name: 'Market Research & Business Communication (CEFR C)',
          issuer: 'BINUS University × Beelingua',
          year: '2024',
          image: '/cert-market-research.jpeg',
        },
        {
          name: 'Delivering an Effective Presentation — Marketing Associate',
          issuer: 'BINUS University',
          year: '2024',
          image: '/cert-presentation.jpeg',
        },
      ],
    },
    contact: {
      eyebrow: 'Terhubung',
      headlineLead: 'Mari berdiskusi soal ',
      headlineAccent: 'peluang berikutnya.',
      items: [
        {
          label: 'Email',
          value: 'prabaswaratrirespati12@gmail.com',
          href: 'mailto:prabaswaratrirespati12@gmail.com',
        },
        { label: 'Telepon', value: '(+62) 878-8222-8360', href: 'tel:+6287882228360' },
        {
          label: 'LinkedIn',
          value: '/in/prabaswara-trirespati',
          href: 'https://linkedin.com/in/prabaswara-trirespati',
          external: true,
        },
      ],
    },
  },
}
