import {
    MusicalNoteIcon,
    UserGroupIcon,
    UserIcon,
} from '@heroicons/react/24/outline';
import { HomeIcon } from 'lucide-react';
import { MenuItem } from '../Interfaces/DashboardInterface';

export const menuItems: MenuItem[] = [
    {
        label: 'Dashboard',
        icon: HomeIcon,
        key: 'dashboard',
        href: '/admin/dashboard',
    },
    {
        label: 'Álbumes',
        icon: MusicalNoteIcon,
        key: 'albums',
        subitems: [
            { label: 'Ver detalles', href: '/admin/dashboard/albums-details' },
            { label: 'Agregar', href: '/admin/dashboard/album-form' },
            { label: 'Administrar', href: '/admin/dashboard/albums-management' },
        ],
    },
    {
        label: 'Artistas',
        icon: UserGroupIcon,
        key: 'artists',
        subitems: [
            { label: 'Ver detalles', href: '/admin/dashboard/artists-details' },
            { label: 'Agregar', href: '/admin/dashboard/artist-form' },
            { label: 'Administrar', href: '/admin/dashboard/artists-management' },
        ],
    },
    {
        label: 'Usuarios',
        icon: UserIcon,
        key: 'users',
        subitems: [
            { label: 'Ver detalles', href: '/admin/dashboard/users-data' },
            { label: 'Agregar', href: '/admin/dashboard/user-form' },
            { label: 'Administrar', href: '/admin/dashboard/users-management' },
        ],
    },
];
