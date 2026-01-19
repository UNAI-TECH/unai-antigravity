// Remove Spline logo watermark
const removeSplineLogo = () => {
    const splineViewers = document.querySelectorAll('spline-viewer');

    splineViewers.forEach((viewer) => {
        // Try to access shadow root
        if (viewer.shadowRoot) {
            const logo = viewer.shadowRoot.querySelector('#logo');
            if (logo) {
                logo.remove();
            }
        }

        // Also try direct querySelector
        const logo = viewer.querySelector('#logo');
        if (logo) {
            logo.remove();
        }
    });
};

// Run on load and periodically to catch dynamically loaded content
if (typeof window !== 'undefined') {
    window.addEventListener('load', () => {
        removeSplineLogo();

        // Run again after a delay to catch late-loading content
        setTimeout(removeSplineLogo, 1000);
        setTimeout(removeSplineLogo, 2000);
        setTimeout(removeSplineLogo, 3000);
    });

    // Also run on DOM changes
    const observer = new MutationObserver(() => {
        removeSplineLogo();
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}

export { };
