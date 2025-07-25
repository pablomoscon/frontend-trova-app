export const getPaginationRange = (page: number, totalPages: number): [number, number] => {
    let startPage = Math.max(1, page - 1);
    let endPage = Math.min(totalPages, page + 1);

    if (page <= 2) {
        startPage = 1;
        endPage = Math.min(3, totalPages);
    } else if (page >= totalPages - 1) {
        endPage = totalPages;
        startPage = Math.max(1, totalPages - 2);
    }

    return [startPage, endPage];
};
