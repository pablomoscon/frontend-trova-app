export const formatDate = (dateString?: string): string => {
    if (!dateString) return 'Sin datos';
    try {
        return new Date(dateString).toLocaleDateString('es-AR', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        });
    } catch {
        return 'Fecha inválida';
    }
};
