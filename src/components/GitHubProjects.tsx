"use client";

import { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";

interface GitHubProject {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
}

const username = "Maroikii"
const selectedProjects = ["csharp-Pong", "frog-game", "cafe-rush", "portfolio-next"]

export default function GitHubProjects() {
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
}
