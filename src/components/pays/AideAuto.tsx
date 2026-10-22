// ══════════════════════════════════════════════════════════════════════
//  Aide « QU'EST-CE QUI EST COMPTÉ AUTOMATIQUEMENT ? » (marqueur (a),
//  retour Thibaut : « je ne comprends pas ce qui est compté
//  automatiquement et ce qui ne l'est pas »). Bloc repliable natif,
//  sans état. (Extrait de PlayerView.tsx — un fichier par UI.)
// ══════════════════════════════════════════════════════════════════════

import { fmt } from '../ui'
import type { Cfg } from '../../engine/gameData'

export function AideAuto({ C }: { C: Cfg }) {
  return (
    <details className="aide-auto">
      <summary>🧮 Qu'est-ce que l'application compte automatiquement ?</summary>
      <div className="grid-2 aide-auto-grid">
        <div>
          <strong>✅ Compté automatiquement</strong> — à chaque « ▶ Terminer le tour » (une seule pression suffit, TOUT est crédité) :
          <ul className="small">
            <li><strong>Impôts des habitants</strong> : métiers × taxes de chaque ville, sur toutes les ressources, moins leur consommation.</li>
            <li><strong>Production</strong> des bâtiments, aménagements et lignes « Autres » — la « Nourr - été » n'est créditée qu'en été.</li>
            <li><strong>Consommation des habitations</strong> (rang de chaque ville) et <strong>bonus de proximité</strong> (Rivière / Mer).</li>
            <li><strong>Règles de pays & culture</strong> (ex. +N par ville de ta culture dans le monde) et <strong>lois de régime</strong>.</li>
            <li><strong>Tribut des vassaux</strong> et <strong>taxes des cités libres</strong> sous ta suzeraineté.</li>
            <li><strong>Routes commerciales</strong> : +{fmt(C.p.marchandOrTour)} Or aux DEUX joueurs + copie de l'aménagement (une production d'été n'est copiée qu'en été).</li>
            <li><strong>Ministres « Auto »</strong> (badge page 👥 Population) : Trésorier +5 Or/tour, Grand Précepteur +1 Science/tour, Grand prévôt +1 Fer/tour, Grand Chambellan +10 % taxes reçues, Sénéchal +15 Nourriture fin d'été, Maître de cour et Légat +Tourisme fin de saison, Connétable +15 Garnison à la nomination, Grand bailli (fondations), Surintendant des finances (après construction), Grand bibliothécaire (après technologie), Grand écuyer (prix de levée d'armée −10 Or par rang de pays), Chanceliers (sacres réduits).</li>
            <li><strong>Gouverneur</strong> : le noble le plus âgé est nommé automatiquement, +10 % d'impôts sur sa ville.</li>
            <li><strong>Tourisme = comme le Bois, sauf qu'il ne s'accumule pas</strong> : sa production est affichée et comptée partout (récaps de ville et de tour, canaux, tableaux) — bâtiments (Chapelle +35), Artistes, lois de culture, techs, vassalité, ministres — mais à chaque fin de tour le stock est RECALCULÉ pour égaler la production courante (stock = prod, jamais cumulé). Garnison : valeur d'état.</li>
            <li><strong>Démographie des joueurs</strong> : naissances (modulées par les taxes), vieillissement, décès, migrations scolaires (vers un Professeur).</li>
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
  )
}
