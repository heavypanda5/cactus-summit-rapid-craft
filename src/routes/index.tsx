import { createFileRoute } from "@tanstack/react-router"
import { useEffect, useState, type ChangeEvent } from "react"
import { Download, Eye, RotateCcw } from "lucide-react"
import { TarpArt } from "@/components/tarp-art"
import {
  SIZES,
  defaultCopy,
  sizeInchesLabel,
  tarpFilename,
  type TarpCopy,
} from "@/lib/tarp/layout"
import grillUrl from "../../assets/art/grill.jpg"
import beerUrl from "../../assets/art/beer.jpg"
import grillPrintUrl from "../../assets/art/grill-print.jpg"
import beerPrintUrl from "../../assets/art/beer-print.jpg"
import bebasUrl from "../../assets/fonts/BebasNeue-Regular.ttf?url"
import ryeUrl from "../../assets/fonts/Rye-Regular.ttf?url"

const STORAGE_KEY = "bsb-tarp-v1"

export const Route = createFileRoute("/")({ component: Home })

function Home() {
  const [copy, setCopy] = useState<TarpCopy>(defaultCopy)
  const [sizeId, setSizeId] = useState(SIZES[0].id)
  const [guides, setGuides] = useState(false)
  const [hydrated, setHydrated] = useState(false)
  const [busy, setBusy] = useState<"pdf" | "svg" | null>(null)
  const [error, setError] = useState("")
  const size = SIZES.find((item) => item.id === sizeId) ?? SIZES[0]

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw) as { copy?: Partial<TarpCopy>; sizeId?: string; guides?: boolean }
        if (parsed.copy) setCopy({ ...defaultCopy, ...parsed.copy })
        if (parsed.sizeId && SIZES.some((item) => item.id === parsed.sizeId)) setSizeId(parsed.sizeId)
        if (typeof parsed.guides === "boolean") setGuides(parsed.guides)
      }
    } catch {
      /* keep defaults */
    }
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ copy, sizeId, guides }))
  }, [copy, sizeId, guides, hydrated])

  const set = (key: keyof TarpCopy) => (event: ChangeEvent<HTMLInputElement>) => {
    setCopy((current) => ({ ...current, [key]: event.target.value }))
  }

  async function downloadPdf() {
    setBusy("pdf")
    setError("")
    try {
      const [{ buildTarpPdf }, bebas, rye, grill, beer] = await Promise.all([
        import("@/lib/tarp/pdf"),
        fetch(bebasUrl).then((res) => res.arrayBuffer()),
        fetch(ryeUrl).then((res) => res.arrayBuffer()),
        fetch(grillPrintUrl).then((res) => res.arrayBuffer()),
        fetch(beerPrintUrl).then((res) => res.arrayBuffer()),
      ])
      const bytes = await buildTarpPdf({
        copy,
        size,
        bebas: new Uint8Array(bebas),
        rye: new Uint8Array(rye),
        grill: new Uint8Array(grill),
        beer: new Uint8Array(beer),
      })
      const copyBytes = bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength) as ArrayBuffer
      saveBlob(new Blob([copyBytes], { type: "application/pdf" }), tarpFilename(size, "pdf"))
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not build the PDF.")
    } finally {
      setBusy(null)
    }
  }

  async function downloadSvg() {
    setBusy("svg")
    setError("")
    try {
      const [{ layoutBanner, palette, ribbonPath, roundRectPath }] = await Promise.all([
        import("@/lib/tarp/layout"),
      ])
      const [bebas, rye, grill, beer] = await Promise.all([
        fetch(bebasUrl).then((res) => res.arrayBuffer()),
        fetch(ryeUrl).then((res) => res.arrayBuffer()),
        fetch(grillPrintUrl).then((res) => res.arrayBuffer()),
        fetch(beerPrintUrl).then((res) => res.arrayBuffer()),
      ])
      const layout = layoutBanner(copy, size)
      const svg = buildSvg(layout, {
        bebas: toBase64(bebas),
        rye: toBase64(rye),
        grill: toBase64(grill),
        beer: toBase64(beer),
        palette,
        ribbonPath,
        roundRectPath,
      })
      saveBlob(new Blob([svg], { type: "image/svg+xml" }), tarpFilename(size, "svg"))
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not build the SVG.")
    } finally {
      setBusy(null)
    }
  }

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-6 md:px-8 md:py-8">
      <header className="flex flex-col gap-2">
        <p className="font-display text-lg tracking-widest text-gold">Night tarpaulin · ready to print</p>
        <h1 className="font-display text-5xl leading-none text-foam md:text-6xl">Barbecue Station and Beverages</h1>
        <p className="max-w-3xl text-base leading-relaxed text-muted">
          Owned by Vinz Vanz. Fire on one side, cold beer on the other, the name lit like a bar sign for a night
          display. Download the press PDF — the wording stays live text, so a print shop can still edit it.
        </p>
      </header>

      <section className="stage" aria-label="Tarpaulin preview">
        <div className="stage-glow" />
        <div className="tarp-shell">
          {guides && (
            <>
              <span className="grommet left-2 top-2" />
              <span className="grommet right-2 top-2" />
              <span className="grommet bottom-2 left-2" />
              <span className="grommet right-2 bottom-2" />
            </>
          )}
          <TarpArt copy={copy} size={size} grillHref={grillUrl} beerHref={beerUrl} guides={guides} />
        </div>
        <p className="relative mt-3 text-sm text-muted">
          Night view of the {size.blurb.toLowerCase()} · finished size {sizeInchesLabel(size)}. The glow is how the
          gold reads under night light. The file itself is flat press art at the exact size.
        </p>
      </section>

      <section className="desk grid gap-5 p-4 md:p-6">
        <div className="flex flex-col gap-3">
          <h2 className="font-display text-2xl tracking-wide text-gold">Finished size</h2>
          <div className="grid grid-cols-2 gap-2 md:grid-cols-5">
            {SIZES.map((item) => (
              <button
                key={item.id}
                type="button"
                className="size-btn text-left"
                data-active={item.id === size.id}
                onClick={() => setSizeId(item.id)}
              >
                <span className="block font-display text-xl leading-none tracking-wide">{item.label}</span>
                <span className="mt-1 block text-xs text-muted">{item.blurb}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          <label className="field md:col-span-2">
            <span>Top line</span>
            <input value={copy.kicker} onChange={set("kicker")} maxLength={64} />
          </label>
          <label className="field">
            <span>Main line</span>
            <input value={copy.line1} onChange={set("line1")} maxLength={24} />
          </label>
          <label className="field">
            <span>Second line</span>
            <input value={copy.line2} onChange={set("line2")} maxLength={24} />
          </label>
          <label className="field">
            <span>Ribbon</span>
            <input value={copy.ribbon} onChange={set("ribbon")} maxLength={32} />
          </label>
          <label className="field">
            <span>Owner label</span>
            <input value={copy.ownerLabel} onChange={set("ownerLabel")} maxLength={24} />
          </label>
          <label className="field">
            <span>Owner name</span>
            <input value={copy.owner} onChange={set("owner")} maxLength={28} />
          </label>
          <label className="field">
            <span>Phone, optional</span>
            <input value={copy.phone} onChange={set("phone")} maxLength={24} placeholder="Leave blank to hide" />
          </label>
          <label className="field md:col-span-2">
            <span>Place, optional</span>
            <input value={copy.place} onChange={set("place")} maxLength={40} placeholder="Leave blank to hide" />
          </label>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <button type="button" className="btn btn-primary" onClick={downloadPdf} disabled={busy !== null}>
            <span className="inline-flex items-center gap-2">
              <Download size={18} aria-hidden="true" />
              {busy === "pdf" ? "Building PDF…" : "Download press PDF"}
            </span>
          </button>
          <button type="button" className="btn btn-ghost" onClick={downloadSvg} disabled={busy !== null}>
            <span className="inline-flex items-center gap-2">
              <Download size={18} aria-hidden="true" />
              {busy === "svg" ? "Building SVG…" : "Download SVG"}
            </span>
          </button>
          <button type="button" className="btn" onClick={() => setGuides((value) => !value)} aria-pressed={guides}>
            <span className="inline-flex items-center gap-2">
              <Eye size={18} aria-hidden="true" />
              {guides ? "Hide eyelet guide" : "Show eyelet guide"}
            </span>
          </button>
          <button
            type="button"
            className="btn"
            onClick={() => {
              setCopy(defaultCopy)
              setSizeId(SIZES[0].id)
            }}
          >
            <span className="inline-flex items-center gap-2">
              <RotateCcw size={18} aria-hidden="true" />
              Reset wording
            </span>
          </button>
        </div>
        {error && <p className="text-sm text-gold">{error}</p>}
        <p className="text-sm leading-relaxed text-muted">
          The PDF page is the exact finished size, with Bebas Neue and Rye embedded in full so the words are not
          outlined. Open it in Illustrator, Inkscape, Affinity, or Acrobat to change the text. The SVG is the same
          artwork if you would rather edit vectors. Leave 2.5 inches inside the edge clear for eyelets — that dashed
          guide is preview-only and is not printed. No phone or address is printed unless you type one.
        </p>
      </section>
    </main>
  )
}

function saveBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = filename
  link.click()
  URL.revokeObjectURL(url)
}

function toBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer)
  let binary = ""
  const chunk = 0x8000
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunk))
  }
  return btoa(binary)
}

function buildSvg(
  layout: ReturnType<typeof import("@/lib/tarp/layout").layoutBanner>,
  assets: {
    bebas: string
    rye: string
    grill: string
    beer: string
    palette: typeof import("@/lib/tarp/layout").palette
    ribbonPath: typeof import("@/lib/tarp/layout").ribbonPath
    roundRectPath: typeof import("@/lib/tarp/layout").roundRectPath
  },
): string {
  const { palette: colors, ribbonPath: ribbon, roundRectPath: round } = assets
  const { w, h } = layout
  const radius = Math.min(w, h) * 0.02
  const inset = Math.min(w, h) * 0.012
  const text = (
    run: { text: string; face: "bebas" | "rye"; size: number; y: number } | null,
    fill: string,
  ) => {
    if (!run) return ""
    const family = run.face === "rye" ? "Rye" : "Bebas Neue"
    return `<text x="${w / 2}" y="${run.y}" text-anchor="middle" fill="${fill}" font-size="${run.size}" font-family="${family}">${escapeXml(run.text)}</text>`
  }
  const portrait = layout.portrait
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${layout.w / 10}in" height="${layout.h / 10}in" viewBox="0 0 ${w} ${h}">
  <defs>
    <style>
      @font-face { font-family: "Bebas Neue"; src: url("data:font/ttf;base64,${assets.bebas}") format("truetype"); }
      @font-face { font-family: "Rye"; src: url("data:font/ttf;base64,${assets.rye}") format("truetype"); }
    </style>
    <clipPath id="bleed"><rect width="${w}" height="${h}"/></clipPath>
    <linearGradient id="shade" x1="0" y1="0" x2="${portrait ? 0 : 1}" y2="${portrait ? 1 : 0}">
      <stop offset="0" stop-color="#000" stop-opacity="0.38"/>
      <stop offset="0.16" stop-color="#000" stop-opacity="0.08"/>
      <stop offset="0.34" stop-color="#000" stop-opacity="0.5"/>
      <stop offset="0.5" stop-color="#000" stop-opacity="0.74"/>
      <stop offset="0.66" stop-color="#000" stop-opacity="0.5"/>
      <stop offset="0.84" stop-color="#000" stop-opacity="0.08"/>
      <stop offset="1" stop-color="#000" stop-opacity="0.38"/>
    </linearGradient>
    <radialGradient id="ember" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${colors.ember}" stop-opacity="0.95"/>
      <stop offset="46%" stop-color="#ff2a00" stop-opacity="0.4"/>
      <stop offset="100%" stop-color="#ff2a00" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <g clip-path="url(#bleed)">
    <rect width="${w}" height="${h}" fill="${colors.ink}"/>
    <image href="data:image/jpeg;base64,${assets.grill}" x="${layout.grill.x}" y="${layout.grill.y}" width="${layout.grill.w}" height="${layout.grill.h}" preserveAspectRatio="xMidYMid slice"/>
    <image href="data:image/jpeg;base64,${assets.beer}" x="${layout.beer.x}" y="${layout.beer.y}" width="${layout.beer.w}" height="${layout.beer.h}" preserveAspectRatio="xMidYMid slice"/>
    <rect width="${w}" height="${h}" fill="url(#shade)"/>
    <ellipse cx="${layout.plate.x + layout.plate.w / 2}" cy="${layout.plate.y + layout.plate.h / 2}" rx="${layout.plate.w * 0.72}" ry="${layout.plate.h * 0.78}" fill="url(#ember)" opacity="0.9"/>
    ${layout.sparks.map((spark) => `<circle cx="${spark.x}" cy="${spark.y}" r="${spark.r}" fill="${spark.hot ? colors.bulbHot : colors.spark}" opacity="${spark.o}"/>`).join("")}
    <path d="${round(layout.plate.x, layout.plate.y, layout.plate.w, layout.plate.h, radius)}" fill="${colors.plate}" opacity="0.9"/>
    <path d="${round(layout.plate.x + inset, layout.plate.y + inset, layout.plate.w - inset * 2, layout.plate.h - inset * 2, radius * 0.7)}" fill="none" stroke="${colors.gold}" stroke-width="0.7"/>
    <polyline points="${layout.bulbs.map((bulb) => `${bulb.x},${bulb.y}`).join(" ")}" fill="none" stroke="${colors.wire}" stroke-width="1.15"/>
    ${layout.bulbs
      .map(
        (bulb) =>
          `<circle cx="${bulb.x}" cy="${bulb.y}" r="${bulb.r * 2.2}" fill="${colors.ember}" opacity="0.35"/><circle cx="${bulb.x}" cy="${bulb.y}" r="${bulb.r}" fill="${bulb.hot ? colors.bulbHot : colors.bulb}" stroke="${colors.gold}" stroke-width="0.45"/><circle cx="${bulb.x - bulb.r * 0.28}" cy="${bulb.y - bulb.r * 0.28}" r="${bulb.r * 0.28}" fill="#ffffff" opacity="0.8"/>`,
      )
      .join("")}
    <rect x="${layout.frame}" y="${layout.frame}" width="${w - layout.frame * 2}" height="${h - layout.frame * 2}" fill="none" stroke="${colors.frame}" stroke-width="1.7"/>
    <rect x="${layout.frame * 1.7}" y="${layout.frame * 1.7}" width="${w - layout.frame * 3.4}" height="${h - layout.frame * 3.4}" fill="none" stroke="${colors.foam}" stroke-width="0.45" opacity="0.85"/>
    ${text(layout.kicker, colors.gold)}
    ${text(layout.line1, colors.foam)}
    ${text(layout.line2, colors.station)}
    ${layout.ribbon.w > 0 ? `<path d="${ribbon(layout.ribbon.x, layout.ribbon.y, layout.ribbon.w, layout.ribbon.h)}" fill="${colors.ribbon}" stroke="${colors.gold}" stroke-width="0.85"/>` : ""}
    ${text(layout.ribbonText, colors.foam)}
    ${text(layout.ownerLabel, colors.gold)}
    ${text(layout.owner, colors.owner)}
    ${text(layout.extra, colors.foam)}
  </g>
</svg>`
}

function escapeXml(value: string): string {
  const amp = "&" + "amp;"
  const lt = "&" + "lt;"
  const gt = "&" + "gt;"
  const quot = "&" + "quot;"
  return value.replace(/&/g, amp).replace(/</g, lt).replace(/>/g, gt).replace(/"/g, quot)
}
