import { decodeFirst, Tagged } from "cbor";

type Props = {
    inlineDatum: string;
};

function convertToJSON(decoded: any): any {
    if (Buffer.isBuffer(decoded)) {
        return { bytes: decoded.toString("hex") };
    } else if (typeof decoded === "number") {
        return { int: decoded };
    } else if (typeof decoded === "bigint") {
        return { int: decoded.toString() };
    } else if (decoded instanceof Tagged) {
        return {
            fields: Array.isArray(decoded.value)
                ? decoded.value.map(convertToJSON).filter(Boolean)
                : convertToJSON(decoded.value),
        };
    } else if (Array.isArray(decoded)) {
        return decoded.map(convertToJSON);
    } else if (typeof decoded === "object" && decoded !== null) {
        return Object.fromEntries(Object.entries(decoded).map(([value]) => convertToJSON(value)));
    }
    return decoded;
}

const convertInlineDatum = async function ({ inlineDatum }: Props) {
    try {
        const cborDatum: Buffer = Buffer.from(inlineDatum, "hex");
        const decoded = await decodeFirst(cborDatum);

        if (decoded.value.map(convertToJSON)) {
            if (decoded.value.map(convertToJSON)[0]?.int) {
                return {
                    constructor: decoded instanceof Tagged ? decoded.tag : undefined,
                    fields: decoded.value.map(convertToJSON)[1],
                };
            }
            return {
                constructor: decoded instanceof Tagged ? decoded.tag : undefined,
                fields: decoded.value.map(convertToJSON),
            };
        }
    } catch (error) {
        console.error("Error decoding CBOR:", error);
        return null;
    }
};

export default convertInlineDatum;
