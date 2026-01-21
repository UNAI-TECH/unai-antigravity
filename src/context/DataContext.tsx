import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { sendStatusEmail } from "@/lib/emailService";

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
    banner?: string;
    posters?: string[];
    registration_link?: string;
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

interface DataContextType {
    events: Event[];
    jobs: Job[];
    teamMembers: TeamMember[];
    galleryItems: GalleryItem[];
    addEvent: (event: Omit<Event, "id">) => void;
    deleteEvent: (id: string) => void;
    addJob: (job: Omit<Job, "id">) => void;
    deleteJob: (id: string) => void;
    addTeamMember: (member: Omit<TeamMember, "id">) => void;
    deleteTeamMember: (id: string) => void;
    addGalleryItem: (item: Omit<GalleryItem, "id">) => void;
    deleteGalleryItem: (id: string) => void;
    jobApplications: JobApplication[];
    addJobApplication: (app: Omit<JobApplication, "id" | "created_at" | "status">) => Promise<void>;
    updateJobApplicationStatus: (id: string, status: "pending" | "approved" | "rejected", applicantEmail: string) => Promise<void>;
    isAuthenticated: boolean;
    login: () => void;
    logout: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [events, setEvents] = useState<Event[]>([]);
    const [jobs, setJobs] = useState<Job[]>([]);
    const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
    const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
    const [jobApplications, setJobApplications] = useState<JobApplication[]>([]);

    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return localStorage.getItem("unai_auth") === "true";
    });

    // Fetch Initial Data
    useEffect(() => {
        const fetchData = async () => {
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
                if (job) {
                    await sendStatusEmail(app.email, app.applicant_name, 'received', job.title);
                }
            } catch (emailError) {
                console.error("Failed to send confirmation email:", emailError);
                // Don't fail the application submission if email fails
            }
        }
        if (error) console.error("Error adding job application:", error);
    };

    const updateJobApplicationStatus = async (id: string, status: "pending" | "approved" | "rejected", applicantEmail: string) => {
        // 1. Update Status in Supabase
        const { error } = await supabase
            .from('job_applications')
            .update({ status })
            .eq('id', id);

        if (!error) {
            setJobApplications(prev => prev.map(app =>
                app.id === id ? { ...app, status } : app
            ));

            // Send status update email
            if (status !== 'pending') {
                try {
                    const application = jobApplications.find(app => app.id === id);
                    if (application) {
                        const job = jobs.find(j => j.id === application.job_id);
                        if (job) {
                            await sendStatusEmail(applicantEmail, application.applicant_name, status, job.title);
                        }
                    }
                } catch (emailError) {
                    console.error("Failed to send status email:", emailError);
                    throw emailError; // Re-throw so the UI can show the error
                }
            }
        } else {
            console.error("Error updating job application status:", error);
        }
    };

    const login = () => setIsAuthenticated(true);
    const logout = () => setIsAuthenticated(false);

    return (
        <DataContext.Provider
            value={{
                events,
                jobs,
                teamMembers,
                galleryItems,
                addEvent,
                deleteEvent,
                addJob,
                deleteJob,
                addTeamMember,
                deleteTeamMember,
                addGalleryItem,
                deleteGalleryItem,
                jobApplications,
                addJobApplication,
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
