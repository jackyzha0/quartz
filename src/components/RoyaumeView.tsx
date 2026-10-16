// ══════════════════════════════════════════════════════════════════════
//  Page « Royaume » (par joueur) :
//   · cadre « Joueur N » : identité éditable du pays (nom, peuple,
//     culture, régime) — déplacé ici depuis la page « Pays »,
//   · culture du pays (celle de la capitale) : hérédité, martialité,
//     mariages homosexuels, règle de pays & règle de personnage
//     (la garnison des habitations n'est PAS affichée ici — valeur
//     d'état consultable sur la page Joueur, avec son décompte détaillé),
//   · régime politique : loi (les lois chiffrées du référentiel sont
//     appliquées automatiquement à chaque fin de tour),
//   · rang de pays (Féodal / Républicain — feuille « Pays » du classeur),
//   · événement de dynastie : carte tirée au hasard à CHAQUE tour
//     (ce n'est pas la famille au pouvoir),
//   · vassaux : prêt de serment à un autre joueur, tribut automatique
//     (paramètre vassalPrelevement, appliqué en fin de tour par le moteur),
//   · personnages importants : Dirigeant, Héritier, Professeurs,
//     Commandants, famille royale,
//   · faction du peuple : fiche complète (victoire désactivée,
//     bâtiment de faction, 2 règles de base) et choix manuel de la
//     règle d'Âge II puis d'Âge III (une seule parmi les trois —
//     la montée d'âge n'est pas automatisée ; les parties chiffrées
//     des règles actives sont appliquées automatiquement).
//  L'arbre généalogique de la famille dirigeante est affiché sur la
//  page « Population ». Les technologies (feuille « Progrès ») sont
//  retirées de cette page — elles restent consultables dans
//  « 📚 Référentiels » → « Progrès ».
// ══════════════════════════════════════════════════════════════════════

