export interface ProjectsData {
    id: string;
    title: { ko: string; en: string };
    preview: { ko: string; en: string };
    count: { ko: string; en: string };
    period: { ko: string; en: string };
    description: { ko: string; en: string };
    myRole: { ko: string; en: string };
    techStack: string[];
    img?: string;
    imgDescription?: { ko: string; en: string };
    screenshots: string[];
    demo?: string;
    github?: string;
};