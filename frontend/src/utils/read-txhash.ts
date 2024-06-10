import axios from "axios";
import { Lucid, TxHash } from "lucid-cardano";

type Props = {
    lucid: Lucid;
};

const readTxHash = async function ({ lucid }: Props) {
    const { data } = await axios.get(`${window.location.origin}/api/transaction`);
};

export default readTxHash;
