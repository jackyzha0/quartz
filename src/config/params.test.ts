// ═══════════════════════════════════════════════════════════════════════════
//  TESTS PARAMÈTRES — renommages v3 + Gompertz + conversion config v2
//  (rework habitants, 2026-10-20)
//
//   · mergeParams traduit les ANCIENNES clés titreXxx → metierXxx sans
//     jamais écraser une clé nouvelle déjà fournie ;
//   · les défauts Gompertz (0.0025 / 0.08 / 0.9) et les caps Chasseur
//     (Ville 50 / Château 25) sont verrouillés, ageMax est rayé ;
//   · cfgOf convertit une config v2 (titres/titresEffets/prodParTitre)
//     une seule fois et tamponne schemaVersion = 3 ; une config déjà
//     convergée (schemaVersion 3) ignore les vieux champs.
// ═══════════════════════════════════════════════════════════════════════════

import { test } from 'node:test'
import assert from 'node:assert/strict'
import { DEFAULT_PARAMS, mergeParams } from './params'
import { cfgOf, cloneDefaultConfig, SCHEMA_VERSION_CONFIG } from './defaultConfig'

test('mergeParams : les anciennes clés titreXxx sont traduites en metierXxx', () => {
  const p = mergeParams({
    titreChasseur: 'Veneur',
    titreGouverneur: 'Intendant',
    mariageBonusTitre: 1.5,
  })
  assert.equal(p.metierChasseur, 'Veneur', 'titreChasseur → metierChasseur')
  assert.equal(p.metierGouverneur, 'Intendant', 'titreGouverneur → metierGouverneur')
  assert.equal(p.mariageBonusMetier, 1.5, 'mariageBonusTitre → mariageBonusMetier')
  assert.ok(!('titreChasseur' in p), 'la clé ancienne disparaît du résultat')
  assert.ok(!('titreGouverneur' in p))
})

test('mergeParams : la clé NOUVELLE prime sur l ancienne, quel que soit l ordre', () => {
  const a = mergeParams({ metierChasseur: 'Pisteur', titreChasseur: 'Veneur' })
  assert.equal(a.metierChasseur, 'Pisteur', 'nouvelle clé d abord : elle prime')
  const b = mergeParams({ titreChasseur: 'Veneur', metierChasseur: 'Pisteur' })
  assert.equal(b.metierChasseur, 'Pisteur', 'ancienne clé d abord : elle est écrasée par la nouvelle')
})

test('défauts v3 : Gompertz 0.0025/0.08/0.9, caps Chasseur 50/25, ageMax rayé', () => {
  assert.equal(DEFAULT_PARAMS.maladieBase, 0.0025)
  assert.equal(DEFAULT_PARAMS.maladiePente, 0.08)
  assert.equal(DEFAULT_PARAMS.maladieCap, 0.9)
  assert.equal(DEFAULT_PARAMS.capMetierChasseurVille, 50)
  assert.equal(DEFAULT_PARAMS.capMetierChasseurChateau, 25)
  assert.ok(!('ageMaxBase' in DEFAULT_PARAMS), 'ageMaxBase disparaît (mortalité Gompertz seule)')
  assert.ok(!('ageMaxAla' in DEFAULT_PARAMS))
})

test('cfgOf : conversion v2 → v3 (titres → metiers, champ interne renommé, prodParTitre → prodParMetier), tampon schemaVersion', () => {
  const cfg = cloneDefaultConfig()
  const asAny = cfg as unknown as Record<string, unknown>
  // referentiel v2 : table `titres` avec champ `titre`
  asAny.titres = [{
    titre: 'Testeur', education: '', valeur1: 1, ressource1: 'Or',
    valeur2: 0, ressource2: '', description: 'Métier de test', nobleSeul: false,
    regleGenre: '', attribution: 'Manuelle',
  }]
  delete asAny.metiers
  // banque v2 : `titresEffets` avec champ `titre`
  asAny.titresEffets = [{ titre: 'Testeur', effet: 'Riche', revocation: 'Aucune' }]
  delete asAny.metiersEffets
  // effet de tech v2 : prodParTitre avec champ `titre`
  const tech = (cfg.progres?.[0]?.brancheA?.[0] ?? {}) as unknown as Record<string, unknown>
  tech.effets = [{ type: 'prodParTitre', titre: 'Testeur', montant: 1, ressource: 'Or' }]
  asAny.schemaVersion = 2
  const C = cfgOf(cfg)
  assert.equal(SCHEMA_VERSION_CONFIG, 3)
  assert.equal(C.config.schemaVersion, 3, 'tampon posé à la version courante')
  // referentiel converti : table metiers, champ metier
  assert.equal(C.metiers.length, 1)
  assert.equal(C.metiers[0].metier, 'Testeur', 'le champ interne titre devient metier')
  // banque convertie : champ interne renommé aussi
  assert.equal(C.config.metiersEffets.length, 1)
  assert.equal(C.config.metiersEffets[0].metier, 'Testeur')
  // effet de tech converti
  const techApres = (C.config.progres?.[0]?.brancheA?.[0] ?? {}) as unknown as { effets?: Array<{ type?: string; metier?: string }> }
  assert.equal(techApres.effets?.[0]?.type, 'prodParMetier')
  assert.equal(techApres.effets?.[0]?.metier, 'Testeur')
  // convergée : un second passage ne casse rien (le tampon tient)
  const C2 = cfgOf(C.config)
  assert.equal(C2.metiers[0].metier, 'Testeur')
})

test('cfgOf : une config DÉJÀ convergée (v3) ignore les champs v2 restants', () => {
  const cfg = cloneDefaultConfig()
  const asAny = cfg as unknown as Record<string, unknown>
  asAny.schemaVersion = 3 // déjà convergée
  asAny.titres = [{ titre: 'Fantôme', education: '', valeur1: 0, ressource1: '', valeur2: 0, ressource2: '', description: '', nobleSeul: false, regleGenre: '', attribution: 'Manuelle' }]
  const C = cfgOf(cfg)
  // le référentiel par défaut prime (garde-fous), la table v2 est ignorée
  assert.ok(C.metiers.length > 1, 'le référentiel par défaut est conservé')
  assert.ok(!C.metiers.some((m) => m.metier === 'Fantôme'), 'la table titres n a pas été convertie (déjà convergée)')
})
