import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { lenisScrollTo } from '@/hooks/useSmoothScroll';

export const ScrollToTop = () => {
    const { pathname, hash } = useLocation();
    const lastPathname = useRef(pathname);

    useEffect(() => {
        if (hash) {
            const targetId = hash.replace('#', '');
            const element = document.getElementById(targetId);
            if (element) {
                // Delay slightly to ensure DOM is ready and any page layout shifts are settled
                setTimeout(() => {
                    lenisScrollTo(element, { duration: 1.2, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
                }, 100);
                return;
            }
        }

        // Only scroll to top if the pathname actually changed
        if (lastPathname.current !== pathname) {
            lenisScrollTo(0, { immediate: true });
            window.scrollTo(0, 0);
            lastPathname.current = pathname;
        }
    }, [pathname, hash]);

    return null;
};
