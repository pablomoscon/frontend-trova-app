import React from 'react';
import { AlbumPlatformLinksProps } from '../../Interfaces/AlbumInterface';
import { platformsList } from '../../utils/platformsUtils';

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

  const linksMap: Record<string, string | undefined> = {
    Spotify: spotifyLink,
    'YouTube Music': youtubeLink,
    'Amazon Music': amazonMusicLink,
    'Apple Music': appleMusicLink,
  };

  return (
    <div className={`flex justify-center items-center ${spacing}`}>
      {platformsList
        .filter((p) => !!linksMap[p.name])
        .map(({ name, Icon, color, defaultHover }) => (
          <a
            key={name}
            href={linksMap[name]!}
            target='_blank'
            rel='noopener noreferrer'
            aria-label={name}
          >
            <Icon
              className={`${iconSize} ${
                isColored ? color : defaultHover
              } transition cursor-pointer`}
            />
          </a>
        ))}
    </div>
  );
};

export default AlbumPlatformLinks;
