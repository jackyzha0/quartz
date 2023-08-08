declare const namedColors: readonly ["black", "red", "green", "yellow", "blue", "magenta", "cyan", "white", "brightBlack", "brightRed", "brightGreen", "brightYellow", "brightBlue", "brightMagenta", "brightCyan", "brightWhite"];
type ColorName = typeof namedColors[number];
interface NamedColor {
    type: 'named';
    name: ColorName;
}
interface TableColor {
    type: 'table';
    index: number;
}
interface RgbColor {
    type: 'rgb';
    rgb: [number, number, number];
}
type Color = NamedColor | TableColor | RgbColor;

declare const decorations: {
    readonly 1: "bold";
    readonly 2: "dim";
    readonly 3: "italic";
    readonly 4: "underline";
    readonly 7: "reverse";
    readonly 9: "strikethrough";
};
type DecorationType = typeof decorations[keyof typeof decorations];

interface ParseToken {
    value: string;
    foreground: Color | null;
    background: Color | null;
    decorations: Set<DecorationType>;
}
declare function createAnsiSequenceParser(): {
    parse(value: string): ParseToken[];
};
declare function parseAnsiSequences(value: string): ParseToken[];

declare const defaultNamedColorsMap: {
    readonly black: "#000000";
    readonly red: "#bb0000";
    readonly green: "#00bb00";
    readonly yellow: "#bbbb00";
    readonly blue: "#0000bb";
    readonly magenta: "#ff00ff";
    readonly cyan: "#00bbbb";
    readonly white: "#eeeeee";
    readonly brightBlack: "#555555";
    readonly brightRed: "#ff5555";
    readonly brightGreen: "#00ff00";
    readonly brightYellow: "#ffff55";
    readonly brightBlue: "#5555ff";
    readonly brightMagenta: "#ff55ff";
    readonly brightCyan: "#55ffff";
    readonly brightWhite: "#ffffff";
};
declare function createColorPalette(namedColorsMap?: Record<ColorName, string>): {
    value: (color: Color) => string;
};

export { Color, ColorName, DecorationType, NamedColor, ParseToken, RgbColor, TableColor, createAnsiSequenceParser, createColorPalette, decorations, defaultNamedColorsMap, namedColors, parseAnsiSequences };
