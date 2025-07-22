export function ShowModal() {
    const modalContainer = document.querySelector(".modal-container");
    modalContainer.classList.remove("hide-modal");
    modalContainer.setAttribute("aria-hidden", "false");
}

export function HideModal() {
    const modalContainer = document.querySelector(".modal-container");
    modalContainer.classList.add("hide-modal");
    modalContainer.setAttribute("aria-hidden", "true");
}