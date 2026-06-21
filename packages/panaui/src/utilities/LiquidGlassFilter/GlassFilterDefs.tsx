// SVG filter pipeline adapted from https://github.com/rdev/liquid-glass-react (MIT).
// Builds an edge-only displacement + per-channel chromatic aberration effect:
// the displacement map bulges the backdrop near the element's edges, and the
// R/G/B channels are displaced by slightly different amounts and screen-blended
// back together, masked so only the edges show aberration and the center stays clean.

export interface GlassFilterDefsProps {
  id: string;
  width: number;
  height: number;
  displacementScale: number;
  aberrationIntensity: number;
  shaderMapUrl: string;
}

export function GlassFilterDefs({
  id,
  width,
  height,
  displacementScale,
  aberrationIntensity,
  shaderMapUrl,
}: GlassFilterDefsProps) {
  return (
    // Needs a real pixel-sized viewport (not 0×0) for the filter's
    // percentage-based primitive subregions to resolve correctly — an
    // empty <defs> renders nothing visually, so this stays invisible
    // without needing to be collapsed to zero size.
    <svg style={{ position: "absolute", width, height, overflow: "hidden" }} aria-hidden="true">
      <defs>
        <radialGradient id={`${id}-edge-mask`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="black" stopOpacity="0" />
          <stop
            offset={`${Math.max(30, 80 - aberrationIntensity * 2)}%`}
            stopColor="black"
            stopOpacity="0"
          />
          <stop offset="100%" stopColor="white" stopOpacity="1" />
        </radialGradient>
        <filter
          id={id}
          x="-35%"
          y="-35%"
          width="170%"
          height="170%"
          colorInterpolationFilters="sRGB"
        >
          <feImage
            x="0"
            y="0"
            width="100%"
            height="100%"
            result="DISPLACEMENT_MAP"
            href={shaderMapUrl}
            preserveAspectRatio="xMidYMid slice"
          />

          {/* Edge mask derived from the displacement map's own intensity */}
          <feColorMatrix
            in="DISPLACEMENT_MAP"
            type="matrix"
            values="0.3 0.3 0.3 0 0
                   0.3 0.3 0.3 0 0
                   0.3 0.3 0.3 0 0
                   0 0 0 1 0"
            result="EDGE_INTENSITY"
          />
          <feComponentTransfer in="EDGE_INTENSITY" result="EDGE_MASK">
            <feFuncA type="discrete" tableValues={`0 ${aberrationIntensity * 0.05} 1`} />
          </feComponentTransfer>

          {/* Original undisplaced image for the center */}
          <feOffset in="SourceGraphic" dx="0" dy="0" result="CENTER_ORIGINAL" />

          {/* Red channel, displaced */}
          <feDisplacementMap
            in="SourceGraphic"
            in2="DISPLACEMENT_MAP"
            scale={displacementScale}
            xChannelSelector="R"
            yChannelSelector="B"
            result="RED_DISPLACED"
          />
          <feColorMatrix
            in="RED_DISPLACED"
            type="matrix"
            values="1 0 0 0 0
                   0 0 0 0 0
                   0 0 0 0 0
                   0 0 0 1 0"
            result="RED_CHANNEL"
          />

          {/* Green channel, displaced with a slight offset for separation */}
          <feDisplacementMap
            in="SourceGraphic"
            in2="DISPLACEMENT_MAP"
            scale={displacementScale - aberrationIntensity * 0.05 * displacementScale}
            xChannelSelector="R"
            yChannelSelector="B"
            result="GREEN_DISPLACED"
          />
          <feColorMatrix
            in="GREEN_DISPLACED"
            type="matrix"
            values="0 0 0 0 0
                   0 1 0 0 0
                   0 0 0 0 0
                   0 0 0 1 0"
            result="GREEN_CHANNEL"
          />

          {/* Blue channel, displaced with a larger offset */}
          <feDisplacementMap
            in="SourceGraphic"
            in2="DISPLACEMENT_MAP"
            scale={displacementScale - aberrationIntensity * 0.1 * displacementScale}
            xChannelSelector="R"
            yChannelSelector="B"
            result="BLUE_DISPLACED"
          />
          <feColorMatrix
            in="BLUE_DISPLACED"
            type="matrix"
            values="0 0 0 0 0
                   0 0 0 0 0
                   0 0 1 0 0
                   0 0 0 1 0"
            result="BLUE_CHANNEL"
          />

          {/* Recombine channels with screen blending for the aberration effect */}
          <feBlend in="GREEN_CHANNEL" in2="BLUE_CHANNEL" mode="screen" result="GB_COMBINED" />
          <feBlend in="RED_CHANNEL" in2="GB_COMBINED" mode="screen" result="RGB_COMBINED" />

          {/* Soften the aberration */}
          <feGaussianBlur
            in="RGB_COMBINED"
            stdDeviation={Math.max(0.1, 0.5 - aberrationIntensity * 0.1)}
            result="ABERRATED_BLURRED"
          />

          {/* Apply the edge mask to the aberration, keep the clean center */}
          <feComposite
            in="ABERRATED_BLURRED"
            in2="EDGE_MASK"
            operator="in"
            result="EDGE_ABERRATION"
          />
          <feComponentTransfer in="EDGE_MASK" result="INVERTED_MASK">
            <feFuncA type="table" tableValues="1 0" />
          </feComponentTransfer>
          <feComposite
            in="CENTER_ORIGINAL"
            in2="INVERTED_MASK"
            operator="in"
            result="CENTER_CLEAN"
          />

          <feComposite in="EDGE_ABERRATION" in2="CENTER_CLEAN" operator="over" />
        </filter>
      </defs>
    </svg>
  );
}
