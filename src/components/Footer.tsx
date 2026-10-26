"use client";

import { useLanguage } from "./Language";
import { FaGithub } from "react-icons/fa";

export default function Footer() {
  const { t } = useLanguage();
 const year = new Date().getFullYear();
  return (
   <main className="bg-secondary w-full px-6 py-4 text-text flex flex-row justify-between">
     <div className="">{t("footer")}</div>
     <div className="">©{year}</div>
     <div className="">
      <a
        href="https://github.com/Maroikii"
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary underline hover:text-dark"
      >
        <FaGithub className="inline mr-2" />
        {t("github")}
      </a>
     </div>
   </main>
  );

}
