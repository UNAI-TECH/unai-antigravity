import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface SEOProps {
    title?: string;
    description?: string;
    keywords?: string;
    ogImage?: string;
    ogType?: "website" | "article";
    canonical?: string;
}

const SEO = ({
    title,
    description,
    keywords,
    ogImage = "https://unaitech.com/og-image.png",
    ogType = "website",
    canonical,
}: SEOProps) => {
    const location = useLocation();
    const siteName = "UNAI TECH";
    const fullTitle = title ? `${title} | ${siteName}` : `${siteName} | AI Engineering & Intelligent Systems`;
    const url = `https://unaitech.com${location.pathname}`;

    useEffect(() => {
        // Update Document Title
        document.title = fullTitle;

        // Update Meta Description
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute("content", description || "UNAI TECH provides elite AI engineering, intelligent software architecture, and autonomous operational systems for global organizations.");
        }

        // Update Meta Keywords
        const metaKeywords = document.querySelector('meta[name="keywords"]');
        if (metaKeywords) {
            metaKeywords.setAttribute("content", keywords || "AI Engineering, Intelligent Systems, Autonomous Operations, Cloud Infrastructure, Cybersecurity, UNAI TECH");
        }

        // Update OG Tags
        const ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle) ogTitle.setAttribute("content", fullTitle);

        const ogDesc = document.querySelector('meta[property="og:description"]');
        if (ogDesc) ogDesc.setAttribute("content", description || "UNAI TECH provides elite AI engineering and intelligent software architecture.");

        const ogUrl = document.querySelector('meta[property="og:url"]');
        if (ogUrl) ogUrl.setAttribute("content", url);

        // Update Canonical
        const canonicalLink = document.querySelector('link[rel="canonical"]');
        if (canonicalLink) {
            canonicalLink.setAttribute("href", canonical || url);
        }
    }, [fullTitle, description, keywords, url, canonical]);

    return null;
};

export default SEO;
