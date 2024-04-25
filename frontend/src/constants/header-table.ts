import { HeaderTableType } from "~/types/GenericsType";

const historyTransactions: HeaderTableType[] = [
    { title: "Block Time" },
    { title: "Transaction Hash" },
    { title: "Action" },
    { title: "Amount" },
    { title: "Fees" },
    { title: "Status" },
];

const historyRewards: HeaderTableType[] = [
    { title: "Epoch" },
    {
        title: "Amount (ADA)",
        description: "Amount of SHEN address held at the moment of the snapshot",
    },
    {
        title: "Amount (ADA)",
        description: "Rewards are calculated with 2-3 epoch delay according to Cardano network rules",
    },
    {
        title: "Status",
        description:
            "Rewards distribution occurs after three epochs since a snapshot is taken. The minimal reward amount eligible for distribution is 2 ₳ . Rewards lower than the min amount accumulated and distributed once the limit is breached.",
    },
];

export { historyRewards, historyTransactions };
