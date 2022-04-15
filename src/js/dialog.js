import { state } from "./state.js";

const dialogElement = document.getElementById("dialog");

dialogElement.addEventListener("click", closeDialog);

export function closeDialog() {
    dialogElement.classList.add("close");
    setTimeout(() => {
        dialogElement.classList.remove("close");
        dialogElement.open = false;
        dialogElement.innerText = "";
    }, 300);
}

export function openDialog() {
    dialogElement.innerText = state.won ? "You won!" : "You lost!";
    dialogElement.open = true;
}
