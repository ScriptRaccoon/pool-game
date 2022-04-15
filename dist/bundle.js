(() => {
  var __defProp = Object.defineProperty;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __publicField = (obj, key, value) => {
    __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
    return value;
  };

  // src/js/utils.js
  function distance(p, q) {
    return Math.sqrt(Math.pow(p.x - q.x, 2) + Math.pow(p.y - q.y, 2));
  }
  function norm(v) {
    return Math.sqrt(Math.pow(v.x, 2) + Math.pow(v.y, 2));
  }
  function normalize(v) {
    if (v.x == 0 && v.y == 0)
      return v;
    return scale(1 / norm(v), v);
  }
  function limit(v, s) {
    const n = norm(v);
    if (n <= s)
      return v;
    return scale(s / n, v);
  }
  function sub(v, w) {
    return { x: v.x - w.x, y: v.y - w.y };
  }
  function scale(r, v) {
    return { x: r * v.x, y: r * v.y };
  }
  function rotate(alpha, v) {
    return {
      x: v.x * Math.cos(alpha) - v.y * Math.sin(alpha),
      y: v.x * Math.sin(alpha) + v.y * Math.cos(alpha)
    };
  }
  function dotProduct(v, w) {
    return v.x * w.x + v.y * w.y;
  }
  function angleBetween(v, w) {
    return Math.acos(dotProduct(v, w) / (norm(v) * norm(w)));
  }
  function solveRealQuadratic(a, b, c) {
    const discriminant = b * b - 4 * a * c;
    if (discriminant < 0)
      return [];
    const root = Math.sqrt(discriminant);
    return [(-b + root) / (2 * a), (-b + root) / (2 * a)];
  }
  function randomInteger(a, b) {
    return a + Math.floor((b - a) * Math.random());
  }
  function randomElement(list) {
    return list[randomInteger(0, list.length)];
  }

  // src/js/canvas.js
  var canvas = document.getElementById("canvas");
  var tableCanvas = document.getElementById("tableCanvas");
  var ctx = canvas.getContext("2d");
  var tctx = tableCanvas.getContext("2d");
  var margin = 60;
  canvas.width = 1200 + 2 * margin;
  canvas.height = 600 + 2 * margin;
  tableCanvas.width = 1200 + 2 * margin;
  tableCanvas.height = 600 + 2 * margin;
  var canvasNorm = norm({ x: canvas.width, y: canvas.height });
  function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  // src/js/state.js
  var state = {
    playing: true,
    win: null,
    idle: true
  };

  // src/js/dialog.js
  var dialogElement = document.querySelector("dialog");
  dialogElement.addEventListener("click", closeDialog);
  function closeDialog() {
    dialogElement.open = false;
    dialogElement.innerText = "";
  }
  function openDialog() {
    dialogElement.innerText = state.won ? "You won!" : "You lost!";
    dialogElement.open = true;
  }

  // src/js/Polygon.js
  var _Polygon = class {
    static drawAll() {
      _Polygon.list.forEach((p) => p.draw());
    }
    constructor({ coords, shadow }) {
      this.coords = coords;
      this.color = "rgb(0,90,15)";
      _Polygon.list.push(this);
      this.shadow = shadow || { x: 0, y: 0 };
    }
    draw() {
      tctx.filter = "blur(3px)";
      tctx.beginPath();
      tctx.fillStyle = "rgba(0,0,0,0.45)";
      tctx.moveTo(this.coords[0].x + this.shadow.x, this.coords[0].y + this.shadow.y);
      for (let i = 1; i < this.coords.length; i++) {
        tctx.lineTo(this.coords[i].x + this.shadow.x, this.coords[i].y + this.shadow.y);
      }
      tctx.fill();
      tctx.closePath();
      tctx.filter = "blur(0px)";
      tctx.beginPath();
      tctx.fillStyle = this.color;
      tctx.moveTo(this.coords[0].x, this.coords[0].y);
      for (let i = 1; i < this.coords.length; i++) {
        tctx.lineTo(this.coords[i].x, this.coords[i].y);
      }
      tctx.fill();
      tctx.closePath();
    }
    intersectsWith(circle) {
      for (let i = 0; i < this.coords.length - 1; i++) {
        const c = circle.pos;
        const r = circle.size;
        const a = this.coords[i];
        const b = this.coords[i + 1];
        const u = Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2);
        const v = 2 * ((a.x - c.x) * (b.x - a.x) + (a.y - c.y) * (b.y - a.y));
        const w = Math.pow(a.x - c.x, 2) + Math.pow(a.y - c.y, 2) - Math.pow(r, 2);
        const solutions = solveRealQuadratic(u, v, w);
        if (solutions.length > 0 && solutions.some((t) => t >= 0 && t <= 1))
          return i;
      }
      return false;
    }
  };
  var Polygon = _Polygon;
  __publicField(Polygon, "list", []);

  // src/js/setupPolygons.js
  var pocketSize = 30;
  function setupPolygons() {
    const width = 20;
    const grace = 10;
    new Polygon({
      coords: [
        { x: margin + pocketSize + grace, y: margin },
        {
          x: margin + pocketSize + width + grace,
          y: margin + width
        },
        {
          x: canvas.width / 2 - pocketSize - width,
          y: margin + width
        },
        { x: canvas.width / 2 - pocketSize, y: margin }
      ],
      shadow: { x: 0, y: 5 }
    });
    new Polygon({
      coords: [
        {
          x: canvas.width / 2 - pocketSize,
          y: canvas.height - margin
        },
        {
          x: canvas.width / 2 - pocketSize - width,
          y: canvas.height - (margin + width)
        },
        {
          x: margin + pocketSize + width + grace,
          y: canvas.height - (margin + width)
        },
        {
          x: margin + pocketSize + grace,
          y: canvas.height - margin
        }
      ],
      shadow: { x: 0, y: -5 }
    });
    new Polygon({
      coords: [
        { x: canvas.width / 2 + pocketSize, y: margin },
        {
          x: canvas.width / 2 + pocketSize + width,
          y: margin + width
        },
        {
          x: canvas.width - pocketSize - margin - width - grace,
          y: margin + width
        },
        {
          x: canvas.width - pocketSize - margin - grace,
          y: margin
        }
      ],
      shadow: { x: 0, y: 5 }
    });
    new Polygon({
      coords: [
        {
          x: canvas.width - pocketSize - margin - grace,
          y: canvas.height - margin
        },
        {
          x: canvas.width - pocketSize - margin - width - grace,
          y: canvas.height - (margin + width)
        },
        {
          x: canvas.width / 2 + pocketSize + width,
          y: canvas.height - (margin + width)
        },
        {
          x: canvas.width / 2 + pocketSize,
          y: canvas.height - margin
        }
      ],
      shadow: { x: 0, y: -5 }
    });
    new Polygon({
      coords: [
        {
          x: margin,
          y: canvas.height - margin - pocketSize - grace
        },
        {
          x: margin + width,
          y: canvas.height - margin - width - pocketSize - grace
        },
        {
          x: margin + width,
          y: margin + pocketSize + width + grace
        },
        { x: margin, y: margin + pocketSize + grace }
      ],
      shadow: { x: 5, y: 0 }
    });
    new Polygon({
      coords: [
        {
          x: canvas.width - margin,
          y: margin + pocketSize + grace
        },
        {
          x: canvas.width - (margin + width),
          y: margin + pocketSize + width + grace
        },
        {
          x: canvas.width - (margin + width),
          y: canvas.height - margin - width - pocketSize - grace
        },
        {
          x: canvas.width - margin,
          y: canvas.height - margin - pocketSize - grace
        }
      ],
      shadow: { x: -5, y: 0 }
    });
  }

  // src/js/Pocket.js
  var _Pocket = class {
    static drawAll() {
      _Pocket.list.forEach((pocket) => pocket.draw());
    }
    constructor({ pos, type, rotation }) {
      this.pos = pos;
      this.type = type;
      this.rotation = rotation;
      this.size = pocketSize;
      this.gradient = tctx.createRadialGradient(this.pos.x, this.pos.y, 0, this.pos.x, this.pos.y, this.size);
      this.gradient.addColorStop(0.5, "#151515");
      this.gradient.addColorStop(1, "#000");
      _Pocket.list.push(this);
    }
    draw() {
      tctx.save();
      tctx.shadowBlur = 10;
      tctx.shadowColor = "#000";
      tctx.fillStyle = this.gradient;
      tctx.beginPath();
      tctx.arc(this.pos.x, this.pos.y, this.size, 0, 2 * Math.PI);
      tctx.fill();
      tctx.closePath();
      tctx.restore();
    }
    includes(ball) {
      return distance(this.pos, ball.pos) < this.size;
    }
    drawMounting() {
      tctx.save();
      const width = 10;
      tctx.lineWidth = width;
      tctx.strokeStyle = "rgb(230,180,0)";
      tctx.lineCap = "round";
      tctx.shadowBlur = 10;
      tctx.shadowColor = "rgb(255,200,0,0.25)";
      tctx.translate(this.pos.x, this.pos.y);
      tctx.rotate(this.rotation * Math.PI / 180);
      if (this.type === "corner") {
        const d2 = 0.16;
        const overflow = 60;
        tctx.beginPath();
        tctx.moveTo(-width / 2 - _Pocket.cornerOffset, this.size + overflow - _Pocket.cornerOffset);
        tctx.arc(0, 0, this.size + width / 2, (0.5 + d2) * Math.PI, (2 - d2) * Math.PI);
        tctx.lineTo(this.size + overflow - _Pocket.cornerOffset, -width / 2 - _Pocket.cornerOffset);
        tctx.stroke();
        tctx.closePath();
      } else if (this.type === "edge") {
        const d = 0.04;
        const overflow = 50;
        tctx.beginPath();
        tctx.moveTo(-this.size - overflow, -width / 2);
        tctx.arc(0, 0, this.size + width / 2, (1 + d) * Math.PI, (2 - d) * Math.PI);
        tctx.lineTo(this.size + overflow, -width / 2);
        tctx.stroke();
        tctx.closePath();
      }
      tctx.restore();
    }
  };
  var Pocket = _Pocket;
  __publicField(Pocket, "list", []);
  __publicField(Pocket, "cornerOffset", 12);

  // src/js/setupBalls.js
  var COLORS = {
    YELLOW: "rgb(255,215,0)",
    BLUE: "rgb(0,80,255)",
    RED: "rgb(230,10,10)",
    PURPLE: "rgb(90,0,170)",
    BLACK: "rgb(0,0,0)",
    WHITE: "rgb(210,210,210)",
    ORANGE: "rgb(255, 120, 0)",
    GREEN: "rgb(0,90,0)",
    BROWN: "rgb(150,20,0)"
  };
  var whiteBall;
  var blackBall;
  function setupBalls() {
    const step = {
      x: 33,
      y: 19
    };
    const start = {
      x: canvas.width - margin - 1 / 4 * (canvas.width - 2 * margin),
      y: 300 + margin
    };
    whiteBall = new Ball({
      pos: {
        x: margin + 1 / 4 * (canvas.width - 2 * margin),
        y: 300 + margin
      },
      color: COLORS.WHITE
    });
    new Ball({
      pos: { x: start.x, y: start.y },
      color: COLORS.YELLOW
    });
    new Ball({
      pos: { x: start.x + step.x, y: start.y - step.y },
      color: COLORS.BLUE
    });
    new Ball({
      pos: { x: start.x + step.x, y: start.y + step.y },
      color: COLORS.RED
    });
    new Ball({
      pos: { x: start.x + 2 * step.x, y: start.y - 2 * step.y },
      color: COLORS.PURPLE
    });
    new Ball({
      pos: { x: start.x + 2 * step.x, y: start.y },
      color: COLORS.ORANGE
    });
    new Ball({
      pos: { x: start.x + 2 * step.x, y: start.y + 2 * step.y },
      color: COLORS.GREEN
    });
    new Ball({
      pos: { x: start.x + 3 * step.x, y: start.y - 3 * step.y },
      color: COLORS.BROWN
    });
    blackBall = new Ball({
      pos: { x: start.x + 3 * step.x, y: start.y - 1 * step.y },
      color: COLORS.BLACK
    });
    new Ball({
      pos: { x: start.x + 3 * step.x, y: start.y + 1 * step.y },
      color: COLORS.YELLOW
    });
    new Ball({
      pos: { x: start.x + 3 * step.x, y: start.y + 3 * step.y },
      color: COLORS.BLUE
    });
    new Ball({
      pos: { x: start.x + 4 * step.x, y: start.y - 4 * step.y },
      color: COLORS.RED
    });
    new Ball({
      pos: { x: start.x + 4 * step.x, y: start.y - 2 * step.y },
      color: COLORS.PURPLE
    });
    new Ball({
      pos: { x: start.x + 4 * step.x, y: start.y },
      color: COLORS.ORANGE
    });
    new Ball({
      pos: { x: start.x + 4 * step.x, y: start.y + 2 * step.y },
      color: COLORS.GREEN
    });
    new Ball({
      pos: { x: start.x + 4 * step.x, y: start.y + 4 * step.y },
      color: COLORS.BROWN
    });
  }

  // src/js/Ball.js
  var _Ball = class {
    static updateAll() {
      if (!state.playing)
        return;
      _Ball.list.forEach((b) => b.update());
      state.idle = _Ball.list.every((b) => b.idle || b.inPocket);
      if (state.idle) {
        if (blackBall.inPocket) {
          state.won = !whiteBall.inPocket && _Ball.list.every((ball) => ball == whiteBall || ball.inPocket);
          state.playing = false;
          openDialog();
        } else if (whiteBall.inPocket) {
          whiteBall.reset();
        }
      }
    }
    static drawAll() {
      _Ball.list.forEach((b) => b.draw());
    }
    static resetAll() {
      _Ball.list.forEach((b) => b.reset());
    }
    constructor({ pos, color, vel }) {
      this.pos = pos;
      this.originalPos = { ...pos };
      this.vel = vel ?? { x: 0, y: 0 };
      this.originalVel = { ...this.vel };
      this.color = color;
      this.size = 18;
      this.friction = 0.99;
      this.inPocket = false;
      this.gradient = ctx.createRadialGradient(-0.4 * this.size, -0.4 * this.size, 1, 0, 0, this.size);
      this.gradient.addColorStop(0, "rgba(255,255,255,0.25)");
      this.gradient.addColorStop(0.4, "rgba(255,255,255,0)");
      this.gradient.addColorStop(0.7, "rgba(0,0,0,0)");
      this.gradient.addColorStop(1, "rgba(0,0,0,0.3)");
      this.alpha = 1;
      _Ball.list.push(this);
    }
    draw() {
      if (this.alpha == 0)
        return;
      if (this.inPocket) {
        this.alpha = Math.max(0, this.alpha - 0.2);
      }
      const shadowFactor = {
        x: (this.pos.x - canvas.width / 2) / canvas.width * 0.5,
        y: 0.15
      };
      ctx.save();
      ctx.globalAlpha = this.alpha;
      ctx.translate(this.pos.x, this.pos.y);
      ctx.beginPath();
      ctx.arc(this.size * shadowFactor.x, this.size * shadowFactor.y, this.size, 0, 2 * Math.PI);
      ctx.fillStyle = "rgba(0,0,0,0.15)";
      ctx.fill();
      ctx.closePath();
      ctx.beginPath();
      ctx.arc(0, 0, this.size, 0, 2 * Math.PI);
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.fillStyle = this.gradient;
      ctx.fill();
      ctx.closePath();
      ctx.restore();
    }
    get idle() {
      return this.vel.x == 0 && this.vel.y == 0;
    }
    update() {
      if (this.idle)
        return;
      this.pos.x += this.vel.x;
      this.pos.y += this.vel.y;
      this.vel.x *= this.friction;
      this.vel.y *= this.friction;
      if (this.inPocket)
        return;
      this.pushBalls();
      this.bounceOfWalls();
      this.bounceOffPolygons();
      this.handleTinyVelocity();
      this.checkPockets();
    }
    bounceOffPolygons() {
      Polygon.list.forEach((polygon) => {
        const i = polygon.intersectsWith(this);
        if (i !== false) {
          const start = polygon.coords[i];
          const end = polygon.coords[i + 1];
          const vector = sub(end, start);
          const angle = angleBetween(this.vel, vector);
          const newVel = rotate(2 * angle, this.vel);
          this.vel = newVel;
        }
      });
    }
    checkPockets() {
      Pocket.list.forEach((pocket) => {
        if (pocket.includes(this)) {
          this.inPocket = true;
          return;
        }
      });
    }
    handleTinyVelocity() {
      const tiny = 0.04;
      if (Math.abs(this.vel.x) < tiny) {
        this.vel.x = 0;
      }
      if (Math.abs(this.vel.y) < tiny) {
        this.vel.y = 0;
      }
    }
    intersects(ball) {
      return distance(this.pos, ball.pos) <= this.size + ball.size;
    }
    pushBalls() {
      _Ball.list.forEach((ball) => {
        if (ball == this || ball.inPocket)
          return;
        if (this.intersects(ball)) {
          const factor = 8e-3 * norm(this.vel);
          ball.vel.x += factor * (ball.pos.x - this.pos.x);
          ball.vel.y += factor * (ball.pos.y - this.pos.y);
          this.vel.x += factor * (this.pos.x - ball.pos.x);
          this.vel.y += factor * (this.pos.y - ball.pos.y);
        }
      });
    }
    bounceOfWalls() {
      const bounceFriction = 0.8;
      if (this.pos.x + this.size >= canvas.width - margin) {
        this.pos.x = canvas.width - this.size - margin;
        this.vel.x *= -bounceFriction;
      } else if (this.pos.x - this.size <= margin) {
        this.pos.x = this.size + margin;
        this.vel.x *= -bounceFriction;
      }
      if (this.pos.y + this.size >= canvas.height - margin) {
        this.pos.y = canvas.height - this.size - margin;
        this.vel.y *= -bounceFriction;
      } else if (this.pos.y - this.size <= margin) {
        this.pos.y = this.size + margin;
        this.vel.y *= -bounceFriction;
      }
    }
    reset() {
      this.inPocket = false;
      this.alpha = 1;
      this.pos = { ...this.originalPos };
      this.vel = { ...this.originalVel };
      if (this == whiteBall) {
        this.avoidOtherBalls();
      }
    }
    avoidOtherBalls() {
      const delta = 4;
      while (_Ball.list.some((ball) => ball != this && this.intersects(ball))) {
        const coord = randomElement(["x", "y"]);
        const sign = randomElement([1, -1]);
        this.pos[coord] += sign * delta;
      }
    }
  };
  var Ball = _Ball;
  __publicField(Ball, "list", []);

  // src/js/mouse.js
  var mouse = {
    x: 0,
    y: 0
  };
  window.addEventListener("mousemove", (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = (e.clientX - rect.left) * (canvas.width / rect.width);
    mouse.y = (e.clientY - rect.top) * (canvas.height / rect.height);
  });

  // src/js/Controller.js
  var Controller = class {
    constructor() {
      this.maxLength = 200;
      this.enableKlick();
    }
    get active() {
      return state.idle && state.playing;
    }
    enableKlick() {
      canvas.addEventListener("click", () => {
        if (!this.active)
          return;
        const factor = 0.1;
        whiteBall.vel = {
          x: factor * (mouse.x - whiteBall.pos.x),
          y: factor * (mouse.y - whiteBall.pos.y)
        };
      });
    }
    draw() {
      if (!this.active)
        return;
      ctx.save();
      ctx.lineCap = "round";
      ctx.lineWidth = 10;
      ctx.strokeStyle = "rgba(255,255,255,0.5)";
      const target = limit(sub(mouse, whiteBall.pos), this.maxLength);
      ctx.translate(whiteBall.pos.x, whiteBall.pos.y);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(target.x, target.y);
      ctx.stroke();
      ctx.closePath();
      const targetFar = scale(canvasNorm, normalize(target));
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(targetFar.x, targetFar.y);
      ctx.stroke();
      ctx.closePath();
      ctx.restore();
    }
  };

  // src/js/setupPockets.js
  function setupPockets() {
    new Pocket({
      pos: {
        x: margin + Pocket.cornerOffset,
        y: margin + Pocket.cornerOffset
      },
      type: "corner",
      rotation: 0
    });
    new Pocket({
      pos: { x: canvas.width / 2, y: margin },
      type: "edge",
      rotation: 0
    });
    new Pocket({
      pos: {
        x: canvas.width - margin - Pocket.cornerOffset,
        y: margin + Pocket.cornerOffset
      },
      type: "corner",
      rotation: 90
    });
    new Pocket({
      pos: {
        x: canvas.width - margin - Pocket.cornerOffset,
        y: canvas.height - margin - Pocket.cornerOffset
      },
      type: "corner",
      rotation: 180
    });
    new Pocket({
      pos: { x: canvas.width / 2, y: canvas.height - margin },
      type: "edge",
      rotation: 180
    });
    new Pocket({
      pos: {
        x: margin + Pocket.cornerOffset,
        y: canvas.height - margin - Pocket.cornerOffset
      },
      type: "corner",
      rotation: -90
    });
  }

  // src/js/table.js
  function drawTable() {
    drawCloth();
    drawWood();
    setupPockets();
    Pocket.drawAll();
    setupPolygons();
    Polygon.drawAll();
    Pocket.list.forEach((p) => p.drawMounting());
  }
  function drawCloth() {
    tctx.fillStyle = "rgb(26, 130, 30)";
    tctx.fillRect(0, 0, canvas.width, canvas.height);
  }
  function drawWood() {
    let gradient;
    function setupGradient() {
      gradient.addColorStop(0, "hsl(16, 76%, 15%)");
      gradient.addColorStop(1, "hsl(16, 76%, 30%)");
      tctx.fillStyle = gradient;
    }
    gradient = tctx.createRadialGradient(margin, margin, margin, margin, margin, 0);
    setupGradient();
    tctx.fillRect(0, 0, margin, margin);
    gradient = tctx.createRadialGradient(canvas.width - margin, margin, margin, canvas.width - margin, margin, 0);
    setupGradient();
    tctx.fillRect(canvas.width - margin, 0, margin, margin);
    gradient = tctx.createRadialGradient(margin, canvas.height - margin, margin, margin, canvas.height - margin, 0);
    setupGradient();
    tctx.fillRect(0, canvas.height - margin, margin, margin);
    gradient = tctx.createRadialGradient(canvas.width - margin, canvas.height - margin, margin, canvas.width - margin, canvas.height - margin, 0);
    setupGradient();
    tctx.fillRect(canvas.width - margin, canvas.height - margin, margin, margin);
    gradient = tctx.createLinearGradient(0, 0, 0, margin);
    setupGradient();
    tctx.fillRect(margin, 0, canvas.width - 2 * margin, margin);
    gradient = tctx.createLinearGradient(0, canvas.height, 0, canvas.height - margin);
    setupGradient();
    tctx.fillRect(margin, canvas.height - margin, canvas.width - 2 * margin, margin);
    gradient = tctx.createLinearGradient(0, 0, margin, 0);
    setupGradient();
    tctx.fillRect(0, margin, margin, canvas.height - 2 * margin);
    gradient = tctx.createLinearGradient(canvas.width, 0, canvas.width - margin, 0);
    setupGradient();
    tctx.fillRect(canvas.width - margin, margin, canvas.width, canvas.height - 2 * margin);
  }

  // src/js/main.js
  drawTable();
  var controller = new Controller();
  setupBalls();
  Ball.drawAll();
  function loop() {
    clearCanvas();
    Ball.updateAll();
    Ball.drawAll();
    controller.draw();
    requestAnimationFrame(loop);
  }
  loop();
  document.getElementById("restartBtn").addEventListener("click", restartGame);
  function restartGame() {
    Ball.resetAll();
    closeDialog();
    state.won = null;
    state.playing = true;
  }
})();
