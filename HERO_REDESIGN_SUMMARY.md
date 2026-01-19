# Hero Section Redesign Implementation Plan

## Overview
We have completely redesigned the Hero Section to meet the "World-Class Senior UI/UX Architect" specifications. The new design features a premium dark aesthetic, advanced glassmorphism, and a signature "Laser Flow" light animation.

## Key Components

### 1. HeroSection.tsx
- **Structure**:
  - **Global Background**: Deep black gradient (#050508 to #000000) with SVG noise overlay and ambient pulse orbs.
  - **Navbar**: Integrated fixed-top glassmorphism navbar matching the 20-30% opacity specification.
  - **Layout**: Split screen (Right: Main Content, Left: Secondary Preview).
- **Animations**:
  - **LaserBorder Component**: A reusable Framer Motion component that animates an SVG stroke around a container. It uses `pathOffset` and `opacity` to simulate a traveling beam of light that wraps around the edges.
  - **Beam Interaction**: A diagonal light shaft that "shoots" across the screen, timed to trigger the border glows on impact.
  - **Entrance Animations**: Staggered fade-ins and slides for content.

### 2. Styles (index.css)
- Added `animate-gradient-x` keyframes for the "Defy Gravity" text gradient animation.

### 3. Page Structure (Index.tsx)
- Removed the global `FloatingNavbar` from the Home page (`Index.tsx`) to prevent conflict with the specialized Hero Navbar.

## Usage
The `HeroSection` is now a self-contained premium header. It handles its own navigation and background.

## Design Details
- **Glassmorphism**: 
  - Lavender Container: `bg-[#E6E6FA]/5` with `backdrop-blur-3xl`.
  - Peach Container: `bg-[#FFDAB9]/5` with `backdrop-blur-2xl`.
- **Typography**: Uses the project's `font-sans` (Inter/Sora) with tight tracking and high contrast.
- **Lighting**: Custom SVG filters are used to create the "Neon Glow" on the laser borders.

## Future Improvements
- **Performance**: The noise texture is an SVG data URI which is performant, but heavy blur filters (`blur-[150px]`) can be taxing on mobile. Consider reducing blur radii on small screens if FPS drops.
- **Responsiveness**: The layout stacks vertically on mobile.
