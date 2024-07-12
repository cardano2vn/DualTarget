import { BATCHER_FEE } from "~/constants";

type Props = {
    utxos: any[];
    address: string;
    endTime: number;
    startTimeStake: number;
};

const caculateDepositWithdraw = async function ({
    utxos,
    address,
    endTime,
    startTimeStake,
}: Props): Promise<number> {
    const results = utxos.filter(function ({ block_time, utxos }) {
        return block_time >= endTime && block_time >= startTimeStake;
    });

    const transactions: any[] = await Promise.all(
        results
            .map((transaction) => {
                const hasInput: any = transaction.utxos.inputs.some(
                    (input: any) => input.address === address,
                );
                const hasOutput = transaction.utxos.outputs.some(
                    (output: any) => output.address === address,
                );
                if (hasInput) {
                    let amount: number = 0;

                    transaction.utxos.inputs.forEach(function (input: any) {
                        if (input.address === address) {
                            const quantity = input.amount.reduce(function (
                                total: number,
                                { unit, quantity }: any,
                            ) {
                                if (unit === "lovelace" && !input.reference_script_hash) {
                                    return total + Number(quantity);
                                }
                                return total;
                            },
                            0);
                            amount += quantity;
                        }
                    }, 0);
                    return {
                        type: "Withdraw",
                        amount: +(amount / 1000000).toFixed(5),
                    };
                }

                if (hasOutput) {
                    let amount: number = -BATCHER_FEE;
                    transaction.utxos.outputs.forEach(function (output: any) {
                        if (output.address === address) {
                            const quantity = output.amount.reduce(function (
                                total: number,
                                { unit, quantity }: any,
                            ) {
                                if (unit === "lovelace") {
                                    return total + Number(quantity);
                                }

                                return total;
                            },
                            0);

                            amount += quantity;
                        }
                    }, 0);
                    return {
                        type: "Deposit",
                        amount: +(amount / 1000000).toFixed(5),
                    };
                }
            })
            .filter((output) => output != null),
    );

    let result = 0;

    transactions?.forEach((transaction: any) => {
        if (transaction.type === "Deposit") {
            result += transaction.amount;
        } else if (transaction.type === "Withdraw") {
            result -= transaction.amount;
        }
    });

    return result;
};

export default caculateDepositWithdraw;
