# Foundry DeFi Stablecoin - 🏗 Scaffold-ETH 2

Fiat backed Stablecoin Contracts Based on the [centre-tokens](https://github.com/centrehq/centre-tokens)

# Fiat Stablecoin Manager

![Fiat Stablecoin Manager](https://github.com/ldsanchez/fiat-stablecoin-se2/assets/5996795/4e56e018-db1a-42d9-9660-1a4edfc6ed7e)

# Functionality

- [x] Initialize Token
- [x] Add/Remove Minters
- [x] Pause/Unpause Token
- [x] Add/Remove Addresses from blacklist
- [x] Update Roles
- [x] Rescue ERC20 Tokens
- [x] Mint new Tokens

## Initialize Token

![Initialize Token](https://github.com/ldsanchez/fiat-stablecoin-se2/assets/5996795/ee868e27-d84f-424d-9570-2ffcb0533a63)

![Initialize Token](https://github.com/ldsanchez/fiat-stablecoin-se2/assets/5996795/2802a7ed-c291-4a79-bb04-a1b9a72497b7)

![Token Info](https://github.com/ldsanchez/fiat-stablecoin-se2/assets/5996795/3ab04032-c1af-4090-bb55-82e5e4f2635d)

## Admin Dashboard by Role

![Token Info](https://github.com/ldsanchez/fiat-stablecoin-se2/assets/5996795/29e6ba9f-27ea-42e5-9115-dae4a658692b)

## Mint Tokens

![Mint Tokens](https://github.com/ldsanchez/fiat-stablecoin-se2/assets/5996795/5d588c51-406a-443b-a1c0-756a552fbe7a)

## Requirements

Before you begin, you need to install the following tools:

- [Node (v18 LTS)](https://nodejs.org/en/download/)
- Yarn ([v1](https://classic.yarnpkg.com/en/docs/install/) or [v2+](https://yarnpkg.com/getting-started/install))
- [Git](https://git-scm.com/downloads)

## Quickstart

To get started with, follow the steps below:

1. Clone this repo & install dependencies

```
git clone https://github.com/ldsanchez/fiat-stablecoin-se2.git
cd fiat-stablecoin-se2
yarn install
foundryup
```

2. Create your .env file

```
(echo "DEPLOYER_PRIVATE_KEY=";  echo "ALCHEMY_API_KEY=oKxs-03sij-U_N0iOlrSsZFr29-IqbuF"; echo "ETHERSCAN_API_KEY=DNXJA8RX2Q3VZ4URQIWP7Z68CJXQZSC6AW") >> packages/foundry/.env
```

3. Run a local network in the first terminal:

```
yarn chain
```

This command starts a local Ethereum network using Anvil in Foundry. The network runs on your local machine and can be used for testing and development. You can customize the network configuration in `foundry.toml`

4. On a second terminal, deploy the test contract:

```
yarn deploy
```

This command deploys a test smart contract to the local network. The contract is located in `packages/foundry/contracts` and can be modified to suit your needs. The `yarn deploy` command uses the deploy script located in `packages/foundry/deploy` to deploy the contract to the network. You can also customize the deploy script.

5. On a third terminal, start your NextJS app:

```
yarn start
```

Visit your app on: `http://localhost:3000`. You can interact with your smart contract using the contract component or the example ui in the frontend. You can tweak the app config in `packages/nextjs/scaffold.config.ts`.

Run smart contract test with `yarn foundry:test`

# To-Do

- [x] Refactor Requirements
- [x] Refactor Naming Conventions
- [x] Optimize storage
- Account Abstraction
- Proxy contract pattern for upgrades
- Multisig Wallet for Deployment

## Contributing to Scaffold-ETH 2

We welcome contributions to Scaffold-ETH 2!

Please see [CONTRIBUTING.MD](https://github.com/scaffold-eth/scaffold-eth-2/blob/main/CONTRIBUTING.md) for more information and guidelines for contributing to Scaffold-ETH 2.
