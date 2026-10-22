// ═══════════════════════════════════════════════════════════════════════════
//  TESTS DU CHEMIN CONFIG (2026-10-19) — les tests qui auraient attrapé
//  les bugs réels de la série :
//
//   BUG 1 « adultAge resté à 16 » : l'adoption de la config mondiale au
//   chargement était ABSENTE du code déployé (commit parti sans l'effet).
//   → testé ici : la mondiale PRIME sur la locale au chargement.
//
//   BUG 2 « rien n'avait changé après reconnexion » : joinGame adoptait
//   la config EMBARQUÉE du salon, plus ancienne qu'une édition faite
//   depuis l'accueil entre deux tours.
//   → testé ici : priorité mondiale > embarquée > locale, + injection
//   dans l'état (l'UI de jeu lit state.config).
// ═══════════════════════════════════════════════════════════════════════════

import { test } from 'node:test'
import assert from 'node:assert/strict'
import { adopterConfig, configAuChargement } from './configPriorite'
import { cloneDefaultConfig, cfgOf, type GameConfig } from '../config/defaultConfig'
import { createGame, type SetupLine } from '../engine/setup'
import type { GameState } from '../engine/types'

const SETUP: SetupLine[] = [{
  nom: 'Test', peuple: 'NORLS', culture: 'Culture Nordique', regime: 'Autoritarisme',
  taillePopulation: 20, pourcentageMariages: 40, villes: ['A'],
}]

/** Config factice reconnaissable : un paramètre marqué. */
function configAvec(adultAge: number): GameConfig {
  const c = cloneDefaultConfig()
  c.params = { ...c.params, adultAge }
  return c
}

function partie(): GameState {
  return createGame(SETUP, 42, 'local')
}

// ── Le contrat de priorité (BUG 1 et BUG 2) ─────────────────────────────────

test('config : la MONDIALE prime sur la locale au chargement (bug adultAge 16→18)', () => {
  const locale = configAvec(16)     // l'amorce localStorage de l'utilisateur
  const mondiale = configAvec(18)  // publiée depuis l'accueil par un autre joueur
  const choisie = configAuChargement({ mondiale, locale })
  assert.ok(choisie, 'une config doit être choisie')
  assert.equal(cfgOf(choisie).config.params?.adultAge, 18,
    'la mondiale doit primer — c est le bug : la page rafraîchie doit montrer 18, pas le 16 du localStorage')
})

test('config : sans mondiale (hors-ligne), la locale reste (amorce)', () => {
  const locale = configAvec(16)
  const choisie = configAuChargement({ mondiale: null, locale })
  assert.equal(cfgOf(choisie!).config.params?.adultAge, 16,
    'hors-ligne, l amorçe locale fait foi — pas de retour à zéro')
})

test('config : joinGame — la MONDIALE prime sur l EMBARQUÉE du salon (édition entre deux tours)', () => {
  // Le salon publié à la dernière résolution embarque adultAge 16 ;
  //  le créateur a édité 18 depuis l'accueil APRÈS cette résolution.
  const etat = partie()
  etat.config = configAvec(16)
  const mondiale = configAvec(18)
  const choisie = adopterConfig(etat, { mondiale, locale: configAvec(16) })
  assert.ok(choisie, 'une config doit être adoptée')
  assert.equal(cfgOf(choisie).config.params?.adultAge, 18, 'la mondiale (18) doit gagner sur la locale (16)')
  // et elle est INJECTÉE dans l'état : l'UI de jeu lit state.config
  assert.equal(cfgOf(etat.config!).config.params?.adultAge, 18,
    'la config doit être injectée dans l état — sinon le jeu affiche l ancienne valeur (bug réel)')
})

test('config : sans mondiale, l EMBARQUÉE du salon n est PLUS une source — la LOCALE fait foi', () => {
  // Règle 2026-10-19 : seule la mondiale fait loi ; la config embarquée
  //  d'un état de partie est un cache, jamais une source.
  const etat = partie()
  etat.config = configAvec(17) // cache périmé embarqué
  const choisie = adopterConfig(etat, { mondiale: null, locale: configAvec(16) })
  assert.ok(choisie)
  assert.equal(cfgOf(choisie).config.params?.adultAge, 16,
    'sans mondiale, la locale (16) doit être adoptée, PAS l embarquée (17)')
  assert.equal(cfgOf(etat.config!).config.params?.adultAge, 16,
    'l état doit être réinjecté avec la locale, pas garder son cache périmé')
})

test('config : aucune source → rien ne change (pas d écrasement par null)', () => {
  const etat = partie()
  const avant = etat.config
  const choisie = adopterConfig(etat, { mondiale: null, locale: null })
  assert.equal(choisie, null, 'aucune source → null, l appelant ne change rien')
  assert.equal(etat.config, avant, 'l état ne doit pas être muté sans source')
})

// ── Le contrat d'injection à la résolution (fin de tour) ─────────────────────

test('config : l injection fin de tour conserve la config si la mondiale est absente', async () => {
  const { appliquerConfigMondiale } = await import('../engine/fusion')
  const etat = partie()
  etat.config = configAvec(17)
  appliquerConfigMondiale(etat, null)
  assert.equal(cfgOf(etat.config!).config.params?.adultAge, 17,
    'sans mondiale publiée, l embarquée doit survivre à la résolution')
  appliquerConfigMondiale(etat, configAvec(18))
  assert.equal(cfgOf(etat.config!).config.params?.adultAge, 18,
    'avec une mondiale, la résolution l applique avant runTurn')
})

