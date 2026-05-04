// File: src/components/OregonMap.tsx
import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import { mapMarkers } from '../oregonMapData';
import MapMarker from './MapMarker';

const MAP_W = 3000;
const MAP_H = 2000;

// ─── Mountain group ───────────────────────────────────────────────────────────
function Mountain({ x, y, h = 80, w = 70 }: { x: number; y: number; h?: number; w?: number }) {
  return (
    <g>
      <polygon points={`${x - w * 0.7},${y} ${x - w * 0.22},${y - h * 0.58} ${x},${y}`} fill="#8a7b68" stroke="#5c3d11" strokeWidth="1.2" />
      <polygon points={`${x},${y} ${x + w * 0.22},${y - h * 0.58} ${x + w * 0.7},${y}`} fill="#7a6b58" stroke="#5c3d11" strokeWidth="1.2" />
      <polygon points={`${x - w / 2},${y} ${x},${y - h} ${x + w / 2},${y}`} fill="#9e8f7c" stroke="#5c3d11" strokeWidth="1.8" />
      <polygon points={`${x - w * 0.13},${y - h * 0.78} ${x},${y - h} ${x + w * 0.13},${y - h * 0.78}`} fill="#ede8dd" />
    </g>
  );
}

// ─── Tree symbol ──────────────────────────────────────────────────────────────
function Tree({ x, y, s = 22, fill = '#3d6b40' }: { x: number; y: number; s?: number; fill?: string }) {
  return (
    <g>
      <polygon points={`${x},${y - s} ${x - s * 0.55},${y - s * 0.1} ${x + s * 0.55},${y - s * 0.1}`} fill={fill} opacity={0.85} />
      <polygon points={`${x},${y - s * 0.55} ${x - s * 0.65},${y + s * 0.3} ${x + s * 0.65},${y + s * 0.3}`} fill={fill} opacity={0.78} />
      <rect x={x - s * 0.08} y={y + s * 0.3} width={s * 0.16} height={s * 0.35} fill="#5c3d11" />
    </g>
  );
}

// ─── Compass rose ─────────────────────────────────────────────────────────────
function Compass({ x, y }: { x: number; y: number }) {
  const r = 55;
  return (
    <g transform={`translate(${x},${y})`}>
      <circle r={r * 1.5} fill="#ede0c4" stroke="#8b6914" strokeWidth="3" opacity={0.9} />
      <circle r={r * 1.42} fill="none" stroke="#8b6914" strokeWidth="1" />
      <polygon points={`0,-${r} -14,0 14,0`} fill="#3d2b1f" />
      <polygon points={`0,${r} -14,0 14,0`} fill="#b09070" />
      <polygon points={`${r},0 0,-14 0,14`} fill="#b09070" />
      <polygon points={`-${r},0 0,-14 0,14`} fill="#b09070" />
      <circle r={10} fill="#8b6914" />
      <text y={-r - 16} textAnchor="middle" fontFamily="Cinzel, serif" fontSize="30" fill="#3d2b1f" fontWeight="bold">N</text>
      <text y={r + 38} textAnchor="middle" fontFamily="Cinzel, serif" fontSize="26" fill="#5c3d11">S</text>
      <text x={r + 18} y={9} fontFamily="Cinzel, serif" fontSize="26" fill="#5c3d11">E</text>
      <text x={-r - 32} y={9} fontFamily="Cinzel, serif" fontSize="26" fill="#5c3d11">W</text>
    </g>
  );
}

