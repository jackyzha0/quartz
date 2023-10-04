import { QuartzComponentConstructor, QuartzComponentProps } from "../types"

function NotFound({ cfg }: QuartzComponentProps) {
  return (
    <article class="popover-hint">
      <h1>Erreur 404</h1>
      <p>Cette page est privée, ou alors elle n'existe pas. On te ramène à l'<a href="/">accueil</a > ?</p>
    </article>
  )
}

export default (() => NotFound) satisfies QuartzComponentConstructor
