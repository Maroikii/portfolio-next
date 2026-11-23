'use client';

import Link from 'next/link';
import { useCharacters } from '@/lib/characters';

export function CharacterGrid() {
  const characters = useCharacters();

  return (
    <section className='mb-16'>
      <h2 className='mb-6 text-2xl font-bold'>Møt karakterene</h2>
      <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
        {characters.map((character) => (
          <Link
            key={character.id}
            href={`/prosjekter/galleri/${character.id}`}
            className='group overflow-hidden rounded-2xl border border-border bg-surface shadow-sm transition hover:-translate-y-1 hover:shadow-lg'
          >
            <div className='aspect-square overflow-hidden bg-primary-soft flex items-center justify-center'>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={character.image.src}
                alt={character.name}
                className='h-full w-full object-contain p-4 transition duration-500 group-hover:scale-105'
              />
            </div>
            <div className='p-5'>
              <h3 className='mb-1 text-xl font-semibold'>{character.name}</h3>
              <p className='text-sm text-muted line-clamp-2'>
                {character.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default function Page() {
  return <CharacterGrid />;
}