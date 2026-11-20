import { notFound } from "next/navigation";

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

export async function generateStaticParams() {
  const token = await getToken();

  const folderResponse = await getJson<{ results?: Folder[] }>(
    `/gallery/folders?username=${USERNAME}&limit=50`,
    token,
  );

  const folders = (folderResponse.results ?? []).filter(
    (folder: Folder) => folder.name in descriptions,
  );

  return folders.map((folder) => ({
    slug: folder.name.toLowerCase(),
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const characterName = Object.keys(descriptions).find(
    (key) => key.toLowerCase() === params.slug,
  );

  if (!characterName) {
    return { title: "Character not found" };
  }

  return {
    title: `${characterName} - Showroom`,
    description: descriptions[characterName] || `View ${characterName}'s gallery`,
  };
}

export default async function CharacterPage({ params }: { params: { slug: string } }) {
  const characterName = Object.keys(descriptions).find(
    (key) => key.toLowerCase() === params.slug,
  );

  if (!characterName) {
    notFound();
  }

  const token = await getToken();

  const folderResponse = await getJson<{ results?: Folder[] }>(
    `/gallery/folders?username=${USERNAME}&limit=50`,
    token,
  );

  const folders = (folderResponse.results ?? []).filter(
    (folder: Folder) => folder.name === characterName,
  );

  if (folders.length === 0) {
    notFound();
  }

  const folder = folders[0];
  const data = await getJson<{ results?: Deviation[] }>(
    `/gallery/${folder.folderid}?username=${USERNAME}&limit=24`,
    token,
  );

  const images = (data.results ?? []).filter((img: Deviation) => Boolean(img.content?.src));

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">{characterName}</h1>

        {descriptions[characterName] && (
          <p className="text-lg text-slate-400 mb-8 max-w-2xl">{descriptions[characterName]}</p>
        )}

        {images.length > 0 ? (
          <div className="flex flex-wrap gap-5 justify-start">
            {images.map((img) => (
              <img
                key={img.deviationid}
                src={img.content?.src}
                alt={img.title}
                className="max-h-96 w-auto rounded-lg object-contain"
              />
            ))}
          </div>
        ) : (
          <p className="text-slate-500">No images available for this character.</p>
        )}

        <div className="mt-12">
          <a
            href="/prosjekter/showroom"
            className="inline-block px-6 py-2 bg-primary/20 hover:bg-primary/40 text-primary rounded-lg transition-colors"
          >
            ← Back to Showroom
          </a>
        </div>
      </div>
    </div>
  );
}
