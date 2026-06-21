// Displacement-map math adapted from:
//   - https://github.com/shuding/liquid-glass (original shader fragment)
//   - https://github.com/rdev/liquid-glass-react (MIT) — canvas-based displacement generator
// Both sources are MIT licensed; this is a derivative implementation reshaped
// to plug into PanaUI's glass token system.

export interface Vec2 {
  x: number;
  y: number;
}

export interface ShaderOptions {
  width: number;
  height: number;
  /** Corner radius in px, used to shape the displacement bulge to match the element's visual rounding. */
  cornerRadius: number;
  mousePosition?: Vec2;
}

function smoothStep(a: number, b: number, t: number): number {
  t = Math.max(0, Math.min(1, (t - a) / (b - a)));
  return t * t * (3 - 2 * t);
}

function length(x: number, y: number): number {
  return Math.sqrt(x * x + y * y);
}

function roundedRectSDF(
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
): number {
  const qx = Math.abs(x) - width + radius;
  const qy = Math.abs(y) - height + radius;
  return Math.min(Math.max(qx, qy), 0) + length(Math.max(qx, 0), Math.max(qy, 0)) - radius;
}

function texture(x: number, y: number): Vec2 {
  return { x, y };
}

/**
 * The liquid-glass edge-bulge fragment, in normalized UV space (0–1).
 * `radiusRatio` is the corner radius expressed as a fraction of the
 * shorter dimension, so the bulge shape tracks the element's actual
 * `cornerRadius` prop instead of a fixed ratio.
 */
function liquidGlassFragment(uv: Vec2, radiusRatio: number): Vec2 {
  const ix = uv.x - 0.5;
  const iy = uv.y - 0.5;
  const distanceToEdge = roundedRectSDF(ix, iy, 0.18, 0.12, radiusRatio);
  const displacement = smoothStep(0.7, 0, distanceToEdge - 0.1);
  const scaled = smoothStep(0, 1, displacement);
  return texture(ix * scaled + 0.5, iy * scaled + 0.5);
}

/**
 * Renders the displacement map for the liquid-glass effect to an offscreen
 * canvas and returns it as a data URL, consumable by an SVG `feImage`.
 * Red/green channels encode X/Y displacement; blue duplicates green for
 * compatibility with the chromatic-aberration filter chain (xChannelSelector
 * "R", yChannelSelector "B").
 */
export class ShaderDisplacementGenerator {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;

  constructor(private options: ShaderOptions) {
    this.canvas = document.createElement("canvas");
    this.canvas.width = options.width;
    this.canvas.height = options.height;
    this.canvas.style.display = "none";

    const context = this.canvas.getContext("2d");
    if (!context) {
      throw new Error("Could not get 2D context");
    }
    this.context = context;
  }

  updateShader(): string {
    const { width: w, height: h, cornerRadius } = this.options;
    const radiusRatio = cornerRadius / (2 * Math.min(w, h));

    let maxScale = 0;
    const rawValues: number[] = [];

    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const uv: Vec2 = { x: x / w, y: y / h };

        const pos = liquidGlassFragment(uv, radiusRatio);
        const dx = pos.x * w - x;
        const dy = pos.y * h - y;

        maxScale = Math.max(maxScale, Math.abs(dx), Math.abs(dy));
        rawValues.push(dx, dy);
      }
    }

    maxScale = maxScale > 0 ? Math.max(maxScale, 1) : 1;

    const imageData = this.context.createImageData(w, h);
    const data = imageData.data;

    let rawIndex = 0;
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const dx = rawValues[rawIndex++] ?? 0;
        const dy = rawValues[rawIndex++] ?? 0;

        // Smooth displacement near the canvas edge to avoid hard seams.
        const edgeDistance = Math.min(x, y, w - x - 1, h - y - 1);
        const edgeFactor = Math.min(1, edgeDistance / 2);

        const smoothedDx = dx * edgeFactor;
        const smoothedDy = dy * edgeFactor;

        const r = smoothedDx / maxScale + 0.5;
        const g = smoothedDy / maxScale + 0.5;

        const pixelIndex = (y * w + x) * 4;
        data[pixelIndex] = Math.max(0, Math.min(255, r * 255));
        data[pixelIndex + 1] = Math.max(0, Math.min(255, g * 255));
        data[pixelIndex + 2] = Math.max(0, Math.min(255, g * 255));
        data[pixelIndex + 3] = 255;
      }
    }

    this.context.putImageData(imageData, 0, 0);
    return this.canvas.toDataURL();
  }

  destroy(): void {
    this.canvas.remove();
  }
}
