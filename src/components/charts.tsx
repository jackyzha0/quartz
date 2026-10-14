// ══════════════════════════════════════════════════════════════════════
//  GRAPHIQUES — PAGE ACCUEIL
//  Portage des 6 graphiques du classeur Chasse & Pêche 7.19 (feuille
//  _ChartData, chart1..6.xml) en SVG maison, sans dépendance externe :
//    • histogrammes empilés « stock + production » (overlap 100,
//      gapWidth 10, segment production gris clair D9D9D9 contour noir),
//    • histogrammes « stock seul » (Tourisme, Habitants),
//    • courbe par tour : stock en trait plein, production en pointillés,
//      une couleur par joueur, avec choix de la ressource.
//  Retour Thibaut (2026-10-14, marqueur (o)) : les couleurs des JOUEURS
//  et des RESSOURCES sont PARAMÉTRABLES (Référentiels → Couleurs). Les
//  composants acceptent des props optionnelles et retombent sur la
//  palette statique ci-dessous sinon (mêmes défauts).
// ══════════════════════════════════════════════════════════════════════

import React from 'react'
import { fmt } from './ui'

/** Palette statique des joueurs (repli) — mêmes défauts que la config
 *  (COULEURS_JOUEURS_DEFAUT, demande Thibaut 2026-10-14) : J1 rouge,
 *  J2 bleu royal, J3 vert, J4 jaune, J5 violet, J6 orange, J7
 *  turquoise, J8 rose. */
export const COULEURS_JOUEURS = [
  '#C80000', // J1 rouge
  '#0131B4', // J2 bleu royal
  '#2CA02C', // J3 vert
  '#F5C518', // J4 jaune
  '#660099', // J5 violet
  '#F97316', // J6 orange
  '#40E0D0', // J7 turquoise
  '#EC4899', // J8 rose
]

/** Gris clair du segment « production » (spéc Excel D9D9D9 + contour noir). */
const COULEUR_PROD = '#D9D9D9'

/** Couleur d'un joueur : palette passée en prop (config de la partie)
 *  sinon palette statique. */
export function couleurJoueur(n: number, pal?: string[]): string {
  return pal?.[n - 1] || COULEURS_JOUEURS[(n - 1) % COULEURS_JOUEURS.length]
}

/** Props communes de couleur (marqueur (o)) — toutes optionnelles. */
export interface PropsCouleurs {
  /** Couleurs des joueurs (J1 = index 0) — config de la partie. */
  couleursJoueurs?: string[]
  /** Couleur d'une ressource par nom — config de la partie. */
  couleurRessource?: (nom: string) => string
}

// ── Graduation « propre » de l'axe Y ────────────────────────────────────

function graduation(min: number, max: number): number[] {
  const span = (max - min) || 1
  const brut = span / 5
  const mag = Math.pow(10, Math.floor(Math.log10(brut)))
  const n = brut / mag
  const pas = (n >= 5 ? 5 : n >= 2.5 ? 2.5 : n >= 2 ? 2 : 1) * mag
  const lo = Math.floor(min / pas) * pas
  const hi = Math.ceil(max / pas) * pas
  const out: number[] = []
  for (let v = lo; v <= hi + pas * 1e-6; v += pas) out.push(Math.round(v * 1e9) / 1e9)
  return out
}

// ── Histogramme empilé « Stock & Production » ───────────────────────────

export interface BarreChart {
  joueur: number
  nom: string
  stock: number
  prod: number
}

export interface GroupeChart {
  ressource: string
  barres: BarreChart[]
}

/** Histogramme groupé par ressource : une barre par joueur, segment
 *  stock (couleur du joueur) surmonté du segment production (gris clair).
 *  Les valeurs négatives (ex. production de Nourriture au départ) sont
 *  empilées sous l'axe zéro, comme dans le classeur. */