import React from 'react'
import { useGame } from '../state/store'
import type { Character, Player } from '../engine/types'
import { cfgOf, cultureDef } from '../engine/gameData'
import { detailsFaction } from '../engine/factions'
import { statutFaction, pastilleClass } from '../engine/statutAuto'
import { rangParDefaut } from '../engine/setup'
import { citesSuzerainesDe, sermentsPossedes, facteurSacre } from '../engine/engine'
import { Card, Select, TextInput, Button, Badge, Field } from './ui'

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
  const rangActuel = rangs.some((r) => r.nom === p.rang)
    ? (p.rang as string)
    : rangParDefaut(p.regime, C)
  const rangDef = rangs.find((r) => r.nom === rangActuel)
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
                  martialité {String(cult.martialite).toLowerCase()} ·
                  mariage homosexuel {cult.homoAutorisee ? 'autorisé' : 'interdit'}
                </div>
                {cult.reglePays && <div className="small muted">Règle de pays : {cult.reglePays}</div>}
                {cult.reglePerso && <div className="small muted">Règle de personnage : {cult.reglePerso}</div>}
                <div className="muted small">
                  Ce que fait la culture : l'hérédité et la martialité règlent la
                  transmission des titres et l'armée ; la fécondité influe sur les
                  naissances ; les mariages homosexuels (si autorisés) permettent des
                  unions de même sexe (sans conception) ; la règle de pays et les lois
                  chiffrées sont appliquées automatiquement à chaque fin de tour.
                </div>
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
              options={rangs.map((r) => ({ value: r.nom, label: r.nom }))}
              onChange={(v) => setPlayer((x) => { x.rang = v })}
            />
            <div className="muted small">
              Correction manuelle (arbitre) — pour une montée réglée, utilisez le sacre.
            </div>
            {rangDef && (
              <div className="muted small">
                Conseil : {rangDef.ministres} Ministre(s)
                {rangDef.bonus ? <> · Bonus : {rangDef.bonus}</> : null}
              </div>
            )}
            {(() => {
              const idxRang = rangs.findIndex((r) => r.nom === rangActuel)
              const next = rangs[idxRang + 1]
              if (!next) {
                return <div className="muted small">Rang maximal de l'échelle atteint.</div>
              }
              const nbSer = sermentsPossedes(state, p)
              const orDispo = p.resources['Or']?.stock ?? 0
              const nourrDispo = p.resources['Nourriture']?.stock ?? 0
              const okSer = nbSer >= (next.serments ?? 0)
              // Chancelier de justice (ministère) : −25 % sur le coût du
              // sacre (refonte 2026-10-14, appliqué au débit comme à l'affichage).
              const fS = facteurSacre(state, p)
              const orSacre = Math.floor((next.coutOr ?? 0) * fS)
              const nourrSacre = Math.floor((next.coutNourriture ?? 0) * fS)
              const okOr = orDispo >= orSacre
              const okN = nourrDispo >= nourrSacre
              return (
                <div style={{ marginTop: 8 }}>
                  <div className="muted small">
                    Prochain rang : <strong>{next.nom}</strong> — sacre {orSacre} Or + {nourrSacre} Nourriture{fS < 1 ? ' (Chancelier de justice : −25 %)' : ''} ·
                    {' '}{next.serments} serment(s) requis (vous en possédez {nbSer}) · conseil {next.ministres} Ministres.
                  </div>
                  {!okSer && (
                    <div className="muted small">
                      ⚠ Un serment = un vassal ou une cité libre sous votre suzeraineté.
                    </div>
                  )}
                  <Button
                    disabled={!okSer || !okOr || !okN}
                    onClick={() => update((s) => {
                      const t = s.players.find((x) => x.n === joueur)
                      if (!t) return
                      const or = t.resources['Or']
                      if (or) or.stock -= orSacre
                      const nourr = t.resources['Nourriture']
                      if (nourr) nourr.stock -= nourrSacre
                      t.rang = next.nom
                      s.log.push({
                        turn: s.turn, type: 'Système', joueur: t.n,
                        texte: `👑 Sacre : ${t.nom} devient ${next.nom} (sacre payé : ${orSacre} Or + ${nourrSacre} Nourriture${fS < 1 ? ' — Chancelier de justice : −25 %' : ''} ; conseil élargi à ${next.ministres} Ministres).`,
                      })
                    })}
                  >
                    ⬆ Sacre : devenir {next.nom}
                  </Button>
                  {(!okOr || !okN) && (
                    <div className="muted small">
                      Trésor insuffisant ({orDispo} Or, {nourrDispo} Nourriture).
                    </div>
                  )}
                </div>
              )
            })()}
          </div>
          <div className="mini">
            <div className="mini-title">Événement de dynastie</div>
            <div><strong>{p.dynastie ? p.dynastie.nom : '—'}</strong></div>
            {p.dynastie && <div className="muted small">{p.dynastie.description}</div>}
            <div className="muted small">
              Carte tirée au hasard à CHAQUE tour parmi les dynasties du
              référentiel — ce n'est pas la famille au pouvoir (voir
              « Personnages importants » pour la famille royale).
            </div>
          </div>
        </div>
      </Card>

      {/* ═══ Faction : bonus du peuple choisi ═══ */}
      <CardFaction joueur={joueur} />

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
            {(() => {
              const cites = citesSuzerainesDe(state, p)
              return (
                <div style={{ marginTop: 8 }}>
                  <div className="mini-title">🗼 Cités libres sous suzeraineté ({cites.length})</div>
                  {cites.length === 0
                    ? <div className="muted small">Aucune — atteindre 3 émissaires auprès d'une cité libre (onglet « 🗼 Cités libres ») pour devenir son suzerain (voie Diplomatique : 3 cités).</div>
                    : cites.map((c) => (
                      <div key={c.nom} className="muted small">
                        <strong>{c.nom}</strong> — verse ses taxes à chaque fin de tour
                        (Chasseurs ×2 Nourriture, canal « Cités libres »).
                      </div>
                    ))}
                </div>
              )
            })()}
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

    </div>
  )
}


// ══════════════════════════════════════════════════════════════════════
//  Cadre « Faction » : fiche du peuple choisi par le joueur — victoire
//  de faction (désactivée), bâtiment/aménagement de faction, 2 règles
//  de base, puis les 3 règles d'Âge II et les 3 règles d'Âge III sur
//  UNE LIGNE : le joueur clique sur celle qu'il prend à la montée
//  d'âge (choix stocké sur le joueur ; la montée d'âge n'est pas
//  automatisée). Les parties chiffrées des règles ACTIVES sont
//  appliquées automatiquement à chaque fin de tour (engine/factions.ts,
//  canal « Faction » du récap ressources) ; les règles qui dépendent
//  du plateau (PM, émissaires, influence…) restent manuelles.
// ══════════════════════════════════════════════════════════════════════

