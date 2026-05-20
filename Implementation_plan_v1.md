# Personal Portfolio Website — Full Implementation Plan  
_For an AI agent acting as a senior full-stack developer_

---

# 1. Project Vision

Build a visually stunning, highly animated personal portfolio website for an astrophysicist and engineer that balances:

- Professional credibility for recruiters and hiring managers
- Playful space-themed personality
- High-performance modern web experience
- Easy long-term content management
- Scalable architecture
- Responsive design
- SEO and accessibility compliance

The site should feel like:
- a whimsical interactive night sky
- a premium modern portfolio
- a gamified exploratory experience
- a technically sophisticated frontend showcase

The aesthetic inspiration should combine:
- NASA/JPL visual language
- indie game UI
- modern creative developer portfolios
- soft Ghibli-like night sky ambience
- polished motion design

---

# 2. High-Level Architecture

# Frontend Stack

| Component | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | TailwindCSS |
| Animations | Framer Motion |
| Lottie Animations | lottie-react |
| 2D Parallax | react-scroll-parallax |
| State Management | Zustand |
| Icons | Lucide React |
| Theme Management | next-themes |
| CMS Data Fetching | GraphQL or REST |
| Image Optimisation | Next/Image |
| Markdown Rendering | MDX |
| SEO | Next SEO + metadata API |

---

# Backend Stack

## Recommended Option (Best Overall)

### Headless CMS + Managed Backend

| Component | Technology |
|---|---|
| CMS | Strapi |
| Database | PostgreSQL |
| Media Storage | Cloudinary |
| Auth | Strapi Auth |
| API | REST or GraphQL |
| Hosting | Railway / Render / DigitalOcean |

### Why This Is Best

- Easy admin panel
- Upload media directly
- Dynamic schemas
- Recruiter-friendly scalability
- AI-friendly structure
- No need to code admin dashboard from scratch
- Easy future expansion

---

# Hosting Stack

| Service | Use |
|---|---|
| Vercel | Frontend hosting |
| Railway / Render | Backend hosting |
| Cloudinary | Image/video assets |
| GitHub | Source control |
| Namecheap/Cloudflare | Domain management |

---

# 3. Design System

# Theme Modes

## Dark Mode (Default)

Theme:
- deep navy sky
- glowing stars
- moving nebula clouds
- animated shooting stars
- moon phases
- subtle ambient particles

### Suggested Palette

| Purpose | Colour |
|---|---|
| Background | #07111F |
| Secondary Background | #0D1B2A |
| Card Background | rgba(255,255,255,0.05) |
| Primary Accent | #7DD3FC |
| Secondary Accent | #C084FC |
| Text Primary | #E2E8F0 |
| Text Secondary | #94A3B8 |

---

## Light Mode

Theme:
- dreamy daytime sky
- soft blue gradients
- animated clouds
- sunlight glow
- floating particles

### Suggested Palette

| Purpose | Colour |
|---|---|
| Background | #DDF3FF |
| Secondary Background | #BFE6FF |
| Primary Accent | #2563EB |
| Secondary Accent | #EC4899 |
| Text Primary | #0F172A |
| Text Secondary | #334155 |

---

# Typography

| Usage | Font |
|---|---|
| Headings | Space Grotesk |
| Body | Inter |
| Fun Elements | Baloo 2 / Fredoka |

---

# Motion Philosophy

Animations should feel:
- soft
- floaty
- playful
- atmospheric
- physically believable

Avoid:
- overly aggressive motion
- excessive motion blur
- distracting infinite loops

---

# 4. Global Site Features

# 4.1 Animated Background System

## Dark Mode

Features:
- twinkling stars
- random shooting stars
- drifting clouds
- layered parallax depth
- animated gradients
- floating dust particles

Implementation:
- CSS animations
- canvas/WebGL particles
- Framer Motion transforms

---

# 4.2 Day/Night Toggle

## Requirements

- Moon in dark mode
- Sun in light mode
- Smooth animated transition
- Persistent preference
- Animated sky colour morphing

## Behaviour

- Clicking moon → transforms to sun
- Background transitions
- Cloud assets swap
- Stars fade away
- Accent colours shift

Implementation:
- next-themes
- Framer Motion shared layout animations
- Lottie animation state control

---

# 4.3 Scroll-Based Moon Phase Animation

## Behaviour

Moon changes phases as user scrolls:
- full moon
- gibbous
- quarter
- crescent
- new moon

Implementation:
- Lottie scroll progress mapping
- Framer Motion useScroll()
- frame interpolation

---

# 4.4 Parallax Layers

Suggested layers:

| Layer | Speed |
|---|---|
| Background stars | Slow |
| Clouds | Medium |
| Foreground decorative planets | Fast |
| Floating objects | Dynamic |

