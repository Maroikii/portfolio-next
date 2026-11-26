"use client";

import { useLanguage } from "../../components/Language";

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <main className="bg-background px-6 py-4 text-text">
      <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
        <h1 className="text-6xl font-bold text-primary">{t("aboutMe")}</h1>
        <p className="mt-4 max-w-2xl text-lg">{t("aboutMeText")}</p>
        <p className="mt-4 max-w-2xl text-lg">{t("aboutMeAdditionalText")}</p>
      </div>
    </main>
  );
}