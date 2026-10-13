// ══════════════════════════════════════════════════════════════════════
//  Progrès : arbres de progrès par joueur (feuille « Progrès » du
//  classeur). Règles du classeur :
//    • un arbre = branche A (2 techs) + branche B (2 techs) + tech C ;
//    • la tech 2 d'une branche exige sa tech 1 ;
//    • la tech C exige les 2 techs d'une même branche ;
//    • un arbre est TERMINÉ à EXACTEMENT 3 technologies (la tech C
//      est optionnelle pour terminer l'arbre) ;
//    • l'âge N s'ouvre après 3 arbres complétés de l'âge N-1.
//  Les technologies et leurs effets sont appliqués au plateau — aucun
//  effet automatique dans le moteur web. Tout est paramétrable dans
//  « 📚 Référentiels » → « Progrès ».
// ══════════════════════════════════════════════════════════════════════

import React from 'react'
import { useGame } from '../state/store'
import { cfgOf } from '../engine/gameData'
import type { GameState } from '../engine/types'
import type { ProgresArbre, ProgresTechDef } from '../config/defaultConfig'
import { Card, Badge, Button } from './ui'

type Slot = 'a1' | 'a2' | 'b1' | 'b2' | 'c'
const SLOTS: Slot[] = ['a1', 'a2', 'b1', 'b2', 'c']

/** Exactement 3 technologies terminent un arbre (la tech C est optionnelle). */
const TECHS_PAR_ARBRE = 3
/** 3 arbres complétés de l'âge N-1 ouvrent l'âge N. */
const ARBRES_PAR_AGE = 3
const AGES = [1, 2, 3]

/** Technologie d'un emplacement d'arbre (a1/a2/b1/b2/c). */
function techOf(arbre: ProgresArbre, s: Slot): ProgresTechDef | undefined {
  if (s === 'c') return arbre.techC
  const br = s[0] === 'a' ? arbre.brancheA : arbre.brancheB
  return br?.[+s[1] - 1]
}

