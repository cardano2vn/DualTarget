import { Lucid } from "lucid-cardano";

export type LucidContextType = {
    loading: boolean;
    lucid: Lucid;
    lucidPlatform: Lucid;
    setLucid: React.Dispatch<React.SetStateAction<Lucid>>;
};
