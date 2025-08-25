import React from 'react';
import InstagramIcon from '../../Icons/InstagramIcon';
import FacebookIcon from '../../Icons/FacebookIcon';
import { MailIcon } from 'lucide-react';

const socialLinks = [
  {
    href: '#',
    icon: <InstagramIcon size={24} />,
    label: 'Instagram',
  },
  {
    href: '#',
    icon: <FacebookIcon size={24} />,
    label: 'Facebook',
  },
  {
    href: 'mailto:contacto@trova.com',
    icon: <MailIcon size={24} />,
    label: 'Correo electrónico',
  },
];

const SocialLinks: React.FC = () => (
  <div className='flex gap-6'>
    {socialLinks.map(({ href, icon, label }) => (
      <a
        key={label}
        href={href}
        aria-label={label}
        className='hover:text-black transition-transform duration-200 hover:scale-110'
      >
        {icon}
      </a>
    ))}
  </div>
);

export default SocialLinks;
