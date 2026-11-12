import CharacterGallery from "@/components/CharacterGallery";

const API = "https://www.deviantart.com/api/v1/oauth2";
const USERNAME = "maroikii";

const descriptions: Record<string, string> = {
  Kiyomi: "",
  Kikou: "",
  Zeiko: "",
  Kirin: "",
  Rioko: "",
  Zophiel: "",
};

type Folder = { folderid: string; name: string };
type Deviation = {
  deviationid: string;
  title: string;
  content?: { src: string };
};

type GalleryData = {
  folderid: string;
  name: string;
  images: Array<{ deviationid: string; title: string; content?: { src: string } }>;
};

async function getToken() {
  const res = await fetch("https://www.deviantart.com/oauth2/token", {
    method: "POST",
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: process.env.DEVIANTART_CLIENT_ID ?? "",
      client_secret: process.env.DEVIANTART_CLIENT_SECRET ?? "",
    }),
    cache: "no-store",
  });

  const data = await res.json();
  return data.access_token as string;
}

async function getJson<T>(path: string, token: string): Promise<T> {
  const res = await fetch(`${API}${path}`, {
    headers: { Authorization: `Bearer ${token}` },
    next: { revalidate: 3600 },
  });

  return res.json() as Promise<T>;
}

export default async function GalleryPage() {
  const token = await getToken();

  const folderResponse = await getJson<{ results?: Folder[] }>(
    `/gallery/folders?username=${USERNAME}&limit=50`,
    token,
  );

  const folders = (folderResponse.results ?? []).filter(
    (folder: Folder) => folder.name in descriptions,
  );

  const folderData: GalleryData[] = await Promise.all(
    folders.map(async (folder: Folder) => {
      const data = await getJson<{ results?: Deviation[] }>(
        `/gallery/${folder.folderid}?username=${USERNAME}&limit=24`,
        token,
      );

      const images = (data.results ?? []).filter((img: Deviation) => Boolean(img.content?.src));

      return {
        folderid: folder.folderid,
        name: folder.name,
        images,
      };
    }),
  );

  return <CharacterGallery folderData={folderData} />;
}
