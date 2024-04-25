"use client";

import configs from "~/configs";
import images from "~/assets/images";
import { WalletType } from "~/types/GenericsType";

declare const window: any;

const wallets: Array<WalletType> = [
    {
        name: "Nami",
        image: images.nami,
        api: async function () {
            return await window.cardano.nami.enable();
        },
        checkApi: async function () {
            return await window.cardano.nami;
        },
        downloadApi: configs.wallets.nami,
    },
    {
        name: "Eternl",
        image: images.eternl,
        api: async function () {
            return window.cardano.eternl.enable();
        },
        checkApi: async function () {
            return await window.cardano.eternl;
        },
        downloadApi: configs.wallets.eternl,
    },
    {
        name: "Flint",
        image: images.flint,
        api: async function () {
            return await window.cardano.flint.enable();
        },
        checkApi: async function () {
            return await window.cardano.flint;
        },
        downloadApi: configs.wallets.flint,
    },
    {
        name: "Lace",
        image: images.lace,
        api: async function () {
            return await window.cardano.lace.enable();
        },
        checkApi: async function () {
            return await window.cardano.lace;
        },
        downloadApi: configs.wallets.lace,
    },
    {
        name: "Gero",
        image: images.gero,
        api: async function () {
            return await window.cardano.gero.enable();
        },
        checkApi: async function () {
            return await window.cardano.gero;
        },
        downloadApi: configs.wallets.gero,
    },
    {
        name: "Typhon",
        image: images.typhon,
        api: async function () {
            return await window.cardano.typhon.enable();
        },
        checkApi: async function () {
            return await window.cardano.typhon;
        },
        downloadApi: configs.wallets.typhon,
    },
    {
        name: "Vespr",
        image: images.vespr,
        api: async function () {
            return await window.cardano.vespr.enable();
        },
        checkApi: async function () {
            return await window.cardano.vespr;
        },
        downloadApi: configs.wallets.vespr,
    },
    {
        name: "Yoroi",
        image: images.yoroi,
        api: async function () {
            return await window.cardano.yoroi.enable();
        },
        checkApi: async function () {
            return await window.cardano.yoroi;
        },
        downloadApi: configs.wallets.yoroi,
    },
    {
        name: "Nufi",
        image: images.nufi,
        api: async function () {
            return await window.cardano.nufi.enable();
        },
        checkApi: async function () {
            return await window.cardano.nufi;
        },
        downloadApi: configs.wallets.nufi,
    },
] as const;

export default wallets;
