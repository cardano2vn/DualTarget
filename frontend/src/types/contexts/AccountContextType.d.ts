import { AccountType } from "../GenericsType";

export type AccountContextType = {
    account: AccountType;
    setAccount: React.Dispatch<React.SetStateAction<AccountType>>;
};
