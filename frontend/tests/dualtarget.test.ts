import { describe, test, expect, beforeEach, jest } from "@jest/globals";
import convertInlineDatum from "~/helpers/convert-inline-datum";

describe("Dualtarget", function () {
    test("Convert Inline Datum 1", async function () {
        const datum = await convertInlineDatum({
            inlineDatum:
                "d866821a0681fa529f581c54301c885cf9623debb0c17751a3731f377ddca780098fe91fe35963581c7d9bac6e1fe750ddfc81eee27de78d13f80d93cf59e13e356913649ad866821a5906f6369f4040ff1a08932f54d866821a5906f6369f581ce16c2dc8ae937e8d3790c7fd7168d7b994621ba14ca11415f39fed72434d494eff1a0680985c1a00b71aff1a000c35001a000d6d8047414441444a45441a0016e3601a005b8d80581c7d9bac6e1fe750ddfc81eee27de78d13f80d93cf59e13e356913649a581cb3a30944e0b0eb2ea9f58241d48b3a8d602ad6da64f6329548ab67121b000001949a724a6800ff",
        });
        console.log(datum);
    });

    test("Convert Inline Datum 2", async function () {
        const datum1 = await convertInlineDatum({
            inlineDatum:
                "d8799f581ca421f93124a36acac4f4317c5280963fd76937c444998fa3df4bf8d3581cb3a30944e0b0eb2ea9f58241d48b3a8d602ad6da64f6329548ab6712d8799f4040ff1a0125f4c1d8799f581ce16c2dc8ae937e8d3790c7fd7168d7b994621ba14ca11415f39fed72434d494eff1a016707c21a000752ff1a001e84801a001f20c047414441444a45441a0016e3601a005b8d80581c54301c885cf9623debb0c17751a3731f377ddca780098fe91fe35963581cb3a30944e0b0eb2ea9f58241d48b3a8d602ad6da64f6329548ab67121b000001949b4afb4902ff",
        });
        console.log(datum1);
    });
});
