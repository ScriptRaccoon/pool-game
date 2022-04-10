import { Ball } from "./Ball.js";

export function setupBalls() {
    const step = {
        x: 33,
        y: 19,
    };

    const start = { x: 850, y: 300 };

    new Ball({
        pos: { x: start.x, y: start.y },
        color: "yellow",
    });

    new Ball({
        pos: { x: start.x + step.x, y: start.y - step.y },
        color: "blue",
    });

    new Ball({
        pos: { x: start.x + step.x, y: start.y + step.y },
        color: "red",
    });

    new Ball({
        pos: { x: start.x + 2 * step.x, y: start.y - 2 * step.y },
        color: "darkblue",
    });

    new Ball({
        pos: { x: start.x + 2 * step.x, y: start.y },
        color: "darkorange",
    });

    new Ball({
        pos: { x: start.x + 2 * step.x, y: start.y + 2 * step.y },
        color: "darkgreen",
    });

    new Ball({
        pos: { x: start.x + 3 * step.x, y: start.y - 3 * step.y },
        color: "brown",
    });

    new Ball({
        pos: { x: start.x + 3 * step.x, y: start.y - 1 * step.y },
        color: "black",
    });

    new Ball({
        pos: { x: start.x + 3 * step.x, y: start.y + 1 * step.y },
        color: "yellow",
    });

    new Ball({
        pos: { x: start.x + 3 * step.x, y: start.y + 3 * step.y },
        color: "blue",
    });

    new Ball({
        pos: { x: start.x + 4 * step.x, y: start.y - 4 * step.y },
        color: "red",
    });

    new Ball({
        pos: { x: start.x + 4 * step.x, y: start.y - 2 * step.y },
        color: "darkblue",
    });

    new Ball({
        pos: { x: start.x + 4 * step.x, y: start.y },
        color: "orange",
    });

    new Ball({
        pos: { x: start.x + 4 * step.x, y: start.y + 2 * step.y },
        color: "darkgreen",
    });

    new Ball({
        pos: { x: start.x + 4 * step.x, y: start.y + 4 * step.y },
        color: "brown",
    });

    Ball.list.forEach((b) => b.draw());
}
