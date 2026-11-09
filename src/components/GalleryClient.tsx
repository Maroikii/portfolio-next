// components/GalleryTitle.tsx
'use client'

import { useLanguage } from '@/components/Language' // eller det du bruker

export default function GalleryTitle() {
  const { t } = useLanguage()
  return (
    <>
      <h1>{t("galleryTitle")}</h1>
      
    </>

  )
}