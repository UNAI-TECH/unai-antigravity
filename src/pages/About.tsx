import { motion } from "framer-motion";
import { FloatingNavbar } from "@/components/layout/FloatingNavbar";
import { Footer } from "@/components/layout/Footer";
import { GlowOrb } from "@/components/effects/GlowOrb";
import { ParticleField } from "@/components/effects/ParticleField";

const timelineItems = [
  {
    year: "2018",
    title: "The Genesis",
    description: "UNAI TECH was founded with a singular vision: to create technology that transcends conventional boundaries. Starting with just 5 engineers, we set out to revolutionize the industry.",
  },
  {
    year: "2019",
    title: "First Major Breakthrough",
    description: "Launched our flagship AI platform, securing partnerships with Fortune 500 companies. Expanded team to 25 members.",
  },
  {
    year: "2020",
    title: "Global Expansion",
    description: "Opened offices in London, Singapore, and Toronto. Team grew to 80+ engineers, designers, and strategists.",
  },
  {
    year: "2021",
    title: "Innovation Award",
    description: "Recognized as one of the top 10 innovative tech companies globally. Launched our cloud infrastructure division.",
  },
  {
    year: "2022",
    title: "Series B Funding",
    description: "Secured $50M in Series B funding. Expanded into cybersecurity and automation solutions.",
  },
  {
    year: "2024",
    title: "The Future Unfolds",
    description: "150+ team members across 12 countries. Pioneering next-gen AI and quantum computing solutions.",
  },
];

const values = [
  {
    title: "Innovation First",
    description: "We push boundaries and challenge conventions. Every solution we create is a step into the future.",
  },
  {
    title: "Excellence in Craft",
    description: "Quality is non-negotiable. Every line of code, every design decision is made with precision.",
  },
  {
    title: "Human-Centered",
    description: "Technology should serve humanity. We build solutions that enhance human potential.",
  },
  {
    title: "Radical Transparency",
    description: "Open communication and honesty drive our relationships with clients and within our team.",
  },
];

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <FloatingNavbar />
      
      <main className="pt-32">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <GlowOrb size="xl" color="plasma" className="top-0 left-1/2 -translate-x-1/2" />
          <ParticleField count={20} />
          
          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl mx-auto"
            >
              <span className="inline-block px-4 py-2 rounded-full glass-metal text-sm text-metal-blue-300 mb-6">
                Our Origin Story
              </span>
              <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold mb-8">
                <span className="text-foreground">Forging the</span>
                <br />
                <span className="text-gradient-metal">Future of Technology</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Born from a vision to transcend conventional boundaries, 
                UNAI TECH has evolved into a global force driving technological innovation.
              </p>
            </motion.div>
          </div>
        </section>
        
        <div className="energy-line" />
        
        {/* Vision Section */}
        <section className="relative py-24 overflow-hidden">
          <GlowOrb size="lg" color="blue" className="top-20 -right-32" />
          
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="font-heading text-4xl font-bold mb-6 text-foreground">
                  Our Vision
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  We envision a world where technology seamlessly integrates with human potential, 
                  creating experiences that feel weightless yet carry immense power. Our mission 
                  is to forge solutions that don't just solve problems—they transcend them.
                </p>
                <p className="text-lg text-muted-foreground">
                  Every project we undertake is crafted with precision, innovation, and an 
                  unwavering commitment to excellence. We're not just building software; 
                  we're architecting the future.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="grid grid-cols-2 gap-6"
              >
                {[
                  { value: "150+", label: "Team Members" },
                  { value: "12", label: "Countries" },
                  { value: "500+", label: "Projects" },
                  { value: "98%", label: "Client Satisfaction" },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    className="glass-metal rounded-xl p-6 text-center hover:shadow-glow-blue transition-all duration-300"
                  >
                    <div className="text-3xl font-heading font-bold text-gradient-energy mb-2">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>
        
        <div className="energy-line" />
        
        {/* Timeline Section */}
        <section className="relative py-24 overflow-hidden">
          <GlowOrb size="lg" color="purple" className="top-1/2 -left-32" />
          
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="font-heading text-4xl font-bold mb-6">
                <span className="text-foreground">Our </span>
                <span className="text-gradient-metal">Journey</span>
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                From a small team with big dreams to a global technology leader.
              </p>
            </motion.div>
            
            <div className="relative max-w-3xl mx-auto">
              {/* Timeline Line */}
              <div className="absolute left-8 lg:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-metal-blue-500 via-metal-purple-500 to-transparent" />
              
              {timelineItems.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`relative pl-20 lg:pl-0 mb-12 lg:w-1/2 ${
                    index % 2 === 0 ? "lg:pr-12 lg:text-right" : "lg:pl-12 lg:ml-auto"
                  }`}
                >
                  {/* Node */}
                  <div className={`absolute w-5 h-5 rounded-full bg-gradient-metal border-4 border-background shadow-glow-blue ${
                    index % 2 === 0 
                      ? "left-6 lg:left-auto lg:-right-2.5" 
                      : "left-6 lg:-left-2.5"
                  }`} />
                  
                  <div className="glass-metal rounded-xl p-6 hover:shadow-glow-blue transition-all duration-300">
                    <span className="text-sm font-medium text-metal-blue-400">{item.year}</span>
                    <h3 className="font-heading text-xl font-semibold text-foreground mt-1 mb-3">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        <div className="energy-line" />
        
        {/* Values Section */}
        <section className="relative py-24 overflow-hidden">
          <GlowOrb size="md" color="blue" className="bottom-20 right-0" />
          
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="font-heading text-4xl font-bold mb-6">
                <span className="text-foreground">Our </span>
                <span className="text-gradient-metal">Core Values</span>
              </h2>
            </motion.div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="glass-metal rounded-xl p-6 hover:shadow-glow-purple transition-all duration-300 hover:-translate-y-2"
                >
                  <h3 className="font-heading text-lg font-semibold text-foreground mb-3">
                    {value.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
