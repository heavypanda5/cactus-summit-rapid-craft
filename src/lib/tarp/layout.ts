export const UNITS_PER_INCH = 10
export const EYELET_INSET_IN = 2.5

export type TarpSize = {
  id: string
  label: string
  blurb: string
  wIn: number
  hIn: number
}

export const SIZES: TarpSize[] = [
  { id: "8x4", label: "8 × 4 ft", blurb: "Storefront banner", wIn: 96, hIn: 48 },
  { id: "6x3", label: "6 × 3 ft", blurb: "Smaller shopfront", wIn: 72, hIn: 36 },
  { id: "10x5", label: "10 × 5 ft", blurb: "Roadside banner", wIn: 120, hIn: 60 },
  { id: "8x3", label: "8 × 3 ft", blurb: "Long fascia sign", wIn: 96, hIn: 36 },
  { id: "4x8", label: "4 × 8 ft", blurb: "Vertical standee", wIn: 48, hIn: 96 },
]

export type TarpCopy = {
  kicker: string
  line1: string
  line2: string
  ribbon: string
  ownerLabel: string
  owner: string
  phone: string
  place: string
}

export const defaultCopy: TarpCopy = {
  kicker: "CHARCOAL GRILLED  /  ICE-COLD DRINKS",
  line1: "BARBECUE",
  line2: "STATION",
  ribbon: "AND BEVERAGES",
  ownerLabel: "OWNED BY",
  owner: "VINZ VANZ",
  phone: "",
  place: "",
}

export const palette = {
  ink: "#140804",
  plate: "#120705",
  gold: "#ffc14a",
  station: "#ffd15c",
  foam: "#fff6e4",
  ember: "#ff4e12",
  ribbon: "#9e1c0b",
  wire: "#6a3a16",
  spark: "#ffb15a",
  bulb: "#ffd98a",
  bulbHot: "#fff6d8",
  owner: "#ffe7b5",
  frame: "#ffb62e",
}

/** Advance width in ems. Summed advances match fontkit for these faces. */
const BEBAS: Record<string, number> = {
  "0": 0.4, "1": 0.4, "2": 0.4, "3": 0.4, "4": 0.4, "5": 0.4, "6": 0.4, "7": 0.4, "8": 0.4, "9": 0.4,
  A: 0.401, B: 0.404, C: 0.383, D: 0.406, E: 0.363, F: 0.344, G: 0.391, H: 0.42, I: 0.192, J: 0.265,
  K: 0.414, L: 0.344, M: 0.538, N: 0.427, O: 0.4, P: 0.386, Q: 0.4, R: 0.403, S: 0.372, T: 0.364,
  U: 0.402, V: 0.382, W: 0.557, X: 0.406, Y: 0.394, Z: 0.362, " ": 0.16, ".": 0.188, "&": 0.417,
  "'": 0.188, "-": 0.27, ":": 0.188, "+": 0.4, "/": 0.389, ",": 0.188, "(": 0.24, ")": 0.24,
}

const RYE: Record<string, number> = {
  "0": 0.714, "1": 0.451, "2": 0.634, "3": 0.608, "4": 0.695, "5": 0.628, "6": 0.713, "7": 0.61,
  "8": 0.687, "9": 0.713, A: 0.712, B: 0.743, C: 0.645, D: 0.776, E: 0.704, F: 0.66, G: 0.719,
  H: 0.84, I: 0.438, J: 0.602, K: 0.752, L: 0.66, M: 1.022, N: 0.81, O: 0.769, P: 0.695, Q: 0.769,
  R: 0.758, S: 0.613, T: 0.737, U: 0.756, V: 0.692, W: 1.055, X: 0.672, Y: 0.663, Z: 0.697,
  " ": 0.244, ".": 0.331, "&": 0.833, "'": 0.284, "-": 0.42, ":": 0.331, "+": 0.526, "/": 0.399,
  ",": 0.331, "(": 0.4, ")": 0.4,
}

export type Face = "bebas" | "rye"

export function measure(face: Face, text: string, size: number): number {
  const map = face === "bebas" ? BEBAS : RYE
  let w = 0
  for (const ch of text) {
    w += (map[ch] ?? map[ch.toUpperCase()] ?? 0.5) * size
  }
  return w
}

