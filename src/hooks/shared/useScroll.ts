import { useEffect, RefObject, useRef } from 'react';
import { UseScrollOptions } from '../../Interfaces/SharedInterface';

export type ScrollTarget = RefObject<HTMLElement> | null;

export function useScroll(
    target: ScrollTarget = null,
    {
        deps = [],
        behavior = 'auto',
        offset = 0,
        enabled = true,
        scrollOnMount = true,
    }: UseScrollOptions = {}
) {
    const mountedRef = useRef(false);
    const lastDepsRef = useRef(deps);

    useEffect(() => {
        if (!enabled) return;

        const isFirstMount = !mountedRef.current;
        mountedRef.current = true;

        const depsChanged = deps.some((d, i) => d !== lastDepsRef.current[i]);
        lastDepsRef.current = deps;

        const scrollGlobal = (!target && scrollOnMount) || (isFirstMount && !target);
        const scrollLocal = target && !isFirstMount && depsChanged;

        if (scrollGlobal || scrollLocal) {
            requestAnimationFrame(() => {
                if (target && target.current) {
                    const rect = target.current.getBoundingClientRect();
                    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                    window.scrollTo({
                        top: rect.top + scrollTop - offset,
                        left: 0,
                        behavior,
                    });
                } else {
                    window.scrollTo({ top: 0, behavior });
                }
            });
        }

    }, [...deps, target, enabled, offset, behavior, scrollOnMount]);
}
