"use client";

import { createContext } from "react";
import { SmartContractContextType } from "~/types/contexts/SmartContractContextType";

const SmartContractContext = createContext<SmartContractContextType>(null!);

export default SmartContractContext;
