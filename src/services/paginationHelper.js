export function paginationResolve(rowsPerPage, pageParam = 'page') {
    return ($transition$) => {
        let page = Number.parseInt($transition$.params()[pageParam]);
        if (!Number.isFinite(page) || page < 1) {
            page = 1;
        }

        return {
            page,
            limit: rowsPerPage,
            offset: (page - 1) * rowsPerPage,
            offsetToPage: (offset) => (offset / rowsPerPage + 1)
        }
    }

}