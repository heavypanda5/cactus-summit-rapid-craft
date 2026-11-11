import fs from "node:fs"
import { buildTarpPdf } from "../src/lib/tarp/pdf.ts"
import { SIZES, defaultCopy, tarpFilename } from "../src/lib/tarp/layout.ts"

const size = SIZES[0]
const bytes = await buildTarpPdf({
  copy: defaultCopy,
  size,
  bebas: fs.readFileSync("/workspace/assets/fonts/BebasNeue-Regular.ttf"),
  rye: fs.readFileSync("/workspace/assets/fonts/Rye-Regular.ttf"),
  grill: fs.readFileSync("/workspace/assets/art/grill-print.jpg"),
  beer: fs.readFileSync("/workspace/assets/art/beer-print.jpg"),
})
const out = `/workspace/artifacts/${tarpFilename(size, "pdf")}`
fs.writeFileSync(out, bytes)
console.log(out, bytes.length)