---

# 4.5 Cursor Effects

Optional enhancement:
- glowing cursor trail
- star sparkle effect
- hover-reactive particles

---

# 5. Frontend Page Architecture

# 5.1 Homepage

---

## Hero Section

### Features

- animated greeting text
- rotating titles:
  - Astrophysicist
  - Engineer
  - Coder
  - Designer
  - Researcher
- animated constellations
- floating foreground assets
- CTA buttons

### Recommended Layout

Left:
- headline
- animated text
- CTA buttons

Right:
- astronaut illustration / lottie asset
- floating planets

### Animations

- staggered text reveal
- floating objects
- glow pulse
- mouse-follow effects

---

## About Section

### Requirements

- 80–100 word introduction
- portrait/photo
- floating decorative stars
- subtle card hover effects

---

## At a Glance Section

### Dynamic Timeline

Display:
- current role
- research timeline
- milestones
- education
- projects

### Implementation

CMS-driven timeline entries.

Use:
- horizontal scroll timeline on desktop
- vertical accordion on mobile

---

## Research Highlights Section

### Layout

Interactive cards:
- thumbnail
- title
- summary
- tags
- hover animation

### Hover Effects

- tilt effect
- glow border
- animated background gradient
- image zoom

### Data Source

Auto-fetched from CMS.

---

## Other Projects Section

Same structure as research highlights.

Could include:
- coding projects
- design work
- creative work
- outreach tools

---

## Publications Section

### Layout Options

Preferred:
- stacked interactive cards

Each card:
- publication image
- title
- authors
- journal
- year
- quick abstract
- arXiv button
- DOI button

---

## Code Repo Section

### GitHub Integration

Auto-fetch:
- stars
- languages
- repo descriptions

### Card Design

Include:
- animated language bars
- contribution indicators
- repo stats

---

## Other Highlights Section

Subsections:
- Awards
- Outreach
- Travel
- Observatory Visits

Could use:
- map interactions
- gallery sliders
- timeline storytelling

---

## Contact Section

### Features

- animated contact form
- social links
- downloadable CV
- copy-to-clipboard interactions

Optional:
- animated paper airplane send effect

---

# 5.2 Research Projects Page

# Core Requirements

- searchable
- filterable
- visually immersive

### Filters

- instrumentation
- FRBs
- astrometry
- machine learning
- transient detection

### Card Behaviour

Expand into modal or dedicated detail page.

### Detail Page Structure

- hero image/video
- overview
- challenges
- methodology
- outcomes
- gallery
- publication links
- GitHub links

---

# 5.3 Other Projects Page

Could include:
- software
- graphics
- visualisation tools
- apps
- hobby engineering

Use:
- Masonry layout
- animated category filters

---

# 5.4 Publications Page

## Features

- filter by year
- filter by topic
- search
- citation copy button

### Advanced Feature

Auto-fetch metadata from:
- ORCID
- ADS
- arXiv

---

# 5.5 Code Repository Page

## Features

- GitHub API integration
- auto-sync repos
- language statistics
- featured repos

### Nice Enhancements

- animated commit graph
- repo health indicators
- live demo previews

---

# 5.6 Others Page

Sections:
- travel map
- outreach gallery
- awards shelf
- observatory visits

Potential interactive feature:
- star-map journey timeline

---

# 6. Backend Architecture

# 6.1 CMS Collections

## Research Projects

Fields:
- title
- slug
- short description
- long description
- tags
- images
- videos
- featured flag
- related publications
- GitHub link
- external links
- dates

---

## Publications

Fields:
- title
- authors
- abstract
- journal
- year
- DOI
- arXiv link
- ADS link
- thumbnail

---

## Other Projects

Fields:
- title
- category
- media
- repo link
- demo link
- description

---

## Timeline Entries

Fields:
- role
- institution
- dates
- description

---

## Awards

Fields:
- title
- issuer
- year
- description
- image

---

## Outreach

Fields:
- title
- organisation
- date
- photos
- description

---

# 6.2 Media Upload System

Use:
- Cloudinary integration

Features:
- automatic optimisation
- video transcoding
- responsive images
- CDN delivery

---

# 6.3 Automatic Link Icon Detection

## Logic

| Link Type | Icon |
|---|---|
| github.com | GitHub |
| arxiv.org | arXiv |
| doi.org | DOI |
| linkedin.com | LinkedIn |
| personal domain | Globe |

Implementation:
- regex parsing utility
- reusable link renderer component

---

# 6.4 Admin Dashboard

## Required Features

- rich text editing
- drag/drop uploads
- markdown support
- tag management
- preview mode
- publish/draft mode

---

# 7. Animation Implementation Strategy

# Libraries

