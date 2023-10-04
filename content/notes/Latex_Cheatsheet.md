---
title: "Latex Cheatsheet"
tags:
- info
- latex
- maths
- tips
---

> [!hint] Information
> 
> La plupart des symboles LaTeX peuvent être trouvés sur le site [Detexify](https://detexify.kirelabs.org/classify.html), mais cette cheatsheet présente ceux que j'utilise le plus souvent

# Texte

| Action                    | Commande Latex            |
| ------------------------- | ------------------------- |
| mettre en gras            | `\bf{}`                   |
| mettre en italique        | `\emph{}`                 |
| souligner                 | `\underline{}`            |
| mettre en couleur (exemple : rouge) | `\textcolor{red}{texte}` |
| petit espace | `\,` |
| espace moyen | `\:` |
| gros espace | `\;` |
| espace négatif qui rapproche | `\!` |

# Mathématiques

## Expressions

### Système

$$
\begin{cases}
2x+1=3 \\
3x+2=5
\end{cases}
$$
```latex
\begin{cases}
2x+1=3 \\
3x+2=5
\end{cases}
```

### Matrice
#### Crochets

$$
\begin{bmatrix}
1&2&3 \\ 4&5&6 \\ 7&8&9
\end{bmatrix}
$$
```latex
\begin{bmatrix}
1&2&3 \\ 4&5&6 \\ 7&8&9
\end{bmatrix}
```

#### Parenthèses
$$
\begin{pmatrix}
1&2&3 \\ 4&5&6 \\ 7&8&9
\end{pmatrix}
$$
```latex
\begin{pmatrix}
1&2&3 \\ 4&5&6 \\ 7&8&9
\end{pmatrix}
```

#### Barres verticales
$$
\begin{vmatrix}
1&2&3 \\ 4&5&6 \\ 7&8&9
\end{vmatrix}
$$
```latex
\begin{vmatrix}
1&2&3 \\ 4&5&6 \\ 7&8&9
\end{vmatrix}
```

#### Accolades
$$
\begin{Bmatrix}
1&2&3 \\ 4&5&6 \\ 7&8&9
\end{Bmatrix}
$$
```latex
\begin{Bmatrix}
1&2&3 \\ 4&5&6 \\ 7&8&9
\end{Bmatrix}
```

#### Sans délimiteurs
$$
\begin{matrix}
1&2&3 \\ 4&5&6 \\ 7&8&9
\end{matrix}
$$
```latex
\begin{matrix}
1&2&3 \\ 4&5&6 \\ 7&8&9
\end{matrix}
```

### Limites

$$
\lim_{n\to\infty}u_n-1
$$
```latex
\lim_{n\to\infty}u_n-1
```

### Intégrales
$$
\int_{0}^{1}x^{2}dx
$$
```latex
\int_{0}^{1}x^{2}dx
```

### Sommes et produits

$$
\sum_{k=0}^{n} k
$$
```latex
\sum_{k=0}^{n} k
```

$$
\prod_{k=0}^{n} k
$$
```latex
\prod_{k=0}^{n} k
```

### Racines n-ièmes

$$
\sqrt[n]{2x-5}
$$

```latex
\sqrt[n]{2x-5}
```

## Symboles

| Action                                 | Commande Latex                | Résultat                      |
| -------------------------------------- | ----------------------------- | ----------------------------- |
| équivalent à                           | `\iff`                        | $\iff$                        |
| supérieur ou égal                      | `\ge`                         | $\ge$                         |
| inférieur ou égal                      | `\leq`                        | $\leq$                        |
| différent de                           | `\neq`                        | $\neq$                        |
| il existe                              | `\exists`                     | $\exists$                     |
| pour tout                              | `\forall`                     | $\forall$                     |
| ensembles mathématiques (exemple : N)  | `\mathbb{N}`                  | $\mathbb{N}$                  |
| plus ou moins                          | `\pm`                         | $\pm$                         |
| infini                                 | `\infty`                      | $\infty$                      |
| implication droite                     | `\Rightarrow`                 | $\Rightarrow$                 |
| implication gauche                     | `\Leftarrow`                  | $\Leftarrow$                  |
| conjugué (barre supérieur)             | `\overline{z}`                | $\overline{z}$                |
| environ                                | `\approx`                     | $\approx$                     |
| grandes parenthèses (ou autre symbole) | `\left( \frac{1}{2} \right )` | $\left( \frac{1}{2} \right )$ |
| flèches                                | `\rightarrow` et `\leftarrow` | $\rightarrow$ et $\leftarrow$ |
| flèche qui associe                     | `\mapsto`                     | $\mapsto$                     |
| inclus dans / contient                 | `\subseteq` / `\supseteq`     | $\subseteq$ / $\supseteq$     |
| vecteur                                | `\overrightarrow{AB}`         | $\overrightarrow{AB}$         |


# Lettres grecques
## Minuscules
| Lettre           | Commande      | Résultat      |
| ---------------- | ------------- | ------------- |
| alpha            | `\alpha`      | $\alpha$      |
| beta             | `\beta`       | $\beta$       |
| gamma            | `\gamma`      | $\gamma$      |
| delta            | `\delta`      | $\delta$      |
| epsilon          | `\epsilon`    | $\epsilon$    |
| epsilon variante | `\varepsilon` | $\varepsilon$ |
| zeta             | `\zeta`       | $\zeta$       |
| eta              | `\eta`        | $\eta$        |
| theta            | `\theta`      | $\theta$      |
| theta variante   | `\vartheta`   | $\vartheta$   |
| iota             | `\iota`       | $\iota$       |
| kappa            | `\kappa`      | $\kappa$      |
| lambda           | `\lambda`     | $\lambda$     |
| mu               | `\mu`         | $mu$          |
| nu               | `\nu`         | $\nu$         |
| xi               | `\xi`         | $\xi$         |
| pi               | `\pi`         | $\pi$         |
| rho              | `\rho`        | $\rho$        |
| sigma            | `\sigma`      | $\sigma$      |
| tau              | `\tau`        | $\tau$        |
| upsilon          | `\upsilon`    | $\upsilon$    |
| phi              | `\phi`        | $\phi$        |
| phi variante     | `\varphi`     | $\varphi$     |
| chi              | `\chi`        | $\chi$        |
| psi              | `\psi`        | $\psi$        |
| omega            | `\omega`      | $\omega$              |


## Majuscules

| Lettre  | Commande   | Résultat   |
| ------- | ---------- | ---------- |
| gamma   | `\Gamma`   | $\Gamma$   |
| delta   | `\Delta`   | $\Delta$   |
| theta   | `\Theta`   | $\Theta$   |
| lambda  | `\Lambda`  | $\Lambda$  |
| xi      | `\Xi`      | $\Xi$      |
| pi      | `\Pi`      | $\Pi$      |
| sigma   | `\Sigma`   | $\Sigma$   |
| upsilon | `\Upsilon` | $\Upsilon$ |
| phi     | `\Phi`     | $\Phi$     |
| psi     | `\Psi`     | $\Psi$     |
| omega   | `\Omega`   | $\Omega$   | 
