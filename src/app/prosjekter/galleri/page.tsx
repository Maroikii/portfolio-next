"use client";

import { useSearchParams } from "next/navigation";
import GalleryLanding from "@/components/gallery/GalleryLanding";
import CharacterShowroom from "@/components/gallery/CharacterShowroom";
import { CHARACTERS } from "@/lib/characters";

const API = "https://www.deviantart.com/api/v1/oauth2";
const USERNAME = "maroikii";

export default function GalleryPage() {
  const searchParams = useSearchParams();
  const selectedCharacterName = searchParams.get("character");

  // Validate the character exists in your list
  const selectedCharacter = selectedCharacterName
    ? CHARACTERS.find(
        (c) => c.name.toLowerCase() === selectedCharacterName.toLowerCase()
      )
    : null;

  // No character selected → show landing page
  if (!selectedCharacter) {
    return <GalleryLanding />;
  }

  // Character selected → show their gallery
  return <CharacterShowroom character={selectedCharacter} />;
}