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

export function sub(v, w) {
    return { x: v.x - w.x, y: v.y - w.y };
}

export function scale(r, v) {
    return { x: r * v.x, y: r * v.y };
}

export function mousePos(e, canvas) {
    const rect = canvas.getBoundingClientRect();
    return {
        x: (e.clientX - rect.left) * (canvas.width / rect.width),
        y: (e.clientY - rect.top) * (canvas.height / rect.height),
    };
}

export function solveRealQuadratic(a, b, c) {
    const discriminant = b * b - 4 * a * c;
    if (discriminant < 0) return [];
    const root = Math.sqrt(discriminant);
    return [(-b + root) / (2 * a), (-b + root) / (2 * a)];
}
