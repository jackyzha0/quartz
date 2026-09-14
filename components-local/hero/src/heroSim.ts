/**
 * The hero canvas simulation, delivered as the component's afterDOMLoaded script.
 * An oscillator bank (SBF-flavoured): neurons with individual natural frequencies
 * advance phase; on threshold crossing they spike, flash, and nudge their nearest
 * neighbours. Autonomous on load; hover excites, click/drag injects a burst.
 * Reduced-motion users get a single settled static frame instead of the loop.
 *
 * Plain JS in a string — no template literals inside (it is itself template-literalised).
 */
export default `(function () {
  var canvas = document.getElementById("hero-canvas");
  if (!canvas || !canvas.getContext) return;
  var ctx = canvas.getContext("2d");
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var N = 160;
  var K = 3;
  var W = 0;
  var H = 0;
  var neurons = [];
  var pointer = { x: -1e4, y: -1e4 };
  var onscreen = true;
  var col = { sec: "#284b63", ter: "#84a59d" };

  function readColors() {
    var cs = getComputedStyle(document.documentElement);
    var sec = cs.getPropertyValue("--secondary").trim();
    var ter = cs.getPropertyValue("--tertiary").trim();
    if (sec) col.sec = sec;
    if (ter) col.ter = ter;
  }

  function resize() {
    var r = canvas.getBoundingClientRect();
    W = Math.max(1, r.width);
    H = Math.max(1, r.height);
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function init() {
    neurons = [];
    for (var i = 0; i < N; i++) {
      neurons.push({
        x: Math.random(),
        y: Math.random(),
        f: 0.5 + Math.random() * 1.4,
        p: Math.random() * Math.PI * 2,
        s: 0,
        nb: []
      });
    }
    for (var a = 0; a < N; a++) {
      var dists = [];
      for (var b = 0; b < N; b++) {
        if (a === b) continue;
        var dx = neurons[a].x - neurons[b].x;
        var dy = neurons[a].y - neurons[b].y;
        dists.push([dx * dx + dy * dy, b]);
      }
      dists.sort(function (u, v) { return u[0] - v[0]; });
      for (var k = 0; k < K; k++) neurons[a].nb.push(dists[k][1]);
    }
  }

  function step(dt) {
    for (var i = 0; i < N; i++) {
      var n = neurons[i];
      n.p += n.f * dt * Math.PI * 2 * 0.55;
      var dx = n.x * W - pointer.x;
      var dy = n.y * H - pointer.y;
      var r2 = dx * dx + dy * dy;
      if (r2 < 12000) n.p += dt * 16 * (1 - r2 / 12000);
      if (n.p >= Math.PI * 2) {
        n.p -= Math.PI * 2;
        n.s = 1;
        for (var k = 0; k < n.nb.length; k++) neurons[n.nb[k]].p += 0.35;
      }
      n.s *= 0.90;
    }
  }

  function burst(x, y) {
    for (var i = 0; i < N; i++) {
      var n = neurons[i];
      var dx = n.x * W - x;
      var dy = n.y * H - y;
      if (dx * dx + dy * dy < 20000) n.s = 1;
    }
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    ctx.lineWidth = 1;
    for (var i = 0; i < N; i++) {
      var n = neurons[i];
      for (var k = 0; k < n.nb.length; k++) {
        var m = neurons[n.nb[k]];
        ctx.strokeStyle = col.sec;
        ctx.globalAlpha = 0.05 + 0.22 * Math.max(n.s, m.s);
        ctx.beginPath();
        ctx.moveTo(n.x * W, n.y * H);
        ctx.lineTo(m.x * W, m.y * H);
        ctx.stroke();
      }
    }
    for (var j = 0; j < N; j++) {
      var q = neurons[j];
      var x = q.x * W;
      var y = q.y * H;
      ctx.globalAlpha = 0.55;
      ctx.fillStyle = col.sec;
      ctx.beginPath();
      ctx.arc(x, y, 2, 0, Math.PI * 2);
      ctx.fill();
      if (q.s > 0.03) {
        ctx.globalAlpha = q.s * 0.9;
        ctx.fillStyle = col.ter;
        ctx.beginPath();
        ctx.arc(x, y, 2 + 6 * (1 - q.s), 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = q.s * 0.32;
        ctx.strokeStyle = col.ter;
        ctx.beginPath();
        ctx.arc(x, y, 3 + 14 * (1 - q.s), 0, Math.PI * 2);
        ctx.stroke();
      }
    }
    ctx.globalAlpha = 1;
  }

  var last = 0;
  function frame(t) {
    if (!document.body.contains(canvas)) return;
    var dt = Math.min(0.05, (t - last) / 1000 || 0.016);
    last = t;
    if (onscreen && document.visibilityState === "visible") {
      step(dt);
      draw();
    }
    requestAnimationFrame(frame);
  }

  canvas.addEventListener("pointermove", function (e) {
    var r = canvas.getBoundingClientRect();
    pointer.x = e.clientX - r.left;
    pointer.y = e.clientY - r.top;
  });
  canvas.addEventListener("pointerleave", function () {
    pointer.x = -1e4;
    pointer.y = -1e4;
  });
  canvas.addEventListener("pointerdown", function (e) {
    var r = canvas.getBoundingClientRect();
    burst(e.clientX - r.left, e.clientY - r.top);
  });

  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (entries) {
      onscreen = entries[0].isIntersecting;
    }, { threshold: 0.05 }).observe(canvas);
  }

  document.addEventListener("themechange", readColors);
  window.addEventListener("resize", function () {
    resize();
    if (reduced) draw();
  });

  readColors();
  resize();
  init();

  if (reduced) {
    for (var s = 0; s < 240; s++) step(0.016);
    draw();
  } else {
    requestAnimationFrame(frame);
  }
})();`
