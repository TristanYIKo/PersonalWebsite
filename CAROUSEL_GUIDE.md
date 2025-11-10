# Carousel Setup Guide

## Current Configuration

The introduction section now features a **minimal auto-playing image carousel** that displays personal photos alongside your bio.

### Features

✅ **Auto-play**: Slides change every 3 seconds automatically
✅ **Manual Navigation**: Previous/Next arrow buttons
✅ **Loop**: Carousel loops infinitely
✅ **Responsive**: Adapts to mobile, tablet, and desktop
✅ **Minimal Design**: Rounded corners, thin border, subtle styling
✅ **Pause on Interaction**: Carousel continues after user interaction

### Carousel Specifications

- **Component**: shadcn/ui Carousel with Embla
- **Auto-play Plugin**: embla-carousel-autoplay
- **Delay**: 3000ms (3 seconds)
- **Layout**: Side-by-side with text on desktop, stacked on mobile
- **Styling**: Card component with border, rounded corners
- **Navigation**: Subtle arrow buttons, indicator dots below

## Adding Your Images

### Step 1: Prepare Your Images

1. **Recommended dimensions**: 800x800px to 1200x1200px (square aspect ratio)
2. **Format**: JPG or PNG
3. **File size**: Keep under 500KB each for optimal performance
4. **Content ideas**:
   - Professional headshot
   - Golf course moments
   - Taekwondo training
   - Campus or study scenes
   - Hobby/activity photos

### Step 2: Add Images to Project

Place your image files in the `public/images/` folder:

```
public/
└── images/
    ├── placeholder-1.jpg  ← Replace with your image
    ├── placeholder-2.jpg  ← Replace with your image
    ├── placeholder-3.jpg  ← Replace with your image
    └── placeholder-4.jpg  ← Replace with your image
```

### Step 3: Update Image Paths (Optional)

If you want to use different filenames or add more images, edit:
`components/sections/intro-section.tsx`

```typescript
const carouselImages = [
  {
    src: "/images/your-image-1.jpg",  // Update filename
    alt: "Description of image 1",     // Update description
  },
  {
    src: "/images/your-image-2.jpg",
    alt: "Description of image 2",
  },
  // Add more images here...
];
```

## Customization Options

### Change Auto-play Speed

In `components/sections/intro-section.tsx`:

```typescript
const plugin = useRef(
  Autoplay({ 
    delay: 3000,  // Change to 4000 for 4 seconds, etc.
    stopOnInteraction: false 
  })
);
```

### Add More Images

Simply add more objects to the `carouselImages` array:

```typescript
const carouselImages = [
  // ... existing images
  {
    src: "/images/placeholder-5.jpg",
    alt: "Fifth image",
  },
  {
    src: "/images/placeholder-6.jpg",
    alt: "Sixth image",
  },
];
```

### Adjust Carousel Size

In `components/sections/intro-section.tsx`, modify the grid layout:

```typescript
// Current: 2 columns on medium screens and up
<div className="grid md:grid-cols-2 gap-12 items-center">

// Option 1: Carousel takes more space (60/40 split)
<div className="grid md:grid-cols-[3fr_2fr] gap-12 items-center">

// Option 2: Text takes more space (40/60 split)
<div className="grid md:grid-cols-[2fr_3fr] gap-12 items-center">
```

### Remove Navigation Arrows

If you prefer dots only:

```typescript
// Remove or comment out these lines:
<CarouselPrevious className="left-2" />
<CarouselNext className="right-2" />
```

### Style the Dots

Current dots are small and subtle. To make them more prominent:

```typescript
<div className="flex justify-center gap-2 mt-4">
  {carouselImages.map((_, index) => (
    <div
      key={index}
      className="h-2 w-2 rounded-full bg-foreground/50"  // Darker and larger
    />
  ))}
</div>
```

## Troubleshooting

### Images Not Showing

1. Check that images are in `public/images/` folder
2. Verify filenames match exactly (case-sensitive)
3. Ensure images are valid JPG/PNG files
4. Clear browser cache and refresh

### Carousel Not Auto-playing

1. Verify `embla-carousel-autoplay` is installed
2. Check that the plugin is properly referenced
3. Ensure no JavaScript errors in browser console

### Layout Issues on Mobile

The carousel automatically stacks above the text on mobile. If spacing looks off:

```typescript
// Adjust gap between carousel and text
<div className="grid md:grid-cols-2 gap-8 items-center">  // Reduced from gap-12
```

## Current Bio Text

The introduction section now displays:

**Title**: Tristan Ko

**Main Bio**:
"Management Engineering student at the University of Waterloo, passionate about data and problem-solving through analytics."

**Personal Interests**:
"I enjoy exploring insights from data, building efficient tools, and spending time golfing, training in taekwondo, investing, and gaming."

To update this text, edit `components/sections/intro-section.tsx` in the text content section.

## Layout Behavior

- **Desktop** (>768px): Carousel on left, text on right
- **Mobile** (<768px): Carousel on top, text below
- **Text Alignment**: Centered on mobile, left-aligned on desktop

---

**Next Step**: Add your personal images to `public/images/` to replace the placeholders! 📸
