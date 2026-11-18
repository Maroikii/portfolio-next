"use client";

import { useLanguage } from "@/components/Language";

export default function GalleryIntro() {
  const { t } = useLanguage();

  return (
    <div className="mb-4 flex justify-center">
      <h1 className="w-200 max-w-2xl text-center text-xl">{t("galleryDescription")}</h1>
    </div>
  );
}