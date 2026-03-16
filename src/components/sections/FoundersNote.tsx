import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { useState, useEffect, useCallback } from "react";
import { MagicBento, ParticleCard } from "@/components/effects/MagicBento";

const founders = [
    {
        name: "Vetha Gokul",
        role: "MANAGING DIRECTOR",
        image: "/Vetha_Gokul_SR.jpg.jpeg",
        title: "Leading with <span class='text-blue-600'>Vision</span> and Purpose.",
        content: [
            "At UNAI TECH, our mission is to empower teams with tools that don't just process data, but provide meaningful insights. We are committed to excellence in every line of code and every strategic decision.",
            "True innovation happens when technology disappears and only the solution remains.",
            "We are building a culture of continuous learning and growth. Together, we are shaping a future where AI is accessible, ethical, and transformative for everyone."
        ],
        signature: "Vetha Gokul"
    },
    {
        name: "Nehemiah Nesanathan",
        role: "CEO AND DIRECTOR",
        image: "/Nehemiah_Nesanathan_M.jpg",
        title: "Architecting the <span class='text-blue-600'>Next Era</span> of Intelligence.",
        content: [
            "UNAI TECH emerged from a conviction that we're living through a fundamental shift in how technology works. For decades, software has been deterministic. Intelligence changes everything.",
            "Most organizations use AI like a calculator. We're building systems that think.",
            "We founded UNAI TECH to help organizations think differently. To build from an intelligence-first foundation. We're not building for today's problems. <span class='font-medium text-slate-900'>We're architecting for tomorrow's possibilities.</span>"
        ],
        signature: "Nehemiah Nesanathan"
    }
];

export const FoundersNote = () => {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
    const [selectedIndex, setSelectedIndex] = useState(0);

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
        }, 8000); // Increased duration for readability

        return () => clearInterval(autoplay);
    }, [emblaApi, onSelect]);

    return (
        <section className="relative py-12 sm:py-16 lg:py-24 bg-gray-50/50 overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 relative z-10">
                <div className="text-center mb-10 sm:mb-20">
                    <h2 className="font-heading text-3xl md:text-4xl font-bold text-slate-900">
                        Founder's Note
                    </h2>
                    <div className="h-1 w-20 bg-blue-600 mx-auto mt-4 rounded-full opacity-20"></div>
                </div>

                <div className="max-w-6xl mx-auto relative group">
                    <div className="overflow-hidden" ref={emblaRef}>
                        <div className="flex">
                            {founders.map((founder, index) => (
                                <div key={index} className="flex-[0_0_100%] min-w-0 px-4">
                                    <MagicBento>
                                        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
                                            {/* Left Column: Profile Card */}
                                            <motion.div
                                                initial={{ opacity: 0, x: -30 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.8 }}
                                                className="w-full lg:w-1/3"
                                            >
                                                <div className="bg-white rounded-[2.5rem] p-4 border border-slate-100 shadow-sm overflow-hidden group">
                                                    <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden bg-slate-100">
                                                        <img
                                                            src={founder.image}
                                                            alt={founder.name}
                                                            className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700"
                                                        />
                                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-40" />
                                                    </div>

                                                    <div className="mt-6 px-2 pb-2">
                                                        <h3 className="text-2xl font-bold text-slate-900 leading-tight">{founder.name}</h3>
                                                        <div className="flex items-center gap-2 mt-2">
                                                            <div className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
                                                            <span className="text-blue-600 font-bold uppercase tracking-widest text-[10px]">
                                                                {founder.role}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>

                                            {/* Right Column: Content */}
                                            <motion.div
                                                initial={{ opacity: 0, x: 30 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.8 }}
                                                className="w-full lg:w-2/3"
                                            >
                                                <ParticleCard
                                                    enableTilt={true}
                                                    enableBorderGlow={true}
                                                    glowColor="96, 165, 250"
                                                    className="relative bg-white/80 backdrop-blur-sm rounded-[2.5rem] p-8 sm:p-12 border border-slate-100 shadow-sm h-full"
                                                >
                                                    <Quote className="absolute top-8 right-8 w-12 h-12 text-blue-600/10" />

                                                    <div className="relative z-10">
                                                        <span className="text-blue-600 font-bold uppercase tracking-[0.2em] text-[10px] block mb-4">A Message from our Leaders</span>

                                                        <h4 
                                                            className="font-heading text-2xl sm:text-3xl font-bold text-slate-900 mb-8 leading-tight"
                                                            dangerouslySetInnerHTML={{ __html: founder.title }}
                                                        />

                                                        <div className="space-y-6 text-slate-600 text-lg sm:text-xl leading-relaxed">
                                                            {founder.content.map((paragraph, pIndex) => (
                                                                <p key={pIndex} dangerouslySetInnerHTML={{ __html: paragraph }} />
                                                            ))}
                                                        </div>
                                                    </div>
                                                </ParticleCard>
                                            </motion.div>
                                        </div>
                                    </MagicBento>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Dots */}
                    <div className="flex justify-center gap-2 mt-12">
                        {founders.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => emblaApi?.scrollTo(index)}
                                className={`h-2 rounded-full transition-all duration-300 ${selectedIndex === index ? "w-8 bg-blue-600" : "w-2 bg-slate-300"}`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
