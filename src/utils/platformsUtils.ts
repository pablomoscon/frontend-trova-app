// src/data/platformsData.ts
import { FaSpotify, FaYoutube, FaAmazon, FaApple } from 'react-icons/fa';

export const platformsList = [
    {
        name: 'Spotify',
        imgSrc: '/assets/logos/spotify.png',
        Icon: FaSpotify,
        color: 'text-green-500 hover:scale-125',
        defaultHover: 'text-gray-600 hover:text-green-500',
        href: 'https://open.spotify.com/',
    },
    {
        name: 'YouTube Music',
        imgSrc: '/assets/logos/youtube.png',
        Icon: FaYoutube,
        color: 'text-red-500 hover:scale-125',
        defaultHover: 'text-gray-600 hover:text-red-500',
        href: 'https://music.youtube.com/',
    },
    {
        name: 'Amazon Music',
        imgSrc: '/assets/logos/amazon.png',
        Icon: FaAmazon,
        color: 'text-blue-800 hover:scale-125',
        defaultHover: 'text-gray-600 hover:text-yellow-500',
        href: 'https://music.amazon.com/',
    },
    {
        name: 'Apple Music',
        imgSrc: '/assets/logos/applemusic.png',
        Icon: FaApple,
        color: 'text-gray-700 hover:scale-125',
        defaultHover: 'text-gray-600 hover:text-gray-800',
        href: 'https://music.apple.com/',
    },
];
