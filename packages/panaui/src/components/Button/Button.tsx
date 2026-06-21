import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import {
  forwardRef,
  type ButtonHTMLAttributes,
  type CSSProperties,
  type MutableRefObject,
  type ReactNode,
} from "react";
import type { GlassProfile, GlassProfileName } from "@panaui/tokens";
import { getGlassProfile, colors } from "@panaui/tokens";
import { useTheme } from "../../contexts/ThemeContext";
import { useLiquidGlassShader } from "../../utilities/LiquidGlassFilter";

// ─── Types ───────────────────────────────────────────────────────────────────

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg";
export type BorderWidth = "1px" | "2px" | "3px" | "5px" | "8px";
export type { GlassProfileName };

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "disabled"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /**
   * Glass material profile. When set, renders the button as a glassmorphic
   * surface layered on top of the semantic `variant` color.
   * Automatically switches between light/dark variants based on theme.
   *
   * `variant` → color identity (primary / secondary / ghost / danger)
   * `glass`   → material structure (frosted / liquid / tinted / clear)
   */
  glass?: GlassProfileName;
  /**
   * Custom glass profile that overrides the structural properties of the
   * selected named `glass` profile via inline CSS. The semantic color tinting
   * from `variant` still applies.
   */
  glassProfile?: GlassProfile;
  /**
   * Edge-bulge displacement strength for the liquid-glass shader, in SVG
   * filter scale units. Overrides the resolved glass profile's value.
   */
  displacementScale?: number;
  /** Backdrop blur, in px. Overrides the resolved glass profile's value. */
  blurAmount?: number;
  /** Backdrop saturation percentage — 100 = unchanged. Overrides the resolved glass profile's value. */
  saturation?: number;
  /** Chromatic aberration intensity at the glass edges. 0 disables it. Overrides the resolved glass profile's value. */
  aberrationIntensity?: number;
  /** Corner radius in px — shapes both the visual rounding and the displacement bulge. Overrides the resolved glass profile's value. */
  cornerRadius?: number;
  /**
   * Border width for the button. Affects both solid and glass variants.
   * Default: "1px"
   */
  borderWidth?: BorderWidth;
  loading?: boolean;
  fullWidth?: boolean;
  disabled?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

// ─── Glass Profile → Inline Style ────────────────────────────────────────────

/**
 * Maps button variant to semantic border color from color tokens.
 * Returns undefined for variants that should use the glass profile's default border.
 */
function getSemanticBorderColor(variant?: ButtonVariant): string | undefined {
  switch (variant) {
    case "primary":
      return colors.primary.glass.border;
    case "secondary":
      return colors.neutral.glass.border;
    case "danger":
      return colors.glass.danger.border;
    case "ghost":
      // Ghost uses generic white borders from the glass profile
      return undefined;
    default:
      return undefined;
  }
}

/** Border + shadow + transition for the button shell. Backdrop-filter/fill live on the inner backdrop layer instead, so text/icons stay sharp. */
function glassProfileToShellStyle(
  profile: GlassProfile,
  borderWidth?: string,
  variant?: ButtonVariant
): CSSProperties {
  const { border, shadow, motion } = profile;

  // Composite box shadow with double border (inner border as inset shadow layer)
  const innerBorderWidth = border.innerWidth || borderWidth || border.width;
  const innerBorderShadow = border.innerColor
    ? `inset 0 0 0 ${innerBorderWidth} ${border.innerColor}`
    : null;

  const boxShadow = [shadow.outer, innerBorderShadow, shadow.specular, shadow.inner]
    .filter(Boolean)
    .join(", ");

  // Use semantic border color from color tokens if available, otherwise fall back to profile's border color
  const semanticBorderColor = getSemanticBorderColor(variant);
  const finalBorderColor = semanticBorderColor || border.color;

  return {
    borderColor: finalBorderColor,
    boxShadow,
    transitionDuration: motion.transitionDuration,
  };
}

/** Translucent fill for the backdrop layer (the part that gets blurred/displaced). */
function glassProfileToBackdropFillStyle(profile: GlassProfile): CSSProperties {
  return {
    background: profile.surface.gradient || profile.surface.fillColor,
  };
}

// ─── Variants ────────────────────────────────────────────────────────────────

