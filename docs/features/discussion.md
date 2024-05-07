### Disabled this feature

- `discussion: null` or simply remove this properties

### Enable this feature

Please visit [here](https://giscus.app/) and follow the instructions, include enable giscus app, allow permission for giscus to access your repository.

Get configuration that are generated and fill the quartz configuration .

```typescript title="quartz.config.ts"
const config: QuartzConfig = {
  configuration: {
    ...,
    discussion: {
      provider: "giscus",
      configuration: {
        dataRepo: "<data-repo>",
        dataRepoId: "<data-repo-id>",
        dataCategory: "<data-category>",
        dataCategoryId: "<data-category-id>",
      },
    },

    ...
  }

```

> [!note]
> By default, four fields `data-repo/id` and `data-category/id` must be fill by yourself. And there are 10 other fields
> have default settings. You can overwrite them.

| Name                   | Default value                  |
| ---------------------- | ------------------------------ |
| src                    | "https://giscus.app/client.js" |
| data-strict            | "0"                            |
| data-mapping           | "pathname"                     |
| data-reactions-enabled | "1"                            |
| data-emit-metadata     | "1"                            |
| data-input-position    | "top"                          |
| data-theme             | "preferred_color_scheme"       |
| data-lang              | "en"                           |
| data-loading           | "lazy"                         |
| data-origin            | "anonymous"                    |

Finally, add discussion/comment session to your `quartz.layout.ts`

```typescript title="quartz.layout.ts"
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    ...
  ],
  left: [
    ...
  ],
  right: [
    ...
  ],
  //@ts-ignore
  footer: Component.Discussion(),
}


```
