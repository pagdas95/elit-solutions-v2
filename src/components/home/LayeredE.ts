/**
 * The 3D layered E, drawn in code on a 2D canvas (no video, no 3D files).
 * Ported 1:1 from the approved "3D layered E — loop prototype" board.
 *
 * One 9-second loop, three phases of 3s each:
 *   0 Plan        – the three layers lift apart
 *   1 Build       – they slide home, bottom layer first
 *   2 Look after  – assembled, glowing
 */

export type DragState = { yaw: number; pitch: number };

const LAYERS: { c: [number, number, number]; p: [number, number][] }[] = [
  { c: [34, 211, 238], p: [[0, 38], [63.5, 0], [100, 21], [72.5, 37], [63, 31.5], [0, 68]] },
  { c: [59, 130, 246], p: [[0.5, 83], [65, 45.5], [93.5, 61.75], [13, 109], [0.5, 101.75]] },
  { c: [139, 92, 246], p: [[15, 110.5], [41.75, 95], [49.25, 99.5], [71.75, 86.25], [100, 103], [50.5, 131.75]] },
];

type V3 = [number, number, number];
type Face = { v: V3[]; n: V3; col: [number, number, number]; kind: "f" | "b" | "s"; z?: number };

const ease = (x: number) => {
  x = Math.max(0, Math.min(1, x));
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
};

export const LOOP_SECONDS = 9;

