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
// const cborData = Buffer.from(
//     "d8799f581ca421f93124a36acac4f4317c5280963fd76937c444998fa3df4bf8d3581cb3a30944e0b0eb2ea9f58241d48b3a8d602ad6da64f6329548ab6712d8799f4040ff1a118d8ec3d8799f581ce16c2dc8ae937e8d3790c7fd7168d7b994621ba14ca11415f39fed72434d494eff1a07a9d8241a0107abff1a0006d6001a0007a80047414441444a45441a0016e3601a005b8d80581c54301c885cf9623debb0c17751a3731f377ddca780098fe91fe35963581cb3a30944e0b0eb2ea9f58241d48b3a8d602ad6da64f6329548ab67121b0000019080b6f18402ff",
//     "hex",
// );

// // Hàm giải mã và chuyển đổi sang JSON
// async function decodeAndConvertToJSON(cborData) {
//     try {
//         // Giải mã dữ liệu CBOR
//         const decoded = await decodeFirst(cborData);

//         // Hàm chuyển đổi cấu trúc giải mã thành JSON

//         // Chuyển đổi cấu trúc giải mã thành JSON
//         const jsonStructure = {
//             fields: decoded.value.map((item) => convertToJSON(item)), // Duyệt qua từng phần tử và chuyển đổi
//             constructor: decoded.tag,
//         };

//         return jsonStructure;
//     } catch (error) {
//         console.error("Error decoding or converting CBOR data:", error);
//         return null;
//     }
// }

// // Sử dụng hàm để giải mã và chuyển đổi CBOR thành JSON
// decodeAndConvertToJSON(cborData)
//     .then((jsonData) => {
//         if (jsonData) {
//             console.log("Converted JSON:", jsonData);
//         } else {
//             console.log("Failed to decode or convert CBOR data.");
//         }
//     })
//     .catch((err) => console.error("Error:", err));
