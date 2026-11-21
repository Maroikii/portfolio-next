"use client";

import Link from "next/link";

type Props = {
  characters: string[];
  selectedCharacter: string;
};

export default function CharacterNavbar({ characters, selectedCharacter }: Props) {
  return (
    <nav className="flex flex-wrap gap-2">
      {characters.map((character) => {
        const slug = character.toLowerCase();
        const isSelected = character === selectedCharacter;

        return (
          <Link
            key={character}
            href={`/prosjekter/galleri/${slug}`}
            className={isSelected ? "font-bold underline text-primary" : "text-text hover:text-primary"}
          >
            {character}
          </Link>
        );
      })}
    </nav>
  );
}