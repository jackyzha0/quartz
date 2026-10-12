// ══════════════════════════════════════════════════════════════════════
//  Page « Royaume » (par joueur) :
//   · cadre « Joueur N » : identité éditable du pays (nom, peuple,
//     culture, régime) — déplacé ici depuis la page « Pays »,
//   · culture du pays (celle de la capitale) : hérédité, martialité,
//     mariages homosexuels, règle de pays & règle de personnage, et
//     GARNISON DES HABITATIONS notée sous la culture (bâtiments + loi
//     du régime),
//   · régime politique : loi (les lois chiffrées du référentiel sont
//     appliquées automatiquement à chaque fin de tour),
//   · rang de pays (Féodal / Républicain — feuille « Pays » du classeur),
//   · personnages importants : Dirigeant, Héritier, Professeurs,
//     Commandants, famille royale,
//   · vassaux : prêt de serment à un autre joueur, tribut automatique
//     (paramètre vassalPrelevement, appliqué en fin de tour par le moteur).
//  Les technologies (feuille « Progrès ») sont retirées de cette page —
//  elles restent consultables dans « 📚 Référentiels » → « Progrès ».
// ══════════════════════════════════════════════════════════════════════

import React from 'react'
import { useGame } from '../state/store'
import type { Character, Player } from '../engine/types'
import { cfgOf, cultureDef } from '../engine/gameData'
import { rangParDefaut } from '../engine/setup'
import { garnisonHabitationsPays } from '../engine/engine'
import { Card, Select, TextInput, Button, Badge, Field, fmt } from './ui'

