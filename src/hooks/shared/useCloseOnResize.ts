import { useEffect, useRef } from 'react';

export const useCloseOnResize = (onClose: () => void, breakpoint = 768) => {
    const prevWidth = useRef(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            const currentWidth = window.innerWidth;
            const crossedBreakpoint =
                (prevWidth.current < breakpoint && currentWidth >= breakpoint) ||
                (prevWidth.current >= breakpoint && currentWidth < breakpoint);

            if (crossedBreakpoint) {
                onClose();
            }

            prevWidth.current = currentWidth;
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [onClose, breakpoint]);
};
