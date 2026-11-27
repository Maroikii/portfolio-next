"use client";
 
import React from 'react';
import { useLanguage } from "@/components/Language";
import GitHubProjects from "@/components/GitHubProjects";

export default function Galleri() {
  const { t } = useLanguage();
  return (
    <main className="flex flex-col items-center">        
    <h2 className="text-2xl font-semibold text-primary text-center mt-6">{t("codeProjects")}</h2>
    {["kode-prosjekter"].map(category => (
      <section key={category}>
        <div className="">
          <GitHubProjects />
        </div>
      </section>
    ))}
    </main>
  )
}