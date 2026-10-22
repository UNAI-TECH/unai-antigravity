import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { sendStatusEmail } from "@/lib/emailService";
import { toast } from "sonner";

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
    status: "upcoming" | "past";
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
        return localStorage.getItem("unai_auth") === "true";
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
                if (eventsRegData) setEventRegistrations(eventsRegData as EventRegistration[]);
                if (eventsRegError) console.error("Error fetching event registrations:", eventsRegError);
            }
        };

        fetchData();
    }, [isAuthenticated]);

    // Auth Persistence
    useEffect(() => {
        localStorage.setItem("unai_auth", String(isAuthenticated));
    }, [isAuthenticated]);

    // Actions
    const addEvent = async (event: Omit<Event, "id">) => {
        const { data, error } = await supabase
            .from('events')
            .insert([event])
            .select();

        if (data) {
            setEvents(prev => [data[0] as Event, ...prev]);
        }
        if (error) console.error("Error adding event:", error);
    };

    const updateEvent = async (id: string, updatedEvent: Partial<Event>) => {
        const { data, error } = await supabase
            .from('events')
            .update(updatedEvent)
            .eq('id', id)
            .select();

        if (data && data.length > 0) {
            setEvents(prev => prev.map(e => e.id === id ? data[0] as Event : e));
        }
        if (error) console.error("Error updating event:", error);
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
        const { data, error } = await supabase
            .from('job_applications')
            .insert([app])
            .select();

        if (data) {
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
        if (error) console.error("Error adding job application:", error);
    };

    const addEventRegistration = async (app: Omit<EventRegistration, "id" | "created_at">) => {
        const { data, error } = await supabase
            .from('event_registrations')
            .insert([app])
            .select();

        if (data) {
            setEventRegistrations(prev => [data[0] as EventRegistration, ...prev]);
        }
        if (error) console.error("Error adding event registration:", error);
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

    const login = () => setIsAuthenticated(true);
    const logout = () => setIsAuthenticated(false);

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
