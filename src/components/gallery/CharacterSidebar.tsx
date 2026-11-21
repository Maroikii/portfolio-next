"use client";

import Link from "next/link";
import { Character, CHARACTERS } from "@/lib/characters";

interface CharacterSidebarProps {
  selectedCharacter: Character;
  isOpen: boolean;
  onToggle: () => void;
}

export default function CharacterSidebar({
  selectedCharacter,
  isOpen,
  onToggle,
}: CharacterSidebarProps) {
  return (
    <>
      {/* Burger menu button (mobile only) */}
      <button
        onClick={onToggle}
        className="fixed top-24 left-4 lg:hidden z-50 p-2 rounded bg-primary/20 hover:bg-primary/40"
      >
        ☰
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed mt-20 lg:mt-10 lg:static rounded top-0 left-0 w-52 max-w-xs
          bg-secondary/70 backdrop-blur-md text-primary border border-primary/10
          h-screen overflow-y-auto transition-transform duration-300 z-40 lg:z-0
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        <nav className="p-4 space-y-2">
          {/* Gallery Home */}
          <Link
            href="/prosjekter/galleri"
            onClick={() => {
              if (window.innerWidth < 1024) onToggle(); // Close on mobile
            }}
            className="block px-4 py-2 rounded text-left hover:bg-primary/20 transition-colors"
          >
            ← Gallery Home
          </Link>

          <hr className="border-primary/20 my-4" />

          {/* Character list */}
          {CHARACTERS.map((character) => (
            <Link
              key={character.id}
              href={`/prosjekter/galleri?character=${character.name}`}
              onClick={() => {
                if (window.innerWidth < 1024) onToggle(); // Close on mobile
              }}
              className={`block px-4 py-2 rounded text-left transition-colors ${
                selectedCharacter.id === character.id
                  ? "bg-primary/50 font-bold text-text"
                  : "hover:bg-primary/20"
              }`}
            >
              {character.name}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}