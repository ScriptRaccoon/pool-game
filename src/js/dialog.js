import { state } from "./state.js";

export const dialogElement = document.querySelector("dialog");

dialogElement.addEventListener("click", closeDialog);

export function closeDialog() {
    dialogElement.open = false;
    dialogElement.innerText = "";
}

export function openDialog() {
    dialogElement.innerText = state.won ? "You won!" : "You lost!";
    dialogElement.open = true;
}
