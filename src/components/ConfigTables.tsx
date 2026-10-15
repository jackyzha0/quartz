// ══════════════════════════════════════════════════════════════════════
//  TABLES PARAMÉTRABLES (marqueur (s)) — éditeurs déplacés depuis la
//  page « Référentiels » : TOUT ce qui est éditable vit désormais dans
//  l'onglet « 🎛 Paramètres ». La page « Référentiels » devient un wiki
//  de règles EN LECTURE SEULE qui affiche ces valeurs.
//  Contenu : bâtiments & aménagements (avec éditeur d'EFFETS STRUCTURÉS
//  — une case RESSOURCE + une case QUANTITÉ, retour Thibaut), arbres de
//  progrès (+ effets de tech), pays & rangs, habitations, ministères,
//  couleurs.
// ══════════════════════════════════════════════════════════════════════

import { useEffect } from 'react'
import {
  DEFAULT_CONFIG, COULEURS_JOUEURS_DEFAUT, COULEURS_RESSOURCES_DEFAUT, TRANSPARENCE_LIGNES_DEFAUT,
} from '../config/defaultConfig'
import type { EffetConstruction, EffetProgres, GameConfig, ProgresTechDef } from '../config/defaultConfig'
import { Card, TextInput, NumberInput, Button, Select } from './ui'

export interface TableProps {
  config: GameConfig
  setCfg: (fn: (c: GameConfig) => void) => void
}

const GROUPES_BAT: { value: string; label: string }[] = [
  { value: 'Ville', label: 'Ville' },
  { value: 'Château', label: 'Château' },
  { value: 'Capitale', label: 'Capitale' },
]

// ── Éditeur des effets structurés d'une construction ───────────────────
// Une case RESSOURCE + une case QUANTITÉ (+ case « été ») — plus de texte
// à analyser. Tourisme et Garnison sont des ressources INSTANTANÉES :
// Tourisme crédité UNE FOIS à la construction, Garnison = valeur d'état.

export function EffetsConstructionEditor({ valeur, ressources, set }: {
  valeur: EffetConstruction[] | undefined
  ressources: string[]
  set: (fn: (effets: EffetConstruction[]) => void) => void
}) {
  const effets = valeur ?? []
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      {effets.map((e, j) => (
        <div key={j} className="row small-gap" style={{ flexWrap: 'wrap' }}>
          <Select
            value={e.ressource}
            options={ressources.map((r) => ({ value: r, label: r }))}
            onChange={(v) => set((ef) => { if (ef[j]) ef[j] = { ...ef[j], ressource: v } })}
          />
          <NumberInput value={e.quantite} step={1} onChange={(v) => set((ef) => { if (ef[j]) ef[j] = { ...ef[j], quantite: v } })} />
          <label className="small" style={{ whiteSpace: 'nowrap' }}>
            <input
              type="checkbox"
              checked={!!e.ete}
              onChange={(ev) => set((ef) => { if (ef[j]) ef[j] = { ...ef[j], ete: ev.target.checked || undefined } })}
            />{' '}été
          </label>
          <Button tone="danger" onClick={() => set((ef) => { ef.splice(j, 1) })}>✕</Button>
        </div>
      ))}
      <Button onClick={() => set((ef) => {
        ef.push({ ressource: ressources[0] ?? 'Or', quantite: 0 })
      })}>+ effet</Button>
      <span className="muted small">
        Quantité négative = consommation / tour. « été » = production d'été uniquement (canal
        « Nourr - été »). Tourisme & Garnison = instantanés (Tourisme crédité UNE fois à la
        construction, Garnison = valeur d'état) — jamais de flux / tour.
      </span>
    </div>
  )
}

// ── Bâtiments (Ville / Château / Capitale) ─────────────────────────────

