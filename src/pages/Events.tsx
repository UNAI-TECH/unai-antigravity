import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Footer } from "@/components/layout/Footer";
import { GlowOrb } from "@/components/effects/GlowOrb";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users, ArrowRight, Clock, X, ExternalLink, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { useData } from "@/context/DataContext";
import { useSearchParams } from "react-router-dom";
import { Magnetic } from "@/components/effects/Magnetic";
import SEO from "@/components/SEO";


const PosterCarousel = ({ posters }: { posters: string[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!posters || posters.length === 0) return null;

  const next = () => setCurrentIndex((prev) => (prev + 1) % posters.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + posters.length) % posters.length);

  return (
    <div className="relative group w-full max-w-2xl mx-auto">
      <div className="relative overflow-hidden rounded-3xl aspect-video bg-black/50 border border-white/10 shadow-2xl">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={posters[currentIndex]}
            alt={`Poster ${currentIndex + 1}`}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            className="w-full h-full object-contain bg-black/80"
          />
        </AnimatePresence>

        {/* Navigation Overlays */}
        {posters.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-4 bg-white/10 hover:bg-white/20 rounded-full text-white backdrop-blur-xl transition-all opacity-0 group-hover:opacity-100 border border-white/20 hover:border-white/40"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-4 bg-white/10 hover:bg-white/20 rounded-full text-white backdrop-blur-xl transition-all opacity-0 group-hover:opacity-100 border border-white/20 hover:border-white/40"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Dots */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 p-2.5 bg-black/40 backdrop-blur-md rounded-full border border-white/10">
              {posters.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-1.5 rounded-full transition-all duration-500 ${idx === currentIndex ? "bg-white w-8" : "bg-white/30 w-1.5 hover:bg-white/60"}`}
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
      <div className="min-h-screen bg-white">
        <SEO
          title={selectedEvent.title}
          description={selectedEvent.description}
        />

        <main className="pt-0 min-h-screen relative">
          {/* Close Button - Premium Glass Style */}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={handleCloseEvent}
            className="fixed top-24 right-8 z-50 p-5 rounded-3xl bg-white/60 backdrop-blur-2xl border border-white/40 shadow-premium-deep hover:bg-white/80 transition-all duration-500 group"
          >
            <X className="w-6 h-6 text-slate-900 group-hover:rotate-90 transition-transform duration-500" />
          </motion.button>

          {/* Cinematic Event Header */}
          <section className="relative h-[65vh] min-h-[500px] w-full overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedEvent.id}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, ease: [0.23, 1, 0.32, 1] }}
                className="absolute inset-0"
              >
                {selectedEvent.banner ? (
                  <img
                    src={selectedEvent.banner}
                    alt={selectedEvent.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950" />
                )}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-white" />
              </motion.div>
            </AnimatePresence>

            <div className="absolute inset-0 flex items-end pb-20 px-8">
              <div className="container mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 60 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
                  className="max-w-5xl"
                >
                  <div className="flex items-center gap-4 mb-8">
                    <span className="px-6 py-2 rounded-full bg-purple-600/90 backdrop-blur-md text-white text-xs font-black tracking-[0.2em] uppercase shadow-2xl">
                      {selectedEvent.type}
                    </span>
                    <div className="h-[1px] w-16 bg-slate-200/50" />
                    <span className="text-slate-600 font-bold text-base tracking-wide flex items-center gap-2">
                      <Clock className="w-4 h-4 text-purple-600" /> {selectedEvent.date}
                    </span>
                  </div>
                  <h1 className="font-heading text-5xl sm:text-7xl md:text-8xl font-black mb-6 text-slate-950 leading-[0.9] tracking-tighter">
                    {selectedEvent.title}
                  </h1>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Premium Bento Content Grid */}
          <section className="py-20 md:py-32 relative px-8 bg-white">
            <div className="container mx-auto max-w-[1500px]">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-[minmax(350px,auto)]">

                {/* 1. Main Info Bento (Span 2x2) */}
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="md:col-span-2 row-span-2"
                >
                  <div className="h-full bg-slate-50/50 rounded-[3.5rem] p-12 md:p-16 border border-slate-100/80 shadow-sm flex flex-col relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-12 opacity-5 scale-150 rotate-12 group-hover:rotate-0 transition-transform duration-1000">
                      <Sparkles className="w-64 h-64 text-purple-600" />
                    </div>

                    <h2 className="text-3xl font-black mb-10 text-slate-950 flex items-center gap-5">
                      <div className="w-1.5 h-10 bg-purple-600 rounded-full" />
                      About the Event
                    </h2>
                    <div className="prose prose-slate max-w-none flex-1">
                      <p className="text-slate-600 leading-relaxed text-xl md:text-2xl font-medium whitespace-pre-line">
                        {selectedEvent.description}
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* 2. Poster Bento */}
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="lg:col-span-1"
                >
                  <div className="h-full bg-slate-950 rounded-[3.5rem] p-10 shadow-premium-deep relative overflow-hidden group">
                    {/* Background Glow */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/20 blur-[80px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/3" />

                    <h2 className="text-2xl font-black mb-8 text-white flex items-center gap-5 relative z-10">
                      <div className="w-3 h-3 rounded-full bg-purple-500 shadow-glow-purple" />
                      Media Gallery
                    </h2>
                    <div className="relative h-[calc(100%-5rem)] rounded-[2rem] overflow-hidden bg-white/5 border border-white/10">
                      {selectedEvent.posters && selectedEvent.posters.length > 0 ? (
                        <div className="h-full w-full">
                          <PosterCarousel posters={selectedEvent.posters} />
                        </div>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Calendar className="w-16 h-16 text-white/5" />
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>

                {/* 3. Stats & Details Bento */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  <div className="h-full bg-purple-50/30 rounded-[3.5rem] p-12 border border-purple-100/50 flex flex-col justify-center space-y-10">
                    <div className="group">
                      <div className="flex items-center gap-4 text-purple-600/50 text-xs font-black tracking-[0.2em] uppercase mb-3">
                        <MapPin className="w-4 h-4 text-purple-600" /> Venue
                      </div>
                      <div className="text-2xl font-black text-slate-900 group-hover:text-purple-600 transition-colors duration-300">{selectedEvent.location}</div>
                    </div>

                    <div className="group">
                      <div className="flex items-center gap-4 text-purple-600/50 text-xs font-black tracking-[0.2em] uppercase mb-3">
                        <Calendar className="w-4 h-4 text-purple-600" /> Schedule
                      </div>
                      <div className="text-2xl font-black text-slate-900 group-hover:text-purple-600 transition-colors duration-300">{selectedEvent.date}</div>
                    </div>

                    <div className="group">
                      <div className="flex items-center gap-4 text-purple-600/50 text-xs font-black tracking-[0.2em] uppercase mb-3">
                        <Users className="w-4 h-4 text-purple-600" /> Capacity
                      </div>
                      <div className="text-4xl font-black text-slate-900 flex items-baseline gap-2 group-hover:text-purple-600 transition-colors duration-300">
                        {selectedEvent.attendees} <span className="text-sm font-bold text-slate-400">Registered</span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* 4. Action Bento (Full width) */}
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="lg:col-span-3 h-auto"
                >
                  {/* Magnetic Wrapper for the whole CTA section */}
                  <div className="bg-slate-950 rounded-[4rem] p-12 md:p-20 shadow-premium-deep relative overflow-hidden group">
                    {/* Background Visuals */}
                    <div className="absolute top-0 right-0 w-[50%] h-full bg-gradient-to-l from-purple-600/20 to-transparent pointer-events-none" />
                    <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-600/10 blur-[100px] rounded-full pointer-events-none" />

                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                      <div className="max-w-3xl text-center md:text-left">
                        <h3 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight tracking-tighter">
                          Join the <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Collaborative</span> <br className="hidden md:block" /> Engineering Frontier
                        </h3>
                        <p className="text-slate-400 text-lg md:text-xl font-medium max-w-xl">
                          Witness the next evolution of intelligent systems. Limited seats available for the technical deep-dive tracks.
                        </p>
                      </div>

                      {selectedEvent.registration_link && (
                        <Magnetic strength={0.2}>
                          <Button
                            onClick={() => window.open(selectedEvent.registration_link, '_blank')}
                            className="h-24 px-16 rounded-full bg-white text-slate-950 hover:bg-white/90 text-2xl font-black shadow-2xl transition-all duration-500 group overflow-hidden"
                          >
                            <span className="relative z-10 flex items-center gap-4">
                              Secure Access <ArrowRight className="w-8 h-8 group-hover:translate-x-2 transition-transform duration-500" />
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-100 to-white scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
                          </Button>
                        </Magnetic>
                      )}
                    </div>
                  </div>
                </motion.div>

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
    <div className="min-h-screen bg-white">
      <SEO
        title="Events"
        description="Stay updated with UNAI TECH's global events, conferences, and workshops on AI and engineering."
      />

      <main className="pt-0 min-h-screen">
        {/* Unique Modern Premium Hero */}
        <section className="relative pt-60 pb-40 overflow-hidden bg-slate-950">
          {/* Advanced Background Design */}
          <div className="absolute inset-0 z-0">
            {/* Dark Base */}
            <div className="absolute inset-0 bg-[#020205]" />

            {/* Dynamic Mesh & Glows */}
            <div className="absolute top-[-20%] right-[-10%] w-[80%] h-[120%] bg-purple-600/10 blur-[180px] rounded-full animate-optimized opacity-60" style={{ animation: 'pulse-glow 12s ease-in-out infinite' }} />
            <div className="absolute bottom-[-10%] left-[-5%] w-[60%] h-[80%] bg-blue-600/10 blur-[160px] rounded-full animate-optimized opacity-40" />

            {/* subtle grid overlay */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none" />
          </div>

          <div className="container mx-auto px-8 relative z-10">
            <div className="max-w-6xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
              >
                <Magnetic strength={0.1}>
                  <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-white/5 backdrop-blur-2xl border border-white/10 text-white text-xs font-black tracking-[0.3em] uppercase mb-12 shadow-2xl">
                    <Sparkles className="w-4 h-4 text-purple-400" />
                    Engineering Communities
                  </div>
                </Magnetic>

                <h1 className="font-heading text-6xl md:text-9xl font-black mb-10 text-white tracking-[-0.05em] leading-[0.85]">
                  Global <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 animate-gradient-x">Collective</span>
                </h1>

                <p className="text-xl md:text-3xl text-slate-400 max-w-3xl mx-auto font-medium leading-relaxed opacity-80">
                  Forging the future through technical summits, <br className="hidden md:block" />
                  collaborative labs, and high-impact engineering workshops.
                </p>
              </motion.div>
            </div>
          </div>

          {/* Hero Bottom Decor */}
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent" />
        </section>

        {/* Overlapping Content Area */}
        <section className="relative z-20 -mt-24 px-8 pb-40 bg-white">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {events.map((event, index) => (
                <Magnetic key={event.id} strength={0.05}>
                  <motion.div
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8, delay: index * 0.1, ease: [0.23, 1, 0.32, 1] }}
                    onClick={() => handleOpenEvent(event.id)}
                    className="group cursor-pointer transform-gpu h-full"
                  >
                    <div className="h-full bg-white rounded-[3.5rem] overflow-hidden border border-slate-100 glass-premium glass-premium-hover glass-inner-glow flex flex-col">
                      {/* Visual Card Header */}
                      <div className="h-72 relative overflow-hidden bg-slate-950">
                        {event.banner ? (
                          <motion.img
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 1.5, ease: [0.23, 1, 0.32, 1] }}
                            src={event.banner}
                            alt={event.title}
                            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700"
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-slate-900 to-purple-900 flex items-center justify-center">
                            <Calendar className="w-16 h-16 text-white/5" />
                          </div>
                        )}

                        {/* Floating Glass Badge */}
                        <div className="absolute top-8 left-8 bg-white/10 backdrop-blur-xl px-5 py-2 rounded-full text-[11px] font-black tracking-widest uppercase text-white border border-white/20 shadow-2xl">
                          {event.type}
                        </div>

                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
                      </div>

                      {/* Card Body */}
                      <div className="p-10 flex flex-col flex-1 relative">
                        <div className="flex items-center gap-3 mb-6 text-purple-600 font-black text-xs uppercase tracking-[0.2em]">
                          <Clock className="w-4 h-4" />
                          {event.date}
                        </div>

                        <h3 className="font-heading text-3xl font-black mb-5 text-slate-950 group-hover:text-purple-600 transition-colors duration-500 leading-[1.1] tracking-tight">
                          {event.title}
                        </h3>

                        <p className="text-slate-500 text-lg line-clamp-2 md:line-clamp-3 mb-10 leading-relaxed font-semibold opacity-70 group-hover:opacity-100 transition-opacity duration-500">
                          {event.description}
                        </p>

                        <div className="mt-auto flex items-center justify-between pt-10 border-t border-slate-50">
                          <div className="flex items-center gap-3 text-slate-400 font-bold text-sm">
                            <MapPin className="w-4 h-4 text-purple-600" />
                            {event.location}
                          </div>

                          <div className="flex items-center gap-3 text-slate-950 font-black text-sm uppercase tracking-wider group-hover:translate-x-2 transition-transform duration-500">
                            Details <ArrowRight className="w-5 h-5 text-purple-600" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </Magnetic>
              ))}
            </div>

            {events.length === 0 && (
              <div className="text-center py-60">
                <div className="w-24 h-24 bg-slate-50 rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 shrink-0 border border-slate-100">
                  <Calendar className="w-10 h-10 text-slate-200" />
                </div>
                <h3 className="text-3xl font-black text-slate-900 mb-4">The Forge is Cooling</h3>
                <p className="text-xl text-slate-400 font-medium tracking-wide">New high-impact events are currently in technical planning.</p>
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
