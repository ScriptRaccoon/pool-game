import { Ball } from "./Ball.js";
import { canvas, margin } from "./canvas.js";

const COLORS = {
    YELLOW: "rgb(255,215,0)",
    BLUE: "rgb(0,80,255)",
    RED: "rgb(230,10,10)",
    PURPLE: "rgb(90,0,170)",
    BLACK: "rgb(0,0,0)",
    ORANGE: "rgb(255, 120, 0)",
    GREEN: "rgb(0,90,0)",
    BROWN: "rgb(150,20,0)",
};

export function setupBalls() {
    const step = {
        x: 33,
        y: 19,
    };

    const start = {
        x:
            canvas.width -
            margin -
            (1 / 4) * (canvas.width - 2 * margin),
        y: 300 + margin,
    };

    new Ball({
        pos: { x: start.x, y: start.y },
        color: COLORS.YELLOW,
    });

    new Ball({
        pos: { x: start.x + step.x, y: start.y - step.y },
        color: COLORS.BLUE,
    });

    new Ball({
        pos: { x: start.x + step.x, y: start.y + step.y },
        color: COLORS.RED,
    });

    new Ball({
        pos: { x: start.x + 2 * step.x, y: start.y - 2 * step.y },
        color: COLORS.PURPLE,
    });

    new Ball({
        pos: { x: start.x + 2 * step.x, y: start.y },
        color: COLORS.ORANGE,
    });

    new Ball({
        pos: { x: start.x + 2 * step.x, y: start.y + 2 * step.y },
        color: COLORS.GREEN,
    });

    new Ball({
        pos: { x: start.x + 3 * step.x, y: start.y - 3 * step.y },
        color: COLORS.BROWN,
    });

    new Ball({
        pos: { x: start.x + 3 * step.x, y: start.y - 1 * step.y },
        color: COLORS.BLACK,
        isBlack: true,
    });

    new Ball({
        pos: { x: start.x + 3 * step.x, y: start.y + 1 * step.y },
        color: COLORS.YELLOW,
    });

    new Ball({
        pos: { x: start.x + 3 * step.x, y: start.y + 3 * step.y },
        color: COLORS.BLUE,
    });

    new Ball({
        pos: { x: start.x + 4 * step.x, y: start.y - 4 * step.y },
        color: COLORS.RED,
    });

    new Ball({
        pos: { x: start.x + 4 * step.x, y: start.y - 2 * step.y },
        color: COLORS.PURPLE,
    });

    new Ball({
        pos: { x: start.x + 4 * step.x, y: start.y },
        color: COLORS.ORANGE,
    });

    new Ball({
        pos: { x: start.x + 4 * step.x, y: start.y + 2 * step.y },
        color: COLORS.GREEN,
    });

    new Ball({
        pos: { x: start.x + 4 * step.x, y: start.y + 4 * step.y },
        color: COLORS.BROWN,
    });
}
