import type { Meta, StoryObj } from "@storybook/react";
import { Rotate3D } from "./Rotate3D";
import { Button } from "../../components/Button";

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<typeof Rotate3D> = {
  title: "Utilities/Rotate3D",
  component: Rotate3D,
  tags: ["autodocs"],
  argTypes: {
    rotateX: { control: { type: "range", min: -180, max: 180, step: 1 } },
    rotateY: { control: { type: "range", min: -180, max: 180, step: 1 } },
    rotateZ: { control: { type: "range", min: -180, max: 180, step: 1 } },
    perspective: { control: { type: "range", min: 100, max: 2000, step: 50 } },
    hoverTiltAmount: { control: { type: "range", min: 1, max: 45, step: 1 } },
    transitionDuration: { control: { type: "range", min: 0, max: 1000, step: 50 } },
    hoverTilt: { control: "boolean" },
    interactive: { control: "boolean" },
  },
  args: {
    rotateX: 0,
    rotateY: 0,
    rotateZ: 0,
    perspective: 800,
    hoverTiltAmount: 15,
    transitionDuration: 150,
    hoverTilt: false,
    interactive: false,
  },
  decorators: [
    (Story) => (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 80,
          minHeight: 200,
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Rotate3D>;

// ─── Default (Controlled) ─────────────────────────────────────────────────────

export const Default: Story = {
  name: "Controlled rotation",
  args: {
    rotateX: 20,
    rotateY: -20,
    rotateZ: 0,
  },
  render: (args) => (
    <Rotate3D {...args}>
      <Button>3D Button</Button>
    </Rotate3D>
  ),
};

// ─── Hover Tilt ───────────────────────────────────────────────────────────────

export const HoverTilt: Story = {
  name: "Hover tilt",
  args: {
    hoverTilt: true,
    hoverTiltAmount: 15,
  },
  render: (args) => (
    <Rotate3D {...args}>
      <Button>Hover me</Button>
    </Rotate3D>
  ),
};

// ─── Interactive (Drag) ───────────────────────────────────────────────────────

export const Interactive: Story = {
  name: "Interactive drag",
  args: {
    interactive: true,
  },
  render: (args) => (
    <div style={{ textAlign: "center", userSelect: "none" }}>
      <Rotate3D {...args}>
        <Button>Drag me</Button>
      </Rotate3D>
      <p style={{ marginTop: 16, color: "#6b7280", fontSize: 12 }}>
        Click and drag to spin on any axis
      </p>
    </div>
  ),
};

// ─── Combined Modes ───────────────────────────────────────────────────────────

export const CombinedModes: Story = {
  name: "All modes combined",
  args: {
    rotateX: 10,
    rotateY: 10,
    hoverTilt: true,
    hoverTiltAmount: 10,
    interactive: true,
  },
  render: (args) => (
    <div style={{ textAlign: "center", userSelect: "none" }}>
      <Rotate3D {...args}>
        <Button>All modes active</Button>
      </Rotate3D>
      <p style={{ marginTop: 16, color: "#6b7280", fontSize: 12 }}>
        Base rotation + hover tilt + drag spin — all additive
      </p>
    </div>
  ),
};
