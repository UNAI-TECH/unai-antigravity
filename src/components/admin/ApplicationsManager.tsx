import React, { useState, useMemo } from "react";
import { JobApplication, Job } from "@/context/DataContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
    Mail,
    ArrowLeft,
    Sparkles
} from "lucide-react";
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
}

export const ApplicationsManager: React.FC<ApplicationsManagerProps> = ({
    allPositions,
    jobApplications,
    selectedJobId,
    setSelectedJobId,
    updateJobApplicationStatus
}) => {
    // Portal-level state
    const [portalSearch, setPortalSearch] = useState("");
    const [positionTypeFilter, setPositionTypeFilter] = useState<"all" | "jobs" | "internships">("all");

    // Drill-down level state
    const [candidateSearch, setCandidateSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState<"all" | "pending" | "approved" | "rejected">("all");
    const [selectedAppIds, setSelectedAppIds] = useState<Set<string>>(new Set());
    const [expandedAnswers, setExpandedAnswers] = useState<Set<string>>(new Set());

    // Progress Modal for Bulk Zip Generation
    const [zipModalOpen, setZipModalOpen] = useState(false);
    const [zipProgress, setZipProgress] = useState({ current: 0, total: 0, message: "" });
    const [isGeneratingZip, setIsGeneratingZip] = useState(false);
    const [singleDownloadingId, setSingleDownloadingId] = useState<string | null>(null);

    // Selected job object
    const selectedJob = useMemo(() => {
        if (!selectedJobId) return null;
        return allPositions.find(j => j.id === selectedJobId) || null;
    }, [selectedJobId, allPositions]);

    // Applications for selected job
    const positionApplications = useMemo(() => {
        if (!selectedJobId) return [];
        return jobApplications.filter(app => app.job_id === selectedJobId);
    }, [selectedJobId, jobApplications]);

    // Filtered applications within selected job
    const filteredApplications = useMemo(() => {
        return positionApplications.filter(app => {
            const matchesStatus = statusFilter === "all" || app.status === statusFilter;
            const searchLower = candidateSearch.trim().toLowerCase();
            const matchesSearch =
                !searchLower ||
                app.applicant_name?.toLowerCase().includes(searchLower) ||
                app.email?.toLowerCase().includes(searchLower) ||
                app.phone?.toLowerCase().includes(searchLower);
            return matchesStatus && matchesSearch;
        });
    }, [positionApplications, statusFilter, candidateSearch]);

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
        const apps = jobApplications.filter(a => a.job_id === jobId);
        if (apps.length === 0) {
            toast.error("No applications found for this position");
            return;
        }
        const job = allPositions.find(j => j.id === jobId);
        const title = customTitle || job?.title || "Position";
        exportJobApplicationsCSV(
            apps,
            allPositions,
            `${sanitizeFileName(title)}_Applications_${new Date().toISOString().split("T")[0]}.csv`
        );
        toast.success(`Exported ${apps.length} application(s) for "${title}" to CSV`);
    };

    // Handler: Download current position resumes ZIP
    const handleDownloadPositionZip = async (jobId: string, customTitle?: string) => {
        const apps = jobApplications.filter(a => a.job_id === jobId);
        if (apps.length === 0) {
            toast.error("No applications found for this position");
            return;
        }
        const job = allPositions.find(j => j.id === jobId);
        const title = customTitle || job?.title || "Position";

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
                <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
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

                    {/* Search Candidate */}
                    <div className="relative flex-1 max-w-md">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            value={candidateSearch}
                            onChange={e => setCandidateSearch(e.target.value)}
                            placeholder="Search applicant name, email, or phone..."
                            className="pl-9 bg-primary/5 border-primary/10 text-foreground text-sm"
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
                                                </div>
                                                <div className="flex items-center gap-4 text-xs md:text-sm text-muted-foreground mt-1 flex-wrap">
                                                    <a
                                                        href={`mailto:${app.email}`}
                                                        className="flex items-center gap-1.5 text-primary/80 hover:text-primary transition-colors"
                                                    >
                                                        <Mail className="w-3.5 h-3.5" />
                                                        <span>{app.email}</span>
                                                    </a>
                                                    {app.phone && (
                                                        <a
                                                            href={`tel:${app.phone}`}
                                                            className="flex items-center gap-1.5 hover:text-foreground transition-colors"
                                                        >
                                                            <Phone className="w-3.5 h-3.5" />
                                                            <span>{app.phone}</span>
                                                        </a>
                                                    )}
                                                    <span className="flex items-center gap-1.5 text-muted-foreground">
                                                        <Calendar className="w-3.5 h-3.5" />
                                                        <span>{app.created_at ? new Date(app.created_at).toLocaleDateString() : "N/A"}</span>
                                                    </span>
                                                </div>
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
                                        {hasAnswers && (
                                            <div className="pt-2 border-t border-primary/10">
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

                                            {/* Download / Print Candidate Application Summary */}
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className="border-primary/15 hover:bg-primary/5 text-foreground text-xs h-8 gap-1.5 ml-auto"
                                                    >
                                                        <FileText className="w-3.5 h-3.5 text-yellow-400" />
                                                        <span>Download Application</span>
                                                        <ChevronDown className="w-3 h-3 text-muted-foreground" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="w-56 bg-background/95 backdrop-blur-xl border-primary/20">
                                                    <DropdownMenuLabel className="text-xs text-muted-foreground">
                                                        Export Candidate Record
                                                    </DropdownMenuLabel>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem
                                                        onClick={() => printOrDownloadApplicationProfile(app, selectedJob)}
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
                <GlassCard className="p-4 border-primary/10">
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Total Received</p>
                    <p className="text-3xl font-bold text-foreground mt-1">{totalAppsCount}</p>
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
        </div>
    );
};
