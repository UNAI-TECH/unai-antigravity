import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Linkedin, Instagram } from "lucide-react";

const footerLinks = {
  company: [
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Careers", path: "/careers" },
    { name: "Team", path: "/team" },
  ],
  resources: [
    { name: "Events", path: "/events" },
    { name: "Gallery", path: "/gallery" },
    { name: "Contact", path: "/contact" },
  ],
};

const XIcon = ({ className, size = 24, ...props }: { className?: string; size?: number | string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    {...props}
  >
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
  </svg>
);

const socialLinks = [
  { icon: XIcon, href: "https://x.com/UnaiTech74505?s=20", label: "X" },
  { icon: Linkedin, href: "https://www.linkedin.com/company/unai-tech/", label: "LinkedIn" },
  { icon: Instagram, href: "https://www.instagram.com/unai.tech?igsh=YmwwMTk1cW1xeHl0", label: "Instagram" },
];

export const Footer = () => {
  return (
    <footer className="glass-premium glass-premium-hover glass-shine relative mt-0 mx-4 md:mx-8 mb-6 pt-16 pb-10 rounded-[2.5rem]">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-6 group/brand">
              <img
                src="/unai-logo.png"
                alt="UNAI TECH"
                className="h-12 w-auto group-hover/brand:opacity-80 transition-all group-hover/brand:drop-shadow-[0_0_10px_rgba(139,92,246,0.4)]"
              />
            </Link>
            <p className="text-gray-600 mb-6 max-w-xs leading-relaxed">
              Building the future of technology with innovative solutions that transform industries.
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="p-3 rounded-xl bg-white border border-gray-200 hover:border-purple-200 hover:shadow-sm transition-all duration-300 group/social"
                  aria-label={social.label}
                >
                  <social.icon size={18} className="text-gray-600 group-hover/social:text-purple-600 transition-colors" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-heading font-semibold mb-6 text-foreground tracking-wide">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-600 hover:text-purple-600 hover:translate-x-1 transition-all duration-300 inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="font-heading font-semibold mb-6 text-foreground tracking-wide">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-600 hover:text-purple-600 hover:translate-x-1 transition-all duration-300 inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-heading font-semibold mb-6 text-foreground tracking-wide">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-600 group/item">
                <div className="p-2 rounded-lg bg-purple-50 group-hover/item:bg-purple-100 transition-colors mt-[-4px]">
                  <MapPin size={18} className="text-purple-600 group-hover/item:text-purple-700 transition-colors" />
                </div>
                <span className="group-hover/item:text-purple-600 transition-colors">UNAI TECH, chennai, Tamil nadu</span>
              </li>
              <li className="flex items-center gap-3 text-gray-600 group/item">
                <div className="p-2 rounded-lg bg-purple-50 group-hover/item:bg-purple-100 transition-colors">
                  <Mail size={18} className="text-purple-600 group-hover/item:text-purple-700 transition-colors" />
                </div>
                <a href="mailto:hello@unaitech.com" className="hover:text-purple-600 transition-colors">
                  hello@unaitech.com
                </a>
              </li>
              <li className="flex items-center gap-3 text-gray-600 group/item">
                <div className="p-2 rounded-lg bg-purple-50 group-hover/item:bg-purple-100 transition-colors">
                  <Phone size={18} className="text-purple-600 group-hover/item:text-purple-700 transition-colors" />
                </div>
                <a href="tel:+919043988697" className="hover:text-purple-600 transition-colors">
                  +91 90439 88697
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mb-8" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-600">
          <p className="hover:text-purple-600 transition-colors">© 2024 UNAI TECH. All rights reserved.</p>
          <p className="bg-gradient-to-r from-purple-600 to-purple-500 bg-clip-text text-transparent font-medium">Forged with precision. Built for the future.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