export function drawLayeredE(
  cv: HTMLCanvasElement,
  t: number,
  drag: DragState,
  opts: { explode?: number; depth?: number } = {},
) {
  const w = cv.clientWidth || 560;
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  if (cv.width !== Math.round(w * dpr)) {
    cv.width = Math.round(w * dpr);
    cv.height = Math.round(w * dpr);
  }
  const ctx = cv.getContext("2d");
  if (!ctx) return;
  const k = (w * dpr) / 600; // laid out in a 600 x 600 space
  ctx.setTransform(k, 0, 0, k, 0, 0);
  ctx.clearRect(0, 0, 600, 600);
  const T = t % LOOP_SECONDS;
  const TAU = Math.PI * 2;

  // ---- ring, nodes and the orbiting dot with a short trail
  ctx.lineWidth = 2;
  ctx.strokeStyle = "#1F2633";
  ctx.beginPath();
  ctx.arc(300, 300, 230, 0, TAU);
  ctx.stroke();
  const nodes = [-90, 30, 150];
  for (let n = 0; n < 3; n++) {
    const a = (nodes[n] * Math.PI) / 180;
    const on = n === Math.floor(T / 3);
    ctx.fillStyle = on ? "#38E8FF" : "#283245";
    ctx.beginPath();
    ctx.arc(300 + 230 * Math.cos(a), 300 + 230 * Math.sin(a), on ? 6 : 5, 0, TAU);
    ctx.fill();
  }
  const ang = -Math.PI / 2 + (T / LOOP_SECONDS) * TAU;
  for (let j = 14; j >= 0; j--) {
    const aj = ang - j * 0.035;
    ctx.fillStyle = `rgba(56,232,255,${(j === 0 ? 1 : 0.5 * (1 - j / 15)).toFixed(3)})`;
    ctx.beginPath();
    ctx.arc(300 + 230 * Math.cos(aj), 300 + 230 * Math.sin(aj), j === 0 ? 5 : 3.2, 0, TAU);
    ctx.fill();
  }

  // ---- the layered E
  const X = opts.explode ?? 1;
  const D = opts.depth ?? 28;
  const sepFor = (i: number) => {
    if (T < 0.9) return ease(T / 0.9);
    if (T < 3) return 1;
    if (T < 5.2) return 1 - ease((T - 3 - (2 - i) * 0.32) / 1.3);
    return 0;
  };
  const glow = T >= 6 ? Math.sin(((T - 6) / 3) * Math.PI) : 0;
  const yaw = Math.sin((t / LOOP_SECONDS) * TAU) * 0.7 + drag.yaw;
  const pitch = -0.3 + Math.sin(t * 0.6) * 0.04 + drag.pitch;
  const cy = Math.cos(yaw), sy = Math.sin(yaw), cp = Math.cos(pitch), sp = Math.sin(pitch);
  const S = 2.05, CAM = 900;
  let light: V3 = [-0.45, -0.65, 0.62];
  const ll = Math.hypot(...light);
  light = light.map((v) => v / ll) as V3;
  const rot = (x: number, y: number, z: number): V3 => {
    const x1 = x * cy + z * sy, z1 = -x * sy + z * cy;
    return [x1, y * cp - z1 * sp, y * sp + z1 * cp];
  };
  const proj = (v: V3) => {
    const f = CAM / (CAM - v[2]);
    return [300 + v[0] * f, 300 + v[1] * f];
  };

  const faces: Face[] = [];
  for (let li = 0; li < 3; li++) {
    const s = sepFor(li) * X, off = li - 1;
    const dy = off * 50 * s, dz = -off * 95 * s, bob = Math.sin(t * 1.7 + li) * 4 * s;
    const pts = LAYERS[li].p.map((q) => [(q[0] - 50) * S, (q[1] - 66) * S + dy + bob]);
    let area = 0;
    for (let q = 0; q < pts.length; q++) {
      const A = pts[q], B = pts[(q + 1) % pts.length];
      area += A[0] * B[1] - B[0] * A[1];
    }
    const sign = area > 0 ? 1 : -1;
    const front = pts.map((q) => rot(q[0], q[1], dz + D / 2));
    const back = pts.map((q) => rot(q[0], q[1], dz - D / 2));
    const col = LAYERS[li].c;
    faces.push({ v: back, n: rot(0, 0, -1), col, kind: "b" });
    faces.push({ v: front, n: rot(0, 0, 1), col, kind: "f" });
    for (let e = 0; e < pts.length; e++) {
      const a0 = pts[e], a1 = pts[(e + 1) % pts.length];
      const ex = a1[0] - a0[0], ey = a1[1] - a0[1], el = Math.hypot(ex, ey) || 1;
      const nx = (sign * ey) / el, ny = (-sign * ex) / el;
      const e1 = (e + 1) % pts.length;
      faces.push({ v: [front[e], front[e1], back[e1], back[e]], n: rot(nx, ny, 0), col, kind: "s" });
    }
  }

  const vis: Face[] = [];
  for (const fc of faces) {
    const c = [0, 0, 0];
    for (const p of fc.v) { c[0] += p[0]; c[1] += p[1]; c[2] += p[2]; }
    const L = fc.v.length;
    const cx = c[0] / L, cyy = c[1] / L, cz = c[2] / L;
    const dot = fc.n[0] * -cx + fc.n[1] * -cyy + fc.n[2] * (CAM - cz);
    if (dot <= 0) continue;
    fc.z = cz;
    vis.push(fc);
  }
  vis.sort((a, b) => (a.z ?? 0) - (b.z ?? 0));

  for (const fc of vis) {
    const lam = Math.max(0, fc.n[0] * light[0] + fc.n[1] * light[1] + fc.n[2] * light[2]);
    const b = fc.kind === "f" ? 0.78 + 0.32 * lam : 0.28 + 0.5 * lam;
    const col = fc.col.map((x) => Math.min(255, Math.round(x * b)));
    const P = fc.v.map(proj);
    ctx.beginPath();
    ctx.moveTo(P[0][0], P[0][1]);
    for (let pi = 1; pi < P.length; pi++) ctx.lineTo(P[pi][0], P[pi][1]);
    ctx.closePath();
    if (fc.kind === "f" && glow > 0.01) {
      ctx.shadowColor = `rgba(56,232,255,${(0.55 * glow).toFixed(3)})`;
      ctx.shadowBlur = 34 * glow;
    }
    ctx.fillStyle = `rgb(${col.join(",")})`;
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.lineJoin = "round";
    ctx.lineWidth = 1;
    ctx.strokeStyle = fc.kind === "f" ? "rgba(255,255,255,0.22)" : "rgba(5,7,13,0.35)";
    ctx.stroke();
  }
}
