
import { useLanguage } from "@/components/Language";

interface ProjectCardProps {
    name: string;
    description: string | null;
    url: string;
}

export default function ProjectCard({ name, description, url }: ProjectCardProps) {
    const { t } = useLanguage();
    return (
        <article className="rounded-xl border bg-secondary border-primary p-6 shadow-md transition-shadow hover:shadow-2xl">
            <h3>{name}</h3>
            <p>{description || "No description available"}</p> 
            <a href={url} target="_blank" rel="noopener noreferrer">{t("viewOnGitHub")}</a> 
        </article>
    )
}