import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "disabled"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
  disabled?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
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
      loading = false,
      fullWidth = false,
      disabled = false,
      leftIcon,
      rightIcon,
      className,
      children,
      ...props
    },
    ref
  ) {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        aria-busy={loading || undefined}
        className={twMerge(buttonVariants({ variant, size, fullWidth }), className)}
        {...props}
      >
        {loading ? <Spinner /> : leftIcon ? <span className="inline-flex">{leftIcon}</span> : null}
        {children}
        {rightIcon && !loading ? <span className="inline-flex">{rightIcon}</span> : null}
      </button>
    );
  }
);
