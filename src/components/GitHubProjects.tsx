"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "./Language";
import ProjectCard from "./ProjectCard";

interface GitHubProject {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
}

const username = "Maroikii"
const selectedProjects = ["portfolio-next", "frog-game"]

export default function GitHubProjects() {
    const { t } = useLanguage();
    const [projects, setProjects] = useState<GitHubProject[]>([]);

    useEffect(() => {
        async function fetchProjects() {
            try {
                const data = await Promise.all(
                    selectedProjects.map(async (repo) => {
                        const response = await fetch(`https://api.github.com/repos/${username}/${repo}`);
                        if (!response.ok) {
                            // Legge til Langauge
                            throw new Error(`Failed to fetch project: ${repo}`); 
                        }
                        return (await response.json()) as GitHubProject;
                    })
                )
                setProjects(data); }catch (error) {
                    console.error("Failed to fetch GitHub projects:", error); //Langauge
            }
        }
        fetchProjects();
    }, []);
    return (
        <section className="my-12 items-center text-center flex flex-col">
            <div className="flex flex-row flex-wrap gap-6 max-w-4xl">
                {projects.map((project) => (
                    <ProjectCard
                        key={project.id}
                        name={project.name}
                        description={project.description}
                        url={project.html_url}
                    />
                ))}
            </div>
        </section>
    )
}
