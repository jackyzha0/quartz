// ══════════════════════════════════════════════════════════════════════
//  Paramètres : éditeur INTÉGRAL de la configuration du jeu.
//  Accessible EN PERMANENCE — même sans partie en cours.
//  La configuration est COMMUNE à toutes les parties : chaque
//  modification est mémorisée (navigateur) et propagée à la partie
//  en cours + aux nouvelles parties. Toutes les variables (constantes
//  et formules du moteur VBA) et toutes les tables de référentiels du
//  classeur sont modifiables à chaud, sans aucune validation bloquante :
//  les stocks peuvent être négatifs, les poids nuls, les textes vides.
// ══════════════════════════════════════════════════════════════════════

import React, { useState } from 'react'
import { useGame } from '../state/store'
import { cfgOf, cloneDefaultConfig } from '../config/defaultConfig'
import type { GameConfig } from '../config/defaultConfig'
import { PARAM_META, PARAM_STRINGS_META } from '../config/params'
import { Card, NumberInput, TextInput, Button, Badge } from './ui'
import {
  BatimentsParams, AmenagementsParams, ProgresParams, PaysRangsParams,
  HabitationsParams, MinisteresParams, CouleursParams,
} from './ConfigTables'

const ONGLETS = [
  'Formules', 'Titres', 'Traits', 'Cultures', 'Régimes',
  'Bâtiments', 'Aménagements', 'Progrès', 'Pays & rangs', 'Habitations',
  'Ministères', 'Couleurs',
  'Événements', 'Effets évts', 'Dynasties', 'Cartes', 'Offrandes',
  'Probabilités', 'Peuples & noms', 'Ressources', 'JSON',
] as const

