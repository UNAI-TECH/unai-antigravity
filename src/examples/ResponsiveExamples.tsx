/**
 * RESPONSIVE DESIGN USAGE EXAMPLES
 * 
 * This file demonstrates how to use all the responsive utilities
 * and components implemented in the UNAI TECH website.
 */

import React from 'react';
import { AnimatedSection } from '@/components/layout/AnimatedSection';
import { ResponsiveImage } from '@/components/ui/ResponsiveImage';

// ============================================
// EXAMPLE 1: Responsive Section with Animations
// ============================================

export const ResponsiveSectionExample = () => {
    return (
        <section className="section-padding">
            <div className="container mx-auto">
                <AnimatedSection animation="fadeInUp" delay={0}>
                    <h2 className="text-responsive-4xl font-bold text-center mb-8">
                        Our Services
                    </h2>
                </AnimatedSection>

                <AnimatedSection animation="fadeInUp" delay={0.2}>
                    <p className="text-responsive-lg text-center text-gray-400 max-w-3xl mx-auto mb-12">
                        We provide cutting-edge AI solutions that transform businesses
                    </p>
                </AnimatedSection>

                {/* Responsive Grid */}
                <div className="grid-responsive">
                    {[1, 2, 3, 4].map((item, index) => (
                        <AnimatedSection
                            key={item}
                            animation="scaleIn"
                            delay={0.1 * index}
                        >
                            <div className="glass-card gpu-accelerated">
                                <h3 className="text-responsive-xl font-semibold mb-4">
                                    Service {item}
                                </h3>
                                <p className="text-responsive-base text-gray-400">
                                    Description of the service goes here
                                </p>
                            </div>
                        </AnimatedSection>
                    ))}
                </div>
            </div>
        </section>
    );
};

// ============================================
// EXAMPLE 2: Responsive Typography
// ============================================

export const TypographyExample = () => {
    return (
        <div className="section-padding">
            {/* Extra Large Heading - Hero */}
            <h1 className="text-responsive-5xl font-bold mb-6">
                Hero Heading
            </h1>

            {/* Large Heading - Section Title */}
            <h2 className="text-responsive-4xl font-bold mb-4">
                Section Title
            </h2>

            {/* Medium Heading - Subsection */}
            <h3 className="text-responsive-3xl font-semibold mb-4">
                Subsection Title
            </h3>

            {/* Body Text */}
            <p className="text-responsive-base text-gray-400 mb-4">
                This is body text that scales responsively across devices.
            </p>

            {/* Small Text */}
            <p className="text-responsive-sm text-gray-500">
                This is smaller text for captions or metadata.
            </p>
        </div>
    );
};

// ============================================
// EXAMPLE 3: Responsive Images with Lazy Loading
// ============================================

export const ImageGalleryExample = () => {
    const images = [
        { src: '/images/1.jpg', alt: 'Image 1' },
        { src: '/images/2.jpg', alt: 'Image 2' },
        { src: '/images/3.jpg', alt: 'Image 3' },
        { src: '/images/4.jpg', alt: 'Image 4' },
    ];

    return (
        <section className="section-padding">
            <div className="container mx-auto">
                <div className="grid-responsive">
                    {images.map((image, index) => (
                        <AnimatedSection
                            key={index}
                            animation="fadeInUp"
                            delay={0.1 * index}
                        >
                            <ResponsiveImage
                                src={image.src}
                                alt={image.alt}
                                aspectRatio="16/9"
                                loading="lazy"
                                className="rounded-2xl overflow-hidden"
                            />
                        </AnimatedSection>
                    ))}
                </div>
            </div>
        </section>
    );
};

// ============================================
// EXAMPLE 4: Touch-Friendly Interactive Elements
// ============================================

