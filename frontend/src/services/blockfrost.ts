import { BlockFrostAPI } from "@blockfrost/blockfrost-js";
import { CardanoNetwork } from "@blockfrost/blockfrost-js/lib/types";

class Blockfrost extends BlockFrostAPI {
    constructor(projectId: string, network: CardanoNetwork) {
        super({
            projectId: projectId,
            network: network,
        });
    }
}

export default Blockfrost;
