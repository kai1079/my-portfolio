export interface Skill {
    name: string;
    level: number; // 0-100
    color?: string;
    category: string;
}

export interface SkillCategory {
    name: string;
    icon: React.ReactNode;
    color: string;
}

export interface SkillsRadarProps {
    skills: Skill[];
}
