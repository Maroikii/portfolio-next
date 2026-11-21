"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/components/Language";
import { Character } from "@/lib/characters";
import CharacterSidebar from "./CharacterSidebar";

interface DeviantArtImage {
  deviationid: string;
  title: string;
  content?: { src: string };
}

interface CharacterShowroomProps {
  character: Character;
}

export default function CharacterShowroom({ character }: CharacterShowroomProps) {
  const [images, setImages] = useState<DeviantArtImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { t } = useLanguage();

  // Fetch DeviantArt data for THIS character
  useEffect(() => {
    const fetchCharacterImages = async () => {
      try {
        // Pass the folder name to your API
        const response = await fetch(
          `/api/deviantart?folder=${character.deviantartFolder}`
        );
        const data = await response.json();
        setImages(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error(`Failed to fetch ${character.name} images:`, error);
        setImages([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacterImages();
  }, [character.name, character.deviantartFolder]);

  if (loading) {
    return <div className="p-6">{t("Loading")}...</div>;
  }

  return (
    <div className="flex min-h-screen gap-4">
      {/* Sidebar - passes all characters for navigation */}
      <CharacterSidebar
        selectedCharacter={character}
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      {/* Main content */}
      <main className="flex-1 p-6">
        {/* Back to Gallery button */}
        <Link
          href="/prosjekter/galleri"
          className="inline-block mb-6 px-4 py-2 bg-primary/20 hover:bg-primary/40 rounded transition-colors"
        >
          ← {t("Back to Gallery")}
        </Link>

        <h1 className="text-3xl font-bold mb-6">{character.name}</h1>
        <p className="text-primary/70 mb-6">{character.description}</p>

        {images.length > 0 ? (
          <div className="flex flex-wrap justify-center gap-3 md:gap-5">
            {images.map((img) => (
              <img
                key={img.deviationid}
                src={img.content?.src}
                alt={img.title}
                className="max-h-96 w-auto rounded-lg object-contain hover:shadow-lg transition-shadow"
              />
            ))}
          </div>
        ) : (
          <p className="text-slate-500">{t("No images available")}</p>
        )}
      </main>
    </div>
  );
}