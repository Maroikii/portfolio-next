"use client";

import { useLanguage } from "./Language";

export default function Footer() {
  const { t } = useLanguage();

  return <div className="bg-background px-6 py-4 text-text">{t("footer")}</div>;
}
