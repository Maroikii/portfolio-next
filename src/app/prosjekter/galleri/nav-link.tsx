/*
 *  En lenke i navbaren som markeres når du står på den siden.
 *
 *  "use client" betyr at denne komponenten kjører i nettleseren. Det må den,
 *  fordi usePathname() leser adressen brukeren står på akkurat nå.
 *  Resten av showroom er Server Components, bare denne lille biten er client.
 *
 *  VALGFRITT: Denne filen trengs ikke for at navbaren skal virke. Den gjør
 *  bare at galleriet du står på blir markert. Du kan bruke en vanlig <Link>
 *  i layout.tsx i stedet.
 */
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavLink({
    href,
    children,
}: {
    href: string;
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const isActive = pathname === href;

    return (
        <Link
            href={href}
            aria-current={isActive ? "page" : undefined}
            className={`block whitespace-nowrap rounded-lg px-3 py-2 text-sm transition ${
                isActive
                    ? "bg-primary-soft font-medium text-primary"
                    : "text-text hover:bg-surface"
            }`}
        >
            {children}
        </Link>
    );
}
