import { NextRequest } from "next/server";
import Blockfrost from "~/services/blockfrost";

export async function GET(request: NextRequest) {
    const blockfrost = new Blockfrost(process.env.BLOCKFROST_PROJECT_API_KEY_PREPROD!, "preprod");

    const addressesTotal = await blockfrost.addressesTotal(process.env.DUALTARGET_PAYMENT_ADDRESS_PREPROP!);

    const totalVolumeDepositsADA = addressesTotal.received_sum.reduce((accumulator, currentValue) => {
        if (currentValue.unit === "lovelace") {
            return accumulator + parseInt(currentValue.quantity) / 1000000;
        }
        return accumulator;
    }, 0);

    const totalVolumeWithdrawsADA = addressesTotal.sent_sum.reduce((accumulator, currentValue) => {
        if (currentValue.unit === "lovelace") {
            return accumulator + parseInt(currentValue.quantity) / 1000000;
        }
        return accumulator;
    }, 0);

    const totalVolumeWithdrawsDJED = addressesTotal.received_sum.reduce((accumulator, currentValue) => {
        if (currentValue.unit === "e16c2dc8ae937e8d3790c7fd7168d7b994621ba14ca11415f39fed724d494e") {
            return accumulator + parseInt(currentValue.quantity) / 1000000;
        }
        return accumulator;
    }, 0);

    const totalTransaction: number = addressesTotal.tx_count;
    return Response.json({
        totalTransaction: totalTransaction,
        totalVolumeWithdrawsDJED: totalVolumeWithdrawsDJED,
        totalVolumeWithdrawsADA: totalVolumeWithdrawsADA,
        totalVolumeDepositsADA: totalVolumeDepositsADA,
    });
}
