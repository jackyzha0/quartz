# @ethereumjs/common

[![NPM Package][common-npm-badge]][common-npm-link]
[![GitHub Issues][common-issues-badge]][common-issues-link]
[![Actions Status][common-actions-badge]][common-actions-link]
[![Code Coverage][common-coverage-badge]][common-coverage-link]
[![Discord][discord-badge]][discord-link]

| Resources common to all EthereumJS implementations. |
| --- |

Note: this `README` reflects the state of the library from `v2.0.0` onwards. See `README` from the [standalone repository](https://github.com/ethereumjs/ethereumjs-common) for an introduction on the last preceding release.

# INSTALL

`npm install @ethereumjs/common`

# USAGE

All parameters can be accessed through the `Common` class which can be required through the
main package and instantiated either with just the `chain` (e.g. 'mainnet') or the `chain`
together with a specific `hardfork` provided.

If no hardfork is provided, the common is initialized with the default hardfork.

Current `DEFAULT_HARDFORK`: `istanbul`

Here are some simple usage examples:

```typescript
import Common from '@ethereumjs/common'

// Instantiate with the chain (and the default hardfork)
const c = new Common({ chain: 'ropsten' })
c.param('gasPrices', 'ecAddGas') // 500

// Chain and hardfork provided
c = new Common({ chain: 'ropsten', hardfork: 'byzantium' })
c.param('pow', 'minerReward') // 3000000000000000000

// Instantiate with an EIP activated
const c = new Common({ chain: 'mainnet', eips: [2537] })

// Access genesis data for Ropsten network
c.genesis().hash // 0x41941023680923e0fe4d74a34bdac8141f2540e3ae90623718e47d66d1ca4a2d

// Get bootstrap nodes for chain/network
c.bootstrapNodes() // Array with current nodes
```

If the initializing library only supports a certain range of `hardforks` you can use the `supportedHardforks` option to restrict hardfork access on the `Common` instance:

```typescript
const c = new Common({
  chain: 'ropsten',
  supportedHardforks: ['byzantium', 'constantinople', 'petersburg'],
})
```

This will e.g. throw an error when a param is requested for an unsupported hardfork and
like this prevents unpredicted behaviour.

For an improved developer experience, there are `Chain` and `Hardfork` enums available:

```typescript
import Common, { Chain, Hardfork } from '@ethereumjs/common'

// Chain provided by Chain enum
const c = new Common({ chain: Chain.Mainnet })

// Chain provided by Chain enum, hardfork provided by Hardfork enum
const c = new Common({ chain: Chain.Ropsten, hardfork: Hardfork.Byzantium })
```

# API

See the API documentation for a full list of functions for accessing specific chain and
depending hardfork parameters. There are also additional helper functions like
`paramByBlock (topic, name, blockNumber)` or `hardforkIsActiveOnBlock (hardfork, blockNumber)`
to ease `blockNumber` based access to parameters.

- [API Docs](./docs/README.md)

# EVENTS

The `Common` class is implemented as an `EventEmitter` and is emitting the following events
on which you can react within your code:

| Event | Description |
| - | - |
| `hardforkChanged` | Emitted when a hardfork change occurs in the Common object |

# SETUP

## Chains

The `chain` can be set in the constructor like this:

```typescript
const c = new Common({ chain: 'ropsten' })
```

Or optionally with the `Chain` enum:

```typescript
import Common, { Chain } from '@ethereumjs/common'

const c = new Common({ chain: Chain.Ropsten })
```

Supported chains:

- `mainnet` (`Chain.Mainnet`)
- `ropsten` (`Chain.Ropsten`)
- `rinkeby` (`Chain.Rinkeby`)
- `kovan` (`Chain.Kovan`)
- `goerli` (`Chain.Goerli`)
- `sepolia` (`Chain.Sepolia`) (`v2.6.1`+)
- Private/custom chain parameters

The following chain-specific parameters are provided:

- `name`
- `chainId`
- `networkId`
- `consensusType` (e.g. `pow` or `poa`)
- `consensusAlgorithm` (e.g. `ethash` or `clique`)
- `consensusConfig` (depends on `consensusAlgorithm`, e.g. `period` and `epoch` for `clique`)
- `genesis` block header values
- `hardforks` block numbers
- `bootstrapNodes` list
- `dnsNetworks` list ([EIP-1459](https://eips.ethereum.org/EIPS/eip-1459)-compliant list of DNS networks for peer discovery)

To get an overview of the different parameters have a look at one of the chain-specifc
files like `mainnet.json` in the `chains` directory, or to the `Chain` type in [./src/types.ts](./src/types.ts).

### Working with private/custom chains

There are two distinct APIs available for setting up custom(ized) chains.

#### Basic Chain Customization / Predefined Custom Chains

There is a dedicated `Common.custom()` static constructor which allows for an easy instantiation of a Common instance with somewhat adopted chain parameters, with the main use case to adopt on instantiating with a deviating chain ID (you can use this to adopt other chain parameters as well though). Instantiating a custom common instance with its own chain ID and inheriting all other parameters from `mainnet` can now be as easily done as:

```typescript
const common = Common.custom({ chainId: 1234 })
```

The `custom()` method also takes a string as a first input (instead of a dictionary). This can be used in combination with the `CustomChain` enum dict which allows for the selection of predefined supported custom chains for an easier `Common` setup of these supported chains:

```typescript
const common = Common.custom(CustomChain.ArbitrumRinkebyTestnet)
```

The following custom chains are currently supported:

- `PolygonMainnet`
- `PolygonMumbai`
- `ArbitrumRinkebyTestnet`
- `xDaiChain`
- `OptimisticKovan`
- `OptimisticEthereum`

`Common` instances created with this simplified `custom()` constructor can't be used in all usage contexts (the HF configuration is very likely not matching the actual chain) but can be useful for specific use cases, e.g. for sending a tx with `@ethereumjs/tx` to an L2 network (see the `Tx` library [README](https://github.com/ethereumjs/ethereumjs-monorepo/tree/master/packages/tx) for a complete usage example).


#### Activate with a single custom Chain setup

If you want to initialize a `Common` instance with a single custom chain which is then directly activated
you can pass a dictionary - conforming to the parameter format described above - with your custom chain 
values to the constructor using the `chain` parameter or the `setChain()` method, here is some example:

```typescript
import myCustomChain from './[PATH]/myCustomChain.json'
const common = new Common({ chain: myCustomChain })
```

#### Initialize using customChains Array

A second way for custom chain initialization is to use the `customChains` constructor option. This
option comes with more flexibility and allows for an arbitrary number of custom chains to be initialized on
a common instance in addition to the already supported ones. It also allows for an activation-independent 
initialization, so you can add your chains by adding to the `customChains` array and either directly 
use the `chain` option to activate one of the custom chains passed or activate a build in chain 
(e.g. `mainnet`) and switch to other chains - including the custom ones - by using `Common.setChain()`.

```typescript
import myCustomChain1 from './[PATH]/myCustomChain1.json'
import myCustomChain2 from './[PATH]/myCustomChain2.json'
// Add two custom chains, initial mainnet activation
const common1 = new Common({ chain: 'mainnet', customChains: [ myCustomChain1, myCustomChain2 ] })
// Somewhat later down the road...
common1.setChain('customChain1')
// Add two custom chains, activate customChain1
const common1 = new Common({ chain: 'customChain1', customChains: [ myCustomChain1, myCustomChain2 ] })
```

It is also possible (`v2.5.0`+) to pass in a custom genesis state file (see e.g. `src/genesisStates/goerli.json` for an example on the format needed) along with the custom chain configuration:

```typescript
import myCustomChain1 from '[PATH_TO_MY_CHAINS]/myCustomChain1.json'
import chain1GenesisState from '[PATH_TO_GENESIS_STATES]/chain1GenesisState.json'
const common = new Common({ chain: 'myCustomChain1', customChains: [ [ myCustomChain1, chain1GenesisState ] ]})
```

Accessing the genesis state can be done as follows:

```typescript
const genesisState = common.genesisState()
```

This now also provides direct access to custom genesis states passed into `Common` as described above. The old Common-separate `genesisStateByName()` and `genesisStateById()` functions are now `deprecated` and usage should be avoided.

## Hardforks

The `hardfork` can be set in constructor like this:

```typescript
const c = new Common({ chain: 'ropsten', hardfork: 'byzantium' })
```

Or optionally with the `Hardfork` enum:

```typescript
import Common, { Chain, Hardfork } from '@ethereumjs/common'

const c = new Common({
  chain: Chain.Ropsten,
  hardfork: Hardfork.Byzantium,
})
```

### Active Hardforks

There are currently parameter changes by the following past and future hardfork by the
library supported:

- `chainstart` (`Hardfork.Chainstart`)
- `homestead` (`Hardfork.Homestead`)
- `dao` (`Hardfork.Dao`)
- `tangerineWhistle` (`Hardfork.TangerineWhistle`)
- `spuriousDragon` (`Hardfork.SpuriousDragon`)
- `byzantium` (`Hardfork.Byzantium`)
- `constantinople` (`Hardfork.Constantinople`)
- `petersburg` (`Hardfork.Petersburg`) (aka `constantinopleFix`, apply together with `constantinople`)
- `istanbul` (`Hardfork.Instanbul`) (`DEFAULT_HARDFORK` (`v2.0.0` release series))
- `muirGlacier` (`Hardfork.MuirGlacier`)
- `berlin` (`Hardfork.Berlin`) (since `v2.2.0`)
- `london` (`Hardfork.London`) (since `v2.4.0`)
- `merge` (`Hardfork.Merge`) (since `v2.5.0`, `experimental`)

### Future Hardforks

The next upcoming HF `shanghai` is currently not yet supported by this library.

### Parameter Access

For hardfork-specific parameter access with the `param()` and `paramByBlock()` functions
you can use the following `topics`:

- `gasConfig`
- `gasPrices`
- `vm`
- `pow`

See one of the hardfork files like `byzantium.json` in the `hardforks` directory
for an overview. For consistency, the chain start (`chainstart`) is considered an own
hardfork.

The hardfork-specific json files only contain the deltas from `chainstart` and
shouldn't be accessed directly until you have a specific reason for it.

## EIPs

Starting with the `v2.0.0` release of the library, EIPs are now native citizens within the library
and can be activated like this:

```typescript
const c = new Common({ chain: Chain.Mainnet, eips: [2537] })
```

The following EIPs are currently supported:

- [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559): Fee market change for ETH 1.0 chain
- [EIP-2315](https://eips.ethereum.org/EIPS/eip-2315): Simple subroutines for the EVM
- [EIP-2537](https://eips.ethereum.org/EIPS/eip-2537): BLS precompiles
- [EIP-2565](https://eips.ethereum.org/EIPS/eip-2565): ModExp gas cost
- [EIP-2718](https://eips.ethereum.org/EIPS/eip-2565): Transaction Types
- [EIP-2929](https://eips.ethereum.org/EIPS/eip-2929): gas cost increases for state access opcodes
- [EIP-2930](https://eips.ethereum.org/EIPS/eip-2930): Optional accesss list tx type
- [EIP-3198](https://eips.ethereum.org/EIPS/eip-3198): Base fee Opcode
- [EIP-3529](https://eips.ethereum.org/EIPS/eip-3529): Reduction in refunds
- [EIP-3541](https://eips.ethereum.org/EIPS/eip-3541): Reject new contracts starting with the 0xEF byte
- [EIP-3554](https://eips.ethereum.org/EIPS/eip-3554): Difficulty Bomb Delay to December 2021 (only PoW networks)
- [EIP-3675](https://eips.ethereum.org/EIPS/eip-3675): Upgrade consensus to Proof-of-Stake (`experimental`)
- [EIP-3855](https://eips.ethereum.org/EIPS/eip-3855): Push0 opcode (`v2.6.1`+)

## Bootstrap Nodes

You can use `common.bootstrapNodes()` function to get nodes for a specific chain/network.

# EthereumJS

See our organizational [documentation](https://ethereumjs.readthedocs.io) for an introduction to `EthereumJS` as well as information on current standards and best practices.

If you want to join for work or do improvements on the libraries have a look at our [contribution guidelines](https://ethereumjs.readthedocs.io/en/latest/contributing.html).

# LICENSE

[MIT](https://opensource.org/licenses/MIT)

[discord-badge]: https://img.shields.io/static/v1?logo=discord&label=discord&message=Join&color=blue
[discord-link]: https://discord.gg/TNwARpR
[common-npm-badge]: https://img.shields.io/npm/v/@ethereumjs/common.svg
[common-npm-link]: https://www.npmjs.com/package/@ethereumjs/common
[common-issues-badge]: https://img.shields.io/github/issues/ethereumjs/ethereumjs-monorepo/package:%20common?label=issues
[common-issues-link]: https://github.com/ethereumjs/ethereumjs-monorepo/issues?q=is%3Aopen+is%3Aissue+label%3A"package%3A+common"
[common-actions-badge]: https://github.com/ethereumjs/ethereumjs-monorepo/workflows/Common/badge.svg
[common-actions-link]: https://github.com/ethereumjs/ethereumjs-monorepo/actions?query=workflow%3A%22Common%22
[common-coverage-badge]: https://codecov.io/gh/ethereumjs/ethereumjs-monorepo/branch/master/graph/badge.svg?flag=common
[common-coverage-link]: https://codecov.io/gh/ethereumjs/ethereumjs-monorepo/tree/master/packages/common
