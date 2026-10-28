"use client";

import { useLanguage } from "../../components/Language";

export default function ContactPage() {
  const { t } = useLanguage();

  return (
    <main className="bg-background px-6 text-text">
      <header className="pb-4">
        <h1 className="text-2xl font-bold text-primary lg:text-6xl lg:text-dark xl:text-8xl">
          {t("contactTitle")}
        </h1>
        <p className="mt-4 max-w-2xl text-lg">{t("contactText")}</p>
        <p className="mt-2">{t("email")}</p>
        <p className="mt-2">{t("instagram")}</p>
      </header>
    </main>
  );
}