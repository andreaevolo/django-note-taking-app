const deleteBtns = document.querySelectorAll(".delete");
// 'X-CSRFToken': document.cookie

const removeNoteFromDOM = (id) => {
    const noteBtn = document.querySelector(`span[data-noteid='${id}']`);
    noteBtn.parentElement.classList.add("fadeOutBottom");
    removeOnAnimationsCompleted(noteBtn.parentElement);
}

const getCSRFToken = () => {
    const tokenList = document.cookie.split(';');
    let csrft = '';
    tokenList.forEach(token => {
        if (token.startsWith("csrftoken")) {
            csrft = token.split("=")[1];
        }
    })
    return csrft;
}


const deleteNote = (id) => {
    return fetch(`note/${id}`, {
        method: "DELETE",
        headers: {
            'X-CSRFToken': getCSRFToken()
        }
    })
}

const handleDelete = (evt) => {
    const id = evt.target.dataset.noteid;
    console.log(id);

    deleteNote(id)
        .then(res => {
            showAlert("Note deleted!", "success")
            removeNoteFromDOM(id)
        })

}

deleteBtns.forEach(btn => {
    btn.addEventListener("click", handleDelete)
})
