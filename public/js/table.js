import { canvas, ctx, margin } from "./canvas.js";

export const pocketSize = 30;

export function drawTable() {
    drawWood();
    drawMountings();
    drawPaddings();
}

function drawWood() {
    ctx.strokeStyle = "rgb(110, 40, 15)";
    ctx.lineWidth = margin;
    ctx.strokeRect(
        margin / 2,
        margin / 2,
        canvas.width - margin,
        canvas.height - margin
    );
}

function drawMountings() {
    const width = 10;
    ctx.lineWidth = width;
    ctx.strokeStyle = "orange";

    // round parts

    ctx.lineCap = "butt";
    const d = 0.05;

    // rounding top left
    ctx.beginPath();
    ctx.arc(
        margin,
        margin,
        pocketSize + width / 2,
        (0.5 + d) * Math.PI,
        (2 - d) * Math.PI
    );
    ctx.stroke();
    ctx.closePath();

    // rounding bottom left
    ctx.beginPath();
    ctx.arc(
        margin,
        canvas.height - margin,
        pocketSize + width / 2,
        d * Math.PI,
        (1.5 - d) * Math.PI
    );
    ctx.stroke();
    ctx.closePath();

    // rounding top middle
    ctx.beginPath();
    ctx.arc(
        canvas.width / 2,
        margin,
        pocketSize + width / 2,
        (1 + d) * Math.PI,
        (2 - d) * Math.PI
    );
    ctx.stroke();
    ctx.closePath();

    // rounding bottom middle
    ctx.beginPath();
    ctx.arc(
        canvas.width / 2,
        canvas.height - margin,
        pocketSize + width / 2,
        d * Math.PI,
        (-1 - d) * Math.PI
    );
    ctx.stroke();
    ctx.closePath();

    // rounding top right
    ctx.beginPath();
    ctx.arc(
        canvas.width - margin,
        margin,
        pocketSize + width / 2,
        (1 + d) * Math.PI,
        (2.5 - d) * Math.PI
    );
    ctx.stroke();
    ctx.closePath();

    // rounding bottom right
    ctx.beginPath();
    ctx.arc(
        canvas.width - margin,
        canvas.height - margin,
        pocketSize + width / 2,
        (-0.5 + d) * Math.PI,
        (1 - d) * Math.PI
    );
    ctx.stroke();
    ctx.closePath();

    // lines

    const overflow = 50;
    ctx.lineCap = "round";

    // lines top left
    ctx.beginPath();
    ctx.moveTo(margin - width / 2, margin + pocketSize + overflow);
    ctx.lineTo(margin - width / 2, margin + pocketSize);
    ctx.stroke();
    ctx.moveTo(margin + pocketSize, margin - width / 2);
    ctx.lineTo(margin + pocketSize + overflow, margin - width / 2);
    ctx.stroke();
    ctx.closePath();

    // lines bottom left
    ctx.beginPath();
    ctx.moveTo(
        margin - width / 2,
        canvas.height - (margin + pocketSize + overflow)
    );
    ctx.lineTo(
        margin - width / 2,
        canvas.height - (margin + pocketSize)
    );
    ctx.moveTo(
        margin + pocketSize,
        canvas.height - margin + width / 2
    );
    ctx.lineTo(
        margin + pocketSize + overflow,
        canvas.height - margin + width / 2
    );
    ctx.stroke();
    ctx.closePath();

    // lines top right
    ctx.beginPath();
    ctx.moveTo(
        canvas.width - (margin - width / 2),
        margin + pocketSize + overflow
    );
    ctx.lineTo(
        canvas.width - (margin - width / 2),
        margin + pocketSize
    );
    ctx.stroke();
    ctx.moveTo(
        canvas.width - (margin + pocketSize),
        margin - width / 2
    );
    ctx.lineTo(
        canvas.width - (margin + pocketSize + overflow),
        margin - width / 2
    );
    ctx.stroke();
    ctx.closePath();

    // lines bottom right
    ctx.beginPath();
    ctx.moveTo(
        canvas.width - (margin - width / 2),
        canvas.height - (margin + pocketSize + overflow)
    );
    ctx.lineTo(
        canvas.width - (margin - width / 2),
        canvas.height - (margin + pocketSize)
    );
    ctx.moveTo(
        canvas.width - (margin + pocketSize),
        canvas.height - margin + width / 2
    );
    ctx.lineTo(
        canvas.width - (margin + pocketSize + overflow),
        canvas.height - margin + width / 2
    );
    ctx.stroke();
    ctx.closePath();

    // lines top middle
    ctx.beginPath();
    ctx.moveTo(
        canvas.width / 2 - pocketSize - overflow,
        margin - width / 2
    );
    ctx.lineTo(canvas.width / 2 - pocketSize, margin - width / 2);
    ctx.stroke();
    ctx.moveTo(canvas.width / 2 + pocketSize, margin - width / 2);
    ctx.lineTo(
        canvas.width / 2 + pocketSize + overflow,
        margin - width / 2
    );
    ctx.stroke();
    ctx.closePath();

    // lines bottom middle
    ctx.beginPath();
    ctx.moveTo(
        canvas.width / 2 - pocketSize - overflow,
        canvas.height - (margin - width / 2)
    );
    ctx.lineTo(
        canvas.width / 2 - pocketSize,
        canvas.height - (margin - width / 2)
    );
    ctx.stroke();
    ctx.moveTo(
        canvas.width / 2 + pocketSize,
        canvas.height - (margin - width / 2)
    );
    ctx.lineTo(
        canvas.width / 2 + pocketSize + overflow,
        canvas.height - (margin - width / 2)
    );
    ctx.stroke();
    ctx.closePath();
}