const buttonVariants = cva(
  // Base
  [
    "relative inline-flex items-center justify-center gap-2 font-medium select-none",
    "transition-colors duration-150 cursor-pointer",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    "disabled:grayscale disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",
    "aria-busy:opacity-75 aria-busy:cursor-not-allowed aria-busy:pointer-events-none",
  ],
  {
    variants: {
      // ── Semantic color identity (unchanged from solid design) ───────────
      variant: {
        primary: [
          "bg-blue-600 text-white",
          "hover:bg-blue-700 active:bg-blue-800",
          "focus-visible:ring-blue-500",
        ],
        secondary: [
          "bg-gray-100 text-gray-800 border border-gray-300",
          "hover:bg-gray-200 active:bg-gray-300",
          "focus-visible:ring-gray-400",
        ],
        ghost: [
          "bg-transparent text-gray-700",
          "hover:bg-gray-100 active:bg-gray-200",
          "focus-visible:ring-gray-400",
        ],
        danger: [
          "bg-red-500 text-white",
          "hover:bg-red-600 active:bg-red-700",
          "focus-visible:ring-red-400",
        ],
      },
      // ── Glass material structure (orthogonal to variant) ────────────────
      // Structural overflow/shadow classes only. backdrop-filter now lives on
      // the inner backdrop layer (see glassBackdropVariants below), since the
      // SVG displacement filter must not affect text/icons.
      glass: {
        frosted: [
          "overflow-hidden border shadow-[0_4px_16px_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,255,255,0.40)]",
          "transition-all motion-reduce:transition-none",
          "forced-colors:bg-[ButtonFace] forced-colors:text-[ButtonText] forced-colors:border-[ButtonBorder]",
        ],
        liquid: [
          "overflow-hidden border shadow-[0_8px_32px_rgba(0,0,0,0.16),0_2px_8px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.50)]",
          "transition-all motion-reduce:transition-none",
          "forced-colors:bg-[ButtonFace] forced-colors:text-[ButtonText] forced-colors:border-[ButtonBorder]",
        ],
        tinted: [
          "overflow-hidden border shadow-[0_2px_12px_rgba(0,0,0,0.10),inset_0_1px_0_rgba(255,255,255,0.35)]",
          "transition-all motion-reduce:transition-none",
          "forced-colors:bg-[ButtonFace] forced-colors:text-[ButtonText] forced-colors:border-[ButtonBorder]",
        ],
        clear: [
          "overflow-hidden border shadow-[0_2px_8px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.25)]",
          "transition-all motion-reduce:transition-none",
          "forced-colors:bg-[ButtonFace] forced-colors:text-[ButtonText] forced-colors:border-[ButtonBorder]",
        ],
      },
      size: {
        sm: "h-8 px-3 text-xs rounded",
        md: "h-10 px-4 text-sm rounded-md",
        lg: "h-12 px-6 text-base rounded-lg",
      },
      borderWidth: {
        "1px": "border",
        "2px": "border-2",
        "3px": "border-[3px]",
        "5px": "border-[5px]",
        "8px": "border-[8px]",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
    },
    // ── Semantic color × glass compound styles ─────────────────────────────
    // twMerge resolves conflicts: compound variants are applied last,
    // so they override the base variant's solid fill/text colors.
    // Text shadows and dark mode variants improve readability on glass.
    compoundVariants: [
      // primary × glass
      {
        variant: "primary",
        glass: "frosted",
        class:
          "bg-blue-600/10 text-blue-900 dark:text-blue-200 border-blue-500/25 hover:bg-blue-600/15 active:bg-blue-600/20 focus-visible:ring-blue-500 [text-shadow:0_1px_2px_rgba(0,0,0,0.15)] dark:[text-shadow:0_1px_3px_rgba(0,0,0,0.40)]",
      },
      {
        variant: "primary",
        glass: "liquid",
        class:
          "bg-blue-600/10 text-blue-900 dark:text-blue-200 border-blue-400/30 hover:bg-blue-600/15 active:bg-blue-600/20 focus-visible:ring-blue-500 [text-shadow:0_1px_2px_rgba(0,0,0,0.15)] dark:[text-shadow:0_1px_3px_rgba(0,0,0,0.40)]",
      },
      {
        variant: "primary",
        glass: "tinted",
        class:
          "bg-blue-600/15 text-blue-900 dark:text-blue-200 border-blue-500/30 hover:bg-blue-600/20 active:bg-blue-600/25 focus-visible:ring-blue-500 [text-shadow:0_1px_2px_rgba(0,0,0,0.15)] dark:[text-shadow:0_1px_3px_rgba(0,0,0,0.40)]",
      },
      {
        variant: "primary",
        glass: "clear",
        class:
          "bg-blue-600/5 dark:bg-blue-400/8 text-blue-900 dark:text-blue-200 border-blue-500/18 dark:border-blue-400/22 hover:bg-blue-600/8 dark:hover:bg-blue-400/11 active:bg-blue-600/10 dark:active:bg-blue-400/14 focus-visible:ring-blue-500 [text-shadow:0_1px_2px_rgba(0,0,0,0.15)] dark:[text-shadow:0_1px_3px_rgba(0,0,0,0.40)]",
      },
      // secondary × glass
      {
        variant: "secondary",
        glass: "frosted",
        class:
          "bg-gray-500/10 text-gray-700 dark:text-gray-200 border-gray-400/20 hover:bg-gray-500/15 active:bg-gray-500/20 focus-visible:ring-gray-400 [text-shadow:0_1px_2px_rgba(0,0,0,0.15)] dark:[text-shadow:0_1px_3px_rgba(0,0,0,0.40)]",
      },
      {
        variant: "secondary",
        glass: "liquid",
        class:
          "bg-gray-500/10 text-gray-700 dark:text-gray-200 border-gray-300/25 hover:bg-gray-500/15 active:bg-gray-500/20 focus-visible:ring-gray-400 [text-shadow:0_1px_2px_rgba(0,0,0,0.15)] dark:[text-shadow:0_1px_3px_rgba(0,0,0,0.40)]",
      },
      {
        variant: "secondary",
        glass: "tinted",
        class:
          "bg-gray-500/10 text-gray-700 dark:text-gray-200 border-gray-400/25 hover:bg-gray-500/15 active:bg-gray-500/20 focus-visible:ring-gray-400 [text-shadow:0_1px_2px_rgba(0,0,0,0.15)] dark:[text-shadow:0_1px_3px_rgba(0,0,0,0.40)]",
      },
      {
        variant: "secondary",
        glass: "clear",
        class:
          "bg-gray-500/5 dark:bg-gray-400/8 text-gray-700 dark:text-gray-200 border-gray-400/18 dark:border-gray-300/22 hover:bg-gray-500/8 dark:hover:bg-gray-400/11 active:bg-gray-500/10 dark:active:bg-gray-400/14 focus-visible:ring-gray-400 [text-shadow:0_1px_2px_rgba(0,0,0,0.15)] dark:[text-shadow:0_1px_3px_rgba(0,0,0,0.40)]",
      },
      // ghost × glass
      {
        variant: "ghost",
        glass: "frosted",
        class:
          "bg-white/5 text-gray-700 dark:text-gray-200 border-white/10 hover:bg-white/10 active:bg-white/15 focus-visible:ring-gray-400 [text-shadow:0_1px_2px_rgba(0,0,0,0.15)] dark:[text-shadow:0_1px_3px_rgba(0,0,0,0.40)]",
      },
      {
        variant: "ghost",
        glass: "liquid",
        class:
          "bg-transparent text-gray-700 dark:text-gray-200 border-white/10 hover:bg-white/5 active:bg-white/10 focus-visible:ring-gray-400 [text-shadow:0_1px_2px_rgba(0,0,0,0.15)] dark:[text-shadow:0_1px_3px_rgba(0,0,0,0.40)]",
      },
      {
        variant: "ghost",
        glass: "tinted",
        class:
          "bg-white/5 text-gray-700 dark:text-gray-200 border-white/10 hover:bg-white/10 active:bg-white/15 focus-visible:ring-gray-400 [text-shadow:0_1px_2px_rgba(0,0,0,0.15)] dark:[text-shadow:0_1px_3px_rgba(0,0,0,0.40)]",
      },
      {
        variant: "ghost",
        glass: "clear",
        class:
          "bg-white/3 dark:bg-white/5 text-gray-700 dark:text-gray-200 border-white/8 dark:border-white/12 hover:bg-white/6 dark:hover:bg-white/8 active:bg-white/8 dark:active:bg-white/10 focus-visible:ring-gray-400 [text-shadow:0_1px_2px_rgba(0,0,0,0.15)] dark:[text-shadow:0_1px_3px_rgba(0,0,0,0.40)]",
      },
      // danger × glass
      {
        variant: "danger",
        glass: "frosted",
        class:
          "bg-red-500/10 text-red-900 dark:text-red-200 border-red-400/25 hover:bg-red-500/15 active:bg-red-500/20 focus-visible:ring-red-500 [text-shadow:0_1px_2px_rgba(0,0,0,0.15)] dark:[text-shadow:0_1px_3px_rgba(0,0,0,0.40)]",
      },
      {
        variant: "danger",
        glass: "liquid",
        class:
          "bg-red-500/10 text-red-900 dark:text-red-200 border-red-400/30 hover:bg-red-500/15 active:bg-red-500/20 focus-visible:ring-red-500 [text-shadow:0_1px_2px_rgba(0,0,0,0.15)] dark:[text-shadow:0_1px_3px_rgba(0,0,0,0.40)]",
      },
      {
        variant: "danger",
        glass: "tinted",
        class:
          "bg-red-500/15 text-red-900 dark:text-red-200 border-red-400/30 hover:bg-red-500/20 active:bg-red-500/25 focus-visible:ring-red-500 [text-shadow:0_1px_2px_rgba(0,0,0,0.15)] dark:[text-shadow:0_1px_3px_rgba(0,0,0,0.40)]",
      },
      {
        variant: "danger",
        glass: "clear",
        class:
          "bg-red-500/5 dark:bg-red-400/8 text-red-900 dark:text-red-200 border-red-400/18 dark:border-red-300/22 hover:bg-red-500/8 dark:hover:bg-red-400/11 active:bg-red-500/10 dark:active:bg-red-400/14 focus-visible:ring-red-500 [text-shadow:0_1px_2px_rgba(0,0,0,0.15)] dark:[text-shadow:0_1px_3px_rgba(0,0,0,0.40)]",
      },
    ],
    defaultVariants: {
      variant: "primary",
      size: "md",
      borderWidth: "1px",
      fullWidth: false,
    },
  }
);

type ButtonVariantProps = VariantProps<typeof buttonVariants>;

// ─── Spinner ─────────────────────────────────────────────────────────────────

function Spinner() {
  return (
    <svg
      aria-hidden="true"
      className="animate-spin"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="31.4"
        strokeDashoffset="10"
        opacity="0.25"
      />
      <path
        d="M12 2a10 10 0 0 1 10 10"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

// ─── Component ───────────────────────────────────────────────────────────────

export const Button = forwardRef<HTMLButtonElement, ButtonProps & ButtonVariantProps>(
  function Button(
    {
      variant,
      size,
      glass,
      glassProfile,
      displacementScale,
      blurAmount,
      saturation,
      aberrationIntensity,
      cornerRadius,
      borderWidth = "1px",
      loading = false,
      fullWidth = false,
      disabled = false,
      leftIcon,
      rightIcon,
      className,
      style,
      children,
      ...props
    },
    forwardedRef
  ) {
    const { theme } = useTheme();
    const isDisabled = disabled || loading;

    // Resolve glass profile based on theme
    const resolvedProfile =
      glassProfile ||
      (glass ? getGlassProfile(glass, theme === "dark" ? "dark" : "light") : undefined);

    const resolvedCornerRadius = resolvedProfile
      ? (cornerRadius ?? resolvedProfile.shader.cornerRadius)
      : undefined;

    const {
      ref: shaderRef,
      filterDefs,
      backdropStyle,
    } = useLiquidGlassShader({
      displacementScale: resolvedProfile
        ? (displacementScale ?? resolvedProfile.shader.displacementScale)
        : 0,
      blurAmount: resolvedProfile ? (blurAmount ?? resolvedProfile.shader.blurAmount) : 0,
      saturation: resolvedProfile ? (saturation ?? resolvedProfile.shader.saturation) : 100,
      aberrationIntensity: resolvedProfile
        ? (aberrationIntensity ?? resolvedProfile.shader.aberrationIntensity)
        : 0,
      cornerRadius: resolvedCornerRadius ?? 0,
      disabled: !resolvedProfile,
    });

    const shellStyle = resolvedProfile
      ? glassProfileToShellStyle(resolvedProfile, borderWidth, variant)
      : undefined;
    const backdropFillStyle = resolvedProfile
      ? glassProfileToBackdropFillStyle(resolvedProfile)
      : undefined;

    const radiusStyle: CSSProperties | undefined =
      resolvedCornerRadius != null ? { borderRadius: `${resolvedCornerRadius}px` } : undefined;

    return (
      <button
        ref={(node) => {
          (shaderRef as MutableRefObject<HTMLButtonElement | null>).current = node;
          if (typeof forwardedRef === "function") forwardedRef(node);
          else if (forwardedRef)
            (forwardedRef as MutableRefObject<HTMLButtonElement | null>).current = node;
        }}
        disabled={isDisabled}
        aria-busy={loading || undefined}
        className={twMerge(
          buttonVariants({ variant, size, fullWidth, borderWidth, glass }),
          className
        )}
        style={shellStyle ? { ...shellStyle, ...radiusStyle, ...style } : style}
        {...props}
      >
        {resolvedProfile ? (
          <>
            {filterDefs}
            {/* Blur/displacement only — no fill, so feDisplacementMap has nothing
                opaque of its own to tear at the edges when it samples outward. */}
            <span
              aria-hidden="true"
              className="panaui-glass-backdrop pointer-events-none absolute inset-0"
              style={{ ...backdropStyle, ...radiusStyle }}
            />
            {/* Tint sits above the backdrop, unfiltered, so it always covers
                the full surface regardless of how the backdrop gets displaced. */}
            <span
              aria-hidden="true"
              className="panaui-glass-fill pointer-events-none absolute inset-0"
              style={{ ...backdropFillStyle, ...radiusStyle }}
            />
          </>
        ) : null}
        <span className="relative z-[1] inline-flex items-center gap-2">
          {loading ? (
            <Spinner />
          ) : leftIcon ? (
            <span className="inline-flex">{leftIcon}</span>
          ) : null}
          {children}
          {rightIcon && !loading ? <span className="inline-flex">{rightIcon}</span> : null}
        </span>
      </button>
    );
  }
);
