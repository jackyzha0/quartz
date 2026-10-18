---
title: "O fluxo vem antes da ferramenta"
destaque: "fluxo"
date: 2026-10-18T10:00:00-03:00
description: "Post de exemplo que mostra todos os elementos de texto do tema."
categories: [processos]
tags: [design, sistemas]
toc: true
---

Texto de exemplo do corpo. Toda ferramenta nova promete resolver o problema, mas poucas perguntam qual é o processo[^1] que ela deveria sustentar. Este post mostra como cada elemento do Markdown aparece no tema.

## Títulos e parágrafos

Os títulos de seção usam Bricolage 800 e a cor de acento. O corpo usa Source Serif 4, com **negrito**, *itálico* e [links](https://gohugo.io) na cor de acento.

### Subtítulo

> Citação direta recuada, com filete lateral na cor de acento.

- Lista com marcadores
- Frases curtas
- Um diagrama vale mais que um parágrafo

1. Primeiro passo
2. Segundo passo

## Código

Código em linha: `const marca = { clareza: true }`.

```js
const marca = {
  clareza: true,
  ruido: false, // sem enfeite
};
```

## Tabela

| Elemento | Duração |
| --- | --- |
| Botão | 350 ms |
| Ícone | 300 ms |
| Revelação | 500 ms |

## Componentes

{{< aviso titulo="Fonte" >}}
Todo número leva a fonte na própria peça, com ano e abrangência.
{{< /aviso >}}

Ícones da marca: {{< icone "codigo" >}} {{< icone "design" >}} {{< icone "processo" >}}

{{< botao href="/posts/" >}}ver todos os textos{{< /botao >}}

Mais texto de exemplo. A hipótese deste ensaio é que desenhar o fluxo antes de escolher a ferramenta reduz retrabalho.

[^1]: Referência de exemplo, conforme a norma da instituição.
