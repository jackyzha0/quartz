// ══════════════════════════════════════════════════════════════════════
//  Référentiels : consultation des tables et fiches RÉELLES du classeur
//  (feuilles init, JSON, Titres, traits_genetiques, Culture, Peuples,
//  Ville, Bat, Progrès, Tourisme, Cités L, Pays, Victoires, Accueil…).
//  L'onglet « Cultures & régimes » est ÉDITABLE directement ici :
//  cultures et régimes politiques sont paramétrables et leurs lois
//  chiffrées sont appliquées automatiquement par le moteur.
//  Pour MODIFIER les autres valeurs : onglet « 🎛 Paramètres ».
// ══════════════════════════════════════════════════════════════════════

import React, { useEffect, useState } from 'react'
import { useGame } from '../state/store'
import { cfgOf } from '../engine/gameData'
import { DEFAULT_CONFIG } from '../config/defaultConfig'
import type { EffetProgres, GameConfig, ProgresTechDef } from '../config/defaultConfig'
import { VICTORY_TEXT } from '../engine/gameData2'
import { Card, Badge, TextInput, NumberInput, Button, Select } from './ui'

const ONGLETS = [
  'Titres', 'Traits gén.', 'Peuples', 'Bâtiments', 'Aménagements', 'Progrès',
  'Pays & rangs', 'Habitations', 'Cultures & régimes', 'Tourisme & dogmes', 'Cités libres',
  'Victoires', 'Crises', 'Rappels règles', 'Offrandes', 'Ministères',
  'Aide-mémoire',
] as const

const GROUPES_BAT: { value: string; label: string }[] = [
  { value: 'Ville', label: 'Ville' },
  { value: 'Château', label: 'Château' },
  { value: 'Capitale', label: 'Capitale' },
]

