export type DelegationRewardContextType = {
    caculateADAPool: ({
        walletAddress,
        lucidPlatform,
        enviroment,
    }: {
        walletAddress: string;
        lucidPlatform: Lucid;
        enviroment: EnviromentType;
    }) => Promise<number>;
};
