# Tema Hugo — Filipe Costa

Tema editorial para Hugo construído a partir da identidade visual de Filipe Costa:

- **Brandbook — Filipe Costa** (pranchas de cor, tipografia, logo, ícones, movimento e site)
- **Design Tokens e CSS — Filipe Costa (Desenvolvimento)**
- **Guia de Identidade Visual — Filipe Costa (Design)**

Modo escuro como padrão, roxo neon pastel `#B994FF` como acento, Bricolage Grotesque nos títulos, JetBrains Mono nos rótulos, Source Serif 4 no texto corrido e o cursor `▌` fechando o wordmark.

## Uso

Requer Hugo **0.128 ou mais novo** (versão *extended* não é necessária).

```toml
# hugo.toml do site
theme = "filipe-costa"
removePathAccents = true

# O Hugo não herda [markup] de temas: copie este bloco
[markup]
  [markup.highlight]
    noClasses = false
```

O site de exemplo completo está em [`exampleSite/`](exampleSite/):

```sh
cd themes/filipe-costa/exampleSite
hugo server --themesDir ../..
```

## Parâmetros (`[params]`)

| Parâmetro | Uso |
| --- | --- |
| `author` | Nome no rodapé e na assinatura dos posts |
| `description` | Descrição padrão do site (meta e Open Graph) |
| `wordmark` | Texto do logo. Padrão: `filipe costa` |
| `tagline` | Rótulo mono do rodapé. Padrão: `programador · designer · processos` |
| `mainSections` | Seções cujos posts aparecem na página inicial. Vazio = todas as páginas |
| `homePosts` | Quantos posts na página inicial. Padrão: 7 |
| `archive` | Link do botão "ver todos" na página inicial |
| `toc` | Mostra o sumário nos posts. Também pode ser ligado por post |
| `ogImage` | Imagem padrão para compartilhamento |
| `footerNote` | Texto extra no rodapé |
| `[params.hero]` | `label`, `title`, `highlight` (palavra em roxo), `end` e `lead` do hero |
| `[params.cta]` | `label` e `url` do botão em pílula do cabeçalho |
| `[[params.social]]` | Links do rodapé: `name`, `url` e `icon` (opcional) |

## Front matter

| Campo | Uso |
| --- | --- |
| `destaque` | Uma palavra do título que aparece em roxo (regra da marca: uma por título) |
| `description`, `descricao` ou `descrição` | Resumo usado nos cards e nas metatags |
| `subtitulo` | Linha de apoio abaixo do título |
| `categories`, `tags` | Taxonomias. A primeira categoria aparece no rótulo do post |
| `toc` | `true` para mostrar o sumário |
| `pagina` | `true` para páginas sem data, autor nem navegação entre posts (ex.: "Sobre") |
| `tema` | `light` ou `dark` para forçar um tema na página. A escolha do leitor prevalece |
| `imagem` | Imagem de compartilhamento do post |

## Shortcodes

```md
{{< icone "processo" >}}
{{< icone name="ok" size="32" label="Concluído" >}}

{{< botao href="/sobre/" primario="true" icone="email" >}}vamos conversar{{< /botao >}}

{{< aviso titulo="Fonte" >}}Texto em **markdown**.{{< /aviso >}}
{{< aviso titulo="Importante" destaque="true" >}}Versão em roxo, no máximo uma por página.{{< /aviso >}}

{{< duotone src="foto.jpg" alt="Descrição da foto" legenda="Foto: arquivo pessoal" >}}
```

Ícones disponíveis (kit da marca: grade 24px, traço 2px): `codigo`, `terminal`, `design`, `processo`, `ok`, `seguir`, `voltar`, `menu`, `busca`, `email`, `perfil`, `agenda`, `link`, `rapido`, `baixar`, `ajustes`, `novo`, `sol`, `lua`, `rss`.

## Estrutura do CSS

Os arquivos em `assets/css/` são concatenados nesta ordem e, em produção, minificados com fingerprint:

1. `tokens.css`: primitivos e semânticos, temas escuro e claro, tipografia, espaçamento, raios, movimento
2. `base.css`: reset, layout, cabeçalho, rodapé
3. `components.css`: logo e cursor, botão, card, tags, campo, ícones, duotone, aviso, movimento reduzido
4. `prose.css`: texto corrido dos posts
5. `syntax.css`: realce de sintaxe com as cores da marca

Para ajustes do site sem editar o tema, crie `assets/css/custom.css` no site: ele entra por último. Componentes consomem só tokens semânticos (`--accent`, `--border`…), nunca os primitivos.

## Regras da marca aplicadas

- No tema claro o acento vira Profundo `#5B3FD1`. O roxo pastel fica só em preenchimentos, com texto Noite.
- Um único card de destaque (roxo) por tela: o post mais recente na página inicial.
- Movimento: cursor pisca a 1s sem fade, hero com revelação de 500ms, botão preenche em 350ms, card sobe 4px. Tudo desligado com `prefers-reduced-motion`, e o cursor fica fixo.
- Alvos de toque de 44px ou mais, foco visível, `lang="pt-BR"`, link para pular ao conteúdo.
- O tema segue a preferência do sistema até o leitor escolher no botão sol/lua. A escolha fica salva no navegador.

## Pendências herdadas do guia

- A copy do hero ("Faço o complexo parecer simples") é placeholder e precisa ser validada.
- A cor de sucesso no escuro (`#5FD3A0`) ainda é proposta.
- Trocar `contato@seusite.com` no exemplo pelo endereço real.