export type Box = { x: number; y: number; w: number; h: number }
export type Pt = { x: number; y: number; r: number; hot: boolean; o: number }

export type Run = {
  text: string
  face: Face
  size: number
  /** SVG baseline, y grows downward. */
  y: number
  width: number
}

export type BannerLayout = {
  w: number
  h: number
  portrait: boolean
  frame: number
  safe: number
  grill: Box
  beer: Box
  plate: Box
  ribbon: Box
  bulbs: Pt[]
  sparks: Pt[]
  kicker: Run | null
  line1: Run | null
  line2: Run | null
  ribbonText: Run | null
  ownerLabel: Run | null
  owner: Run | null
  extra: Run | null
  rules: { x1: number; x2: number; y: number } | null
}

function mulberry32(seed: number) {
  let a = seed >>> 0
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function upper(value: string): string {
  return value.toUpperCase().replace(/\s+/g, " ").trim()
}

export function ribbonPath(x: number, y: number, w: number, h: number): string {
  const n = Math.min(h * 0.28, w * 0.08)
  return [
    `M ${x + n} ${y}`,
    `H ${x + w - n}`,
    `L ${x + w} ${y + h / 2}`,
    `L ${x + w - n} ${y + h}`,
    `H ${x + n}`,
    `L ${x} ${y + h / 2}`,
    "Z",
  ].join(" ")
}

export function roundRectPath(x: number, y: number, w: number, h: number, r: number): string {
  const radius = Math.max(0, Math.min(r, w / 2, h / 2))
  return [
    `M ${x + radius} ${y}`,
    `H ${x + w - radius}`,
    `Q ${x + w} ${y} ${x + w} ${y + radius}`,
    `V ${y + h - radius}`,
    `Q ${x + w} ${y + h} ${x + w - radius} ${y + h}`,
    `H ${x + radius}`,
    `Q ${x} ${y + h} ${x} ${y + h - radius}`,
    `V ${y + radius}`,
    `Q ${x} ${y} ${x + radius} ${y}`,
    "Z",
  ].join(" ")
}

type Piece = {
  key: "kicker" | "line1" | "line2" | "ribbon" | "ownerLabel" | "owner" | "extra"
  text: string
  face: Face
  size: number
  gapBefore: number
  cap: number
}

function layoutPieces(copy: TarpCopy, w: number, h: number, maxW: number, portrait: boolean): Piece[] {
  const kicker = upper(copy.kicker)
  const line1 = upper(copy.line1)
  const line2 = upper(copy.line2)
  const ribbon = upper(copy.ribbon)
  const ownerLabel = upper(copy.ownerLabel)
  const owner = upper(copy.owner)
  const extra = [copy.phone, copy.place].map((s) => upper(s)).filter(Boolean).join("   /   ")

  const headroom = portrait ? 0.16 : 0.22
  const heroRoom = portrait ? 0.2 : 0.3
  const fit = (face: Face, text: string, room: number, cap: number) => {
    if (!text) return 0
    const byWidth = maxW / (measure(face, text, 1) || 1)
    return Math.min(h * room, byWidth, cap)
  }

  const line2Size = fit("bebas", line2, heroRoom, maxW)
  const line1Size = fit("bebas", line1, headroom, line2Size > 0 ? line2Size * 0.86 : maxW)
  const ribbonSize = fit("bebas", ribbon, portrait ? 0.055 : 0.07, Math.max(line2Size, line1Size) * 0.34 || h * 0.07)
  const kickerSize = fit("bebas", kicker, 0.042, Math.min(h * 0.05, (line1Size || line2Size || h * 0.1) * 0.28))
  const labelSize = fit("bebas", ownerLabel, 0.034, (line2Size || line1Size || h * 0.1) * 0.16)
  const ownerSize = fit("rye", owner, portrait ? 0.09 : 0.115, (line2Size || line1Size || h * 0.2) * 0.42)
  const extraSize = fit("bebas", extra, 0.038, (ownerSize || labelSize || h * 0.08) * 0.62)

  const pieces: Piece[] = []
  const push = (key: Piece["key"], text: string, face: Face, size: number, gapBefore: number, cap: number) => {
    if (!text || size <= 0) return
    pieces.push({ key, text, face, size, gapBefore, cap })
  }
  push("kicker", kicker, "bebas", kickerSize, 0, 0.72)
  push("line1", line1, "bebas", line1Size, h * 0.018, 0.74)
  push("line2", line2, "bebas", line2Size, h * 0.008, 0.74)
  push("ribbon", ribbon, "bebas", ribbonSize, h * 0.02, 1.7)
  push("ownerLabel", ownerLabel, "bebas", labelSize, h * 0.028, 0.72)
  push("owner", owner, "rye", ownerSize, h * 0.006, 0.8)
  push("extra", extra, "bebas", extraSize, h * 0.012, 0.72)
  return pieces
}

function place(pieces: Piece[], scale: number, top: number): { runs: Map<Piece["key"], Run>; ribbon: Box; bottom: number; width: number } {
  const runs = new Map<Piece["key"], Run>()
  let y = top
  let width = 0
  let ribbon: Box = { x: 0, y: 0, w: 0, h: 0 }
  pieces.forEach((piece, index) => {
    const size = piece.size * scale
    const gap = index === 0 ? 0 : piece.gapBefore * scale
    y += gap
    if (piece.key === "ribbon") {
      const textW = measure(piece.face, piece.text, size)
      const rh = size * piece.cap
      const rw = textW + rh * 1.35
      ribbon = { x: 0, y, w: rw, h: rh }
      const baseline = y + rh * 0.72
      runs.set(piece.key, { text: piece.text, face: piece.face, size, y: baseline, width: textW })
      width = Math.max(width, rw)
      y += rh
      return
    }
    const textW = measure(piece.face, piece.text, size)
    const visual = size * piece.cap
    const baseline = y + visual
    runs.set(piece.key, { text: piece.text, face: piece.face, size, y: baseline, width: textW })
    width = Math.max(width, textW)
    y += visual
  })
  return { runs, ribbon, bottom: y, width }
}

export function layoutBanner(copy: TarpCopy, size: TarpSize): BannerLayout {
  const w = size.wIn * UNITS_PER_INCH
  const h = size.hIn * UNITS_PER_INCH
  const portrait = h > w
  const frame = Math.max(6, Math.min(w, h) * 0.022)
  const safe = EYELET_INSET_IN * UNITS_PER_INCH
  const side = portrait ? w : h
  const grill: Box = portrait
    ? { x: 0, y: 0, w: side, h: side }
    : { x: 0, y: 0, w: side, h: side }
  const beer: Box = portrait
    ? { x: 0, y: h - side, w: side, h: side }
    : { x: w - side, y: 0, w: side, h: side }

  const gap = portrait ? h - side * 2 : w - side * 2
  const maxW = gap > Math.min(w, h) * 0.12 ? Math.min(w * 0.92, gap + Math.min(w, h) * 0.08) : w * (portrait ? 0.84 : 0.5)
  const usableMax = Math.min(maxW, w - safe * 2 - frame)

  const raw = layoutPieces(copy, w, h, usableMax, portrait)
  const bulbR = Math.min(w, h) * 0.016
  const minTop = frame * 1.8 + bulbR * 2.4

  let scale = 1
  let top = minTop
  let placed = place(raw, scale, top)
  const bottomLimit = h - safe * 0.72

  for (let i = 0; i < 24; i++) {
    const blockH = placed.bottom - top
    const centered = Math.max(minTop, (h - blockH) / 2 - h * 0.01)
    top = centered
    placed = place(raw, scale, top)
    const pad = Math.min(w, h) * 0.04
    const plateLeft = (w - placed.width) / 2 - pad
    const plateRight = (w + placed.width) / 2 + pad
    const overflows = placed.bottom + pad > bottomLimit || plateLeft < safe || plateRight > w - safe
    if (!overflows || scale <= 0.62) break
    scale -= 0.03
    placed = place(raw, scale, top)
  }

  const padX = Math.min(w, h) * (portrait ? 0.05 : 0.045)
  const padY = Math.min(w, h) * 0.032
  const plate: Box = {
    x: (w - placed.width) / 2 - padX,
    y: top - padY,
    w: placed.width + padX * 2,
    h: placed.bottom - top + padY * 2,
  }
  plate.x = Math.max(frame * 1.6, plate.x)
  plate.w = Math.min(plate.w, w - plate.x - frame * 1.6)

  const ribbonRun = placed.runs.get("ribbon")
  const ribbon: Box = ribbonRun
    ? {
        x: (w - (placed.ribbon.w || 0)) / 2,
        y: placed.ribbon.y,
        w: placed.ribbon.w,
        h: placed.ribbon.h,
      }
    : { x: 0, y: 0, w: 0, h: 0 }

  const label = placed.runs.get("ownerLabel")
  const rules = label
    ? {
        y: label.y - label.size * 0.28,
        x1: w / 2 - label.width / 2 - label.size * 1.4,
        x2: w / 2 + label.width / 2 + label.size * 0.35,
      }
    : null

  const rand = mulberry32(0x51a71)
  const bulbs: Pt[] = []
  const count = portrait ? 7 : Math.max(9, Math.round(w / 90))
  for (let i = 0; i < count; i++) {
    const t = count === 1 ? 0.5 : i / (count - 1)
    const x = w * 0.07 + t * w * 0.86
    const sag = Math.sin(t * Math.PI) * h * (portrait ? 0.012 : 0.018)
    bulbs.push({
      x,
      y: frame * 1.35 + bulbR + sag,
      r: bulbR * (i % 3 === 1 ? 1.15 : 0.92),
      hot: i % 2 === 0,
      o: 1,
    })
  }

  const sparks: Pt[] = []
  const sparkCount = portrait ? 28 : 40
  for (let i = 0; i < sparkCount; i++) {
    const onLeft = rand() > (portrait ? 0.5 : 0.38)
    const x = portrait
      ? rand() * w
      : onLeft
        ? rand() * Math.min(grill.w * 0.92, plate.x - 4)
        : Math.max(plate.x + plate.w + 4, w * 0.62) + rand() * (w - Math.max(plate.x + plate.w + 4, w * 0.62))
    const y = portrait
      ? rand() > 0.5
        ? rand() * grill.h * 0.85
        : h - rand() * beer.h * 0.8
      : rand() * h * 0.92
    sparks.push({
      x: Math.min(w - 4, Math.max(4, x)),
      y: Math.min(h - 4, Math.max(4, y)),
      r: (0.35 + rand() * 0.8) * Math.min(w, h) * 0.0045,
      hot: rand() > 0.4,
      o: 0.35 + rand() * 0.6,
    })
  }

  return {
    w,
    h,
    portrait,
    frame,
    safe,
    grill,
    beer,
    plate,
    ribbon,
    bulbs,
    sparks,
    kicker: placed.runs.get("kicker") ?? null,
    line1: placed.runs.get("line1") ?? null,
    line2: placed.runs.get("line2") ?? null,
    ribbonText: ribbonRun ?? null,
    ownerLabel: label ?? null,
    owner: placed.runs.get("owner") ?? null,
    extra: placed.runs.get("extra") ?? null,
    rules: label
      ? {
          y: rules!.y,
          x1: w / 2 - Math.max(label.width, placed.runs.get("owner")?.width ?? 0) * 0.5 - label.size * 2.2,
          x2: w / 2 + Math.max(label.width, placed.runs.get("owner")?.width ?? 0) * 0.5 + label.size * 2.2,
        }
      : null,
  }
}

export function tarpFilename(size: TarpSize, ext: "pdf" | "svg"): string {
  const feet = (inches: number) => {
    const ft = inches / 12
    return Number.isInteger(ft) ? String(ft) : ft.toFixed(1)
  }
  return `Barbecue-Station-and-Beverages-${feet(size.wIn)}x${feet(size.hIn)}ft.${ext}`
}

export function sizeInchesLabel(size: TarpSize): string {
  const feet = (inches: number) => {
    const ft = inches / 12
    return Number.isInteger(ft) ? `${ft} ft` : `${ft.toFixed(1)} ft`
  }
  const meters = (inches: number) => `${(inches * 0.0254).toFixed(2)} m`
  return `${feet(size.wIn)} × ${feet(size.hIn)}  ·  ${meters(size.wIn)} × ${meters(size.hIn)}`
}
