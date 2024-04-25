import quantityDualTarget from "./quantity-dual-target";
import { CalculateSellingStrategy } from "~/types/GenericsType";

type Props = {
    priceLow: number;
    priceHight: number;
    step: number;
    income: number;
    totalADA: number;
    stake: number;
};

function calculateSellingStrategy({ priceHight, priceLow, step, income, stake, totalADA }: Props): Array<CalculateSellingStrategy> {
    const DECIMAL_PLACES: number = 1000000;
    const OUTPUT_ADA: number = 3000000;
    const BATCHER_FEE: number = 1500000;
    let price: number = priceLow;

    let sumADA: number = 0; // Số lượng ada cần nhập vào => UI

    const result: Array<CalculateSellingStrategy> = [];

    while (price <= priceHight) {
        const [quantityBuy, quantitySell, quantityEntry] = quantityDualTarget({
            step: step,
            income: income,
            stake: stake,
            entry: price / DECIMAL_PLACES,
        });

        const buyPrice: number = Math.floor(price);
        const sellPrice: number = Math.floor(buyPrice * (1 + step / 100));
        const amountIn: number = Math.floor(quantitySell * DECIMAL_PLACES);
        const minimumAmountOut: number = Math.floor((amountIn * buyPrice) / DECIMAL_PLACES);
        const minimumAmountOutProfit: number = Math.floor(((step / 100) * sellPrice * amountIn) / DECIMAL_PLACES);
        const amountSend: number = amountIn + BATCHER_FEE + OUTPUT_ADA;
        sumADA += amountSend;

        result.push({
            buyPrice: buyPrice,
            sellPrice: sellPrice,
            amountSend: amountSend,
            minimumAmountOut: minimumAmountOut,
            minimumAmountOutProfit: minimumAmountOutProfit,
            amountSell: Math.floor(quantitySell * DECIMAL_PLACES),
            amountBuy: Math.floor(quantityBuy * DECIMAL_PLACES),
            amountEntry: Math.floor(quantityEntry * DECIMAL_PLACES),
            USDTPool: Math.floor((price * quantityEntry) / DECIMAL_PLACES),
            sumADA: Math.floor(sumADA),
        });

        price *= 1 + step / 100;
    }

    return result;
}

export default calculateSellingStrategy;
