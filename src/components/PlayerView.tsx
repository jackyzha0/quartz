// ══════════════════════════════════════════════════════════════════════
//  Page « Pays » (vue joueur) :
//   · ressources : BARRE FLOTTANTE MINIMALISTE en haut de la page,
//     OUVERTE par défaut (retour Thibaut 2026-10-14) — stock modifiable,
//     production / tour CALCULÉE (base + habitants + bâtiments +
//     aménagements + autres + régimes & cultures + vassalité) —
//     invariant : stock du tour N = stock du tour N−1 + production
//     par tour,
//   · culture du pays — encadré « bonus automatiques » : règle de pays
//     chiffrée (ex. Lunisme : +4 Tourisme par ville luniste dans le
//     monde) avec le nombre de villes de cette culture et le bonus
//     adapté en conséquence (appliqué à chaque fin de tour, canal
//     « régimes & cultures » du récap ressources ; +N Science par
//     construction crédité à la construction),
//   · villes : rang d'habitation, AMÉNAGEMENTS au-dessus des
//     BÂTIMENTS, puis catégorie AUTRES — coût, production et
//     description EXACTS du référentiel (table `constructions`),
//     coût déduit du stock à la construction (+ Science par
//     construction selon la règle de culture, ex. Déisme),
//   · cultures de chaque ville : culture majoritaire + toutes les
//     autres cultures présentes avec leur nombre d'habitants, et
//     GARNISON DES HABITATIONS notée sous la culture (bâtiments +
//     loi du régime),
//   · bas de chaque ville : ce que les taxes rapportent — la
//     production en ressources des villageois (les taxes modulent
//     TOUTES les ressources, pas seulement l'Or),
//   · bas de chaque cadre de ville : sa PRODUCTION en ressources
//     (bâtiments + aménagements + autres + villageois + consommation
//     de l'habitation, total par tour),
//   · récap des ressources par tour : chaque ressource et D'OÙ elle
//     provient (tableau canal par canal + origine de chaque apport),
//   · récap ressources du dernier tour (apports cumulés, canal
//     « régimes & cultures » inclus),
//   · récap démographique.
//  Le cadre « Joueur N » (identité du joueur) vit sur la page
//  « Royaume ».
// ══════════════════════════════════════════════════════════════════════

import React, { useEffect, useRef, useState } from 'react'
import { useGame } from '../state/store'
import type { GameState, Player, AutreDef } from '../engine/types'
import { cfgOf, cultureDef, couleurRessource, fondRessource, type Cfg } from '../engine/gameData'
import {
  effetsTourBatiment, garnisonBatiment, coutBatiment,
  batimentsConstructionsRefs, constructionsRefs, amenagementRef, aCampDeBatisseurs,
  coutAmenagement, constructionRef,
  productionDetaillee, detailGainsVille, parseCoutTexte,
  garnisonHabitationVille, nomRang, typeVille, habitationDef,
  rangsDisponibles, consommationsVille, tourismeStatiqueBatiment, resumeConstruction,
  detailCulturePays, productionVille, provenancesApports,
  attraitTouristiqueVille, attraitMaxMonde,
  capitaleDe, batimentsFaction, batimentsCapitale,
  effetsNourrEteAmenagementsVille, effetsNourrEteAutresVille,
  supprimerVille, transfererVille,
  routesCommerceDe, routesCommerceVers, marchandsDe, fullName,
  ressourcesCopiables, amenagementsCopiables,
  creerRouteCommerce, changerCopieRoute, supprimerRouteCommerce,
  impotPopulation, impotsVassaux, genererImpotPopulation, genererImpotVassaux,
  debiterCoutHabitation, aMinistre, rangPaysNiveau, rangNiveau, bonusProximite,
  type ProductionDetail,
} from '../engine/engine'
import { peuplerNouvelleVille } from '../engine/setup'
import { Card, NumberInput, Select, TextInput, Button, Badge, fmt, TAX_OPTIONS } from './ui'
import { ChoicePicker, type PickerCategorie } from './Picker'

