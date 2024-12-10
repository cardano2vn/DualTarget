import { encode, Tagged } from "cbor";

type JSONInput = {
    fields?: any[];
    constructor?: number;
    bytes?: string;
    int?: number | string;
    unknown?: any;
};

function convertFromJSON(json: JSONInput): any {
    if (json.bytes) {
        return Buffer.from(json.bytes, "hex");
    } else if (json.int) {
        return typeof json.int === "string" ? BigInt(json.int) : json.int;
    } else if (json.fields && typeof json.constructor === "number") {

        const fields = json.fields.map((item: any) => convertFromJSON(item));
        return new Tagged(json.constructor, fields);
    }
    return json.unknown || null;
}

const convertJSONToCBOR = async (jsonStructure: JSONInput): Promise<Buffer> => {
    try {
        const decodedObject = convertFromJSON(jsonStructure);
        const cborData = encode(decodedObject); // Convert to CBOR
        return cborData;
    } catch (error) {
        console.error("Error converting JSON to CBOR:", error);
        throw error;
    }
};

export default convertJSONToCBOR;
