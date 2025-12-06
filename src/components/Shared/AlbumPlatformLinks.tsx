import React from 'react';
import { FaSpotify, FaYoutube, FaAmazon, FaApple } from 'react-icons/fa';
import { AlbumPlatformLinksProps } from '../../Interfaces/AlbumInterface';

const AlbumPlatformLinks: React.FC<AlbumPlatformLinksProps> = ({
  spotifyLink,
  youtubeLink,
  amazonMusicLink,
  appleMusicLink,
  iconSize = 'text-xl',
  spacing = 'space-x-4',
  variant = 'default',
}) => {
  const isColored = variant === 'colored';

  const platforms = [
    {
      link: spotifyLink,
      aria: 'Spotify',
      Icon: FaSpotify,
      colored: 'text-green-500 hover:scale-125',
      neutral: 'text-gray-600 hover:text-green-500',
    },
    {
      link: youtubeLink,
      aria: 'YouTube',
      Icon: FaYoutube,
      colored: 'text-red-500 hover:scale-125',
      neutral: 'text-gray-600 hover:text-red-500',
    },
    {
      link: amazonMusicLink,
      aria: 'Amazon Music',
      Icon: FaAmazon,
      colored: 'text-blue-800 hover:scale-125',
      neutral: 'text-gray-600 hover:text-yellow-500',
    },
    {
      link: appleMusicLink,
      aria: 'Apple Music',
      Icon: FaApple,
      colored: 'text-gray-700 hover:scale-125',
      neutral: 'text-gray-600 hover:text-gray-800',
    },
  ];

  return (
    <div className={`flex justify-center items-center ${spacing}`}>
      {platforms
        .filter((p) => !!p.link)
        .map(({ link, aria, Icon, colored, neutral }) => (
          <a
            key={aria}
            href={link!}
            target='_blank'
            rel='noopener noreferrer'
            aria-label={aria}
          >
            <Icon
              className={`${iconSize} ${
                isColored ? colored : neutral
              } transition cursor-pointer`}
            />
          </a>
        ))}
    </div>
  );
};

export default AlbumPlatformLinks;
