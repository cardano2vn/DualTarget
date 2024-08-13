import axios, { Axios } from "axios";

class Koios extends Axios {
    constructor(url: string) {
        super({
            baseURL: url,
        });
    }

    async accountRewards({ stakeAddress, epochNo }: { stakeAddress: string; epochNo: number }) {
        try {
            const { data } = await this.post(
                `/account_rewards`,
                JSON.stringify({
                    _stake_addresses: [stakeAddress],
                    _epoch_no: epochNo,
                }),

                {
                    headers: {
                        "content-type": "application/json",
                        accept: "application/json",
                    },
                },
            );
            const parse = JSON.parse(data);
            return parse[0].rewards[0].amount;
        } catch (error) {
            return 0;
        }
    }

    async poolDelegatorsHistory({
        poolId,
        epochNo,
        stakeAddress,
    }: {
        poolId: string;
        epochNo: number;
        stakeAddress: string;
    }) {
        try {
            const response = await this.get(
                `/pool_delegators_history?_pool_bech32=${poolId}&_epoch_no=${epochNo}`,
            );
            const parse = JSON.parse(response.data);
            const { amount } = parse.find(function (parsePoolDelegatorsHistory: any) {
                return parsePoolDelegatorsHistory.stake_address === stakeAddress;
            });
            return amount;
        } catch (error) {
            return 0;
        }
    }

    async epochInfomation({ epochNo }: { epochNo: number }) {
        try {
            const response = await this.get(
                `/epoch_info?_epoch_no=${epochNo}&_include_next_epoch=false`,
            );
            if (response.status !== 200) {
                throw new Error(`Request failed with status ${response.status}`);
            }

            const parse = JSON.parse(response.data)[0];
            return parse;
        } catch (error) {
            console.error("Failed to fetch epoch information:", error);
            throw error;
        }
    }
}

export default Koios;