export function ParamsPanel() {
  const { state, globalConfig, setGlobalCfg, replaceState, exportState, importState } = useGame()
  const [onglet, setOnglet] = useState<(typeof ONGLETS)[number]>('Formules')

  // Configuration commune, fusionnée sur les défauts (clés manquantes, etc.)
  const config: GameConfig = cfgOf(globalConfig).config

  /** Mutation de la configuration commune — propagée à la partie en cours. */
  const setCfg = (fn: (c: GameConfig) => void) => setGlobalCfg(fn)

  const setParam = (key: string, v: number | string) =>
    setCfg((c) => {
      if (!c.params) c.params = {} as GameConfig['params']
      ;(c.params as unknown as Record<string, unknown>)[key] = v
    })

  return (
    <div className="stack">
      <Card title="Paramètres communs à toutes les parties — modifiables à tout moment">
        <p className="muted small">
          Réglages <strong>communs à toutes les parties</strong>, mémorisés par le navigateur —
          export/import JSON dans le dernier onglet.
        </p>
        <div className="tabs">
          {ONGLETS.map((o) => (
            <button key={o} className={`tab ${onglet === o ? 'tab-active' : ''}`} onClick={() => setOnglet(o)}>{o}</button>
          ))}
        </div>
      </Card>

      {onglet === 'Formules' && (
        <Card title="Constantes des formules (portage VBA)">
          {groupesFormules().map((g) => (
            <div key={g} className="mb">
              <h4>{g}</h4>
              <div className="grid-3">
                {PARAM_META.filter((m) => m.groupe === g).map((m) => (
                  <label key={m.key} className="field">
                    <span className="field-label">{m.label}{m.unite ? ` (${m.unite})` : ''}</span>
                    <NumberInput
                      value={Number((config.params as unknown as Record<string, number>)[m.key] ?? 0)}
                      step={0.01}
                      onChange={(v) => setParam(m.key, v)}
                    />
                    {m.aide && <span className="field-hint">{m.aide}</span>}
                  </label>
                ))}
              </div>
            </div>
          ))}
          <h4>Noms système (chaînes libres)</h4>
          <div className="grid-3">
            {PARAM_STRINGS_META.map((m) => (
              <label key={m.key} className="field">
                <span className="field-label">{m.label}</span>
                <TextInput
                  value={String((config.params as unknown as Record<string, string>)[m.key] ?? '')}
                  onChange={(v) => setParam(m.key, v)}
                />
              </label>
            ))}
            {(['titreDirigeant', 'titreGouverneur', 'titreProfesseur', 'titreChasseur', 'titreSoldat', 'titreCommandant', 'traitBatard', 'traitConsanguin', 'dynastieRoturier'] as const).map((k) => (
              <label key={k} className="field">
                <span className="field-label">{k}</span>
                <TextInput
                  value={String((config.params as unknown as Record<string, string>)[k] ?? '')}
                  onChange={(v) => setParam(k, v)}
                />
              </label>
            ))}
          </div>
        </Card>
      )}

      {onglet === 'Titres' && (
        <Card title="Titres du classeur (15) — gains par tour, règles">
          <div className="table-wrap">
            <table className="tbl small">
              <thead>
                <tr><th>Titre</th><th>Éducation</th><th>Valeur 1</th><th>Ressource 1</th><th>Valeur 2</th><th>Ressource 2</th><th>Noble seul</th><th>Genre</th><th>Attribution</th><th>Description</th></tr>
              </thead>
              <tbody>
                {config.titres.map((t, i) => (
                  <tr key={i}>
                    <td><TextInput value={t.titre} onChange={(v) => setCfg((c) => { c.titres[i].titre = v })} /></td>
                    <td><TextInput value={t.education} onChange={(v) => setCfg((c) => { c.titres[i].education = v })} /></td>
                    <td><NumberInput value={t.valeur1} step={0.1} onChange={(v) => setCfg((c) => { c.titres[i].valeur1 = v })} /></td>
                    <td><TextInput value={t.ressource1} onChange={(v) => setCfg((c) => { c.titres[i].ressource1 = v })} /></td>
                    <td><NumberInput value={t.valeur2} step={0.1} onChange={(v) => setCfg((c) => { c.titres[i].valeur2 = v })} /></td>
                    <td><TextInput value={t.ressource2} onChange={(v) => setCfg((c) => { c.titres[i].ressource2 = v })} /></td>
                    <td><input type="checkbox" checked={t.nobleSeul} onChange={(e) => setCfg((c) => { c.titres[i].nobleSeul = e.target.checked })} /></td>
                    <td><TextInput value={t.regleGenre} onChange={(v) => setCfg((c) => { c.titres[i].regleGenre = v })} /></td>
                    <td><TextInput value={t.attribution} onChange={(v) => setCfg((c) => { c.titres[i].attribution = v })} /></td>
                    <td><TextInput value={t.description} onChange={(v) => setCfg((c) => { c.titres[i].description = v })} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Button onClick={() => setCfg((c) => { c.titres.push({ titre: 'Nouveau titre', education: '', valeur1: 0, ressource1: '', valeur2: 0, ressource2: '', description: '', nobleSeul: false, regleGenre: '', attribution: 'Manuelle' }) })}>+ Ajouter un titre</Button>
        </Card>
      )}

      {onglet === 'Traits' && (
        <Card title="Traits génétiques (poids de tirage, effets)">
          <div className="table-wrap">
            <table className="tbl small">
              <thead>
                <tr><th>Trait</th><th>Poids</th><th>Vie ±</th><th>Résurrection (1d6 ≥)</th><th>Fécondité ±</th><th>Héritable</th><th>Mariage ±</th><th>Description</th></tr>
              </thead>
              <tbody>
                {config.traits.map((t, i) => (
                  <tr key={i}>
                    <td><TextInput value={t.name} onChange={(v) => setCfg((c) => { c.traits[i].name = v })} /></td>
                    <td><NumberInput value={t.weight} step={0.5} onChange={(v) => setCfg((c) => { c.traits[i].weight = v })} /></td>
                    <td><NumberInput value={t.life_delta} onChange={(v) => setCfg((c) => { c.traits[i].life_delta = v })} /></td>
                    <td><NumberInput value={t.resurrection_min_roll} onChange={(v) => setCfg((c) => { c.traits[i].resurrection_min_roll = v })} /></td>
                    <td><NumberInput value={t.fert_add} step={0.05} onChange={(v) => setCfg((c) => { c.traits[i].fert_add = v })} /></td>
                    <td><input type="checkbox" checked={t.heritable} onChange={(e) => setCfg((c) => { c.traits[i].heritable = e.target.checked })} /></td>
                    <td><NumberInput value={t.marriage_mod} step={0.05} onChange={(v) => setCfg((c) => { c.traits[i].marriage_mod = v })} /></td>
                    <td><TextInput value={t.description} onChange={(v) => setCfg((c) => { c.traits[i].description = v })} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Button onClick={() => setCfg((c) => { c.traits.push({ name: 'Nouveau trait', weight: 0, description: '', life_delta: 0, resurrection_min_roll: 0, fert_add: 0, heritable: true, marriage_mod: 0 }) })}>+ Ajouter un trait</Button>
        </Card>
      )}

      {onglet === 'Cultures' && (
        <Card title="Cultures (hérédité, martialité, fécondité, règles)">
          <p className="muted small">Colonnes chiffrées = lois appliquées à chaque fin de tour. 0 = désactivé.</p>
          <div className="table-wrap">
            <table className="tbl small">
              <thead>
                <tr><th>Culture</th><th>Hérédité</th><th>Martialité</th><th>Homo autorisée</th><th>Facteur fécondité</th><th>Nourr./hab monde</th><th>Tourisme/hab</th><th>Or/hab</th><th>Science/constr.</th><th>Règle du pays</th><th>Règle des personnages</th></tr>
              </thead>
              <tbody>
                {config.cultures.map((t, i) => (
                  <tr key={i}>
                    <td><TextInput value={t.nom} onChange={(v) => setCfg((c) => { c.cultures[i].nom = v })} /></td>
                    <td><TextInput value={t.heredite} onChange={(v) => setCfg((c) => { c.cultures[i].heredite = v })} /></td>
                    <td><TextInput value={t.martialite} onChange={(v) => setCfg((c) => { c.cultures[i].martialite = v })} /></td>
                    <td><input type="checkbox" checked={t.homoAutorisee} onChange={(e) => setCfg((c) => { c.cultures[i].homoAutorisee = e.target.checked })} /></td>
                    <td><NumberInput value={t.fertFactor} step={0.05} onChange={(v) => setCfg((c) => { c.cultures[i].fertFactor = v })} /></td>
                    <td><NumberInput value={t.capitalNourrParHabMonde ?? 0} onChange={(v) => setCfg((c) => { c.cultures[i].capitalNourrParHabMonde = v })} /></td>
                    <td><NumberInput value={t.capitalTourismeParHabMonde ?? 0} onChange={(v) => setCfg((c) => { c.cultures[i].capitalTourismeParHabMonde = v })} /></td>
                    <td><NumberInput value={t.capitalOrParHabMonde ?? 0} onChange={(v) => setCfg((c) => { c.cultures[i].capitalOrParHabMonde = v })} /></td>
                    <td><NumberInput value={t.scienceParConstruction ?? 0} onChange={(v) => setCfg((c) => { c.cultures[i].scienceParConstruction = v })} /></td>
                    <td><TextInput value={t.reglePays} onChange={(v) => setCfg((c) => { c.cultures[i].reglePays = v })} /></td>
                    <td><TextInput value={t.reglePerso} onChange={(v) => setCfg((c) => { c.cultures[i].reglePerso = v })} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {onglet === 'Régimes' && (
        <Card title="Régimes politiques (lois)">
          <p className="muted small">Colonnes chiffrées = lois appliquées à chaque fin de tour. 0 = désactivé.</p>
          <div className="table-wrap">
            <table className="tbl small">
              <thead>
                <tr><th>Régime</th><th>Loi (texte)</th><th>Garnison/rang</th><th>Nourr./été rizière</th></tr>
              </thead>
              <tbody>
                {config.regimes.map((r, i) => (
                  <tr key={i}>
                    <td><TextInput value={r.nom} onChange={(v) => setCfg((c) => { c.regimes[i].nom = v })} /></td>
                    <td><TextInput value={r.loi} onChange={(v) => setCfg((c) => { c.regimes[i].loi = v })} /></td>
                    <td><NumberInput value={r.garnisonParRang ?? 0} onChange={(v) => setCfg((c) => { c.regimes[i].garnisonParRang = v })} /></td>
                    <td><NumberInput value={r.nourrEteChampRiziere ?? 0} onChange={(v) => setCfg((c) => { c.regimes[i].nourrEteChampRiziere = v })} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {onglet === 'Bâtiments' && <BatimentsParams config={config} setCfg={setCfg} />}

      {onglet === 'Aménagements' && <AmenagementsParams config={config} setCfg={setCfg} />}

      {onglet === 'Progrès' && <ProgresParams config={config} setCfg={setCfg} />}

      {onglet === 'Pays & rangs' && <PaysRangsParams config={config} setCfg={setCfg} />}

      {onglet === 'Habitations' && <HabitationsParams config={config} setCfg={setCfg} />}

      {onglet === 'Ministères' && <MinisteresParams config={config} setCfg={setCfg} />}

      {onglet === 'Couleurs' && <CouleursParams config={config} setCfg={setCfg} />}

      {onglet === 'Événements' && (
        <Card title="Événements de saison (été/hiver) — textes des 4 niveaux de danger">
          <div className="table-wrap">
            <table className="tbl small">
              <thead>
                <tr><th>Événement</th><th>Saison</th><th>Poids</th><th>Faible (dé ≤5)</th><th>Moyenne (6-8)</th><th>Forte (9+)</th><th>Extrême (11+)</th></tr>
              </thead>
              <tbody>
                {config.events.map((e, i) => (
                  <tr key={i}>
                    <td><TextInput value={e.nom} onChange={(v) => setCfg((c) => { c.events[i].nom = v })} /></td>
                    <td><TextInput value={e.saison} onChange={(v) => setCfg((c) => { c.events[i].saison = v })} /></td>
                    <td><NumberInput value={e.poids} onChange={(v) => setCfg((c) => { c.events[i].poids = v })} /></td>
                    <td><TextInput value={e.faible} onChange={(v) => setCfg((c) => { c.events[i].faible = v })} /></td>
                    <td><TextInput value={e.moyenne} onChange={(v) => setCfg((c) => { c.events[i].moyenne = v })} /></td>
                    <td><TextInput value={e.forte} onChange={(v) => setCfg((c) => { c.events[i].forte = v })} /></td>
                    <td><TextInput value={e.extreme} onChange={(v) => setCfg((c) => { c.events[i].extreme = v })} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="muted small">Les multiplicateurs de niveau (faible/moyenne/forte/extrême) et les seuils de dangerosité sont dans l'onglet « Formules », groupe Événements.</p>
        </Card>
      )}

      {onglet === 'Effets évts' && (
        <Card title="Effets chiffrés des événements (base × multiplicateur de niveau)">
          <p className="muted small">Ressource « (aléatoire) » = une ressource de base tirée au sort. Laissez un effet vide pour un événement purement narratif.</p>
          {config.eventEffets.map((ev, i) => (
            <div key={i} className="mini">
              <div className="row">
                <strong>{ev.nom}</strong>
                {ev.modDanger > 0 && <Badge tone="warn">danger +{ev.modDanger}</Badge>}
                {ev.maladieRisque > 0 && <Badge tone="bad">risque maladie ×{ev.maladieRisque}</Badge>}
              </div>
              {ev.effets.map((eff, j) => (
                <div key={j} className="row">
                  <NumberInput value={eff.base} onChange={(v) => setCfg((c) => { c.eventEffets[i].effets[j].base = v })} />
                  <TextInput value={eff.ressource} onChange={(v) => setCfg((c) => { c.eventEffets[i].effets[j].ressource = v })} />
                  <button className="badge-x" onClick={() => setCfg((c) => { c.eventEffets[i].effets.splice(j, 1) })}>×</button>
                </div>
              ))}
              <div className="row">
                <Button onClick={() => setCfg((c) => { c.eventEffets[i].effets.push({ ressource: 'Nourriture', base: 0 }) })}>+ effet</Button>
                <label className="small">risque maladie <NumberInput value={ev.maladieRisque} step={0.01} onChange={(v) => setCfg((c) => { c.eventEffets[i].maladieRisque = v })} /></label>
                <label className="small">+danger <NumberInput value={ev.modDanger} step={0.5} onChange={(v) => setCfg((c) => { c.eventEffets[i].modDanger = v })} /></label>
              </div>
            </div>
          ))}
        </Card>
      )}

      {onglet === 'Dynasties' && (
        <Card title="Cartes dynastie (poids de tirage, texte)">
          <div className="table-wrap">
            <table className="tbl small">
              <thead><tr><th>Carte</th><th>Poids</th><th>Description (texte du classeur)</th></tr></thead>
              <tbody>
                {config.dynasties.map((d, i) => (
                  <tr key={i}>
                    <td><TextInput value={d.nom} onChange={(v) => setCfg((c) => { c.dynasties[i].nom = v })} /></td>
                    <td><NumberInput value={d.poids} onChange={(v) => setCfg((c) => { c.dynasties[i].poids = v })} /></td>
                    <td><TextInput value={d.description} onChange={(v) => setCfg((c) => { c.dynasties[i].description = v })} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {onglet === 'Cartes' && (
        <Card title="Effets automatiques des cartes dynastie">
          <p className="muted small">Les cartes « à option » du classeur ne dépensent rien automatiquement : appliquez votre choix en éditant vos stocks (aucune contrainte bloquante).</p>
          {config.dynastieEffets.map((d, i) => (
            <div key={i} className="mini">
              <div className="row">
                <strong>{d.nom}</strong>
                <label className="small">guérit un malade <input type="checkbox" checked={d.guerison} onChange={(e) => setCfg((c) => { c.dynastieEffets[i].guerison = e.target.checked })} /></label>
              </div>
              {d.effets.map((eff, j) => (
                <div key={j} className="row">
                  <NumberInput value={eff.base} onChange={(v) => setCfg((c) => { c.dynastieEffets[i].effets[j].base = v })} />
                  <TextInput value={eff.ressource} onChange={(v) => setCfg((c) => { c.dynastieEffets[i].effets[j].ressource = v })} />
                  <button className="badge-x" onClick={() => setCfg((c) => { c.dynastieEffets[i].effets.splice(j, 1) })}>×</button>
                </div>
              ))}
              <Button onClick={() => setCfg((c) => { c.dynastieEffets[i].effets.push({ ressource: 'Or', base: 0 }) })}>+ effet</Button>
            </div>
          ))}
        </Card>
      )}

      {onglet === 'Offrandes' && (
        <Card title="Offrandes">
          {config.offrandes.map((o, i) => (
            <div key={i} className="mini">
              <div className="row">
                <TextInput value={o.nom} onChange={(v) => setCfg((c) => { c.offrandes[i].nom = v })} />
                <NumberInput value={o.poids} onChange={(v) => setCfg((c) => { c.offrandes[i].poids = v })} />
              </div>
              <TextInput value={o.description} onChange={(v) => setCfg((c) => { c.offrandes[i].description = v })} />
            </div>
          ))}
        </Card>
      )}

      {onglet === 'Probabilités' && (
        <Card title="Probabilités pondérées (orientations, genres)">
          <h4>Orientations</h4>
          {config.orientations.map((o, i) => (
            <div key={i} className="row">
              <TextInput value={o.nom} onChange={(v) => setCfg((c) => { c.orientations[i].nom = v })} />
              <NumberInput value={o.poids} onChange={(v) => setCfg((c) => { c.orientations[i].poids = v })} />
            </div>
          ))}
          <h4>Genres</h4>
          {config.genres.map((o, i) => (
            <div key={i} className="row">
              <TextInput value={o.nom} onChange={(v) => setCfg((c) => { c.genres[i].nom = v })} />
              <NumberInput value={o.poids} onChange={(v) => setCfg((c) => { c.genres[i].poids = v })} />
            </div>
          ))}
        </Card>
      )}

      {onglet === 'Peuples & noms' && (
        <Card title="Peuples et banques de noms (Banque 1/2/3, 200 noms chacune)">
          <div className="table-wrap">
            <table className="tbl small">
              <thead><tr><th>Peuple</th><th>Banque de noms</th></tr></thead>
              <tbody>
                {config.peuples.map((nom, i) => (
                  <tr key={i}>
                    <td><TextInput value={nom} onChange={(v) => setCfg((c) => { c.peuples[i] = v; c.peupleBanque[v] = c.peupleBanque[nom] ?? 0; delete c.peupleBanque[nom] })} /></td>
                    <td>
                      <select
                        className="input"
                        value={String(config.peupleBanque[nom] ?? 0)}
                        onChange={(e) => setCfg((c) => { c.peupleBanque[nom] = Number(e.target.value) })}
                      >
                        {config.banquesNoms.map((b, bi) => (
                          <option key={bi} value={bi}>{b.nom} ({b.noms.length} noms, {b.prenomsM.length} prénoms M, {b.prenomsF.length} prénoms F)</option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="muted small">Pour éditer le contenu des banques (noms/prénoms), utilisez l'export/import JSON de la configuration ci-dessous, ou « Référentiels » pour les consulter.</p>
        </Card>
      )}

      {onglet === 'Ressources' && (
        <Card title="Ressources et éducations (listes libres, séparées par des virgules)">
          <label className="field">
            <span className="field-label">Ressources ({config.ressources.length})</span>
            <TextInput
              value={config.ressources.join(', ')}
              onChange={(v) => setCfg((c) => { c.ressources = v.split(',').map((x) => x.trim()).filter(Boolean) })}
            />
          </label>
          <label className="field">
            <span className="field-label">Éducations ({config.educations.length})</span>
            <TextInput
              value={config.educations.join(', ')}
              onChange={(v) => setCfg((c) => { c.educations = v.split(',').map((x) => x.trim()).filter(Boolean) })}
            />
          </label>
          <p className="muted small">Attention : les stocks existants des joueurs sont conservés ; renommer une ressource rend son stock orphelin (récupérable à la main dans l'onglet « Pays »).</p>
        </Card>
      )}

      {onglet === 'JSON' && <JsonPanel config={config} setCfg={setCfg} replaceState={replaceState} exportState={exportState} importState={importState} />}
    </div>
  )
}

function JsonPanel({ config, setCfg, replaceState, exportState, importState }: {
  config: GameConfig
  setCfg: (fn: (c: GameConfig) => void) => void
  replaceState: (s: import('../engine/types').GameState) => void
  exportState: () => string
  importState: (json: string) => boolean
}) {
  const { state } = useGame()
  const [text, setText] = useState('')
  const [msg, setMsg] = useState('')
  return (
    <Card title="Export / import de la configuration commune">
      <div className="row mb">
        <Button onClick={() => { setText(JSON.stringify(config, null, 2)); setMsg('Configuration exportée ci-dessous — copiez-la ou collez-en une autre puis « Importer ».') }}>Exporter la config</Button>
        <Button tone="danger" onClick={() => {
          setCfg((c) => {
            const def = cloneDefaultConfig()
            for (const k of Object.keys(def) as (keyof GameConfig)[]) {
              ;(c as unknown as Record<string, unknown>)[k as string] = def[k]
            }
          })
          setMsg('Configuration réinitialisée aux valeurs du classeur.')
        }}>Réinitialiser aux valeurs du classeur</Button>
      </div>
      <textarea
        className="input"
        style={{ width: '100%', minHeight: 240, fontFamily: 'monospace', fontSize: 12 }}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Collez ici une configuration JSON (bouton « Exporter la config » pour la récupérer)…"
      />
      <div className="row mt">
        <Button tone="primary" onClick={() => {
          try {
            const parsed = JSON.parse(text) as GameConfig
            setCfg((c) => {
              for (const k of Object.keys(parsed) as (keyof GameConfig)[]) {
                ;(c as unknown as Record<string, unknown>)[k as string] = parsed[k]
              }
            })
            setMsg('Configuration importée ✓')
          } catch (e) {
            setMsg(`JSON invalide : ${String(e)}`)
          }
        }}>Importer la config</Button>
        {state && (
          <>
            <Button onClick={() => {
              const full = exportState()
              setText(full)
              setMsg('Partie complète exportée (état + config). Pour la restaurer, utilisez le bouton « Importer la partie » ci-dessous.')
            }}>Exporter la partie complète</Button>
            <Button onClick={() => {
              try {
                if (importState(text)) setMsg('Partie complète importée ✓')
                else setMsg('Import impossible : partie invalide.')
              } catch (e) {
                setMsg(String(e))
              }
            }}>Importer la partie complète</Button>
            <Button onClick={() => {
              const s2 = JSON.parse(JSON.stringify(state)) as import('../engine/types').GameState
              s2.config = config
              replaceState(s2)
              setMsg('Config fusionnée dans la partie ✓')
            }}>Appliquer</Button>
          </>
        )}
      </div>
      {msg && <p className="small">{msg}</p>}
      {!state && <p className="muted small">Aucune partie en cours : la configuration modifiée ici sera utilisée par votre prochaine partie.</p>}
    </Card>
  )
}

function groupesFormules(): string[] {
  const out: string[] = []
  for (const m of PARAM_META) if (!out.includes(m.groupe)) out.push(m.groupe)
  return out
}
