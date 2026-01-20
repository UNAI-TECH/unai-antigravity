import { motion } from "framer-motion";
import { FloatingNavbar } from "@/components/layout/FloatingNavbar";
import { Footer } from "@/components/layout/Footer";
import { GlowOrb } from "@/components/effects/GlowOrb";
import { ParticleField } from "@/components/effects/ParticleField";
import { GlassCard } from "@/components/ui/GlassCard";
import { Linkedin, Twitter, Github } from "lucide-react";
import { useData } from "@/context/DataContext";

const Team = () => {
  const { teamMembers } = useData();

  return (
    <div className="min-h-screen bg-background">
      <FloatingNavbar />

      <main className="pt-0">
        {/* Hero Section */}
        <section className="relative pt-40 pb-20 overflow-hidden">
          <GlowOrb size="xl" color="blue" className="top-0 -right-32" />
          <GlowOrb size="lg" color="purple" className="bottom-0 -left-32" />
          <ParticleField count={15} />

          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl mx-auto"
            >
              <span className="inline-block px-4 py-2 rounded-full glass-metal text-sm text-metal-blue-300 mb-6">
                Human Signal Layer
              </span>
              <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold mb-8">
                <span className="text-foreground">Meet Our</span>
                <br />
                <span className="text-gradient-metal">Team</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                The brilliant minds behind UNAI TECH. A diverse team of innovators,
                engineers, and dreamers building the future together.
              </p>
            </motion.div>
          </div>
        </section>

        <div className="energy-line" />

        {/* Team Grid */}
        <section className="relative py-24 overflow-hidden">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.length === 0 ? (
                <div className="col-span-full flex justify-center py-12">
                  <GlassCard className="max-w-md w-full p-12 text-center relative overflow-hidden group">
                    <GlowOrb size="md" color="blue" className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20 group-hover:opacity-40 transition-opacity duration-1000" />

                    <div className="relative z-10">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                        className="w-16 h-16 mx-auto mb-6 rounded-full border-2 border-dashed border-metal-blue-500/50 flex items-center justify-center"
                      >
                        <div className="w-10 h-10 rounded-full bg-metal-blue-500/20" />
                      </motion.div>

                      <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-metal mb-2">
                        Team Update in Progress
                      </h3>
                      <p className="text-muted-foreground">
                        Updating the Team members message
                      </p>
                    </div>
                  </GlassCard>
                </div>
              ) : (
                teamMembers.map((member, index) => (
                  <motion.div
                    key={member.name}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <GlassCard
                      glowColor={index % 2 === 0 ? "blue" : "purple"}
                      className="h-full text-center group"
                    >
                      {/* Avatar Placeholder */}
                      <div className="relative mx-auto w-24 h-24 mb-6">
                        <div className={`w-full h-full rounded-full ${index % 2 === 0
                          ? "bg-gradient-to-br from-metal-blue-500 to-metal-blue-700"
                          : "bg-gradient-to-br from-metal-purple-500 to-metal-purple-700"
                          } flex items-center justify-center text-3xl font-heading font-bold text-white`}>
                          {member.name.split(" ").map(n => n[0]).join("")}
                        </div>

                        {/* Orbital ring */}
                        <div className="absolute inset-0 -m-2 border-2 border-dashed border-metal-blue-500/30 rounded-full animate-spin-slow" />
                      </div>

                      <h3 className="font-heading text-xl font-semibold text-foreground mb-1">
                        {member.name}
                      </h3>
                      <p className={`text-sm font-medium mb-4 ${index % 2 === 0 ? "text-metal-blue-400" : "text-metal-purple-400"
                        }`}>
                        {member.role}
                      </p>
                      <p className="text-sm text-muted-foreground mb-6">
                        {member.bio}
                      </p>

                      {/* Social Links */}
                      <div className="flex justify-center gap-3">
                        {member.social.linkedin && (
                          <motion.a
                            href={member.social.linkedin}
                            whileHover={{ scale: 1.1, y: -2 }}
                            className="p-2 rounded-lg glass-metal hover:shadow-glow-blue transition-all duration-300"
                          >
                            <Linkedin className="w-4 h-4 text-muted-foreground hover:text-metal-blue-400" />
                          </motion.a>
                        )}
                        {member.social.twitter && (
                          <motion.a
                            href={member.social.twitter}
                            whileHover={{ scale: 1.1, y: -2 }}
                            className="p-2 rounded-lg glass-metal hover:shadow-glow-blue transition-all duration-300"
                          >
                            <Twitter className="w-4 h-4 text-muted-foreground hover:text-metal-blue-400" />
                          </motion.a>
                        )}
                        {member.social.github && (
                          <motion.a
                            href={member.social.github}
                            whileHover={{ scale: 1.1, y: -2 }}
                            className="p-2 rounded-lg glass-metal hover:shadow-glow-blue transition-all duration-300"
                          >
                            <Github className="w-4 h-4 text-muted-foreground hover:text-metal-blue-400" />
                          </motion.a>
                        )}
                      </div>
                    </GlassCard>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </section>

        <div className="energy-line" />

        {/* Join Section */}
        <section className="relative pt-24 pb-12 overflow-hidden">
          <GlowOrb size="xl" color="plasma" className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">
                <span className="text-foreground">Join Our </span>
                <span className="text-gradient-metal">Team</span>
              </h2>
              <p className="text-xl text-muted-foreground mb-10">
                We're always looking for exceptional talent to join our mission.
                If you're ready to build the future, we want to hear from you.
              </p>
              <motion.a
                href="/careers"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center px-10 py-4 rounded-xl bg-gradient-metal text-white font-semibold shadow-glow-blue hover:shadow-glow-plasma transition-all duration-500"
              >
                View Open Positions
              </motion.a>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Team;
