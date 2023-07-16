Quartz uses [Katex](https://katex.org/) by default to typeset both inline and block math expressions at build time.

## Formatting

### Block Math
Block math can be rendered by delimiting math expression with `$$`.

```
$$
f(x) = \int_{-\infty}^\infty
    f\hat(\xi),e^{2 \pi i \xi x}
    \,d\xi
$$
```

$$
f(x) = \int_{-\infty}^\infty
    f\hat(\xi),e^{2 \pi i \xi x}
    \,d\xi
$$

### Inline Math
Similarly, inline math can be rendered by delimiting math expression with a single `$`. For example, `$e^{i\pi} = -1$` produces $e^{i\pi} = -1$

### Escaping symbols
There will be cases where you may have more than one `$` in a paragraph at once which may accidentally trigger MathJax/Katex. 

To get around this, you can escape the dollar sign by doing `\$` instead.

For example:
- Incorrect: `I have $1 and you have $2` produces I have $1 and you have $2
- Correct: `I have \$1 and you have \$2` produces I have \$1 and you have \$2

## MathJax
In `quartz.config.ts`, you can configure Quartz to use [MathJax SVG rendering](https://docs.mathjax.org/en/latest/output/svg.html) by replacing `Plugin.Latex({ renderEngine: 'katex' })` with `Plugin.Latex({ renderEngine: 'mathjax' })`

## Customization
- Removing Latex support: remove all instances of `Plugin.Latex()` from `quartz.config.ts`.
- Plugin: `quartz/plugins/transformers/latex.ts`