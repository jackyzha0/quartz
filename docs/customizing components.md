---
title: Customizing Components
---

In Quartz v4, components such as the footer lived in `quartz/components/` and you customized them by editing their source. In v5, most components are [[configuration#Plugins|community plugins]]: Quartz installs them into `.quartz/plugins/` and runs their **built** code (`dist/`). Editing the files in `.quartz/plugins/` therefore has no effect, and is overwritten the next time the plugin is installed or updated.

There are four ways to change a component, from least to most effort. Try them in this order.

## 1. Options

Most components have options; each plugin's page under [[plugins/index|Plugins]] lists them. Set them in `quartz.config.yaml`:

```yaml title="quartz.config.yaml"
plugins:
  - source: github:quartz-community/footer
    enabled: true
    options:
      message: 'Licensed under <a href="/license">CC BY 4.0</a>'
      links:
        GitHub: https://github.com/you/your-site
```

or from the command line with `npx quartz plugin config footer --set message="Hello"` (see [[cli/plugin|plugin]]).

## 2. Placement

Where a component appears, in which order, on which page types and screen sizes is part of the layout, not the component: `layout.position`, `layout.priority` and `layout.display` per plugin, and `layout.byPageType` to drop or move components on some page types. See [[layout]] and [[layout-components]].

## 3. Styles

Write your own styles in `quartz/styles/custom.scss`. The styles of Quartz, its plugins and themes are in [CSS cascade layers](https://developer.mozilla.org/en-US/docs/Web/CSS/@layer) and `custom.scss` is not, so your rules take precedence over theirs whatever their specificity. Find the element's classes with your browser's developer tools, then for example:

```scss title="quartz/styles/custom.scss"
footer {
  opacity: 1;
  text-align: center;

  & ul {
    justify-content: center;
  }
}
```

For site-wide colors and fonts, use the [[configuration#General Configuration|theme options]] first.

## 4. Your own copy of the plugin

When options and CSS are not enough (you want different markup or behavior), make your own copy of the plugin and use that instead:

1. Copy the plugin's repository (fork it on GitHub, or clone it) into a directory **outside** `.quartz/`, e.g. next to your site: `git clone https://github.com/quartz-community/footer.git ../my-footer`.
2. Change its source (for the footer, `src/components/Footer.tsx`) and build it: `npm install && npm run build` in that directory.
3. Replace the plugin in your site with your copy:

   ```shell
   npx quartz plugin remove footer
   npx quartz plugin add ../my-footer
   ```

   Local plugins are symlinked into `.quartz/plugins/`. After further changes, run `npm run build` in your copy again (or `npx quartz plugin install --latest`, which rebuilds local plugins) and rebuild the site.

If you forked on GitHub, you can instead push your changes and add the fork with `npx quartz plugin add github:you/my-footer`, so your site builds in CI too. Note that a local path only works on machines that have that directory.

If you think others would want your change, consider opening a pull request against the original plugin, perhaps as a new option. To write a component from scratch, see [[creating components]].
