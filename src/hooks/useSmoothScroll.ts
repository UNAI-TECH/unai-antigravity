import { useEffect } from 'react';
import Lenis from 'lenis';

/**
 * Custom hook for smooth scrolling using Lenis
 * Provides buttery smooth scroll experience with optimized performance
 */
export const useSmoothScroll = () => {
    useEffect(() => {
        // Initialize Lenis with optimized settings
        const lenis = new Lenis({
            duration: 1.2, // Scroll duration
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing function
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
            infinite: false,
        });

        // Request animation frame loop for smooth scrolling
        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        // Cleanup on unmount
        return () => {
            lenis.destroy();
        };
    }, []);
};
