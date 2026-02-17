import React, { useMemo } from "react";
import { motion } from "framer-motion";

export const IntelligencePulse = () => {
    // Generate random neural paths
    const paths = useMemo(() => [
        "M 50,150 Q 150,50 250,150 T 450,150",
        "M 50,250 Q 200,350 350,250 T 550,250",
        "M 100,100 Q 250,200 400,100",
        "M 150,400 Q 300,300 450,400",
        "M 50,200 C 150,100 350,300 450,200",
    ], []);

    return (
        <div className="relative w-full h-full flex items-center justify-center overflow-visible">
            <svg
                viewBox="0 0 500 500"
                className="w-full h-full max-w-[500px] drop-shadow-[0_0_30px_rgba(59,130,246,0.3)]"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* Glowing Base Paths */}
                {paths.map((path, i) => (
                    <motion.path
                        key={`base-${i}`}
                        d={path}
                        stroke="url(#gradient-blue)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 0.2 }}
                        transition={{ duration: 2, delay: i * 0.2, ease: "easeInOut" }}
                    />
                ))}

                {/* Animated Intelligence Nodes (Data Flow) */}
                {paths.map((path, i) => (
                    <motion.circle
                        key={`node-${i}`}
                        r="4"
                        fill="#60A5FA"
                        filter="url(#glow-node)"
                    >
                        <animateMotion
                            dur={`${3 + i}s`}
                            repeatCount="indefinite"
                            path={path}
                        />
                    </motion.circle>
                ))}

                {/* Core Intelligence Sphere */}
                <g filter="url(#glow-core)">
                    <motion.circle
                        cx="250"
                        cy="250"
                        r="40"
                        fill="url(#core-gradient)"
                        animate={{
                            scale: [1, 1.1, 1],
                            opacity: [0.8, 1, 0.8],
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />

                    {/* Internal Core Details */}
                    <motion.circle
                        cx="250"
                        cy="250"
                        r="20"
                        fill="white"
                        fillOpacity="0.3"
                        animate={{
                            scale: [0.8, 1.2, 0.8],
                            opacity: [0.2, 0.5, 0.2],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                    />
                </g>

                {/* Definitions */}
                <defs>
                    <linearGradient id="gradient-blue" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#3B82F6" stopOpacity="0" />
                        <stop offset="50%" stopColor="#60A5FA" stopOpacity="1" />
                        <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
                    </linearGradient>

                    <radialGradient id="core-gradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                        <stop offset="0%" stopColor="#93C5FD" />
                        <stop offset="70%" stopColor="#3B82F6" />
                        <stop offset="100%" stopColor="#1E40AF" stopOpacity="0.8" />
                    </radialGradient>

                    <filter id="glow-node">
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>

                    <filter id="glow-core">
                        <feGaussianBlur stdDeviation="10" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>
            </svg>

            {/* Decorative Floating Particles */}
            <div className="absolute inset-0 z-0">
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-blue-400 rounded-full blur-[2px] opacity-40"
                        animate={{
                            x: [Math.random() * 400, Math.random() * 400],
                            y: [Math.random() * 400, Math.random() * 400],
                            scale: [0.5, 1, 0.5],
                            opacity: [0.2, 0.5, 0.2],
                        }}
                        transition={{
                            duration: 5 + Math.random() * 5,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                        style={{
                            left: `${10 + Math.random() * 80}%`,
                            top: `${10 + Math.random() * 80}%`,
                        }}
                    />
                ))}
            </div>
        </div>
    );
};
