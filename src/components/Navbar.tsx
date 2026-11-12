"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "./Language";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { locale, setLocale, t } = useLanguage();

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLocale(e.target.value === "en" ? "en" : "no");
  };

  return (
    <nav className="relative mt-3 flex w-full items-center justify-between lg:mt-6 lg:justify-center">
      <img
        className="h-[50px] w-[50px] lg:absolute lg:left-4 lg:block"
        src="/watermark.png"
        alt="Watermark"
      />

      <ul
        className={`${
          isOpen ? "flex" : "hidden"
        } absolute right-0 top-14 z-50 w-auto flex-col items-end gap-3 rounded-xl
         bg-secondary/90 px-4 py-3 text-right shadow-xl backdrop-blur-sm 
         lg:static lg:flex lg:w-auto lg:flex-row lg:items-center lg:gap-4 lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none
         mr-1`}
      >
        <li className="hover:underline hover:text-blue-500">
          <Link href="/" onClick={handleLinkClick}>
            {t("home")}
          </Link>
        </li>
        <li className="hover:underline hover:text-blue-500">
          <Link href="/about" onClick={handleLinkClick}>
            {t("about")}
          </Link>
        </li>
        <li className="hover:underline hover:text-blue-500">
          <Link href="/contact" onClick={handleLinkClick}>
            {t("contact")}
          </Link>
        </li>
        <li className="hover:underline hover:text-blue-500">
          <Link href="/prosjekter/kode-prosjekter" onClick={handleLinkClick}>
            {t("codeProjects")}
          </Link>
        </li>
        <li className="hover:underline hover:text-blue-500">
          <Link href="/prosjekter/galleri" onClick={handleLinkClick}>
            {t("gallery")}
          </Link>
        </li>
        <label className="flex cursor-pointer items-center gap-2">
          <span className={locale === "en" ? "font-bold" : "text-gray-500"}>
            EN
          </span>
          <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-300">
            <input
              type="checkbox"
              checked={locale === "no"}
              onChange={(e) => setLocale(e.target.checked ? "no" : "en")}
              className="hidden"
            />
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                locale === "no" ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </div>
          <span className={locale === "no" ? "font-bold" : "text-gray-500"}>
            NO
          </span>
        </label>
      </ul>

      <div className="flex items-center gap-4 lg:hidden">
        <button className="text-4xl mr-4" onClick={() => setIsOpen(!isOpen)}>
          =
        </button>
      </div>
    </nav>
  );
}