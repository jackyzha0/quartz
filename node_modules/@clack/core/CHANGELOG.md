# @clack/core

## 0.3.2

### Patch Changes

- c96eda5: Enable hard line-wrapping behavior for long words without spaces

## 0.3.1

### Patch Changes

- 58a1df1: Fix line duplication bug by automatically wrapping prompts to `process.stdout.columns`

## 0.3.0

### Minor Changes

- 8a4a12f: Add `GroupMultiSelect` prompt

### Patch Changes

- 8a4a12f: add `groupMultiselect` prompt

## 0.2.1

### Patch Changes

- ec812b6: fix `readline` hang on Windows

## 0.2.0

### Minor Changes

- d74dd05: Adds a `selectKey` prompt type
- 54c1bc3: **Breaking Change** `multiselect` has renamed `initialValue` to `initialValues`

## 0.1.9

### Patch Changes

- 1251132: Multiselect: return `Value[]` instead of `Option[]`.
- 8994382: Add a password prompt to `@clack/prompts`

## 0.1.8

### Patch Changes

- d96071c: Don't mutate `initialValue` in `multiselect`, fix parameter type for `validate()`.

  Credits to @banjo for the bug report and initial PR!

## 0.1.7

### Patch Changes

- 6d9e675: Add support for neovim cursor motion (`hjkl`)

  Thanks [@esau-morais](https://github.com/esau-morais) for the assist!

## 0.1.6

### Patch Changes

- 7fb5375: Adds a new `defaultValue` option to the text prompt, removes automatic usage of the placeholder value.

## 0.1.5

### Patch Changes

- de1314e: Support `required` option for multi-select

## 0.1.4

### Patch Changes

- ca77da1: Fix multiselect initial value logic
- 8aed606: Fix `MaxListenersExceededWarning` by detaching `stdin` listeners on close

## 0.1.3

### Patch Changes

- a99c458: Support `initialValue` option for text prompt

## 0.1.2

### Patch Changes

- Allow isCancel to type guard any unknown value
- 7dcad8f: Allow placeholder to be passed to TextPrompt
- 2242f13: Fix multiselect returning undefined
- b1341d6: Improved placeholder handling

## 0.1.1

### Patch Changes

- 4be7dbf: Ensure raw mode is unset on submit
- b480679: Preserve value if validation fails

## 0.1.0

### Minor Changes

- 7015ec9: Create new prompt: multi-select

## 0.0.12

### Patch Changes

- 9d371c3: Fix rendering bug when using y/n to confirm

## 0.0.11

### Patch Changes

- 441d5b7: fix select return undefined
- d20ef2a: Update keywords, URLs
- fe13c2f: fix cursor missing after submit

## 0.0.10

### Patch Changes

- a0cb382: Add `main` entrypoint

## 0.0.9

### Patch Changes

- Fix node@16 issue (cannot read "createInterface" of undefined)

## 0.0.8

### Patch Changes

- a4b5e13: Bug fixes, exposes `block` utility

## 0.0.7

### Patch Changes

- Fix cursor bug

## 0.0.6

### Patch Changes

- Fix error with character check

## 0.0.5

### Patch Changes

- 491f9e0: update readme

## 0.0.4

### Patch Changes

- 7372d5c: Fix bug with line deletion

## 0.0.3

### Patch Changes

- 5605d28: Do not bundle dependencies (take II)

## 0.0.2

### Patch Changes

- 2ee67cb: don't bundle deps

## 0.0.1

### Patch Changes

- 306598e: Initial publish, still WIP
