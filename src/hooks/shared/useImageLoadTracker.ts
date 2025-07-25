import { useEffect, useState } from 'react';

export function useImageLoadTracker(totalImages: number) {
    const [handled, setHandled] = useState(0);

    useEffect(() => {
        setHandled(0); // Reset on totalImages change
    }, [totalImages]);

    const handleImageLoad = () => {
        setHandled((prev) => prev + 1);
    };

    const allHandled = totalImages > 0 && handled >= totalImages;

    return { allHandled, handleImageLoad };
}
