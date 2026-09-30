"use client";

import { useLanguage } from "../../components/Language";

export default function ContactPage() {
  const { t } = useLanguage();

  return (
    <main className="bg-background px-6 text-text">
      <header className="pb-4">
        <h1 className="text-2xl font-bold text-primary lg:text-6xl xl:text-8xl xl:text-red-900">
          {t("contactTitle")}
        </h1>
        <p className="mt-4 max-w-2xl text-lg">{t("contactText")}</p>
      </header>
    </main>
  );
}