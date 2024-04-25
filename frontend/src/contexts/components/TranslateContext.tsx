"use client";

import { createContext } from "react";
import { TranslateContextType } from "~/types/contexts/TranslateContextType";

const TranslateContext = createContext<TranslateContextType>(null!);

export default TranslateContext;
