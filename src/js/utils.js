export function distance(p, q) {
    return Math.sqrt(Math.pow(p.x - q.x, 2) + Math.pow(p.y - q.y, 2));
}

export function norm(v) {
    return Math.sqrt(Math.pow(v.x, 2) + Math.pow(v.y, 2));
}

export function normalize(v) {
    if (v.x == 0 && v.y == 0) return v;
    return scale(1 / norm(v), v);
}

export function limit(v, s) {
    const n = norm(v);
    if (n <= s) return v;
    return scale(s / n, v);
}

export function sub(v, w) {
    return { x: v.x - w.x, y: v.y - w.y };
}

export function scale(r, v) {
    return { x: r * v.x, y: r * v.y };
}

export function rotate(alpha, v) {
    return {
        x: v.x * Math.cos(alpha) - v.y * Math.sin(alpha),
        y: v.x * Math.sin(alpha) + v.y * Math.cos(alpha),
    };
}

function dotProduct(v, w) {
    return v.x * w.x + v.y * w.y;
}

export function angleBetween(v, w) {
    return Math.acos(dotProduct(v, w) / (norm(v) * norm(w)));
}

export function solveRealQuadratic(a, b, c) {
    const discriminant = b * b - 4 * a * c;
    if (discriminant < 0) return [];
    const root = Math.sqrt(discriminant);
    return [(-b + root) / (2 * a), (-b + root) / (2 * a)];
}

function randomInteger(a, b) {
    return a + Math.floor((b - a) * Math.random());
}

export function randomElement(list) {
    return list[randomInteger(0, list.length)];
}