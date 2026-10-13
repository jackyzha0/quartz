// ══════════════════════════════════════════════════════════════════════
//  Référentiels : consultation des tables et fiches RÉELLES du classeur
//  (feuilles init, JSON, Titres, traits_genetiques, Culture, Peuples,
//  Ville, Bat, Progrès, Tourisme, Cités L, Pays, Victoires, Accueil…).
//  L'onglet « Cultures & régimes » est ÉDITABLE directement ici :
//  cultures et régimes politiques sont paramétrables et leurs lois
//  chiffrées sont appliquées automatiquement par le moteur.
//  Pour MODIFIER les autres valeurs : onglet « 🎛 Paramètres ».
// ══════════════════════════════════════════════════════════════════════

import React, { useState } from 'react'
import { useGame } from '../state/store'
import { cfgOf } from '../engine/gameData'
import type { GameConfig } from '../config/defaultConfig'
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
        <Card title="Arbres de progrès">
          {cfg.progres.map((arbre, i) => (
            <div key={i} className="mb">
              <h4>{arbre.arbre}</h4>
              <ul className="small">
                {arbre.entrees.map((e, j) => (
                  <li key={j}>{e.texte}{e.prerequis ? <span className="muted"> (prérequis : {e.prerequis})</span> : null}</li>
                ))}
              </ul>
            </div>
          ))}
        </Card>
      )}

      {onglet === 'Pays & rangs' && (
        <Card title="Rangs de pays (Féodal / Républicain)">
          <div className="table-wrap">
            <table className="tbl small">
              <thead><tr><th>Bloc</th><th>Rang</th><th>Coût</th><th>Bonus</th><th>Succession</th></tr></thead>
              <tbody>
                {cfg.paysRangs.map((r, i) => (
                  <tr key={i}>
                    <td>{r.bloc}</td>
                    <td><strong>{r.nom}</strong></td>
                    <td>{r.cout}</td>
                    <td>{r.bonus}</td>
                    <td>{r.succession}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
        <Card title="Voies de victoire (chapitre XII)">
          {cfg.victoires.map((v, i) => (
            <div key={i} className="mb">
              <h4>{v.voie}</h4>
              <ul className="small">
                {v.rangs.map((r, j) => (
                  <li key={j}><strong>{r.rang}</strong> — {r.condition}{r.bonus ? <span className="muted"> (bonus : {r.bonus})</span> : null}</li>
                ))}
              </ul>
            </div>
          ))}
          <p className="muted small">Contrôles automatiques actuels : {VICTORY_TEXT.map((v) => v.nom).join(', ')}.</p>
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
        <Card title="Ministères">
          {cfg.ministeres.map((m, i) => (
            <div key={i} className="mini">
              <strong>{m.ministere}</strong>
              <div className="small">{m.effet}</div>
            </div>
          ))}
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
