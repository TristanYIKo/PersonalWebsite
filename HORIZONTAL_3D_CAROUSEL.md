# Horizontal 3D Carousel Documentation

## Overview
A sleek horizontal 3D carousel with drag functionality, hover-to-snap behavior, and minimal styling.

## Features

### ✅ **Tight Horizontal Strip Layout**
- Cards positioned with minimal gaps (0.15 units between 2.5-unit-wide cards)
- Almost-touching appearance while maintaining visible separation
- Smooth continuous strip that extends horizontally

### ✅ **3D Perspective**
- Slight top-down camera angle (position: [0, 1.5, 8])
- FOV: 40° for focused perspective
- Light horizontal tilt for depth perception

### ✅ **Interaction Modes**

**Auto-Scroll:**
- Continuous slow scrolling at 0.002 rad/frame
- Only active when mouse is NOT hovering over any card
- Smooth, non-intrusive movement

**Drag to Scroll:**
- Click and drag anywhere (except on cards) to manually scroll
- Smooth momentum-based scrolling
- Disabled when hovering over cards

**Hover-to-Snap:**
- Hover over any card to snap it to center
- Card scales up 5% (1.05x) when hovered
- Card moves forward 0.3 units in Z-axis for emphasis
- Pauses all auto-scroll and drag while hovering
- Smooth snap animation with interpolation

### ✅ **Clean Minimal Styling**
- Off-white cards (#f0f0f0)
- Subtle grey borders (#d0d0d0, 40% opacity)
- Image placeholder area: #e5e5e5
- Title background: #333333 with 80% opacity
- No arrows, no pagination dots
- Matches site's black/white/grey aesthetic

### ✅ **Smooth Transitions**
- No jitter or sudden movements
- Interpolated animations (0.08-0.15 smoothness factor)
- Scale and position transitions are gradual
- Drag has higher smoothness (0.15) for responsive feel

## Component API

### `HorizontalCarousel3DWrapper`
Main wrapper component that sets up the 3D canvas.

```tsx
interface CarouselItem {
  image: string;  // Path to image
  title: string;  // Card title
}

<HorizontalCarousel3DWrapper items={carouselItems} />
```

### Example Usage

```tsx
const carouselItems = [
  { image: "/assets/carousel/image-1.jpg", title: "Photo 1" },
  { image: "/assets/carousel/image-2.jpg", title: "Photo 2" },
  { image: "/assets/carousel/image-3.jpg", title: "Photo 3" },
  { image: "/assets/carousel/image-4.jpg", title: "Photo 4" },
];

<HorizontalCarousel3DWrapper items={carouselItems} />
```

## Technical Details

### Spacing Configuration
```tsx
const cardWidth = 2.5;    // Width of each card
const gap = 0.15;          // Gap between cards (very small)
const spacing = cardWidth + gap;  // Total spacing = 2.65
```

### Camera Setup
```tsx
camera={{ 
  position: [0, 1.5, 8],  // Slightly elevated
  fov: 40,                 // Focused view
  near: 0.1,
  far: 1000
}}
```

### Lighting
- Ambient: 0.9 intensity (bright, soft)
- Directional 1: Position [3, 5, 5], intensity 0.3
- Directional 2: Position [-3, 3, -3], intensity 0.2
- Point light: Position [0, -2, 3], intensity 0.15 (fill)

### State Management
- `hoveredIndex`: Tracks which card is being hovered
- `isDragging`: Boolean for drag state
- `dragStart`: X position where drag started
- `currentOffset`: Current scroll offset
- `targetOffset`: Target scroll offset (interpolated to)

### Interaction Logic

**Hover Detection:**
```tsx
onPointerEnter={() => !isDragging && setHoveredIndex(index)}
onPointerLeave={() => setHoveredIndex(null)}
```

**Drag Implementation:**
```tsx
onPointerDown → setIsDragging(true)
onPointerMove → calculate delta, update targetOffset
onPointerUp → setIsDragging(false)
```

**Auto-Scroll Condition:**
```tsx
if (hoveredIndex === null && !isDragging) {
  targetOffset.current += autoScrollSpeed.current;
}
```

## Customization

### Adjust Card Size
```tsx
const cardWidth = 2.5;  // Change width
<planeGeometry args={[cardWidth, 3]} />  // Change height (second arg)
```

### Modify Gap Size
```tsx
const gap = 0.15;  // Smaller = tighter, larger = more space
```

### Change Scroll Speed
```tsx
const autoScrollSpeed = useRef(0.002);  // Increase for faster
```

### Adjust Hover Scale
```tsx
const scale = isHovered ? 1.05 : 1;  // Change 1.05 to desired scale
```

### Modify Snap Smoothness
```tsx
targetOffset.current += (targetPos - targetOffset.current) * 0.1;
// Increase 0.1 for faster snap, decrease for slower
```

## Performance Notes
- Uses `useFrame` for 60fps animations
- Smooth interpolation prevents frame drops
- Minimal re-renders with useRef for animation values
- Dynamic imports prevent SSR issues

## Browser Support
- ✅ Chrome/Edge (recommended)
- ✅ Firefox
- ✅ Safari
- ⚠️ Requires WebGL support
- ⚠️ May impact performance on low-end mobile devices

## Future Enhancements
- [ ] Add actual image texture loading
- [ ] Implement touch gestures for mobile
- [ ] Add keyboard navigation (arrow keys)
- [ ] Infinite loop scrolling
- [ ] Custom easing functions
- [ ] Progress indicator
