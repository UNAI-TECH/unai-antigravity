import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { sendStatusEmail } from "@/lib/emailService";
import { toast } from "sonner";
import { validateAdminSessionSync, destroyAdminSession } from "@/lib/authSecurity";

// Types
export interface Event {
    id: string;
    title: string;
    caption?: string;
    date: string;
    location: string;
    type: string;
    description: string;
    attendees: string;
    status: "upcoming" | "past" | "draft";
    cover_image?: string;
    banner?: string;
    posters?: string[];
    registration_link?: string;
    registration_type?: 'url' | 'manual';
    form_fields?: any[];
}

export interface EventRegistration {
    id: string;
    event_id: string;
    applicant_name: string;
    email: string;
    phone: string;
    answers: any;
    created_at: string;
}

export interface JobQuestion {
    id: string;
    question: string;
    options: string[];
}

export interface Job {
    id: string;
    title: string;
    department: string;
    location: string;
    experience?: string;
    type: string;
    salary: string;
    description: string;
    questions?: JobQuestion[];
}

export interface JobApplication {
    id: string;
    job_id: string;
    applicant_name: string;
    email: string;
    phone: string;
    resume_url: string;
    answers: any;
    status: "pending" | "approved" | "rejected";
    created_at: string;
}

export interface TeamMember {
    id: string;
    name: string;
    role: string;
    bio: string;
    social: {
        linkedin?: string;
        twitter?: string;
        github?: string;
    };
}

export interface GalleryItem {
    id: string;
    title: string;
    category: string;
    color: "blue" | "purple";
    caption: string;
    description: string;
    highlights: string[];
    photos: string[];
    banner?: string;
}

export interface Internship {
    id: string;
    role: string;
    duration: string;
    description: string;
    skills: string[];
    icon?: string;
    location?: string;
    stipend?: string;
    created_at?: string;
}

