const paginationBtns = document.querySelectorAll('.pagination__btn');
const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
});

const changeOffsetQuery = (offset) => {
    window.location.replace(`?offset=${offset}`
    )
}

const handlePaginationBtnClick = (evt) => {
    const btn = evt.target
    console.log(btn.id);
    if (!btn.id.length) {
        const paginationTextContent = evt.target.textContent;
        changeOffsetQuery((paginationTextContent - 1) * 4);
    } else {
        console.log(params.offset || 0)
        changeOffsetQuery(((params.offset || 0) + 1) * 4);
    }
}

paginationBtns.forEach(btn => {
    btn.addEventListener("click", handlePaginationBtnClick)
})