export function BatimentsParams({ config, setCfg }: TableProps) {
  return (
    <Card title={`Constructions — bâtiments (${(config.constructions ?? []).filter((c) => c.categorie === 'Bâtiment').length})`}>
      <p className="muted small">
        Le <strong>groupe</strong> détermine où le bâtiment est constructible (Ville / Château /
        Capitale), la <strong>faction</strong> le réserve au peuple correspondant (un par ville,
        remplaçable). Le moteur lit les <strong>effets</strong> structurés (case ressource + case
        quantité) ; le texte « Production » reste affiché dans le wiki des Référentiels.
      </p>
      <div className="table-wrap">
        <table className="tbl small">
          <thead><tr><th>Groupe</th><th>Bâtiment</th><th>Faction</th><th>Coût</th><th>Effets (moteur)</th><th>Production (texte)</th><th>Description</th><th></th></tr></thead>
          <tbody>
            {(config.constructions ?? []).map((c, i) => ({ c, i })).filter(({ c }) => c.categorie === 'Bâtiment').map(({ c, i }) => (
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
                      ...[...config.peuplesLibres, ...config.peuplesAutres].map((f) => f.nom).map((n) => ({ value: n, label: n })),
                    ]}
                    onChange={(v) => setCfg((cf) => {
                      if (v) cf.constructions[i].faction = v
                      else delete cf.constructions[i].faction
                    })}
                  />
                </td>
                <td><TextInput value={c.cout} onChange={(v) => setCfg((cf) => { cf.constructions[i].cout = v })} /></td>
                <td>
                  <EffetsConstructionEditor
                    valeur={c.effets}
                    ressources={config.ressources}
                    set={(fn) => setCfg((cf) => {
                      const t = cf.constructions[i]
                      if (!t) return
                      if (!t.effets) t.effets = []
                      fn(t.effets)
                    })}
                  />
                </td>
                <td><TextInput value={c.production} onChange={(v) => setCfg((cf) => { cf.constructions[i].production = v })} /></td>
                <td><TextInput value={c.description} onChange={(v) => setCfg((cf) => { cf.constructions[i].description = v })} /></td>
                <td><Button tone="danger" onClick={() => setCfg((cf) => { cf.constructions.splice(i, 1) })}>✕</Button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Button onClick={() => setCfg((c) => {
        c.constructions.push({ categorie: 'Bâtiment', groupe: 'Ville', famille: '', nom: 'Nouveau bâtiment', cout: '', production: '', description: '', effets: [] })
      })}>+ Ajouter un bâtiment</Button>
    </Card>
  )
}

// ── Aménagements de terrain ────────────────────────────────────────────

export function AmenagementsParams({ config, setCfg }: TableProps) {
  return (
    <Card title={`Aménagements (${(config.constructions ?? []).filter((c) => c.categorie === 'Aménagement').length})`}>
      <p className="muted small">
        La colonne <strong>Terrain</strong> est indicative (case de plateau requise) ; le moteur lit
        le <strong>coût</strong> et les <strong>effets</strong> structurés (case ressource + case
        quantité). Coût réduit par un « Camp de bâtisseurs » présent dans la ville (montant lu
        dans sa description).
      </p>
      <div className="table-wrap">
        <table className="tbl small">
          <thead><tr><th>Aménagement</th><th>Terrain</th><th>Coût</th><th>Effets (moteur)</th><th>Production (texte)</th><th>Description</th><th></th></tr></thead>
          <tbody>
            {(config.constructions ?? []).map((c, i) => ({ c, i })).filter(({ c }) => c.categorie === 'Aménagement').map(({ c, i }) => (
              <tr key={i}>
                <td><TextInput value={c.nom} onChange={(v) => setCfg((cf) => { cf.constructions[i].nom = v })} /></td>
                <td><TextInput value={c.terrain ?? ''} onChange={(v) => setCfg((cf) => { cf.constructions[i].terrain = v })} /></td>
                <td><TextInput value={c.cout} onChange={(v) => setCfg((cf) => { cf.constructions[i].cout = v })} /></td>
                <td>
                  <EffetsConstructionEditor
                    valeur={c.effets}
                    ressources={config.ressources}
                    set={(fn) => setCfg((cf) => {
                      const t = cf.constructions[i]
                      if (!t) return
                      if (!t.effets) t.effets = []
                      fn(t.effets)
                    })}
                  />
                </td>
                <td><TextInput value={c.production} onChange={(v) => setCfg((cf) => { cf.constructions[i].production = v })} /></td>
                <td><TextInput value={c.description} onChange={(v) => setCfg((cf) => { cf.constructions[i].description = v })} /></td>
                <td><Button tone="danger" onClick={() => setCfg((cf) => { cf.constructions.splice(i, 1) })}>✕</Button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Button onClick={() => setCfg((c) => {
        c.constructions.push({ categorie: 'Aménagement', groupe: 'Terrain', famille: '', nom: 'Nouvel aménagement', terrain: '', cout: '', production: '', description: '', effets: [] })
      })}>+ Ajouter un aménagement</Button>
    </Card>
  )
}

// ── Arbres de progrès ──────────────────────────────────────────────────

export function ProgresParams({ config, setCfg }: TableProps) {
  return (
    <Card title={`Arbres de progrès (${config.progres.length})`}>
      <p className="muted small">
        Tech 2 exige la tech 1 de sa branche ; tech C exige les 2 techs d'une même branche ;
        arbre terminé à 3 technologies ; 3 arbres de l'âge N-1 ouvrent l'âge N. Coût en
        Science débité au déblocage ; effets à appliquer au plateau.
      </p>
      {[1, 2, 3].map((age) => (
        <div key={age} className="mb">
          <h4>Âge {age}</h4>
          {config.progres.every((a) => a.age !== age) && (
            <p className="muted small">Aucun arbre à cet âge.</p>
          )}
          {config.progres.map((arbre, i) => arbre.age !== age ? null : (
            <div key={i} className="mini mb">
              <div className="row">
                <TextInput value={arbre.nom} onChange={(v) => setCfg((c) => { c.progres[i].nom = v })} />
                <NumberInput value={arbre.age} step={1} min={1} max={3} onChange={(v) => setCfg((c) => { c.progres[i].age = v })} />
                <TextInput value={arbre.tags ?? ''} placeholder="Tags (ex. C, PV, Aurore N)" onChange={(v) => setCfg((c) => { c.progres[i].tags = v })} />
                <Button tone="danger" onClick={() => setCfg((c) => { c.progres.splice(i, 1) })}>Supprimer l'arbre</Button>
              </div>
              <div className="table-wrap">
                <table className="tbl small">
                  <thead><tr><th>Emplacement</th><th>Technologie</th><th>Coût (Science)</th><th>Description (effet)</th><th>Effets (aide de jeu — au plateau)</th></tr></thead>
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
                            ressources={config.ressources}
                            titres={config.titres.map((t) => t.titre)}
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
                          ressources={config.ressources}
                          titres={config.titres.map((t) => t.titre)}
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
  )
}

// ── Éditeur des effets d'une technologie de progrès (AIDE DE JEU) ──────
// Champ « effets » de chaque tech : AUCUN effet moteur (tout s'applique
// au plateau) — ces lignes ne servent qu'au résumé affiché sous la tech.

const TYPES_EFFETS: Array<{ value: EffetProgres['type']; label: string }> = [
  { value: 'gain', label: 'Gain au déblocage' },
  { value: 'prodCapitale', label: '+/tour (capitale)' },
  { value: 'prodParHabitation', label: '+/tour par habitation' },
  { value: 'prodParTitre', label: '+/tour par titre' },
  { value: 'prodParAmenagement', label: '+/tour par aménagement' },
  { value: 'garnison', label: 'Garnison (statique)' },
]

export function EffetsTechEditor({ tech, ressources, titres, set }: {
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

// ── Pays & rangs ───────────────────────────────────────────────────────

export function PaysRangsParams({ config, setCfg }: TableProps) {
  // Auto-migration des rangs de pays : une configuration antérieure à la
  // refonte (ancienne table à blocs Féodal/Républicain) repasse sur la
  // nouvelle échelle (coutOr/coutNourriture/serments/ministres) pour que
  // l'éditeur écrive au bon format.
  useEffect(() => {
    const raw = config.paysRangs
    if (
      !Array.isArray(raw) || raw.length === 0
      || typeof (raw[0] as { coutOr?: unknown })?.coutOr !== 'number'
    ) {
      setCfg((c) => {
        c.paysRangs = DEFAULT_CONFIG.paysRangs.map((r) => ({ ...r }))
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <Card title="Rangs de pays — échelle féodale unique">
      <p className="muted small">
        Montée par <strong>sacre</strong> : payer Or + Nourriture et posséder les <strong>serments</strong>
        requis (vassal ou cité libre sous suzeraineté). Chaque rang fixe le nombre de <strong>Ministres</strong>.
      </p>
      <div className="table-wrap">
        <table className="tbl small">
          <thead><tr><th>Rang</th><th>Sacre (Or)</th><th>Sacre (Nourriture)</th><th>Serments requis</th><th>Ministres</th><th>Bonus (plateau)</th><th></th></tr></thead>
          <tbody>
            {config.paysRangs.map((r, i) => (
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
    </Card>
  )
}

// ── Habitations ─────────────────────────────────────────────────────────

export function HabitationsParams({ config, setCfg }: TableProps) {
  return (
    <Card title={`Types & rangs d'habitation (${config.typesHabitation.length}) — consommation, garnison de base`}>
      <p className="muted small">
        Coût d'amélioration : débité automatiquement du stock à la construction /
        amélioration du rang (page Pays). Consommation / tour : débitée à chaque fin
        de tour (quantités positives, ex. « 10 Nourriture, 8 Or ») ; garnison de base
        fixe, s'ajoutant aux bâtiments.
      </p>
      <div className="table-wrap">
        <table className="tbl small">
          <thead>
            <tr>
              <th>Type</th><th>Rang</th><th>Coût d'amélioration</th>
              <th>Habitants requis</th><th>Consommation / tour</th><th>Garnison de base</th><th></th>
            </tr>
          </thead>
          <tbody>
            {config.typesHabitation.map((h, i) => (
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
                <td>
                  <Button tone="danger" onClick={() => setCfg((c) => { c.typesHabitation.splice(i, 1) })}>✕</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Button onClick={() => setCfg((c) => {
        c.typesHabitation.push({ type: 'Ville', rang: 'Nouveau rang', cout: '', habitantsRequis: 0, consommation: '', garnison: 0 })
      })}>+ Ajouter un rang d'habitation</Button>
    </Card>
  )
}

// ── Ministères ──────────────────────────────────────────────────────────

export function MinisteresParams({ config, setCfg }: TableProps) {
  return (
    <Card title="Ministères — portefeuilles paramétrables">
      <p className="muted small">
        Chaque rang de pays octroie <strong>1 Ministre</strong> (nomination : nobles et dynasties).
        Portefeuilles <strong>cumulables</strong>, rang minimum selon « Pays & rangs » ; mode
        <strong> Auto</strong> = appliqué par l'application, mode <strong>Plateau</strong> = à la table.
        Supprimer ou renommer une ligne est <strong>définitif</strong> ; seule une table vidée
        entièrement retrouve les valeurs du classeur (marqueur (x)).
      </p>
      <table className="tbl small">
        <thead><tr><th>Ministère</th><th>Rang minimum</th><th>Mode</th><th>Effet</th><th></th></tr></thead>
        <tbody>
          {config.ministeres.map((m, i) => (
            <tr key={i}>
              <td><TextInput value={m.ministere} onChange={(v) => setCfg((c) => { c.ministeres[i].ministere = v })} /></td>
              <td>
                <Select
                  value={m.rangMinimum ?? (config.paysRangs ?? [])[0]?.nom ?? ''}
                  options={(config.paysRangs ?? []).map((r) => ({ value: r.nom, label: r.nom }))}
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
  )
}

// ── Couleurs ────────────────────────────────────────────────────────────

export function CouleursParams({ config, setCfg }: TableProps) {
  const mutCouleurs = (fn: (col: Required<GameConfig['couleurs']>) => void) => {
    setCfg((c) => {
      if (!c.couleurs) c.couleurs = {}
      fn(c.couleurs)
    })
  }
  return (
    <>
      <Card title="Couleurs des joueurs (graphiques, courbes, radar)">
        <p className="muted small">
          Une couleur par joueur, appliquée à tous les graphiques de l'accueil (histogrammes,
          courbe d'évolution, radar de victoire) et à l'historique.
        </p>
        <div className="grid-4">
          {Array.from({ length: 8 }, (_, i) => {
            const cur = config.couleurs?.joueurs?.[i] ?? COULEURS_JOUEURS_DEFAUT[i]
            return (
              <div key={i} className="mini">
                <strong>J{i + 1}</strong>
                <div className="mt" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <input
                    type="color"
                    value={cur}
                    onChange={(e) => mutCouleurs((col) => {
                      const arr = col.joueurs ?? (col.joueurs = [])
                      while (arr.length < 8) arr.push(COULEURS_JOUEURS_DEFAUT[arr.length] ?? '#888888')
                      arr[i] = e.target.value
                    })}
                  />
                  <span className="muted small">{cur}</span>
                </div>
              </div>
            )
          })}
        </div>
      </Card>
      <Card title="Couleurs des ressources (pastilles, lignes de tableaux, courbe)">
        <p className="muted small">
          « Nourr - été » suit toujours la Nourriture, sauf réglage explicite ci-dessous.
          Les lignes de ressources des tableaux de la page Pays (récap, taxes, production
          des villes) sont teintées avec ces couleurs.
        </p>
        <div className="grid-4">
          {config.ressources
            .flatMap((r) => (r === 'Nourriture' ? [r, 'Nourr - été'] : [r]))
            .map((r) => {
              const cur = config.couleurs?.ressources?.[r] ?? COULEURS_RESSOURCES_DEFAUT[r] ?? '#9aa4ad'
              return (
                <div key={r} className="mini">
                  <strong>{r}</strong>
                  <div className="mt" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <input
                      type="color"
                      value={cur}
                      onChange={(e) => mutCouleurs((col) => {
                        col.ressources = { ...(col.ressources ?? {}) }
                        col.ressources[r] = e.target.value
                      })}
                    />
                    <span className="muted small">{cur}</span>
                  </div>
                </div>
              )
            })}
        </div>
      </Card>
      <Card title="Transparence des lignes de tableaux (page Pays)">
        <p className="muted small">
          Fond des lignes de ressources des tableaux (récap des ressources par tour, taxes des
          villageois, production des villes) : 0 % = couleur pleine, 100 % = invisible.
          Réglez ici la transparence pour garder les chiffres lisibles.
        </p>
        {(() => {
          const t = config.couleurs?.transparenceLignes ?? TRANSPARENCE_LIGNES_DEFAUT
          return (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <input
                type="range" min={0} max={100} step={5} value={t}
                onChange={(e) => mutCouleurs((col) => {
                  col.transparenceLignes = Math.max(0, Math.min(100, Number(e.target.value)))
                })}
              />
              <strong>{t} %</strong>
              <span
                className="mini"
                style={{ padding: '2px 12px', background: `color-mix(in srgb, ${config.couleurs?.ressources?.['Or'] ?? COULEURS_RESSOURCES_DEFAUT['Or']} ${100 - t}%, transparent)` }}
              >
                aperçu (Or)
              </span>
            </div>
          )
        })()}
        <div className="mt">
          <Button onClick={() => setCfg((c) => {
            c.couleurs = {
              joueurs: [...COULEURS_JOUEURS_DEFAUT],
              ressources: { ...COULEURS_RESSOURCES_DEFAUT },
              transparenceLignes: TRANSPARENCE_LIGNES_DEFAUT,
            }
          })}>↺ Couleurs par défaut</Button>
        </div>
      </Card>
    </>
  )
}
