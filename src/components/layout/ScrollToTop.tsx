import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { lenisScrollTo } from '@/hooks/useSmoothScroll';

export const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        // Force scroll to top using Lenis if active
        lenisScrollTo(0, { immediate: true });

        // Native fallback
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
};
