import { motion } from "framer-motion";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";

const teamMembers: Array<{
    name: string;
    role: string;
    image: string;
    shortNote: string;
    bio: string;
    imageClass?: string;
}> = [
        {
            name: "Anjali Patel",
            role: "HRM",
            image: "/Anjali_M.JPG.jpeg",
            imageClass: "object-cover object-top scale-[1.06]",
            shortNote: "Strategic human resource leader dedicated to building high-performing teams and fostering a culture of innovation and inclusivity.",
            bio: "Anjali brings over a decade of experience in talent acquisition and organizational development. She is passionate about creating environments where engineers and visionaries can thrive together to build the next generation of technology."
        },
        {
            name: "Madhan Kumar",
            role: "Senior Full stack Developer",
            image: "/Madhan_Kumar_P.JPG.jpeg",
            imageClass: "object-cover object-top scale-[1.06]",
            shortNote: "Expert in building scalable, intelligence-first applications with a focus on seamless user experiences and robust backend architecture.",
            bio: "With a background in high-performance computing, Madhan leads our full-stack engineering efforts. He ensures that our sophisticated AI capabilities are delivered through intuitive and lightning-fast interfaces."
        },
        {
            name: "Kamalesh",
            role: "AI Engineer",
            image: "/Kamalesh_S.JPG.jpeg",
            imageClass: "object-cover object-top scale-[1.06]",
            shortNote: "Specializing in frontier AI research and implementing sophisticated neural architectures that drive the core intelligence of our systems.",
            bio: "Kamalesh is at the forefront of our AI research. He translates complex mathematical models into production-ready intelligence, ensuring UNAI TECH remains at the cutting edge of what's possible."
        },
        {
            name: "Muthasir",
            role: "Marketing Head",
            image: "/WhatsApp Image 2026-03-03 at 2.13.21 PM.jpeg",
            imageClass: "object-cover object-top scale-[1.06]",
            shortNote: "Visionary marketing strategist focused on communicating the transformative power of AI and building strong global brand presence.",
            bio: "Muthasir combines data-driven insights with creative storytelling to bridge the gap between complex engineering and market needs. He drives our global growth and brand recognition."
        },
        {
            name: "Iniyan",
            role: "Marketing Head",
            image: "/iniyan.jpeg",
            imageClass: "object-cover object-top scale-[1.05]",
            shortNote: "Dynamic marketing lead expertise in digital growth, community engagement, and strategic positioning of AI-native solutions.",
            bio: "Iniyan focuses on the intersection of community and technology. He ensures that our AI solutions resonate with users and build lasting value through strategic digital positioning."
        }
    ];

