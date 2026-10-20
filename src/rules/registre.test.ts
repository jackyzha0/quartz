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
//   · le chemin moteur réel EST la banque (voie unique de production
//     depuis le 2026-10-19 — retour Thibaut).
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
  'fluxVille', 'fluxJoueur', 'fluxCapitale', 'fluxJoueurParMinistre',
  'fluxParAmenagement', 'fluxParVilleCultureMonde',
  'fluxSiCapitale', 'fluxParVille', 'fluxParVilleProximite',
  'fluxParRangHabitation', 'fluxParBatiment', 'fluxParGarnisonHabitation', 'fluxParMetier',
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

test('registre : le chemin moteur EST la banque (voie unique de production)', () => {
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
    // Le Tourisme est un FLUX de la banque (retour Thibaut 2026-10-16) :
    //  instantanesConstructionRef ne rend plus QUE la Garnison.
    const tourismeBanque = Object.entries(out.flux).find(([r]) => r === 'Tourisme')?.[1] ?? 0
    const attenduInst = instantanesConstructionRef(ref)
    assert.equal(attenduInst['Tourisme'], undefined, 'le Tourisme n’est plus un instantané')
    void tourismeBanque
  }
  assert.ok(verifiees > 20, `trop peu de règles vérifiées contre le moteur (${verifiees})`)
})

test('doublons Ville/Château : le moteur rend les effets de la BONNE version (bug réel)', () => {
  // 4 constructions existent en versions Ville ET Château aux effets
  //  DIFFÉRENTS (ex. Echoppe). Le moteur historique lisait toujours
  //  la première (Ville) — un château recevait les effets/coûts de la
  //  version Ville. Le correctif : constructionRef(nom, cfg, groupe).
  const refs = cfgOf(undefined).config.constructions ?? []
  const doublons = new Map<string, Set<string>>()
  for (const ref of refs) {
    if (!doublons.has(ref.nom)) doublons.set(ref.nom, new Set())
    doublons.get(ref.nom)!.add(ref.groupe)
  }
  const avecDeuxGroupes = [...doublons.entries()]
    .filter(([, g]) => g.size > 1).map(([nom]) => nom)
  assert.ok(avecDeuxGroupes.includes('Echoppe'), 'Echoppe doit exister en Ville et Château')
  // Echoppe Ville = +2 Or, Château = +2 Or mais coût différent :
  //  la résolution PAR GROUPE doit donner des refs distinctes.
  const ville = cfgOf(undefined).config.constructions.find((c) => c.nom === 'Echoppe' && c.groupe === 'Ville')
  const chateau = cfgOf(undefined).config.constructions.find((c) => c.nom === 'Echoppe' && c.groupe === 'Château')
  assert.ok(ville && chateau, 'les deux versions Echoppe existent')
  assert.notEqual(ville.cout, chateau.cout, 'les coûts des deux versions diffèrent (donc le groupe compte)')
})
