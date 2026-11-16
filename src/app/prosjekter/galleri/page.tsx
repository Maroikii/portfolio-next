"use client";

import Link from "next/link";
import { useLanguage } from "@/components/Language";

export default function GalleryPage() {
  const { t } = useLanguage();

  const characters = [
    { id: "kiyomi", name: "Kiyomi", image: "/images/kiyomi.jpg", description: t("shortCharacterDescriptionKiyomi") },
    { id: "zeiko", name: "Zeiko", image: "/images/zeiko.jpg", description: t("shortCharacterDescriptionZeiko") },
    { id: "kikou", name: "Kikou", image: "/images/kikou.jpg", description: t("shortCharacterDescriptionKikou") },
    { id: "rioko", name: "Rioko", image: "/images/rioko.jpg", description: t("shortCharacterDescriptionRioko") },
    { id: "kirin", name: "Kirin", image: "/images/kirin.jpg", description: t("shortCharacterDescriptionKirin") },
    { id: "zophiel", name: "Zophiel", image: "/images/zophiel.jpg", description: t("shortCharacterDescriptionZophiel") }

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

      {/* Character Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {characters.map((character) => (
          <div key={character.id} className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
            {/* Thumbnail */}
            <img 
              src={character.image} 
              alt={character.name}
              className="w-full h-64 object-cover"
            />
            
            {/* Character Info */}
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">{character.name}</h3>
              <p className="text-gray-600 text-sm mb-4">{character.description}</p>
              
              {/* Link to character gallery */}
              <Link href={`/prosjekter/gallery/${character.id}`}>
                <button className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-all">
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