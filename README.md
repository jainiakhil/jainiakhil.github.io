# 🌌 Akhil Jaini — Personal Portfolio & Stargazing Odyssey

<div align="center">

```
     .   :   *   .      .       .   *   :   .      .   *
  *      .        .   ✦   .   *       .        .   ✦   .
    .   *   ★   .     *       .   *   ★   .     *
  *  .    .    *  .   .   *   .    .    *  .   .
```

[![Website](https://img.shields.io/badge/Live%20Site-jainiakhil.github.io-f59e0b?style=for-the-badge&logo=googlechrome&logoColor=white)](https://jainiakhil.github.io)
[![Next.js](https://img.shields.io/badge/Next.js-16.2.6-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-Vanilla%20Tokens-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-Smooth_Animations-EA4C89?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)

<p align="center">
  <em>"A personal corner of the web celebrating astrophysics, the night sky, open-source code, and adventures under the stars."</em>
</p>

[**Explore Stargazing Portfolio**](https://jainiakhil.github.io) • [**Academic CV**](https://jainiakhil.github.io/AkhilJaini_CV_Academic_2026.pdf) • [**Industry Résumé**](https://jainiakhil.github.io/AkhilJaini_Resume_Industry_2026.pdf)

</div>

---

## 🌿 The Philosophy & Aesthetics

This portfolio is hand-crafted with a **Studio Ghibli-inspired, dreamy atmospheric aesthetic**. Combining deep celestial blues, twinkling night skies, organic rolling grassy hills, and soft ambient glows, it transforms a conventional academic curriculum vitae into a tranquil, interactive storytelling journey.

```
       .             *             .             ★
            .              .             .
      ╭──────────────────────────────────────────╮
      │   "We are all in the gutter, but some   │
      │    of us are looking at the stars."      │
      │                     — Oscar Wilde        │
      ╰──────────────────────────────────────────╯
            .              .             .
       *             ★             .             *
```

---

## ✨ Key Features & Atmospheric Layers

### 🌙 1. Living Environmental World
- **Dynamic Starfield & Milky Way**: Thousands of point-like twinkling stars with organic temperature variation (warm golden pollen in daylight, cool white and blue starlight in dark mode) and a soft diagonal Milky Way band.
- **Atmospheric Clouds & Moonlight**: Layered multi-depth SVG cloud drifts with soft Gaussian blurs and ambient radial moonlight illumination.
- **Scroll-Synchronised Moon Phases**: A celestial body that tracks page scroll progress, transitioning through natural lunar phases with triple-layer atmospheric glow.
- **Foreground Grassy Hills & Ghibli Silhouette**: Interactive foreground hills populated with subtle animated characters gazing up at the cosmos.
- **🐾 Secret Grassland Easter Egg**: A silent, delightful Easter egg tucked away in the grasslands for curious visitors.

### 🔭 2. Astrophysics Research & Interactive Exploration
- **FRB & Radio Astronomy Focus**: Interactive showcases on Fast Radio Burst (FRB) detection with ASKAP (CRACO & RACS), UV space instrumentation for the INSIST space telescope, and high-precision exoplanet transit spectroscopy.
- **Full Uncropped Media Viewer**: Project modals featuring full-resolution carousel viewers with responsive `object-contain` scaling for wide charts and portrait instruments.
- **Linked Scientific Publications**: Direct links to preprints on *arXiv*, peer-reviewed papers with *DOI* resolution, and *NASA ADS* library entries.

### 🗺️ 3. Interactive Journey & Milestones
- **Linear Path of Discovery**: A concise timeline displaying milestones, institutions, and core skill badges with clickable detail cards.
- **Talks, Colloquia & Observatory Visits**: Categorised records of invited seminars, international conference talks, and telescope field visits with interactive links to slide decks, posters, and supplementary data.
- **Funding & Honours**: Comprehensive record of competitive research fellowships, international travel grants, and academic scholarships.
- **Outreach & Mentorship**: 17 community initiatives spanning 3D virtual reality AstroTours, student mentoring (STEMPals & ASTRAL), peer coding circles (*Cookies 'n' Code*), and public science writing.

### 🏮 4. Fluid Physics Cursor
- **Laser Pointer & Bioluminescent Fireflies**: On fine-pointer devices (desktops and laptops), an ambient glowing laser dot guides three chasing fireflies exhibiting natural orbital damping, wander frequencies, and subtle flight tilts.
- **Touch & Mobile Optimised**: Automatically unrendered on smartphones, tablets, and touch screens (`pointer: coarse`) to preserve native mobile interactions.

### 🦘 5. Strict Australian English
- All prose, copy, and scientific summaries are crafted in accordance with Australian / Commonwealth English conventions (*programmes, localised, characterised, customisable, utilised, organised, honours, centre, behaviour*).

---

## 🛠️ Technology Stack

| Domain | Technology | Purpose |
| :--- | :--- | :--- |
| **Framework** | [Next.js 16 (App Router)](https://nextjs.org/) | Hybrid static generation, Turbopack compilation & API routes |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) | Strict type safety across portfolio models and services |
| **Styling** | [TailwindCSS 4](https://tailwindcss.com/) & Vanilla CSS | Dreamy design system, glassmorphism tokens & HSL colour palettes |
| **Motion** | [Framer Motion](https://www.framer.com/motion/) | Slow, dreamy layout transitions and physics-based modal portals |
| **Animations**| [Lottie React](https://github.com/Gamote/lottie-react) | High-fidelity vector animations for lunar cycles and character scenes |
| **Icons** | [Lucide React](https://lucide.dev/) | Minimalist, harmonious icon family |
| **Email API** | [Resend](https://resend.com/) | Secure transactional email dispatch for contact inquiries |

---

## 📂 Project Architecture

```
Personal_Portfolio/
├── frontend/
│   ├── public/
│   │   ├── MyCat/                # Secret Easter egg gallery
│   │   ├── MyOutreach/           # Outreach and education media
│   │   ├── MyPhotos/             # Personal gallery carousel
│   │   ├── MyResearch/           # Astrophysical instrumentation & charts
│   │   ├── Firefly.json          # Bioluminescent firefly animation
│   │   ├── Moon Phases.json      # Scroll-driven lunar phase asset
│   │   ├── silhouette_cat.lottie # Grassland character animation
│   │   └── AkhilJaini_CV_Academic_2026.pdf
│   └── src/
│       ├── app/
│       │   ├── api/contact/      # Resend API endpoint
│       │   ├── globals.css       # Design tokens, Ghibli cards & keyframes
│       │   ├── layout.tsx        # SEO metadata, OpenGraph & typography
│       │   └── page.tsx          # Main scroll-snapping layout
│       ├── components/
│       │   ├── environment/      # Starfield, Atmosphere, ScrollMoon, Hills
│       │   ├── home/             # Hero, About, Journey, Research, Talks, Outreach
│       │   ├── layout/           # Dreamy navigation bar & footer
│       │   ├── providers/        # Theme & reduced-motion providers
│       │   └── ui/               # Laser cursor, fireflies & modal portals
│       ├── data/
│       │   └── mockData.ts       # Centralised Australian English content store
│       └── types/
│           └── portfolio.ts      # Strict TypeScript interfaces
└── .gitignore                    # Production build & cache filters
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18.17.0 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### 1. Clone the Repository
```bash
git clone https://github.com/jainiakhil/jainiakhil.github.io.git
cd jainiakhil.github.io/frontend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables (Optional)
To enable the interactive contact form dispatch via Resend, create a `.env.local` file in the `frontend` folder:
```env
RESEND_API_KEY=your_resend_api_key_here
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the starry night sky.

### 5. Build for Production
```bash
npm run build
npm run start
```

---

## 📮 Contact & Collaborations

- **Author**: Akhil Jaini
- **Role**: PhD Scholar in Astrophysics, Swinburne University of Technology / CAS
- **Email**: [work.jainiakhil@gmail.com](mailto:work.jainiakhil@gmail.com)
- **NASA ADS**: [Public Library](https://ui.adsabs.harvard.edu/public-libraries/6AWkqcbzTQWau_usyl5V8Q)
- **Google Scholar**: [Akhil Jaini](https://scholar.google.com/citations?hl=en&user=SjtAPjkAAAAJ)
- **ORCID**: [0000-0002-8987-1544](https://orcid.org/0000-0002-8987-1544)
- **GitHub**: [@jainiakhil](https://github.com/jainiakhil)

---

<div align="center">
  <sub>Handcrafted with wonder, starlight, and code under the Southern skies. 🌌</sub>
</div>
