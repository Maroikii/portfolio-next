const API = "https://www.deviantart.com/api/v1/oauth2";
const USERNAME = "maroikii";
const MAX_GALLERY_IMAGES = 12;

export type Folder = { folderid: string; name: string };
export type Deviation = {
  deviationid: string;
  title: string;
  content?: { src: string };
  thumb?: { src: string };
};

export type GalleryData = {
  folderid: string;
  name: string;
  images: Array<Deviation>;
};

async function getToken(): Promise<string> {
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

export async function fetchCharacterGalleries(
  descriptions: Record<string, string>,
): Promise<GalleryData[]> {
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
        `/gallery/${folder.folderid}?username=${USERNAME}&limit=${MAX_GALLERY_IMAGES}`,
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

  return folderData;
}

export async function fetchCharacterGallery(
  characterName: string,
  descriptions: Record<string, string>,
): Promise<GalleryData | null> {
  const token = await getToken();

  const folderResponse = await getJson<{ results?: Folder[] }>(
    `/gallery/folders?username=${USERNAME}&limit=50`,
    token,
  );

  const folders = (folderResponse.results ?? []).filter(
    (folder: Folder) => folder.name === characterName && folder.name in descriptions,
  );

  if (folders.length === 0) {
    return null;
  }

  const folder = folders[0];
  const data = await getJson<{ results?: Deviation[] }>(
    `/gallery/${folder.folderid}?username=${USERNAME}&limit=${MAX_GALLERY_IMAGES}`,
    token,
  );

  const images = (data.results ?? []).filter((img: Deviation) => Boolean(img.content?.src));

  return {
    folderid: folder.folderid,
    name: folder.name,
    images,
  };
}
