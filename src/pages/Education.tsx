import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Footer } from "@/components/layout/Footer";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";
import { PremiumCTA } from "@/components/ui/PremiumCTA";
import SEO from "@/components/SEO";
import {
  ArrowRight,
  Check,
  BookOpen,
  Rocket,
  Users,
  Building2,
  GraduationCap,
  Trophy,
  Brain,
  Sparkles,
  Clock,
  MapPin,
  BadgeCheck,
  ChevronDown,
  Globe,
  Cpu,
  TrendingUp,
  Palette,
  Megaphone,
  BookOpenCheck,
  Smartphone,
  FlaskConical,
  Target,
  Languages,
  X,
} from "lucide-react";

/* ─── Animation helpers ─── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
});

const fadeLeft = (delay = 0) => ({
  initial: { opacity: 0, x: -40 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
});

const fadeRight = (delay = 0) => ({
  initial: { opacity: 0, x: 40 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
});

const scaleIn = (delay = 0) => ({
  initial: { opacity: 0, scale: 0.92 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
});

/* ─── Data ─── */
const programs = [
  {
    icon: Sparkles,
    color: "blue",
    badge: "1–2 Days",
    title: "AI & ML Workshops",
    desc: "Hands-on workshops designed to introduce and accelerate learning in Artificial Intelligence. Cover core ML concepts, prompt engineering, LLM fine-tuning, and real-world AI deployment strategies. Conducted at colleges and tech communities.",
    tags: ["Beginner to Intermediate", "Free / Subsidised"],
  },
  {
    icon: Rocket,
    color: "purple",
    badge: "4–8 Weeks",
    title: "Developer Bootcamps",
    desc: "Immersive, project-driven programs focused on building full-stack and AI-powered applications. Learn by working on real use cases using modern technologies aligned with industry standards.",
    tags: ["Project-Based Learning", "Certificate of Completion"],
  },
  {
    icon: Building2,
    color: "blue",
    badge: "2–6 Months",
    title: "Tech Internships",
    desc: "Gain real-world experience by contributing to live products and platforms. Work on production-level features, collaborate with teams, and build a strong portfolio through practical execution.",
    tags: ["Stipend Available", "Letter of Merit"],
  },
  {
    icon: BookOpen,
    color: "purple",
    badge: "On-site / Hybrid",
    title: "Corporate Training",
    desc: "Custom-designed AI training programs for organizations, tailored to different skill levels — from foundational AI literacy to advanced implementation and deployment.",
    tags: ["Enterprise Training", "Tamil / English"],
  },
  {
    icon: GraduationCap,
    color: "blue",
    badge: "Semester",
    title: "College Curriculum Programs",
    desc: "Structured semester-long AI programs developed in collaboration with engineering institutions. Designed to align with academic frameworks while integrating practical industry exposure.",
    tags: ["College Partnership", "MOU-Based"],
  },
  {
    icon: Trophy,
    color: "purple",
    badge: "Hackathon Prep",
    title: "Hackathon Prep — CODEKARX Track",
    desc: "Focused preparation programs for hackathon participants. Build skills across key domains with guided mentorship and structured learning paths. Tracks: AI/ML · Web Development · Cybersecurity · Data Analytics.",
    tags: ["codekarx.in", "Register Now"],
    externalLink: "https://codekarx.in",
  },
];

/* AI Essentials — 8 modules */
const essentialsModules = [
  { week: "M1", title: "AI Supercharge", desc: "AI for learning, research, and productivity. Workflow automation using AI tools.", outcome: "Personal AI system" },
  { week: "M2", title: "What is AI?", desc: "AI vs ML vs DL. Real-world use cases across industries.", outcome: "Concept clarity" },
  { week: "M3", title: "Prompt Engineering", desc: "Prompt structures, few-shot prompting, and output control.", outcome: "Build reusable prompts" },
  { week: "M4", title: "Vibe Coding", desc: "Prompt to code workflow. AI-assisted development in practice.", outcome: "Generate working code using AI" },
  { week: "M5", title: "UI / UX for Builders", desc: "Design fundamentals, wireframing, and AI UI tools.", outcome: "Design clean interfaces" },
  { week: "M6", title: "Bio-Coding", desc: "Intro to BioPython. AI in healthcare and interdisciplinary fields.", outcome: "Exposure to interdisciplinary AI" },
  { week: "M7", title: "Git / GitHub", desc: "Version control basics and team collaboration workflows.", outcome: "Manage code professionally" },
  { week: "M8", title: "Ship Your First App", desc: "Build a simple AI-powered app and deploy it live.", outcome: "First live product" },
];

/* AI Core Foundation — 8 modules */
const coreModules = [
  { week: "M1", title: "AI Systems Architecture", desc: "Input to model to output pipelines. Data pipelines explained.", outcome: "Understand AI system flow" },
  { week: "M2", title: "Large Language Models (LLMs)", desc: "Tokens, context window, and inference mechanics.", outcome: "Understand how LLMs work" },
  { week: "M3", title: "AI Evolution", desc: "1950 to present to 2050. Rule-based systems to Transformers.", outcome: "Historical and future perspective" },
  { week: "M4", title: "Web Systems (Web 2.0 to 3.0)", desc: "APIs and modern backend architectures.", outcome: "Understand backend ecosystem" },
  { week: "M5", title: "Git / GitHub (Advanced)", desc: "Branching, pull request workflows, and team collaboration.", outcome: "Work in real dev teams" },
  { week: "M6", title: "RAG Systems", desc: "Embeddings, vector databases, and retrieval pipelines.", outcome: "Build custom AI systems" },
  { week: "M7", title: "AI Agents", desc: "Tool calling, multi-step reasoning, and autonomous workflows.", outcome: "Build intelligent agents" },
  { week: "M8", title: "Automation Systems", desc: "APIs plus workflows. No-code and custom automation pipelines.", outcome: "Build automation systems" },
];

