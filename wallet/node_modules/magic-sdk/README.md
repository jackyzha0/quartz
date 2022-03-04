# ✨ Magic Authentication JavaScript SDK

[![<MagicLabs>](https://circleci.com/gh/magiclabs/magic-js.svg?style=shield)](https://circleci.com/gh/magiclabs/magic-js)

> Magic empowers developers to protect their users via an innovative, passwordless authentication flow without the UX compromises that burden traditional OAuth implementations.

<p align="center">
  <a href="https://github.com/magiclabs/magic-js/blob/master/packages/magic-sdk/LICENSE">License</a> ·
  <a href="https://github.com/magiclabs/magic-js/blob/master/packages/magic-sdk/CHANGELOG.md">Changelog</a> ·
  <a href="https://github.com/magiclabs/magic-js/blob/master/CONTRIBUTING.md">Contributing Guide</a>
</p>

## 📖 Documentation

See the [developer documentation](https://docs.magic.link) to learn how you can master the Magic SDK in a matter of minutes.

## 🔗 Installation

Integrating your app with Magic will require our client-side NPM package:

```bash
# Via NPM:
npm install --save magic-sdk

# Via Yarn:
yarn add magic-sdk
```

Alternatively, you can load via CDN with by adding a script tag to your app’s `<head>`:

```html
<script src="https://cdn.jsdelivr.net/npm/magic-sdk/dist/magic.js"></script>
```

## ⚡️ Quick Start

Sign up or log in to the [developer dashboard](https://dashboard.magic.link) to receive API keys that will allow your application to interact with Magic's authentication APIs.

Then, you can start authenticating users with _just one method!_ Magic works across all modern desktop, mobile Chrome, Safari and Firefox browsers.

```ts
import { Magic } from 'magic-sdk';

const magic = new Magic('YOUR_API_KEY');

await magic.auth.loginWithMagicLink({ email: 'your.email@example.com' });
```
