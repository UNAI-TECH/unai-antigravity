import { useEffect } from 'react';

/**
 * DevTools Protection Component
 * Detects DevTools opening and disables right-click and keyboard shortcuts
 * 
 * NOTE: This can be bypassed by determined users but adds a layer of protection
 */
export const DevToolsProtection = () => {
    useEffect(() => {
        // Disable right-click context menu
        const handleContextMenu = (e: MouseEvent) => {
            e.preventDefault();
            return false;
        };

        // Disable keyboard shortcuts for DevTools
        const handleKeyDown = (e: KeyboardEvent) => {
            // F12
            if (e.key === 'F12') {
                e.preventDefault();
                return false;
            }

            // Ctrl+Shift+I (DevTools)
            if (e.ctrlKey && e.shiftKey && e.key === 'I') {
                e.preventDefault();
                return false;
            }

            // Ctrl+Shift+J (Console)
            if (e.ctrlKey && e.shiftKey && e.key === 'J') {
                e.preventDefault();
                return false;
            }

            // Ctrl+Shift+C (Inspect Element)
            if (e.ctrlKey && e.shiftKey && e.key === 'C') {
                e.preventDefault();
                return false;
            }

            // Ctrl+U (View Source)
            if (e.ctrlKey && e.key === 'u') {
                e.preventDefault();
                return false;
            }

            // Cmd+Option+I (Mac DevTools)
            if (e.metaKey && e.altKey && e.key === 'i') {
                e.preventDefault();
                return false;
            }

            // Cmd+Option+J (Mac Console)
            if (e.metaKey && e.altKey && e.key === 'j') {
                e.preventDefault();
                return false;
            }

            // Cmd+Option+C (Mac Inspect)
            if (e.metaKey && e.altKey && e.key === 'c') {
                e.preventDefault();
                return false;
            }
        };

        // DevTools detection (checks window size changes)
        let devtoolsOpen = false;
        const threshold = 160;

        const detectDevTools = () => {
            const widthThreshold = window.outerWidth - window.innerWidth > threshold;
            const heightThreshold = window.outerHeight - window.innerHeight > threshold;

            if (widthThreshold || heightThreshold) {
                if (!devtoolsOpen) {
                    devtoolsOpen = true;
                    console.clear();
                    console.log('%c⚠️ Developer Tools Detected', 'color: #ff0000; font-size: 20px; font-weight: bold;');
                    console.log('%cUnauthorized access to source code is prohibited.', 'color: #ff6600; font-size: 14px;');
                    console.log('%c© 2024 UNAI TECH. All rights reserved.', 'color: #999; font-size: 12px;');
                }
            } else {
                devtoolsOpen = false;
            }
        };

        // Check for DevTools every 1 second
        const devToolsInterval = setInterval(detectDevTools, 1000);

        // Add event listeners
        document.addEventListener('contextmenu', handleContextMenu);
        document.addEventListener('keydown', handleKeyDown);

        // Cleanup
        return () => {
            document.removeEventListener('contextmenu', handleContextMenu);
            document.removeEventListener('keydown', handleKeyDown);
            clearInterval(devToolsInterval);
        };
    }, []);

    return null; // This component doesn't render anything
};
