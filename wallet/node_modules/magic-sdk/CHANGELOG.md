# v8.0.1 (Tue Jan 25 2022)

#### 🐛 Bug Fix

- Fix CDN build targets [#270](https://github.com/magiclabs/magic-js/pull/270) ([@smithki](https://github.com/smithki))
- Fix CDN issues related to ESBuild ([@smithki](https://github.com/smithki))

#### Authors: 1

- Ian K Smith ([@smithki](https://github.com/smithki))

---

# v8.0.0 (Tue Jan 25 2022)

#### 💥 Breaking Change

- Switch from `microbundle` to `esbuild` [#220](https://github.com/magiclabs/magic-js/pull/220) ([@smithki](https://github.com/smithki))

#### 🐛 Bug Fix

- Merge with master ([@smithki](https://github.com/smithki))
- Merge branch 'master' into feat/faster-builds ([@smithki](https://github.com/smithki))
- Modify CDN default exports ([@smithki](https://github.com/smithki))
- Remove comments from README files ([@smithki](https://github.com/smithki))
- Fix build errors related to isolatedModules ([@smithki](https://github.com/smithki))
- Replace microbundle with ESBuild ([@smithki](https://github.com/smithki))

#### Authors: 1

- Ian K Smith ([@smithki](https://github.com/smithki))

---

# v7.0.0 (Tue Dec 14 2021)

#### 💥 Breaking Change

- Deprecate test API key [#252](https://github.com/magiclabs/magic-js/pull/252) (harry [@harryEth](https://github.com/harryEth))

#### Authors: 2

- [@harryEth](https://github.com/harryEth)
- harry (harry)

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

# v6.0.7 (Thu Sep 23 2021)

#### 🐛 Bug Fix

- Change 'externals' and 'global' condition in magic-sdk > CDN build [#219](https://github.com/magiclabs/magic-js/pull/219) ([@smithki](https://github.com/smithki))

#### Authors: 1

- Ian K Smith ([@smithki](https://github.com/smithki))

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

# v4.1.0 (Sat Jan 23 2021)

#### 🚀 Enhancement

- Iframe accessibility improvements: Add `title` attribute and auto-focus when UI is showing [#158](https://github.com/magiclabs/magic-js/pull/158) ([@smithki](https://github.com/smithki))

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

## `2.7.0` - 09/24/2020

#### Added

- Adds a Magic SDK extensions runtime compatibility check, ensuring you're version of Magic SDK is designed for the extensions you have in use.

## `2.6.0` - 09/15/2020

#### Added

- New, optional `redirectURI` parameter for the `loginWithMagicLink` method
- New `loginWithCredential` method for completing a magic link login with redirect: `await magic.auth.loginWithCredential()`

## `2.5.0` - 08/24/2020

#### Added

- New optional `locale` parameter to SDK constructor

## `2.4.8` - 08/20/2020

#### Added

- New RPC error code for the `loginWithMagicLink` method: `-10005`

## `2.4.6` - 07/22/2020

#### Added

- Export `PromiEvent` type and `isPromiEvent` utility from SDK entry-points (`magic-sdk` and `@magic-sdk/react-native`).

## `2.4.1` through `2.4.5` - 07/13/2020

#### Fixed

- Bug preventing NPM tarball from containing `/dist` files.

## `2.4.0` - 07/13/2020

#### Changed

- Updated build system to use TypeScript project references instead of Microbundle.
- Pass `targetOrigin` parameter to `postMessage` calls.

## `2.3.1` - 07/08/2020

#### Fixed

- Bug affecting `localforage` type imports causing compilation failure in TypeScript.

## `2.3.0` - 07/08/2020

#### Added

- WebAuthn support.
- `localforage` APIs for Magic SDK Extensions.

## `2.1.0` - 06/25/2020

#### Changed

- Update dependencies.

#### Addded

- Add `ExtensionWarning` class.

## `2.0.7` - 06/23/2020

#### Changed

- Update dependencies.

## `2.0.6` - 06/23/2020

#### Changed

- Update dependencies.

## `2.0.5` - 06/23/2020

#### Changed

- Update dependencies.

## `2.0.4` - 06/22/2020

#### Changed

- Update dependencies.

## `2.0.3` - 06/16/2020

#### Added

- Introduce the `ExtensionError` type to ease handling of errors rising from Magic SDK Extensions.

## `2.0.2` - 06/12/2020

#### Changed

- Update dependencies.
- Circle CI tag in readme is broken after namechange from MagicHQ to MagicLabs

## `2.0.1` - 06/11/2020

#### Changed

- Update dependencies.

## `2.0.0` - 06/02/2020

#### Fixed

- Circle CI tag in readme is broken after namechange from MagicHQ to MagicLabs

#### Changed

- Removed the `magic-sdk/react-native` entry-point. To use React Native with Magic SDK, install `@magic-sdk/react-native` instead. There are no breaking API changes related to public SDK methods.

## `1.4.0` - 05/14/2020

#### Added

- `PromiEvent` interface for increasing the flexibility developers have when building 100% whitelabeled authentication flows using Magic SDK. This is a completely optional feature. Documentation is coming soon!

## `1.3.5` - 05/14/2020

#### Fixed

- Fixed a bug where React Native typings would pollute web environments not using Webpack.

## `1.3.4` - 05/14/2020

#### Fixed

- Alias the `Magic` constructor import to the SDK instance type. We have pretty complex extension typings which wrap the base SDK class, which was making typing a variable as `Magic` unnecessarily difficult! Now, you can use the constructor as the instance type as expected.

- Fixed a bug that would prevent typings from being available in a React Native environment.

## `1.3.3` - 05/14/2020

#### Fixed

- Fix a bug affecting Ethers JS V5 beta that would fail to attach the required ID parameter to JSON RPC 2.0 request payloads.

## `1.3.2` - 05/07/2020

#### Fixed

- The React Native entry point encountered an issue where `Buffer` is `undefined`. This is now resolved!

## `1.3.1` - 05/06/2020

#### Changed

- The React Native entry point now issues a warning if the `endpoint` parameter is used. This parameter should only be customized for web/browser targets. Existing implementations will continue to work with the warning.

- The default `endpoint` URL for React Native integrations is `https://box.magic.link`.

## `1.3.0` - 05/05/2020

#### Added

- Support for configuring [Harmony](https://www.harmony.one/) network as the Etherum chain type. Further documentation is coming soon.

## `1.2.1` - 04/30/2020

#### Fixed

- Removed the `pako` dependency as it was negatively impacting SDK bundle size.

## `1.2.0` - 04/29/2020

#### Added

- The new `Extension` interface will soon enable Magic SDK to support official
  and third-party plugins!

## `1.1.4` - 04/28/2020

#### Changed

- Allow JSON RPC responses from the Magic `<iframe>` to be explicitly `null`.

## `1.1.3` - 04/28/2020

#### Fixed

- A bug on Safari that would lead to persistent `TypeError`s when using the CDN build of the library.

## `1.1.2` - 04/22/2020

#### Fixed

- Certain NodeJS globals/polyfills were not available in React Native environments. These polyfills are now bootstrapped automatically.

## `1.1.1` - 04/22/2020

#### Added

- Support for React Native:

```tsx
// Import the React Native bundle
// (Don't worry, the API is exactly the same!)
import { Magic } from 'magic-sdk/react-native';

const magic = new Magic('API_KEY');

function App() {
  return (<div>
    {/* Just render the `Modal` component to connect Magic SDK! 🚀 */}
    <magic.Relayer />
  </div>);
}
```

## `1.0.3` - 04/21/2020

#### Added

- `UpdateEmailFailed` RPCErrorCode for when update email fails.

## `1.0.2` - 04/15/2020

#### Added

- `preload` method for downloading the assets required to render the Magic `<iframe>`.

## `1.0.1` - 04/09/2020

This is the first release our changelog records. Future updates will be logged in the following format:

#### Fixed

- Bug fixes and patches will be described here.

#### Changed

- Changes (breaking or otherwise) to current APIs will be described here.

#### Added

- New features or APIs will be described here.
