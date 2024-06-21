import { isValidCardanoWalletAddress } from "~/utils/utils";

export async function POST(request: Request) {
    const { walletAddress } = await request.json();
    const maxAge = 60 * 60 * 24 * 365 * 100; // 100 years (infinite)

    if (!isValidCardanoWalletAddress(walletAddress)) {
        return Response.json(
            { message: "Invalid wallet address" },
            {
                status: 401,
            },
        );
    }

    return Response.json(
        { message: "Set cookie for wallet address" },
        {
            headers: {
                "Set-Cookie": `wallet_address=${walletAddress}; Path=/; httpOnly; Secure; Max-Age=${maxAge}; SameSite=Lax`,
            },
        },
    );
}
