export interface Character {
  id: string;
  name: string;
  description: string;
  preview: string; // URL to preview image
  deviantartFolder: string; // Folder name on DeviantArt (must match)
}

export const CHARACTERS: Character[] = [
  {
    id: "1",
    name: "Kiyomi",
    description: "A mysterious character with elegant features",
    preview: "/images/kiyomi-preview.jpg",
    deviantartFolder: "Kiyomi", // Must match your DA folder name
  },
  {
    id: "2",
    name: "Zeiko",
    description: "A powerful and determined character",
    preview: "/images/zeiko-preview.jpg",
    deviantartFolder: "Zeiko",
  },
  // Add more as needed
];