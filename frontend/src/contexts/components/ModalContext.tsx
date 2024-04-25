"use client";

import { createContext } from "react";
import { ModalContextType } from "~/types/contexts/ModalContextType";

const ModalContext = createContext<ModalContextType>(null!);

export default ModalContext;
