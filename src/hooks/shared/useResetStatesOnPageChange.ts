import { useEffect, useRef } from 'react';

export function useResetStatesOnPageChange(page: number, resetFns: (() => void)[]) {
    const resetFnsRef = useRef(resetFns);

    useEffect(() => {
        resetFnsRef.current = resetFns;
    }, [resetFns]);

    useEffect(() => {
        resetFnsRef.current.forEach(reset => reset());
    }, [page]);
}
