/*
 * ============================================================================
 *  SHOWROOM: LAYOUT MED NAVBAR  (/gallery/showroom/...)
 * ============================================================================
 *
 *  En layout.tsx "pakker inn" alle sidene i samme mappe og undermapper.
 *  Navbaren til venstre blir derfor stående mens du bytter galleri, og bare
 *  innholdet til høyre ({children}) byttes ut.
 *
 *  Galleri-titlene hentes fra API-et via getFolders(). Legger du til et nytt
 *  galleri i descriptions (deviantart.ts), dukker det automatisk opp her.
 * ============================================================================
 */

import Link from "next/link";
import { getFolders } from "./showroomet/deviantart";
import { NavLink } from "./nav-link";


export default async function ShowroomLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const folders = await getFolders();

    return (
        <div className='mx-auto flex max-w-7xl flex-col gap-8 px-4 py-10 md:flex-row'>
            {/*
             * Navbaren. På mobil ligger den øverst, fra md-skjermer og
             * oppover ligger den til venstre og blir "sticky" når du scroller.
             */}
            <aside className='md:w-56 md:shrink-0'>
                <nav className='md:sticky md:top-10'>
                    <Link
                        href='/prosjekter/galleri'
                        className='mb-6 inline-block text-sm text-muted hover:text-primary'
                    >
                        ← Alle gallerier
                    </Link>

                    <h2 className='mb-3 text-xs font-semibold uppercase tracking-widest text-muted'>
                        Gallerier
                    </h2>

                    {/*
                     * VALGFRITT: encodeURIComponent() gjør navnet trygt i en
                     * adresse (mellomrom, æøå). For våre gallerier ville
                     * `/gallery/showroom/${folder.name}` fungert like bra.
                     */}
                    <ul className='flex gap-2 overflow-x-auto md:flex-col md:gap-1'>
                        {folders.map((folder) => (
                            <li key={folder.folderid}>
                                <NavLink
                                    href={`/prosjekter/galleri/${encodeURIComponent(folder.name)}`}
                                >
                                    {folder.name}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>

            <section className='min-w-0 flex-1'>{children}</section>
        </div>
    );
}
