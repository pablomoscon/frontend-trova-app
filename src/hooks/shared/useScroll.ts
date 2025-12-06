import { useEffect, RefObject, useRef } from 'react';
import { UseScrollOptions } from '../../Interfaces/SharedInterface';

export type ScrollTarget = RefObject<Element | null> | null;

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
    const depsRef = useRef(deps);
    const lastDepsRef = useRef(deps);

    useEffect(() => {
        depsRef.current = deps;
    }, [deps]);

    useEffect(() => {
        if (!enabled) return;

        const isFirstMount = !mountedRef.current;
        mountedRef.current = true;

        const currentDeps = depsRef.current;
        const depsChanged = currentDeps.some((d, i) => d !== lastDepsRef.current[i]);
        lastDepsRef.current = currentDeps;

        const scrollGlobal = (!target && scrollOnMount) || (isFirstMount && !target);
        const scrollLocal = target && !isFirstMount && depsChanged;

        if (scrollGlobal || scrollLocal) {
            requestAnimationFrame(() => {
                const element = target?.current;

                if (element) {
                    const rect = element.getBoundingClientRect();
                    const scrollTop =
                        window.pageYOffset || document.documentElement.scrollTop;

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
    }, [target, enabled, offset, behavior, scrollOnMount]);
}