export function ReferenceDataPanel() {
  const { state, globalConfig, setGlobalCfg } = useGame()
  const [onglet, setOnglet] = useState<(typeof ONGLETS)[number]>('Titres')
  // Sans partie en cours, on affiche les valeurs par défaut du classeur.
  const C = cfgOf(state?.config)
  const cfg = C.config

  // Configuration commune (même logique que l'onglet « Paramètres ») :
  // sert à l'édition directe des cultures & régimes ci-dessous.
  const configEdit: GameConfig = cfgOf(globalConfig).config
  const setCfg = (fn: (c: GameConfig) => void) => setGlobalCfg(fn)

  // Auto-migration des rangs de pays : une partie sauvegardée avant la
  // refonte (ancienne table à blocs Féodal/Républicain) repasse sur la
  // nouvelle échelle (coutOr/coutNourriture/serments/ministres) dès
  // l'ouverture de l'onglet, pour que l'éditeur écrive au bon format.
  useEffect(() => {
    if (onglet !== 'Pays & rangs') return
    const raw = globalConfig?.paysRangs
    if (
      !Array.isArray(raw) || raw.length === 0
      || typeof (raw[0] as { coutOr?: unknown })?.coutOr !== 'number'
    ) {
      setCfg((c) => {
        c.paysRangs = DEFAULT_CONFIG.paysRangs.map((r) => ({ ...r }))
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onglet])

  return (
    <div className="stack">
      <Card title="Référentiels du jeu (données du classeur d'origine)">
        <p className="muted small">
          Ces tables proviennent du classeur « Chasse & Pêche Légendes 7.19 ». Elles sont stockées dans
          la configuration de la partie : l'onglet « Cultures & régimes » est éditable directement ici,
          et pour modifier toute autre valeur (ou en ajouter), ouvrez l'onglet « 🎛 Paramètres » —
          tout est éditable, sans contrainte.
        </p>
        <div className="tabs">
          {ONGLETS.map((o) => (
            <button key={o} className={`tab ${onglet === o ? 'tab-active' : ''}`} onClick={() => setOnglet(o)}>{o}</button>
          ))}
        </div>
      </Card>

      {onglet === 'Titres' && (
        <>
          <Card title={`Titres (${cfg.titres.length})`}>
            <div className="table-wrap">
              <table className="tbl small">
                <thead>
                  <tr><th>Titre</th><th>Éducation</th><th>Gain 1 / tour</th><th>Gain 2 / tour</th><th>Noble seul</th><th>Genre</th><th>Attribution</th><th>Description</th></tr>
                </thead>
                <tbody>
                  {cfg.titres.map((t) => (
                    <tr key={t.titre}>
                      <td><strong>{t.titre}</strong></td>
                      <td>{t.education || '—'}</td>
                      <td>{t.valeur1 ? `${t.valeur1} ${t.ressource1}` : '—'}</td>
                      <td>{t.valeur2 ? `${t.valeur2} ${t.ressource2}` : '—'}</td>
                      <td>{t.nobleSeul ? <Badge tone="info">oui</Badge> : 'non'}</td>
                      <td>{t.regleGenre || '—'}</td>
                      <td>{t.attribution || '—'}</td>
                      <td className="muted">{t.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
          <Card title="Effets de titre & coûts de révocation">
            {cfg.titresEffets.map((t, i) => (
              <div key={i} className="mini">
                <strong>{t.titre || '—'}</strong>
                <div className="small">{t.effet}</div>
                <div className="small muted">Révocation : {t.revocation || '—'}</div>
              </div>
            ))}
          </Card>
        </>
      )}

      {onglet === 'Traits gén.' && (
        <Card title={`Traits génétiques (${cfg.traitsGenetiques.length})`}>
          <div className="table-wrap">
            <table className="tbl small">
              <thead>
                <tr><th>#</th><th>Trait</th><th>Poids</th><th>Héritable</th><th>Mariage ±</th><th>Fécondité ±</th><th>Vie ±</th><th>Résurrection</th><th>Description</th></tr>
              </thead>
              <tbody>
                {cfg.traitsGenetiques.map((t) => (
                  <tr key={t.id}>
                    <td>{t.id}</td>
                    <td><strong>{t.name}</strong></td>
                    <td>{t.weight}</td>
                    <td>{t.heritable ? 'oui' : 'non'}</td>
                    <td>{t.marriageMod}</td>
                    <td>{t.fertAdd}</td>
                    <td>{t.lifeDelta}</td>
                    <td>{t.resurrectionMinRoll || '—'}</td>
                    <td className="muted">{t.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {onglet === 'Peuples' && (
        <>
          {([
            ['Peuples libres (jouables)', cfg.peuplesLibres],
            ['Autres peuples (PNJ du monde)', cfg.peuplesAutres],
          ] as const).map(([titre, liste]) => (
            <Card key={titre} title={titre}>
              <p className="muted small">
                Chaque faction : victoire (désactivée), bâtiment / aménagement de faction, 2 règles
                de base, puis 3 règles d'Âge II et 3 règles d'Âge III — le joueur en choisit une
                seule par âge à la montée d'âge (page Royaume de son pays).
              </p>
              {liste.map((p) => (
                <div key={p.nom} className="fiche-peuple">
                  <div className="fiche-peuple-title">{p.nom}</div>
                  <div className="small muted">{p.description}</div>
                  {(p.victoire || p.batiment || p.reglesBase || p.ageII || p.ageIII) ? (
                    <>
                      <div className="frule-row">
                        {p.victoire ? (
                          <div className="frule frule-muted">
                            <div className="frule-title">Victoire de faction <span className="badge badge-neutral">désactivée</span></div>
                            <div className="frule-text">{p.victoire}</div>
                          </div>
                        ) : null}
                        {p.batiment ? (
                          <div className="frule frule-muted">
                            <div className="frule-title">Bâtiment / aménagement de faction</div>
                            <div className="frule-text">{p.batiment}</div>
                          </div>
                        ) : null}
                        {(p.reglesBase ?? []).map((r) => (
                          <div key={r.nom} className="frule frule-muted">
                            <div className="frule-title">{r.nom}</div>
                            <div className="frule-text">{r.texte}</div>
                          </div>
                        ))}
                      </div>
                      <div className="frule-age"><strong>Âge II</strong> <span className="muted small">— choisir 1 règle parmi 3 à la montée d'âge</span></div>
                      <div className="frule-row">
                        {(p.ageII ?? []).map((r) => (
                          <div key={r.nom} className="frule frule-age2">
                            <div className="frule-title">{r.nom}</div>
                            <div className="frule-text">{r.texte}</div>
                          </div>
                        ))}
                      </div>
                      <div className="frule-age"><strong>Âge III</strong> <span className="muted small">— choisir 1 règle parmi 3 à la montée d'âge</span></div>
                      <div className="frule-row">
                        {(p.ageIII ?? []).map((r) => (
                          <div key={r.nom} className="frule frule-age3">
                            <div className="frule-title">{r.nom}</div>
                            <div className="frule-text">{r.texte}</div>
                          </div>
                        ))}
                      </div>
                    </>
                  ) : (
                    p.lignes?.map((l, i) => (
                      <div key={i} className="small"><strong>{l.label} :</strong> {l.texte}</div>
                    ))
                  )}
                </div>
              ))}
            </Card>
          ))}
        </>
      )}

      {onglet === 'Bâtiments' && (
        <>
          <Card title={`Constructions — bâtiments (${(cfg.constructions ?? []).filter((c) => c.categorie === 'Bâtiment').length}) — table PARAMÉTRABLE`}>
            <p className="muted small">
              Chaque bâtiment est modifiable et pris en compte automatiquement par le moteur (coût,
              production, effets) : le <strong>groupe</strong> détermine où il est constructible
              (Ville / Château / Capitale), et la <strong>faction</strong> le réserve au joueur du
              peuple correspondant (un bâtiment de faction par ville, remplaçable par le suivant ;
              «&nbsp;(aucune)&nbsp;» = bâtiment commun). Une fois la faction choisie, le bâtiment
              apparaît dans le groupe « Bâtiments de faction » du sélecteur des villes du joueur
              de ce peuple.
            </p>
            <div className="table-wrap">
              <table className="tbl small">
                <thead><tr><th>Groupe</th><th>Bâtiment</th><th>Faction</th><th>Coût</th><th>Production</th><th>Description</th></tr></thead>
                <tbody>
                  {(configEdit.constructions ?? []).map((c, i) => ({ c, i })).filter(({ c }) => c.categorie === 'Bâtiment').map(({ c, i }) => (
                    <tr key={i}>
                      <td>
                        <Select
                          value={c.groupe}
                          options={GROUPES_BAT}
                          onChange={(v) => setCfg((cf) => { cf.constructions[i].groupe = v })}
                        />
                      </td>
                      <td><TextInput value={c.nom} onChange={(v) => setCfg((cf) => { cf.constructions[i].nom = v })} /></td>
                      <td>
                        <Select
                          value={c.faction ?? ''}
                          options={[
                            { value: '', label: '(aucune)' },
                            ...[...cfg.peuplesLibres, ...cfg.peuplesAutres].map((f) => f.nom).map((n) => ({ value: n, label: n })),
                          ]}
                          onChange={(v) => setCfg((cf) => {
                            if (v) cf.constructions[i].faction = v
                            else delete cf.constructions[i].faction
                          })}
                        />
                      </td>
                      <td><TextInput value={c.cout} onChange={(v) => setCfg((cf) => { cf.constructions[i].cout = v })} /></td>
                      <td><TextInput value={c.production} onChange={(v) => setCfg((cf) => { cf.constructions[i].production = v })} /></td>
                      <td><TextInput value={c.description} onChange={(v) => setCfg((cf) => { cf.constructions[i].description = v })} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Button onClick={() => setCfg((c) => {
              c.constructions.push({ categorie: 'Bâtiment', groupe: 'Ville', famille: '', nom: 'Nouveau bâtiment', cout: '', production: '', description: '' })
            })}>+ Ajouter un bâtiment</Button>
          </Card>
          <Card title={`Bâtiments de ville (${cfg.batimentsVille.length})`}>
            <div className="grid-2">
              {cfg.batimentsVille.map((b, i) => (
                <div key={i} className="mini">
                  <strong>{b.nom}</strong>
                  <div className="small muted">{b.cout} {b.effet}</div>
                </div>
              ))}
            </div>
          </Card>
          <Card title={`Bâtiments de château (${cfg.batimentsChateau.length})`}>
            <div className="grid-2">
              {cfg.batimentsChateau.map((b, i) => (
                <div key={i} className="mini">
                  <strong>{b.nom}</strong>
                  <div className="small muted">{b.cout} {b.effet}</div>
                </div>
              ))}
            </div>
          </Card>
          <Card title="Bâtiments à effet moteur (santé, écoles)">
            <div className="table-wrap">
              <table className="tbl small">
                <thead><tr><th>Bâtiment</th><th>Maladie (contraction)</th><th>Guérison</th><th>Guérison globale</th><th>Rang école</th></tr></thead>
                <tbody>
                  {C.batiments.filter((b) => b.malContraction || b.bonusGuerison || b.bonusGuerisonGlobal || b.ecoleRang).map((b) => (
                    <tr key={b.nom}>
                      <td><strong>{b.nom}</strong></td>
                      <td>{b.malContraction || '—'}</td>
                      <td>{b.bonusGuerison || '—'}</td>
                      <td>{b.bonusGuerisonGlobal || '—'}</td>
                      <td>{b.ecoleRang || '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </>
      )}

      {onglet === 'Aménagements' && (
        <>
          <Card title={`Aménagements (coût / production / description exacts du classeur) (${(cfg.constructions ?? []).filter((c) => c.categorie === 'Aménagement').length})`}>
            <div className="table-wrap">
              <table className="tbl small">
                <thead><tr><th>Aménagement</th><th>Terrain</th><th>Coût</th><th>Production</th><th>Description</th></tr></thead>
                <tbody>
                  {(cfg.constructions ?? []).filter((c) => c.categorie === 'Aménagement').map((c, i) => (
                    <tr key={i}>
                      <td><strong>{c.nom}</strong></td>
                      <td>{c.terrain || '—'}</td>
                      <td>{c.cout || '—'}</td>
                      <td>{c.production || '—'}</td>
                      <td className="small">{c.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="muted small">
              Coût réduit à 3 Or + 2 Bois si un « Camp de bâtisseurs » est présent dans la ville.
            </p>
          </Card>
        </>
      )}

      {onglet === 'Progrès' && (
        <Card title={`Arbres de progrès (${configEdit.progres.length}) — entièrement paramétrables`}>
          <p className="muted small">
            Un arbre = branche A (2 technologies) + branche B (2 technologies) + technologie C.
            Règles du classeur : la tech 2 exige sa tech 1 ; la tech C exige les 2 techs d'une
            même branche ; un arbre se termine à EXACTEMENT 3 technologies (la tech C est
            optionnelle) ; 3 arbres complétés de l'âge N-1 ouvrent l'âge N. Les effets de la
            colonne « Effets auto » sont appliqués AUTOMATIQUEMENT par le moteur (gain au
            déblocage, production par tour — canal « Progrès » du récap ressources, garnison) ;
            les autres effets restent au plateau. Les emplacements vides sont ignorés en jeu.
          </p>
          {[1, 2, 3].map((age) => (
            <div key={age} className="mb">
              <h4>Âge {age}</h4>
              {configEdit.progres.every((a) => a.age !== age) && (
                <p className="muted small">Aucun arbre à cet âge.</p>
              )}
              {configEdit.progres.map((arbre, i) => arbre.age !== age ? null : (
                <div key={i} className="mini mb">
                  <div className="row">
                    <TextInput value={arbre.nom} onChange={(v) => setCfg((c) => { c.progres[i].nom = v })} />
                    <NumberInput value={arbre.age} step={1} min={1} max={3} onChange={(v) => setCfg((c) => { c.progres[i].age = v })} />
                    <TextInput value={arbre.tags ?? ''} placeholder="Tags (ex. C, PV, Aurore N)" onChange={(v) => setCfg((c) => { c.progres[i].tags = v })} />
                    <Button tone="danger" onClick={() => setCfg((c) => { c.progres.splice(i, 1) })}>Supprimer l'arbre</Button>
                  </div>
                  <div className="table-wrap">
                    <table className="tbl small">
                      <thead><tr><th>Emplacement</th><th>Technologie</th><th>Coût (Science)</th><th>Description (effet)</th><th>Effets auto (appliqués par le moteur)</th></tr></thead>
                      <tbody>
                        {([['A.1', 'brancheA', 0], ['A.2', 'brancheA', 1], ['B.1', 'brancheB', 0], ['B.2', 'brancheB', 1]] as [string, 'brancheA' | 'brancheB', number][]).map(([label, br, idx]) => (
                          <tr key={label}>
                            <td>{label}</td>
                            <td><TextInput value={arbre[br][idx]?.nom ?? ''} onChange={(v) => setCfg((c) => { c.progres[i][br][idx].nom = v })} /></td>
                            <td><TextInput value={arbre[br][idx]?.cout ?? ''} onChange={(v) => setCfg((c) => { c.progres[i][br][idx].cout = v })} /></td>
                            <td><TextInput value={arbre[br][idx]?.description ?? ''} onChange={(v) => setCfg((c) => { c.progres[i][br][idx].description = v })} /></td>
                            <td>
                              <EffetsTechEditor
                                tech={arbre[br][idx]}
                                ressources={configEdit.ressources}
                                titres={configEdit.titres.map((t) => t.titre)}
                                set={(fn) => setCfg((c) => {
                                  const t = c.progres[i][br][idx]
                                  if (!t) return
                                  if (!t.effets) t.effets = []
                                  fn(t.effets)
                                })}
                              />
                            </td>
                          </tr>
                        ))}
                        <tr>
                          <td>C (optionnelle)</td>
                          <td><TextInput value={arbre.techC?.nom ?? ''} onChange={(v) => setCfg((c) => { c.progres[i].techC.nom = v })} /></td>
                          <td><TextInput value={arbre.techC?.cout ?? ''} onChange={(v) => setCfg((c) => { c.progres[i].techC.cout = v })} /></td>
                          <td><TextInput value={arbre.techC?.description ?? ''} onChange={(v) => setCfg((c) => { c.progres[i].techC.description = v })} /></td>
                          <td>
                            <EffetsTechEditor
                              tech={arbre.techC}
                              ressources={configEdit.ressources}
                              titres={configEdit.titres.map((t) => t.titre)}
                              set={(fn) => setCfg((c) => {
                                const t = c.progres[i].techC
                                if (!t) return
                                if (!t.effets) t.effets = []
                                fn(t.effets)
                              })}
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          ))}
          <Button onClick={() => setCfg((c) => {
            c.progres.push({
              nom: 'Nouvel arbre de progrès', age: 1, tags: '',
              brancheA: [{ nom: '', cout: '', description: '' }, { nom: '', cout: '', description: '' }],
              brancheB: [{ nom: '', cout: '', description: '' }, { nom: '', cout: '', description: '' }],
              techC: { nom: '', cout: '', description: '' },
            })
          })}>+ Ajouter un arbre de progrès</Button>
        </Card>
      )}

      {onglet === 'Pays & rangs' && (
        <Card title="Rangs de pays — échelle féodale unique (paramétrable)">
          <p className="muted small">
            Montée par <strong>sacre</strong> : payer le coût Or + Nourriture et posséder le nombre de
            <strong> serments</strong> indiqué (un serment = un vassal ou une cité libre sous suzeraineté — page
            « Royaume », bouton « ⬆ Sacre »). Chaque rang fixe la taille du conseil : le nombre de <strong>Ministres</strong>
            {' '}autorisés (avertissement à l'attribution du titre dans Population). Le bonus de fin de saison reste
            à gérer au plateau. L'ordre des lignes = l'ordre de l'échelle ; à la succession, le sacre d'avènement
            coûte la moitié du prix du rang (automatique), et sans héritier une crise aléatoire se déclenche.
          </p>
          <div className="table-wrap">
            <table className="tbl small">
              <thead><tr><th>Rang</th><th>Sacre (Or)</th><th>Sacre (Nourriture)</th><th>Serments requis</th><th>Ministres</th><th>Bonus (plateau)</th><th></th></tr></thead>
              <tbody>
                {configEdit.paysRangs.map((r, i) => (
                  <tr key={i}>
                    <td><TextInput value={r.nom} onChange={(v) => setCfg((c) => { c.paysRangs[i].nom = v })} /></td>
                    <td><NumberInput value={r.coutOr} min={0} onChange={(v) => setCfg((c) => { c.paysRangs[i].coutOr = v })} /></td>
                    <td><NumberInput value={r.coutNourriture} min={0} onChange={(v) => setCfg((c) => { c.paysRangs[i].coutNourriture = v })} /></td>
                    <td><NumberInput value={r.serments} min={0} onChange={(v) => setCfg((c) => { c.paysRangs[i].serments = v })} /></td>
                    <td><NumberInput value={r.ministres} min={0} onChange={(v) => setCfg((c) => { c.paysRangs[i].ministres = v })} /></td>
                    <td><TextInput value={r.bonus} onChange={(v) => setCfg((c) => { c.paysRangs[i].bonus = v })} /></td>
                    <td>
                      <Button tone="danger" onClick={() => setCfg((c) => { c.paysRangs.splice(i, 1) })}>✕</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Button onClick={() => setCfg((c) => {
            c.paysRangs.push({ nom: 'Nouveau rang', coutOr: 0, coutNourriture: 0, serments: 0, ministres: 1, bonus: '' })
          })}>+ Ajouter un rang</Button>
          <p className="muted small">Rangs d'habitation : {cfg.rangsHabitation.map((r) => `${r.rang} (${r.cout})`).join(' · ')}</p>
        </Card>
      )}

      {onglet === 'Habitations' && (
        <Card title={`Types & rangs d'habitation (${configEdit.typesHabitation.length}) — consommation, garnison de base`}>
          <p className="muted small">
            Les villes sont de deux types, chacun avec son échelle de rangs :
            Ville (Hameau → Cité → Grande Cité) et Château (Motte → Donjon → Forteresse).
            Chaque rang consomme des ressources À CHAQUE TOUR (débitées automatiquement
            du stock — colonne « Consommation / tour ») et apporte une GARNISON DE BASE
            (valeur fixe, s'ajoutant aux garnisons des bâtiments). La consommation
            s'écrit en quantités positives, ex. « 10 Nourriture, 8 Or ». Tout est
            appliqué automatiquement par le moteur et modifiable à chaud.
          </p>
          <div className="table-wrap">
            <table className="tbl small">
              <thead>
                <tr>
                  <th>Type</th><th>Rang</th><th>Coût d'amélioration</th>
                  <th>Habitants requis</th><th>Consommation / tour</th><th>Garnison de base</th>
                </tr>
              </thead>
              <tbody>
                {configEdit.typesHabitation.map((h, i) => (
                  <tr key={i}>
                    <td>
                      <Select
                        value={h.type}
                        options={[{ value: 'Ville', label: 'Ville' }, { value: 'Château', label: 'Château' }]}
                        onChange={(v) => setCfg((c) => { c.typesHabitation[i].type = v })}
                      />
                    </td>
                    <td><TextInput value={h.rang} onChange={(v) => setCfg((c) => { c.typesHabitation[i].rang = v })} /></td>
                    <td><TextInput value={h.cout} onChange={(v) => setCfg((c) => { c.typesHabitation[i].cout = v })} /></td>
                    <td><NumberInput value={h.habitantsRequis} step={10} min={0} onChange={(v) => setCfg((c) => { c.typesHabitation[i].habitantsRequis = v })} /></td>
                    <td><TextInput value={h.consommation} onChange={(v) => setCfg((c) => { c.typesHabitation[i].consommation = v })} /></td>
                    <td><NumberInput value={h.garnison} step={1} min={0} onChange={(v) => setCfg((c) => { c.typesHabitation[i].garnison = v })} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Button onClick={() => setCfg((c) => {
            c.typesHabitation.push({ type: 'Ville', rang: 'Nouveau rang', cout: '', habitantsRequis: 0, consommation: '', garnison: 0 })
          })}>+ Ajouter un rang d'habitation</Button>
        </Card>
      )}

      {onglet === 'Cultures & régimes' && (
        <>
          <Card title={`Cultures (${configEdit.cultures.length}) — paramétrables, effets appliqués automatiquement`}>
            <p className="muted small">
              Chaque champ est modifiable et pris en compte par le moteur : hérédité, martialité,
              facteur de fécondité (naissances), mariages homosexuels (titres), règles de pays et
              de personnage (affichées sur la page « Royaume »), et les lois chiffrées appliquées
              AUTOMATIQUEMENT à chaque fin de tour — la capitale du pays génère +N d'une ressource
              par habitation de cette culture dans le monde (Nourriture / Tourisme / Or), et chaque
              construction de bâtiment rapporte +N Science (ex. Déisme). Mettre 0 pour désactiver
              une loi chiffrée.
            </p>
            <div className="table-wrap">
              <table className="tbl small">
                <thead>
                  <tr>
                    <th>Culture</th><th>Hérédité</th><th>Martialité</th><th>Homo autorisée</th>
                    <th>Fécondité</th><th>Nourr / habitation (monde)</th>
                    <th>Tourisme / habitation</th><th>Or / habitation</th>
                    <th>Science / construction</th><th>Règle du pays</th><th>Règle des personnages</th>
                  </tr>
                </thead>
                <tbody>
                  {configEdit.cultures.map((t, i) => (
                    <tr key={i}>
                      <td><TextInput value={t.nom} onChange={(v) => setCfg((c) => { c.cultures[i].nom = v })} /></td>
                      <td><TextInput value={t.heredite} onChange={(v) => setCfg((c) => { c.cultures[i].heredite = v })} /></td>
                      <td><TextInput value={t.martialite} onChange={(v) => setCfg((c) => { c.cultures[i].martialite = v })} /></td>
                      <td><input type="checkbox" checked={t.homoAutorisee} onChange={(e) => setCfg((c) => { c.cultures[i].homoAutorisee = e.target.checked })} /></td>
                      <td><NumberInput value={t.fertFactor} step={0.05} onChange={(v) => setCfg((c) => { c.cultures[i].fertFactor = v })} /></td>
                      <td><NumberInput value={t.capitalNourrParHabMonde ?? 0} step={1} onChange={(v) => setCfg((c) => { c.cultures[i].capitalNourrParHabMonde = v })} /></td>
                      <td><NumberInput value={t.capitalTourismeParHabMonde ?? 0} step={1} onChange={(v) => setCfg((c) => { c.cultures[i].capitalTourismeParHabMonde = v })} /></td>
                      <td><NumberInput value={t.capitalOrParHabMonde ?? 0} step={1} onChange={(v) => setCfg((c) => { c.cultures[i].capitalOrParHabMonde = v })} /></td>
                      <td><NumberInput value={t.scienceParConstruction ?? 0} step={1} onChange={(v) => setCfg((c) => { c.cultures[i].scienceParConstruction = v })} /></td>
                      <td><TextInput value={t.reglePays} onChange={(v) => setCfg((c) => { c.cultures[i].reglePays = v })} /></td>
                      <td><TextInput value={t.reglePerso} onChange={(v) => setCfg((c) => { c.cultures[i].reglePerso = v })} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Button onClick={() => setCfg((c) => {
              c.cultures.push({
                nom: 'Nouvelle culture', heredite: 'Agnatique', martialite: 'Faible',
                homoAutorisee: false, fertFactor: 1, reglePays: '', reglePerso: '',
              })
            })}>+ Ajouter une culture</Button>
          </Card>
          <Card title={`Régimes politiques (${configEdit.regimes.length}) — lois appliquées automatiquement`}>
            <p className="muted small">
              Chaque régime : nom, loi (texte affiché sur la page « Royaume ») et lois chiffrées
              appliquées AUTOMATIQUEMENT à chaque fin de tour — garnison des habitations +N par
              rang d'habitation (ex. Autoritarisme : 15), +N Nourriture par tour d'été pour chaque
              champ et rizière du pays (ex. Socialisme : 5). Mettre 0 pour désactiver une loi.
            </p>
            <div className="table-wrap">
              <table className="tbl small">
                <thead>
                  <tr>
                    <th>Régime</th><th>Loi</th>
                    <th>Garnison / rang d'habitation</th>
                    <th>Nourriture été / champ & rizière</th>
                  </tr>
                </thead>
                <tbody>
                  {configEdit.regimes.map((r, i) => (
                    <tr key={i}>
                      <td><TextInput value={r.nom} onChange={(v) => setCfg((c) => { c.regimes[i].nom = v })} /></td>
                      <td><TextInput value={r.loi} onChange={(v) => setCfg((c) => { c.regimes[i].loi = v })} /></td>
                      <td><NumberInput value={r.garnisonParRang ?? 0} step={1} onChange={(v) => setCfg((c) => { c.regimes[i].garnisonParRang = v })} /></td>
                      <td><NumberInput value={r.nourrEteChampRiziere ?? 0} step={1} onChange={(v) => setCfg((c) => { c.regimes[i].nourrEteChampRiziere = v })} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Button onClick={() => setCfg((c) => {
              c.regimes.push({ nom: 'Nouveau régime', loi: '' })
            })}>+ Ajouter un régime</Button>
          </Card>
        </>
      )}

      {onglet === 'Tourisme & dogmes' && (
        <>
          <Card title="Seuils de tourisme">
            <div className="table-wrap">
              <table className="tbl small">
                <thead><tr><th>Seuil</th><th>Bonus</th></tr></thead>
                <tbody>
                  {cfg.tourismeSeuils.map((t, i) => (
                    <tr key={i}><td>{t.seuil}</td><td>{t.bonus}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
          <Card title="Dogmes">
            {cfg.dogmes.map((d, i) => (
              <div key={i} className="mini">
                <strong>{d.dogme}</strong>
                <div className="small">Pontife : {d.bonusPontife}</div>
                <div className="small">Fidèles : {d.bonusFideles}</div>
              </div>
            ))}
          </Card>
        </>
      )}

      {onglet === 'Cités libres' && (
        <Card title="Cités libres">
          <p className="small muted">{cfg.regleCitesLibres}</p>
          <div className="grid-2">
            {cfg.citesLibres.map((c, i) => (
              <div key={i} className="mini">
                <strong>{c.type}</strong>
                <div className="small">{c.effet}</div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {onglet === 'Victoires' && (
        <Card title="Voies de victoire — Lauriers I à IV (chapitre XII, refonte 2026-10-14)">
          <p className="muted small">
            Chaque voie se parcourt par 4 <strong>Lauriers</strong> validés en <strong>ordre strict</strong> (un Laurier
            ne se valide que si le précédent est acquis — cochage manuel au radar de l'accueil, la table reste juge).
            Chaque Laurier I-III validé déclenche une <strong>crise</strong> à tirer ; les bonus one-shot ne
            s'appliquent que si le Laurier est complété <strong>pendant l'âge de même numéro</strong> (I pendant l'Âge I,
            II pendant l'Âge II) ; le Laurier III ne donne aucune récompense ; le <strong>Laurier IV = Victoire</strong>.
          </p>
          {cfg.victoires.map((v, i) => (
            <div key={i} className="mb">
              <h4>{v.voie}</h4>
              <ul className="small">
                {v.lauriers.map((l, j) => (
                  <li key={j}><strong>{l.laurier}</strong> — {l.condition}{l.bonus ? <span className="muted"> ({l.bonus})</span> : null}</li>
                ))}
              </ul>
            </div>
          ))}
          <p className="muted small">Victoire (Laurier IV) : {VICTORY_TEXT.map((v) => v.texte).join(' · ')}.</p>
        </Card>
      )}

      {onglet === 'Crises' && (
        <Card title="Crises">
          <ul className="small">
            {cfg.crises.map((c, i) => <li key={i}>{c}</li>)}
          </ul>
        </Card>
      )}

      {onglet === 'Rappels règles' && (
        <Card title="Rappels de règles (feuille Accueil)">
          <ul className="small">
            {cfg.rappelsRegles.map((c, i) => <li key={i}>{c}</li>)}
          </ul>
        </Card>
      )}

      {onglet === 'Offrandes' && (
        <Card title={`Offrandes (${cfg.offrandes.length})`}>
          {cfg.offrandes.map((o, i) => (
            <div key={i} className="mini">
              <div className="row"><strong>{o.nom}</strong> <Badge>poids {o.poids}</Badge></div>
              <div className="small muted">{o.description}</div>
            </div>
          ))}
        </Card>
      )}

      {onglet === 'Ministères' && (
        <Card title="Ministères — portefeuilles paramétrables (refonte 2026-10-14)">
          <p className="muted small">
            Chaque rang de pays octroie <strong>1 Ministre</strong> (cap averti à l'attribution du titre
            dans Population — montez de rang par sacre pour agrandir le conseil). La nomination est
            réservée aux <strong>nobles et dynasties</strong> (avertissement si roturier). Un ministre
            porte un <strong>portefeuille</strong> ci-dessous, choisi dans Population (titre « Ministre ») ;
            les portefeuilles sont <strong>cumulables</strong> (deux fois le même = effet doublé) et certains
            exigent un <strong>rang de pays minimum</strong>. Mode <strong>Auto</strong> : appliqué
            automatiquement par l'application (Trésorier +5 Or/tour, Grand Précepteur +1 Science/tour,
            Sénéchal +15 Nourriture fin d'été, Maître de cour +2 Tourisme/fin de saison, Connétable
            +5 Garnison à la nomination, Grand Chambellan +10 % taxes, Chancelier de justice −25 % sacres,
            Archichancelier : sacre d'avènement réduit de moitié). Mode <strong>Plateau</strong> : à appliquer
            à la table (les 7 ministères du classeur scalent sur le rang de pays). L'ordre des rangs minimums
            suit l'échelle de la table « Pays & rangs ».
          </p>
          <table className="tbl small">
            <thead><tr><th>Ministère</th><th>Rang minimum</th><th>Mode</th><th>Effet</th><th></th></tr></thead>
            <tbody>
              {configEdit.ministeres.map((m, i) => (
                <tr key={i}>
                  <td><TextInput value={m.ministere} onChange={(v) => setCfg((c) => { c.ministeres[i].ministere = v })} /></td>
                  <td>
                    <Select
                      value={m.rangMinimum ?? (configEdit.paysRangs ?? [])[0]?.nom ?? ''}
                      options={(configEdit.paysRangs ?? []).map((r) => ({ value: r.nom, label: r.nom }))}
                      onChange={(v) => setCfg((c) => { c.ministeres[i].rangMinimum = v })}
                    />
                  </td>
                  <td>
                    <Select
                      value={m.mode ?? 'Plateau'}
                      options={[
                        { value: 'Auto', label: 'Auto (application)' },
                        { value: 'Plateau', label: 'Plateau' },
                      ]}
                      onChange={(v) => setCfg((c) => { c.ministeres[i].mode = v })}
                    />
                  </td>
                  <td><TextInput value={m.effet} onChange={(v) => setCfg((c) => { c.ministeres[i].effet = v })} /></td>
                  <td><Button tone="danger" onClick={() => setCfg((c) => { c.ministeres.splice(i, 1) })}>✕</Button></td>
                </tr>
              ))}
            </tbody>
          </table>
          <Button onClick={() => setCfg((c) => {
            c.ministeres.push({
              ministere: 'Nouveau ministère',
              effet: '',
              rangMinimum: (c.paysRangs ?? [])[0]?.nom ?? '',
              mode: 'Plateau',
            })
          })}>+ Ajouter un ministère</Button>
        </Card>
      )}

      {onglet === 'Aide-mémoire' && (
        <Card title="Aide-mémoire">
          <div className="grid-2 small">
            <div><strong>Ressources ({C.ressources.length}) :</strong> {C.ressources.join(', ')}</div>
            <div><strong>Éducations :</strong> {C.educations.join(', ')}</div>
            <div><strong>Orientations (pondérées) :</strong> {C.orientations.map((o) => `${o.nom} ×${o.poids}`).join(' · ')}</div>
            <div><strong>Genres :</strong> {C.genres.map((o) => `${o.nom} ×${o.poids}`).join(' · ')}</div>
            <div><strong>Régimes :</strong> {C.regimes.map((r) => r.nom).join(', ')}</div>
            <div><strong>Cultures :</strong> {C.cultures.map((c) => c.nom).join(', ')}</div>
            <div><strong>Banques de noms :</strong> {cfg.banquesNoms.map((b) => `${b.nom} (${b.noms.length} noms, ${b.prenomsM.length}/${b.prenomsF.length} prénoms)`).join(' · ')}</div>
            <div><strong>Événements :</strong> {C.events.length} ({C.events.filter((e) => e.saison === 'Été').length} été, {C.events.filter((e) => e.saison === 'Hiver').length} hiver)</div>
            <div><strong>Cartes dynastie :</strong> {C.dynasties.length}</div>
            <div><strong>Init (classeur) :</strong> {cfg.init.nbPerso} personnages, {Math.round(cfg.init.pourcentageMarie * 100)}% mariés, {cfg.init.nbNoble} noble, âge par défaut {cfg.init.ageDefaut}</div>
            <div><strong>Conditions de victoire :</strong><ul>{VICTORY_TEXT.map((v) => <li key={v.nom}>{v.nom} — {v.texte}</li>)}</ul></div>
          </div>
        </Card>
      )}
    </div>
  )
}

// ── Éditeur des effets automatiques d'une technologie de progrès ────────
// Champ « effets » de chaque tech (engine/progres.ts) : paramétrable
// entièrement ici — type d'effet, ressource, montant, titre, aménagements.

const TYPES_EFFETS: Array<{ value: EffetProgres['type']; label: string }> = [
  { value: 'gain', label: 'Gain au déblocage' },
  { value: 'prodCapitale', label: '+/tour (capitale)' },
  { value: 'prodParHabitation', label: '+/tour par habitation' },
  { value: 'prodParTitre', label: '+/tour par titre' },
  { value: 'prodParAmenagement', label: '+/tour par aménagement' },
  { value: 'garnison', label: 'Garnison (statique)' },
]

function EffetsTechEditor({ tech, ressources, titres, set }: {
  tech: ProgresTechDef | undefined
  ressources: string[]
  titres: string[]
  /** applique une mutation au tableau « effets » de la tech (brouillon) */
  set: (fn: (effets: EffetProgres[]) => void) => void
}) {
  const effets = tech?.effets ?? []
  const maj = (j: number, patch: Partial<EffetProgres>) =>
    set((ef) => { if (ef[j]) ef[j] = { ...ef[j], ...patch } })
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      {effets.map((e, j) => (
        <div key={j} className="row small-gap" style={{ flexWrap: 'wrap' }}>
          <Select
            value={e.type}
            options={TYPES_EFFETS}
            onChange={(v) => maj(j, { type: v })}
          />
          {e.type === 'garnison' ? (
            <Select
              value={e.cible ?? 'habitations'}
              options={[
                { value: 'capitale', label: 'capitale' },
                { value: 'habitations', label: 'toutes les habitations' },
              ]}
              onChange={(v) => maj(j, { cible: v })}
            />
          ) : (
            <Select
              value={e.ressource ?? ''}
              options={ressources.map((r) => ({ value: r, label: r }))}
              onChange={(v) => maj(j, { ressource: v })}
            />
          )}
          <NumberInput value={e.montant} step={1} onChange={(v) => maj(j, { montant: v })} />
          {e.type === 'prodParTitre' && (
            <Select
              value={e.titre ?? ''}
              options={titres.map((t) => ({ value: t, label: t }))}
              onChange={(v) => maj(j, { titre: v })}
            />
          )}
          {e.type === 'prodParAmenagement' && (
            <TextInput
              value={(e.amenagements ?? []).join(', ')}
              placeholder="ex. Champ, Rizière"
              onChange={(v) => maj(j, {
                amenagements: v.split(',').map((x) => x.trim()).filter(Boolean),
              })}
            />
          )}
          <Button tone="danger" onClick={() => set((ef) => { ef.splice(j, 1) })}>✕</Button>
        </div>
      ))}
      <Button onClick={() => set((ef) => {
        ef.push({ type: 'gain', ressource: ressources[0] ?? 'Or', montant: 0 })
      })}>+ effet automatique</Button>
    </div>
  )
}
