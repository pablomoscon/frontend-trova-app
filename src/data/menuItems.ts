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
            { label: 'Administrar', href: '/admin/dashboard/albums-management' },
            { label: 'Agregar', href: '/admin/dashboard/album-form' },
            { label: 'Ver detalles', href: '/admin/dashboard/albums-details' },
        ],
    },
    {
        label: 'Artistas',
        icon: UserGroupIcon,
        key: 'artists',
        subitems: [
            { label: 'Administrar', href: '/admin/dashboard/artists-management' },
            { label: 'Agregar', href: '/admin/dashboard/artist-form' },
            { label: 'Ver detalles', href: '/admin/dashboard/artists-details' },
        ],
    },
    {
        label: 'Usuarios',
        icon: UserIcon,
        key: 'users',
        subitems: [
            { label: 'Administrar', href: '/admin/dashboard/users-management' },
            { label: 'Agregar', href: '/admin/dashboard/user-form' },
            { label: 'Ver detalles', href: '/admin/dashboard/users-data' },
        ],
    },
];
