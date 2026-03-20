import { motion } from "framer-motion";
import { Footer } from "@/components/layout/Footer";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";
import { PremiumCTA } from "@/components/ui/PremiumCTA";
import SEO from "@/components/SEO";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Check,
  BarChart3,
  Brain,
  Users,
  Target,
  Shield,
  Megaphone,
  MapPin,
  Smartphone,
  Eye,
  MessageSquare,
  TrendingUp,
  Vote,
  Sparkles,
  Globe,
  Zap,
  LineChart,
} from "lucide-react";

/* ─── fade-in animation helper ─── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, delay },
});

/* ─── data ─── */

const analyticsEdge = [
  {
    icon: LineChart,
    title: "Predictive Modeling",
    desc: "Using historical data and current swing factors to predict victory margins at the booth level.",
  },
  {
    icon: Brain,
    title: "Sentiment Mining",
    desc: "Real-time NLP to track how voters feel about specific issues across social media and news.",
  },
  {
    icon: Users,
    title: "Voter Persona Mapping",
    desc: "Categorizing the electorate into clusters based on socio-economic status, age, and professional interests to deliver personalized messaging.",
  },
];

const services = [
  {
    letter: "A",
    title: "Strategic Advisory & Research",
    icon: BarChart3,
    items: [
      'Opinion & Exit Polls — Scientifically designed surveys to gauge the "Mood of the Constituency."',
      "Constituency Profiling — Deep-dive reports on caste dynamics, historical voting patterns, and local grievances.",
    ],
  },
  {
    letter: "B",
    title: "Digital & Media Management",
    icon: Megaphone,
    items: [
      "Perception Management — Building the candidate's brand through high-quality storytelling and visual narratives.",
      "Social Media War Rooms — 24/7 monitoring and rapid response teams to counter misinformation and drive the narrative.",
    ],
  },
  {
    letter: "C",
    title: "Ground Operations",
    icon: MapPin,
    items: [
      "Booth Management — Identifying and training 'Panna Pramukhs' or Booth Level Workers.",
      "Voter Contact Programs — Door-to-door campaigns with GPS-tracked mobile applications for real-time reporting.",
    ],
  },
  {
    letter: "D",
    title: "Campaign Tech",
    icon: Smartphone,
    items: [
      "IVR & WhatsApp Marketing — Large-scale automated communication systems.",
      "Candidate Dashboards — A private mobile app for real-time updates on campaign progress and voter sentiment.",
    ],
  },
];

const caseStudies = [
  {
    location: "Karur MP Constituency",
    subtitle: "The Industrial Micro-Targeting",
    challenge:
      "Karur is a complex mix of textile industrial hubs and rural agricultural belts.",
    intervention:
      'We conducted a "Sector-Specific Sentiment Analysis." For the textile workers, our analytics identified specific concerns regarding raw material costs.',
    execution:
      'We deployed a targeted digital ad campaign and specialized town-hall meetings specifically for the MSME sector. By identifying "Swing Booths" in the industrial outskirts, we redirected volunteer resources to where the margin of victory was thinnest, ensuring a consolidated vote bank.',
  },
  {
    location: "Tiruvannamalai MP Constituency",
    subtitle: "Grassroots Mobilization",
    challenge:
      "A geographically vast constituency with deep-rooted religious and agrarian sentiments.",
    intervention:
      'Leveraging UNAI Tech\'s data processing, we mapped the "Voter Journey" of the rural population. We identified that localized hyper-local issues (like irrigation canal maintenance) were overshadowing national narratives.',
    execution:
      'We implemented a "Hyper-Local Content Strategy." Instead of generic posters, we created unique video messages tailored to specific village problems. Our ground-tech app ensured that 98% of identified "Supporter" households were physically visited in the last 48 hours before polling.',
  },
];

