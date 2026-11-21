import CharacterGallery from "@/components/CharacterGallery";
import fetchCharacterGallery  from "@/lib/fetchCharacterGalleries";

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

  const folderData = await fetchCharacterGallery(slug, descriptions);

  return <CharacterGallery folderData={folderData ? [folderData] : []} />;
}