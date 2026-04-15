"use client";

import { useRef, useEffect } from "react";

/* ═══════════════════════════════════════════════════════════════════════
   LaserBeam — Physics-based laser with mirror reflections
   ═══════════════════════════════════════════════════════════════════════

   A high-energy laser beam that bounces off the viewport edges like
   light reflecting between invisible mirrors. It cycles through the
   full visible spectrum with multi-layer glow, bloom, bounce flares,
   ambient mote particles, and atmospheric light bleed.

   PHYSICS   — Constant-velocity projectile with perfect specular
               reflection at all four viewport edges (including corners).
   COLOUR    — Visible spectrum (380–780 nm) via Dan Bruton's
               wavelength → RGB approximation, with smooth shifting
               over time and a colour gradient along the beam trail.
   RENDERING — Canvas 2D with additive ("lighter") blending and a
               6-pass glow stack from atmospheric haze → white-hot core.
               Long path segments are subdivided into ~40 px chunks so
               colour, opacity-fade, and shimmer vary smoothly.
   ═══════════════════════════════════════════════════════════════════════ */

// ─────────────────────────────────────────────────────────────────────
// CONFIGURATION — all the knobs in one place
// ─────────────────────────────────────────────────────────────────────

/** Beam speed as a fraction of the viewport diagonal.
 *  This keeps crossing-time consistent across screen sizes:
 *  ~5–6 s on desktop, similar proportion on mobile. */
const SPEED_K = 0.18;

/** Visible beam trail length as a fraction of the viewport diagonal.
 *  Longer = more of the reflected path visible at once. */
const TRAIL_K = 0.55;

/** Initial launch angle in degrees.
 *  33° avoids boring axis-aligned or 45° loops and creates paths
 *  that naturally sweep into corners. */
const LAUNCH_DEG = 33;

/** Seconds for one full visible-spectrum colour cycle
 *  (violet → blue → green → yellow → red → violet). */
const SPECTRUM_SEC = 10;

/** How much of the spectrum is visible along the beam at one instant.
 *  Creates a colour gradient from the tail hue to the head hue. */
const SPECTRUM_SPREAD = 0.12;

/** Shimmer oscillation rate — controls how fast the "energy flicker"
 *  travels along the beam.  Higher = faster pulse. */
const SHIMMER_HZ = 6;

/** Number of ambient light-dust motes scattered in the viewport.
 *  They glow only when the beam passes near them. */
const MOTE_COUNT = 28;

/** How long (seconds) a bounce-flare stays visible after impact. */
const FLARE_SEC = 0.45;

/** Target length (px) for path subdivision chunks.
 *  Shorter = smoother colour/shimmer gradients, more draw calls. */
const SUB_PX = 40;

/**
 * Glow stack — each entry is [lineWidth, peakAlpha].
 * Drawn widest/dimmest first; each narrower, brighter layer composites
 * on top via additive blending to build up the final glow profile:
 *
 *   L0  atmospheric haze  — barely-there wide wash of colour
 *   L1  outer bloom       — soft coloured halo
 *   L2  mid glow          — the main visible glow ring
 *   L3  inner glow        — concentrated colour band
 *   L4  bright band       — high-intensity inner light
 *   L5  white-hot core    — thin, nearly-white centre line
 */
const GLOW: [number, number][] = [
  [100, 0.012],
  [55, 0.03],
  [28, 0.065],
  [14, 0.14],
  [6, 0.4],
  [2.5, 0.9],
];

// ─────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────

interface Pt {
  x: number;
  y: number;
}

interface Flare {
  x: number;
  y: number;
  birth: number; // timestamp in seconds
}

interface Mote {
  bx: number; // base X position (0–1 fraction of viewport)
  by: number; // base Y position (0–1 fraction of viewport)
  r: number; // dot radius in px
  spd: number; // drift speed multiplier
  ph: number; // phase offset for oscillation
}

// ─────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────

