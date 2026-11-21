import CharacterGallery from "@/components/CharacterGallery";
import { fetchCharacterGalleries } from "@/lib/fetchCharacterGalleries";

const descriptions = {
  Kiyomi: "",
  Kikou: "",
  Zeiko: "",
  Kirin: "",
  Rioko: "",
  Zophiel: "",
};

export default async function CharacterPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const folderData = await fetchCharacterGalleries(descriptions);
  const selectedCharacter =
    folderData.find((folder) => folder.name.toLowerCase() === slug.toLowerCase())?.name ??
    folderData[0]?.name ??
    "";

  return <CharacterGallery folderData={folderData} initialCharacter={selectedCharacter} />;
}