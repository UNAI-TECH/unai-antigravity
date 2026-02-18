import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

// Extend Window interface to include lenis
declare global {
    interface Window {
        lenis?: Lenis;
    }
}

interface LenisSmoothScrollProps {
    children: React.ReactNode;
}

export const LenisSmoothScroll = ({ children }: LenisSmoothScrollProps) => {
    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        // Initialize Lenis
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1.1,
            touchMultiplier: 2,
            infinite: false,
        });

        lenisRef.current = lenis;

        // Expose Lenis instance globally for programmatic access
        window.lenis = lenis;

        // Animation frame loop
        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        // Cleanup
        return () => {
            lenis.destroy();
            window.lenis = undefined;
        };
    }, []);

    return <>{children}</>;
};

// Export Lenis instance for programmatic scrolling
export const useLenis = () => {
    return useRef<Lenis | null>(null);
};
