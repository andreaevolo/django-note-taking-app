
const createAlert = (text, type) => {
    const template = `<div class="alert alert--${type} fadeInRight">
                        <p>${text}</p>
                     </div>`
    return template;
}

const showAlert = (text, type) => {
    document.body.insertAdjacentHTML("afterbegin", createAlert(text, type))
    setTimeout(() => { removeAlert() }, 3000)
}

const removeAlert = () => {
    const alert = document.querySelector(".alert");
    alert.classList.remove("fadeInRight");
    alert.classList.add("fadeOutLeft");
    removeOnAnimationsCompleted(alert);
}