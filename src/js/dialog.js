const dialogElement = document.getElementById("dialog");
const dialogContent = document.getElementById("dialogContent");
const closeBtn = document.getElementById("closeBtn");

export function openDialog(txt) {
    dialogContent.innerHTML = txt;
    dialogElement.open = true;
}

export function closeDialog() {
    dialogElement.classList.add("close");
    setTimeout(() => {
        dialogElement.classList.remove("close");
        dialogElement.open = false;
        dialogContent.innerHTML = "";
    }, 300);
}

closeBtn.addEventListener("click", closeDialog);