export function PlayerView({ joueur }: { joueur: number }) {
  const { state, update } = useGame()
  // ── MARQUEUR (a) — RÈGLES DE HOOKS REACT : tous les useState AVANT tout
  //    retour anticipé. Les retours anticipés (`return null`, « Joueur
  //    introuvable ») se trouvaient AVANT ces hooks : si un rendu
  //    passait par un retour anticipé puis un autre par le rendu
  //    complet, l'ORDRE DES HOOKS changeait → erreur React « Rendered
  //    more hooks than during the previous render » → PAGE ENTIÈREMENT
  //    BLANCHE sans message. Les retours sont déplacés SOUS les hooks. ──
  //    (foisImpot : nb de tours des boutons « Générer l'impôt ».)
  const [foisImpot, setFoisImpot] = useState(1)
  // Type d'habitation de la prochaine ville ajoutée (retour Thibaut,
  //  marqueur (r) : choisir ville ou château à la création).
  const [typeAjout, setTypeAjout] = useState<'Ville' | 'Château'>('Ville')
  // ── Commerce (marqueur (t)) : formulaire d'ouverture d'une route
  //    commerciale — marchand libre, joueur/ville ciblés, aménagement
  //    copié (marqueur (u) : aménagement ENTIER). ────────────────────
  const [rcMarchand, setRcMarchand] = useState('')
  const [rcJoueur, setRcJoueur] = useState('')
  const [rcVille, setRcVille] = useState('')
  const [rcAmen, setRcAmen] = useState('')
  const [rcErr, setRcErr] = useState<string | null>(null)
  // ── Surintendant des finances (marqueur (y)) : après la construction
  //    d'un bâtiment, le ministre génère 1 ressource AU CHOIX produite
  //    par l'habitation, × rang de l'habitation — le choix s'affiche
  //    dans une carte dédiée le temps de la décision. ──────────────────
  const [surint, setSurint] = useState<{
    idx: number; options: string[]; qty: number
  } | null>(null)
  const [surintRes, setSurintRes] = useState('')

  if (!state) return null
  const C = cfgOf(state.config)
  const p = state.players.find((x) => x.n === joueur)
  if (!p) return <Card>Joueur introuvable.</Card>

  // Le mutateur reçoit (joueur, état) : la population vit dans
  // state.population[joueur], PAS dans le Player (sinon crash « reading »).
  const setPlayer = (fn: (p: Player, s: GameState) => void) =>
    update((s) => {
      const target = s.players.find((x) => x.n === joueur)
      if (target) fn(target, s)
    })

  // ── Production / tour détaillée (calculée, non modifiable) ────────────
  const prodDetail = productionDetaillee(state, p, C)

  // Prévisualisation de l'impôt d'UN tour (population / vassaux) pour
  //  les boutons « Générer l'impôt » de la carte récap.
  const impotPopPrev = impotPopulation(state, p, C)
  const impotsVassPrev = impotsVassaux(state, p, C)

  // ── Attrait migratoire : borne haute = ville la plus attractive du
  //    monde (pour la heatmap sous chaque ville). ─────────────────────────
  const maxAttraitMonde = attraitMaxMonde(state)

  // ── Construction d'un bâtiment / aménagement (coût déduit du stock) ────
  const construire = (idx: number, nom: string, type: 'batiment' | 'amenagement', groupe?: string) =>
    update((s) => {
      const t = s.players.find((x) => x.n === joueur)
      const ville = t?.villes[idx]
      if (!t || !ville) return
      // Marqueur (a) : garde-fou — une ancienne sauvegarde peut avoir
      //  une ville sans tableau batiments/aménagements.
      if (!ville.batiments) ville.batiments = []
      if (!ville.amenagements) ville.amenagements = []
      // ── Restrictions des catégories de bâtiments ────────────────────
      // · bâtiment de faction : uniquement ceux du peuple du joueur ;
      // · bâtiment de capitale (groupe « Capitale ») : capitale uniquement.
      const ref = type === 'batiment' ? constructionRef(nom, C.config) : undefined
      const estCapitale = capitaleDe(t)?.nom === ville.nom
      // Aménagement de faction (marqueur (y)) : comme les bâtiments de
      //  faction, seuls ceux du PEUPLE du joueur sont constructibles.
      const aref = type === 'amenagement' ? constructionRef(nom, C.config) : undefined
      if (aref?.faction && aref.faction !== t.peuple) {
        s.log.push({
          turn: s.turn, type: 'Système', joueur: t.n,
          texte: `🏗 ${nom} est un aménagement de faction des ${aref.faction} — seuls les aménagements de faction de ${t.peuple} sont constructibles.`,
        })
        return
      }
      if (ref && ref.groupe === 'Capitale' && !estCapitale) {
        s.log.push({
          turn: s.turn, type: 'Système', joueur: t.n,
          texte: `🏗 ${nom} ne peut être construit(e) que dans la capitale (${capitaleDe(t)?.nom ?? '—'}).`,
        })
        return
      }
      if (ref?.faction && ref.faction !== t.peuple) {
        s.log.push({
          turn: s.turn, type: 'Système', joueur: t.n,
          texte: `🏗 ${nom} est un bâtiment de faction des ${ref.faction} — seuls les bâtiments de faction de ${t.peuple} sont constructibles.`,
        })
        return
      }
      const cout = type === 'batiment'
        ? coutBatiment(nom, C, groupe)
        : coutAmenagement(t, C.config, type === 'amenagement' ? nom : undefined)
      const cible = type === 'batiment'
        ? ville.batiments
        : (ville.amenagements ?? (ville.amenagements = []))
      // Un même BÂTIMENT ne se construit pas deux fois dans une ville ;
      //  en revanche un AMÉNAGEMENT peut être présent PLUSIEURS FOIS
      //  (plusieurs cases du même terrain, ex. 2 Champs) — chaque
      //  exemplaire produit ses effets (retour Thibaut 2026-10-14).
      if (type === 'batiment' && cible.includes(nom)) return
      // Bâtiment de faction : UN par ville — le nouveau remplace l'ancien
      // (ex. Église → Grande Cathédrale → Palais du Palatinat).
      let remplace = ''
      if (type === 'batiment' && ref?.faction) {
        for (let i = ville.batiments.length - 1; i >= 0; i--) {
          const b = ville.batiments[i]
          if (b !== nom && constructionRef(b, C.config)?.faction) {
            remplace = b
            ville.batiments.splice(i, 1)
          }
        }
      }
      cible.push(nom)
      const parts: string[] = []
      for (const [res, v] of Object.entries(cout)) {
        const rs = t.resources[res]
        if (rs) rs.stock -= v
        if (v > 0) parts.push(`${fmt(v)} ${res}`)
      }
      // Règle de culture : ex. Déisme — +N Science par bâtiment construit
      // (champ paramétrable, onglets « Cultures & régimes »).
      const sci = type === 'batiment' ? (cultureDef(t.culture, C.config)?.scienceParConstruction ?? 0) : 0
      if (sci > 0) {
        const rsSci = t.resources['Science']
        if (rsSci) rsSci.stock += sci
      }
      // Tourisme : valeur d'état acquise UNE FOIS à la construction
      // (ex. « Chapelle : Tourisme +35 », « Foire : +5 Tourisme »),
      // BÂTIMENTS comme AMÉNAGEMENTS — pas un flux par tour (retour
      // Thibaut, marqueur (r) : le Tourisme est une valeur FLAT).
      const tour = tourismeStatiqueBatiment(nom, C)
      if (tour > 0) {
        const rsTour = t.resources['Tourisme']
        if (rsTour) rsTour.stock += tour
      }
      s.log.push({
        turn: s.turn, type: 'Système', joueur: t.n,
        texte: `🏗 ${nom} construit(e) à ${ville.nom} — coût déduit du stock : ${parts.length ? parts.join(' + ') : 'gratuit'}${sci > 0 ? ` — règle de culture : +${fmt(sci)} Science` : ''}${tour > 0 ? ` — Tourisme +${fmt(tour)} (valeur fixe)` : ''}${remplace ? ` — remplace ${remplace} (bâtiment de faction de la ville)` : ''}.`,
      })
      // Surintendant des finances (marqueur (y)) : « Après avoir
      //  construit un bâtiment, générez 1 Ressource de votre choix
      //  produite par l'habitation par rang de l'habitation » — on
      //  ouvre une carte de choix (ressources produites par les
      //  habitants + bâtiments de la ville, nouveau bâtiment inclus).
      if (type === 'batiment' && aMinistre(s, t, 'Surintendant des finances')) {
        const prodVille = new Set<string>()
        for (const r of Object.keys(detailGainsVille(s, t, ville, C).titres)) prodVille.add(r)
        for (const r of Object.keys(effetsTourBatiment(nom, C))) prodVille.add(r)
        const options = [...prodVille].filter((r) => t.resources[r] !== undefined)
        const qty = rangNiveau(ville, C)
        if (options.length > 0 && qty > 0) {
          setSurint({ idx, options, qty })
          setSurintRes(options[0])
        }
      }
    })

  // ── Référentiel des constructions (coût / production / description exacts) ──
  const refs = constructionsRefs(C.config)
  const amRefs = refs.filter((r) => r.categorie === 'Aménagement')
  const batRefs = batimentsConstructionsRefs(C)
  // Bâtiments de faction du peuple du joueur + bâtiments de capitale
  // du référentiel (2 nouvelles catégories des cadres ville).
  const refsBatFaction = batimentsFaction(p, C)
  const refsBatCapitale = batimentsCapitale(C)
  const nomCapitale = capitaleDe(p)?.nom ?? ''
  /** Catégories de construction d'UNE ville par TYPE de bâtiment
   *  (marqueur (y), retour Thibaut : « peut-être même un bouton par
   *  type de bâtiment ») — arbitrage : les 5 FAMILLES du référentiel
   *  (Militaire, Economique, Guilde, Faction, Capitale). Contenu :
   *  bâtiments de ville / château hors faction, bâtiments de FACTION
   *  du peuple du joueur (ceux de capitale uniquement dans la
   *  capitale), bâtiments de CAPITALE pour la capitale uniquement.
   *  Chaque carte montre le coût ET la description du classeur. */
  const batParFamillePour = (estCapitale: boolean): PickerCategorie[] => {
    const eligibles = [
      ...batRefs.filter((b) => b.groupe === 'Ville' && !b.faction).map((b) => ({ b, groupe: 'Ville' })),
      ...batRefs.filter((b) => b.groupe === 'Château' && !b.faction).map((b) => ({ b, groupe: 'Château' })),
      ...refsBatFaction
        .filter((b) => estCapitale || b.groupe !== 'Capitale')
        .map((b) => ({ b, groupe: 'Faction' })),
      ...(estCapitale ? refsBatCapitale.map((b) => ({ b, groupe: 'Capitale' })) : []),
    ]
    const familles: Array<[string, string]> = [
      ['Militaire', 'Militaire'],
      ['Economique', 'Économique'],
      ['Guilde', 'Guilde'],
      ['Faction', `Faction (${p.peuple})`],
      ['Capitale', 'Capitale'],
    ]
    return familles.map(([fam, label]) => ({
      label,
      options: eligibles
        .filter(({ b }) => (b.famille ?? '') === fam)
        .map(({ b, groupe }) => ({
          value: `${groupe}|${b.nom}`,
          titre: b.nom,
          droite: fmtCout(parseCoutTexte(b.cout)),
          description: [
            resumeConstruction(b) || b.production || '',
            b.description,
          ].filter(Boolean).join('\n'),
          badge: FAM_BADGES[fam] ?? 'badge-info',
        })),
    }))
  }

  const coutAm = coutAmenagement(p, C.config)
  const reducBatisseurs = aCampDeBatisseurs(p)

  return (
    <div className="stack">
      {/* Barre Ressources — flottante en haut de la page, ouverte par
          défaut, minimaliste (retour Thibaut 2026-10-14) */}
      <RessourcesBar p={p} C={C} prodDetail={prodDetail} setPlayer={setPlayer} />

      {/* ═══ MARQUEUR (a) — aide « QU'EST-CE QUI EST COMPTÉ AUTOMATIQUEMENT ? »
          (retour Thibaut : « je ne comprends pas ce qui est compté
          automatiquement et ce qui ne l'est pas »). Bloc repliable
          (<details> natif, sans état) : liste des canaux crédités à chaque
          fin de tour vs. ce qui reste à faire au plateau / à saisir. ═══ */}
      <details className="aide-auto">
        <summary>🧮 Qu'est-ce que l'application compte automatiquement ?</summary>
        <div className="grid-2 aide-auto-grid">
          <div>
            <strong>✅ Compté automatiquement</strong> — à chaque « ▶ Terminer le tour » (une seule pression suffit, TOUT est crédité) :
            <ul className="small">
              <li><strong>Impôts des habitants</strong> : titres × taxes de chaque ville, sur toutes les ressources, moins leur consommation.</li>
              <li><strong>Production</strong> des bâtiments, aménagements et lignes « Autres » — la « Nourr - été » n'est créditée qu'en été.</li>
              <li><strong>Consommation des habitations</strong> (rang de chaque ville) et <strong>bonus de proximité</strong> (Rivière / Mer).</li>
              <li><strong>Règles de pays & culture</strong> (ex. +N par ville de ta culture dans le monde) et <strong>bonus de faction / régime</strong>.</li>
              <li><strong>Tribut des vassaux</strong> et <strong>taxes des cités libres</strong> sous ta suzeraineté.</li>
              <li><strong>Routes commerciales</strong> : +{fmt(C.p.marchandOrTour)} Or aux DEUX joueurs + copie de l'aménagement (une production d'été n'est copiée qu'en été).</li>
              <li><strong>Ministres « Auto »</strong> (badge page 👥 Population) : Trésorier +5 Or/tour, Grand Précepteur +1 Science/tour, Grand prévôt +1 Fer/tour, Grand veneur −5 Nourriture × rang par habitation, Grand Chambellan +10 % taxes reçues, Sénéchal +15 Nourriture fin d'été, Maître de cour et Légat +Tourisme fin de saison, Connétable +15 Garnison à la nomination, Grand bailli (fondations), Surintendant des finances (après construction), Grand bibliothécaire (après technologie), Chanceliers (sacres réduits).</li>
              <li><strong>Gouverneur</strong> : le noble le plus âgé est nommé automatiquement, +10 % d'impôts sur sa ville.</li>
              <li><strong>Tourisme & Garnison = valeurs d'état</strong> : le Tourisme est crédité UNE fois à la construction, jamais par tour.</li>
              <li><strong>Démographie des joueurs</strong> : naissances (modulées par les taxes), vieillissement, décès, migrations (attrait Tourisme).</li>
              <li><strong>Coûts débités automatiquement</strong> : constructions, habitations (fondation / changement de rang), technologies (Science déduite au déblocage, remboursée à la reprise), sacre d'avènement (moitié du prix — gratuit avec la loi Démocratie).</li>
            </ul>
          </div>
          <div>
            <strong>✍️ Manuel — jamais compté automatiquement</strong> (à faire au plateau ou à saisir dans l'app) :
            <ul className="small">
              <li><strong>Émissaires & suzeraineté</strong> : saisie manuelle page « 🗼 Cités libres » (1 tentative par saison).</li>
              <li><strong>Population des cités libres</strong> : statut (Sain / Malade / Décédé), naissances et vieillissement manuels.</li>
              <li><strong>Ministres « Plateau »</strong> (badge) : le texte de l'effet dit quand l'appliquer au plateau.</li>
              <li><strong>Effets des technologies</strong> : affichés en aide de jeu, à appliquer au plateau.</li>
              <li><strong>Voies de victoire</strong> : Merveilles, habitations capturées, routes de la voie Économique, Lauriers — cases à cocher sur l'Accueil.</li>
              <li><strong>Dogmes, levées d'armées, dés et événements du plateau.</strong></li>
            </ul>
            <p className="muted small" style={{ marginBottom: 0 }}>
              NB : les boutons « 💰 / 🤝 Générer l'impôt » de cette page AJOUTENT l'impôt d'un
              tour en cours de partie — le fin de tour crédite ensuite son propre impôt
              PAR-DESSUS. Ne les utilise que pour rattraper un impôt oublié.
            </p>
          </div>
        </div>
      </details>

      {/* ═══ Surintendant des finances (marqueur (y)) : après la
          construction d'un bâtiment, choix d'1 ressource produite par
          l'habitation, × rang de l'habitation — carte éphémère. ═══ */}
      {surint && (() => {
        const villeSu = p.villes[surint.idx]
        if (!villeSu) return null
        return (
          <Card title="🪙 Surintendant des finances — ressource générée par la construction">
            <p>
              Votre Surintendant des finances génère <strong>{surint.qty}</strong> × 1 ressource
              au choix parmi celles produites par <strong>{villeSu.nom}</strong> —
              choisissez la ressource puis validez :
            </p>
            <div className="filters">
              <Select
                value={surintRes}
                options={surint.options.map((r) => ({ value: r, label: r }))}
                onChange={setSurintRes}
              />
              <Button tone="primary" disabled={!surintRes} onClick={() => {
                const res = surintRes
                const qty = surint.qty
                update((s2) => {
                  const t = s2.players.find((x) => x.n === joueur)
                  if (!t) return
                  const rs = t.resources[res]
                  if (rs) rs.stock += qty
                  s2.log.push({
                    turn: s2.turn, type: 'Système', joueur: t.n,
                    texte: `👑 Ministères — Surintendant des finances : ${villeSu.nom} génère +${qty} ${res} (construction).`,
                  })
                })
                setSurint(null)
              }}>Créditer</Button>
              <Button onClick={() => setSurint(null)}>Ignorer</Button>
            </div>
          </Card>
        )
      })()}


      {/* ═══ Culture du pays : règle de pays chiffrée (ex. Lunisme —
          +4 Tourisme par ville luniste dans le monde) avec le NOMBRE de
          villes de cette culture et le bonus ADAPTÉ en conséquence —
          appliqué automatiquement à chaque fin de tour (canal
          « régimes & cultures » du récap ressources). ═══ */}
      <Card title="🛕 Culture du pays — bonus automatiques">
        {(() => {
          const cult = cultureDef(p.culture, C.config)
          const lois = detailCulturePays(state, p, C)
          const traits = cult
            ? `hérédité ${String(cult.heredite).toLowerCase()} · martialité ${String(cult.martialite).toLowerCase()} · mariages homosexuels ${cult.homoAutorisee ? 'autorisés' : 'interdits'}`
            : ''
          return (
            <div className="stack">
              <div>
                <strong>{p.culture}</strong>
                {cult?.reglePays && <span className="muted small"> — {cult.reglePays}</span>}
              </div>
              {traits && <div className="muted small">{traits}</div>}
              {lois.length > 0 ? lois.map((d) => (
                <div key={d.res}>
                  <Badge tone="good">+{fmt(d.total)} {d.res} / tour</Badge>{' '}
                  <span className="muted small">
                    règle de pays : +{fmt(d.parVille)} {d.res} × {d.nbVillesMonde} ville(s)
                    « {p.culture} » dans le monde (dont {d.nbVillesPerso} chez toi).
                  </span>
                </div>
              )) : null}
              {cult?.scienceParConstruction ? (
                <div>
                  <Badge tone="good">+{fmt(cult.scienceParConstruction)} Science / construction</Badge>{' '}
                  <span className="muted small">
                    crédité à chaque construction (journal 🏗).
                  </span>
                </div>
              ) : null}
            </div>
          )
        })()}
      </Card>

      {/* ═══ Villes : aménagements, bâtiments, autres, cultures, taxes ═══ */}
      <Card title="Villes">
        {/* 2 villes par ligne ; repli à 1 colonne en fenêtre étroite —
            les tableaux internes restent lisibles (défilement horizontal
            via .table-wrap si besoin). */}
        <div className="grid-villes">
          {p.villes.map((ville, idx) => {
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
            // Ce que les taxes rapportent (production des villageois)
            const tg = detailGainsVille(state, p, ville, C)
            // Retour Thibaut (marqueur (r)) : TOUTES les ressources
            // s'affichent, même à production 0.
            const resTaxes = C.ressources
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
                      if (src && dst) transfererVille(st, src, idx, dst)
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
                  const base = habitationDef(ville, C)?.garnison ?? 0
                  const bats = g - base
                  const bonusRegime = (C.regimes.find((r) => r.nom === p.regime)?.garnisonParRang ?? 0) > 0
                  return (
                    <div className="small">
                      Garnison des habitations : <strong>{fmt(g)}</strong>
                      <span className="muted small">
                        {' '}(base {fmt(base)} du rang{bats > 0 ? ` + ${fmt(bats)} de bâtiments` : ''}{bonusRegime && base > 0 ? ' (loi du régime incluse)' : bonusRegime ? ' + loi du régime' : ''})
                      </span>
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
                      aménagements classiques et aménagements de FACTION
                      du peuple du joueur (les autres factions ne sont
                      plus constructibles, comme les bâtiments). */}
                  <ChoicePicker
                    bouton="+ Aménager une case…"
                    categories={[
                      {
                        label: 'Aménagements',
                        options: amRefs.filter((a) => !a.faction).map((a) => ({
                          value: a.nom,
                          titre: a.nom,
                          droite: `${fmtCout(parseCoutTexte(a.cout))}${a.terrain ? ` · ${a.terrain}` : ''}`,
                          description: [
                            resumeConstruction(a) || a.production || '',
                            a.description,
                          ].filter(Boolean).join('\n'),
                        })),
                      },
                      {
                        label: `Aménagements de faction (${p.peuple})`,
                        options: amRefs.filter((a) => a.faction === p.peuple).map((a) => ({
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
                      (militaire, économique, guilde, faction, capitale —
                      arbitrage Thibaut : les 5 familles existantes) +
                      description de chaque bâtiment AVANT le choix. */}
                  <ChoicePicker
                    bouton="+ Construire…"
                    categories={batParFamillePour(ville.nom === nomCapitale)}
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

                {/* ── Ce que les taxes rapportent (production des villageois) ── */}
                <div className="mini-title">Taxes — production des villageois</div>
                {resTaxes.length === 0 ? (
                  <div className="muted small">
                    Aucune production d'habitants.
                  </div>
                ) : (
                  <div className="table-wrap">
                    <table className="tbl small taxes-tbl">
                      <thead>
                        <tr>
                          <th>Ressource</th><th>Titres</th>
                          <th>Taxes (×{fmt(tg.taxeMult, 2)})</th>
                          <th>Consommation</th><th>Net / tour</th>
                        </tr>
                      </thead>
                      <tbody>
                        {resTaxes.map((r) => (
                          <tr key={r} style={{ background: fondRessource(r, C) }}>
                            <td>
                              <span className="dot-res" style={{ background: couleurRessource(r, C) }} />
                              <strong>{r}</strong>
                            </td>
                            <td>{fmtNum(tg.titres[r] ?? 0)}</td>
                            <td>{fmtNum(tg.taxes[r] ?? 0)}</td>
                            <td className={(tg.conso[r] ?? 0) < 0 ? 'neg' : ''}>{fmtNum(tg.conso[r] ?? 0)}</td>
                            <td className={(tg.net[r] ?? 0) < 0 ? 'neg' : ''}><strong>{fmtNum(tg.net[r] ?? 0)}</strong></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

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
                  const nEteTot = nEteAm + nEteAut
                  // Retour Thibaut (marqueur (r)) : toutes les ressources,
                  // même à production 0 (lignes teintées → lisibles).
                  const resV = C.ressources
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
                  const lignesV: Array<{ kind: 'res'; r: string } | { kind: 'ete' }> = []
                  for (const r of resV) {
                    lignesV.push({ kind: 'res', r })
                    if (r === 'Nourriture' && nEteTot !== 0) lignesV.push({ kind: 'ete' })
                  }
                  if (nEteTot !== 0 && !resV.includes('Nourriture')) lignesV.unshift({ kind: 'ete' })
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
                                  <tr key="nourr-ete" className="muted"
                                    style={{ background: fondRessource('Nourr - été', C) }}>
                                    <td>
                                      <span className="dot-res" style={{ background: couleurRessource('Nourr - été', C) }} />
                                      <strong>Nourr - été</strong>
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

                {/* ── Heatmap : attrait migratoire de la ville (Tourisme /
                    tour), relatif à la ville la plus attractive du monde.
                    C'est la pondération de la migration spontanée
                    (2 % / tour — paramètre migrationTourisme). ── */}
                {(() => {
                  const attrait = attraitTouristiqueVille(state, p, ville, C)
                  const part = maxAttraitMonde > 0 ? attrait / maxAttraitMonde : 0
                  const chaleur = Math.round(210 - 210 * part) // bleu (froid) → rouge (chaud)
                  return (
                    <div
                      className="heat-row"
                      title={`Attrait migratoire : ${fmt(attrait)} Tourisme (bâtiments + production par tour) — pondération des migrations spontanées (${Math.round(C.p.migrationTourisme * 100)} % / tour par habitant ; conjoint et enfants mineurs suivent).`}
                    >
                      <span className="muted small">Attrait migratoire</span>
                      <div className="heat-bar">
                        {attrait > 0 && (
                          <div
                            className="heat-fill"
                            style={{ width: `${Math.max(4, part * 100)}%`, background: `hsl(${chaleur}, 85%, 48%)` }}
                          />
                        )}
                      </div>
                      <span className="small">
                        {attrait > 0
                          ? `+${fmt(attrait)} Tourisme · ${Math.round(part * 100)} %`
                          : '— (aucun attrait)'}
                      </span>
                    </div>
                  )
                })()}
              </div>
            )
          })}
        </div>
        <div className="filters" style={{ alignItems: 'center' }}>
          <Select
            value={typeAjout}
            options={[
              { value: 'Ville', label: 'Ville (Hameau → Cité → Grande Cité)' },
              { value: 'Château', label: 'Château (Motte → Donjon → Forteresse)' },
            ]}
            onChange={(v) => setTypeAjout(v as 'Ville' | 'Château')}
          />
          <Button onClick={() => setPlayer((x, s) => {
            const nom = `${typeAjout} ${x.villes.length + 1}`
            x.villes.push({ nom, culture: x.culture, taxes: 'Moyenne', type: typeAjout, rang: rangsDisponibles(typeAjout, C)[0] ?? 'Hameau', batiments: [], amenagements: [], autres: [] })
            debiterCoutHabitation(s, x, x.villes[x.villes.length - 1], C, true)
            // Marqueur (w), retour Thibaut : une nouvelle ville (ou un
            // nouveau château) démarre avec 50 habitants SANS noble,
            // paramètres similaires à la première ville.
            peuplerNouvelleVille(s, x, nom, 50, C)
          })}>{typeAjout === 'Château' ? '+ Ajouter un château' : '+ Ajouter une ville'}</Button>
        </div>
      </Card>

      {/* ═══ Commerce (marqueur (t)) : routes commerciales des marchands.
          Un marchand = UNE route : sa ville ↔ une ville d'un autre
          joueur. Chaque tour : +marchandOrTour Or pour CHAQUE joueur
          relié + copie (propriétaire) de la production de l'aménagement
          ENTIER choisi dans la ville ciblée — modifiable à tout moment
          (arbitrages Thibaut 2026-10-15 : un aménagement par route ;
          marqueur (u) : l'aménagement entier, plus de choix de
          ressource). Correctif (u) : les menus du formulaire ont des
          valeurs par défaut (le bug « Marchand introuvable » venait
          des Selects jamais touchés, dont la valeur restait ''). ═══ */}
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
          const mEff = rcMarchand || libres[0]?.id || ''
          const jEff = rcJoueur || String(autresJoueurs[0]?.n ?? '')
          const joueurCibleForm = state.players.find((q) => String(q.n) === jEff)
          const vEff = rcVille || joueurCibleForm?.villes[0]?.nom || ''
          const villeCibleForm = joueurCibleForm?.villes.find((v) => v.nom === vEff)
          const amenForm = villeCibleForm ? amenagementsCopiables(villeCibleForm, C.config) : []
          const aEff = rcAmen || amenForm[0] || ''
          return (
            <>
              {mes.length === 0 && entrantes.length === 0 && (
                <p className="muted">
                  Aucune route commerciale. Attribue le titre « Marchand » à un
                  personnage (page Population), puis ouvre une route vers la
                  ville d'un autre joueur : chaque tour, les deux joueurs reliés
                  gagnent {fmt(C.p.marchandOrTour)} Or et ton marchand copie la
                  production entière d'un aménagement de la ville ciblée.
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
              {libres.length > 0 ? (
                <div className="filters" style={{ alignItems: 'flex-end', flexWrap: 'wrap' }}>
                  <Field label="Marchand">
                    <Select value={mEff} options={libres.map((c) => ({ value: c.id, label: `${fullName(c)} (${c.ville})` }))} onChange={setRcMarchand} />
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
                  Pour ouvrir une route : attribue le titre « Marchand » à un
                  personnage vivant (page Population). Chaque marchand ne tient
                  qu'une route.
                </p>
              )}
              {rcErr && <p className="small" style={{ color: '#E74C3C', marginBottom: 0 }}>{rcErr}</p>}
            </>
          )
        })()}
      </Card>

      {/* ═══ Récap des ressources par tour : chaque ressource et d'où
          elle provient (calculé pour le prochain tour, moteurs des
          étapes de fin de tour). ═══ */}
      <Card title="Récap des ressources par tour — origine de chaque apport">
        {(() => {
          // Marqueur (a) : garde-fou — un canal manquant (config très
          //  ancienne) ne doit pas faire crasher l'affichage du récap.
          const canaux: Array<[string, Record<string, number> | undefined]> = [
            ['Base', prodDetail.base],
            ['Habitants', prodDetail.habitants],
            ['Bâtiments', prodDetail.batiments],
            ['Aménagements', prodDetail.amenagements],
            ['Autres', prodDetail.autres],
            ['Régimes & cultures', prodDetail.regimesCultures],
            ['Faction', prodDetail.faction],
            ['Cités libres', prodDetail.citesLibres],
            ['Commerce', prodDetail.commerce],
            ['Proximité', prodDetail.proximite],
            ['Conso villes', prodDetail.habitations],
            ['Vassalité', prodDetail.vassalite],
          ]
          // « Nourr - été » en LIGNE (comme dans le classeur), pas en
          // colonne : sources séparées — Aménagements (Champ, Rizière) +
          // Autres (lignes « Nourr - été »). Potentiel affiché en toute
          // saison (planification), crédit au stock UNIQUEMENT en été.
          const nEteAmJ = p.villes.reduce(
            (s, v) => s + (effetsNourrEteAmenagementsVille(v, C.config)['Nourriture'] ?? 0), 0)
          const nEteAutJ = p.villes.reduce(
            (s, v) => s + (effetsNourrEteAutresVille(v)['Nourriture'] ?? 0), 0)
          const nEteTotJ = nEteAmJ + nEteAutJ
          const prov = provenancesApports(state, p, C)
          // Retour Thibaut (marqueur (r)) : toutes les ressources,
          // même à production 0.
          const res = C.ressources
          if (res.length === 0 && nEteTotJ === 0) {
            return (
              <p className="muted">
                Aucun apport par tour pour l'instant.
              </p>
            )
          }
          const val = (d: Record<string, number> | undefined, r: string) => (d ?? {})[r] ?? 0
          // Lignes du tableau : chaque ressource + la ligne « Nourr - été »
          // juste après la Nourriture (ou en première ligne s'il n'y en a pas).
          const lignesR: Array<{ kind: 'res'; r: string } | { kind: 'ete' }> = []
          for (const r of res) {
            lignesR.push({ kind: 'res', r })
            if (r === 'Nourriture' && nEteTotJ !== 0) lignesR.push({ kind: 'ete' })
          }
          if (nEteTotJ !== 0 && !res.includes('Nourriture')) lignesR.unshift({ kind: 'ete' })
          return (
            <>
              <div className="table-wrap">
                <table className="tbl small">
                  <thead>
                    <tr>
                      <th>Ressource</th>
                      {canaux.map(([label]) => <th key={label}>{label}</th>)}
                      <th>Total / tour</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lignesR.map((l) => {
                      if (l.kind === 'ete') {
                        return (
                          <tr key="nourr-ete" className="muted"
                            style={{ background: fondRessource('Nourr - été', C) }}>
                            <td>
                              <span className="dot-res" style={{ background: couleurRessource('Nourr - été', C) }} />
                              <strong>Nourr - été</strong>
                            </td>
                            {canaux.map(([label]) => {
                              const v = label === 'Aménagements' ? nEteAmJ
                                : label === 'Autres' ? nEteAutJ : 0
                              return (
                                <td key={label} className={v < 0 ? 'neg' : ''}>
                                  {v !== 0 ? fmtNum(v) : '—'}
                                </td>
                              )
                            })}
                            <td>
                              <strong>{fmtNum(nEteTotJ)}</strong>{' '}
                              <span className="muted small">(créditée en été seulement)</span>
                            </td>
                          </tr>
                        )
                      }
                      const r = l.r
                      return (
                        <tr key={r} style={{ background: fondRessource(r, C) }}>
                          <td>
                            <span className="dot-res" style={{ background: couleurRessource(r, C) }} />
                            <strong>{r}</strong>
                          </td>
                          {canaux.map(([label, d]) => (
                            <td key={label} className={val(d, r) < 0 ? 'neg' : ''}>
                              {val(d, r) !== 0 ? fmtNum(val(d, r)) : '—'}
                            </td>
                          ))}
                          <td className={(prodDetail.total[r] ?? 0) < 0 ? 'neg' : ''}>
                            <strong>{fmtNum(prodDetail.total[r] ?? 0)}</strong>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>

              {/* ── D'où vient chaque ressource, origine par origine ── */}
              <div className="mini-title">D'où vient chaque ressource ?</div>
              {res.map((r) => {
                const lignes = prov[r] ?? []
                if (lignes.length === 0) return null
                return (
                  <div key={r} className="small provenance-ligne">
                    <strong>{r}</strong>
                    {' : '}
                    {lignes.map((a, i) => (
                      <span key={i}>
                        {i > 0 && ' · '}
                        <span className="muted">{a.canal} — </span>
                        {a.origine}{' '}
                        <strong className={a.valeur < 0 ? 'neg' : ''}>
                          {a.valeur > 0 ? '+' : ''}{fmtNum(a.valeur)}
                        </strong>
                      </span>
                    ))}
                  </div>
                )
              })}
            </>
          )
        })()}

        {/* ── Générer l'impôt (hors fin de tour, retour Thibaut
            2026-10-14) : crédite l'impôt d'un tour AUTANT DE FOIS que
            voulu — population (canal « Habitants ») ou vassaux (tribut
            de vassalité, Or). Le fin de tour crédite les gains du tour
            normalement par-dessus. ───────────────────────────────── */}
        <div className="mini-title">Générer l'impôt (hors fin de tour)</div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
          <label className="small">Nombre de tours :</label>
          <NumberInput value={foisImpot} onChange={setFoisImpot} min={1} />
          <Button tone="primary" onClick={() => update((s) => {
            const t = s.players.find((x) => x.n === joueur)
            if (t) genererImpotPopulation(s, t, C, foisImpot)
          })}>💰 Générer l'impôt de la population</Button>
          <Button tone="primary" onClick={() => update((s) => {
            const t = s.players.find((x) => x.n === joueur)
            if (t) genererImpotVassaux(s, t, C, foisImpot)
          })}>🤝 Générer l'impôt des vassaux</Button>
        </div>
        <p className="muted small">
          Impôt d'un tour — population : {Object.keys(impotPopPrev).length === 0
            ? 'aucun gain d’habitants'
            : Object.entries(impotPopPrev).map(([r, v]) => `${fmt(v)} ${r}`).join(', ')}
          {' · '}vassaux : {impotsVassPrev.length === 0
            ? 'aucun vassal ne reverse d’Or'
            : `+${fmt(impotsVassPrev.reduce((s2, x) => s2 + x.montant, 0))} Or (` +
              impotsVassPrev.map((x) => `${x.vassal} : ${fmt(x.montant)}`).join(', ') + ')'}
        </p>
      </Card>

      {/* ═══ Récap ressources du dernier tour (apports cumulés) ═══ */}
      <Card title="Récap ressources du dernier tour (apports cumulés)">
        {(() => {
          // Marqueur (a) : garde-fou — une ancienne sauvegarde peut ne pas
          //  avoir de tableau history (le `[...undefined]` plantait la page).
          const row = [...(state.history ?? [])].reverse().find((h) => h.joueur === p.n && h.apports)
          if (!row || !row.apports) {
            return (
              <p className="muted">
                Lancez un tour pour voir le détail des apports.
              </p>
            )
          }
          const { production, batiments, amenagements, nourrEte, autres, population, vassalite, regimesCultures, habitations, faction, citesLibres, commerce } = row.apports
          const amen = amenagements ?? {}
          const nEte = nourrEte ?? {}
          const aut = autres ?? {}
          const reg = regimesCultures ?? {}
          const hab = habitations ?? {}
          const fac = faction ?? {}
          const cl = citesLibres ?? {}
          const com = commerce ?? {}
          const val = (d: Record<string, number> | undefined, r: string) => (d ?? {})[r] ?? 0
          // Retour Thibaut (marqueur (r)) : toutes les ressources,
          // même à apport 0.
          const res = C.ressources
          // Ligne « Nourr - été » (comme dans le classeur) juste après
          // la Nourriture : valeur d'été créditée ce tour-là (0/en
          // hiver) ; ses sources détaillées sont visibles dans le récap
          // « origine de chaque apport » ci-dessus.
          const lignesD: Array<{ kind: 'res'; r: string } | { kind: 'ete' }> = []
          for (const r of res) {
            lignesD.push({ kind: 'res', r })
            if (r === 'Nourriture' && val(nEte, 'Nourriture') !== 0) lignesD.push({ kind: 'ete' })
          }
          if (val(nEte, 'Nourriture') !== 0 && !res.includes('Nourriture')) lignesD.unshift({ kind: 'ete' })
          return (
            <div className="table-wrap">
              <table className="tbl small">
                <thead>
                  <tr>
                    <th>Ressource</th><th>Production</th><th>Bâtiments</th>
                    <th>Aménagements</th><th>Autres</th>
                    <th>Conso. villes</th>
                    <th>Habitants</th><th>Régimes & cultures</th><th>Faction</th><th>Cités libres</th><th>Commerce</th><th>Vassalité</th><th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {lignesD.map((l) => {
                    if (l.kind === 'ete') {
                      const vEte = val(nEte, 'Nourriture')
                      return (
                        <tr key="nourr-ete" className="muted" style={{ background: fondRessource('Nourr - été', C) }}>
                          <td><strong>Nourr - été</strong></td>
                          <td>—</td><td>—</td><td>—</td><td>—</td><td>—</td>
                          <td>—</td><td>—</td><td>—</td><td>—</td><td>—</td><td>—</td>
                          <td><strong>{fmtNum(vEte)}</strong>{' '}
                            <span className="muted small">(créditée en été seulement)</span></td>
                        </tr>
                      )
                    }
                    const r = l.r
                    const total = val(production, r) + val(batiments, r) + val(amen, r)
                      + val(nEte, r) + val(aut, r) + val(hab, r) + val(population, r) + val(vassalite, r) + val(reg, r)
                      + val(fac, r) + val(cl, r) + val(com, r)
                    return (
                      <tr key={r} style={{ background: fondRessource(r, C) }}>
                        <td>
                          <span className="dot-res" style={{ background: couleurRessource(r, C) }} />
                          <strong>{r}</strong>
                        </td>
                        <td>{fmtNum(val(production, r))}</td>
                        <td>{fmtNum(val(batiments, r))}</td>
                        <td>{fmtNum(val(amen, r))}</td>
                        <td>{fmtNum(val(aut, r))}</td>
                        <td className="neg">{val(hab, r) !== 0 ? fmtNum(val(hab, r)) : '—'}</td>
                        <td>{fmtNum(val(population, r))}</td>
                        <td>{fmtNum(val(reg, r))}</td>
                        <td>{fmtNum(val(fac, r))}</td>
                        <td>{fmtNum(val(cl, r))}</td>
                        <td>{fmtNum(val(com, r))}</td>
                        <td>{fmtNum(val(vassalite, r))}</td>
                        <td className={total < 0 ? 'neg' : ''}><strong>{fmtNum(total)}</strong></td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )
        })()}
      </Card>

    </div>
  )
}

// ═══ Barre Ressources — flottante en haut de page, OUVERTE par défaut,
// minimaliste : une puce par ressource (stock modifiable + production
// / tour), réglage avancé replié, bouton ▼/▲ à droite. ═══

function RessourcesBar({ p, C, prodDetail, setPlayer }: {
  p: Player
  C: Cfg
  prodDetail: ProductionDetail
  setPlayer: (fn: (p: Player, s: GameState) => void) => void
}) {
  const [ouvert, setOuvert] = useState(true)
  const [baseOuvert, setBaseOuvert] = useState(false)
  // Pinnage au scroll (retour Thibaut 2026-10-14) : dès que la page
  // dépasse la position naturelle de la barre, celle-ci se colle en
  // HAUT DE LA FENÊTRE (position:fixed) — elle descend avec le scroll,
  // quel que soit le navigateur. Une butée invisible conserve la
  // mise en page pendant le pinnage.
  const barRef = useRef<HTMLDivElement | null>(null)
  const pinnedRef = useRef(false)
  const natTopRef = useRef(-1)
  const [pin, setPin] = useState<{ width: number; left: number; height: number } | null>(null)
  useEffect(() => {
    const el = barRef.current
    if (!el) return
    if (!pinnedRef.current) natTopRef.current = el.getBoundingClientRect().top + window.scrollY
    const sync = () => {
      const parent = el.parentElement
      if (!parent) return
      const pr = parent.getBoundingClientRect()
      const w = pr.width, l = pr.left, h = el.getBoundingClientRect().height
      // ne re-render que si la géométrie change (pas à chaque tick de scroll)
      setPin((prev) => (prev && Math.abs(prev.width - w) < 0.5
        && Math.abs(prev.left - l) < 0.5 && Math.abs(prev.height - h) < 0.5
        ? prev : { width: w, left: l, height: h }))
    }
    const update = () => {
      const should = window.scrollY > natTopRef.current - 8
      if (should === pinnedRef.current) {
        if (should) sync()
        return
      }
      pinnedRef.current = should
      if (should) sync()
      else setPin(null)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [ouvert, baseOuvert])
  return (
    <>
      {pin && <div style={{ height: pin.height }} aria-hidden="true" />}
      <div
        ref={barRef}
        className={`res-top${ouvert ? ' open' : ''}${pin ? ' pinned' : ''}`}
        style={pin ? { position: 'fixed', top: 8, width: pin.width, left: pin.left } : undefined}
      >
      {ouvert && (
        <>
          <div className="res-top-row">
            {C.ressources.map((r) => {
              const rs = p.resources[r] ?? { stock: 0, prod: 0 }
              const prod = prodDetail.total[r] ?? 0
              return (
                <span key={r} className="res-chip" style={{ background: fondRessource(r, C) }} title={`${r} — stock modifiable · production / tour calculée${r === 'Habitants' ? ' (production = titres × taxes des habitants)' : ''}`}>
                  <strong>{r}</strong>
                  <span className={rs.stock < 0 ? 'neg' : ''}>
                    <NumberInput
                      value={rs.stock}
                      step={r === 'Habitants' ? 1 : 5}
                      onChange={(v) => setPlayer((x) => {
                        if (!x.resources[r]) x.resources[r] = { stock: 0, prod: 0 }
                        x.resources[r].stock = v
                      })}
                    />
                  </span>
                  <span className={`small ${prod < 0 ? 'neg' : 'muted'}`}>
                    {prod === 0 ? '±0' : fmtNum(prod)}
                  </span>
                </span>
              )
            })}
            <button
              className="res-top-btn"
              onClick={() => setBaseOuvert(!baseOuvert)}
              title="Réglage avancé : production de base du pays"
            >
              {baseOuvert ? '▲ base' : '⚙ base'}
            </button>
          </div>
          {baseOuvert && (
            <div className="res-top-base">
              {C.ressources.map((r) => (
                <label key={r} className="field" style={{ minWidth: 120 }}>
                  <span className="field-label">{r}</span>
                  <NumberInput
                    value={p.resources[r]?.prod ?? 0}
                    step={0.5}
                    onChange={(v) => setPlayer((x) => {
                      if (!x.resources[r]) x.resources[r] = { stock: 0, prod: 0 }
                      x.resources[r].prod = v
                    })}
                  />
                </label>
              ))}
            </div>
          )}
        </>
      )}
      <button
        className="res-top-toggle"
        onClick={() => setOuvert(!ouvert)}
        title="Ressources — stock et production par tour"
      >
        {ouvert ? '▲' : '▼ Ressources'}
      </button>
    </div>
    </>
  )
}

/** Formate des effets par tour : « +2 Or, -10 Nourriture ». Garnison et
 *  Tourisme sont des VALEURS D'ÉTAT (pas des flux) : sans signe. */
const RESSOURCES_ETAT = ['Garnison', 'Tourisme']

/** Classe de pastille par FAMILLE de bâtiment (retour Thibaut, marqueur
 *  (r)) : rouge Militaire, jaune Economique, bleu Capitale, blanc
 *  Faction, violet Guilde (couleur de Guilde arbitrée par Vibe —
 *  à modifier dans styles.css si Thibaut préfère autre chose). */
const FAM_BADGES: Record<string, string> = {
  Militaire: 'badge-fam-mil',
  Economique: 'badge-fam-eco',
  Capitale: 'badge-fam-cap',
  Faction: 'badge-fam-fac',
  Guilde: 'badge-fam-gui',
}
function fmtEffets(effets: Record<string, number>, C: Cfg): string {
  const entries = Object.entries(effets).filter(([, v]) => v !== 0)
    .sort((a, b) => C.ressources.indexOf(a[0]) - C.ressources.indexOf(b[0]))
  if (entries.length === 0) return '—'
  return entries.map(([r, v]) => {
    const etat = RESSOURCES_ETAT.includes(r)
    return `${!etat && v > 0 ? '+' : ''}${fmt(v)} ${r}`
  }).join(', ')
}

/** Formate un coût de construction : « 25 Or + 4 Fer ». */
function fmtCout(cout: Record<string, number>): string {
  const entries = Object.entries(cout).filter(([, v]) => v > 0)
  if (entries.length === 0) return 'gratuit'
  return entries.map(([r, v]) => `${fmt(v)} ${r}`).join(' + ')
}

/** Nombre avec signe explicite pour le récap (0 = —). */
function fmtNum(v: number): string {
  return v === 0 ? '—' : `${v > 0 ? '+' : ''}${fmt(v)}`
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="field">
      <span className="field-label">{label}</span>
      {children}
    </label>
  )
}

export { fmt }
