import React, { useMemo } from "react";
import { motion } from "framer-motion";

export const CognitiveForge = () => {
    // Generate complex neural paths
    const paths = useMemo(() => [
        "M 250,250 m -100,0 a 100,100 0 1,0 200,0 a 100,100 0 1,0 -200,0",
        "M 250,250 m -150,0 a 150,150 0 1,0 300,0 a 150,150 0 1,0 -300,0",
        "M 250,250 m -200,0 a 200,200 0 1,0 400,0 a 200,200 0 1,0 -400,0",
        "M 250,50 Q 450,250 250,450 Q 50,250 250,50",
        "M 50,250 Q 250,50 450,250 Q 250,450 50,250",
    ], []);

    return (
        <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] flex items-center justify-center overflow-visible">
            {/* Ambient Background Glow - Increased intensity */}
            <div className="absolute inset-0 bg-radial-gradient from-blue-500/20 via-transparent to-transparent blur-[120px] pointer-events-none" />

            <svg
                viewBox="0 0 500 500"
                className="w-full h-full max-w-[700px] drop-shadow-[0_0_60px_rgba(59,130,246,0.4)] scale-110 transition-transform duration-1000"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <linearGradient id="neural-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.1" />
                        <stop offset="50%" stopColor="#60A5FA" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#2563EB" stopOpacity="0.1" />
                    </linearGradient>

                    <radialGradient id="core-pulse" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#93C5FD" />
                        <stop offset="40%" stopColor="#3B82F6" />
                        <stop offset="100%" stopColor="transparent" />
                    </radialGradient>

                    <filter id="forge-glow">
                        <feGaussianBlur stdDeviation="8" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                </defs>

                {/* Shimmering Neural Connections */}
                <g filter="url(#forge-glow)">
                    {paths.map((path, i) => (
                        <React.Fragment key={i}>
                            <motion.path
                                d={path}
                                stroke="url(#neural-grad)"
                                strokeWidth="2"
                                strokeDasharray="5, 15"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: 0.4 }}
                                transition={{ duration: 3, delay: i * 0.4, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
                            />

                            {/* Moving Data Packets - Slightly larger */}
                            <motion.circle r="4" fill="#93C5FD">
                                <animateMotion
                                    dur={`${3 + i}s`}
                                    repeatCount="indefinite"
                                    path={path}
                                />
                            </motion.circle>
                        </React.Fragment>
                    ))}
                </g>

                {/* The Cognitive Core - Larger radius */}
                <g filter="url(#forge-glow)">
                    <motion.circle
                        cx="250"
                        cy="250"
                        r="75"
                        fill="url(#core-pulse)"
                        animate={{
                            scale: [1, 1.1, 1],
                            opacity: [0.7, 1, 0.7],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />

                    {/* Inner Dimensional Rings */}
                    <motion.circle
                        cx="250"
                        cy="250"
                        r="40"
                        stroke="#DBEAFE"
                        strokeWidth="1.5"
                        strokeDasharray="6 6"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    />
                </g>

                {/* Unique Forge Elements: Geometric Convergence */}
                {[...Array(8)].map((_, i) => (
                    <motion.rect
                        key={i}
                        x="245"
                        y="50"
                        width="10"
                        height="40"
                        rx="5"
                        fill="#3B82F6"
                        fillOpacity="0.4"
                        initial={{ rotate: i * 45, originX: "250px", originY: "250px" }}
                        animate={{
                            scaleY: [1, 1.5, 1],
                            opacity: [0.3, 0.7, 0.3],
                        }}
                        transition={{
                            duration: 2,
                            delay: i * 0.2,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                ))}
            </svg>

            {/* Floating Information Particles - More particles and wider spread */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1.5 h-1.5 bg-blue-400 rounded-full blur-[2px]"
                        animate={{
                            y: [0, -150, 0],
                            x: [0, i % 2 === 0 ? 80 : -80, 0],
                            opacity: [0, 0.7, 0],
                            scale: [0.5, 1.5, 0.5],
                        }}
                        transition={{
                            duration: 4 + Math.random() * 6,
                            repeat: Infinity,
                            ease: "linear",
                            delay: Math.random() * 5,
                        }}
                        style={{
                            left: `${15 + Math.random() * 70}%`,
                            top: `${40 + Math.random() * 45}%`,
                        }}
                    />
                ))}
            </div>
        </div>
    );
};
