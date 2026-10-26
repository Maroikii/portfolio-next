"use client";

import LanguageToggle, { useLanguage } from "./Language";

export default function Navbar() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-row items-center justify-between gap-5 bg-background px-6 py-4 text-text">
      <h1 className="font-semibold text-primary">
        <a href="/">{t("navTitle")}</a>
      </h1>

      <ul className="flex flex-row items-center gap-4">
        <li className="button"><a href="/">{t("home")}</a></li>
        <li className="button"><a href="/about">{t("about")}</a></li>
        <li className="button"><a href="/contact">{t("contact")}</a></li>
      </ul>

      <LanguageToggle />
    </div>
  );
}
