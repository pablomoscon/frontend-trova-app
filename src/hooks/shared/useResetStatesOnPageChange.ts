import { useEffect } from 'react';

export function useResetStatesOnPageChange(page: number, resetFns: (() => void)[]) {
    useEffect(() => {
        resetFns.forEach(reset => reset());
    }, [page]);
}