export function RoyaumeView({ joueur }: { joueur: number }) {
  const { state, update } = useGame()
  if (!state) return null
  const C = cfgOf(state.config)
  const p = state.players.find((x) => x.n === joueur)
  if (!p) return <Card>Joueur introuvable.</Card>

  const pop = state.population[p.n] ?? []
  const vivants = pop.filter((c) => c.statut !== 'Décédé')

  const setPlayer = (fn: (p: Player) => void) =>
    update((s) => {
      const target = s.players.find((x) => x.n === joueur)
      if (target) fn(target)
    })

  // ── Identité ──────────────────────────────────────────────────────────
  const cult = cultureDef(p.culture, C.config)
  const regimeDef = C.regimes.find((r) => r.nom === p.regime)
  const rangs = C.config.paysRangs ?? []
  const rangActuel = p.rang ?? rangParDefaut(p.regime, C)
  const rangDef = rangs.find((r) => r.nom === rangActuel)
  const garnisonHab = garnisonHabitationsPays(p, C)
  // Loi chiffrée du régime (appliquée automatiquement par le moteur) ?
  const loiChiffree = (regimeDef?.garnisonParRang ?? 0) !== 0
    || (regimeDef?.nourrEteChampRiziere ?? 0) !== 0

  // ── Personnages importants ───────────────────────────────────────────
  const dirigeant = vivants.find((c) => c.titre === C.p.titreDirigeant)
  const heritier = vivants.find((c) => c.titre === C.p.titreHeritierStr)
  const professeurs = vivants.filter((c) => c.titre === C.p.titreProfesseur)
  const commandants = vivants.filter((c) => c.titre === C.p.titreCommandant)
  // Famille royale = vivants de la dynastie du Dirigeant (ou de la carte
  // dynastie en cours s'il n'y a pas de Dirigeant), roturiers exclus.
  const dynRoyale = dirigeant?.dynastie ?? p.dynastie?.nom ?? null
  const familleRoyale = dynRoyale && dynRoyale !== C.p.dynastieRoturier
    ? vivants.filter((c) => c.dynastie === dynRoyale)
    : []

  // ── Vassalité ────────────────────────────────────────────────────────
  /** Chaîne des suzerains au-dessus d'un joueur (sans boucle infinie). */
  const chaineSuz = (n: number): Player[] => {
    const out: Player[] = []
    const vus = new Set<number>([n])
    let cur = state.players.find((x) => x.n === n)
    while (cur && cur.vassalDe != null && !vus.has(cur.vassalDe)) {
      const s = state.players.find((x) => x.n === cur!.vassalDe)
      if (!s) break
      out.push(s)
      vus.add(s.n)
      cur = s
    }
    return out
  }
  const suzerain = p.vassalDe != null ? state.players.find((x) => x.n === p.vassalDe) : undefined
  const vassaux = state.players.filter((q) => q.vassalDe === p.n)
  const pct = Math.round(C.p.vassalPrelevement * 100)

  const preterSerment = (suzerainN: number) =>
    update((s) => {
      const t = s.players.find((x) => x.n === joueur)
      const suz = s.players.find((x) => x.n === suzerainN)
      if (!t || !suz) return
      t.vassalDe = suzerainN
      s.log.push({
        turn: s.turn, type: 'Système', joueur: t.n,
        texte: `🤝 ${t.nom} prête serment à ${suz.nom} et devient son vassal : il lui reverse ${pct} % des revenus de ses habitants à chaque fin de tour.`,
      })
    })

  const rompreSerment = () =>
    update((s) => {
      const t = s.players.find((x) => x.n === joueur)
      if (!t) return
      const ancien = s.players.find((x) => x.n === t.vassalDe)
      t.vassalDe = null
      s.log.push({
        turn: s.turn, type: 'Système', joueur: t.n,
        texte: `⚔ ${t.nom} rompt son serment de vassalité${ancien ? ` envers ${ancien.nom}` : ''}.`,
      })
    })

  // Candidates au serment : tous les autres joueurs, sauf ceux dont la
  // chaîne de suzerains passe par ce joueur (ça créerait un cycle).
  const candidats = state.players.filter((q) => {
    if (q.n === p.n) return false
    if (q.vassalDe === p.n) return false
    return !chaineSuz(q.n).some((x) => x.n === p.n)
  })

  const pers = (c: Character) => `${c.prenom} ${c.nom} (${c.age} ans${c.ville ? `, ${c.ville}` : ''})`

  return (
    <div className="stack">
      {/* ═══ Cadre « Joueur N » — identité éditable (déplacé de « Pays ») ═══ */}
      <Card
        title={`Joueur ${p.n} — ${p.nom}`}
        right={<span className="muted small">{p.peuple} · {p.villes.length} ville(s)</span>}
      >
        <div className="grid-2">
          <Field label="Nom du joueur">
            <TextInput value={p.nom} onChange={(v) => setPlayer((x) => { x.nom = v })} />
          </Field>
          <Field label="Peuple (faction du classeur)">
            <Select
              value={p.peuple}
              options={C.peuples.map((n) => ({ value: n, label: n }))}
              onChange={(v) => setPlayer((x) => { x.peuple = v })}
            />
          </Field>
          <Field label="Culture du pays (capitale)">
            <Select
              value={p.culture}
              options={C.cultures.map((c) => ({
                value: c.nom, label: `${c.nom} (hérédité ${String(c.heredite).toLowerCase()})`,
              }))}
              onChange={(v) => setPlayer((x) => { x.culture = v })}
            />
          </Field>
          <Field label="Régime politique">
            <Select
              value={p.regime}
              options={C.regimes.map((r) => ({ value: r.nom, label: r.nom }))}
              onChange={(v) => setPlayer((x) => { x.regime = v })}
            />
          </Field>
        </div>
      </Card>

      {/* ═══ Culture, régime, rang, dynastie ═══ */}
      <Card title={`🏰 Royaume de ${p.nom}`}>
        <div className="grid-2">
          <div className="mini">
            <div className="mini-title">Culture du pays (capitale)</div>
            <div><strong>{p.culture}</strong></div>
            {cult && (
              <>
                <div className="muted small">
                  Hérédité {String(cult.heredite).toLowerCase()} ·
                  maritalité {String(cult.martialite).toLowerCase()} ·
                  mariage homosexuel {cult.homoAutorisee ? 'autorisé' : 'interdit'}
                </div>
                <div className="small">
                  Garnison des habitations :{' '}
                  <strong>+{fmt(garnisonHab)}</strong>{' '}
                  <span className="muted">(bâtiments + loi du régime)</span>
                </div>
                {cult.reglePays && <div className="small muted">Règle de pays : {cult.reglePays}</div>}
                {cult.reglePerso && <div className="small muted">Règle de personnage : {cult.reglePerso}</div>}
              </>
            )}
          </div>
          <div className="mini">
            <div className="mini-title">Régime politique</div>
            <div><strong>{p.regime}</strong></div>
            {regimeDef && (
              <>
                <div className="muted small">Loi : {regimeDef.loi}</div>
                {loiChiffree && (
                  <div className="small">
                    <Badge tone="good">loi chiffrée appliquée automatiquement</Badge>{' '}
                    <span className="muted small">
                      (canal « régimes & cultures » du récap ressources)
                    </span>
                  </div>
                )}
              </>
            )}
          </div>
          <div className="mini">
            <div className="mini-title">Rang de pays</div>
            <Select
              value={rangActuel}
              options={rangs.map((r) => ({ value: r.nom, label: `${r.bloc} — ${r.nom}` }))}
              onChange={(v) => setPlayer((x) => { x.rang = v })}
            />
            {rangDef && (
              <div className="muted small">
                {rangDef.cout ? <>Coût : {rangDef.cout} · </> : null}
                Bonus : {rangDef.bonus} · Succession : {rangDef.succession}
              </div>
            )}
          </div>
          <div className="mini">
            <div className="mini-title">Dynastie régnante</div>
            <div><strong>{p.dynastie ? p.dynastie.nom : '—'}</strong></div>
            {p.dynastie && <div className="muted small">{p.dynastie.description}</div>}
          </div>
        </div>
      </Card>

      {/* ═══ Personnages importants ═══ */}
      <Card title="👤 Personnages importants">
        <div className="table-wrap">
          <table className="tbl">
            <thead>
              <tr><th>Rôle</th><th>Personnage</th><th>Titre</th><th>Ville</th></tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>{C.p.titreDirigeant}</strong></td>
                <td>{dirigeant ? pers(dirigeant) : <span className="neg">poste vacant</span>}</td>
                <td>{dirigeant?.titre ?? '—'}</td>
                <td>{dirigeant?.ville ?? '—'}</td>
              </tr>
              <tr>
                <td><strong>{C.p.titreHeritierStr}</strong></td>
                <td>{heritier ? pers(heritier) : <span className="muted">aucun</span>}</td>
                <td>{heritier?.titre ?? '—'}</td>
                <td>{heritier?.ville ?? '—'}</td>
              </tr>
              <tr>
                <td><strong>{C.p.titreProfesseur}s</strong> ({professeurs.length})</td>
                <td>{professeurs.length ? professeurs.map(pers).join(' · ') : <span className="muted">aucun</span>}</td>
                <td>—</td>
                <td>—</td>
              </tr>
              <tr>
                <td><strong>{C.p.titreCommandant}s</strong> ({commandants.length})</td>
                <td>{commandants.length ? commandants.map(pers).join(' · ') : <span className="muted">aucun</span>}</td>
                <td>—</td>
                <td>—</td>
              </tr>
              <tr>
                <td><strong>Famille royale</strong> ({familleRoyale.length})
                  <div className="muted small">dynastie {dynRoyale ?? '—'}</div>
                </td>
                <td colSpan={3}>
                  {familleRoyale.length
                    ? familleRoyale.map((c) => (
                      <span key={c.id} className="badge badge-info" style={{ marginRight: 4 }}>
                        {pers(c)}{c.titre ? ` — ${c.titre}` : ''}
                      </span>
                    ))
                    : <span className="muted">aucun membre vivant</span>}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>

      {/* ═══ Vassaux & serments ═══ */}
      <Card title="🤝 Vassalité">
        <div className="grid-2">
          <div className="mini">
            <div className="mini-title">Serment de ce pays</div>
            {suzerain ? (
              <>
                <div>
                  Vassal de <strong>{suzerain.nom}</strong>{' '}
                  <Badge tone="warn">reverse {pct} % des revenus de ses habitants</Badge>
                </div>
                {chaineSuz(p.n).length > 1 && (
                  <div className="muted small">
                    Chaîne de suzerains : {chaineSuz(p.n).map((s) => s.nom).join(' → ')}
                  </div>
                )}
                <Button tone="danger" onClick={rompreSerment}>Rompre le serment</Button>
              </>
            ) : (
              <>
                <div className="muted small">
                  Ce pays est indépendant. Il peut prêter serment à un autre joueur
                      et devient alors son vassal : à chaque fin de tour il lui reverse {' '}{pct} % des revenus d'Or de ses habitants (paramètre modifiable
                      dans l'onglet « 🎛 Paramètres », groupe « Vassaux »).
                </div>
                <Select
                  value=""
                  options={[
                    { value: '', label: 'Prêter serment à…' },
                    ...candidats.map((q) => ({ value: String(q.n), label: `${q.nom} (J${q.n})` })),
                  ]}
                  onChange={(v) => v && preterSerment(parseInt(v, 10))}
                />
                {candidats.length === 0 && (
                  <div className="muted small">Aucun joueur disponible (serments croisés interdits).</div>
                )}
              </>
            )}
          </div>
          <div className="mini">
            <div className="mini-title">Vassaux de ce pays ({vassaux.length})</div>
            {vassaux.length === 0 && <div className="muted small">Aucun vassal.</div>}
            {vassaux.map((v) => (
              <div key={v.n}>
                <strong>{v.nom}</strong> <Badge tone="good">+{pct} % de ses revenus d'habitants</Badge>
                <div className="muted small">
                  Rang : {v.rang ?? rangParDefaut(v.regime, C)}
                  {chaineSuz(v.n).length > 1 && <> · sa chaîne : {chaineSuz(v.n).map((s) => s.nom).join(' → ')}</>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  )
}
