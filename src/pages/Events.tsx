import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FloatingNavbar } from "@/components/layout/FloatingNavbar";
import { Footer } from "@/components/layout/Footer";
import { GlowOrb } from "@/components/effects/GlowOrb";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users, ArrowRight, Clock, X, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { useData } from "@/context/DataContext";
import { useSearchParams } from "react-router-dom";


const PosterCarousel = ({ posters }: { posters: string[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!posters || posters.length === 0) return null;

  const next = () => setCurrentIndex((prev) => (prev + 1) % posters.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + posters.length) % posters.length);

  return (
    <div className="relative group w-full max-w-2xl mx-auto">
      <div className="relative overflow-hidden rounded-xl aspect-video bg-black/50 border border-white/10 shadow-2xl">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={posters[currentIndex]}
            alt={`Poster ${currentIndex + 1}`}
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
              className="absolute left-3 top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-metal-purple-500 rounded-full text-white backdrop-blur-md transition-all opacity-0 group-hover:opacity-100 border border-white/10 hover:border-white/30"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-metal-purple-500 rounded-full text-white backdrop-blur-md transition-all opacity-0 group-hover:opacity-100 border border-white/10 hover:border-white/30"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 p-2 bg-black/30 backdrop-blur-sm rounded-full">
              {posters.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
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

const Events = () => {
  const { events } = useData();
  const [searchParams, setSearchParams] = useSearchParams();
  const eventId = searchParams.get("id");
  const [selectedEventId, setSelectedEventId] = useState<string | null>(eventId);

  // Sync state with URL
  useEffect(() => {
    if (eventId) {
      setSelectedEventId(eventId);
    } else {
      setSelectedEventId(null);
    }
  }, [eventId]);

  const handleOpenEvent = (id: string) => {
    setSearchParams({ id });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCloseEvent = () => {
    setSearchParams({});
  };

  const selectedEvent = events.find(e => e.id === selectedEventId);

  // Render Detailed Logic
  if (selectedEventId && selectedEvent) {
    return (
      <div className="min-h-screen bg-background">
        <FloatingNavbar />
        <main className="pt-0 min-h-screen relative">
          {/* Close Button */}
          <button
            onClick={handleCloseEvent}
            className="fixed top-24 right-6 z-50 p-3 rounded-full glass-metal hover:bg-white/10 transition-all duration-300 group"
          >
            <X className="w-6 h-6 text-white group-hover:rotate-90 transition-transform" />
          </button>

          {/* Hero Banner Space */}
          <div className="relative h-[60vh] w-full overflow-hidden">
            {selectedEvent.banner ? (
              <img
                src={selectedEvent.banner}
                alt={selectedEvent.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-metal-blue-900 to-black-deep flex items-center justify-center">
                <GlowOrb size="xl" color="blue" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />

            <div className="absolute bottom-0 left-0 w-full p-6 md:p-12">
              <div className="container mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <span className="px-3 py-1 rounded-full bg-metal-blue-500/20 text-metal-blue-400 text-sm font-medium mb-4 inline-block">
                    {selectedEvent.type}
                  </span>
                  <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white">
                    {selectedEvent.title}
                  </h1>
                  <div className="flex flex-wrap gap-4 md:gap-8 text-lg text-gray-300">
                    <span className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-metal-blue-400" />
                      {selectedEvent.date}
                    </span>
                    <span className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-metal-purple-400" />
                      {selectedEvent.location}
                    </span>
                    <span className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-metal-blue-400" />
                      {selectedEvent.attendees} Attendees
                    </span>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <section className="py-12 md:py-20 relative">
            <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Main Description */}
              <div className="lg:col-span-2 space-y-8">
                <GlassCard className="p-8">
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-metal-blue-400" />
                    About the Event
                  </h2>
                  <p className="text-gray-300 leading-relaxed whitespace-pre-line text-lg">
                    {selectedEvent.description}
                  </p>
                </GlassCard>

                {/* Event Posters Gallery */}
                {selectedEvent.posters && selectedEvent.posters.length > 0 && (
                  <GlassCard className="p-8">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-metal-purple-400" />
                      Event Posters
                    </h2>
                    <PosterCarousel posters={selectedEvent.posters} />
                  </GlassCard>
                )}
              </div>

              {/* Sidebar / Actions */}
              <div className="lg:col-span-1 space-y-6">
                <GlassCard className="p-6 sticky top-32">
                  <h3 className="text-xl font-bold mb-6">Registration</h3>
                  <p className="text-muted-foreground mb-6">
                    Secure your spot for this exclusive event. Spaces are limited.
                  </p>
                  {selectedEvent.registration_link && (
                    <Button
                      className="w-full bg-metal-blue-500 hover:bg-metal-blue-600 text-lg py-6"
                      onClick={() => window.open(selectedEvent.registration_link, '_blank')}
                    >
                      Register Now <ExternalLink className="ml-2 w-5 h-5" />
                    </Button>
                  )}
                </GlassCard>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  // List View
  return (
    <div className="min-h-screen bg-background">
      <FloatingNavbar />

      <main className="pt-0 min-h-screen">
        {/* Header */}
        <section className="relative pt-36 pb-20 overflow-hidden">
          {/* Video Background */}
          <div className="absolute inset-0 z-0">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover opacity-60 mix-blend-screen"
            >
              <source src="/cards-video.webm" type="video/webm" />
            </video>
            {/* Gradient Overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/30 to-background/60" />
          </div>

          <GlowOrb size="xl" color="blue" className="top-0 right-0" />
          <div className="container mx-auto px-6 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block px-4 py-2 rounded-full glass-metal text-sm text-metal-blue-300 mb-6">
                Energy Timeline
              </span>
              <h1 className="font-heading text-5xl md:text-6xl font-bold mb-6">
                <span className="text-foreground">Global </span>
                <span className="text-gradient-metal">Events</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Join our community at conferences, workshops, and exclusive gatherings.
              </p>
            </motion.div>
          </div>
        </section>

        <div className="energy-line" />

        {/* Events Grid */}
        <section className="pt-24 pb-32 px-6">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleOpenEvent(event.id)}
                  className="cursor-pointer group"
                >
                  <GlassCard className="h-full overflow-hidden p-0 border-transparent hover:border-metal-blue-500/30 transition-all duration-300 hover:-translate-y-2">
                    {/* Card Image */}
                    <div className="h-48 w-full bg-black/50 relative overflow-hidden">
                      {event.banner ? (
                        <img src={event.banner} alt={event.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-metal-blue-900/50 to-purple-900/50 flex items-center justify-center">
                          <Calendar className="w-12 h-12 text-white/20" />
                        </div>
                      )}
                      <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium text-white border border-white/10">
                        {event.type}
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-6">
                      <div className="text-xs font-medium text-metal-blue-400 mb-2">{event.date}</div>
                      <h3 className="font-heading text-xl font-bold mb-3 group-hover:text-metal-blue-300 transition-colors">{event.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                        {event.description}
                      </p>
                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                        <div className="flex items-center gap-2 text-xs text-gray-400">
                          <MapPin className="w-3 h-3" /> {event.location}
                        </div>
                        <span className="text-xs font-semibold flex items-center text-white group-hover:translate-x-1 transition-transform">
                          Details <ArrowRight className="w-3 h-3 ml-1" />
                        </span>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>

            {events.length === 0 && (
              <div className="text-center py-20">
                <p className="text-2xl text-muted-foreground font-light">No events scheduled at the moment.</p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Events;


