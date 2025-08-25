import { useState, useCallback } from 'react';

export function useToggleMenus() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);

    // Abrir menú principal y cerrar menú usuario
    const openMenu = useCallback(() => {
        setMenuOpen(true);
        setUserMenuOpen(false);
    }, []);

    // Abrir menú usuario y cerrar menú principal
    const openUserMenu = useCallback(() => {
        setUserMenuOpen(true);
        setMenuOpen(false);
    }, []);

    const closeMenu = useCallback(() => setMenuOpen(false), []);
    const closeUserMenu = useCallback(() => setUserMenuOpen(false), []);

    // Toggle menú principal simple
    const toggleMenu = useCallback(() => {
        setMenuOpen(prev => !prev);
    }, []);

    // Toggle menú usuario simple
    const toggleUserMenu = useCallback(() => {
        setUserMenuOpen(prev => !prev);
    }, []);

    return {
        menuOpen,
        userMenuOpen,
        openMenu,
        openUserMenu,
        toggleMenu,
        toggleUserMenu,
        closeMenu,
        closeUserMenu,
    };
}
