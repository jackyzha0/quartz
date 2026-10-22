// ══════════════════════════════════════════════════════════════════════
//  Référentiels : WIKI DE RÈGLES EN LECTURE SEULE (marqueur (s)).
//  La page affiche les valeurs actuelles des PARAMÈTRES (configuration
//  commune) sous forme de wiki : tables, fiches et résumés d'effets.
//  TOUT ce qui est éditable vit désormais dans l'onglet « 🎛 Paramètres ».
// ══════════════════════════════════════════════════════════════════════

import { useState } from 'react'
import { useGame } from '../state/store'
import { cfgOf } from '../engine/gameData'
import {
  COULEURS_JOUEURS_DEFAUT, COULEURS_RESSOURCES_DEFAUT, TRANSPARENCE_LIGNES_DEFAUT,
} from '../config/defaultConfig'
import type { EffetProgres } from '../config/defaultConfig'
import { VICTORY_TEXT } from '../engine/gameData2'
import { resumeConstruction } from '../engine/engine'
import { Card, Badge } from './ui'

const ONGLETS = [
  'Métiers', 'Traits gén.', 'Peuples', 'Bâtiments', 'Aménagements', 'Progrès',
  'Pays & rangs', 'Habitations', 'Cultures & régimes', 'Tourisme & dogmes', 'Cités libres',
  'Victoires', 'Crises', 'Rappels règles', 'Offrandes', 'Ministères',
  'Couleurs', 'Aide-mémoire',
] as const

