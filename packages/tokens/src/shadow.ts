/**
 * Shadow tokens for glass depth and semantic color glows.
 * All values are CSS box-shadow strings ready for direct use.
 */
export const shadow = {
  glass: {
    /** Subtle card-level shadow */
    sm: "0 2px 8px rgba(0, 0, 0, 0.08)",
    /** Standard component shadow */
    md: "0 4px 16px rgba(0, 0, 0, 0.12), 0 1px 4px rgba(0, 0, 0, 0.06)",
    /** Deep panel / modal shadow */
    lg: "0 8px 32px rgba(0, 0, 0, 0.16), 0 2px 8px rgba(0, 0, 0, 0.08)",
    /** Inset top-left specular highlight */
    specular: "inset 0 1px 0 rgba(255, 255, 255, 0.40)",
    /** Inset depth shadow */
    inner: "inset 0 1px 3px rgba(0, 0, 0, 0.12)",
  },
  glow: {
    primary: "0 0 20px rgba(37,  99,  235, 0.25)",
    secondary: "0 0 20px rgba(107, 114, 128, 0.20)",
    danger: "0 0 20px rgba(239, 68,  68,  0.25)",
    success: "0 0 20px rgba(34,  197, 94,  0.25)",
    warning: "0 0 20px rgba(245, 158, 11,  0.25)",
  },
  textShadow: {
    /** Text shadow for light mode — subtle dark shadow for contrast on light glass */
    onGlassLight: "0 1px 2px rgba(0, 0, 0, 0.15)",
    /** Text shadow for dark mode — stronger shadow for readability on dark glass */
    onGlassDark: "0 1px 3px rgba(0, 0, 0, 0.40)",
  },
} as const;
