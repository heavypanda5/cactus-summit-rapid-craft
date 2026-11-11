import {
  BlendMode,
  PDFDocument,
  rgb,
  type PDFPage,
  type PDFFont,
} from "pdf-lib"
import fontkit from "@pdf-lib/fontkit"
import {
  layoutBanner,
  palette,
  ribbonPath,
  roundRectPath,
  type BannerLayout,
  type Run,
  type TarpCopy,
  type TarpSize,
} from "./layout.ts"

const SCALE = 72 / 10

function paint(hex: string) {
  const n = Number.parseInt(hex.slice(1), 16)
  return rgb(((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255)
}

function shadeAmount(t: number): number {
  const d = Math.abs(t - 0.5) * 2
  const centerDark = 0.8 * (1 - d) ** 1.35
  const edge = 0.32 * d ** 2.1
  return Math.min(0.88, centerDark + edge)
}

function drawRun(
  page: PDFPage,
  run: Run | null,
  font: PDFFont,
  pageW: number,
  designH: number,
  color: ReturnType<typeof paint>,
) {
  if (!run) return
  const size = run.size * SCALE
  const width = font.widthOfTextAtSize(run.text, size)
  page.drawText(run.text, {
    font,
    size,
    color,
    x: pageW / 2 - width / 2,
    y: (designH - run.y) * SCALE,
  })
}

export async function buildTarpPdf(input: {
  copy: TarpCopy
  size: TarpSize
  bebas: Uint8Array
  rye: Uint8Array
  grill: Uint8Array
  beer: Uint8Array
}): Promise<Uint8Array> {
  const layout = layoutBanner(input.copy, input.size)
  const doc = await PDFDocument.create()
  doc.registerFontkit(fontkit)
  const bebas = await doc.embedFont(input.bebas, { subset: false })
  const rye = await doc.embedFont(input.rye, { subset: false })
  const grill = await doc.embedJpg(input.grill)
  const beer = await doc.embedJpg(input.beer)

  const pageW = input.size.wIn * 72
  const pageH = input.size.hIn * 72
  const page = doc.addPage([pageW, pageH])
  page.setTrimBox(0, 0, pageW, pageH)
  page.setBleedBox(0, 0, pageW, pageH)
  page.setArtBox(0, 0, pageW, pageH)

  const feet = (inches: number) => inches / 12
  doc.setTitle("BARBECUE STATION AND BEVERAGES")
  doc.setAuthor(layout.owner?.text || "VINZ VANZ")
  doc.setCreator("Barbecue Station Tarpaulin")
  doc.setSubject(
    `Ready-to-print tarpaulin, ${feet(input.size.wIn)} ft × ${feet(input.size.hIn)} ft ` +
      `(${input.size.wIn} in × ${input.size.hIn} in). ` +
      "Words are live text with the fonts embedded, not outlines, so they can be edited in Illustrator, Inkscape, Affinity Designer, or Acrobat. " +
      "Keep wording about 2.5 inches inside the edge for eyelets.",
  )
  doc.setKeywords(["tarpaulin", "barbecue", "beverages", "VINZ VANZ", "editable"])

  page.drawRectangle({ x: 0, y: 0, width: pageW, height: pageH, color: paint(palette.ink) })

  const box = (b: { x: number; y: number; w: number; h: number }) => ({
    x: b.x * SCALE,
    y: (layout.h - b.y - b.h) * SCALE,
    width: b.w * SCALE,
    height: b.h * SCALE,
  })

  page.drawImage(grill, box(layout.grill))
  page.drawImage(beer, box(layout.beer))

  const strips = 64
  for (let i = 0; i < strips; i++) {
    const t = (i + 0.5) / strips
    const opacity = shadeAmount(t)
    if (layout.portrait) {
      const stripH = pageH / strips
      page.drawRectangle({
        x: 0,
        y: pageH - (i + 1) * stripH,
        width: pageW,
        height: stripH + 0.6,
        color: rgb(0, 0, 0),
        opacity,
      })
    } else {
      const stripW = pageW / strips
      page.drawRectangle({
        x: i * stripW,
        y: 0,
        width: stripW + 0.6,
        height: pageH,
        color: rgb(0, 0, 0),
        opacity,
      })
    }
  }

  const cx = (layout.plate.x + layout.plate.w / 2) * SCALE
  const cy = (layout.h - (layout.plate.y + layout.plate.h / 2)) * SCALE
  const halos = [
    { rx: layout.plate.w * 0.78, ry: layout.plate.h * 0.95, o: 0.2 },
    { rx: layout.plate.w * 0.58, ry: layout.plate.h * 0.7, o: 0.28 },
    { rx: layout.plate.w * 0.4, ry: layout.plate.h * 0.48, o: 0.34 },
  ]
  for (const halo of halos) {
    page.drawEllipse({
      x: cx,
      y: cy,
      xScale: halo.rx * SCALE,
      yScale: halo.ry * SCALE,
      color: paint(palette.ember),
      opacity: halo.o,
      blendMode: BlendMode.Screen,
    })
  }

  for (const spark of layout.sparks) {
    page.drawCircle({
      x: spark.x * SCALE,
      y: (layout.h - spark.y) * SCALE,
      size: spark.r * SCALE,
      color: paint(spark.hot ? palette.bulbHot : palette.spark),
      opacity: spark.o,
      blendMode: BlendMode.Screen,
    })
  }

  drawDesignPath(page, roundRectPath(layout.plate.x, layout.plate.y, layout.plate.w, layout.plate.h, Math.min(layout.w, layout.h) * 0.02), {
    color: paint(palette.plate),
    opacity: 0.9,
    pageH,
  })
  const inset = Math.min(layout.w, layout.h) * 0.012
  drawDesignPath(
    page,
    roundRectPath(
      layout.plate.x + inset,
      layout.plate.y + inset,
      layout.plate.w - inset * 2,
      layout.plate.h - inset * 2,
      Math.min(layout.w, layout.h) * 0.014,
    ),
    { borderColor: paint(palette.gold), borderWidth: 0.7, pageH },
  )

  if (layout.bulbs.length > 1) {
    for (let i = 0; i < layout.bulbs.length - 1; i++) {
      const a = layout.bulbs[i]
      const b = layout.bulbs[i + 1]
      page.drawLine({
        start: { x: a.x * SCALE, y: (layout.h - a.y) * SCALE },
        end: { x: b.x * SCALE, y: (layout.h - b.y) * SCALE },
        thickness: 1.1 * SCALE,
        color: paint(palette.wire),
      })
    }
  }
  for (const bulb of layout.bulbs) {
    const x = bulb.x * SCALE
    const y = (layout.h - bulb.y) * SCALE
    page.drawCircle({
      x,
      y,
      size: bulb.r * 2.1 * SCALE,
      color: paint(palette.ember),
      opacity: 0.35,
      blendMode: BlendMode.Screen,
    })
    page.drawCircle({
      x,
      y,
      size: bulb.r * SCALE,
      color: paint(bulb.hot ? palette.bulbHot : palette.bulb),
      borderColor: paint(palette.gold),
      borderWidth: 0.45 * SCALE,
    })
    page.drawCircle({
      x: x - bulb.r * 0.28 * SCALE,
      y: y + bulb.r * 0.28 * SCALE,
      size: bulb.r * 0.28 * SCALE,
      color: rgb(1, 1, 1),
      opacity: 0.8,
    })
  }

  page.drawRectangle({
    x: layout.frame * SCALE,
    y: layout.frame * SCALE,
    width: (layout.w - layout.frame * 2) * SCALE,
    height: (layout.h - layout.frame * 2) * SCALE,
    borderColor: paint(palette.frame),
    borderWidth: 1.7 * SCALE,
  })
  page.drawRectangle({
    x: layout.frame * 1.7 * SCALE,
    y: layout.frame * 1.7 * SCALE,
    width: (layout.w - layout.frame * 3.4) * SCALE,
    height: (layout.h - layout.frame * 3.4) * SCALE,
    borderColor: paint(palette.foam),
    borderWidth: 0.45 * SCALE,
    opacity: 0.85,
  })

  const diamond = Math.min(layout.w, layout.h) * 0.012
  const corners = [
    [layout.frame * 2.3, layout.frame * 2.3],
    [layout.w - layout.frame * 2.3, layout.frame * 2.3],
    [layout.frame * 2.3, layout.h - layout.frame * 2.3],
    [layout.w - layout.frame * 2.3, layout.h - layout.frame * 2.3],
  ]
  for (const [x, y] of corners) {
    drawDesignPath(
      page,
      `M ${x} ${y - diamond} L ${x + diamond} ${y} L ${x} ${y + diamond} L ${x - diamond} ${y} Z`,
      { color: paint(palette.gold), pageH },
    )
  }

  drawRun(page, layout.kicker, bebas, pageW, layout.h, paint(palette.gold))
  drawRun(page, layout.line1, bebas, pageW, layout.h, paint(palette.foam))
  drawRun(page, layout.line2, bebas, pageW, layout.h, paint(palette.station))

  if (layout.ribbonText && layout.ribbon.w > 0) {
    drawDesignPath(page, ribbonPath(layout.ribbon.x, layout.ribbon.y, layout.ribbon.w, layout.ribbon.h), {
      color: paint(palette.ribbon),
      borderColor: paint(palette.gold),
      borderWidth: 0.85,
      pageH,
    })
    drawRun(page, layout.ribbonText, bebas, pageW, layout.h, paint(palette.foam))
  }

  if (layout.rules && layout.ownerLabel) {
    const y = (layout.h - layout.rules.y) * SCALE
    const gap = layout.ownerLabel.size * 0.7 * SCALE
    const half = (bebas.widthOfTextAtSize(layout.ownerLabel.text, layout.ownerLabel.size * SCALE)) / 2
    page.drawLine({
      start: { x: layout.rules.x1 * SCALE, y },
      end: { x: pageW / 2 - half - gap, y },
      thickness: 0.7 * SCALE,
      color: paint(palette.gold),
    })
    page.drawLine({
      start: { x: pageW / 2 + half + gap, y },
      end: { x: layout.rules.x2 * SCALE, y },
      thickness: 0.7 * SCALE,
      color: paint(palette.gold),
    })
  }

  drawRun(page, layout.ownerLabel, bebas, pageW, layout.h, paint(palette.gold))
  drawRun(page, layout.owner, rye, pageW, layout.h, paint(palette.owner))
  drawRun(page, layout.extra, bebas, pageW, layout.h, paint(palette.foam))

  return doc.save()
}

function drawDesignPath(
  page: PDFPage,
  path: string,
  options: {
    pageH: number
    color?: ReturnType<typeof paint>
    borderColor?: ReturnType<typeof paint>
    borderWidth?: number
    opacity?: number
  },
) {
  page.drawSvgPath(path, {
    x: 0,
    y: options.pageH,
    scale: SCALE,
    color: options.color,
    borderColor: options.borderColor,
    borderWidth: options.borderWidth,
    opacity: options.opacity,
  })
}

export function layoutFor(copy: TarpCopy, size: TarpSize): BannerLayout {
  return layoutBanner(copy, size)
}
