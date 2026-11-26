"use client";

import Image from "next/image";
import Link from "next/link";
import Profileimg from "../components/Profile-img";
import { useLanguage } from "../components/Language";
import { useCharacters } from "../lib/characters";

export default function Page() {
  const { t } = useLanguage();
  // const characters = useCharacters();

  return (
    <main className="bg-background text-text">
      <header className="pb-4 items-center flex flex-col">
        <h1 className="text-2xl text-primary lg:text-6xl xl:text-8xl">{t("welcomeTitle")}</h1>
        <p className="mt-4 max-w-2xl text-lg">{t("welcomeText")}</p>
      </header>

    <main className="pb-6">
      <Link href="/prosjekter/galleri" className="mt-20 text-3xl font-semibold text-primary items-center flex flex-col">{t("goToGallery")}</Link>
    </main>

    <main>
      <Link href="/prosjekter/kode-prosjekter" className="mt-20 text-3xl font-semibold text-primary items-center flex flex-col">{t("goToCodingProjects")}</Link>
    </main>

      {/* <section className="pb-6">
        <h2 className="text-3xl font-semibold text-primary">{t("aboutMe")}</h2>
        <p className="mt-2 text-text">{t("aboutMeText")}</p>
      </section> */}

      {/* <div className="pb-6">
        <Profileimg />
      </div> */}
    </main>
  );
}
