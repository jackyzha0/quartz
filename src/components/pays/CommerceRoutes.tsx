// ══════════════════════════════════════════════════════════════════════
//  Commerce (marqueur (t)) : routes commerciales des marchands — un
//  marchand = UNE route (sa ville ↔ ville d'un autre joueur),
//  +marchandOrTour Or pour les deux joueurs + copie de l'aménagement
//  ENTIER (marqueur (u)). Le formulaire d'ouverture et son état vivent
//  ici. (Extrait de PlayerView.tsx — un fichier par UI.)
// ══════════════════════════════════════════════════════════════════════

import { useState } from 'react'
import type { Player } from '../../engine/types'
import { useGame } from '../../state/store'
import {
  routesCommerceDe, routesCommerceVers, marchandsDe, maxMarchandsJoueur,
  amenagementsCopiables, ressourcesCopiables, fullName,
  changerCopieRoute, supprimerRouteCommerce, creerRouteCommerce,
} from '../../engine/engine'
import type { Cfg } from '../../engine/gameData'
import { Card, Badge, Select, Button, fmt } from '../ui'
import { Field } from './pays-utils'

export function CommerceRoutes({ p, C }: { p: Player; C: Cfg }) {
  const { state, update } = useGame()
  // ── Commerce (marqueur (t)) : formulaire d'ouverture d'une route
  //    commerciale — marchand libre, joueur/ville ciblés, aménagement
  //    copié (marqueur (u) : aménagement ENTIER). ────────────────────
  const [rcMarchand, setRcMarchand] = useState('')
  const [rcJoueur, setRcJoueur] = useState('')
  const [rcVille, setRcVille] = useState('')
  const [rcAmen, setRcAmen] = useState('')
  const [rcErr, setRcErr] = useState<string | null>(null)
  // Garde-fou type : PlayerView ne rend cette carte QUE si une partie
  //  est chargée (state non-null côté App).
  if (!state) return null
  return (
    <Card title="Commerce — routes des marchands">
      {(() => {
        const mes = routesCommerceDe(state, p.n)
        const entrantes = routesCommerceVers(state, p.n)
        const libres = marchandsDe(state, p.n)
          .filter((c) => !mes.some((r) => r.marchandId === c.id))
        // Options du formulaire (cascade joueur → ville →
        // aménagement copiable) + VALEURS EFFECTIVES : l'état OU la
        // première option — correctif (u) du bug « Marchand
        // introuvable » (les Selects contrôlés jamais touchés
        // gardaient '' comme valeur).
        const autresJoueurs = state.players.filter((q) => q.n !== p.n)
        const mEff = rcMarchand ?? ''
        const jEff = rcJoueur || String(autresJoueurs[0]?.n ?? '')
        const joueurCibleForm = state.players.find((q) => String(q.n) === jEff)
        const vEff = rcVille || joueurCibleForm?.villes[0]?.nom || ''
        const villeCibleForm = joueurCibleForm?.villes.find((v) => v.nom === vEff)
        const amenForm = villeCibleForm ? amenagementsCopiables(villeCibleForm, C.config) : []
        const aEff = rcAmen || amenForm[0] || ''
        const cap = maxMarchandsJoueur(p, C)
        const nbMarchands = marchandsDe(state, p.n).length
        const nbRoutes = mes.length
        return (
          <>
            <p className="small">
              <Badge tone={nbRoutes > cap ? 'warn' : 'good'}>
                {nbMarchands} marchand(s) · {nbRoutes} route(s) ouverte(s) · cap conseillé : {cap}
              </Badge>{' '}
              <span className="muted small">
                Les marchands sont nommés automatiquement. Le cap est indicatif —
                tu peux ouvrir autant de routes que tu veux (dépassement annoncé au journal).
              </span>
            </p>
            {mes.length === 0 && entrantes.length === 0 && (
              <p className="muted">
                Aucune route commerciale. Les marchands sont nommés
                automatiquement (comme les soldats et professeurs) : ouvre
                une route vers la ville d'un autre joueur — chaque tour, les
                deux joueurs reliés gagnent {fmt(C.p.marchandOrTour)} Or et
                ton marchand copie la production entière d'un aménagement de
                la ville ciblée.
              </p>
            )}
            {mes.length > 0 && (
              <div className="table-wrap">
                <table className="tbl small">
                  <thead>
                    <tr>
                      <th>Marchand (sa ville)</th>
                      <th>Ville ciblée</th>
                      <th>Aménagement copié</th>
                      <th>Gain / tour</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {mes.map((route) => {
                      const m = (state.population[p.n] ?? []).find((c) => c.id === route.marchandId)
                      const cible = state.players.find((q) => q.n === route.joueurCible)
                      const villeCible = cible?.villes.find((v) => v.nom === route.villeCible)
                      const amenList = villeCible ? amenagementsCopiables(villeCible, C.config) : []
                      const copList = ressourcesCopiables(route.amenagement, C.config)
                      return (
                        <tr key={route.id}>
                          <td>
                            <strong>{m ? fullName(m) : '—'}</strong>
                            <br />
                            <span className="muted small">{m?.ville ?? '—'}</span>
                          </td>
                          <td>↔ <strong>{route.villeCible}</strong><br /><span className="muted small">{cible?.nom ?? '?'}</span></td>
                          <td>
                            <Select
                              value={route.amenagement}
                              options={amenList.map((a) => ({ value: a, label: a }))}
                              onChange={(v) => {
                                let err: string | null = null
                                update((s) => { err = changerCopieRoute(s, route.id, v) })
                                setRcErr(err)
                              }}
                            />
                          </td>
                          <td className="small">
                            +{fmt(C.p.marchandOrTour)} Or
                            {copList.map((x, i) => (
                              (!x.ete || state.saison === 'Été')
                                ? <div key={i}>+{fmt(x.valeur)} {x.ressource}</div>
                                : <div key={i} className="muted">+{fmt(x.valeur)} {x.ressource} (uniquement en été — rien en hiver)</div>
                            ))}
                          </td>
                          <td>
                            <Button tone="danger" title="Fermer la route" onClick={() => {
                              let err: string | null = null
                              update((s) => { err = supprimerRouteCommerce(s, route.id) })
                              setRcErr(err)
                            }}>✕</Button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )}
            {entrantes.length > 0 && (
              <p className="small">
                <strong>Routes entrantes</strong> — tu encaisses
                +{fmt(C.p.marchandOrTour)} Or / tour par route :
                {' '}
                {entrantes.map((route) => {
                  const m = (state.population[route.joueur] ?? []).find((c) => c.id === route.marchandId)
                  const prop = state.players.find((q) => q.n === route.joueur)
                  return `${m?.ville ?? '?'} (${prop?.nom ?? '?'}) → ${route.villeCible}`
                }).join(' · ')}
              </p>
            )}
            {true ? (
              <div className="filters" style={{ alignItems: 'flex-end', flexWrap: 'wrap' }}>
                <Field label="Marchand">
                  <Select
                    value={mEff}
                    options={[
                      { value: '', label: '— Automatique (un roturier sera promu)' },
                      ...libres.map((c) => ({ value: c.id, label: `${fullName(c)} (${c.ville})` })),
                    ]}
                    onChange={setRcMarchand}
                  />
                </Field>
                <Field label="Joueur ciblé">
                  <Select value={jEff} options={autresJoueurs.map((q) => ({ value: String(q.n), label: q.nom }))} onChange={(v) => { setRcJoueur(v); setRcVille(''); setRcAmen('') }} />
                </Field>
                <Field label="Ville ciblée">
                  <Select value={vEff} options={(joueurCibleForm?.villes ?? []).map((v) => ({ value: v.nom, label: v.nom }))} onChange={(v) => { setRcVille(v); setRcAmen('') }} />
                </Field>
                <Field label="Aménagement copié (production entière)">
                  <Select value={aEff} options={amenForm.map((a) => ({ value: a, label: a }))} onChange={setRcAmen} />
                </Field>
                <Button onClick={() => {
                  let err: string | null = null
                  update((s) => { err = creerRouteCommerce(s, p.n, mEff, Number(jEff), vEff, aEff) })
                  setRcErr(err)
                  if (!err) { setRcMarchand(''); setRcJoueur(''); setRcVille(''); setRcAmen('') }
                }}>Ouvrir la route</Button>
              </div>
            ) : (
              <p className="muted small">
                Aucun marchand titré pour l'instant — laisse « — Automatique » :
                un roturier de ta population recevra le titre de Marchand en
                ouvrant la route.
              </p>
            )}
            {rcErr && <p className="small" style={{ color: '#E74C3C', marginBottom: 0 }}>{rcErr}</p>}
          </>
        )
      })()}
    </Card>
  )
}
