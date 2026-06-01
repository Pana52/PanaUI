import { borderRadius, colors, spacing } from "@panaui/tokens";

const meta = {
  title: "Foundation/Tokens",
};

export default meta;

function TokenGrid() {
  const primaryShades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900] as const;
  const neutralShades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900] as const;

  return (
    <div
      style={{
        fontFamily: "Inter, system-ui, sans-serif",
        padding: 24,
        color: colors.neutral[900],
      }}
    >
      <div style={{ display: "grid", gap: 24 }}>
        <section>
          <h2 style={{ margin: 0, fontSize: 20, lineHeight: 1.2 }}>Colors</h2>
          <div style={{ display: "grid", gap: 16, marginTop: 16 }}>
            <ColorScale label="Primary" shades={primaryShades} scale={colors.primary} />
            <ColorScale label="Neutral" shades={neutralShades} scale={colors.neutral} />
            <ColorSwatch label="Success" value={colors.success} />
            <ColorSwatch label="Warning" value={colors.warning} />
            <ColorSwatch label="Error" value={colors.error} />
          </div>
        </section>

        <section>
          <h2 style={{ margin: 0, fontSize: 20, lineHeight: 1.2 }}>Spacing</h2>
          <div style={{ display: "grid", gap: 8, marginTop: 16 }}>
            {Object.entries(spacing).map(([key, value]) => (
              <div
                key={key}
                style={{
                  display: "grid",
                  gridTemplateColumns: "72px 1fr",
                  alignItems: "center",
                  gap: 16,
                }}
              >
                <span style={{ fontSize: 14, color: colors.neutral[600] }}>{key}</span>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div
                    style={{
                      width: value,
                      height: 12,
                      borderRadius: 9999,
                      background: colors.primary[500],
                    }}
                  />
                  <span style={{ fontSize: 14 }}>{value}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 style={{ margin: 0, fontSize: 20, lineHeight: 1.2 }}>Border radius</h2>
          <div style={{ display: "grid", gap: 12, marginTop: 16 }}>
            {Object.entries(borderRadius).map(([key, value]) => (
              <div key={key} style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <span style={{ width: 72, fontSize: 14, color: colors.neutral[600] }}>{key}</span>
                <div
                  style={{
                    width: 80,
                    height: 48,
                    borderRadius: value,
                    background: colors.primary[100],
                    border: `1px solid ${colors.primary[300]}`,
                  }}
                />
                <span style={{ fontSize: 14 }}>{value}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export const Default = {
  render: () => <TokenGrid />,
};

function ColorScale({
  label,
  shades,
  scale,
}: {
  label: string;
  shades: readonly number[];
  scale: Record<number, string>;
}) {
  return (
    <div>
      <h3 style={{ margin: "0 0 12px", fontSize: 16 }}>{label}</h3>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
          gap: 12,
        }}
      >
        {shades.map((shade) => (
          <ColorSwatch key={shade} label={String(shade)} value={scale[shade]!} />
        ))}
      </div>
    </div>
  );
}

function ColorSwatch({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        border: `1px solid ${colors.neutral[200]}`,
        borderRadius: borderRadius.lg,
        overflow: "hidden",
        background: "white",
      }}
    >
      <div style={{ height: 72, background: value }} />
      <div style={{ padding: 12 }}>
        <div style={{ fontSize: 14, fontWeight: 600 }}>{label}</div>
        <div style={{ fontSize: 12, color: colors.neutral[600], marginTop: 4 }}>{value}</div>
      </div>
    </div>
  );
}
