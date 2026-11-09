const API = "https://www.deviantart.com/api/v1/oauth2";
const USERNAME = "maroikii";

const descriptions: Record<string, string> = {
    Kiyomi: "",
    Kikou: "",
    Zeiko: ""
}

type Folder = { folderid: string; name:string };
type Deviation = {
    deviationid: string;
    title: string;
    content?: { src: string; };
}

async function getToken() {
    const res = await fetch("https://www.deviantart.com/oauth2/token", {
        method: "POST",
        body: new URLSearchParams({
            grant_type: "client_credentials",
            client_id: process.env.DEVIANTART_CLIENT_ID!,
            client_secret: process.env.DEVIANTART_CLIENT_SECRET!,
        }),
        cache: "no-store"
    });
    const data = await res.json();
    return data.access_token as string;
}

async function getJson(path: string, token: string) {
    const res = await fetch(`${API}${path}`, {
        headers: { Authorization: `Bearer ${token}`},
        next: {revalidate: 3600}
    });
    return res.json();
}


export default async function GalleryPage() {
    const token = await getToken();
    const folderData = await getJson(
        `/gallery/folders?username=${USERNAME}&limit=50`, token
    );
    const folders: Folder[] = folderData.results.filter(
        (folder: Folder) => folder.name in descriptions,
    )

    return (
        <main className="mb-5 px-2 sm:px-5 md:mx-auto md:max-w-6xl">
            <h1></h1>
            
            {folders.map(async (folder) => {
                const data = await getJson(
                    `/gallery/${folder.folderid}?username=${USERNAME}&limit=24`,
                    token,
                );
                const images: Deviation[] = data.results.filter(
                    (img: Deviation) => img.content?.src,
                );
                return (
                    <section className="my-5 rounded-2xl bg-secondary px-3 pb-5 shadow-md sm:px-5 md:px-5" key={folder.folderid}>
                        <h2 className="my-5 pt-6 text-center text-2xl font-bold">{folder.name}</h2>
                        <p>{descriptions[folder.name]}</p>
                        <div className="grid gap-3 sm:grid-cols-1 md:grid-cols-2 md:gap-5 lg:grid-cols-3">
                            {images.map((img) => (
                                <img 
                                    key={img.deviationid} 
                                    src={img.content?.src} 
                                    alt={img.title}
                                    className="aspect-[4/3] w-full rounded-lg object-contain"
                                />
                            ))}
                        </div>
                    </section>
                );
            })}
        </main>
    )
}
