import { Network } from "lucid-cardano";
import { EnviromentType } from "../GenericsType";

export type NetworkContextType = {
    network: Network;
    enviroment: EnviromentType;
    setNetwork: React.Dispatch<React.SetStateAction<Network>>;
};
