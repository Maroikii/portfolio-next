import CharacterGallery from "@/components/CharacterGallery";
import { fetchCharacterGalleries } from "@/lib/deviantart";

const descriptions: Record<string, string> = {
  Empty: "",
  Kiyomi: "",
  Kikou: "",
  Zeiko: "",
  Kirin: "",
  Rioko: "",
  Zophiel: "",
};

export default async function GalleryPage() {
  const folderData = await fetchCharacterGalleries(descriptions);

  return <CharacterGallery folderData={folderData} />;
}