export const InteractiveElementsExample = () => {
    return (
        <section className="section-padding">
            <div className="container mx-auto">
                {/* Touch-friendly buttons */}
                <div className="flex flex-wrap gap-4">
                    <button className="tap-target btn-metal gpu-accelerated">
                        Primary Action
                    </button>

                    <button className="tap-target px-6 py-4 rounded-full border-2 border-white/20 text-white hover:bg-white/10 transition-all gpu-accelerated">
                        Secondary Action
                    </button>
                </div>

                {/* Touch-friendly cards */}
                <div className="grid-responsive mt-8">
                    {[1, 2, 3].map((item) => (
                        <button
                            key={item}
                            className="glass-card tap-target text-left w-full gpu-accelerated hover:scale-105 transition-transform"
                        >
                            <h3 className="text-responsive-xl font-semibold mb-2">
                                Card {item}
                            </h3>
                            <p className="text-responsive-base text-gray-400">
                                Tap to interact
                            </p>
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
};

// ============================================
// EXAMPLE 5: Performance-Optimized Animations
// ============================================

export const AnimatedCardsExample = () => {
    return (
        <section className="section-padding">
            <div className="container mx-auto">
                <div className="grid-responsive">
                    {[1, 2, 3, 4, 5, 6].map((item, index) => (
                        <AnimatedSection
                            key={item}
                            animation="fadeInUp"
                            delay={0.05 * index}
                            threshold={0.2}
                        >
                            <div className="glass-card animate-optimized will-change-transform hover:scale-105 transition-transform duration-300">
                                <div className="w-full h-48 bg-gradient-to-br from-metal-blue-500/20 to-metal-purple-500/20 rounded-xl mb-4 gpu-accelerated" />
                                <h3 className="text-responsive-xl font-semibold mb-2">
                                    Feature {item}
                                </h3>
                                <p className="text-responsive-base text-gray-400">
                                    Optimized for smooth 60fps animations
                                </p>
                            </div>
                        </AnimatedSection>
                    ))}
                </div>
            </div>
        </section>
    );
};

// ============================================
// EXAMPLE 6: Responsive Layout with Breakpoints
// ============================================

export const ResponsiveLayoutExample = () => {
    return (
        <section className="section-padding">
            <div className="container mx-auto">
                {/* Mobile: Stack vertically */}
                {/* Tablet: 2 columns */}
                {/* Desktop: 3 columns */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
                    <div className="glass-card">
                        <h3 className="text-responsive-xl font-semibold mb-4">Column 1</h3>
                        <p className="text-responsive-base text-gray-400">
                            This layout adapts to different screen sizes
                        </p>
                    </div>

                    <div className="glass-card">
                        <h3 className="text-responsive-xl font-semibold mb-4">Column 2</h3>
                        <p className="text-responsive-base text-gray-400">
                            Mobile: Full width, Tablet: 50%, Desktop: 33%
                        </p>
                    </div>

                    <div className="glass-card md:col-span-2 lg:col-span-1">
                        <h3 className="text-responsive-xl font-semibold mb-4">Column 3</h3>
                        <p className="text-responsive-base text-gray-400">
                            Spans 2 columns on tablet, 1 on desktop
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

// ============================================
// EXAMPLE 7: Staggered Animations
// ============================================

export const StaggeredAnimationsExample = () => {
    const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];

    return (
        <section className="section-padding">
            <div className="container mx-auto">
                <AnimatedSection animation="fadeInDown">
                    <h2 className="text-responsive-4xl font-bold text-center mb-12">
                        Staggered Animations
                    </h2>
                </AnimatedSection>

                <div className="space-y-4">
                    {items.map((item, index) => (
                        <AnimatedSection
                            key={item}
                            animation="fadeInRight"
                            delay={0.1 * index}
                        >
                            <div className="glass-card gpu-accelerated">
                                <h3 className="text-responsive-xl font-semibold">{item}</h3>
                            </div>
                        </AnimatedSection>
                    ))}
                </div>
            </div>
        </section>
    );
};

// ============================================
// EXAMPLE 8: Mobile-First Spacing
// ============================================

export const SpacingExample = () => {
    return (
        <>
            {/* Section with responsive padding */}
            <section className="section-padding bg-black/20">
                <div className="container mx-auto">
                    <h2 className="text-responsive-3xl font-bold">
                        Responsive Padding
                    </h2>
                    <p className="text-responsive-base text-gray-400 mt-4">
                        This section has padding that scales with screen size
                    </p>
                </div>
            </section>

            {/* Section with responsive margin */}
            <div className="section-margin">
                <div className="glass-card">
                    <h3 className="text-responsive-xl font-semibold">
                        Responsive Margin
                    </h3>
                    <p className="text-responsive-base text-gray-400 mt-2">
                        This container has margin that adapts to viewport
                    </p>
                </div>
            </div>
        </>
    );
};

// ============================================
// USAGE NOTES
// ============================================

/**
 * RESPONSIVE UTILITIES QUICK REFERENCE:
 * 
 * SPACING:
 * - .section-padding: Responsive padding for sections
 * - .section-margin: Responsive margin for containers
 * 
 * TYPOGRAPHY:
 * - .text-responsive-xs to .text-responsive-5xl
 * 
 * LAYOUT:
 * - .grid-responsive: Auto-responsive grid (1/2/3/4 cols)
 * 
 * PERFORMANCE:
 * - .gpu-accelerated: Hardware acceleration
 * - .animate-optimized: Optimized animations
 * - .will-change-transform: Hint for transforms
 * - .will-change-opacity: Hint for opacity
 * 
 * INTERACTIONS:
 * - .tap-target: Touch-friendly minimum size
 * 
 * ANIMATIONS:
 * - Use <AnimatedSection> for scroll-triggered animations
 * - Available: fadeInUp, fadeInDown, fadeInLeft, fadeInRight, scaleIn
 * 
 * IMAGES:
 * - Use <ResponsiveImage> for lazy loading and skeleton states
 */
