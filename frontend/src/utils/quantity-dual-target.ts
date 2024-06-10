type Props = {
    step: number;
    income: number;
    stake: number;
    entry: number;
};

const quantityDualTarget = function ({
    stake,
    entry,
    income,
    step,
}: Props): [number, number, number] {
    try {
        const USDTPool: number = (income * 12) / (stake / 100);
        const quantityEntrySell: number = USDTPool / (entry * (1 + step / 100));
        const quantityEntry: number = USDTPool / entry;
        const quantityEntryBuy: number = USDTPool / (entry * (1 - step / 100));
        const quantityBuy: number = quantityEntryBuy - quantityEntry;
        const quantitySell: number = quantityEntry - quantityEntrySell;
        return [quantityBuy, quantitySell, quantityEntry];
    } catch (error) {
        console.log("Quantity dualtarget: " + error);
        return [0, 0, 0];
    }
};

export default quantityDualTarget;
