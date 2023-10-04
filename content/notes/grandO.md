---
title: "La notation O()"
tags:
- maths
- info
- complexité
---

# Définition

Soient deux fonctions $f : \mathbb{N} \mapsto \mathbb{N}$ et $g : \mathbb{N} \mapsto \mathbb{N}$, on dit que $f(N)$ est dominée par $g(N)$, aussi noté $f(N) \in O(g(N))$ s'il existe des constantes $c$ et $k$ telles que $|f(x)|<c\cdot |g(x)|$ pour tout $x>k$

$O(g(N))$ est l'ensemble des fonctions dominées[^1] par $g(N)$

[^1]: : asymptotiquement, quand x tend vers l'infini

# Propriétés

1. $O(f(N)+c)=O(f(N))$, pour toute constante $c$
2. $O(c\cdot f(N))=O(f(N))$, pour toute constante $c$
3. $O(f(N)+g(N))=O(f(N))$, si $g$ est dominée par $f$

> [!tip] Remarques
> 
> - $O(c\cdot f(N))=O(f(N))$ permet de s'abstraire des spécificités de la machine, du langage, etc.
> - $O(f(N)+c)=O(f(N))$ permet de négliger les opérations réalisées un nombre constant de fois dans l'algorithme : initialisation etc.

# Dominance des fonctions usuelles

> [!tip]
> $$O(1)\subseteq O(\log_{2}(N))\subseteq O(N)\subseteq O(N\cdot\log_{2}(N))\subseteq O(N^{2})\subseteq O(N^{3}) \subseteq O(2^{N})$$

# Ecriture de la complexité avec $O(N)$

Les fonctions dominantes utilisées en complexité (pour un pire cas) :
- O(1) : complexité constante
- O($log_{2}(N)$) : logarithmique
- O(N) : linéaire
-  O(N$\cdot log_{2}(N)$) : linéarithmique
- O($N^2$) : quadratique
- O($N^3$) : cubique
- O($N^k$) : polynomiale (avec $k$ constante)
- O($2^N$) : exponentielle

---
Issu du cours de [Thomas Genet](http://people.irisa.fr/Thomas.Genet/)