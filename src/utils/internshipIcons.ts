import React from "react";
import {
    Cpu,
    Globe,
    TrendingUp,
    Target,
    Palette,
    Megaphone,
    BookOpenCheck,
    Smartphone,
    FlaskConical,
    Code,
    Database,
    Brain,
    Sparkles,
    Laptop,
    Shield,
    Layers,
    Award,
    GraduationCap,
    LucideIcon
} from "lucide-react";

export interface InternshipIconOption {
    id: string;
    label: string;
    icon: LucideIcon;
}

export const INTERNSHIP_ICON_OPTIONS: InternshipIconOption[] = [
    { id: "Cpu", label: "AI & ML", icon: Cpu },
    { id: "Globe", label: "Full Stack / Web", icon: Globe },
    { id: "TrendingUp", label: "Data & Analytics", icon: TrendingUp },
    { id: "Target", label: "Product & Strategy", icon: Target },
    { id: "Palette", label: "UI/UX & Design", icon: Palette },
    { id: "Megaphone", label: "Marketing & Social", icon: Megaphone },
    { id: "BookOpenCheck", label: "Teaching & Content", icon: BookOpenCheck },
    { id: "Smartphone", label: "Mobile Development", icon: Smartphone },
    { id: "FlaskConical", label: "Testing & QA", icon: FlaskConical },
    { id: "Code", label: "Software Engineering", icon: Code },
    { id: "Database", label: "Cloud & DevOps", icon: Database },
    { id: "Brain", label: "Deep Learning & AI", icon: Brain },
    { id: "Sparkles", label: "Innovation", icon: Sparkles },
    { id: "Laptop", label: "IT & Systems", icon: Laptop },
    { id: "Shield", label: "Cybersecurity", icon: Shield },
    { id: "Layers", label: "Architecture", icon: Layers },
    { id: "GraduationCap", label: "Academic / Research", icon: GraduationCap },
    { id: "Award", label: "General Internship", icon: Award },
];

export const INTERNSHIP_ICON_MAP: Record<string, LucideIcon> = INTERNSHIP_ICON_OPTIONS.reduce(
    (acc, cur) => {
        acc[cur.id] = cur.icon;
        return acc;
    },
    {} as Record<string, LucideIcon>
);

export const getInternshipIcon = (iconName?: string): LucideIcon => {
    if (!iconName) return Cpu;
    return INTERNSHIP_ICON_MAP[iconName] || Cpu;
};
