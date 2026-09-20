---
title: Higher-Order Layout Components
---

Quartz provides several higher-order components that help with layout composition and responsive design. These components wrap other components to add additional functionality or modify their behavior.

Most common use cases can be configured directly in `quartz.config.yaml` using layout properties. For advanced scenarios requiring custom logic, you can use the TS override approach in `quartz.ts`.

## `Flex` Component

The `Flex` component creates a [flexible box layout](https://developer.mozilla.org/en-US/docs/Web/CSS/flex) that can arrange child components in various ways. It's particularly useful for creating responsive layouts and organizing components in rows or columns.

### YAML Configuration

In YAML, flex layouts are created using **groups**. Define a group in the top-level `layout.groups` section, then assign plugins to that group via their `layout.group` property:

```yaml title="quartz.config.yaml"
plugins:
  - source: github:quartz-community/search
    enabled: true
    layout:
      position: left
      priority: 20
      group: toolbar
      groupOptions:
        grow: true # Search will grow to fill available space
  - source: github:quartz-community/darkmode
    enabled: true
    layout:
      position: left
      priority: 30
      group: toolbar # Darkmode keeps its natural size
  - source: github:quartz-community/reader-mode
    enabled: true
    layout:
      position: left
      priority: 35
      group: toolbar

layout:
  groups:
    toolbar:
      direction: row
      gap: 0.5rem
```

The `groupOptions` field on each plugin entry supports the following flex item properties:

| Option    | Type                                                            | Description                                               |
| --------- | --------------------------------------------------------------- | --------------------------------------------------------- |
| `grow`    | `boolean`                                                       | Whether the component should grow to fill available space |
| `shrink`  | `boolean`                                                       | Whether the component should shrink if needed             |
| `basis`   | `string`                                                        | Initial main size of the component (e.g., `"200px"`)      |
| `order`   | `number`                                                        | Order in the flex container                               |
| `align`   | `"start"` \| `"end"` \| `"center"` \| `"stretch"`               | Cross-axis alignment                                      |
| `justify` | `"start"` \| `"end"` \| `"center"` \| `"between"` \| `"around"` | Main-axis alignment                                       |

The top-level `layout.groups` section configures the flex container itself:

| Option      | Type                                                           | Description                               |
| ----------- | -------------------------------------------------------------- | ----------------------------------------- |
| `direction` | `"row"` \| `"row-reverse"` \| `"column"` \| `"column-reverse"` | Flex direction                            |
| `wrap`      | `"nowrap"` \| `"wrap"` \| `"wrap-reverse"`                     | Flex wrap behavior                        |
| `gap`       | `string`                                                       | Gap between flex items (e.g., `"0.5rem"`) |

### TS Override

For full programmatic control, use the `Component.Flex()` wrapper in `quartz.ts`:

```ts title="quartz.ts (override)"
Component.Flex({
  components: [
    {
      Component: Plugin.Search(),
      grow: true, // Search will grow to fill available space
    },
    { Component: Plugin.Darkmode() }, // Darkmode keeps its natural size
  ],
  direction: "row",
  gap: "1rem",
})
```

```typescript
type FlexConfig = {
  components: {
    Component: QuartzComponent
    grow?: boolean
    shrink?: boolean
    basis?: string
    order?: number
    align?: "start" | "end" | "center" | "stretch"
    justify?: "start" | "end" | "center" | "between" | "around"
  }[]
  direction?: "row" | "row-reverse" | "column" | "column-reverse"
  wrap?: "nowrap" | "wrap" | "wrap-reverse"
  gap?: string
}
```

> [!note] Overriding behavior
> Components inside `Flex` get an additional CSS class `flex-component` that adds the `display: flex` property. If you want to override this behavior, you can add a `display` property to the component's CSS class in your custom CSS file.
>
> ```scss
> .flex-component {
>   display: block; // or any other display type
> }
> ```

## `MobileOnly` / `DesktopOnly` Components

These components control whether a plugin is visible on mobile or desktop devices. This is useful for creating responsive layouts where certain components should only appear on specific screen sizes.

### YAML Configuration

In YAML, use the `display` property on a plugin's layout entry:

```yaml title="quartz.config.yaml"
plugins:
  - source: github:quartz-community/table-of-contents
    enabled: true
    layout:
      position: right
      priority: 20
      display: desktop-only # Only visible on desktop
```

Available `display` values:

| Value          | Description                           |
| -------------- | ------------------------------------- |
| `all`          | Visible on all screen sizes (default) |
| `mobile-only`  | Only visible on mobile devices        |
| `desktop-only` | Only visible on desktop devices       |

### TS Override

For the TS override approach, use `Component.MobileOnly()` or `Component.DesktopOnly()` wrappers:

```ts title="quartz.ts (override)"
Component.MobileOnly(Component.Spacer())
```

```ts title="quartz.ts (override)"
Component.DesktopOnly(Plugin.TableOfContents())
```

## `ConditionalRender` Component

The `ConditionalRender` component conditionally renders a plugin based on page properties. This is useful for creating dynamic layouts where components should only appear under certain conditions.

### YAML Configuration

In YAML, use the `condition` property on a plugin's layout entry. Quartz provides several built-in condition presets:

```yaml title="quartz.config.yaml"
plugins:
  - source: github:quartz-community/breadcrumbs
    enabled: true
    layout:
      position: beforeBody
      priority: 5
      condition: not-index # Hide breadcrumbs on the root index page
```

Available built-in conditions:

| Condition       | Description                                           |
| --------------- | ----------------------------------------------------- |
| `not-index`     | Only render when the page is not the root `index.md`  |
| `has-tags`      | Only render when the page has tags in its frontmatter |
| `has-backlinks` | Only render when the page has backlinks               |
| `has-toc`       | Only render when the page has a table of contents     |

### TS Override

For custom conditions that aren't covered by the built-in presets, import the internal component utilities and the component you want to wrap in `quartz.ts`. Place `Component.ConditionalRender()` in the layout slot where the wrapped component should appear. For example, this renders Search in the left sidebar only for pages under `notes/`:

```ts title="quartz.ts (override)"
import { loadQuartzConfig, loadQuartzLayout } from "./quartz/plugins/loader/config-loader"
import * as Component from "./quartz/components"
import { Search } from "./.quartz/plugins/search"

const config = await loadQuartzConfig()
export default config
export const layout = await loadQuartzLayout({
  defaults: {
    left: [
      Component.ConditionalRender({
        component: Search(),
        condition: (props) => props.fileData.slug?.startsWith("notes/") ?? false,
      }),
    ],
  },
})
```

The wrapped plugin must be installed and enabled in `quartz.config.yaml`. A TypeScript layout override replaces the selected slot, so include any other components you want to keep in that slot alongside the conditional component.

```typescript
type ConditionalRenderConfig = {
  component: QuartzComponent
  condition: (props: QuartzComponentProps) => boolean
}
```

> [!tip]
> You can also register custom conditions for use in YAML by calling `registerCondition()` in a plugin's initialization code. See [[making plugins]] for more details.