export function ProgresView({ joueur }: { joueur: number }) {
  const { state, update } = useGame()
  if (!state) return null
  const arbres = cfgOf(state.config).config.progres
  const p = state.players.find((q) => q.n === joueur)
  if (!p) return null
  const debloques = new Set(p.progresDebloques ?? [])

  const key = (i: number, s: Slot) => `${i}:${s}`
  const debloque = (i: number, s: Slot) => debloques.has(key(i, s))
  const nbDebloquesArbre = (i: number) => SLOTS.filter((s) => debloque(i, s)).length
  const arbreComplet = (i: number) => nbDebloquesArbre(i) >= TECHS_PAR_ARBRE
  const arbresCompletesDansAge = (age: number) =>
    arbres.filter((_, i) => arbres[i].age === age && arbreComplet(i)).length
  const ageOuvert = (age: number) =>
    age <= 1 || arbresCompletesDansAge(age - 1) >= ARBRES_PAR_AGE

  /** Raison du blocage (null = débloquable) pour un emplacement non débloqué. */
  const blocage = (i: number, s: Slot): string | null => {
    if (debloque(i, s)) return null
    const a = arbres[i]
    if (!a) return 'Arbre introuvable (référentiel modifié)'
    if (!ageOuvert(a.age))
      return `Âge ${a.age} verrouillé : complétez ${ARBRES_PAR_AGE} arbres de l'âge ${a.age - 1}`
    if (nbDebloquesArbre(i) >= TECHS_PAR_ARBRE)
      return `Arbre terminé : exactement ${TECHS_PAR_ARBRE} technologies`
    if (s === 'a2' && !debloque(i, 'a1')) return "Débloquez d'abord la technologie 1 de la branche A"
    if (s === 'b2' && !debloque(i, 'b1')) return "Débloquez d'abord la technologie 1 de la branche B"
    if (s === 'c' && !((debloque(i, 'a1') && debloque(i, 'a2')) || (debloque(i, 'b1') && debloque(i, 'b2'))))
      return "La technologie C exige les 2 technologies d'une même branche"
    const t = techOf(a, s)
    if (!t || !t.nom) return 'Emplacement vide — remplissez-le dans Référentiels → Progrès'
    return null
  }

  /** Re-valide les déblocages d'un joueur (retrait en cascade) :
   *  branches, tech C, exactement 3 par arbre, ouverture des âges. */
  const revalider = (st: GameState, set: Set<string>): string[] => {
    const cfg = cfgOf(st.config).config.progres
    let change = true
    while (change) {
      change = false
      for (const k of Array.from(set)) {
        const sep = k.lastIndexOf(':')
        const i = +k.slice(0, sep)
        const s = k.slice(sep + 1) as Slot
        const a = cfg[i]
        if (!a) { set.delete(k); change = true; continue }
        if (s === 'a2' && !set.has(`${i}:a1`)) { set.delete(k); change = true; continue }
        if (s === 'b2' && !set.has(`${i}:b1`)) { set.delete(k); change = true; continue }
        if (s === 'c' && !((set.has(`${i}:a1`) && set.has(`${i}:a2`)) || (set.has(`${i}:b1`) && set.has(`${i}:b2`)))) { set.delete(k); change = true; continue }
        if (a.age > 1) {
          const completes = cfg.filter(
            (ar, idx) => ar.age === a.age - 1 && SLOTS.filter((s2) => set.has(`${idx}:${s2}`)).length >= TECHS_PAR_ARBRE,
          ).length
          if (completes < ARBRES_PAR_AGE) { set.delete(k); change = true; continue }
        }
      }
      // exactement 3 par arbre : retirer les dépassements
      cfg.forEach((_, idx) => {
        const actifs = SLOTS.filter((s2) => set.has(`${idx}:${s2}`))
        if (actifs.length > TECHS_PAR_ARBRE) {
          for (const s2 of actifs.slice(TECHS_PAR_ARBRE)) set.delete(`${idx}:${s2}`)
          change = true
        }
      })
    }
    return Array.from(set)
  }

  const basculer = (i: number, s: Slot) => {
    if (!debloque(i, s) && blocage(i, s)) return
    update((st) => {
      const q = st.players.find((r) => r.n === joueur)
      if (!q) return
      const set = new Set(q.progresDebloques ?? [])
      const k = key(i, s)
      if (set.has(k)) set.delete(k)
      else set.add(k)
      q.progresDebloques = revalider(st, set)
    })
  }

  /** Rangée d'une technologie (bouton débloquer / reprendre + effet). */
  const rangeeTech = (i: number, s: Slot, label: string) => {
    const a = arbres[i]
    const t = a ? techOf(a, s) : undefined
    const actif = debloque(i, s)
    const err = blocage(i, s)
    const vide = !t || !t.nom
    return (
      <div key={s} className="mini" style={{ opacity: vide && !actif ? 0.55 : 1 }}>
        <div className="mini-title">
          {label}
          {t?.cout ? <span className="muted"> · coût : {t.cout}</span> : null}
        </div>
        <div className={actif ? '' : 'muted'}>
          <strong>{t?.nom || '— emplacement vide —'}</strong>
        </div>
        <div className="muted small">{t?.description || 'à remplir dans Référentiels → Progrès'}</div>
        <Button
          tone={actif ? 'danger' : 'primary'}
          disabled={!actif && (!!err || vide)}
          title={err ?? undefined}
          onClick={() => basculer(i, s)}
        >
          {actif ? '− Reprendre' : '+ Débloquer'}
        </Button>
      </div>
    )
  }

  const totalDebloques = Array.from(debloques).length

  return (
    <div className="stack">
      <Card title={`Progrès de ${p.nom} — ${totalDebloques} technologie(s) débloquée(s)`}>
        <p className="muted small">
          Règles : la technologie 2 exige la technologie 1 de sa branche ; la technologie C exige
          les 2 technologies d'une même branche ; un arbre se termine à EXACTEMENT{' '}
          {TECHS_PAR_ARBRE} technologies (la tech C est optionnelle) ; {ARBRES_PAR_AGE} arbres
          complétés de l'âge N-1 ouvrent l'âge N. Les effets s'appliquent au plateau, pas au moteur.
        </p>
      </Card>

      {AGES.map((age) => {
        const indices = arbres.map((a, i) => ({ a, i })).filter(({ a }) => a.age === age)
        const completes = arbresCompletesDansAge(age)
        const ouvert = ageOuvert(age)
        return (
          <Card
            key={age}
            title={`Âge ${age} — ${completes}/${arbres.filter((a) => a.age === age).length} arbre(s) complété(s)`}
            right={
              <Badge tone={ouvert ? 'good' : 'bad'}>
                {ouvert ? 'ouvert' : `verrouillé (${completes}/${ARBRES_PAR_AGE} arbres de l'âge ${age - 1})`}
              </Badge>
            }
          >
            {!ouvert && (
              <p className="muted small">
                Complétez {ARBRES_PAR_AGE} arbres de l'âge {age - 1} pour ouvrir les arbres de l'âge {age}.
              </p>
            )}
            <div className={ouvert ? 'stack' : 'stack'} style={{ opacity: ouvert ? 1 : 0.5 }}>
              {indices.map(({ a, i }) => {
                const nb = nbDebloquesArbre(i)
                const complet = arbreComplet(i)
                return (
                  <div key={i} className="mb">
                    <div style={{ display: 'flex', gap: 8, alignItems: 'baseline', flexWrap: 'wrap' }}>
                      <strong>{a.nom}</strong>
                      {a.tags ? <span className="muted small">[{a.tags}]</span> : null}
                      <Badge tone={complet ? 'good' : 'neutral'}>
                        {nb}/{TECHS_PAR_ARBRE} {complet ? '— arbre terminé ✔' : ''}
                      </Badge>
                    </div>
                    <div className="grid-2" style={{ marginTop: 8 }}>
                      <div>
                        <div className="mini-title">Branche A</div>
                        {rangeeTech(i, 'a1', 'A.1')}
                        {rangeeTech(i, 'a2', 'A.2')}
                      </div>
                      <div>
                        <div className="mini-title">Branche B</div>
                        {rangeeTech(i, 'b1', 'B.1')}
                        {rangeeTech(i, 'b2', 'B.2')}
                      </div>
                    </div>
                    {rangeeTech(i, 'c', 'Technologie C (optionnelle)')}
                  </div>
                )
              })}
            </div>
          </Card>
        )
      })}
    </div>
  )
}
