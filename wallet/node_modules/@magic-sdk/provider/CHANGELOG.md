# v8.0.0 (Tue Jan 25 2022)

#### 💥 Breaking Change

- Switch from `microbundle` to `esbuild` [#220](https://github.com/magiclabs/magic-js/pull/220) ([@smithki](https://github.com/smithki))

#### 🐛 Bug Fix

- Merge with master ([@smithki](https://github.com/smithki))
- Merge branch 'master' into feat/faster-builds ([@smithki](https://github.com/smithki))
- Remove comments from README files ([@smithki](https://github.com/smithki))
- Fix build errors related to isolatedModules ([@smithki](https://github.com/smithki))
- Replace microbundle with ESBuild ([@smithki](https://github.com/smithki))

#### Authors: 1

- Ian K Smith ([@smithki](https://github.com/smithki))

---

# v6.2.1 (Mon Nov 08 2021)

#### 🐛 Bug Fix

- Remove 'semver' re-export from '@magic-sdk/provider' utils [#237](https://github.com/magiclabs/magic-js/pull/237) ([@smithki](https://github.com/smithki))

#### Authors: 1

- Ian K Smith ([@smithki](https://github.com/smithki))

---

# v6.2.0 (Fri Oct 22 2021)

#### 🚀 Enhancement

- Add `UserModule#settings` endpoint [#231](https://github.com/magiclabs/magic-js/pull/231) ([@smithki](https://github.com/smithki))

#### Authors: 1

- Ian K Smith ([@smithki](https://github.com/smithki))

---

# v6.1.4 (Thu Oct 21 2021)

#### 🐛 Bug Fix

- Revert to `.js` extension for ES module builds targeting webpack/CRA [#232](https://github.com/magiclabs/magic-js/pull/232) ([@smithki](https://github.com/smithki))

#### Authors: 1

- Ian K Smith ([@smithki](https://github.com/smithki))

---

# v6.1.3 (Wed Oct 20 2021)

#### ⚠️ Pushed to `master`

- Fix dist files glob in package.json ([@smithki](https://github.com/smithki))
- Merge branch 'master' of github.com:magiclabs/magic-js ([@smithki](https://github.com/smithki))
- Force re-publish ([@smithki](https://github.com/smithki))

#### Authors: 1

- Ian K Smith ([@smithki](https://github.com/smithki))

---

# v6.1.2 (Wed Oct 20 2021)

#### 🐛 Bug Fix

- Use '.mjs' extension for ESM build files [#230](https://github.com/magiclabs/magic-js/pull/230) ([@smithki](https://github.com/smithki))

#### Authors: 1

- Ian K Smith ([@smithki](https://github.com/smithki))

---

# v6.1.1 (Tue Oct 19 2021)

#### 🐛 Bug Fix

- Fix bug with `d.generateKey is undefined` build bug [#228](https://github.com/magiclabs/magic-js/pull/228) ([@dgerrellsMagic](https://github.com/dgerrellsMagic))

#### Authors: 1

- [@dgerrellsMagic](https://github.com/dgerrellsMagic)

---

# v6.1.0 (Fri Oct 01 2021)

#### 🚀 Enhancement

- Enable SMS login [#223](https://github.com/magiclabs/magic-js/pull/223) ([@dgerrellsMagic](https://github.com/dgerrellsMagic))

#### Authors: 1

- [@dgerrellsMagic](https://github.com/dgerrellsMagic)

---

# v6.0.6 (Thu Sep 23 2021)

#### 🐛 Bug Fix

- Port `@magic-ext/oauth`, `@magic-ext/react-native-oauth`, `@magic-ext/webauthn` extensions to Magic SDK monorepo [#218](https://github.com/magiclabs/magic-js/pull/218) ([@smithki](https://github.com/smithki))
- Add `@magic-sdk/pnp` package for out-of-the-box login page UIs [#217](https://github.com/magiclabs/magic-js/pull/217) ([@smithki](https://github.com/smithki))

#### Authors: 1

- Ian K Smith ([@smithki](https://github.com/smithki))

---

# v6.0.5 (Fri Sep 17 2021)

#### 🐛 Bug Fix

- Fix `regeneratorRuntime` is not defined in `@magic-sdk/provider` [#215](https://github.com/magiclabs/magic-js/pull/215) ([@smithki](https://github.com/smithki))

#### Authors: 1

- Ian K Smith ([@smithki](https://github.com/smithki))

---

# v6.0.4 (Fri Sep 17 2021)

#### 🐛 Bug Fix

- Fix CJS-dependent entry-points using the 'exports' field in package.json [#214](https://github.com/magiclabs/magic-js/pull/214) ([@smithki](https://github.com/smithki))

#### Authors: 1

- Ian K Smith ([@smithki](https://github.com/smithki))

---

# v6.0.3 (Thu Sep 16 2021)

#### 🐛 Bug Fix

- Enable `skipLibCheck: false` to work with Magic SDK + TypeScript projects [#212](https://github.com/magiclabs/magic-js/pull/212) ([@smithki](https://github.com/smithki))

#### Authors: 1

- Ian K Smith ([@smithki](https://github.com/smithki))

---

# v6.0.2 (Tue Sep 14 2021)

#### 🐛 Bug Fix

- Import regeneratorRuntime in Magic JS (non-CDN version) [#210](https://github.com/magiclabs/magic-js/pull/210) ([@smithki](https://github.com/smithki))

#### Authors: 1

- Ian K Smith ([@smithki](https://github.com/smithki))

---

# v6.0.1 (Tue Sep 14 2021)

#### 🐛 Bug Fix

- Fix SemVer cyclic dependency issues with some hacks [#209](https://github.com/magiclabs/magic-js/pull/209) ([@smithki](https://github.com/smithki))

#### Authors: 1

- Ian K Smith ([@smithki](https://github.com/smithki))

---

# v6.0.0 (Tue Sep 14 2021)

#### 💥 Breaking Change

- v6.0.0 [#208](https://github.com/magiclabs/magic-js/pull/208) ([@smithki](https://github.com/smithki))

#### Authors: 1

- Ian K Smith ([@smithki](https://github.com/smithki))

---

# v5.1.0 (Thu Sep 02 2021)

#### 🚀 Enhancement

- [Feat]: Update type signature of `RpcProviderModule` to implement Web3's `AbstractProvider` [#201](https://github.com/magiclabs/magic-js/pull/201) ([@adenekan41](https://github.com/adenekan41) [@smithki](https://github.com/smithki))
- bypass webcrypto on non web platforms [#200](https://github.com/magiclabs/magic-js/pull/200) ([@dgerrellsMagic](https://github.com/dgerrellsMagic))

#### Authors: 3

- [@dgerrellsMagic](https://github.com/dgerrellsMagic)
- Adenekan Wonderful ([@adenekan41](https://github.com/adenekan41))
- Ian K Smith ([@smithki](https://github.com/smithki))

---

# v5.0.0 (Tue Aug 31 2021)

#### 💥 Breaking Change

- Custom session duration [#199](https://github.com/magiclabs/magic-js/pull/199) ([@dgerrellsMagic](https://github.com/dgerrellsMagic))

#### Authors: 1

- [@dgerrellsMagic](https://github.com/dgerrellsMagic)

---

# v4.4.2 (Mon Aug 16 2021)

#### 🐛 Bug Fix

- Migrate unit tests to Jest [#194](https://github.com/magiclabs/magic-js/pull/194) ([@smithki](https://github.com/smithki))

#### Authors: 1

- Ian K Smith ([@smithki](https://github.com/smithki))

---

# v4.4.0 (Wed Jul 28 2021)

#### 🚀 Enhancement

- Add explicit JSDelivr entry-point for `magic-sdk` [#191](https://github.com/magiclabs/magic-js/pull/191) ([@smithki](https://github.com/smithki))

#### Authors: 1

- Ian K Smith ([@smithki](https://github.com/smithki))

---

# v4.3.0 (Tue May 04 2021)

#### 🚀 Enhancement

- Add test-mode prefix to Ethereum RPC methods [#181](https://github.com/magiclabs/magic-js/pull/181) ([@smithki](https://github.com/smithki))

#### Authors: 1

- Ian K Smith ([@smithki](https://github.com/smithki))

---

# v4.2.0 (Mon Mar 15 2021)

#### 🚀 Enhancement

- Add testing framework [#168](https://github.com/magiclabs/magic-js/pull/168) (harry [@smithki](https://github.com/smithki) [@harryEth](https://github.com/harryEth))

#### Authors: 3

- [@harryEth](https://github.com/harryEth)
- harry (harry)
- Ian K Smith ([@smithki](https://github.com/smithki))

---

# v4.1.1 (Thu Jan 28 2021)

#### 🐛 Bug Fix

- Support UTF-8 characters when encoding iframe options to Base64 [#160](https://github.com/magiclabs/magic-js/pull/160) ([@smithki](https://github.com/smithki))

#### Authors: 1

- Ian K Smith ([@smithki](https://github.com/smithki))

---

# v4.1.0 (Sat Jan 23 2021)

#### 🚀 Enhancement

- Improve i18n Support [#157](https://github.com/magiclabs/magic-js/pull/157) ([@Dizigen](https://github.com/Dizigen) [@smithki](https://github.com/smithki))

#### Authors: 2

- David He ([@Dizigen](https://github.com/Dizigen))
- Ian K Smith ([@smithki](https://github.com/smithki))

---

# v4.0.2 (Wed Dec 02 2020)

#### 🐛 Bug Fix

- Remove ES6 Proxy references [#154](https://github.com/magiclabs/magic-js/pull/154) ([@smithki](https://github.com/smithki))

#### Authors: 1

- Ian K Smith ([@smithki](https://github.com/smithki))

---

# v4.0.1 (Tue Dec 01 2020)

#### 🐛 Bug Fix

- Add 'importHelpers: true' to base tsconfig.json [#152](https://github.com/magiclabs/magic-js/pull/152) ([@smithki](https://github.com/smithki))

#### 📝 Documentation

- Fix incorrect TypeScript project references and update READMEs with changelog links [#151](https://github.com/magiclabs/magic-js/pull/151) ([@smithki](https://github.com/smithki))

#### Authors: 1

- Ian K Smith ([@smithki](https://github.com/smithki))

---

# v4.0.0 (Tue Nov 17 2020)

#### 💥 Breaking Change

- [All packages] Internal API changes & Cleanups [#149](https://github.com/magiclabs/magic-js/pull/149) ([@smithki](https://github.com/smithki))

#### 🐛 Bug Fix

- Update CHANGELOGs and CONTRIBUTING guide [#146](https://github.com/magiclabs/magic-js/pull/146) ([@smithki](https://github.com/smithki))

#### 🏠 Internal

- Simplify scripts [#147](https://github.com/magiclabs/magic-js/pull/147) ([@smithki](https://github.com/smithki))

#### Authors: 1

- Ian K Smith ([@smithki](https://github.com/smithki))

---

## `3.0.1` - 10/21/2020

#### Changed

- Removed the following public methods and functions
    - `BaseExtension.utils.encodeQueryParameters`
    - `BaseExtension.utils.decodeQueryParameters`

## `2.8.0` - 09/24/2020

#### Added

- Adds a Magic SDK extensions runtime compatibility check, ensuring you're version of Magic SDK is designed for the extensions you have in use.

## `2.7.0` - 09/15/2020

#### Added

- New, optional `redirectURI` parameter for the `loginWithMagicLink` method
- New `loginWithCredential` method for completing a magic link login with redirect: `await magic.auth.loginWithCredential()`

## `2.6.1` - 09/03/2020

- Fix Modal doesn't show up

## `2.6.0` - 08/24/2020

#### Added

- New optional `locale` parameter to SDK constructor

## `2.5.7` - 08/20/2020

#### Added

- New RPC error code for the `loginWithMagicLink` method: `-10005`

## `2.5.6` - 08/04/2020

- Add `process` and `buffer` to the dependencies

## `2.5.5` - 07/22/2020

#### Added

- Export `PromiEvent` type and `isPromiEvent` utility from SDK entry-points (`magic-sdk` and `@magic-sdk/react-native`).

## `2.5.1` through `2.5.4` - 07/13/2020

#### Fixed

- Bug preventing NPM tarball from containing `/dist` files.

## `2.5.0` - 07/13/2020

#### Changed

- Updated build system to use TypeScript project references instead of Microbundle.
- Pass `targetOrigin` parameter to `postMessage` calls.

## `2.4.1` - 07/08/2020

#### Fixed

- Bug affecting `localforage` type imports causing compilation failure in TypeScript.

## `2.4.0` - 07/08/2020

#### Added

- WebAuthn support.
- `localforage` APIs for Magic SDK Extensions.

## `2.2.0` - 06/25/2020

#### Changed

- Update dependencies.
- Marked `encodeQueryParameters` and `decodeQueryParameters` utility methods for deprecation in `v3.0.0`.

#### Added

- Add `MagicExtensionWarning` class.
- Add `createWarning` and `createDeprecationWarning` helper methods to `BaseExtension`.
- Add `encodeJSON` and `decodeJSON` helper methods to `BaseExtension.utils`. These are direct aliases for `encodeQueryParameters` and `decodeQueryParameters` (which will be deprecated in the next major version).

## `2.1.2` - 06/23/2020

#### Changed

- `MagicRPCError.code` can now be typed as a plain `number` for greater flexibility.

## `2.1.1` - 06/23/2020

#### Changed

- The argument type given to the default `"error"` event of `PromiEvent` is now `any` (in line with native Promise typings).

## `2.1.0` - 06/23/2020

#### Added

- Add the `BaseExtension.createError` method.
- You are now able to attach arbitrary, strongly-typed data to `MagicExtensionError` objects.

## `2.0.0` - 06/22/2020

#### Added

- The following utilities are now exposed on the `Extension` base class: `createPromiEvent`, `decodeQueryParameters`, `encodeQueryParameters`.

#### Changed

- The `createJsonRpcRequestPayload` and `standardizeJsonRpcRequestPayload` utilities are now nested under the `utils` field of the `Extension` base class.

## `1.0.3` - 06/16/2020

#### Added

- Introduced `MagicExtensionError` type to create consistency for errors rising from Magic SDK Extensions.
- Add the `BaseExtension.raiseError` method.

## `1.0.2` - 06/12/2020

#### Changed

- Update dependencies.
- Circle CI tag in readme is broken after namechange from MagicHQ to MagicLabs

## `1.0.1` - 06/11/2020

#### Changed

- Update dependencies.

## `1.0.0` - 06/02/2020

This is the first release our changelog records. Future updates will be logged in the following format:

#### Fixed

- Bug fixes and patches will be described here.

#### Changed

- Changes (breaking or otherwise) to current APIs will be described here.

#### Added

- New features or APIs will be described here.
