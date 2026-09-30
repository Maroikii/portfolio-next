"use client";

import { useLanguage } from "../../components/Language";

export default function EplePage() {
  const { t } = useLanguage();

  return (
    <div className="bg-blue-500 p-6 text-white">
      <h1>{t("epleTitle")}</h1>
      <p>{t("epleText")}</p>
    </div>
  );
}