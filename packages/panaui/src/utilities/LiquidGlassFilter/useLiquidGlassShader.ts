import { useEffect, useId, useRef, useState, type ReactElement, type RefObject } from "react";
import { ShaderDisplacementGenerator } from "./shader-math";
import { GlassFilterDefs } from "./GlassFilterDefs";

export interface UseLiquidGlassShaderOptions {
  /** Edge-bulge displacement strength, in SVG filter scale units. */
  displacementScale: number;
  /** CSS blur length in px applied via backdrop-filter. */
  blurAmount: number;
  /** Saturation percentage applied via backdrop-filter — 100 = unchanged. */
  saturation: number;
  /** Chromatic aberration intensity. 0 disables aberration. */
  aberrationIntensity: number;
  /** Corner radius in px — shapes the displacement bulge to match the element's rounding. */
  cornerRadius: number;
  /** Skip the shader pipeline entirely (e.g. no glass profile active). */
  disabled?: boolean;
}

export interface UseLiquidGlassShaderResult {
  ref: RefObject<HTMLElement | null>;
  filterDefs: ReactElement | null;
  backdropStyle: {
    filter?: string;
    backdropFilter: string;
    WebkitBackdropFilter: string;
  };
}

function isFirefox(): boolean {
  if (typeof navigator === "undefined") return false;
  return navigator.userAgent.toLowerCase().includes("firefox");
}

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Drives the liquid-glass SVG displacement/chromatic-aberration filter for a
 * single element. Falls back to plain backdrop blur/saturate (no displacement,
 * no aberration) on Firefox — which has long-standing SVG filter + backdrop-filter
 * bugs — and when the user prefers reduced motion.
 */
export function useLiquidGlassShader({
  displacementScale,
  blurAmount,
  saturation,
  aberrationIntensity,
  cornerRadius,
  disabled = false,
}: UseLiquidGlassShaderOptions): UseLiquidGlassShaderResult {
  const filterId = useId();
  const ref = useRef<HTMLElement | null>(null);
  const [shaderMapUrl, setShaderMapUrl] = useState("");
  const [size, setSize] = useState({ width: 0, height: 0 });

  const shaderDisabled = disabled || isFirefox() || prefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || shaderDisabled) return;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      const { width, height } = entry.contentRect;
      setSize((prev) =>
        prev.width === width && prev.height === height ? prev : { width, height }
      );
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [shaderDisabled]);

  useEffect(() => {
    if (shaderDisabled || size.width === 0 || size.height === 0) {
      setShaderMapUrl("");
      return;
    }

    const generator = new ShaderDisplacementGenerator({
      width: Math.round(size.width),
      height: Math.round(size.height),
      cornerRadius,
    });
    setShaderMapUrl(generator.updateShader());
    generator.destroy();
  }, [shaderDisabled, size.width, size.height, cornerRadius]);

  const backdropFilter = `blur(${blurAmount}px) saturate(${saturation}%)`;

  const useFilter = !shaderDisabled && shaderMapUrl && displacementScale > 0;

  return {
    ref,
    filterDefs: useFilter
      ? GlassFilterDefs({
          id: filterId,
          width: Math.round(size.width),
          height: Math.round(size.height),
          displacementScale,
          aberrationIntensity,
          shaderMapUrl,
        })
      : null,
    backdropStyle: {
      filter: useFilter ? `url(#${filterId})` : undefined,
      backdropFilter,
      WebkitBackdropFilter: backdropFilter,
    },
  };
}
