import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";
import { useData, Event, Job, TeamMember } from "@/context/DataContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { GlassCard } from "@/components/ui/GlassCard";
import { Trash2, Plus, LogOut, LayoutDashboard, Calendar, Briefcase, Users, Search, Bell, Image as ImageIcon, FileText, CheckCircle, X } from "lucide-react";
import { toast } from "sonner";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion, AnimatePresence } from "framer-motion";
import { FloatingNavbar } from "@/components/layout/FloatingNavbar";
import { Footer } from "@/components/layout/Footer";
import { GlowOrb } from "@/components/effects/GlowOrb";

const AdminDashboard = () => {
    const {
        isAuthenticated, logout,
        events, addEvent, deleteEvent,
        jobs, addJob, deleteJob,
        teamMembers, addTeamMember, deleteTeamMember,
        galleryItems, addGalleryItem, deleteGalleryItem,
        jobApplications,
        updateJobApplicationStatus
    } = useData();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("overview");
    const [selectedJobId, setSelectedJobId] = useState<string | null>(null);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/admin");
        }
    }, [isAuthenticated, navigate]);

    if (!isAuthenticated) return null;

    const stats = [
        { label: "Total Events", value: events.length, icon: Calendar, color: "text-blue-400" },
        { label: "Open Jobs", value: jobs.length, icon: Briefcase, color: "text-green-400" },
        { label: "Applications", value: jobApplications.length, icon: FileText, color: "text-yellow-400" },
        { label: "Team Members", value: teamMembers.length, icon: Users, color: "text-purple-400" },
        { label: "Gallery Items", value: galleryItems.length, icon: ImageIcon, color: "text-pink-400" },
    ];

    const renderContent = () => {
        switch (activeTab) {
            case "overview":
                return (
                    <div className="space-y-8">
                        <h2 className="text-3xl font-heading font-bold">Dashboard Overview</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {stats.map((stat, i) => (
                                <GlassCard key={i} className="p-6 flex items-center justify-between">
                                    <div>
                                        <p className="text-muted-foreground text-sm font-medium">{stat.label}</p>
                                        <p className="text-4xl font-bold mt-2">{stat.value}</p>
                                    </div>
                                    <div className={`p-4 rounded-full bg-white/5 ${stat.color}`}>
                                        <stat.icon className="w-8 h-8" />
                                    </div>
                                </GlassCard>
                            ))}
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <GlassCard className="p-6">
                                <h3 className="font-bold text-lg mb-4">Recent Activity</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                        <div className="w-2 h-2 rounded-full bg-green-500" />
                                        System Online
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                        <div className="w-2 h-2 rounded-full bg-blue-500" />
                                        Database Sync Active
                                    </div>
                                </div>
                            </GlassCard>
                            <GlassCard className="p-6">
                                <h3 className="font-bold text-lg mb-4">Quick Actions</h3>
                                <div className="flex gap-4 flex-wrap">
                                    <Button variant="outline" onClick={() => setActiveTab('events')}>Manage Events</Button>
                                    <Button variant="outline" onClick={() => setActiveTab('careers')}>Post Job</Button>
                                    <Button variant="outline" onClick={() => setActiveTab('applications')}>View Applications</Button>
                                    <Button variant="outline" onClick={() => setActiveTab('gallery')}>Add Photo</Button>
                                </div>
                            </GlassCard>
                        </div>
                    </div>
                );
            case "events":
                return (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <h2 className="text-3xl font-heading font-bold">Events Management</h2>
                                <p className="text-muted-foreground">Schedule and organize company events.</p>
                            </div>
                            <AddEventDialog onAdd={addEvent} />
                        </div>
                        <div className="grid gap-4">
                            {events.length === 0 && (
                                <div className="text-center py-12 border border-dashed border-white/10 rounded-xl">
                                    <p className="text-muted-foreground">No events scheduled.</p>
                                </div>
                            )}
                            {events.map(event => (
                                <GlassCard key={event.id} className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 group hover:border-metal-blue-500/30 transition-colors">
                                    <div>
                                        <div className="flex items-center gap-3 mb-1">
                                            <h3 className="font-bold text-xl">{event.title}</h3>
                                            <span className={`px-2 py-0.5 rounded text-xs font-medium ${event.status === 'upcoming' ? 'bg-green-500/20 text-green-400' : 'bg-white/10 text-muted-foreground'}`}>
                                                {event.status}
                                            </span>
                                        </div>
                                        <p className="text-sm text-muted-foreground flex items-center gap-2">
                                            <Calendar className="w-3 h-3" /> {event.date} • <Search className="w-3 h-3" /> {event.location}
                                        </p>
                                    </div>
                                    <Button variant="destructive" size="icon" onClick={() => deleteEvent(event.id)} className="opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </GlassCard>
                            ))}
                        </div>
                    </div>
                );
            case "careers":
                return (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <h2 className="text-3xl font-heading font-bold">Careers Portal</h2>
                                <p className="text-muted-foreground">Manage job listings and applications.</p>
                            </div>
                            <AddJobDialog onAdd={addJob} />
                        </div>
                        <div className="grid gap-4">
                            {jobs.length === 0 && (
                                <div className="text-center py-12 border border-dashed border-white/10 rounded-xl">
                                    <p className="text-muted-foreground">No active job listings.</p>
                                </div>
                            )}
                            {jobs.map(job => (
                                <GlassCard key={job.id} className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 group hover:border-green-500/30 transition-colors">
                                    <div>
                                        <h3 className="font-bold text-xl">{job.title}</h3>
                                        <p className="text-sm text-muted-foreground">{job.department} • {job.location} • {job.type}</p>
                                        <p className="mt-1 text-sm font-semibold text-green-400">{job.salary}</p>
                                    </div>
                                    <Button variant="destructive" size="icon" onClick={() => deleteJob(job.id)} className="opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </GlassCard>
                            ))}
                        </div>
                    </div>
                );
            case "applications":
                if (selectedJobId) {
                    const selectedJob = jobs.find(j => j.id === selectedJobId);
                    const applications = jobApplications.filter(app => app.job_id === selectedJobId);

                    return (
                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <Button variant="outline" onClick={() => setSelectedJobId(null)} className="border-white/10 hover:bg-white/5">
                                    ← Back
                                </Button>
                                <div>
                                    <h2 className="text-3xl font-heading font-bold">Applications for {selectedJob?.title}</h2>
                                    <p className="text-muted-foreground">Reviewing {applications.length} applications.</p>
                                </div>
                            </div>
                            <div className="grid gap-4">
                                {applications.length === 0 && (
                                    <div className="text-center py-12 border border-dashed border-white/10 rounded-xl">
                                        <p className="text-muted-foreground">No applications for this job yet.</p>
                                    </div>
                                )}
                                {applications.map(app => (
                                    <GlassCard key={app.id} className="p-6 hover:border-metal-blue-500/30 transition-colors">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h3 className="font-bold text-xl">{app.applicant_name}</h3>
                                                <p className="text-sm text-metal-blue-300">{app.email}</p>
                                            </div>
                                            <span className="bg-yellow-500/10 text-yellow-400 px-3 py-1 rounded-full text-xs uppercase tracking-wider font-semibold border border-yellow-500/20">
                                                {app.status}
                                            </span>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground mb-4">
                                            <p>Phone: <span className="text-white">{app.phone}</span></p>
                                            <p>Applied: <span className="text-white">{new Date(app.created_at).toLocaleDateString()}</span></p>
                                        </div>

                                        <div className="flex gap-3 mt-4">
                                            {app.resume_url && (
                                                <Button variant="outline" size="sm" onClick={() => window.open(app.resume_url, '_blank')} className="border-white/10 hover:bg-white/5">
                                                    <FileText className="w-4 h-4 mr-2" /> View Resume
                                                </Button>
                                            )}

                                            {app.status === 'pending' && (
                                                <div className="flex gap-2 ml-auto">
                                                    <Button
                                                        size="sm"
                                                        className="bg-green-500/20 text-green-400 hover:bg-green-500/30 hover:text-green-300 border border-green-500/20"
                                                        onClick={() => {
                                                            toast.promise(updateJobApplicationStatus(app.id, 'approved', app.email), {
                                                                loading: 'Approving...',
                                                                success: 'Application Approved & Email Sent',
                                                                error: 'Failed to approve'
                                                            });
                                                        }}
                                                    >
                                                        <CheckCircle className="w-4 h-4 mr-2" /> Approve
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        className="bg-red-500/20 text-red-400 hover:bg-red-500/30 hover:text-red-300 border border-red-500/20"
                                                        onClick={() => {
                                                            toast.promise(updateJobApplicationStatus(app.id, 'rejected', app.email), {
                                                                loading: 'Rejecting...',
                                                                success: 'Application Rejected & Email Sent',
                                                                error: 'Failed to reject'
                                                            });
                                                        }}
                                                    >
                                                        <X className="w-4 h-4 mr-2" /> Reject
                                                    </Button>
                                                </div>
                                            )}
                                        </div>
                                    </GlassCard>
                                ))}
                            </div>
                        </div>
                    );
                }

                return (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <h2 className="text-3xl font-heading font-bold">Job Applications</h2>
                                <p className="text-muted-foreground">Select a job to view its applicants.</p>
                            </div>
                        </div>
                        <div className="grid gap-4">
                            {jobs.length === 0 && (
                                <div className="text-center py-12 border border-dashed border-white/10 rounded-xl">
                                    <p className="text-muted-foreground">No active jobs found.</p>
                                </div>
                            )}
                            {jobs.map(job => {
                                const applicantCount = jobApplications.filter(app => app.job_id === job.id).length;
                                return (
                                    <GlassCard key={job.id} className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 group hover:border-metal-blue-500/30 transition-colors">
                                        <div>
                                            <h3 className="font-bold text-xl">{job.title}</h3>
                                            <p className="text-sm text-muted-foreground">{job.department} • {job.location}</p>
                                            <p className="mt-2 text-sm font-medium text-metal-blue-400">
                                                {applicantCount} Applicant{applicantCount !== 1 ? 's' : ''}
                                            </p>
                                        </div>
                                        <Button
                                            variant="secondary"
                                            onClick={() => setSelectedJobId(job.id)}
                                            className="bg-white/5 hover:bg-white/10 text-white"
                                        >
                                            View Applications
                                        </Button>
                                    </GlassCard>
                                );
                            })}
                        </div>
                    </div>
                );
            case "team":
                return (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <h2 className="text-3xl font-heading font-bold">Team Roster</h2>
                                <p className="text-muted-foreground">Manage team members and profiles.</p>
                            </div>
                            <AddTeamDialog onAdd={addTeamMember} />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {teamMembers.length === 0 && (
                                <div className="col-span-full text-center py-12 border border-dashed border-white/10 rounded-xl">
                                    <p className="text-muted-foreground">No team members listed.</p>
                                </div>
                            )}
                            {teamMembers.map(member => (
                                <GlassCard key={member.id} className="p-6 flex justify-between items-start group hover:border-metal-purple-500/30 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-metal-blue-500 to-metal-purple-500 flex items-center justify-center text-white font-bold text-lg">
                                            {member.name.charAt(0)}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg">{member.name}</h3>
                                            <p className="text-sm text-metal-blue-400">{member.role}</p>
                                        </div>
                                    </div>
                                    <Button variant="destructive" size="icon" onClick={() => deleteTeamMember(member.id)} className="opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </GlassCard>
                            ))}
                        </div>
                    </div>
                );
            case "gallery":
                return (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <h2 className="text-3xl font-heading font-bold">Gallery Management</h2>
                                <p className="text-muted-foreground">Manage your visual content.</p>
                            </div>
                            <AddGalleryDialog onAdd={addGalleryItem} />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {galleryItems.length === 0 && (
                                <div className="col-span-full text-center py-12 border border-dashed border-white/10 rounded-xl">
                                    <p className="text-muted-foreground">No gallery items found.</p>
                                </div>
                            )}
                            {galleryItems.map(item => (
                                <GlassCard key={item.id} className="p-4 group hover:border-pink-500/30 transition-colors">
                                    <div className={`aspect-video rounded-lg mb-4 bg-gradient-to-br ${item.color === 'blue' ? 'from-metal-blue-900 to-black' : 'from-metal-purple-900 to-black'} flex items-center justify-center relative overflow-hidden`}>
                                        {item.photos && item.photos.length > 0 ? (
                                            <img src={item.photos[0]} alt={item.title} className="w-full h-full object-cover" />
                                        ) : (
                                            <ImageIcon className={`w-8 h-8 ${item.color === 'blue' ? 'text-blue-400' : 'text-purple-400'}`} />
                                        )}
                                        <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-bold text-lg">{item.title}</h3>
                                            <span className="text-xs px-2 py-1 rounded bg-white/10 text-muted-foreground">{item.category}</span>
                                        </div>
                                        <Button variant="destructive" size="icon" onClick={() => deleteGalleryItem(item.id)} className="opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </GlassCard>
                            ))}
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-background flex font-sans">
            {/* Sidebar */}
            <div className="w-20 md:w-64 border-r border-white/5 bg-black/20 backdrop-blur-xl flex flex-col fixed h-full z-20 transition-all duration-300">
                <div className="p-6 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-metal flex items-center justify-center">
                        <div className="w-3 h-3 bg-white rounded-full" />
                    </div>
                    <span className="font-bold text-xl hidden md:block tracking-wider">UNAI</span>
                </div>

                <nav className="flex-1 px-4 py-8 space-y-2">
                    {[
                        { id: 'overview', label: 'Overview', icon: LayoutDashboard },
                        { id: 'events', label: 'Events', icon: Calendar },
                        { id: 'careers', label: 'Jobs', icon: Briefcase },
                        { id: 'applications', label: 'Applications', icon: FileText },
                        { id: 'team', label: 'Team', icon: Users },
                        { id: 'gallery', label: 'Gallery', icon: ImageIcon },
                    ].map(item => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${activeTab === item.id
                                ? 'bg-metal-blue-500/10 text-metal-blue-400 border border-metal-blue-500/20'
                                : 'text-muted-foreground hover:bg-white/5 hover:text-white'
                                }`}
                        >
                            <item.icon className="w-5 h-5" />
                            <span className="hidden md:block font-medium">{item.label}</span>
                            {activeTab === item.id && (
                                <motion.div layoutId="active-pill" className="absolute left-0 w-1 h-8 bg-metal-blue-500 rounded-r-full md:hidden" />
                            )}
                        </button>
                    ))}
                </nav>

                <div className="p-4 border-t border-white/5">
                    <button
                        onClick={() => { logout(); navigate("/admin"); }}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all"
                    >
                        <LogOut className="w-5 h-5" />
                        <span className="hidden md:block font-medium">Logout</span>
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 ml-20 md:ml-64 relative">
                <header className="h-20 border-b border-white/5 bg-black/20 backdrop-blur-md flex items-center justify-between px-8 sticky top-0 z-10">
                    <h2 className="font-semibold text-lg capitalize">{activeTab}</h2>
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                            <input
                                placeholder="Search..."
                                className="bg-white/5 border border-white/10 rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-metal-blue-500"
                            />
                        </div>
                        <button className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5">
                            <Bell className="w-4 h-4" />
                        </button>
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-metal-blue-500 to-purple-500 flex items-center justify-center text-sm font-bold">
                            A
                        </div>
                    </div>
                </header>

                <main className="p-8">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                        >
                            {renderContent()}
                        </motion.div>
                    </AnimatePresence>
                </main>
            </div>
        </div>
    );
};


// Dialogs (Same as before but wrapped to prevent large file)
const AddEventDialog = ({ onAdd }: { onAdd: (data: any) => void }) => {
    const [open, setOpen] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState("");

    const eventTypes = [
        "Workshop",
        "AI Event",
        "Summer Internship",
        "Conference",
        "Meetup",
        "Webinar",
        "Hackathon",
        "Training Program",
        "Seminar"
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsUploading(true);
        const formData = new FormData(e.target as HTMLFormElement);

        // Upload Banner
        let bannerUrl = "";
        const bannerFile = formData.get("banner") as File;

        if (bannerFile && bannerFile.size > 0) {
            setUploadProgress("Uploading banner...");
            const fileExt = bannerFile.name.split('.').pop();
            const fileName = `banner_${Date.now()}_${Math.random()}.${fileExt}`;
            const { data, error } = await supabase.storage
                .from('event-banners')
                .upload(fileName, bannerFile);

            if (error) {
                console.error("Error uploading banner:", error);
                toast.error("Failed to upload banner");
                setIsUploading(false);
                setUploadProgress("");
                return;
            }

            const { data: { publicUrl } } = supabase.storage
                .from('event-banners')
                .getPublicUrl(fileName);

            bannerUrl = publicUrl;
        }

        // Upload Posters (Multiple)
        const posterUrls: string[] = [];
        const posterFiles = formData.getAll("posters") as File[];

        if (posterFiles && posterFiles.length > 0 && posterFiles[0].size > 0) {
            setUploadProgress(`Uploading posters (0/${posterFiles.length})...`);

            for (let i = 0; i < posterFiles.length; i++) {
                const posterFile = posterFiles[i];
                if (posterFile.size > 0) {
                    const fileExt = posterFile.name.split('.').pop();
                    const fileName = `poster_${Date.now()}_${i}_${Math.random()}.${fileExt}`;

                    const { data, error } = await supabase.storage
                        .from('event-posters')
                        .upload(fileName, posterFile);

                    if (error) {
                        console.error(`Error uploading poster ${i + 1}:`, error);
                        toast.error(`Failed to upload poster ${i + 1}`);
                        continue;
                    }

                    const { data: { publicUrl } } = supabase.storage
                        .from('event-posters')
                        .getPublicUrl(fileName);

                    posterUrls.push(publicUrl);
                    setUploadProgress(`Uploading posters (${i + 1}/${posterFiles.length})...`);
                }
            }
        }

        setUploadProgress("Creating event...");

        const data = {
            title: formData.get("title"),
            caption: formData.get("caption"),
            date: formData.get("date"),
            location: formData.get("location"),
            type: formData.get("type"),
            attendees: formData.get("attendees"),
            status: "upcoming",
            description: formData.get("description"),
            registration_link: formData.get("registration_link"),
            banner: bannerUrl,
            posters: posterUrls
        };

        onAdd(data);
        setOpen(false);
        setIsUploading(false);
        setUploadProgress("");
        toast.success("Event created successfully");
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="hero"><Plus className="w-4 h-4 mr-2" /> Add Event</Button>
            </DialogTrigger>
            <DialogContent
                data-lenis-prevent
                className="sm:max-w-[650px] bg-[#0B1221] border-white/10 text-white max-h-[85vh] overflow-y-auto custom-scrollbar pr-6"
            >
                <DialogHeader className="pb-4 mb-4">
                    <DialogTitle className="text-2xl font-bold text-gradient-metal">Add New Event</DialogTitle>
                    <p className="text-sm text-muted-foreground">Fill in the details to create a new event</p>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-5 pb-6">
                    {/* Banner Upload */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-metal-blue-300">Event Banner *</label>
                        <Input
                            type="file"
                            name="banner"
                            accept="image/*"
                            required
                            className="h-auto py-3 bg-white/5 border-white/10 file:text-white file:bg-metal-blue-500/20 file:border-0 file:px-4 file:py-2 file:rounded-md file:mr-4 hover:file:bg-metal-blue-500/30 transition-all cursor-pointer"
                        />
                        <p className="text-xs text-muted-foreground">Main banner image for the event</p>
                    </div>

                    {/* Title & Caption Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-metal-blue-300">Event Title *</label>
                            <Input
                                name="title"
                                placeholder="e.g., AI Workshop 2024"
                                required
                                className="bg-white/5 border-white/10 focus:border-metal-blue-500"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-metal-purple-300">Event Caption</label>
                            <Input
                                name="caption"
                                placeholder="Short tagline"
                                className="bg-white/5 border-white/10 focus:border-metal-purple-500"
                            />
                        </div>
                    </div>

                    {/* Location & Date Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-metal-blue-300">Location *</label>
                            <Input
                                name="location"
                                placeholder="e.g., San Francisco, CA"
                                required
                                className="bg-white/5 border-white/10 focus:border-metal-blue-500"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-metal-blue-300">Date *</label>
                            <Input
                                name="date"
                                placeholder="e.g., March 15-17, 2024"
                                required
                                className="bg-white/5 border-white/10 focus:border-metal-blue-500"
                            />
                        </div>
                    </div>

                    {/* Type & Attendees Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-metal-purple-300">Event Type *</label>
                            <Select name="type" defaultValue="Workshop">
                                <SelectTrigger className="bg-white/5 border-white/10 focus:border-metal-purple-500">
                                    <SelectValue placeholder="Select event type" />
                                </SelectTrigger>
                                <SelectContent className="bg-[#0B1221] border-white/10">
                                    {eventTypes.map(type => (
                                        <SelectItem key={type} value={type} className="text-white hover:bg-white/10">
                                            {type}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-metal-blue-300">Estimated Attendees *</label>
                            <Input
                                name="attendees"
                                placeholder="e.g., 500+"
                                required
                                className="bg-white/5 border-white/10 focus:border-metal-blue-500"
                            />
                        </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-metal-blue-300">Event Description *</label>
                        <Textarea
                            name="description"
                            placeholder="Detailed description of the event, what attendees can expect, agenda, etc."
                            required
                            className="bg-white/5 border-white/10 h-32 resize-none focus:border-metal-blue-500"
                        />
                    </div>

                    {/* Posters Upload */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-metal-purple-300">Event Posters</label>
                        <Input
                            type="file"
                            name="posters"
                            accept="image/*"
                            multiple
                            className="bg-white/5 border-white/10 file:text-white file:bg-metal-purple-500/20 file:border-0 file:px-4 file:py-2 file:rounded-md file:mr-4 hover:file:bg-metal-purple-500/30 transition-all"
                        />
                        <p className="text-xs text-muted-foreground">Upload multiple promotional posters (optional)</p>
                    </div>

                    {/* Registration URL */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-metal-blue-300">Registration URL *</label>
                        <Input
                            name="registration_link"
                            placeholder="https://example.com/register"
                            type="url"
                            required
                            className="bg-white/5 border-white/10 focus:border-metal-blue-500"
                        />
                    </div>

                    {/* Hidden Status */}
                    <input type="hidden" name="status" value="upcoming" />

                    {/* Upload Progress */}
                    {isUploading && uploadProgress && (
                        <div className="p-3 rounded-lg bg-metal-blue-500/10 border border-metal-blue-500/20">
                            <p className="text-sm text-metal-blue-300 flex items-center gap-2">
                                <div className="w-4 h-4 border-2 border-metal-blue-400 border-t-transparent rounded-full animate-spin" />
                                {uploadProgress}
                            </p>
                        </div>
                    )}

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        disabled={isUploading}
                        className="w-full bg-gradient-to-r from-metal-blue-500 to-metal-purple-500 hover:from-metal-blue-600 hover:to-metal-purple-600 text-white font-semibold py-6 text-lg shadow-lg shadow-metal-blue-500/20"
                    >
                        {isUploading ? (
                            <span className="flex items-center gap-2">
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                Creating Event...
                            </span>
                        ) : (
                            <span className="flex items-center gap-2">
                                <Plus className="w-5 h-5" />
                                Create Event
                            </span>
                        )}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

const AddJobDialog = ({ onAdd }: { onAdd: (data: any) => void }) => {
    const [open, setOpen] = useState(false);
    const [experienceType, setExperienceType] = useState("Freshers 0-1 years");
    const [customExperience, setCustomExperience] = useState("");
    const [jobType, setJobType] = useState("Full-time");
    const [customJobType, setCustomJobType] = useState("");

    // Questions Builder State
    const [questions, setQuestions] = useState<{ id: string, question: string, options: string[] }[]>([]);

    const addQuestion = () => {
        setQuestions([...questions, { id: Date.now().toString() + Math.random().toString(), question: "", options: ["", ""] }]);
    };

    const removeQuestion = (id: string) => {
        setQuestions(questions.filter(q => q.id !== id));
    };

    const updateQuestion = (id: string, text: string) => {
        setQuestions(questions.map(q => q.id === id ? { ...q, question: text } : q));
    };

    const addOption = (qId: string) => {
        setQuestions(questions.map(q => q.id === qId ? { ...q, options: [...q.options, ""] } : q));
    };

    const removeOption = (qId: string, idx: number) => {
        setQuestions(questions.map(q => q.id === qId ? { ...q, options: q.options.filter((_, i) => i !== idx) } : q));
    };

    const updateOption = (qId: string, optIdx: number, text: string) => {
        setQuestions(questions.map(q => {
            if (q.id === qId) {
                const newOpts = [...q.options];
                newOpts[optIdx] = text;
                return { ...q, options: newOpts };
            }
            return q;
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const data = Object.fromEntries(formData) as any;

        // Handle Experience
        if (experienceType === "Other") {
            if (!customExperience) return toast.error("Please enter experience details");
            data.experience = customExperience;
        } else {
            data.experience = experienceType;
        }

        // Handle Type
        if (jobType === "Other") {
            if (!customJobType) return toast.error("Please enter job type details");
            data.type = customJobType;
        } else {
            data.type = jobType;
        }

        data.questions = questions;

        onAdd(data);
        setOpen(false);
        toast.success("Job added successfully");
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="hero"><Plus className="w-4 h-4 mr-2" /> Post Job</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[700px] bg-[#0B1221] border-white/10 text-white max-h-[85vh] overflow-y-auto custom-scrollbar" data-lenis-prevent>
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-gradient-metal">Post New Job</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-5 mt-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-metal-blue-300">Job Title *</label>
                            <Input name="title" required className="bg-white/5 border-white/10" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-metal-blue-300">Department *</label>
                            <Input name="department" required className="bg-white/5 border-white/10" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-metal-blue-300">Location *</label>
                            <Input name="location" required className="bg-white/5 border-white/10" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-metal-blue-300">Salary Range *</label>
                            <Input name="salary" placeholder="e.g. $80k - $100k" required className="bg-white/5 border-white/10" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {/* Experience */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-metal-blue-300">Experience *</label>
                            <Select value={experienceType} onValueChange={setExperienceType}>
                                <SelectTrigger className="bg-white/5 border-white/10">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-[#0B1221] border-white/10">
                                    <SelectItem value="Freshers 0-1 years" className="text-white hover:bg-white/10 focus:bg-white/10">Freshers 0-1 years</SelectItem>
                                    <SelectItem value="Other" className="text-white hover:bg-white/10 focus:bg-white/10">Other</SelectItem>
                                </SelectContent>
                            </Select>
                            {experienceType === "Other" && (
                                <Input
                                    placeholder="Enter experience requirements"
                                    value={customExperience}
                                    onChange={(e) => setCustomExperience(e.target.value)}
                                    className="bg-white/5 border-white/10 mt-2"
                                />
                            )}
                        </div>

                        {/* Job Type */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-metal-blue-300">Job Type *</label>
                            <Select value={jobType} onValueChange={setJobType}>
                                <SelectTrigger className="bg-white/5 border-white/10">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-[#0B1221] border-white/10">
                                    <SelectItem value="Full-time" className="text-white hover:bg-white/10 focus:bg-white/10">Full-time</SelectItem>
                                    <SelectItem value="Part-time" className="text-white hover:bg-white/10 focus:bg-white/10">Part-time</SelectItem>
                                    <SelectItem value="Intern" className="text-white hover:bg-white/10 focus:bg-white/10">Intern</SelectItem>
                                    <SelectItem value="Hybrid" className="text-white hover:bg-white/10 focus:bg-white/10">Hybrid</SelectItem>
                                    <SelectItem value="Other" className="text-white hover:bg-white/10 focus:bg-white/10">Other</SelectItem>
                                </SelectContent>
                            </Select>
                            {jobType === "Other" && (
                                <Input
                                    placeholder="Enter job type"
                                    value={customJobType}
                                    onChange={(e) => setCustomJobType(e.target.value)}
                                    className="bg-white/5 border-white/10 mt-2"
                                />
                            )}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-metal-blue-300">Description *</label>
                        <Textarea name="description" required className="bg-white/5 border-white/10 min-h-[100px]" />
                    </div>

                    {/* Job Specific Questions */}
                    <div className="space-y-4 border-t border-white/10 pt-4">
                        <div className="flex justify-between items-center">
                            <label className="text-sm font-medium text-metal-purple-300">Job Specific Questions (Multi-choice)</label>
                            <Button type="button" size="sm" variant="outline" onClick={addQuestion} className="h-8 border-metal-purple-500/30 text-metal-purple-300 hover:bg-metal-purple-500/10">
                                <Plus className="w-4 h-4 mr-1" /> Add Question
                            </Button>
                        </div>

                        <div className="space-y-4">
                            {questions.map((q, qImg) => (
                                <div key={q.id} className="p-4 rounded-lg bg-white/5 space-y-3 relative group">
                                    <div className="flex gap-2">
                                        <Input
                                            placeholder="Enter question text..."
                                            value={q.question}
                                            onChange={(e) => updateQuestion(q.id, e.target.value)}
                                            className="bg-black/20 border-white/10 text-sm"
                                        />
                                        <Button type="button" size="icon" variant="ghost" onClick={() => removeQuestion(q.id)} className="h-10 w-10 text-red-400 hover:bg-red-400/10 hover:text-red-300">
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                    <div className="pl-4 space-y-2 border-l-2 border-white/10">
                                        <p className="text-xs text-muted-foreground uppercase tracking-wider">Options</p>
                                        {q.options.map((opt, optIdx) => (
                                            <div key={optIdx} className="flex gap-2">
                                                <Input
                                                    placeholder={`Option ${optIdx + 1}`}
                                                    value={opt}
                                                    onChange={(e) => updateOption(q.id, optIdx, e.target.value)}
                                                    className="h-8 bg-black/20 border-white/10 text-xs"
                                                />
                                                <Button type="button" size="icon" variant="ghost" onClick={() => removeOption(q.id, optIdx)} className="h-8 w-8 text-red-400 hover:bg-red-400/10">
                                                    <Trash2 className="w-3 h-3" />
                                                </Button>
                                            </div>
                                        ))}
                                        <Button type="button" size="sm" variant="ghost" onClick={() => addOption(q.id)} className="h-6 text-xs text-metal-blue-300 hover:text-metal-blue-200">
                                            + Add Option
                                        </Button>
                                    </div>
                                </div>
                            ))}
                            {questions.length === 0 && (
                                <p className="text-xs text-muted-foreground text-center py-4 italic">No questions added yet.</p>
                            )}
                        </div>
                    </div>

                    <Button type="submit" className="w-full bg-gradient-to-r from-metal-blue-500 to-metal-purple-500 hover:from-metal-blue-600 hover:to-metal-purple-600 text-white font-semibold py-6 mt-4">
                        Post Job
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

const AddTeamDialog = ({ onAdd }: { onAdd: (data: any) => void }) => {
    const [open, setOpen] = useState(false);
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const data = Object.fromEntries(formData);
        const social = {
            linkedin: data.linkedin as string,
            twitter: data.twitter as string,
            github: data.github as string,
        };
        const { linkedin, twitter, github, ...rest } = data;
        onAdd({ ...rest, social });
        setOpen(false);
        toast.success("Team member added successfully");
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="hero"><Plus className="w-4 h-4 mr-2" /> Add Member</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-[#0B1221] border-white/10 text-white">
                <DialogHeader>
                    <DialogTitle>Add Team Member</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                    <Input name="name" placeholder="Name" required className="bg-white/5 border-white/10" />
                    <Input name="role" placeholder="Role" required className="bg-white/5 border-white/10" />
                    <Textarea name="bio" placeholder="Bio" required className="bg-white/5 border-white/10" />
                    <Input name="linkedin" placeholder="LinkedIn URL" className="bg-white/5 border-white/10" />
                    <Input name="twitter" placeholder="X (Twitter) URL" className="bg-white/5 border-white/10" />
                    <Input name="github" placeholder="GitHub URL" className="bg-white/5 border-white/10" />
                    <Button type="submit" className="w-full bg-metal-blue-500 hover:bg-metal-blue-600">Add Member</Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

const AddGalleryDialog = ({ onAdd }: { onAdd: (data: any) => void }) => {
    const [open, setOpen] = useState(false);
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const data = Object.fromEntries(formData);

        // Process new fields
        const processedData = {
            ...data,
            highlights: (data.highlights as string).split('\n').filter(line => line.trim() !== ''),
            photos: (data.photos as string).split('\n').filter(line => line.trim() !== ''),
        };

        onAdd(processedData);
        setOpen(false);
        toast.success("Gallery item added successfully");
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="hero"><Plus className="w-4 h-4 mr-2" /> Add Item</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px] bg-[#0B1221] border-white/10 text-white max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Add Gallery Item</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                    <Input name="title" placeholder="Title" required className="bg-white/5 border-white/10" />
                    <Input name="caption" placeholder="One-line Caption" required className="bg-white/5 border-white/10" />

                    <div className="grid grid-cols-2 gap-4">
                        <Select name="category" defaultValue="Events">
                            <SelectTrigger className="bg-white/5 border-white/10">
                                <SelectValue placeholder="Category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Events">Events</SelectItem>
                                <SelectItem value="Team">Team</SelectItem>
                                <SelectItem value="Products">Products</SelectItem>
                                <SelectItem value="Spaces">Spaces</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select name="color" defaultValue="blue">
                            <SelectTrigger className="bg-white/5 border-white/10">
                                <SelectValue placeholder="Color Theme" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="blue">Blue</SelectItem>
                                <SelectItem value="purple">Purple</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <Textarea name="description" placeholder="Detailed Description" required className="bg-white/5 border-white/10 h-24" />

                    <div className="space-y-2">
                        <label className="text-xs text-muted-foreground">Event Highlights (One per line)</label>
                        <Textarea name="highlights" placeholder="- Keynote Speech&#10;- Network Session&#10;- Product Demo" required className="bg-white/5 border-white/10" />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs text-muted-foreground">Event Photos URLs (One per line). First one is cover.</label>
                        <Textarea name="photos" placeholder="https://example.com/photo1.jpg&#10;https://example.com/photo2.jpg" required className="bg-white/5 border-white/10" />
                    </div>

                    <Button type="submit" className="w-full bg-metal-blue-500 hover:bg-metal-blue-600">Add Item</Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default AdminDashboard;
