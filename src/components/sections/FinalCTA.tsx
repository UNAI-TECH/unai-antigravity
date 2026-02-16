import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export const FinalCTA = () => {
    return (
        <section className="relative py-32 overflow-hidden">
            <div className="container mx-auto px-6 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="max-w-3xl mx-auto"
                >
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-8 tracking-tight font-heading">
                        Ready to Evolve Beyond <br />
                        <span className="text-gradient-metal">Traditional IT?</span>
                    </h2>

                    <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
                        Whether you're launching an AI-first venture, transforming legacy operations, or building the next generation of intelligent products — UNAI TECH brings the architecture, expertise, and vision to make it reality.
                    </p>

                    <Link to="/contact">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="group relative px-10 py-5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full font-bold text-lg shadow-2xl shadow-blue-500/20 flex items-center justify-center gap-2 mx-auto"
                        >
                            Begin Your Intelligence Journey
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </motion.button>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};
