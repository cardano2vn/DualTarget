import { decodeFirst, Tagged } from "cbor";

type Props = {
    inlineDatum: string;
};

function convertToJSON(decoded: any) {
    if (Buffer.isBuffer(decoded)) {
        return { bytes: decoded.toString("hex") };
    } else if (typeof decoded === "number") {
        return { int: decoded };
    } else if (typeof decoded === "bigint") {
        return { int: decoded.toString() };
    } else if (decoded instanceof Tagged) {
        const fields = decoded.value.map(function (item: any) {
            if (Buffer.isBuffer(item)) {
                return { bytes: item.toString("hex") };
            } else if (typeof item === "number") {
                return { int: item };
            } else {
                return null;
            }
        });

        return {
            fields: fields.filter(function (item: any) {
                return item !== null;
            }),
            constructor: decoded.tag,
        };
    }
}
const convertInlineDatum = async function ({ inlineDatum }: Props) {
    try {
        const cborDatum: Buffer = Buffer.from(inlineDatum, "hex");
        const decoded = await decodeFirst(cborDatum);
        const jsonStructure = {
            fields: decoded.value.map((item: any) => convertToJSON(item)),
            constructor: decoded.tag,
        };
        return jsonStructure;
    } catch (error) {
        return null;
    }
};

export default convertInlineDatum;
