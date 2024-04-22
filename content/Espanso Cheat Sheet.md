---
title: Espanso Cheat Sheet
compartir: true
---
Cross-platform Text Expander written in Rust.

Visit the [Documentation](https://espanso.org/docs/get-started/).

## Features

- Works on **Windows**, **macOS** and **Linux**
- Works with almost **any program**
- Works with **Emojis** 😄
- Works with **Images**
- Includes a powerful **Search Bar** 🔎
- **Date** expansion support
- **Custom scripts** support
- **Shell commands** support
- **App-specific** configurations
- Support [Forms](https://espanso.org/docs/matches/forms/)
- Expandable with **packages**
- Built-in **package manager** for [espanso hub](https://hub.espanso.org/)
- File based configuration
- Support Regex triggers
- Experimental Wayland support

## Static Matches

### Single-line Expansions

```yml
- trigger: "hello"
  replace: "world"
```

### Multi-line Expansions

```yml
- trigger: "hello"
  replace: "line1\nline2"
```

## Dynamic Matches

### Using Variables

```yml
- trigger: "now"
  replace: "It's {{mytime}}"
  vars:
    - name: mytime
      type: date
      params:
        format: "%H:%M"
```

### Preconfigured Choices

```yml
- name: output
    type: choice
    params:
      values:
        - "Every moment is a fresh beginning."
        - "Everything you can imagine is real."
        - "Whatever you do, do it well."
```

### Run CLI Command

```yaml
- name: getip
  type: shell
  params:
    cmd: "curl ifconfig.me"
    shell: cmd
```

## Global Variables

### Declarations

```yml
global_vars:
  - name: "global1"
    type: "shell"
    params:
      cmd: "echo global var"
  - name: "greet"
    type: "echo"
    params:
      echo: "Hey"
```

### Usage

```yml
- trigger: ":hello"
    replace: "{{greet}} Jon"
```

## Word Triggers

### Autocorrect Typos

```yml
- trigger: "ther"
    replace: "there"
    word: true
```

### Case Propagation

```yml
- trigger: "alh"
    replace: "although"
    propagate_case: true
    word: true
```

- If you write `alh`, the match will be expanded to `although`.
- If you write `Alh`, the match will be expanded to `Although`.
- If you write `ALH`, the match will be expanded to `ALTHOUGH`.

## Cursor Hints

Insert `$|$` where you want the cursor to be positioned. Limited to one cursor hint.

```yml
- trigger: ":div"
    replace: "<div>$|$</div>"
```

## Match Disambiguation

Takes all matches with the same trigger and displays a dialog to let you choose.

```yml
- trigger: ":quote"
    replace: "Every moment is a fresh beginning."
- trigger: ":quote"
    replace: "Everything you can imagine is real."
- trigger: ":quote"
    replace: "Whatever you do, do it well."
```
