import React from 'react';
import { FloatingNavbar } from '@/components/layout/FloatingNavbar';
import { Footer } from '@/components/layout/Footer';
import { AnimatedSection } from '@/components/layout/AnimatedSection';

/**
 * Responsive Test Page
 * Demonstrates all responsive features and smooth scrolling
 */
const ResponsiveTest = () => {
    return (
        <div className="min-h-screen bg-black text-white">
            <FloatingNavbar />

            {/* Hero Section - Full Viewport */}
            <section className="min-h-screen flex items-center justify-center section-padding">
                <AnimatedSection animation="fadeInUp">
                    <div className="text-center">
                        <h1 className="text-responsive-5xl font-bold mb-6 text-gradient-metal">
                            Responsive Design Test
                        </h1>
                        <p className="text-responsive-lg text-gray-400 max-w-3xl mx-auto">
                            Scroll down to see smooth scrolling and responsive animations in action
                        </p>
                    </div>
                </AnimatedSection>
            </section>

            {/* Typography Showcase */}
            <section className="section-padding bg-white/5">
                <div className="container mx-auto">
                    <AnimatedSection animation="fadeInUp">
                        <h2 className="text-responsive-4xl font-bold mb-12 text-center">
                            Responsive Typography
                        </h2>
                    </AnimatedSection>

                    <div className="space-y-8">
                        <AnimatedSection animation="fadeInLeft" delay={0.1}>
                            <div className="glass-card">
                                <h3 className="text-responsive-3xl font-semibold mb-2">
                                    Extra Large Heading
                                </h3>
                                <p className="text-responsive-base text-gray-400">
                                    Scales from 48px on mobile to 96px on extra large screens
                                </p>
                            </div>
                        </AnimatedSection>

                        <AnimatedSection animation="fadeInRight" delay={0.2}>
                            <div className="glass-card">
                                <h4 className="text-responsive-2xl font-semibold mb-2">
                                    Large Heading
                                </h4>
                                <p className="text-responsive-base text-gray-400">
                                    Scales from 32px on mobile to 64px on desktop
                                </p>
                            </div>
                        </AnimatedSection>

                        <AnimatedSection animation="fadeInLeft" delay={0.3}>
                            <div className="glass-card">
                                <h5 className="text-responsive-xl font-semibold mb-2">
                                    Medium Heading
                                </h5>
                                <p className="text-responsive-base text-gray-400">
                                    Perfect for subsections and card titles
                                </p>
                            </div>
                        </AnimatedSection>
                    </div>
                </div>
            </section>

            {/* Grid Showcase */}
            <section className="section-padding">
                <div className="container mx-auto">
                    <AnimatedSection animation="fadeInDown">
                        <h2 className="text-responsive-4xl font-bold mb-12 text-center">
                            Responsive Grid
                        </h2>
                        <p className="text-responsive-lg text-center text-gray-400 mb-12">
                            1 column on mobile → 2 on tablet → 3 on desktop → 4 on XL
                        </p>
                    </AnimatedSection>

                    <div className="grid-responsive">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
                            <AnimatedSection
                                key={item}
                                animation="scaleIn"
                                delay={0.05 * index}
                            >
                                <div className="glass-card gpu-accelerated hover:scale-105 transition-transform">
                                    <div className="w-full h-32 bg-gradient-to-br from-metal-blue-500/20 to-metal-purple-500/20 rounded-xl mb-4" />
                                    <h3 className="text-responsive-xl font-semibold mb-2">
                                        Card {item}
                                    </h3>
                                    <p className="text-responsive-base text-gray-400">
                                        Responsive grid item
                                    </p>
                                </div>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* Animation Showcase */}
            <section className="section-padding bg-white/5">
                <div className="container mx-auto">
                    <AnimatedSection animation="fadeInUp">
                        <h2 className="text-responsive-4xl font-bold mb-12 text-center">
                            Scroll Animations
                        </h2>
                    </AnimatedSection>

                    <div className="space-y-6">
                        <AnimatedSection animation="fadeInUp">
                            <div className="glass-card">
                                <h3 className="text-responsive-xl font-semibold mb-2">
                                    Fade In Up ↑
                                </h3>
                                <p className="text-responsive-base text-gray-400">
                                    Slides up while fading in
                                </p>
                            </div>
                        </AnimatedSection>

                        <AnimatedSection animation="fadeInDown">
                            <div className="glass-card">
                                <h3 className="text-responsive-xl font-semibold mb-2">
                                    Fade In Down ↓
                                </h3>
                                <p className="text-responsive-base text-gray-400">
                                    Slides down while fading in
                                </p>
                            </div>
                        </AnimatedSection>

                        <AnimatedSection animation="fadeInLeft">
                            <div className="glass-card">
                                <h3 className="text-responsive-xl font-semibold mb-2">
                                    Fade In Left ←
                                </h3>
                                <p className="text-responsive-base text-gray-400">
                                    Slides from left while fading in
                                </p>
                            </div>
                        </AnimatedSection>

                        <AnimatedSection animation="fadeInRight">
                            <div className="glass-card">
                                <h3 className="text-responsive-xl font-semibold mb-2">
                                    Fade In Right →
                                </h3>
                                <p className="text-responsive-base text-gray-400">
                                    Slides from right while fading in
                                </p>
                            </div>
                        </AnimatedSection>

                        <AnimatedSection animation="scaleIn">
                            <div className="glass-card">
                                <h3 className="text-responsive-xl font-semibold mb-2">
                                    Scale In ⚡
                                </h3>
                                <p className="text-responsive-base text-gray-400">
                                    Scales up while fading in
                                </p>
                            </div>
                        </AnimatedSection>
                    </div>
                </div>
            </section>

            {/* Performance Showcase */}
            <section className="section-padding">
                <div className="container mx-auto">
                    <AnimatedSection animation="fadeInUp">
                        <h2 className="text-responsive-4xl font-bold mb-12 text-center">
                            Performance Optimizations
                        </h2>
                    </AnimatedSection>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <AnimatedSection animation="scaleIn" delay={0.1}>
                            <div className="glass-card gpu-accelerated">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 mb-4" />
                                <h3 className="text-responsive-xl font-semibold mb-2">
                                    GPU Acceleration
                                </h3>
                                <p className="text-responsive-base text-gray-400">
                                    Hardware-accelerated animations for 60fps performance
                                </p>
                            </div>
                        </AnimatedSection>

                        <AnimatedSection animation="scaleIn" delay={0.2}>
                            <div className="glass-card animate-optimized">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 mb-4" />
                                <h3 className="text-responsive-xl font-semibold mb-2">
                                    Optimized Animations
                                </h3>
                                <p className="text-responsive-base text-gray-400">
                                    No layout thrashing or performance issues
                                </p>
                            </div>
                        </AnimatedSection>

                        <AnimatedSection animation="scaleIn" delay={0.3}>
                            <div className="glass-card will-change-transform">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-red-500 mb-4" />
                                <h3 className="text-responsive-xl font-semibold mb-2">
                                    Will-Change Hints
                                </h3>
                                <p className="text-responsive-base text-gray-400">
                                    Browser optimization hints for smooth animations
                                </p>
                            </div>
                        </AnimatedSection>
                    </div>
                </div>
            </section>

            {/* Touch-Friendly Elements */}
            <section className="section-padding bg-white/5">
                <div className="container mx-auto">
                    <AnimatedSection animation="fadeInUp">
                        <h2 className="text-responsive-4xl font-bold mb-12 text-center">
                            Touch-Friendly Interactions
                        </h2>
                        <p className="text-responsive-lg text-center text-gray-400 mb-12">
                            All interactive elements are minimum 44px for easy tapping
                        </p>
                    </AnimatedSection>

                    <div className="flex flex-wrap gap-4 justify-center">
                        <AnimatedSection animation="scaleIn" delay={0.1}>
                            <button className="tap-target btn-metal">
                                Primary Button
                            </button>
                        </AnimatedSection>

                        <AnimatedSection animation="scaleIn" delay={0.2}>
                            <button className="tap-target px-8 py-4 rounded-full border-2 border-white/20 text-white hover:bg-white/10 transition-all gpu-accelerated">
                                Secondary Button
                            </button>
                        </AnimatedSection>

                        <AnimatedSection animation="scaleIn" delay={0.3}>
                            <button className="tap-target px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-glow-plasma hover:scale-105 transition-transform gpu-accelerated">
                                Gradient Button
                            </button>
                        </AnimatedSection>
                    </div>
                </div>
            </section>

            {/* Smooth Scrolling Info */}
            <section className="section-padding">
                <div className="container mx-auto">
                    <AnimatedSection animation="fadeInUp">
                        <div className="glass-card text-center max-w-3xl mx-auto">
                            <h2 className="text-responsive-3xl font-bold mb-6">
                                ✨ Smooth Scrolling Active
                            </h2>
                            <p className="text-responsive-lg text-gray-400 mb-4">
                                This page uses Lenis for buttery smooth 60fps scrolling
                            </p>
                            <p className="text-responsive-base text-gray-500">
                                Try scrolling up and down to feel the difference!
                            </p>
                        </div>
                    </AnimatedSection>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default ResponsiveTest;