// ── Migration v4 (retour Thibaut 2026-10-22 « les descriptions des
//    aménagements, c'est du grand n'importe quoi ») ─────────────────────────

test('config : migration v4 — les aménagements pré-vague-3a sont réalignés (descriptions, effets, emplacements)', () => {
  const c = cloneDefaultConfig()
  c.schemaVersion = 3
  // Config d'avant la vague 3a (production → emplacements) et avant la
  //  vague 3c : le Baleinier porte l'ANCIENNE description, les ANCIENS
  //  effets structurés (encore lus par le moteur !) et PAS de champ
  //  emplacements ; les tiers 2/3 n'existent pas.
  const iB = c.constructions.findIndex((x) => x.nom === 'Baleinier')
  assert.ok(iB >= 0, 'Baleinier dans les défauts')
  c.constructions[iB] = {
    ...c.constructions[iB],
    description: '+2 Or et +10 Nourriture par tour.',
    effets: [{ ressource: 'Or', quantite: 2 }, { ressource: 'Nourriture', quantite: 10 }],
  } as typeof c.constructions[number]
  delete (c.constructions[iB] as { emplacements?: unknown }).emplacements
  c.constructions = c.constructions.filter((x) => !x.nom.includes('tier'))
  // un aménagement PERSO doit survivre au réalignement
  c.constructions.push({
    categorie: 'Aménagement', groupe: 'Terrain', famille: '', nom: 'Mon aménagement perso',
    cout: '', production: '', description: 'perso', effets: [],
  })
  const C = cfgOf(c)
  const b = C.config.constructions.find((x) => x.nom === 'Baleinier')!
  assert.equal(b.description, '',
    'description réalignée sur le référentiel (vide depuis le retrait des descriptions, plus d ancien texte de production)')
  assert.deepEqual(
    (b.emplacements ?? []).map((e) => `${e.places} ${e.metier}`),
    ['3 Pêcheur', '2 Commerçant'],
    'emplacements de la vague 3a récupérés (caps conformes)')
  assert.equal((b.effets ?? []).length, 0,
    'les anciens effets de production directe (Or, Nourriture) disparaissent')
  assert.ok(C.config.constructions.some((x) => x.nom === 'Baleinier (tier 2)'),
    'les tiers 2/3 sont ajoutés par la complétion')
  assert.ok(C.config.constructions.some((x) => x.nom === 'Mon aménagement perso'),
    'un aménagement perso (hors référentiel) est conservé')
  assert.equal(C.config.schemaVersion, 4, 'tampon v4 apposé')
  // idempotence : la config convergée ne repasse PAS par les migrations
  const C2 = cfgOf(C.config)
  assert.ok(C2.config.constructions.some((x) => x.nom === 'Mon aménagement perso'),
    're-lecture : le perso survit (pas de re-migration)')
  assert.equal(
    C2.config.constructions.find((x) => x.nom === 'Baleinier')!.description,
    '', 're-lecture : description toujours vide')
})

// ── Retrait des descriptions d'aménagements (retour Thibaut
//    2026-10-22 « retire carrément les descriptions ») ─────────────────────

test('config : descriptions des aménagements vidées une bonne fois pour toutes, même sur une config déjà convergée v4', () => {
  // Config déjà tamponnée v4 (aucune migration de complétion ne
  //  rejouera) : la migration ciblée doit pourtant vider les
  //  descriptions d'aménagements et poser son marqueur.
  const c = cloneDefaultConfig()
  c.schemaVersion = 4
  const iB = c.constructions.findIndex((x) => x.nom === 'Baleinier')
  const iT2 = c.constructions.findIndex((x) => x.nom === 'Baleinier (tier 2)')
  assert.ok(iB >= 0 && iT2 >= 0, 'Baleinier et tier 2 dans les défauts')
  c.constructions[iB].description = 'texte hérité obsolète'
  c.constructions[iT2].description = 'Amélioration (remplace le Baleinier de tier 1) : 5 emplacements…'
  const iM = c.constructions.findIndex((x) => x.nom === 'Moulin à vent')
  assert.ok(iM >= 0 && c.constructions[iM].categorie !== 'Aménagement',
    'un bâtiment de contrôle existe (Moulin à vent)')
  c.constructions[iM].description = 'Bâtiment : description conservée.'
  delete (c as { descriptionsAmenagementsVides?: boolean }).descriptionsAmenagementsVides
  const C = cfgOf(c)
  assert.equal(C.config.constructions.find((x) => x.nom === 'Baleinier')!.description, '',
    'tier 1 : description vidée sur config déjà v4')
  assert.equal(C.config.constructions.find((x) => x.nom === 'Baleinier (tier 2)')!.description, '',
    'tier 2 : description vidée sur config déjà v4')
  assert.equal(C.config.constructions.find((x) => x.nom === 'Moulin à vent')!.description,
    'Bâtiment : description conservée.',
    'les descriptions de BÂTIMENTS ne sont pas touchées')
  assert.ok(C.config.descriptionsAmenagementsVides,
    'marqueur posé (one-shot : une description perso saisie ensuite est préservée)')
  // one-shot : une description personnalisée saisie APRÈS survit aux re-lectures
  const c2 = C.config
  const iB2 = c2.constructions.findIndex((x) => x.nom === 'Baleinier')
  c2.constructions[iB2].description = 'note perso'
  assert.equal(cfgOf(c2).config.constructions.find((x) => x.nom === 'Baleinier')!.description,
    'note perso', 're-lecture : la description perso posée après la migration survit')
})
