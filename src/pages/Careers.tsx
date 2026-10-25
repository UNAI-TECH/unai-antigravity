import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Footer } from "@/components/layout/Footer";
import { GlowOrb } from "@/components/effects/GlowOrb";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, MapPin, Clock, IndianRupee, Briefcase, X, Upload, CheckCircle, ChevronLeft, ChevronRight, FileText, Loader2, GraduationCap, Calendar } from "lucide-react";
import { useData, Job } from "@/context/DataContext";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import { getInternshipIcon } from "@/utils/internshipIcons";

const Careers = () => {
    const { jobs, internships, addJobApplication } = useData();
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);
    const [isApplying, setIsApplying] = useState(false);

    // Filter regular jobs (excluding internships mirrored in jobs)
    const regularJobs = jobs.filter(j => j.department !== 'Internship' && j.type !== 'Internship');

    return (
        <div className="min-h-screen bg-background">


            {/* Job Application Modal Overlay */}
            <AnimatePresence>
                {selectedJob && (
                    <JobApplicationOverlay
                        job={selectedJob}
                        onClose={() => {
                            setSelectedJob(null);
                            setIsApplying(false);
                        }}
                        isApplying={isApplying}
                        onStartApply={() => setIsApplying(true)}
                        onSubmitApplication={async (data) => {
                            await addJobApplication({
                                job_id: selectedJob.id,
                                ...data
                            });
                        }}
                    />
                )}
            </AnimatePresence>

            <main className="pt-0">
                {/* Hero Section */}
                <section className="relative pt-32 pb-12 md:pb-20 overflow-hidden">
                    <GlowOrb size="xl" color="plasma" className="top-0 right-0" />
                    <GlowOrb size="lg" color="blue" className="bottom-0 left-0" />

                    <div className="container mx-auto px-6 relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-center max-w-4xl mx-auto"
                        >
                            <span className="inline-block px-4 py-2 rounded-full glass-metal text-sm text-metal-blue-300 mb-6">
                                Join our Mission
                            </span>
                            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold mb-8">
                                <span className="text-foreground">Build the</span>
                                <br />
                                <span className="text-gradient-metal">Future With Us</span>
                            </h1>
                            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                                We're looking for visionaries, creators, and problem solvers to help us
                                push the boundaries of what's possible with technology.
                            </p>
                        </motion.div>
                    </div>
                </section>

                <div className="energy-line" />

                {/* ─── Internship Opportunities Section ─── */}
                <section className="relative pt-16 lg:pt-24 pb-4 overflow-hidden">
                    <div className="container mx-auto px-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="mb-6"
                        >
                            <span className="inline-block px-4 py-2 rounded-full bg-metal-blue-500/10 border border-metal-blue-500/20 text-metal-blue-400 text-sm font-bold tracking-wide mb-4">
                                INTERNSHIP PROGRAM
                            </span>
                            <h2 className="font-heading text-3xl font-bold mb-3 text-foreground">
                                Internship <span className="text-gradient-metal">Opportunities</span>
                            </h2>
                            <p className="text-muted-foreground max-w-2xl">
                                Real work, real impact. Join UNAI Tech as an intern and contribute to live products used by thousands across India.
                            </p>
                        </motion.div>

                        {internships.length === 0 ? (
                            <div className="flex justify-center py-12 mb-8">
                                <GlassCard className="max-w-md w-full p-8 text-center border-dashed border-white/10 relative overflow-hidden">
                                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-metal-blue-500/10 border border-metal-blue-500/20 flex items-center justify-center">
                                        <GraduationCap className="w-8 h-8 text-metal-blue-400" />
                                    </div>
                                    <h3 className="text-xl font-bold text-foreground mb-2">No Open Internships Currently</h3>
                                    <p className="text-sm text-muted-foreground mb-6">
                                        Our internship cohorts open periodically. Check back soon or send your resume directly to our talent team!
                                    </p>
                                    <a
                                        href="mailto:unai.technology@gmail.com"
                                        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-metal-blue-500/10 border border-metal-blue-500/20 text-metal-blue-400 hover:text-metal-blue-300 hover:bg-metal-blue-500/20 text-sm font-medium transition-all"
                                    >
                                        Send Us Your Resume <ArrowRight className="w-4 h-4" />
                                    </a>
                                </GlassCard>
                            </div>
                        ) : (
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
                                {internships.map((intern, index) => {
                                    const IconComp = getInternshipIcon(intern.icon);
                                    return (
                                        <motion.div
                                            key={intern.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.5, delay: index * 0.06 }}
                                        >
                                            <GlassCard className="p-6 group hover:border-metal-blue-500/30 transition-all duration-300 h-full flex flex-col">
                                                {/* Header */}
                                                <div className="flex items-start gap-3 mb-4">
                                                    <div className="w-11 h-11 rounded-xl bg-metal-blue-500/10 border border-metal-blue-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-metal-blue-500/20 transition-colors">
                                                        <IconComp className="w-5 h-5 text-metal-blue-400" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <h3 className="font-heading font-bold text-foreground text-base leading-tight group-hover:text-metal-blue-300 transition-colors truncate">
                                                            {intern.role}
                                                        </h3>
                                                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground mt-1">
                                                            <span className="inline-flex items-center gap-1">
                                                                <Clock className="w-3 h-3 text-purple-400" />
                                                                {intern.duration}
                                                            </span>
                                                            {intern.stipend && intern.stipend.trim() !== "" && (
                                                                <span className="inline-flex items-center gap-1 text-green-400">
                                                                    <IndianRupee className="w-3 h-3" />
                                                                    {intern.stipend}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Description */}
                                                <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
                                                    {intern.description}
                                                </p>

                                                {/* Skills */}
                                                {intern.skills && intern.skills.length > 0 && (
                                                    <div className="flex flex-wrap gap-1.5 mb-5">
                                                        {intern.skills.map((s, si) => (
                                                            <span key={si} className="text-xs px-2.5 py-1 rounded-full bg-metal-blue-500/10 border border-metal-blue-500/20 text-metal-blue-400 font-medium">
                                                                {s}
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}

                                                {/* Apply CTA */}
                                                <Button
                                                    size="sm"
                                                    className="w-full bg-gradient-to-r from-metal-blue-500 to-metal-purple-500 text-white font-semibold hover:shadow-lg hover:shadow-metal-blue-500/25 transition-all"
                                                    onClick={() => {
                                                        const internJob: Job = {
                                                            id: intern.id,
                                                            title: intern.role,
                                                            department: "Internship",
                                                            type: "Internship",
                                                            location: intern.location || "Chennai / Remote",
                                                            salary: intern.stipend || "",
                                                            experience: intern.duration,
                                                            description: intern.description,
                                                            questions: [],
                                                        };
                                                        setSelectedJob(internJob);
                                                        setIsApplying(true);
                                                    }}
                                                    id={`careers-intern-apply-${index}`}
                                                >
                                                    Apply Now <ArrowRight className="ml-1.5 w-4 h-4" />
                                                </Button>
                                            </GlassCard>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </section>

                <div className="energy-line" />

                {/* Open Positions */}
                <section className="relative pt-16 lg:pt-24 pb-12 overflow-hidden">
                    <div className="container mx-auto px-6">
                        {regularJobs.length > 0 && (
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="font-heading text-3xl font-bold mb-12 text-foreground"
                            >
                                Open Positions
                            </motion.h2>
                        )}

                        <div className="space-y-6">
                            {regularJobs.length === 0 ? (
                                <div className="flex justify-center py-12">
                                    <GlassCard className="max-w-md w-full p-12 text-center relative overflow-hidden group border-dashed border-white/10">
                                        <GlowOrb size="md" color="plasma" className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20 group-hover:opacity-40 transition-opacity duration-1000" />

                                        <div className="relative z-10">
                                            <motion.div
                                                animate={{ y: [0, -10, 0] }}
                                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                                className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center shadow-lg"
                                            >
                                                <Briefcase className="w-10 h-10 text-metal-blue-400" />
                                            </motion.div>

                                            <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-metal mb-2">
                                                No jobs currently open
                                            </h3>
                                            <p className="text-muted-foreground mb-6">
                                                We don't have any active listings right now, but we're always looking for talent.
                                            </p>

                                            <Button variant="outline" className="border-white/10 hover:border-metal-blue-500/50">
                                                Notify me when jobs are available
                                            </Button>
                                        </div>
                                    </GlassCard>
                                </div>
                            ) : (
                                regularJobs.map((job, index) => (
                                    <motion.div
                                        key={job.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        onClick={() => setSelectedJob(job)}
                                        className="cursor-pointer"
                                    >
                                        <GlassCard className="p-8 group hover:border-metal-blue-500/30 transition-all duration-300">
                                            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                                                <div className="flex-grow">
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <span className="px-3 py-1 rounded-full bg-metal-blue-500/20 text-metal-blue-400 text-xs font-medium">
                                                            {job.department}
                                                        </span>
                                                        <span className="px-3 py-1 rounded-full bg-metal-purple-500/20 text-metal-purple-400 text-xs font-medium">
                                                            {job.type}
                                                        </span>
                                                    </div>
                                                    <h3 className="font-heading text-2xl font-bold text-foreground mb-2 group-hover:text-metal-blue-300 transition-colors">
                                                        {job.title}
                                                    </h3>
                                                    <p className="text-muted-foreground mb-4 max-w-2xl line-clamp-2">{job.description}</p>

                                                    <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
                                                        <span className="flex items-center gap-2">
                                                            <MapPin className="w-4 h-4 text-metal-blue-400" />
                                                            {job.location}
                                                        </span>
                                                        <span className="flex items-center gap-2">
                                                            <IndianRupee className="w-4 h-4 text-green-400" />
                                                            {job.salary}
                                                        </span>
                                                        {job.experience && (
                                                            <span className="flex items-center gap-2">
                                                                <Clock className="w-4 h-4 text-purple-400" />
                                                                {job.experience}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="flex-shrink-0">
                                                    <Button variant="outline" className="group/btn border-white/10 hover:border-metal-blue-500 hover:text-metal-blue-300 pointer-events-none">
                                                        View Details
                                                        <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </GlassCard>
                                    </motion.div>
                                ))
                            )}
                        </div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="mt-12 text-center"
                        >
                            <p className="text-muted-foreground mb-4">
                                Don't see a role that fits?
                            </p>
                            <a 
                                href="mailto:unai.technology@gmail.com"
                                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-300 underline-offset-4 hover:underline h-10 px-4 py-2 text-metal-blue-400 hover:text-metal-blue-300"
                            >
                                Send us your resume anyway <ArrowRight className="ml-2 w-4 h-4" />
                            </a>
                        </motion.div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

// --- Subcomponents ---

interface ApplicationOverlayProps {
    job: Job;
    onClose: () => void;
    isApplying: boolean;
    onStartApply: () => void;
    onSubmitApplication: (data: any) => Promise<void>;
}

const JobApplicationOverlay = ({ job, onClose, isApplying, onStartApply, onSubmitApplication }: ApplicationOverlayProps) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-3 md:p-4 bg-black/80 backdrop-blur-sm"
        >
            <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                data-lenis-prevent
                className="w-full max-w-4xl max-h-[90vh] overflow-y-auto custom-scrollbar bg-[#0B1221] border border-white/10 rounded-2xl shadow-2xl relative"
            >
                <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-4 right-4 z-10 text-muted-foreground hover:text-white"
                    onClick={onClose}
                >
                    <X className="w-6 h-6" />
                </Button>

                {!isApplying ? (
                    <div className="p-5 md:p-12">
                        <div className="mb-8 border-b border-white/10 pb-8">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="px-3 py-1 rounded-full bg-metal-blue-500/20 text-metal-blue-400 text-sm font-medium">
                                    {job.department}
                                </span>
                                <span className="px-3 py-1 rounded-full bg-metal-purple-500/20 text-metal-purple-400 text-sm font-medium">
                                    {job.type}
                                </span>
                            </div>
                            <h2 className="text-4xl font-heading font-bold text-white mb-4">{job.title}</h2>
                            <div className="flex flex-wrap gap-6 text-muted-foreground">
                                <span className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4 text-metal-blue-400" />
                                    {job.location}
                                </span>
                                {job.salary && job.salary.trim() !== "" && (
                                    <span className="flex items-center gap-2">
                                        <IndianRupee className="w-4 h-4 text-green-400" />
                                        {job.salary}
                                    </span>
                                )}
                                {job.experience && (
                                    <span className="flex items-center gap-2">
                                        <Clock className="w-4 h-4 text-purple-400" />
                                        {job.experience}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="space-y-6 text-gray-300 leading-relaxed mb-10">
                            <h3 className="text-xl font-bold text-white">Role Overview</h3>
                            <p className="whitespace-pre-wrap">{job.description}</p>
                        </div>

                        <div className="flex justify-end">
                            <Button size="lg" className="bg-gradient-to-r from-metal-blue-500 to-metal-purple-500 text-white font-semibold text-lg px-8 py-6 rounded-xl hover:shadow-lg hover:shadow-metal-blue-500/25 transition-all" onClick={onStartApply}>
                                Apply for this Position <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </div>
                    </div>
                ) : (
                    <ApplicationWizard job={job} onSubmit={onSubmitApplication} onClose={onClose} />
                )}
            </motion.div>
        </motion.div>
    );
}

const ApplicationWizard = ({ job, onSubmit, onClose }: { job: Job, onSubmit: (data: any) => Promise<void>, onClose: () => void }) => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        applicant_name: "",
        email: "",
        phone: "",
        institution: "",
        qualification: "",
        graduation_year: "",
        city: "",
        country: "",
        hear_about_us: "",
        answers: {} as Record<string, string>
    });
    const [resumeFile, setResumeFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const hasQuestions = job.questions && job.questions.length > 0;
    const totalSteps = hasQuestions ? 5 : 4;

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setResumeFile(file);
        }
    };

    const handleNext = async () => {
        // Validation check before proceeding
        if (step === 1 && !resumeFile) {
            toast.error("Please upload your resume");
            return;
        }
        if (step === 2 && (!formData.applicant_name.trim() || !formData.email.trim() || !formData.phone.trim())) {
            toast.error("Please fill in all personal fields");
            return;
        }
        if (step === 3 && (
            !formData.institution.trim() ||
            !formData.qualification.trim() ||
            !formData.graduation_year.trim() ||
            !formData.city.trim() ||
            !formData.country.trim() ||
            !formData.hear_about_us.trim()
        )) {
            toast.error("Please fill in all education, location, and referral fields");
            return;
        }

        if (step < totalSteps) {
            setStep(step + 1);
        } else {
            // Submit
            setIsSubmitting(true);
            try {
                // Pre-check for duplicate application before uploading resume file to storage
                const normName = formData.applicant_name?.trim().toLowerCase();
                const normPhone = formData.phone ? formData.phone.replace(/\D/g, "") : "";

                const { data: existingApps } = await supabase
                    .from('job_applications')
                    .select('id, applicant_name, phone')
                    .eq('job_id', job.id);

                if (existingApps && existingApps.length > 0) {
                    const isDup = existingApps.some(ex => {
                        const exName = ex.applicant_name?.trim().toLowerCase();
                        const exPhone = ex.phone ? ex.phone.replace(/\D/g, "") : "";
                        const isNameMatch = exName === normName;
                        const isPhoneMatch = normPhone.length > 0 && exPhone.length > 0
                            ? (exPhone === normPhone || exPhone.endsWith(normPhone) || normPhone.endsWith(exPhone))
                            : ex.phone?.trim() === formData.phone?.trim();
                        return isNameMatch && isPhoneMatch;
                    });

                    if (isDup) {
                        toast.error(`You have already applied for "${job.title}" with contact number "${formData.phone}". Duplicate applications are not allowed.`);
                        setIsSubmitting(false);
                        return;
                    }
                }

                // 1. Upload Resume
                let resumeUrl = "";
                if (resumeFile) {
                    const fileExt = resumeFile.name.split('.').pop();
                    const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;

                    const { data: uploadData, error: uploadError } = await supabase.storage
                        .from('resumes')
                        .upload(fileName, resumeFile);

                    if (uploadError) throw uploadError;

                    const { data: { publicUrl } } = supabase.storage
                        .from('resumes')
                        .getPublicUrl(fileName);

                    resumeUrl = publicUrl;
                }

                // 2. Submit Application
                const combinedAnswers: Record<string, string> = {
                    "Educational Institution": formData.institution.trim(),
                    "Qualification": formData.qualification.trim(),
                    "Year of Graduation": formData.graduation_year.trim(),
                    "City of Residence": formData.city.trim(),
                    "Country": formData.country.trim(),
                    "Where did you hear about us?": formData.hear_about_us.trim(),
                    ...formData.answers
                };

                await onSubmit({
                    applicant_name: formData.applicant_name.trim(),
                    email: formData.email.trim(),
                    phone: formData.phone.trim(),
                    resume_url: resumeUrl,
                    answers: combinedAnswers
                });

                toast.success("Application submitted successfully!");
                onClose();

            } catch (error: any) {
                console.error("Submission error:", error);
                toast.error(error?.message || "Failed to submit application. Please try again.");
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    return (
        <div className="p-5 md:p-12 h-full flex flex-col">
            {/* Progress Bar */}
            <div className="mb-8 pr-12">
                <div className="flex justify-between text-sm font-medium mb-2 text-muted-foreground">
                    <span>Step {step} of {totalSteps}</span>
                    <span>{Math.round((step / totalSteps) * 100)}% Complete</span>
                </div>
                <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(step / totalSteps) * 100}%` }}
                        className="h-full bg-gradient-to-r from-metal-blue-500 to-metal-purple-500"
                    />
                </div>
            </div>

            <div className="flex-grow">
                {step === 1 && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                        <h3 className="text-2xl font-bold text-white">Upload Resume</h3>
                        <div className="border-2 border-dashed border-white/20 rounded-xl p-10 text-center hover:border-metal-blue-500/50 transition-colors bg-white/5">
                            <input
                                type="file"
                                id="resume-upload"
                                className="hidden"
                                accept=".pdf,.doc,.docx"
                                onChange={handleFileUpload}
                            />
                            <label htmlFor="resume-upload" className="cursor-pointer flex flex-col items-center">
                                {resumeFile ? (
                                    <>
                                        <FileText className="w-16 h-16 text-green-400 mb-4" />
                                        <p className="text-lg font-medium text-white mb-2">{resumeFile.name}</p>
                                        <p className="text-sm text-green-400">Ready to upload</p>
                                    </>
                                ) : (
                                    <>
                                        <Upload className="w-16 h-16 text-metal-blue-400 mb-4" />
                                        <p className="text-lg font-medium text-white mb-2">Drop your resume here or click to browse</p>
                                        <p className="text-sm text-muted-foreground">PDF, DOC, DOCX up to 10MB</p>
                                    </>
                                )}
                            </label>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                        <h3 className="text-2xl font-bold text-white">Personal Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-metal-blue-300">Full Name <span className="text-red-400">*</span></label>
                                <Input
                                    value={formData.applicant_name}
                                    onChange={(e) => setFormData({ ...formData, applicant_name: e.target.value })}
                                    className="bg-white/5 border-white/10 text-white"
                                    placeholder="John Doe"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-metal-blue-300">Email Address <span className="text-red-400">*</span></label>
                                <Input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="bg-white/5 border-white/10 text-white"
                                    placeholder="john@example.com"
                                    required
                                />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <label className="text-sm font-medium text-metal-blue-300">Phone Number <span className="text-red-400">*</span></label>
                                <Input
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    className="bg-white/5 border-white/10 text-white"
                                    placeholder="+1 (555) 000-0000"
                                    required
                                />
                            </div>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                        <div>
                            <h3 className="text-2xl font-bold text-white">Education & Background</h3>
                            <p className="text-sm text-muted-foreground mt-1">Please provide your educational details, location, and where you found this opportunity.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {/* 1. Name of the educational Institution */}
                            <div className="space-y-2 md:col-span-2">
                                <label className="text-sm font-medium text-metal-blue-300 flex items-center gap-1.5">
                                    <GraduationCap className="w-4 h-4 text-metal-blue-400" />
                                    <span>Name of the Educational Institution <span className="text-red-400">*</span></span>
                                </label>
                                <Input
                                    value={formData.institution}
                                    onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-metal-blue-500"
                                    placeholder="e.g. Anna University, IIT Madras, Delhi University"
                                    required
                                />
                            </div>

                            {/* 2. Qualification */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-metal-blue-300">
                                    Qualification / Degree <span className="text-red-400">*</span>
                                </label>
                                <Input
                                    value={formData.qualification}
                                    onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-metal-blue-500"
                                    placeholder="e.g. B.Tech Computer Science, BCA, MCA, M.S"
                                    required
                                />
                            </div>

                            {/* 2b. Years of graduation */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-metal-blue-300 flex items-center gap-1.5">
                                    <Calendar className="w-3.5 h-3.5 text-metal-blue-400" />
                                    <span>Year of Graduation <span className="text-red-400">*</span></span>
                                </label>
                                <Input
                                    value={formData.graduation_year}
                                    onChange={(e) => setFormData({ ...formData, graduation_year: e.target.value })}
                                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-metal-blue-500"
                                    placeholder="e.g. 2024, 2025, 2026"
                                    required
                                />
                            </div>

                            {/* 3. City of residence */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-metal-blue-300 flex items-center gap-1.5">
                                    <MapPin className="w-3.5 h-3.5 text-metal-blue-400" />
                                    <span>City of Residence <span className="text-red-400">*</span></span>
                                </label>
                                <Input
                                    value={formData.city}
                                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-metal-blue-500"
                                    placeholder="e.g. Chennai, Bangalore, Hyderabad"
                                    required
                                />
                            </div>

                            {/* 3b. Country */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-metal-blue-300">
                                    Country <span className="text-red-400">*</span>
                                </label>
                                <Input
                                    value={formData.country}
                                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-metal-blue-500"
                                    placeholder="e.g. India, United States"
                                    required
                                />
                            </div>

                            {/* 4. Where did you hear about us ? */}
                            <div className="space-y-2 md:col-span-2">
                                <label className="text-sm font-medium text-metal-blue-300">
                                    Where did you hear about us? <span className="text-red-400">*</span>
                                </label>
                                <select
                                    value={formData.hear_about_us}
                                    onChange={(e) => setFormData({ ...formData, hear_about_us: e.target.value })}
                                    className="w-full bg-[#0f172a] border border-white/10 text-white rounded-md p-2.5 text-sm focus:border-metal-blue-500 focus:outline-none transition-colors"
                                    required
                                >
                                    <option value="" disabled className="text-gray-400">Select an option</option>
                                    <option value="LinkedIn">LinkedIn</option>
                                    <option value="Campus / College Placement">Campus / College Placement</option>
                                    <option value="Instagram / Social Media">Instagram / Social Media</option>
                                    <option value="Friend or Colleague Referral">Friend or Colleague Referral</option>
                                    <option value="Google / Web Search">Google / Web Search</option>
                                    <option value="Tech Event / Workshop / Hackathon">Tech Event / Workshop / Hackathon</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                        </div>
                    </div>
                )}

                {(step === 4 && hasQuestions) && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                        <h3 className="text-2xl font-bold text-white">Additional Questions</h3>
                        <div className="space-y-8">
                            {job.questions.map((q) => (
                                <div key={q.id} className="space-y-3">
                                    <p className="font-medium text-white">{q.question}</p>
                                    <div className="space-y-2">
                                        {q.options.map((opt, idx) => (
                                            <label key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10 hover:border-metal-blue-500/50 cursor-pointer transition-all">
                                                <input
                                                    type="radio"
                                                    name={q.id}
                                                    value={opt}
                                                    checked={formData.answers[q.question] === opt}
                                                    onChange={() => setFormData(prev => ({
                                                        ...prev,
                                                        answers: { ...prev.answers, [q.question]: opt }
                                                    }))}
                                                    className="w-4 h-4 text-metal-blue-500 focus:ring-metal-blue-500 bg-transparent border-white/30"
                                                />
                                                <span className="text-sm text-gray-300">{opt}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {step === totalSteps && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                        <h3 className="text-2xl font-bold text-white">Review & Submit</h3>
                        <div className="bg-white/5 rounded-xl p-6 space-y-4 border border-white/10">
                            <div>
                                <p className="text-xs text-muted-foreground uppercase tracking-wider">Applicant</p>
                                <p className="text-lg font-bold text-white">{formData.applicant_name}</p>
                                <p className="text-sm text-gray-400">{formData.email} • {formData.phone}</p>
                            </div>

                            <div className="border-t border-white/10 pt-4">
                                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Education & Background</p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                                    <div>
                                        <p className="text-gray-400 text-xs">Institution</p>
                                        <p className="text-white font-medium">{formData.institution || "N/A"}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-400 text-xs">Qualification & Year</p>
                                        <p className="text-white font-medium">{formData.qualification} ({formData.graduation_year})</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-400 text-xs">Residence</p>
                                        <p className="text-white font-medium">{formData.city}, {formData.country}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-400 text-xs">Where did you hear about us?</p>
                                        <p className="text-white font-medium">{formData.hear_about_us || "N/A"}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="border-t border-white/10 pt-4">
                                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Resume</p>
                                <div className="flex items-center gap-2 text-green-400 bg-green-400/10 px-3 py-2 rounded-lg inline-flex">
                                    <FileText className="w-4 h-4" />
                                    <span className="text-sm truncate max-w-[200px]">{resumeFile?.name}</span>
                                </div>
                            </div>

                            {Object.keys(formData.answers).length > 0 && (
                                <div className="border-t border-white/10 pt-4">
                                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Questionnaire</p>
                                    <ul className="space-y-2 text-sm">
                                        {Object.entries(formData.answers).map(([q, a], i) => (
                                            <li key={i}>
                                                <p className="text-gray-400 mb-1">{q}</p>
                                                <p className="text-white pl-4 border-l-2 border-metal-blue-500">{a}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            <div className="flex justify-between items-center mt-8 pt-8 border-t border-white/10">
                {step > 1 ? (
                    <Button variant="ghost" onClick={() => setStep(step - 1)} className="text-muted-foreground hover:text-white">
                        <ChevronLeft className="w-4 h-4 mr-2" /> Back
                    </Button>
                ) : (
                    <div />
                )}

                <Button
                    onClick={handleNext}
                    disabled={isSubmitting}
                    className="bg-gradient-to-r from-metal-blue-500 to-metal-purple-500 text-white min-w-[140px]"
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Submitting...
                        </>
                    ) : (
                        <>
                            {step === totalSteps ? "Submit Application" : "Next Step"}
                            {step !== totalSteps && <ChevronRight className="w-4 h-4 ml-2" />}
                        </>
                    )}
                </Button>
            </div>
        </div>
    );
}

export default Careers;
