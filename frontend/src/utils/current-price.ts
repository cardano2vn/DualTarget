import axios from "axios";

export async function getCurrentPrice(symbol: string = "ADAUSDT") {
    try {
        const response = await axios.get<{ symbol: string; price: string }>(
            "https://api.binance.com/api/v3/ticker/price",
            {
                params: {
                    symbol: symbol,
                },
            },
        );
        return response.data;
    } catch (error) {
        console.error(`Error fetching current price for ${symbol}:`, error);
        throw error;
    }
}
