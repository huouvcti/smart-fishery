const paging = (currentPage, pageSize) => {
    const default_start_page = 1;
    const page_size = pageSize;
    if (currentPage < 1 || !currentPage) currentPage = default_start_page;

    let result = {
        offset: (currentPage - 1) * page_size,
        limit: Number(page_size),
        currentPage
    }

    return result;
}


module.exports = {
    paging
}   