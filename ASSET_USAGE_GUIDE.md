# Image Asset Usage Guide

## Quick Reference: How to Use Images in Your Portfolio

### 📸 Carousel Images (Introduction Section)

**Location**: `components/sections/intro-section.tsx`

**Current Setup**:
```typescript
const carouselImages = [
  {
    src: "/assets/carousel/image-1.jpg",
    alt: "Tristan Ko - Photo 1",
  },
  {
    src: "/assets/carousel/image-2.jpg",
    alt: "Tristan Ko - Photo 2",
  },
  {
    src: "/assets/carousel/image-3.jpg",
    alt: "Tristan Ko - Photo 3",
  },
  {
    src: "/assets/carousel/image-4.jpg",
    alt: "Tristan Ko - Photo 4",
  },
];
```

**To Add Your Photos**:
1. Place your images in: `public/assets/carousel/`
2. Name them: `image-1.jpg`, `image-2.jpg`, `image-3.jpg`, `image-4.jpg`
3. Refresh your browser - they'll automatically appear!

**Example with Custom Names**:
```typescript
const carouselImages = [
  {
    src: "/assets/carousel/golf-swing.jpg",
    alt: "Tristan playing golf",
  },
  {
    src: "/assets/carousel/taekwondo-training.jpg",
    alt: "Taekwondo practice",
  },
  {
    src: "/assets/carousel/campus-waterloo.jpg",
    alt: "University of Waterloo campus",
  },
  {
    src: "/assets/carousel/snowboarding.jpg",
    alt: "Snowboarding adventure",
  },
];
```

---

### 🖼️ Project Thumbnails (Future Use)

**Location**: `components/sections/projects-section.tsx`

**How to Add Thumbnails to Projects**:

**Step 1**: Add images to `public/assets/projects/`

**Step 2**: Update the project object:
```typescript
const projects = [
  {
    title: "E-Commerce Platform",
    description: "A full-stack e-commerce solution...",
    thumbnail: "/assets/projects/ecommerce-platform.jpg", // Add this line
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Stripe"],
    details: "Built a comprehensive e-commerce platform...",
    link: "https://example.com/ecommerce",
    github: "https://github.com/tristanko/ecommerce",
  },
  // Add thumbnail to other projects...
];
```

**Step 3**: Update the Card component to display the image:
```tsx
<Card>
  {/* Add this image container */}
  {project.thumbnail && (
    <div className="aspect-video relative overflow-hidden bg-muted">
      <img 
        src={project.thumbnail} 
        alt={project.title}
        className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
      />
    </div>
  )}
  
  <CardHeader>
    <CardTitle>{project.title}</CardTitle>
    <CardDescription>{project.description}</CardDescription>
  </CardHeader>
  {/* Rest of card... */}
</Card>
```

---

## 📁 Asset Folder Structure

```
public/assets/
├── carousel/              ← Introduction carousel images
│   ├── image-1.jpg
│   ├── image-2.jpg
│   ├── image-3.jpg
│   └── image-4.jpg
│
└── projects/             ← Project thumbnail images
    ├── project-1.jpg
    ├── project-2.jpg
    └── ...
```

---

## 🎨 Image Specifications

### Carousel Images
- **Aspect Ratio**: Square (1:1)
- **Recommended Size**: 800x800px to 1200x1200px
- **Format**: JPG or PNG
- **Max File Size**: 500KB per image
- **Subject Ideas**: 
  - Golf course action shots
  - Taekwondo training
  - Snowboarding adventures
  - Campus life at UWaterloo
  - Professional headshot
  - Gaming setup
  - Workout/gym photos

### Project Thumbnails
- **Aspect Ratio**: 16:9 (landscape) or 1:1 (square)
- **Recommended Size**: 1200x675px (16:9) or 1000x1000px (square)
- **Format**: JPG or PNG
- **Max File Size**: 300KB per image
- **Subject Ideas**:
  - App screenshots
  - Dashboard mockups
  - Project demos
  - Code editor screenshots
  - UI/UX designs

---

## 💡 Pro Tips

### Optimize Your Images
Before adding to your portfolio:
1. **Resize** to recommended dimensions
2. **Compress** using tools like:
   - TinyPNG (https://tinypng.com)
   - Squoosh (https://squoosh.app)
   - ImageOptim (Mac)
3. **Convert** large PNGs to JPG when possible
4. **Test** on different devices

### Naming Convention
Use descriptive, lowercase names with hyphens:
- ✅ `golf-course-sunset.jpg`
- ✅ `taekwondo-black-belt.jpg`
- ✅ `waterloo-engineering.jpg`
- ❌ `IMG_1234.jpg`
- ❌ `My Photo.jpg`

### Responsive Images (Advanced)
For better performance, consider using Next.js Image component:

```tsx
import Image from 'next/image';

<Image 
  src="/assets/carousel/image-1.jpg"
  alt="Description"
  width={800}
  height={800}
  className="object-cover rounded-lg"
  priority  // For above-the-fold images
/>
```

---

## 🚀 Quick Start Checklist

- [ ] Prepare 4 square photos for carousel (800x800px recommended)
- [ ] Name them `image-1.jpg` through `image-4.jpg`
- [ ] Place in `public/assets/carousel/` folder
- [ ] Refresh browser to see them in the carousel
- [ ] (Optional) Add project thumbnails to `public/assets/projects/`
- [ ] (Optional) Update project cards to display thumbnails

---

## 🔄 Current Path References

All images are referenced from the root (`/assets/...`) because they're in the `public/` folder.

**Correct Path Format**:
```typescript
src: "/assets/carousel/image-1.jpg"  // ✅ Correct
src: "assets/carousel/image-1.jpg"   // ❌ Wrong (missing /)
src: "/public/assets/..."            // ❌ Wrong (don't include /public)
```

---

**Your portfolio is ready to receive your personal photos!** 📸

Just drop your images into the folders and they'll automatically display.
