import { useEffect } from 'react';
import Lenis from 'lenis';

let lenisInstance: Lenis | null = null;

export const lenisScrollTo = (target: number | HTMLElement | string, options?: any) => {
    if (lenisInstance) {
        lenisInstance.scrollTo(target, options);
    } else {
        // Fallback if Lenis isn't active
        if (typeof target === 'number') {
            window.scrollTo({ top: target, behavior: options?.immediate ? 'instant' : 'smooth' });
        } else {
            // Basic fallback for elements (omitted for brevity as we mostly need top 0)
            window.scrollTo(0, 0);
        }
    }
};

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

        lenisInstance = lenis;

        // Request animation frame loop for smooth scrolling
        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        // Cleanup on unmount
        return () => {
            lenis.destroy();
            lenisInstance = null;
        };
    }, []);
};
