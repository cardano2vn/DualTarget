<div style="text-align:center">
   <h2>Dualtarget for ADA-Holders (Staking and increasing assets) with a decentralized automated trading bot</h2>
</div>

<div style="text-align:center">
    <img src="./frontend/src/assets/images/logo.png" />
</div>

## Instructions for use

[![Everything Is AWESOME](./frontend/src/assets/images/youtube.png)](https://www.youtube.com/watch?v=DCWY93O_QAU&t=1s "Everything Is AWESOME")

## Installation Instructions

### 1. Please clone this source code

In this project, nextjs is used as the main frontend framework to perform construction and development. In this guide there will be some requirements to show you how to develop products using git to clone the project.

Before starting the project you need to have git. If you don't have git yet, download git by clicking the link below before going to the next part.

```sh
https://git-scm.com/downloads
```

Then you check out git with the command `git --version` trong terminal

```
$ git --version
> git version 2.41.0.windows.3
```

Then use commands clone the project from github

```sh
git clone https://github.com/independenceee/dualtarget.git
```

Then use commands to go to the directory of the current dualtarget frontend

```sh
cd dualtarget/frontend
```

### 2. Project settings

In this tutorial we will show you 2 ways to run our project on the frontend Through `docker` or run setup using `nodejs`. When setting up the project you need to set environment variables for the project in the file `next.config.mjs`. If you don't have an API, you can download blockfrost's API to use its API

```ts
const nextConfig = {
    ...
    env: {
        BLOCKFROST_NETWORK_NAME_PREPROD: "Preprod",
        BLOCKFROST_NETWORK_NAME_PREVIEW: "Preview",
        BLOCKFROST_NETWORK_NAME_MAINNET: "Mainnet",
        BLOCKFROST_RPC_URL_MAINNET:
            "https://cardano-mainnet.blockfrost.io/api/v0",
        BLOCKFROST_RPC_URL_PREPROD:
            "https://cardano-preprod.blockfrost.io/api/v0",
        BLOCKFROST_RPC_URL_PREVIEW:
            "https://cardano-preview.blockfrost.io/api/v0",
        BLOCKFROST_PROJECT_API_KEY_MAINNET:
            "mainnettClW67e7zjxBTdjgynNwmGsvyz5DCMmC",
        BLOCKFROST_PROJECT_API_KEY_PREPROD:
            "preprody7qLCi4kIiAUEFRlJvmZ2PTi6jreF7gI",
        BLOCKFROST_PROJECT_API_KEY_PREVIEW:
            "preprody7qLCi4kIiAUEFRlJvmZ2PTi6jreF7gI",
        KOIOS_RPC_URL_PREPROD: "https://preprod.koios.rest/api/v1",
        KOIOS_RPC_URL_PREVIEW: "https://preview.koios.rest/api/v1",
        KOIOS_RPC_URL_MAINNET: "https://api.koios.rest/api/v1",
        NEXT_APP_BASE_URL: "https://api.dualtarget.vn/api/v1",
        BINANCE_API_KEY:
            "V0popsaVcPSajStISK7DRkZsYOgMEqnlFoDwejiy28gsDMZ4Uj6Ohrr3vIxdAlby",
        BINANCE_API_SECRET:
            "nItpNsxBjIgePDYGAgZ9iiMUlK1LwLLwOs4776B9vbf5HLmDm61TsT5hC9w1nrpg",
        DUALTARGET_CONTRACT_ADDRESS_PREPROD:
            "addr_test1wrkv2awy8l5nk9vwq2shdjg4ntlxs8xsj7gswj8au5xn8fcxyhpjk",
        EXCHANGE_ADDRESS_FREE_PREPROP:
            "ecc575c43fe93b158e02a176c9159afe681cd097910748fde50d33a7",
        HADA_POOL_ID:
            "pool1rqgf6qd0p3wyf9dxf2w7qcddvgg4vu56l35ez2xqemhqun2gn7y",
        EPOCH_POOL_ID: "478",
        DUALTARGET_PAYMENT_ADDRESS_PREPROP:
            "addr_test1wrkv2awy8l5nk9vwq2shdjg4ntlxs8xsj7gswj8au5xn8fcxyhpjk",
        DUALTARGET_STAKE_ADDRESS_PREPROP:
            "stake1ux0ptr0qx8ey4pw8n7f2n0mkg94dkdqg28nw5jh3l9pdcfc0scpge",
    },

    ...
};

```

To get these resources you need to `https://blockfrost.io` and `https://www.koios.rest` to do a few operations to get all the dependencies for the project.

#### Using `Docker`

When you want to setup a project using Docker, you must have Docker. If you do not have Docker, download Docker to your environment to run the project. `https://www.docker.com`

```sh
$ docker --version
> Docker version 24.0.7, build afdd53b
```

Into the project directory `docker compose up --build` to use docker to run the project

```sh
$ run docker compose up --build

[+] Running 2/2
 ✔ Network frontend_default         Created                                                                                                            0.0s
 ✔ Container frontend-dualtarget-1  Created                                                                                                            0.1s
Attaching to dualtarget-1
dualtarget-1  |
dualtarget-1  | > dual-target-frontend@0.1.0 start
dualtarget-1  | > next start
dualtarget-1  |
dualtarget-1  |    ▲ Next.js 14.1.0
dualtarget-1  |    - Local:        http://localhost:3000
dualtarget-1  |
dualtarget-1  |  ✓ Ready in 400ms
```

The successfully installed project needs to be up and running on PORT:3000

### Using `NodeJS`

This tutorial requires you to have nodejs. If you don't have it yet, install nodejs. Along with nodejs, npm and npx need to check the existence of these two packages before going to the next part.

```sh
https://nodejs.org/en
```

Then install the project using `npm install` to get the necessary resources for the project

```sh
npm install
```

after the installation is done successfully use `npm run dev` to run the project

```sh
$ npm run dev
> dualtarget-frontend@1.0.0 dev
> ts-node src/index.ts
http://localhost:3000
```

The project is running on `PORT 3000` and now you will carry out development of our project. After the project is built successfully, execute `npm run build` to build and check the output and `npm run start` to start the project production

## License

The Dualtarget is released under the MIT. See the LICENSE file for more details.

## Contact

For any questions or feedback, please contact the project maintainer at `nguyenkhanh17112003@gmail.com`.
