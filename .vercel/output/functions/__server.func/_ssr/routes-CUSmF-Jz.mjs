import { i as __toESM } from "../_runtime.mjs";
import { G as require_jsx_runtime, K as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as Download, n as RotateCcw, r as Eye } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CUSmF-Jz.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var UNITS_PER_INCH = 10;
var EYELET_INSET_IN = 2.5;
var SIZES = [
	{
		id: "8x4",
		label: "8 × 4 ft",
		blurb: "Storefront banner",
		wIn: 96,
		hIn: 48
	},
	{
		id: "6x3",
		label: "6 × 3 ft",
		blurb: "Smaller shopfront",
		wIn: 72,
		hIn: 36
	},
	{
		id: "10x5",
		label: "10 × 5 ft",
		blurb: "Roadside banner",
		wIn: 120,
		hIn: 60
	},
	{
		id: "8x3",
		label: "8 × 3 ft",
		blurb: "Long fascia sign",
		wIn: 96,
		hIn: 36
	},
	{
		id: "4x8",
		label: "4 × 8 ft",
		blurb: "Vertical standee",
		wIn: 48,
		hIn: 96
	}
];
var defaultCopy = {
	kicker: "CHARCOAL GRILLED  /  ICE-COLD DRINKS",
	line1: "BARBECUE",
	line2: "STATION",
	ribbon: "AND BEVERAGES",
	ownerLabel: "OWNED BY",
	owner: "VINZ VANZ",
	phone: "",
	place: ""
};
var palette = {
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
	frame: "#ffb62e"
};
/** Advance width in ems. Summed advances match fontkit for these faces. */
var BEBAS = {
	"0": .4,
	"1": .4,
	"2": .4,
	"3": .4,
	"4": .4,
	"5": .4,
	"6": .4,
	"7": .4,
	"8": .4,
	"9": .4,
	A: .401,
	B: .404,
	C: .383,
	D: .406,
	E: .363,
	F: .344,
	G: .391,
	H: .42,
	I: .192,
	J: .265,
	K: .414,
	L: .344,
	M: .538,
	N: .427,
	O: .4,
	P: .386,
	Q: .4,
	R: .403,
	S: .372,
	T: .364,
	U: .402,
	V: .382,
	W: .557,
	X: .406,
	Y: .394,
	Z: .362,
	" ": .16,
	".": .188,
	"&": .417,
	"'": .188,
	"-": .27,
	":": .188,
	"+": .4,
	"/": .389,
	",": .188,
	"(": .24,
	")": .24
};
var RYE = {
	"0": .714,
	"1": .451,
	"2": .634,
	"3": .608,
	"4": .695,
	"5": .628,
	"6": .713,
	"7": .61,
	"8": .687,
	"9": .713,
	A: .712,
	B: .743,
	C: .645,
	D: .776,
	E: .704,
	F: .66,
	G: .719,
	H: .84,
	I: .438,
	J: .602,
	K: .752,
	L: .66,
	M: 1.022,
	N: .81,
	O: .769,
	P: .695,
	Q: .769,
	R: .758,
	S: .613,
	T: .737,
	U: .756,
	V: .692,
	W: 1.055,
	X: .672,
	Y: .663,
	Z: .697,
	" ": .244,
	".": .331,
	"&": .833,
	"'": .284,
	"-": .42,
	":": .331,
	"+": .526,
	"/": .399,
	",": .331,
	"(": .4,
	")": .4
};
function measure(face, text, size) {
	const map = face === "bebas" ? BEBAS : RYE;
	let w = 0;
	for (const ch of text) w += (map[ch] ?? map[ch.toUpperCase()] ?? .5) * size;
	return w;
}
function mulberry32(seed) {
	let a = seed >>> 0;
	return () => {
		a |= 0;
		a = a + 1831565813 | 0;
		let t = Math.imul(a ^ a >>> 15, 1 | a);
		t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
		return ((t ^ t >>> 14) >>> 0) / 4294967296;
	};
}
function upper(value) {
	return value.toUpperCase().replace(/\s+/g, " ").trim();
}
function ribbonPath(x, y, w, h) {
	const n = Math.min(h * .28, w * .08);
	return [
		`M ${x + n} ${y}`,
		`H ${x + w - n}`,
		`L ${x + w} ${y + h / 2}`,
		`L ${x + w - n} ${y + h}`,
		`H ${x + n}`,
		`L ${x} ${y + h / 2}`,
		"Z"
	].join(" ");
}
function roundRectPath(x, y, w, h, r) {
	const radius = Math.max(0, Math.min(r, w / 2, h / 2));
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
		"Z"
	].join(" ");
}
function layoutPieces(copy, w, h, maxW, portrait) {
	const kicker = upper(copy.kicker);
	const line1 = upper(copy.line1);
	const line2 = upper(copy.line2);
	const ribbon = upper(copy.ribbon);
	const ownerLabel = upper(copy.ownerLabel);
	const owner = upper(copy.owner);
	const extra = [copy.phone, copy.place].map((s) => upper(s)).filter(Boolean).join("   /   ");
	const headroom = portrait ? .16 : .22;
	const heroRoom = portrait ? .2 : .3;
	const fit = (face, text, room, cap) => {
		if (!text) return 0;
		const byWidth = maxW / (measure(face, text, 1) || 1);
		return Math.min(h * room, byWidth, cap);
	};
	const line2Size = fit("bebas", line2, heroRoom, maxW);
	const line1Size = fit("bebas", line1, headroom, line2Size > 0 ? line2Size * .86 : maxW);
	const ribbonSize = fit("bebas", ribbon, portrait ? .055 : .07, Math.max(line2Size, line1Size) * .34 || h * .07);
	const kickerSize = fit("bebas", kicker, .042, Math.min(h * .05, (line1Size || line2Size || h * .1) * .28));
	const labelSize = fit("bebas", ownerLabel, .034, (line2Size || line1Size || h * .1) * .16);
	const ownerSize = fit("rye", owner, portrait ? .09 : .115, (line2Size || line1Size || h * .2) * .42);
	const extraSize = fit("bebas", extra, .038, (ownerSize || labelSize || h * .08) * .62);
	const pieces = [];
	const push = (key, text, face, size, gapBefore, cap) => {
		if (!text || size <= 0) return;
		pieces.push({
			key,
			text,
			face,
			size,
			gapBefore,
			cap
		});
	};
	push("kicker", kicker, "bebas", kickerSize, 0, .72);
	push("line1", line1, "bebas", line1Size, h * .018, .74);
	push("line2", line2, "bebas", line2Size, h * .008, .74);
	push("ribbon", ribbon, "bebas", ribbonSize, h * .02, 1.7);
	push("ownerLabel", ownerLabel, "bebas", labelSize, h * .028, .72);
	push("owner", owner, "rye", ownerSize, h * .006, .8);
	push("extra", extra, "bebas", extraSize, h * .012, .72);
	return pieces;
}
function place(pieces, scale, top) {
	const runs = /* @__PURE__ */ new Map();
	let y = top;
	let width = 0;
	let ribbon = {
		x: 0,
		y: 0,
		w: 0,
		h: 0
	};
	pieces.forEach((piece, index) => {
		const size = piece.size * scale;
		const gap = index === 0 ? 0 : piece.gapBefore * scale;
		y += gap;
		if (piece.key === "ribbon") {
			const textW = measure(piece.face, piece.text, size);
			const rh = size * piece.cap;
			const rw = textW + rh * 1.35;
			ribbon = {
				x: 0,
				y,
				w: rw,
				h: rh
			};
			const baseline = y + rh * .72;
			runs.set(piece.key, {
				text: piece.text,
				face: piece.face,
				size,
				y: baseline,
				width: textW
			});
			width = Math.max(width, rw);
			y += rh;
			return;
		}
		const textW = measure(piece.face, piece.text, size);
		const visual = size * piece.cap;
		const baseline = y + visual;
		runs.set(piece.key, {
			text: piece.text,
			face: piece.face,
			size,
			y: baseline,
			width: textW
		});
		width = Math.max(width, textW);
		y += visual;
	});
	return {
		runs,
		ribbon,
		bottom: y,
		width
	};
}
function layoutBanner(copy, size) {
	const w = size.wIn * 10;
	const h = size.hIn * 10;
	const portrait = h > w;
	const frame = Math.max(6, Math.min(w, h) * .022);
	const safe = EYELET_INSET_IN * 10;
	const side = portrait ? w : h;
	const grill = portrait ? {
		x: 0,
		y: 0,
		w: side,
		h: side
	} : {
		x: 0,
		y: 0,
		w: side,
		h: side
	};
	const beer = portrait ? {
		x: 0,
		y: h - side,
		w: side,
		h: side
	} : {
		x: w - side,
		y: 0,
		w: side,
		h: side
	};
	const gap = portrait ? h - side * 2 : w - side * 2;
	const maxW = gap > Math.min(w, h) * .12 ? Math.min(w * .92, gap + Math.min(w, h) * .08) : w * (portrait ? .84 : .5);
	const raw = layoutPieces(copy, w, h, Math.min(maxW, w - 50 - frame), portrait);
	const bulbR = Math.min(w, h) * .016;
	const minTop = frame * 1.8 + bulbR * 2.4;
	let scale = 1;
	let top = minTop;
	let placed = place(raw, scale, top);
	const bottomLimit = h - safe * .72;
	for (let i = 0; i < 24; i++) {
		const blockH = placed.bottom - top;
		top = Math.max(minTop, (h - blockH) / 2 - h * .01);
		placed = place(raw, scale, top);
		const pad = Math.min(w, h) * .04;
		const plateLeft = (w - placed.width) / 2 - pad;
		const plateRight = (w + placed.width) / 2 + pad;
		if (!(placed.bottom + pad > bottomLimit || plateLeft < safe || plateRight > w - safe) || scale <= .62) break;
		scale -= .03;
		placed = place(raw, scale, top);
	}
	const padX = Math.min(w, h) * (portrait ? .05 : .045);
	const padY = Math.min(w, h) * .032;
	const plate = {
		x: (w - placed.width) / 2 - padX,
		y: top - padY,
		w: placed.width + padX * 2,
		h: placed.bottom - top + padY * 2
	};
	plate.x = Math.max(frame * 1.6, plate.x);
	plate.w = Math.min(plate.w, w - plate.x - frame * 1.6);
	const ribbonRun = placed.runs.get("ribbon");
	const ribbon = ribbonRun ? {
		x: (w - (placed.ribbon.w || 0)) / 2,
		y: placed.ribbon.y,
		w: placed.ribbon.w,
		h: placed.ribbon.h
	} : {
		x: 0,
		y: 0,
		w: 0,
		h: 0
	};
	const label = placed.runs.get("ownerLabel");
	const rules = label ? {
		y: label.y - label.size * .28,
		x1: w / 2 - label.width / 2 - label.size * 1.4,
		x2: w / 2 + label.width / 2 + label.size * .35
	} : null;
	const rand = mulberry32(334449);
	const bulbs = [];
	const count = portrait ? 7 : Math.max(9, Math.round(w / 90));
	for (let i = 0; i < count; i++) {
		const t = count === 1 ? .5 : i / (count - 1);
		const x = w * .07 + t * w * .86;
		const sag = Math.sin(t * Math.PI) * h * (portrait ? .012 : .018);
		bulbs.push({
			x,
			y: frame * 1.35 + bulbR + sag,
			r: bulbR * (i % 3 === 1 ? 1.15 : .92),
			hot: i % 2 === 0,
			o: 1
		});
	}
	const sparks = [];
	const sparkCount = portrait ? 28 : 40;
	for (let i = 0; i < sparkCount; i++) {
		const onLeft = rand() > (portrait ? .5 : .38);
		const x = portrait ? rand() * w : onLeft ? rand() * Math.min(grill.w * .92, plate.x - 4) : Math.max(plate.x + plate.w + 4, w * .62) + rand() * (w - Math.max(plate.x + plate.w + 4, w * .62));
		const y = portrait ? rand() > .5 ? rand() * grill.h * .85 : h - rand() * beer.h * .8 : rand() * h * .92;
		sparks.push({
			x: Math.min(w - 4, Math.max(4, x)),
			y: Math.min(h - 4, Math.max(4, y)),
			r: (.35 + rand() * .8) * Math.min(w, h) * .0045,
			hot: rand() > .4,
			o: .35 + rand() * .6
		});
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
		rules: label ? {
			y: rules.y,
			x1: w / 2 - Math.max(label.width, placed.runs.get("owner")?.width ?? 0) * .5 - label.size * 2.2,
			x2: w / 2 + Math.max(label.width, placed.runs.get("owner")?.width ?? 0) * .5 + label.size * 2.2
		} : null
	};
}
function tarpFilename(size, ext) {
	const feet = (inches) => {
		const ft = inches / 12;
		return Number.isInteger(ft) ? String(ft) : ft.toFixed(1);
	};
	return `Barbecue-Station-and-Beverages-${feet(size.wIn)}x${feet(size.hIn)}ft.${ext}`;
}
function sizeInchesLabel(size) {
	const feet = (inches) => {
		const ft = inches / 12;
		return Number.isInteger(ft) ? `${ft} ft` : `${ft.toFixed(1)} ft`;
	};
	const meters = (inches) => `${(inches * .0254).toFixed(2)} m`;
	return `${feet(size.wIn)} × ${feet(size.hIn)}  ·  ${meters(size.wIn)} × ${meters(size.hIn)}`;
}
function TarpArt({ copy, size, grillHref, beerHref, guides = false }) {
	const layout = layoutBanner(copy, size);
	const uid = (0, import_react.useId)().replace(/:/g, "");
	const shade = `shade-${uid}`;
	const ember = `ember-${uid}`;
	const clip = `clip-${uid}`;
	const neon = `neon-${uid}`;
	const { w, h } = layout;
	const radius = Math.min(w, h) * .02;
	const inset = Math.min(w, h) * .012;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: `0 0 ${w} ${h}`,
		role: "img",
		"aria-label": "Barbecue Station and Beverages tarpaulin, owned by Vinz Vanz",
		className: "block h-auto w-full bg-bg-deep",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("defs", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("clipPath", {
				id: clip,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					width: w,
					height: h
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
				id: shade,
				x1: "0",
				y1: "0",
				x2: layout.portrait ? "0" : "1",
				y2: layout.portrait ? "1" : "0",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "0",
						stopColor: "#000",
						stopOpacity: "0.38"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "0.16",
						stopColor: "#000",
						stopOpacity: "0.08"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "0.34",
						stopColor: "#000",
						stopOpacity: "0.5"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "0.5",
						stopColor: "#000",
						stopOpacity: "0.74"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "0.66",
						stopColor: "#000",
						stopOpacity: "0.5"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "0.84",
						stopColor: "#000",
						stopOpacity: "0.08"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "1",
						stopColor: "#000",
						stopOpacity: "0.38"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("radialGradient", {
				id: ember,
				cx: "50%",
				cy: "50%",
				r: "50%",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "0%",
						stopColor: palette.ember,
						stopOpacity: "0.95"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "46%",
						stopColor: "#ff2a00",
						stopOpacity: "0.4"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "100%",
						stopColor: "#ff2a00",
						stopOpacity: "0"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("filter", {
				id: neon,
				x: "-40%",
				y: "-40%",
				width: "180%",
				height: "180%",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("feDropShadow", {
					dx: "0",
					dy: "0",
					stdDeviation: Math.max(1.2, h * .006),
					floodColor: "#ff6a00",
					floodOpacity: "0.95"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("feDropShadow", {
					dx: "0",
					dy: "0",
					stdDeviation: Math.max(2.4, h * .014),
					floodColor: "#ff3a00",
					floodOpacity: "0.55"
				})]
			})
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
			clipPath: `url(#${clip})`,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					width: w,
					height: h,
					fill: palette.ink
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("image", {
					href: grillHref,
					x: layout.grill.x,
					y: layout.grill.y,
					width: layout.grill.w,
					height: layout.grill.h,
					preserveAspectRatio: "xMidYMid slice"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("image", {
					href: beerHref,
					x: layout.beer.x,
					y: layout.beer.y,
					width: layout.beer.w,
					height: layout.beer.h,
					preserveAspectRatio: "xMidYMid slice"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					width: w,
					height: h,
					fill: `url(#${shade})`
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
					cx: layout.plate.x + layout.plate.w / 2,
					cy: layout.plate.y + layout.plate.h / 2,
					rx: layout.plate.w * .72,
					ry: layout.plate.h * .78,
					fill: `url(#${ember})`,
					opacity: "0.9"
				}),
				layout.sparks.map((spark, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: spark.x,
					cy: spark.y,
					r: spark.r,
					fill: spark.hot ? palette.bulbHot : palette.spark,
					opacity: spark.o
				}, index)),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: roundRectPath(layout.plate.x, layout.plate.y, layout.plate.w, layout.plate.h, radius),
					fill: palette.plate,
					opacity: "0.9"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: roundRectPath(layout.plate.x + inset, layout.plate.y + inset, layout.plate.w - inset * 2, layout.plate.h - inset * 2, radius * .7),
					fill: "none",
					stroke: palette.gold,
					strokeWidth: .7
				}),
				layout.bulbs.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polyline", {
					points: layout.bulbs.map((bulb) => `${bulb.x},${bulb.y}`).join(" "),
					fill: "none",
					stroke: palette.wire,
					strokeWidth: 1.15,
					strokeLinejoin: "round"
				}),
				layout.bulbs.map((bulb, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
						cx: bulb.x,
						cy: bulb.y,
						r: bulb.r * 2.2,
						fill: palette.ember,
						opacity: "0.35"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
						cx: bulb.x,
						cy: bulb.y,
						r: bulb.r,
						fill: bulb.hot ? palette.bulbHot : palette.bulb,
						stroke: palette.gold,
						strokeWidth: .45
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
						cx: bulb.x - bulb.r * .28,
						cy: bulb.y - bulb.r * .28,
						r: bulb.r * .28,
						fill: "#fff",
						opacity: "0.8"
					})
				] }, index)),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x: layout.frame,
					y: layout.frame,
					width: w - layout.frame * 2,
					height: h - layout.frame * 2,
					fill: "none",
					stroke: palette.frame,
					strokeWidth: 1.7
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x: layout.frame * 1.7,
					y: layout.frame * 1.7,
					width: w - layout.frame * 3.4,
					height: h - layout.frame * 3.4,
					fill: "none",
					stroke: palette.foam,
					strokeWidth: .45,
					opacity: "0.85"
				}),
				[
					[layout.frame * 2.3, layout.frame * 2.3],
					[w - layout.frame * 2.3, layout.frame * 2.3],
					[layout.frame * 2.3, h - layout.frame * 2.3],
					[w - layout.frame * 2.3, h - layout.frame * 2.3]
				].map(([x, y]) => {
					const d = Math.min(w, h) * .012;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
						points: `${x},${y - d} ${x + d},${y} ${x},${y + d} ${x - d},${y}`,
						fill: palette.gold
					}, `${x}-${y}`);
				}),
				layout.kicker && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
					run: layout.kicker,
					fill: palette.gold,
					anchor: w / 2
				}),
				layout.line1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
					run: layout.line1,
					fill: palette.foam,
					anchor: w / 2,
					glow: neon
				}),
				layout.line2 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
					run: layout.line2,
					fill: palette.station,
					anchor: w / 2,
					glow: neon
				}),
				layout.ribbonText && layout.ribbon.w > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: ribbonPath(layout.ribbon.x, layout.ribbon.y, layout.ribbon.w, layout.ribbon.h),
					fill: palette.ribbon,
					stroke: palette.gold,
					strokeWidth: .85
				}),
				layout.ribbonText && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
					run: layout.ribbonText,
					fill: palette.foam,
					anchor: w / 2
				}),
				layout.rules && layout.ownerLabel && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
					x1: layout.rules.x1,
					x2: w / 2 - layout.ownerLabel.width / 2 - layout.ownerLabel.size * .7,
					y1: layout.rules.y,
					y2: layout.rules.y,
					stroke: palette.gold,
					strokeWidth: .7
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
					x1: w / 2 + layout.ownerLabel.width / 2 + layout.ownerLabel.size * .7,
					x2: layout.rules.x2,
					y1: layout.rules.y,
					y2: layout.rules.y,
					stroke: palette.gold,
					strokeWidth: .7
				})] }),
				layout.ownerLabel && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
					run: layout.ownerLabel,
					fill: palette.gold,
					anchor: w / 2
				}),
				layout.owner && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
					run: layout.owner,
					fill: palette.owner,
					anchor: w / 2
				}),
				layout.extra && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
					run: layout.extra,
					fill: palette.foam,
					anchor: w / 2
				}),
				guides && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x: layout.safe,
					y: layout.safe,
					width: w - layout.safe * 2,
					height: h - layout.safe * 2,
					fill: "none",
					stroke: palette.gold,
					strokeWidth: .6,
					strokeDasharray: "4 3",
					opacity: "0.85"
				})
			]
		})]
	});
}
function Text({ run, fill, anchor, glow }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
		x: anchor,
		y: run.y,
		textAnchor: "middle",
		fill,
		fontSize: run.size,
		fontFamily: run.face === "rye" ? "Rye, Georgia, serif" : "Bebas Neue, Impact, sans-serif",
		filter: glow ? `url(#${glow})` : void 0,
		children: run.text
	});
}
var grill_default = "/assets/grill-Y_afIVl3.jpg";
var beer_default = "/assets/beer-BdE6EfES.jpg";
var grill_print_default = "/assets/grill-print-g-hcVcXP.jpg";
var beer_print_default = "/assets/beer-print-f3umi84G.jpg";
var BebasNeue_Regular_default = "/assets/BebasNeue-Regular-37KXJlK_.ttf";
var Rye_Regular_default = "/assets/Rye-Regular-DxJ7hGbf.ttf";
var routes_exports = /* @__PURE__ */ __exportAll({ component: () => Home });
var STORAGE_KEY = "bsb-tarp-v1";
function Home() {
	const [copy, setCopy] = (0, import_react.useState)(defaultCopy);
	const [sizeId, setSizeId] = (0, import_react.useState)(SIZES[0].id);
	const [guides, setGuides] = (0, import_react.useState)(false);
	const [hydrated, setHydrated] = (0, import_react.useState)(false);
	const [busy, setBusy] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)("");
	const size = SIZES.find((item) => item.id === sizeId) ?? SIZES[0];
	(0, import_react.useEffect)(() => {
		try {
			const raw = localStorage.getItem(STORAGE_KEY);
			if (raw) {
				const parsed = JSON.parse(raw);
				if (parsed.copy) setCopy({
					...defaultCopy,
					...parsed.copy
				});
				if (parsed.sizeId && SIZES.some((item) => item.id === parsed.sizeId)) setSizeId(parsed.sizeId);
				if (typeof parsed.guides === "boolean") setGuides(parsed.guides);
			}
		} catch {}
		setHydrated(true);
	}, []);
	(0, import_react.useEffect)(() => {
		if (!hydrated) return;
		localStorage.setItem(STORAGE_KEY, JSON.stringify({
			copy,
			sizeId,
			guides
		}));
	}, [
		copy,
		sizeId,
		guides,
		hydrated
	]);
	const set = (key) => (event) => {
		setCopy((current) => ({
			...current,
			[key]: event.target.value
		}));
	};
	async function downloadPdf() {
		setBusy("pdf");
		setError("");
		try {
			const [{ buildTarpPdf }, bebas, rye, grill, beer] = await Promise.all([
				import("./pdf-DSilqksz.mjs"),
				fetch(BebasNeue_Regular_default).then((res) => res.arrayBuffer()),
				fetch(Rye_Regular_default).then((res) => res.arrayBuffer()),
				fetch(grill_print_default).then((res) => res.arrayBuffer()),
				fetch(beer_print_default).then((res) => res.arrayBuffer())
			]);
			const bytes = await buildTarpPdf({
				copy,
				size,
				bebas: new Uint8Array(bebas),
				rye: new Uint8Array(rye),
				grill: new Uint8Array(grill),
				beer: new Uint8Array(beer)
			});
			const copyBytes = bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength);
			saveBlob(new Blob([copyBytes], { type: "application/pdf" }), tarpFilename(size, "pdf"));
		} catch (err) {
			setError(err instanceof Error ? err.message : "Could not build the PDF.");
		} finally {
			setBusy(null);
		}
	}
	async function downloadSvg() {
		setBusy("svg");
		setError("");
		try {
			const [{ layoutBanner, palette, ribbonPath, roundRectPath }] = await Promise.all([import("./layout-G7Jnxg8I.mjs")]);
			const [bebas, rye, grill, beer] = await Promise.all([
				fetch(BebasNeue_Regular_default).then((res) => res.arrayBuffer()),
				fetch(Rye_Regular_default).then((res) => res.arrayBuffer()),
				fetch(grill_print_default).then((res) => res.arrayBuffer()),
				fetch(beer_print_default).then((res) => res.arrayBuffer())
			]);
			const svg = buildSvg(layoutBanner(copy, size), {
				bebas: toBase64(bebas),
				rye: toBase64(rye),
				grill: toBase64(grill),
				beer: toBase64(beer),
				palette,
				ribbonPath,
				roundRectPath
			});
			saveBlob(new Blob([svg], { type: "image/svg+xml" }), tarpFilename(size, "svg"));
		} catch (err) {
			setError(err instanceof Error ? err.message : "Could not build the SVG.");
		} finally {
			setBusy(null);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-6 md:px-8 md:py-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex flex-col gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-lg tracking-widest text-gold",
						children: "Night tarpaulin · ready to print"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-5xl leading-none text-foam md:text-6xl",
						children: "Barbecue Station and Beverages"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "max-w-3xl text-base leading-relaxed text-muted",
						children: "Owned by Vinz Vanz. Fire on one side, cold beer on the other, the name lit like a bar sign for a night display. Download the press PDF — the wording stays live text, so a print shop can still edit it."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "stage",
				"aria-label": "Tarpaulin preview",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "stage-glow" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "tarp-shell",
						children: [guides && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "grommet left-2 top-2" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "grommet right-2 top-2" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "grommet bottom-2 left-2" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "grommet right-2 bottom-2" })
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TarpArt, {
							copy,
							size,
							grillHref: grill_default,
							beerHref: beer_default,
							guides
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "relative mt-3 text-sm text-muted",
						children: [
							"Night view of the ",
							size.blurb.toLowerCase(),
							" · finished size ",
							sizeInchesLabel(size),
							". The glow is how the gold reads under night light. The file itself is flat press art at the exact size."
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "desk grid gap-5 p-4 md:p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-2xl tracking-wide text-gold",
							children: "Finished size"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-2 gap-2 md:grid-cols-5",
							children: SIZES.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								className: "size-btn text-left",
								"data-active": item.id === size.id,
								onClick: () => setSizeId(item.id),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block font-display text-xl leading-none tracking-wide",
									children: item.label
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mt-1 block text-xs text-muted",
									children: item.blurb
								})]
							}, item.id))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-3 md:grid-cols-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "field md:col-span-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Top line" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: copy.kicker,
									onChange: set("kicker"),
									maxLength: 64
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "field",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Main line" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: copy.line1,
									onChange: set("line1"),
									maxLength: 24
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "field",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Second line" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: copy.line2,
									onChange: set("line2"),
									maxLength: 24
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "field",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Ribbon" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: copy.ribbon,
									onChange: set("ribbon"),
									maxLength: 32
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "field",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Owner label" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: copy.ownerLabel,
									onChange: set("ownerLabel"),
									maxLength: 24
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "field",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Owner name" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: copy.owner,
									onChange: set("owner"),
									maxLength: 28
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "field",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Phone, optional" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: copy.phone,
									onChange: set("phone"),
									maxLength: 24,
									placeholder: "Leave blank to hide"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "field md:col-span-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Place, optional" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: copy.place,
									onChange: set("place"),
									maxLength: 40,
									placeholder: "Leave blank to hide"
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "btn btn-primary",
								onClick: downloadPdf,
								disabled: busy !== null,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, {
										size: 18,
										"aria-hidden": "true"
									}), busy === "pdf" ? "Building PDF…" : "Download press PDF"]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "btn btn-ghost",
								onClick: downloadSvg,
								disabled: busy !== null,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, {
										size: 18,
										"aria-hidden": "true"
									}), busy === "svg" ? "Building SVG…" : "Download SVG"]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "btn",
								onClick: () => setGuides((value) => !value),
								"aria-pressed": guides,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, {
										size: 18,
										"aria-hidden": "true"
									}), guides ? "Hide eyelet guide" : "Show eyelet guide"]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "btn",
								onClick: () => {
									setCopy(defaultCopy);
									setSizeId(SIZES[0].id);
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, {
										size: 18,
										"aria-hidden": "true"
									}), "Reset wording"]
								})
							})
						]
					}),
					error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-gold",
						children: error
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm leading-relaxed text-muted",
						children: "The PDF page is the exact finished size, with Bebas Neue and Rye embedded in full so the words are not outlined. Open it in Illustrator, Inkscape, Affinity, or Acrobat to change the text. The SVG is the same artwork if you would rather edit vectors. Leave 2.5 inches inside the edge clear for eyelets — that dashed guide is preview-only and is not printed. No phone or address is printed unless you type one."
					})
				]
			})
		]
	});
}
function saveBlob(blob, filename) {
	const url = URL.createObjectURL(blob);
	const link = document.createElement("a");
	link.href = url;
	link.download = filename;
	link.click();
	URL.revokeObjectURL(url);
}
function toBase64(buffer) {
	const bytes = new Uint8Array(buffer);
	let binary = "";
	const chunk = 32768;
	for (let i = 0; i < bytes.length; i += chunk) binary += String.fromCharCode(...bytes.subarray(i, i + chunk));
	return btoa(binary);
}
function buildSvg(layout, assets) {
	const { palette: colors, ribbonPath: ribbon, roundRectPath: round } = assets;
	const { w, h } = layout;
	const radius = Math.min(w, h) * .02;
	const inset = Math.min(w, h) * .012;
	const text = (run, fill) => {
		if (!run) return "";
		const family = run.face === "rye" ? "Rye" : "Bebas Neue";
		return `<text x="${w / 2}" y="${run.y}" text-anchor="middle" fill="${fill}" font-size="${run.size}" font-family="${family}">${escapeXml(run.text)}</text>`;
	};
	const portrait = layout.portrait;
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
    <ellipse cx="${layout.plate.x + layout.plate.w / 2}" cy="${layout.plate.y + layout.plate.h / 2}" rx="${layout.plate.w * .72}" ry="${layout.plate.h * .78}" fill="url(#ember)" opacity="0.9"/>
    ${layout.sparks.map((spark) => `<circle cx="${spark.x}" cy="${spark.y}" r="${spark.r}" fill="${spark.hot ? colors.bulbHot : colors.spark}" opacity="${spark.o}"/>`).join("")}
    <path d="${round(layout.plate.x, layout.plate.y, layout.plate.w, layout.plate.h, radius)}" fill="${colors.plate}" opacity="0.9"/>
    <path d="${round(layout.plate.x + inset, layout.plate.y + inset, layout.plate.w - inset * 2, layout.plate.h - inset * 2, radius * .7)}" fill="none" stroke="${colors.gold}" stroke-width="0.7"/>
    <polyline points="${layout.bulbs.map((bulb) => `${bulb.x},${bulb.y}`).join(" ")}" fill="none" stroke="${colors.wire}" stroke-width="1.15"/>
    ${layout.bulbs.map((bulb) => `<circle cx="${bulb.x}" cy="${bulb.y}" r="${bulb.r * 2.2}" fill="${colors.ember}" opacity="0.35"/><circle cx="${bulb.x}" cy="${bulb.y}" r="${bulb.r}" fill="${bulb.hot ? colors.bulbHot : colors.bulb}" stroke="${colors.gold}" stroke-width="0.45"/><circle cx="${bulb.x - bulb.r * .28}" cy="${bulb.y - bulb.r * .28}" r="${bulb.r * .28}" fill="#ffffff" opacity="0.8"/>`).join("")}
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
</svg>`;
}
function escapeXml(value) {
	return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
//#endregion
export { defaultCopy as a, palette as c, sizeInchesLabel as d, tarpFilename as f, UNITS_PER_INCH as i, ribbonPath as l, EYELET_INSET_IN as n, layoutBanner as o, SIZES as r, measure as s, routes_exports as t, roundRectPath as u };
