import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import { forwardRef, type ButtonHTMLAttributes, type CSSProperties, type ReactNode } from "react";
import type { GlassProfile, GlassProfileName } from "@panaui/tokens";

// ─── Types ───────────────────────────────────────────────────────────────────

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg";
export type { GlassProfileName };

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "disabled"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /**
   * Glass material profile. When set, renders the button as a glassmorphic
   * surface layered on top of the semantic `variant` color.
   *
   * `variant` → color identity (primary / secondary / ghost / danger)
   * `glass`   → material structure (frosted / liquid / dark / tinted)
   */
  glass?: GlassProfileName;
  /**
   * Custom glass profile that overrides the structural properties of the
   * selected named `glass` profile via inline CSS. The semantic color tinting
   * from `variant` still applies.
   */
  glassProfile?: GlassProfile;
  loading?: boolean;
  fullWidth?: boolean;
  disabled?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

// ─── Glass Profile → Inline Style ────────────────────────────────────────────

function glassProfileToStyle(profile: GlassProfile): CSSProperties {
  const { backdrop, surface, border, shadow, motion } = profile;

  const backdropFilter = [
    `blur(${backdrop.blur})`,
    `saturate(${backdrop.saturate})`,
    `brightness(${backdrop.brightness})`,
    backdrop.hueRotate ? `hue-rotate(${backdrop.hueRotate})` : null,
    backdrop.contrast != null ? `contrast(${backdrop.contrast})` : null,
  ]
    .filter(Boolean)
    .join(" ");

  const boxShadow = [shadow.outer, shadow.specular, shadow.inner].filter(Boolean).join(", ");

  return {
    backdropFilter,
    WebkitBackdropFilter: backdropFilter,
    background: surface.fillColor,
    borderColor: border.color,
    boxShadow,
    transitionDuration: motion.transitionDuration,
  };
}

// ─── Variants ────────────────────────────────────────────────────────────────

