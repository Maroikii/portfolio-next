"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/components/Language";

// Shape of a single image returned from the API.
interface CharacterImage {
  deviationid: string;
  title: string;
  content?: { src: string };
}

// One gallery folder = one character/collection, with its image list.
interface CharacterFolder {
  folderid: string;
  name: string;
  images: CharacterImage[];
}

interface CharacterGalleryProps {
  folderData?: CharacterFolder[];
}

export default function CharacterGallery({ folderData = [] }: CharacterGalleryProps) {
  // Guard against bad data so the component still works if the API response is empty or malformed.
  const safeFolderData = Array.isArray(folderData) ? folderData : [];

  // Tracks which character folder is currently selected in the sidebar.
  const [selectedCharacter, setSelectedCharacter] = useState(safeFolderData[0]?.name ?? "");

  // Mobile sidebar toggle: whether the left menu is open or hidden.
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Ref for detecting clicks outside the sidebar on mobile.
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Translation helper for labels like "Characters" and "No images available".
  const { t } = useLanguage();

  // Find the currently selected folder so we can show its images.
  const selectedFolderData = safeFolderData.find((folder) => folder.name === selectedCharacter);

  // If no character is selected yet, default to the first folder when the data arrives.
  useEffect(() => {
    if (!selectedCharacter && safeFolderData[0]) {
      setSelectedCharacter(safeFolderData[0].name);
    }
  }, [safeFolderData, selectedCharacter]);

  // Close the sidebar when the user clicks outside it.
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setIsSidebarOpen(false);
      }
    };

    if (isSidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen]);

  // When a user clicks a character in the sidebar, show that character's gallery.
  const handleCharacterSelect = (characterName: string) => {
    setSelectedCharacter(characterName);
    setIsSidebarOpen(false);
  };

  return (
    <div className="flex min-h-screen gap-4">
      {/* Mobile menu button: opens/closes the left sidebar on small screens. */}
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

      {/* Sidebar: left column listing all character folders. */}
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
                className={`w-full px-4 py-2 text-left transition-colors ${
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

      {/* Main content: shows the selected character gallery. */}
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

      {/* Overlay used only on mobile to close the sidebar when tapping outside. */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-30 md:hidden backdrop-blur-[1px]"
          onClick={() => setIsSidebarOpen(false)}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
