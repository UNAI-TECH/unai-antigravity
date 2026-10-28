import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  MapPin, 
  Users, 
  ArrowRight, 
  Clock, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  ArrowUpRight,
  Share2,
  Ticket,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Sparkles,
  Check
} from "lucide-react";
import { useData } from "@/context/DataContext";
import { useSearchParams } from "react-router-dom";
import SEO from "@/components/SEO";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

// ─── Registration Modal ──────────────────────────────────────────────────────────
const RegistrationModal = ({ event }: { event: any }) => {
  const { addEventRegistration } = useData();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<any>({});
  const [selectedRadio, setSelectedRadio] = useState<{ [fieldId: string]: string }>({});
  const [otherTextValues, setOtherTextValues] = useState<{ [fieldId: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // CRITICAL FIX: Lock body scroll & stop Lenis smooth scroll while modal is open
  // This allows native trackpad two-finger scrolling inside the popup without scrolling the background page.
  useEffect(() => {
    if (open) {
      if (typeof window !== "undefined" && window.lenis) {
        window.lenis.stop();
      }
      document.body.style.overflow = "hidden";
    } else {
      if (typeof window !== "undefined" && window.lenis) {
        window.lenis.start();
      }
      document.body.style.overflow = "";
    }
    return () => {
      if (typeof window !== "undefined" && window.lenis) {
        window.lenis.start();
      }
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate any selected "Other" fields that are required
    if (event.form_fields && Array.isArray(event.form_fields)) {
      for (const field of event.form_fields) {
        if (field.type === 'multiple_choice' && field.required) {
          const selected = selectedRadio[field.id];
          const isOther = selected && (selected.trim().toLowerCase() === 'other' || selected.trim().toLowerCase() === 'others');
          if (isOther && (!otherTextValues[field.id] || !otherTextValues[field.id].trim())) {
            toast.error(`Please specify your answer for "${field.label}"`);
            return;
          }
        }
      }
    }

    setIsSubmitting(true);
    
    // Extract default fields
    const name = formData['name'] || '';
    const email = formData['email'] || '';
    const phone = formData['phone'] || '';

    // Extract dynamic answers
    const answers = { ...formData };
    delete answers['name'];
    delete answers['email'];
    delete answers['phone'];

    try {
      await addEventRegistration({
        event_id: event.id,
        applicant_name: name,
        email,
        phone,
        answers,
      });
      toast.success("Registration Successful!");
      setFormData({});
      setSelectedRadio({});
      setOtherTextValues({});
      setOpen(false);
    } catch (error: any) {
      toast.error(error?.message || "Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFieldChange = (key: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [key]: value }));
  };

  const handleRadioChange = (field: any, opt: string) => {
    setSelectedRadio(prev => ({ ...prev, [field.id]: opt }));
    const isOther = opt.trim().toLowerCase() === 'other' || opt.trim().toLowerCase() === 'others';
    if (isOther) {
      const custom = otherTextValues[field.id]?.trim();
      handleFieldChange(field.label, custom ? `Other: ${custom}` : 'Other');
    } else {
      handleFieldChange(field.label, opt);
    }
  };

  const handleOtherInputChange = (field: any, customText: string) => {
    setOtherTextValues(prev => ({ ...prev, [field.id]: customText }));
    handleFieldChange(field.label, customText.trim() ? `Other: ${customText.trim()}` : 'Other');
  };

  const handleCheckboxChange = (field: any, value: string, checked: boolean) => {
      setFormData((prev: any) => {
          const current = prev[field.label] || [];
          if (checked) {
              return { ...prev, [field.label]: [...current, value] };
          } else {
              return { ...prev, [field.label]: current.filter((v: string) => v !== value) };
          }
      });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="w-full py-4 sm:py-5 rounded-2xl bg-gradient-to-r from-blue-600 via-primary to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black text-sm uppercase tracking-wider shadow-lg shadow-blue-500/25 transition-all duration-300 flex items-center justify-center gap-3 group cursor-pointer">
          Register Now <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </DialogTrigger>
      <DialogContent 
        data-lenis-prevent
        onWheel={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
        className="sm:max-w-[620px] w-[95vw] bg-white text-slate-900 border border-slate-200 p-6 sm:p-8 rounded-[2rem] max-h-[88vh] overflow-y-auto custom-scrollbar shadow-2xl overscroll-contain"
        style={{ overscrollBehavior: 'contain' }}
      >
        <DialogHeader className="mb-5 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-primary">Registration Open</span>
          </div>
          <DialogTitle className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
            Register for {event.title}
          </DialogTitle>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">Please fill in your details below to secure your entry pass.</p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Default Fields */}
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5 block">Full Name *</label>
              <Input 
                required 
                onChange={(e) => handleFieldChange("name", e.target.value)} 
                placeholder="e.g. John Doe"
                className="bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 h-11 rounded-xl focus:border-primary focus:bg-white" 
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5 block">Email Address *</label>
                  <Input 
                    type="email" 
                    required 
                    onChange={(e) => handleFieldChange("email", e.target.value)} 
                    placeholder="john@example.com"
                    className="bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 h-11 rounded-xl focus:border-primary focus:bg-white" 
                  />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5 block">Phone Number *</label>
                  <Input 
                    type="tel" 
                    required 
                    onChange={(e) => handleFieldChange("phone", e.target.value)} 
                    placeholder="+91 98765 43210"
                    className="bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 h-11 rounded-xl focus:border-primary focus:bg-white" 
                  />
                </div>
            </div>
          </div>

          {/* Dynamic Fields */}
          {event.form_fields && event.form_fields.length > 0 && (
            <div className="space-y-5 pt-5 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black uppercase tracking-wider text-slate-800">Additional Information</span>
                  <div className="flex-1 h-px bg-slate-100" />
                </div>
                {event.form_fields.map((field: any) => (
                    <div key={field.id} className="space-y-2">
                        <label className="text-xs font-bold text-slate-700 block">
                            {field.label} {field.required && <span className="text-red-500">*</span>}
                        </label>
                        
                        {field.type === 'short_answer' && (
                            <Input 
                                required={field.required} 
                                onChange={(e) => handleFieldChange(field.label, e.target.value)}
                                placeholder="Your answer..."
                                className="bg-slate-50 border-slate-200 text-slate-900 h-10 rounded-xl focus:border-primary focus:bg-white"
                            />
                        )}

                        {field.type === 'long_answer' && (
                            <Textarea 
                                required={field.required} 
                                onChange={(e) => handleFieldChange(field.label, e.target.value)}
                                placeholder="Provide your detailed answer..."
                                className="bg-slate-50 border-slate-200 text-slate-900 resize-none h-24 rounded-xl focus:border-primary focus:bg-white"
                            />
                        )}

                        {field.type === 'multiple_choice' && (
                            <div className="space-y-2.5 pt-1">
                                {field.options.map((opt: string, i: number) => {
                                    const isOther = opt.trim().toLowerCase() === 'other' || opt.trim().toLowerCase() === 'others';
                                    const isSelected = selectedRadio[field.id] === opt;

                                    return (
                                        <div key={i} className="space-y-2">
                                            <label className="flex items-center gap-3 cursor-pointer p-2 rounded-xl hover:bg-slate-50 transition-colors">
                                                <input 
                                                    type="radio" 
                                                    name={`field_${field.id}`} 
                                                    required={field.required && !selectedRadio[field.id]}
                                                    value={opt}
                                                    checked={selectedRadio[field.id] === opt}
                                                    onChange={() => handleRadioChange(field, opt)}
                                                    className="w-4 h-4 accent-primary cursor-pointer"
                                                />
                                                <span className="text-sm font-medium text-slate-800">{opt}</span>
                                            </label>

                                            {isOther && isSelected && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: -4 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    className="pl-7 pt-1"
                                                >
                                                    <Input
                                                        placeholder="Please specify your other answer..."
                                                        required={field.required}
                                                        value={otherTextValues[field.id] || ""}
                                                        onChange={(e) => handleOtherInputChange(field, e.target.value)}
                                                        className="bg-slate-50 border-slate-300 text-slate-900 text-sm h-10 rounded-xl focus:border-primary focus:bg-white"
                                                        autoFocus
                                                    />
                                                </motion.div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        )}

                        {field.type === 'checkboxes' && (
                            <div className="space-y-2 pt-1">
                                {field.options.map((opt: string, i: number) => {
                                    const isOther = opt.trim().toLowerCase() === 'other' || opt.trim().toLowerCase() === 'others';
                                    const checked = (formData[field.label] || []).some((v: string) => v === opt || v.startsWith(`Other:`));

                                    return (
                                        <div key={i} className="space-y-2">
                                            <label className="flex items-center gap-3 cursor-pointer p-2 rounded-xl hover:bg-slate-50 transition-colors">
                                                <input 
                                                    type="checkbox" 
                                                    value={opt}
                                                    checked={checked}
                                                    onChange={(e) => {
                                                        const isChecked = e.target.checked;
                                                        if (isOther) {
                                                            const custom = otherTextValues[field.id]?.trim();
                                                            const val = custom ? `Other: ${custom}` : 'Other';
                                                            handleCheckboxChange(field, val, isChecked);
                                                        } else {
                                                            handleCheckboxChange(field, opt, isChecked);
                                                        }
                                                    }}
                                                    className="w-4 h-4 rounded accent-primary cursor-pointer"
                                                />
                                                <span className="text-sm font-medium text-slate-800">{opt}</span>
                                            </label>

                                            {isOther && checked && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: -4 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    className="pl-7 pt-1"
                                                >
                                                    <Input
                                                        placeholder="Please specify your other answer..."
                                                        value={otherTextValues[field.id] || ""}
                                                        onChange={(e) => {
                                                            const val = e.target.value;
                                                            setOtherTextValues(prev => ({ ...prev, [field.id]: val }));
                                                            setFormData((prev: any) => {
                                                                const current: string[] = prev[field.label] || [];
                                                                const filtered = current.filter(c => c !== 'Other' && !c.startsWith('Other:'));
                                                                const newVal = val.trim() ? `Other: ${val.trim()}` : 'Other';
                                                                return { ...prev, [field.label]: [...filtered, newVal] };
                                                            });
                                                        }}
                                                        className="bg-slate-50 border-slate-300 text-slate-900 text-sm h-10 rounded-xl focus:border-primary focus:bg-white"
                                                        autoFocus
                                                    />
                                                </motion.div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                ))}
            </div>
          )}

          <div className="pt-4 border-t border-slate-100">
            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 via-primary to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm tracking-wide shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
            >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Submitting Registration...
                  </>
                ) : (
                  <>
                    Complete Registration
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
            </button>
            <p className="text-[11px] text-center text-slate-400 mt-2">Your information is securely verified and will only be used for event admission.</p>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

// ─── Poster Carousel ───────────────────────────────────────────────────────────
const PosterCarousel = ({ posters }: { posters: string[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  if (!posters || posters.length === 0) return null;
  const next = () => setCurrentIndex((p) => (p + 1) % posters.length);
  const prev = () => setCurrentIndex((p) => (p - 1 + posters.length) % posters.length);

  return (
    <div className="relative group w-full h-full">
      <div className="relative overflow-hidden rounded-2xl h-full bg-black/60">
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
              className="absolute left-3 top-1/2 -translate-y-1/2 p-3 bg-black/60 hover:bg-black/90 rounded-full text-white backdrop-blur-md transition-all opacity-0 group-hover:opacity-100 border border-white/10"
              aria-label="Previous Poster"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-3 bg-black/60 hover:bg-black/90 rounded-full text-white backdrop-blur-md transition-all opacity-0 group-hover:opacity-100 border border-white/10"
              aria-label="Next Poster"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {posters.map((_, idx) => (
                <button key={idx} onClick={() => setCurrentIndex(idx)}
                  className={`h-1.5 rounded-full transition-all duration-500 ${idx === currentIndex ? "bg-white w-6" : "bg-white/30 w-1.5"}`} 
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// ─── Countdown Timer ──────────────────────────────────────────────────────────
const Countdown = ({ targetDate, dark = false }: { targetDate?: string; dark?: boolean }) => {
  const [time, setTime] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    const target = targetDate ? new Date(targetDate).getTime() : NaN;
    if (isNaN(target)) {
        setTime({ d: 0, h: 0, m: 0, s: 0 });
        return;
    }
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
    <div className="flex items-center gap-1.5 sm:gap-2">
      {units.map((u, i) => (
        <div key={u.label} className="flex items-center gap-1.5 sm:gap-2">
          <div className="text-center min-w-[28px] sm:min-w-[34px]">
            <div className={`font-mono text-xs sm:text-sm font-black tabular-nums leading-none ${dark ? 'text-white' : 'text-slate-900'}`}>{u.val}</div>
            <div className={`text-[8px] uppercase tracking-wider font-semibold mt-0.5 ${dark ? 'text-slate-400' : 'text-slate-400'}`}>{u.label}</div>
          </div>
          {i < units.length - 1 && <span className={`text-xs font-light mb-2 ${dark ? 'text-white/20' : 'text-slate-300'}`}>:</span>}
        </div>
      ))}
    </div>
  );
};

// ─── Event Card (1:1 Ratio Cover Image, Clean Card Layout) ────────────────────
const EventCard = ({ event, index, onClick }: { event: any; index: number; onClick: () => void }) => {
  const displayImage = event.cover_image || event.banner;

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: index * 0.06, ease: [0.23, 1, 0.32, 1] }}
      onClick={onClick}
      className="group relative cursor-pointer flex flex-col h-full rounded-[2rem] bg-white border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-500 overflow-hidden"
    >
      {/* Cover Image Container - STRICTLY 1:1 RATIO */}
      <div className="relative w-full aspect-square overflow-hidden bg-slate-950 flex-shrink-0">
        {displayImage ? (
          <img 
            src={displayImage} 
            alt={event.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" 
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 flex items-center justify-center">
            <Calendar className="w-12 h-12 text-slate-600" />
          </div>
        )}

        {/* Soft gradient overlay for pill readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

        {/* Top Floating Badges */}
        <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/65 backdrop-blur-md text-[11px] font-bold uppercase tracking-wider text-white border border-white/20 shadow-md">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {event.type || "Event"}
          </span>

          <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 -translate-y-1 group-hover:translate-y-0 transition-all duration-300">
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>

        {event.registration_type === 'manual' && (
          <div className="absolute bottom-3 left-3.5 pointer-events-none">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-blue-600/90 backdrop-blur-md text-[10px] font-bold text-white border border-white/20 shadow-sm">
              Manual Form
            </span>
          </div>
        )}
      </div>

      {/* Card Body with proper vertical distribution & NO cutoffs */}
      <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between bg-white gap-4">
        <div className="space-y-2">
          {/* Title */}
          <h3 className="font-extrabold text-slate-900 text-lg sm:text-xl leading-snug group-hover:text-primary transition-colors line-clamp-2">
            {event.title}
          </h3>

          {/* Caption / Description */}
          <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed">
            {event.caption || event.description}
          </p>
        </div>

        {/* Meta & Info */}
        <div className="space-y-3 pt-3 border-t border-slate-100">
          <div className="flex flex-col gap-1.5 text-xs text-slate-600">
            {/* Location with NO cutoff */}
            <div className="flex items-start gap-2">
              <MapPin className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
              <span className="font-medium line-clamp-1">{event.location || "Venue TBA"}</span>
            </div>

            {/* Date */}
            <div className="flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-primary flex-shrink-0" />
              <span className="font-medium">{event.date ? event.date.split('T')[0] : "Date Upcoming"}</span>
            </div>
          </div>

          {/* Footer Action Row */}
          <div className="flex items-center justify-between pt-1">
            <Countdown targetDate={event.date} />
            <span className="text-xs font-bold text-primary group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
              Details <ChevronRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
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

  useEffect(() => {
    setSelectedEventId(eventId || null);
  }, [eventId]);

  const handleOpenEvent = (id: string) => {
    setSearchParams({ id });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCloseEvent = () => setSearchParams({});
  const selectedEvent = events.find((e) => e.id === selectedEventId);

  // ── Redesigned Event Preview / Detail Page (SEPARATE 3:1 ULTRA-WIDE HERO) ─────
  if (selectedEventId && selectedEvent) {
    const formattedDate = selectedEvent.date ? selectedEvent.date.split('T')[0] : "TBA";

    return (
      <div className="min-h-screen bg-[#F8FAFC] text-slate-900 selection:bg-primary/20 selection:text-primary relative" style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}>
        <SEO title={`${selectedEvent.title} | UNAI TECH Events`} description={selectedEvent.caption || selectedEvent.description} />

        {/* Subtle Ambient Glow */}
        <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[500px] bg-gradient-to-b from-blue-100/60 via-indigo-50/40 to-transparent blur-[140px] pointer-events-none -z-10" />

        {/* ── Separate Hero Section (ONLY for Banner Image) ──────── */}
        <section className="relative w-full pt-20 sm:pt-28 bg-[#F8FAFC]">
          {/* Top Navigation & Share Toolbar */}
          <div className="max-w-[1340px] mx-auto px-4 sm:px-8 md:px-12 mb-3 sm:mb-4 flex items-center justify-between">
            <button
              onClick={handleCloseEvent}
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 rounded-full bg-white hover:bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200 shadow-sm text-xs sm:text-sm font-semibold transition-all duration-300 group"
            >
              <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>Back to all Events</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  toast.success("Event link copied to clipboard!");
                }}
                className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 rounded-full bg-white hover:bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200 shadow-sm text-xs sm:text-sm font-semibold transition-all duration-300"
                title="Copy event link"
              >
                <Share2 className="w-3.5 h-3.5 text-primary" />
                <span>Share</span>
              </button>
            </div>
          </div>

          {/* Ultra-Wide Banner Container (Responsive aspect ratio without obscuring overlay badges) */}
          <div 
            className="relative w-full aspect-[2.2/1] sm:aspect-[2.6/1] md:aspect-[3/1] max-w-[1920px] mx-auto overflow-hidden bg-slate-950 border-y border-slate-200/90 shadow-sm group"
          >
            {selectedEvent.banner ? (
              <img
                src={selectedEvent.banner}
                alt={selectedEvent.title}
                className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-[1.01]"
              />
            ) : selectedEvent.cover_image ? (
              <img
                src={selectedEvent.cover_image}
                alt={selectedEvent.title}
                className="w-full h-full object-contain bg-slate-950 p-4"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-slate-100 via-slate-200 to-slate-100 flex flex-col items-center justify-center text-slate-400">
                <Calendar className="w-16 h-16 mb-2 opacity-50 text-slate-400" />
                <span className="text-sm font-semibold text-slate-600">UNAI TECH Special Event</span>
              </div>
            )}
          </div>
        </section>

        {/* ── Main Content Section (Below the Separate Hero Section) ──────── */}
        <main className="py-8 sm:py-14 px-4 sm:px-8 md:px-12 max-w-[1240px] mx-auto">
          {/* Event Header Block (Cleanly below the hero banner) */}
          <div className="mb-8 sm:mb-10">
            {/* Badges placed cleanly above title without overlaying banner */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 mb-3 sm:mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-white text-xs font-bold uppercase tracking-wider text-slate-900 border border-slate-200/90 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                {selectedEvent.type || "Conference"}
              </span>
              <span className="inline-flex items-center px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-blue-600 text-xs font-semibold text-white shadow-sm">
                {selectedEvent.status === 'past' ? 'Past Event' : 'Official Event'}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              {selectedEvent.title}
            </h1>
            {selectedEvent.caption && (
              <p className="text-base sm:text-xl text-primary font-semibold mt-2.5 sm:mt-3 leading-snug">
                {selectedEvent.caption}
              </p>
            )}

            {/* Key Info Cards Grid - Light Theme */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 mt-6">
              <div className="p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md hover:border-primary/40 transition-all">
                <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                  <Calendar className="w-3.5 h-3.5 text-primary shrink-0" /> Date
                </div>
                <div className="text-xs sm:text-base font-extrabold text-slate-900 truncate">{formattedDate}</div>
              </div>

              <div className="p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md hover:border-primary/40 transition-all">
                <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                  <MapPin className="w-3.5 h-3.5 text-primary shrink-0" /> Venue
                </div>
                <div className="text-xs sm:text-base font-extrabold text-slate-900 line-clamp-2 leading-tight" title={selectedEvent.location}>{selectedEvent.location || "TBA"}</div>
              </div>

              <div className="p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md hover:border-primary/40 transition-all">
                <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                  <Users className="w-3.5 h-3.5 text-primary shrink-0" /> Capacity
                </div>
                <div className="text-xs sm:text-base font-extrabold text-slate-900 truncate">{selectedEvent.attendees || "Open Access"}</div>
              </div>

              <div className="p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md hover:border-primary/40 transition-all">
                <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                  <Ticket className="w-3.5 h-3.5 text-primary shrink-0" /> Admission
                </div>
                <div className="text-xs sm:text-base font-extrabold text-slate-900 truncate">
                  {selectedEvent.registration_type === 'manual' ? "Direct Entry" : "Online Pass"}
                </div>
              </div>
            </div>
          </div>

          {/* 2-Column Content + Sticky Sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10">
            {/* Main Content (2 Columns) */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description Card */}
              <div className="p-6 sm:p-10 rounded-3xl bg-white border border-slate-200/90 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-1 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600" />
                  <h2 className="text-sm font-bold uppercase tracking-[0.25em] text-slate-500">About The Event</h2>
                </div>
                <p className="whitespace-pre-line text-slate-700 text-base sm:text-lg leading-relaxed font-normal">
                  {selectedEvent.description}
                </p>
              </div>

              {/* Cover Image Showcase - STRICTLY 1:1 RATIO */}
              {selectedEvent.cover_image && (
                <div className="p-6 sm:p-10 rounded-3xl bg-white border border-slate-200/90 shadow-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-1 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600" />
                    <h2 className="text-sm font-bold uppercase tracking-[0.25em] text-slate-500">Official Event Artwork</h2>
                  </div>
                  <div className="max-w-md mx-auto sm:mx-0 w-full aspect-square rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-slate-50 group">
                    <img
                      src={selectedEvent.cover_image}
                      alt={`${selectedEvent.title} Cover`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                </div>
              )}

              {/* Posters Gallery (if available) */}
              {selectedEvent.posters && selectedEvent.posters.length > 0 && (
                <div className="p-6 sm:p-10 rounded-3xl bg-white border border-slate-200/90 shadow-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-1 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600" />
                    <h2 className="text-sm font-bold uppercase tracking-[0.25em] text-slate-500">Event Posters & Media</h2>
                  </div>
                  <div className="w-full max-w-lg mx-auto aspect-[3/4] rounded-2xl overflow-hidden border border-slate-200 shadow-xl bg-slate-50">
                    <PosterCarousel posters={selectedEvent.posters} />
                  </div>
                </div>
              )}
            </div>

            {/* Sticky Action Sidebar (1 Column) */}
            <div className="space-y-6">
              <div className="lg:sticky lg:top-28 space-y-6">
                {/* Registration Card - Light Theme */}
                <div className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-primary/20 shadow-xl shadow-primary/5 relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 to-indigo-600" />

                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-primary block">Event Countdown</span>
                      <span className="text-xs text-slate-500">Live Registration Portal</span>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-bold border border-emerald-200">
                      Open
                    </span>
                  </div>

                  {/* Countdown Ticker - Light Theme */}
                  <div className="mb-6 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <Countdown targetDate={selectedEvent.date} dark={false} />
                  </div>

                  {/* Action CTA */}
                  {(selectedEvent.registration_link || selectedEvent.registration_type === 'manual') ? (
                    selectedEvent.registration_type === 'manual' ? (
                      <RegistrationModal event={selectedEvent} />
                    ) : (
                      <button
                        onClick={() => window.open(selectedEvent.registration_link, "_blank")}
                        className="w-full py-4 sm:py-5 rounded-2xl bg-gradient-to-r from-blue-600 via-primary to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black text-sm uppercase tracking-wider shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2 group cursor-pointer"
                      >
                        Register for Event
                        <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </button>
                    )
                  ) : (
                    <div className="w-full py-4 text-center text-sm font-semibold text-slate-500 bg-slate-100 rounded-2xl border border-slate-200">
                      Registrations Opening Soon
                    </div>
                  )}

                  {/* Value Props / Guarantees */}
                  <div className="mt-6 pt-6 border-t border-slate-100 space-y-2.5 text-xs text-slate-600">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-primary" />
                      <span>Instant digital confirmation & access pass</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Verified admission for registered attendees</span>
                    </div>
                  </div>
                </div>

                {/* Share Card */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm text-center">
                  <p className="text-xs text-slate-500 mb-3">Invite colleagues or students to this event</p>
                  <button
                    onClick={() => {
                      const shareText = `Check out ${selectedEvent.title} on UNAI TECH: ${window.location.href}`;
                      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`, "_blank");
                    }}
                    className="w-full py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold transition-colors flex items-center justify-center gap-2"
                  >
                    <span>Share on WhatsApp</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // ── List View ─────────────────────────────────────────────────────────────
  const filters = ["All", "Workshop", "AI Event", "Conference", "Webinar", "Meetup"];

  const filteredEvents = events
    .filter(event => {
      if (event.status === "draft") return false;
      if (activeFilter === "All") return true;
      return event.type === activeFilter;
    })
    .sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      // Sort by date - closest first
      if (isNaN(dateA)) return 1;
      if (isNaN(dateB)) return -1;
      return dateA - dateB;
    });

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
        <section className="relative overflow-hidden pt-28 sm:pt-36 pb-16 sm:pb-28 px-4 sm:px-8 md:px-16" style={{ background: "linear-gradient(135deg, #0a0f1e 0%, #0d1a3a 40%, #0a1628 70%, #060c18 100%)" }}>

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
                      "/Kishore_K.jpg.jpeg",
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

            {filteredEvents.length > 0 ? (
              <div className="event-grid">
                {filteredEvents.map((event, i) => (
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