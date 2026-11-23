'use client';
import { images } from '@/assets/images';
import { useLanguage } from '@/components/Language';

export function useCharacters() {
  const { t } = useLanguage();

  return [
    { id: "kiyomi", name: "Kiyomi", image: images.transparentKiyomi, description: t("shortCharacterDescriptionKiyomi") },
    { id: "zeiko", name: "Zeiko", image: images.transparentZeiko, description: t("shortCharacterDescriptionZeiko") },
    { id: "kikou", name: "Kikou", image: images.transparentKikou, description: t("shortCharacterDescriptionKikou") },
    { id: "rioko", name: "Rioko", image: images.transparentRioko, description: t("shortCharacterDescriptionRioko") },
    { id: "kirin", name: "Kirin", image: images.transparentKirin, description: t("shortCharacterDescriptionKirin") },
    { id: "zophiel", name: "Zophiel", image: images.transparentZophiel, description: t("shortCharacterDescriptionZophiel") },
  ];
}

// Backwards-compatible alias (not a hook by name; prefer useCharacters in components).
export const getCharacters = useCharacters;