function drawPaddings() {
    const width = 20;
    ctx.fillStyle = "rgb(0,90,15)";
    // top left
    ctx.beginPath();
    ctx.moveTo(margin + pocketSize, margin);
    ctx.lineTo(margin + pocketSize + width, margin + width);
    ctx.lineTo(canvas.width / 2 - pocketSize - width, margin + width);
    ctx.lineTo(canvas.width / 2 - pocketSize, margin);
    ctx.lineTo(margin + pocketSize, margin);
    ctx.fill();
    ctx.closePath();
    // bottom left
    ctx.beginPath();
    ctx.moveTo(margin + pocketSize, canvas.height - margin);
    ctx.lineTo(
        margin + pocketSize + width,
        canvas.height - (margin + width)
    );
    ctx.lineTo(
        canvas.width / 2 - pocketSize - width,
        canvas.height - (margin + width)
    );
    ctx.lineTo(canvas.width / 2 - pocketSize, canvas.height - margin);
    ctx.lineTo(margin + pocketSize, canvas.height - margin);
    ctx.fill();
    ctx.closePath();
    // top right
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2 + pocketSize, margin);
    ctx.lineTo(canvas.width / 2 + pocketSize + width, margin + width);
    ctx.lineTo(
        canvas.width - pocketSize - margin - width,
        margin + width
    );
    ctx.lineTo(canvas.width - pocketSize - margin, margin);
    ctx.lineTo(canvas.width / 2 + pocketSize, margin);
    ctx.fill();
    ctx.closePath();
    // bottom right
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2 + pocketSize, canvas.height - margin);
    ctx.lineTo(
        canvas.width / 2 + pocketSize + width,
        canvas.height - (margin + width)
    );
    ctx.lineTo(
        canvas.width - pocketSize - margin - width,
        canvas.height - (margin + width)
    );
    ctx.lineTo(
        canvas.width - pocketSize - margin,
        canvas.height - margin
    );
    ctx.lineTo(canvas.width / 2 + pocketSize, canvas.height - margin);
    ctx.fill();
    ctx.closePath();
    // side left
    ctx.beginPath();
    ctx.moveTo(margin, margin + pocketSize);
    ctx.lineTo(margin + width, margin + pocketSize + width);
    ctx.lineTo(
        margin + width,
        canvas.height - margin - width - pocketSize
    );
    ctx.lineTo(margin, canvas.height - margin - pocketSize);
    ctx.lineTo(margin, margin + pocketSize);
    ctx.fill();
    ctx.closePath();
    // side right
    ctx.beginPath();
    ctx.moveTo(canvas.width - margin, margin + pocketSize);
    ctx.lineTo(
        canvas.width - (margin + width),
        margin + pocketSize + width
    );
    ctx.lineTo(
        canvas.width - (margin + width),
        canvas.height - margin - width - pocketSize
    );
    ctx.lineTo(
        canvas.width - margin,
        canvas.height - margin - pocketSize
    );
    ctx.lineTo(canvas.width - margin, margin + pocketSize);
    ctx.fill();
    ctx.closePath();
}
