import axios from "axios";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const { data } = await axios.post(`https://preprod.koios.rest/api/v1/tx_info`, {
        _tx_hashes: ["fcb9cf2638779b75c371c66449e433675298b56aabb3c2f19610d14cc61eaabf"],
    });

    return Response.json({});
}
