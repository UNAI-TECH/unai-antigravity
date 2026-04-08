"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const INJECTED_STYLES = `
  .gsap-reveal { visibility: hidden; }

  /* Environment Overlays */
  .film-grain {
      position: absolute; inset: 0; width: 100%; height: 100%;
      pointer-events: none; z-index: 50; opacity: 0.05; mix-blend-mode: overlay;
      background: url('data:image/svg+xml;utf8,<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><filter id="noiseFilter"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(%23noiseFilter)"/></svg>');
  }

  .bg-grid-theme {
      background-size: 60px 60px;
      background-image: 
          linear-gradient(to right, color-mix(in srgb, var(--color-foreground) 5%, transparent) 1px, transparent 1px),
          linear-gradient(to bottom, color-mix(in srgb, var(--color-foreground) 5%, transparent) 1px, transparent 1px);
      mask-image: radial-gradient(ellipse at center, black 0%, transparent 70%);
      -webkit-mask-image: radial-gradient(ellipse at center, black 0%, transparent 70%);
  }

  .text-3d-matte {
      color: var(--color-foreground);
      text-shadow: 
          0 10px 30px color-mix(in srgb, var(--color-foreground) 20%, transparent), 
          0 2px 4px color-mix(in srgb, var(--color-foreground) 10%, transparent);
  }

  /* INSIDE THE CARD: Hardcoded Silver/White for the dark background */
  .text-card-silver-matte {
      background: linear-gradient(180deg, #FFFFFF 0%, #A1A1AA 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      transform: translateZ(0);
      filter: drop-shadow(0px 12px 24px rgba(0,0,0,0.8)) drop-shadow(0px 4px 8px rgba(0,0,0,0.6));
  }

  .premium-depth-card {
      background: linear-gradient(145deg, #162C6D 0%, #0A101D 100%);
      box-shadow: 
          0 40px 100px -20px rgba(0, 0, 0, 0.9),
          0 20px 40px -20px rgba(0, 0, 0, 0.8),
          inset 0 1px 2px rgba(255, 255, 255, 0.2),
          inset 0 -2px 4px rgba(0, 0, 0, 0.8);
      border: 1px solid rgba(255, 255, 255, 0.04);
      position: relative;
  }

  .card-sheen {
      position: absolute; inset: 0; border-radius: inherit; pointer-events: none; z-index: 50;
      background: radial-gradient(800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.06) 0%, transparent 40%);
      mix-blend-mode: screen; transition: opacity 0.3s ease;
  }

  .floating-ui-badge {
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.01) 100%);
      backdrop-filter: blur(24px); 
      -webkit-backdrop-filter: blur(24px);
      box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.1), 0 25px 50px -12px rgba(0, 0, 0, 0.8);
  }

  .ai-core-glow {
      background: radial-gradient(circle at center, rgba(59, 130, 246, 0.3) 0%, transparent 70%);
      filter: blur(40px);
  }
