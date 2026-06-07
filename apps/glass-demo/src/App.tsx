import { Button, ThemeProvider, useTheme } from "panaui";
import type { ButtonVariant } from "panaui";
import type { GlassProfileName } from "@panaui/tokens";

const variants: ButtonVariant[] = ["primary", "secondary", "ghost", "danger"];
const glassProfiles: GlassProfileName[] = ["frosted", "liquid", "tinted", "clear"];

const sectionStyle: React.CSSProperties = {
  backgroundImage: "url(/bg-image/lake_bg.jpg)",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  padding: "40px 32px",
  borderRadius: "20px",
};

function AppContent() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#1a1a2e",
        padding: "48px 32px",
        display: "flex",
        flexDirection: "column",
        gap: "48px",
      }}
    >
      {/* Header */}
      <header style={{ textAlign: "center", marginBottom: "24px", position: "relative" }}>
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          style={{
            position: "absolute",
            top: "0",
            right: "32px",
            padding: "12px 24px",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            borderRadius: "12px",
            color: "white",
            fontSize: "16px",
            fontWeight: "500",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            transition: "all 200ms",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.15)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
          }}
        >
          <span style={{ fontSize: "20px" }}>{theme === "dark" ? "🌙" : "☀️"}</span>
          {theme === "dark" ? "Dark" : "Light"} Mode
        </button>

        <h1
          style={{
            fontSize: "48px",
            fontWeight: "bold",
            color: "white",
            textShadow: "0 4px 12px rgba(0,0,0,0.5)",
            marginBottom: "12px",
          }}
        >
          PanaUI Glass Demo
        </h1>
        <p
          style={{
            fontSize: "18px",
            color: "rgba(255,255,255,0.9)",
            textShadow: "0 2px 8px rgba(0,0,0,0.4)",
          }}
        >
          Glassmorphic Button Variants • Auto light/dark themes
        </p>
      </header>

      {/* Glass Profile Sections */}
      {glassProfiles.map((glass) => (
        <section key={glass} style={sectionStyle}>
          <h2
            style={{
              fontSize: "32px",
              fontWeight: "600",
              color: "white",
              textShadow: "0 2px 8px rgba(0,0,0,0.5)",
              marginBottom: "20px",
              textTransform: "capitalize",
            }}
          >
            {glass} Glass
          </h2>

          {/* Variant Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "16px",
              maxWidth: "1200px",
            }}
          >
            {variants.map((variant) => (
              <div
                key={`${glass}-${variant}`}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                <Button variant={variant} glass={glass} fullWidth>
                  {variant}
                </Button>
                <Button variant={variant} glass={glass} fullWidth loading>
                  Loading
                </Button>
                <Button variant={variant} glass={glass} fullWidth disabled>
                  Disabled
                </Button>
              </div>
            ))}
          </div>
        </section>
      ))}

      {/* Size Variants */}
      <section style={sectionStyle}>
        <h2
          style={{
            fontSize: "32px",
            fontWeight: "600",
            color: "white",
            textShadow: "0 2px 8px rgba(0,0,0,0.5)",
            marginBottom: "20px",
          }}
        >
          Size Variants (Primary + Frosted)
        </h2>
        <div
          style={{
            display: "flex",
            gap: "16px",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Button variant="primary" glass="frosted" size="sm">
            Small
          </Button>
          <Button variant="primary" glass="frosted" size="md">
            Medium
          </Button>
          <Button variant="primary" glass="frosted" size="lg">
            Large
          </Button>
        </div>
      </section>

      {/* Border Width Comparison */}
      <section style={sectionStyle}>
        <h2
          style={{
            fontSize: "32px",
            fontWeight: "600",
            color: "white",
            textShadow: "0 2px 8px rgba(0,0,0,0.5)",
            marginBottom: "20px",
          }}
        >
          Border Width Variants (Primary + Frosted)
        </h2>
        <div
          style={{
            display: "flex",
            gap: "16px",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Button variant="primary" glass="frosted" borderWidth="1px">
            1px Border
          </Button>
          <Button variant="primary" glass="frosted" borderWidth="2px">
            2px Border
          </Button>
          <Button variant="primary" glass="frosted" borderWidth="3px">
            3px Border
          </Button>
        </div>
      </section>

      {/* Comparison: Solid vs Glass */}
      <section style={sectionStyle}>
        <h2
          style={{
            fontSize: "32px",
            fontWeight: "600",
            color: "white",
            textShadow: "0 2px 8px rgba(0,0,0,0.5)",
            marginBottom: "20px",
          }}
        >
          Solid vs Glass Comparison
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "16px",
            maxWidth: "800px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <span
              style={{
                color: "white",
                fontSize: "14px",
                fontWeight: "500",
                textShadow: "0 1px 4px rgba(0,0,0,0.5)",
              }}
            >
              Solid
            </span>
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="danger">Danger</Button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <span
              style={{
                color: "white",
                fontSize: "14px",
                fontWeight: "500",
                textShadow: "0 1px 4px rgba(0,0,0,0.5)",
              }}
            >
              Frosted Glass
            </span>
            <Button variant="primary" glass="frosted">
              Primary
            </Button>
            <Button variant="secondary" glass="frosted">
              Secondary
            </Button>
            <Button variant="danger" glass="frosted">
              Danger
            </Button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <span
              style={{
                color: "white",
                fontSize: "14px",
                fontWeight: "500",
                textShadow: "0 1px 4px rgba(0,0,0,0.5)",
              }}
            >
              Liquid Glass
            </span>
            <Button variant="primary" glass="liquid">
              Primary
            </Button>
            <Button variant="secondary" glass="liquid">
              Secondary
            </Button>
            <Button variant="danger" glass="liquid">
              Danger
            </Button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <span
              style={{
                color: "white",
                fontSize: "14px",
                fontWeight: "500",
                textShadow: "0 1px 4px rgba(0,0,0,0.5)",
              }}
            >
              Tinted Glass
            </span>
            <Button variant="primary" glass="tinted">
              Primary
            </Button>
            <Button variant="secondary" glass="tinted">
              Secondary
            </Button>
            <Button variant="danger" glass="tinted">
              Danger
            </Button>
          </div>
        </div>
      </section>

      {/* Clear vs Frosted Comparison */}
      <section style={sectionStyle}>
        <h2
          style={{
            fontSize: "32px",
            fontWeight: "600",
            color: "white",
            textShadow: "0 2px 8px rgba(0,0,0,0.5)",
            marginBottom: "20px",
          }}
        >
          Clear vs Frosted Glass Comparison
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "16px",
            maxWidth: "600px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <span
              style={{
                color: "white",
                fontSize: "14px",
                fontWeight: "500",
                textShadow: "0 1px 4px rgba(0,0,0,0.5)",
              }}
            >
              Clear Glass (Ultra Minimal)
            </span>
            <Button variant="primary" glass="clear">
              Primary
            </Button>
            <Button variant="secondary" glass="clear">
              Secondary
            </Button>
            <Button variant="danger" glass="clear">
              Danger
            </Button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <span
              style={{
                color: "white",
                fontSize: "14px",
                fontWeight: "500",
                textShadow: "0 1px 4px rgba(0,0,0,0.5)",
              }}
            >
              Frosted Glass (Moderate)
            </span>
            <Button variant="primary" glass="frosted">
              Primary
            </Button>
            <Button variant="secondary" glass="frosted">
              Secondary
            </Button>
            <Button variant="danger" glass="frosted">
              Danger
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          marginTop: "auto",
          paddingTop: "32px",
          textAlign: "center",
        }}
      >
        <p
          style={{
            color: "rgba(255,255,255,0.7)",
            fontSize: "14px",
            textShadow: "0 1px 4px rgba(0,0,0,0.5)",
          }}
        >
          PanaUI Glass Demo • Toggle theme to see automatic light/dark glass variants
        </p>
      </footer>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
