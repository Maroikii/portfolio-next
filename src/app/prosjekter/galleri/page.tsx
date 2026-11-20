"use client";

import Link from "next/link";
import { useLanguage } from "@/components/Language";
import { useImages } from "@/assets/images";
import { imageConfigDefault } from "next/dist/shared/lib/image-config";
import Image from "next/image";

export default function GalleryPage() {
  const { t } = useLanguage();

  const characters = [
    { id: "kiyomi", name: "Kiyomi", image: useImages.transparentKiyomi, description: t("shortCharacterDescriptionKiyomi") },
    { id: "zeiko", name: "Zeiko", image: useImages.transparentZeiko, description: t("shortCharacterDescriptionZeiko") },
    { id: "kikou", name: "Kikou", image: useImages.transparentKikou, description: t("shortCharacterDescriptionKikou") },
    { id: "rioko", name: "Rioko", image: useImages.transparentRioko, description: t("shortCharacterDescriptionRioko") },
    { id: "kirin", name: "Kirin", image: useImages.transparentKirin, description: t("shortCharacterDescriptionKirin") },
    { id: "zophiel", name: "Zophiel", image: useImages.transparentZophiel, description: t("shortCharacterDescriptionZophiel") }

  ];

 return (
    <div className="p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4">{t("introTitle")}</h1>
      <p className="mb-4">{t("introDescription")}</p>

      <div className="mt-4">
        <Link href="/prosjekter/showroom">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-all">
            {t("goToShowroom")}
          </button>
        </Link>
      </div>

      <h2 className="mt-10 text-2xl font-bold mb-6">{t("CharacterList")}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl m-6">
        {characters.map((character) => (
        <div key={character.id} className="group overflow-hidden rounded-lg">
          <div className="relative z-10 overflow-hidden">
            <Image
              src={character.image}
              alt={character.name}
              className="
                w-full h-130 object-cover object-bottom bg-primary
                transition-all duration-300 ease-in-out
                group-hover:scale-105
                group-hover:drop-shadow-[0_18px_18px_rgba(0,0,0,0.35)]
              "
              style={{ transformOrigin: "bottom center" }}
            />
          </div>

          <div className="relative z-0 bg-secondary p-4">
            <h3 className="text-xl font-bold mb-2">{character.name}</h3>
            <p className="text-gray-600 text-sm mb-4">{character.description}</p>

            <Link href={`/prosjekter/gallery/${character.id}`}>
              <button className="w-full bg-text text-white px-4 py-2 rounded hover:bg-blue-600 transition-all">
                {t("viewGallery")}
                
              </button>
            </Link>
          </div>
        </div>  
      ))}
    </div>    
  </div>
  );
}