const searchBar = document.getElementById('searchKeyword');
const notesContainer = document.getElementById('notes__container');

// 1 get words
// 2 post search keyword
// filter the result
let order = 0;

function delay(fn, ms) {
    console.log(`call N ${order}`);
    order++;
    let timer = 0
    return function (...args) {
        clearTimeout(timer)
        timer = setTimeout(fn.bind(this, ...args), ms || 0)
    }
}

const clearNotesView = (DOMElement) => {
    DOMElement.replaceChildren();
}

const updateNotesView = (notes, DOMElement) => {
    let noteTemplate = null;
    notes.forEach(note => {
        console.log(note);
        const { title, text, pub_date } = note.fields;
        noteTemplate = `<div class="note">
            <h2>${title}</h2>
                <p class="note__content">
                    ${text}
                    <span class="date">${pub_date}</span>
                    <span class="delete" data-noteid=${note.pk}>Delete</span>
                </p>
        </div>`;
        DOMElement.insertAdjacentHTML("beforeend", noteTemplate)
    })
}

const getWords = (element) => {
    const text = element.value;
    const words = text.split(' ');
    console.log(text);
    if (text) {
        return filterResultByKeywords(words);
    }
    window.location.replace('/?offset=0');
}

const fetchNotes = (data) => {
    fetch('/notes/search', {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": getCSRFToken()
        }
    })
        .then(res => {
            if (!res.ok) {
                throw new Error("HTTP error, status = " + response.status);
            }
            return res.json();
        })
        .then(res => {
            clearNotesView(notesContainer);
            updateNotesView(res, notesContainer);
        })
        .catch(err => {
            console.error(err)
        })
}

const filterResultByKeywords = (words) => {
    const data = { keywords: [] };

    words.forEach(w => {
        data.keywords.push(w);
    })
    fetchNotes(data)

}

searchBar.addEventListener("keyup", delay((e) => {

    getWords(e.target)

}, 200))