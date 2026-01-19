import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface AnimatedSectionProps {
    children: ReactNode;
    className?: string;
    animation?: 'fadeInUp' | 'fadeInDown' | 'fadeInLeft' | 'fadeInRight' | 'scaleIn';
    delay?: number;
    threshold?: number;
}

/**
 * Reusable animated section component with scroll-triggered animations
 * Optimized for performance with IntersectionObserver
 */
export const AnimatedSection: React.FC<AnimatedSectionProps> = ({
    children,
    className = '',
    animation = 'fadeInUp',
    delay = 0,
    threshold = 0.1,
}) => {
    const { ref, isVisible } = useScrollAnimation({ threshold, triggerOnce: true });

    const animationVariants = {
        fadeInUp: {
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 },
        },
        fadeInDown: {
            hidden: { opacity: 0, y: -30 },
            visible: { opacity: 1, y: 0 },
        },
        fadeInLeft: {
            hidden: { opacity: 0, x: -30 },
            visible: { opacity: 1, x: 0 },
        },
        fadeInRight: {
            hidden: { opacity: 0, x: 30 },
            visible: { opacity: 1, x: 0 },
        },
        scaleIn: {
            hidden: { opacity: 0, scale: 0.9 },
            visible: { opacity: 1, scale: 1 },
        },
    };

    const selectedVariant = animationVariants[animation];

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isVisible ? 'visible' : 'hidden'}
            variants={selectedVariant}
            transition={{
                duration: 0.6,
                delay,
                ease: [0.25, 0.1, 0.25, 1], // Custom easing for smooth animation
            }}
            className={`animate-optimized ${className}`}
        >
            {children}
        </motion.div>
    );
};
