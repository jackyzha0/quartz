// ══════════════════════════════════════════════════════════════════════
//  Référentiels : consultation des tables et fiches RÉELLES du classeur
//  (feuilles init, JSON, Titres, traits_genetiques, Culture, Peuples,
//  Ville, Bat, Progrès, Tourisme, Cités L, Pays, Victoires, Accueil…).
//  Pour MODIFIER une valeur : onglet « 🎛 Paramètres ».
// ══════════════════════════════════════════════════════════════════════

import React, { useState } from 'react'
import { useGame } from '../state/store'
import { cfgOf } from '../engine/gameData'
import { VICTORY_TEXT } from '../engine/gameData2'
import { Card, Badge } from './ui'

const ONGLETS = [
  'Titres', 'Traits gén.', 'Peuples', 'Bâtiments', 'Aménagements', 'Progrès',
  'Pays & rangs', 'Tourisme & dogmes', 'Cités libres', 'Victoires', 'Crises',
  'Rappels règles', 'Maladies', 'Offrandes', 'Ministères', 'Aide-mémoire',
] as const

export function ReferenceDataPanel() {
  const { state } = useGame()
  const [onglet, setOnglet] = useState<(typeof ONGLETS)[number]>('Titres')
  // Sans partie en cours, on affiche les valeurs par défaut du classeur.
  const C = cfgOf(state?.config)
  const cfg = C.config

  return (
    <div className="stack">
      <Card title="Référentiels du jeu (données du classeur d'origine)">
        <p className="muted small">
          Ces tables proviennent du classeur « Chasse & Pêche Légendes 7.19 ». Elles sont stockées dans
          la configuration de la partie : pour en modifier une valeur (ou en ajouter), ouvrez
          l'onglet « 🎛 Paramètres » — tout est éditable, sans contrainte.
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
          <Card title="Peuples libres (jouables)">
            <div className="grid-2">
              {cfg.peuplesLibres.map((p) => (
                <div key={p.nom} className="mini">
                  <div className="mini-title">{p.nom}</div>
                  <div className="small">{p.description}</div>
                  {p.lignes?.map((l, i) => (
                    <div key={i} className="small"><strong>{l.label} :</strong> {l.texte}</div>
                  ))}
                </div>
              ))}
            </div>
          </Card>
          <Card title="Autres peuples (PNJ du monde)">
            <div className="grid-2">
              {cfg.peuplesAutres.map((p) => (
                <div key={p.nom} className="mini">
                  <div className="mini-title">{p.nom}</div>
                  <div className="small">{p.description}</div>
                  {p.lignes?.map((l, i) => (
                    <div key={i} className="small"><strong>{l.label} :</strong> {l.texte}</div>
                  ))}
                </div>
              ))}
            </div>
          </Card>
        </>
      )}

      {onglet === 'Bâtiments' && (
        <>
          <Card title={`Constructions — bâtiments (coût / production / description exacts du classeur) (${(cfg.constructions ?? []).filter((c) => c.categorie === 'Bâtiment').length})`}>
            <div className="table-wrap">
              <table className="tbl small">
                <thead><tr><th>Groupe</th><th>Bâtiment</th><th>Coût</th><th>Production</th><th>Description</th></tr></thead>
                <tbody>
                  {(cfg.constructions ?? []).filter((c) => c.categorie === 'Bâtiment').map((c, i) => (
                    <tr key={i}>
                      <td>{c.groupe}</td>
                      <td><strong>{c.nom}</strong></td>
                      <td>{c.cout || '—'}</td>
                      <td>{c.production || '—'}</td>
                      <td className="small">{c.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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

      {onglet === 'Maladies' && (
        <Card title={`Maladies (${cfg.maladies.length})`}>
          <div className="table-wrap">
            <table className="tbl small">
              <thead><tr><th>Maladie</th><th>Poids</th><th>IST</th><th>Héréditaire</th><th>Description</th></tr></thead>
              <tbody>
                {cfg.maladies.map((m, i) => (
                  <tr key={i}>
                    <td><strong>{m.nom}</strong></td>
                    <td>{m.poids}</td>
                    <td>{m.sexuellementTransmissible ? 'oui' : 'non'}</td>
                    <td>{m.hereditaire ? 'oui' : 'non'}</td>
                    <td className="muted">{m.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
