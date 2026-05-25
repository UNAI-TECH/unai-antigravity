import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { MagicBento, ParticleCard } from "@/components/effects/MagicBento";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const advisors = [
    {
        name: "Vedagiri Venkatraman",
        role: "ADVISORY DIRECTOR",
        image: "/vedagiri.png",
        title: "\"Quality is the Silent Engine of <span class='text-blue-600'>Enterprise Trust</span>.\"",
        label: "A Message from the Advisor",
        content: [
            "In over two decades of navigating the complexities of global BFSI ecosystems, I've observed that the most resilient systems aren't just built on code—they're built on architectural integrity and rigorous validation.",
            "At UNAI TECH, my focus is to bridge the gap between frontier intelligence and production-grade reliability. We are not just deploying innovation; we are engineering certainty through established best practices and a lean, agile mindset.",
        ],
    },
    {
        name: "S Prasanna",
        role: "ADVISORY DIRECTOR",
        image: "/candidate.jpeg",
        title: "\"Ambition Without <span class='text-blue-600'>Execution</span> is Just a Dream.\"",
        label: "A Message from the Advisor",
        content: [
            "The most transformative ideas I've encountered were never born in boardrooms — they were forged through relentless curiosity and the courage to act before the path was clear. Technology, at its core, is a mirror of human will.",
            "At UNAI TECH, I see an organization that doesn't wait for the future — it builds it. My role is to ensure that every strategic pivot we make is grounded in real-world wisdom, powered by bold thinking, and held accountable by measurable outcomes.",
            "Innovation is not a department. <span class='font-medium text-slate-900'>It is a discipline — and at UNAI TECH, it is our identity.</span>",
        ],
    },
];

export const AdvisorNote = () => {
    return (
        <section className="relative py-12 sm:py-16 lg:py-24 bg-gray-50/30 overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 relative z-10">
                {/* Section Heading */}
                <div className="text-center mb-12 sm:mb-20">
                    <h2 className="font-heading text-3xl md:text-4xl font-bold text-slate-900">
                        Advisor's Note
                    </h2>
                    <div className="h-1 w-20 bg-blue-600 mx-auto mt-4 rounded-full opacity-20"></div>
                </div>

                <div className="max-w-6xl mx-auto">
                    <Swiper
                        modules={[Autoplay, Pagination, EffectFade]}
                        effect="fade"
                        fadeEffect={{ crossFade: true }}
                        spaceBetween={30}
                        slidesPerView={1}
                        loop={true}
                        autoplay={{ delay: 5500, disableOnInteraction: false }}
                        pagination={{ clickable: true, dynamicBullets: true }}
                        className="advisors-swiper !pb-16"
                    >
                        {advisors.map((advisor) => (
                            <SwiperSlide key={advisor.name}>
                                <MagicBento>
                                    <div className="flex flex-col lg:flex-row items-stretch gap-12 lg:gap-16 pb-4">
                                        {/* Left Column: Profile Card */}
                                        <motion.div
                                            initial={{ opacity: 0, x: -30 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.8, ease: "easeOut" }}
                                            className="w-full lg:w-1/3"
                                        >
                                            <div className="bg-white rounded-[2.5rem] p-4 shadow-premium-deep border border-slate-100 overflow-hidden group h-full">
                                                <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden bg-slate-100">
                                                    <img
                                                        src={advisor.image}
                                                        alt={advisor.name}
                                                        className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700"
                                                        onError={(e) => {
                                                            (e.target as HTMLImageElement).src = "/placeholder.svg";
                                                        }}
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-40" />
                                                </div>

                                                <div className="mt-6 px-2 pb-2">
                                                    <h3 className="text-2xl font-bold text-slate-900 leading-tight">
                                                        {advisor.name}
                                                    </h3>
                                                    <div className="flex items-center gap-2 mt-2">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
                                                        <span className="text-blue-600 font-bold uppercase tracking-widest text-[10px]">
                                                            {advisor.role}
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
                                            transition={{ duration: 0.8, ease: "easeOut" }}
                                            className="w-full lg:w-2/3"
                                        >
                                            <ParticleCard
                                                enableTilt={true}
                                                enableBorderGlow={true}
                                                glowColor="96, 165, 250"
                                                className="relative bg-white/80 backdrop-blur-sm rounded-[2.5rem] p-8 sm:p-12 shadow-premium-deep border border-slate-100 h-full"
                                            >
                                                <Quote className="absolute top-8 right-8 w-12 h-12 text-blue-600/10" />

                                                <div className="relative z-10">
                                                    <span className="text-blue-600 font-bold uppercase tracking-[0.2em] text-[10px] block mb-4">
                                                        {advisor.label}
                                                    </span>

                                                    <h4
                                                        className="font-heading text-2xl sm:text-3xl font-bold text-slate-900 mb-8 leading-tight"
                                                        dangerouslySetInnerHTML={{ __html: advisor.title }}
                                                    />

                                                    <div className="space-y-6 text-slate-600 text-lg sm:text-xl leading-relaxed">
                                                        {advisor.content.map((paragraph, pIndex) => (
                                                            <p key={pIndex} dangerouslySetInnerHTML={{ __html: paragraph }} />
                                                        ))}
                                                    </div>

                                                    <div className="mt-10 pt-8 border-t border-slate-100/50 flex items-center justify-between">
                                                        <div>
                                                            <p className="text-slate-900 font-bold text-lg">{advisor.name}</p>
                                                            <p className="text-blue-600 text-xs font-bold uppercase tracking-widest">{advisor.role}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </ParticleCard>
                                        </motion.div>
                                    </div>
                                </MagicBento>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>

            <style>{`
                .advisors-swiper .swiper-pagination-bullet {
                    background: #3b82f6;
                    opacity: 0.2;
                }
                .advisors-swiper .swiper-pagination-bullet-active {
                    opacity: 1;
                    width: 1.5rem;
                    border-radius: 1rem;
                }
            `}</style>
        </section>
    );
};
