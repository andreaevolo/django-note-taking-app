const deleteBtns = document.querySelectorAll(".delete");
// 'X-CSRFToken': document.cookie

const removeNoteFromDOM = (id) => {
    const noteBtn = document.querySelector(`span[data-noteid='${id}']`);
    noteBtn.parentElement.classList.add("fadeOutBottom");
    removeOnAnimationsCompleted(noteBtn.parentElement);
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
