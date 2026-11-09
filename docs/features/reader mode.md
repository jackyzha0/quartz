---
title: Reader Mode
tags:
  - component
---

Reader Mode is a feature that allows users to focus on the content by hiding the sidebars and other UI elements. When enabled, it provides a clean, distraction-free reading experience.

> [!note]
> For information on how to add, remove or configure plugins, see the [[configuration#Plugins|Configuration]] page.

## Configuration

Reader Mode is enabled by default. To disable it, set `enabled: false` in your `quartz.config.yaml`:

```yaml title="quartz.config.yaml"
plugins:
  - source: "@quartz-community/reader-mode"
    enabled: false
```

Or remove the plugin entirely:

```bash
npx quartz plugin remove reader-mode
```

- Install: `npx quartz plugin add @quartz-community/reader-mode`
- Source: [`quartz-community/reader-mode`](https://github.com/quartz-community/reader-mode)

## Usage

The Reader Mode toggle appears as a button with a book icon. When clicked:

- Sidebars are hidden
- Hovering over the content area reveals the sidebars temporarily

Unlike Dark Mode, Reader Mode state is not persisted between page reloads but is maintained during SPA navigation within the site.

## Customization

You can customize the appearance of Reader Mode through CSS variables and styles. The component uses the following classes:

- `.readermode`: The toggle button
- `.readerIcon`: The book icon
- `[reader-mode="on"]`: Applied to the root element when Reader Mode is active

Example customization in your custom CSS:

```scss
.readermode {
  // Customize the button
  svg {
    stroke: var(--custom-color);
  }
}
```
