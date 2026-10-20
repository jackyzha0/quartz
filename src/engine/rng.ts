// ══════════════════════════════════════════════════════════════════════
//  Générateur pseudo-aléatoire déterministe (mulberry32)
//  Remplace Rnd() du VBA : la graine est stockée dans GameState.rngState,
//  ce qui rend chaque partie reproductible et rejouable.
//  ⚠ Périmètre du déterminisme : les TIRAGES uniquement. Les ids de
//  personnages (newId, shared.ts) mêlent Date.now() + compteur module
//  et ne sont PAS reproductibles — rejouer la même graine redonne les
//  mêmes événements avec des ids différents (documenté en dette).
// ══════════════════════════════════════════════════════════════════════

export interface Rng {
  next(): number            // [0, 1)
  int(min: number, max: number): number   // entier inclusif [min, max]
  die(n: number): number                  // 1dN
  chance(p: number): boolean              // tirage < p
  pick<T>(arr: T[]): T
  pickWeighted<T>(items: T[], weight: (t: T) => number): T
  shuffle<T>(arr: T[]): T[]
  state(): number
}

export function makeRng(seed: number): Rng {
  let s = seed >>> 0
  function next(): number {
    s = (s + 0x6d2b79f5) >>> 0
    let t = s
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
  return {
    next,
    int: (min, max) => min + Math.floor(next() * (max - min + 1)),
    die: (n) => 1 + Math.floor(next() * n),
    chance: (p) => next() < p,
    pick: (arr) => arr[Math.floor(next() * arr.length)],
    pickWeighted: (items, weight) => {
      const total = items.reduce((s2, it) => s2 + Math.max(0, weight(it)), 0)
      if (total <= 0) return items[Math.floor(next() * items.length)]
      let r = next() * total
      for (const it of items) {
        r -= Math.max(0, weight(it))
        if (r <= 0) return it
      }
      return items[items.length - 1]
    },
    shuffle: (arr) => {
      const a = [...arr]
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(next() * (i + 1))
        ;[a[i], a[j]] = [a[j], a[i]]
      }
      return a
    },
    state: () => s,
  }
}

export function newSeed(): number {
  return (Date.now() ^ Math.floor(Math.random() * 0xffffffff)) >>> 0
}
