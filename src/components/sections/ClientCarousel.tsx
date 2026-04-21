import { motion } from "framer-motion";

const clients = [
    "/371063523_122115951206008830_4198149107452173976_n.jpg.jpeg",
    "/460932001_507081895296250_8501373947895446188_n.jpg.jpeg",
    "/logo-CBEH-HVV.png",
    "/1.svg",
];

// Duplicate the array to create a seamless looping effect
const repeatedClients = [...clients, ...clients, ...clients, ...clients];

export const ClientCarousel = () => {
    return (
        <section className="py-12 sm:py-16 bg-[#f8faff] border-y border-slate-100 overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-12 mb-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="inline-flex items-center gap-3">
                        <span className="block h-px w-6 sm:w-8 bg-blue-400" />
                        <span className="text-[10px] sm:text-xs font-bold tracking-widest uppercase text-blue-600">Our Clients</span>
                        <span className="block h-px w-6 sm:w-8 bg-blue-400" />
                    </div>
                </motion.div>
            </div>

            <div className="relative w-full flex overflow-hidden group">
                <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#f8faff] to-transparent z-10 hidden sm:block"></div>
                <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#f8faff] to-transparent z-10 hidden sm:block"></div>

                <motion.div
                    className="flex items-center gap-8 sm:gap-16 pr-8 sm:pr-16"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{
                        ease: "linear",
                        duration: 20,
                        repeat: Infinity,
                    }}
                >
                    {repeatedClients.map((client, index) => (
                        <div key={index} className="flex-shrink-0 w-32 h-20 sm:w-40 sm:h-24 md:w-48 md:h-28 flex items-center justify-center bg-white rounded-xl sm:rounded-2xl shadow-sm border border-slate-100 p-4 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                            <img
                                src={client}
                                alt={`Client ${index}`}
                                className="max-w-full max-h-full object-contain transition-all duration-500"
                            />
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};
