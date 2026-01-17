import { motion } from "framer-motion";
import { GlowOrb } from "@/components/effects/GlowOrb";

const timelineItems = [
  {
    year: "2018",
    title: "The Genesis",
    description: "UNAI TECH was founded with a vision to revolutionize the tech industry.",
  },
  {
    year: "2020",
    title: "Rapid Expansion",
    description: "Expanded our team to 50+ engineers and opened offices in 3 countries.",
  },
  {
    year: "2022",
    title: "Innovation Award",
    description: "Recognized as one of the top 10 innovative tech companies globally.",
  },
  {
    year: "2024",
    title: "The Future",
    description: "Launching next-gen AI solutions and expanding into new markets.",
  },
];

export const AboutPreview = () => {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background Effects */}
      <GlowOrb size="xl" color="plasma" className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-2 rounded-full glass-metal text-sm text-metal-blue-300 mb-6">
              Our Story
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">
              <span className="text-foreground">Forging the</span>
              <br />
              <span className="text-gradient-metal">Path Forward</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Born from a passion for innovation and a drive to challenge the status quo, 
              UNAI TECH has grown from a small startup to a global force in technology. 
              Our journey is marked by relentless pursuit of excellence and a commitment 
              to transforming how the world interacts with technology.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="glass-metal rounded-xl p-6">
                <div className="text-3xl font-heading font-bold text-gradient-energy mb-2">150+</div>
                <div className="text-sm text-muted-foreground">Team Members</div>
              </div>
              <div className="glass-metal rounded-xl p-6">
                <div className="text-3xl font-heading font-bold text-gradient-energy mb-2">12</div>
                <div className="text-sm text-muted-foreground">Countries</div>
              </div>
            </div>
          </motion.div>
          
          {/* Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-metal-blue-500 via-metal-purple-500 to-transparent" />
            
            <div className="space-y-8">
              {timelineItems.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative pl-20"
                >
                  {/* Node */}
                  <div className="absolute left-6 top-1 w-5 h-5 rounded-full bg-gradient-metal border-4 border-background shadow-glow-blue" />
                  
                  <div className="glass-metal rounded-xl p-6 hover:shadow-glow-blue transition-all duration-300">
                    <span className="text-sm font-medium text-metal-blue-400">{item.year}</span>
                    <h4 className="font-heading text-lg font-semibold text-foreground mt-1 mb-2">
                      {item.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;
