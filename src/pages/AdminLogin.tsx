import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useData } from "@/context/DataContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GlassCard } from "@/components/ui/GlassCard";
import { GlowOrb } from "@/components/effects/GlowOrb";
import { ParticleField } from "@/components/effects/ParticleField";
import { Lock, ArrowRight, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

const AdminLogin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useData();
    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (username === "Unaitech2026" && password === "Unaitech@26") {
            login();
            toast.success("Access Granted", {
                description: "Welcome back to the command center.",
            });
            navigate("/admin/dashboard");
        } else {
            toast.error("Access Denied", {
                description: "Invalid credentials provided.",
            });
        }
    };

    return (
        <div className="min-h-screen grid md:grid-cols-2 bg-background overflow-hidden font-sans">
            {/* visuals side */}
            <div className="relative hidden md:flex flex-col items-center justify-center p-12 overflow-hidden bg-[#0A0F1C]">
                <ParticleField count={40} />
                <GlowOrb size="xl" color="blue" className="top-0 left-0 opacity-40" />
                <GlowOrb size="xl" color="purple" className="bottom-0 right-0 opacity-40" />

                <div className="relative z-10 max-w-lg text-center space-y-8">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 1 }}
                        className="w-32 h-32 mx-auto rounded-full bg-gradient-to-tr from-metal-blue-500/20 to-metal-purple-500/20 border border-white/10 flex items-center justify-center backdrop-blur-xl shadow-glow-blue"
                    >
                        <ShieldCheck className="w-16 h-16 text-metal-blue-400" />
                    </motion.div>

                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        <h1 className="text-4xl md:text-6xl font-heading font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-metal-blue-100 to-metal-blue-200 mb-4">
                            UNAI TECH
                        </h1>
                        <p className="text-xl text-muted-foreground">
                            Administrative Command Center
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="p-6 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-sm"
                    >
                        <p className="text-sm text-metal-blue-300 italic">
                            "Control, Monitor, and Evolve."
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* login side */}
            <div className="flex items-center justify-center p-6 relative">
                <GlowOrb size="lg" color="plasma" className="top-10 right-10 md:hidden" />
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="w-full max-w-md space-y-8"
                >
                    <div className="text-center md:text-left mb-8">
                        <h2 className="text-3xl font-heading font-bold mb-2">Authenticated Access</h2>
                        <p className="text-muted-foreground">Please identify yourself to proceed.</p>
                    </div>

                    <GlassCard className="p-8 border-metal-blue-500/20">
                        <form onSubmit={handleLogin} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-metal-blue-300 ml-1">IDENTITY</label>
                                <div className="relative group">
                                    <Input
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        placeholder="User ID"
                                        className="pl-4 bg-black/20 border-white/10 focus:border-metal-blue-500 transition-colors h-12"
                                    />
                                    <div className="absolute inset-0 rounded-md ring-1 ring-inset ring-transparent group-hover:ring-white/10 pointer-events-none" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-metal-blue-300 ml-1">SECRET</label>
                                <div className="relative group">
                                    <Input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Password"
                                        className="pl-4 bg-black/20 border-white/10 focus:border-metal-blue-500 transition-colors h-12"
                                    />
                                    <div className="absolute inset-0 rounded-md ring-1 ring-inset ring-transparent group-hover:ring-white/10 pointer-events-none" />
                                </div>
                            </div>

                            <Button type="submit" className="w-full h-12 text-lg font-semibold bg-gradient-metal hover:shadow-glow-blue transition-all duration-300 group">
                                <Lock className="w-5 h-5 mr-2 group-hover:hidden" />
                                <span className="group-hover:hidden">Authenticate</span>
                                <span className="hidden group-hover:flex items-center">
                                    Access Dashboard <ArrowRight className="ml-2 w-5 h-5" />
                                </span>
                            </Button>
                        </form>
                    </GlassCard>

                    <p className="text-center text-xs text-muted-foreground opacity-50">
                        Secure Connection • Encrypted End-to-End
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default AdminLogin;
