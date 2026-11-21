"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/components/Language";
import { images } from "@/assets/images";

export default function GalleryPage() {
  const { t } = useLanguage();

  const characters = [
    { id: "kiyomi", name: "Kiyomi", image: images.transparentKiyomi, description: t("shortCharacterDescriptionKiyomi") },
    { id: "zeiko", name: "Zeiko", image: images.transparentZeiko, description: t("shortCharacterDescriptionZeiko") },
    { id: "kikou", name: "Kikou", image: images.transparentKikou, description: t("shortCharacterDescriptionKikou") },
    { id: "rioko", name: "Rioko", image: images.transparentRioko, description: t("shortCharacterDescriptionRioko") },
    { id: "kirin", name: "Kirin", image: images.transparentKirin, description: t("shortCharacterDescriptionKirin") },
    { id: "zophiel", name: "Zophiel", image: images.transparentZophiel, description: t("shortCharacterDescriptionZophiel") },
  ];

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col items-center px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-10 max-w-3xl text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary/80">{t("Characters")}</p>
        <h1 className="text-4xl font-black tracking-tight text-text sm:text-5xl">{t("introTitle")}</h1>
        <p className="mt-4 text-base text-slate-300 sm:text-lg">{t("introDescription")}</p>
      </div>

      <div className="mb-8 flex justify-center">
        <Link
          href={`/prosjekter/galleri/${characters[0].id}`}
          className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-primary/90"
        >
          {t("goToCharacterGallery")}
        </Link>
      </div>

      <div className="w-full">
        <h2 className="mb-6 text-2xl font-bold text-text">{t("CharacterList")}</h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {characters.map((character) => (
            <div
              key={character.id}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-secondary/60 shadow-lg shadow-black/10 transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="relative overflow-hidden">
                <Image
                  src={character.image}
                  alt={character.name}
                  className="h-[28rem] w-full object-cover object-bottom transition-transform duration-500 ease-out group-hover:scale-105"
                  style={{ transformOrigin: "bottom center" }}
                />
              </div>

              <div className="space-y-3 p-4">
                <div>
                  <h3 className="text-2xl font-bold text-text">{character.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">{character.description}</p>
                </div>

                <Link
                  href={`/prosjekter/galleri/${character.id}`}
                  className="inline-flex w-full items-center justify-center rounded-xl bg-text px-4 py-2.5 font-medium text-white transition-colors hover:bg-primary"
                >
                  {t("viewGallery")}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}