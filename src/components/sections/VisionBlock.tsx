import { motion } from "framer-motion";
import { GlowOrb } from "@/components/effects/GlowOrb";

export const VisionBlock = () => {
    return (
        <section className="relative mx-4 my-8 py-10 lg:py-16 overflow-hidden rounded-[2rem] md:rounded-[3rem] bg-white border border-blue-100 shadow-[0_20px_50px_rgba(73,84,250,0.05)]">
            {/* Soft Light Background Effects */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-50/50 to-transparent" />
                <div className="absolute -top-[20%] -right-[10%] w-[400px] h-[400px] bg-blue-100/30 rounded-full blur-[100px]" />
                <div className="absolute -bottom-[20%] -left-[10%] w-[400px] h-[400px] bg-purple-100/20 rounded-full blur-[100px]" />
            </div>

            <div className="container mx-auto px-6 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="max-w-2xl mx-auto"
                >
                    <span className="inline-block px-3 py-1.5 rounded-full border border-blue-200 bg-blue-50 text-blue-600 text-xs md:text-sm font-bold mb-6 uppercase tracking-wider">
                        The Vision
                    </span>

                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-6 leading-tight tracking-tight font-heading">
                        Building the <span className="text-blue-500">Intelligent Layer</span> of Tomorrow's Economy
                    </h2>

                    <div className="space-y-5 text-base md:text-lg text-slate-600 font-normal leading-relaxed">
                        <p>
                            The future doesn't need more software. It needs systems that <span className="text-blue-600 font-semibold underline decoration-blue-200 decoration-2 underline-offset-4">understand, anticipate, and evolve.</span>
                        </p>
                        <p>
                            UNAI TECH is engineering the foundational intelligence layer where AI becomes infrastructure — <span className="text-slate-900 font-medium">invisible, reliable, and essential.</span> Systems that make complexity manageable and innovation inevitable.
                        </p>

                        <div className="pt-4 border-t border-slate-100">
                            <p className="text-blue-600 font-handwriting text-xl md:text-2xl opacity-90">
                                "Architecting for what intelligence will enable tomorrow."
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Subtle Visual Accent */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/3 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent" />
        </section>
    );
};
