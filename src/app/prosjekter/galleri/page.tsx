"use client";
 
import React from 'react';
import { useLanguage } from "@/components/Language";
import { characters } from "@/assets/imageLoader";

export default function Galleri() {
  const { t } = useLanguage();
  return (
    <main>        
    <h2 className="text-2xl font-semibold text-primary text-center mt-6">{t("gallery")}</h2>
    {["character"].map(category => (
      <section key={category}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {characters.filter(image => image.category === category).map(image => (
            <img key={image.name} src={image.src} alt={image.alt} className="h-auto w-75 rounded-lg object-cover" />
          )) }
        </div>
      </section>
    ))}
    </main>
  )
}
// blal alakf afjsldfj