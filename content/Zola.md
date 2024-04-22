---
title: Zola
description: Zola is a fast static site generator in a single binary with everything built-in.
compartir: true
---
[Zola](https:) is a fast [[Static Site Generators|static site generator]] (SSG) contained in a single binary with everything built-in, it has no other dependencies. It is _by far_ my preferred way to build static websites.

SSGs use dynamic templates to transform content into static HTML pages. Static sites are thus very fast and require no databases, making them easy to host. Content is written in [[Markdown|Markdown]].

## Useful Commands

```sh
# Initiate Zola project
zola init

# Serve Zola website
zola serve

# Build check
zola check

# Build w/ Options
zola --root /path/to/project --config config.staging.toml build --base-url $DEPLOY_URL --output-dir $DOCUMENT_ROOT
```

## Table of Contents

```html
<style>
details {
  border: 1px solid #aaa;
  border-radius: 4px;
  padding: 0.5em 0.5em 0;
}

summary {
  font-weight: bold;
  margin: -0.5em -0.5em 0;
  padding: 0.5em;
}

details[open] {
  padding: 0.5em;
}

details[open] summary {
  border-bottom: 1px solid #aaa;
  margin-bottom: 0.5em;
}
</style>

{% if page.toc %}
<details open>
{# <details> #}
  <summary>
    Table of Contents
  </summary>

  <ul class="sublist-toc">
    {% for h1 in page.toc %}
    <li>
      <a href="{{ h1.permalink | safe }}">{{ h1.title }}</a>
      {% if h1.children %}
      <ul class="sublist-toc">
        {% for h2 in h1.children %}
        <li>
          <a href="{{ h2.permalink | safe }}">{{ h2.title }}</a>

          <ul class="sublist-toc">
            {% for h3 in h2.children %}
            <li>
              <a href="{{ h3.permalink | safe }}">{{ h3.title }}</a>
            </li>
            {% endfor %}
          </ul>

        </li>
        {% endfor %}
      </ul>
      {% endif %}
    </li>
    {% endfor %}
  </ul>
</details>
{% endif %}
```
