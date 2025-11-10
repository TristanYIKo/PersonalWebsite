# 3D Features Documentation

## Overview
The intro section has been upgraded with stunning 3D visuals using React Three Fiber and Three.js.

## Components

### 1. **ImageCarousel3D** (`components/3d/ImageCarousel3D.tsx`)
A circular 3D carousel that displays images on planes arranged in a circle.

**Features:**
- **Auto-rotation**: Smoothly rotates continuously at 0.003 rad/frame
- **Pause on hover**: Stops rotating when user hovers over the carousel
- **Circular layout**: 4 image planes arranged in a 4-meter radius circle
- **Smooth interpolation**: Rotation smoothly interpolates for fluid motion
- **Next/Prev controls**: Buttons rendered outside Canvas for manual navigation

**Technical Details:**
- Uses `useFrame` hook for animation loop
- Planes: 3m × 2m with DoubleSide material
- Currently shows placeholder colors (will load textures when images are added)
- Soft ambient + directional lighting for minimal aesthetic

### 2. **FloatingObject** (`components/3d/FloatingObject.tsx`)
A low-poly icosphere with orbiting cubes that reacts to page scroll.

**Features:**
- **Scroll-reactive**: Rotates, scales, and moves based on scroll position
- **Idle animation**: Gentle floating motion using sine wave
- **Low-poly aesthetic**: Icosahedron geometry (subdivisions: 1)
- **Wireframe overlay**: Semi-transparent wireframe for added detail
- **Orbiting cubes**: 3 small cubes orbit the main sphere

**Scroll Interactions:**
- **Rotation X**: Rotates up to π/2 radians as user scrolls down
- **Rotation Y**: Combines time-based rotation + scroll offset
- **Scale**: Shrinks by 30% when fully scrolled
- **Position Z**: Moves away (−3 units) as user scrolls

**Technical Details:**
- Positioned on right side (xl screens only via `hidden xl:block`)
- Uses window scroll event listener
- Smooth interpolation for all transformations
- Charcoal color (#1f1f1f) with metallic/rough material

### 3. **IntroSection Updates** (`components/sections/intro-section.tsx`)
Refactored to integrate 3D components with existing layout.

**Changes:**
- Replaced Embla carousel with `<Canvas>` containing `ImageCarousel3D`
- Added floating object Canvas on right side of text content
- Dynamic imports for all 3D components (SSR disabled)
- Maintained 2-column grid layout and all existing content
- Carousel controls rendered outside Canvas as HTML overlay

**Dynamic Imports:**
```tsx
const Canvas = dynamic(() => import("@react-three/fiber").then(...), { ssr: false });
```
This prevents SSR errors since Three.js requires browser APIs.

## Dependencies
```json
{
  "three": "^0.170.0",
  "@react-three/fiber": "^8.17.10",
  "@react-three/drei": "^9.117.3"
}
```

## Performance Optimizations
- **Suspense boundaries**: Prevent layout shifts during 3D load
- **SSR disabled**: Avoids server-side rendering errors
- **Smooth interpolation**: Uses lerp-style updates instead of instant changes
- **requestAnimationFrame**: Leverages `useFrame` for 60fps animations
- **Conditional rendering**: Floating object only shows on xl+ screens

## Customization

### Adjust Carousel Speed
```tsx
const autoRotateSpeed = 0.003; // Increase for faster rotation
```

### Change Carousel Radius
```tsx
const radius = 4; // Distance from center (meters)
```

### Modify Scroll Sensitivity
```tsx
const progress = Math.min(scrollY / viewportHeight, 1); // Adjust divisor
```

### Update Lighting
```tsx
<ambientLight intensity={0.8} /> {/* Increase for brighter scene */}
<directionalLight position={[5, 5, 5]} intensity={0.4} />
```

## Adding Image Textures
To load actual images instead of placeholders:

1. Place images in `public/assets/carousel/`
2. Update `ImageCarousel3D.tsx` to use `useLoader(TextureLoader, images)`
3. Apply textures to plane materials:
```tsx
<meshStandardMaterial map={texture} side={THREE.DoubleSide} />
```

## Browser Compatibility
- ✅ Chrome/Edge (recommended)
- ✅ Firefox
- ✅ Safari
- ⚠️ IE11 (not supported)

## Known Limitations
- 3D scenes only render client-side (not in static export previews)
- Requires WebGL support
- May impact performance on low-end mobile devices

## Future Enhancements
- [ ] Add image texture loading with fallbacks
- [ ] Implement touch gestures for mobile carousel control
- [ ] Add particles/stars background in 3D space
- [ ] Create alternative 2D fallback for no-WebGL browsers
- [ ] Optimize geometry complexity for mobile
