# Portfolio Website - Feature Guide

## 🎨 Design Overview

Your portfolio has been transformed into a modern, single-page scrolling website with a professional off-white and charcoal color scheme.

### Color Palette
- **Background**: `#f6f6f4` (soft off-white)
- **Text**: `#1f1f1f` (dark charcoal)
- **Accents**: Light grey borders and dividers
- **Cards**: White with subtle shadows

---

## 📐 Layout Structure

### Sticky Header
**Always visible at the top of the page**
- **Left**: "Tristan Ko" logo - click to scroll to top
- **Right**: Social icons (LinkedIn, GitHub) - open in new tabs
- Semi-transparent backdrop blur effect
- Smooth transitions on scroll

### Main Sections (in order)

#### 1. Introduction
- Full-height hero section
- Centered name and tagline
- Professional description
- Smooth fade-in animations

#### 2. Work Experience  
- Vertical timeline layout
- Chronological list of positions
- Each role includes:
  - Position title and company
  - Date range
  - Description
  - Key achievements list
- Timeline dots on desktop view
- Hover effects: lift and shadow enhancement

#### 3. Projects
- 3-column responsive grid (2 on tablet, 1 on mobile)
- 6 featured projects with:
  - Title and description
  - Technology tags
  - **Click to open detailed modal**
- Hover effects: Lift animation (-8px) with enhanced shadow
- Light grey background section for visual separation

#### 4. Connect
- Centered social media section
- 4 platforms with large icons:
  - LinkedIn (opens profile in new tab)
  - GitHub (opens profile in new tab)
  - Instagram (opens profile in new tab)
  - Email (opens mailto link)
- Hover effects: Scale up with enhanced border
- Clean icon grid layout

### Footer
- Simple bottom bar
- Copyright: "©2025 | Tristan Ko"
- Matches header style

---

## ✨ Interactive Features

### Project Modal Dialog
**Click any project card to see:**
- Full project title and description
- Detailed explanation of the project
- Complete list of technologies used
- Action buttons:
  - **View Live** - Opens demo site (if available)
  - **View Code** - Opens GitHub repository (if available)
- Click outside or press ESC to close

### Smooth Scrolling
- All navigation is smooth-scrolled
- Logo click returns to top seamlessly
- Section-to-section flow is natural

### Hover Animations
- **Project Cards**: Lift up and pop out with shadow
- **Work Cards**: Subtle lift with enhanced shadow
- **Social Icons**: Scale up and brighten
- **Header Links**: Color fade transitions
- All animations: `duration-300ms` for smooth feel

---

## 🎯 Customization Guide

### Update Your Information

**1. Header Social Links**
File: `components/sticky-header.tsx`
```typescript
// Update these URLs:
href="https://www.linkedin.com/in/your-profile"
href="https://github.com/yourusername"
```

**2. Introduction Section**
File: `components/sections/intro-section.tsx`
```typescript
// Edit these lines:
<h1>Your Name</h1>
<p>Your tagline here</p>
<p>Your description paragraph</p>
```

**3. Work Experience**
File: `components/sections/work-section.tsx`
```typescript
// Modify the experiences array:
const experiences = [
  {
    role: "Your Position",
    company: "Company Name",
    period: "Start Date - End Date",
    description: "What you did...",
    achievements: [
      "Achievement 1",
      "Achievement 2",
    ],
  },
  // Add more experiences...
];
```

**4. Projects**
File: `components/sections/projects-section.tsx`
```typescript
// Update the projects array:
const projects = [
  {
    title: "Project Name",
    description: "Short description",
    tech: ["Tech1", "Tech2"],
    details: "Full project description...",
    link: "https://demo-url.com", // optional
    github: "https://github.com/user/repo", // optional
  },
  // Add more projects...
];
```

**5. Connect Section**
File: `components/sections/connect-section.tsx`
```typescript
// Update all social links:
const socialLinks = [
  { href: "https://linkedin.com/in/yourprofile", ... },
  { href: "https://github.com/yourusername", ... },
  { href: "https://instagram.com/yourhandle", ... },
  { href: "mailto:your.email@example.com", ... },
];
```

---

## 🎨 Style Customization

### Change Colors
File: `app/globals.css`

```css
:root {
  --background: 32 5% 96.5%; /* Off-white background */
  --foreground: 0 0% 12%;     /* Dark charcoal text */
  --border: 0 0% 90%;         /* Light grey borders */
  /* Adjust these HSL values to taste */
}
```

### Adjust Section Spacing
Each section component has padding classes:
```typescript
// Example: Make sections taller
className="px-6 py-32"  // was py-20
```

### Modify Animations
All hover effects use Tailwind classes:
```typescript
// Example: Stronger lift effect
hover:-translate-y-2  // change to hover:-translate-y-4
```

---

## 📱 Responsive Behavior

### Breakpoints
- **Mobile** (< 768px): Single column, stacked sections
- **Tablet** (768px - 1024px): 2-column project grid
- **Desktop** (> 1024px): 3-column project grid, timeline visible

### Mobile Optimizations
- Header remains sticky and compact
- Text sizes scale down appropriately
- Cards stack vertically
- Social icons remain full-size for easy tapping
- Modal dialogs are full-width on mobile

---

## 🚀 Performance Features

- **Static Generation**: All content pre-rendered at build time
- **Code Splitting**: Automatic with Next.js App Router
- **Optimized Images**: Ready for Next.js Image component
- **Minimal JavaScript**: Only interactive elements hydrate
- **Smooth Scrolling**: CSS-based, no JavaScript needed

---

## 📦 Project Structure

```
components/
├── sections/
│   ├── intro-section.tsx       # Hero/landing
│   ├── work-section.tsx        # Experience timeline
│   ├── projects-section.tsx    # Project grid + modal
│   └── connect-section.tsx     # Social links
├── ui/                         # shadcn components
├── sticky-header.tsx           # Top navigation
└── footer.tsx                  # Bottom copyright

app/
├── layout.tsx                  # Root with header + footer
├── page.tsx                    # Main page (combines sections)
└── globals.css                 # Color scheme & styles
```

---

## 🔍 SEO & Metadata

Current metadata (in `app/layout.tsx`):
```typescript
title: "Tristan Ko - Portfolio"
description: "Personal portfolio website..."
```

**To improve SEO, add:**
- Open Graph tags for social sharing
- Canonical URLs
- Structured data (JSON-LD)
- Meta keywords

---

## 🎯 Next Steps

1. **Replace all placeholder content** with your real data
2. **Update all social media URLs** to your actual profiles
3. **Add real project screenshots** to the public folder
4. **Update email address** in Connect section
5. **Test on mobile devices** to ensure responsiveness
6. **Deploy to Vercel** for live hosting

---

**Current Status**: ✅ Fully functional single-page portfolio
**Build Status**: ✅ Compiles successfully
**Dev Server**: ✅ Running at http://localhost:3000

Enjoy your new portfolio! 🎉
