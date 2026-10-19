// ══════════════════════════════════════════════════════════════════════
//  UNE VILLE de la page Pays : nom / taxes / proximité, actions
//  (transfert, suppression, cité libre), cultures présentes, garnison
//  des habitations, rang & type, consommation, aménagements et
//  bâtiments (choix à catégories — marqueur (y)), lignes « Autres »,
//  production de la ville.
//  (RETRAIT 2026-10-19, retour arbitre : la heatmap d'attrait migratoire
//   a été retirée avec la migration spontanée par Tourisme — à refaire.)
//  (Extrait de PlayerView.tsx — un fichier par UI.)
// ══════════════════════════════════════════════════════════════════════

import type { AutreDef, City, GameState, Player } from '../../engine/types'
import { useGame } from '../../state/store'
import * as remote from '../../supabase/client'
import {
  effetsTourBatiment, garnisonBatiment, constructionsRefs, amenagementRef,
  coutAmenagement, aCampDeBatisseurs, parseCoutTexte, garnisonHabitationVille,
  detailGarnisonVille, typeVille, habitationDef, rangsDisponibles,
  consommationsVille, resumeConstruction, productionVille,
  effetsNourrEteAmenagementsVille,
  effetsNourrEteAutresVille, supprimerVille, transfererVille,
  debiterCoutHabitation,
} from '../../engine/engine'
import { couleurRessource, fondRessource, type Cfg } from '../../engine/gameData'
import { villeDevientCiteLibre } from '../../engine/citesLibres'
import { NumberInput, Select, TextInput, Button, fmt, TAX_OPTIONS } from '../ui'
import { ChoicePicker } from '../Picker'
import { faireConstruire, faireBatParFamille } from './Constructions'
import {
  Field, ORIGINE_LABEL, RESSOURCES_FLUX, FAM_BADGES,
  fmtEffets, fmtCout, fmtNum, type ChoixSurintendant,
} from './pays-utils'

