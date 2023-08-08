# @clack/prompts

## 0.6.3

### Patch Changes

- c96eda5: Enable hard line-wrapping behavior for long words without spaces
- Updated dependencies [c96eda5]
  - @clack/core@0.3.2

## 0.6.2

### Patch Changes

- 58a1df1: Fix line duplication bug by automatically wrapping prompts to `process.stdout.columns`
- Updated dependencies [58a1df1]
  - @clack/core@0.3.1

## 0.6.1

### Patch Changes

- ca08fb6: Support complex value types for `select`, `multiselect` and `groupMultiselect`.

## 0.6.0

### Minor Changes

- 8a4a12f: add `groupMultiselect` prompt
- 165a1b3: Add `log` APIs. Supports `log.info`, `log.success`, `log.warn`, and `log.error`. For low-level control, `log.message` is also exposed.

### Patch Changes

- Updated dependencies [8a4a12f]
- Updated dependencies [8a4a12f]
  - @clack/core@0.3.0

## 0.5.1

### Patch Changes

- cc11917: Update default `password` mask
- Updated dependencies [ec812b6]
  - @clack/core@0.2.1

## 0.5.0

### Minor Changes

- d74dd05: Adds a `selectKey` prompt type
- 54c1bc3: **Breaking Change** `multiselect` has renamed `initialValue` to `initialValues`

### Patch Changes

- Updated dependencies [d74dd05]
- Updated dependencies [54c1bc3]
  - @clack/core@0.2.0

## 0.4.5

### Patch Changes

- 1251132: Multiselect: return `Value[]` instead of `Option[]`.
- 8994382: Add a password prompt to `@clack/prompts`
- Updated dependencies [1251132]
- Updated dependencies [8994382]
  - @clack/core@0.1.9

## 0.4.4

### Patch Changes

- d96071c: Don't mutate `initialValue` in `multiselect`, fix parameter type for `validate()`.

  Credits to @banjo for the bug report and initial PR!

- Updated dependencies [d96071c]
  - @clack/core@0.1.8

## 0.4.3

### Patch Changes

- 83d890e: Fix text cancel display bug

## 0.4.2

### Patch Changes

- Update README

## 0.4.1

### Patch Changes

- 7fb5375: Adds a new `defaultValue` option to the text prompt, removes automatic usage of the placeholder value.
- Updated dependencies [7fb5375]
  - @clack/core@0.1.6

## 0.4.0

### Minor Changes

- 61b88b6: Add `group` construct to group many prompts together

### Patch Changes

- de1314e: Support `required` option for multi-select
- Updated dependencies [de1314e]
  - @clack/core@0.1.5

## 0.3.0

### Minor Changes

- 493c592: Improve types for select/multiselect prompts. Numbers and booleans are now supported as the `value` option.
- 15558e3: Improved Windows/non-unicode support

### Patch Changes

- ca77da1: Fix multiselect initial value logic
- Updated dependencies [ca77da1]
- Updated dependencies [8aed606]
  - @clack/core@0.1.4

## 0.2.2

### Patch Changes

- 94b24d9: Fix CJS `ansi-regex` interop

## 0.2.1

### Patch Changes

- a99c458: Support `initialValue` option for text prompt
- Updated dependencies [a99c458]
  - @clack/core@0.1.3

## 0.2.0

### Minor Changes

- Improved type safety
- b1341d6: Updated styles, new note component

### Patch Changes

- Updated dependencies [7dcad8f]
- Updated dependencies [2242f13]
- Updated dependencies [b1341d6]
  - @clack/core@0.1.2

## 0.1.1

### Patch Changes

- fa09bf5: Use circle for radio, square for checkbox
- Updated dependencies [4be7dbf]
- Updated dependencies [b480679]
  - @clack/core@0.1.1

## 0.1.0

### Minor Changes

- 7015ec9: Create new prompt: multi-select

### Patch Changes

- Updated dependencies [7015ec9]
  - @clack/core@0.1.0

## 0.0.10

### Patch Changes

- e0b49e5: Update spinner so it actually spins

## 0.0.9

### Patch Changes

- Update README

## 0.0.8

### Patch Changes

- Updated dependencies [9d371c3]
  - @clack/core@0.0.12

## 0.0.7

### Patch Changes

- Update README

## 0.0.6

### Patch Changes

- d20ef2a: Update keywords, URLs
- Updated dependencies [441d5b7]
- Updated dependencies [d20ef2a]
- Updated dependencies [fe13c2f]
  - @clack/core@0.0.11

## 0.0.5

### Patch Changes

- Update README

## 0.0.4

### Patch Changes

- 80404ab: Update README

## 0.0.3

### Patch Changes

- a0cb382: Add `main` entrypoint
- Updated dependencies [a0cb382]
  - @clack/core@0.0.10

## 0.0.2

### Patch Changes

- Updated dependencies
  - @clack/core@0.0.9

## 0.0.1

### Patch Changes

- a4b5e13: Initial release
- Updated dependencies [a4b5e13]
  - @clack/core@0.0.8
