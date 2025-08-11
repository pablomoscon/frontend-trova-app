const genreCache = new Map<string, string>();

export function formatGenre(rawGenre: string): string {
    if (!rawGenre) return '';
    if (genreCache.has(rawGenre)) return genreCache.get(rawGenre)!;

    const lower = rawGenre.toLowerCase().replace(/_/g, ' ');
    const formatted = lower.charAt(0).toUpperCase() + lower.slice(1);
    genreCache.set(rawGenre, formatted);
    return formatted;
}