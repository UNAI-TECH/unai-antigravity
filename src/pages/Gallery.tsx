import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Footer } from "@/components/layout/Footer";
import { GlowOrb } from "@/components/effects/GlowOrb";
import { X, ArrowRight, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import { useData } from "@/context/DataContext";

const categories = ["All", "Events", "Team", "Products", "Spaces"];

const PosterCarousel = ({ posters }: { posters: string[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!posters || posters.length === 0) return null;

  const next = () => setCurrentIndex((prev) => (prev + 1) % posters.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + posters.length) % posters.length);

  return (
    <div className="relative group w-full max-w-4xl mx-auto my-8">
      <div className="relative overflow-hidden rounded-xl aspect-video bg-black/50 border border-white/10 shadow-2xl">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={posters[currentIndex]}
            alt={`Photo ${currentIndex + 1}`}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full object-contain bg-black/80"
          />
        </AnimatePresence>

        {/* Navigation Overlays */}
        {posters.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-metal-purple-500 rounded-full text-white backdrop-blur-md transition-all opacity-0 group-hover:opacity-100 border border-white/10 hover:border-white/30 z-10"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-metal-purple-500 rounded-full text-white backdrop-blur-md transition-all opacity-0 group-hover:opacity-100 border border-white/10 hover:border-white/30 z-10"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 p-2 bg-black/30 backdrop-blur-sm rounded-full z-10">
              {posters.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => { e.stopPropagation(); setCurrentIndex(idx); }}
                  className={`h-2 rounded-full transition-all duration-300 ${idx === currentIndex ? "bg-metal-purple-400 w-6" : "bg-white/40 w-2 hover:bg-white/70"}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

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


      <main className="pt-0 min-h-screen">
        {/* Hero Section */}
        <section className="relative pt-32 pb-12 md:pb-20 overflow-hidden">
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
              <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-8">
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
        <section className="py-8 md:py-12">
          <div className="container mx-auto px-6">
            <div className="flex overflow-x-auto no-scrollbar justify-start sm:justify-center gap-3 px-4 sm:px-0">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-6 py-3 rounded-xl whitespace-nowrap transition-all duration-300 ${activeCategory === category
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
        <section className="relative py-8 md:py-12 pb-16 lg:pb-32 overflow-hidden">
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

        {/* Detailed View - Fresh Page Overlay */}
        <AnimatePresence>
          {selectedItemId && selectedItem && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-background overflow-y-auto"
              data-lenis-prevent
            >
              <div className="relative min-h-screen flex flex-col">


                {/* Back Button */}
                <div className="absolute top-28 left-6 md:left-12 z-50">
                  <button
                    onClick={() => setSelectedItemId(null)}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full glass-metal bg-black/60 hover:bg-white/10 hover:border-metal-blue-500/50 transition-all duration-300 group text-white backdrop-blur-xl border border-white/10 shadow-lg"
                  >
                    <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    <span className="font-medium">Back to Gallery</span>
                  </button>
                </div>

                {/* Hero Banner Header */}
                <header className="relative h-[55vh] md:h-[70vh] w-full overflow-hidden shrink-0">
                  {selectedItem.banner ? (
                    <motion.img
                      initial={{ scale: 1.1 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
                      src={selectedItem.banner}
                      alt={selectedItem.title}
                      className="w-full h-full object-cover"
                    />
                  ) : selectedItem.photos && selectedItem.photos.length > 0 ? (
                    <motion.img
                      initial={{ scale: 1.1 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
                      src={selectedItem.photos[0]}
                      alt={selectedItem.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-metal-blue-900 via-purple-900 to-black-deep flex items-center justify-center">
                      <GlowOrb size="xl" color="plasma" />
                    </div>
                  )}

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-black/40" />

                  {/* Header Content */}
                  <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 z-20">
                    <div className="container mx-auto">
                      <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="max-w-4xl"
                      >
                        <div className="flex items-center gap-3 mb-4">
                          <span className={`px-4 py-1.5 rounded-full glass-metal text-sm font-bold tracking-wide backdrop-blur-md border border-white/10 uppercase ${selectedItem.category === 'Events' ? 'text-metal-blue-300 shadow-[0_0_15px_rgba(56,189,248,0.2)]' : 'text-metal-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.2)]'
                            }`}>
                            {selectedItem.category}
                          </span>
                          <div className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent w-24" />
                        </div>

                        <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 drop-shadow-2xl leading-tight">
                          {selectedItem.title}
                        </h1>

                        {selectedItem.caption && (
                          <div className="flex flex-col md:flex-row gap-4 md:items-center">
                            <div className="w-1 h-12 bg-gradient-to-b from-metal-blue-400 to-metal-purple-400 rounded-full hidden md:block" />
                            <p className="text-base sm:text-lg md:text-2xl text-gray-200 font-light drop-shadow-lg leading-relaxed max-w-2xl">
                              {selectedItem.caption}
                            </p>
                          </div>
                        )}
                      </motion.div>
                    </div>
                  </div>
                </header>

                {/* Main Content */}
                <main className="flex-1 container mx-auto px-6 py-12 md:py-20 relative z-10">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 items-start">

                    {/* Left Column: Description */}
                    <div className="lg:col-span-2 space-y-10 order-2 lg:order-1">
                      <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        className="glass-metal p-6 md:p-10 rounded-3xl relative overflow-hidden group hover:border-metal-blue-500/30 transition-all duration-500"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-shimmer" />

                        <h3 className="text-2xl md:text-3xl font-bold mb-8 flex items-center gap-4 text-white">
                          <span className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 text-metal-blue-400">
                            <ArrowRight className="w-5 h-5 -rotate-45" />
                          </span>
                          About The Event
                        </h3>
                        <div className="prose prose-invert max-w-none">
                          <p className="text-gray-300 leading-relaxed whitespace-pre-line text-lg font-light">
                            {selectedItem.description}
                          </p>
                        </div>
                      </motion.div>

                      {/* Photo Carousel (Moved inside main content flow) */}
                      {selectedItem.photos && selectedItem.photos.length > 0 && (
                        <div className="pt-8">
                          <div className="flex items-center gap-6 mb-8">
                            <h3 className="text-2xl font-bold text-white">Event Gallery</h3>
                            <div className="h-px bg-white/10 flex-1" />
                          </div>
                          <PosterCarousel posters={selectedItem.photos} />
                        </div>
                      )}
                    </div>

                    {/* Right Column: Highlights Sidebar */}
                    <div className="lg:col-span-1 order-1 lg:order-2">
                      <motion.div
                        initial={{ x: 30, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        className="glass-metal p-8 rounded-3xl sticky top-28 border border-white/10 shadow-xl"
                      >
                        <h3 className="text-xl font-bold mb-6 text-white pb-4 border-b border-white/10 flex items-center justify-between">
                          Highlights
                          <div className="flex gap-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-metal-blue-400" />
                            <div className="w-1.5 h-1.5 rounded-full bg-metal-purple-400" />
                          </div>
                        </h3>
                        <ul className="space-y-4">
                          {selectedItem.highlights && selectedItem.highlights.length > 0 ? (
                            selectedItem.highlights.map((highlight, idx) => (
                              <li key={idx} className="flex items-start gap-4 group/item p-2 rounded-lg hover:bg-white/5 transition-colors duration-300">
                                <div className="mt-1 min-w-[24px] text-metal-purple-400 group-hover/item:text-white transition-colors">
                                  <CheckCircle2 className="w-6 h-6" />
                                </div>
                                <span className="text-pink-100/80 leading-snug group-hover/item:text-white transition-colors">
                                  {highlight}
                                </span>
                              </li>
                            ))
                          ) : (
                            <li className="text-muted-foreground text-sm italic">No highlights available.</li>
                          )}
                        </ul>
                      </motion.div>
                    </div>

                  </div>
                </main>

                <Footer />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
};

export default Gallery;
