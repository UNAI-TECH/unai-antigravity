import { motion } from "framer-motion";
import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";

const teamMembers = [
    {
        name: "Anjali Patel",
        role: "HRM",
        image: "/placeholder.svg",
        shortNote: "Strategic human resource leader dedicated to building high-performing teams and fostering a culture of innovation and inclusivity.",
        bio: "Anjali brings over a decade of experience in talent acquisition and organizational development. She is passionate about creating environments where engineers and visionaries can thrive together to build the next generation of technology."
    },
    {
        name: "Madhan Kumar",
        role: "Senior Full stack Developer",
        image: "/placeholder.svg",
        shortNote: "Expert in building scalable, intelligence-first applications with a focus on seamless user experiences and robust backend architecture.",
        bio: "With a background in high-performance computing, Madhan leads our full-stack engineering efforts. He ensures that our sophisticated AI capabilities are delivered through intuitive and lightning-fast interfaces."
    },
    {
        name: "Kamalesh",
        role: "AI Engineer",
        image: "/placeholder.svg",
        shortNote: "Specializing in frontier AI research and implementing sophisticated neural architectures that drive the core intelligence of our systems.",
        bio: "Kamalesh is at the forefront of our AI research. He translates complex mathematical models into production-ready intelligence, ensuring UNAI TECH remains at the cutting edge of what's possible."
    },
    {
        name: "Muthasir",
        role: "Marketing Head",
        image: "/placeholder.svg",
        shortNote: "Visionary marketing strategist focused on communicating the transformative power of AI and building strong global brand presence.",
        bio: "Muthasir combines data-driven insights with creative storytelling to bridge the gap between complex engineering and market needs. He drives our global growth and brand recognition."
    },
    {
        name: "Iniyan",
        role: "Marketing Head",
        image: "/placeholder.svg",
        shortNote: "Dynamic marketing lead expertise in digital growth, community engagement, and strategic positioning of AI-native solutions.",
        bio: "Iniyan focuses on the intersection of community and technology. He ensures that our AI solutions resonate with users and build lasting value through strategic digital positioning."
    }
];

export const TeamSection = () => {
    const [selectedMember, setSelectedMember] = useState<typeof teamMembers[0] | null>(null);

    return (
        <section className="py-20 lg:py-32 bg-white overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6">
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

                {/* Team Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 lg:gap-10">
                    {teamMembers.map((member, index) => (
                        <motion.div
                            key={member.name}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group cursor-pointer"
                            onClick={() => setSelectedMember(member)}
                        >
                            <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden mb-6 shadow-lg group-hover:shadow-2xl transition-all duration-500 transform group-hover:-translate-y-2">
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                {/* Hover Content */}
                                <div className="absolute inset-0 flex flex-col justify-end p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                                    <p className="text-white/90 text-sm font-medium leading-relaxed italic line-clamp-3">
                                        "{member.shortNote}"
                                    </p>
                                </div>
                            </div>

                            <div className="text-center">
                                <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                                    {member.name}
                                </h3>
                                <p className="text-blue-600 text-sm font-semibold uppercase tracking-wider mt-1">
                                    {member.role}
                                </p>
                            </div>
                        </motion.div>
                    ))}
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
