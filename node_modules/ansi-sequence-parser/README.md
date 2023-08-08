# `ansi-sequence-parser`

Parse ANSI escape sequences into a readable format for things like generating pretty HTML.

Install with your favourite package manager:

```sh
pnpm install ansi-sequence-parser
yarn add ansi-sequence-parser
npm install ansi-sequence-parser
```

## Parsing

Token format:

```ts
interface ParseToken {
  // The text content of the token
  value: string;
  // The foreground color
  foreground: Color | null;
  // The background color
  background: Color | null;
  // A Set of the applied decorations
  decorations: Set<DecorationType>;
}
```

Parse full input at once:

```ts
import { parseAnsiSequences } from 'ansi-sequence-parser';

const tokens = parseAnsiSequences(input);
```

If you want to parse your input in multiple chunks, make sure to create a parser so that you can maintain
state between chunks:

```ts
import { createAnsiSequenceParser } from 'ansi-sequence-parser';

const parser = createAnsiSequenceParser();

const tokensByLine = input.split(/\r?\n/).map((line) => parser.parse(line));
```

## Colors

Colors format:

```ts
// A named ANSI color, e.g. `magenta` or `brightBlue`
export interface NamedColor {
  type: 'named';
  name: ColorName;
}

// A color-table lookup
export interface TableColor {
  type: 'table';
  index: number;
}

// An RGB color
export interface RgbColor {
  type: 'rgb';
  rgb: [number, number, number];
}

export type Color = NamedColor | TableColor | RgbColor;
```

In order to interpret all of the above color types as a hex code, you can create a color palette:

```ts
import { parseAnsiSequences, createColorPalette } from 'ansi-sequence-parser';

const tokens = parseAnsiSequences(input);
const colorPalette = createColorPalette();

for (const token of tokens) {
  if (token.foreground) {
    const foregroundValue = colorPalette.value(token.foreground);
  }
  if (token.background) {
    const backgroundValue = colorPalette.value(token.background);
  }
}
```

You can also specify a custom named colors map:

```ts
import { parseAnsiSequences, createColorPalette } from 'ansi-sequence-parser';

const tokens = parseAnsiSequences(input);
const colorPalette = createColorPalette({
  black: '#000000',
  red: '#bb0000',
  green: '#00bb00',
  yellow: '#bbbb00',
  blue: '#0000bb',
  magenta: '#ff00ff',
  cyan: '#00bbbb',
  white: '#eeeeee',
  brightBlack: '#555555',
  brightRed: '#ff5555',
  brightGreen: '#00ff00',
  brightYellow: '#ffff55',
  brightBlue: '#5555ff',
  brightMagenta: '#ff55ff',
  brightCyan: '#55ffff',
  brightWhite: '#ffffff',
});
```

If you want to modify the default named colors map, you can import the `defaultNamedColorsMap`:

```ts
import {
  parseAnsiSequences,
  createColorPalette,
  defaultNamedColorsMap,
} from 'ansi-sequence-parser';

const tokens = parseAnsiSequences(input);
const colorPalette = createColorPalette({
  ...defaultNamedColorsMap,
  blue: '#0000cc',
});
```
