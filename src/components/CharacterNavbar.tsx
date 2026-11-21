"use client";

import Link from "next/link";
import { useRef, useState } from "react";

type Props = {
  characters: string[];
  selectedCharacter: string;
};

export default function CharacterNavbar({ characters, selectedCharacter }: Props) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  return (
    <>
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
        <h2 className="text-xl font-bold mb-4 mt-4 lg:mt-2 ml-4">Characters</h2>
        <nav className="space-y-0">
          {characters.map((character) => {
            const slug = character.toLowerCase();
            const isSelected = character === selectedCharacter;

            return (
              <Link
                key={character}
                href={`/prosjekter/galleri/${slug}`}
                className={`block w-full px-4 py-2 text-left transition-colors cursor-pointer ${
                  isSelected
                    ? "bg-primary/50 text-text font-bold"
                    : "hover:bg-primary/20 hover:text-primary"
                }`}
              >
                {character}
              </Link>
            );
          })}
        </nav>
      </aside>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-30 lg:hidden backdrop-blur-[1px]"
          onClick={() => setIsSidebarOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}