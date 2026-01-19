import { useEffect, useRef } from "react";

interface Star {
    x: number;
    y: number;
    size: number;
    speed: number; // Unified speed for directional movement
    opacity: number;
    twinkleSpeed: number;
    twinklePhase: number;
}

export const StarField = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const starsRef = useRef<Star[]>([]);
    const animationFrameRef = useRef<number>();

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        // Unified direction angle (diagonal movement like orbital motion)
        const directionAngle = Math.PI / 4; // 45 degrees (top-left to bottom-right)
        const baseSpeedX = Math.cos(directionAngle);
        const baseSpeedY = Math.sin(directionAngle);

        // Create stars
        const createStars = (count: number) => {
            const stars: Star[] = [];
            for (let i = 0; i < count; i++) {
                stars.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: Math.random() * 2 + 0.5, // 0.5 to 2.5px
                    speed: Math.random() * 0.8 + 0.4, // 0.4 to 1.2 (varying speeds for depth)
                    opacity: Math.random() * 0.5 + 0.3, // 0.3 to 0.8
                    twinkleSpeed: Math.random() * 0.02 + 0.01,
                    twinklePhase: Math.random() * Math.PI * 2,
                });
            }
            return stars;
        };

        starsRef.current = createStars(500);

        // Animation loop
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            starsRef.current.forEach((star) => {
                // Update position - all stars move in the same direction
                star.x += baseSpeedX * star.speed;
                star.y += baseSpeedY * star.speed;

                // Wrap around screen (orbital loop)
                if (star.x < -10) star.x = canvas.width + 10;
                if (star.x > canvas.width + 10) star.x = -10;
                if (star.y < -10) star.y = canvas.height + 10;
                if (star.y > canvas.height + 10) star.y = -10;

                // Twinkling effect
                star.twinklePhase += star.twinkleSpeed;
                const twinkle = Math.sin(star.twinklePhase) * 0.3 + 0.7; // 0.4 to 1.0

                // Draw star
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity * twinkle})`;
                ctx.fill();

                // Add glow for larger stars
                if (star.size > 1.5) {
                    ctx.beginPath();
                    ctx.arc(star.x, star.y, star.size * 2, 0, Math.PI * 2);
                    const gradient = ctx.createRadialGradient(
                        star.x,
                        star.y,
                        0,
                        star.x,
                        star.y,
                        star.size * 2
                    );
                    gradient.addColorStop(0, `rgba(255, 255, 255, ${star.opacity * twinkle * 0.3})`);
                    gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
                    ctx.fillStyle = gradient;
                    ctx.fill();
                }
            });

            animationFrameRef.current = requestAnimationFrame(animate);
        };

        animate();

        // Cleanup
        return () => {
            window.removeEventListener("resize", resizeCanvas);
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-0"
            style={{ background: "transparent" }}
        />
    );
};

export default StarField;
