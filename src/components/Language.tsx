"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Locale = "en" | "no";

type TranslationMap = Record<string, string>;

type LanguageContextValue = {
  locale: Locale;
  setLocale: (nextLocale: Locale) => void;
  t: (key: string) => string;
};

const translations: Record<Locale, TranslationMap> = {
  en: {
    navTitle: "Portfolio",
    home: "Home",
    about: "About",
    contact: "Contact",
    footer: "Portfolio footer",
    welcomeTitle: "Welcome to My Portfolio",
    welcomeText:
      "Hello, welcome to my portfolio website! Here you will find information about my projects, skills, and experience.",
    aboutMe: "About Me",
    aboutMeText: "I am a digital artist and a coder",
    myDrawings: "My drawings",
    greeting: "Hi",
    myName: "My name is Marte",
    contactTitle: "Contact Me",
    contactText:
      "If you would like to get in touch, please reach out via email or social media.",
    epleTitle: "Apple page",
    epleText: "This is the Apple page. You can add more content about Apple here.",
    english: "English",
    norwegian: "Norwegian",
  },
  no: {
    navTitle: "Portefølje",
    home: "Hjem",
    about: "Om meg",
    contact: "Kontakt",
    footer: "Portefølje footer",
    welcomeTitle: "Velkommen til min portefølje",
    welcomeText:
      "Hei, velkommen til min portefølje! Her finner du informasjon om mine prosjekter, ferdigheter og erfaring.",
    aboutMe: "Om meg",
    aboutMeText: "Jeg er en digital artist og utvikler",
    myDrawings: "Mine tegninger",
    greeting: "Hei",
    myName: "Jeg heter Marte",
    contactTitle: "Kontakt meg",
    contactText:
      "Hvis du vil komme i kontakt, kan du sende en e-post eller kontakte meg via sosiale medier.",
    epleTitle: "Eple-side",
    epleText: "Dette er eplesiden. Her kan du legge til mer innhold om eple.",
    english: "Engelsk",
    norwegian: "Norsk",
  },
};

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    const storedLocale = window.localStorage.getItem("portfolio-locale");
    if (storedLocale === "en" || storedLocale === "no") {
      setLocaleState(storedLocale);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
    window.localStorage.setItem("portfolio-locale", locale);
  }, [locale]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      locale,
      setLocale: (nextLocale: Locale) => setLocaleState(nextLocale),
      t: (key: string) => translations[locale][key] ?? translations.en[key] ?? key,
    }),
    [locale],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }

  return context;
}

export default function LanguageToggle() {
  const { locale, setLocale, t } = useLanguage();

  return (
    <div className="flex items-center gap-2 rounded-full border border-primary/40 bg-background px-2 py-1 text-sm">
      {(["en", "no"] as const).map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => setLocale(option)}
          className={`rounded-full px-3 py-1 transition ${
            locale === option ? "bg-primary text-white" : "text-text hover:bg-primary/10"
          }`}
          aria-pressed={locale === option}
        >
          {option === "en" ? t("english") : t("norwegian")}
        </button>
      ))}
    </div>
  );
}