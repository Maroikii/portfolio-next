"use client";

import Link from "next/link";
import { useLanguage } from "@/components/Language";
import { CHARACTERS } from "@/lib/characters";

export default function GalleryLanding() {
  const { t } = useLanguage();

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-4">{t("Characters")}</h1>
      <p className="text-lg text-primary/70 mb-8">
        Click on a character to see their full gallery
      </p>

      {/* Grid of character cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CHARACTERS.map((character) => (
          <Link
            key={character.id}
            href={`/prosjekter/galleri?character=${character.name}`}
            className="group"
          >
            <div className="bg-secondary/50 rounded-lg overflow-hidden border border-primary/20 hover:border-primary/50 transition-all duration-300 hover:shadow-lg cursor-pointer">
              {character.preview && (
                <img
                  src={character.preview}
                  alt={character.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              )}
              <div className="p-4">
                <h2 className="text-xl font-bold text-text">{character.name}</h2>
                <p className="text-sm text-primary/70 mt-2">
                  {character.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}