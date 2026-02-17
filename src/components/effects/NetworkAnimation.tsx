import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface Particle {
    x: number;
    y: number;
    baseX: number;
    baseY: number;
    radius: number;
    phase: number;
    // Interactivity properties
    distX: number;
    distY: number;
    vx: number;
    vy: number;
}

interface Ripple {
    x: number;
    y: number;
    radius: number;
    active: boolean;
    startTime: number;
}

export const NetworkAnimation: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const animationRef = useRef<number>();
    const mouseRef = useRef({ x: -1000, y: -1000, active: false });
    const rippleRef = useRef<Ripple>({ x: 0, y: 0, radius: 0, active: false, startTime: 0 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const resize = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
            initParticles();
        };

        const initParticles = () => {
            particlesRef.current = [];
            const spacing = 60;
            const bottomHeight = canvas.height * 0.35;

            for (let x = -spacing; x <= canvas.width + spacing; x += spacing) {
                for (let y = bottomHeight; y <= canvas.height + spacing; y += spacing) {
                    const px = x + Math.random() * 30 - 15;
                    const py = y + Math.random() * 30 - 15;
                    particlesRef.current.push({
                        x: px,
                        y: py,
                        baseX: px,
                        baseY: py,
                        radius: Math.random() * 1.5 + 1,
                        phase: Math.random() * Math.PI * 2,
                        distX: 0,
                        distY: 0,
                        vx: 0,
                        vy: 0,
                    });

                    if (y + spacing / 2 <= canvas.height) {
                        const sx = x + spacing / 2 + Math.random() * 30 - 15;
                        const sy = y + spacing / 2 + Math.random() * 30 - 15;
                        particlesRef.current.push({
                            x: sx,
                            y: sy,
                            baseX: sx,
                            baseY: sy,
                            radius: Math.random() * 1.5 + 1,
                            phase: Math.random() * Math.PI * 2,
                            distX: 0,
                            distY: 0,
                            vx: 0,
                            vy: 0,
                        });
                    }
                }
            }
        };

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouseRef.current.x = e.clientX - rect.left;
            mouseRef.current.y = e.clientY - rect.top;
            mouseRef.current.active = true;
        };

        const handleMouseDown = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            rippleRef.current = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
                radius: 0,
                active: true,
                startTime: Date.now()
            };
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (e.touches.length > 0) {
                const rect = canvas.getBoundingClientRect();
                mouseRef.current.x = e.touches[0].clientX - rect.left;
                mouseRef.current.y = e.touches[0].clientY - rect.top;
                mouseRef.current.active = true;
            }
        };

        const handleTouchStart = (e: TouchEvent) => {
            if (e.touches.length > 0) {
                const rect = canvas.getBoundingClientRect();
                rippleRef.current = {
                    x: e.touches[0].clientX - rect.left,
                    y: e.touches[0].clientY - rect.top,
                    radius: 0,
                    active: true,
                    startTime: Date.now()
                };
            }
        };

        const handleMouseLeave = () => {
            mouseRef.current.active = false;
        };

        canvas.addEventListener("mousemove", handleMouseMove);
        canvas.addEventListener("mousedown", handleMouseDown);
        canvas.addEventListener("mouseleave", handleMouseLeave);
        canvas.addEventListener("touchstart", handleTouchStart);
        canvas.addEventListener("touchmove", handleTouchMove);

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const time = Date.now() * 0.001;
            const particles = particlesRef.current;
            const mouse = mouseRef.current;
            const ripple = rippleRef.current;

            // Update Ripple
            if (ripple.active) {
                const elapsed = Date.now() - ripple.startTime;
                const duration = 900;
                if (elapsed > duration) {
                    ripple.active = false;
                } else {
                    ripple.radius = (elapsed / duration) * 350;
                }
            }

            // Animation Params
            const mouseRadius = 150 * (window.innerWidth < 768 ? 0.8 : 1);
            const mouseStrength = 5;
            const rippleRadius = ripple.radius;
            const rippleStrength = 12;
            const rippleThickness = 60;
            const friction = 0.88;
            const spring = 0.08;

            particles.forEach((p) => {
                // 1. Initial Floating Motion
                const floatX = Math.sin(time + p.phase) * 3;
                const floatY = Math.cos(time + p.phase) * 3;

                // 2. Interaction Calculation
                let targetDistX = 0;
                let targetDistY = 0;

                // Mouse influence
                if (mouse.active) {
                    const dx = p.baseX - mouse.x;
                    const dy = p.baseY - mouse.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < mouseRadius) {
                        const force = (1 - distance / mouseRadius) * mouseStrength;
                        const angle = Math.atan2(dy, dx);
                        targetDistX += Math.cos(angle) * force;
                        targetDistY += Math.sin(angle) * force;
                    }
                }

                // Ripple influence
                if (ripple.active) {
                    const rdx = p.baseX - ripple.x;
                    const rdy = p.baseY - ripple.y;
                    const rDistance = Math.sqrt(rdx * rdx + rdy * rdy);
                    const distFromRipple = Math.abs(rDistance - rippleRadius);

                    if (distFromRipple < rippleThickness) {
                        const rippleForce = (1 - distFromRipple / rippleThickness) * rippleStrength * (1 - rippleRadius / 350);
                        const rAngle = Math.atan2(rdy, rdx);
                        targetDistX += Math.cos(rAngle) * rippleForce;
                        targetDistY += Math.sin(rAngle) * rippleForce;
                    }
                }

                // 3. Physics Integration
                p.vx += (targetDistX - p.distX) * spring;
                p.vy += (targetDistY - p.distY) * spring;
                p.vx *= friction;
                p.vy *= friction;
                p.distX += p.vx;
                p.distY += p.vy;

                // 4. Update Final Position
                p.x = p.baseX + floatX + p.distX;
                p.y = p.baseY + floatY + p.distY;

                // 5. Render
                // Glow
                const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 6);
                gradient.addColorStop(0, "rgba(10, 65, 116, 0.7)");
                gradient.addColorStop(1, "rgba(10, 65, 116, 0)");

                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius * 3, 0, Math.PI * 2);
                ctx.fill();

                // Solid dot
                ctx.fillStyle = "rgba(10, 65, 116, 1)";
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fill();
            });

            // Draw Connections
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const pi = particles[i];
                    const pj = particles[j];
                    const dx = pi.x - pj.x;
                    const dy = pi.y - pj.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 150) {
                        const opacity = 1 - distance / 150;
                        ctx.strokeStyle = `rgba(10, 65, 116, ${opacity * 0.4})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(pi.x, pi.y);
                        ctx.lineTo(pj.x, pj.y);
                        ctx.stroke();
                    }
                }
            }

            animationRef.current = requestAnimationFrame(draw);
        };

        resize();
        window.addEventListener("resize", resize);
        draw();

        return () => {
            window.removeEventListener("resize", resize);
            canvas.removeEventListener("mousemove", handleMouseMove);
            canvas.removeEventListener("mousedown", handleMouseDown);
            canvas.removeEventListener("mouseleave", handleMouseLeave);
            canvas.removeEventListener("touchstart", handleTouchStart);
            canvas.removeEventListener("touchmove", handleTouchMove);
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
        };
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="absolute bottom-0 left-0 right-0 h-96 cursor-pointer will-change-transform"
            style={{
                background:
                    "linear-gradient(to top, rgba(224,242,254,1) 0%, rgba(224,242,254,0.8) 30%, transparent 100%)",
            }}
        >
            <canvas ref={canvasRef} className="w-full h-full block" />
        </motion.div>
    );
};
