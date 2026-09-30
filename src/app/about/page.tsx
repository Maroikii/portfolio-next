"use client";

import { useLanguage } from "../../components/Language";

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <main className="bg-background text-text">
      <div className="px-6 py-4">
        <h1 className="text-6xl font-bold text-primary">{t("aboutMe")}</h1>
        <p className="mt-4 max-w-2xl text-lg">{t("aboutMeText")}</p>
      </div>
    </main>
  );
}