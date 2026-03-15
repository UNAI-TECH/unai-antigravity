import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users, ArrowRight, Clock, X, ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import { useData } from "@/context/DataContext";
import { useSearchParams } from "react-router-dom";
import { Magnetic } from "@/components/effects/Magnetic";
import SEO from "@/components/SEO";

// ─── Poster Carousel ───────────────────────────────────────────────────────────
const PosterCarousel = ({ posters }: { posters: string[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  if (!posters || posters.length === 0) return null;
  const next = () => setCurrentIndex((p) => (p + 1) % posters.length);
  const prev = () => setCurrentIndex((p) => (p - 1 + posters.length) % posters.length);

  return (
    <div className="relative group w-full h-full">
      <div className="relative overflow-hidden rounded-2xl h-full bg-black">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={posters[currentIndex]}
            alt={`Poster ${currentIndex + 1}`}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            className="w-full h-full object-contain"
          />
        </AnimatePresence>
        {posters.length > 1 && (
          <>
            <button onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-3 bg-black/60 hover:bg-black/90 rounded-full text-white backdrop-blur-md transition-all opacity-0 group-hover:opacity-100 border border-white/10">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-3 bg-black/60 hover:bg-black/90 rounded-full text-white backdrop-blur-md transition-all opacity-0 group-hover:opacity-100 border border-white/10">
              <ChevronRight className="w-4 h-4" />
            </button>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {posters.map((_, idx) => (
                <button key={idx} onClick={() => setCurrentIndex(idx)}
                  className={`h-1 rounded-full transition-all duration-500 ${idx === currentIndex ? "bg-white w-6" : "bg-white/30 w-1"}`} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// ─── Countdown Timer ──────────────────────────────────────────────────────────
const Countdown = ({ targetDate }: { targetDate?: string }) => {
  const [time, setTime] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    const target = targetDate ? new Date(targetDate).getTime() : Date.now() + 7 * 24 * 60 * 60 * 1000;
    const tick = () => {
      const diff = Math.max(0, target - Date.now());
      setTime({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  const units = [
    { val: String(time.d).padStart(2, "0"), label: "Days" },
    { val: String(time.h).padStart(2, "0"), label: "Hrs" },
    { val: String(time.m).padStart(2, "0"), label: "Min" },
    { val: String(time.s).padStart(2, "0"), label: "Sec" },
  ];

  return (
    <div className="flex items-center gap-1">
      {units.map((u, i) => (
        <div key={u.label} className="flex items-center gap-1">
          <div className="text-center">
            <div className="font-mono text-xs font-black text-slate-900 tabular-nums leading-none">{u.val}</div>
            <div className="text-[8px] uppercase tracking-widest text-slate-400 font-semibold mt-0.5">{u.label}</div>
          </div>
          {i < units.length - 1 && <span className="text-slate-300 text-xs font-light mb-2">:</span>}
        </div>
      ))}
    </div>
  );
};

// ─── Event Card ───────────────────────────────────────────────────────────────
const EventCard = ({ event, index, onClick }: { event: any; index: number; onClick: () => void }) => {
  const isFeature = index === 0;

  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.23, 1, 0.32, 1] }}
      onClick={onClick}
      className={`group relative cursor-pointer ${isFeature ? "md:col-span-2 md:row-span-2" : ""}`}
    >
      {/* Card Shell */}
      <div className="relative h-full overflow-hidden rounded-[2rem] bg-white border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-700 flex flex-col">

        {/* Image Area */}
        <div className={`relative overflow-hidden flex-shrink-0 ${isFeature ? "h-52 sm:h-80" : "h-40 sm:h-52"}`}>
          {event.banner ? (
            <img src={event.banner} alt={event.title}
              width="800" height="400"
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
              <Calendar className="w-10 h-10 text-slate-300" />
            </div>
          )}

          {/* Type Badge */}
          <div className="absolute top-4 left-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-black uppercase tracking-widest text-slate-700 shadow-sm border border-white/50">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              {event.type || "Event"}
            </span>
          </div>

          {/* Arrow Icon */}
          <div className="absolute top-4 right-4 p-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-500">
            <ArrowUpRight className="w-4 h-4" />
          </div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
        </div>

        {/* Body */}
        <div className="p-4 sm:p-7 flex flex-col flex-1">
          <h3 className={`font-black text-slate-900 mb-2.5 leading-tight group-hover:text-slate-600 transition-colors duration-300 ${isFeature ? "text-2xl md:text-3xl" : "text-lg"}`}>
            {event.title}
          </h3>

          <p className="text-sm text-slate-500 leading-relaxed mb-6 flex-1 line-clamp-2">
            {event.description}
          </p>

          {/* Meta Row */}
          <div className="flex items-center gap-4 text-[11px] text-slate-400 font-semibold mb-5">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3 h-3 text-slate-300" /> {event.location || "TBA"}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3 h-3 text-slate-300" /> {event.date ? event.date.split('T')[0] : "Upcoming"}
            </span>
          </div>

          {/* Divider */}
          <div className="h-px bg-slate-100 mb-5" />

          {/* Footer */}
          <div className="flex items-center justify-between">
            <Countdown targetDate={event.date} />
            <div className="flex items-center gap-1.5 text-[10px] font-black text-slate-400 uppercase tracking-widest">
              <Users className="w-3 h-3" /> {event.attendees ?? "—"}
            </div>
          </div>
        </div>

        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-slate-900 via-slate-600 to-slate-900 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
      </div>
    </motion.article>
  );
};

// ─── Events Page ──────────────────────────────────────────────────────────────
const Events = () => {
  const { events } = useData();
  const [searchParams, setSearchParams] = useSearchParams();
  const eventId = searchParams.get("id");
  const [selectedEventId, setSelectedEventId] = useState<string | null>(eventId);
  const [activeFilter, setActiveFilter] = useState("All");
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  useEffect(() => {
    setSelectedEventId(eventId || null);
  }, [eventId]);

  const handleOpenEvent = (id: string) => {
    setSearchParams({ id });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCloseEvent = () => setSearchParams({});
  const selectedEvent = events.find((e) => e.id === selectedEventId);

  // ── Detail View ─────────────────────────────────────────────────────────────
  if (selectedEventId && selectedEvent) {
    return (
      <div className="min-h-screen bg-[#F7F6F2]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,700;0,9..40,900;1,9..40,400&family=Playfair+Display:ital,wght@0,700;0,900;1,700&display=swap');`}</style>
        <SEO title={selectedEvent.title} description={selectedEvent.description} />


        <main>
          {/* Hero */}
          <section className="relative h-[70vh] min-h-[540px] overflow-hidden">
            {selectedEvent.banner ? (
              <img src={selectedEvent.banner} alt={selectedEvent.title} width="1200" height="700" className="absolute inset-0 w-full h-full object-cover" />
            ) : (
              <div className="absolute inset-0 bg-slate-900" />
            )}
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-[#F7F6F2]" />

            <div className="absolute inset-0 flex flex-col justify-end px-8 md:px-16 pb-16">
              <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}>
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white text-xs font-black uppercase tracking-[0.2em] mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {selectedEvent.type || "Event"}
                </span>
                <h1 style={{ fontFamily: "'Playfair Display', serif" }}
                  className="text-3xl sm:text-5xl md:text-6xl lg:text-8xl font-black text-white leading-[0.9] mb-4 max-w-4xl">
                  {selectedEvent.title}
                </h1>
              </motion.div>
            </div>
          </section>

          {/* Content */}
          <section className="px-4 sm:px-8 md:px-16 py-12 sm:py-20 max-w-[1400px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="lg:col-span-2 bg-white rounded-[2.5rem] p-10 md:p-14 border border-slate-100"
              >
                {/* Back Button */}
                <button
                  onClick={handleCloseEvent}
                  className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-slate-900 transition-all duration-300 mb-8 group"
                >
                  <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  Back to Events
                </button>

                <div className="flex items-center gap-3 mb-8">
                  <div className="w-8 h-0.5 bg-slate-900" />
                  <span className="text-xs font-black uppercase tracking-[0.3em] text-slate-400">About</span>
                </div>
                <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-medium whitespace-pre-line">
                  {selectedEvent.description}
                </p>
              </motion.div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Quick Stats */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="bg-slate-900 rounded-[2.5rem] p-8 text-white"
                >
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-6 h-0.5 bg-white/30" />
                    <span className="text-xs font-black uppercase tracking-[0.3em] text-white/40">Details</span>
                  </div>
                  <div className="space-y-7">
                    <div>
                      <div className="text-[10px] uppercase tracking-widest text-white/30 font-black mb-2 flex items-center gap-2">
                        <MapPin className="w-3 h-3" /> Venue
                      </div>
                      <div className="text-lg font-black">{selectedEvent.location || "TBA"}</div>
                    </div>
                    <div className="h-px bg-white/10" />
                    <div>
                      <div className="text-[10px] uppercase tracking-widest text-white/30 font-black mb-2 flex items-center gap-2">
                        <Calendar className="w-3 h-3" /> Date
                      </div>
                      <div className="text-lg font-black">{selectedEvent.date ? selectedEvent.date.split('T')[0] : "TBA"}</div>
                    </div>
                    <div className="h-px bg-white/10" />
                    <div>
                      <div className="text-[10px] uppercase tracking-widest text-white/30 font-black mb-2 flex items-center gap-2">
                        <Users className="w-3 h-3" /> Attendees
                      </div>
                      <div className="text-3xl font-black">{selectedEvent.attendees ?? "—"}</div>
                    </div>
                  </div>
                </motion.div>

                {/* CTA */}
                {selectedEvent.registration_link && (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    <button
                      onClick={() => window.open(selectedEvent.registration_link, "_blank")}
                      className="w-full py-5 rounded-2xl bg-slate-900 text-white font-black text-sm uppercase tracking-widest hover:bg-slate-700 transition-all duration-300 flex items-center justify-center gap-3 group"
                    >
                      Register Now <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </motion.div>
                )}
              </div>

              {/* Gallery */}
              {selectedEvent.posters && selectedEvent.posters.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="lg:col-span-3 bg-slate-950 rounded-[2.5rem] p-8 md:p-12"
                >
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-6 h-0.5 bg-white/20" />
                    <span className="text-xs font-black uppercase tracking-[0.3em] text-white/30">Gallery</span>
                  </div>
                  <div className="h-96">
                    <PosterCarousel posters={selectedEvent.posters} />
                  </div>
                </motion.div>
              )}

            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  // ── List View ─────────────────────────────────────────────────────────────
  const filters = ["All", "Conference", "Workshop", "Hackathon", "Meetup"];

  return (
    <div className="min-h-screen bg-[#F7F6F2]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,700;0,9..40,900;1,9..40,400&family=Playfair+Display:ital,wght@0,700;0,900;1,700&display=swap');

        .event-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
        @media (max-width: 1024px) { .event-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 640px)  { .event-grid { grid-template-columns: 1fr; } }

        .marquee-track {
          display: flex;
          gap: 3rem;
          animation: marquee 28s linear infinite;
          white-space: nowrap;
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>

      <SEO title="Events" description="Stay updated with UNAI TECH's global events, conferences, and workshops on AI and engineering." />

      <main className="pt-0 min-h-screen">

        {/* ── Hero Section ──────────────────────────────────────────────────── */}
        <section ref={heroRef} className="relative overflow-hidden pt-28 sm:pt-36 pb-16 sm:pb-28 px-4 sm:px-8 md:px-16" style={{ background: "linear-gradient(135deg, #0a0f1e 0%, #0d1a3a 40%, #0a1628 70%, #060c18 100%)" }}>

          {/* Animated grid overlay */}
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: `linear-gradient(rgba(59,130,246,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.06) 1px, transparent 1px)`,
            backgroundSize: "80px 80px"
          }} />

          {/* Blue radial glow — top left */}
          <div className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(59,130,246,0.18) 0%, transparent 70%)" }} />

          {/* Accent glow — bottom right */}
          <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)" }} />

          {/* Decorative year watermark */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[28vw] font-black pointer-events-none select-none leading-none" style={{ fontFamily: "'Playfair Display', serif", color: "rgba(59,130,246,0.04)" }}>
            UNAI
          </div>

          <div className="relative max-w-[1400px] mx-auto">

            {/* Top label row */}
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
              className="flex items-center gap-4 mb-12"
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-[10px] font-black uppercase tracking-[0.3em]">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                UNAI TECH — Live Events
              </span>
              <div className="flex-1 h-px bg-gradient-to-r from-blue-500/20 to-transparent" />
            </motion.div>

            {/* Main content split */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-end">

              {/* Left — Title */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
              >
                <h1 className="font-black leading-[0.88] tracking-tight mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                  <span className="block text-white" style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}>EVENTS</span>

                </h1>

                {/* Stat row */}
                <div className="flex flex-wrap items-center gap-3 mt-8">
                  {[
                    { val: `${events.length || "10"}+`, label: "Events" },
                    { val: `${events.length > 0 ? events.reduce((s, e) => s + Number(e.attendees || 0), 0).toLocaleString() : "1,200"}+`, label: "Registered" },
                    { val: "2026", label: "Season" },
                  ].map((stat) => (
                    <div key={stat.label} className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
                      <span className="text-lg font-black text-white tabular-nums">{stat.val}</span>
                      <span className="text-[10px] font-black uppercase tracking-widest text-white/30">{stat.label}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Right — Description + avatars */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
                className="lg:pb-2"
              >
                {/* Decorative quote mark */}
                <div className="text-6xl font-black text-blue-500/20 leading-none mb-2" style={{ fontFamily: "Georgia, serif" }}>"</div>
                <p className="text-slate-300 text-lg leading-relaxed mb-8 max-w-md">
                  Where engineers, researchers, and visionaries converge to shape the intelligent future.
                </p>

                {/* Avatar cluster */}
                <div
                  className="flex items-center gap-4 cursor-pointer group/join"
                  onClick={() => window.open("https://whatsapp.com/channel/0029VbCQWlU3LdQU6jeDnS11", "_blank")}
                >
                  <div className="flex -space-x-3">
                    {[
                      "/Madhan_Kumar_P.JPG.jpeg",
                      "/Kamalesh_S.JPG.jpeg",
                      "/WhatsApp Image 2026-03-03 at 2.13.21 PM.jpeg",
                      "/Anjali_M.JPG.jpeg"
                    ].map((img, i) => (
                      <div key={i} className="w-10 h-10 rounded-full border-2 border-[#0a0f1e] overflow-hidden bg-slate-800">
                        <img src={img} alt="Team" className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                  <div>
                    <div className="text-sm font-black text-white group-hover/join:text-blue-400 transition-colors flex items-center gap-1.5">
                      Join the community
                      <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover/join:opacity-100 group-hover/join:translate-x-0 transition-all" />
                    </div>
                    <div className="text-xs text-slate-500 font-medium">Innovators worldwide</div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent mt-14 mb-8" />

            {/* Filter Pills */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-wrap gap-2.5"
            >
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300 ${activeFilter === f
                    ? "bg-blue-500 text-white shadow-lg shadow-blue-500/30"
                    : "bg-white/5 text-white/40 hover:bg-white/10 hover:text-white/70 border border-white/10"
                    }`}
                >
                  {f}
                </button>
              ))}
            </motion.div>

          </div>
        </section>

        {/* ── Marquee ticker ──────────────────────────────────────────────── */}
        <div className="bg-slate-900 border-y border-white/5 py-3 overflow-hidden">
          <div className="marquee-track">
            {[...Array(2)].map((_, i) =>
              ["Conference", "Workshop", "Hackathon", "Symposium", "Demo Day", "Roundtable", "Keynote", "Summit"].map((t, j) => (
                <span key={`${i}-${j}`} className="text-xs font-black uppercase tracking-[0.3em] text-white/20 flex items-center gap-3">
                  {t} <span className="text-white/10">✦</span>
                </span>
              ))
            )}
          </div>
        </div>

        {/* ── Event Grid ─────────────────────────────────────────────────── */}
        <section className="px-4 sm:px-8 md:px-16 py-12 sm:py-16 md:py-24">
          <div className="max-w-[1400px] mx-auto">

            {events.length > 0 ? (
              <div className="event-grid">
                {events.map((event, i) => (
                  <EventCard key={event.id} event={event} index={i} onClick={() => handleOpenEvent(event.id)} />
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                className="text-center py-40"
              >
                <div className="w-20 h-20 rounded-[1.5rem] bg-white border border-slate-100 flex items-center justify-center mx-auto mb-8 shadow-sm">
                  <Calendar className="w-8 h-8 text-slate-200" />
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-2">No Upcoming Events</h3>
                <p className="text-slate-400 text-sm">Stay tuned for more updates soon.</p>
              </motion.div>
            )}
          </div>
        </section>

        {/* ── Newsletter Strip ─────────────────────────────────────────────── */}
        <section className="px-4 sm:px-8 md:px-16 pb-16 sm:pb-24">
          <div className="max-w-[1400px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.8 }}
              className="relative overflow-hidden rounded-[3rem] bg-slate-900 px-6 sm:px-10 md:px-16 py-10 sm:py-14 flex flex-col md:flex-row items-center justify-between gap-8"
            >
              <div className="absolute inset-0 opacity-[0.04]" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
                backgroundSize: "256px 256px"
              }} />
              <div className="relative">
                <p className="text-xs font-black uppercase tracking-[0.3em] text-white/30 mb-3">Never miss an event</p>
                <h2 style={{ fontFamily: "'Playfair Display', serif" }}
                  className="text-3xl md:text-4xl font-black text-white leading-tight">
                  Get early access &<br />exclusive invites
                </h2>
              </div>
              <div className="relative flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 md:w-72 px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-white/20 text-sm font-medium focus:outline-none focus:border-white/30 transition-colors"
                />
                <button className="px-6 py-4 rounded-2xl bg-white text-slate-900 font-black text-sm whitespace-nowrap hover:bg-slate-100 transition-colors">
                  Subscribe
                </button>
              </div>
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
};

export default Events;