// ─── The SVG map artwork ──────────────────────────────────────────────────────
function OregonMapSVG() {
  // Cascade mountain positions
  const cascades = [
    { x: 1050, y: 372, h: 95, w: 78 },
    { x: 1058, y: 488, h: 82, w: 70 },
    { x: 1065, y: 624, h: 88, w: 74 },
    { x: 1070, y: 728, h: 76, w: 66 },
    { x: 1072, y: 862, h: 70, w: 62 },
    { x: 1075, y: 992, h: 74, w: 65 },
    { x: 1078, y: 1128, h: 102, w: 88 },
    { x: 1085, y: 1298, h: 80, w: 70 },
    { x: 1092, y: 1444, h: 64, w: 56 },
  ];

  // Coast Range (smaller)
  const coastRange = [
    { x: 598, y: 424, h: 50, w: 44 },
    { x: 592, y: 548, h: 46, w: 40 },
    { x: 595, y: 672, h: 48, w: 42 },
    { x: 598, y: 796, h: 45, w: 40 },
    { x: 601, y: 920, h: 42, w: 38 },
    { x: 604, y: 1044, h: 40, w: 36 },
    { x: 606, y: 1168, h: 38, w: 34 },
  ];

  // Blue Mountains (NE Oregon)
  const blueMtns = [
    { x: 1760, y: 618, h: 62, w: 54 },
    { x: 1792, y: 704, h: 56, w: 50 },
    { x: 1740, y: 762, h: 52, w: 46 },
  ];

  // Cascade forest trees (between Coast Range and Cascades)
  const cascadeForest: Array<{ x: number; y: number; s: number; fill: string }> = [];
  const forestPositions = [
    [700, 350], [725, 375], [695, 410], [718, 435], [702, 460],
    [728, 485], [698, 510], [722, 530], [706, 558], [730, 580],
    [700, 610], [724, 635], [698, 660], [720, 688], [702, 715],
    [726, 738], [700, 768], [722, 792], [698, 820], [724, 845],
    [700, 875], [722, 900], [696, 928], [720, 952], [700, 980],
    [724, 1005], [698, 1032], [720, 1058], [700, 1088], [724, 1112],
    [760, 360], [782, 385], [758, 412], [780, 438], [762, 465],
    [784, 492], [758, 520], [780, 545], [762, 572], [784, 598],
    [758, 625], [780, 652], [762, 680], [784, 706], [758, 734],
    [780, 760], [762, 788], [784, 812], [758, 840], [780, 868],
    [820, 370], [842, 396], [818, 422], [840, 448], [822, 475],
    [844, 502], [818, 530], [840, 556], [822, 584], [844, 610],
    [818, 638], [840, 664], [822, 692], [844, 720], [820, 748],
    [900, 380], [922, 406], [898, 434], [920, 460], [902, 488],
    [924, 514], [898, 542], [920, 568], [902, 596], [924, 622],
    [960, 390], [982, 416], [958, 444], [980, 470], [962, 498],
    [984, 524], [958, 552], [980, 578], [962, 606], [984, 632],
  ];
  for (const [x, y] of forestPositions) {
    const greenVariant = Math.random() > 0.5 ? '#3d6b40' : '#4a7c4e';
    cascadeForest.push({ x, y, s: 18 + Math.floor(Math.random() * 8), fill: greenVariant });
  }

  // Coast forest (narrow strip along coast)
  const coastForestPos = [
    [468, 440], [480, 468], [465, 495], [478, 522],
    [466, 550], [480, 578], [464, 606], [478, 634],
    [466, 662], [480, 690], [464, 718], [478, 746],
    [466, 774], [480, 802], [464, 830], [478, 858],
    [466, 886], [480, 914], [464, 942], [478, 970],
    [466, 998], [480, 1026], [464, 1054], [478, 1082],
  ];

  return (
    <svg
      viewBox={`0 0 ${MAP_W} ${MAP_H}`}
      width={MAP_W}
      height={MAP_H}
      style={{ position: 'absolute', top: 0, left: 0, display: 'block' }}
    >
      <defs>
        {/* Parchment gradient */}
        <radialGradient id="parchment" cx="38%" cy="38%" r="65%">
          <stop offset="0%" stopColor="#faf3dc" />
          <stop offset="45%" stopColor="#f0e6c8" />
          <stop offset="100%" stopColor="#d8c89a" />
        </radialGradient>
        {/* Ocean gradient */}
        <linearGradient id="ocean-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#5a8fb8" />
          <stop offset="100%" stopColor="#8ab8d8" />
        </linearGradient>
        {/* Vignette */}
        <radialGradient id="vignette" cx="50%" cy="50%" r="70%">
          <stop offset="60%" stopColor="transparent" />
          <stop offset="100%" stopColor="rgba(60,35,10,0.18)" />
        </radialGradient>
        {/* Wave pattern for ocean */}
        <pattern id="waves" x="0" y="0" width="80" height="40" patternUnits="userSpaceOnUse">
          <path d="M 0 20 C 13 8 27 8 40 20 C 53 32 67 32 80 20" stroke="#4a7fa8" strokeWidth="1.2" fill="none" opacity="0.4" />
        </pattern>
        {/* Crosshatch parchment texture */}
        <pattern id="hatch" x="0" y="0" width="48" height="48" patternUnits="userSpaceOnUse">
          <path d="M 0 48 L 48 0" stroke="#b8a06a" strokeWidth="0.4" opacity="0.25" />
          <path d="M -6 6 L 6 -6" stroke="#b8a06a" strokeWidth="0.4" opacity="0.25" />
          <path d="M 42 54 L 54 42" stroke="#b8a06a" strokeWidth="0.4" opacity="0.25" />
        </pattern>
      </defs>

      {/* ── Parchment background ── */}
      <rect width={MAP_W} height={MAP_H} fill="url(#parchment)" />
      <rect width={MAP_W} height={MAP_H} fill="url(#hatch)" />
      <rect width={MAP_W} height={MAP_H} fill="url(#vignette)" />

      {/* ── Pacific Ocean ── */}
      <rect x={0} y={0} width={448} height={MAP_H} fill="url(#ocean-grad)" opacity={0.55} />
      <rect x={0} y={0} width={448} height={MAP_H} fill="url(#waves)" />
      {/* Ocean text */}
      <text
        x={224} y={980}
        textAnchor="middle"
        fontFamily="Cinzel, serif" fontSize={34} fill="#2a5a7a"
        fontStyle="italic" opacity={0.7}
        transform="rotate(-90, 224, 980)"
      >
        The Sundering Sea
      </text>

      {/* ── Oregon land mass ── */}
      <path
        d="M 428 312
           C 620 292 900 282 1180 285
           C 1460 288 1740 282 2020 285
           C 2180 287 2380 283 2588 290
           L 2588 1756
           L 460 1756
           C 453 1648 447 1536 443 1424
           C 439 1312 435 1200 431 1088
           C 427 976 420 864 415 752
           C 410 640 410 528 413 416
           C 416 304 422 312 428 312
           Z"
        fill="#d8c898"
        stroke="#5c3d11"
        strokeWidth="3.5"
      />

      {/* ── Eastern Oregon tint (the Painted Wastes) ── */}
      <path
        d="M 1140 285 C 1460 288 1740 282 2020 285 C 2180 287 2380 283 2588 290 L 2588 1756 L 1140 1756 Z"
        fill="#c8a870"
        opacity={0.28}
      />

      {/* ── Willamette Valley greenery ── */}
      <path
        d="M 620 320 C 640 310 660 312 680 316
           L 1040 316 L 1040 1100 L 620 1100
           C 610 900 608 700 620 320 Z"
        fill="#a8c878"
        opacity={0.18}
      />

      {/* ── Columbia River (northern border) ── */}
      <path
        d="M 428 305 C 640 296 900 288 1180 290 C 1460 292 1740 288 2020 290 C 2200 291 2400 287 2588 292"
        stroke="#6496b4"
        strokeWidth={14}
        fill="none"
        strokeLinecap="round"
        opacity={0.7}
      />
      <text x={1294} y={278} textAnchor="middle" fontFamily="Cinzel, serif" fontSize={26} fill="#4a7090" fontStyle="italic" opacity={0.8}>
        The Great River
      </text>

      {/* ── Willamette River ── */}
      <path
        d="M 872 960 C 858 850 848 730 844 620 C 840 510 848 420 858 338"
        stroke="#6496b4"
        strokeWidth={9}
        fill="none"
        strokeLinecap="round"
        opacity={0.65}
      />

      {/* ── Coast forests ── */}
      {coastForestPos.map(([x, y], i) => (
        <Tree key={`cf-${i}`} x={x} y={y} s={16} fill="#2d5a30" />
      ))}

      {/* ── Cascade foothills forest ── */}
      {cascadeForest.map((t, i) => (
        <Tree key={`f-${i}`} x={t.x} y={t.y} s={t.s} fill={t.fill} />
      ))}

      {/* ── Coast Range mountains ── */}
      {coastRange.map((m, i) => (
        <Mountain key={`cr-${i}`} {...m} />
      ))}

      {/* ── Cascade mountains ── */}
      {cascades.map((m, i) => (
        <Mountain key={`c-${i}`} {...m} />
      ))}

      {/* ── Blue Mountains (NE Oregon) ── */}
      {blueMtns.map((m, i) => (
        <Mountain key={`bm-${i}`} {...m} />
      ))}

      {/* Steens Mountain (SE Oregon) */}
      <Mountain x={1928} y={1450} h={72} w={62} />
      <text x={1928} y={1468} textAnchor="middle" fontFamily="Cinzel, serif" fontSize={20} fill="#5c3d11" fontStyle="italic" opacity={0.7}>
        Steens
      </text>

      {/* ── Crater Lake label ── */}
      <circle cx={1070} cy={1128} r={28} fill="#6496b4" opacity={0.45} />
      <circle cx={1070} cy={1128} r={28} fill="none" stroke="#4a7090" strokeWidth={2} />
      <text x={1128} y={1132} fontFamily="Cinzel, serif" fontSize={22} fill="#4a7090" fontStyle="italic" opacity={0.85}>
        Crater Lake
      </text>

      {/* ── Region labels ── */}
      {/* The Greenway Vale */}
      <text x={810} y={628} textAnchor="middle" fontFamily="Cinzel, serif" fontSize={46} fill="#3a5c2a" fontStyle="italic" opacity={0.55} fontWeight="600">
        The Greenway Vale
      </text>

      {/* The Grey Peaks (along the Cascades) */}
      <text
        x={1072} y={700}
        textAnchor="middle"
        fontFamily="Cinzel, serif" fontSize={36} fill="#6a5a48"
        fontStyle="italic" opacity={0.6}
        transform="rotate(90, 1072, 700)"
      >
        The Grey Peaks
      </text>

      {/* The Western Ridge */}
      <text
        x={595} y={700}
        textAnchor="middle"
        fontFamily="Cinzel, serif" fontSize={26} fill="#5a4a38"
        fontStyle="italic" opacity={0.5}
        transform="rotate(90, 595, 700)"
      >
        The Western Ridge
      </text>

      {/* The Painted Wastes */}
      <text x={1840} y={990} textAnchor="middle" fontFamily="Cinzel, serif" fontSize={52} fill="#8a6a3a" fontStyle="italic" opacity={0.45} fontWeight="600">
        The Painted Wastes
      </text>

      {/* The Blue Mountains label */}
      <text x={1768} y={580} textAnchor="middle" fontFamily="Cinzel, serif" fontSize={24} fill="#5a4a38" fontStyle="italic" opacity={0.6}>
        The Blue Hills
      </text>

      {/* ── Location dots + labels ── */}
      {/* Northern Keep (Portland) */}
      <circle cx={858} cy={340} r={10} fill="#3d2b1f" opacity={0.7} />
      <text x={880} y={332} fontFamily="Cinzel, serif" fontSize={26} fill="#3d2b1f" fontWeight="600" opacity={0.8}>
        The Northern Keep
      </text>

      {/* Hildsburgh (Hillsboro) */}
      <circle cx={762} cy={375} r={8} fill="#3d2b1f" opacity={0.6} />
      <text x={782} y={368} fontFamily="Cinzel, serif" fontSize={22} fill="#3d2b1f" opacity={0.75}>
        Hildsburgh
      </text>

      {/* Scholar's Hold (Corvallis) */}
      <circle cx={842} cy={680} r={10} fill="#3d2b1f" opacity={0.7} />
      <text x={864} y={672} fontFamily="Cinzel, serif" fontSize={26} fill="#3d2b1f" fontWeight="600" opacity={0.8}>
        {"The Scholar's Hold"}
      </text>

      {/* Ashwood (Cottage Grove) */}
      <circle cx={858} cy={940} r={8} fill="#3d2b1f" opacity={0.6} />
      <text x={878} y={932} fontFamily="Cinzel, serif" fontSize={22} fill="#3d2b1f" opacity={0.75}>
        Ashwood
      </text>

      {/* The Southern Exile (off-map indicator, near bottom) */}
      <line x1={858} y1={1756} x2={858} y2={1820} stroke="#5c3d11" strokeWidth={2} strokeDasharray="8 6" opacity={0.5} />
      <text x={858} y={1860} textAnchor="middle" fontFamily="Cinzel, serif" fontSize={22} fill="#5c3d11" fontStyle="italic" opacity={0.55}>
        ↓ The Southern Exile (Gilbert, AZ)
      </text>

      {/* ── Map title ── */}
      <text x={1500} y={110} textAnchor="middle" fontFamily="Cinzel, serif" fontSize={68} fill="#3d2b1f" fontWeight="900" opacity={0.85} letterSpacing={4}>
        The Realm of Oregon
      </text>
      <line x1={800} y1={128} x2={2200} y2={128} stroke="#8b6914" strokeWidth={2} opacity={0.4} />

      {/* ── Decorative border ── */}
      <rect x={14} y={14} width={MAP_W - 28} height={MAP_H - 28} fill="none" stroke="#8b6914" strokeWidth={10} rx={6} />
      <rect x={30} y={30} width={MAP_W - 60} height={MAP_H - 60} fill="none" stroke="#8b6914" strokeWidth={2.5} rx={3} />

      {/* Corner ornaments */}
      {[[58, 58], [MAP_W - 58, 58], [58, MAP_H - 58], [MAP_W - 58, MAP_H - 58]].map(([cx, cy], i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r={14} fill="#c8a85a" opacity={0.7} />
          <circle cx={cx} cy={cy} r={7} fill="#8b6914" opacity={0.8} />
        </g>
      ))}

      {/* ── Compass rose ── */}
      <Compass x={2580} y={1680} />

      {/* ── Scale / legend area ── */}
      <text x={200} y={1920} fontFamily="Cinzel, serif" fontSize={22} fill="#5c3d11" opacity={0.6}>
        Drag to explore · Click gems to reveal quests
      </text>
    </svg>
  );
}

