import React, { useState, useMemo } from "react";
import { JobApplication, Job } from "@/context/DataContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { GlassCard } from "@/components/ui/GlassCard";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
    DropdownMenuLabel
} from "@/components/ui/dropdown-menu";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription
} from "@/components/ui/dialog";
import {
    FileText,
    Download,
    FileSpreadsheet,
    Archive,
    CheckCircle,
    X,
    Search,
    ChevronDown,
    ChevronUp,
    ExternalLink,
    Printer,
    Briefcase,
    GraduationCap,
    Filter,
    CheckSquare,
    Square,
    Loader2,
    Calendar,
    Phone,
    PhoneCall,
    Eye,
    RotateCcw,
    Copy,
    Mail,
    ArrowLeft,
    Sparkles,
    Clock,
    AlertTriangle,
    MapPin,
    Pencil,
    Plus,
    Trash2,
    Save,
    AlertCircle
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import {
    exportJobApplicationsCSV,
    downloadApplicationsZip,
    downloadFileFromUrl,
    printOrDownloadApplicationProfile,
    sanitizeFileName
} from "@/utils/downloadHelpers";

interface ApplicationsManagerProps {
    allPositions: Job[];
    jobApplications: JobApplication[];
    selectedJobId: string | null;
    setSelectedJobId: (id: string | null) => void;
    updateJobApplicationStatus: (id: string, status: "pending" | "approved" | "rejected", email?: string) => Promise<void>;
    updateJobApplicationDetails?: (id: string, updates: { applicant_name?: string; email?: string; phone?: string; answers?: any; status?: "pending" | "approved" | "rejected"; }) => Promise<void>;
}

export const ApplicationsManager: React.FC<ApplicationsManagerProps> = ({
    allPositions,
    jobApplications,
    selectedJobId,
    setSelectedJobId,
    updateJobApplicationStatus,
    updateJobApplicationDetails
}) => {
    // Portal-level state
    const [portalSearch, setPortalSearch] = useState("");
    const [positionTypeFilter, setPositionTypeFilter] = useState<"all" | "jobs" | "internships">("all");

    // Drill-down level state
    const [candidateSearch, setCandidateSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState<"all" | "pending" | "approved" | "rejected">("all");
    const [detailsFilter, setDetailsFilter] = useState<"all" | "missing" | "complete">("all");
    const [resumeFilter, setResumeFilter] = useState<"all" | "has_resume" | "no_resume">("all");
    const [callFilter, setCallFilter] = useState<"all" | "called" | "not_called">("all");
    const [duplicateFilter, setDuplicateFilter] = useState<"all" | "duplicates_only">("all");
    const [sortBy, setSortBy] = useState<"newest" | "oldest" | "name_asc" | "name_desc" | "most_called">("newest");
    const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
    const [selectedAppIds, setSelectedAppIds] = useState<Set<string>>(new Set());
    const [expandedAnswers, setExpandedAnswers] = useState<Set<string>>(new Set());

    // Progress Modal for Bulk Zip Generation
    const [zipModalOpen, setZipModalOpen] = useState(false);
    const [zipProgress, setZipProgress] = useState({ current: 0, total: 0, message: "" });
    const [isGeneratingZip, setIsGeneratingZip] = useState(false);
    const [singleDownloadingId, setSingleDownloadingId] = useState<string | null>(null);

    // Call tracking state (persisted locally and synced with candidate answers)
    const [callData, setCallData] = useState<Record<string, { count: number; lastCalled?: string }>>(() => {
        try {
            const saved = localStorage.getItem("unai_applicant_calls");
            return saved ? JSON.parse(saved) : {};
        } catch {
            return {};
        }
    });

    // Modal state for viewing applicant full profile
    const [viewingApplicant, setViewingApplicant] = useState<JobApplication | null>(null);

    // State for editing questionnaire responses & applicant details
    const [editingApplicant, setEditingApplicant] = useState<JobApplication | null>(null);
    const [editForm, setEditForm] = useState({
        name: "",
        email: "",
        phone: "",
        institution: "",
        qualification: "",
        gradYear: "",
        city: "",
        country: "",
        source: "",
        positionAnswers: {} as Record<string, string>,
        customQuestions: [] as Array<{ id: string; question: string; answer: string }>
    });
    const [editInitialCustomKeys, setEditInitialCustomKeys] = useState<string[]>([]);
    const [isSavingEdit, setIsSavingEdit] = useState(false);

    // Selected job object
    const selectedJob = useMemo(() => {
        if (!selectedJobId) return null;
        if (selectedJobId === "all") {
            return {
                id: "all",
                title: "All Applicants (Across All Positions)",
                department: "All Departments",
                location: "Company-Wide",
                type: "All Positions",
                salary: "Various",
                description: "Comprehensive view of all candidate applications received across all open positions."
            } as Job;
        }
        return allPositions.find(j => j.id === selectedJobId) || null;
    }, [selectedJobId, allPositions]);

    // Applications for selected job
    const positionApplications = useMemo(() => {
        if (!selectedJobId) return [];
        if (selectedJobId === "all") return jobApplications;
        return jobApplications.filter(app => app.job_id === selectedJobId);
    }, [selectedJobId, jobApplications]);

    // Detect duplicate applications within this position by matching normalized name & phone
    const duplicateIds = useMemo(() => {
        const map = new Map<string, string[]>();
        positionApplications.forEach(app => {
            const normName = app.applicant_name?.trim().toLowerCase();
            const normPhone = app.phone ? app.phone.replace(/\D/g, "") : "";
            const key = `${normName}___${normPhone || app.phone?.trim()}`;
            if (!map.has(key)) map.set(key, []);
            map.get(key)!.push(app.id);
        });
        const dups = new Set<string>();
        map.forEach(ids => {
            if (ids.length > 1) {
                ids.forEach(id => dups.add(id));
            }
        });
        return dups;
    }, [positionApplications]);

    // Filtered and sorted applications within selected job
    const filteredApplications = useMemo(() => {
        const list = positionApplications.filter(app => {
            // Status filter
            if (statusFilter !== "all" && app.status !== statusFilter) {
                return false;
            }

            // Details / Questionnaire filter (crucial for finding 180+ previous applicants missing details)
            const hasAnswers =
                app.answers &&
                typeof app.answers === "object" &&
                Object.keys(app.answers).length > 0;
            const institution = app.answers?.["Educational Institution"] || app.answers?.institution;

            if (detailsFilter === "missing") {
                // Either no questionnaire answers recorded or missing institution
                if (hasAnswers && institution) return false;
            } else if (detailsFilter === "complete") {
                if (!hasAnswers || !institution) return false;
            }

            // Resume filter
            const hasResume = Boolean(app.resume_url && app.resume_url.trim() !== "");
            if (resumeFilter === "has_resume" && !hasResume) return false;
            if (resumeFilter === "no_resume" && hasResume) return false;

            // Call filter
            const { count: callCount } = getApplicantCallInfo(app);
            if (callFilter === "called" && callCount === 0) return false;
            if (callFilter === "not_called" && callCount > 0) return false;

            // Duplicates filter
            if (duplicateFilter === "duplicates_only" && !duplicateIds.has(app.id)) {
                return false;
            }

            // Search query across all candidate attributes
            const searchLower = candidateSearch.trim().toLowerCase();
            if (!searchLower) return true;

            const nameMatch = app.applicant_name?.toLowerCase().includes(searchLower);
            const emailMatch = app.email?.toLowerCase().includes(searchLower);
            const phoneMatch = app.phone?.toLowerCase().includes(searchLower);

            // Match position title
            const job = allPositions.find(j => j.id === app.job_id);
            const jobMatch = job?.title?.toLowerCase().includes(searchLower);

            // Match education & location
            const instMatch = String(app.answers?.["Educational Institution"] || app.answers?.institution || "").toLowerCase().includes(searchLower);
            const qualMatch = String(app.answers?.["Qualification"] || app.answers?.qualification || "").toLowerCase().includes(searchLower);
            const cityMatch = String(app.answers?.["City of Residence"] || app.answers?.city || "").toLowerCase().includes(searchLower);
            const countryMatch = String(app.answers?.["Country"] || app.answers?.country || "").toLowerCase().includes(searchLower);
            const sourceMatch = String(app.answers?.["Where did you hear about us?"] || app.answers?.hear_about_us || "").toLowerCase().includes(searchLower);

            // Match any questionnaire answer text
            let answersMatch = false;
            if (app.answers && typeof app.answers === "object") {
                answersMatch = Object.entries(app.answers).some(([q, a]) => {
                    const qLower = String(q).toLowerCase();
                    const aLower = Array.isArray(a) ? a.join(" ").toLowerCase() : String(a).toLowerCase();
                    return qLower.includes(searchLower) || aLower.includes(searchLower);
                });
            }

            return (
                nameMatch ||
                emailMatch ||
                phoneMatch ||
                jobMatch ||
                instMatch ||
                qualMatch ||
                cityMatch ||
                countryMatch ||
                sourceMatch ||
                answersMatch
            );
        });

        // Sorting
        return list.sort((a, b) => {
            if (sortBy === "newest") {
                const timeA = a.created_at ? new Date(a.created_at).getTime() : 0;
                const timeB = b.created_at ? new Date(b.created_at).getTime() : 0;
                return timeB - timeA;
            }
            if (sortBy === "oldest") {
                const timeA = a.created_at ? new Date(a.created_at).getTime() : 0;
                const timeB = b.created_at ? new Date(b.created_at).getTime() : 0;
                return timeA - timeB;
            }
            if (sortBy === "name_asc") {
                return (a.applicant_name || "").localeCompare(b.applicant_name || "");
            }
            if (sortBy === "name_desc") {
                return (b.applicant_name || "").localeCompare(a.applicant_name || "");
            }
            if (sortBy === "most_called") {
                const callA = getApplicantCallInfo(a).count;
                const callB = getApplicantCallInfo(b).count;
                return callB - callA;
            }
            return 0;
        });
    }, [
        positionApplications,
        statusFilter,
        candidateSearch,
        detailsFilter,
        resumeFilter,
        callFilter,
        duplicateFilter,
        sortBy,
        duplicateIds,
        allPositions,
        callData
    ]);

    // Overall portal filtered positions
    const filteredPositions = useMemo(() => {
        return allPositions.filter(pos => {
            const isInternship = pos.department === "Internship" || pos.type === "Internship";
            if (positionTypeFilter === "jobs" && isInternship) return false;
            if (positionTypeFilter === "internships" && !isInternship) return false;

            const searchLower = portalSearch.trim().toLowerCase();
            if (!searchLower) return true;
            return (
                pos.title?.toLowerCase().includes(searchLower) ||
                pos.department?.toLowerCase().includes(searchLower) ||
                pos.location?.toLowerCase().includes(searchLower)
            );
        });
    }, [allPositions, positionTypeFilter, portalSearch]);

    // Stats calculations
    const totalAppsCount = jobApplications.length;
    const pendingAppsCount = jobApplications.filter(a => a.status === "pending").length;
    const approvedAppsCount = jobApplications.filter(a => a.status === "approved").length;
    const rejectedAppsCount = jobApplications.filter(a => a.status === "rejected").length;

    // Toggle single application selection
    const toggleSelectApp = (id: string) => {
        setSelectedAppIds(prev => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    };

    // Toggle select all filtered applications
    const toggleSelectAll = () => {
        if (selectedAppIds.size === filteredApplications.length && filteredApplications.length > 0) {
            setSelectedAppIds(new Set());
        } else {
            setSelectedAppIds(new Set(filteredApplications.map(a => a.id)));
        }
    };

    // Toggle answer accordion
    const toggleAnswers = (id: string) => {
        setExpandedAnswers(prev => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    };

    // Helper: Retrieve call information for an applicant
    const getApplicantCallInfo = (app: JobApplication) => {
        const local = callData[app.id];
        const serverCount = app.answers?.call_count !== undefined ? Number(app.answers.call_count) : 0;
        const count = local?.count !== undefined ? Math.max(local.count, serverCount) : serverCount;
        const lastCalled = local?.lastCalled || app.answers?.last_called_at;
        return { count, lastCalled };
    };

    // Handler: Trigger phone call, increment counter, save to state, localStorage & Supabase
    const handleCallApplicant = async (app: JobApplication) => {
        if (!app.phone) {
            toast.error("No phone number recorded for this applicant");
            return;
        }

        const { count } = getApplicantCallInfo(app);
        const newCount = count + 1;
        const now = new Date().toISOString();

        const updatedMap = {
            ...callData,
            [app.id]: {
                count: newCount,
                lastCalled: now
            }
        };
        setCallData(updatedMap);

        try {
            localStorage.setItem("unai_applicant_calls", JSON.stringify(updatedMap));
        } catch (e) {
            console.warn("Could not cache call count to localStorage:", e);
        }

        // Persist to Supabase answers in background
        try {
            const currentAnswers = typeof app.answers === "object" && app.answers !== null ? { ...app.answers } : {};
            await supabase
                .from("job_applications")
                .update({
                    answers: {
                        ...currentAnswers,
                        call_count: newCount,
                        last_called_at: now
                    }
                })
                .eq("id", app.id);
        } catch (dbErr) {
            console.warn("Could not sync call count to Supabase:", dbErr);
        }

        // Initiate phone call
        const cleanPhone = app.phone.trim().replace(/\s+/g, "");
        window.location.href = `tel:${cleanPhone}`;
        toast.success(`Calling ${app.applicant_name} (${app.phone}) — Call count: ${newCount}`);
    };

    // Handler: Reset call counter back to 0
    const handleResetCallCount = async (appId: string) => {
        const updatedMap = { ...callData };
        delete updatedMap[appId];
        setCallData(updatedMap);

        try {
            localStorage.setItem("unai_applicant_calls", JSON.stringify(updatedMap));
        } catch {}

        try {
            const app = jobApplications.find(a => a.id === appId);
            if (app) {
                const currentAnswers = typeof app.answers === "object" && app.answers !== null ? { ...app.answers } : {};
                delete currentAnswers.call_count;
                delete currentAnswers.last_called_at;
                await supabase
                    .from("job_applications")
                    .update({ answers: currentAnswers })
                    .eq("id", appId);
            }
        } catch (err) {
            console.warn("Could not reset call count in Supabase:", err);
        }
        toast.info("Call counter reset to 0");
    };

    // Helper: Copy text to clipboard with notification
    const copyToClipboard = (text: string, label: string) => {
        if (!text) return;
        navigator.clipboard.writeText(text);
        toast.success(`Copied ${label} to clipboard: ${text}`);
    };

    // Helper: Open Edit Modal and pre-populate all fields and questionnaire responses
    const handleOpenEditModal = (app: JobApplication) => {
        let rawAnswers = app.answers;
        if (typeof rawAnswers === "string") {
            try {
                rawAnswers = JSON.parse(rawAnswers);
            } catch {
                rawAnswers = {};
            }
        }
        if (!rawAnswers || typeof rawAnswers !== "object") {
            rawAnswers = {};
        }

        const institution = rawAnswers["Educational Institution"] || rawAnswers.institution || "";
        const qualification = rawAnswers["Qualification"] || rawAnswers.qualification || "";
        const gradYear = rawAnswers["Year of Graduation"] || rawAnswers.graduation_year || "";
        const city = rawAnswers["City of Residence"] || rawAnswers.city || "";
        const country = rawAnswers["Country"] || rawAnswers.country || "";
        const source = rawAnswers["Where did you hear about us?"] || rawAnswers.hear_about_us || "";

        const systemKeys = new Set([
            "call_count",
            "last_called_at",
            "institution",
            "qualification",
            "graduation_year",
            "city",
            "country",
            "hear_about_us",
            "Educational Institution",
            "Qualification",
            "Year of Graduation",
            "City of Residence",
            "Country",
            "Where did you hear about us?"
        ]);

        const appJob = allPositions.find(p => p.id === app.job_id);
        const positionAnswers: Record<string, string> = {};
        const handledKeys = new Set<string>();

        if (appJob?.questions && appJob.questions.length > 0) {
            appJob.questions.forEach(q => {
                const val = rawAnswers[q.question] ?? "";
                positionAnswers[q.question] = Array.isArray(val) ? val.join(", ") : String(val);
                handledKeys.add(q.question);
            });
        }

        const initialCustomKeys: string[] = [];
        const customQuestions: Array<{ id: string; question: string; answer: string }> = [];

        Object.entries(rawAnswers).forEach(([k, v], idx) => {
            if (!systemKeys.has(k) && !handledKeys.has(k)) {
                initialCustomKeys.push(k);
                customQuestions.push({
                    id: `field_${idx}_${Date.now()}`,
                    question: k,
                    answer: Array.isArray(v) ? v.join(", ") : String(v)
                });
            }
        });

        setEditInitialCustomKeys(initialCustomKeys);
        setEditForm({
            name: app.applicant_name || "",
            email: app.email || "",
            phone: app.phone || "",
            institution,
            qualification,
            gradYear,
            city,
            country,
            source,
            positionAnswers,
            customQuestions
        });
        setEditingApplicant(app);
    };

    const handleAddCustomQuestion = () => {
        setEditForm(prev => ({
            ...prev,
            customQuestions: [
                ...prev.customQuestions,
                { id: `custom_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`, question: "", answer: "" }
            ]
        }));
    };

    const handleUpdateCustomQuestion = (id: string, field: "question" | "answer", val: string) => {
        setEditForm(prev => ({
            ...prev,
            customQuestions: prev.customQuestions.map(item =>
                item.id === id ? { ...item, [field]: val } : item
            )
        }));
    };

    const handleRemoveCustomQuestion = (id: string) => {
        setEditForm(prev => ({
            ...prev,
            customQuestions: prev.customQuestions.filter(item => item.id !== id)
        }));
    };

    // Handler: Save updated questionnaire answers and applicant details
    const handleSaveApplicantDetails = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingApplicant) return;

        setIsSavingEdit(true);
        const toastId = toast.loading(`Saving details for ${editForm.name || editingApplicant.applicant_name}...`);

        try {
            let currentAnswers = editingApplicant.answers;
            if (typeof currentAnswers === "string") {
                try {
                    currentAnswers = JSON.parse(currentAnswers);
                } catch {
                    currentAnswers = {};
                }
            }
            if (!currentAnswers || typeof currentAnswers !== "object") {
                currentAnswers = {};
            }

            const updatedAnswers: Record<string, any> = {
                ...currentAnswers
            };

            // Standard education and location fields
            if (editForm.institution.trim()) updatedAnswers["Educational Institution"] = editForm.institution.trim();
            else {
                delete updatedAnswers["Educational Institution"];
                delete updatedAnswers["institution"];
            }

            if (editForm.qualification.trim()) updatedAnswers["Qualification"] = editForm.qualification.trim();
            else {
                delete updatedAnswers["Qualification"];
                delete updatedAnswers["qualification"];
            }

            if (editForm.gradYear.trim()) updatedAnswers["Year of Graduation"] = editForm.gradYear.trim();
            else {
                delete updatedAnswers["Year of Graduation"];
                delete updatedAnswers["graduation_year"];
            }

            if (editForm.city.trim()) updatedAnswers["City of Residence"] = editForm.city.trim();
            else {
                delete updatedAnswers["City of Residence"];
                delete updatedAnswers["city"];
            }

            if (editForm.country.trim()) updatedAnswers["Country"] = editForm.country.trim();
            else {
                delete updatedAnswers["Country"];
                delete updatedAnswers["country"];
            }

            if (editForm.source.trim()) updatedAnswers["Where did you hear about us?"] = editForm.source.trim();
            else {
                delete updatedAnswers["Where did you hear about us?"];
                delete updatedAnswers["hear_about_us"];
            }

            // Role-specific questionnaire questions
            Object.entries(editForm.positionAnswers).forEach(([q, a]) => {
                if (a.trim()) {
                    updatedAnswers[q] = a.trim();
                } else {
                    delete updatedAnswers[q];
                }
            });

            // Delete previous custom keys to handle renames/removals
            editInitialCustomKeys.forEach(k => {
                delete updatedAnswers[k];
            });

            // Re-add current custom questions
            editForm.customQuestions.forEach(({ question, answer }) => {
                if (question.trim()) {
                    updatedAnswers[question.trim()] = answer.trim();
                }
            });

            // Contact info
            const updatedName = editForm.name.trim() || editingApplicant.applicant_name;
            const updatedEmail = editForm.email.trim() || editingApplicant.email;
            const updatedPhone = editForm.phone.trim() || editingApplicant.phone;

            const updatePayload = {
                applicant_name: updatedName,
                email: updatedEmail,
                phone: updatedPhone,
                answers: updatedAnswers
            };

            if (updateJobApplicationDetails) {
                await updateJobApplicationDetails(editingApplicant.id, updatePayload);
            } else {
                const { error } = await supabase
                    .from("job_applications")
                    .update(updatePayload)
                    .eq("id", editingApplicant.id);
                if (error) throw error;
            }

            // If viewingApplicant is open, update its state
            if (viewingApplicant?.id === editingApplicant.id) {
                setViewingApplicant(prev =>
                    prev
                        ? {
                              ...prev,
                              ...updatePayload
                          }
                        : null
                );
            }

            toast.dismiss(toastId);
            toast.success(`Updated details for ${updatedName}`);
            setEditingApplicant(null);
        } catch (err: any) {
            console.error("Error saving applicant details:", err);
            toast.dismiss(toastId);
            toast.error(`Failed to save details: ${err?.message || "Database error"}`);
        } finally {
            setIsSavingEdit(false);
        }
    };

    // Handler: Master CSV Export (All applications across all positions)
    const handleExportAllCSV = () => {
        if (jobApplications.length === 0) {
            toast.error("No applications available to export");
            return;
        }
        exportJobApplicationsCSV(
            jobApplications,
            allPositions,
            `UNAI_All_Applications_${new Date().toISOString().split("T")[0]}.csv`
        );
        toast.success(`Exported ${jobApplications.length} application(s) to CSV`);
    };

    // Handler: Master ZIP Export (All resumes across all positions)
    const handleDownloadAllZip = async () => {
        if (jobApplications.length === 0) {
            toast.error("No applications available to download");
            return;
        }
        setZipProgress({ current: 0, total: jobApplications.length, message: "Preparing all applications..." });
        setZipModalOpen(true);
        setIsGeneratingZip(true);

        try {
            const { success, failed } = await downloadApplicationsZip(
                jobApplications,
                allPositions,
                `UNAI_All_Applications_Resumes_${new Date().toISOString().split("T")[0]}.zip`,
                (current, total, message) => {
                    setZipProgress({ current, total, message });
                }
            );
            toast.success(`Exported ZIP with ${success} resume(s)${failed > 0 ? ` (${failed} skipped/links saved)` : ""}`);
        } catch (err) {
            console.error("ZIP Generation error:", err);
            toast.error("Failed to generate ZIP archive");
        } finally {
            setIsGeneratingZip(false);
            setTimeout(() => setZipModalOpen(false), 800);
        }
    };

    // Handler: Export current position applications to CSV
    const handleExportPositionCSV = (jobId: string, customTitle?: string) => {
        const apps = jobId === "all" ? jobApplications : jobApplications.filter(a => a.job_id === jobId);
        if (apps.length === 0) {
            toast.error("No applications found for this position");
            return;
        }
        const job = allPositions.find(j => j.id === jobId);
        const title = customTitle || (jobId === "all" ? "All Positions" : job?.title) || "Position";
        exportJobApplicationsCSV(
            apps,
            allPositions,
            `${sanitizeFileName(title)}_Applications_${new Date().toISOString().split("T")[0]}.csv`
        );
        toast.success(`Exported ${apps.length} application(s) for "${title}" to CSV`);
    };

    // Handler: Download current position resumes ZIP
    const handleDownloadPositionZip = async (jobId: string, customTitle?: string) => {
        const apps = jobId === "all" ? jobApplications : jobApplications.filter(a => a.job_id === jobId);
        if (apps.length === 0) {
            toast.error("No applications found for this position");
            return;
        }
        const job = allPositions.find(j => j.id === jobId);
        const title = customTitle || (jobId === "all" ? "All Positions" : job?.title) || "Position";

        setZipProgress({ current: 0, total: apps.length, message: `Preparing resumes for ${title}...` });
        setZipModalOpen(true);
        setIsGeneratingZip(true);

        try {
            const { success, failed } = await downloadApplicationsZip(
                apps,
                allPositions,
                `${sanitizeFileName(title)}_Resumes_${new Date().toISOString().split("T")[0]}.zip`,
                (current, total, message) => {
                    setZipProgress({ current, total, message });
                }
            );
            toast.success(`Downloaded ZIP for "${title}" (${success} resumes bundled)`);
        } catch (err) {
            console.error("Position ZIP error:", err);
            toast.error("Failed to generate position ZIP archive");
        } finally {
            setIsGeneratingZip(false);
            setTimeout(() => setZipModalOpen(false), 800);
        }
    };

    // Handler: Export selected applications to CSV
    const handleExportSelectedCSV = () => {
        const selectedApps = positionApplications.filter(a => selectedAppIds.has(a.id));
        if (selectedApps.length === 0) {
            toast.error("No applications selected");
            return;
        }
        const title = selectedJob?.title || "Selected";
        exportJobApplicationsCSV(
            selectedApps,
            allPositions,
            `${sanitizeFileName(title)}_Selected_${selectedApps.length}_Applications.csv`
        );
        toast.success(`Exported ${selectedApps.length} selected application(s) to CSV`);
    };

    // Handler: Download selected resumes as ZIP
    const handleDownloadSelectedZip = async () => {
        const selectedApps = positionApplications.filter(a => selectedAppIds.has(a.id));
        if (selectedApps.length === 0) {
            toast.error("No applications selected");
            return;
        }
        const title = selectedJob?.title || "Selected";

        setZipProgress({ current: 0, total: selectedApps.length, message: `Preparing ${selectedApps.length} selected resumes...` });
        setZipModalOpen(true);
        setIsGeneratingZip(true);

        try {
            const { success, failed } = await downloadApplicationsZip(
                selectedApps,
                allPositions,
                `${sanitizeFileName(title)}_Selected_${selectedApps.length}_Resumes.zip`,
                (current, total, message) => {
                    setZipProgress({ current, total, message });
                }
            );
            toast.success(`Downloaded ZIP of ${selectedApps.length} selected candidate(s)`);
        } catch (err) {
            console.error("Selected ZIP error:", err);
            toast.error("Failed to generate ZIP archive");
        } finally {
            setIsGeneratingZip(false);
            setTimeout(() => setZipModalOpen(false), 800);
        }
    };

    // Handler: Bulk Status Update (Approve / Reject)
    const handleBulkStatusUpdate = async (status: "approved" | "rejected") => {
        const selectedApps = positionApplications.filter(a => selectedAppIds.has(a.id));
        if (selectedApps.length === 0) return;

        const count = selectedApps.length;
        const confirmMsg = `Are you sure you want to mark ${count} application(s) as ${status.toUpperCase()}? Automated notification emails will be sent.`;
        if (!window.confirm(confirmMsg)) return;

        const toastId = toast.loading(`Updating ${count} application(s) to ${status}...`);
        let successCount = 0;

        for (const app of selectedApps) {
            try {
                await updateJobApplicationStatus(app.id, status, app.email);
                successCount++;
            } catch (err) {
                console.error(`Error updating application ${app.id}:`, err);
            }
        }

        toast.dismiss(toastId);
        toast.success(`Successfully updated ${successCount} of ${count} application(s) to ${status}`);
        setSelectedAppIds(new Set());
    };

    // Handler: Download Single Resume directly to disk
    const handleDownloadSingleResume = async (app: JobApplication) => {
        if (!app.resume_url) {
            toast.error("No resume attachment URL found for this candidate");
            return;
        }

        setSingleDownloadingId(app.id);
        const toastId = toast.loading(`Downloading resume for ${app.applicant_name}...`);

        try {
            const ext = app.resume_url.split("?")[0].split(".").pop() || "pdf";
            const safeExt = ["pdf", "docx", "doc", "rtf", "txt", "png", "jpg"].includes(ext.toLowerCase()) ? ext : "pdf";
            const filename = `Resume_${sanitizeFileName(app.applicant_name)}_${app.id.slice(0, 6)}.${safeExt}`;

            const success = await downloadFileFromUrl(app.resume_url, filename);
            toast.dismiss(toastId);
            if (success) {
                toast.success(`Downloaded resume for ${app.applicant_name}`);
            } else {
                toast.info(`Opened resume in a new tab for download.`);
            }
        } catch (err) {
            console.error("Single resume download error:", err);
            toast.dismiss(toastId);
            toast.error("Could not download resume directly. Opening link instead.");
            window.open(app.resume_url, "_blank");
        } finally {
            setSingleDownloadingId(null);
        }
    };

    // Render Full Applicant Profile Dialog Modal
    const renderViewApplicantModal = () => {
        if (!viewingApplicant) return null;
        const app = viewingApplicant;
        const appJob = allPositions.find(p => p.id === app.job_id) || selectedJob;
        const isIntern = appJob?.department === "Internship" || appJob?.type === "Internship";
        const isDup = duplicateIds.has(app.id);
        const { count: callCount, lastCalled } = getApplicantCallInfo(app);

        // Education & Location fields
        const institution = app.answers?.["Educational Institution"] || app.answers?.institution;
        const qualification = app.answers?.["Qualification"] || app.answers?.qualification;
        const gradYear = app.answers?.["Year of Graduation"] || app.answers?.graduation_year;
        const city = app.answers?.["City of Residence"] || app.answers?.city;
        const country = app.answers?.["Country"] || app.answers?.country;
        const source = app.answers?.["Where did you hear about us?"] || app.answers?.hear_about_us;

        // General questionnaire answers (excluding education/system keys)
        const systemKeys = new Set([
            "call_count",
            "last_called_at",
            "institution",
            "qualification",
            "graduation_year",
            "city",
            "country",
            "hear_about_us",
            "Educational Institution",
            "Qualification",
            "Year of Graduation",
            "City of Residence",
            "Country",
            "Where did you hear about us?"
        ]);
        const questionnaireEntries =
            typeof app.answers === "object" && app.answers !== null
                ? Object.entries(app.answers).filter(([k]) => !systemKeys.has(k))
                : [];

        return (
            <Dialog open={!!viewingApplicant} onOpenChange={(open) => !open && setViewingApplicant(null)}>
                <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-background/95 backdrop-blur-2xl border-primary/20 text-foreground p-6 sm:p-8">
                    <DialogHeader className="pb-4 border-b border-primary/10">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                            <div className="flex items-start gap-3.5">
                                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-metal-blue-500/20 to-metal-purple-500/20 border border-metal-blue-500/30 flex items-center justify-center font-bold text-lg text-metal-blue-300 shrink-0">
                                    {app.applicant_name ? app.applicant_name.charAt(0).toUpperCase() : "A"}
                                </div>
                                <div>
                                    <DialogTitle className="text-2xl font-bold font-heading text-foreground flex items-center gap-2.5 flex-wrap">
                                        <span>{app.applicant_name}</span>
                                        <span
                                            className={`px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider border ${
                                                app.status === "approved"
                                                    ? "bg-green-500/20 text-green-400 border-green-500/30"
                                                    : app.status === "rejected"
                                                    ? "bg-red-500/20 text-red-400 border-red-500/30"
                                                    : "bg-yellow-500/15 text-yellow-400 border-yellow-500/30"
                                            }`}
                                        >
                                            {app.status}
                                        </span>
                                        {isDup && (
                                            <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-400 border border-amber-500/30 flex items-center gap-1">
                                                <AlertTriangle className="w-3 h-3" /> Duplicate
                                            </span>
                                        )}
                                    </DialogTitle>
                                    <DialogDescription className="text-xs text-muted-foreground mt-1 flex items-center gap-2 flex-wrap">
                                        <span>Applied for:</span>
                                        <span className="font-semibold text-metal-blue-300">
                                            {appJob?.title || "Position"}
                                        </span>
                                        {isIntern ? (
                                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/15 text-purple-300 border border-purple-500/20">
                                                Internship
                                            </span>
                                        ) : (
                                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-300 border border-blue-500/20">
                                                Job
                                            </span>
                                        )}
                                        <span className="text-muted-foreground/60">•</span>
                                        <span className="flex items-center gap-1 text-muted-foreground">
                                            <Clock className="w-3 h-3 text-metal-blue-400" />
                                            {app.created_at ? new Date(app.created_at).toLocaleString() : "Date not recorded"}
                                        </span>
                                    </DialogDescription>
                                </div>
                            </div>
                        </div>
                    </DialogHeader>

                    <div className="space-y-6 pt-4">
                        {/* Contact & Calling Hub */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Phone Card with Call Button & Counter */}
                            <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 space-y-3">
                                <span className="text-xs uppercase font-semibold text-muted-foreground tracking-wider flex items-center gap-1.5">
                                    <Phone className="w-3.5 h-3.5 text-emerald-400" /> Phone Contact & Calling
                                </span>
                                {app.phone ? (
                                    <div className="space-y-2.5">
                                        <div className="flex items-center justify-between">
                                            <span className="font-mono text-base font-bold text-foreground">
                                                {app.phone}
                                            </span>
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground"
                                                onClick={() => copyToClipboard(app.phone, "phone number")}
                                                title="Copy phone number"
                                            >
                                                <Copy className="w-3.5 h-3.5 mr-1" /> Copy
                                            </Button>
                                        </div>
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <Button
                                                size="sm"
                                                onClick={() => handleCallApplicant(app)}
                                                className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-xs h-8 gap-1.5 shadow-md shadow-emerald-500/20"
                                            >
                                                <PhoneCall className="w-3.5 h-3.5" />
                                                <span>Call {app.phone}</span>
                                                {callCount > 0 && (
                                                    <span className="px-1.5 py-0.2 rounded-full bg-black/20 text-white text-[10px] font-bold">
                                                        ({callCount})
                                                    </span>
                                                )}
                                            </Button>
                                            {callCount > 0 && (
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    onClick={() => handleResetCallCount(app.id)}
                                                    className="h-8 px-2 text-xs text-muted-foreground hover:text-red-400 hover:bg-red-500/10 gap-1"
                                                    title="Reset call counter to 0"
                                                >
                                                    <RotateCcw className="w-3 h-3" /> Reset
                                                </Button>
                                            )}
                                        </div>
                                        <div className="text-xs text-muted-foreground pt-1 border-t border-primary/10">
                                            <div className="flex items-center justify-between">
                                                <span>Total Calls Placed:</span>
                                                <span className={`font-semibold ${callCount > 0 ? "text-emerald-400" : "text-muted-foreground"}`}>
                                                    {callCount} call{callCount !== 1 ? "s" : ""}
                                                </span>
                                            </div>
                                            {lastCalled && (
                                                <div className="flex items-center justify-between mt-0.5 text-[11px] text-muted-foreground/80">
                                                    <span>Last Call:</span>
                                                    <span>{new Date(lastCalled).toLocaleString()}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ) : (
                                    <p className="text-xs text-muted-foreground italic">No phone number recorded</p>
                                )}
                            </div>

                            {/* Email & Location Card */}
                            <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 space-y-3">
                                <span className="text-xs uppercase font-semibold text-muted-foreground tracking-wider flex items-center gap-1.5">
                                    <Mail className="w-3.5 h-3.5 text-blue-400" /> Email & Location
                                </span>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <a
                                            href={`mailto:${app.email}`}
                                            className="font-medium text-sm text-primary hover:underline truncate"
                                        >
                                            {app.email}
                                        </a>
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground"
                                            onClick={() => copyToClipboard(app.email, "email address")}
                                            title="Copy email address"
                                        >
                                            <Copy className="w-3.5 h-3.5 mr-1" /> Copy
                                        </Button>
                                    </div>
                                    {(city || country) && (
                                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground pt-1 border-t border-primary/10">
                                            <MapPin className="w-3.5 h-3.5 text-red-400 shrink-0" />
                                            <span>{[city, country].filter(Boolean).join(", ")}</span>
                                        </div>
                                    )}
                                    {source && (
                                        <div className="text-xs text-muted-foreground flex items-center gap-1.5">
                                            <Sparkles className="w-3.5 h-3.5 text-yellow-400 shrink-0" />
                                            <span>Via {source}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Education & Qualifications */}
                        <div className="p-4 rounded-xl bg-purple-500/5 border border-purple-500/15 space-y-2">
                            <div className="flex items-center justify-between gap-2">
                                <span className="text-xs uppercase font-semibold text-purple-300 tracking-wider flex items-center gap-1.5">
                                    <GraduationCap className="w-3.5 h-3.5 text-purple-400" /> Education & Qualifications
                                </span>
                                <Button
                                    type="button"
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => handleOpenEditModal(app)}
                                    className="h-6 px-2 text-[11px] text-purple-300 hover:text-white hover:bg-purple-500/20 gap-1 font-medium"
                                >
                                    <Pencil className="w-3 h-3" />
                                    <span>{institution || qualification ? "Edit Education" : "Add Education"}</span>
                                </Button>
                            </div>
                            {institution || qualification ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
                                    {institution && (
                                        <div>
                                            <p className="text-muted-foreground">Educational Institution</p>
                                            <p className="font-semibold text-foreground text-sm mt-0.5">{institution}</p>
                                        </div>
                                    )}
                                    {qualification && (
                                        <div>
                                            <p className="text-muted-foreground">Qualification & Graduation Year</p>
                                            <p className="font-semibold text-foreground text-sm mt-0.5">
                                                {qualification} {gradYear ? `(Graduated: ${gradYear})` : ""}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <p className="text-xs text-muted-foreground italic pt-1">
                                    No education details recorded. Click &quot;Add Education&quot; to update institution and qualification.
                                </p>
                            )}
                        </div>

                        {/* Resume Attachment Section */}
                        <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 space-y-2.5">
                            <span className="text-xs uppercase font-semibold text-muted-foreground tracking-wider flex items-center gap-1.5">
                                <FileText className="w-3.5 h-3.5 text-metal-blue-400" /> Resume / CV Attachment
                            </span>
                            {app.resume_url ? (
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                                    <div className="text-xs text-foreground font-medium truncate max-w-sm">
                                        📄 {app.resume_url.split("/").pop() || "Candidate_Resume"}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            className="h-8 text-xs gap-1.5 border-primary/20 hover:bg-primary/10"
                                            onClick={() => window.open(app.resume_url, "_blank")}
                                        >
                                            <ExternalLink className="w-3.5 h-3.5" /> View in Tab
                                        </Button>
                                        <Button
                                            size="sm"
                                            className="h-8 text-xs gap-1.5 bg-metal-blue-500/20 hover:bg-metal-blue-500/30 text-metal-blue-300 border border-metal-blue-500/30"
                                            onClick={() => handleDownloadSingleResume(app)}
                                            disabled={singleDownloadingId === app.id}
                                        >
                                            {singleDownloadingId === app.id ? (
                                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                            ) : (
                                                <Download className="w-3.5 h-3.5" />
                                            )}
                                            <span>Download Resume</span>
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-xs text-muted-foreground italic">No resume file attached with this application.</p>
                            )}
                        </div>

                        {/* Questionnaire Responses */}
                        <div className="space-y-3 pt-2">
                            <div className="flex items-center justify-between gap-2">
                                <h4 className="text-xs uppercase font-semibold text-muted-foreground tracking-wider">
                                    Candidate Questionnaire Responses ({questionnaireEntries.length})
                                </h4>
                                <Button
                                    type="button"
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleOpenEditModal(app)}
                                    className="h-7 text-xs border-metal-blue-500/30 text-metal-blue-300 hover:bg-metal-blue-500/15 gap-1 font-medium"
                                >
                                    <Pencil className="w-3 h-3 text-metal-blue-400" />
                                    <span>{questionnaireEntries.length > 0 ? "Edit Responses" : "Add Responses"}</span>
                                </Button>
                            </div>

                            {questionnaireEntries.length > 0 ? (
                                <div className="grid gap-2.5 max-h-60 overflow-y-auto pr-1">
                                    {questionnaireEntries.map(([q, ans], idx) => (
                                        <div key={idx} className="p-3 rounded-lg bg-primary/5 border border-primary/10 text-xs">
                                            <p className="font-semibold text-muted-foreground mb-1">{q}</p>
                                            <p className="text-foreground font-medium pl-2.5 border-l-2 border-metal-blue-500">
                                                {Array.isArray(ans) ? ans.join(", ") : String(ans)}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="p-4 rounded-xl bg-primary/5 border border-dashed border-primary/15 text-center text-xs text-muted-foreground py-6">
                                    <p className="mb-2">No additional questionnaire responses recorded yet.</p>
                                    <Button
                                        type="button"
                                        size="sm"
                                        variant="outline"
                                        onClick={() => handleOpenEditModal(app)}
                                        className="border-metal-blue-500/30 text-metal-blue-300 hover:bg-metal-blue-500/15 gap-1.5 text-xs font-medium"
                                    >
                                        <Plus className="w-3.5 h-3.5 text-metal-blue-400" />
                                        <span>Add Questionnaire Responses</span>
                                    </Button>
                                </div>
                            )}
                        </div>

                        {/* Bottom Actions Bar */}
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-4 border-t border-primary/10">
                            {/* Status Change Buttons */}
                            <div className="flex items-center gap-2">
                                {app.status !== "approved" && (
                                    <Button
                                        size="sm"
                                        className="bg-green-500/20 text-green-400 hover:bg-green-500/30 border border-green-500/30 text-xs h-9 gap-1.5"
                                        onClick={async () => {
                                            try {
                                                await updateJobApplicationStatus(app.id, "approved", app.email);
                                                setViewingApplicant(prev => prev ? { ...prev, status: "approved" } : null);
                                                toast.success(`Approved application for ${app.applicant_name}`);
                                            } catch (err) {
                                                toast.error("Failed to approve application");
                                            }
                                        }}
                                    >
                                        <CheckCircle className="w-3.5 h-3.5" /> Approve Candidate
                                    </Button>
                                )}
                                {app.status !== "rejected" && (
                                    <Button
                                        size="sm"
                                        className="bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/30 text-xs h-9 gap-1.5"
                                        onClick={async () => {
                                            try {
                                                await updateJobApplicationStatus(app.id, "rejected", app.email);
                                                setViewingApplicant(prev => prev ? { ...prev, status: "rejected" } : null);
                                                toast.success(`Rejected application for ${app.applicant_name}`);
                                            } catch (err) {
                                                toast.error("Failed to reject application");
                                            }
                                        }}
                                    >
                                        <X className="w-3.5 h-3.5" /> Reject Candidate
                                    </Button>
                                )}
                            </div>

                            {/* Edit Details, Export, Print & Close */}
                            <div className="flex items-center gap-2 flex-wrap">
                                <Button
                                    size="sm"
                                    variant="outline"
                                    className="border-metal-blue-500/30 hover:bg-metal-blue-500/15 text-metal-blue-300 text-xs h-9 gap-1.5 font-medium"
                                    onClick={() => handleOpenEditModal(app)}
                                >
                                    <Pencil className="w-3.5 h-3.5 text-metal-blue-400" />
                                    <span>Edit Details</span>
                                </Button>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    className="border-primary/20 hover:bg-primary/10 text-foreground text-xs h-9 gap-1.5"
                                    onClick={() => printOrDownloadApplicationProfile(app, appJob)}
                                >
                                    <Printer className="w-3.5 h-3.5 text-metal-blue-400" />
                                    <span>Print / PDF</span>
                                </Button>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    className="border-primary/20 hover:bg-primary/10 text-foreground text-xs h-9 gap-1.5"
                                    onClick={() => {
                                        exportJobApplicationsCSV([app], allPositions, `Application_${sanitizeFileName(app.applicant_name)}.csv`);
                                        toast.success(`Exported application to CSV`);
                                    }}
                                >
                                    <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
                                    <span>CSV</span>
                                </Button>
                                <Button
                                    size="sm"
                                    variant="ghost"
                                    className="text-muted-foreground hover:text-foreground text-xs h-9"
                                    onClick={() => setViewingApplicant(null)}
                                >
                                    Close
                                </Button>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        );
    };

    // Render Modal for Editing Questionnaire Responses and Missing Details
    const renderEditApplicantModal = () => {
        if (!editingApplicant) return null;
        const appJob = allPositions.find(p => p.id === editingApplicant.job_id);

        return (
            <Dialog open={!!editingApplicant} onOpenChange={(open) => !open && setEditingApplicant(null)}>
                <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-background/95 backdrop-blur-2xl border-primary/20 text-foreground p-6 sm:p-8">
                    <DialogHeader className="pb-4 border-b border-primary/10">
                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-xl bg-metal-blue-500/15 border border-metal-blue-500/30 flex items-center justify-center text-metal-blue-300 shrink-0">
                                <Pencil className="w-5 h-5" />
                            </div>
                            <div>
                                <DialogTitle className="text-xl sm:text-2xl font-bold font-heading text-foreground">
                                    Edit Questionnaire & Missing Details
                                </DialogTitle>
                                <DialogDescription className="text-xs text-muted-foreground mt-0.5">
                                    Candidate: <span className="font-semibold text-foreground">{editingApplicant.applicant_name}</span> • Role: <span className="text-metal-blue-300 font-medium">{appJob?.title || "Position"}</span>
                                </DialogDescription>
                            </div>
                        </div>
                    </DialogHeader>

                    <form onSubmit={handleSaveApplicantDetails} className="space-y-6 pt-2">
                        {/* Notice Banner */}
                        <div className="p-3.5 rounded-xl bg-metal-blue-500/10 border border-metal-blue-500/20 text-xs text-metal-blue-200 flex items-start gap-2.5">
                            <Sparkles className="w-4 h-4 text-metal-blue-400 shrink-0 mt-0.5" />
                            <p>
                                Update or complete missing educational background, residence location, application source, and questionnaire responses. All updates are synchronized to the live applicant database and PDF/CSV records.
                            </p>
                        </div>

                        {/* Section 1: Education & Qualifications */}
                        <div className="p-4 rounded-xl bg-purple-500/5 border border-purple-500/15 space-y-3.5">
                            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-purple-300">
                                <GraduationCap className="w-4 h-4 text-purple-400" />
                                <span>1. Educational Institution & Qualifications</span>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                <div className="sm:col-span-2 space-y-1.5">
                                    <label className="text-xs font-medium text-foreground">
                                        Name of Educational Institution
                                    </label>
                                    <Input
                                        value={editForm.institution}
                                        onChange={(e) => setEditForm(prev => ({ ...prev, institution: e.target.value }))}
                                        placeholder="e.g. Anna University, IIT Madras, SRM, etc."
                                        className="bg-primary/5 border-primary/10 text-xs h-9"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-medium text-foreground">
                                        Graduation Year
                                    </label>
                                    <Input
                                        value={editForm.gradYear}
                                        onChange={(e) => setEditForm(prev => ({ ...prev, gradYear: e.target.value }))}
                                        placeholder="e.g. 2024"
                                        className="bg-primary/5 border-primary/10 text-xs h-9"
                                    />
                                </div>
                                <div className="sm:col-span-3 space-y-1.5">
                                    <label className="text-xs font-medium text-foreground">
                                        Qualification / Degree
                                    </label>
                                    <Input
                                        value={editForm.qualification}
                                        onChange={(e) => setEditForm(prev => ({ ...prev, qualification: e.target.value }))}
                                        placeholder="e.g. B.Tech Computer Science, B.E. ECE, MCA, etc."
                                        className="bg-primary/5 border-primary/10 text-xs h-9"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Section 2: Location & Discovery Source */}
                        <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/15 space-y-3.5">
                            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-300">
                                <MapPin className="w-4 h-4 text-blue-400" />
                                <span>2. Residence Location & Discovery Source</span>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-medium text-foreground">
                                        City of Residence
                                    </label>
                                    <Input
                                        value={editForm.city}
                                        onChange={(e) => setEditForm(prev => ({ ...prev, city: e.target.value }))}
                                        placeholder="e.g. Chennai, Bangalore"
                                        className="bg-primary/5 border-primary/10 text-xs h-9"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-medium text-foreground">
                                        Country
                                    </label>
                                    <Input
                                        value={editForm.country}
                                        onChange={(e) => setEditForm(prev => ({ ...prev, country: e.target.value }))}
                                        placeholder="e.g. India"
                                        className="bg-primary/5 border-primary/10 text-xs h-9"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-medium text-foreground">
                                        Where did you hear about us?
                                    </label>
                                    <Input
                                        value={editForm.source}
                                        onChange={(e) => setEditForm(prev => ({ ...prev, source: e.target.value }))}
                                        placeholder="e.g. LinkedIn, Referral, College"
                                        className="bg-primary/5 border-primary/10 text-xs h-9"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Section 3: Position-Specific Questionnaire (if role has questions) */}
                        {appJob?.questions && appJob.questions.length > 0 && (
                            <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 space-y-3.5">
                                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-metal-blue-300">
                                    <Briefcase className="w-4 h-4 text-metal-blue-400" />
                                    <span>3. Role-Specific Questions ({appJob.questions.length})</span>
                                </div>
                                <div className="space-y-3">
                                    {appJob.questions.map((q, qIdx) => (
                                        <div key={q.id || qIdx} className="space-y-1.5">
                                            <label className="text-xs font-medium text-foreground">
                                                {q.question}
                                            </label>
                                            <Textarea
                                                value={editForm.positionAnswers[q.question] || ""}
                                                onChange={(e) => {
                                                    const val = e.target.value;
                                                    setEditForm(prev => ({
                                                        ...prev,
                                                        positionAnswers: {
                                                            ...prev.positionAnswers,
                                                            [q.question]: val
                                                        }
                                                    }));
                                                }}
                                                placeholder="Enter or update candidate's answer..."
                                                className="bg-primary/5 border-primary/10 text-xs min-h-[64px]"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Section 4: Other Questionnaire Responses & Custom Fields */}
                        <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 space-y-3.5">
                            <div className="flex items-center justify-between gap-2">
                                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                    <FileText className="w-4 h-4 text-metal-blue-400" />
                                    <span>{appJob?.questions && appJob.questions.length > 0 ? "4." : "3."} Custom Questionnaire & Screening Responses</span>
                                </div>
                                <Button
                                    type="button"
                                    size="sm"
                                    variant="outline"
                                    onClick={handleAddCustomQuestion}
                                    className="h-7 text-xs border-metal-blue-500/30 text-metal-blue-300 hover:bg-metal-blue-500/10 gap-1"
                                >
                                    <Plus className="w-3 h-3" /> Add Custom Field
                                </Button>
                            </div>

                            {editForm.customQuestions.length === 0 ? (
                                <p className="text-xs text-muted-foreground italic py-2">
                                    No custom questionnaire fields added yet. Click &quot;Add Custom Field&quot; above to add any screening answers, notice period, CTC, or interview notes.
                                </p>
                            ) : (
                                <div className="space-y-3">
                                    {editForm.customQuestions.map((item) => (
                                        <div key={item.id} className="p-3 rounded-lg bg-background/50 border border-primary/10 space-y-2">
                                            <div className="flex items-center justify-between gap-2">
                                                <Input
                                                    value={item.question}
                                                    onChange={(e) => handleUpdateCustomQuestion(item.id, "question", e.target.value)}
                                                    placeholder="Field / Question Title (e.g. Notice Period, GitHub, Portfolio)"
                                                    className="bg-primary/5 border-primary/10 text-xs h-8 font-medium"
                                                />
                                                <Button
                                                    type="button"
                                                    size="sm"
                                                    variant="ghost"
                                                    onClick={() => handleRemoveCustomQuestion(item.id)}
                                                    className="h-8 w-8 p-0 text-muted-foreground hover:text-red-400 hover:bg-red-500/10 shrink-0"
                                                    title="Remove this field"
                                                >
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                </Button>
                                            </div>
                                            <Textarea
                                                value={item.answer}
                                                onChange={(e) => handleUpdateCustomQuestion(item.id, "answer", e.target.value)}
                                                placeholder="Candidate's answer or notes..."
                                                className="bg-primary/5 border-primary/10 text-xs min-h-[50px]"
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Section 5: Candidate Basic Info (Optional Corrections) */}
                        <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 space-y-3">
                            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                <span>Candidate Contact Corrections (Optional)</span>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                <div className="space-y-1">
                                    <label className="text-[11px] text-muted-foreground">Full Name</label>
                                    <Input
                                        value={editForm.name}
                                        onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                                        placeholder="Applicant Name"
                                        className="bg-primary/5 border-primary/10 text-xs h-8"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[11px] text-muted-foreground">Email Address</label>
                                    <Input
                                        value={editForm.email}
                                        onChange={(e) => setEditForm(prev => ({ ...prev, email: e.target.value }))}
                                        placeholder="Email"
                                        className="bg-primary/5 border-primary/10 text-xs h-8"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[11px] text-muted-foreground">Contact Phone</label>
                                    <Input
                                        value={editForm.phone}
                                        onChange={(e) => setEditForm(prev => ({ ...prev, phone: e.target.value }))}
                                        placeholder="Phone"
                                        className="bg-primary/5 border-primary/10 text-xs h-8"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Dialog Footer Actions */}
                        <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-primary/10">
                            <Button
                                type="button"
                                variant="ghost"
                                onClick={() => setEditingApplicant(null)}
                                disabled={isSavingEdit}
                                className="text-xs h-9 text-muted-foreground hover:text-foreground"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={isSavingEdit}
                                className="bg-gradient-to-r from-metal-blue-600 to-metal-purple-600 hover:from-metal-blue-500 hover:to-metal-purple-500 text-white text-xs h-9 gap-2 shadow-md hover:shadow-metal-blue-500/20 font-semibold"
                            >
                                {isSavingEdit ? (
                                    <>
                                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                        <span>Saving Changes...</span>
                                    </>
                                ) : (
                                    <>
                                        <Save className="w-3.5 h-3.5" />
                                        <span>Save Responses & Details</span>
                                    </>
                                )}
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        );
    };

    // =========================================================================
    // VIEW 1: POSITION DRILL-DOWN (Selected Job / Internship View)
    // =========================================================================
    if (selectedJobId && selectedJob) {
        const isInternship = selectedJob.department === "Internship" || selectedJob.type === "Internship";
        const allFilteredSelected =
            filteredApplications.length > 0 &&
            filteredApplications.every(a => selectedAppIds.has(a.id));

        return (
            <div className="space-y-6 animate-in fade-in duration-300">
                {/* Back and Header */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-primary/10">
                    <div className="flex items-center gap-4">
                        <Button
                            variant="outline"
                            onClick={() => {
                                setSelectedJobId(null);
                                setSelectedAppIds(new Set());
                            }}
                            className="border-primary/20 hover:bg-primary/10 gap-2 text-foreground"
                        >
                            <ArrowLeft className="w-4 h-4" /> Back to Positions
                        </Button>
                        <div>
                            <div className="flex items-center gap-2.5 flex-wrap">
                                <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground">
                                    {selectedJob.title}
                                </h2>
                                {isInternship ? (
                                    <span className="bg-purple-500/20 text-purple-300 border border-purple-500/30 px-2.5 py-0.5 rounded-full text-xs font-semibold flex items-center gap-1">
                                        <GraduationCap className="w-3 h-3" /> Internship
                                    </span>
                                ) : (
                                    <span className="bg-blue-500/20 text-blue-300 border border-blue-500/30 px-2.5 py-0.5 rounded-full text-xs font-semibold flex items-center gap-1">
                                        <Briefcase className="w-3 h-3" /> Full Time Job
                                    </span>
                                )}
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                                {positionApplications.length} total applicant{positionApplications.length !== 1 ? "s" : ""} • {selectedJob.location || "Remote"}
                            </p>
                        </div>
                    </div>

                    {/* Bulk Section Download Actions */}
                    <div className="flex items-center gap-2.5 flex-wrap">
                        <Button
                            variant="outline"
                            onClick={() => handleExportPositionCSV(selectedJob.id, selectedJob.title)}
                            disabled={positionApplications.length === 0}
                            className="border-primary/20 hover:bg-primary/10 text-foreground text-sm font-medium gap-2"
                            title="Export all applications for this position to CSV"
                        >
                            <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                            <span>Export All to CSV</span>
                        </Button>
                        <Button
                            onClick={() => handleDownloadPositionZip(selectedJob.id, selectedJob.title)}
                            disabled={positionApplications.length === 0 || isGeneratingZip}
                            className="bg-gradient-to-r from-metal-blue-600 to-metal-purple-600 hover:from-metal-blue-500 hover:to-metal-purple-500 text-white text-sm font-medium gap-2 shadow-md hover:shadow-metal-blue-500/20 transition-all"
                            title="Download all candidate resumes for this position packaged as a ZIP"
                        >
                            <Archive className="w-4 h-4" />
                            <span>Download All Resumes (ZIP)</span>
                        </Button>
                    </div>
                </div>

                {/* Filter and Search Bar */}
                <div className="space-y-3">
                    <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
                        {/* Status Filter Tabs */}
                        <div className="flex items-center gap-1.5 p-1 bg-primary/5 border border-primary/10 rounded-xl overflow-x-auto">
                            {(["all", "pending", "approved", "rejected"] as const).map(tab => {
                                const count =
                                    tab === "all"
                                        ? positionApplications.length
                                        : positionApplications.filter(a => a.status === tab).length;
                                const isActive = statusFilter === tab;

                                return (
                                    <button
                                        key={tab}
                                        onClick={() => setStatusFilter(tab)}
                                        className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all flex items-center gap-1.5 whitespace-nowrap ${
                                            isActive
                                                ? "bg-metal-blue-500/20 text-metal-blue-300 border border-metal-blue-500/30 shadow-sm"
                                                : "text-muted-foreground hover:text-foreground hover:bg-primary/5"
                                        }`}
                                    >
                                        <span>{tab}</span>
                                        <span
                                            className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                                                isActive
                                                    ? "bg-metal-blue-500/30 text-white"
                                                    : "bg-primary/10 text-muted-foreground"
                                            }`}
                                        >
                                            {count}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Search Input & Filter Options Button */}
                        <div className="flex items-center gap-2 flex-1 max-w-xl">
                            <div className="relative flex-1">
                                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    value={candidateSearch}
                                    onChange={e => setCandidateSearch(e.target.value)}
                                    placeholder="Search name, email, phone, institution, city, answers..."
                                    className="pl-9 pr-14 bg-primary/5 border-primary/10 text-foreground text-sm h-10"
                                />
                                {candidateSearch && (
                                    <button
                                        onClick={() => setCandidateSearch("")}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground text-xs"
                                    >
                                        Clear
                                    </button>
                                )}
                            </div>

                            {/* Filter Options Toggle Button */}
                            <Button
                                variant="outline"
                                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                                className={`h-10 px-3.5 border-primary/15 text-xs font-medium gap-2 shrink-0 transition-all ${
                                    showAdvancedFilters || (detailsFilter !== "all" || resumeFilter !== "all" || callFilter !== "all" || duplicateFilter !== "all" || sortBy !== "newest")
                                        ? "bg-metal-blue-500/20 text-metal-blue-300 border-metal-blue-500/40 shadow-sm"
                                        : "hover:bg-primary/5 text-foreground"
                                }`}
                                title="Toggle search filter options"
                            >
                                <Filter className="w-3.5 h-3.5 text-metal-blue-400" />
                                <span>Filter Options</span>
                                {(detailsFilter !== "all" || resumeFilter !== "all" || callFilter !== "all" || duplicateFilter !== "all" || sortBy !== "newest") && (
                                    <span className="w-2 h-2 rounded-full bg-metal-blue-400 animate-pulse" />
                                )}
                            </Button>
                        </div>
                    </div>

                    {/* Filter Options Panel */}
                    <AnimatePresence>
                        {showAdvancedFilters && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="overflow-hidden"
                            >
                                <div className="p-4 rounded-xl bg-primary/[0.03] border border-primary/10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
                                    {/* 1. Details Filter */}
                                    <div className="space-y-1.5">
                                        <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                                            Questionnaire & Details
                                        </label>
                                        <select
                                            value={detailsFilter}
                                            onChange={(e) => setDetailsFilter(e.target.value as any)}
                                            className="w-full bg-background/80 border border-primary/15 rounded-lg px-2.5 py-2 text-foreground text-xs focus:outline-none focus:border-metal-blue-500"
                                        >
                                            <option value="all">All Applicants</option>
                                            <option value="missing">⚠️ Missing Details / Previous</option>
                                            <option value="complete">✅ Has Questionnaire Details</option>
                                        </select>
                                    </div>

                                    {/* 2. Resume Filter */}
                                    <div className="space-y-1.5">
                                        <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                                            Resume Attachment
                                        </label>
                                        <select
                                            value={resumeFilter}
                                            onChange={(e) => setResumeFilter(e.target.value as any)}
                                            className="w-full bg-background/80 border border-primary/15 rounded-lg px-2.5 py-2 text-foreground text-xs focus:outline-none focus:border-metal-blue-500"
                                        >
                                            <option value="all">All Resumes</option>
                                            <option value="has_resume">📄 Has Resume Attached</option>
                                            <option value="no_resume">❌ No Resume Uploaded</option>
                                        </select>
                                    </div>

                                    {/* 3. Call Status Filter */}
                                    <div className="space-y-1.5">
                                        <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                                            Call Status
                                        </label>
                                        <select
                                            value={callFilter}
                                            onChange={(e) => setCallFilter(e.target.value as any)}
                                            className="w-full bg-background/80 border border-primary/15 rounded-lg px-2.5 py-2 text-foreground text-xs focus:outline-none focus:border-metal-blue-500"
                                        >
                                            <option value="all">All Call Statuses</option>
                                            <option value="called">📞 Called (≥ 1 time)</option>
                                            <option value="not_called">⏳ Not Called Yet</option>
                                        </select>
                                    </div>

                                    {/* 4. Duplicates Filter */}
                                    <div className="space-y-1.5">
                                        <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                                            Duplicate Verification
                                        </label>
                                        <select
                                            value={duplicateFilter}
                                            onChange={(e) => setDuplicateFilter(e.target.value as any)}
                                            className="w-full bg-background/80 border border-primary/15 rounded-lg px-2.5 py-2 text-foreground text-xs focus:outline-none focus:border-metal-blue-500"
                                        >
                                            <option value="all">All Applicants</option>
                                            <option value="duplicates_only">⚠️ Duplicates Only ({duplicateIds.size})</option>
                                        </select>
                                    </div>

                                    {/* 5. Sort By */}
                                    <div className="space-y-1.5">
                                        <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                                            Sort Results By
                                        </label>
                                        <select
                                            value={sortBy}
                                            onChange={(e) => setSortBy(e.target.value as any)}
                                            className="w-full bg-background/80 border border-primary/15 rounded-lg px-2.5 py-2 text-foreground text-xs focus:outline-none focus:border-metal-blue-500"
                                        >
                                            <option value="newest">🕒 Newest Applied</option>
                                            <option value="oldest">🕒 Oldest Applied</option>
                                            <option value="name_asc">🔤 Name (A → Z)</option>
                                            <option value="name_desc">🔤 Name (Z → A)</option>
                                            <option value="most_called">📞 Most Called First</option>
                                        </select>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Active Filter Chips Bar & Reset */}
                    {(candidateSearch || detailsFilter !== "all" || resumeFilter !== "all" || callFilter !== "all" || duplicateFilter !== "all" || sortBy !== "newest" || statusFilter !== "all") && (
                        <div className="flex items-center gap-2 flex-wrap pt-1 text-xs">
                            <span className="text-muted-foreground font-medium">Active Filters:</span>
                            {candidateSearch && (
                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-metal-blue-500/15 text-metal-blue-300 border border-metal-blue-500/30">
                                    Search: &quot;{candidateSearch}&quot;
                                    <button onClick={() => setCandidateSearch("")} className="hover:text-white">×</button>
                                </span>
                            )}
                            {statusFilter !== "all" && (
                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-primary/10 text-foreground border border-primary/20 capitalize">
                                    Status: {statusFilter}
                                    <button onClick={() => setStatusFilter("all")} className="hover:text-primary">×</button>
                                </span>
                            )}
                            {detailsFilter !== "all" && (
                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30">
                                    {detailsFilter === "missing" ? "Missing Details" : "Has Questionnaire"}
                                    <button onClick={() => setDetailsFilter("all")} className="hover:text-white">×</button>
                                </span>
                            )}
                            {resumeFilter !== "all" && (
                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-purple-500/15 text-purple-300 border border-purple-500/30">
                                    {resumeFilter === "has_resume" ? "Has Resume" : "No Resume"}
                                    <button onClick={() => setResumeFilter("all")} className="hover:text-white">×</button>
                                </span>
                            )}
                            {callFilter !== "all" && (
                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                                    {callFilter === "called" ? "Called" : "Not Called"}
                                    <button onClick={() => setCallFilter("all")} className="hover:text-white">×</button>
                                </span>
                            )}
                            {duplicateFilter !== "all" && (
                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30">
                                    Duplicates Only
                                    <button onClick={() => setDuplicateFilter("all")} className="hover:text-white">×</button>
                                </span>
                            )}
                            {sortBy !== "newest" && (
                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-500/15 text-blue-300 border border-blue-500/30">
                                    Sort: {sortBy.replace("_", " ")}
                                    <button onClick={() => setSortBy("newest")} className="hover:text-white">×</button>
                                </span>
                            )}
                            <button
                                onClick={() => {
                                    setCandidateSearch("");
                                    setStatusFilter("all");
                                    setDetailsFilter("all");
                                    setResumeFilter("all");
                                    setCallFilter("all");
                                    setDuplicateFilter("all");
                                    setSortBy("newest");
                                }}
                                className="text-muted-foreground hover:text-red-400 transition-colors ml-1 underline text-[11px]"
                            >
                                Reset All
                            </button>
                            <span className="text-muted-foreground/70 ml-auto">
                                Showing <strong className="text-foreground">{filteredApplications.length}</strong> of {positionApplications.length} candidate{positionApplications.length !== 1 ? "s" : ""}
                            </span>
                        </div>
                    )}
                </div>

                {/* Selection & Bulk Action Banner */}
                {filteredApplications.length > 0 && (
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-primary/5 border border-primary/10">
                        <div className="flex items-center gap-3">
                            <Checkbox
                                id="select-all-apps"
                                checked={allFilteredSelected}
                                onCheckedChange={toggleSelectAll}
                                className="border-primary/40 data-[state=checked]:bg-metal-blue-500 data-[state=checked]:border-metal-blue-500"
                            />
                            <label
                                htmlFor="select-all-apps"
                                className="text-xs md:text-sm font-medium text-foreground cursor-pointer select-none"
                            >
                                {selectedAppIds.size > 0 ? (
                                    <span className="font-semibold text-metal-blue-400">
                                        {selectedAppIds.size} of {filteredApplications.length} selected
                                    </span>
                                ) : (
                                    <span>Select All ({filteredApplications.length})</span>
                                )}
                            </label>
                        </div>

                        {selectedAppIds.size > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: -6 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex items-center gap-2 flex-wrap"
                            >
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={handleExportSelectedCSV}
                                    className="border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 text-xs h-8 gap-1.5"
                                >
                                    <FileSpreadsheet className="w-3.5 h-3.5" />
                                    <span>Export CSV ({selectedAppIds.size})</span>
                                </Button>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={handleDownloadSelectedZip}
                                    className="border-metal-blue-500/30 text-metal-blue-400 hover:bg-metal-blue-500/10 text-xs h-8 gap-1.5"
                                >
                                    <Archive className="w-3.5 h-3.5" />
                                    <span>Download ZIP ({selectedAppIds.size})</span>
                                </Button>
                                <Button
                                    size="sm"
                                    onClick={() => handleBulkStatusUpdate("approved")}
                                    className="bg-green-500/20 text-green-300 hover:bg-green-500/30 border border-green-500/30 text-xs h-8 gap-1.5"
                                >
                                    <CheckCircle className="w-3.5 h-3.5" />
                                    <span>Approve</span>
                                </Button>
                                <Button
                                    size="sm"
                                    onClick={() => handleBulkStatusUpdate("rejected")}
                                    className="bg-red-500/20 text-red-300 hover:bg-red-500/30 border border-red-500/30 text-xs h-8 gap-1.5"
                                >
                                    <X className="w-3.5 h-3.5" />
                                    <span>Reject</span>
                                </Button>
                                <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => setSelectedAppIds(new Set())}
                                    className="text-xs h-8 text-muted-foreground hover:text-foreground"
                                >
                                    Deselect
                                </Button>
                            </motion.div>
                        )}
                    </div>
                )}

                {/* Candidate List */}
                <div className="grid gap-4">
                    {filteredApplications.length === 0 && (
                        <div className="text-center py-16 border border-dashed border-primary/10 rounded-2xl p-6">
                            <FileText className="w-12 h-12 mx-auto mb-3 text-muted-foreground opacity-40" />
                            <h3 className="font-bold text-lg text-foreground mb-1">No Applications Found</h3>
                            <p className="text-sm text-muted-foreground max-w-md mx-auto">
                                {candidateSearch || statusFilter !== "all"
                                    ? "No applications matched your search or status filter criteria."
                                    : "No candidates have applied for this position yet."}
                            </p>
                        </div>
                    )}

                    {filteredApplications.map(app => {
                        const isSelected = selectedAppIds.has(app.id);
                        const hasAnswers =
                            app.answers &&
                            typeof app.answers === "object" &&
                            Object.keys(app.answers).length > 0;
                        const answersExpanded = expandedAnswers.has(app.id);
                        const isDownloadingThis = singleDownloadingId === app.id;
                        const { count: callCount, lastCalled } = getApplicantCallInfo(app);
                        const candidateJob = allPositions.find(p => p.id === app.job_id);

                        // Education & Location fields
                        const institution = app.answers?.["Educational Institution"] || app.answers?.institution;
                        const qualification = app.answers?.["Qualification"] || app.answers?.qualification;
                        const gradYear = app.answers?.["Year of Graduation"] || app.answers?.graduation_year;
                        const city = app.answers?.["City of Residence"] || app.answers?.city;
                        const country = app.answers?.["Country"] || app.answers?.country;
                        const source = app.answers?.["Where did you hear about us?"] || app.answers?.hear_about_us;

                        return (
                            <GlassCard
                                key={app.id}
                                className={`p-6 transition-all duration-200 border ${
                                    isSelected
                                        ? "border-metal-blue-500/50 bg-metal-blue-500/[0.04] shadow-md shadow-metal-blue-500/10"
                                        : "hover:border-primary/30"
                                }`}
                            >
                                <div className="flex items-start gap-4">
                                    {/* Selection Checkbox */}
                                    <div className="pt-1">
                                        <Checkbox
                                            checked={isSelected}
                                            onCheckedChange={() => toggleSelectApp(app.id)}
                                            className="border-primary/40 data-[state=checked]:bg-metal-blue-500 data-[state=checked]:border-metal-blue-500"
                                            aria-label={`Select ${app.applicant_name}`}
                                        />
                                    </div>

                                    {/* Candidate Card Content */}
                                    <div className="flex-1 space-y-4 min-w-0">
                                        {/* Card Top: Name, Email, Status Badge */}
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                            <div className="min-w-0">
                                                <div className="flex items-center gap-2.5 flex-wrap">
                                                    <h3 className="font-bold text-xl text-foreground truncate">
                                                        {app.applicant_name}
                                                    </h3>
                                                    {selectedJobId === "all" && candidateJob && (
                                                        <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-metal-blue-500/15 text-metal-blue-300 border border-metal-blue-500/30">
                                                            {candidateJob.title}
                                                        </span>
                                                    )}
                                                    <span
                                                        className={`px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider border ${
                                                            app.status === "approved"
                                                                ? "bg-green-500/20 text-green-400 border-green-500/30"
                                                                : app.status === "rejected"
                                                                ? "bg-red-500/20 text-red-400 border-red-500/30"
                                                                : "bg-yellow-500/15 text-yellow-400 border-yellow-500/30"
                                                        }`}
                                                    >
                                                        {app.status}
                                                    </span>
                                                    {duplicateIds.has(app.id) && (
                                                        <span
                                                            className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-400 border border-amber-500/30 flex items-center gap-1"
                                                            title="Multiple applications detected with this same name and contact number"
                                                        >
                                                            <AlertTriangle className="w-3 h-3" /> Duplicate Detected
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-4 text-xs md:text-sm text-muted-foreground mt-1 flex-wrap">
                                                    <a
                                                        href={`mailto:${app.email}`}
                                                        className="flex items-center gap-1.5 text-primary/80 hover:text-primary transition-colors"
                                                    >
                                                        <Mail className="w-3.5 h-3.5" />
                                                        <span>{app.email}</span>
                                                    </a>
                                                    {app.phone ? (
                                                        <div className="flex items-center gap-2 flex-wrap">
                                                            <button
                                                                type="button"
                                                                onClick={() => handleCallApplicant(app)}
                                                                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-400 border border-emerald-500/30 transition-all hover:scale-105 active:scale-95 shadow-sm group"
                                                                title={`Call ${app.phone} (Clicked ${callCount} time${callCount === 1 ? '' : 's'}${lastCalled ? ` • Last: ${new Date(lastCalled).toLocaleTimeString()}` : ''})`}
                                                            >
                                                                <PhoneCall className="w-3.5 h-3.5 text-emerald-400 group-hover:animate-pulse" />
                                                                <span className="font-mono">{app.phone}</span>
                                                                <span className="ml-1 px-1.5 py-0.2 rounded-full bg-emerald-500/30 text-emerald-200 text-[10px] font-bold">
                                                                    Call {callCount > 0 && `(${callCount})`}
                                                                </span>
                                                            </button>
                                                            {callCount > 0 && (
                                                                <span
                                                                    className="text-[11px] text-emerald-400/90 font-medium px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20"
                                                                    title={lastCalled ? `Last called on: ${new Date(lastCalled).toLocaleString()}` : undefined}
                                                                >
                                                                    Called {callCount}x
                                                                </span>
                                                            )}
                                                        </div>
                                                    ) : (
                                                        <span className="text-xs text-muted-foreground italic flex items-center gap-1">
                                                            <Phone className="w-3.5 h-3.5 opacity-50" /> No phone provided
                                                        </span>
                                                    )}
                                                    <span
                                                        className="flex items-center gap-1.5 text-muted-foreground"
                                                        title={app.created_at ? `Applied: ${new Date(app.created_at).toLocaleString()}` : "No timestamp recorded"}
                                                    >
                                                        <Clock className="w-3.5 h-3.5 text-metal-blue-400" />
                                                        <span>
                                                            {app.created_at
                                                                ? new Date(app.created_at).toLocaleString('en-US', {
                                                                      month: 'short',
                                                                      day: 'numeric',
                                                                      year: 'numeric',
                                                                      hour: 'numeric',
                                                                      minute: '2-digit',
                                                                      hour12: true
                                                                  })
                                                                : "N/A"}
                                                        </span>
                                                    </span>
                                                </div>

                                                {/* Education & Location Summary */}
                                                {(institution || qualification || city || country || source) && (
                                                    <div className="flex items-center gap-3 text-xs text-muted-foreground flex-wrap pt-2">
                                                        {institution && (
                                                            <span className="flex items-center gap-1.5 text-foreground/90 font-medium">
                                                                <GraduationCap className="w-3.5 h-3.5 text-purple-400" />
                                                                <span>{institution}</span>
                                                                {qualification && (
                                                                    <span className="text-muted-foreground">({qualification}{gradYear ? `, '${gradYear.slice(-2)}` : ""})</span>
                                                                )}
                                                            </span>
                                                        )}
                                                        {(city || country) && (
                                                            <span className="flex items-center gap-1 text-muted-foreground">
                                                                <MapPin className="w-3.5 h-3.5 text-blue-400" />
                                                                <span>{[city, country].filter(Boolean).join(", ")}</span>
                                                            </span>
                                                        )}
                                                        {source && (
                                                            <span className="px-2 py-0.5 rounded-full bg-primary/10 text-metal-blue-300 text-[11px] border border-primary/10">
                                                                Via {source}
                                                            </span>
                                                        )}
                                                    </div>
                                                )}
                                            </div>

                                            {/* Status Update Actions for Pending Candidates */}
                                            {app.status === "pending" && (
                                                <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
                                                    <Button
                                                        size="sm"
                                                        className="bg-green-500/20 text-green-400 hover:bg-green-500/30 hover:text-green-300 border border-green-500/25 h-8 text-xs font-medium"
                                                        onClick={() => {
                                                            toast.promise(updateJobApplicationStatus(app.id, "approved", app.email), {
                                                                loading: "Approving application...",
                                                                success: `Approved application for ${app.applicant_name}`,
                                                                error: "Failed to approve application"
                                                            });
                                                        }}
                                                    >
                                                        <CheckCircle className="w-3.5 h-3.5 mr-1.5" /> Approve
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        className="bg-red-500/20 text-red-400 hover:bg-red-500/30 hover:text-red-300 border border-red-500/25 h-8 text-xs font-medium"
                                                        onClick={() => {
                                                            toast.promise(updateJobApplicationStatus(app.id, "rejected", app.email), {
                                                                loading: "Rejecting application...",
                                                                success: `Rejected application for ${app.applicant_name}`,
                                                                error: "Failed to reject application"
                                                            });
                                                        }}
                                                    >
                                                        <X className="w-3.5 h-3.5 mr-1.5" /> Reject
                                                    </Button>
                                                </div>
                                            )}
                                        </div>

                                        {/* Questionnaire Responses Accordion */}
                                        {hasAnswers ? (
                                            <div className="pt-2 border-t border-primary/10">
                                                <div className="flex items-center justify-between gap-2 flex-wrap">
                                                    <button
                                                        onClick={() => toggleAnswers(app.id)}
                                                        className="flex items-center gap-2 text-xs font-semibold text-metal-blue-400 hover:text-metal-blue-300 transition-colors"
                                                    >
                                                        <span>Questionnaire Responses ({Object.keys(app.answers).length})</span>
                                                        {answersExpanded ? (
                                                            <ChevronUp className="w-3.5 h-3.5" />
                                                        ) : (
                                                            <ChevronDown className="w-3.5 h-3.5" />
                                                        )}
                                                    </button>
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => handleOpenEditModal(app)}
                                                        className="h-6 px-2 text-xs text-metal-blue-400 hover:text-metal-blue-300 hover:bg-metal-blue-500/10 gap-1.5 font-medium"
                                                        title="Edit questionnaire responses and education details"
                                                    >
                                                        <Pencil className="w-3 h-3" />
                                                        <span>Edit Responses</span>
                                                    </Button>
                                                </div>

                                                <AnimatePresence>
                                                    {answersExpanded && (
                                                        <motion.div
                                                            initial={{ opacity: 0, height: 0 }}
                                                            animate={{ opacity: 1, height: "auto" }}
                                                            exit={{ opacity: 0, height: 0 }}
                                                            className="overflow-hidden mt-3 space-y-2.5"
                                                        >
                                                            {Object.entries(app.answers).map(([question, answer], idx) => (
                                                                <div
                                                                    key={idx}
                                                                    className="p-3 rounded-lg bg-primary/5 border border-primary/10 text-xs"
                                                                >
                                                                    <p className="font-semibold text-muted-foreground mb-1">
                                                                        {question}
                                                                    </p>
                                                                    <p className="text-foreground font-medium pl-2.5 border-l-2 border-metal-blue-500">
                                                                        {Array.isArray(answer)
                                                                            ? answer.join(", ")
                                                                            : String(answer)}
                                                                    </p>
                                                                </div>
                                                            ))}
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        ) : (
                                            <div className="pt-2 border-t border-primary/10 flex items-center justify-between gap-2 flex-wrap">
                                                <div className="flex items-center gap-1.5 text-xs text-amber-400/90 font-medium">
                                                    <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                                                    <span>Missing questionnaire & education details (Previous applicant)</span>
                                                </div>
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handleOpenEditModal(app)}
                                                    className="border-amber-500/30 text-amber-400 hover:bg-amber-500/15 hover:text-amber-300 text-xs h-7 px-2.5 gap-1.5 font-medium shadow-sm"
                                                    title="Add missing questionnaire responses, education, and location details for this applicant"
                                                >
                                                    <Plus className="w-3 h-3" />
                                                    <span>Add Missing Details</span>
                                                </Button>
                                            </div>
                                        )}

                                        {/* Bottom Action Toolbar: DOWNLOAD RESUME, VIEW RESUME, DOWNLOAD FULL APPLICATION PROFILE */}
                                        <div className="flex flex-wrap items-center gap-2.5 pt-3 border-t border-primary/10">
                                            {/* Download Resume directly */}
                                            {app.resume_url ? (
                                                <>
                                                    <Button
                                                        variant="default"
                                                        size="sm"
                                                        onClick={() => handleDownloadSingleResume(app)}
                                                        disabled={isDownloadingThis}
                                                        className="bg-metal-blue-500/20 hover:bg-metal-blue-500/30 text-metal-blue-300 border border-metal-blue-500/30 text-xs h-8 font-medium gap-1.5"
                                                        title="Download candidate resume directly to your computer"
                                                    >
                                                        {isDownloadingThis ? (
                                                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                                        ) : (
                                                            <Download className="w-3.5 h-3.5" />
                                                        )}
                                                        <span>Download Resume</span>
                                                    </Button>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => window.open(app.resume_url, "_blank")}
                                                        className="border-primary/15 hover:bg-primary/5 text-muted-foreground hover:text-foreground text-xs h-8 gap-1.5"
                                                        title="Open resume file in a new browser tab"
                                                    >
                                                        <ExternalLink className="w-3.5 h-3.5" />
                                                        <span>View Resume</span>
                                                    </Button>
                                                </>
                                            ) : (
                                                <span className="text-xs text-muted-foreground italic">
                                                    No resume file uploaded
                                                </span>
                                            )}

                                            {/* VIEW APPLICANT BUTTON & EXPORT ACTIONS */}
                                            <div className="flex items-center gap-2 ml-auto">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handleOpenEditModal(app)}
                                                    className="border-primary/20 hover:bg-primary/10 text-foreground text-xs h-8 gap-1.5 font-medium shadow-sm transition-all hover:scale-105"
                                                    title={`Edit questionnaire responses and details for ${app.applicant_name}`}
                                                >
                                                    <Pencil className="w-3.5 h-3.5 text-metal-blue-400" />
                                                    <span>Edit Details</span>
                                                </Button>

                                                <Button
                                                    variant="default"
                                                    size="sm"
                                                    onClick={() => setViewingApplicant(app)}
                                                    className="bg-metal-blue-500/20 hover:bg-metal-blue-500/30 text-metal-blue-300 border border-metal-blue-500/30 text-xs h-8 gap-1.5 font-medium shadow-sm transition-all hover:scale-105"
                                                    title={`View full applicant details for ${app.applicant_name}`}
                                                >
                                                    <Eye className="w-3.5 h-3.5 text-metal-blue-400" />
                                                    <span>View Applicant</span>
                                                </Button>

                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            className="h-8 w-8 p-0 border-primary/15 hover:bg-primary/5 text-muted-foreground hover:text-foreground"
                                                            title="Export / Download options"
                                                        >
                                                            <Download className="w-3.5 h-3.5" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end" className="w-56 bg-background/95 backdrop-blur-xl border-primary/20">
                                                        <DropdownMenuLabel className="text-xs text-muted-foreground">
                                                            Export Candidate Record
                                                        </DropdownMenuLabel>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem
                                                            onClick={() => printOrDownloadApplicationProfile(app, candidateJob || selectedJob)}
                                                            className="cursor-pointer text-xs flex items-center gap-2"
                                                        >
                                                            <Printer className="w-4 h-4 text-metal-blue-400" />
                                                            <span>Print / Save as PDF</span>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            onClick={() => {
                                                                exportJobApplicationsCSV(
                                                                    [app],
                                                                    allPositions,
                                                                    `Application_${sanitizeFileName(app.applicant_name)}.csv`
                                                                );
                                                                toast.success(`Exported application for ${app.applicant_name} to CSV`);
                                                            }}
                                                            className="cursor-pointer text-xs flex items-center gap-2"
                                                        >
                                                            <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                                                            <span>Export Application to CSV</span>
                                                        </DropdownMenuItem>
                                                        {app.resume_url && (
                                                            <DropdownMenuItem
                                                                onClick={() => handleDownloadSingleResume(app)}
                                                                className="cursor-pointer text-xs flex items-center gap-2"
                                                            >
                                                                <Download className="w-4 h-4 text-blue-400" />
                                                                <span>Download Resume File</span>
                                                            </DropdownMenuItem>
                                                        )}
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </GlassCard>
                        );
                    })}
                </div>

                {/* Progress Dialog for Bulk ZIP */}
                <Dialog open={zipModalOpen} onOpenChange={setZipModalOpen}>
                    <DialogContent className="sm:max-w-md bg-background/95 backdrop-blur-xl border-primary/20">
                        <DialogHeader>
                            <DialogTitle className="flex items-center gap-2 text-foreground font-heading">
                                <Archive className="w-5 h-5 text-metal-blue-400" />
                                <span>Generating ZIP Archive</span>
                            </DialogTitle>
                            <DialogDescription className="text-muted-foreground text-xs">
                                Packaging candidate resumes, questionnaires, and summary spreadsheet into a compressed ZIP file.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="space-y-4 py-4">
                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                                <span className="font-medium text-foreground">{zipProgress.message || "Processing..."}</span>
                                <span>{zipProgress.current} / {zipProgress.total}</span>
                            </div>
                            <Progress
                                value={zipProgress.total > 0 ? (zipProgress.current / zipProgress.total) * 100 : 0}
                                className="h-2 bg-primary/10"
                            />
                            <div className="flex items-center gap-2 text-xs text-muted-foreground italic">
                                <Loader2 className="w-3.5 h-3.5 animate-spin text-metal-blue-400" />
                                <span>Please keep this window open while files are retrieved...</span>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>

                {/* View Applicant Full Profile Modal */}
                {renderViewApplicantModal()}

                {/* Edit Applicant Details & Questionnaire Modal */}
                {renderEditApplicantModal()}
            </div>
        );
    }

    // =========================================================================
    // VIEW 2: PORTAL OVERVIEW (All Positions List & Master Bulk Downloads)
    // =========================================================================
    return (
        <div className="space-y-8 animate-in fade-in duration-300">
            {/* Top Overview & Master Bulk Download Toolbar */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-primary/10">
                <div>
                    <h2 className="text-3xl font-heading font-bold text-foreground flex items-center gap-3">
                        <span>Applications Portal</span>
                        <span className="text-xs px-2.5 py-1 rounded-full bg-metal-blue-500/20 text-metal-blue-300 border border-metal-blue-500/30 font-sans font-medium">
                            {totalAppsCount} Total Candidate{totalAppsCount !== 1 ? "s" : ""}
                        </span>
                    </h2>
                    <p className="text-muted-foreground text-sm mt-1">
                        Review, download, and manage candidate applications for all active jobs and internships.
                    </p>
                </div>

                {/* Master Bulk Download Buttons */}
                <div className="flex items-center gap-2.5 flex-wrap">
                    <Button
                        variant="outline"
                        onClick={() => setSelectedJobId("all")}
                        disabled={totalAppsCount === 0}
                        className="border-metal-blue-500/30 text-metal-blue-300 hover:bg-metal-blue-500/10 text-sm font-medium gap-2"
                        title="View all applications across all positions in a single list"
                    >
                        <Eye className="w-4 h-4 text-metal-blue-400" />
                        <span>View All Candidates ({totalAppsCount})</span>
                    </Button>
                    <Button
                        variant="outline"
                        onClick={handleExportAllCSV}
                        disabled={totalAppsCount === 0}
                        className="border-primary/20 hover:bg-primary/10 text-foreground text-sm font-medium gap-2"
                        title="Export every single application in the entire system to a master CSV spreadsheet"
                    >
                        <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                        <span>Master CSV Export</span>
                    </Button>
                    <Button
                        onClick={handleDownloadAllZip}
                        disabled={totalAppsCount === 0 || isGeneratingZip}
                        className="bg-gradient-to-r from-metal-blue-600 to-metal-purple-600 hover:from-metal-blue-500 hover:to-metal-purple-500 text-white text-sm font-medium gap-2 shadow-md hover:shadow-metal-blue-500/25 transition-all"
                        title="Download all candidate resumes across all jobs and internships as a single packaged ZIP"
                    >
                        <Archive className="w-4 h-4" />
                        <span>Download All Resumes (ZIP)</span>
                    </Button>
                </div>
            </div>

            {/* Quick Metrics Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <GlassCard
                    onClick={() => totalAppsCount > 0 && setSelectedJobId("all")}
                    className={`p-4 border-primary/10 transition-all ${
                        totalAppsCount > 0 ? "hover:border-metal-blue-500/40 cursor-pointer hover:scale-[1.02]" : ""
                    }`}
                    title={totalAppsCount > 0 ? "Click to view all applications across all positions" : undefined}
                >
                    <div className="flex items-center justify-between">
                        <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Total Received</p>
                        <Eye className="w-3.5 h-3.5 text-metal-blue-400" />
                    </div>
                    <p className="text-3xl font-bold text-foreground mt-1">{totalAppsCount}</p>
                    {totalAppsCount > 0 && (
                        <p className="text-[11px] text-metal-blue-400 font-medium mt-1">View all applicants →</p>
                    )}
                </GlassCard>
                <GlassCard className="p-4 border-yellow-500/20 bg-yellow-500/[0.02]">
                    <p className="text-xs text-yellow-400/90 font-medium uppercase tracking-wider">Pending Review</p>
                    <p className="text-3xl font-bold text-yellow-400 mt-1">{pendingAppsCount}</p>
                </GlassCard>
                <GlassCard className="p-4 border-green-500/20 bg-green-500/[0.02]">
                    <p className="text-xs text-green-400/90 font-medium uppercase tracking-wider">Approved</p>
                    <p className="text-3xl font-bold text-green-400 mt-1">{approvedAppsCount}</p>
                </GlassCard>
                <GlassCard className="p-4 border-red-500/20 bg-red-500/[0.02]">
                    <p className="text-xs text-red-400/90 font-medium uppercase tracking-wider">Rejected</p>
                    <p className="text-3xl font-bold text-red-400 mt-1">{rejectedAppsCount}</p>
                </GlassCard>
            </div>

            {/* Position Search & Category Filter */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                {/* Type Filter Pills */}
                <div className="flex items-center gap-1.5 p-1 bg-primary/5 border border-primary/10 rounded-xl overflow-x-auto">
                    {[
                        { id: "all", label: "All Positions" },
                        { id: "jobs", label: "Jobs Only" },
                        { id: "internships", label: "Internships Only" }
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setPositionTypeFilter(tab.id as any)}
                            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                                positionTypeFilter === tab.id
                                    ? "bg-metal-blue-500/20 text-metal-blue-300 border border-metal-blue-500/30 shadow-sm"
                                    : "text-muted-foreground hover:text-foreground hover:bg-primary/5"
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Search Positions Input */}
                <div className="relative flex-1 max-w-md">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        value={portalSearch}
                        onChange={e => setPortalSearch(e.target.value)}
                        placeholder="Search positions by title, department, or location..."
                        className="pl-9 bg-primary/5 border-primary/10 text-foreground text-sm"
                    />
                    {portalSearch && (
                        <button
                            onClick={() => setPortalSearch("")}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground text-xs"
                        >
                            Clear
                        </button>
                    )}
                </div>
            </div>

            {/* List of Position Sections */}
            <div className="grid gap-4">
                {filteredPositions.length === 0 && (
                    <div className="text-center py-16 border border-dashed border-primary/10 rounded-2xl p-6">
                        <Briefcase className="w-12 h-12 mx-auto mb-3 text-muted-foreground opacity-40" />
                        <h3 className="font-bold text-lg text-foreground mb-1">No Positions Found</h3>
                        <p className="text-sm text-muted-foreground max-w-md mx-auto">
                            {portalSearch
                                ? "No open positions matched your search criteria."
                                : "No active jobs or internships currently listed."}
                        </p>
                    </div>
                )}

                {filteredPositions.map(pos => {
                    const appsForPos = jobApplications.filter(a => a.job_id === pos.id);
                    const applicantCount = appsForPos.length;
                    const pendingForPos = appsForPos.filter(a => a.status === "pending").length;
                    const isInternship = pos.department === "Internship" || pos.type === "Internship";

                    return (
                        <GlassCard
                            key={pos.id}
                            className="p-6 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 group hover:border-metal-blue-500/30 transition-all"
                        >
                            <div className="space-y-1.5">
                                <div className="flex items-center gap-2.5 flex-wrap">
                                    <h3 className="font-bold text-xl text-foreground group-hover:text-metal-blue-300 transition-colors">
                                        {pos.title}
                                    </h3>
                                    {isInternship ? (
                                        <span className="bg-purple-500/20 text-purple-300 border border-purple-500/30 px-2 py-0.5 rounded text-xs font-semibold flex items-center gap-1">
                                            <GraduationCap className="w-3 h-3" /> Internship
                                        </span>
                                    ) : (
                                        <span className="bg-blue-500/20 text-blue-300 border border-blue-500/30 px-2 py-0.5 rounded text-xs font-semibold flex items-center gap-1">
                                            <Briefcase className="w-3 h-3" /> Job
                                        </span>
                                    )}
                                </div>

                                <p className="text-sm text-muted-foreground">
                                    {pos.department} • {pos.location || "Chennai / Remote"} • {pos.type || "Full Time"}
                                </p>

                                <div className="flex items-center gap-3 pt-1 text-xs font-medium">
                                    <span className="text-metal-blue-400 font-semibold">
                                        {applicantCount} Applicant{applicantCount !== 1 ? "s" : ""}
                                    </span>
                                    {pendingForPos > 0 && (
                                        <span className="px-2 py-0.5 rounded-full bg-yellow-500/15 text-yellow-400 border border-yellow-500/30">
                                            {pendingForPos} pending review
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Section Quick Download & View Actions */}
                            <div className="flex items-center gap-2.5 flex-wrap self-stretch lg:self-center justify-end">
                                {/* Download CSV for this specific section */}
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleExportPositionCSV(pos.id, pos.title)}
                                    disabled={applicantCount === 0}
                                    className="border-primary/20 hover:bg-primary/10 text-foreground text-xs h-9 gap-1.5"
                                    title={`Export all ${applicantCount} application(s) for "${pos.title}" to CSV`}
                                >
                                    <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
                                    <span>Download CSV</span>
                                </Button>

                                {/* Bulk Download Resumes ZIP for this specific section */}
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleDownloadPositionZip(pos.id, pos.title)}
                                    disabled={applicantCount === 0 || isGeneratingZip}
                                    className="border-metal-blue-500/30 text-metal-blue-300 hover:bg-metal-blue-500/10 text-xs h-9 gap-1.5"
                                    title={`Download all resumes for "${pos.title}" as a ZIP archive`}
                                >
                                    <Archive className="w-3.5 h-3.5" />
                                    <span>Download Resumes (ZIP)</span>
                                </Button>

                                {/* Drill Down Button */}
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    onClick={() => setSelectedJobId(pos.id)}
                                    className="bg-primary/10 hover:bg-primary/20 text-foreground font-medium text-xs h-9"
                                >
                                    View Applications ({applicantCount})
                                </Button>
                            </div>
                        </GlassCard>
                    );
                })}
            </div>

            {/* Progress Dialog for Master ZIP */}
            <Dialog open={zipModalOpen} onOpenChange={setZipModalOpen}>
                <DialogContent className="sm:max-w-md bg-background/95 backdrop-blur-xl border-primary/20">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-foreground font-heading">
                            <Archive className="w-5 h-5 text-metal-blue-400" />
                            <span>Generating Master ZIP Archive</span>
                        </DialogTitle>
                        <DialogDescription className="text-muted-foreground text-xs">
                            Packaging candidate resumes, candidate questionnaires, and master summary spreadsheet.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 py-4">
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span className="font-medium text-foreground">{zipProgress.message || "Processing..."}</span>
                            <span>{zipProgress.current} / {zipProgress.total}</span>
                        </div>
                        <Progress
                            value={zipProgress.total > 0 ? (zipProgress.current / zipProgress.total) * 100 : 0}
                            className="h-2 bg-primary/10"
                        />
                        <div className="flex items-center gap-2 text-xs text-muted-foreground italic">
                            <Loader2 className="w-3.5 h-3.5 animate-spin text-metal-blue-400" />
                            <span>Please wait while candidate resumes are retrieved and compressed...</span>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            {/* View Applicant Full Profile Modal */}
            {renderViewApplicantModal()}

            {/* Edit Applicant Details & Questionnaire Modal */}
            {renderEditApplicantModal()}
        </div>
    );
};
