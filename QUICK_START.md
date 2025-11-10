# Quick Start Guide

## Your Portfolio is Ready! 🎉

The development server is running at: **http://localhost:3000**

## Project Overview

Your personal portfolio website has been successfully created with:

### ✅ Completed Features

1. **Modern Tech Stack**
   - Next.js 14 with App Router
   - TypeScript
   - Tailwind CSS
   - shadcn/ui components

2. **Three Main Pages**
   - **/** - Introduction page with your name and tagline
   - **/projects** - Grid of 6 sample projects with hover animations
   - **/work** - Timeline of 4 work experiences with achievements

3. **Design Features**
   - Minimalist black, white, and grey color palette
   - Dark mode support (automatic based on system preference)
   - Responsive design (max-width ~5xl)
   - Smooth hover effects and transitions
   - Clean navigation header
   - Custom scrollbar styling

## How to Customize

### Update Your Introduction (app/page.tsx)
```typescript
// Edit the name, tagline, and description
<h1>Tristan Ko</h1>
<p>Your tagline here</p>
<p>Your introduction paragraph</p>
```

### Add Your Projects (app/projects/page.tsx)
```typescript
// Edit the projects array
const projects = [
  {
    title: "Project Name",
    description: "Project description",
    tech: ["Tech1", "Tech2", "Tech3"],
  },
  // Add more projects...
];
```

### Update Work Experience (app/work/page.tsx)
```typescript
// Edit the experiences array
const experiences = [
  {
    role: "Your Role",
    company: "Company Name",
    period: "Start - End",
    description: "Role description",
    achievements: [
      "Achievement 1",
      "Achievement 2",
    ],
  },
  // Add more experiences...
];
```

### Customize Colors (app/globals.css)
The project uses CSS variables that adapt to light/dark mode. You can customize:
- Background colors
- Text colors
- Border colors
- Accent colors

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## File Structure

```
PersonalWebsite/
├── app/
│   ├── layout.tsx          # Root layout with navigation
│   ├── page.tsx            # Home/Introduction page
│   ├── projects/page.tsx   # Projects grid
│   ├── work/page.tsx       # Work experience timeline
│   └── globals.css         # Global styles and theme
├── components/
│   ├── ui/                 # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   └── separator.tsx
│   └── navigation.tsx      # Header navigation
├── lib/
│   └── utils.ts           # Utility functions
└── public/                # Static assets (add images here)
```

## Next Steps

1. **Customize Content**: Replace sample data with your actual projects and experience
2. **Add Images**: Place images in the `public/` folder and reference them
3. **Update Metadata**: Edit SEO information in `app/layout.tsx`
4. **Deploy**: When ready, deploy to Vercel with `vercel` command

## Deployment to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Follow prompts to link your project
```

Or deploy via Vercel Dashboard:
1. Go to vercel.com
2. Import your GitHub repository
3. Vercel will auto-detect Next.js and deploy

## Need Help?

- **Next.js Docs**: https://nextjs.org/docs
- **shadcn/ui Docs**: https://ui.shadcn.com
- **Tailwind Docs**: https://tailwindcss.com/docs

---

**Your portfolio is live at http://localhost:3000** 🚀