const UnaiPac = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <SEO
        title="UNAI-PAC — Political Strategic Consultancy"
        description="UNAI-PAC professionalizes democracy through data. Predictive analytics, campaign tech, and grassroots mobilization for modern political campaigns."
      />

      <main className="pt-24 sm:pt-32">
        {/* ═══════════════════════════════════════════
            1 ─ HERO SECTION
        ═══════════════════════════════════════════ */}
        <section className="relative pb-12 px-4 sm:px-6 lg:px-10">
          <div className="max-w-[1920px] mx-auto relative overflow-hidden rounded-[2.5rem] bg-slate-900 shadow-2xl">
            {/* background gradient layers */}
            <div className="absolute inset-0 z-0 overflow-hidden rounded-[2.5rem]">
              <div className="absolute inset-0 bg-gradient-to-br from-[#1e3a5f] via-[#0f172a] to-[#1e293b]" />
              <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-blue-600/10 mix-blend-screen" />
              <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[80%] bg-blue-400/10 blur-[120px] rounded-full pointer-events-none" />
              <div className="absolute bottom-[-30%] right-[-10%] w-[70%] h-[90%] bg-blue-400/15 blur-[140px] rounded-full pointer-events-none" />
            </div>

            <div className="relative z-10 pt-16 sm:pt-24 pb-24 sm:pb-44 px-4 sm:px-6 text-center max-w-5xl mx-auto">
              <motion.div {...fadeUp()}>
                {/* Badge */}
                <span className="inline-flex items-center gap-2 px-5 py-2 mb-6 rounded-full bg-white/10 backdrop-blur-lg border border-white/10 text-white/80 text-sm font-semibold tracking-wide">
                  <Vote className="w-4 h-4 text-blue-400" />
                  Political Strategic Consultancy
                </span>

                <h1 className="font-heading text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 tracking-tight leading-tight">
                  UNAI-PAC:{" "}
                  <span className="bg-gradient-to-r from-blue-400 to-purple-300 bg-clip-text text-transparent">
                    Professionalizing Democracy
                  </span>{" "}
                  through Data
                </h1>

                <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed font-light">
                  Bridging traditional political wisdom and modern data science
                  to deliver data-driven, transparent, and result-oriented
                  campaigns.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    className="h-14 px-10 rounded-2xl bg-blue-500 hover:bg-blue-600 text-white shadow-2xl shadow-blue-500/20 font-bold transition-all"
                    onClick={() => navigate("/contact")}
                  >
                    Get a Strategy Session
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                  <Button
                    variant="outline"
                    className="h-14 px-10 rounded-2xl border-white/20 bg-white/5 backdrop-blur-md text-white hover:bg-white/10 font-bold transition-all"
                    onClick={() => {
                      const el = document.getElementById("case-studies");
                      el?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    View Case Studies
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            2 ─ ABOUT SECTION
        ═══════════════════════════════════════════ */}
        <section className="py-16 sm:py-24 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <motion.div {...fadeUp()}>
                <span className="inline-block px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-bold tracking-tight mb-6">
                  About UNAI-PAC
                </span>
                <h2 className="font-heading text-3xl sm:text-5xl font-bold text-slate-900 mb-6 tracking-tight leading-tight">
                  Where Politics Meets{" "}
                  <span className="text-blue-500">Precision Science</span>
                </h2>
                <p className="text-lg text-slate-500 leading-relaxed mb-6">
                  UNAI-PAC (Unified Network for Advanced Intelligence — Political Action Committee) is a premier political strategic consultancy born from the technological excellence of UNAI Tech. We bridge the gap between traditional political wisdom and modern data science.
                </p>
                <p className="text-lg text-slate-500 leading-relaxed">
                  While politics is often seen as an art, UNAI-PAC treats it as a precision science. We provide political parties and candidates with a 360-degree ecosystem that manages everything from the digital footprint of a leader to the microscopic management of a polling booth.
                </p>
              </motion.div>

              <motion.div {...fadeUp(0.2)} className="relative">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: Target, label: "360° Ecosystem", value: "Full-stack campaign management" },
                    { icon: Brain, label: "Data Science", value: "AI-powered voter analytics" },
                    { icon: Globe, label: "Digital Presence", value: "Leader brand building" },
                    { icon: MapPin, label: "Booth-Level", value: "Micro-targeted ground ops" },
                  ].map((stat, i) => (
                    <div
                      key={i}
                      className="bg-white rounded-2xl p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.08)] border border-slate-100 hover:shadow-lg hover:border-blue-200 transition-all duration-300 group"
                    >
                      <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center mb-3 group-hover:bg-blue-100 transition-colors">
                        <stat.icon className="w-5 h-5 text-blue-500" />
                      </div>
                      <h4 className="font-bold text-slate-900 text-sm mb-1">{stat.label}</h4>
                      <p className="text-xs text-slate-400">{stat.value}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            3 ─ VISION & MISSION SECTION
        ═══════════════════════════════════════════ */}
        <section className="py-16 sm:py-24 bg-white px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div className="text-center mb-16" {...fadeUp()}>
              <h2 className="font-heading text-3xl sm:text-5xl font-bold text-slate-900 mb-4">
                Vision & Mission
              </h2>
              <p className="text-slate-500 text-lg max-w-2xl mx-auto">
                Transforming the democratic process through data-driven excellence.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Vision Card */}
              <motion.div {...fadeUp(0.1)}>
                <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-slate-900 to-slate-800 p-8 sm:p-12 h-full shadow-2xl">
                  <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-blue-500/15 blur-[80px] rounded-full" />
                  <div className="relative z-10">
                    <div className="w-14 h-14 rounded-2xl bg-blue-500/20 flex items-center justify-center mb-6">
                      <Eye className="w-7 h-7 text-blue-400" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">Our Vision</h3>
                    <p className="text-slate-300 text-lg leading-relaxed">
                      To become the definitive catalyst in modernizing the democratic process, where every political decision is backed by data, and every leader is seamlessly connected to the pulse of the people.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Mission Card */}
              <motion.div {...fadeUp(0.2)}>
                <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-blue-500 to-purple-500 p-8 sm:p-12 h-full shadow-2xl">
                  <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-white/10 blur-[80px] rounded-full" />
                  <div className="relative z-10">
                    <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center mb-6">
                      <Target className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">Our Mission</h3>
                    <p className="text-white/90 text-lg leading-relaxed">
                      To empower visionary leaders with actionable intelligence, cutting-edge technology, and strategic grassroots mobilization, ensuring that political campaigns are efficient, transparent, and result-oriented.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            4 ─ POLITICAL ANALYTICS EDGE
        ═══════════════════════════════════════════ */}
        <section className="py-16 sm:py-24 px-4 sm:px-6 bg-slate-50">
          <div className="max-w-7xl mx-auto">
            <motion.div className="text-center mb-16" {...fadeUp()}>
              <span className="inline-block px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-bold tracking-tight mb-4">
                The UNAI-PAC Edge
              </span>
              <h2 className="font-heading text-3xl sm:text-5xl font-bold text-slate-900 mb-4">
                Political Analytics
              </h2>
              <p className="text-slate-500 text-lg max-w-3xl mx-auto">
                Unlike traditional agencies, UNAI-PAC utilizes the proprietary tech stack developed at UNAI Tech to provide deeper insights. Our analytics go beyond simple polls.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {analyticsEdge.map((item, i) => (
                <motion.div key={i} {...fadeUp(i * 0.1)}>
                  <GlassCard className="p-8 sm:p-10 bg-white border-slate-100 hover:border-blue-300/50 transition-all duration-500 group h-full">
                    <div className="w-14 h-14 rounded-2xl bg-blue-50 shadow-sm flex items-center justify-center mb-6 group-hover:bg-blue-500 group-hover:shadow-blue-200 transition-all">
                      <item.icon className="w-7 h-7 text-blue-500 group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold mb-3 text-slate-900">{item.title}</h3>
                    <p className="text-slate-500 leading-relaxed">{item.desc}</p>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            5 ─ OUR SERVICES
        ═══════════════════════════════════════════ */}
        <section className="py-16 sm:py-24 px-4 sm:px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <motion.div className="text-center mb-16" {...fadeUp()}>
              <h2 className="font-heading text-3xl sm:text-5xl font-bold text-slate-900 mb-4">
                Our Services
              </h2>
              <p className="text-slate-500 text-lg max-w-2xl mx-auto">
                End-to-end political campaign management — from research to results.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {services.map((svc, i) => (
                <motion.div key={svc.letter} {...fadeUp(i * 0.08)}>
                  <div className="bg-slate-50 rounded-[1.5rem] p-6 sm:p-8 border border-slate-100 hover:shadow-lg hover:border-blue-200 transition-all duration-500 h-full group">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-blue-500 flex items-center justify-center shadow-lg shadow-blue-200">
                        <svc.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-blue-500 tracking-widest">
                          SERVICE {svc.letter}
                        </span>
                        <h3 className="text-lg sm:text-xl font-bold text-slate-900">{svc.title}</h3>
                      </div>
                    </div>
                    <ul className="space-y-3">
                      {svc.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-3 text-sm text-slate-600 leading-relaxed">
                          <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center mt-0.5">
                            <Check className="w-3 h-3 text-blue-500" strokeWidth={3} />
                          </div>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            6 ─ CASE STUDIES
        ═══════════════════════════════════════════ */}
        <section id="case-studies" className="py-16 sm:py-24 px-4 sm:px-6 bg-slate-50">
          <div className="max-w-7xl mx-auto">
            <motion.div className="text-center mb-16" {...fadeUp()}>
              <span className="inline-block px-4 py-2 rounded-full bg-green-50 border border-green-100 text-green-600 text-sm font-bold tracking-tight mb-4">
                Proven Results
              </span>
              <h2 className="font-heading text-3xl sm:text-5xl font-bold text-slate-900 mb-4">
                Case Study: 2024 MP Elections
              </h2>
              <p className="text-slate-500 text-lg max-w-3xl mx-auto">
                In the 2024 General Elections, UNAI-PAC deployed its elite team to Karur and Tiruvannamalai, showcasing how data-driven strategy wins seats.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-8">
              {caseStudies.map((cs, i) => (
                <motion.div key={i} {...fadeUp(i * 0.15)}>
                  <div className="bg-white rounded-[2rem] overflow-hidden shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] border border-slate-100 h-full flex flex-col">
                    {/* Card header */}
                    <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-6 sm:p-8">
                      <div className="flex items-center gap-3 mb-2">
                        <MapPin className="w-5 h-5 text-blue-400" />
                        <span className="text-blue-400 font-bold text-sm tracking-wide uppercase">
                          {cs.subtitle}
                        </span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white">{cs.location}</h3>
                    </div>

                    {/* Card body */}
                    <div className="p-6 sm:p-8 flex-1 flex flex-col gap-5">
                      {[
                        { label: "The Challenge", text: cs.challenge, color: "red" },
                        { label: "UNAI-PAC Intervention", text: cs.intervention, color: "blue" },
                        { label: "Execution", text: cs.execution, color: "green" },
                      ].map((block, j) => (
                        <div key={j}>
                          <h4
                            className={`text-sm font-bold tracking-wide mb-1 ${
                              block.color === "red"
                                ? "text-red-500"
                                : block.color === "blue"
                                ? "text-blue-500"
                                : "text-green-500"
                            }`}
                          >
                            {block.label}
                          </h4>
                          <p className="text-slate-600 text-sm leading-relaxed">{block.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            7 ─ WHY UNAI-PAC
        ═══════════════════════════════════════════ */}
        <section className="py-16 sm:py-24 px-4 sm:px-6 bg-white">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div {...fadeUp()}>
              <h2 className="font-heading text-3xl sm:text-5xl font-bold text-slate-900 mb-6">
                Why <span className="text-blue-500">UNAI-PAC</span>?
              </h2>
              <p className="text-lg text-slate-500 leading-relaxed max-w-3xl mx-auto mb-10">
                UNAI-PAC is not just a consultancy; it is an extension of UNAI Tech's commitment to innovation. While others guess the pulse of the voter, we measure it. We combine structural discipline with the technological agility, creating a unique hybrid model that is built for the Indian political landscape.
              </p>
            </motion.div>

            <motion.div {...fadeUp(0.15)}>
              <div className="relative rounded-[2rem] bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-8 sm:p-14 shadow-2xl overflow-hidden">
                <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-[200px] h-[200px] bg-blue-500/10 blur-[80px] rounded-full pointer-events-none" />
                <div className="relative z-10">
                  <Sparkles className="w-10 h-10 text-blue-400 mx-auto mb-6" />
                  <blockquote className="text-xl sm:text-3xl font-heading font-bold text-white leading-snug mb-4">
                    "Data wins arguments. Strategy wins elections.{" "}
                    <span className="bg-gradient-to-r from-blue-400 to-purple-300 bg-clip-text text-transparent">
                      UNAI-PAC delivers both.
                    </span>
                    "
                  </blockquote>
                </div>
              </div>
            </motion.div>

            {/* Differentiators row */}
            <div className="grid sm:grid-cols-3 gap-6 mt-12">
              {[
                { icon: TrendingUp, title: "Data-Driven", desc: "Every decision backed by analytics & predictive modeling" },
                { icon: Shield, title: "Proven Track Record", desc: "Successfully deployed for 2024 MP Elections" },
                { icon: Zap, title: "Tech Agility", desc: "Powered by UNAI Tech's proprietary tech stack" },
              ].map((d, i) => (
                <motion.div key={i} {...fadeUp(i * 0.1)}>
                  <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:shadow-md hover:border-blue-200 transition-all">
                    <d.icon className="w-8 h-8 text-blue-500 mb-3 mx-auto" />
                    <h4 className="font-bold text-slate-900 mb-1">{d.title}</h4>
                    <p className="text-sm text-slate-500">{d.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            8 ─ CTA
        ═══════════════════════════════════════════ */}
        <section className="py-14 lg:py-24 px-4 sm:px-6">
          <PremiumCTA
            title={
              <>
                Ready to{" "}
                <span className="text-blue-300">Win with Data</span>?
              </>
            }
            description="Connect with our political strategy team to explore how UNAI-PAC can transform your next campaign with data-driven precision."
            primaryButton={{
              label: "Schedule Consultation",
              onClick: () => navigate("/contact"),
            }}
            secondaryButton={{
              label: "Explore Our Services",
              onClick: () => navigate("/services"),
            }}
          />
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default UnaiPac;
