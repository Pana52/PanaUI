import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";
import { frostedGlass, liquidGlass, tintedGlass, clearGlass } from "@panaui/tokens";
import { ThemeProvider } from "../../contexts/ThemeContext";
import { useState } from "react";

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "ghost", "danger"],
    },
    glass: {
      control: "select",
      options: [undefined, "frosted", "liquid", "tinted", "clear"],
      description:
        "Glass material profile. Automatically switches between light/dark variants based on theme. Composes with `variant` — variant = color identity, glass = material structure.",
    },
    borderWidth: {
      control: "select",
      options: ["1px", "2px", "3px"],
      description: "Border thickness for visual emphasis.",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    loading: { control: "boolean" },
    disabled: { control: "boolean" },
    fullWidth: { control: "boolean" },
    leftIcon: { control: false },
    rightIcon: { control: false },
    glassProfile: { control: false },
    children: { control: "text" },
  },
  args: {
    children: "Button",
    variant: "primary",
    size: "md",
    borderWidth: "1px",
    loading: false,
    disabled: false,
    fullWidth: false,
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// ─── Playground ───────────────────────────────────────────────────────────────

export const Default: Story = {};

// ─── All Variants ─────────────────────────────────────────────────────────────

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="danger">Danger</Button>
    </div>
  ),
};

// ─── All Sizes ────────────────────────────────────────────────────────────────

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

// ─── With Icons ───────────────────────────────────────────────────────────────

const DownloadIcon = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const ChevronIcon = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

export const WithIcons: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
      <Button leftIcon={<DownloadIcon />}>Download</Button>
      <Button variant="secondary" rightIcon={<ChevronIcon />}>
        Next
      </Button>
      <Button variant="ghost" leftIcon={<DownloadIcon />} rightIcon={<ChevronIcon />}>
        Both Icons
      </Button>
    </div>
  ),
};

// ─── Loading ──────────────────────────────────────────────────────────────────

export const Loading: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
      <Button variant="primary" loading>
        Saving…
      </Button>
      <Button variant="secondary" loading>
        Loading…
      </Button>
      <Button variant="danger" loading>
        Deleting…
      </Button>
    </div>
  ),
};

// ─── Disabled ─────────────────────────────────────────────────────────────────

export const Disabled: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
      <Button variant="primary" disabled>
        Primary
      </Button>
      <Button variant="secondary" disabled>
        Secondary
      </Button>
      <Button variant="ghost" disabled>
        Ghost
      </Button>
      <Button variant="danger" disabled>
        Danger
      </Button>
    </div>
  ),
};

// ─── Full Width ───────────────────────────────────────────────────────────────

export const FullWidth: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 400 }}>
      <Button fullWidth>Full Width Primary</Button>
      <Button variant="secondary" fullWidth>
        Full Width Secondary
      </Button>
    </div>
  ),
};
// ───────────────────────────────────────────────────────────────────
// GLASS STORIES
// ───────────────────────────────────────────────────────────────────
// Note: glass stories render on a gradient background so the
// backdrop-filter effect (blur + color refraction) is visible.

const glassBackground = {
  background: "linear-gradient(135deg, #1e3a8a 0%, #2563eb 40%, #7c3aed 70%, #db2777 100%)",
  padding: "48px 32px",
  borderRadius: "20px",
  display: "flex",
  gap: "12px",
  flexWrap: "wrap" as const,
  alignItems: "center",
};

// ─── Glass × Color Variants ───────────────────────────────────────────────

export const GlassVariants: Story = {
  name: "Glass × Color Variants (frosted)",
  render: () => (
    <div style={glassBackground}>
      <Button variant="primary" glass="frosted">
        Primary
      </Button>
      <Button variant="secondary" glass="frosted">
        Secondary
      </Button>
      <Button variant="ghost" glass="frosted">
        Ghost
      </Button>
      <Button variant="danger" glass="frosted">
        Danger
      </Button>
    </div>
  ),
};

// ─── Glass Profiles (primary) ───────────────────────────────────────────

export const GlassProfiles: Story = {
  name: "Glass Profiles (primary variant)",
  render: () => (
    <div style={glassBackground}>
      <Button variant="primary" glass="frosted">
        Frosted
      </Button>
      <Button variant="primary" glass="liquid">
        Liquid
      </Button>
      <Button variant="primary" glass="tinted">
        Tinted
      </Button>
      <Button variant="primary" glass="clear">
        Clear
      </Button>
    </div>
  ),
};

// ─── Glass × All Variants × All Profiles ──────────────────────────────

export const GlassMatrix: Story = {
  name: "Glass Matrix (all variants × all profiles)",
  render: () => (
    <div
      style={{
        background: "linear-gradient(135deg, #1e3a8a 0%, #2563eb 40%, #7c3aed 70%, #db2777 100%)",
        padding: "40px 32px",
        borderRadius: "20px",
        display: "grid",
        gridTemplateColumns: "repeat(4, auto)",
        gap: "10px",
        alignItems: "center",
        justifyContent: "start",
      }}
    >
      {(["primary", "secondary", "ghost", "danger"] as const).flatMap((variant) =>
        (["frosted", "liquid", "tinted", "clear"] as const).map((g) => (
          <Button key={`${variant}-${g}`} variant={variant} glass={g} size="sm">
            {variant} / {g}
          </Button>
        ))
      )}
    </div>
  ),
};

