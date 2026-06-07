// ─── Backdrop Distortion ─────────────────────────────────────────────────────

export interface GlassBackdrop {
  /** CSS length applied to blur() — e.g. "12px" */
  blur: string;
  /** Multiplier for saturate() — 1 = 100%, 1.8 = 180% */
  saturate: number;
  /** Multiplier for brightness() — 1 = 100%, 1.1 = 110% */
  brightness: number;
  /** Optional hue-rotate angle — e.g. "5deg" */
  hueRotate?: string;
  /** Optional contrast multiplier — e.g. 1.05 */
  contrast?: number;
}

// ─── Surface Fill & Material ──────────────────────────────────────────────────

export interface GlassSurface {
  /** Base fill color including alpha — use rgba() or oklch() with alpha */
  fillColor: string;
  /** Optional shimmer/gradient overlay — CSS gradient string */
  gradient?: string;
  /** Opacity of an SVG noise texture overlay (0–1). Reserved for future use. */
  noiseOpacity?: number;
}

// ─── Edge, Border & Specular ──────────────────────────────────────────────────

export interface GlassBorder {
  /** Border color including alpha — rgba() */
  color: string;
  /** Border width — e.g. "1px" */
  width: string;
  /** Specular top-left edge highlight color */
  highlightColor: string;
  /** Specular highlight border width */
  highlightWidth: string;
}

// ─── Shadow & Depth ───────────────────────────────────────────────────────────

export interface GlassShadow {
  /** Outer drop-shadow CSS value */
  outer: string;
  /** Optional inset depth shadow */
  inner?: string;
  /** Optional inset specular top highlight */
  specular?: string;
}

// ─── Focus Ring (WAI-ARIA 2.4.11 — minimum 2px width required) ───────────────

export interface GlassFocus {
  /** Ring color — must contrast ≥3:1 against the glass surface */
  ringColor: string;
  /** Ring width — minimum "2px" per WCAG 2.4.11 */
  ringWidth: string;
  /** Offset between element edge and ring */
  ringOffset: string;
  /** Color of the gap between element and ring */
  ringOffsetColor: string;
}

// ─── Motion ───────────────────────────────────────────────────────────────────

export interface GlassMotion {
  /** Default transition duration */
  transitionDuration: string;
  /** Reduced blur value applied when prefers-reduced-motion is active */
  reducedBlur: string;
}

// ─── Master Profile Interface ─────────────────────────────────────────────────
// Implement this interface to create a fully custom glass profile.
// Built-in profiles are color-agnostic — semantic color tinting is handled
// at the component level via variant × glass compound styles.

export interface GlassProfile {
  backdrop: GlassBackdrop;
  surface: GlassSurface;
  border: GlassBorder;
  shadow: GlassShadow;
  focus: GlassFocus;
  motion: GlassMotion;
}

// ─── Built-in Profiles ───────────────────────────────────────────────────────

/** iOS-style light frosted glass. Moderate blur, white tint. */
export const frostedGlass: GlassProfile = {
  backdrop: {
    blur: "12px",
    saturate: 1.8,
    brightness: 1.1,
  },
  surface: {
    fillColor: "rgba(255, 255, 255, 0.10)",
  },
  border: {
    color: "rgba(255, 255, 255, 0.28)",
    width: "1px",
    highlightColor: "rgba(255, 255, 255, 0.50)",
    highlightWidth: "1px",
  },
  shadow: {
    outer: "0 4px 16px rgba(0, 0, 0, 0.12)",
    specular: "inset 0 1px 0 rgba(255, 255, 255, 0.40)",
  },
  focus: {
    ringColor: "rgba(255, 255, 255, 0.80)",
    ringWidth: "2px",
    ringOffset: "2px",
    ringOffsetColor: "transparent",
  },
  motion: {
    transitionDuration: "200ms",
    reducedBlur: "2px",
  },
};

/** Apple Liquid Glass-inspired. High blur, shimmer gradient, near-transparent fill. */
export const liquidGlass: GlassProfile = {
  backdrop: {
    blur: "20px",
    saturate: 2.2,
    brightness: 1.15,
  },
  surface: {
    fillColor: "rgba(255, 255, 255, 0.05)",
    gradient: "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.03) 100%)",
  },
  border: {
    color: "rgba(255, 255, 255, 0.35)",
    width: "1px",
    highlightColor: "rgba(255, 255, 255, 0.60)",
    highlightWidth: "1px",
  },
  shadow: {
    outer: "0 8px 32px rgba(0, 0, 0, 0.16), 0 2px 8px rgba(0, 0, 0, 0.08)",
    specular: "inset 0 1px 0 rgba(255, 255, 255, 0.50)",
  },
  focus: {
    ringColor: "rgba(255, 255, 255, 0.90)",
    ringWidth: "2px",
    ringOffset: "2px",
    ringOffsetColor: "transparent",
  },
  motion: {
    transitionDuration: "300ms",
    reducedBlur: "2px",
  },
};

/** Dark-mode glass. Deep blur, dark fill, subtle specular. */
export const darkGlass: GlassProfile = {
  backdrop: {
    blur: "16px",
    saturate: 1.4,
    brightness: 0.8,
  },
  surface: {
    fillColor: "rgba(0, 0, 0, 0.30)",
  },
  border: {
    color: "rgba(255, 255, 255, 0.08)",
    width: "1px",
    highlightColor: "rgba(255, 255, 255, 0.15)",
    highlightWidth: "1px",
  },
  shadow: {
    outer: "0 4px 24px rgba(0, 0, 0, 0.30)",
    specular: "inset 0 1px 0 rgba(255, 255, 255, 0.15)",
  },
  focus: {
    ringColor: "rgba(255, 255, 255, 0.80)",
    ringWidth: "2px",
    ringOffset: "2px",
    ringOffsetColor: "transparent",
  },
  motion: {
    transitionDuration: "200ms",
    reducedBlur: "2px",
  },
};

/** Lightly tinted glass. Semantic color tint dominates. Subtle blur. */
export const tintedGlass: GlassProfile = {
  backdrop: {
    blur: "10px",
    saturate: 1.6,
    brightness: 1.05,
  },
  surface: {
    fillColor: "rgba(255, 255, 255, 0.10)",
  },
  border: {
    color: "rgba(255, 255, 255, 0.20)",
    width: "1px",
    highlightColor: "rgba(255, 255, 255, 0.35)",
    highlightWidth: "1px",
  },
  shadow: {
    outer: "0 2px 12px rgba(0, 0, 0, 0.10)",
    specular: "inset 0 1px 0 rgba(255, 255, 255, 0.35)",
  },
  focus: {
    ringColor: "#3b82f6",
    ringWidth: "2px",
    ringOffset: "2px",
    ringOffsetColor: "transparent",
  },
  motion: {
    transitionDuration: "150ms",
    reducedBlur: "2px",
  },
};

// ─── Profile Registry ────────────────────────────────────────────────────────

export type GlassProfileName = "frosted" | "liquid" | "dark" | "tinted";

export const glassProfiles: Record<GlassProfileName, GlassProfile> = {
  frosted: frostedGlass,
  liquid: liquidGlass,
  dark: darkGlass,
  tinted: tintedGlass,
};
