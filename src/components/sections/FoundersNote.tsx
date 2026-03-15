import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { useState, useEffect, useCallback } from "react";

const founders = [
    {
        name: "Nehemiah Nesanathan",
        role: "CEO AND DIRECTOR",
        image: "/Nehemiah_Nesanathan_M.jpg",
        title: "Architecting the <span class='text-blue-600'>Next Era</span> of Intelligence.",
        content: [
            "UNAI TECH emerged from a conviction that we're living through a fundamental shift in how technology works. For decades, software has been deterministic. Intelligence changes everything.",
            "\"Most organizations use AI like a calculator. We're building systems that think.\"",
            "We founded UNAI TECH to help organizations think differently. To build from an intelligence-first foundation. We're not building for today's problems. <span class='font-medium text-slate-900'>We're architecting for tomorrow's possibilities.</span>"
        ],
        signature: "Nehemiah Nesanathan"
    },
    {
        name: "Vetha Gokul",
        role: "MANAGING DIRECTOR",
        image: "/Vetha_Gokul_SR.jpg.jpeg",
        title: "Leading with <span class='text-blue-600'>Vision</span> and Purpose.",
        content: [
            "At UNAI TECH, our mission is to empower teams with tools that don't just process data, but provide meaningful insights. We are committed to excellence in every line of code and every strategic decision.",
            "\"True innovation happens when technology disappears and only the solution remains.\"",
            "We are building a culture of continuous learning and growth. Together, we are shaping a future where AI is accessible, ethical, and transformative for everyone."
        ],
        signature: "Vetha Gokul"
    }
];

export const FoundersNote = () => {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
    const [selectedIndex, setSelectedIndex] = useState(0);

    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        emblaApi.on("select", onSelect);

        const autoplay = setInterval(() => {
            emblaApi.scrollNext();
        }, 5000);

        return () => clearInterval(autoplay);
    }, [emblaApi, onSelect]);

    return (
        <section className="relative py-12 sm:py-16 lg:py-24 bg-gray-50/50 overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 relative z-10">
                <div className="text-center mb-10">
                    <h2 className="font-heading text-3xl md:text-4xl font-bold text-slate-900">
                        Founder's Note
                    </h2>
                    <div className="h-1 w-20 bg-blue-600 mx-auto mt-4 rounded-full opacity-20"></div>
                </div>

                <div className="max-w-5xl mx-auto relative group">
                    <div className="overflow-hidden" ref={emblaRef}>
                        <div className="flex">
                            {founders.map((founder, index) => (
                                <div key={index} className="flex-[0_0_100%] min-w-0 px-4">
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.6 }}
                                        className="bg-white rounded-[2rem] shadow-xl border border-slate-100 overflow-hidden flex flex-col md:flex-row h-full"
                                    >
                                        <div className="md:w-1/3 relative bg-slate-100 overflow-hidden min-h-[180px] md:min-h-0">
                                            <img
                                                src={founder.image}
                                                alt={founder.name}
                                                className="w-full h-full object-cover object-[center_20%]"
                                            />
                                            <div className="absolute inset-0 bg-blue-900/10 mix-blend-multiply" />
                                        </div>

                                        <div className="md:w-2/3 p-5 md:p-10 flex flex-col justify-center relative">
                                            <div className="absolute top-0 right-0 w-48 h-48 bg-blue-50/50 rounded-full blur-3xl pointer-events-none" />
                                            <div className="relative z-10">
                                                <h3
                                                    className="font-heading text-xl md:text-3xl font-bold text-slate-900 leading-tight mb-3 md:mb-6"
                                                    dangerouslySetInnerHTML={{ __html: founder.title }}
                                                />

                                                <div className="space-y-3 md:space-y-5 text-slate-600 leading-relaxed text-sm md:text-base">
                                                    {founder.content.map((paragraph, pIndex) => (
                                                        paragraph.startsWith('"') ? (
                                                            <div key={pIndex} className="relative pl-4 border-l-4 border-blue-500 my-3 md:my-6 py-0.5 bg-slate-50/50 rounded-r-lg">
                                                                <p className="text-sm md:text-xl font-serif italic text-slate-800 leading-relaxed py-1 md:py-2 pr-3 md:pr-4">
                                                                    {paragraph}
                                                                </p>
                                                            </div>
                                                        ) : (
                                                            <p key={pIndex} dangerouslySetInnerHTML={{ __html: paragraph }} />
                                                        )
                                                    ))}
                                                </div>

                                                <div className="mt-4 md:mt-8 pt-4 md:pt-6 border-t border-slate-100 flex items-center justify-between">
                                                    <div className="flex flex-col">
                                                        <span className="font-bold text-slate-900 text-base">{founder.name}</span>
                                                        <span className="text-slate-500 text-xs uppercase tracking-wider font-medium">{founder.role}</span>
                                                    </div>
                                                    <div className="font-handwriting text-3xl text-blue-600 transform -rotate-2">
                                                        {founder.signature}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>
                            ))}
                        </div>
                    </div>



                    {/* Dots */}
                    <div className="flex justify-center gap-2 mt-8">
                        {founders.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => emblaApi?.scrollTo(index)}
                                className={`h-2 rounded-full transition-all duration-300 ${selectedIndex === index ? "w-8 bg-blue-600" : "w-2 bg-slate-300"
                                    }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
