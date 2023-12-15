---
title: Svelte
compartir: true
updated: 2023-12-15
---

## Introduction

[Svelte](https://svelte.dev/) is a modern [[./JavaScript#JavaScript Frameworks|JavaScript Framework]] for building web applications. It compiles components into efficient, framework-free [[./JavaScript|JavaScript]] code, resulting in fast and lightweight applications. With its reactive approach and declarative syntax, Svelte simplifies development and delivers impressive performance.

## Example

```javascript
<script>
  let name = 'Svelte';

  function handleClick() {
    alert(`Hello, ${name}!`);
  }
</script>

<main>
  <h1>Welcome to Svelte</h1>
  <p>Click the button to greet:</p>
  <button on:click={handleClick}>Greet</button>
</main>

<style>
  main {
    text-align: center;
    margin-top: 50px;
  }

  button {
    padding: 10px 20px;
    background-color: #007bff;
    color: #ffffff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
</style>
```

In this example, we have a Svelte component that displays a heading, paragraph, and a button. When the button is clicked, the `handleClick` function is called, which displays an alert with the name variable interpolated. The component also includes some basic styling using CSS in the `<style>` block.