// ─── Glass States ─────────────────────────────────────────────────────

export const GlassStates: Story = {
  render: () => (
    <div style={glassBackground}>
      <Button variant="primary" glass="frosted" loading>
        Saving…
      </Button>
      <Button variant="primary" glass="frosted" disabled>
        Disabled
      </Button>
      <Button variant="danger" glass="liquid" loading>
        Deleting…
      </Button>
      <Button variant="danger" glass="liquid" disabled>
        Disabled
      </Button>
    </div>
  ),
};

// ─── Glass Custom Profile ──────────────────────────────────────────────

// Demonstrates overriding a named profile's structural properties via
// the `glassProfile` prop. The semantic color from `variant` still applies.
const myCustomProfile = {
  ...frostedGlass.light,
  backdrop: { blur: "24px", saturate: 3, brightness: 1.25 },
  border: {
    color: "rgba(255,255,255,0.50)",
    width: "1px",
    highlightColor: "rgba(255,255,255,0.80)",
    highlightWidth: "1px",
  },
  shadow: {
    outer: "0 8px 40px rgba(0,0,0,0.18)",
    specular: "inset 0 1px 0 rgba(255,255,255,0.70)",
  },
};

export const GlassCustomProfile: Story = {
  name: "Glass Custom Profile (glassProfile prop)",
  render: () => (
    <div style={glassBackground}>
      <Button variant="primary" glass="frosted">
        Built-in frosted
      </Button>
      <Button variant="primary" glass="frosted" glassProfile={myCustomProfile}>
        Custom override
      </Button>
      <Button variant="secondary" glass="liquid" glassProfile={liquidGlass.light}>
        liquidGlass.light import
      </Button>
      <Button variant="danger" glass="tinted" glassProfile={tintedGlass.dark}>
        tintedGlass.dark import
      </Button>
      <Button variant="primary" glass="clear" glassProfile={clearGlass.light}>
        clearGlass.light import
      </Button>
    </div>
  ),
};

// ─── Glass Sizes ───────────────────────────────────────────────────────

export const GlassSizes: Story = {
  render: () => (
    <div style={{ ...glassBackground, alignItems: "center" }}>
      <Button variant="primary" glass="liquid" size="sm">
        Small
      </Button>
      <Button variant="primary" glass="liquid" size="md">
        Medium
      </Button>
      <Button variant="primary" glass="liquid" size="lg">
        Large
      </Button>
    </div>
  ),
};

// ─── Clear Glass (Ultra Minimal) ──────────────────────────────────────

export const ClearGlass: Story = {
  name: "Clear Glass (Ultra Minimal Profile)",
  render: () => (
    <div style={glassBackground}>
      <Button variant="primary" glass="clear">
        Primary Clear
      </Button>
      <Button variant="secondary" glass="clear">
        Secondary Clear
      </Button>
      <Button variant="ghost" glass="clear">
        Ghost Clear
      </Button>
      <Button variant="danger" glass="clear">
        Danger Clear
      </Button>
    </div>
  ),
};

// ─── Border Width Variants ─────────────────────────────────────────────

export const BorderWidthVariants: Story = {
  name: "Border Width Variants",
  render: () => (
    <div style={glassBackground}>
      <Button variant="primary" glass="frosted" borderWidth="1px">
        1px Border
      </Button>
      <Button variant="primary" glass="frosted" borderWidth="2px">
        2px Border
      </Button>
      <Button variant="primary" glass="frosted" borderWidth="3px">
        3px Border
      </Button>
      <Button variant="danger" glass="liquid" borderWidth="1px">
        Danger 1px
      </Button>
      <Button variant="danger" glass="liquid" borderWidth="2px">
        Danger 2px
      </Button>
      <Button variant="danger" glass="liquid" borderWidth="3px">
        Danger 3px
      </Button>
    </div>
  ),
};

// ─── Theme Comparison (Light/Dark) ─────────────────────────────────────

const ThemeComparisonComponent = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  return (
    <div>
      <div style={{ marginBottom: "24px", textAlign: "center" }}>
        <button
          onClick={() => setTheme((prev) => (prev === "light" ? "dark" : "light"))}
          style={{
            padding: "12px 24px",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            borderRadius: "8px",
            color: "white",
            fontSize: "16px",
            fontWeight: "500",
            cursor: "pointer",
          }}
        >
          {theme === "dark" ? "🌙" : "☀️"} Toggle Theme (Current: {theme})
        </button>
      </div>
      <ThemeProvider defaultTheme={theme}>
        <div style={glassBackground}>
          <Button variant="primary" glass="frosted">
            Frosted
          </Button>
          <Button variant="primary" glass="liquid">
            Liquid
          </Button>
          <Button variant="primary" glass="tinted">
            Tinted
          </Button>
          <Button variant="primary" glass="clear">
            Clear
          </Button>
          <Button variant="secondary" glass="frosted">
            Secondary
          </Button>
          <Button variant="danger" glass="liquid">
            Danger
          </Button>
        </div>
      </ThemeProvider>
    </div>
  );
};

export const ThemeComparison: Story = {
  name: "Theme Comparison (Light/Dark Mode)",
  render: () => <ThemeComparisonComponent />,
};
