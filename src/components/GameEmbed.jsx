'use client'; // If using Next.js 13+ with App Router

import { useState } from 'react';
import { useLanguage } from '@/components/Language';

export default function GameEmbed({ title, gamePath, width = 800, height = 600 }) {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="game-container">
      {!isOpen ? (
        <button 
          onClick={() => setIsOpen(true)}
          className="game-launch-btn"
        >
          <p>{t("tryGame")}</p>
        </button>
      ) : (
        <div>
          <button 
            onClick={() => setIsOpen(false)}
            className="game-close-btn"
          >
            ✕ {t("closeGame")}
          </button>
          <iframe 
            src={gamePath}
            width={width}
            height={height}
            sandbox="allow-same-origin allow-scripts allow-popups"
            style={{ border: '2px solid #333', borderRadius: '8px', marginTop: '10px' }}
          />
        </div>
      )}
    </div>
  );
}