import { Readable, Writable } from 'node:stream';

declare function isCancel(value: unknown): value is symbol;
interface PromptOptions<Self extends Prompt> {
    render(this: Omit<Self, 'prompt'>): string | void;
    placeholder?: string;
    initialValue?: any;
    validate?: ((value: any) => string | void) | undefined;
    input?: Readable;
    output?: Writable;
    debug?: boolean;
}
type State = 'initial' | 'active' | 'cancel' | 'submit' | 'error';
declare class Prompt {
    protected input: Readable;
    protected output: Writable;
    private rl;
    private opts;
    private _track;
    private _render;
    protected _cursor: number;
    state: State;
    value: any;
    error: string;
    constructor({ render, input, output, ...opts }: PromptOptions<Prompt>, trackValue?: boolean);
    prompt(): Promise<string | symbol>;
    private subscribers;
    on(event: string, cb: (...args: any) => any): void;
    once(event: string, cb: (...args: any) => any): void;
    emit(event: string, ...data: any[]): void;
    private unsubscribe;
    private onKeypress;
    protected close(): void;
    private restoreCursor;
    private _prevFrame;
    private render;
}

interface ConfirmOptions extends PromptOptions<ConfirmPrompt> {
    active: string;
    inactive: string;
    initialValue?: boolean;
}
declare class ConfirmPrompt extends Prompt {
    get cursor(): 0 | 1;
    private get _value();
    constructor(opts: ConfirmOptions);
}

interface GroupMultiSelectOptions<T extends {
    value: any;
}> extends PromptOptions<GroupMultiSelectPrompt<T>> {
    options: Record<string, T[]>;
    initialValues?: T['value'][];
    required?: boolean;
    cursorAt?: T['value'];
}
declare class GroupMultiSelectPrompt<T extends {
    value: any;
}> extends Prompt {
    options: (T & {
        group: string | boolean;
    })[];
    cursor: number;
    getGroupItems(group: string): T[];
    isGroupSelected(group: string): boolean;
    private toggleValue;
    constructor(opts: GroupMultiSelectOptions<T>);
}

interface MultiSelectOptions<T extends {
    value: any;
}> extends PromptOptions<MultiSelectPrompt<T>> {
    options: T[];
    initialValues?: T['value'][];
    required?: boolean;
    cursorAt?: T['value'];
}
declare class MultiSelectPrompt<T extends {
    value: any;
}> extends Prompt {
    options: T[];
    cursor: number;
    private get _value();
    private toggleAll;
    private toggleValue;
    constructor(opts: MultiSelectOptions<T>);
}

interface PasswordOptions extends PromptOptions<PasswordPrompt> {
    mask?: string;
}
declare class PasswordPrompt extends Prompt {
    valueWithCursor: string;
    private _mask;
    get cursor(): number;
    get masked(): any;
    constructor({ mask, ...opts }: PasswordOptions);
}

interface SelectOptions<T extends {
    value: any;
}> extends PromptOptions<SelectPrompt<T>> {
    options: T[];
    initialValue?: T['value'];
}
declare class SelectPrompt<T extends {
    value: any;
}> extends Prompt {
    options: T[];
    cursor: number;
    private get _value();
    private changeValue;
    constructor(opts: SelectOptions<T>);
}

interface SelectKeyOptions<T extends {
    value: any;
}> extends PromptOptions<SelectKeyPrompt<T>> {
    options: T[];
}
declare class SelectKeyPrompt<T extends {
    value: any;
}> extends Prompt {
    options: T[];
    cursor: number;
    constructor(opts: SelectKeyOptions<T>);
}

interface TextOptions extends PromptOptions<TextPrompt> {
    placeholder?: string;
    defaultValue?: string;
}
declare class TextPrompt extends Prompt {
    valueWithCursor: string;
    get cursor(): number;
    constructor(opts: TextOptions);
}

declare function block({ input, output, overwrite, hideCursor, }?: {
    input?: (NodeJS.ReadStream & {
        fd: 0;
    }) | undefined;
    output?: (NodeJS.WriteStream & {
        fd: 1;
    }) | undefined;
    overwrite?: boolean | undefined;
    hideCursor?: boolean | undefined;
}): () => void;

export { ConfirmPrompt, GroupMultiSelectPrompt, MultiSelectPrompt, PasswordPrompt, Prompt, SelectKeyPrompt, SelectPrompt, State, TextPrompt, block, isCancel };
