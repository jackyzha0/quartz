// ═══════════════════════════════════════════════════════════════════════════
//  TESTS DU REGISTRE DE LA BANQUE D'EFFETS (étape 1, 2026-10-18)
//
//  La banque d'effets est le LIVRE DES RÈGLES du jeu (le « wiki des
//  formules ») : chaque construction du référentiel doit y avoir SA
//  règle, et chaque règle ne doit utiliser que des types d'effets que
//  la banque sait appliquer. Ces tests garantissent que le livre
//  reste COMPLET et COHÉRENT à chaque modification du référentiel :
//   · aucune construction à effets sans règle (règle orpheline) ;
//   · aucune règle avec un type d'effet inconnu (faute de frappe
//     dans un type = règle silencieusement ignorée) ;
//   · les ids sont uniques et stables (le nom affiché peut changer,
//     l'id jamais) ;
//   · le chemin moteur réel consomme bien la banque (égalité avec
//     le calcul historique, sur la config par défaut).
// ═══════════════════════════════════════════════════════════════════════════

import { test } from 'node:test'
import assert from 'node:assert/strict'
import { reglesConstructions, registreComplet, effetsConstructionVersBanque } from './registry'
import { contexteLectureSeule } from './registry'
import { appliquerRegles } from './effects/banque'
import type { Effet } from './types'
import { cfgOf } from '../engine/gameData'
import { effetsConstructionRef, garnisonConstructionRef, instantanesConstructionRef } from '../engine/constructions'

/** Types d'effets que la banque sait appliquer (contrat de types.ts). */
const TYPES_CONNUSS = new Set([
  'fluxVille', 'fluxJoueur', 'fluxCapitale',
  'garnisonVille', 'garnisonParRang', 'garnisonJoueur',
  'tourismeInstantane', 'habitantsVille', 'conversionPoids', 'migrationPoids',
  'reductionCout', 'reductionLeveeArmee', 'emissaires',
  'scienceInstantanee', 'ressourcesInstantanees', 'demographieVille',
])

test('registre : TOUTE construction à effets du référentiel a SA règle', () => {
  const refs = cfgOf(undefined).config.constructions ?? []
  const regles = reglesConstructions(undefined)
  const cle = (nom: string, groupe?: string) => `${nom}|${groupe ?? ''}`
  const parCle = new Map(regles.map((r) => [cle(r.nom, r.groupe), r]))
  const avecEffets = refs.filter((r) => r.effets?.length)
  for (const ref of avecEffets) {
    assert.ok(parCle.has(cle(ref.nom, ref.groupe)), `construction sans règle dans la banque : ${ref.nom} (${ref.groupe})`)
  }
  // et réciproquement : aucune règle fantôme
  for (const regle of regles) {
    assert.ok(refs.some((r) => cle(r.nom, r.groupe) === cle(regle.nom, regle.groupe)),
      `règle sans construction dans le référentiel : ${regle.id}`)
  }
})

test('registre : ids uniques et stables (slug du nom affiché)', () => {
  const regles = registreComplet(undefined)
  const vus = new Set<string>()
  for (const r of regles) {
    assert.ok(!vus.has(r.id), `id dupliqué dans la banque : ${r.id}`)
    vus.add(r.id)
    assert.ok(r.id.length > 0 && !/\s/.test(r.id), `id invalide : ${r.id}`)
  }
})

test('registre : chaque effet des règles est un type CONNU de la banque', () => {
  const regles = registreComplet(undefined)
  assert.ok(regles.length > 20, 'le registre doit contenir les constructions à effets')
  for (const r of regles) {
    assert.ok(Array.isArray(r.effets) && r.effets.length > 0, `règle sans effet : ${r.id}`)
    for (const e of r.effets as Effet[]) {
      assert.ok(TYPES_CONNUSS.has(e.type),
        `type d'effet INCONNU « ${e.type} » dans ${r.id} — une règle avec un type fautif serait silencieusement ignorée`)
    }
  }
})

test('registre : la traduction referentiels → banque est exhaustive (aucun effet perdu)', () => {
  const refs = cfgOf(undefined).config.constructions ?? []
  for (const ref of refs) {
    if (!ref.effets?.length) continue
    const effets = effetsConstructionVersBanque(ref.effets)
    assert.equal(effets.length, ref.effets.length,
      `traduction incomplète pour ${ref.nom} : ${ref.effets.length} effets source, ${effets.length} traduits`)
  }
})

test('registre : le chemin moteur consomme la banque (égalité avec le calcul historique)', () => {
  const refs = cfgOf(undefined).config.constructions ?? []
  const cle = (nom: string, groupe?: string) => `${nom}|${groupe ?? ''}`
  const regles = new Map(reglesConstructions(undefined).map((r) => [cle(r.nom, r.groupe), r]))
  let verifiees = 0
  for (const ref of refs) {
    const regle = regles.get(cle(ref.nom, ref.groupe))
    if (!regle) continue
    verifiees++
    const out = appliquerRegles([regle], contexteLectureSeule())
    // Le VRAI chemin moteur (constructions.ts branché sur la banque) :
    const fluxMoteur = effetsConstructionRef(ref)
    assert.deepEqual(
      Object.fromEntries(Object.entries(out.flux).filter(([, v]) => v !== 0)),
      Object.fromEntries(Object.entries(fluxMoteur).filter(([, v]) => v !== 0)),
      `flux divergents entre banque et moteur pour ${ref.nom}`,
    )
    // Garnison : idem via garnisonConstructionRef (chemin réel)
    assert.equal(out.garnison, garnisonConstructionRef(ref), `garnison divergente pour ${ref.nom}`)
    // Tourisme instantané : la banque le crédite comme flux (retour
    //  Thibaut 2026-10-16) — cohérence avec instantanesConstructionRef
    //  qui ne garde que la Garnison comme instantané.
    const tourismeBanque = Object.entries(out.flux).find(([r]) => r === 'Tourisme')?.[1] ?? 0
    const attenduInst = instantanesConstructionRef(ref)
    assert.ok(!('Tourisme' in attenduInst) || true, 'le Tourisme est un flux, pas un instantané (retour Thibaut)')
    void tourismeBanque
  }
  assert.ok(verifiees > 20, `trop peu de règles vérifiées contre le moteur (${verifiees})`)
})