`;

export interface CinematicHeroProps extends React.HTMLAttributes<HTMLDivElement> {
    brandName?: string;
    tagline1?: React.ReactNode;
    tagline2?: React.ReactNode;
    cardHeading?: string;
    cardDescription?: React.ReactNode;
    metricValue?: number;
    metricLabel?: string;
    ctaHeading?: string;
    ctaDescription?: string;
}

export function CinematicHero({
    brandName = "Vidyo AI",
    tagline1 = "Education Never",
    tagline2 = "will be the same.",
    cardHeading = "Education 3.0",
    cardDescription = <><span className="text-white font-semibold">Vidyo AI</span> is redefining how students learn — merging AI-driven content, agentic learning systems, and immersive entertainment.</>,
    metricValue,
    metricLabel,
    ctaHeading,
    ctaDescription,
    className,
    ...props
}: CinematicHeroProps) {

    const containerRef = useRef<HTMLDivElement>(null);
    const mainCardRef = useRef<HTMLDivElement>(null);
    const requestRef = useRef<number>(0);

    // Mouse follow logic for Card Sheen
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (window.scrollY > window.innerHeight * 2) return;
            cancelAnimationFrame(requestRef.current);
            requestRef.current = requestAnimationFrame(() => {
                if (mainCardRef.current) {
                    const rect = mainCardRef.current.getBoundingClientRect();
                    const mouseX = e.clientX - rect.left;
                    const mouseY = e.clientY - rect.top;
                    mainCardRef.current.style.setProperty("--mouse-x", `${mouseX}px`);
                    mainCardRef.current.style.setProperty("--mouse-y", `${mouseY}px`);
                }
            });
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(requestRef.current);
        };
    }, []);

    // Main GSAP animation
    useEffect(() => {
        const isMobile = window.innerWidth < 768;
        const ctx = gsap.context(() => {
            gsap.set(".text-track", { autoAlpha: 0, y: 60, scale: 0.85, filter: "blur(20px)", rotationX: -20 });
            gsap.set(".text-days", { autoAlpha: 0, y: 60, scale: 0.85, filter: "blur(20px)", rotationX: -20 });
            gsap.set(".main-card", { y: window.innerHeight + 200, autoAlpha: 1 });
            gsap.set([".card-left-text", ".card-right-text", ".floating-badge"], { autoAlpha: 0 });

            // Intro Reveal
            const introTl = gsap.timeline({ delay: 0.3 });
            introTl
                .to(".text-track", { duration: 1.8, autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)", rotationX: 0, ease: "expo.out" })
                .to(".text-days", { duration: 1.8, autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)", rotationX: 0, ease: "expo.out" }, "-=1.4");

            // Master Scroll Timeline
            const scrollTl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: isMobile ? "+=1500" : "+=6000",
                    pin: true,
                    scrub: 1,
                    anticipatePin: 1,
                },
            });

            scrollTl
                .to([".hero-text-wrapper", ".bg-grid-theme"], { scale: 1.15, filter: "blur(20px)", opacity: 0.2, ease: "power2.inOut", duration: 2 }, 0)
                .to(".main-card", { y: 0, ease: "power3.inOut", duration: 2 }, 0)
                .to(".main-card", { width: "100%", height: "100%", borderRadius: "0px", ease: "power3.inOut", duration: 1.5 })



                .fromTo(".floating-badge", { y: 80, autoAlpha: 0, scale: 0.7 }, { y: 0, autoAlpha: 1, scale: 1, ease: "back.out(1.5)", duration: 1.5, stagger: 0.2 }, "-=2.0")
                .fromTo(".card-left-text", { x: -60, autoAlpha: 0 }, { x: 0, autoAlpha: 1, ease: "power4.out", duration: 1.5 }, "-=1.5")
                .fromTo(".card-right-text", { x: 60, autoAlpha: 0, scale: 0.8 }, { x: 0, autoAlpha: 1, scale: 1, ease: "expo.out", duration: 1.5 }, "<")



                .to({}, { duration: 3 }) // Hold state
                .to([".floating-badge", ".card-left-text", ".card-right-text", ".main-card"], {
                    y: -window.innerHeight - 300, autoAlpha: 0, ease: "power3.in", duration: 2, stagger: 0.05
                });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div
            ref={containerRef}
            className={cn("relative w-screen h-screen overflow-hidden flex items-center justify-center bg-background text-foreground", className)}
            style={{ perspective: "1500px" }}
            {...props}
        >
            <style dangerouslySetInnerHTML={{ __html: INJECTED_STYLES }} />
            <div className="film-grain" aria-hidden="true" />
            <div className="bg-grid-theme absolute inset-0 z-0 opacity-50" />

            {/* Intro Header */}
            <div className="hero-text-wrapper absolute z-10 flex flex-col items-center justify-center text-center w-screen px-4 will-change-transform transform-style-3d">
                <h1 className="text-track gsap-reveal text-3d-matte text-4xl sm:text-7xl lg:text-[6rem] font-bold tracking-tight mb-2">
                    {tagline1}
                </h1>
                <h1 className="text-days gsap-reveal text-3d-matte text-4xl sm:text-7xl lg:text-[6rem] font-bold tracking-tight">
                    {tagline2}
                </h1>
            </div>

            {/* Expansive Card Overlay */}
            <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none" style={{ perspective: "1500px" }}>
                <div
                    ref={mainCardRef}
                    className="main-card premium-depth-card relative gsap-reveal pointer-events-auto w-[92vw] md:w-[85vw] h-auto min-h-[80vh] md:h-[85vh] rounded-[40px] flex items-center justify-center py-8 md:py-0"
                >
                    <div className="card-sheen" />

                    <div className="relative w-full h-full max-w-7xl mx-auto px-4 lg:px-12 flex flex-col justify-center gap-2 md:gap-0 lg:grid lg:grid-cols-3 items-center z-10 pt-10 md:pt-0">

                        {/* 1. LEFT: EDUCATION 3.0 Heading */}
                        <div className="card-left-text gsap-reveal order-3 lg:order-1 flex flex-col text-center lg:text-left">
                            <h3 className="text-white text-2xl lg:text-5xl font-black tracking-tighter mb-2 lg:mb-4 uppercase">
                                {cardHeading}
                            </h3>
                            <p className="text-blue-100/60 text-base md:text-lg max-w-sm leading-relaxed mb-8">
                                {cardDescription}
                            </p>

                            {(ctaHeading || ctaDescription) && (
                                <div className="space-y-4 pt-6 border-t border-white/10 max-w-sm">
                                    {ctaHeading && (
                                        <h4 className="text-white text-xl font-bold tracking-tight">
                                            {ctaHeading}
                                        </h4>
                                    )}
                                    {ctaDescription && (
                                        <p className="text-blue-100/40 text-sm leading-relaxed">
                                            {ctaDescription}
                                        </p>
                                    )}
                                    <button className="px-8 py-3 bg-white text-slate-950 font-black text-sm uppercase tracking-widest rounded-full hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)] pointer-events-auto">
                                        Get Started
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="ai-core-container order-2 lg:order-2 flex items-center justify-center relative w-full h-auto min-h-[220px] md:min-h-[400px] lg:min-h-[600px] mt-2 md:mt-0">
                            {/* Decorative Badges */}
                            <div className="floating-badge absolute -left-10 md:-left-20 top-20 hidden md:flex items-center gap-3 floating-ui-badge rounded-2xl p-4 z-30">
                                <Sparkles className="text-blue-400 w-5 h-5 shadow-[0_0_15px_rgba(59,130,246,0.6)]" />
                                <span className="text-white font-bold text-xs uppercase tracking-widest leading-none">AI Agentic</span>
                            </div>

                            {metricValue && (
                                <div className="floating-badge absolute -right-10 md:-right-20 bottom-20 hidden md:flex flex-col items-center justify-center floating-ui-badge rounded-[2.5rem] p-6 z-30 min-w-[120px]">
                                    <span className="text-white text-4xl font-black tracking-tighter leading-none mb-1">
                                        {metricValue}
                                    </span>
                                    {metricLabel && (
                                        <span className="text-blue-400/60 font-medium text-[10px] uppercase tracking-[0.3em] leading-none whitespace-nowrap">
                                            {metricLabel}
                                        </span>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* 3. RIGHT: VIDYO AI Branding */}
                        <div className="card-right-text gsap-reveal order-1 lg:order-3 flex justify-center lg:justify-end mb-2 md:mb-0">
                            <h2 className="text-4xl md:text-[6rem] lg:text-[8rem] font-black uppercase text-card-silver-matte leading-none">
                                {brandName}
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
