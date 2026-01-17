import { motion } from "framer-motion";
import { GlowOrb } from "@/components/effects/GlowOrb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send, Mail, MapPin, Phone } from "lucide-react";

export const ContactPreview = () => {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background Effects */}
      <GlowOrb size="lg" color="blue" className="-top-32 right-0" />
      <GlowOrb size="md" color="purple" className="bottom-0 left-1/4" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 rounded-full glass-metal text-sm text-metal-blue-300 mb-6">
              Get In Touch
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">
              <span className="text-foreground">Enter the</span>
              <br />
              <span className="text-gradient-metal">Conversion Field</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-lg">
              Ready to transform your ideas into reality? 
              Connect with us and let's build something legendary.
            </p>
          </motion.div>
          
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-3"
            >
              <div className="glass-metal rounded-2xl p-8">
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Name</label>
                      <Input 
                        placeholder="Your name" 
                        className="bg-muted/50 border-border focus:border-metal-blue-500 focus:ring-metal-blue-500/20 transition-all duration-300"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Email</label>
                      <Input 
                        type="email" 
                        placeholder="you@example.com" 
                        className="bg-muted/50 border-border focus:border-metal-blue-500 focus:ring-metal-blue-500/20 transition-all duration-300"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Subject</label>
                    <Input 
                      placeholder="How can we help?" 
                      className="bg-muted/50 border-border focus:border-metal-blue-500 focus:ring-metal-blue-500/20 transition-all duration-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Message</label>
                    <Textarea 
                      placeholder="Tell us about your project..." 
                      rows={5}
                      className="bg-muted/50 border-border focus:border-metal-blue-500 focus:ring-metal-blue-500/20 transition-all duration-300 resize-none"
                    />
                  </div>
                  <Button variant="hero" size="lg" className="w-full group">
                    Send Message
                    <Send className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </form>
              </div>
            </motion.div>
            
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-2 space-y-6"
            >
              {[
                { icon: Mail, label: "Email", value: "hello@unaitech.com" },
                { icon: Phone, label: "Phone", value: "+1 (234) 567-890" },
                { icon: MapPin, label: "Location", value: "123 Innovation Street, Tech City" },
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="glass-metal rounded-xl p-6 hover:shadow-glow-blue transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-metal-blue-500/20 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-metal-blue-400" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">{item.label}</div>
                      <div className="font-medium text-foreground">{item.value}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPreview;