export function HistogrammeEmpile({ groupes, avecProd = true, largeur = 900,
  couleursJoueurs, couleurRessource }: {
  groupes: GroupeChart[]
  avecProd?: boolean
  /** Largeur du viewBox SVG — 900 pleine page, ~460 en demi-colonne. */
  largeur?: number
} & PropsCouleurs) {
  const W = largeur
  const H = 300
  const padL = 58, padR = 14, padT = 16, padB = 66
  const plotW = W - padL - padR
  const plotH = H - padT - padB

  const toutes = groupes.flatMap((g) => g.barres)
  const hautMax = Math.max(
    1,
    ...toutes.map((b) => Math.max(0, b.stock) + (avecProd ? Math.max(0, b.prod) : 0)),
  )
  const basMax = Math.min(0, ...toutes.flatMap((b) => [b.stock, avecProd ? b.prod : 0]))
  const grad = graduation(basMax, hautMax)
  const yMin = grad[0]
  const yMax = grad[grad.length - 1]
  const y = (v: number) => padT + plotH * (1 - (v - yMin) / (yMax - yMin))

  const nbBarres = toutes.length || 1
  const slot = plotW / nbBarres
  const barW = Math.min(slot * 0.9, 34)

  const joueurs = Array.from(new Set(toutes.map((b) => b.joueur))).sort((a, b) => a - b)

  return (
    <div>
      <div className="chart-legend">
        {joueurs.map((j) => (
          <span key={j} className="chart-chip">
            <span className="swatch" style={{ background: couleurJoueur(j, couleursJoueurs) }} />
            J{j}
          </span>
        ))}
        {avecProd && (
          <span className="chart-chip">
            <span className="swatch" style={{ background: COULEUR_PROD }} />
            Production (au-dessus du stock)
          </span>
        )}
        {!avecProd && <span className="chart-chip muted">Stock seul</span>}
        {couleurRessource && groupes.map((g) => (
          <span key={g.ressource} className="chart-chip">
            <span className="dot-res" style={{ background: couleurRessource(g.ressource) }} />
            {g.ressource}
          </span>
        ))}
      </div>
      <svg className="chart-svg" viewBox={`0 0 ${W} ${H}`} role="img">
        {/* grille + graduation */}
        {grad.map((v) => (
          <g key={v}>
            <line x1={padL} x2={W - padR} y1={y(v)} y2={y(v)}
              stroke="currentColor" opacity={v === 0 ? 0.55 : 0.15} strokeWidth={v === 0 ? 1.4 : 1} />
            <text x={padL - 6} y={y(v) + 3} textAnchor="end" fontSize={10}
              fill="currentColor" opacity={0.8}>{fmt(v, 0)}</text>
          </g>
        ))}

        {/* barres */}
        {groupes.map((g, gi) => {
          let idx = 0
          for (let k = 0; k < gi; k++) idx += groupes[k].barres.length
          const largeurGroupe = g.barres.length * slot
          const xGroupe = padL + idx * slot
          return (
            <g key={g.ressource}>
              {g.barres.map((b, bi) => {
                const cx = padL + (idx + bi) * slot + slot / 2
                const x = cx - barW / 2
                const stock = b.stock
                const prod = avecProd ? b.prod : 0
                const rects: React.ReactNode[] = []
                // segment stock (au-dessus ou sous zéro selon le signe)
                if (stock !== 0) {
                  rects.push(
                    <rect key="s" x={x} y={y(Math.max(0, stock))} width={barW}
                      height={Math.abs(y(stock) - y(0))} fill={couleurJoueur(b.joueur, couleursJoueurs)}
                      stroke="#000" strokeWidth={0.5}>
                      <title>{`J${b.joueur} · ${g.ressource} — Stock : ${fmt(b.stock)}`}</title>
                    </rect>,
                  )
                }
                // segment production empilé (au-dessus du stock si +, sous zéro si −)
                if (prod !== 0) {
                  const basePos = stock > 0 ? stock : 0
                  const baseNeg = stock < 0 ? stock : 0
                  rects.push(
                    <rect key="p" x={x} y={prod > 0 ? y(basePos + prod) : y(baseNeg + prod)} width={barW}
                      height={prod > 0 ? Math.abs(y(basePos) - y(basePos + prod)) : Math.abs(y(baseNeg) - y(baseNeg + prod))}
                      fill={COULEUR_PROD} stroke="#000" strokeWidth={0.5}>
                      <title>{`J${b.joueur} · ${g.ressource} — Production : ${fmt(b.prod)}`}</title>
                    </rect>,
                  )
                }
                return (
                  <g key={b.joueur}>
                    {rects}
                    <text x={cx} y={H - padB + 14} textAnchor="middle" fontSize={9}
                      fill="currentColor" opacity={0.85}>J{b.joueur}</text>
                  </g>
                )
              })}
              {couleurRessource && (
                <circle cx={xGroupe + largeurGroupe / 2 - (g.ressource.length * 2.9)} cy={H - padB + 28.5}
                  r={3} fill={couleurRessource(g.ressource)} />
              )}
              <text x={xGroupe + largeurGroupe / 2} y={H - padB + 32} textAnchor="middle"
                fontSize={11} fontWeight={600} fill="currentColor">
                {g.ressource}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}

// ── Courbe « Stock (plein) & Production (pointillé) » par tour ───────────

export interface PointCourbe { turn: number; stock: number; prod: number }
export interface SerieCourbe { joueur: number; nom: string; points: PointCourbe[] }

/** Courbe multi-joueurs : axe X « Tour », axe Y « Stock / Production » ;
 *  pour chaque joueur, stock en trait plein et production en trait
 *  pointillé (spéc chart6 du classeur). Les tours manquants pour un
 *  joueur interrompent sa ligne. */
export function CourbeRessource({ ressource, series, couleursJoueurs, couleurRessource }: {
  ressource: string
  series: SerieCourbe[]
} & PropsCouleurs) {
  const W = 900
  const H = 300
  const padL = 58, padR = 14, padT = 18, padB = 44
  const plotW = W - padL - padR
  const plotH = H - padT - padB

  const valeurs = series.flatMap((s) => s.points.flatMap((p) => [p.stock, p.prod]))
  const tours = Array.from(new Set(series.flatMap((s) => s.points.map((p) => p.turn)))).sort((a, b) => a - b)
  const tMin = tours.length ? tours[0] : 0
  const tMax = tours.length ? tours[tours.length - 1] : 1
  const grad = graduation(Math.min(0, ...valeurs), Math.max(1, ...valeurs))
  const yMin = grad[0]
  const yMax = grad[grad.length - 1]
  const y = (v: number) => padT + plotH * (1 - (v - yMin) / (yMax - yMin))
  const x = (t: number) =>
    tMax === tMin ? padL + plotW / 2 : padL + ((t - tMin) / (tMax - tMin)) * plotW

  const unSeulPoint = tours.length <= 1

  return (
    <div>
      <div className="chart-legend">
        {series.map((s) => (
          <span key={s.joueur} className="chart-chip">
            <span className="swatch" style={{ background: couleurJoueur(s.joueur, couleursJoueurs) }} />
            J{s.joueur}
          </span>
        ))}
        {couleurRessource && (
          <span className="chart-chip">
            <span className="dot-res" style={{ background: couleurRessource(ressource) }} />
            {ressource}
          </span>
        )}
        <span className="chart-chip muted">— trait plein : stock · - - pointillé : production</span>
      </div>
      <svg className="chart-svg" viewBox={`0 0 ${W} ${H}`} role="img">
        {/* grille + graduation Y */}
        {grad.map((v) => (
          <g key={v}>
            <line x1={padL} x2={W - padR} y1={y(v)} y2={y(v)}
              stroke="currentColor" opacity={v === 0 ? 0.55 : 0.15} strokeWidth={v === 0 ? 1.4 : 1} />
            <text x={padL - 6} y={y(v) + 3} textAnchor="end" fontSize={10}
              fill="currentColor" opacity={0.8}>{fmt(v, 0)}</text>
          </g>
        ))}
        {/* axe X « Tour » */}
        {tours.map((t) => (
          <text key={t} x={x(t)} y={H - padB + 18} textAnchor="middle" fontSize={10}
            fill="currentColor" opacity={0.85}>{t}</text>
        ))}
        <text x={padL + plotW / 2} y={H - 8} textAnchor="middle" fontSize={11}
          fill="currentColor" opacity={0.7}>Tour</text>

        {/* séries : polylignes continues pour les tours présents */}
        {series.map((s) => {
          const col = couleurJoueur(s.joueur, couleursJoueurs)
          const segStock: string[] = []
          const segProd: string[] = []
          let curStock: string[] = []
          let curProd: string[] = []
          for (const p of s.points) {
            const px = x(p.turn)
            curStock.push(`${px},${y(p.stock)}`)
            curProd.push(`${px},${y(p.prod)}`)
          }
          segStock.push(curStock.join(' '))
          segProd.push(curProd.join(' '))
          return (
            <g key={s.joueur}>
              <polyline points={segStock[0]} fill="none" stroke={col} strokeWidth={2}
                strokeLinejoin="round" strokeLinecap="round">
                <title>{`J${s.joueur} — ${ressource} : stock`}</title>
              </polyline>
              <polyline points={segProd[0]} fill="none" stroke={col} strokeWidth={1.6}
                strokeDasharray="5 4" opacity={0.85}>
                <title>{`J${s.joueur} — ${ressource} : production`}</title>
              </polyline>
              {unSeulPoint && s.points.map((p) => (
                <circle key={p.turn} cx={x(p.turn)} cy={y(p.stock)} r={3.5} fill={col}
                  stroke="#000" strokeWidth={0.5}>
                  <title>{`J${s.joueur} — Tour ${p.turn} : stock ${fmt(p.stock)}`}</title>
                </circle>
              ))}
            </g>
          )
        })}
      </svg>
      <div className="muted small">
        {couleurRessource && (
          <span className="dot-res" style={{ background: couleurRessource(ressource) }} />
        )}
        {' '}{ressource} — Stock (trait plein) &amp; Production (pointillés), par joueur et par tour.
        Le dernier point (tour courant) reflète l'état vivant de la partie.
      </div>
    </div>
  )
}

// ── Radar « Conditions de victoire » (page d'accueil) ───────────────────

export interface PointRadar { ratio: number; detail: string }
export interface SerieRadar { joueur: number; nom: string; points: PointRadar[] }

/** Diagramme radar : un axe par condition de victoire, un polygone
 *  semi-transparent par joueur — 0 % au centre, 100 % au bord
 *  (= condition atteinte). Anneaux gradués 25 / 50 / 75 / 100 % ;
 *  chaque sommet porte le détail du calcul en info-bulle (title). */
export function Radar({ axes, series, largeur = 900, couleursJoueurs }: {
  axes: string[]
  series: SerieRadar[]
  largeur?: number
  /** Couleurs des joueurs (J1 = index 0) — config de la partie. */
  couleursJoueurs?: string[]
}) {
  if (axes.length === 0) return null
  const W = largeur
  const H = 460
  const cx = W / 2
  const cy = H / 2 + 4
  const R = Math.min(W / 2, H / 2) - 64
  const n = axes.length
  const angle = (i: number) => -Math.PI / 2 + (i * 2 * Math.PI) / n
  const bord = (i: number) => {
    const a = angle(i)
    return { x: cx + R * Math.cos(a), y: cy + R * Math.sin(a) }
  }
  const point = (i: number, ratio: number) => {
    const r = R * Math.max(0, Math.min(1, ratio))
    const a = angle(i)
    return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) }
  }
  const anneaux = [0.25, 0.5, 0.75, 1]

  return (
    <div>
      <div className="chart-legend">
        {series.map((s) => (
          <span key={s.joueur} className="chart-chip">
            <span className="swatch" style={{ background: couleurJoueur(s.joueur, couleursJoueurs) }} />
            J{s.joueur}
          </span>
        ))}
        <span className="chart-chip muted">0 % au centre · 100 % au bord = condition atteinte</span>
      </div>
      <svg className="chart-svg" viewBox={`0 0 ${W} ${H}`} role="img">
        {/* anneaux gradués */}
        {anneaux.map((g) => (
          <circle key={g} cx={cx} cy={cy} r={R * g} fill="none"
            stroke="currentColor" opacity={g === 1 ? 0.4 : 0.18} strokeWidth={g === 1 ? 1.4 : 1} />
        ))}
        {anneaux.slice(0, 3).map((g) => (
          <text key={g} x={cx + 4} y={cy - R * g - 2} fontSize={9}
            fill="currentColor" opacity={0.6}>{Math.round(g * 100)}</text>
        ))}
        {/* axes + libellés */}
        {axes.map((label, i) => {
          const b = bord(i)
          const lx = cx + (R + 18) * Math.cos(angle(i))
          const ly = cy + (R + 18) * Math.sin(angle(i))
          const cosA = Math.cos(angle(i))
          const anchor = Math.abs(cosA) < 0.35 ? 'middle' : cosA > 0 ? 'start' : 'end'
          return (
            <g key={label}>
              <line x1={cx} y1={cy} x2={b.x} y2={b.y} stroke="currentColor" opacity={0.18} />
              <text x={lx} y={ly + 4} textAnchor={anchor} fontSize={11} fontWeight={600}
                fill="currentColor">{label}</text>
            </g>
          )
        })}
        {/* polygones des joueurs */}
        {series.map((s) => {
          const col = couleurJoueur(s.joueur, couleursJoueurs)
          const pts = s.points
            .map((p, i) => `${point(i, p.ratio).x},${point(i, p.ratio).y}`)
            .join(' ')
          return (
            <g key={s.joueur}>
              <polygon points={pts} fill={col} fillOpacity={0.12} stroke={col} strokeWidth={1.8}
                strokeLinejoin="round">
                <title>{`J${s.joueur} — ${s.nom}`}</title>
              </polygon>
              {s.points.map((p, i) => {
                const c = point(i, p.ratio)
                const pct = Math.round(Math.max(0, Math.min(1, p.ratio)) * 100)
                return (
                  <circle key={i} cx={c.x} cy={c.y} r={3.2} fill={col} stroke="#000" strokeWidth={0.5}>
                    <title>{`J${s.joueur} · ${axes[i]} : ${pct} % — ${p.detail}`}</title>
                  </circle>
                )
              })}
            </g>
          )
        })}
      </svg>
    </div>
  )
}
