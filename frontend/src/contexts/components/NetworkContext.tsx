"use client";

import { createContext } from "react";
import { NetworkContextType } from "~/types/contexts/NetworkContextType";

const NetworkContext = createContext<NetworkContextType>(null!);

export default NetworkContext;
