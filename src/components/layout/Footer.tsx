import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Github, Twitter, Linkedin, Instagram } from "lucide-react";

const footerLinks = {
  company: [
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Products", path: "/products" },
    { name: "Team", path: "/team" },
  ],
  resources: [
    { name: "Events", path: "/events" },
    { name: "Gallery", path: "/gallery" },
    { name: "Contact", path: "/contact" },
  ],
  legal: [
    { name: "Privacy Policy", path: "#" },
    { name: "Terms of Service", path: "#" },
  ],
};

const socialLinks = [
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Instagram, href: "#", label: "Instagram" },
];

export const Footer = () => {
  return (
    <footer className="relative pt-24 pb-12 overflow-hidden border-t border-white/5 bg-[#0B1221]/30 backdrop-blur-xl shadow-[0_-10px_40px_-20px_rgba(0,0,0,0.5)]">
      {/* Glass Background Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

      {/* Top energy line - kept for design continuity */}
      <div className="energy-line mb-16 opacity-50" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-6">
              <span className="font-heading text-3xl font-bold text-gradient-metal">
                UNAI TECH
              </span>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-xs">
              Building the future of technology with innovative solutions that transform industries.
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="p-3 rounded-xl glass-metal glow-border transition-all duration-300 bg-white/5 hover:bg-white/10"
                  aria-label={social.label}
                >
                  <social.icon size={18} className="text-muted-foreground hover:text-metal-blue-400 transition-colors" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-heading font-semibold mb-6 text-foreground">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-muted-foreground hover:text-metal-blue-400 transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="font-heading font-semibold mb-6 text-foreground">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-muted-foreground hover:text-metal-blue-400 transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            <h4 className="font-heading font-semibold mb-4 mt-8 text-foreground">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-muted-foreground hover:text-metal-blue-400 transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-heading font-semibold mb-6 text-foreground">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-muted-foreground">
                <MapPin size={18} className="text-metal-blue-400 flex-shrink-0" />
                <span>123 Innovation Street, Tech City, TC 12345</span>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <Mail size={18} className="text-metal-blue-400 flex-shrink-0" />
                <a href="mailto:hello@unaitech.com" className="hover:text-metal-blue-400 transition-colors">
                  hello@unaitech.com
                </a>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <Phone size={18} className="text-metal-blue-400 flex-shrink-0" />
                <a href="tel:+1234567890" className="hover:text-metal-blue-400 transition-colors">
                  +1 (234) 567-890
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="energy-line mb-8 opacity-50" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© 2024 UNAI TECH. All rights reserved.</p>
          <p>Forged with precision. Built for the future.</p>
        </div>
      </div>

      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-metal-blue-500/10 blur-[120px] rounded-full pointer-events-none" />
    </footer>
  );
};

export default Footer;
