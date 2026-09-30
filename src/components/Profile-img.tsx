"use client";

import { useLanguage } from "./Language";

export default function Profileimg() {
  const { t } = useLanguage();

  return (
    <div>
      <h2>{t("greeting")}</h2>
      <p>{t("myName")}</p>
    </div>
  );
}