export function LaserBeam() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cvs = ref.current;
    if (!cvs) return;

    // Honour the user's OS-level reduced-motion preference
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = cvs.getContext("2d", { alpha: true });
    if (!ctx) return;

    // ─── Mutable state ──────────────────────────────────────────
    let W = 0,
      H = 0; // viewport logical dimensions
    let speed = 0,
      trailLen = 0; // derived from viewport diagonal

    // Beam head position and velocity
    let hx = 0,
      hy = 0; // current head position (px)
    let vx = 0,
      vy = 0; // velocity components (px/s)

    // Waypoints: the beam's bounce history.
    //   wps[0]   = oldest visible bounce (or start point)
    //   wps[n-1] = most recent bounce
    // The beam HEAD (hx,hy) extends beyond the last waypoint along
    // the current velocity.  The drawable path is [...wps, head].
    let wps: Pt[] = [];

    let flares: Flare[] = [];
    let motes: Mote[] = [];
    let lastT = 0;
    let raf = 0;

    // ─── Canvas sizing (DPR-aware for sharp lines) ──────────────
    function resize() {
      const dpr = Math.min(devicePixelRatio || 1, 2); // cap at 2× for perf
      const r = cvs!.getBoundingClientRect();
      W = r.width;
      H = r.height;
      cvs!.width = W * dpr;
      cvs!.height = H * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Recompute speed & trail length for the new viewport
      const diag = Math.hypot(W, H);
      speed = diag * SPEED_K;
      trailLen = diag * TRAIL_K;
    }

    // ─── Initialise beam & motes ────────────────────────────────
    function init() {
      resize();

      // Start near the centre with some jitter so it doesn't look scripted
      hx = W * (0.3 + Math.random() * 0.4);
      hy = H * (0.3 + Math.random() * 0.4);

      // Launch at a non-trivial angle.  33° creates paths that
      // naturally hit corners and sweep the full viewport area.
      const a = (LAUNCH_DEG * Math.PI) / 180;
      vx = speed * Math.cos(a);
      vy = speed * Math.sin(a);

      // The start position is the first waypoint
      wps = [{ x: hx, y: hy }];
      flares = [];

      // Scatter motes randomly — they'll only glow when the beam is near
      motes = Array.from({ length: MOTE_COUNT }, () => ({
        bx: Math.random(),
        by: Math.random(),
        r: 0.4 + Math.random() * 1.5,
        spd: 0.15 + Math.random() * 0.4,
        ph: Math.random() * Math.PI * 2,
      }));

      lastT = performance.now() / 1000;
    }

    // ═════════════════════════════════════════════════════════════
    //  PHYSICS — advance beam and handle mirror reflections
    // ═════════════════════════════════════════════════════════════

    /**
     * Move the beam head forward by `dt` seconds, bouncing off any
     * viewport edges it encounters.
     *
     * Works in sub-steps: each iteration finds the nearest wall,
     * advances to it, reflects the velocity, and repeats with the
     * remaining time.  This correctly handles multiple bounces per
     * frame (e.g. corner hits) and very high frame-rate deltas.
     */
    function step(dt: number, now: number) {
      let rem = dt;

      while (rem > 1e-7) {
        // Time from current position to each wall, given velocity.
        // If velocity is zero or pointing away, time = Infinity (never hit).
        //   right wall:  (W − hx) / vx   when vx > 0
        //   left wall:   hx / (−vx)      when vx < 0
        //   bottom wall: (H − hy) / vy   when vy > 0
        //   top wall:    hy / (−vy)      when vy < 0
        const tR = vx > 0 ? (W - hx) / vx : Infinity;
        const tL = vx < 0 ? hx / -vx : Infinity;
        const tB = vy > 0 ? (H - hy) / vy : Infinity;
        const tT = vy < 0 ? hy / -vy : Infinity;

        const tw = Math.min(tR, tL, tB, tT);

        if (tw > 1e-9 && tw <= rem) {
          // ── The beam hits a wall within this sub-step ──

          // Advance head to the exact wall intersection
          hx += vx * tw;
          hy += vy * tw;
          rem -= tw;

          // Clamp to viewport bounds (floating-point safety)
          hx = Math.max(0, Math.min(W, hx));
          hy = Math.max(0, Math.min(H, hy));

          // Record this bounce as a fixed waypoint
          wps.push({ x: hx, y: hy });

          // Register a visual flare at the impact point
          flares.push({ x: hx, y: hy, birth: now });

          // Mirror reflection: flip the velocity component(s) that
          // collided.  Use a small epsilon so floating-point ties
          // (corner hits) correctly flip both axes.
          const eps = Math.max(tw * 1e-4, 1e-9);
          if (tR <= tw + eps || tL <= tw + eps) vx = -vx;
          if (tB <= tw + eps || tT <= tw + eps) vy = -vy;
        } else {
          // ── No wall within remaining time — free travel ──
          hx += vx * rem;
          hy += vy * rem;
          rem = 0;
        }
      }

      // Housekeeping
      trimTrail();
      flares = flares.filter((f) => now - f.birth < FLARE_SEC);
    }

    /**
     * Trim old waypoints so the total arc-length of the visible trail
     * (waypoints + head) stays ≤ trailLen.  We drop the oldest waypoint
     * one at a time until the length budget is met.
     */
    function trimTrail() {
      // Compute total path length including the head
      const totalLen = () => {
        let d = 0;
        for (let i = 1; i < wps.length; i++) {
          d += Math.hypot(wps[i].x - wps[i - 1].x, wps[i].y - wps[i - 1].y);
        }
        const last = wps[wps.length - 1];
        d += Math.hypot(hx - last.x, hy - last.y);
        return d;
      };

      // Keep at least one waypoint (the most recent bounce or start)
      while (wps.length > 1 && totalLen() > trailLen) {
        wps.shift();
      }
    }

    // ═════════════════════════════════════════════════════════════
    //  COLOUR — visible-light spectrum via wavelength → RGB
    // ═════════════════════════════════════════════════════════════

    /**
     * Convert a wavelength in the visible range (380–780 nm) to an
     * [R, G, B] triple (each 0–255).
     *
     * Uses Dan Bruton's piecewise-linear approximation:
     *   380–440 nm  violet   (R falls, B=1)
     *   440–490 nm  blue     (G rises, B=1)
     *   490–510 nm  cyan     (G=1, B falls)
     *   510–580 nm  green    (R rises, G=1)
     *   580–645 nm  yellow   (R=1, G falls)
     *   645–780 nm  red      (R=1)
     *
     * Includes intensity taper at the violet and deep-red extremes
     * (where human eye sensitivity drops off), plus a 15% saturation
     * boost for visual punch on dark backgrounds.
     */
    function nmRGB(nm: number): [number, number, number] {
      let r = 0,
        g = 0,
        b = 0;

      if (nm < 440) {
        r = -(nm - 440) / 60;
        b = 1;
      } else if (nm < 490) {
        g = (nm - 440) / 50;
        b = 1;
      } else if (nm < 510) {
        g = 1;
        b = -(nm - 510) / 20;
      } else if (nm < 580) {
        r = (nm - 510) / 70;
        g = 1;
      } else if (nm < 645) {
        r = 1;
        g = -(nm - 645) / 65;
      } else {
        r = 1;
      }

      // Intensity taper at spectrum edges
      let f = 1;
      if (nm < 420) f = 0.3 + (0.7 * (nm - 380)) / 40;
      else if (nm > 700) f = 0.3 + (0.7 * (780 - nm)) / 80;

      // 15% saturation boost — makes colours pop on dark backgrounds
      const k = 1.15;
      return [
        Math.min(255, r * f * k * 255) | 0,
        Math.min(255, g * f * k * 255) | 0,
        Math.min(255, b * f * k * 255) | 0,
      ];
    }

    /**
     * Get the beam colour at a given point along the trail.
     *
     * @param progress  0 = tail of the beam, 1 = head
     * @param t         animation time in seconds
     *
     * The base wavelength cycles through the full spectrum over
     * SPECTRUM_SEC.  A SPECTRUM_SPREAD offset is applied along the
     * beam so the head and tail show slightly different hues —
     * creating the "living light" gradient effect.
     */
    function bCol(progress: number, t: number): [number, number, number] {
      const base = (t % SPECTRUM_SEC) / SPECTRUM_SEC; // 0→1 cycle position
      const nm = 380 + ((base + progress * SPECTRUM_SPREAD) % 1) * 400;
      return nmRGB(nm);
    }

    // ═════════════════════════════════════════════════════════════
    //  RENDERING — multi-pass glow, flares, motes, ambient bleed
    // ═════════════════════════════════════════════════════════════

    /**
     * Build the full drawable path: all waypoints plus the current
     * beam head.  This is called once per frame and shared across
     * all drawing functions.
     */
    function getPath(): Pt[] {
      return [...wps, { x: hx, y: hy }];
    }

    /**
     * Subdivide a path into ≈SUB_PX-length chunks.
     *
     * Long straight segments (hundreds of px between bounces) would
     * each get a single colour/opacity value, making the shimmer and
     * fade look chunky.  Subdividing gives fine-grained control so
     * colour and energy variation flow smoothly along the beam.
     *
     * Returns the subdivided points, their cumulative arc-length
     * distances, and the total path length.
     */
    function subdivide(pts: Pt[]) {
      const sp: Pt[] = [];
      const sd: number[] = [];
      let cum = 0;

      for (let i = 0; i < pts.length - 1; i++) {
        const a = pts[i],
          b = pts[i + 1];
        const len = Math.hypot(b.x - a.x, b.y - a.y);
        const n = Math.max(1, Math.ceil(len / SUB_PX));

        for (let j = 0; j < n; j++) {
          const t = j / n;
          sp.push({
            x: a.x + (b.x - a.x) * t,
            y: a.y + (b.y - a.y) * t,
          });
          sd.push(cum + len * t);
        }
        cum += len;
      }

      // Always include the final point (beam head)
      sp.push(pts[pts.length - 1]);
      sd.push(cum);

      return { sp, sd, total: cum };
    }

    // ─── Draw: beam with 6-layer glow stack ─────────────────────

    /**
     * Renders the beam trail as multiple overlapping stroke passes.
     *
     * Each glow layer uses the same subdivided path but with different
     * lineWidth and alpha.  Additive blending stacks them into a
     * single luminous beam with:
     *   - Wide, barely-visible atmospheric haze
     *   - Progressively brighter, narrower bands
     *   - A thin, near-white core that sells the "concentrated light" look
     *
     * Per-segment effects:
     *   Fade:    opacity ramps from 0 (tail) to full (head) using
     *            a power curve for a natural fall-off
     *   Shimmer: a sinusoidal oscillation that travels along the beam,
     *            creating the appearance of energy flow / vibration
     *   Core:    the two thinnest layers blend toward white for an
     *            incandescent, white-hot-centre appearance
     */
    function drawBeam(t: number, path: Pt[]) {
      if (path.length < 2) return;
      const { sp, sd, total } = subdivide(path);
      if (total < 1 || sp.length < 2) return;

      ctx!.save();
      ctx!.globalCompositeOperation = "lighter";
      ctx!.lineCap = "round";
      ctx!.lineJoin = "round";

      for (const [lw, la] of GLOW) {
        // Core layers (lineWidth < 4) get blended toward white
        const isCore = lw < 4;

        for (let i = 0; i < sp.length - 1; i++) {
          // Progress: where this segment sits along the trail (0=tail, 1=head)
          const prog = (sd[i] + sd[i + 1]) / 2 / total;

          // Spectrum colour at this point
          const [r, g, b] = bCol(prog, t);

          // Fade: power curve gives a smooth, natural tail-off
          const fade = Math.pow(prog, 1.8);

          // Shimmer: a travelling sine wave of brightness that
          // makes the beam look alive with flowing energy
          const shim = 0.82 + 0.18 * Math.sin(prog * 25 + t * SHIMMER_HZ);

          const alpha = fade * la * shim;

          // Core layers blend toward white — mimics incandescent centre
          const cr = isCore ? Math.min(255, r + 200) : r;
          const cg = isCore ? Math.min(255, g + 200) : g;
          const cb = isCore ? Math.min(255, b + 200) : b;

          ctx!.strokeStyle = `rgba(${cr},${cg},${cb},${alpha.toFixed(4)})`;
          ctx!.lineWidth = lw;
          ctx!.beginPath();
          ctx!.moveTo(sp[i].x, sp[i].y);
          ctx!.lineTo(sp[i + 1].x, sp[i + 1].y);
          ctx!.stroke();
        }
      }

      // ── Beam head hotspot ──
      // A concentrated glow at the leading edge of the beam to
      // sell the idea of a focused, high-energy source.
      const head = sp[sp.length - 1];
      const [hr, hg, hb] = bCol(1, t);

      // Outer bloom: coloured halo around the head
      const bloom = ctx!.createRadialGradient(
        head.x,
        head.y,
        0,
        head.x,
        head.y,
        50
      );
      bloom.addColorStop(0, `rgba(${hr},${hg},${hb},0.35)`);
      bloom.addColorStop(0.4, `rgba(${hr},${hg},${hb},0.08)`);
      bloom.addColorStop(1, "rgba(0,0,0,0)");
      ctx!.fillStyle = bloom;
      ctx!.fillRect(head.x - 50, head.y - 50, 100, 100);

      // White-hot centre dot
      const dot = ctx!.createRadialGradient(
        head.x,
        head.y,
        0,
        head.x,
        head.y,
        6
      );
      dot.addColorStop(0, "rgba(255,255,255,0.95)");
      dot.addColorStop(0.6, `rgba(${hr},${hg},${hb},0.35)`);
      dot.addColorStop(1, "rgba(0,0,0,0)");
      ctx!.fillStyle = dot;
      ctx!.fillRect(head.x - 6, head.y - 6, 12, 12);

      ctx!.restore();
    }

    // ─── Draw: bounce flares ────────────────────────────────────

    /**
     * Renders a brief bright flash at each point where the beam
     * reflected off a wall.  Simulates the burst of scattered light
     * when a focused beam strikes a mirror surface.
     *
     * The flare:
     *   - Peaks immediately on impact (white-hot centre)
     *   - Expands outward as it fades (radius grows with age)
     *   - Decays with a quadratic fall-off for a punchy, natural look
     *   - Inherits the beam's colour at the moment of impact
     */
    function drawFlares(t: number) {
      if (!flares.length) return;

      ctx!.save();
      ctx!.globalCompositeOperation = "lighter";

      for (const f of flares) {
        const age = t - f.birth;
        const life = age / FLARE_SEC; // 0 → 1
        const intensity = (1 - life) * (1 - life); // quadratic decay
        const radius = 20 + life * 50; // expands as it fades

        const [r, g, b] = bCol(1, f.birth);

        const gr = ctx!.createRadialGradient(
          f.x,
          f.y,
          0,
          f.x,
          f.y,
          radius
        );
        gr.addColorStop(
          0,
          `rgba(255,255,255,${(intensity * 0.5).toFixed(3)})`
        );
        gr.addColorStop(
          0.25,
          `rgba(${r},${g},${b},${(intensity * 0.2).toFixed(3)})`
        );
        gr.addColorStop(1, "rgba(0,0,0,0)");

        ctx!.fillStyle = gr;
        ctx!.fillRect(f.x - radius, f.y - radius, radius * 2, radius * 2);
      }

      ctx!.restore();
    }

    // ─── Draw: ambient light motes ──────────────────────────────

    /**
     * Tiny dust-like particles scattered across the viewport that
     * glow faintly when the beam passes near them.
     *
     * This simulates photon scattering through particulate in the air
     * — motes that are far from the beam are invisible, but those
     * within ~180 px of the beam path light up and twinkle.
     *
     * Each mote:
     *   - Has a fixed base position with gentle floating oscillation
     *   - Twinkles (pulsing brightness) independently
     *   - Brightness scales with proximity to the nearest beam segment
     *   - Uses the beam's current spectrum colour
     */
    function drawMotes(t: number, path: Pt[]) {
      ctx!.save();
      ctx!.globalCompositeOperation = "lighter";

      const [mr, mg, mb] = bCol(0.85, t);

      for (const m of motes) {
        // Gentle floating oscillation around the base position
        const mx = m.bx * W + Math.sin(t * m.spd + m.ph) * 25;
        const my = m.by * H + Math.cos(t * m.spd * 0.7 + m.ph) * 18;

        // Independent twinkle (cubic easing for sparkle-like pulses)
        const twinkle =
          0.2 + 0.8 * Math.pow(Math.sin(t * 1.8 + m.ph) * 0.5 + 0.5, 3);

        // Find the closest point on the beam path to this mote.
        // Only check the last ~6 segments for performance — the
        // recent path is what matters visually.
        let best = 1e9;
        const start = Math.max(0, path.length - 6);
        for (let i = start; i < path.length - 1; i++) {
          const a = path[i],
            b = path[i + 1];
          const dx = b.x - a.x,
            dy = b.y - a.y;
          const lenSq = dx * dx + dy * dy;
          if (lenSq < 1) continue;

          // Project the mote onto the segment, clamped to [0,1]
          const u = Math.max(
            0,
            Math.min(1, ((mx - a.x) * dx + (my - a.y) * dy) / lenSq)
          );
          const d = Math.hypot(mx - (a.x + u * dx), my - (a.y + u * dy));
          if (d < best) best = d;
        }

        // Smooth proximity fade: full brightness at beam → zero at 180 px
        const prox = Math.max(0, 1 - best / 180);
        if (prox < 0.01) continue; // skip invisible motes

        const alpha = twinkle * prox * 0.4;
        ctx!.fillStyle = `rgba(${mr},${mg},${mb},${alpha.toFixed(3)})`;
        ctx!.beginPath();
        ctx!.arc(mx, my, m.r, 0, Math.PI * 2);
        ctx!.fill();
      }

      ctx!.restore();
    }

    // ─── Draw: ambient light bleed ──────────────────────────────

    /**
     * A very large, very faint radial glow centred on the beam head.
     * Simulates the beam softly illuminating the surrounding space —
     * gives the entire scene a sense of atmosphere and makes the beam
     * feel like it's casting real light into the environment.
     */
    function drawBleed(t: number, path: Pt[]) {
      if (path.length < 2) return;
      const head = path[path.length - 1];
      const [r, g, b] = bCol(1, t);
      const radius = Math.max(W, H) * 0.3;

      ctx!.save();
      ctx!.globalCompositeOperation = "lighter";

      const gr = ctx!.createRadialGradient(
        head.x,
        head.y,
        0,
        head.x,
        head.y,
        radius
      );
      gr.addColorStop(0, `rgba(${r},${g},${b},0.035)`);
      gr.addColorStop(0.4, `rgba(${r},${g},${b},0.012)`);
      gr.addColorStop(1, "rgba(0,0,0,0)");

      ctx!.fillStyle = gr;
      ctx!.fillRect(
        head.x - radius,
        head.y - radius,
        radius * 2,
        radius * 2
      );

      ctx!.restore();
    }

    // ═════════════════════════════════════════════════════════════
    //  MAIN ANIMATION LOOP
    // ═════════════════════════════════════════════════════════════

    function loop(ts: number) {
      const t = ts / 1000;
      // Cap delta at 50 ms to prevent physics explosion after a long
      // tab-away (the beam would teleport across the screen otherwise)
      const dt = Math.min(t - lastT, 0.05);
      lastT = t;

      // Clear the canvas (fully transparent — no residual trails)
      ctx!.clearRect(0, 0, W, H);

      // 1. Advance the beam physics (move head, handle bounces)
      step(dt, t);

      // 2. Build the drawable path once for all renderers
      const path = getPath();

      // 3. Render layers back-to-front:
      //    ambient bleed → beam glow stack → bounce flares → motes
      drawBleed(t, path);
      drawBeam(t, path);
      drawFlares(t);
      drawMotes(t, path);

      raf = requestAnimationFrame(loop);
    }

    // ═════════════════════════════════════════════════════════════
    //  LIFECYCLE — init, resize handling, cleanup
    // ═════════════════════════════════════════════════════════════

    init();
    raf = requestAnimationFrame(loop);

    /**
     * On resize: scale beam position, waypoints, and velocity to the
     * new viewport proportionally so the animation doesn't "jump".
     */
    function onResize() {
      const ow = W,
        oh = H;
      resize();

      if (ow > 0 && oh > 0) {
        // Proportional scaling of all positions
        const sx = W / ow,
          sy = H / oh;
        hx *= sx;
        hy *= sy;
        for (const p of wps) {
          p.x *= sx;
          p.y *= sy;
        }
        for (const f of flares) {
          f.x *= sx;
          f.y *= sy;
        }

        // Preserve beam direction but update to new speed
        const ang = Math.atan2(vy, vx);
        vx = speed * Math.cos(ang);
        vy = speed * Math.sin(ang);
      }

      // Redistribute motes across the new viewport
      for (const m of motes) {
        m.bx = Math.random();
        m.by = Math.random();
      }
    }

    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
}