/* Legacy alias so the rest of the file compiles without change */
const bootcampWeeks = essentialsModules;

const internships = [
  {
    icon: Cpu,
    role: "AI / ML Engineer Intern",
    duration: "3–6 Months",
    desc: "Work on building intelligent systems that power next-generation digital products. This role involves developing, training, and deploying machine learning models using real-world datasets. You will contribute to model optimization, fine-tuning, and seamless integration of AI capabilities into production-grade applications.",
    skills: ["Python", "TensorFlow / PyTorch", "Hugging Face", "Supabase"],
  },
  {
    icon: Globe,
    role: "Full Stack Developer Intern",
    duration: "3–6 Months",
    desc: "Be part of a high-performance engineering team focused on delivering scalable digital solutions. You will design, develop, and deploy full-stack features across live platforms, working with modern frontend and backend technologies in a real-world multi-tenant environment.",
    skills: ["React Native", "Node.js", "Supabase", "Expo"],
  },
  {
    icon: TrendingUp,
    role: "Data & Analytics Intern",
    duration: "2–3 Months",
    desc: "Transform complex datasets into meaningful insights. This role focuses on building analytics pipelines, dashboards, and data-driven tools that support strategic decision-making across business and research domains.",
    skills: ["Python", "SQL", "Data Visualisation", "Power BI"],
  },
  {
    icon: Target,
    role: "Product & UX Research Intern",
    duration: "2–3 Months",
    desc: "Drive product excellence through research and strategy. You will conduct user research, analyze competitors, and create structured product documentation that guides development teams in building impactful digital experiences.",
    skills: ["User Research", "Figma", "Product Strategy", "Documentation"],
  },
  {
    icon: Palette,
    role: "Graphic Designer Intern",
    duration: "3–6 Months",
    desc: "Create visually compelling designs that reflect brand identity and enhance user engagement. You will work on digital assets, marketing creatives, and UI elements aligned with modern design standards.",
    skills: ["Adobe Creative Suite", "Figma", "Branding", "Visual Design"],
  },
  {
    icon: Megaphone,
    role: "Social Media Manager Intern",
    duration: "2–3 Months",
    desc: "Manage and grow digital presence across platforms. You will plan content strategies, execute campaigns, analyze engagement metrics, and build a strong online brand voice.",
    skills: ["Content Strategy", "Social Media Marketing", "Analytics", "Copywriting"],
  },
  {
    icon: BookOpenCheck,
    role: "Teaching Expert Intern",
    duration: "2–3 Months",
    desc: "Deliver high-quality learning experiences by teaching technical and non-technical concepts. You will design structured sessions, simplify complex topics, and support learners in achieving practical outcomes.",
    skills: ["Communication", "Subject Expertise", "Curriculum Design", "Presentation"],
  },
  {
    icon: Smartphone,
    role: "Mobile App Developer Intern",
    duration: "2–4 Months",
    desc: "Develop high-performance mobile applications with a focus on usability and scalability. You will work on building and optimizing mobile solutions, ensuring smooth user experiences and efficient backend integration.",
    skills: ["React Native / Flutter", "APIs", "UI/UX Principles", "App Deployment"],
  },
  {
    icon: FlaskConical,
    role: "Software Testing Intern",
    duration: "3–6 Months",
    desc: "Ensure product quality through systematic testing and validation. You will identify bugs, perform functional and performance testing, and contribute to delivering reliable and robust software solutions.",
    skills: ["Manual Testing", "Test Case Design", "Bug Tracking", "QA Processes"],
  },
];

type InternshipItem = typeof internships[number];

const workshops = [
  { num: "01", title: "Intro to Generative AI & LLMs", desc: "How ChatGPT, Claude, and Gemini actually work — transformers explained without the PhD.", level: "Beginner", duration: "4 Hours" },
  { num: "02", title: "Prompt Engineering Mastery", desc: "Build reliable AI features using system prompts, few-shot learning, chain-of-thought, and structured outputs.", level: "Intermediate", duration: "6 Hours" },
  { num: "03", title: "Build Your First AI App in 8 Hours", desc: "From zero to deployed AI product using React, Node.js, and an AI API. Teams ship a working app by end of day.", level: "Intermediate", duration: "Full Day" },
  { num: "04", title: "React Native for Mobile Developers", desc: "Build cross-platform apps using Expo and React Native — hands-on from setup to a working demo on your phone.", level: "Intermediate", duration: "8 Hours" },
  { num: "05", title: "ML Model Deployment at Scale", desc: "Production-grade ML: Docker, FastAPI, Supabase pgvector, and real embedding search with a live demo.", level: "Advanced", duration: "6 Hours" },
  { num: "06", title: "AI for Indian Entrepreneurs", desc: "How founders can use AI tools, automation, and low-code AI platforms to build and scale faster with lean teams.", level: "Beginner", duration: "3 Hours" },
];

