"use client";

import Image from "next/image";
import Zeiko from "../assets/zeiko.jpg";
import Profileimg from "../components/Profile-img";
import { useLanguage } from "../components/Language";

export default function Page() {
  const { t } = useLanguage();

  return (
    <main className="bg-background text-text">
      <header className="pb-4">
        <h1 className="text-2xl text-primary lg:text-6xl xl:text-8xl">{t("welcomeTitle")}</h1>
        <p className="mt-4 max-w-2xl text-lg">{t("welcomeText")}</p>
      </header>

      <section className="pb-6">
        <h2 className="text-3xl font-semibold text-primary">{t("aboutMe")}</h2>
        <p className="mt-2 text-text">{t("aboutMeText")}</p>
      </section>

      <section className="pb-6">
        <h2 className="text-3xl font-semibold text-primary">{t("myDrawings")}</h2>
        <div className="mt-4 flex flex-wrap gap-6">
          <Image
            src="/images/kiyomi.png"
            alt="Kiyomi"
            width={300}
            height={400}
            sizes="(max-width: 800px) 100vw, 300px"
            className="h-auto w-85 rounded-lg object-cover"
          />
          <Image
            src={Zeiko}
            alt="Zeiko"
            sizes="(max-width: 800px) 100vw, 300px"
            className="h-auto w-75 rounded-lg object-cover"
          />
        </div>
      </section>

      <div className="pb-6">
        <Profileimg />
      </div>
    </main>
  );
}
