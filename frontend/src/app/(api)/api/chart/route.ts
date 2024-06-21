import { Kline, getKline } from "binance-historical";

export async function GET() {
    const datetime = new Date(Date.now());
    const oneYearAgo = datetime.setFullYear(datetime.getFullYear() - 1);
    const result: Array<Kline> = await getKline("ADAUSDT", "4h", new Date(oneYearAgo), new Date());

    
    return Response.json(result);
}
