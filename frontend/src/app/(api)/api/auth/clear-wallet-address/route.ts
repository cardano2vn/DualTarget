export async function POST() {
    return Response.json(
        { message: "clear wallet address in cookie store" },
        {
            status: 200,
            headers: {
                "Set-Cookie": `wallet_address=; Path=/; HttpOnly; Max-Age=0`,
            },
        },
    );
}
