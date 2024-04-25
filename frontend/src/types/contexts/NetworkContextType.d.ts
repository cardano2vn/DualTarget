import { Network } from "lucid-cardano";

export type NetworkContextType = {
    network: Network;
    setNetwork: React.Dispatch<React.SetStateAction<Network>>;
};