export function VilleCarte({ idx, ville, joueur, p, C, setPlayer, setSurint, setSurintRes }: {
  idx: number
  ville: City
  joueur: number
  p: Player
  C: Cfg
  setPlayer: (fn: (p: Player, s: GameState) => void) => void
  setSurint: (v: ChoixSurintendant | null) => void
  setSurintRes: (v: string) => void
}) {
  const { state, update, salon } = useGame()
  // Garde-fou type : PlayerView ne rend cette carte QUE si une partie
  //  est chargée (state non-null côté App).
  if (!state) return null
  // ── Référentiel des constructions (coût / production / description exacts) ──
  const refs = constructionsRefs(C.config)
  const amRefs = refs.filter((r) => r.categorie === 'Aménagement')
  const coutAm = coutAmenagement(p, C.config)
  const reducBatisseurs = aCampDeBatisseurs(p)
  // Mutateurs (fabriques de Constructions.ts) :
  const construire = faireConstruire({ update, joueur, C, setSurint, setSurintRes })
  const batParFamillePour = faireBatParFamille({ state, p, C })
    const nbVivants = (state.population[p.n] ?? [])
      .filter((c) => c.statut !== 'Décédé' && c.ville === ville.nom).length
    // Toutes les cultures présentes dans la ville (nombre d'habitants)
    const cultures: Record<string, number> = {}
    for (const c of state.population[p.n] ?? []) {
      if (c.statut === 'Décédé' || c.ville !== ville.nom) continue
      cultures[c.culture] = (cultures[c.culture] ?? 0) + 1
    }
    const culturesTriees = Object.entries(cultures).sort(
      (a, b) => (a[0] === ville.culture ? -1 : b[0] === ville.culture ? 1 : b[1] - a[1]),
    )
    return (
      <div key={idx} className="mini">
        {/* Ligne de tête densifiée (retour Thibaut 2026-10-14) :
            nom de la ville EN GRAS + niveau de taxes sur la
            même ligne. */}
        <div className="ville-tete">
        <Field label="Nom">
          <TextInput
            value={ville.nom}
            onChange={(v) => setPlayer((x, s) => {
              const ancien = x.villes[idx].nom
              x.villes[idx].nom = v
              // mettre à jour la ville des habitants
              for (const c of s.population[joueur] ?? []) {
                if (c.ville === ancien) c.ville = v
              }
            })}
          />
        </Field>
        <Field label="Taxes">
          <Select
            value={ville.taxes}
            options={TAX_OPTIONS}
            onChange={(v) => setPlayer((x) => { x.villes[idx].taxes = v })}
          />
        </Field>
        {/* Proximité (marqueur (y), retour Thibaut) : plaine /
            bord de rivière / bord de mer — bonus de Nourriture
            par tour crédité automatiquement, montants dans
            Paramètres → Formules → Villes. */}
        <Field label="Proximité">
          <Select
            value={ville.proximite ?? 'Plaine'}
            options={[
              { value: 'Plaine', label: 'Plaine (aucun bonus)' },
              { value: 'Rivière', label: `Rivière (+${fmt(C.p.proxRiviereNourriture)} Nourriture/tour)` },
              { value: 'Mer', label: `Mer (+${fmt(C.p.proxMerNourriture)} Nourriture/tour)` },
            ]}
            onChange={(v) => setPlayer((x) => { x.villes[idx].proximite = v })}
          />
        </Field>
        </div>
        {/* Actions de ville : transfert à un autre joueur
            (capture, vente, cadeau — la ville ET ses habitants
            suivent) et suppression (les habitants restent
            inscrits dans la population). Retour Thibaut. */}
        <div className="badges-wrap">
          <Select
            value=""
            options={[
              { value: '' as const, label: '⇄ Transférer la ville à…' },
              ...state.players
                .filter((x) => x.n !== p.n)
                .map((x) => ({ value: String(x.n), label: `${x.nom} (J${x.n})` })),
            ]}
            onChange={(v) => v && update((st) => {
              const src = st.players.find((x) => x.n === joueur)
              const dst = st.players.find((x) => x.n === parseInt(v, 10))
              if (src && dst) {
                const nomAvant = src.villes[idx]?.nom ?? ''
                transfererVille(st, src, idx, dst)
                // PROTOCOLE v2 (bug 2026-10-17 : ville transférée
                //  perdue en fin de tour) : le transfert est une
                //  mutation INTER-JOUEURS — la section du
                //  RECEVEUR, poussée avant, l'écraserait à la
                //  fusion. Il part donc aussi en ÉVÉNEMENT
                //  PARTAGÉ (cp_events, type 'transfert_ville'),
                //  rejoué par la résolution APRÈS la fusion des
                //  sections (idempotent). best effort : si
                //  l'insert échoue, le transfert reste visible
                //  localement chez l'émetteur.
                void remote.pousserEvenementPartage(
                  salon, st.turn, joueur, 'transfert_ville',
                  { ville: nomAvant, src: joueur, dst: parseInt(v, 10) },
                )
              }
            })}
          />
          <Button
            tone="danger"
            onClick={() => {
              if (!window.confirm(`Supprimer « ${ville.nom} » ? Ses habitants resteront inscrits dans la population de ${p.nom}.`)) return
              update((st) => {
                const src = st.players.find((x) => x.n === joueur)
                if (src) supprimerVille(st, src, idx)
              })
            }}
          >
            🗑 Supprimer
          </Button>
          <Button
            title="La ville quitte le joueur et devient une cité libre — il reçoit 1 émissaire placé dans cette cité"
            onClick={() => {
              if (!window.confirm(`« ${ville.nom} » devient une CITÉ LIBRE ? ${p.nom} reçoit 1 émissaire placé dans cette cité (retour Thibaut).`)) return
              update((st) => {
                const src = st.players.find((x) => x.n === joueur)
                if (src) villeDevientCiteLibre(st, src, idx)
              })
            }}
          >
            🏼 Devenir cité libre
          </Button>
        </div>
        <div className="muted small">
          Culture majoritaire : <strong>{ville.culture}</strong> · {nbVivants} habitant(s) vivant(s)
        </div>
        {culturesTriees.length > 0 && (
          <div className="small">
            {culturesTriees.map(([cult, nb], i) => (
              <span key={cult}>
                {i > 0 && ' · '}
                {cult === ville.culture
                  ? <strong>{cult} : {nb}</strong>
                  : <span className="muted">{cult} : {nb}</span>}
              </span>
            ))}
          </div>
        )}
        {/* Garnison des habitations, notée sous la culture —
            VALEUR D'ÉTAT (pas un flux) : base du rang + bâtiments
            + loi éventuelle du régime ; ne change pas à chaque tour. */}
        {(() => {
          const g = garnisonHabitationVille(p, ville, C, state)
          const lignes = detailGarnisonVille(p, ville, C, state)
          const sousTotal = lignes.reduce((n, l) => n + l.valeur, 0)
          const plancher = g - sousTotal
          return (
            <div className="small stack small-gap">
              <div>
                Garnison des habitations : <strong>{fmt(g)}</strong>
                <span className="muted small"> — d'où vient ce chiffre :</span>
              </div>
              <table className="small" style={{ borderCollapse: 'collapse', width: '100%' }}>
                <tbody>
                  {lignes.map((l, i) => (
                    <tr key={i}>
                      <td className="muted small">{ORIGINE_LABEL[l.origine] ?? l.origine}</td>
                      <td>{l.label}</td>
                      <td className={l.valeur < 0 ? 'neg' : ''}>{l.valeur > 0 ? '+' : ''}{fmt(l.valeur)}</td>
                    </tr>
                  ))}
                  {plancher > 0 && (
                    <tr>
                      <td className="muted small">plancher</td>
                      <td>« Combler les lacunes » : minimum 30</td>
                      <td>+{fmt(plancher)}</td>
                    </tr>
                  )}
                  <tr>
                    <td />
                    <td><strong>Total</strong></td>
                    <td><strong>{fmt(g)}</strong></td>
                  </tr>
                </tbody>
              </table>
            </div>
          )
        })()}
        {/* Rang d'habitation et type de ville (Ville / Château)
            sur la même ligne — échelles de rangs différentes :
            Hameau → Cité → Grande Cité ou Motte → Donjon → Forteresse. */}
        <div className="grid-2">
          <Field label="Rang d'habitation">
            <Select
              value={ville.rang ?? rangsDisponibles(typeVille(ville), C)[0]}
              options={rangsDisponibles(typeVille(ville), C).map((r) => {
                const def = (C.config.typesHabitation ?? []).find(
                  (d) => d.type === typeVille(ville) && d.rang === r)
                return {
                  value: r,
                  label: def?.cout ? `${r} (${def.cout})` : r,
                }
              })}
              onChange={(v) => setPlayer((x, s) => {
                const ville = x.villes[idx]
                ville.rang = v
                debiterCoutHabitation(s, x, ville, C)
              })}
            />
          </Field>
          <Field label="Type de ville">
            <Select
              value={typeVille(ville)}
              options={[{ value: 'Ville', label: 'Ville (Hameau → Cité → Grande Cité)' }, { value: 'Château', label: 'Château (Motte → Donjon → Forteresse)' }]}
              onChange={(v) => setPlayer((x, s) => {
                const ville = x.villes[idx]
                ville.type = v
                // le rang doit appartenir à l'échelle du nouveau type
                const rangs = rangsDisponibles(v, C)
                if (!rangs.includes(ville.rang ?? '')) ville.rang = rangs[0]
                debiterCoutHabitation(s, x, ville, C)
              })}
            />
          </Field>
        </div>
        {/* Consommation par tour de la ville, en dessous du rang
            (ex. Cité : 10 Nourriture + 8 Or) — débitée
            automatiquement à chaque fin de tour par le moteur. */}
        {(() => {
          const consos = Object.entries(consommationsVille(ville, C))
            .filter(([, v]) => v !== 0)
          const requis = habitationDef(ville, C)?.habitantsRequis ?? 0
          return (
            <div className="small">
              {consos.length > 0 && (
                <>
                  Consommation de la ville :{' '}
                  <span className="neg">
                    {consos.map(([r, v]) => `${fmt(Math.abs(v))} ${r}`).join(' + ')}
                  </span>
                  <span className="muted small"> par tour (débitée automatiquement)</span>
                  {' '}
                </>
              )}
              {requis > 0 && (
                <span className={`small ${nbVivants < requis ? 'neg' : 'muted'}`}>
                  · {fmt(requis)} habitants requis ({nbVivants} vivant(s){nbVivants < requis ? ' — insuffisant' : ''})
                </span>
              )}
            </div>
          )
        })()}

        {/* ── Aménagements et bâtiments CÔTE À CÔTE (densification,
            retour Thibaut 2026-10-14) ── */}
        <div className="ville-constr">
          <div>
        <div className="mini-title">
          Aménagements
          <span className="muted small">
            {' '}· coût : {fmtCout(coutAm)}
            {reducBatisseurs ? ' (réduit par le Camp de bâtisseurs)' : ''}
          </span>
        </div>
        {(ville.amenagements ?? []).length === 0 && <div className="muted small">aucun</div>}
        {(ville.amenagements ?? []).map((a, ai) => {
          const ref = amenagementRef(a, C.config)
          return (
            <div key={ai} className="ligne-construction">
              <span className="badge badge-good">
                {a}
                <button
                  className="badge-x"
                  title="Retirer"
                  onClick={() => setPlayer((x) => {
                    const list = x.villes[idx].amenagements ?? (x.villes[idx].amenagements = [])
                    list.splice(ai, 1)
                  })}
                >×</button>
              </span>
              <span className="muted small" title={ref?.description ?? ''}>
                {ref ? `${resumeConstruction(ref) || ref.production || '—'}${ref.terrain ? ` (${ref.terrain})` : ''}` : '—'}
              </span>
            </div>
          )
        })}
        <div className="add-bat">
          {/* Marqueur (y) : choix à CATÉGORIES + DESCRIPTIONS —
              aménagements classiques. (RETRAIT 2026-10-19, retour
              arbitre : les aménagements de faction ont été retirés
              avec le système de faction.) */}
          <ChoicePicker
            bouton="+ Aménager une case…"
            categories={[
              {
                label: 'Aménagements',
                options: amRefs.map((a) => ({
                  value: a.nom,
                  titre: a.nom,
                  droite: `${fmtCout(parseCoutTexte(a.cout))}${a.terrain ? ` · ${a.terrain}` : ''}`,
                  description: [
                    resumeConstruction(a) || a.production || '',
                    a.description,
                  ].filter(Boolean).join('\n'),
                })),
              },
            ]}
            onPick={(v) => construire(idx, v, 'amenagement')}
          />
        </div>
          </div>
          <div>
        <div className="mini-title">Bâtiments</div>
        {/* Marqueur (a) : garde-fou — une ville sans tableau
            batiments (donnée ancienne) ne doit pas crasher l'affichage. */}
        {(ville.batiments ?? []).length === 0 && <div className="muted small">aucun</div>}
        {(ville.batiments ?? []).map((b, bi) => {
          const ref = refs.find((r) => r.categorie === 'Bâtiment' && r.nom === b)
          const effets = effetsTourBatiment(b, C)
          const garnison = garnisonBatiment(b, C)
          // Pastille colorée par FAMILLE (retour Thibaut, marqueur
          // (r)) : rouge Militaire, jaune Economique, bleu Capitale,
          // blanc Faction, violet Guilde (choix arbitré), défaut
          // gris-bleu pour les bâtiments sans famille.
          const clFam = FAM_BADGES[ref?.famille ?? ''] ?? 'badge-info'
          const resume = [
            resumeConstruction(ref) || ref?.production || '',
            // Garnison déjà incluse dans le résumé structuré ; repli :
            !ref?.effets && garnison > 0 ? `Garnison +${garnison}` : '',
            !ref && Object.keys(effets).length > 0 ? fmtEffets(effets, C) : '',
          ].filter(Boolean).join(' · ')
          return (
            <div key={bi} className="ligne-construction">
              <span className={`badge ${clFam}`} title={ref?.famille ? `Famille : ${ref.famille}` : undefined}>
                {b}
                <button
                  className="badge-x"
                  title="Démolir"
                  onClick={() => setPlayer((x) => { x.villes[idx].batiments.splice(bi, 1) })}
                >×</button>
              </span>
              <span className="muted small" title={ref?.description ?? ''}>
                {resume || '—'}
              </span>
            </div>
          )
        })}
        <div className="add-bat">
          {/* Marqueur (y) : un BOUTON PAR TYPE de bâtiment
              (militaire, économique, guilde, capitale —
              arbitrage Thibaut : les 5 familles existantes) +
              description de chaque bâtiment AVANT le choix. */}
          <ChoicePicker
            bouton="+ Construire…"
            categories={batParFamillePour(ville)}
            onPick={(v) => {
              const [groupe, nom] = v.split('|')
              construire(idx, nom, 'batiment', groupe)
            }}
          />
        </div>
          </div>
        </div>

        {/* ── AUTRES (ressource, source, nombre, bonus) ── */}
        <div className="mini-title">
          Autres
        </div>
        {(ville.autres ?? []).length === 0 && <div className="muted small">aucune</div>}
        {(ville.autres ?? []).map((l, li) => (
          <div key={li} className="autre-ligne">
            <Select
              value={l.ressource}
              options={C.ressources.map((r) => ({ value: r, label: r }))}
              onChange={(v) => setPlayer((x) => { (x.villes[idx].autres ?? (x.villes[idx].autres = []))[li].ressource = v })}
            />
            <TextInput
              value={l.source}
              placeholder="Source (Rivière, Progrès, Régime…)"
              onChange={(v) => setPlayer((x) => { (x.villes[idx].autres ?? (x.villes[idx].autres = []))[li].source = v })}
            />
            <NumberInput
              value={l.nombre} step={1} min={0}
              onChange={(v) => setPlayer((x) => { (x.villes[idx].autres ?? (x.villes[idx].autres = []))[li].nombre = v })}
            />
            <span className="muted">×</span>
            <NumberInput
              value={l.bonus} step={1}
              onChange={(v) => setPlayer((x) => { (x.villes[idx].autres ?? (x.villes[idx].autres = []))[li].bonus = v })}
            />
            <span className="muted small">= {fmt((l.nombre ?? 0) * (l.bonus ?? 0))} / tour</span>
            <button
              className="badge-x"
              title="Retirer"
              onClick={() => setPlayer((x) => {
                const list = x.villes[idx].autres ?? (x.villes[idx].autres = [])
                list.splice(li, 1)
              })}
            >×</button>
          </div>
        ))}
        <div className="add-bat">
          <Button onClick={() => setPlayer((x) => {
            const list = x.villes[idx].autres ?? (x.villes[idx].autres = [])
            list.push({ ressource: 'Nourriture', source: '', nombre: 1, bonus: 1 } as AutreDef)
          })}>+ Ajouter une ligne « Autre »</Button>
        </div>

        {/* Retour Thibaut 2026-10-15 : le tableau récapitulatif des
            taxes (titres × taxes / conso / net) est retiré — le net
            reste visible dans « Production de la ville » ci-dessous et
            dans le récap par tour de la page. */}
        {/* ── Production de la ville : ce qu'elle produit en
            ressources, tous canaux confondus (bâtiments,
            aménagements, autres, villageois, consommation de
            l'habitation) — bas du cadre de chaque ville. ── */}
        {(() => {
          const pv = productionVille(state, p, ville, C)
          // « Nourr - été » (ligne du classeur) : production d'été
          // de la ville, SOURCES SÉPARÉES — aménagements qui ne
          // produisent qu'en été (Champ, Rizière) et lignes
          // « Autres » de ressource « Nourr - été ». Affichée
          // comme LIGNE sous la nourriture, POTENTIEL visible en
          // toute saison (pour planifier), mais créditée au stock
          // de Nourriture UNIQUEMENT en été par le moteur.
          const nEteAm = effetsNourrEteAmenagementsVille(ville, C.config)['Nourriture'] ?? 0
          const nEteAut = effetsNourrEteAutresVille(ville)['Nourriture'] ?? 0
          // ÉTÉ pour TOUTE ressource (revue 2026-10-16) : les effets
          //  marqués été d'une autre ressource sont affichés comme
          //  lignes « <Ressource> - été » au même endroit.
          const eteAutres = (() => {
            const am = effetsNourrEteAmenagementsVille(ville, C.config)
            const au = effetsNourrEteAutresVille(ville)
            const out: Array<[string, number]> = []
            const vus = new Set(['Nourriture'])
            for (const src2 of [am, au]) {
              for (const [res, v] of Object.entries(src2)) {
                if (vus.has(res) || !v) continue
                vus.add(res)
                out.push([res, v])
              }
            }
            return out
          })()
          const nEteTot = nEteAm + nEteAut
          // Retour Thibaut (marqueur (r)) : toutes les ressources,
          // même à production 0 (lignes teintées → lisibles).
          const resV = RESSOURCES_FLUX(C)
          if (resV.length === 0 && nEteTot === 0) {
            return (
              <div className="muted small">
                Cette ville ne produit rien par tour.
              </div>
            )
          }
          // Lignes du tableau : chaque ressource + la ligne
          // « Nourr - été » juste après la Nourriture (ou en
          // première ligne s'il n'y a pas de nourriture générale).
          // Retour Thibaut 2026-10-15 : la ligne « Nourr - été »
          //  est TOUJOURS visible (même à 0) juste sous la
          //  Nourriture, avec un style DISTINCT (badge été).
          const lignesV: Array<{ kind: 'res'; r: string } | { kind: 'ete' } | { kind: 'eteAutre'; r: string }> = []
          let eteInsere = false
          for (const r of resV) {
            lignesV.push({ kind: 'res', r })
            if (r === 'Nourriture') { lignesV.push({ kind: 'ete' }); eteInsere = true }
          }
          if (!eteInsere) lignesV.unshift({ kind: 'ete' })
          // ÉTÉ d'autres ressources (revue 2026-10-16) : une ligne
          //  « <Ressource> - été » après la ressource concernée.
          for (const [res, v] of eteAutres) {
            if (v === 0) continue
            const idx = lignesV.findIndex((l) => l.kind === 'res' && l.r === res)
            if (idx >= 0) lignesV.splice(idx + 1, 0, { kind: 'eteAutre', r: res })
            else lignesV.push({ kind: 'eteAutre', r: res })
          }
          return (
            <div>
              <div className="mini-title">Production de la ville</div>
              <div className="table-wrap">
                <table className="tbl small">
                  <thead>
                    <tr>
                      <th>Ressource</th>
                      <th>Bâtiments</th>
                      <th>Aménagements</th>
                      <th>Autres</th>
                      <th>Villageois</th>
                      <th>Conso. habitation</th>
                      <th>Total / tour</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lignesV.map((l) => {
                      if (l.kind === 'ete') {
                        return (
                          <tr key="nourr-ete" className="ligne-ete"
                            style={{ background: fondRessource('Nourr - été', C) }}>
                            <td>
                              <span className="dot-res dot-ete" style={{ background: couleurRessource('Nourr - été', C) }} />
                              <strong>Nourr - été</strong>{' '}
                              <span className="badge-ete">☀ été</span>
                            </td>
                            <td>—</td>
                            <td>{nEteAm !== 0 ? fmtNum(nEteAm) : '—'}</td>
                            <td>{nEteAut !== 0 ? fmtNum(nEteAut) : '—'}</td>
                            <td>—</td>
                            <td>—</td>
                            <td>
                              <strong>{fmtNum(nEteTot)}</strong>{' '}
                              <span className="muted small">(créditée en été seulement)</span>
                            </td>
                          </tr>
                        )
                      }
                      if (l.kind === 'eteAutre') {
                        const vEte = eteAutres.find(([res2]) => res2 === l.r)?.[1] ?? 0
                        return (
                          <tr key={`ete-${l.r}`} className="ligne-ete"
                            style={{ background: fondRessource(`${l.r} - été`, C) }}>
                            <td>
                              <span className="dot-res dot-ete" style={{ background: couleurRessource(l.r, C) }} />
                              <strong>{l.r} - été</strong>{' '}
                              <span className="badge-ete">☀ été</span>
                            </td>
                            <td>—</td>
                            <td>—</td>
                            <td>—</td>
                            <td>—</td>
                            <td>—</td>
                            <td>
                              <strong>{fmtNum(vEte)}</strong>{' '}
                              <span className="muted small">(créditée en été seulement)</span>
                            </td>
                          </tr>
                        )
                      }
                      const r = l.r
                      const col = (d: Record<string, number>) =>
                        (d[r] ?? 0) === 0 ? '—' : fmtNum(d[r] ?? 0)
                      const t = pv.total[r] ?? 0
                      return (
                        <tr key={r} style={{ background: fondRessource(r, C) }}>
                          <td>
                            <span className="dot-res" style={{ background: couleurRessource(r, C) }} />
                            <strong>{r}</strong>
                          </td>
                          <td>{col(pv.batiments)}</td>
                          <td>{col(pv.amenagements)}</td>
                          <td>{col(pv.autres)}</td>
                          <td>{col(pv.habitants)}</td>
                          <td className={(pv.consoVille[r] ?? 0) < 0 ? 'neg' : ''}>
                            {col(pv.consoVille)}
                          </td>
                          <td className={t < 0 ? 'neg' : ''}><strong>{fmtNum(t)}</strong></td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )
        })()}

      </div>
  )
}
