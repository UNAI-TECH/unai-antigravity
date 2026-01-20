import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FloatingNavbar } from "@/components/layout/FloatingNavbar";
import { Footer } from "@/components/layout/Footer";
import { GlowOrb } from "@/components/effects/GlowOrb";
import { X, ArrowRight, CheckCircle2 } from "lucide-react";
import { useData } from "@/context/DataContext";

const categories = ["All", "Events", "Team", "Products", "Spaces"];

const Gallery = () => {
  const { galleryItems } = useData();
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  const filteredItems = activeCategory === "All"
    ? galleryItems
    : galleryItems.filter(item => item.category === activeCategory);

  const selectedItem = galleryItems.find(item => item.id === selectedItemId);

  return (
    <div className="min-h-screen bg-background">
      <FloatingNavbar />

      <main className="pt-0 min-h-screen">
        {/* Hero Section */}
        <section className="relative pt-36 pb-20 overflow-hidden">
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
                  className={`px-6 py-3 rounded-xl transition-all duration-300 ${activeCategory === category
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
        <section className="relative py-12 pb-32 overflow-hidden">
          <GlowOrb size="lg" color="blue" className="top-1/4 -right-32" />
          <GlowOrb size="md" color="purple" className="bottom-1/4 -left-32" />

          <div className="container mx-auto px-6">
            {galleryItems.length === 0 ? (
              <div className="text-center py-20 glass-metal rounded-2xl border border-dashed border-white/10">
                <p className="text-muted-foreground text-xl">No gallery items found.</p>
                <p className="text-sm text-muted-foreground mt-2">Add items from the Admin Dashboard.</p>
              </div>
            ) : (
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
                      onClick={() => setSelectedItemId(item.id)}
                      className="cursor-pointer group"
                    >
                      <div className={`aspect-[4/3] rounded-2xl glass-metal overflow-hidden relative transition-all duration-500 group-hover:shadow-glow-${item.color} group-hover:-translate-y-2`}>
                        {/* Background Image / Gradient */}
                        <div className="absolute inset-0">
                          {item.photos && item.photos.length > 0 ? (
                            <img
                              src={item.photos[0]}
                              alt={item.title}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                          ) : (
                            <div className={`w-full h-full ${item.color === "blue"
                              ? "bg-gradient-to-br from-metal-blue-900 via-metal-blue-700/50 to-black-deep"
                              : "bg-gradient-to-br from-metal-purple-900 via-metal-purple-700/50 to-black-deep"
                              }`} />
                          )}
                        </div>

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black-deep via-black/50 to-transparent opacity-90" />

                        {/* Content */}
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                          <span className={`text-xs font-medium uppercase tracking-wider mb-2 block ${item.color === "blue" ? "text-metal-blue-400" : "text-metal-purple-400"
                            }`}>
                            {item.category}
                          </span>
                          <h3 className="font-heading text-2xl font-bold text-white mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-metal transition-all">
                            {item.title}
                          </h3>
                          {item.caption && (
                            <p className="text-sm text-gray-300 line-clamp-1">{item.caption}</p>
                          )}
                        </div>

                        {/* Hover Glow */}
                        <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </div>
        </section>

        {/* Detailed View Overlay */}
        <AnimatePresence>
          {selectedItemId && selectedItem && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black-void/95 backdrop-blur-md overflow-y-auto"
            >
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="min-h-screen relative"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedItemId(null)}
                  className="fixed top-6 right-6 z-50 p-4 rounded-full glass-metal hover:bg-white/10 transition-all duration-300 group"
                >
                  <X className="w-6 h-6 text-white group-hover:rotate-90 transition-transform" />
                </button>

                {/* Detail Content */}
                <div className="container mx-auto px-6 py-20 md:py-32">
                  <div className="max-w-5xl mx-auto">

                    {/* Header */}
                    <div className="mb-12">
                      <span className={`inline-block px-4 py-1.5 rounded-full glass-metal text-sm font-medium mb-6 ${selectedItem.color === "blue" ? "text-metal-blue-300" : "text-metal-purple-300"
                        }`}>
                        {selectedItem.category}
                      </span>
                      <h1 className="font-heading text-4xl md:text-6xl font-bold text-white mb-6">
                        {selectedItem.title}
                      </h1>
                      {selectedItem.caption && (
                        <p className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed">
                          {selectedItem.caption}
                        </p>
                      )}
                    </div>

                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">

                      {/* Description & Output */}
                      <div className="lg:col-span-2 space-y-8">
                        <div className="glass-metal p-8 rounded-2xl relative overflow-hidden group">
                          <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${selectedItem.color === "blue" ? "from-metal-blue-500 to-transparent" : "from-metal-purple-500 to-transparent"
                            }`} />
                          <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                            <div className={`w-2 h-2 rounded-full ${selectedItem.color === "blue" ? "bg-metal-blue-400" : "bg-metal-purple-400"
                              }`} />
                            Overview
                          </h3>
                          <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                            {selectedItem.description}
                          </p>
                        </div>

                        {/* Photo Grid - Main Content */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {selectedItem.photos && selectedItem.photos.map((photo, index) => (
                            <div
                              key={index}
                              className={`rounded-xl overflow-hidden glass-metal ${index === 0 ? "md:col-span-2 aspect-video" : "aspect-square"}`}
                            >
                              <img
                                src={photo}
                                alt={`Event photo ${index + 1}`}
                                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105 cursor-pointer"
                              />
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Sidebar - Highlights */}
                      <div className="lg:col-span-1 space-y-6">
                        <div className="glass-metal p-6 rounded-2xl sticky top-32">
                          <h3 className="text-lg font-bold mb-6 text-white border-b border-white/10 pb-4">
                            Event Highlights
                          </h3>
                          <ul className="space-y-4">
                            {selectedItem.highlights && selectedItem.highlights.length > 0 ? (
                              selectedItem.highlights.map((highlight, idx) => (
                                <li key={idx} className="flex items-start gap-3">
                                  <div className={`mt-1 min-w-[20px] ${selectedItem.color === "blue" ? "text-metal-blue-400" : "text-metal-purple-400"
                                    }`}>
                                    <CheckCircle2 className="w-5 h-5" />
                                  </div>
                                  <span className="text-sm text-gray-300 leading-snug">
                                    {highlight}
                                  </span>
                                </li>
                              ))
                            ) : (
                              <li className="text-muted-foreground text-sm italic">No highlights listed.</li>
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
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
