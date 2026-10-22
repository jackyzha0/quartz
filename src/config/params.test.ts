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

test('défauts v3 : Gompertz 0.0025/0.08/0.9, caps Chasseur supprimées (vague 3b), ageMax rayé', () => {
  assert.equal(DEFAULT_PARAMS.maladieBase, 0.0025)
  assert.equal(DEFAULT_PARAMS.maladiePente, 0.08)
  assert.equal(DEFAULT_PARAMS.maladieCap, 0.9)
  assert.ok(!('capMetierChasseurVille' in DEFAULT_PARAMS), 'capMetierChasseurVille supprimé (vague 3b : cap = base du rang + emplacements)')
  assert.ok(!('capMetierChasseurChateau' in DEFAULT_PARAMS), 'capMetierChasseurChateau supprimé (vague 3b)')
  assert.ok(!('ageMaxBase' in DEFAULT_PARAMS), 'ageMaxBase disparaît (mortalité Gompertz seule)')
  assert.ok(!('ageMaxAla' in DEFAULT_PARAMS))
})

test('cfgOf : conversion v2 → courante (titres → metiers, champ interne renommé, prodParTitre → prodParMetier), tampon schemaVersion', () => {
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
  assert.equal(SCHEMA_VERSION_CONFIG, 4)
  assert.equal(C.config.schemaVersion, 4, 'tampon posé à la version courante')
  // referentiel converti : table metiers, champ metier — la vague 3a
  //  (migration metiersAmenagements2026) AJOUTE les métiers manquants
  //  du nouveau référentiel derrière la table convertie : 1 Testeur + 24.
  assert.equal(C.metiers.length, 25)
  assert.equal(C.metiers[0].metier, 'Testeur', 'le champ interne titre devient metier')
  assert.ok(C.metiers.some((m) => m.metier === 'Fermier'), 'vague 3a : les métiers manquants sont ajoutés')
  assert.ok(!C.metiers.some((m) => m.metier === 'Propagandiste'), 'vague 3a : Propagandiste retiré')
  // banque convertie : champ interne renommé aussi (Testeur + 12 défauts)
  assert.equal(C.config.metiersEffets.length, 13)
  assert.equal(C.config.metiersEffets[0].metier, 'Testeur')
  // effet de tech converti
  const techApres = (C.config.progres?.[0]?.brancheA?.[0] ?? {}) as unknown as { effets?: Array<{ type?: string; metier?: string }> }
  assert.equal(techApres.effets?.[0]?.type, 'prodParMetier')
  assert.equal(techApres.effets?.[0]?.metier, 'Testeur')
  // convergée : un second passage ne casse rien (le tampon tient)
  const C2 = cfgOf(C.config)
  assert.equal(C2.metiers[0].metier, 'Testeur')
})

test('cfgOf : une config DÉJÀ convergée ignore les champs v2 restants', () => {
  const cfg = cloneDefaultConfig()
  const asAny = cfg as unknown as Record<string, unknown>
  // v4 = tampon courant (bumpé par la migration des aménagements,
  //  retour Thibaut 2026-10-22) : les configs tamponnées au numéro
  //  précédent REPASSENT par les migrations — la conversion v2 → v3
  //  rejouerait sur les restes de `titres` ; ce test garantit qu'une
  //  config au tampon COURANT n'est plus re-migrée.
  asAny.schemaVersion = SCHEMA_VERSION_CONFIG
  asAny.titres = [{ titre: 'Fantôme', education: '', valeur1: 0, ressource1: '', valeur2: 0, ressource2: '', description: '', nobleSeul: false, regleGenre: '', attribution: 'Manuelle' }]
  const C = cfgOf(cfg)
  // le référentiel par défaut prime (garde-fous), la table v2 est ignorée
  assert.ok(C.metiers.length > 1, 'le référentiel par défaut est conservé')
  assert.ok(!C.metiers.some((m) => m.metier === 'Fantôme'), 'la table titres n a pas été convertie (déjà convergée)')
})

test('cfgOf : suppression de la martialité (arbitrage 2026-10-21) — regleGenre « Martialité » → vide, clé martialite dépouillée, même sur config convergée', () => {
  const cfg = cloneDefaultConfig()
  cfg.schemaVersion = 3 // déjà convergée : la migration ciblée (z) doit jouer quand même
  cfg.metiers[0].regleGenre = 'Martialité'
  ;(cfg.cultures[0] as unknown as { martialite: string }).martialite = 'Masculine'
  const C = cfgOf(cfg)
  assert.ok(C.metiers.every((m) => m.regleGenre !== 'Martialité'), 'plus aucun métier régi par la martialité')
  assert.equal(C.metiers[0].regleGenre, '', 'regleGenre Martialité devient vide')
  assert.ok(C.cultures.every((c) => !('martialite' in c)), 'la clé martialite disparaît des cultures')
  assert.equal(C.config.martialiteSupprimee, true)
  // idempotente : un second passage ne casse rien (le marqueur tient)
  const C2 = cfgOf(C.config)
  assert.ok(C2.metiers.every((m) => m.regleGenre !== 'Martialité'))
})
