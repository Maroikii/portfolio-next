"use client";

import React from "react";
import { useLanguage } from "@/components/Language";
import GitHubProjects from "@/components/GitHubProjects";
import GameEmbed from "@/components/GameEmbed";

export default function Projects() {
  const { t } = useLanguage();
  const games = [{ title: "Frog Game", path: "/games/frog/index.html" }];

  return (
    <div className="projects-container items-center justify-center flex flex-col">
      <h1>{t("codeProjectsTitle")}</h1>

      <div className="github-projects-wrapper mb-8 justify-center flex">
        <GitHubProjects />
      </div>

      {games.map((game) => (
        <div key={game.path} className="game-wrapper mb-8 justify-center flex">
          <GameEmbed
            width={700}
            height={500}
            title={game.title}
            gamePath={game.path}
          />
        </div>
      ))}
    </div>
  );
}