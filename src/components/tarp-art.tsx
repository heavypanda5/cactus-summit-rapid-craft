import { useId } from "react"
import {
  layoutBanner,
  palette,
  ribbonPath,
  roundRectPath,
  type TarpCopy,
  type TarpSize,
} from "@/lib/tarp/layout"

type Props = {
  copy: TarpCopy
  size: TarpSize
  grillHref: string
  beerHref: string
  guides?: boolean
}

export function TarpArt({ copy, size, grillHref, beerHref, guides = false }: Props) {
  const layout = layoutBanner(copy, size)
  const uid = useId().replace(/:/g, "")
  const shade = `shade-${uid}`
  const ember = `ember-${uid}`
  const clip = `clip-${uid}`
  const neon = `neon-${uid}`
  const { w, h } = layout
  const radius = Math.min(w, h) * 0.02
  const inset = Math.min(w, h) * 0.012
  const label = "Barbecue Station and Beverages tarpaulin, owned by Vinz Vanz"

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      role="img"
      aria-label={label}
      className="block h-auto w-full bg-bg-deep"
    >
      <defs>
        <clipPath id={clip}>
          <rect width={w} height={h} />
        </clipPath>
        <linearGradient id={shade} x1="0" y1="0" x2={layout.portrait ? "0" : "1"} y2={layout.portrait ? "1" : "0"}>
          <stop offset="0" stopColor="#000" stopOpacity="0.38" />
          <stop offset="0.16" stopColor="#000" stopOpacity="0.08" />
          <stop offset="0.34" stopColor="#000" stopOpacity="0.5" />
          <stop offset="0.5" stopColor="#000" stopOpacity="0.74" />
          <stop offset="0.66" stopColor="#000" stopOpacity="0.5" />
          <stop offset="0.84" stopColor="#000" stopOpacity="0.08" />
          <stop offset="1" stopColor="#000" stopOpacity="0.38" />
        </linearGradient>
        <radialGradient id={ember} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={palette.ember} stopOpacity="0.95" />
          <stop offset="46%" stopColor="#ff2a00" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#ff2a00" stopOpacity="0" />
        </radialGradient>
        <filter id={neon} x="-40%" y="-40%" width="180%" height="180%">
          <feDropShadow dx="0" dy="0" stdDeviation={Math.max(1.2, h * 0.006)} floodColor="#ff6a00" floodOpacity="0.95" />
          <feDropShadow dx="0" dy="0" stdDeviation={Math.max(2.4, h * 0.014)} floodColor="#ff3a00" floodOpacity="0.55" />
        </filter>
      </defs>
      <g clipPath={`url(#${clip})`}>
        <rect width={w} height={h} fill={palette.ink} />
        <image
          href={grillHref}
          x={layout.grill.x}
          y={layout.grill.y}
          width={layout.grill.w}
          height={layout.grill.h}
          preserveAspectRatio="xMidYMid slice"
        />
        <image
          href={beerHref}
          x={layout.beer.x}
          y={layout.beer.y}
          width={layout.beer.w}
          height={layout.beer.h}
          preserveAspectRatio="xMidYMid slice"
        />
        <rect width={w} height={h} fill={`url(#${shade})`} />
        <ellipse
          cx={layout.plate.x + layout.plate.w / 2}
          cy={layout.plate.y + layout.plate.h / 2}
          rx={layout.plate.w * 0.72}
          ry={layout.plate.h * 0.78}
          fill={`url(#${ember})`}
          opacity="0.9"
        />
        {layout.sparks.map((spark, index) => (
          <circle
            key={index}
            cx={spark.x}
            cy={spark.y}
            r={spark.r}
            fill={spark.hot ? palette.bulbHot : palette.spark}
            opacity={spark.o}
          />
        ))}
        <path
          d={roundRectPath(layout.plate.x, layout.plate.y, layout.plate.w, layout.plate.h, radius)}
          fill={palette.plate}
          opacity="0.9"
        />
        <path
          d={roundRectPath(
            layout.plate.x + inset,
            layout.plate.y + inset,
            layout.plate.w - inset * 2,
            layout.plate.h - inset * 2,
            radius * 0.7,
          )}
          fill="none"
          stroke={palette.gold}
          strokeWidth={0.7}
        />
        {layout.bulbs.length > 1 && (
          <polyline
            points={layout.bulbs.map((bulb) => `${bulb.x},${bulb.y}`).join(" ")}
            fill="none"
            stroke={palette.wire}
            strokeWidth={1.15}
            strokeLinejoin="round"
          />
        )}
        {layout.bulbs.map((bulb, index) => (
          <g key={index}>
            <circle cx={bulb.x} cy={bulb.y} r={bulb.r * 2.2} fill={palette.ember} opacity="0.35" />
            <circle
              cx={bulb.x}
              cy={bulb.y}
              r={bulb.r}
              fill={bulb.hot ? palette.bulbHot : palette.bulb}
              stroke={palette.gold}
              strokeWidth={0.45}
            />
            <circle cx={bulb.x - bulb.r * 0.28} cy={bulb.y - bulb.r * 0.28} r={bulb.r * 0.28} fill="#fff" opacity="0.8" />
          </g>
        ))}
        <rect
          x={layout.frame}
          y={layout.frame}
          width={w - layout.frame * 2}
          height={h - layout.frame * 2}
          fill="none"
          stroke={palette.frame}
          strokeWidth={1.7}
        />
        <rect
          x={layout.frame * 1.7}
          y={layout.frame * 1.7}
          width={w - layout.frame * 3.4}
          height={h - layout.frame * 3.4}
          fill="none"
          stroke={palette.foam}
          strokeWidth={0.45}
          opacity="0.85"
        />
        {[
          [layout.frame * 2.3, layout.frame * 2.3],
          [w - layout.frame * 2.3, layout.frame * 2.3],
          [layout.frame * 2.3, h - layout.frame * 2.3],
          [w - layout.frame * 2.3, h - layout.frame * 2.3],
        ].map(([x, y]) => {
          const d = Math.min(w, h) * 0.012
          return <polygon key={`${x}-${y}`} points={`${x},${y - d} ${x + d},${y} ${x},${y + d} ${x - d},${y}`} fill={palette.gold} />
        })}
        {layout.kicker && <Text run={layout.kicker} fill={palette.gold} anchor={w / 2} />}
        {layout.line1 && <Text run={layout.line1} fill={palette.foam} anchor={w / 2} glow={neon} />}
        {layout.line2 && <Text run={layout.line2} fill={palette.station} anchor={w / 2} glow={neon} />}
        {layout.ribbonText && layout.ribbon.w > 0 && (
          <path
            d={ribbonPath(layout.ribbon.x, layout.ribbon.y, layout.ribbon.w, layout.ribbon.h)}
            fill={palette.ribbon}
            stroke={palette.gold}
            strokeWidth={0.85}
          />
        )}
        {layout.ribbonText && <Text run={layout.ribbonText} fill={palette.foam} anchor={w / 2} />}
        {layout.rules && layout.ownerLabel && (
          <>
            <line
              x1={layout.rules.x1}
              x2={w / 2 - layout.ownerLabel.width / 2 - layout.ownerLabel.size * 0.7}
              y1={layout.rules.y}
              y2={layout.rules.y}
              stroke={palette.gold}
              strokeWidth={0.7}
            />
            <line
              x1={w / 2 + layout.ownerLabel.width / 2 + layout.ownerLabel.size * 0.7}
              x2={layout.rules.x2}
              y1={layout.rules.y}
              y2={layout.rules.y}
              stroke={palette.gold}
              strokeWidth={0.7}
            />
          </>
        )}
        {layout.ownerLabel && <Text run={layout.ownerLabel} fill={palette.gold} anchor={w / 2} />}
        {layout.owner && <Text run={layout.owner} fill={palette.owner} anchor={w / 2} />}
        {layout.extra && <Text run={layout.extra} fill={palette.foam} anchor={w / 2} />}
        {guides && (
          <rect
            x={layout.safe}
            y={layout.safe}
            width={w - layout.safe * 2}
            height={h - layout.safe * 2}
            fill="none"
            stroke={palette.gold}
            strokeWidth={0.6}
            strokeDasharray="4 3"
            opacity="0.85"
          />
        )}
      </g>
    </svg>
  )
}

function Text({
  run,
  fill,
  anchor,
  glow,
}: {
  run: { text: string; face: "bebas" | "rye"; size: number; y: number }
  fill: string
  anchor: number
  glow?: string
}) {
  return (
    <text
      x={anchor}
      y={run.y}
      textAnchor="middle"
      fill={fill}
      fontSize={run.size}
      fontFamily={run.face === "rye" ? "Rye, Georgia, serif" : "Bebas Neue, Impact, sans-serif"}
      filter={glow ? `url(#${glow})` : undefined}
    >
      {run.text}
    </text>
  )
}