// Palette
const GOLD = '#f0c860';
const GOLD_DIM = 'rgba(240,200,96,0.5)';
const DARK_PANEL = 'rgba(12, 8, 4, 0.92)';
const GOLD_BORDER = 'rgba(139,105,20,0.55)';

const MIN_ZOOM = 0.35;
const MAX_ZOOM = 2.5;

// ─── Legend panel ──────────────────────────────────────────────────

const legendEntries = [
  { label: 'The Sundering Sea', real: 'Pacific Ocean' },
  { label: 'The Great River', real: 'Columbia River' },
  { label: 'The Greenway Vale', real: 'Willamette Valley' },
  { label: 'The Grey Peaks', real: 'Cascade Mountains' },
  { label: 'The Western Ridge', real: 'Coast Range' },
  { label: 'The Painted Wastes', real: 'Eastern Oregon' },
  { label: 'The Northern Keep', real: 'Portland' },
  { label: 'Hildsburgh', real: 'Hillsboro / Beaverton' },
  { label: "The Scholar's Hold", real: 'Corvallis' },
  { label: 'Ashwood', real: 'Cottage Grove' },
  { label: 'The Southern Exile', real: 'Gilbert, AZ' },
];

function Legend({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="rounded-2xl overflow-hidden shadow-2xl"
      style={{ background: DARK_PANEL, border: `1px solid ${GOLD_BORDER}`, width: 270, backdropFilter: 'blur(12px)' }}
    >
      <div className="h-px" style={{ background: `linear-gradient(to right, transparent, ${GOLD}, transparent)` }} />
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <span style={{ fontFamily: 'Cinzel, serif', fontSize: 13, color: GOLD, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
            Map Legend
          </span>
          <button onClick={onClose} style={{ color: GOLD_DIM, fontSize: 18, lineHeight: 1 }}>&#x2715;</button>
        </div>
        <div className="flex items-center gap-2 mb-3 pb-3" style={{ borderBottom: `1px solid rgba(139,105,20,0.2)` }}>
          <svg width="16" height="20" viewBox="0 0 32 38" fill="none">
            <polygon points="16,36 1,14 8,2 24,2 31,14" fill={GOLD} />
            <polygon points="16,2 8,2 1,14 16,18 31,14 24,2" fill="rgba(255,255,255,0.28)" />
          </svg>
          <span style={{ fontSize: 11, color: 'rgba(240,230,200,0.7)', fontStyle: 'italic' }}>Career quest location — click to reveal</span>
        </div>
        <div className="space-y-1.5">
          {legendEntries.map(e => (
            <div key={e.label} className="flex gap-2 items-baseline">
              <span style={{ fontSize: 11, color: GOLD_DIM, minWidth: 130, fontFamily: 'Cinzel, serif' }}>{e.label}</span>
              <span style={{ fontSize: 10, color: 'rgba(240,230,200,0.45)', fontStyle: 'italic' }}>{e.real}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Main draggable map component ───────────────────────────────────────────────
export default function OregonMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeMarkerId, setActiveMarkerId] = useState<string | null>(null);
  const [showLegend, setShowLegend] = useState(false);
  const [zoom, setZoom] = useState(1);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const applyZoom = useCallback((delta: number) => {
    setZoom(prev => {
      const newZoom = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, prev + delta));
      const vw = containerRef.current?.clientWidth ?? window.innerWidth;
      const vh = containerRef.current?.clientHeight ?? window.innerHeight;
      // Keep center of viewport fixed while zooming
      const centerMapX = (-x.get() + vw / 2) / prev;
      const centerMapY = (-y.get() + vh / 2) / prev;
      const newX = Math.min(0, Math.max(-(MAP_W * newZoom - vw), -(centerMapX * newZoom) + vw / 2));
      const newY = Math.min(0, Math.max(-(MAP_H * newZoom - vh), -(centerMapY * newZoom) + vh / 2));
      x.set(newX);
      y.set(newY);
      return newZoom;
    });
  }, [x, y]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handler = (e: WheelEvent) => {
      e.preventDefault();
      applyZoom(e.deltaY < 0 ? 0.12 : -0.12);
    };
    el.addEventListener('wheel', handler, { passive: false });
    return () => el.removeEventListener('wheel', handler);
  }, [applyZoom]);

  const vw = typeof window !== 'undefined' ? window.innerWidth : 1440;
  const vh = typeof window !== 'undefined' ? window.innerHeight : 900;
  const dragConstraints = {
    left: Math.min(0, -(MAP_W * zoom - vw)),
    right: 0,
    top: Math.min(0, -(MAP_H * zoom - vh)),
    bottom: 0,
  };

  const btnStyle = {
    width: 36, height: 36, borderRadius: 8,
    background: DARK_PANEL,
    border: `1px solid ${GOLD_BORDER}`,
    color: GOLD,
    fontSize: 20, fontWeight: 700,
    cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    backdropFilter: 'blur(8px)',
    transition: 'opacity 0.15s',
  } as const;

  return (
    <div
      ref={containerRef}
      className="overflow-hidden w-screen h-screen"
      style={{ cursor: 'grab', background: '#1a1008' }}
      onClick={() => setActiveMarkerId(null)}
    >
      <motion.div
        drag
        dragConstraints={dragConstraints}
        dragElastic={0.02}
        dragTransition={{ power: 0.28, timeConstant: 260 }}
        whileDrag={{ cursor: 'grabbing' }}
        onDragStart={() => setActiveMarkerId(null)}
        style={{ x, y, width: MAP_W, height: MAP_H, position: 'relative', scale: zoom, originX: 0, originY: 0 }}
      >
        <OregonMapSVG />
        {mapMarkers.map((marker) => (
          <MapMarker
            key={marker.id}
            marker={marker}
            isActive={activeMarkerId === marker.id}
            onToggle={() =>
              setActiveMarkerId((prev) => (prev === marker.id ? null : marker.id))
            }
          />
        ))}
      </motion.div>

      {/* Zoom controls */}
      <div className="absolute" style={{ bottom: 24, left: '50%', transform: 'translateX(-50%)', zIndex: 40, display: 'flex', gap: 8, alignItems: 'center' }}>
        <button style={btnStyle} onClick={() => applyZoom(0.2)}>+</button>
        <div style={{ fontSize: 11, color: GOLD_DIM, minWidth: 44, textAlign: 'center', fontFamily: 'Cinzel, serif' }}>
          {Math.round(zoom * 100)}%
        </div>
        <button style={btnStyle} onClick={() => applyZoom(-0.2)}>−</button>
        <button
          style={{ ...btnStyle, width: 'auto', padding: '0 10px', fontSize: 11, fontFamily: 'Cinzel, serif', marginLeft: 4 }}
          onClick={(e) => { e.stopPropagation(); setShowLegend(v => !v); }}
        >
          Legend
        </button>
      </div>

      {/* Legend */}
      {showLegend && (
        <div className="absolute" style={{ bottom: 80, left: 24, zIndex: 40 }} onClick={e => e.stopPropagation()}>
          <Legend onClose={() => setShowLegend(false)} />
        </div>
      )}
    </div>
  );
}
