export function distance(p, q) {
    return Math.sqrt(Math.pow(p.x - q.x, 2) + Math.pow(p.y - q.y, 2));
}

export function norm(v) {
    return Math.sqrt(Math.pow(v.x, 2) + Math.pow(v.y, 2));
}

export function sub(v, w) {
    return { x: v.x - w.x, y: v.y - w.y };
}

export function add(v, w) {
    return { x: v.x + w.x, y: v.y + w.y };
}

export function scale(r, v) {
    return { x: r * v.x, y: r * v.y };
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

export function rotate(alpha, v) {
    return {
        x: v.x * Math.cos(alpha) - v.y * Math.sin(alpha),
        y: v.x * Math.sin(alpha) + v.y * Math.cos(alpha),
    };
}

export function dotProduct(v, w) {
    return v.x * w.x + v.y * w.y;
}

export function angleBetween(v, w) {
    return Math.acos(dotProduct(v, w) / (norm(v) * norm(w)));
}

function randomInteger(a, b) {
    return a + Math.floor((b - a) * Math.random());
}

export function randomElement(list) {
    return list[randomInteger(0, list.length)];
}

function solveRealQuadratic(a, b, c) {
    const discriminant = b * b - 4 * a * c;
    if (discriminant < 0) return [];
    const root = Math.sqrt(discriminant);
    return [(-b + root) / (2 * a), (-b - root) / (2 * a)];
}

export function segmentIntersectsCircle(segment, circle) {
    const [a, b] = segment;
    const [c, r] = circle;
    // a point of intersection has the form a + t*b with 0 <= t <= 1
    // and (a.x + t * b.x - c.x)^2 + (a.y + t * b.y - c.y)^2 = r^2.
    // this is a quadratic equation in t.
    const u = Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2);
    const v =
        2 * ((a.x - c.x) * (b.x - a.x) + (a.y - c.y) * (b.y - a.y));
    const w =
        Math.pow(a.x - c.x, 2) +
        Math.pow(a.y - c.y, 2) -
        Math.pow(r, 2);
    const solutions = solveRealQuadratic(u, v, w);
    return (
        solutions.length > 0 &&
        solutions.some((t) => t >= 0 && t <= 1)
    );
}
