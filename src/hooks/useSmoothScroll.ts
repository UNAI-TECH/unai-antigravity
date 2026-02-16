import { useEffect } from 'react';
import Lenis from 'lenis';

let lenisInstance: Lenis | null = null;

export const lenisScrollTo = (target: number | HTMLElement | string, options?: any) => {
    if (window.lenis) {
        window.lenis.scrollTo(target, options);
    } else {
        // Fallback if Lenis isn't active
        if (typeof target === 'number') {
            window.scrollTo({ top: target, behavior: options?.immediate ? 'instant' : 'smooth' });
        } else {
            window.scrollTo(0, 0);
        }
    }
};

/**
 * Custom hook for smooth scrolling logic
 * Relying on the global LenisSmoothScroll wrapper for initialization
 */
export const useSmoothScroll = () => {
    // Initialization is now handled by LenisSmoothScroll.tsx component wrapper in App.tsx
};