const levelColor: Record<string, string> = {
  Beginner: "bg-emerald-50 text-emerald-600 border-emerald-100",
  Intermediate: "bg-amber-50 text-amber-600 border-amber-100",
  Advanced: "bg-red-50 text-red-600 border-red-100",
};

const stats = [
  { num: "500+", label: "Students Trained" },
  { num: "12+", label: "Active Programs" },
  { num: "40+", label: "Colleges Reached" },
  { num: "90%", label: "Placement Rate" },
];

const corporateBenefits = [
  { icon: Target, title: "Custom Curriculum", desc: "Built around your team's actual tools, stack, and business problems — not generic slides." },
  { icon: Languages, title: "Multilingual Delivery", desc: "Sessions in Tamil and English — technical AI explained in the language your team thinks in." },
  { icon: Cpu, title: "Cutting-Edge Tech", desc: "Work with cutting-edge tech driving real-world innovation to build future-ready solutions." },
  { icon: TrendingUp, title: "Increase Productivity", desc: "Enhance productivity with practical AI skills and boost output through applied AI techniques." },
];

/* ─── Flagship Bootcamp Track Slider ─── */
const cardRows = [
  { icon: Clock, label: "Duration", value: "8 Module Engineering Cycle" },
  { icon: MapPin, label: "Experience Mode", value: "Learn, Build, Deploy" },
  { icon: Users, label: "Cohort ", value: "Students - Freshers - IT Professionals" },
  { icon: BadgeCheck, label: "Outcome", value: "Shipped Product + Certificate" },
  { icon: Brain, label: "Mentors", value: "UNAI Tech Core Engineers" },
  { icon: Building2, label: "Placement", value: "Top performers → Internship" },
];

const EnrollCard = ({ id, onEnroll }: { id: string; onEnroll: () => void }) => (
  <div className="bg-slate-900 rounded-[2rem] overflow-hidden shadow-2xl">
    <div className="p-8 sm:p-10 bg-gradient-to-br from-blue-600/20 to-purple-600/10 border-b border-white/10">
      <h3 className="font-heading text-2xl font-bold text-white mb-1">UNAIs AI Supercharge '26</h3>
      <p className="text-slate-400 text-sm">Next cohort · Chennai · Limited seats</p>
      <div className="mt-6 flex items-baseline gap-3">
        <span className="font-heading text-4xl font-bold text-white">₹4,999</span>
        <span className="text-slate-500 line-through text-lg">₹14,999</span>
        <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">EARLY BIRD</span>
      </div>
    </div>
    <div className="p-8 sm:p-10 divide-y divide-white/10">
      {cardRows.map((row, i) => (
        <div key={i} className="flex items-center gap-4 py-4">
          <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0">
            <row.icon className="w-4 h-4 text-blue-400" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">{row.label}</p>
            <p className="text-white text-sm font-medium">{row.value}</p>
          </div>
        </div>
      ))}
    </div>
    <div className="px-8 sm:px-10 pb-8 sm:pb-10">
      <Button
        className="w-full h-14 rounded-2xl bg-blue-500 hover:bg-blue-600 text-white font-bold text-base shadow-xl shadow-blue-500/20 transition-all"
        onClick={onEnroll}
        id={id}
      >
        Start Now
        <ArrowRight className="ml-2 w-5 h-5" />
      </Button>
    </div>
  </div>
);

