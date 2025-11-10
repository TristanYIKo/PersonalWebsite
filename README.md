# Personal Portfolio Website

A modern, minimalist single-page portfolio website for Tristan Ko built with Next.js 14, TypeScript, Tailwind CSS, and shadcn/ui.

## Features

- 🎨 Clean off-white (#f6f6f4) background with dark charcoal (#1f1f1f) text
- 📄 Single-page scrolling layout with smooth transitions
- 📌 Sticky header with logo and social links
- 🖼️ Auto-playing image carousel in introduction section
- 🌓 Professional black/white/grey color palette
- 📱 Fully responsive design (max-width ~5xl)
- ✨ Interactive hover effects with lift/pop-out animations
- 🔍 Clickable project cards with detailed modal dialogs
- 🔗 Social media integration (LinkedIn, GitHub, Instagram, Email)
- ⚡ Next.js 14 App Router for optimal performance

## Sections

1. **Introduction** - Centered bio with auto-playing image carousel
2. **Work Experience** - Vertical timeline with roles and achievements
3. **Projects** - Interactive grid with clickable cards and detail modals
4. **Connect** - Social media links with hover animations
5. **Footer** - Clean copyright line

## Tech Stack

- **Framework:** Next.js 14
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Components:** shadcn/ui (Card, Dialog, Separator, Button, Carousel)
- **Icons:** Lucide React
- **Carousel:** Embla Carousel with auto-play
- **Font:** System fonts (San Francisco, Segoe UI, Roboto)

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, pnpm, or bun

### Installation

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

This project can be deployed on Vercel, Netlify, or any platform that supports Next.js:

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Build locally

```bash
npm run build
npm start
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## License

This project is open source and available under the MIT License.

## Author

**Tristan Ko** - Portfolio Website

---

Built with ❤️ using Next.js and shadcn/ui

## Customization

### Update Personal Information

**Header Social Links** (`components/sticky-header.tsx`):
- LinkedIn: https://www.linkedin.com/in/tristan-ko/
- GitHub: https://github.com/TristanYIKo

**Introduction** (`components/sections/intro-section.tsx`):
- Update bio text about being a Management Engineering student
- Add your personal photos to `public/images/` folder (see CAROUSEL_GUIDE.md)

**Work Experience** (`components/sections/work-section.tsx`):
- Modify the `experiences` array with your roles and achievements

**Projects** (`components/sections/projects-section.tsx`):
- Update the `projects` array with your work
- Add project details, links, and GitHub repositories

**Connect Section** (`components/sections/connect-section.tsx`):
- LinkedIn: https://www.linkedin.com/in/tristan-ko/
- GitHub: https://github.com/TristanYIKo
- Instagram: https://www.instagram.com/tristan__ko/
- Update email address

### Styling

- **Colors:** Customize CSS variables in `app/globals.css`
- **Typography:** Modify font settings in `app/layout.tsx` and `app/globals.css`
- **Spacing:** Adjust section padding in component files

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with header and footer
│   ├── page.tsx            # Single-page home combining all sections
│   └── globals.css         # Global styles and color scheme
├── components/
│   ├── sections/           # Page sections
│   │   ├── intro-section.tsx
│   │   ├── work-section.tsx
│   │   ├── projects-section.tsx
│   │   └── connect-section.tsx
│   ├── ui/                 # shadcn/ui components
│   ├── sticky-header.tsx   # Sticky navigation header
│   └── footer.tsx          # Footer with copyright
├── lib/
│   └── utils.ts           # Utility functions
└── public/                # Static assets
```

## Key Features Explained

### Sticky Header
- Scrolls with page, always visible
- "Tristan Ko" logo scrolls to top on click
- LinkedIn and GitHub icons open in new tabs

### Interactive Projects
- Click any project card to see full details
- Modal dialog shows description, tech stack, and links
- "View Live" and "View Code" buttons (when available)
- Smooth hover animations with lift effect

### Connect Section
- Four social platforms with animated icons
- LinkedIn, GitHub, Instagram, and Email
- Each link opens appropriately (new tab or mailto)

### Smooth Scrolling
- CSS smooth scroll behavior enabled
- Seamless transitions between sections
- Clean section spacing and dividers
