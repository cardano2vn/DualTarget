"use client";

import { createContext } from "react";
import { StatisticContextType } from "~/types/contexts/StatisticContextType";

const StatisticsContext = createContext<StatisticContextType>(null!);

export default StatisticsContext;
