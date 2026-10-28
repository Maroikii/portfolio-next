// const images = import.meta.glob(
//   '@/assets/images/*.{jpg,png,jpeg}',
//   { eager: true }
// );

// export const imageMap: Record<string, string> = {};

// Object.entries(images).forEach(([path, module]) => {
//   const fileName = path.split('/').pop()?.split('.')[0] || '';
//   imageMap[fileName] = (module as any).default;
// });

// console.log(imageMap);

import kiyomi from '@/assets/images/kiyomi.png';
import zeiko from '@/assets/images/zeiko.jpg';
import rioko from '@/assets/images/rioko.png';
import zeiko2 from '@/assets/images/zeiko2.jpg';

export const characters = [
    { name: 'kiyomi', src: kiyomi.src, category: 'character', alt: 'kiyomi' },
    { name: 'zeiko', src: zeiko.src, category: 'character', alt: 'zeiko' },
    { name: 'rioko', src: rioko.src, category: 'character', alt: 'rioko' },
    { name: 'zeiko2', src: zeiko2.src, category: 'character', alt: 'zeiko2' }
]

// export const skisser = [

    export const kodeprosjekter = [
        { name: 'example', src: '', category: 'kode-prosjekter', alt: 'example' }
    ]