export const TeamSection = () => {
    const [selectedMember, setSelectedMember] = useState<typeof teamMembers[0] | null>(null);
    const [activeMobileMember, setActiveMobileMember] = useState<string | null>(null);

    const handleMemberClick = (member: typeof teamMembers[0]) => {
        const isMobile = window.innerWidth < 768;
        if (isMobile) {
            setActiveMobileMember(activeMobileMember === member.name ? null : member.name);
        } else {
            setSelectedMember(member);
        }
    };

    return (
        <section id="meet-team" className="py-20 lg:py-32 bg-white overflow-hidden">
            <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-24">
                {/* Section Header */}
                <div className="text-center mb-16 lg:mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="font-heading text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                            Meet our <span className="text-blue-600">Team</span>
                        </h2>
                        <p className="text-slate-500 text-lg max-w-2xl mx-auto">
                            A diverse team of passionate professionals with unique skills driving innovation and excellence in every project.
                        </p>
                        <div className="h-1 w-20 bg-blue-600 mx-auto mt-8 rounded-full opacity-20"></div>
                    </motion.div>
                </div>

                {/* Team Carousel */}
                <div className="px-2 sm:px-4">
                    <Swiper
                        modules={[Autoplay, Pagination]}
                        spaceBetween={32}
                        slidesPerView={1}
                        loop={true}
                        autoplay={{ delay: 3500, disableOnInteraction: false }}
                        pagination={{ clickable: true, dynamicBullets: true }}
                        breakpoints={{
                            640: { slidesPerView: 2, spaceBetween: 32 },
                            1024: { slidesPerView: 3, spaceBetween: 48 },
                            1280: { slidesPerView: 4, spaceBetween: 48 },
                        }}
                        className="!pb-20"
                    >
                        {teamMembers.map((member, index) => {
                            const isActiveOnMobile = activeMobileMember === member.name;
                            return (
                                <SwiperSlide key={member.name}>
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: index * 0.05 }}
                                        className="group cursor-pointer w-full h-full"
                                        onClick={() => handleMemberClick(member)}
                                    >
                                        <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden mb-6 shadow-lg group-hover:shadow-2xl transition-all duration-500 transform group-hover:-translate-y-2">
                                            <img
                                                src={member.image}
                                                alt={member.name}
                                                className={`w-full h-full object-cover transition-all duration-700 ${isActiveOnMobile ? 'grayscale-0' : 'grayscale group-hover:grayscale-0'} ${member.imageClass || 'object-[50%_20%] scale-[1.15] group-hover:scale-[1.1]'}`}
                                            />
                                            <div className={`absolute inset-0 bg-gradient-to-t from-blue-900/80 via-transparent to-transparent transition-opacity duration-500 ${isActiveOnMobile ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />

                                            {/* Hover/Active Content */}
                                            <div className={`absolute inset-0 flex flex-col justify-end p-6 transition-all duration-500 ${isActiveOnMobile ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100'}`}>
                                                <p className="text-white/90 text-sm font-medium leading-relaxed italic line-clamp-3">
                                                    "{member.shortNote}"
                                                </p>
                                            </div>
                                        </div>

                                        <div className="text-center">
                                            <h3 className={`text-xl font-bold transition-colors ${isActiveOnMobile ? 'text-blue-600' : 'text-slate-900 group-hover:text-blue-600'}`}>
                                                {member.name}
                                            </h3>
                                            <p className="text-blue-600 text-sm font-semibold uppercase tracking-wider mt-1">
                                                {member.role}
                                            </p>
                                        </div>
                                    </motion.div>
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                </div>
            </div>

            {/* Member Detail Modal */}
            <Dialog open={!!selectedMember} onOpenChange={(open) => !open && setSelectedMember(null)}>
                <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden bg-white border-none rounded-[2rem] shadow-2xl">
                    {selectedMember && (
                        <div className="flex flex-col md:flex-row">
                            <div className="md:w-2/5 relative h-64 md:h-auto">
                                <img
                                    src={selectedMember.image}
                                    alt={selectedMember.name}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-blue-600/10 mix-blend-multiply" />
                            </div>
                            <div className="md:w-3/5 p-8 lg:p-10 flex flex-col justify-center">
                                <DialogHeader className="mb-6">
                                    <DialogTitle className="text-3xl font-bold text-slate-900 leading-tight">
                                        {selectedMember.name}
                                    </DialogTitle>
                                    <p className="text-blue-600 font-bold uppercase tracking-widest text-xs mt-2">
                                        {selectedMember.role}
                                    </p>
                                </DialogHeader>

                                <div className="space-y-4">
                                    <div className="bg-blue-50/50 p-4 rounded-2xl border-l-4 border-blue-500 italic text-slate-700">
                                        "{selectedMember.shortNote}"
                                    </div>
                                    <DialogDescription className="text-slate-600 leading-relaxed text-base">
                                        {selectedMember.bio}
                                    </DialogDescription>
                                </div>

                                <button
                                    onClick={() => setSelectedMember(null)}
                                    className="mt-8 px-6 py-3 bg-slate-900 text-white rounded-full font-bold text-sm hover:bg-blue-600 transition-colors self-start"
                                >
                                    Close Details
                                </button>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </section>
    );
};
