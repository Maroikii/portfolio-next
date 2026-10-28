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

import aoki from '@/assets/images/aoki.png';
import kikou from '@/assets/images/kikou.png';
import kirin from '@/assets/images/kirin.jpg';
import kiyomi from '@/assets/images/kiyomi.png';
import kiyomi2 from '@/assets/images/kiyomi2.png';
import kiyomi3 from '@/assets/images/kiyomi3.jpg';
import kiyomi4 from '@/assets/images/kiyomi4.png';
import rioko from '@/assets/images/rioko.png';
import zeiko from '@/assets/images/zeiko.jpg';
import zeiko2 from '@/assets/images/zeiko2.jpg';
import zeiko3 from '@/assets/images/zeiko3.jpg';

export const characters = [
    { name: 'kiyomi', src: kiyomi.src, category: 'character', alt: 'kiyomi' },
    { name: 'zeiko', src: zeiko.src, category: 'character', alt: 'zeiko' },
    { name: 'rioko', src: rioko.src, category: 'character', alt: 'rioko' },
    { name: 'zeiko2', src: zeiko2.src, category: 'character', alt: 'zeiko2' },
    { name: 'kiyomi2', src: kiyomi2.src, category: 'character', alt: 'kiyomi2' },
    { name: 'zeiko3', src: zeiko3.src, category: 'character', alt: 'zeiko3' },
    { name: 'kiyomi3', src: kiyomi3.src, category: 'character', alt: 'kiyomi3' },
    { name: 'aoki', src: aoki.src, category: 'character', alt: 'aoki' },
    { name: 'kikou', src: kikou.src, category: 'character', alt: 'kikou' },
    { name: 'kirin', src: kirin.src, category: 'character', alt: 'kirin' },
    { name: 'kiyomi4', src: kiyomi4.src, category: 'character', alt: 'kiyomi4' }

]

// export const skisser = [

    export const kodeprosjekter = [
        { name: 'example', src: '', category: 'kode-prosjekter', alt: 'example' }
    ]