import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface ResponsiveImageProps {
    src: string;
    alt: string;
    className?: string;
    loading?: 'lazy' | 'eager';
    objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
    aspectRatio?: string;
    priority?: boolean;
}

/**
 * Responsive image component with lazy loading and skeleton state
 * Optimized for performance with progressive loading
 */
export const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
    src,
    alt,
    className = '',
    loading = 'lazy',
    objectFit = 'cover',
    aspectRatio = '16/9',
    priority = false,
}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);

    return (
        <div
            className={`relative overflow-hidden ${className}`}
            style={{ aspectRatio }}
        >
            {/* Skeleton loader */}
            {!isLoaded && !hasError && (
                <div className="absolute inset-0 skeleton" />
            )}

            {/* Error state */}
            {hasError && (
                <div className="absolute inset-0 flex items-center justify-center bg-muted">
                    <span className="text-muted-foreground text-sm">Failed to load image</span>
                </div>
            )}

            {/* Actual image */}
            <motion.img
                src={src}
                alt={alt}
                loading={priority ? 'eager' : loading}
                onLoad={() => setIsLoaded(true)}
                onError={() => setHasError(true)}
                initial={{ opacity: 0 }}
                animate={{ opacity: isLoaded ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className={`w-full h-full gpu-accelerated`}
                style={{
                    objectFit,
                    display: hasError ? 'none' : 'block',
                }}
            />
        </div>
    );
};
