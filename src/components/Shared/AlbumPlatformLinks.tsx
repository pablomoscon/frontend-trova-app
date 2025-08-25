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

  return (
    <div className={`flex justify-center items-center ${spacing}`}>
      {spotifyLink && (
        <a
          href={spotifyLink}
          target='_blank'
          rel='noopener noreferrer'
          aria-label='Spotify'
        >
          <FaSpotify
            className={`${iconSize} ${
              isColored
                ? 'text-green-500 hover:scale-125'
                : 'text-gray-600 hover:text-green-500'
            } transition cursor-pointer`}
          />
        </a>
      )}
      {youtubeLink && (
        <a
          href={youtubeLink}
          target='_blank'
          rel='noopener noreferrer'
          aria-label='YouTube'
        >
          <FaYoutube
            className={`${iconSize} ${
              isColored
                ? 'text-red-500 hover:scale-125'
                : 'text-gray-600 hover:text-red-500'
            } transition cursor-pointer`}
          />
        </a>
      )}
      {amazonMusicLink && (
        <a
          href={amazonMusicLink}
          target='_blank'
          rel='noopener noreferrer'
          aria-label='Amazon Music'
        >
          <FaAmazon
            className={`${iconSize} ${
              isColored
                ? 'text-blue-800 hover:scale-125'
                : 'text-gray-600 hover:text-yellow-500'
            } transition cursor-pointer`}
          />
        </a>
      )}
      {appleMusicLink && (
        <a
          href={appleMusicLink}
          target='_blank'
          rel='noopener noreferrer'
          aria-label='Apple Music'
        >
          <FaApple
            className={`${iconSize} ${
              isColored
                ? 'text-gray-700 hover:scale-125'
                : 'text-gray-600 hover:text-gray-800'
            } transition cursor-pointer`}
          />
        </a>
      )}
    </div>
  );
};

export default AlbumPlatformLinks;
