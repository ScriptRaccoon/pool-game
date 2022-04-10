import { Ball } from "./Ball.js";

export function setupBalls() {
    const step = {
        x: 40,
        y: 24,
    };

    const start = { x: 780, y: 300 };

    new Ball({
        pos: { x: 200, y: 300 },
        vel: { x: 30, y: 0 },
        color: "white",
    });

    new Ball({
        pos: { x: start.x, y: start.y },
        vel: { x: 0, y: 0 },
        color: "yellow",
    });

    new Ball({
        pos: { x: start.x + step.x, y: start.y - step.y },
        vel: { x: 0, y: 0 },
        color: "blue",
    });

    new Ball({
        pos: { x: start.x + step.x, y: start.y + step.y },
        vel: { x: 0, y: 0 },
        color: "red",
    });

    new Ball({
        pos: { x: start.x + 2 * step.x, y: start.y - 2 * step.y },
        vel: { x: 0, y: 0 },
        color: "darkblue",
    });

    new Ball({
        pos: { x: start.x + 2 * step.x, y: start.y },
        vel: { x: 0, y: 0 },
        color: "darkorange",
    });

    new Ball({
        pos: { x: start.x + 2 * step.x, y: start.y + 2 * step.y },
        vel: { x: 0, y: 0 },
        color: "darkgreen",
    });

    new Ball({
        pos: { x: start.x + 3 * step.x, y: start.y - 3 * step.y },
        vel: { x: 0, y: 0 },
        color: "brown",
    });

    new Ball({
        pos: { x: start.x + 3 * step.x, y: start.y - 1 * step.y },
        vel: { x: 0, y: 0 },
        color: "black",
    });

    new Ball({
        pos: { x: start.x + 3 * step.x, y: start.y + 1 * step.y },
        vel: { x: 0, y: 0 },
        color: "yellow",
    });

    new Ball({
        pos: { x: start.x + 3 * step.x, y: start.y + 3 * step.y },
        vel: { x: 0, y: 0 },
        color: "blue",
    });

    new Ball({
        pos: { x: start.x + 4 * step.x, y: start.y - 4 * step.y },
        vel: { x: 0, y: 0 },
        color: "red",
    });

    new Ball({
        pos: { x: start.x + 4 * step.x, y: start.y - 2 * step.y },
        vel: { x: 0, y: 0 },
        color: "darkblue",
    });

    new Ball({
        pos: { x: start.x + 4 * step.x, y: start.y },
        vel: { x: 0, y: 0 },
        color: "orange",
    });

    new Ball({
        pos: { x: start.x + 4 * step.x, y: start.y + 2 * step.y },
        vel: { x: 0, y: 0 },
        color: "darkgreen",
    });

    new Ball({
        pos: { x: start.x + 4 * step.x, y: start.y + 4 * step.y },
        vel: { x: 0, y: 0 },
        color: "brown",
    });

    Ball.list.forEach((b) => b.draw());
}
