"use client";

import React, { createContext } from "react";
import { DelegationRewardContextType } from "~/types/contexts/DelegationRewardContextType";

const DelegationRewardContext = createContext<DelegationRewardContextType>(null!);

export default DelegationRewardContext;
