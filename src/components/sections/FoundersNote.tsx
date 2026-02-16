import { motion } from "framer-motion";
import { Quote } from "lucide-react";

export const FoundersNote = () => {
    return (
        <section className="relative py-16 lg:py-24 bg-gray-50/50 overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">

                {/* Section Heading - Moved Outside */}
                <div className="text-center mb-10">
                    <h2 className="font-heading text-3xl md:text-4xl font-bold text-slate-900">
                        Founder's Note
                    </h2>
                    <div className="h-1 w-20 bg-blue-600 mx-auto mt-4 rounded-full opacity-20"></div>
                </div>

                <div className="max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="bg-white rounded-[2rem] shadow-xl border border-slate-100 overflow-hidden flex flex-col md:flex-row"
                    >
                        {/* Image Column - Reduced height/width ratio */}
                        <div className="md:w-1/3 relative min-h-[300px] md:min-h-full">
                            <img
                                src="/Nehemiah_Nesanathan_M.jpg"
                                alt="Nehemiah Nesanathan, Founder"
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-blue-900/10 mix-blend-multiply" />
                        </div>

                        {/* Content Column */}
                        <div className="md:w-2/3 p-8 md:p-10 flex flex-col justify-center relative">
                            {/* Decorative Background Blur - Scaled down */}
                            <div className="absolute top-0 right-0 w-48 h-48 bg-blue-50/50 rounded-full blur-3xl pointer-events-none" />

                            <div className="relative z-10">

                                <h3 className="font-heading text-2xl md:text-3xl font-bold text-slate-900 leading-tight mb-6">
                                    Architecting the <span className="text-blue-600">Next Era</span> of Intelligence.
                                </h3>

                                <div className="space-y-5 text-slate-600 leading-relaxed text-sm md:text-base">
                                    <p>
                                        UNAI TECH emerged from a conviction that we're living through a fundamental shift in how technology works. For decades, software has been deterministic. Intelligence changes everything.
                                    </p>

                                    <div className="relative pl-5 border-l-4 border-blue-500 my-6 py-1 bg-slate-50/50 rounded-r-lg">
                                        <p className="text-lg md:text-xl font-serif italic text-slate-800 leading-relaxed py-2 pr-4">
                                            "Most organizations use AI like a calculator. We're building systems that think."
                                        </p>
                                    </div>

                                    <p>
                                        We founded UNAI TECH to help organizations think differently. To build from an intelligence-first foundation. We're not building for today's problems. <span className="font-medium text-slate-900">We're architecting for tomorrow's possibilities.</span>
                                    </p>
                                </div>

                                <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
                                    <div className="flex flex-col">
                                        <span className="font-bold text-slate-900 text-base">Nehemiah Nesanathan</span>
                                        <span className="text-slate-500 text-xs uppercase tracking-wider font-medium">Founder & CEO</span>
                                    </div>
                                    <div className="font-handwriting text-3xl text-blue-600 transform -rotate-2">
                                        Nehemiah Nesanathan
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