interface DataContextType {
    events: Event[];
    jobs: Job[];
    internships: Internship[];
    teamMembers: TeamMember[];
    galleryItems: GalleryItem[];
    addEvent: (event: Omit<Event, "id">) => void;
    updateEvent: (id: string, event: Partial<Event>) => void;
    deleteEvent: (id: string) => void;
    addJob: (job: Omit<Job, "id">) => void;
    deleteJob: (id: string) => void;
    addInternship: (internship: Omit<Internship, "id" | "created_at">) => Promise<Internship | void>;
    deleteInternship: (id: string) => Promise<void>;
    addTeamMember: (member: Omit<TeamMember, "id">) => void;
    deleteTeamMember: (id: string) => void;
    addGalleryItem: (item: Omit<GalleryItem, "id">) => void;
    deleteGalleryItem: (id: string) => void;
    jobApplications: JobApplication[];
    eventRegistrations: EventRegistration[];
    addJobApplication: (app: Omit<JobApplication, "id" | "created_at" | "status">) => Promise<void>;
    addEventRegistration: (app: Omit<EventRegistration, "id" | "created_at">) => Promise<void>;
    updateJobApplicationStatus: (id: string, status: "pending" | "approved" | "rejected", applicantEmail: string) => Promise<void>;
    updateJobApplicationDetails: (id: string, updates: { applicant_name?: string; email?: string; phone?: string; answers?: any; status?: "pending" | "approved" | "rejected"; }) => Promise<void>;
    isAuthenticated: boolean;
    login: () => void;
    logout: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [events, setEvents] = useState<Event[]>([]);
    const [jobs, setJobs] = useState<Job[]>([]);
    const [internships, setInternships] = useState<Internship[]>([]);
    const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
    const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
    const [jobApplications, setJobApplications] = useState<JobApplication[]>([]);
    const [eventRegistrations, setEventRegistrations] = useState<EventRegistration[]>([]);

    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return validateAdminSessionSync().isValid;
    });

    // Fetch Initial Data
    useEffect(() => {
        const fetchData = async () => {
            console.log("Fetching data from Supabase...");
            // Events
            const { data: eventsData, error: eventsError } = await supabase
                .from('events')
                .select('*')
                .order('created_at', { ascending: false });
            if (eventsData) setEvents(eventsData as Event[]);
            if (eventsError) console.error("Error fetching events:", eventsError);

            // Jobs
            const { data: jobsData, error: jobsError } = await supabase
                .from('jobs')
                .select('*')
                .order('created_at', { ascending: false });
            if (jobsData) setJobs(jobsData as Job[]);
            if (jobsError) console.error("Error fetching jobs:", jobsError);

            // Internships
            let loadedInternships: Internship[] = [];
            const { data: internData, error: internError } = await supabase
                .from('internships')
                .select('*')
                .order('created_at', { ascending: false });

            if (!internError && internData) {
                loadedInternships = internData.map((item: any) => ({
                    id: item.id,
                    role: item.role || item.title || "",
                    duration: item.duration || item.experience || "3–6 Months",
                    description: item.description || "",
                    skills: Array.isArray(item.skills) ? item.skills : (item.questions?.skills || []),
                    icon: item.icon || item.questions?.icon || "Cpu",
                    location: item.location || "Chennai / Remote",
                    stipend: item.stipend !== undefined && item.stipend !== null ? item.stipend : "",
                    created_at: item.created_at
                }));
            } else {
                // Fallback: If 'internships' table does not exist in Supabase yet,
                // fetch internships stored in 'jobs' table where department = 'Internship' or type = 'Internship'
                const { data: jobInternData } = await supabase
                    .from('jobs')
                    .select('*')
                    .or('department.eq.Internship,type.eq.Internship')
                    .order('created_at', { ascending: false });

                if (jobInternData) {
                    loadedInternships = jobInternData.map((item: any) => {
                        const extra = typeof item.questions === 'object' && item.questions !== null && !Array.isArray(item.questions)
                            ? item.questions
                            : {};
                        return {
                            id: item.id,
                            role: item.title,
                            duration: item.experience || "3–6 Months",
                            description: item.description,
                            skills: Array.isArray(extra.skills) ? extra.skills : (Array.isArray(item.skills) ? item.skills : []),
                            icon: extra.icon || "Cpu",
                            location: item.location || "Chennai / Remote",
                            stipend: extra.stipend !== undefined && extra.stipend !== null ? extra.stipend : (item.salary || ""),
                            created_at: item.created_at
                        };
                    });
                }
            }
            setInternships(loadedInternships);

            // Team
            const { data: teamData, error: teamError } = await supabase
                .from('team_members')
                .select('*')
                .order('created_at', { ascending: false });
            if (teamData) setTeamMembers(teamData as TeamMember[]);
            if (teamError) console.error("Error fetching team:", teamError);

            // Gallery
            const { data: galleryData, error: galleryError } = await supabase
                .from('gallery_items')
                .select('*')
                .order('created_at', { ascending: false });
            if (galleryData) setGalleryItems(galleryData as GalleryItem[]);
            if (galleryError) console.error("Error fetching gallery:", galleryError);

            // Job Applications
            if (isAuthenticated) {
                const { data: appsData, error: appsError } = await supabase
                    .from('job_applications')
                    .select('*')
                    .order('created_at', { ascending: false });
                if (appsData) setJobApplications(appsData as JobApplication[]);
                if (appsError) console.error("Error fetching job applications:", appsError);

                const { data: eventsRegData, error: eventsRegError } = await supabase
                    .from('event_registrations')
                    .select('*')
                    .order('created_at', { ascending: false });

                let fetchedRegs = (eventsRegData as EventRegistration[]) || [];
                try {
                    const localRegs = JSON.parse(localStorage.getItem('unai_event_registrations') || '[]');
                    const fetchedIds = new Set(fetchedRegs.map(r => r.id));
                    const missing = localRegs.filter((r: any) => !fetchedIds.has(r.id));
                    fetchedRegs = [...fetchedRegs, ...missing];
                } catch (e) {
                    console.error("Error reading local registrations:", e);
                }

                setEventRegistrations(fetchedRegs);
                if (eventsRegError) console.error("Error fetching event registrations:", eventsRegError);
            }
        };

        fetchData();
    }, [isAuthenticated]);


    // Actions
    const addEvent = async (event: Omit<Event, "id">) => {
        const tempId = 'event_' + Date.now();
        const optimisticEvent: Event = { ...event, id: tempId };

        const { data, error } = await supabase
            .from('events')
            .insert([event])
            .select();

        if (data && data.length > 0) {
            setEvents(prev => [data[0] as Event, ...prev]);
        } else {
            if (error) console.error("Error adding event:", error);
            // Optimistic fallback so user sees new event right away
            setEvents(prev => [optimisticEvent, ...prev]);
        }
    };

    const updateEvent = async (id: string, updatedEvent: Partial<Event>) => {
        // Optimistically update local state so changes reflect instantly
        setEvents(prev => prev.map(e => e.id === id ? { ...e, ...updatedEvent } as Event : e));

        const { data, error } = await supabase
            .from('events')
            .update(updatedEvent)
            .eq('id', id)
            .select();

        if (data && data.length > 0) {
            setEvents(prev => prev.map(e => e.id === id ? data[0] as Event : e));
        }
        if (error) console.error("Error updating event in Supabase:", error);
    };

    const deleteEvent = async (id: string) => {
        const { error } = await supabase
            .from('events')
            .delete()
            .eq('id', id);

        if (!error) {
            setEvents(prev => prev.filter((e) => e.id !== id));
        } else {
            console.error("Error deleting event:", error);
        }
    };

    const addJob = async (job: Omit<Job, "id">) => {
        const { data, error } = await supabase
            .from('jobs')
            .insert([job])
            .select();

        if (data) {
            setJobs(prev => [data[0] as Job, ...prev]);
        }
        if (error) console.error("Error adding job:", error);
    };

    const deleteJob = async (id: string) => {
        const { error } = await supabase
            .from('jobs')
            .delete()
            .eq('id', id);

        if (!error) {
            setJobs(prev => prev.filter((j) => j.id !== id));
        } else {
            console.error("Error deleting job:", error);
        }
    };

    const addInternship = async (internship: Omit<Internship, "id" | "created_at">) => {
        // 1. Try to insert into 'internships' table
        const { data: internData, error: internError } = await supabase
            .from('internships')
            .insert([{
                role: internship.role,
                duration: internship.duration,
                description: internship.description,
                skills: internship.skills || [],
                icon: internship.icon || 'Cpu',
                location: internship.location || 'Chennai / Remote',
                stipend: internship.stipend || ''
            }])
            .select();

        if (!internError && internData && internData.length > 0) {
            const newIntern: Internship = {
                id: internData[0].id,
                role: internData[0].role,
                duration: internData[0].duration,
                description: internData[0].description,
                skills: internData[0].skills || [],
                icon: internData[0].icon || 'Cpu',
                location: internData[0].location,
                stipend: internData[0].stipend || '',
                created_at: internData[0].created_at
            };

            // Mirror into jobs table to maintain foreign key compatibility with job_applications
            await supabase.from('jobs').insert([{
                id: internData[0].id,
                title: internship.role,
                department: 'Internship',
                type: 'Internship',
                location: internship.location || 'Chennai / Remote',
                salary: internship.stipend || '',
                experience: internship.duration,
                description: internship.description,
                questions: { skills: internship.skills || [], icon: internship.icon || 'Cpu', stipend: internship.stipend || '' }
            }]);

            setInternships(prev => [newIntern, ...prev]);
            return newIntern;
        }

        // 2. Fallback: If 'internships' table doesn't exist yet, insert directly into 'jobs' table
        const { data: jobData, error: jobError } = await supabase
            .from('jobs')
            .insert([{
                title: internship.role,
                department: 'Internship',
                type: 'Internship',
                location: internship.location || 'Chennai / Remote',
                salary: internship.stipend || '',
                experience: internship.duration,
                description: internship.description,
                questions: { skills: internship.skills || [], icon: internship.icon || 'Cpu', stipend: internship.stipend || '' }
            }])
            .select();

        if (jobData && jobData.length > 0) {
            const newIntern: Internship = {
                id: jobData[0].id,
                role: jobData[0].title,
                duration: jobData[0].experience || internship.duration,
                description: jobData[0].description,
                skills: internship.skills || [],
                icon: internship.icon || 'Cpu',
                location: jobData[0].location,
                stipend: jobData[0].salary || '',
                created_at: jobData[0].created_at
            };
            setInternships(prev => [newIntern, ...prev]);
            return newIntern;
        }

        if (jobError) {
            console.error("Error adding internship:", jobError);
            throw jobError;
        }
    };

    const deleteInternship = async (id: string) => {
        // Delete from both potential tables
        await supabase.from('internships').delete().eq('id', id);
        await supabase.from('jobs').delete().eq('id', id);

        setInternships(prev => prev.filter(i => i.id !== id));
    };

    const addTeamMember = async (member: Omit<TeamMember, "id">) => {
        const { data, error } = await supabase
            .from('team_members')
            .insert([member])
            .select();

        if (data) {
            setTeamMembers(prev => [data[0] as TeamMember, ...prev]);
        }
        if (error) console.error("Error adding team member:", error);
    };

    const deleteTeamMember = async (id: string) => {
        const { error } = await supabase
            .from('team_members')
            .delete()
            .eq('id', id);

        if (!error) {
            setTeamMembers(prev => prev.filter((m) => m.id !== id));
        } else {
            console.error("Error deleting team member:", error);
        }
    };

    const addGalleryItem = async (item: Omit<GalleryItem, "id">) => {
        const { data, error } = await supabase
            .from('gallery_items')
            .insert([item])
            .select();

        if (data) {
            setGalleryItems(prev => [data[0] as GalleryItem, ...prev]);
        }
        if (error) console.error("Error adding gallery item:", error);
    };

    const deleteGalleryItem = async (id: string) => {
        const { error } = await supabase
            .from('gallery_items')
            .delete()
            .eq('id', id);

        if (!error) {
            setGalleryItems(prev => prev.filter((i) => i.id !== id));
        } else {
            console.error("Error deleting gallery item:", error);
        }
    };

    const addJobApplication = async (app: Omit<JobApplication, "id" | "created_at" | "status">) => {
        // 1. Verify against duplicate applications by applicant name & contact number for this position
        const normalizedName = app.applicant_name?.trim().toLowerCase();
        const normalizedPhone = app.phone ? app.phone.replace(/\D/g, "") : "";

        // Check local state cache
        const localDuplicate = jobApplications.find(existing => {
            if (existing.job_id !== app.job_id) return false;
            const exName = existing.applicant_name?.trim().toLowerCase();
            const exPhone = existing.phone ? existing.phone.replace(/\D/g, "") : "";
            const isNameMatch = exName === normalizedName;
            const isPhoneMatch = normalizedPhone.length > 0 && exPhone.length > 0
                ? (exPhone === normalizedPhone || exPhone.endsWith(normalizedPhone) || normalizedPhone.endsWith(exPhone))
                : existing.phone?.trim() === app.phone?.trim();
            return isNameMatch && isPhoneMatch;
        });

        if (localDuplicate) {
            throw new Error(`An application for this position has already been submitted under "${app.applicant_name}" with contact number "${app.phone}". Duplicate submissions are not allowed.`);
        }

        // Query database to ensure no duplicate exists on the server
        const { data: dbRecords, error: checkError } = await supabase
            .from('job_applications')
            .select('id, applicant_name, phone, created_at')
            .eq('job_id', app.job_id);

        if (!checkError && dbRecords && dbRecords.length > 0) {
            const dbDuplicate = dbRecords.find(existing => {
                const exName = existing.applicant_name?.trim().toLowerCase();
                const exPhone = existing.phone ? existing.phone.replace(/\D/g, "") : "";
                const isNameMatch = exName === normalizedName;
                const isPhoneMatch = normalizedPhone.length > 0 && exPhone.length > 0
                    ? (exPhone === normalizedPhone || exPhone.endsWith(normalizedPhone) || normalizedPhone.endsWith(exPhone))
                    : existing.phone?.trim() === app.phone?.trim();
                return isNameMatch && isPhoneMatch;
            });

            if (dbDuplicate) {
                const appliedDate = dbDuplicate.created_at ? new Date(dbDuplicate.created_at).toLocaleString() : "";
                throw new Error(`An application for this position has already been submitted under "${app.applicant_name}" with contact number "${app.phone}"${appliedDate ? ` on ${appliedDate}` : ""}. Duplicate submissions are not allowed.`);
            }
        }

        // 2. Capture exact application timestamp
        const appliedTimestamp = new Date().toISOString();
        const applicationToInsert = {
            ...app,
            created_at: appliedTimestamp,
            status: 'pending' as const
        };

        const { data, error } = await supabase
            .from('job_applications')
            .insert([applicationToInsert])
            .select();

        if (error) {
            console.error("Error adding job application:", error);
            throw error;
        }

        if (data && data.length > 0) {
            setJobApplications(prev => [data[0] as JobApplication, ...prev]);

            // Send confirmation email
            try {
                const job = jobs.find(j => j.id === app.job_id);
                const intern = !job ? internships.find(i => i.id === app.job_id) : null;
                const positionTitle = job?.title || intern?.role || "Position";
                await sendStatusEmail(app.email, app.applicant_name, 'received', positionTitle);
            } catch (emailError) {
                console.error("Failed to send confirmation email:", emailError);
                // Don't fail the application submission if email fails
            }
        }
    };

    const addEventRegistration = async (app: Omit<EventRegistration, "id" | "created_at">) => {
        // Verify against duplicate event registrations
        const normalizedName = app.applicant_name?.trim().toLowerCase();
        const normalizedPhone = app.phone ? app.phone.replace(/\D/g, "") : "";

        const { data: dbRecords } = await supabase
            .from('event_registrations')
            .select('id, applicant_name, phone, created_at')
            .eq('event_id', app.event_id);

        if (dbRecords && dbRecords.length > 0) {
            const dbDuplicate = dbRecords.find(existing => {
                const exName = existing.applicant_name?.trim().toLowerCase();
                const exPhone = existing.phone ? existing.phone.replace(/\D/g, "") : "";
                const isNameMatch = exName === normalizedName;
                const isPhoneMatch = normalizedPhone.length > 0 && exPhone.length > 0
                    ? (exPhone === normalizedPhone || exPhone.endsWith(normalizedPhone) || normalizedPhone.endsWith(exPhone))
                    : existing.phone?.trim() === app.phone?.trim();
                return isNameMatch && isPhoneMatch;
            });

            if (dbDuplicate) {
                throw new Error(`A registration for this event has already been submitted under "${app.applicant_name}" with contact number "${app.phone}". Duplicate registrations are not allowed.`);
            }
        }

        const tempReg: EventRegistration = {
            ...app,
            id: 'reg_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
            created_at: new Date().toISOString()
        };

        const registrationToInsert = {
            ...app,
            created_at: tempReg.created_at
        };

        const { data, error } = await supabase
            .from('event_registrations')
            .insert([registrationToInsert])
            .select();

        if (error) {
            console.error("Error adding event registration:", error);
            // Fallback optimistic entry so data isn't lost
            setEventRegistrations(prev => [tempReg, ...prev]);
            try {
                const stored = JSON.parse(localStorage.getItem('unai_event_registrations') || '[]');
                localStorage.setItem('unai_event_registrations', JSON.stringify([tempReg, ...stored]));
            } catch (e) {
                console.error("Error saving local registration backup:", e);
            }
            throw error;
        }

        const savedReg = (data && data.length > 0) ? (data[0] as EventRegistration) : tempReg;
        setEventRegistrations(prev => [savedReg, ...prev]);

        // Always save to local backup
        try {
            const stored = JSON.parse(localStorage.getItem('unai_event_registrations') || '[]');
            localStorage.setItem('unai_event_registrations', JSON.stringify([savedReg, ...stored]));
        } catch (e) {
            console.error("Error saving local registration backup:", e);
        }
    };

    const updateJobApplicationStatus = async (id: string, status: "pending" | "approved" | "rejected", applicantEmail: string) => {
        // 1. Update Status in Supabase
        const { error } = await supabase
            .from('job_applications')
            .update({ status })
            .eq('id', id);

        if (error) {
            console.error("Error updating job application status:", error);
            throw error;
        }

        setJobApplications(prev => prev.map(app =>
            app.id === id ? { ...app, status } : app
        ));

        // 2. Send status update email
        if (status !== 'pending') {
            try {
                const application = jobApplications.find(app => app.id === id);
                const job = jobs.find(j => j.id === application?.job_id);
                const intern = !job ? internships.find(i => i.id === application?.job_id) : null;
                const positionTitle = job?.title || intern?.role || "Position";
                const targetEmail = applicantEmail || application?.email || "";
                const applicantName = application?.applicant_name || "Applicant";

                if (targetEmail) {
                    await sendStatusEmail(targetEmail, applicantName, status, positionTitle);
                }
            } catch (emailError) {
                console.error("Failed to send status email:", emailError);
                toast.warning("Status updated in database, but email notification could not be delivered.");
            }
        }
    };

    const updateJobApplicationDetails = async (
        id: string,
        updates: {
            applicant_name?: string;
            email?: string;
            phone?: string;
            answers?: any;
            status?: "pending" | "approved" | "rejected";
        }
    ) => {
        const { error } = await supabase
            .from('job_applications')
            .update(updates)
            .eq('id', id);

        if (error) {
            console.error("Error updating job application details:", error);
            throw error;
        }

        setJobApplications(prev => prev.map(app =>
            app.id === id ? { ...app, ...updates } : app
        ));
    };

    const login = () => setIsAuthenticated(true);
    const logout = () => {
        destroyAdminSession();
        setIsAuthenticated(false);
        setJobApplications([]);
        setEventRegistrations([]);
    };

    return (
        <DataContext.Provider
            value={{
                events,
                jobs,
                internships,
                teamMembers,
                galleryItems,
                addEvent,
                updateEvent,
                deleteEvent,
                addJob,
                deleteJob,
                addInternship,
                deleteInternship,
                addTeamMember,
                deleteTeamMember,
                addGalleryItem,
                deleteGalleryItem,
                jobApplications,
                eventRegistrations,
                addJobApplication,
                addEventRegistration,
                updateJobApplicationStatus,
                updateJobApplicationDetails,
                isAuthenticated,
                login,
                logout,
            }}
        >
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => {
    const context = useContext(DataContext);
    if (context === undefined) {
        throw new Error("useData must be used within a DataProvider");
    }
    return context;
};
