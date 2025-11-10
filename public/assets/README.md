# Assets Directory Structure

This folder contains all images and media assets used throughout the portfolio.

## Folder Organization

```
public/assets/
├── carousel/          # Images for the introduction carousel
│   ├── image-1.jpg
│   ├── image-2.jpg
│   ├── image-3.jpg
│   └── image-4.jpg
│
└── projects/          # Thumbnails and images for project cards
    ├── project-1.jpg
    ├── project-2.jpg
    └── ...
```

## How to Use Images

### In Introduction Carousel

**File**: `components/sections/intro-section.tsx`

```typescript
const carouselImages = [
  {
    src: "/assets/carousel/image-1.jpg",
    alt: "Description of image 1",
  },
  {
    src: "/assets/carousel/image-2.jpg",
    alt: "Description of image 2",
  },
  // Add more images...
];
```

### In Project Cards (Future)

**File**: `components/sections/projects-section.tsx`

```typescript
const projects = [
  {
    title: "Project Name",
    description: "Description...",
    thumbnail: "/assets/projects/project-1.jpg",  // Add this field
    tech: ["Tech1", "Tech2"],
    // ... rest of project data
  },
];
```

Then in the component:
```tsx
<Card>
  <div className="aspect-video relative overflow-hidden">
    <img 
      src={project.thumbnail} 
      alt={project.title}
      className="object-cover w-full h-full"
    />
  </div>
  <CardHeader>
    <CardTitle>{project.title}</CardTitle>
    // ... rest of card
  </CardHeader>
</Card>
```

## Image Recommendations

### Carousel Images
- **Dimensions**: 800x800px to 1200x1200px (square)
- **Format**: JPG or PNG
- **File size**: < 500KB each
- **Naming**: Use descriptive names (golf-swing.jpg, campus-shot.jpg, etc.)

### Project Thumbnails
- **Dimensions**: 1200x675px (16:9 ratio) or 1000x1000px (square)
- **Format**: JPG or PNG
- **File size**: < 300KB each
- **Naming**: Match project name (ecommerce-dashboard.jpg, task-manager.jpg, etc.)

## Current Setup

The portfolio is configured to use:
- `/assets/carousel/` for introduction carousel images
- `/assets/projects/` for project thumbnails (when added)

All images in `public/` are served from the root URL path.

## Example: Adding Your Photos

1. **Prepare your images** (resize and optimize)
2. **Place in correct folder**:
   - Carousel: `public/assets/carousel/`
   - Projects: `public/assets/projects/`
3. **Update component** with correct paths
4. **Refresh browser** to see changes

## Tips

- Use descriptive filenames (no spaces, use hyphens)
- Optimize images before uploading (use tools like TinyPNG)
- Keep consistent aspect ratios within each category
- Test images on different screen sizes
