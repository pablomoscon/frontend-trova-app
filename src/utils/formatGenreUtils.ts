export function formatGenre(rawGenre: string): string {
    if (!rawGenre) return '';

    const lower = rawGenre.toLowerCase().replace(/_/g, ' ');

    return lower.charAt(0).toUpperCase() + lower.slice(1);
}
