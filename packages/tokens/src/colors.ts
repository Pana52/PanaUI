export const colors = {
  primary: {
    50: "#eff6ff",
    100: "#dbeafe",
    200: "#bfdbfe",
    300: "#93c5fd",
    400: "#60a5fa",
    500: "#3b82f6",
    600: "#2563eb",
    700: "#1d4ed8",
    800: "#1e40af",
    900: "#1e3a8a",
    // Glass-compatible expressions (primary-600 at varying alpha)
    glass: {
      fill: "rgba(37, 99, 235, 0.12)",
      border: "rgba(37, 99, 235, 0.25)",
      glow: "rgba(37, 99, 235, 0.20)",
      text: {
        onLight: "#1e3a8a", // primary-900 — readable on light glass tint
        onDark: "#93c5fd", // primary-300 — readable on dark glass tint
      },
      textShadow: {
        light: "0 1px 2px rgba(0, 0, 0, 0.15)",
        dark: "0 1px 3px rgba(0, 0, 0, 0.40)",
      },
    },
  },
  neutral: {
    50: "#f9fafb",
    100: "#f3f4f6",
    200: "#e5e7eb",
    300: "#d1d5db",
    400: "#9ca3af",
    500: "#6b7280",
    600: "#4b5563",
    700: "#374151",
    800: "#1f2937",
    900: "#111827",
    // Glass-compatible expressions (neutral-500 at varying alpha)
    glass: {
      fill: "rgba(107, 114, 128, 0.10)",
      border: "rgba(107, 114, 128, 0.20)",
      glow: "rgba(107, 114, 128, 0.15)",
      text: {
        onLight: "#1f2937", // neutral-800
        onDark: "#d1d5db", // neutral-300
      },
      textShadow: {
        light: "0 1px 2px rgba(0, 0, 0, 0.15)",
        dark: "0 1px 3px rgba(0, 0, 0, 0.40)",
      },
    },
  },
  success: "#22c55e",
  warning: "#f59e0b",
  error: "#ef4444",
  // Profile-level glass surface fills (color-agnostic, used by built-in profiles)
  glass: {
    surface: {
      white: {
        fill: "rgba(255, 255, 255, 0.10)",
        border: "rgba(255, 255, 255, 0.28)",
        specular: "rgba(255, 255, 255, 0.40)",
      },
      dark: {
        fill: "rgba(0, 0, 0, 0.30)",
        border: "rgba(255, 255, 255, 0.08)",
        specular: "rgba(255, 255, 255, 0.15)",
      },
    },
    // Semantic color glass expressions for danger/success/warning
    danger: {
      fill: "rgba(239, 68, 68, 0.12)",
      border: "rgba(239, 68, 68, 0.25)",
      glow: "rgba(239, 68, 68, 0.20)",
      text: {
        onLight: "#991b1b", // red-800
        onDark: "#fca5a5", // red-300
      },
      textShadow: {
        light: "0 1px 2px rgba(0, 0, 0, 0.15)",
        dark: "0 1px 3px rgba(0, 0, 0, 0.40)",
      },
    },
    success: {
      fill: "rgba(34, 197, 94, 0.12)",
      border: "rgba(34, 197, 94, 0.25)",
      glow: "rgba(34, 197, 94, 0.20)",
      text: {
        onLight: "#15803d", // green-700
        onDark: "#86efac", // green-300
      },
      textShadow: {
        light: "0 1px 2px rgba(0, 0, 0, 0.15)",
        dark: "0 1px 3px rgba(0, 0, 0, 0.40)",
      },
    },
    warning: {
      fill: "rgba(245, 158, 11, 0.12)",
      border: "rgba(245, 158, 11, 0.25)",
      glow: "rgba(245, 158, 11, 0.20)",
      text: {
        onLight: "#92400e", // amber-800
        onDark: "#fcd34d", // amber-300
      },
      textShadow: {
        light: "0 1px 2px rgba(0, 0, 0, 0.15)",
        dark: "0 1px 3px rgba(0, 0, 0, 0.40)",
      },
    },
  },
} as const;
