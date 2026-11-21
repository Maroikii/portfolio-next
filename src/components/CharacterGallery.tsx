"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/Language";

interface CharacterImage {
  deviationid: string;
  title: string;
  content?: { src: string };
}

interface CharacterFolder {
  folderid: string;
  name: string;
  images: CharacterImage[];
}

interface CharacterGalleryProps {
  folderData?: CharacterFolder[];
  initialCharacter?: string;
}

export default function CharacterGallery({
  folderData = [],
  initialCharacter,
}: CharacterGalleryProps) {
  const safeFolderData = Array.isArray(folderData) ? folderData : [];
  const [selectedCharacter, setSelectedCharacter] = useState(
    () => initialCharacter ?? safeFolderData[0]?.name ?? "",
  );
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    if (typeof window === "undefined") {
      return true;
    }

    return window.innerWidth >= 1024;
  });
  const sidebarRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { t } = useLanguage();

  const selectedFolderData = safeFolderData.find((folder) => folder.name === selectedCharacter);

  useEffect(() => {
    if (initialCharacter && initialCharacter !== selectedCharacter) {
      setSelectedCharacter(initialCharacter);
    }
  }, [initialCharacter]);

  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  }, [initialCharacter]);

  const handleCharacterSelect = (characterName: string) => {
    const targetSlug = characterName.toLowerCase();
    setSelectedCharacter(characterName);
    setIsSidebarOpen(false);
    router.push(`/prosjekter/galleri/${targetSlug}`);
  };

  return (
    <div className="flex min-h-screen gap-4">
      <button
        type="button"
        onClick={() => setIsSidebarOpen((current) => !current)}
        className={`fixed top-20 left-0 z-50 lg:hidden flex flex-col gap-1.5 bg-secondary p-3 rounded shadow-md transition-all duration-300 ease-out ${
          isSidebarOpen ? "translate-x-52" : "translate-x-0"
        }`}
        aria-label="Toggle character menu"
      >
        <span
          className={`block h-0.5 w-6 bg-white transition-transform duration-300 ${
            isSidebarOpen ? "translate-y-2 rotate-45" : "translate-y-0 rotate-0"
          }`}
          style={{ filter: "none" }}
        />
        <span
          className={`block h-0.5 w-6 bg-white transition-opacity duration-200 ${
            isSidebarOpen ? "opacity-0" : "opacity-100"
          }`}
          style={{ filter: "none" }}
        />
        <span
          className={`block h-0.5 w-6 bg-white transition-transform duration-300 ${
            isSidebarOpen ? "-translate-y-2 -rotate-45" : "translate-y-0 rotate-0"
          }`}
          style={{ filter: "none" }}
        />
      </button>

      <aside
        ref={sidebarRef}
        className={`fixed mt-20 lg:mt-10 lg:static rounded top-0 left-0 w-52 max-w-xs
          bg-secondary/70 backdrop-blur-md text-primary border border-primary/10
          h-screen overflow-y-auto transition-transform duration-300 z-50 lg:z-0
          lg:left-0 lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <h2 className="text-xl font-bold mb-4 mt-4 lg:mt-2 ml-4">{t("Characters")}</h2>
        <nav className="space-y-0">
          {safeFolderData.length === 0 ? (
            <p className="text-sm text-slate-500">{t("No images available")}</p>
          ) : (
            safeFolderData.map((folder) => (
              <button
                key={folder.folderid}
                type="button"
                onClick={() => handleCharacterSelect(folder.name)}
                className={`block w-full px-4 py-2 text-left transition-colors cursor-pointer ${
                  selectedCharacter === folder.name
                    ? "bg-primary/50 text-text font-bold"
                    : "hover:bg-primary/20 hover:text-primary"
                }`}
              >
                {folder.name}
              </button>
            ))
          )}
        </nav>
      </aside>

      <main className="flex-1 p-6 w-full lg:w-auto ml-2">
        <h1 className="text-3xl font-bold mb-6 justify-center flex">{selectedCharacter || t("Characters")}</h1>

        {selectedFolderData ? (
          <div className="flex flex-wrap justify-center gap-3 md:gap-5">
            {selectedFolderData.images.map((img) => (
              <img
                key={img.deviationid}
                src={img.content?.src}
                alt={img.title}
                className="max-h-96 w-auto rounded-lg object-contain"
              />
            ))}
          </div>
        ) : (
          <p className="text-slate-500">{t("No images available")}</p>
        )}
      </main>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-30 lg:hidden backdrop-blur-[1px]"
          onClick={() => setIsSidebarOpen(false)}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
