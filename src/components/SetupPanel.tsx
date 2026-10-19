// ══════════════════════════════════════════════════════════════════════
//  Création de partie : 2 à 8 joueurs (peuple, culture, régime, population
//  initiale, % mariages, villes), graine, mode local ou Supabase.
//  Équivalent du formulaire frmInitPop du classeur.
//  La connexion multijoueur se règle ENTIEREMENT ici, dans le navigateur :
//  aucun .env, aucune ligne de commande.
// ══════════════════════════════════════════════════════════════════════

import { useState } from 'react'
import { useGame, type Mode } from '../state/store'
import type { SetupLine } from '../engine/setup'
import { defaultSetups } from '../engine/setup'
import { CULTURES as CULTURES_ALL, PEUPLES as PEUPLES_ALL, REGIMES as REGIMES_ALL } from '../engine/gameData'
import { newSeed } from '../engine/rng'
import {
  supabaseAvailable, supabaseCreds, setSupabaseCredentials,
  clearSupabaseCredentials, testSupabase,
} from '../supabase/client'
import { Card, NumberInput, Select, TextInput, Button, Badge } from './ui'

const SCHEMA_URL =
  'https://raw.githubusercontent.com/losth230/quartz/chasse-et-peche-web/supabase/schema.sql'

// BLINDAGE (crash signalé 2026-10-17 : « Cannot read properties of
//  undefined (reading 'filter') » à la page Nouvelle partie) : une
//  config localStorage ancienne/corrompue peut avoir des tableaux
//  vides ou absents (cultures, peuples, régimes supprimés ou mal
//  sauvegardés) — le SetupPanel doit rester utilisable.
const CULTURES = CULTURES_ALL ?? []
const PEUPLES = PEUPLES_ALL ?? []
const REGIMES = REGIMES_ALL ?? []

