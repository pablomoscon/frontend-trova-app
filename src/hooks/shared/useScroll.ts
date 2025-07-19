import { useEffect } from 'react';
import { ScrollTarget, useScrollOptions } from '../../Interfaces/SharedInterface';

export function useScroll(
    target: ScrollTarget = null,
    {
        deps = [],
        behavior = 'auto',
        offset = 0,
        enabled = true,
    }: useScrollOptions = {}
) {
    useEffect(() => {
        if (!enabled) return;

        if (typeof target === 'function') {
            const { top, left } = target();
            window.scrollTo({ top: top - offset, left, behavior });
            return;
        }
        if (target && 'current' in target && !target.current) return;

        if (target && 'current' in target && target.current) {
            const rect = target.current.getBoundingClientRect();
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

            window.scrollTo({
                top: rect.top + scrollTop - offset,
                left: rect.left + scrollLeft,
                behavior,
            });
            return;
        }
        if (!target) {
            window.scrollTo({ top: 0, behavior });
        }
    }, deps);
}