const TrackSlider = ({ scrollToEnroll }: { scrollToEnroll: () => void }) => {
  const [activeTrack, setActiveTrack] = useState<"essentials" | "core">("essentials");
  const isEssentials = activeTrack === "essentials";

  return (
    <motion.div {...fadeUp(0.1)}>
      {/* Track toggle */}
      <div className="flex justify-center mb-10">
        <div className="inline-flex rounded-2xl bg-slate-100 p-1.5 gap-1">
          <button
            id="edu-track-essentials"
            onClick={() => setActiveTrack("essentials")}
            className={`px-6 py-2.5 rounded-xl text-sm font-bold tracking-wide transition-all duration-300 ${isEssentials ? "bg-white text-blue-600 shadow-md" : "text-slate-500 hover:text-slate-700"
              }`}
          >
            AI Essentials
          </button>
          <button
            id="edu-track-core"
            onClick={() => setActiveTrack("core")}
            className={`px-6 py-2.5 rounded-xl text-sm font-bold tracking-wide transition-all duration-300 ${!isEssentials ? "bg-white text-blue-600 shadow-md" : "text-slate-500 hover:text-slate-700"
              }`}
          >
            AI Core Foundation
          </button>
        </div>
      </div>

      {/* Two-column grid — card slides left↔right */}
      <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-start">

        {/* LEFT column */}
        <AnimatePresence mode="wait">
          {isEssentials ? (
            <motion.div
              key="essentials-modules"
              initial={{ opacity: 0, x: -32 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -32 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="mb-6">
                <span className="inline-block px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold tracking-widest uppercase mb-3">
                  AI Essentials — 8 Modules
                </span>
                <p className="text-slate-500 text-sm">Goal: Turn beginners into AI-enabled builders</p>
              </div>
              <div className="flex flex-col divide-y divide-slate-100">
                {essentialsModules.map((w, i) => (
                  <div key={i} className="flex gap-4 py-4 group">
                    <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center font-heading font-bold text-xs text-blue-600 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all duration-300">
                      {w.week}
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-slate-900 mb-0.5 text-sm">{w.title}</h4>
                      <p className="text-slate-500 text-xs leading-relaxed mb-1">{w.desc}</p>
                      <span className="text-xs font-semibold text-blue-600">Outcome: {w.outcome}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="card-left"
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 80 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="lg:sticky lg:top-28"
            >
              <EnrollCard id="edu-bootcamp-apply-core-left" onEnroll={scrollToEnroll} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* RIGHT column */}
        <AnimatePresence mode="wait">
          {isEssentials ? (
            <motion.div
              key="card-right"
              initial={{ opacity: 0, x: -80 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -80 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="lg:sticky lg:top-28"
            >
              <EnrollCard id="edu-bootcamp-apply-essentials" onEnroll={scrollToEnroll} />
            </motion.div>
          ) : (
            <motion.div
              key="core-modules"
              initial={{ opacity: 0, x: 32 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 32 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="mb-6">
                <span className="inline-block px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold tracking-widest uppercase mb-3">
                  AI Core Foundation — 8 Modules
                </span>
                <p className="text-slate-500 text-sm">Goal: Build real AI engineering capability</p>
              </div>
              <div className="flex flex-col divide-y divide-slate-100">
                {coreModules.map((w, i) => (
                  <div key={i} className="flex gap-4 py-4 group">
                    <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center font-heading font-bold text-xs text-blue-600 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all duration-300">
                      {w.week}
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-slate-900 mb-0.5 text-sm">{w.title}</h4>
                      <p className="text-slate-500 text-xs leading-relaxed mb-1">{w.desc}</p>
                      <span className="text-xs font-semibold text-blue-600">Outcome: {w.outcome}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </motion.div>
  );
};

/* ─── Internship Detail Modal ─── */
const InternshipModal = ({
  intern,
  onClose,
  onApply,
}: {
  intern: InternshipItem;
  onClose: () => void;
  onApply: () => void;
}) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
    onClick={onClose}
  >
    <motion.div
      initial={{ scale: 0.92, y: 24, opacity: 0 }}
      animate={{ scale: 1, y: 0, opacity: 1 }}
      exit={{ scale: 0.92, y: 24, opacity: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      onClick={(e) => e.stopPropagation()}
      className="w-full max-w-2xl bg-white rounded-[2rem] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
    >
      {/* Header */}
      <div className="relative bg-slate-900 px-8 pt-10 pb-8">
        <div className="absolute top-0 right-0 w-48 h-48 bg-purple-500/10 blur-[80px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/10 blur-[80px] rounded-full pointer-events-none" />
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl hover:bg-white/10 text-white/60 hover:text-white transition-all"
          id="edu-intern-modal-close"
        >
          <X className="w-5 h-5" />
        </button>
        <div className="flex items-start gap-5 relative z-10">
          <div className="w-14 h-14 rounded-2xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center flex-shrink-0">
            <intern.icon className="w-7 h-7 text-purple-300" />
          </div>
          <div>
            <p className="text-purple-400 text-xs font-bold tracking-widest uppercase mb-1">Internship Opportunity</p>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-1">{intern.role}</h2>
            <span className="inline-flex items-center gap-1.5 text-slate-400 text-sm">
              <Clock className="w-4 h-4" /> {intern.duration}
            </span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-8 overflow-y-auto flex-1">
        <h3 className="font-heading font-bold text-slate-900 text-base mb-2">Role Overview</h3>
        <p className="text-slate-500 text-sm leading-relaxed mb-6">{intern.desc}</p>

        <h3 className="font-heading font-bold text-slate-900 text-base mb-3">Key Skills</h3>
        <div className="flex flex-wrap gap-2 mb-8">
          {intern.skills.map((s, i) => (
            <span key={i} className="inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700">
              <Check className="w-3.5 h-3.5 text-blue-500" strokeWidth={3} />
              {s}
            </span>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            id="edu-intern-modal-apply"
            className="flex-1 h-12 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-xl shadow-blue-500/20 transition-all"
            onClick={onApply}
          >
            Apply Now on Careers Page
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            className="h-12 px-6 rounded-2xl border-slate-200 text-slate-600 hover:border-slate-300"
            onClick={onClose}
          >
            Close
          </Button>
        </div>
      </div>
    </motion.div>
  </motion.div>
);

/* ─── Component ─── */
const Education = () => {
  const navigate = useNavigate();
  const enrollRef = useRef<HTMLElement>(null);
  const [selectedIntern, setSelectedIntern] = useState<InternshipItem | null>(null);

  const scrollToEnroll = () => {
    enrollRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleApplyNow = () => {
    setSelectedIntern(null);
    navigate("/careers");
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <SEO
        title="UNAI Tech — Education & Training (EDU)"
        description="Hands-on workshops, intensive bootcamps, real-world internships, and corporate training — engineered to turn students into builders of indigenous Indian AI."
      />

      {/* Internship Detail Modal */}
      <AnimatePresence>
        {selectedIntern && (
          <InternshipModal
            intern={selectedIntern}
            onClose={() => setSelectedIntern(null)}
            onApply={handleApplyNow}
          />
        )}
      </AnimatePresence>

      <main className="pt-0">
        {/* ══════════════════════════════════════════
            1 — HERO
        ══════════════════════════════════════════ */}
        <section className="relative pb-8 px-4 sm:px-6 lg:px-10" id="hero">
          <div className="max-w-[1920px] mx-auto relative overflow-hidden rounded-[2.5rem] bg-slate-900 shadow-2xl">
            {/* Background gradient layers */}
            <div className="absolute inset-0 z-0 overflow-hidden rounded-[2.5rem]">
              <div className="absolute inset-0 bg-gradient-to-br from-[#0f2044] via-[#0f172a] to-[#1a1040]" />
              <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-purple-600/10 mix-blend-screen" />
              <div
                className="absolute inset-0 opacity-[0.04]"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(99,102,241,1) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,1) 1px, transparent 1px)",
                  backgroundSize: "60px 60px",
                }}
              />
              <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[80%] bg-blue-500/15 blur-[120px] rounded-full pointer-events-none" />
              <div className="absolute bottom-[-30%] right-[-10%] w-[70%] h-[90%] bg-purple-500/15 blur-[140px] rounded-full pointer-events-none" />
            </div>

            <div className="relative z-10 pt-24 sm:pt-36 pb-20 sm:pb-36 px-4 sm:px-8 max-w-5xl mx-auto text-center">
              <motion.div {...fadeUp(0)}>
                <span className="inline-flex items-center gap-2 px-5 py-2 mb-8 rounded-full bg-white/10 backdrop-blur-lg border border-white/10 text-white/80 text-sm font-semibold tracking-wide">
                  <GraduationCap className="w-4 h-4 text-blue-400" />
                  UNAI TECH · EDUCATION 2.0
                </span>

                <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight leading-[1.05]">
                  Build{" "}
                  <span className="bg-gradient-to-r from-blue-400 to-purple-300 bg-clip-text text-transparent">
                    India's
                  </span>{" "}
                  Next&nbsp;Gen
                  <br className="hidden sm:block" /> of{" "}
                  <span className="bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
                    AI Engineers
                  </span>
                </h1>

                <p className="text-base sm:text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
                  Hands-on workshops, intensive bootcamps, real-world internships, and corporate training — engineered to turn students into builders of indigenous Indian AI.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    className="h-14 px-10 rounded-2xl bg-blue-500 hover:bg-blue-600 text-white shadow-2xl shadow-blue-500/20 font-bold transition-all"
                    onClick={scrollToEnroll}
                    id="edu-hero-enroll"
                  >
                    Apply Now
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                  <Button
                    variant="outline"
                    className="h-14 px-10 rounded-2xl border-white/20 bg-white/5 backdrop-blur-md text-white hover:bg-white/10 font-bold transition-all"
                    onClick={() => {
                      document.getElementById("programs")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    id="edu-hero-explore"
                  >
                    Explore Programs
                  </Button>
                </div>
              </motion.div>

              {/* Stats row */}
              <motion.div
                {...fadeUp(0.2)}
                className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 border-t border-white/10 pt-12"
              >
                {stats.map((s, i) => (
                  <div key={i} className="text-center">
                    <p className="font-heading text-3xl sm:text-4xl font-bold text-white mb-1">{s.num}</p>
                    <p className="text-xs sm:text-sm text-white/50 uppercase tracking-widest">{s.label}</p>
                  </div>
                ))}
              </motion.div>

              {/* Scroll cue */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="mt-10 flex justify-center"
              >
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                >
                  <ChevronDown className="w-6 h-6 text-white/30" />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            1b — CODEKARX HACKATHON AD
        ══════════════════════════════════════════ */}
        <section className="px-4 sm:px-6 lg:px-10 py-6">
          <motion.div
            {...fadeUp(0)}
            className="max-w-[1920px] mx-auto relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#0a0f1e] via-[#0d1a3a] to-[#1a0a2e] shadow-2xl border border-white/5"
          >
            {/* Background glows */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute -top-20 -left-20 w-72 h-72 bg-cyan-500/20 blur-[100px] rounded-full" />
              <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-purple-500/20 blur-[120px] rounded-full" />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
              {/* Grid lines */}
              <div
                className="absolute inset-0 opacity-[0.035]"
                style={{
                  backgroundImage: "linear-gradient(rgba(0,229,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,1) 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                }}
              />
            </div>

            <div className="relative z-10 px-6 sm:px-12 lg:px-20 py-12 sm:py-16 flex flex-col lg:flex-row items-center justify-between gap-10">
              {/* Left: Text content */}
              <div className="flex-1 text-center lg:text-left">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-cyan-300 text-xs font-bold tracking-widest uppercase mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  National Online Hackathon
                </div>

                {/* Headline */}
                <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-[1.05] mb-3 tracking-tight">
                  Build.{" "}
                  <span className="bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">Innovate.</span>{" "}
                  <span className="bg-gradient-to-r from-purple-300 to-pink-400 bg-clip-text text-transparent">Transform.</span>
                </h2>

                {/* Sub-headline */}
                <p className="text-white/70 text-base sm:text-lg max-w-xl lg:max-w-none mb-3 leading-relaxed">
                  India's premier national online hackathon for college students and professionals — solve real-world problems, build working solutions, and get evaluated by top industry experts.
                </p>

                {/* Supporting line */}
                <p className="text-cyan-400/80 text-sm font-semibold tracking-wide mb-8">
                  6 Tracks &nbsp;·&nbsp; 2 Phases &nbsp;·&nbsp; Real Projects &nbsp;·&nbsp; IIT Faculty Evaluation
                </p>

                {/* CTA buttons */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                  <a
                    href="https://codekarx.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    id="edu-codekarx-register"
                    className="inline-flex items-center justify-center gap-2 h-13 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-900 font-bold text-sm shadow-2xl shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:-translate-y-0.5 transition-all duration-300"
                  >
                    Register Now
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <a
                    href="https://codekarx.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    id="edu-codekarx-tracks"
                    className="inline-flex items-center justify-center gap-2 h-13 px-8 py-3.5 rounded-2xl bg-white/5 border border-white/15 text-white font-bold text-sm hover:bg-white/10 hover:border-white/25 transition-all duration-300"
                  >
                    Explore Tracks
                  </a>
                </div>

                {/* Trust line */}
                <p className="mt-6 text-white/30 text-xs tracking-widest uppercase">
                  Your Code. Your Idea. Your Moment.
                </p>
              </div>

              {/* Right: Visual badge */}
              <div className="flex-shrink-0 flex flex-col items-center gap-4">
                <div className="relative">
                  {/* Outer ring */}
                  <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-full border border-cyan-400/20 flex items-center justify-center relative">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-500/10 to-purple-500/10 blur-xl" />
                    {/* Inner ring */}
                    <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full border border-purple-400/20 bg-gradient-to-br from-cyan-500/10 via-blue-600/15 to-purple-500/10 flex flex-col items-center justify-center relative z-10">
                      <Trophy className="w-8 h-8 text-cyan-300 mb-1" />
                      <p className="font-heading text-2xl sm:text-3xl font-bold text-white">CODE</p>
                      <p className="font-heading text-xl sm:text-2xl font-bold bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent -mt-1">KARX</p>
                      <p className="text-white/40 text-[10px] tracking-widest mt-1">codekarx.in</p>
                    </div>
                  </div>
                  {/* Orbiting dots */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0"
                  >
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(0,229,255,0.8)]" />
                  </motion.div>
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0"
                  >
                    <div className="absolute bottom-3 right-3 w-1.5 h-1.5 rounded-full bg-purple-400 shadow-[0_0_6px_rgba(168,85,247,0.8)]" />
                  </motion.div>
                </div>

                {/* Track pills */}
                <div className="flex flex-wrap gap-1.5 justify-center max-w-[200px]">
                  {["AI / ML", "Web Dev", "Cybersecurity", "Data Analytics", "Design", "Mobile"].map((track) => (
                    <span key={track} className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/50">
                      {track}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ══════════════════════════════════════════
            2 — PROGRAMS GRID
        ══════════════════════════════════════════ */}
        <section id="programs" className="py-20 sm:py-32 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div className="text-center mb-16" {...fadeUp()}>
              <span className="inline-block px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-bold tracking-tight mb-4">
                WHAT WE OFFER
              </span>
              <h2 className="font-heading text-3xl sm:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
                Our <span className="text-blue-600">Education</span> Programs
              </h2>
              <p className="text-slate-500 text-lg max-w-2xl mx-auto">
                From single-day workshops to 6-month internship tracks — every program is rooted in building real products, not just theory.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {programs.map((p, i) => (
                <motion.div key={i} {...fadeUp(i * 0.07)}>
                  <GlassCard className="p-8 bg-white border-slate-100 hover:border-blue-200/60 hover:shadow-xl transition-all duration-500 group h-full flex flex-col">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 ${p.color === "blue"
                        ? "bg-blue-50 group-hover:bg-blue-600"
                        : "bg-purple-50 group-hover:bg-purple-600"
                        }`}
                    >
                      <p.icon
                        className={`w-6 h-6 transition-colors duration-300 ${p.color === "blue"
                          ? "text-blue-600 group-hover:text-white"
                          : "text-purple-600 group-hover:text-white"
                          }`}
                      />
                    </div>

                    <span
                      className={`inline-block text-xs font-bold tracking-widest px-3 py-1 rounded-full mb-3 w-fit ${p.color === "blue"
                        ? "bg-blue-50 text-blue-600 border border-blue-100"
                        : "bg-purple-50 text-purple-600 border border-purple-100"
                        }`}
                    >
                      {p.badge}
                    </span>

                    <h3 className="font-heading text-xl font-bold text-slate-900 mb-2">{p.title}</h3>
                    <p className="text-slate-500 leading-relaxed text-sm mb-5 flex-1">{p.desc}</p>

                    <div className="flex flex-wrap gap-2">
                      {p.tags.map((t, ti) => {
                        const isLink = t === "codekarx.in";
                        return isLink ? (
                          <a
                            key={ti}
                            href="https://codekarx.in"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-semibold px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-600 hover:bg-cyan-100 transition-colors"
                          >
                            🔗 {t}
                          </a>
                        ) : (
                          <span
                            key={ti}
                            className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-slate-500"
                          >
                            {t}
                          </span>
                        );
                      })}
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            3 — FLAGSHIP BOOTCAMP
        ══════════════════════════════════════════ */}
        <section id="bootcamp" className="py-20 sm:py-32 px-4 sm:px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <motion.div className="text-center mb-16" {...fadeUp()}>
              <span className="inline-block px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-bold tracking-tight mb-4">
                FLAGSHIP PROGRAM
              </span>
              <h2 className="font-heading text-3xl sm:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
                UNAI <span className="text-blue-600">Builders</span> Bootcamp
              </h2>
              <p className="text-slate-500 text-lg max-w-2xl mx-auto">
                Two progressive learning tracks — 16 capability blocks total. Turn beginners into AI-enabled builders, then builders into engineers.
              </p>
            </motion.div>

            <TrackSlider scrollToEnroll={scrollToEnroll} />
          </div>
        </section>

        {/* ══════════════════════════════════════════
            4 — INTERNSHIP TRACKS
        ══════════════════════════════════════════ */}
        <section id="internship" className="py-20 sm:py-32 px-4 sm:px-6 bg-slate-50">
          <div className="max-w-7xl mx-auto">
            <motion.div className="text-center mb-16" {...fadeUp()}>
              <span className="inline-block px-4 py-2 rounded-full bg-purple-50 border border-purple-100 text-purple-600 text-sm font-bold tracking-tight mb-4">
                REAL WORK. REAL IMPACT.
              </span>
              <h2 className="font-heading text-3xl sm:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
                Internship <span className="text-purple-600">Tracks</span>
              </h2>
              <p className="text-slate-500 text-lg max-w-2xl mx-auto">
                Not coffee-fetching internships. You'll own features inside live products used by real users across India.{" "}
                <span className="text-purple-600 font-semibold">Click any card</span> to see full details.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {internships.map((intern, i) => (
                <motion.div key={i} {...fadeUp(i * 0.06)}>
                  <button
                    className="w-full text-left bg-white rounded-[1.5rem] p-7 sm:p-8 border border-slate-100 hover:shadow-xl hover:border-purple-300 hover:-translate-y-1 transition-all duration-300 group h-full flex flex-col cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2"
                    onClick={() => setSelectedIntern(intern)}
                    id={`edu-intern-card-${i}`}
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-11 h-11 rounded-xl bg-purple-50 flex items-center justify-center flex-shrink-0 group-hover:bg-purple-600 transition-all duration-300">
                        <intern.icon className="w-5 h-5 text-purple-600 group-hover:text-white transition-colors duration-300" />
                      </div>
                      <div>
                        <h3 className="font-heading font-bold text-slate-900 text-base leading-tight">{intern.role}</h3>
                        <p className="text-purple-600 text-xs font-bold tracking-wide mt-0.5">{intern.duration}</p>
                      </div>
                    </div>
                    <p className="text-slate-500 text-sm leading-relaxed mb-5 flex-1 line-clamp-3">{intern.desc}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {intern.skills.slice(0, 3).map((s, si) => (
                        <span key={si} className="text-xs font-semibold px-3 py-1 rounded-full bg-purple-50 border border-purple-100 text-purple-600">
                          {s}
                        </span>
                      ))}
                      {intern.skills.length > 3 && (
                        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-slate-400">
                          +{intern.skills.length - 3} more
                        </span>
                      )}
                    </div>
                    {/* Click hint */}
                    <div className="flex items-center gap-1.5 text-purple-500 text-xs font-bold tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      View Details <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            5 — WORKSHOPS
        ══════════════════════════════════════════ */}
        <section id="workshops" className="py-20 sm:py-32 px-4 sm:px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <motion.div className="text-center mb-16" {...fadeUp()}>
              <span className="inline-block px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-bold tracking-tight mb-4">
                OUTREACH PROGRAMS
              </span>
              <h2 className="font-heading text-3xl sm:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
                Workshop <span className="text-blue-600">Catalog</span>
              </h2>
              <p className="text-slate-500 text-lg max-w-2xl mx-auto">
                Bring UNAI Tech to your college or company. These workshops deliver maximum impact in minimum time.
              </p>
            </motion.div>

            <div className="flex flex-col gap-px bg-slate-100 rounded-[1.5rem] overflow-hidden border border-slate-100">
              {workshops.map((w, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  className="bg-white hover:bg-slate-50 transition-colors duration-200 grid grid-cols-[52px_1fr_auto] sm:grid-cols-[72px_1fr_auto] items-center gap-4 sm:gap-6 px-5 sm:px-8 py-5 sm:py-6 group"
                >
                  <span className="font-heading text-2xl sm:text-3xl font-bold text-slate-100 group-hover:text-slate-200 transition-colors select-none">
                    {w.num}
                  </span>
                  <div>
                    <h4 className="font-heading font-bold text-slate-900 text-sm sm:text-base mb-0.5">{w.title}</h4>
                    <p className="text-slate-500 text-xs sm:text-sm leading-relaxed hidden sm:block">{w.desc}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span className={`inline-block text-xs font-bold tracking-wide px-3 py-1 rounded-full border mb-1.5 ${levelColor[w.level]}`}>
                      {w.level.toUpperCase()}
                    </span>
                    <p className="text-xs text-slate-400">⏱ {w.duration}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            6 — CORPORATE TRAINING
        ══════════════════════════════════════════ */}
        <section id="corporate" className="py-20 sm:py-32 px-4 sm:px-6 bg-slate-50">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center">
              {/* Left: text + benefits */}
              <motion.div {...fadeLeft(0)}>
                <span className="inline-block px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-bold tracking-tight mb-6">
                  B2B TRAINING
                </span>
                <h2 className="font-heading text-3xl sm:text-5xl font-bold text-slate-900 mb-5 tracking-tight leading-tight">
                  Corporate <span className="text-blue-600">Upskilling</span>
                </h2>
                <p className="text-slate-500 text-lg leading-relaxed mb-8">
                  Custom AI training programs designed for enterprises, startups, and government bodies. Delivered by UNAI Tech engineers who build AI daily — not just teach it.
                </p>

                <div className="grid sm:grid-cols-2 gap-4">
                  {corporateBenefits.map((b, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.08 }}
                      className="bg-white rounded-2xl p-5 border border-slate-100 hover:border-blue-200 hover:shadow-md transition-all duration-300 group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center mb-3 group-hover:bg-blue-600 transition-all duration-300">
                        <b.icon className="w-5 h-5 text-blue-600 group-hover:text-white transition-colors duration-300" />
                      </div>
                      <h5 className="font-heading font-bold text-slate-900 text-sm mb-1">{b.title}</h5>
                      <p className="text-slate-500 text-xs leading-relaxed">{b.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Right: quote card */}
              <motion.div {...fadeRight(0.1)}>
                <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-slate-900 to-slate-800 p-10 sm:p-14 shadow-2xl">
                  <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-blue-500/15 blur-[80px] rounded-full" />
                  <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-purple-500/10 blur-[80px] rounded-full" />
                  <div className="relative z-10">
                    <Sparkles className="w-10 h-10 text-blue-400 mb-8" />
                    <blockquote className="font-heading text-2xl sm:text-3xl font-bold text-white leading-snug mb-8">
                      "India doesn't need more students who{" "}
                      <span className="bg-gradient-to-r from-blue-400 to-purple-300 bg-clip-text text-transparent">
                        studied AI.
                      </span>
                      <br />
                      It needs builders who ship it."
                    </blockquote>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center font-heading font-bold text-white text-sm">
                        NT
                      </div>
                      <div>
                        <p className="font-bold text-white text-sm">Nehemiah, CEO</p>
                        <p className="text-slate-400 text-xs">UNAI Tech, Chennai</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Checklist */}
                <div className="mt-6 bg-white rounded-2xl p-6 border border-slate-100">
                  <h4 className="font-heading font-bold text-slate-900 mb-4">What You Get</h4>
                  <ul className="space-y-3">
                    {[
                      "Needs assessment & custom syllabus design",
                      "Live sessions by UNAI's working engineers",
                      "Hands-on lab exercises with real AI APIs",
                      "UNAI-certified completion certificate",
                      "Post-training recorded session access",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-slate-600 text-sm">
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center mt-0.5">
                          <Check className="w-3 h-3 text-blue-600" strokeWidth={3} />
                        </div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            7 — ENROLLMENT FORM
        ══════════════════════════════════════════ */}
        <section
          id="enroll"
          ref={enrollRef}
          className="py-20 sm:py-32 px-4 sm:px-6 bg-white"
        >
          <div className="max-w-2xl mx-auto">
            <motion.div className="text-center mb-10" {...fadeUp()}>
              <span className="inline-block px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-bold tracking-tight mb-4">
                GET STARTED
              </span>
              <h2 className="font-heading text-3xl sm:text-5xl font-bold text-slate-900 mb-3 tracking-tight">
                Apply <span className="text-blue-600">Now</span>
              </h2>
              <p className="text-slate-500">
                Tell us what you're interested in and we'll get back within 24 hours.
              </p>
            </motion.div>

            <motion.div {...scaleIn(0.1)}>
              <div className="bg-white rounded-[2rem] p-8 sm:p-10 border border-slate-100 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)]">
                <h3 className="font-heading font-bold text-slate-900 text-xl mb-6">Education Inquiry Form</h3>

                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Full Name</label>
                    <input
                      id="edu-form-name"
                      type="text"
                      placeholder="Your name"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-sm placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Phone Number</label>
                    <input
                      id="edu-form-phone"
                      type="tel"
                      placeholder="+91 XXXXX XXXXX"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-sm placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Email Address</label>
                  <input
                    id="edu-form-email"
                    type="email"
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-sm placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">College / Company</label>
                  <input
                    id="edu-form-org"
                    type="text"
                    placeholder="Your institution or company"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-sm placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Program of Interest</label>
                  <select
                    id="edu-form-program"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all bg-white"
                  >
                    <option value="">Select a program</option>
                    <option>AI &amp; ML Workshop</option>
                    <option>UNAI Builders Bootcamp</option>
                    <option>Tech Internship (AI/ML)</option>
                    <option>Tech Internship (Full Stack)</option>
                    <option>Corporate Training</option>
                    <option>College Curriculum Partnership</option>
                    <option>CODEKARX Hackathon Prep</option>
                  </select>
                </div>

                <div className="mb-6">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Message (Optional)</label>
                  <textarea
                    id="edu-form-message"
                    rows={3}
                    placeholder="Tell us your background, goals, or any questions..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-sm placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all resize-none"
                  />
                </div>

                <Button
                  id="edu-form-submit"
                  className="w-full h-14 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-base shadow-xl shadow-blue-500/20 transition-all"
                  onClick={() =>
                    alert("Thank you! The UNAI Tech Education team will reach out within 24 hours.")
                  }
                >
                  Submit Application
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>

                <p className="text-center text-xs text-slate-400 mt-4">
                  career@unaitech.com · Chennai, Tamil Nadu
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            8 — CTA BANNER
        ══════════════════════════════════════════ */}
        <section className="py-14 lg:py-24 px-4 sm:px-6">
          <PremiumCTA
            title={
              <>
                Ready to Build{" "}
                <span className="text-blue-300">India's AI Future?</span>
              </>
            }
            description="Join 500+ students and professionals who are building with UNAI Tech — not just learning about AI."
            primaryButton={{
              label: "Apply for a Program",
              onClick: scrollToEnroll,
            }}
            secondaryButton={{
              label: "Partner With Us",
              onClick: () => navigate("/contact"),
            }}
          />
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Education;
