import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "./button";
import { ReactNode } from "react";

interface PremiumCTAProps {
    title: string | ReactNode;
    description: string;
    primaryButton?: {
        label: string;
        onClick?: () => void;
        href?: string;
    };
    secondaryButton?: {
        label: string;
        onClick?: () => void;
        href?: string;
    };
    illustration?: ReactNode;
    className?: string;
}

export const PremiumCTA = ({
    title,
    description,
    primaryButton,
    secondaryButton,
    illustration,
    className = "",
}: PremiumCTAProps) => {
    return (
        <div className={`relative w-full max-w-[1400px] mx-auto p-4 ${className}`}>
            {/* The Main Shape Wrapper */}
            <div className="relative w-full overflow-hidden rounded-[3rem] bg-[#2563EB]">

                {/* SVG Background Layer for Desktop (Notched Shape) */}
                <div className="absolute inset-0 hidden md:block z-0">
                    <svg width="100%" height="100%" viewBox="0 0 1400 550" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 40C0 17.9086 17.9086 0 40 0H1360C1382.09 0 1400 17.9086 1400 40V300C1400 322.091 1382.09 340 1360 340H1210C1187.91 340 1170 357.909 1170 380V510C1170 532.091 1152.09 550 1130 550H40C17.9086 550 0 532.091 0 510V40Z" fill="#2563EB" />
                        <path opacity="0.1" d="M1400 0L1000 550H1400V0Z" fill="white" />
                        <circle cx="1300" cy="50" r="150" fill="white" fillOpacity="0.05" />
                    </svg>
                </div>

                {/* Content Container - Flex Col on Mobile, Row on Desktop */}
                <div className="relative z-10 flex flex-col md:flex-row min-h-[400px] md:min-h-[550px]">

                    {/* Left Side: Text and Buttons */}
                    <div className="flex-1 flex flex-col justify-center px-6 sm:px-12 md:px-24 py-16 md:py-24 text-center md:text-left items-center md:items-start">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="max-w-2xl w-full"
                        >
                            <h2 className="font-heading text-2xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
                                {title}
                            </h2>
                            <p className="text-sm sm:text-base md:text-xl lg:text-2xl text-blue-100/90 mb-10 leading-relaxed font-light mx-auto md:mx-0 max-w-[90%] md:max-w-none text-balance">
                                {description}
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center md:justify-start">
                                {primaryButton && (
                                    <Button
                                        onClick={primaryButton.onClick}
                                        className="h-14 sm:h-16 px-8 sm:px-10 rounded-2xl bg-white text-blue-600 hover:bg-white/95 shadow-xl shadow-blue-900/20 font-bold text-base sm:text-lg transition-all active:scale-95 flex items-center justify-center gap-2 w-full sm:w-auto overflow-hidden text-ellipsis whitespace-normal leading-tight h-auto min-h-[56px] py-4"
                                    >
                                        <span className="flex-1">{primaryButton.label}</span>
                                        <ArrowRight className="w-5 h-5 flex-shrink-0" />
                                    </Button>
                                )}
                                {secondaryButton && (
                                    <Button
                                        onClick={secondaryButton.onClick}
                                        variant="outline"
                                        className="h-14 sm:h-16 px-8 sm:px-10 rounded-2xl border-white/20 bg-white/10 backdrop-blur-md text-white hover:bg-white/20 font-bold text-base sm:text-lg transition-all active:scale-95 border-none w-full sm:w-auto py-4 h-auto min-h-[56px]"
                                    >
                                        {secondaryButton.label}
                                    </Button>
                                )}
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Side / Bottom: Illustration and "Step" Notch */}
                    <div className="relative w-full md:w-[35%] flex flex-col items-center md:items-end justify-end">

                        {/* The White Notch / Step (Mobile & Desktop) */}
                        <div className="absolute bottom-0 right-0 w-full md:w-[90%] h-32 md:h-48 bg-[#F8FAFC] md:bg-white rounded-tl-[3rem] z-0 hidden sm:block" />
                        <div className="absolute bottom-0 right-0 w-full h-24 bg-[#F8FAFC] z-0 sm:hidden" />

                        {/* Illustration Container */}
                        <div className="relative z-10 mb-6 md:mb-16 md:mr-16 px-6">
                            <div className="scale-[0.8] sm:scale-100 md:scale-[1.3] origin-bottom sm:origin-bottom-right">
                                {illustration ? (
                                    illustration
                                ) : (
                                    <div className="relative">
                                        <img
                                            src="/freepik__minimal-flat-vector-of-whiteandblack-megaphone-cha__8710.png"
                                            alt="Megaphone Illustration"
                                            className="w-40 h-40 sm:w-56 md:w-72 object-contain drop-shadow-2xl"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
