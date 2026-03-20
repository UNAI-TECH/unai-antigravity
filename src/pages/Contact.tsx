import { motion } from "framer-motion";
import { Footer } from "@/components/layout/Footer";
import { GlowOrb } from "@/components/effects/GlowOrb";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send, Mail, MapPin, Phone, Clock } from "lucide-react";
import SEO from "@/components/SEO";

const contactInfo = [
  { icon: Mail, label: "Email", value: "hello@unaitech.com", href: "mailto:hello@unaitech.com" },
  { icon: Phone, label: "Phone", value: "+91 90439 88697", href: "tel:+919043988697" },
  { icon: MapPin, label: "Headquarters", value: "UNAI TECH, Chennai, Tamil Nadu", href: "#" },
  { icon: Clock, label: "Business Hours", value: "Mon - Fri: 9AM - 6PM IST", href: "#" },
];

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Contact Us"
        description="Connect with UNAI TECH to discuss your AI engineering and intelligent systems transformation projects."
      />


      <main className="pt-0">
        {/* Hero Section */}
        <section className="relative pt-32 pb-12 md:pb-20 overflow-hidden">
          <GlowOrb size="xl" color="blue" className="top-0 -right-32" />
          <GlowOrb size="lg" color="purple" className="bottom-0 -left-32" />

          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl mx-auto"
            >
              <span className="inline-block px-4 py-2 rounded-full glass-metal text-sm text-metal-blue-300 mb-6">
                Conversion Field
              </span>
              <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold mb-8">
                <span className="text-foreground">Let's Build</span>
                <br />
                <span className="text-gradient-metal">Something Legendary</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Ready to transform your ideas into reality?
                Connect with us and let's start forging the future together.
              </p>
            </motion.div>
          </div>
        </section>

        <div className="energy-line" />

        {/* Contact Section */}
        <section className="relative py-14 lg:py-24 overflow-hidden">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-5 gap-12">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="lg:col-span-3"
              >
                <GlassCard hover={false} className="p-8 md:p-10">
                  <h2 className="font-heading text-2xl font-bold mb-8 text-foreground">
                    Send Us a Message
                  </h2>

                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">First Name</label>
                        <Input
                          placeholder="Enter Your First Name "
                          className="bg-muted/50 border-border focus:border-metal-blue-500 transition-all duration-300 h-12"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">Last Name</label>
                        <Input
                          placeholder="Enter Your Last Name"
                          className="bg-muted/50 border-border focus:border-metal-blue-500 transition-all duration-300 h-12"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Email</label>
                      <Input
                        type="email"
                        placeholder="Enter Your Email"
                        className="bg-muted/50 border-border focus:border-metal-blue-500 transition-all duration-300 h-12"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Company</label>
                      <Input
                        placeholder="Enter Your Company Name"
                        className="bg-muted/50 border-border focus:border-metal-blue-500 transition-all duration-300 h-12"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Message</label>
                      <Textarea
                        placeholder="Tell us about your project, goals, and how we can help..."
                        rows={6}
                        className="bg-muted/50 border-border focus:border-metal-blue-500 transition-all duration-300 resize-none"
                      />
                    </div>

                    <Button variant="hero" size="xl" className="w-full group">
                      Send Message
                      <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </form>
                </GlassCard>
              </motion.div>

              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="lg:col-span-2 space-y-6"
              >
                <h2 className="font-heading text-2xl font-bold mb-8 text-foreground">
                  Get in Touch
                </h2>

                {contactInfo.map((item, index) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    className="block"
                  >
                    <GlassCard className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-metal-blue-500/20 flex items-center justify-center flex-shrink-0">
                          <item.icon className="w-5 h-5 text-metal-blue-400" />
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground mb-1">{item.label}</div>
                          <div className="font-medium text-foreground">{item.value}</div>
                        </div>
                      </div>
                    </GlassCard>
                  </motion.a>
                ))}


              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
