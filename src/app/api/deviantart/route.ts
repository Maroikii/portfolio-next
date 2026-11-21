import { fetchCharacterGallery } from "@/lib/deviantart";

const descriptions: Record<string, string> = {
  Kiyomi: "",
  Kikou: "",
  Zeiko: "",
  Kirin: "",
  Rioko: "",
  Zophiel: "",
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const folderName = searchParams.get("folder");

  if (!folderName) {
    return Response.json({ error: "Missing folder parameter" }, { status: 400 });
  }

  try {
    const gallery = await fetchCharacterGallery(folderName, descriptions);

    if (!gallery) {
      return Response.json(
        { error: "Character not found" },
        { status: 404 },
      );
    }

    return Response.json(gallery.images);
  } catch (error) {
    console.error(`Failed to fetch gallery for ${folderName}:`, error);
    return Response.json(
      { error: "Failed to fetch gallery" },
      { status: 500 },
    );
  }
}
