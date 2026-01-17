import { motion } from "framer-motion";
import { FloatingNavbar } from "@/components/layout/FloatingNavbar";
import { Footer } from "@/components/layout/Footer";
import { GlowOrb } from "@/components/effects/GlowOrb";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users, ArrowRight, Clock } from "lucide-react";

const events = [
  {
    title: "AI Summit 2024",
    date: "March 15-17, 2024",
    location: "San Francisco, CA",
    type: "Conference",
    description: "Join us for three days of insights into the future of AI, featuring keynotes from industry leaders.",
    attendees: "2,500+",
    status: "upcoming",
  },
  {
    title: "CloudForge Workshop",
    date: "February 28, 2024",
    location: "Virtual",
    type: "Workshop",
    description: "Hands-on workshop for mastering multi-cloud deployments with our CloudForge platform.",
    attendees: "500",
    status: "upcoming",
  },
  {
    title: "Cybersecurity Roundtable",
    date: "February 10, 2024",
    location: "New York, NY",
    type: "Meetup",
    description: "Exclusive roundtable discussion on emerging threats and defense strategies.",
    attendees: "50",
    status: "upcoming",
  },
  {
    title: "Developer Day",
    date: "January 20, 2024",
    location: "London, UK",
    type: "Conference",
    description: "A full day dedicated to developers, featuring new API releases and integration tutorials.",
    attendees: "1,000+",
    status: "past",
  },
  {
    title: "Product Launch: NexusAI 3.0",
    date: "December 5, 2023",
    location: "Virtual",
    type: "Launch",
    description: "The unveiling of NexusAI 3.0 with revolutionary new features and capabilities.",
    attendees: "5,000+",
    status: "past",
  },
];

const Events = () => {
  const upcomingEvents = events.filter(e => e.status === "upcoming");
  const pastEvents = events.filter(e => e.status === "past");

  return (
    <div className="min-h-screen bg-background">
      <FloatingNavbar />
      
      <main className="pt-32">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <GlowOrb size="xl" color="blue" className="top-0 right-0" />
          <GlowOrb size="lg" color="purple" className="bottom-0 left-0" />
          
          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl mx-auto"
            >
              <span className="inline-block px-4 py-2 rounded-full glass-metal text-sm text-metal-blue-300 mb-6">
                Energy Timeline
              </span>
              <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold mb-8">
                <span className="text-foreground">Connect &</span>
                <br />
                <span className="text-gradient-metal">Collaborate</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Join our community at conferences, workshops, and exclusive events. 
                Where innovation meets inspiration.
              </p>
            </motion.div>
          </div>
        </section>
        
        <div className="energy-line" />
        
        {/* Upcoming Events */}
        <section className="relative py-24 overflow-hidden">
          <div className="container mx-auto px-6">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-heading text-3xl font-bold mb-12 text-foreground"
            >
              Upcoming Events
            </motion.h2>
            
            <div className="space-y-6">
              {upcomingEvents.map((event, index) => (
                <motion.div
                  key={event.title}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <GlassCard className="p-8">
                    <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                      {/* Date Badge */}
                      <div className="flex-shrink-0 w-24 h-24 rounded-xl bg-gradient-metal flex flex-col items-center justify-center text-white">
                        <Calendar className="w-6 h-6 mb-1" />
                        <span className="text-xs font-medium">{event.date.split(",")[0]}</span>
                      </div>
                      
                      {/* Event Info */}
                      <div className="flex-grow">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="px-3 py-1 rounded-full bg-metal-blue-500/20 text-metal-blue-400 text-xs font-medium">
                            {event.type}
                          </span>
                        </div>
                        <h3 className="font-heading text-2xl font-bold text-foreground mb-2">
                          {event.title}
                        </h3>
                        <p className="text-muted-foreground mb-4">{event.description}</p>
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-metal-blue-400" />
                            {event.date}
                          </span>
                          <span className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-metal-purple-400" />
                            {event.location}
                          </span>
                          <span className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-metal-blue-400" />
                            {event.attendees} Expected
                          </span>
                        </div>
                      </div>
                      
                      {/* CTA */}
                      <div className="flex-shrink-0">
                        <Button variant="hero" className="group">
                          Register Now
                          <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        <div className="energy-line" />
        
        {/* Past Events */}
        <section className="relative py-24 overflow-hidden">
          <GlowOrb size="md" color="purple" className="top-20 -right-32" />
          
          <div className="container mx-auto px-6">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-heading text-3xl font-bold mb-12 text-foreground"
            >
              Past Events
            </motion.h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {pastEvents.map((event, index) => (
                <motion.div
                  key={event.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <GlassCard glowColor="purple" className="h-full">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-3 py-1 rounded-full bg-muted text-muted-foreground text-xs font-medium">
                        {event.type}
                      </span>
                      <span className="text-sm text-muted-foreground">{event.date}</span>
                    </div>
                    <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                      {event.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">{event.description}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {event.location}
                      </span>
                      <span className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        {event.attendees}
                      </span>
                    </div>
                  </GlassCard>
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

export default Events;
