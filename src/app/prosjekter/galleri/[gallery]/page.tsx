/*
 * ============================================================================
 *  SHOWROOM: ETT GALLERI  (/prosjekter/galleri/[gallery])
 * ============================================================================
 *
 *  Mappenavnet [gallery] med klammeparenteser er en "dynamisk rute".
 *  Det betyr at samme fil brukes for alle disse adressene:
 *
 *    /gallery/showroom/BadeAnd   ->  params.gallery = "BadeAnd"
 *    /gallery/showroom/MikkeRev  ->  params.gallery = "MikkeRev"
 *
 *  I denne versjonen av Next.js er params et Promise, så vi må bruke await.
 *
 *  PRØV SELV: Skriv inn et galleri som ikke finnes i adressefeltet.
 *  Hva skjer? (Tips: se på notFound() under.)
 * ============================================================================
 */

import { notFound } from "next/navigation";
import { descriptions, getFolderBySlug, getImages } from "../showroomet/deviantart";


// Adressen er "URL-kodet" (mellomrom blir %20 osv.), så vi dekoder den først.
// VALGFRITT: decodeURIComponent() trengs bare hvis et galleri har mellomrom
// eller æøå i navnet. For våre gallerier ville `const { gallery } = await params`
// vært nok.
async function getSlug(params: Promise<{ gallery: string }>) {
    const { gallery } = await params;
    return decodeURIComponent(gallery);
}

// Setter fanetittelen i nettleseren til galleri-navnet.
// VALGFRITT: Denne funksjonen kan slettes helt. Siden fungerer likt, fanen
// viser bare en standardtittel i stedet for navnet på galleriet.
export async function generateMetadata(
    props: PageProps<"/prosjekter/galleri/[gallery]">,
) {
    return { title: await getSlug(props.params) };
}

export default async function ShowroomGalleryPage(
    props: PageProps<"/prosjekter/galleri/[gallery]">,
) {
    const folder = await getFolderBySlug(await getSlug(props.params));

    // Finnes ikke galleriet? Vis 404-siden.
    if (!folder) notFound();

    const images = await getImages(folder.folderid);

    return (
        <div>
            <header className='mb-8'>
                <h1 className='mb-2 text-3xl font-bold'>{folder.name}</h1>
                <p className='max-w-2xl text-muted'>
                    {descriptions[folder.name]}
                </p>
                <p className='mt-2 text-sm text-muted'>
                    {images.length} bilder
                </p>
            </header>

            {/*
             * Hvert bilde er en lenke som åpner bildet på DeviantArt.
             * target="_blank" åpner lenken i en ny fane.
             */}
            <div className='grid gap-4 sm:grid-cols-2 xl:grid-cols-3'>
                {images.map((img) => (
                    <a
                        key={img.deviationid}
                        href={img.url}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='group overflow-hidden rounded-xl border border-border bg-surface shadow-sm transition hover:shadow-md'
                    >
                        <div className='aspect-square overflow-hidden'>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={img.content?.src}
                                alt={img.title}
                                loading='lazy'
                                className='h-full w-full object-cover transition duration-500 group-hover:scale-105'
                            />
                        </div>
                        <p className='truncate px-4 py-3 text-sm'>
                            {img.title}
                        </p>
                    </a>
                ))}
            </div>
        </div>
    );
}