function CardFaction({ joueur }: { joueur: number }) {
  const { state, update } = useGame()
  if (!state) return null
  const C = cfgOf(state.config)
  const p = state.players.find((x) => x.n === joueur)
  if (!p) return null
  const fiche = [...C.config.peuplesLibres, ...C.config.peuplesAutres].find((f) => f.nom === p.peuple)
  if (!fiche) return null

  // Détail des règles ACTIVES (base + âges choisis) : part automatisée
  // (flux par tour / garnison, valeurs calculées) ou « manuel ».
  const details = detailsFaction(state, p, C)
  const autoDe = (source: 'Base' | 'Âge II' | 'Âge III', nom: string) =>
    details.find((d) => d.source === source && d.nom === nom)
  const fluxTotal: Record<string, number> = {}
  for (const d of details) {
    for (const [res, v] of Object.entries(d.flux)) fluxTotal[res] = (fluxTotal[res] ?? 0) + v
  }
  const fluxActifs = Object.entries(fluxTotal).filter(([, v]) => v !== 0)
  const avecGarnison = details.some((d) => d.garnison)

  const choisir = (age: 2 | 3, nom: string) =>
    update((s) => {
      const t = s.players.find((x) => x.n === joueur)
      if (!t) return
      const cur = age === 2 ? t.regleAge2 : t.regleAge3
      if (age === 2) t.regleAge2 = cur === nom ? null : nom
      else t.regleAge3 = cur === nom ? null : nom
      // Basiléens « Suzeraineté » (Âge III, revue 2026-10-15) :
      //  la capitale reçoit immédiatement 150 habitants à l'ACTIVATION
      //  de la règle (+1 ministre : déjà dans le plafond, PopulationTable).
      // Elfes d'Or « Savoir ancestral » (Âge II) : découvrir
      //  immédiatement 2 progrès d'un même arbre (a1+a2 du 1er
      //  arbre d'âge 1 encore disponible).
      if (age === 2 && cur !== nom && nom === 'Savoir ancestral' && t.peuple === "ELFES D'OR") {
        const arbres = cfgOf(s.config).config.progres
        const set = new Set(t.progresDebloques ?? [])
        const ai = arbres.findIndex((a, idx) =>
          a.age === 1 && !set.has(`${idx}:a1`) && (a.brancheA?.[0]?.nom ?? '') !== '')
        if (ai >= 0) {
          ;(t.progresDebloques ?? (t.progresDebloques = [])).push(`${ai}:a1`, `${ai}:a2`)
          s.log.push({
            turn: s.turn, type: 'Système', joueur: t.n,
            texte: `🔬 Savoir ancestral — ${t.nom} découvre « ${arbres[ai].brancheA[0].nom} » et « ${arbres[ai].brancheA[1]?.nom ?? '?'} ».`,
          })
        }
      }
      // Sylvains « Savoir ancestral » (Âge III) : +10 Science
      //  immédiatement par apiculture déjà possédée.
      if (age === 3 && cur !== nom && nom === 'Savoir ancestral' && t.peuple === 'Sylvains') {
        let nbApi = 0
        for (const v of t.villes) nbApi += (v.amenagements ?? []).filter((a) => a === 'Apiculture').length
        const rs = t.resources['Science']
        if (rs && nbApi > 0) rs.stock += 10 * nbApi
        if (nbApi > 0) {
          s.log.push({
            turn: s.turn, type: 'Système', joueur: t.n,
            texte: `🔬 Savoir ancestral — ${t.nom} gagne ${10 * nbApi} Science (${nbApi} apiculture(s)).`,
          })
        }
      }
      if (age === 3 && cur !== nom && nom === 'Suzeraineté' && t.peuple === 'Basiléens') {
        const cap = t.villes[0]
        if (cap) {
          const rs = t.resources['Habitants']
          if (rs) rs.stock += 150
          s.log.push({
            turn: s.turn, type: 'Système', joueur: t.n,
            texte: `🏔 ${t.nom} active « Suzeraineté » — ${cap.nom} reçoit 150 habitants (+1 ministre).`,
          })
        }
      }
    })

  // Badge « ✓ auto » / « manuel » d'une règle active.
  // Retour Thibaut 2026-10-15 : pastille VERT (auto) / JAUNE (automatisable,
  //  pas encore codé) / ROUGE (impossible — plateau) sur chaque règle.
  const badgeAuto = (d: { auto: string | null } | undefined, nom: string) => {
    if (!d) return null
    const st = statutFaction(p.peuple, nom)
    return (
      <span className={pastilleClass(st)} title={
        st === 'auto' ? 'Appliquée automatiquement par le moteur'
        : st === 'possible' ? 'Automatisable — pas encore codée, à gérer au plateau'
        : 'Impossible à automatiser (plateau / non modélisé)'
      } />
    )
  }

  const ligneAge = (label: string, regles: { nom: string; texte: string }[] | undefined, choisie: string | null | undefined, age: 2 | 3) => (
    <div className="stack small-gap">
      <div className="frule-age">
        <strong>{label}</strong>
        <span className="muted small">
          — choisissez la règle prise à la montée d'âge (clic pour sélectionner / annuler)
        </span>
        {choisie && <span className="badge badge-good">choisie : {choisie}</span>}
      </div>
      <div className="frule-row">
        {(regles ?? []).map((r) => {
          const d = choisie === r.nom ? autoDe(age === 2 ? 'Âge II' : 'Âge III', r.nom) : undefined
          return (
            <button
              key={r.nom}
              className={`frule ${choisie === r.nom ? 'frule-selected' : ''}`}
              onClick={() => choisir(age, r.nom)}
              title={choisie === r.nom ? 'Règle choisie — cliquer pour annuler' : 'Choisir cette règle'}
            >
              <div className="frule-title">{r.nom} {badgeAuto(d, r.nom)}</div>
              <div className="frule-text">{r.texte}</div>
              {d?.auto && <div className="frule-auto">⚙️ {d.auto}</div>}
            </button>
          )
        })}
        {(!regles || regles.length === 0) && (
          <div className="muted small">Aucune règle d'âge dans le référentiel pour ce peuple.</div>
        )}
      </div>
    </div>
  )

  return (
    <Card title={`⚔️ Faction — ${p.peuple}`}>
      <div className="small muted" style={{ marginBottom: 8 }}>{fiche.description}</div>
      <div className="frule-row">
        {fiche.victoire ? (
          <div className="frule frule-muted">
            <div className="frule-title">Victoire de faction <span className="badge badge-neutral">désactivée</span></div>
            <div className="frule-text">{fiche.victoire}</div>
          </div>
        ) : null}
        {fiche.batiment ? (
          <div className="frule frule-muted">
            <div className="frule-title">Bâtiment / aménagement de faction</div>
            <div className="frule-text">{fiche.batiment}</div>
          </div>
        ) : null}
        {(fiche.reglesBase ?? []).map((r) => {
          const d = autoDe('Base', r.nom)
          return (
            <div key={r.nom} className="frule frule-muted">
              <div className="frule-title">{r.nom} {badgeAuto(d, r.nom)}</div>
              <div className="frule-text">{r.texte}</div>
              {d?.auto && <div className="frule-auto">⚙️ {d.auto}</div>}
            </div>
          )
        })}
      </div>
      <div className="stack small-gap" style={{ marginTop: 12 }}>
        {ligneAge('Âge II', fiche.ageII, p.regleAge2, 2)}
        {ligneAge('Âge III', fiche.ageIII, p.regleAge3, 3)}
      </div>
      <div className="frule-appliques">
        <strong>⚙️ Bonus appliqués automatiquement</strong> — chaque fin de tour, canal « Faction »
        du récap ressources (page Pays) :{' '}
        {fluxActifs.length > 0
          ? fluxActifs.map(([res, v]) => (
              <span key={res} className="badge badge-good">{v > 0 ? '+' : ''}{v} {res}</span>
            ))
          : 'aucun flux chiffré pour l\u2019instant'}
        {avecGarnison && (
          <span className="muted small"> · garnison des habitations ajustée (décompte détaillé sur la page Joueur)</span>
        )}
        <div className="muted small">
          Les règles marquées « manuel » dépendent du plateau physique ou de systèmes non modélisés
          (PM, cases, émissaires, influence, marchands, colonies…) : à gérer au jugé. Les bâtiments et
          aménagements de faction chiffrés (Église, Apiculture, Puit de mana, Elevage, Brasseries…)
          sont constructibles depuis la page Pays — production automatique.
        </div>
      </div>
    </Card>
  )
}
