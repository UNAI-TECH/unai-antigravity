import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FloatingNavbar } from "@/components/layout/FloatingNavbar";
import { Footer } from "@/components/layout/Footer";
import { GlowOrb } from "@/components/effects/GlowOrb";
import { X } from "lucide-react";

// Gallery items - in a real app these would be actual images
const galleryItems = [
  { id: 1, title: "NexusAI Launch", category: "Events", color: "blue" },
  { id: 2, title: "Team Summit 2023", category: "Team", color: "purple" },
  { id: 3, title: "CloudForge Demo", category: "Products", color: "blue" },
  { id: 4, title: "Office London", category: "Spaces", color: "purple" },
  { id: 5, title: "Developer Day", category: "Events", color: "blue" },
  { id: 6, title: "AI Workshop", category: "Events", color: "purple" },
  { id: 7, title: "Singapore HQ", category: "Spaces", color: "blue" },
  { id: 8, title: "Hackathon 2023", category: "Team", color: "purple" },
  { id: 9, title: "Product Launch", category: "Products", color: "blue" },
];

const categories = ["All", "Events", "Team", "Products", "Spaces"];

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedItem, setSelectedItem] = useState<number | null>(null);

  const filteredItems = activeCategory === "All" 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-background">
      <FloatingNavbar />
      
      <main className="pt-32">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <GlowOrb size="xl" color="plasma" className="top-0 left-1/2 -translate-x-1/2" />
          
          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl mx-auto"
            >
              <span className="inline-block px-4 py-2 rounded-full glass-metal text-sm text-metal-purple-300 mb-6">
                Visual Void
              </span>
              <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold mb-8">
                <span className="text-foreground">Our </span>
                <span className="text-gradient-metal">Gallery</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                A visual journey through our moments, spaces, and creations. 
                Explore the world of UNAI TECH.
              </p>
            </motion.div>
          </div>
        </section>
        
        <div className="energy-line" />
        
        {/* Filter Tabs */}
        <section className="py-12">
          <div className="container mx-auto px-6">
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-6 py-3 rounded-xl transition-all duration-300 ${
                    activeCategory === category
                      ? "bg-gradient-metal text-white shadow-glow-blue"
                      : "glass-metal text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </div>
        </section>
        
        {/* Gallery Grid */}
        <section className="relative py-12 overflow-hidden">
          <GlowOrb size="lg" color="blue" className="top-1/4 -right-32" />
          <GlowOrb size="md" color="purple" className="bottom-1/4 -left-32" />
          
          <div className="container mx-auto px-6">
            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <AnimatePresence mode="popLayout">
                {filteredItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    onClick={() => setSelectedItem(item.id)}
                    className="cursor-pointer group"
                  >
                    <div className={`aspect-[4/3] rounded-2xl glass-metal overflow-hidden relative transition-all duration-500 group-hover:shadow-glow-${item.color} group-hover:-translate-y-2`}>
                      {/* Placeholder gradient background */}
                      <div className={`absolute inset-0 ${
                        item.color === "blue" 
                          ? "bg-gradient-to-br from-metal-blue-900 via-metal-blue-700/50 to-black-deep" 
                          : "bg-gradient-to-br from-metal-purple-900 via-metal-purple-700/50 to-black-deep"
                      }`} />
                      
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black-deep via-transparent to-transparent opacity-80" />
                      
                      {/* Content */}
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <span className={`text-xs font-medium ${
                          item.color === "blue" ? "text-metal-blue-400" : "text-metal-purple-400"
                        }`}>
                          {item.category}
                        </span>
                        <h3 className="font-heading text-xl font-semibold text-foreground mt-1">
                          {item.title}
                        </h3>
                      </div>
                      
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-gradient-metal opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>
        
        {/* Lightbox */}
        <AnimatePresence>
          {selectedItem && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
              className="fixed inset-0 z-50 bg-black-void/90 backdrop-blur-xl flex items-center justify-center p-6"
            >
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute top-6 right-6 p-3 rounded-full glass-metal hover:shadow-glow-blue transition-all duration-300"
              >
                <X className="w-6 h-6" />
              </motion.button>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                onClick={(e) => e.stopPropagation()}
                className="max-w-4xl w-full aspect-video rounded-2xl glass-metal overflow-hidden"
              >
                {(() => {
                  const item = galleryItems.find(i => i.id === selectedItem);
                  if (!item) return null;
                  return (
                    <div className={`w-full h-full flex items-center justify-center ${
                      item.color === "blue" 
                        ? "bg-gradient-to-br from-metal-blue-900 via-metal-blue-700/50 to-black-deep" 
                        : "bg-gradient-to-br from-metal-purple-900 via-metal-purple-700/50 to-black-deep"
                    }`}>
                      <div className="text-center">
                        <span className={`text-sm font-medium ${
                          item.color === "blue" ? "text-metal-blue-400" : "text-metal-purple-400"
                        }`}>
                          {item.category}
                        </span>
                        <h2 className="font-heading text-3xl font-bold text-foreground mt-2">
                          {item.title}
                        </h2>
                      </div>
                    </div>
                  );
                })()}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      
      <Footer />
    </div>
  );
};

export default Gallery;