| Purpose | Library |
|---|---|
| UI animation | Framer Motion |
| Lottie | lottie-react |
| Parallax | react-scroll-parallax |
| Hover tilt | react-parallax-tilt |
| Particles | tsparticles |

---

# Animation Rules

## Use GPU-friendly transforms

Prefer:
- transform
- opacity

Avoid:
- heavy layout recalculation
- blur-heavy effects everywhere

---

# Performance Targets

| Metric | Goal |
|---|---|
| Lighthouse | 90+ |
| First Load JS | < 250 KB |
| CLS | < 0.1 |
| FPS | 60 |

---

# 8. Responsive Design Strategy

# Breakpoints

| Device | Strategy |
|---|---|
| Mobile | Vertical stacked |
| Tablet | Hybrid layout |
| Desktop | Full immersive experience |

---

# Mobile Considerations

Reduce:
- particle density
- parallax intensity
- heavy animations

---

# 9. Accessibility

## Requirements

- WCAG AA compliance
- reduced motion mode
- keyboard navigation
- screen reader labels
- colour contrast compliance

---

# 10. SEO Strategy

## Must Have

- metadata
- OG tags
- structured schema
- sitemap
- robots.txt

---

# 11. Performance Optimisation

## Techniques

- lazy loading
- route-based code splitting
- image optimisation
- motion throttling
- SSR where useful
- static generation for publications/projects

---

# 12. Suggested Folder Structure

/apps
  /frontend
  /backend

/frontend
  /app
  /components
  /animations
  /hooks
  /lib
  /styles
  /types

/backend
  /src
  /api
  /components

---

# 13. AI-Agent Development Phases

# Phase 1 — Foundation

- Initialise monorepo
- Configure Next.js
- Configure Tailwind
- Configure Strapi
- Setup PostgreSQL
- Setup deployment pipeline

---

# Phase 2 — Design System

- Theme engine
- Typography
- Colour tokens
- Motion tokens
- Reusable components

---

# Phase 3 — Animated Environment

- Starfield
- Clouds
- Moon system
- Parallax engine
- Theme transitions

---

# Phase 4 — Homepage

Build all homepage sections.

---

# Phase 5 — Dynamic CMS Integration

- Projects
- Publications
- Timeline
- GitHub sync

---

# Phase 6 — Detail Pages

- Dynamic routes
- MDX rendering
- media galleries

---

# Phase 7 — Admin Features

- uploads
- preview
- publishing workflow

---

# Phase 8 — Performance Pass

- Lighthouse optimisation
- animation optimisation
- accessibility audit

---

# Phase 9 — Deployment

- domain
- SSL
- analytics
- backups

---

# 14. Recommended Advanced Features

# Optional Premium Enhancements

## Interactive Constellation Navigation

Hover stars → navigate between sections.

---

## Mini Space Companion

Small animated robot/astronaut guide.

---

## Dynamic Sky Based on Real Time

Night/day synced to local time.

---

## Background Audio Toggle

Soft ambient space soundtrack.

---

## Interactive Observatory Map

Places visited plotted on a star map.

---

# 15. Recommended APIs

| API | Purpose |
|---|---|
| GitHub API | Repo syncing |
| ORCID API | Publication metadata |
| NASA APOD API | Dynamic astronomy visuals |
| ADS API | Research publications |

---

# 16. Security & Reliability

## Backend Security

- rate limiting
- secure auth
- media validation
- environment variables

## Reliability

- automated backups
- monitoring
- error logging

---

# 17. Final Technical Recommendation

## Recommended Architecture

### Frontend

- Next.js
- TypeScript
- Tailwind
- Framer Motion

### Backend

- Strapi
- PostgreSQL
- Cloudinary

### Deployment

- Vercel + Railway

This gives:
- best developer experience
- easiest long-term maintenance
- strongest animation ecosystem
- scalable CMS
- recruiter-grade professionalism
- playful creative freedom

---

# 18. Deliverables Expected From AI Agent

# Frontend Deliverables

- fully responsive UI
- reusable component library
- animation system
- theme engine
- SEO setup
- performance optimisation

# Backend Deliverables

- CMS schemas
- admin dashboard
- media upload pipeline
- API integrations

# Deployment Deliverables

- production deployment
- CI/CD pipeline
- documentation
- environment setup guide

---

# 19. Recommended Development Order

1. Design system
2. Theme switching
3. Animated environment
4. Homepage
5. CMS integration
6. Project pages
7. Publications
8. GitHub integration
9. Admin workflows
10. Performance polish
11. Deployment

---

# 20. Overall Experience Goal

The final experience should make recruiters feel:

> “This person is technically exceptional, creative, thoughtful, and clearly capable of building sophisticated systems.”

while still feeling:
- playful
- memorable
- warm
- imaginative
- deeply personal