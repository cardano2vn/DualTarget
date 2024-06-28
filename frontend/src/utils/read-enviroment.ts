import enviroments from "~/constants/enviroment";
import { EnviromentType } from "~/types/GenericsType";

type Props = {
    network: string;
    index?: number;
};
const readEnviroment = function ({ network, index = 0 }: Props): EnviromentType {
    switch (network.toLowerCase()) {
        case "preprod":
            return enviroments.PREPROD[index];
        case "mainnet":
            return enviroments.MAINNET[index];
        default:
            return enviroments.PREPROD[index];
    }
};

export default readEnviroment;
