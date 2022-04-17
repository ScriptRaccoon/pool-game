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

export function openDialog(txt) {
    dialogElement.innerText = txt;
    dialogElement.open = true;
}
