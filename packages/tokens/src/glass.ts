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
  /** Optional inner border color for double-border "inward bleed" effect */
  innerColor?: string;
  /** Optional inner border width — defaults to same as outer border width */
  innerWidth?: string;
  /** Optional inner border gradient for beveled glass edge effect */
  innerGradient?: string;
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

/** iOS-style frosted glass with light/dark mode variants. Moderate blur, adaptive tint. */
export const frostedGlass = {
  light: {
    backdrop: {
      blur: "12px",
      saturate: 1.8,
      brightness: 1.1,
    },
    surface: {
      fillColor: "rgba(255, 255, 255, 0.10)",
    },
    border: {
      color: "rgba(255, 255, 255, 0.40)", // Enhanced from 0.28 for better visibility
      width: "1px",
      highlightColor: "rgba(255, 255, 255, 0.50)",
      highlightWidth: "1px",
      innerColor: "rgba(255, 255, 255, 0.15)",
      innerWidth: "1px",
      innerGradient: "linear-gradient(180deg, rgba(255,255,255,0.2) 0%, transparent 50%)",
    },
    shadow: {
      outer: "0 4px 16px rgba(0, 0, 0, 0.18)", // Enhanced from 0.12 for better depth
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
  } as GlassProfile,
  dark: {
    backdrop: {
      blur: "16px",
      saturate: 1.4,
      brightness: 0.8, // Darkens backdrop
    },
    surface: {
      fillColor: "rgba(0, 0, 0, 0.30)",
    },
    border: {
      color: "rgba(255, 255, 255, 0.12)", // Enhanced from 0.08 for consistency
      width: "1px",
      highlightColor: "rgba(255, 255, 255, 0.15)",
      highlightWidth: "1px",
      innerColor: "rgba(255, 255, 255, 0.08)",
      innerWidth: "1px",
      innerGradient: "linear-gradient(180deg, rgba(255,255,255,0.12) 0%, transparent 50%)",
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
  } as GlassProfile,
};

/** Apple Liquid Glass-inspired with light/dark variants. High blur, shimmer gradient, near-transparent fill. */
export const liquidGlass = {
  light: {
    backdrop: {
      blur: "20px", // Strongest blur
      saturate: 2.2,
      brightness: 1.15,
    },
    surface: {
      fillColor: "rgba(255, 255, 255, 0.05)",
      gradient: "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.03) 100%)",
    },
    border: {
      color: "rgba(255, 255, 255, 0.50)", // Enhanced from 0.35 for better visibility
      width: "1px",
      highlightColor: "rgba(255, 255, 255, 0.60)",
      highlightWidth: "1px",
      innerColor: "rgba(255, 255, 255, 0.18)",
      innerWidth: "1px",
      innerGradient: "linear-gradient(180deg, rgba(255,255,255,0.25) 0%, transparent 50%)",
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
  } as GlassProfile,
  dark: {
    backdrop: {
      blur: "20px", // Maintains strongest blur
      saturate: 1.8,
      brightness: 0.85,
    },
    surface: {
      fillColor: "rgba(0, 0, 0, 0.25)",
      gradient: "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)",
    },
    border: {
      color: "rgba(255, 255, 255, 0.18)",
      width: "1px",
      highlightColor: "rgba(255, 255, 255, 0.25)",
      highlightWidth: "1px",
      innerColor: "rgba(255, 255, 255, 0.10)",
      innerWidth: "1px",
      innerGradient: "linear-gradient(180deg, rgba(255,255,255,0.15) 0%, transparent 50%)",
    },
    shadow: {
      outer: "0 8px 32px rgba(0, 0, 0, 0.40), 0 2px 8px rgba(0, 0, 0, 0.16)",
      specular: "inset 0 1px 0 rgba(255, 255, 255, 0.20)",
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
  } as GlassProfile,
};

/** Lightly tinted glass with light/dark variants. Semantic color tint dominates. */
export const tintedGlass = {
  light: {
    backdrop: {
      blur: "12px", // Enhanced from 10px for better visibility
      saturate: 1.6,
      brightness: 1.05,
    },
    surface: {
      fillColor: "rgba(255, 255, 255, 0.10)",
    },
    border: {
      color: "rgba(255, 255, 255, 0.32)", // Enhanced from 0.20 for better visibility
      width: "1px",
      highlightColor: "rgba(255, 255, 255, 0.35)",
      highlightWidth: "1px",
      innerColor: "rgba(255, 255, 255, 0.12)",
      innerWidth: "1px",
      innerGradient: "linear-gradient(180deg, rgba(255,255,255,0.18) 0%, transparent 50%)",
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
  } as GlassProfile,
  dark: {
    backdrop: {
      blur: "12px",
      saturate: 1.4,
      brightness: 0.9,
    },
    surface: {
      fillColor: "rgba(0, 0, 0, 0.20)",
    },
    border: {
      color: "rgba(255, 255, 255, 0.15)",
      width: "1px",
      highlightColor: "rgba(255, 255, 255, 0.20)",
      highlightWidth: "1px",
      innerColor: "rgba(255, 255, 255, 0.08)",
      innerWidth: "1px",
      innerGradient: "linear-gradient(180deg, rgba(255,255,255,0.12) 0%, transparent 50%)",
    },
    shadow: {
      outer: "0 2px 12px rgba(0, 0, 0, 0.20)",
      specular: "inset 0 1px 0 rgba(255, 255, 255, 0.18)",
    },
    focus: {
      ringColor: "#60a5fa",
      ringWidth: "2px",
      ringOffset: "2px",
      ringOffsetColor: "transparent",
    },
    motion: {
      transitionDuration: "150ms",
      reducedBlur: "2px",
    },
  } as GlassProfile,
};

/** Ultra-minimal clear glass with light/dark variants. Barely-there for subtle UI layers. */
export const clearGlass = {
  light: {
    backdrop: {
      blur: "5px", // Minimal blur
      saturate: 1.2,
      brightness: 1.02,
    },
    surface: {
      fillColor: "rgba(255, 255, 255, 0.04)", // Ultra-subtle 4% fill
    },
    border: {
      color: "rgba(255, 255, 255, 0.18)",
      width: "1px",
      highlightColor: "rgba(255, 255, 255, 0.25)",
      highlightWidth: "1px",
      innerColor: "rgba(255, 255, 255, 0.08)",
      innerWidth: "1px",
      innerGradient: "linear-gradient(180deg, rgba(255,255,255,0.12) 0%, transparent 50%)",
    },
    shadow: {
      outer: "0 2px 8px rgba(0, 0, 0, 0.06)", // Minimal shadow
      specular: "inset 0 1px 0 rgba(255, 255, 255, 0.25)",
    },
    focus: {
      ringColor: "rgba(255, 255, 255, 0.80)",
      ringWidth: "2px",
      ringOffset: "2px",
      ringOffsetColor: "transparent",
    },
    motion: {
      transitionDuration: "120ms", // Fastest transition
      reducedBlur: "0px", // No blur in reduced motion
    },
  } as GlassProfile,
  dark: {
    backdrop: {
      blur: "5px",
      saturate: 1.1,
      brightness: 0.95,
    },
    surface: {
      fillColor: "rgba(0, 0, 0, 0.08)",
    },
    border: {
      color: "rgba(255, 255, 255, 0.12)",
      width: "1px",
      highlightColor: "rgba(255, 255, 255, 0.18)",
      highlightWidth: "1px",
      innerColor: "rgba(255, 255, 255, 0.06)",
      innerWidth: "1px",
      innerGradient: "linear-gradient(180deg, rgba(255,255,255,0.10) 0%, transparent 50%)",
    },
    shadow: {
      outer: "0 2px 8px rgba(0, 0, 0, 0.10)",
      specular: "inset 0 1px 0 rgba(255, 255, 255, 0.15)",
    },
    focus: {
      ringColor: "rgba(255, 255, 255, 0.80)",
      ringWidth: "2px",
      ringOffset: "2px",
      ringOffsetColor: "transparent",
    },
    motion: {
      transitionDuration: "120ms",
      reducedBlur: "0px", // No blur in reduced motion
    },
  } as GlassProfile,
};

// ─── Profile Registry ────────────────────────────────────────────────────────

export type GlassProfileVariant = "light" | "dark";
export type GlassProfileName = "frosted" | "liquid" | "tinted" | "clear";

export const glassProfiles = {
  frosted: frostedGlass,
  liquid: liquidGlass,
  tinted: tintedGlass,
  clear: clearGlass,
};

/**
 * Resolves a glass profile variant based on theme mode.
 * @param name - The profile name (frosted, liquid, tinted, or clear)
 * @param variant - The theme variant (light or dark)
 * @returns The resolved GlassProfile for the specified variant
 * @example
 * const profile = getGlassProfile('frosted', 'dark');
 * // Returns frostedGlass.dark profile configuration
 */
export function getGlassProfile(
  name: GlassProfileName,
  variant: GlassProfileVariant
): GlassProfile {
  const profile = glassProfiles[name];
  return profile[variant] || profile.light; // Fallback to light if variant not found
}