export function ReferenceDataPanel() {
  const { globalConfig } = useGame()
  const [onglet, setOnglet] = useState<(typeof ONGLETS)[number]>('Métiers')
  // Wiki : on affiche les VALEURS DES PARAMÈTRES (configuration commune,
  // mémorisée par le navigateur) — modifiables dans « 🎛 Paramètres ».
  const C = cfgOf(globalConfig)
  const cfg = C.config

  return (
    <div className="stack">
      <Card title="Référentiels du jeu (données du classeur d'origine)">
        <p className="muted small">
          <strong>📖 Wiki de règles — lecture seule.</strong> Les tables ci-dessous affichent
          les valeurs actuelles des <strong>paramètres</strong> : pour les modifier, ouvrez
          l'onglet « 🎛 Paramètres ».
        </p>
        <div className="tabs">
          {ONGLETS.map((o) => (
            <button key={o} className={`tab ${onglet === o ? 'tab-active' : ''}`} onClick={() => setOnglet(o)}>{o}</button>
          ))}
        </div>
      </Card>

      {onglet === 'Métiers' && (
        <>
          <Card title={`Métiers (${cfg.metiers.length})`}>
            <div className="table-wrap">
              <table className="tbl small">
                <thead>
                  <tr><th>Métier</th><th>Gain 1 / tour</th><th>Gain 2 / tour</th><th>Noble seul</th><th>Genre</th><th>Attribution</th><th>Description</th></tr>
                </thead>
                <tbody>
                  {cfg.metiers.map((t) => (
                    <tr key={t.metier}>
                      <td><strong>{t.metier}</strong></td>
                      <td>{t.valeur1 ? `${t.valeur1} ${t.ressource1}${t.ete ? ' (été)' : ''}` : '—'}</td>
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
          <Card title="Effets de métier & coûts de révocation">
            {cfg.metiersEffets.map((t, i) => (
              <div key={i} className="mini">
                <strong>{t.metier || '—'}</strong>
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
          ] as const).map(([metier, liste]) => (
            <Card key={metier} title={metier}>
              <p className="muted small">
                Fiches du classeur conservées à titre documentaire (système de
                faction retiré du jeu le 2026-10-19, retour arbitre — à refaire).
              </p>
              {liste.map((p) => (
                <div key={p.nom} className="fiche-peuple">
                  <div className="fiche-peuple-title">{p.nom}</div>
                  <div className="small muted">{p.description}</div>
                  {(p.reglesBase || p.ageII || p.ageIII) ? (
                    <>
                      <div className="frule-row">
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
          <Card title={`Wiki — bâtiments par groupe, rang et famille (${(cfg.constructions ?? []).filter((c) => c.categorie === 'Bâtiment' && (c.groupe === 'Ville' || c.groupe === 'Château')).length})`}>
            <p className="muted small">
              Effets calculés par le moteur : flux / tour, production d'été (canal
              « Nourr - été »), Tourisme crédité UNE fois à la construction, Garnison
              (valeur d'état). Retour Thibaut 2026-10-15 : deux colonnes — VILLE et
              CHÂTEAU ; tri par RANG d'habitation puis par FAMILLE (Militaire,
              Économique, Guilde, Merveille, Capitale).
            </p>
            <div className="refbat-grid">
              {[['Ville', 'VILLES'], ['Château', 'CHÂTEAUX']].map(([groupe, label]) => (
                <div key={groupe}>
                  <h3 className="refbat-metier">{label}</h3>
                  {(() => {
                    const bats = (cfg.constructions ?? [])
                      .filter((c) => c.categorie === 'Bâtiment' && c.groupe === groupe)
                      .sort((a, z) =>
                        ((a.rangMinHabitation ?? 99) - (z.rangMinHabitation ?? 99))
                        || (a.famille ?? '').localeCompare(z.famille ?? '')
                        || a.nom.localeCompare(z.nom))
                    const familles: Array<[string, string]> = [
                      ['Militaire', 'Militaire'], ['Economique', 'Économique'],
                      ['Guilde', 'Guilde'],
                      ['Merveille', 'Merveille'], ['Capitale', 'Capitale'],
                    ]
                    return [1, 2, 3].map((rang) => {
                      const duRang = bats.filter((b) => (b.rangMinHabitation ?? 1) === rang)
                      if (duRang.length === 0) return null
                      return (
                        <div key={rang} className="refbat-rang">
                          <div className="refbat-rang-metier">Rang {rang}</div>
                          {familles.map(([fam, famLabel]) => {
                            const deLaFamille = duRang.filter((b) => (b.famille ?? '') === fam)
                            if (deLaFamille.length === 0) return null
                            return (
                              <div key={fam} className="refbat-famille">
                                <div className="refbat-famille-metier">{famLabel}</div>
                                {deLaFamille.map((b) => (
                                  <div key={b.nom} className="refbat-bat">
                                    <strong>{b.nom}</strong>
                                    <span className="refbat-cout">{b.cout || '—'}</span>
                                    <span className="refbat-effets">
                                      {resumeConstruction(b) || b.production || ''}
                                    </span>
                                    <span className="muted small">{b.description}</span>
                                  </div>
                                ))}
                              </div>
                            )
                          })}
                        </div>
                      )
                    })
                  })()}
                </div>
              ))}
            </div>
          </Card>
          <Card title={`Bâtiments à effet moteur (santé, écoles)`}>
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
        <Card title={`Wiki — aménagements (${(cfg.constructions ?? []).filter((c) => c.categorie === 'Aménagement').length})`}>
          <p className="muted small">
            Effets calculés par le moteur (coût exact, flux / tour, été, Tourisme à la
            construction). Coût réduit par un « Camp de bâtisseurs » présent dans la ville
            (montant lu dans sa description).
          </p>
          <div className="table-wrap">
            <table className="tbl small">
              <thead><tr><th>Aménagement</th><th>Terrain</th><th>Coût</th><th>Effets</th><th>Description</th></tr></thead>
              <tbody>
                {(cfg.constructions ?? []).filter((c) => c.categorie === 'Aménagement').map((c, i) => (
                  <tr key={i}>
                    <td><strong>{c.nom}</strong></td>
                    <td>{c.terrain || '—'}</td>
                    <td>{c.cout || '—'}</td>
                    <td>{resumeConstruction(c) || <span className="muted">—</span>}</td>
                    <td className="muted">{c.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {onglet === 'Progrès' && (
        <Card title={`Wiki — arbres de progrès (${cfg.progres.length})`}>
          <p className="muted small">
            Tech 2 exige la tech 1 de sa branche ; tech C exige les 2 techs d'une même branche ;
            arbre terminé à 3 technologies ; 3 arbres de l'âge N-1 ouvrent l'âge N.
          </p>
          {[1, 2, 3].map((age) => (
            <div key={age} className="mb">
              <h4>Âge {age}</h4>
              {cfg.progres.every((a) => a.age !== age) && (
                <p className="muted small">Aucun arbre à cet âge.</p>
              )}
              {cfg.progres.map((arbre, i) => arbre.age !== age ? null : (
                <div key={i} className="mini mb">
                  <div className="row">
                    <strong>{arbre.nom}</strong>
                    {arbre.tags ? <span className="muted small">{arbre.tags}</span> : null}
                  </div>
                  <div className="table-wrap">
                    <table className="tbl small">
                      <thead><tr><th>Emplacement</th><th>Technologie</th><th>Coût (Science)</th><th>Description (effet)</th><th>Effets (aide de jeu)</th></tr></thead>
                      <tbody>
                        {([['A.1', 'brancheA', 0], ['A.2', 'brancheA', 1], ['B.1', 'brancheB', 0], ['B.2', 'brancheB', 1]] as [string, 'brancheA' | 'brancheB', number][]).map(([label, br, idx]) => (
                          <tr key={label}>
                            <td>{label}</td>
                            <td><strong>{arbre[br][idx]?.nom || '—'}</strong></td>
                            <td>{arbre[br][idx]?.cout || '—'}</td>
                            <td>{arbre[br][idx]?.description || '—'}</td>
                            <td>{(arbre[br][idx]?.effets ?? []).map(fmtEffetTech).join(' · ') || <span className="muted">—</span>}</td>
                          </tr>
                        ))}
                        <tr>
                          <td>C (optionnelle)</td>
                          <td><strong>{arbre.techC?.nom || '—'}</strong></td>
                          <td>{arbre.techC?.cout || '—'}</td>
                          <td>{arbre.techC?.description || '—'}</td>
                          <td>{(arbre.techC?.effets ?? []).map(fmtEffetTech).join(' · ') || <span className="muted">—</span>}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </Card>
      )}

      {onglet === 'Pays & rangs' && (
        <Card title="Wiki — rangs de pays (échelle féodale)">
          <p className="muted small">
            Montée par <strong>sacre</strong> : payer Or + Nourriture et posséder les
            <strong> serments</strong> requis. Chaque rang fixe le nombre de <strong>Ministres</strong>.
          </p>
          <div className="table-wrap">
            <table className="tbl small">
              <thead><tr><th>Rang</th><th>Sacre (Or)</th><th>Sacre (Nourriture)</th><th>Serments</th><th>Ministres</th><th>Bonus (plateau)</th></tr></thead>
              <tbody>
                {(cfg.paysRangs ?? []).map((r, i) => (
                  <tr key={i}>
                    <td><strong>{r.nom}</strong></td>
                    <td>{r.coutOr}</td>
                    <td>{r.coutNourriture}</td>
                    <td>{r.serments}</td>
                    <td>{r.ministres}</td>
                    <td className="muted">{r.bonus || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {onglet === 'Habitations' && (
        <Card title="Wiki — types & rangs d'habitation">
          <div className="table-wrap">
            <table className="tbl small">
              <thead><tr><th>Type</th><th>Rang</th><th>Coût d'amélioration</th><th>Habitants requis</th><th>Métiers disponibles</th><th>Domiciles disponibles</th></tr></thead>
              <tbody>
                {cfg.typesHabitation.map((h, i) => (
                  <tr key={i}>
                    <td><strong>{h.type}</strong></td>
                    <td>{h.rang}</td>
                    <td>{h.cout || '—'}</td>
                    <td>{h.habitantsRequis}</td>
                    <td>{h.metiersDisponibles || '—'}</td>
                    <td>{h.domicilesDisponibles || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {onglet === 'Cultures & régimes' && (
        <>
          <Card title={`Wiki — cultures (${cfg.cultures.length})`}>
            <p className="muted small">
              Lois chiffrées appliquées à chaque fin de tour : +N ressource par habitation de
              cette culture dans le monde (capitale), +N Science par construction.
            </p>
            <div className="table-wrap">
              <table className="tbl small">
                <thead>
                  <tr>
                    <th>Culture</th><th>Hérédité</th><th>Homo autorisée</th>
                    <th>Fécondité</th><th>Nourr / hab (monde)</th>
                    <th>Tourisme / hab</th><th>Or / hab</th>
                    <th>Science / constr.</th><th>Règle du pays</th><th>Règle des personnages</th>
                  </tr>
                </thead>
                <tbody>
                  {cfg.cultures.map((t, i) => (
                    <tr key={i}>
                      <td><strong>{t.nom}</strong></td>
                      <td>{t.heredite}</td>
                      <td>{t.homoAutorisee ? 'oui' : 'non'}</td>
                      <td>×{t.fertFactor}</td>
                      <td>{t.capitalNourrParHabMonde || '—'}</td>
                      <td>{t.capitalTourismeParHabMonde || '—'}</td>
                      <td>{t.capitalOrParHabMonde || '—'}</td>
                      <td>{t.scienceParConstruction || '—'}</td>
                      <td className="muted">{t.reglePays || '—'}</td>
                      <td className="muted">{t.reglePerso || '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
          <Card title={`Wiki — régimes politiques (${cfg.regimes.length})`}>
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
                  {cfg.regimes.map((r, i) => (
                    <tr key={i}>
                      <td><strong>{r.nom}</strong></td>
                      <td>{r.loi || '—'}</td>
                      <td>{r.garnisonParRang || '—'}</td>
                      <td>{r.nourrEteChampRiziere || '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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
            4 <strong>Lauriers</strong> par voie en <strong>ordre strict</strong> (cochage manuel au radar de
            l'accueil). Chaque Laurier I-III validé déclenche une <strong>crise</strong> ; bonus seulement si
            complété pendant l'âge de même numéro ; <strong>Laurier IV = Victoire</strong>.
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
        <Card title="Wiki — ministères">
          <p className="muted small">
            Chaque rang de pays octroie <strong>1 Ministre</strong> (nomination : nobles et
            dynasties). Portefeuilles <strong>cumulables</strong>.
          </p>
          <div className="table-wrap">
            <table className="tbl small">
              <thead><tr><th>Ministère</th><th>Rang minimum</th><th>Mode</th><th>Effet</th></tr></thead>
              <tbody>
                {cfg.ministeres.map((m, i) => (
                  <tr key={i}>
                    <td><strong>{m.ministere}</strong></td>
                    <td>{m.rangMinimum ?? '—'}</td>
                    <td><Badge tone={m.mode === 'Auto' ? 'info' : 'neutral'}>{m.mode ?? 'Plateau'}</Badge></td>
                    <td className="muted">{m.effet || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {onglet === 'Couleurs' && (
        <>
          <Card title="Wiki — couleurs des joueurs">
            <div className="grid-4">
              {Array.from({ length: 8 }, (_, i) => {
                const cur = cfg.couleurs?.joueurs?.[i] ?? COULEURS_JOUEURS_DEFAUT[i]
                return (
                  <div key={i} className="mini">
                    <div className="row" style={{ alignItems: 'center', gap: 8 }}>
                      <span className="mini" style={{ width: 22, height: 22, padding: 0, background: cur }} />
                      <strong>J{i + 1}</strong>
                      <span className="muted small">{cur}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </Card>
          <Card title="Wiki — couleurs des ressources">
            <div className="grid-4">
              {cfg.ressources
                .flatMap((r) => (r === 'Nourriture' ? [r, 'Nourr - été'] : [r]))
                .map((r) => {
                  const cur = cfg.couleurs?.ressources?.[r] ?? COULEURS_RESSOURCES_DEFAUT[r] ?? '#9aa4ad'
                  return (
                    <div key={r} className="mini">
                      <div className="row" style={{ alignItems: 'center', gap: 8 }}>
                        <span className="mini" style={{ width: 22, height: 22, padding: 0, background: cur }} />
                        <strong>{r}</strong>
                        <span className="muted small">{cur}</span>
                      </div>
                    </div>
                  )
                })}
            </div>
          </Card>
          <Card title="Wiki — transparence des lignes de tableaux (page Pays)">
            {(() => {
              const t = cfg.couleurs?.transparenceLignes ?? TRANSPARENCE_LIGNES_DEFAUT
              return (
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <strong>{t} %</strong>
                  <span
                    className="mini"
                    style={{ padding: '2px 12px', background: `color-mix(in srgb, ${cfg.couleurs?.ressources?.['Or'] ?? COULEURS_RESSOURCES_DEFAUT['Or']} ${100 - t}%, transparent)` }}
                  >
                    aperçu (Or)
                  </span>
                </div>
              )
            })()}
          </Card>
        </>
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

// ── Résumé affichable d'un effet de technologie (aide de jeu) ──────────

function fmtEffetTech(e: EffetProgres): string {
  const m = `${e.montant > 0 ? '+' : ''}${e.montant}`
  switch (e.type) {
    case 'gain': return `${m} ${e.ressource ?? ''} au déblocage`
    case 'prodCapitale': return `${m} ${e.ressource ?? ''} / tour (capitale)`
    case 'prodParHabitation': return `${m} ${e.ressource ?? ''} / tour par habitation`
    case 'prodParMetier': return `${m} ${e.ressource ?? ''} / tour par métier « ${e.metier ?? ''} »`
    case 'prodParAmenagement': return `${m} ${e.ressource ?? ''} / tour par aménagement (${(e.amenagements ?? []).join(', ')})`
    case 'garnison': return `Garnison ${m} (${e.cible ?? 'habitations'})`
    default: return ''
  }
}