export function SetupPanel() {
  const { newGame, joinGame, monNumero, setMonNumero } = useGame()
  const [setups, setSetups] = useState<SetupLine[]>(() => defaultSetups().map((s, i) => ({
    ...s,
    culture: CULTURES.length > 0 ? CULTURES[i % CULTURES.length].nom : s.culture,
    villes: ['Capitale'],
  })))
  const [seed, setSeed] = useState<number>(() => newSeed())
  const [mode, setMode] = useState<Mode>('local')
  const [salon, setSalon] = useState('chasse-peche')
  // Nombre de joueurs de la nouvelle campagne (retour Thibaut
  //  2026-10-14, marqueur (q)) : 2 à 8, défaut 8. Les lignes au-delà
  //  restent dans `setups` et réapparaissent si on remonte le curseur.
  const [nbJoueurs, setNbJoueurs] = useState(8)

  // ── Connexion Supabase (entièrement dans le navigateur) ──
  const creds = supabaseCreds()
  const [sbUrl, setSbUrl] = useState(creds?.url ?? '')
  const [sbKey, setSbKey] = useState(creds?.key ?? '')
  const [sbStatus, setSbStatus] = useState<{ ok: boolean; message: string } | null>(
    supabaseAvailable() ? { ok: true, message: 'Connecté (identifiants mémorisés dans ce navigateur).' } : null,
  )
  const [busy, setBusy] = useState(false)

  const connect = async () => {
    setBusy(true)
    setSupabaseCredentials(sbUrl, sbKey)
    setSbStatus(await testSupabase())
    setBusy(false)
  }
  const forget = () => {
    clearSupabaseCredentials()
    setSbUrl('')
    setSbKey('')
    setSbStatus(null)
  }
  const rejoin = async () => {
    setBusy(true)
    const ok = await joinGame(salon.trim())
    setSbStatus(
      ok
        ? { ok: true, message: `Salon « ${salon} » rejoint — la partie est chargée.` }
        : { ok: false, message: `Aucune partie trouvée pour le salon « ${salon} ». Vérifiez le code, la connexion Supabase, ou créez la partie ci-dessous.` },
    )
    setBusy(false)
  }

  const setLine = (i: number, patch: Partial<SetupLine>) =>
    setSetups((prev) => prev.map((s, idx) => (idx === i ? { ...s, ...patch } : s)))

  const culturesPrises = (setups ?? []).map((s) => s?.culture ?? '')

  return (
    <div className="stack">
      <Card title="🌐 Jouer en ligne, sans rien installer">
        <p className="muted small">
          Pour jouer chacun sur son écran, il faut un petit serveur de sauvegarde gratuit
          (Supabase). Tout se fait en un seul copier-coller, sans terminal :
        </p>
        <ol className="small">
          <li>Le jeu est déjà pré-configuré avec le projet Supabase du site quartz — identifiants pré-remplis ci-dessous.</li>
          <li><strong>Une seule fois</strong> : dans ce projet, ouvrez <strong>SQL Editor</strong> et collez le contenu de{' '}
            <a href={SCHEMA_URL} target="_blank" rel="noreferrer">supabase/schema.sql</a>, puis <strong>Run</strong>.{' '}
            (crée la table <code>parties_chasse_peche</code>, sans authentification — sinon « table introuvable »)</li>
          
        </ol>
        <div className="grid-3">
          <label className="field">
            <span className="field-label">URL du projet Supabase</span>
            <TextInput value={sbUrl} placeholder="https://xxxx.supabase.co" onChange={setSbUrl} />
          </label>
          <label className="field">
            <span className="field-label">Clé « anon public » (publique, sans danger)</span>
            <TextInput value={sbKey} placeholder="eyJhbGciOi…" onChange={setSbKey} />
          </label>
          <label className="field">
            <span className="field-label">Connexion</span>
            <div className="row">
              <Button tone="primary" disabled={busy || !sbUrl || !sbKey} onClick={connect}>🔌 Connecter</Button>
              {supabaseAvailable() && <Button onClick={forget}>Oublier</Button>}
            </div>
          </label>
        </div>
        {sbStatus && <p className="small">
          <Badge tone={sbStatus.ok ? 'good' : 'bad'}>{sbStatus.ok ? 'OK' : '!'}</Badge> {sbStatus.message}
        </p>}
        <div className="row">
          <label className="field" style={{ minWidth: 220 }}>
            <span className="field-label">Mon n° de joueur (tour simultané — chacun choisit le sien)</span>
            <Select
              value={String(monNumero)}
              options={[1, 2, 3, 4, 5, 6, 7, 8].map((n) => ({ value: String(n), label: `Joueur ${n}` }))}
              onChange={(v) => setMonNumero(parseInt(v, 10))}
            />
          </label>
          <label className="field">
            <span className="field-label">Rejoindre une partie existante (code de salon)</span>
            <TextInput value={salon} onChange={setSalon} />
          </label>
          <Button disabled={busy || !supabaseAvailable() || !salon.trim()} onClick={rejoin}>
            🔗 Rejoindre ce salon
          </Button>
        </div>
        <p className="muted small">
          Tous les joueurs entrent le même code de salon : l'un crée la partie ci-dessous, les autres
          cliquent « Rejoindre ». La partie se synchronise alors en temps réel.
        </p>
      </Card>

      <Card title={`Nouvelle campagne — ${nbJoueurs} joueur(s)`}>
        <div className="filters">
          <label className="field" style={{ maxWidth: 220 }}>
            <span className="field-label">Nombre de joueurs</span>
            <Select
              value={String(nbJoueurs)}
              options={Array.from({ length: 7 }, (_, k) => ({
                value: String(k + 2),
                label: `${k + 2} joueurs`,
              }))}
              onChange={(v) => setNbJoueurs(parseInt(v, 10))}
            />
          </label>
          <p className="muted small" style={{ margin: 0, alignSelf: 'flex-end' }}>
            Le jeu est conçu pour 6 à 8 joueurs — les lignes de setup au-delà du
            nombre choisi sont simplement ignorées (et réapparaissent si vous
            augmentez le nombre).
          </p>
        </div>
        <div className="table-wrap">
          <table className="tbl small">
            <thead>
              <tr>
                <th>#</th><th>Nom</th><th>Peuple</th><th>Culture</th>
                <th>Régime</th><th>Capitale</th><th>Habitants / ville</th><th>% mariés</th><th>Villes (séparées par ,)</th>
              </tr>
            </thead>
            <tbody>
              {setups.slice(0, nbJoueurs).map((s, i) => (
                <tr key={i}>
                  <td><strong>J{i + 1}</strong></td>
                  <td><TextInput value={s.nom} onChange={(v) => setLine(i, { nom: v })} /></td>
                  <td>
                    <Select
                      value={s.peuple}
                      options={PEUPLES.map((p) => ({ value: p.nom, label: p.nom }))}
                      onChange={(v) => setLine(i, { peuple: v })}
                    />
                  </td>
                  <td>
                    <Select
                      value={s.culture}
                      options={CULTURES.map((c) => ({
                        value: c.nom,
                        label: `${c.nom}${(culturesPrises ?? []).filter((x) => x === c.nom).length > 1 ? ' (déjà prise)' : ''}`,
                      }))}
                      onChange={(v) => setLine(i, { culture: v })}
                    />
                  </td>
                  <td>
                    <Select
                      value={s.regime}
                      options={REGIMES.map((r) => ({ value: r.nom, label: r.nom }))}
                      onChange={(v) => setLine(i, { regime: v })}
                    />
                  </td>
                  <td>
                    <Select
                      value={s.typeCapitale ?? 'Ville'}
                      options={[
                        { value: 'Ville', label: 'Cité (Hameau → Cité → Grande Cité)' },
                        { value: 'Château', label: 'Château (Motte → Donjon → Forteresse)' },
                      ]}
                      onChange={(v) => setLine(i, { typeCapitale: v as 'Ville' | 'Château' })}
                    />
                  </td>
                  <td>
                    <NumberInput value={s.taillePopulation} min={2} max={200}
                      onChange={(v) => setLine(i, { taillePopulation: Math.round(v) })} />
                  </td>
                  <td>
                    <NumberInput value={s.pourcentageMariages} min={0} max={100}
                      onChange={(v) => setLine(i, { pourcentageMariages: Math.round(v) })} />
                  </td>
                  <td style={{ minWidth: 180 }}>
                    <TextInput value={(s.villes ?? []).join(', ')}
                      onChange={(v) => setLine(i, { villes: v.split(',').map((x) => x.trim()).filter(Boolean) })} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card title="Options de la partie">
        <div className="grid-3">
          <label className="field">
            <span className="field-label">Graine (déterminisme)</span>
            <div className="row">
              <NumberInput value={seed} min={1} onChange={(v) => setSeed(Math.max(1, Math.round(v)))} />
              <Button onClick={() => setSeed(newSeed())} title="Nouvelle graine aléatoire">🎲</Button>
            </div>
          </label>
          <label className="field">
            <span className="field-label">Mode de jeu</span>
            <Select value={mode} options={[
              { value: 'local', label: 'Local (un seul écran, sauvegarde navigateur)' },
              ...(supabaseAvailable()
                ? [{ value: 'supabase', label: 'Multijoueur en ligne (temps réel)' }]
                : [{ value: 'supabase', label: 'Multijoueur en ligne — connectez Supabase ci-dessus' }]),
            ]} onChange={(v) => setMode(v as Mode)} />
          </label>
          <label className="field">
            <span className="field-label">Code du salon (mode multijoueur)</span>
            <TextInput value={salon} onChange={setSalon} />
          </label>
        </div>
        <Button
          tone="primary"
          disabled={mode === 'supabase' && !supabaseAvailable()}
          onClick={() => newGame(setups.slice(0, nbJoueurs), seed, mode, salon)}
        >
          ▶ Créer la partie
        </Button>
        <p className="muted small">
          Même code de salon = même partie en temps réel ; sans Supabase, jouable en local.
        </p>
      </Card>
    </div>
  )
}
