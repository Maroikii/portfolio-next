/*
 * ============================================================================
 *  DEVIANTART-API: felles kode for galleriet
 * ============================================================================
 *
 *  All kode som snakker med DeviantArt ligger i denne filen. Både
 *  landingssiden (/gallery) og showroom (/gallery/showroom/...) importerer
 *  funksjonene herfra, så vi slipper å skrive den samme koden flere ganger.
 *
 *  Slik henger det sammen:
 *
 *    1. Vi bytter app-nøklene våre mot en "access token" (en midlertidig nøkkel)
 *    2. Vi spør API-et: "Hvilke gallerier har brukeren?"
 *    3. For hvert galleri spør vi: "Hvilke bilder ligger i dette galleriet?"
 *
 *  FØR DU STARTER:
 *    - Registrer en app på https://www.deviantart.com/developers/
 *    - Legg nøklene i filen .env.local i rotmappen til prosjektet:
 *
 *        DEVIANTART_CLIENT_ID=12345
 *        DEVIANTART_CLIENT_SECRET=abcdef...
 *
 *    - Start dev-serveren på nytt (npm run dev) etter at du har endret .env.local
 *
 *  .env.local skal ALDRI deles eller lastes opp til GitHub. Secret-en er som
 *  et passord for appen din.
 * ============================================================================
 */

// Denne filen bruker secret-en vår, og skal derfor bare importeres fra
// Server Components (filer UTEN "use client" øverst).
import { cache } from "react";


// Grunnadressen til API-et. Alle kall vi gjør starter med denne.
const API = "https://www.deviantart.com/api/v1/oauth2";

// Brukeren vi henter gallerier fra.
// PRØV SELV: Bytt til et annet DeviantArt-brukernavn og se hva som skjer.
// (Husk å oppdatere descriptions under, ellers vises ingen gallerier.)
const USERNAME = "maroikii";

/*
 * ----------------------------------------------------------------------------
 *  Våre egne beskrivelser
 * ----------------------------------------------------------------------------
 *  Nøkkelen er galleri-navnet, verdien er beskrivelsen.
 *
 *  Lista fungerer også som et filter: KUN gallerier som står her blir vist,
 *  både på landingssiden og i navbaren i showroom.
 *  Navnet må stå nøyaktig som på DeviantArt, med store og små bokstaver.
 *
 *  PRØV SELV: Fjern linjen med Harepus. Hva skjer med navbaren?
 */
export const descriptions: Record<string, string> = {
    Kiyomi: "",
    Kikou: "",
    Kirin: "",
    Zeiko: "",
    Zophiel: "",
    Rioko: ""
};

/*
 * ----------------------------------------------------------------------------
 *  Typer: Hvordan ser svaret fra API-et ut?
 * ----------------------------------------------------------------------------
 *  Vi beskriver bare feltene vi faktisk bruker.
 *
 *  "export" betyr at andre filer kan importere typene.
 *  Spørsmålstegnet i "content?" betyr at feltet kan mangle (f.eks. tekst-innlegg).
 */
export type Folder = { folderid: string; name: string };
export type Deviation = {
    deviationid: string;
    title: string;
    url: string;
    content?: { src: string; width: number; height: number };
};

/*
 * ----------------------------------------------------------------------------
 *  Hent en access token
 * ----------------------------------------------------------------------------
 *  Vi bytter client id + secret mot en midlertidig nøkkel ("client credentials").
 *
 *  cache() fra React: Både layouten (navbaren) og siden trenger data i samme
 *  sidevisning. cache() sørger for at funksjonen bare kjøres ÉN gang per
 *  sidevisning, selv om flere komponenter kaller den.
 *
 *  VALGFRITT: cache() trengs ikke for at siden skal fungere. Uten den
 *  virker alt likt, vi gjør bare noen flere kall mot DeviantArt.
 *  (Samme gjelder cache() rundt getFolders og getImages lenger ned.)
 */
const getToken = cache(async () => {
    const res = await fetch("https://www.deviantart.com/oauth2/token", {
        method: "POST",
        body: new URLSearchParams({
            grant_type: "client_credentials",
            client_id: process.env.DEVIANTART_CLIENT_ID!,
            client_secret: process.env.DEVIANTART_CLIENT_SECRET!,
        }),
        cache: "no-store",
    });

    const data = await res.json();

    if (!res.ok || !data.access_token) {
        throw new Error(
            `Fikk ikke access token fra DeviantArt: ${JSON.stringify(data)}`,
        );
    }

    return data.access_token as string;
});

/*
 * ----------------------------------------------------------------------------
 *  Hjelpefunksjon for å hente data fra API-et
 * ----------------------------------------------------------------------------
 *  - Authorization-header   Her viser vi frem tokenet vårt ("Bearer").
 *  - revalidate: 3600       Next.js husker svaret i 1 time.
 */
async function getJson(path: string) {
    const token = await getToken();
    const res = await fetch(`${API}${path}`, {
        headers: { Authorization: `Bearer ${token}` },
        next: { revalidate: 3600 },
    });
    const data = await res.json();

    if (!res.ok) {
        throw new Error(
            `DeviantArt API-feil på ${path}: ${JSON.stringify(data)}`,
        );
    }

    return data;
}

/*
 * ----------------------------------------------------------------------------
 *  Endepunkt 1: Hvilke gallerier har brukeren?
 * ----------------------------------------------------------------------------
 *  Returnerer bare galleriene som står i descriptions-lista.
 *  Brukes av navbaren i showroom og av landingssiden.
 */
export const getFolders = cache(async (): Promise<Folder[]> => {
    const data = await getJson(
        `/gallery/folders?username=${USERNAME}&limit=50`,
    );
    return data.results.filter(
        (folder: Folder) => folder.name in descriptions,
    );
});

/*
 * ----------------------------------------------------------------------------
 *  Endepunkt 2: Hvilke bilder ligger i et galleri?
 * ----------------------------------------------------------------------------
 *  folderid er galleriets unike id (en lang kode, ikke navnet).
 *  limit=24 er maks antall bilder per kall for dette endepunktet.
 */
export const getImages = cache(async (folderid: string): Promise<Deviation[]> => {
    const data = await getJson(
        `/gallery/${folderid}?username=${USERNAME}&limit=24`,
    );
    // Hopp over innlegg uten bilde (f.eks. tekst-innlegg)
    return data.results.filter((img: Deviation) => img.content?.src);
});

/*
 * ----------------------------------------------------------------------------
 *  Finn ett galleri ut fra navnet i adressen
 * ----------------------------------------------------------------------------
 *  /gallery/showroom/BadeAnd  ->  slug = "BadeAnd"
 *  Returnerer undefined hvis galleriet ikke finnes.
 */
export async function getFolderBySlug(slug: string) {
    const folders = await getFolders();
    const lower = slug.toLowerCase();
    return folders.find((folder) => folder.name.toLowerCase() === lower);
}
