# Thirdweb SDK (legacy)

> This is an **legacy** version of Thirdweb SDK.

> [Looking for version 2? Click here!](https://github.com/thirdweb-dev/typescript-sdk)

### Docs

https://docs.thirdweb.com

### Api Reference

https://thirdweb-dev.github.io/typescript-sdk/sdk.html

### Testing

Tests require a hardhat node to be running. One can be started by running `npx hardhat node` in a hardhat project. A hardhat project can be initialized using `npx hardhat init -y`. 

#### Running all tests

```bash
$ yarn run test:all
```

#### Running a specific test file

```bash
$ yarn run test test/pack.test.ts
```

#### Running a matching set of tests

```bash
$ yarn run test test/pack.test.ts --grep "should allow you to buy a pack"
```
