export const state = {
    playing: true,
    win: null,
};

export const dialogElement = document.querySelector("dialog");

dialogElement.addEventListener("click", () => {
    dialogElement.open = false;
    dialogElement.innerText = "";
});

export function writeStatus(txt) {
    dialogElement.innerText = txt;
    dialogElement.open = true;
}

export function endMessage() {
    return state.won ? "You won!" : "You lost!";
}
