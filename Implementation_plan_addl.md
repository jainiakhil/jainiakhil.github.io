# Additional Project Constraints & Development Notes

These requirements are mandatory and should be followed throughout the implementation process.

---

# 21. Asset & Content Availability Notes

## 21.1 Lottie Animations

- Final Lottie animation assets will be provided later by the project owner.
- During initial development, the AI agent should use placeholder Lottie animations or temporary mock assets.
- The frontend architecture should be designed so that replacing placeholder assets with final assets requires minimal code changes.
- All Lottie components should be modular and configurable.

### Expected Lottie Usage Areas

- Moon phase animation
- Sun animation
- Floating astronaut/space character
- Foreground decorative elements
- Hero section animations
- Ambient floating objects

---

## 21.2 Paragraph & Written Content

- Final written content will be provided later by the project owner.
- During development, placeholder text such as Lorem Ipsum may be used.
- The layout should be designed to gracefully handle:
  - short text
  - long text
  - dynamic content lengths
- Text containers should remain responsive and visually balanced regardless of content length.

### Content Areas Pending Final Copy

- About section
- Project descriptions
- Publication summaries
- Outreach descriptions
- Awards and achievements
- Contact section copy

---

# 22. Asset & Package Licensing Requirements

## Mandatory Requirement

All assets, libraries, packages, fonts, icons, animations, and tools used in the project must be:

- free to use
- open-source where possible
- commercially usable
- safe for public deployment
- legally distributable

Avoid:
- paid-only packages
- assets requiring attribution unless explicitly documented
- restrictive licenses
- copyrighted visual resources without permission

---

## Recommended Free Asset Sources

| Purpose | Recommended Source |
|---|---|
| Icons | Lucide Icons |
| Fonts | Google Fonts |
| Illustrations | unDraw |
| Space Illustrations | Storyset |
| Stock Images | Unsplash / Pexels |
| Particles | tsparticles |
| Lottie Files | LottieFiles Free Library |

---

# 23. Backend Simplicity Requirement

## Important Design Constraint

The backend should remain intentionally lightweight and easy to maintain.

The goal is:
- simple content management
- minimal operational complexity
- easy future updates
- low hosting costs
- fast deployment

Avoid:
- overly engineered microservice architectures
- unnecessary real-time systems
- excessive database complexity
- enterprise-scale abstractions
- heavy DevOps overhead

---

## Preferred Backend Philosophy

The backend should primarily act as:

- a content management layer
- a media management layer
- a lightweight API provider

The frontend should handle:
- animations
- presentation logic
- UI rendering
- interactive effects

---

## Preferred Backend Scope

The backend only needs to support:

- CRUD operations
- media uploads
- authentication for admin access
- content retrieval APIs
- simple filtering/searching
- optional GitHub/publication syncing

---

## Recommended Simplified Backend Stack

| Component | Technology |
|---|---|
| CMS | Strapi |
| Database | PostgreSQL |
| Media Storage | Cloudinary |
| Hosting | Railway / Render |

This setup is preferred because it:
- is easy to manage
- requires minimal backend coding
- includes a ready-made admin panel
- scales sufficiently for portfolio traffic
- integrates easily with Next.js

---

# 24. Placeholder Development Strategy

Until final assets/content are provided:

## Use Temporary Assets For

- profile images
- project thumbnails
- background illustrations
- animations
- videos

---

## Use Placeholder Data For

- publications
- projects
- outreach activities
- repositories
- awards

---

## Ensure Future Replacement Is Easy

All placeholder content should:
- be centralised
- use reusable data structures
- avoid hardcoded UI logic
- support CMS replacement later

---

# 25. Future Maintainability Requirement

The final implementation should prioritise:

- readability
- modularity
- scalability
- clean folder structure
- reusable components
- easy onboarding for future developers

The AI agent should:
- avoid unnecessary complexity
- avoid premature optimisation
- write clean and well-commented code
- separate concerns properly

---

# 26. Final Development Philosophy

The project should feel:
- highly polished
- visually magical
- technically impressive
- playful yet professional

However, the implementation should remain:
- maintainable
- modular
- lightweight
- practical
- easy to update long-term