const buttonVariants = cva(
  // Base
  [
    "inline-flex items-center justify-center gap-2 font-medium select-none",
    "transition-colors duration-150 cursor-pointer",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",
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
      // Structural backdrop/shadow classes only. Semantic fill + text colors
      // are applied via compoundVariants below.
      glass: {
        frosted: [
          "backdrop-blur-[12px] backdrop-saturate-[1.8] backdrop-brightness-[1.1]",
          "border shadow-[0_4px_16px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.40)]",
          "transition-all motion-reduce:transition-none",
          "forced-colors:backdrop-filter-none forced-colors:bg-[ButtonFace]",
          "forced-colors:text-[ButtonText] forced-colors:border-[ButtonBorder]",
        ],
        liquid: [
          "backdrop-blur-[20px] backdrop-saturate-[2.2] backdrop-brightness-[1.15]",
          "border shadow-[0_8px_32px_rgba(0,0,0,0.16),0_2px_8px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.50)]",
          "transition-all motion-reduce:transition-none",
          "forced-colors:backdrop-filter-none forced-colors:bg-[ButtonFace]",
          "forced-colors:text-[ButtonText] forced-colors:border-[ButtonBorder]",
        ],
        dark: [
          "backdrop-blur-[16px] backdrop-saturate-[1.4] backdrop-brightness-[0.8]",
          "border shadow-[0_4px_24px_rgba(0,0,0,0.30),inset_0_1px_0_rgba(255,255,255,0.15)]",
          "transition-all motion-reduce:transition-none",
          "forced-colors:backdrop-filter-none forced-colors:bg-[ButtonFace]",
          "forced-colors:text-[ButtonText] forced-colors:border-[ButtonBorder]",
        ],
        tinted: [
          "backdrop-blur-[10px] backdrop-saturate-[1.6] backdrop-brightness-[1.05]",
          "border shadow-[0_2px_12px_rgba(0,0,0,0.10),inset_0_1px_0_rgba(255,255,255,0.35)]",
          "transition-all motion-reduce:transition-none",
          "forced-colors:backdrop-filter-none forced-colors:bg-[ButtonFace]",
          "forced-colors:text-[ButtonText] forced-colors:border-[ButtonBorder]",
        ],
      },
      size: {
        sm: "h-8 px-3 text-xs rounded",
        md: "h-10 px-4 text-sm rounded-md",
        lg: "h-12 px-6 text-base rounded-lg",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
    },
    // ── Semantic color × glass compound styles ─────────────────────────────
    // twMerge resolves conflicts: compound variants are applied last,
    // so they override the base variant's solid fill/text colors.
    compoundVariants: [
      // primary × glass
      {
        variant: "primary",
        glass: "frosted",
        class:
          "bg-blue-600/10 text-blue-900 border-blue-500/25 hover:bg-blue-600/15 active:bg-blue-600/20 focus-visible:ring-blue-500",
      },
      {
        variant: "primary",
        glass: "liquid",
        class:
          "bg-blue-600/10 text-blue-900 border-blue-400/30 hover:bg-blue-600/15 active:bg-blue-600/20 focus-visible:ring-blue-500",
      },
      {
        variant: "primary",
        glass: "dark",
        class:
          "bg-blue-600/20 text-blue-200 border-blue-400/15 hover:bg-blue-600/25 active:bg-blue-600/30 focus-visible:ring-white",
      },
      {
        variant: "primary",
        glass: "tinted",
        class:
          "bg-blue-600/15 text-blue-900 border-blue-500/30 hover:bg-blue-600/20 active:bg-blue-600/25 focus-visible:ring-blue-500",
      },
      // secondary × glass
      {
        variant: "secondary",
        glass: "frosted",
        class:
          "bg-gray-500/10 text-gray-700 border-gray-400/20 hover:bg-gray-500/15 active:bg-gray-500/20 focus-visible:ring-gray-400",
      },
      {
        variant: "secondary",
        glass: "liquid",
        class:
          "bg-gray-500/10 text-gray-700 border-gray-300/25 hover:bg-gray-500/15 active:bg-gray-500/20 focus-visible:ring-gray-400",
      },
      {
        variant: "secondary",
        glass: "dark",
        class:
          "bg-gray-500/25 text-gray-200 border-gray-400/10 hover:bg-gray-500/30 active:bg-gray-500/35 focus-visible:ring-white",
      },
      {
        variant: "secondary",
        glass: "tinted",
        class:
          "bg-gray-500/10 text-gray-700 border-gray-400/25 hover:bg-gray-500/15 active:bg-gray-500/20 focus-visible:ring-gray-400",
      },
      // ghost × glass
      {
        variant: "ghost",
        glass: "frosted",
        class:
          "bg-white/5 text-gray-700 border-white/10 hover:bg-white/10 active:bg-white/15 focus-visible:ring-gray-400",
      },
      {
        variant: "ghost",
        glass: "liquid",
        class:
          "bg-transparent text-gray-700 border-white/10 hover:bg-white/5 active:bg-white/10 focus-visible:ring-gray-400",
      },
      {
        variant: "ghost",
        glass: "dark",
        class:
          "bg-transparent text-gray-200 border-white/5 hover:bg-white/5 active:bg-white/10 focus-visible:ring-white",
      },
      {
        variant: "ghost",
        glass: "tinted",
        class:
          "bg-white/5 text-gray-700 border-white/10 hover:bg-white/10 active:bg-white/15 focus-visible:ring-gray-400",
      },
      // danger × glass
      {
        variant: "danger",
        glass: "frosted",
        class:
          "bg-red-500/10 text-red-900 border-red-400/25 hover:bg-red-500/15 active:bg-red-500/20 focus-visible:ring-red-500",
      },
      {
        variant: "danger",
        glass: "liquid",
        class:
          "bg-red-500/10 text-red-900 border-red-400/30 hover:bg-red-500/15 active:bg-red-500/20 focus-visible:ring-red-500",
      },
      {
        variant: "danger",
        glass: "dark",
        class:
          "bg-red-500/20 text-red-200 border-red-400/15 hover:bg-red-500/25 active:bg-red-500/30 focus-visible:ring-white",
      },
      {
        variant: "danger",
        glass: "tinted",
        class:
          "bg-red-500/15 text-red-900 border-red-400/30 hover:bg-red-500/20 active:bg-red-500/25 focus-visible:ring-red-500",
      },
    ],
    defaultVariants: {
      variant: "primary",
      size: "md",
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
    ref
  ) {
    const isDisabled = disabled || loading;
    const glassStyle = glassProfile ? glassProfileToStyle(glassProfile) : undefined;

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        aria-busy={loading || undefined}
        className={twMerge(buttonVariants({ variant, size, fullWidth, glass }), className)}
        style={glassStyle ? { ...glassStyle, ...style } : style}
        {...props}
      >
        {loading ? <Spinner /> : leftIcon ? <span className="inline-flex">{leftIcon}</span> : null}
        {children}
        {rightIcon && !loading ? <span className="inline-flex">{rightIcon}</span> : null}
      </button>
    );
  }
);
