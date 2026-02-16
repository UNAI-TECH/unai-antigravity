import { motion } from "framer-motion";
import { GlowOrb } from "@/components/effects/GlowOrb";

export const VisionBlock = () => {
    return (
        <section className="relative mx-4 my-4 py-16 lg:py-32 overflow-hidden rounded-[2.5rem] md:rounded-[4rem] shadow-2xl border border-white/10">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/Gradient Wallpaper.jpg"
                    alt="Background"
                    className="w-full h-full object-cover"
                />
                {/* Dark Overlay for Readability */}
                <div className="absolute inset-0 bg-slate-950/60" />
            </div>

            {/* Background Effects */}
            <div className="absolute inset-0 opacity-30 z-0">
                <GlowOrb size="xl" color="blue" className="-top-1/2 -left-1/4" />
                <GlowOrb size="xl" color="plasma" className="-bottom-1/2 -right-1/4" />
            </div>

            <div className="container mx-auto px-6 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="max-w-4xl mx-auto will-change-transform"
                >
                    <span className="inline-block px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-sm font-semibold mb-8 uppercase tracking-widest">
                        The Vision
                    </span>

                    <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-10 leading-[1.1] tracking-tight font-heading">
                        Building the <span className="text-blue-500">Intelligent Layer</span> of Tomorrow's Economy
                    </h2>

                    <div className="space-y-8 text-xl md:text-2xl text-slate-400 font-light leading-relaxed">
                        <p>
                            The future doesn't need more software. It needs systems that <span className="text-white font-medium">understand, anticipate, and evolve.</span>
                        </p>
                        <p>
                            UNAI TECH is engineering the foundational intelligence layer where AI becomes infrastructure — <span className="text-white font-medium">invisible, reliable, and essential.</span> Where businesses don't just use AI, they operate within intelligent ecosystems that make complexity manageable and innovation inevitable.
                        </p>
                        <p className="text-blue-400 italic">
                            "We're not building for what technology can do today. We're architecting for what intelligence will enable tomorrow."
                        </p>
                    </div>
                </motion.div>
            </div>

            {/* Visual Accent */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
        </section>
    );
};
