import {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Rotate3DProps {
  /**
   * Controlled rotation around the X axis in degrees.
   * Positive values tilt the top of the element away from the viewer.
   * Stacks additively with hover and drag contributions.
   * @default 0
   */
  rotateX?: number;
  /**
   * Controlled rotation around the Y axis in degrees.
   * Positive values rotate the right edge away from the viewer.
   * Stacks additively with hover and drag contributions.
   * @default 0
   */
  rotateY?: number;
  /**
   * Controlled rotation around the Z axis in degrees.
   * Equivalent to a flat 2-D clockwise rotation.
   * @default 0
   */
  rotateZ?: number;
  /**
   * CSS `perspective` distance in px applied to the outer wrapper.
   * Smaller values produce a more dramatic 3-D effect; larger values appear
   * flatter. Set to `Infinity` (or a very large number) to disable perspective.
   * @default 800
   */
  perspective?: number;
  /**
   * When `true`, the element tilts to follow the cursor while hovered.
   * The tilt is proportional to how far the cursor is from the element's
   * centre, up to `hoverTiltAmount` degrees.
   * Resets to 0 when the cursor leaves.
   * @default false
   */
  hoverTilt?: boolean;
  /**
   * Maximum tilt angle in degrees applied by the hover mode.
   * Only relevant when `hoverTilt` is `true`.
   * @default 15
   */
  hoverTiltAmount?: number;
  /**
   * When `true`, the element can be freely spun on the X and Y axes by
   * clicking (or touching) and dragging. The accumulated drag rotation
   * persists after each gesture and stacks additively with `rotateX`/`rotateY`
   * and any active hover tilt.
   * CSS transition is suppressed during the drag for a snappy feel.
   * @default false
   */
  interactive?: boolean;
  /**
   * Duration of the CSS `transform` transition in milliseconds.
   * Controls how smoothly controlled and hover changes animate.
   * Automatically set to `0` while the user is actively dragging.
   * @default 150
   */
  transitionDuration?: number;
  /** Additional class names applied to the outer perspective wrapper. */
  className?: string;
  /** Inline styles merged onto the outer perspective wrapper. */
  style?: CSSProperties;
  /** The content to render inside the 3-D transform context. */
  children: ReactNode;
}

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * `Rotate3D` is a layout utility that wraps any children in a CSS 3-D
 * transform context, enabling rotation around all three axes.
 *
 * Three modes are available and **additive** — they can all be active at once:
 *
 * | Mode | Props | Description |
 * |---|---|---|
 * | **Controlled** | `rotateX` / `rotateY` / `rotateZ` | Static rotation driven by prop values |
 * | **Hover tilt** | `hoverTilt`, `hoverTiltAmount` | Element tilts to follow the cursor |
 * | **Interactive drag** | `interactive` | Mouse / touch drag freely spins the element |
 *
 * @example
 * // Static tilt
 * <Rotate3D rotateX={20} rotateY={-15}>
 *   <Button>3D Button</Button>
 * </Rotate3D>
 *
 * @example
 * // Hover + drag combined
 * <Rotate3D hoverTilt interactive>
 *   <Card>Spin me</Card>
 * </Rotate3D>
 */

export const Rotate3D = forwardRef<HTMLDivElement, Rotate3DProps>(function Rotate3D(
  {
    rotateX = 0,
    rotateY = 0,
    rotateZ = 0,
    perspective = 800,
    hoverTilt = false,
    hoverTiltAmount = 15,
    interactive = false,
    transitionDuration = 150,
    className,
    style,
    children,
  },
  ref
) {
  // ── Hover state ───────────────────────────────────────────────────────────
  const [hoverX, setHoverX] = useState(0);
  const [hoverY, setHoverY] = useState(0);

  // ── Drag state ────────────────────────────────────────────────────────────
  const [dragX, setDragX] = useState(0);
  const [dragY, setDragY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  // Refs avoid stale closures in the global event effect
  const dragStartRef = useRef<{ x: number; y: number } | null>(null);
  const dragAccumRef = useRef({ x: 0, y: 0 }); // totals before the current drag session
  const dragCurrentRef = useRef({ x: 0, y: 0 }); // live totals during the current session

  // ── Hover handlers ────────────────────────────────────────────────────────
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!hoverTilt || isDragging) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1; // [-1, 1]
      const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1; // [-1, 1]
      setHoverX(-ny * hoverTiltAmount);
      setHoverY(nx * hoverTiltAmount);
    },
    [hoverTilt, hoverTiltAmount, isDragging]
  );

  const handleMouseLeave = useCallback(() => {
    if (!hoverTilt) return;
    setHoverX(0);
    setHoverY(0);
  }, [hoverTilt]);

  // ── Drag handlers ─────────────────────────────────────────────────────────
  const startDrag = useCallback(
    (clientX: number, clientY: number) => {
      if (!interactive) return;
      dragStartRef.current = { x: clientX, y: clientY };
      setIsDragging(true);
    },
    [interactive]
  );

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!interactive) return;
      e.preventDefault();
      startDrag(e.clientX, e.clientY);
    },
    [interactive, startDrag]
  );

  const handleTouchStart = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      const touch = e.touches[0];
      if (!interactive || !touch) return;
      startDrag(touch.clientX, touch.clientY);
    },
    [interactive, startDrag]
  );

  // Global move / up listeners (only while a drag is active)
  useEffect(() => {
    if (!isDragging) return;

    const onMove = (clientX: number, clientY: number) => {
      if (!dragStartRef.current) return;
      const dx = clientX - dragStartRef.current.x;
      const dy = clientY - dragStartRef.current.y;
      const newX = dragAccumRef.current.x + dy * 0.4; // vertical drag → X rotation
      const newY = dragAccumRef.current.y + dx * 0.4; // horizontal drag → Y rotation
      dragCurrentRef.current = { x: newX, y: newY };
      setDragX(newX);
      setDragY(newY);
    };

    const onMouseMove = (e: MouseEvent) => onMove(e.clientX, e.clientY);
    const onTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (touch) onMove(touch.clientX, touch.clientY);
    };

    const stop = () => {
      // Persist the final angle so the next drag session starts from here
      dragAccumRef.current = { ...dragCurrentRef.current };
      dragStartRef.current = null;
      setIsDragging(false);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", stop);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", stop);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", stop);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", stop);
    };
  }, [isDragging]);

  // ── Combined transform ────────────────────────────────────────────────────
  const totalX = rotateX + hoverX + dragX;
  const totalY = rotateY + hoverY + dragY;
  const totalZ = rotateZ;

  const outerStyle: CSSProperties = {
    perspective: `${perspective}px`,
    display: "inline-flex",
    cursor: interactive ? (isDragging ? "grabbing" : "grab") : undefined,
    ...style,
  };

  const innerStyle: CSSProperties = {
    transform: `rotateX(${totalX}deg) rotateY(${totalY}deg) rotateZ(${totalZ}deg)`,
    transformStyle: "preserve-3d",
    transition: isDragging ? "none" : `transform ${transitionDuration}ms ease`,
    willChange: "transform",
    display: "inline-flex",
  };

  return (
    <div
      ref={ref}
      style={outerStyle}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      <div style={innerStyle}>{children}</div>
    </div>
  );
});
