import { motion } from "framer-motion";
import { FloatingNavbar } from "@/components/layout/FloatingNavbar";
import { Footer } from "@/components/layout/Footer";
import { GlowOrb } from "@/components/effects/GlowOrb";
import { ParticleField } from "@/components/effects/ParticleField";
import { GlassCard } from "@/components/ui/GlassCard";
import { Linkedin, Twitter, Github } from "lucide-react";

const teamMembers = [
  {
    name: "Alexandra Chen",
    role: "CEO & Co-Founder",
    bio: "Visionary leader with 15+ years in tech. Former VP at leading AI company.",
    social: { linkedin: "#", twitter: "#" },
  },
  {
    name: "Marcus Rivera",
    role: "CTO & Co-Founder",
    bio: "Engineering mastermind. Built systems used by millions worldwide.",
    social: { linkedin: "#", twitter: "#", github: "#" },
  },
  {
    name: "Sarah Kim",
    role: "Chief Design Officer",
    bio: "Award-winning designer focused on human-centered experiences.",
    social: { linkedin: "#", twitter: "#" },
  },
  {
    name: "James Thompson",
    role: "VP of Engineering",
    bio: "Leads our global engineering team. Previously at FAANG companies.",
    social: { linkedin: "#", github: "#" },
  },
  {
    name: "Elena Rodriguez",
    role: "Head of AI Research",
    bio: "PhD in Machine Learning. Published researcher with 50+ papers.",
    social: { linkedin: "#", twitter: "#" },
  },
  {
    name: "David Park",
    role: "VP of Product",
    bio: "Product strategist who shipped products used by Fortune 500 companies.",
    social: { linkedin: "#", twitter: "#" },
  },
  {
    name: "Priya Sharma",
    role: "Head of Cloud Infrastructure",
    bio: "Cloud architecture expert. Certified across all major platforms.",
    social: { linkedin: "#", github: "#" },
  },
  {
    name: "Michael Foster",
    role: "VP of Security",
    bio: "Cybersecurity veteran. Former government security advisor.",
    social: { linkedin: "#", twitter: "#" },
  },
];

const Team = () => {
  return (
    <div className="min-h-screen bg-background">
      <FloatingNavbar />
      
      <main className="pt-32">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
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
              {teamMembers.map((member, index) => (
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
                      <div className={`w-full h-full rounded-full ${
                        index % 2 === 0 
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
                    <p className={`text-sm font-medium mb-4 ${
                      index % 2 === 0 ? "text-metal-blue-400" : "text-metal-purple-400"
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
              ))}
            </div>
          </div>
        </section>
        
        <div className="energy-line" />
        
        {/* Join Section */}
        <section className="relative py-24 overflow-hidden">
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
                href="/contact"
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
