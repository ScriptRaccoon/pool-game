import { Game } from "./Game.js";
import { getBalls } from "./setupBalls.js";
import { getPockets } from "./setupPockets.js";
import { getBumpers } from "./setupBumpers.js";

export const game = new Game({
    balls: getBalls(),
    pockets: getPockets(),
    bumpers: getBumpers(),
});
